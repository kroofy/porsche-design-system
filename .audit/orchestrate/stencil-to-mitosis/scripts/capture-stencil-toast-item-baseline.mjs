#!/usr/bin/env node
/**
 * Capture a live Stencil p-toast-item baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-toast-item-baseline.mjs
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
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_toast_item_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_toast_item_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-toast-item-baseline: ${message}`);
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
    await customElements.whenDefined('p-toast-item');
    const card = document.querySelector('[data-card="toast"]');
    const toast = document.querySelector('[data-card="toast"] p-toast');
    const items = [...(toast?.shadowRoot?.querySelectorAll('p-toast-item') ?? [])];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      toastTag: toast?.tagName ?? null,
      itemCount: items.length,
      items: items.map((el) => ({
        parentHost: el.getRootNode()?.host?.tagName ?? null,
        hydrated: el.classList.contains('hydrated'),
        popover: el.getAttribute('popover'),
        popoverOpen: el.matches(':popover-open'),
        text: el.shadowRoot?.querySelector('p')?.textContent ?? '',
        hasNotification: !!el.shadowRoot?.querySelector('.notification'),
        rect: el.getBoundingClientRect().toJSON(),
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
  if (facts.toastTag !== 'P-TOAST') fail('parent is not p-toast');
  if (facts.itemCount < 1) fail(`Expected at least 1 p-toast-item, found ${facts.itemCount}`);
  for (const item of facts.items) {
    if (item.parentHost !== 'P-TOAST') fail('p-toast-item root is not p-toast');
    if (!item.hydrated) fail('p-toast-item is not hydrated');
    if (!item.popoverOpen) fail('p-toast-item popover is not open');
    if (!item.hasNotification) fail('missing .notification');
    if (!item.text) fail('p-toast-item has no text');
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
      () => customElements.get('p-toast') && customElements.get('p-toast-item'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="toast"] p-toast.hydrated', {
      timeout: 20_000,
      state: 'attached',
    });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; --p-temporary-toast-skip-timeout: true; }',
    });
    await page.evaluate(() => {
      document.querySelector('[data-card="toast"] p-toast').addMessage({ text: 'Some content' });
    });
    await page.waitForFunction(() => {
      const toast = document.querySelector('[data-card="toast"] p-toast');
      const item = toast?.shadowRoot?.querySelector('p-toast-item');
      return (
        item?.classList.contains('hydrated') &&
        item.matches(':popover-open') &&
        item.shadowRoot?.querySelector('.notification')
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const cardBox = await page.locator('[data-card="toast"]').boundingBox();
    if (!cardBox) fail('Toast card has no bounding box');
    const itemRect = facts.items[0].rect;
    const x = Math.max(0, Math.min(cardBox.x, itemRect.x));
    const y = Math.max(0, Math.min(cardBox.y, itemRect.y));
    const right = Math.max(cardBox.x + cardBox.width, itemRect.x + itemRect.width);
    const bottom = Math.max(cardBox.y + cardBox.height, itemRect.y + itemRect.height);
    const clip = {
      x,
      y,
      width: Math.min(right, VIEWPORT.width) - x,
      height: Math.min(bottom, VIEWPORT.height) - y,
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
