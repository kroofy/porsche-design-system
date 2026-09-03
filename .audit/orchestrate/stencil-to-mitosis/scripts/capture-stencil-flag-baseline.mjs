#!/usr/bin/env node
/**
 * Capture a live Stencil p-flag baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-flag-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=flag';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_flag_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_flag_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-flag-baseline: ${message}`);
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

async function collectFlagFacts(page) {
  return page.evaluate(async () => {
    await customElements.whenDefined('p-flag');
    const card = document.querySelector('[data-card="flag"]');
    const flags = [...document.querySelectorAll('[data-card="flag"] p-flag')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      flagCount: flags.length,
      flags: flags.map((el) => {
        const img = el.shadowRoot?.querySelector('img');
        return {
          name: el.getAttribute('name'),
          size: el.getAttribute('size'),
          aria: el.getAttribute('aria'),
          className: el.getAttribute('class'),
          hydrated: el.classList.contains('hydrated'),
          hostRect: el.getBoundingClientRect().toJSON(),
          img: img
            ? {
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt'),
                width: img.getAttribute('width'),
                height: img.getAttribute('height'),
                complete: img.complete,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
              }
            : null,
        };
      }),
    };
  });
}

function assertLiveFlag(facts) {
  if (facts.title !== 'Playground') {
    fail(`Expected page title "Playground", got ${JSON.stringify(facts.title)}`);
  }
  if (!facts.cardRect || facts.cardDisplay === 'none') {
    fail('Flag card is missing or hidden. Check PLAYGROUND_URL includes components=flag.');
  }
  if (facts.flagCount < 12) {
    fail(`Expected at least 12 p-flag hosts, found ${facts.flagCount}`);
  }
  for (const item of facts.flags) {
    if (!item.hydrated) fail(`p-flag size=${item.size} name=${item.name} is not hydrated`);
    if (!item.img) fail(`p-flag size=${item.size} name=${item.name} has no shadow <img>`);
    if (!item.img.complete || item.img.naturalWidth < 1) {
      fail(`p-flag size=${item.size} name=${item.name} img did not load`);
    }
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-flag host is ${item.hostRect.width}x${item.hostRect.height}`);
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

    await page.waitForFunction(() => customElements.get('p-flag'), { timeout: 20_000 });
    await page.waitForSelector('[data-card="flag"] p-flag.hydrated', { timeout: 20_000 });
    await page.waitForFunction(() => {
      const flags = [...document.querySelectorAll('[data-card="flag"] p-flag')];
      return (
        flags.length >= 12 &&
        flags.every((el) => {
          const img = el.shadowRoot?.querySelector('img');
          return !!img && img.complete && img.naturalWidth > 0;
        })
      );
    });

    const facts = await collectFlagFacts(page);
    assertLiveFlag(facts);

    const box = await page.locator('[data-card="flag"]').boundingBox();
    if (!box) fail('Flag card has no bounding box');
    // The card is taller than the 900px viewport. locator.screenshot() of a
    // clipped p-canvas descendant returns the layout box without the flags.
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
