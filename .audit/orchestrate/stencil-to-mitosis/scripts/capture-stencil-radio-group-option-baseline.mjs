#!/usr/bin/env node
/**
 * Capture a live Stencil p-radio-group-option baseline from the playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-radio-group-option-baseline.mjs
 *
 * Parent p-radio-group stays Stencil. Nested p-icon / p-spinner stay Stencil.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=radio-group';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_radio_group_option_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_radio_group_option_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-radio-group-option-baseline: ${message}`);
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
    await customElements.whenDefined('p-radio-group-option');
    const card = document.querySelector('[data-card="radio-group"]');
    const hosts = [...document.querySelectorAll('[data-card="radio-group"] p-radio-group-option')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      parentCount: document.querySelectorAll('[data-card="radio-group"] p-radio-group').length,
      hosts: hosts.map((el) => {
        const input = el.shadowRoot?.querySelector('input[type="radio"]');
        const spinners = [...(el.shadowRoot?.querySelectorAll('p-spinner') ?? [])];
        return {
          parentTag: el.parentElement?.tagName ?? null,
          value: el.getAttribute('value'),
          label: el.getAttribute('label'),
          disabled: el.getAttribute('disabled'),
          loading: el.getAttribute('loading'),
          hydrated: el.classList.contains('hydrated'),
          hasInput: !!input,
          spinnerTags: spinners.map((n) => n.tagName),
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
    fail('Radio-group card is missing or hidden. Check PLAYGROUND_URL includes components=radio-group.');
  }
  if (facts.hostCount < 25) {
    fail(`Expected at least 25 p-radio-group-option hosts, found ${facts.hostCount}`);
  }
  if (facts.parentCount < 5) {
    fail(`Expected at least 5 parent p-radio-group hosts, found ${facts.parentCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-radio-group-option is not hydrated');
    if (item.parentTag !== 'P-RADIO-GROUP') fail(`item parent is ${item.parentTag}`);
    if (!item.hasInput) fail('item is missing radio input');
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-radio-group-option host is ${item.hostRect.width}x${item.hostRect.height}`);
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
        customElements.get('p-radio-group') &&
        customElements.get('p-radio-group-option') &&
        customElements.get('p-icon') &&
        customElements.get('p-spinner'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="radio-group"] p-radio-group-option.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content: ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const items = [...document.querySelectorAll('[data-card="radio-group"] p-radio-group-option')];
      return (
        items.length >= 25 &&
        items.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          if (el.parentElement?.tagName !== 'P-RADIO-GROUP') return false;
          if (!el.shadowRoot?.querySelector('input[type="radio"]')) return false;
          const spinners = [...(el.shadowRoot?.querySelectorAll('p-spinner') ?? [])].filter(
            (spinner) => getComputedStyle(spinner).display !== 'none',
          );
          return spinners.every(
            (spinner) => spinner.classList.contains('hydrated') && spinner.shadowRoot?.querySelector('svg'),
          );
        })
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="radio-group"]').boundingBox();
    if (!box) fail('Radio-group card has no bounding box');
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
