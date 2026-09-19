#!/usr/bin/env node
/**
 * Capture a live Stencil p-select baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-select-baseline.mjs
 *
 * Nested p-select-option / p-optgroup / p-icon stay Stencil. Card stays closed.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=select';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_select_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_select_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-select-baseline: ${message}`);
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
    await customElements.whenDefined('p-select');
    const card = document.querySelector('[data-card="select"]');
    const hosts = [...document.querySelectorAll('[data-card="select"] p-select')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const options = [...el.querySelectorAll('p-select-option')];
        const groups = [...el.querySelectorAll(':scope > p-optgroup')];
        const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
          (icon) => getComputedStyle(icon).display !== 'none',
        );
        const button = el.shadowRoot?.querySelector('button');
        const popover = el.shadowRoot?.querySelector('[popover]');
        return {
          disabled: el.getAttribute('disabled'),
          state: el.getAttribute('state'),
          filter: el.getAttribute('filter'),
          hydrated: el.classList.contains('hydrated'),
          optionCount: options.length,
          groupCount: groups.length,
          optionTags: options.map((n) => n.tagName),
          groupTags: groups.map((n) => n.tagName),
          iconTags: icons.map((n) => n.tagName),
          expanded: button?.getAttribute('aria-expanded'),
          popoverOpen: popover ? popover.matches(':popover-open') : null,
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
    fail('Select card is missing or hidden. Check PLAYGROUND_URL includes components=select.');
  }
  if (facts.hostCount < 4) {
    fail(`Expected at least 4 p-select hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-select is not hydrated');
    if (item.optionCount < 5) fail(`expected 5 options, got ${item.optionCount}`);
    if (item.groupCount < 2) fail(`expected 2 optgroups, got ${item.groupCount}`);
    if (item.expanded === 'true' || item.popoverOpen) fail('select dropdown is open; capture the closed card');
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-select host is ${item.hostRect.width}x${item.hostRect.height}`);
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
        customElements.get('p-select') &&
        customElements.get('p-select-option') &&
        customElements.get('p-optgroup') &&
        customElements.get('p-icon'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="select"] p-select.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content: ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="select"] p-select')];
      return (
        hosts.length >= 4 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          const button = el.shadowRoot?.querySelector('button');
          if (!button) return false;
          if (button.getAttribute('aria-expanded') === 'true') return false;
          const options = [...el.querySelectorAll('p-select-option')];
          if (options.length < 5) return false;
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

    const box = await page.locator('[data-card="select"]').boundingBox();
    if (!box) fail('Select card has no bounding box');
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
