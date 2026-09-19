#!/usr/bin/env node
/**
 * Capture a live Stencil p-segmented-control-item baseline from the playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-segmented-control-item-baseline.mjs
 *
 * Parent p-segmented-control stays Stencil. Nested p-icon stays Stencil.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=segmented-control';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_segmented_control_item_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_segmented_control_item_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-segmented-control-item-baseline: ${message}`);
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
    await customElements.whenDefined('p-segmented-control-item');
    const card = document.querySelector('[data-card="segmented-control"]');
    const hosts = [...document.querySelectorAll('[data-card="segmented-control"] p-segmented-control-item')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      parentCount: document.querySelectorAll('[data-card="segmented-control"] p-segmented-control').length,
      hosts: hosts.map((el) => {
        const button = el.shadowRoot?.querySelector('button');
        const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
          (icon) => getComputedStyle(icon).display !== 'none',
        );
        return {
          parentTag: el.parentElement?.tagName ?? null,
          value: el.getAttribute('value'),
          label: el.getAttribute('label'),
          icon: el.getAttribute('icon'),
          disabled: el.getAttribute('disabled'),
          hydrated: el.classList.contains('hydrated'),
          hasButton: !!button,
          iconTags: icons.map((n) => n.tagName),
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
    fail('Segmented-control card is missing or hidden. Check PLAYGROUND_URL includes components=segmented-control.');
  }
  if (facts.hostCount < 12) {
    fail(`Expected at least 12 p-segmented-control-item hosts, found ${facts.hostCount}`);
  }
  if (facts.parentCount < 3) {
    fail(`Expected at least 3 parent p-segmented-control hosts, found ${facts.parentCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-segmented-control-item is not hydrated');
    if (item.parentTag !== 'P-SEGMENTED-CONTROL') fail(`item parent is ${item.parentTag}`);
    if (!item.hasButton) fail('item is missing button');
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-segmented-control-item host is ${item.hostRect.width}x${item.hostRect.height}`);
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
        customElements.get('p-segmented-control') &&
        customElements.get('p-segmented-control-item') &&
        customElements.get('p-icon'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="segmented-control"] p-segmented-control-item.hydrated', {
      timeout: 20_000,
    });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content: ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const items = [...document.querySelectorAll('[data-card="segmented-control"] p-segmented-control-item')];
      return (
        items.length >= 12 &&
        items.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          if (el.parentElement?.tagName !== 'P-SEGMENTED-CONTROL') return false;
          if (!el.shadowRoot?.querySelector('button')) return false;
          const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
            (icon) => getComputedStyle(icon).display !== 'none',
          );
          return icons.every(
            (icon) => icon.classList.contains('hydrated') && icon.shadowRoot?.querySelector('img')?.complete,
          );
        })
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="segmented-control"]').boundingBox();
    if (!box) fail('Segmented-control card has no bounding box');
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
