#!/usr/bin/env node
/**
 * Capture a live Stencil p-tag baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-tag-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=tag';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_tag_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tag_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-tag-baseline: ${message}`);
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
    await customElements.whenDefined('p-tag');
    const card = document.querySelector('[data-card="tag"]');
    const hosts = [...document.querySelectorAll('[data-card="tag"] p-tag')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const icon = el.shadowRoot?.querySelector('p-icon');
        const root = el.shadowRoot?.querySelector('span');
        const css = root ? getComputedStyle(root) : null;
        return {
          variant: el.getAttribute('variant'),
          icon: el.getAttribute('icon'),
          iconSource: el.getAttribute('icon-source'),
          hydrated: el.classList.contains('hydrated'),
          iconHydrated: icon?.classList.contains('hydrated') ?? false,
          innerTag: icon?.tagName ?? null,
          text: el.textContent?.trim(),
          hostRect: el.getBoundingClientRect().toJSON(),
          background: css?.backgroundColor,
          color: css?.color,
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
    fail('Tag card is missing or hidden. Check PLAYGROUND_URL includes components=tag.');
  }
  if (facts.hostCount < 11) {
    fail(`Expected at least 11 p-tag hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail(`p-tag variant=${item.variant} is not hydrated`);
    if (!item.iconHydrated) fail(`p-tag variant=${item.variant} inner p-icon is not hydrated`);
    if (item.innerTag !== 'P-ICON') fail(`p-tag inner icon is ${item.innerTag}`);
    if (!item.text) fail(`p-tag variant=${item.variant} has empty text`);
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-tag host is ${item.hostRect.width}x${item.hostRect.height}`);
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

    await page.waitForFunction(() => customElements.get('p-tag') && customElements.get('p-icon'), {
      timeout: 20_000,
    });
    await page.waitForSelector('[data-card="tag"] p-tag.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="tag"] p-tag')];
      return (
        hosts.length >= 11 &&
        hosts.every((el) => {
          const icon = el.shadowRoot?.querySelector('p-icon');
          const img = icon?.shadowRoot?.querySelector('img');
          return el.classList.contains('hydrated') && icon?.classList.contains('hydrated') && img?.complete;
        })
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="tag"]').boundingBox();
    if (!box) fail('Tag card has no bounding box');
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
