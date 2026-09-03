#!/usr/bin/env node
/**
 * Capture a live Stencil p-divider baseline from the component playground.
 *
 * Prerequisites: Stencil watch server already running.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-divider-baseline.mjs
 *
 * Env:
 *   PLAYGROUND_URL   default http://localhost:3333/?components=divider
 *   ARTIFACT_PNG     default /opt/cursor/artifacts/stencil_divider_before.png
 *   BASELINE_PNG     default <repo>/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_divider_before.png
 *   CHROME_PATH      optional Chrome/Chromium binary
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=divider';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_divider_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_divider_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/usr/local/bin/google-chrome',
  '/usr/local/bin/chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

function fail(message) {
  console.error(`capture-stencil-divider-baseline: ${message}`);
  process.exit(1);
}

async function launchBrowser() {
  const launchArgs = ['--no-sandbox', '--disable-dev-shm-usage'];

  for (const executablePath of CHROME_CANDIDATES) {
    try {
      return await chromium.launch({ executablePath, headless: true, args: launchArgs });
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      console.warn(`Chrome at ${executablePath} failed: ${reason}`);
    }
  }

  try {
    return await chromium.launch({ headless: true, args: launchArgs });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    fail(
      `Could not launch Chrome or Playwright Chromium. Install a browser or set CHROME_PATH. Last error: ${reason}`
    );
  }
}

async function collectDividerFacts(page) {
  return page.evaluate(async () => {
    await customElements.whenDefined('p-divider');
    const card = document.querySelector('[data-card="divider"]');
    const dividers = [...document.querySelectorAll('p-divider')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      dividerCount: dividers.length,
      dividers: dividers.map((el) => {
        const hr = el.shadowRoot?.querySelector('hr');
        const hrStyle = hr ? getComputedStyle(hr) : null;
        return {
          color: el.getAttribute('color'),
          direction: el.getAttribute('direction') ?? 'horizontal',
          hydrated: el.classList.contains('hydrated'),
          hostRect: el.getBoundingClientRect().toJSON(),
          hr: hrStyle
            ? {
                background: hrStyle.backgroundColor,
                width: hrStyle.width,
                height: hrStyle.height,
                display: hrStyle.display,
              }
            : null,
        };
      }),
    };
  });
}

function assertLiveDivider(facts) {
  if (facts.title !== 'Playground') {
    fail(`Expected page title "Playground", got ${JSON.stringify(facts.title)}`);
  }
  if (!facts.cardRect || facts.cardDisplay === 'none') {
    fail('Divider card is missing or hidden. Check PLAYGROUND_URL includes components=divider.');
  }
  if (facts.dividerCount < 4) {
    fail(`Expected at least 4 p-divider hosts, found ${facts.dividerCount}`);
  }

  const horizontal = facts.dividers.filter((item) => item.direction === 'horizontal');
  if (horizontal.length < 4) {
    fail(`Expected 4 horizontal p-divider hosts, found ${horizontal.length}`);
  }

  for (const item of horizontal) {
    if (!item.hydrated) fail(`p-divider color=${item.color} is not hydrated`);
    if (!item.hr) fail(`p-divider color=${item.color} has no shadow <hr>`);
    if (item.hr.height !== '1px') fail(`p-divider color=${item.color} hr height is ${item.hr.height}, expected 1px`);
    const widthPx = Number.parseFloat(item.hr.width);
    if (!(widthPx > 100)) fail(`p-divider color=${item.color} hr width is ${item.hr.width}, expected >100px`);
  }
}

async function assertPngShowsHorizontalRule(pngPath) {
  const png = sharp(pngPath);
  const metadata = await png.metadata();
  if (metadata.format !== 'png') fail(`${pngPath} is ${metadata.format}, not png`);
  if (!metadata.width || !metadata.height) fail(`${pngPath} has no dimensions`);
  if (metadata.width < 200 || metadata.height < 100) {
    fail(`${pngPath} is ${metadata.width}x${metadata.height}, too small for the divider card`);
  }

  const { data, info } = await png.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  // Sample the middle of the card. Padding and rounded corners would dilute a full-width mean.
  const x0 = Math.floor(width * 0.25);
  const x1 = Math.floor(width * 0.75);
  const rowMeans = [];

  for (let y = 0; y < height; y++) {
    let sum = 0;
    for (let x = x0; x < x1; x++) {
      const i = (y * width + x) * channels;
      sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    }
    rowMeans.push(sum / (x1 - x0));
  }

  const imageMean = rowMeans.reduce((acc, value) => acc + value, 0) / rowMeans.length;
  const darkRows = [];
  for (let y = 0; y < height; y++) {
    if (rowMeans[y] < imageMean - 20) {
      darkRows.push({ y, mean: Number(rowMeans[y].toFixed(1)) });
    }
  }

  // Merge adjacent dark rows. deviceScaleFactor=2 turns each 1px rule into a 2px band.
  const bands = [];
  for (const row of darkRows) {
    const last = bands[bands.length - 1];
    if (last && row.y === last.yEnd + 1) {
      last.yEnd = row.y;
      last.rows.push(row);
    } else {
      bands.push({ yStart: row.y, yEnd: row.y, rows: [row] });
    }
  }

  const ruleBands = bands.filter((band) => band.yEnd - band.yStart + 1 <= 4);
  if (ruleBands.length < 3) {
    fail(
      `${pngPath} does not show enough horizontal rules (found ${ruleBands.length} dark bands). Image mean luminance=${imageMean.toFixed(1)}`
    );
  }

  return {
    width,
    height,
    format: metadata.format,
    imageMean: Number(imageMean.toFixed(1)),
    darkBandCount: ruleBands.length,
    darkBands: ruleBands.map((band) => ({
      y: band.yStart === band.yEnd ? band.yStart : `${band.yStart}-${band.yEnd}`,
      mean: Number((band.rows.reduce((acc, row) => acc + row.mean, 0) / band.rows.length).toFixed(1)),
    })),
  };
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

    await page.waitForFunction(() => customElements.get('p-divider'), { timeout: 20_000 });
    await page.waitForSelector('[data-card="divider"] p-divider.hydrated', { timeout: 20_000 });

    const facts = await collectDividerFacts(page);
    assertLiveDivider(facts);

    const card = page.locator('[data-card="divider"]');
    await card.scrollIntoViewIfNeeded();
    const png = await card.screenshot({ type: 'png' });

    await mkdir(dirname(ARTIFACT_PNG), { recursive: true });
    await mkdir(dirname(BASELINE_PNG), { recursive: true });
    await writeFile(ARTIFACT_PNG, png);
    await copyFile(ARTIFACT_PNG, BASELINE_PNG);

    const pixels = await assertPngShowsHorizontalRule(ARTIFACT_PNG);

    const summary = {
      url: PLAYGROUND_URL,
      artifact: ARTIFACT_PNG,
      baseline: BASELINE_PNG,
      viewport: VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      facts,
      pixels,
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
