#!/usr/bin/env node
/**
 * Capture a live Stencil p-popover baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-popover-baseline.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=popover';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_popover_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_popover_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-popover-baseline: ${message}`);
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
    await customElements.whenDefined('p-popover');
    const card = document.querySelector('[data-card="popover"]');
    const hosts = [...document.querySelectorAll('[data-card="popover"] p-popover')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const pop = el.shadowRoot?.querySelector('[popover]');
        const isOpen = el.getAttribute('open') === 'true' || el.open === true;
        return {
          open: el.getAttribute('open'),
          direction: el.getAttribute('direction'),
          description: el.getAttribute('description'),
          hydrated: el.classList.contains('hydrated'),
          hasPopover: !!pop,
          popoverOpen: !!pop?.matches(':popover-open'),
          positioned: !!(pop?.style.left && pop?.style.top),
          slottedButton: el.querySelector(':scope > [slot="button"]')?.tagName ?? null,
          text: el.querySelector(':scope > p-text')?.tagName ?? null,
          isOpen,
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
    fail('Popover card is missing or hidden. Check PLAYGROUND_URL includes components=popover.');
  }
  if (facts.hostCount < 10) {
    fail(`Expected at least 10 p-popover hosts, found ${facts.hostCount}`);
  }
  const opens = facts.hosts.filter((item) => item.isOpen);
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-popover is not hydrated');
    if (!item.hasPopover) fail('missing [popover] panel');
  }
  if (opens.length < 2) fail('expected at least 2 initially-open popovers');
  for (const item of opens) {
    if (!item.popoverOpen) fail('open host is not :popover-open');
    if (!item.positioned) fail('open host is not positioned');
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
        customElements.get('p-popover') &&
        customElements.get('p-button-pure') &&
        customElements.get('p-button') &&
        customElements.get('p-text'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="popover"] p-popover.hydrated', {
      timeout: 20_000,
      state: 'attached',
    });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="popover"] p-popover')];
      return (
        hosts.length >= 10 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          const pop = el.shadowRoot?.querySelector('[popover]');
          if (!pop) return false;
          const isOpen = el.getAttribute('open') === 'true' || el.open === true;
          if (isOpen && (!pop.matches(':popover-open') || !pop.style.left || !pop.style.top)) return false;
          return true;
        })
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="popover"]').boundingBox();
    if (!box) fail('Popover card has no bounding box');
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
