#!/usr/bin/env node
/**
 * Capture a live Stencil p-tabs-bar baseline from the component playground.
 *
 *   node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-tabs-bar-baseline.mjs
 *
 * Nested p-scroller / p-icon stay Stencil. Light-DOM button/a children stay in place.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '../../../..');

const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=tabs-bar';
const ARTIFACT_PNG = process.env.ARTIFACT_PNG ?? '/opt/cursor/artifacts/stencil_tabs_bar_before.png';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_bar_before.png');

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

function fail(message) {
  console.error(`capture-stencil-tabs-bar-baseline: ${message}`);
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
    await customElements.whenDefined('p-tabs-bar');
    const card = document.querySelector('[data-card="tabs-bar"]');
    const hosts = [...document.querySelectorAll('[data-card="tabs-bar"] p-tabs-bar')];
    return {
      title: document.title,
      href: location.href,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardRect: card ? card.getBoundingClientRect().toJSON() : null,
      hostCount: hosts.length,
      hosts: hosts.map((el) => {
        const tabs = [...el.querySelectorAll(':scope > button, :scope > a')];
        const scroller = el.shadowRoot?.querySelector('p-scroller');
        const bar = el.shadowRoot?.querySelector('.bar');
        const icons = [...(scroller?.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
          (icon) => getComputedStyle(icon).display !== 'none',
        );
        return {
          activeTabIndex: el.getAttribute('active-tab-index'),
          background: el.getAttribute('background'),
          size: el.getAttribute('size'),
          hydrated: el.classList.contains('hydrated'),
          tabCount: tabs.length,
          tabTags: tabs.map((n) => n.tagName),
          scrollerTag: scroller?.tagName ?? null,
          scrollerHydrated: scroller?.classList.contains('hydrated') ?? false,
          hasBar: !!bar,
          iconTags: icons.map((n) => n.tagName),
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
    fail('Tabs-bar card is missing or hidden. Check PLAYGROUND_URL includes components=tabs-bar.');
  }
  if (facts.hostCount < 7) {
    fail(`Expected at least 7 p-tabs-bar hosts, found ${facts.hostCount}`);
  }
  for (const item of facts.hosts) {
    if (!item.hydrated) fail('p-tabs-bar is not hydrated');
    if (item.tabCount < 2) fail(`expected tabs, got ${item.tabCount}`);
    if (item.scrollerTag !== 'P-SCROLLER') fail(`scroller is ${item.scrollerTag}`);
    if (!item.scrollerHydrated) fail('nested p-scroller is not hydrated');
    if (!item.hasBar) fail('missing .bar');
    if (!(item.hostRect.width > 4) || !(item.hostRect.height > 4)) {
      fail(`p-tabs-bar host is ${item.hostRect.width}x${item.hostRect.height}`);
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
      () => customElements.get('p-tabs-bar') && customElements.get('p-scroller') && customElements.get('p-icon'),
      { timeout: 20_000 },
    );
    await page.waitForSelector('[data-card="tabs-bar"] p-tabs-bar.hydrated', { timeout: 20_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content:
        ':root { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
    });
    await page.waitForFunction(() => {
      const hosts = [...document.querySelectorAll('[data-card="tabs-bar"] p-tabs-bar')];
      return (
        hosts.length >= 7 &&
        hosts.every((el) => {
          if (!el.classList.contains('hydrated')) return false;
          const scroller = el.shadowRoot?.querySelector('p-scroller');
          if (!scroller?.classList.contains('hydrated')) return false;
          if (!el.shadowRoot?.querySelector('.bar')) return false;
          const tabs = [...el.querySelectorAll(':scope > button, :scope > a')];
          if (tabs.length < 2) return false;
          const icons = [...(scroller.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
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

    const box = await page.locator('[data-card="tabs-bar"]').boundingBox();
    if (!box) fail('Tabs-bar card has no bounding box');
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
