#!/usr/bin/env node
/**
 * Capture a live Stencil p-crest baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-crest-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=crest';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_crest_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_crest_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-crest-baseline: ${message}`);
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

async function collectCrestFacts(page) {
  return page.evaluate(async () => {
    await customElements.whenDefined('p-crest');
    const card = document.querySelector('[data-card="crest"]');
    const crests = [...document.querySelectorAll('[data-card="crest"] p-crest')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      crestCount: crests.length,
      crests: crests.map((el) => {
        const img = el.shadowRoot?.querySelector('img');
        const picture = el.shadowRoot?.querySelector('picture');
        const a = el.shadowRoot?.querySelector('a');
        return {
          href: el.getAttribute('href'),
          target: el.getAttribute('target'),
          hydrated: el.classList.contains('hydrated'),
          hostRect: el.getBoundingClientRect().toJSON(),
          hasPicture: !!picture,
          aHref: a?.getAttribute('href') ?? null,
          aTarget: a?.getAttribute('target') ?? null,
          img: img
            ? {
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt'),
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

function assertLiveCrest(facts) {
  if (facts.title !== 'Playground') {
    fail(`Expected page title "Playground", got ${JSON.stringify(facts.title)}`);
  }
  if (!facts.cardRect || facts.cardDisplay === 'none') {
    fail('Crest card is missing or hidden. Check PLAYGROUND_URL includes components=crest.');
  }
  if (facts.crestCount < 1) {
    fail(`Expected at least 1 p-crest host, found ${facts.crestCount}`);
  }
  for (const item of facts.crests) {
    if (!item.hydrated) fail('p-crest is not hydrated');
    if (!item.hasPicture) fail('p-crest has no shadow <picture>');
    if (!item.img) fail('p-crest has no shadow <img>');
    if (item.img.alt !== 'Porsche') fail(`p-crest img alt is ${item.img.alt}, expected Porsche`);
    if (!item.img.complete || item.img.naturalWidth < 1) fail('p-crest img did not load');
    if (Math.round(item.hostRect.width) !== 30 || Math.round(item.hostRect.height) !== 40) {
      fail(`p-crest host is ${item.hostRect.width}x${item.hostRect.height}, expected 30x40`);
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

    await page.waitForFunction(() => customElements.get('p-crest'), { timeout: 20_000 });
    await page.waitForSelector('[data-card="crest"] p-crest.hydrated', { timeout: 20_000 });
    await page.waitForFunction(() => {
      const img = document.querySelector('[data-card="crest"] p-crest')?.shadowRoot?.querySelector('img');
      return !!img && img.complete && img.naturalWidth > 0;
    });

    const facts = await collectCrestFacts(page);
    assertLiveCrest(facts);

    const card = page.locator('[data-card="crest"]');
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
