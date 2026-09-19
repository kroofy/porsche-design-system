#!/usr/bin/env node
/**
 * Capture a live Stencil p-pin-code baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-pin-code-baseline.mjs
 *
 * Nested p-icon / p-spinner stay Stencil. Pause loading with --p-animation-duration: 0s.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=pin-code';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_pin_code_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_pin_code_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-pin-code-baseline: ${message}`);
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
    await customElements.whenDefined('p-pin-code');
    const card = document.querySelector('[data-card="pin-code"]');
    const hosts = [...document.querySelectorAll('[data-card="pin-code"] p-pin-code')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const inputs = [...(el.shadowRoot?.querySelectorAll('input') ?? [])];
        const spinner = el.shadowRoot?.querySelector('p-spinner');
        const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
          (icon) => getComputedStyle(icon).display !== 'none',
        );
        return {
          label: el.getAttribute('label'),
          loading: el.getAttribute('loading'),
          state: el.getAttribute('state'),
          disabled: el.getAttribute('disabled'),
          hydrated: el.classList.contains('hydrated'),
          inputCount: inputs.length,
          spinnerTag: spinner?.tagName ?? null,
          spinnerHydrated: spinner ? spinner.classList.contains('hydrated') : null,
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
    fail('Pin-code card is missing or hidden. Check PLAYGROUND_URL includes components=pin-code.');
  }
  if (facts.hostCount < 5) {
    fail(`Expected at least 5 p-pin-code hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-pin-code is not hydrated');
    if (item.inputCount < 4) fail(`expected 4 inputs, got ${item.inputCount}`);
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-pin-code host is ${item.hostRect.width}x${item.hostRect.height}`);
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
      () => customElements.get('p-pin-code') && customElements.get('p-icon') && customElements.get('p-spinner'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="pin-code"] p-pin-code.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content: ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="pin-code"] p-pin-code')];
      return (
        hosts.length >= 5 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          if ((el.shadowRoot?.querySelectorAll('input').length ?? 0) < 4) return false;
          const spinner = el.shadowRoot?.querySelector('p-spinner');
          if (spinner) {
            return spinner.classList.contains('hydrated') && !!spinner.shadowRoot?.querySelector('svg');
          }
          const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
            (icon) => getComputedStyle(icon).display !== 'none',
          );
          return icons.every((icon) => icon.classList.contains('hydrated') && icon.shadowRoot?.querySelector('img')?.complete);
        })
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="pin-code"]').boundingBox();
    if (!box) fail('Pin-code card has no bounding box');
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
