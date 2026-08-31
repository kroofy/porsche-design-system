#!/usr/bin/env node
/**
 * Capture a live Stencil p-drilldown-item baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-drilldown-item-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=drilldown';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_drilldown_item_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_drilldown_item_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-drilldown-item-baseline: ${message}`);
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
    await customElements.whenDefined('p-drilldown-item');
    const card = document.querySelector('[data-card="drilldown"]');
    const parents = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown')];
    const hosts = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-item')];
    const buttons = [...document.querySelectorAll('[data-card="drilldown"] > nav > p-button')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      parentCount: parents.length,
      hostCount: hosts.length,
      buttonCount: buttons.length,
      parents: parents.map((el) => {
        const dialog = el.shadowRoot?.querySelector('dialog');
        return {
          hydrated: el.classList.contains('hydrated'),
          dialogOpen: dialog?.open ?? null,
          dialogVis: dialog ? getComputedStyle(dialog).visibility : null,
        };
      }),
      hosts: hosts.map((el) => ({
        hydrated: el.classList.contains('hydrated'),
        identifier: el.getAttribute('identifier'),
        secondary: el.hasAttribute('secondary'),
        hasDefaultSlot: !!el.shadowRoot?.querySelector('slot:not([name])'),
      })),
    };
  });
}

function assertLive(facts) {
  if (facts.title !== 'Playground') {
    fail(`Expected page title "Playground", got ${JSON.stringify(facts.title)}`);
  }
  if (!facts.cardRect || facts.cardDisplay === 'none') {
    fail('Drilldown card is missing or hidden. Check PLAYGROUND_URL includes components=drilldown.');
  }
  if (facts.parentCount < 2) fail(`Expected at least 2 p-drilldown parents, found ${facts.parentCount}`);
  if (facts.hostCount < 17) fail(`Expected at least 17 p-drilldown-item hosts, found ${facts.hostCount}`);
  if (facts.buttonCount < 2) fail(`Expected sibling p-button hosts, found ${facts.buttonCount}`);
  for (const item of facts.parents) {
    if (!item.hydrated) fail('p-drilldown is not hydrated');
    if (item.dialogOpen) fail('expected closed dialog');
    if (item.dialogVis !== 'hidden') fail('closed dialog should be visibility:hidden');
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-drilldown-item is not hydrated');
    if (!item.hasDefaultSlot) fail('missing default slot');
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
      () => customElements.get('p-drilldown') && customElements.get('p-drilldown-item') && customElements.get('p-button'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="drilldown"] p-drilldown-item.hydrated', {
      timeout: 20_000,
      state: 'attached',
    });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const parents = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown')];
      const hosts = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-item')];
      return (
        parents.length >= 2 &&
        hosts.length >= 17 &&
        parents.every((el) => {
          const dialog = el.shadowRoot?.querySelector('dialog');
          return el.classList.contains('hydrated') && dialog && !dialog.open;
        }) &&
        hosts.every((el) => el.classList.contains('hydrated'))
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="drilldown"]').boundingBox();
    if (!box) fail('Drilldown card has no bounding box');
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
