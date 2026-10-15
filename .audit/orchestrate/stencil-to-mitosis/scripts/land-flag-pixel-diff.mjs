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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=flag';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_flag_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_flag_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_flag_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() !== 'error') return;
  const text = msg.text();
  const url = msg.location()?.url ?? '';
  if (text.includes('ERR_CONNECTION_REFUSED') || url.includes('3002')) return;
  consoleErrors.push(text);
});
page.on('pageerror', (err) => {
  const text = String(err);
  if (text.includes('ERR_CONNECTION_REFUSED') || text.includes('3002')) return;
  consoleErrors.push(text);
});

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-flag'), { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="flag"] p-flag')];
  return (
    hosts.length >= 11 &&
    hosts.every((el) => {
      const img = el.shadowRoot?.querySelector('img');
      return (
        !el.shadowRoot?.querySelector('style') &&
        (el.shadowRoot?.adoptedStyleSheets?.length ?? 0) > 0 &&
        !!img &&
        img.complete &&
        img.naturalWidth > 0
      );
    })
  );
}, { timeout: 20_000 });

const proof = await page.evaluate(() => {
  const Ctor = customElements.get('p-flag');
  const hosts = [...document.querySelectorAll('[data-card="flag"] p-flag')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    definedTag: 'p-flag',
    litFlagDefined: !!customElements.get('lit-flag'),
    hostCount: hosts.length,
    hosts: hosts.map((el) => ({
      tag: el.localName,
      name: el.getAttribute('name'),
      size: el.getAttribute('size'),
      hydrated: el.classList.contains('hydrated'),
      hasShadow: !!el.shadowRoot,
      hasStyle: !!el.shadowRoot?.querySelector('style'),
      adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
      hasImg: !!el.shadowRoot?.querySelector('img'),
      imgComplete: !!el.shadowRoot?.querySelector('img')?.complete,
      imgNaturalWidth: el.shadowRoot?.querySelector('img')?.naturalWidth ?? 0,
      hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      styleText: el.shadowRoot?.querySelector('style')?.textContent?.slice(0, 180) ?? null,
      imgSrc: el.shadowRoot?.querySelector('img')?.getAttribute('src') ?? null,
    })),
  };
});

const box = await page.locator('[data-card="flag"]').boundingBox();
if (!box) {
  console.error('land-flag-pixel-diff: flag card has no bounding box');
  process.exit(1);
}
// The card is taller than the 900px viewport. locator.screenshot() of a
// clipped p-canvas descendant returns the layout box without the flags.
const clip = {
  x: Math.max(0, box.x),
  y: Math.max(0, box.y),
  width: box.width,
  height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
};
await mkdir(dirname(AFTER_PNG), { recursive: true });
await writeFile(AFTER_PNG, await page.screenshot({ type: 'png', clip }));
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
  proof.ctorName !== 'LitFlag' ||
  proof.litFlagDefined ||
  proof.hosts.some(
    (h) =>
      h.tag !== 'p-flag' ||
      h.hasStyle ||
      !h.adoptedSheets ||
      !h.hasImg ||
      !h.imgComplete ||
      h.imgNaturalWidth === 0 ||
      h.hasFragment
  ) ||
  consoleErrors.some((err) => !/ERR_CONNECTION_REFUSED|ERR_ABORTED/.test(err));

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
