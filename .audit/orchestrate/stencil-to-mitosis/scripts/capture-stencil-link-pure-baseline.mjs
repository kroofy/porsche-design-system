#!/usr/bin/env node
/**
 * Capture a live Stencil p-link-pure baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-link-pure-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=link-pure';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_link_pure_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_pure_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-link-pure-baseline: ${message}`);
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
    await customElements.whenDefined('p-link-pure');
    const card = document.querySelector('[data-card="link-pure"]');
    const hosts = [...document.querySelectorAll('[data-card="link-pure"] p-link-pure')];
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
          size: el.getAttribute('size'),
          color: el.getAttribute('color'),
          hydrated: el.classList.contains('hydrated'),
          iconHydrated: icon?.classList.contains('hydrated') ?? false,
          innerTag: icon?.tagName ?? null,
          rootTag: root?.tagName ?? null,
          text: el.textContent?.trim(),
          hostRect: el.getBoundingClientRect().toJSON(),
          fontSize: css?.fontSize,
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
    fail('Link-pure card is missing or hidden. Check PLAYGROUND_URL includes components=link-pure.');
  }
  if (facts.hostCount < 12) {
    fail(`Expected at least 12 p-link-pure hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail(`p-link-pure size=${item.size} is not hydrated`);
    if (!item.iconHydrated) fail(`p-link-pure size=${item.size} inner p-icon is not hydrated`);
    if (item.innerTag !== 'P-ICON') fail(`inner icon is ${item.innerTag}`);
    if (item.rootTag !== 'SPAN') fail(`root is ${item.rootTag}`);
    if (!item.text) fail(`p-link-pure size=${item.size} has empty text`);
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-link-pure host is ${item.hostRect.width}x${item.hostRect.height}`);
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

    await page.waitForFunction(() => customElements.get('p-link-pure') && customElements.get('p-icon'), {
      timeout: 20_000,
    });
    await page.waitForSelector('[data-card="link-pure"] p-link-pure.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="link-pure"] p-link-pure')];
      return (
        hosts.length >= 12 &&
        hosts.every((el) => {
          const icon = el.shadowRoot?.querySelector('p-icon');
          const img = icon?.shadowRoot?.querySelector('img');
          return el.classList.contains('hydrated') && icon?.classList.contains('hydrated') && img?.complete;
        })
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="link-pure"]').boundingBox();
    if (!box) fail('Link-pure card has no bounding box');
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
