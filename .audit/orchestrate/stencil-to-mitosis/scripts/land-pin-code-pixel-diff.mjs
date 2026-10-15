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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=pin-code';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_pin_code_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_pin_code_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_pin_code_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 42246;
const EXPECTED_BASELINE_SHA = '039a0ac57947a36bbdd70ec5f0fdb1bc0692b351d5970f623c400afc8624a7a9';

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
  if (text.includes('ERR_CONNECTION_REFUSED') || text.includes('ERR_ABORTED') || url.includes('3002')) return;
  consoleErrors.push(text);
});
page.on('pageerror', (err) => {
  const text = String(err);
  if (text.includes('ERR_CONNECTION_REFUSED') || text.includes('ERR_ABORTED') || text.includes('3002')) return;
  consoleErrors.push(text);
});

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-pin-code.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`IIFE HTTP ${iifeAsset.status()}`);
}

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () => customElements.get('p-pin-code') && customElements.get('p-icon') && customElements.get('p-spinner'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content: ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; }',
});
await page.waitForSelector('[data-card="pin-code"] p-pin-code', { state: 'attached', timeout: 20_000 });
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="pin-code"] > p-pin-code')];
  const Ctor = customElements.get('p-pin-code');
  const Icon = customElements.get('p-icon');
  const Spinner = customElements.get('p-spinner');
  return (
    hosts.length >= 5 &&
    Ctor?.name === 'LitPinCode' &&
    Icon?.name === 'LitIcon' &&
    Spinner?.name === 'LitSpinner' &&
    hosts.every((el) => {
      const root = el.shadowRoot;
      const style = root?.querySelector('style');
      const fieldset = root?.querySelector('fieldset.root');
      const inputs = root?.querySelectorAll('input') ?? [];
      if (!root || style || !fieldset || inputs.length < 4) return false;
      if ((root.adoptedStyleSheets?.length ?? 0) < 1) return false;
      if (el.classList.contains('hydrated')) return false;
      if (root.querySelector('my-fragment') || root.querySelector('lit-pin-code')) return false;
      const spinner = root.querySelector('p-spinner');
      if (spinner) {
        return customElements.get('p-spinner')?.name === 'LitSpinner' && !!spinner.shadowRoot?.querySelector('svg');
      }
      const icons = [...(root.querySelectorAll('p-icon') ?? [])].filter(
        (icon) => getComputedStyle(icon).display !== 'none',
      );
      return icons.every(
        (icon) => icon.constructor?.name === 'LitIcon' && icon.shadowRoot?.querySelector('img')?.complete,
      );
    })
  );
}, { timeout: 20_000 });

const proof = await page.evaluate(() => {
  const Ctor = customElements.get('p-pin-code');
  const hosts = [...document.querySelectorAll('[data-card="pin-code"] > p-pin-code')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    definedTag: 'p-pin-code',
    litTagDefined: !!customElements.get('lit-pin-code'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    transitionDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-transition-duration').trim(),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const spinner = el.shadowRoot?.querySelector('p-spinner');
      const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
        (icon) => getComputedStyle(icon).display !== 'none',
      );
      return {
        tag: el.localName,
        label: el.getAttribute('label'),
        loading: el.getAttribute('loading'),
        state: el.getAttribute('state'),
        disabled: el.getAttribute('disabled'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        hasRoot: !!el.shadowRoot?.querySelector('fieldset.root'),
        inputCount: el.shadowRoot?.querySelectorAll('input').length ?? 0,
        spinnerCtor: spinner?.constructor?.name ?? null,
        iconNames: icons.map((n) => n.getAttribute('name')),
        iconCtor: icons.map((n) => n.constructor?.name),
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});

const box = await page.locator('[data-card="pin-code"]').boundingBox();
if (!box) {
  console.error('land-pin-code-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitPinCode' ||
  proof.litTagDefined ||
  proof.animationDuration !== '0s' ||
  proof.hostCount < 5 ||
  proof.hosts.some((h) => {
    return (
      h.tag !== 'p-pin-code' ||
      !h.hasShadow ||
      h.hasStyle ||
      !h.adoptedSheets ||
      !h.hasRoot ||
      h.inputCount < 4 ||
      h.hydrated ||
      h.hasFragment
    );
  }) ||
  !proof.hosts.some((h) => h.loading === 'true' && h.spinnerCtor === 'LitSpinner') ||
  !proof.hosts.some((h) => h.state === 'error' && h.iconNames.includes('exclamation')) ||
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
