#!/usr/bin/env node
/**
 * Capture a live Stencil p-stepper-horizontal baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-stepper-horizontal-baseline.mjs
 *
 * Nested p-stepper-horizontal-item / p-scroller / p-button / p-text stay Stencil.
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
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_stepper_horizontal_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_stepper_horizontal_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-stepper-horizontal-baseline: ${message}`);
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
    await customElements.whenDefined('p-stepper-horizontal');
    const card = document.querySelector('[data-card="stepper-horizontal"]');
    const hosts = [...document.querySelectorAll('[data-card="stepper-horizontal"] p-stepper-horizontal')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const items = [...el.querySelectorAll(':scope > p-stepper-horizontal-item')];
        const scroller = el.shadowRoot?.querySelector('p-scroller');
        return {
          size: el.getAttribute('size'),
          hydrated: el.classList.contains('hydrated'),
          itemCount: items.length,
          itemStates: items.map((n) => n.getAttribute('state')),
          scrollerTag: scroller?.tagName ?? null,
          scrollerHydrated: scroller?.classList.contains('hydrated') ?? false,
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
  if (facts.hostCount < 3) {
    fail(`Expected at least 3 p-stepper-horizontal hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-stepper-horizontal is not hydrated');
    if (item.itemCount < 2) fail(`expected items, got ${item.itemCount}`);
    if (item.scrollerTag !== 'P-SCROLLER') fail(`scroller is ${item.scrollerTag}`);
    if (!item.scrollerHydrated) fail('nested p-scroller is not hydrated');
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-stepper-horizontal host is ${item.hostRect.width}x${item.hostRect.height}`);
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
      () =>
        customElements.get('p-stepper-horizontal') &&
        customElements.get('p-stepper-horizontal-item') &&
        customElements.get('p-scroller') &&
        customElements.get('p-button') &&
        customElements.get('p-text'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="stepper-horizontal"] p-stepper-horizontal.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="stepper-horizontal"] p-stepper-horizontal')];
      return (
        hosts.length >= 3 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          const scroller = el.shadowRoot?.querySelector('p-scroller');
          if (!scroller?.classList.contains('hydrated')) return false;
          const items = [...el.querySelectorAll(':scope > p-stepper-horizontal-item')];
          return items.length >= 2 && items.every((item) => item.classList.contains('hydrated'));
        })
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
