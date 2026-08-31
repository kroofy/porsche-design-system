#!/usr/bin/env node
import { createHash } from 'node:crypto';
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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=segmented-control';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_segmented_control_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_segmented_control_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_segmented_control_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 36882;
const EXPECTED_BASELINE_SHA = '5148d29f2ff83572c9584e06db603f012427de781ffe708a460b9e92fb0f3c5f';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const baselineBuf = await readFile(BASELINE_PNG);
if (baselineBuf.byteLength !== EXPECTED_BASELINE_BYTES) {
  throw new Error(`baseline bytes ${baselineBuf.byteLength} !== ${EXPECTED_BASELINE_BYTES}`);
}
const baselineSha = sha256(baselineBuf);
if (baselineSha !== EXPECTED_BASELINE_SHA) {
  throw new Error(`baseline sha ${baselineSha} !== ${EXPECTED_BASELINE_SHA}`);
}

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-segmented-control.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`IIFE HTTP ${iifeAsset.status()}`);
}

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-segmented-control') &&
    customElements.get('p-segmented-control-item') &&
    customElements.get('p-icon'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content: ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; }',
});
await page.waitForSelector('[data-card="segmented-control"] p-segmented-control', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="segmented-control"] > p-segmented-control')];
  const Ctor = customElements.get('p-segmented-control');
  const Item = customElements.get('p-segmented-control-item');
  const Icon = customElements.get('p-icon');
  return (
    hosts.length === 3 &&
    Ctor?.name === 'LitSegmentedControl' &&
    Item &&
    Item.name !== 'LitSegmentedControl' &&
    Icon?.name === 'LitIcon' &&
    hosts.every((el) => {
      const root = el.shadowRoot;
      const style = root?.querySelector('style');
      const fieldset = root?.querySelector('fieldset.root');
      if (!root || !style || !fieldset) return false;
      if (el.classList.contains('hydrated')) return false;
      if (root.querySelector('my-fragment') || root.querySelector('lit-segmented-control')) return false;
      if (root.querySelector('.label-wrapper')) return false;
      if (!style.textContent?.includes('repeat(auto-fit,')) return false;
      const items = [...el.querySelectorAll('p-segmented-control-item')];
      if (items.length !== 4) return false;
      if (items.some((item) => item.constructor?.name === 'LitSegmentedControl')) return false;
      return true;
    })
  );
}, { timeout: 20_000 });

const proof = await page.evaluate(() => {
  const Ctor = customElements.get('p-segmented-control');
  const hosts = [...document.querySelectorAll('[data-card="segmented-control"] > p-segmented-control')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    definedTag: 'p-segmented-control',
    litTagDefined: !!customElements.get('lit-segmented-control'),
    itemCtor: customElements.get('p-segmented-control-item')?.name ?? null,
    iconCtor: customElements.get('p-icon')?.name ?? null,
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const fieldset = el.shadowRoot?.querySelector('fieldset.root');
      const items = [...el.querySelectorAll(':scope > p-segmented-control-item')];
      return {
        tag: el.localName,
        disabled: el.getAttribute('disabled'),
        className: el.className,
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        hasFieldset: !!fieldset,
        fieldsetDisabled: fieldset?.disabled ?? null,
        hasLabelWrapper: !!el.shadowRoot?.querySelector('.label-wrapper'),
        grid: style?.textContent?.match(/repeat\(auto-fit,[^)]+\)/)?.[0] ?? null,
        itemCount: items.length,
        itemTags: [...new Set(items.map((item) => item.tagName))],
        itemCtors: [...new Set(items.map((item) => item.constructor?.name))],
        itemDisabledParent: items.map((item) => !!item.disabledParent),
        iconCtors: [
          ...new Set(
            items.flatMap((item) =>
              [...(item.shadowRoot?.querySelectorAll('p-icon') ?? [])].map((icon) => icon.constructor?.name)
            )
          ),
        ],
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});

const box = await page.locator('[data-card="segmented-control"]').boundingBox();
if (!box) {
  console.error('land-segmented-control-pixel-diff: card has no bounding box');
  process.exit(1);
}
const clip = {
  x: Math.max(0, box.x),
  y: Math.max(0, box.y),
  width: box.width,
  height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
};
await mkdir(dirname(AFTER_PNG), { recursive: true });
let png;
try {
  png = await page.screenshot({ type: 'png', clip });
} catch {
  const needed = Math.ceil(clip.y + clip.height + 8);
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
  proof.ctorName !== 'LitSegmentedControl' ||
  proof.litTagDefined ||
  proof.hostCount !== 3 ||
  proof.iconCtor !== 'LitIcon' ||
  proof.itemCtor === 'LitSegmentedControl' ||
  proof.hosts.some((h) => {
    return (
      h.tag !== 'p-segmented-control' ||
      h.className !== 'w-full' ||
      !h.hasShadow ||
      !h.hasStyle ||
      !h.hasFieldset ||
      h.hasLabelWrapper ||
      h.itemCount !== 4 ||
      h.hydrated ||
      h.hasFragment ||
      !h.grid
    );
  }) ||
  proof.hosts[1]?.disabled !== 'true' ||
  proof.hosts[1]?.fieldsetDisabled !== true ||
  consoleErrors.length > 0;

const summary = {
  playground: PLAYGROUND_URL,
  baseline: BASELINE_PNG,
  baselineBytes: baselineBuf.byteLength,
  baselineSha,
  after: AFTER_PNG,
  afterBytes: png.byteLength,
  afterSha: sha256(png),
  proof,
  litVsBaseline: result,
  consoleErrors,
  failed,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failed ? 1 : 0);
