#!/usr/bin/env node
/**
 * Capture a live Stencil p-toast baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-toast-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=toast';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_toast_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_toast_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-toast-baseline: ${message}`);
  process.exit(1);
}

async function launchBrowser() {
  const launchArgs = ['--no-sandbox', '--disable-dev-shm-usage'];
  try {
    return await chromium.launch({ headless: true, args: launchArgs });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    fail(`Could not launch Playwright Chromium. Last error: ${reason}`);
  }
}

async function collectFacts(page) {
  return page.evaluate(async () => {
    await customElements.whenDefined('p-toast');
    const card = document.querySelector('[data-card="toast"]');
    const hosts = [...document.querySelectorAll('[data-card="toast"] p-toast')];
    const buttons = [...document.querySelectorAll('[data-card="toast"] p-button')];
    const items = [...document.querySelectorAll('[data-card="toast"] p-toast-item')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      buttonCount: buttons.length,
      itemCount: items.length,
      hosts: hosts.map((el) => ({
        parent: el.parentElement?.tagName ?? null,
        parentCard: el.parentElement?.getAttribute('data-card') ?? null,
        hydrated: el.classList.contains('hydrated'),
        role: el.getAttribute('role'),
        position: getComputedStyle(el).position,
        light: el.innerHTML,
      })),
    };
  });
}

function assertLive(facts) {
  if (facts.title !== 'Playground') {
    fail(`Expected page title "Playground", got ${JSON.stringify(facts.title)}`);
  }
  if (!facts.cardRect || facts.cardDisplay === 'none') {
    fail('Toast card is missing or hidden. Check PLAYGROUND_URL includes components=toast.');
  }
  if (facts.hostCount < 1) {
    fail(`Expected at least 1 p-toast host, found ${facts.hostCount}`);
  }
  if (facts.buttonCount < 4) {
    fail(`Expected sibling p-button hosts, found ${facts.buttonCount}`);
  }
  if (facts.itemCount !== 0) {
    fail('Expected empty/closed toast (no p-toast-item)');
  }
  for (const item of facts.hosts) {
    if (item.parentCard !== 'toast') fail('p-toast parent is not the toast card');
    if (!item.hydrated) fail('p-toast is not hydrated');
    if (item.position !== 'fixed') fail('p-toast is not position:fixed');
    if (item.role !== 'status') fail('p-toast missing role=status');
  }
}

async function main() {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage({
      viewport: VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
    });
    page.on('pageerror', (error) => {
      console.warn(`pageerror: ${error.message}`);
    });

    const response = await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
    if (!response || response.status() >= 400) {
      fail(`GET ${PLAYGROUND_URL} returned ${response?.status() ?? 'no response'}`);
    }

    await page.waitForFunction(() => customElements.get('p-toast') && customElements.get('p-button'), {
      timeout: 20_000,
    });
    await page.waitForSelector('[data-card="toast"] p-toast.hydrated', {
      timeout: 20_000,
      state: 'attached',
    });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="toast"] p-toast')];
      const buttons = [...document.querySelectorAll('[data-card="toast"] p-button')];
      return (
        hosts.length >= 1 &&
        buttons.length >= 4 &&
        hosts.every((el) => el.classList.contains('hydrated') && el.getAttribute('role') === 'status') &&
        buttons.every((el) => el.classList.contains('hydrated'))
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="toast"]').boundingBox();
    if (!box) fail('Toast card has no bounding box');
    const clip = {
      x: Math.max(0, box.x),
      y: Math.max(0, box.y),
      width: box.width,
      height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
    };
    const png = await page.screenshot({ type: 'png', clip });

    await mkdir(dirname(ARTIFACT_PNG), { recursive: true });
    await mkdir(dirname(BASELINE_PNG), { recursive: true });
    await writeFile(ARTIFACT_PNG, png);
    await copyFile(ARTIFACT_PNG, BASELINE_PNG);

    const summary = {
      url: PLAYGROUND_URL,
      artifact: ARTIFACT_PNG,
      baseline: BASELINE_PNG,
      viewport: VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      clip,
      facts,
    };
    console.log(JSON.stringify(summary, null, 2));
    console.log(`Wrote ${ARTIFACT_PNG}`);
    console.log(`Wrote ${BASELINE_PNG}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  fail(error instanceof Error ? error.stack ?? error.message : String(error));
});
