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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=button';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_button_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_button_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_button_pixel_diff.png';
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
  () => customElements.get('p-button') && customElements.get('p-icon') && customElements.get('p-spinner'),
  { timeout: 20_000 }
);
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="button"] p-button')];
  return (
    hosts.length >= 21 &&
    hosts.every((el) => {
      const root = el.shadowRoot?.querySelector('.root');
      const icon = el.shadowRoot?.querySelector('p-icon');
      const spinner = el.shadowRoot?.querySelector('p-spinner');
      const img = icon?.shadowRoot?.querySelector('img');
      const svg = spinner?.shadowRoot?.querySelector('svg');
      const iconHidden = !!icon && getComputedStyle(icon).display === 'none';
      const spinnerHidden = !!spinner && getComputedStyle(spinner).display === 'none';
      const loading = el.getAttribute('loading') === 'true' || el.hasAttribute('loading');
      const iconName = el.getAttribute('icon');
      const hasVisibleIcon = !!iconName && iconName !== 'none';
      const iconOk = loading
        ? true
        : hasVisibleIcon
          ? !iconHidden && !!img?.complete && (img?.naturalWidth ?? 0) > 0
          : iconHidden;
      const spinnerOk = loading ? !spinnerHidden && !!svg : spinnerHidden;
      return (
        !!el.shadowRoot?.querySelector('style') &&
        root?.localName === 'button' &&
        !!el.shadowRoot.querySelector('slot') &&
        icon?.localName === 'p-icon' &&
        spinner?.localName === 'p-spinner' &&
        !el.shadowRoot.querySelector('lit-icon') &&
        !el.shadowRoot.querySelector('lit-spinner') &&
        !el.shadowRoot.querySelector('lit-button') &&
        !el.shadowRoot.querySelector('my-fragment') &&
        iconOk &&
        spinnerOk &&
        (el.textContent?.trim().length ?? 0) > 0
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
  const Ctor = customElements.get('p-button');
  const IconCtor = customElements.get('p-icon');
  const SpinnerCtor = customElements.get('p-spinner');
  const hosts = [...document.querySelectorAll('[data-card="button"] p-button')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    iconCtorName: IconCtor?.name ?? null,
    spinnerCtorName: SpinnerCtor?.name ?? null,
    definedTag: 'p-button',
    litTagDefined: !!customElements.get('lit-button'),
    litIconDefined: !!customElements.get('lit-icon'),
    litSpinnerDefined: !!customElements.get('lit-spinner'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const root = el.shadowRoot?.querySelector('.root');
      const icon = el.shadowRoot?.querySelector('p-icon');
      const spinner = el.shadowRoot?.querySelector('p-spinner');
      const img = icon?.shadowRoot?.querySelector('img');
      const svg = spinner?.shadowRoot?.querySelector('svg');
      const css = root ? getComputedStyle(root) : null;
      const iconHidden = !!icon && getComputedStyle(icon).display === 'none';
      const spinnerHidden = !!spinner && getComputedStyle(spinner).display === 'none';
      return {
        tag: el.localName,
        variant: el.getAttribute('variant'),
        icon: el.getAttribute('icon'),
        loading: el.getAttribute('loading'),
        disabled: el.getAttribute('disabled'),
        hideLabel: el.getAttribute('hide-label'),
        compact: el.getAttribute('compact'),
        rootTag: root?.localName ?? null,
        innerIcon: icon?.localName ?? null,
        innerSpinner: spinner?.localName ?? null,
        iconHidden,
        spinnerHidden,
        hasShadow: !!el.shadowRoot,
        hasStyle: !!el.shadowRoot?.querySelector('style'),
        hasRoot: !!root,
        hasSlot: !!el.shadowRoot?.querySelector('slot'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        imgComplete: !!img?.complete,
        imgNaturalWidth: img?.naturalWidth ?? 0,
        hasSvg: !!svg,
        text: el.textContent?.trim() ?? '',
        colorComputed: css?.color ?? null,
      };
    }),
  };
});

const box = await page.locator('[data-card="button"]').boundingBox();
if (!box) {
  console.error('land-button-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitButton' ||
  proof.iconCtorName !== 'LitIcon' ||
  proof.spinnerCtorName !== 'LitSpinner' ||
  proof.litTagDefined ||
  proof.litIconDefined ||
  proof.litSpinnerDefined ||
  proof.animationDuration !== '0s' ||
  proof.hostCount < 21 ||
  proof.hosts.some((h) => {
    const loading = h.loading === 'true' || h.loading === '';
    const hasVisibleIcon = !!h.icon && h.icon !== 'none';
    return (
      h.tag !== 'p-button' ||
      h.innerIcon !== 'p-icon' ||
      h.innerSpinner !== 'p-spinner' ||
      h.rootTag !== 'button' ||
      !h.hasStyle ||
      !h.hasRoot ||
      !h.hasSlot ||
      h.hasFragment ||
      !h.text ||
      (loading
        ? h.spinnerHidden || !h.hasSvg
        : hasVisibleIcon
          ? h.iconHidden || !h.imgComplete || h.imgNaturalWidth === 0
          : !h.iconHidden)
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
