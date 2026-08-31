#!/usr/bin/env node
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const requireRoot = createRequire('/workspace/package.json');
const requireProbe = createRequire('/workspace/packages/mitosis-probe-lit/package.json');
const { chromium } = requireRoot('playwright-core');
const pixelmatchMod = requireProbe('pixelmatch');
const pixelmatch = pixelmatchMod.default ?? pixelmatchMod;
const pngjs = requireProbe('pngjs');
const { PNG } = pngjs.PNG ? pngjs : pngjs.default ?? pngjs;

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=display';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_display_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_display_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_display_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-display'), { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="display"] p-display')];
  return (
    hosts.length >= 4 &&
    hosts.every((el) => {
      const h3 = el.shadowRoot?.querySelector('h3');
      return (
        !!el.shadowRoot?.querySelector('style') &&
        !!h3 &&
        !!el.shadowRoot.querySelector('slot') &&
        (el.textContent?.trim().length ?? 0) > 0
      );
    })
  );
}, { timeout: 20_000 });

const proof = await page.evaluate(() => {
  const Ctor = customElements.get('p-display');
  const hosts = [...document.querySelectorAll('[data-card="display"] p-display')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    definedTag: 'p-display',
    litDisplayDefined: !!customElements.get('lit-display'),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const h3 = el.shadowRoot?.querySelector('h3');
      const css = h3 ? getComputedStyle(h3) : null;
      return {
        tag: el.localName,
        size: el.getAttribute('size'),
        color: el.getAttribute('color'),
        hydrated: el.classList.contains('hydrated'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!el.shadowRoot?.querySelector('style'),
        hasH3: !!h3,
        hasSlot: !!el.shadowRoot?.querySelector('slot'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        text: el.textContent?.trim() ?? '',
        fontSize: css?.fontSize ?? null,
        styleText: el.shadowRoot?.querySelector('style')?.textContent?.slice(0, 180) ?? null,
      };
    }),
  };
});

const box = await page.locator('[data-card="display"]').boundingBox();
if (!box) {
  console.error('land-display-pixel-diff: card has no bounding box');
  process.exit(1);
}
// Card may be taller than the 900px viewport. locator.screenshot() of a
// clipped p-canvas descendant returns an empty layout box.
const clip = {
  x: Math.max(0, box.x),
  y: Math.max(0, box.y),
  width: box.width,
  height: box.height,
};
await mkdir(dirname(AFTER_PNG), { recursive: true });
let png;
try {
  png = await page.screenshot({ type: 'png', clip });
} catch {
  const needed = Math.ceil(box.y + box.height + 8);
  await page.setViewportSize({ width: VIEWPORT.width, height: Math.max(VIEWPORT.height, needed) });
  png = await page.screenshot({ type: 'png', clip });
}
await writeFile(AFTER_PNG, png);
await browser.close();

const a = PNG.sync.read(await readFile(BASELINE_PNG));
const b = PNG.sync.read(await readFile(AFTER_PNG));
const result = { aSize: `${a.width}x${a.height}`, bSize: `${b.width}x${b.height}`, clip };
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
  proof.ctorName !== 'LitDisplay' ||
  proof.litDisplayDefined ||
  proof.hosts.some(
    (h) =>
      h.tag !== 'p-display' ||
      !h.hasStyle ||
      !h.hasH3 ||
      !h.hasSlot ||
      h.hasFragment ||
      !h.text
  ) ||
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
