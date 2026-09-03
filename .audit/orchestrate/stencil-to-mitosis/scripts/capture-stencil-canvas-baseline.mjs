#!/usr/bin/env node
/**
 * Capture a live Stencil p-canvas chrome baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-canvas-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=divider';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_canvas_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_canvas_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-canvas-baseline: ${message}`);
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
    await customElements.whenDefined('p-canvas');
    const host = document.querySelector('p-canvas');
    const sr = host?.shadowRoot;
    const header = sr?.querySelector('.header');
    const startHeader = sr?.querySelector('.sidebar__header--start');
    const endHeader = sr?.querySelector('.sidebar__header--end');
    const rect = (n) => (n ? n.getBoundingClientRect().toJSON() : null);
    return {
      title: document.title,
      href: location.href,
      hostCount: document.querySelectorAll('p-canvas').length,
      hydrated: host?.classList.contains('hydrated') ?? false,
      sidebarStartOpen: host?.getAttribute('sidebar-start-open'),
      sidebarEndOpen: host?.getAttribute('sidebar-end-open'),
      background: host?.background,
      hasRoot: !!sr?.querySelector('.root'),
      hasHeader: !!header,
      hasStart: !!sr?.querySelector('.sidebar--start'),
      hasEnd: !!sr?.querySelector('.sidebar--end'),
      crestHydrated: sr?.querySelector('p-crest')?.classList.contains('hydrated') ?? false,
      wordmarkHydrated: sr?.querySelector('p-wordmark')?.classList.contains('hydrated') ?? false,
      header: rect(header),
      startHeader: rect(startHeader),
      endHeader: rect(endHeader),
    };
  });
}

function assertLive(facts) {
  if (facts.title !== 'Playground') {
    fail(`Expected page title "Playground", got ${JSON.stringify(facts.title)}`);
  }
  if (facts.hostCount !== 1) fail(`Expected 1 p-canvas host, found ${facts.hostCount}`);
  if (!facts.hydrated) fail('p-canvas is not hydrated');
  if (facts.sidebarStartOpen !== 'true' || facts.sidebarEndOpen !== 'true') fail('expected both sidebars open');
  if (!facts.hasRoot || !facts.hasHeader || !facts.hasStart || !facts.hasEnd) fail('missing chrome');
  if (!facts.crestHydrated || !facts.wordmarkHydrated) fail('crest/wordmark not hydrated');
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

    await page.waitForFunction(() => customElements.get('p-canvas') && customElements.get('p-button'), {
      timeout: 20_000,
    });
    await page.waitForSelector('p-canvas.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const host = document.querySelector('p-canvas');
      const sr = host?.shadowRoot;
      return (
        host?.classList.contains('hydrated') &&
        sr?.querySelector('.header') &&
        sr?.querySelector('p-crest')?.classList.contains('hydrated') &&
        sr?.querySelector('p-wordmark')?.classList.contains('hydrated')
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.evaluate(() => {
      const sr = document.querySelector('p-canvas')?.shadowRoot;
      const nodes = [
        sr?.querySelector('.header'),
        sr?.querySelector('.sidebar__header--start'),
        sr?.querySelector('.sidebar__header--end'),
      ].filter(Boolean);
      const rects = nodes.map((n) => n.getBoundingClientRect());
      const left = Math.min(...rects.map((r) => r.left));
      const top = Math.min(...rects.map((r) => r.top));
      const right = Math.max(...rects.map((r) => r.right));
      const bottom = Math.max(...rects.map((r) => r.bottom));
      return { x: left, y: top, width: right - left, height: bottom - top };
    });
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
