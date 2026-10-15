#!/usr/bin/env node
/**
 * Capture a live Stencil p-wordmark baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-wordmark-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=wordmark';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_wordmark_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_wordmark_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-wordmark-baseline: ${message}`);
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

async function collectWordmarkFacts(page) {
  return page.evaluate(async () => {
    await customElements.whenDefined('p-wordmark');
    const card = document.querySelector('[data-card="wordmark"]');
    const wordmarks = [...document.querySelectorAll('[data-card="wordmark"] p-wordmark')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      wordmarkCount: wordmarks.length,
      wordmarks: wordmarks.map((el) => {
        const svg = el.shadowRoot?.querySelector('svg');
        const a = el.shadowRoot?.querySelector('a');
        const title = el.shadowRoot?.querySelector('title');
        const path = el.shadowRoot?.querySelector('path');
        return {
          href: el.getAttribute('href'),
          target: el.getAttribute('target'),
          size: el.getAttribute('size'),
          className: el.getAttribute('class'),
          hydrated: el.classList.contains('hydrated'),
          hostRect: el.getBoundingClientRect().toJSON(),
          hasSvg: !!svg,
          svgViewBox: svg?.getAttribute('viewBox') ?? null,
          titleText: title?.textContent ?? null,
          pathLength: path?.getAttribute('d')?.length ?? 0,
          aHref: a?.getAttribute('href') ?? null,
          aTarget: a?.getAttribute('target') ?? null,
        };
      }),
    };
  });
}

function assertLiveWordmark(facts) {
  if (facts.title !== 'Playground') {
    fail(`Expected page title "Playground", got ${JSON.stringify(facts.title)}`);
  }
  if (!facts.cardRect || facts.cardDisplay === 'none') {
    fail('Wordmark card is missing or hidden. Check PLAYGROUND_URL includes components=wordmark.');
  }
  if (facts.wordmarkCount < 1) {
    fail(`Expected at least 1 p-wordmark host, found ${facts.wordmarkCount}`);
  }
  for (const item of facts.wordmarks) {
    if (!item.hydrated) fail('p-wordmark is not hydrated');
    if (!item.hasSvg) fail('p-wordmark has no shadow <svg>');
    if (item.svgViewBox !== '0 0 4500 300') fail(`p-wordmark viewBox is ${item.svgViewBox}`);
    if (item.titleText !== 'Porsche') fail(`p-wordmark title is ${item.titleText}`);
    if (item.pathLength < 100) fail('p-wordmark path is missing');
    if (item.aHref !== '#') fail(`p-wordmark anchor href is ${item.aHref}`);
    if (!(item.hostRect.width > 50) || !(item.hostRect.height > 5)) {
      fail(`p-wordmark host is ${item.hostRect.width}x${item.hostRect.height}, expected a wide wordmark`);
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

    await page.waitForFunction(() => customElements.get('p-wordmark'), { timeout: 20_000 });
    await page.waitForSelector('[data-card="wordmark"] p-wordmark.hydrated', { timeout: 20_000 });
    await page.waitForFunction(() => {
      const svg = document.querySelector('[data-card="wordmark"] p-wordmark')?.shadowRoot?.querySelector('svg');
      return !!svg && svg.getBBox().width > 0;
    });

    const facts = await collectWordmarkFacts(page);
    assertLiveWordmark(facts);

    const card = page.locator('[data-card="wordmark"]');
    await card.scrollIntoViewIfNeeded();
    const png = await card.screenshot({ type: 'png' });

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
