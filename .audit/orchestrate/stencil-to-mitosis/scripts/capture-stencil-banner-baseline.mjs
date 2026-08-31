#!/usr/bin/env node
/**
 * Capture a live Stencil p-banner baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-banner-baseline.mjs
 *
 * Nested p-heading / p-text / p-button stay Stencil. Pause animation and
 * transition duration so the open top-layer popover is not mid-frame.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=banner';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_banner_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_banner_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-banner-baseline: ${message}`);
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
    await customElements.whenDefined('p-banner');
    const card = document.querySelector('[data-card="banner"]');
    const hosts = [...document.querySelectorAll('[data-card="banner"] p-banner')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const pop = el.shadowRoot?.querySelector('[popover]');
        const root = el.shadowRoot?.querySelector('.notification');
        const dismiss = root?.querySelector('button.dismiss');
        return {
          open: el.getAttribute('open'),
          state: el.getAttribute('state'),
          heading: el.getAttribute('heading'),
          headingTag: el.getAttribute('heading-tag'),
          dismissButton: el.getAttribute('dismiss-button'),
          hydrated: el.classList.contains('hydrated'),
          hasPopover: !!pop,
          popoverOpen: !!pop?.matches(':popover-open'),
          hasNotification: !!root,
          role: pop?.getAttribute('role'),
          hasDismiss: !!dismiss,
          slottedHeading: !!el.querySelector(':scope > [slot="heading"]'),
          hostRect: el.getBoundingClientRect().toJSON(),
          popRect: pop ? pop.getBoundingClientRect().toJSON() : null,
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
    fail('Banner card is missing or hidden. Check PLAYGROUND_URL includes components=banner.');
  }
  if (facts.hostCount < 5) {
    fail(`Expected at least 5 p-banner hosts, found ${facts.hostCount}`);
  }
  const openHosts = facts.hosts.filter((item) => item.open === 'true' || item.open === '');
  if (openHosts.length !== 1) {
    fail(`Expected 1 open p-banner, found ${openHosts.length}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail(`p-banner state=${item.state} is not hydrated`);
    if (!item.hasPopover) fail('missing [popover]');
    if (!item.hasNotification) fail('missing .notification');
  }
  if (!openHosts[0].popoverOpen) fail('open p-banner is not :popover-open');
  if (!(openHosts[0].popRect.width > 4) || !(openHosts[0].popRect.height > 4)) {
    fail(`open popover is ${openHosts[0].popRect.width}x${openHosts[0].popRect.height}`);
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
      () => customElements.get('p-banner') && customElements.get('p-button') && customElements.get('p-heading'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="banner"] p-banner.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--p-animation-duration', '0s');
      document.documentElement.style.setProperty('--p-transition-duration', '0s');
    });
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="banner"] p-banner')];
      return (
        hosts.length >= 5 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          if (!el.shadowRoot?.querySelector('[popover]')) return false;
          if (!el.shadowRoot?.querySelector('.notification')) return false;
          const isOpen = el.getAttribute('open') === 'true' || el.getAttribute('open') === '';
          if (isOpen && !el.shadowRoot.querySelector('[popover]')?.matches(':popover-open')) return false;
          const light = [...el.querySelectorAll(':scope > p-heading, :scope > p-text')];
          return light.every((child) => child.classList.contains('hydrated'));
        })
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="banner"]').boundingBox();
    if (!box) fail('Banner card has no bounding box');
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
