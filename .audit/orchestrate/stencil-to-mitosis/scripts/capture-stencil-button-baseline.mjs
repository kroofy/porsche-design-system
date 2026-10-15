#!/usr/bin/env node
/**
 * Capture a live Stencil p-button baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-button-baseline.mjs
 *
 * Animation is paused via --p-animation-duration: 0s so loading spinners do not
 * drift between frames. Pixel-diff must apply the same pause.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=button';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_button_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_button_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-button-baseline: ${message}`);
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
    await customElements.whenDefined('p-button');
    const card = document.querySelector('[data-card="button"]');
    const hosts = [...document.querySelectorAll('[data-card="button"] p-button')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const icon = el.shadowRoot?.querySelector('p-icon');
        const spinner = el.shadowRoot?.querySelector('p-spinner');
        const root = el.shadowRoot?.querySelector('.root');
        const css = root ? getComputedStyle(root) : null;
        return {
          variant: el.getAttribute('variant'),
          icon: el.getAttribute('icon'),
          loading: el.getAttribute('loading'),
          disabled: el.getAttribute('disabled'),
          hideLabel: el.getAttribute('hide-label'),
          hydrated: el.classList.contains('hydrated'),
          innerTag: spinner?.tagName ?? icon?.tagName ?? null,
          rootTag: root?.tagName ?? null,
          text: el.textContent?.trim(),
          hostRect: el.getBoundingClientRect().toJSON(),
          background: css?.backgroundColor,
          colorComputed: css?.color,
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
    fail('Button card is missing or hidden. Check PLAYGROUND_URL includes components=button.');
  }
  if (facts.hostCount < 21) {
    fail(`Expected at least 21 p-button hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail(`p-button variant=${item.variant} is not hydrated`);
    if (item.rootTag !== 'BUTTON') fail(`root is ${item.rootTag}`);
    if (!item.text) fail(`p-button variant=${item.variant} has empty text`);
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-button host is ${item.hostRect.width}x${item.hostRect.height}`);
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
      () => customElements.get('p-button') && customElements.get('p-icon') && customElements.get('p-spinner'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="button"] p-button.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="button"] p-button')];
      return (
        hosts.length >= 21 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          const spinner = el.shadowRoot?.querySelector('p-spinner');
          const icon = el.shadowRoot?.querySelector('p-icon');
          if (spinner) {
            return spinner.classList.contains('hydrated') && !!spinner.shadowRoot?.querySelector('svg');
          }
          if (icon) {
            const img = icon.shadowRoot?.querySelector('img');
            return icon.classList.contains('hydrated') && img?.complete;
          }
          return true;
        })
      );
    });
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--p-animation-duration', '0s');
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="button"]').boundingBox();
    if (!box) fail('Button card has no bounding box');
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
