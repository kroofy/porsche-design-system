#!/usr/bin/env node
/**
 * Capture a live Stencil p-inline-notification baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-inline-notification-baseline.mjs
 *
 * Nested p-icon / p-button / p-spinner / p-button-pure stay Stencil.
 * Pause loading animation with --p-animation-duration: 0s.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=inline-notification';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_inline_notification_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_inline_notification_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-inline-notification-baseline: ${message}`);
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
    await customElements.whenDefined('p-inline-notification');
    const card = document.querySelector('[data-card="inline-notification"]');
    const hosts = [...document.querySelectorAll('[data-card="inline-notification"] p-inline-notification')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const root = el.shadowRoot?.querySelector('.notification');
        const action = root?.querySelector('p-button-pure');
        const dismiss = root?.querySelector('button.dismiss');
        return {
          state: el.getAttribute('state'),
          heading: el.getAttribute('heading'),
          dismissButton: el.getAttribute('dismiss-button'),
          actionLabel: el.getAttribute('action-label'),
          actionLoading: el.getAttribute('action-loading'),
          hydrated: el.classList.contains('hydrated'),
          hasNotification: !!root,
          role: root?.getAttribute('role'),
          actionTag: action?.tagName ?? null,
          actionHydrated: action?.classList.contains('hydrated') ?? null,
          hasDismiss: !!dismiss,
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
    fail('Inline-notification card is missing or hidden. Check PLAYGROUND_URL includes components=inline-notification.');
  }
  if (facts.hostCount < 11) {
    fail(`Expected at least 11 p-inline-notification hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail(`p-inline-notification state=${item.state} is not hydrated`);
    if (!item.hasNotification) fail('missing .notification');
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-inline-notification host is ${item.hostRect.width}x${item.hostRect.height}`);
    }
    if (item.actionTag && item.actionTag !== 'P-BUTTON-PURE') {
      fail(`action tag is ${item.actionTag}`);
    }
    if (item.actionTag && !item.actionHydrated) fail('p-button-pure action is not hydrated');
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
      () => customElements.get('p-inline-notification') && customElements.get('p-button-pure'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="inline-notification"] p-inline-notification.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--p-animation-duration', '0s');
    });
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="inline-notification"] p-inline-notification')];
      return (
        hosts.length >= 11 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          if (!el.shadowRoot?.querySelector('.notification')) return false;
          const action = el.shadowRoot.querySelector('p-button-pure');
          return !action || action.classList.contains('hydrated');
        })
      );
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="inline-notification"]').boundingBox();
    if (!box) fail('Inline-notification card has no bounding box');
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
