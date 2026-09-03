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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=fieldset';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_fieldset_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_fieldset_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_fieldset_pixel_diff.png';
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

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-fieldset') &&
    customElements.get('p-input-text') &&
    customElements.get('p-icon'),
  { timeout: 20_000 }
);
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="fieldset"] p-fieldset')];
  return (
    hosts.length >= 4 &&
    hosts.every((el) => {
      const fieldset = el.shadowRoot?.querySelector('fieldset');
      const legend = el.shadowRoot?.querySelector('legend');
      const icon = el.shadowRoot?.querySelector('.message p-icon');
      const img = icon?.shadowRoot?.querySelector('img');
      const iconHidden = !!icon && getComputedStyle(icon).display === 'none';
      const state = el.getAttribute('state');
      const message = el.getAttribute('message');
      const hasMsg = !!message && (state === 'success' || state === 'error');
      const iconOk = hasMsg
        ? !iconHidden && !!img?.complete && (img?.naturalWidth ?? 0) > 0
        : iconHidden;
      const slotted = [...el.querySelectorAll(':scope > p-input-text')];
      const slottedOk =
        slotted.length === 2 &&
        slotted.every((input) => {
          const root = input.shadowRoot?.querySelector('.root');
          return (
            input.localName === 'p-input-text' &&
            !!input.shadowRoot?.querySelector('style') &&
            root?.localName === 'div' &&
            customElements.get('p-input-text')?.name === 'LitInputText'
          );
        });
      return (
        !!el.shadowRoot?.querySelector('style') &&
        fieldset?.localName === 'fieldset' &&
        (legend?.textContent?.length ?? 0) > 0 &&
        icon?.localName === 'p-icon' &&
        !el.shadowRoot.querySelector('lit-fieldset') &&
        !el.shadowRoot.querySelector('lit-icon') &&
        !el.shadowRoot.querySelector('my-fragment') &&
        iconOk &&
        slottedOk
      );
    })
  );
}, { timeout: 20_000 });

await page.evaluate(() => {
  const root = document.documentElement.style;
  root.setProperty('--p-animation-duration', '0s');
  root.setProperty('--p-transition-duration', '0s');
  root.setProperty('--p-duration-md', '0s');
  root.setProperty('--p-duration-xl', '0s');
});

const proof = await page.evaluate(() => {
  const Ctor = customElements.get('p-fieldset');
  const hosts = [...document.querySelectorAll('[data-card="fieldset"] p-fieldset')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    iconCtorName: customElements.get('p-icon')?.name ?? null,
    inputCtorName: customElements.get('p-input-text')?.name ?? null,
    definedTag: 'p-fieldset',
    litTagDefined: !!customElements.get('lit-fieldset'),
    litIconDefined: !!customElements.get('lit-icon'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const fieldset = el.shadowRoot?.querySelector('fieldset');
      const legend = el.shadowRoot?.querySelector('legend');
      const icon = el.shadowRoot?.querySelector('.message p-icon');
      const img = icon?.shadowRoot?.querySelector('img');
      const iconHidden = !!icon && getComputedStyle(icon).display === 'none';
      const slotted = [...el.querySelectorAll(':scope > p-input-text')];
      return {
        tag: el.localName,
        label: el.getAttribute('label'),
        labelSize: el.getAttribute('label-size'),
        state: el.getAttribute('state'),
        message: el.getAttribute('message'),
        legendText: legend?.textContent ?? '',
        slottedCount: slotted.length,
        slottedTags: slotted.map((n) => n.localName),
        innerIcon: icon?.localName ?? null,
        iconName: icon?.getAttribute('name'),
        iconHidden,
        hasShadow: !!el.shadowRoot,
        hasStyle: !!el.shadowRoot?.querySelector('style'),
        hasFieldset: fieldset?.localName === 'fieldset',
        hasSlot: !!el.shadowRoot?.querySelector('slot:not([name])'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        imgComplete: !!img?.complete,
        imgNaturalWidth: img?.naturalWidth ?? 0,
      };
    }),
  };
});

const box = await page.locator('[data-card="fieldset"]').boundingBox();
if (!box) {
  console.error('land-fieldset-pixel-diff: card has no bounding box');
  process.exit(1);
}
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
  proof.ctorName !== 'LitFieldset' ||
  proof.iconCtorName !== 'LitIcon' ||
  proof.inputCtorName !== 'LitInputText' ||
  proof.litTagDefined ||
  proof.litIconDefined ||
  proof.animationDuration !== '0s' ||
  proof.hostCount < 4 ||
  proof.hosts.some((h) => {
    const hasMsg = !!h.message && (h.state === 'success' || h.state === 'error');
    return (
      h.tag !== 'p-fieldset' ||
      !h.legendText ||
      h.slottedCount !== 2 ||
      h.slottedTags.some((t) => t !== 'p-input-text') ||
      h.innerIcon !== 'p-icon' ||
      !h.hasStyle ||
      !h.hasFieldset ||
      !h.hasSlot ||
      h.hasFragment ||
      (hasMsg ? h.iconHidden || !h.imgComplete || h.imgNaturalWidth === 0 : !h.iconHidden)
    );
  }) ||
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
