#!/usr/bin/env node
/**
 * Capture a live Stencil p-link-tile-product baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-link-tile-product-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=link-tile-product';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_link_tile_product_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_tile_product_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-link-tile-product-baseline: ${message}`);
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
    await customElements.whenDefined('p-link-tile-product');
    const card = document.querySelector('[data-card="link-tile-product"]');
    const hosts = [...document.querySelectorAll('[data-card="link-tile-product"] p-link-tile-product')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const likes = [...(el.shadowRoot?.querySelectorAll('p-button-pure') ?? [])];
        return {
          href: el.getAttribute('href'),
          liked: el.getAttribute('liked'),
          aspectRatio: el.getAttribute('aspect-ratio'),
          hydrated: el.classList.contains('hydrated'),
          hasRoot: !!el.shadowRoot?.querySelector('.root'),
          hasOverlay: !!el.shadowRoot?.querySelector('a.anchor'),
          likeTags: likes.map((n) => n.tagName),
          header: el.querySelector(':scope > [slot="header"]')?.tagName ?? null,
          anchor: el.querySelector(':scope > a[slot="anchor"]')?.tagName ?? null,
          imgComplete: [...el.querySelectorAll(':scope > img')].every((img) => img.complete),
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
    fail('Link-tile-product card is missing or hidden. Check PLAYGROUND_URL includes components=link-tile-product.');
  }
  if (facts.hostCount < 2) {
    fail(`Expected at least 2 p-link-tile-product hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-link-tile-product is not hydrated');
    if (!item.hasRoot) fail('missing .root');
    if (!item.likeTags.includes('P-BUTTON-PURE')) fail('missing nested p-button-pure');
    if (!item.imgComplete) fail('slotted img not complete');
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
        customElements.get('p-link-tile-product') &&
        customElements.get('p-button-pure') &&
        customElements.get('p-tag') &&
        customElements.get('p-icon'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="link-tile-product"] p-link-tile-product.hydrated', {
      timeout: 20_000,
      state: 'attached',
    });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="link-tile-product"] p-link-tile-product')];
      return (
        hosts.length >= 2 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated') || !el.shadowRoot?.querySelector('.root')) return false;
          const imgs = [...el.querySelectorAll(':scope > img')];
          return imgs.length && imgs.every((img) => img.complete && img.naturalWidth > 0);
        })
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="link-tile-product"]').boundingBox();
    if (!box) fail('Link-tile-product card has no bounding box');
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
