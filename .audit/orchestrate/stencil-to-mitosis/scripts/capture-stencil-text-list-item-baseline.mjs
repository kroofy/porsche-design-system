#!/usr/bin/env node
/**
 * Capture a live Stencil p-text-list-item baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-text-list-item-baseline.mjs
 *
 * Parent p-text-list stays Stencil. Pixel-diff swaps item hosts only and copies light-DOM children.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=text-list';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_text_list_item_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_text_list_item_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-text-list-item-baseline: ${message}`);
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
    await customElements.whenDefined('p-text-list-item');
    const card = document.querySelector('[data-card="text-list"]');
    const hosts = [...document.querySelectorAll('[data-card="text-list"] p-text-list-item')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      listCount: document.querySelectorAll('[data-card="text-list"] p-text-list').length,
      hosts: hosts.map((el) => {
        const slot = el.shadowRoot?.querySelector('slot');
        return {
          parentTag: el.parentElement?.tagName ?? null,
          role: el.getAttribute('role'),
          hydrated: el.classList.contains('hydrated'),
          hasSlot: !!slot,
          childCount: el.childNodes.length,
          hostRect: el.getBoundingClientRect().toJSON(),
        };
      }),
    };
  });
}

function assertLive(facts) {
  if (facts.title !== 'Playground') {
    fail(`Expected page title "Playground", got ${JSON.stringify(facts.title)}`);
  }
  if (!facts.cardRect || facts.cardDisplay === 'none') {
    fail('Text-list card is missing or hidden. Check PLAYGROUND_URL includes components=text-list.');
  }
  if (facts.hostCount < 15) {
    fail(`Expected at least 15 p-text-list-item hosts, found ${facts.hostCount}`);
  }
  if (facts.listCount < 6) {
    fail(`Expected parent p-text-list hosts, found ${facts.listCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-text-list-item is not hydrated');
    if (item.parentTag !== 'P-TEXT-LIST') fail(`item parent is ${item.parentTag}`);
    if (item.role !== 'listitem') fail(`role is ${item.role}`);
    if (!item.hasSlot) fail('missing default slot');
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-text-list-item host is ${item.hostRect.width}x${item.hostRect.height}`);
    }
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

    await page.waitForFunction(
      () => customElements.get('p-text-list') && customElements.get('p-text-list-item'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="text-list"] p-text-list-item.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="text-list"] p-text-list-item')];
      return (
        hosts.length >= 15 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          if (el.getAttribute('role') !== 'listitem') return false;
          if (!el.shadowRoot?.querySelector('slot')) return false;
          return el.parentElement?.tagName === 'P-TEXT-LIST';
        })
      );
    });
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--p-animation-duration', '0s');
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="text-list"]').boundingBox();
    if (!box) fail('Text-list card has no bounding box');
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
