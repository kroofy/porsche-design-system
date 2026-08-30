#!/usr/bin/env node
/**
 * Capture a live Stencil p-link baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-link-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=link';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_link_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-link-baseline: ${message}`);
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
    await customElements.whenDefined('p-link');
    const card = document.querySelector('[data-card="link"]');
    const hosts = [...document.querySelectorAll('[data-card="link"] p-link')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const icon = el.shadowRoot?.querySelector('p-icon');
        const root = el.shadowRoot?.querySelector('.root');
        const css = root ? getComputedStyle(root) : null;
        return {
          variant: el.getAttribute('variant'),
          icon: el.getAttribute('icon'),
          hideLabel: el.getAttribute('hide-label'),
          hydrated: el.classList.contains('hydrated'),
          iconHydrated: icon ? icon.classList.contains('hydrated') : null,
          innerTag: icon?.tagName ?? null,
          rootTag: root?.tagName ?? null,
          text: el.textContent?.trim(),
          hostRect: el.getBoundingClientRect().toJSON(),
          background: css?.backgroundColor,
          color: css?.color,
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
    fail('Link card is missing or hidden. Check PLAYGROUND_URL includes components=link.');
  }
  if (facts.hostCount < 7) {
    fail(`Expected at least 7 p-link hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail(`p-link variant=${item.variant} is not hydrated`);
    if (item.icon && item.innerTag !== 'P-ICON') fail(`inner icon is ${item.innerTag}`);
    if (item.icon && !item.iconHydrated) fail(`p-link icon=${item.icon} inner p-icon is not hydrated`);
    if (item.rootTag !== 'SPAN') fail(`root is ${item.rootTag}`);
    if (!item.text) fail(`p-link variant=${item.variant} has empty text`);
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-link host is ${item.hostRect.width}x${item.hostRect.height}`);
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

    await page.waitForFunction(() => customElements.get('p-link') && customElements.get('p-icon'), {
      timeout: 20_000,
    });
    await page.waitForSelector('[data-card="link"] p-link.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="link"] p-link')];
      return (
        hosts.length >= 7 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          const icon = el.shadowRoot?.querySelector('p-icon');
          if (!icon) return true;
          const img = icon.shadowRoot?.querySelector('img');
          return icon.classList.contains('hydrated') && img?.complete;
        })
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="link"]').boundingBox();
    if (!box) fail('Link card has no bounding box');
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
