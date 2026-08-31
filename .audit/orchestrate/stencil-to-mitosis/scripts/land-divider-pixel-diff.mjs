#!/usr/bin/env node
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=divider';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_divider_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_divider_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_divider_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-divider'), { timeout: 20_000 });
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="divider"] p-divider')];
  return (
    hosts.length >= 4 &&
    hosts.every((el) => el.shadowRoot?.querySelector('hr') && el.shadowRoot.querySelector('style'))
  );
}, { timeout: 20_000 });

const proof = await page.evaluate(() => {
  const Ctor = customElements.get('p-divider');
  const hosts = [...document.querySelectorAll('[data-card="divider"] p-divider')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    definedTag: 'p-divider',
    litDividerDefined: !!customElements.get('lit-divider'),
    hostCount: hosts.length,
    hosts: hosts.map((el) => ({
      tag: el.localName,
      color: el.getAttribute('color'),
      direction: el.getAttribute('direction'),
      hydrated: el.classList.contains('hydrated'),
      hasShadow: !!el.shadowRoot,
      hasStyle: !!el.shadowRoot?.querySelector('style'),
      hasHr: !!el.shadowRoot?.querySelector('hr'),
      hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      styleText: el.shadowRoot?.querySelector('style')?.textContent?.slice(0, 120) ?? null,
    })),
  };
});

const card = page.locator('[data-card="divider"]');
await card.scrollIntoViewIfNeeded();
await mkdir(dirname(AFTER_PNG), { recursive: true });
await writeFile(AFTER_PNG, await card.screenshot({ type: 'png' }));
await browser.close();

const a = PNG.sync.read(await readFile(BASELINE_PNG));
const b = PNG.sync.read(await readFile(AFTER_PNG));
const result = { aSize: `${a.width}x${a.height}`, bSize: `${b.width}x${b.height}` };
if (a.width !== b.width || a.height !== b.height) {
  result.error = 'dimension mismatch, no per-pixel diff possible';
} else {
  const diff = new PNG({ width: a.width, height: a.height });
  result.strictMismatch = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
    threshold: 0,
    includeAA: true,
  });
  result.perceptualMismatch = pixelmatch(a.data, b.data, null, a.width, a.height, { threshold: 0.1 });
  result.totalPixels = a.width * a.height;
  result.diffPng = DIFF_PNG;
  await writeFile(DIFF_PNG, PNG.sync.write(diff));
}

const failed =
  !!result.error ||
  result.strictMismatch !== 0 ||
  proof.title !== 'Playground' ||
  !proof.isLit ||
  proof.litDividerDefined ||
  proof.hosts.some((h) => h.tag !== 'p-divider' || !h.hasStyle || !h.hasHr || h.hasFragment) ||
  consoleErrors.length > 0;

const summary = {
  playground: PLAYGROUND_URL,
  baseline: BASELINE_PNG,
  after: AFTER_PNG,
  proof,
  litVsBaseline: result,
  consoleErrors,
  failed,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failed ? 1 : 0);
