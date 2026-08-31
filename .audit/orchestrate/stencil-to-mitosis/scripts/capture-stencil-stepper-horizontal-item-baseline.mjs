#!/usr/bin/env node
/**
 * Capture a live Stencil p-stepper-horizontal-item baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-stepper-horizontal-item-baseline.mjs
 *
 * Parent p-stepper-horizontal stays Stencil. Pixel-diff swaps item hosts only and copies light-DOM children.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=stepper-horizontal';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_stepper_horizontal_item_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_stepper_horizontal_item_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-stepper-horizontal-item-baseline: ${message}`);
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
    await customElements.whenDefined('p-stepper-horizontal-item');
    const card = document.querySelector('[data-card="stepper-horizontal"]');
    const hosts = [...document.querySelectorAll('[data-card="stepper-horizontal"] p-stepper-horizontal-item')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      parentCount: document.querySelectorAll('[data-card="stepper-horizontal"] p-stepper-horizontal').length,
      hosts: hosts.map((el) => {
        const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])];
        return {
          parentTag: el.parentElement?.tagName ?? null,
          state: el.getAttribute('state'),
          role: el.getAttribute('role'),
          hydrated: el.classList.contains('hydrated'),
          hasButton: !!el.shadowRoot?.querySelector('button'),
          iconTags: icons.map((n) => n.tagName),
          text: (el.textContent ?? '').trim(),
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
    fail('Stepper-horizontal card is missing or hidden. Check PLAYGROUND_URL includes components=stepper-horizontal.');
  }
  if (facts.hostCount < 11) {
    fail(`Expected at least 11 p-stepper-horizontal-item hosts, found ${facts.hostCount}`);
  }
  if (facts.parentCount < 3) {
    fail(`Expected at least 3 p-stepper-horizontal parents, found ${facts.parentCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-stepper-horizontal-item is not hydrated');
    if (item.parentTag !== 'P-STEPPER-HORIZONTAL') fail(`parent is ${item.parentTag}`);
    if (!item.hasButton) fail('missing button');
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
      () =>
        customElements.get('p-stepper-horizontal') &&
        customElements.get('p-stepper-horizontal-item') &&
        customElements.get('p-scroller') &&
        customElements.get('p-icon'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="stepper-horizontal"] p-stepper-horizontal-item.hydrated', {
      timeout: 20_000,
      state: 'attached',
    });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const items = [...document.querySelectorAll('[data-card="stepper-horizontal"] p-stepper-horizontal-item')];
      const parents = [...document.querySelectorAll('[data-card="stepper-horizontal"] p-stepper-horizontal')];
      return (
        items.length >= 11 &&
        parents.length >= 3 &&
        parents.every((el) => el.classList.contains('hydrated')) &&
        items.every((el) => el.classList.contains('hydrated') && el.shadowRoot?.querySelector('button'))
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="stepper-horizontal"]').boundingBox();
    if (!box) fail('Stepper-horizontal card has no bounding box');
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
