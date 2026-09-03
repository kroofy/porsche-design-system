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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=checkbox';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_checkbox_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_checkbox_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_checkbox_pixel_diff.png';
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
await page.waitForFunction(
  () => customElements.get('p-checkbox') && customElements.get('p-icon') && customElements.get('p-spinner'),
  { timeout: 20_000 }
);
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="checkbox"] p-checkbox')];
  return (
    hosts.length >= 13 &&
    hosts.every((el) => {
      const root = el.shadowRoot?.querySelector('.root');
      const input = el.shadowRoot?.querySelector('input[type="checkbox"]');
      const spinner = el.shadowRoot?.querySelector('p-spinner');
      const icon = el.shadowRoot?.querySelector('p-icon');
      const svg = spinner?.shadowRoot?.querySelector('svg');
      const img = icon?.shadowRoot?.querySelector('img');
      const spinnerHidden = !!spinner && getComputedStyle(spinner).display === 'none';
      const iconHidden = !!icon && getComputedStyle(icon).display === 'none';
      const loading = el.getAttribute('loading') === 'true' || el.hasAttribute('loading');
      const state = el.getAttribute('state');
      const message = el.getAttribute('message');
      const hasMsg = !!message && (state === 'success' || state === 'error');
      const spinnerOk = loading ? !spinnerHidden && !!svg : spinnerHidden;
      const iconOk = hasMsg
        ? !iconHidden && !!img?.complete && (img?.naturalWidth ?? 0) > 0
        : iconHidden;
      return (
        !!el.shadowRoot?.querySelector('style') &&
        root?.localName === 'div' &&
        input?.type === 'checkbox' &&
        spinner?.localName === 'p-spinner' &&
        icon?.localName === 'p-icon' &&
        !el.shadowRoot.querySelector('lit-checkbox') &&
        !el.shadowRoot.querySelector('lit-icon') &&
        !el.shadowRoot.querySelector('lit-spinner') &&
        !el.shadowRoot.querySelector('my-fragment') &&
        spinnerOk &&
        iconOk
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
  const Ctor = customElements.get('p-checkbox');
  const hosts = [...document.querySelectorAll('[data-card="checkbox"] p-checkbox')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    iconCtorName: customElements.get('p-icon')?.name ?? null,
    spinnerCtorName: customElements.get('p-spinner')?.name ?? null,
    definedTag: 'p-checkbox',
    litTagDefined: !!customElements.get('lit-checkbox'),
    litIconDefined: !!customElements.get('lit-icon'),
    litSpinnerDefined: !!customElements.get('lit-spinner'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const root = el.shadowRoot?.querySelector('.root');
      const input = el.shadowRoot?.querySelector('input[type="checkbox"]');
      const spinner = el.shadowRoot?.querySelector('p-spinner');
      const icon = el.shadowRoot?.querySelector('p-icon');
      const svg = spinner?.shadowRoot?.querySelector('svg');
      const img = icon?.shadowRoot?.querySelector('img');
      const spinnerHidden = !!spinner && getComputedStyle(spinner).display === 'none';
      const iconHidden = !!icon && getComputedStyle(icon).display === 'none';
      return {
        tag: el.localName,
        label: el.getAttribute('label'),
        checked: el.getAttribute('checked'),
        indeterminate: el.getAttribute('indeterminate'),
        loading: el.getAttribute('loading'),
        disabled: el.getAttribute('disabled'),
        state: el.getAttribute('state'),
        message: el.getAttribute('message'),
        inputType: input?.type ?? null,
        inputChecked: !!input?.checked,
        inputIndeterminate: !!input?.indeterminate,
        innerSpinner: spinner?.localName ?? null,
        innerIcon: icon?.localName ?? null,
        iconName: icon?.getAttribute('name'),
        spinnerHidden,
        iconHidden,
        hasShadow: !!el.shadowRoot,
        hasStyle: !!el.shadowRoot?.querySelector('style'),
        hasRoot: !!root,
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        hasSvg: !!svg,
        imgComplete: !!img?.complete,
        imgNaturalWidth: img?.naturalWidth ?? 0,
      };
    }),
  };
});

const box = await page.locator('[data-card="checkbox"]').boundingBox();
if (!box) {
  console.error('land-checkbox-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitCheckbox' ||
  proof.iconCtorName !== 'LitIcon' ||
  proof.spinnerCtorName !== 'LitSpinner' ||
  proof.litTagDefined ||
  proof.litIconDefined ||
  proof.litSpinnerDefined ||
  proof.animationDuration !== '0s' ||
  proof.hostCount < 13 ||
  proof.hosts.some((h) => {
    const loading = h.loading === 'true' || h.loading === '';
    const hasMsg = !!h.message && (h.state === 'success' || h.state === 'error');
    return (
      h.tag !== 'p-checkbox' ||
      h.inputType !== 'checkbox' ||
      h.innerSpinner !== 'p-spinner' ||
      h.innerIcon !== 'p-icon' ||
      !h.hasStyle ||
      !h.hasRoot ||
      h.hasFragment ||
      (loading ? h.spinnerHidden || !h.hasSvg : !h.spinnerHidden) ||
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
