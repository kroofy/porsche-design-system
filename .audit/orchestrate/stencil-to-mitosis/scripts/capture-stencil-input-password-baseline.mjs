#!/usr/bin/env node
/**
 * Capture a live Stencil p-input-password baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-input-password-baseline.mjs
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

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=input-password';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_input_password_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_password_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-input-password-baseline: ${message}`);
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
    await customElements.whenDefined('p-input-password');
    const card = document.querySelector('[data-card="input-password"]');
    const hosts = [...document.querySelectorAll('[data-card="input-password"] p-input-password')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const spinner = el.shadowRoot?.querySelector('p-spinner');
        const icon = el.shadowRoot?.querySelector('p-icon');
        const input = el.shadowRoot?.querySelector('input');
        return {
          label: el.getAttribute('label'),
          loading: el.getAttribute('loading'),
          disabled: el.getAttribute('disabled'),
          readOnly: el.getAttribute('read-only'),
          state: el.getAttribute('state'),
          toggle: el.getAttribute('toggle'),
          hydrated: el.classList.contains('hydrated'),
          inputType: input?.getAttribute('type'),
          inputValue: input?.value,
          innerTag: spinner?.tagName ?? icon?.tagName ?? input?.tagName ?? null,
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
    fail('Input-password card is missing or hidden. Check PLAYGROUND_URL includes components=input-password.');
  }
  if (facts.hostCount < 6) {
    fail(`Expected at least 6 p-input-password hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-input-password is not hydrated');
    if (item.inputType !== 'password') fail(`input type is ${item.inputType}`);
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-input-password host is ${item.hostRect.width}x${item.hostRect.height}`);
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
      () => customElements.get('p-input-password') && customElements.get('p-icon') && customElements.get('p-spinner') && customElements.get('p-button-pure'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="input-password"] p-input-password.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="input-password"] p-input-password')];
      return (
        hosts.length >= 6 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          if (!el.shadowRoot?.querySelector('input[type="password"]')) return false;
          const spinner = el.shadowRoot?.querySelector('p-spinner');
          if (spinner && (!spinner.classList.contains('hydrated') || !spinner.shadowRoot?.querySelector('svg'))) {
            return false;
          }
          const toggle = el.shadowRoot?.querySelector('p-button-pure');
          if (toggle) {
            if (!toggle.classList.contains('hydrated')) return false;
            const innerIcon = toggle.shadowRoot?.querySelector('p-icon');
            const img = innerIcon?.shadowRoot?.querySelector('img');
            if (!innerIcon?.classList.contains('hydrated') || !img?.complete) return false;
          }
          const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])];
          return icons.every((icon) => {
            const img = icon.shadowRoot?.querySelector('img');
            return icon.classList.contains('hydrated') && img?.complete;
          });
        })
      );
    });
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--p-animation-duration', '0s');
    });

    const facts = await collectFacts(page);
    assertLive(facts);

    const box = await page.locator('[data-card="input-password"]').boundingBox();
    if (!box) fail('Input-email card has no bounding box');
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
