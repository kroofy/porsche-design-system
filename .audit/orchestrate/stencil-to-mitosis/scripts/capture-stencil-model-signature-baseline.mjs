#!/usr/bin/env node
/**
 * Capture a live Stencil p-model-signature baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-model-signature-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=model-signature';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_model_signature_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_model_signature_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-model-signature-baseline: ${message}`);
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
    await customElements.whenDefined('p-model-signature');
    const card = document.querySelector('[data-card="model-signature"]');
    const hosts = [...document.querySelectorAll('[data-card="model-signature"] p-model-signature')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const img = el.shadowRoot?.querySelector('img');
        const css = getComputedStyle(el);
        return {
          model: el.getAttribute('model'),
          color: el.getAttribute('color'),
          className: el.getAttribute('class'),
          hydrated: el.classList.contains('hydrated'),
          hostRect: el.getBoundingClientRect().toJSON(),
          maskImage: css.maskImage || css.webkitMaskImage,
          background: css.backgroundColor,
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

function assertLive(facts) {
  if (facts.title !== 'Playground') {
    fail(`Expected page title "Playground", got ${JSON.stringify(facts.title)}`);
  }
  if (!facts.cardRect || facts.cardDisplay === 'none') {
    fail('Model-signature card is missing or hidden. Check PLAYGROUND_URL includes components=model-signature.');
  }
  if (facts.hostCount < 13) {
    fail(`Expected at least 13 p-model-signature hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail(`p-model-signature model=${item.model} is not hydrated`);
    if (!item.img) fail(`p-model-signature model=${item.model} has no shadow <img>`);
    if (!item.img.complete || item.img.naturalWidth < 1) {
      fail(`p-model-signature model=${item.model} img did not load`);
    }
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-model-signature host is ${item.hostRect.width}x${item.hostRect.height}`);
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

    await page.waitForFunction(() => customElements.get('p-model-signature'), { timeout: 20_000 });
    await page.waitForSelector('[data-card="model-signature"] p-model-signature.hydrated', { timeout: 20_000 });
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="model-signature"] p-model-signature')];
      return (
        hosts.length >= 13 &&
        hosts.every((el) => {
          const img = el.shadowRoot?.querySelector('img');
          return !!img && img.complete && img.naturalWidth > 0;
        })
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="model-signature"]').boundingBox();
    if (!box) fail('Model-signature card has no bounding box');
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
