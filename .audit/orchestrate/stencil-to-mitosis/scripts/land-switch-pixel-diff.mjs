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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=switch';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_switch_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_switch_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_switch_pixel_diff.png';
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
  () => customElements.get('p-switch') && customElements.get('p-spinner'),
  { timeout: 20_000 }
);
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="switch"] p-switch')];
  return (
    hosts.length >= 6 &&
    hosts.every((el) => {
      const wrap = el.shadowRoot?.querySelector('.wrap');
      const button = el.shadowRoot?.querySelector('button');
      const toggle = el.shadowRoot?.querySelector('.toggle');
      const spinner = el.shadowRoot?.querySelector('p-spinner');
      const svg = spinner?.shadowRoot?.querySelector('svg');
      const spinnerHidden = !!spinner && getComputedStyle(spinner).display === 'none';
      const loading = el.getAttribute('loading') === 'true' || el.hasAttribute('loading');
      return (
        !!el.shadowRoot?.querySelector('style') &&
        wrap?.localName === 'div' &&
        button?.getAttribute('role') === 'switch' &&
        !!toggle &&
        spinner?.localName === 'p-spinner' &&
        !!el.shadowRoot.querySelector('slot') &&
        !el.shadowRoot.querySelector('lit-switch') &&
        !el.shadowRoot.querySelector('lit-spinner') &&
        !el.shadowRoot.querySelector('my-fragment') &&
        (loading ? !spinnerHidden && !!svg : spinnerHidden) &&
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
  const Ctor = customElements.get('p-switch');
  const SpinnerCtor = customElements.get('p-spinner');
  const hosts = [...document.querySelectorAll('[data-card="switch"] p-switch')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    spinnerCtorName: SpinnerCtor?.name ?? null,
    definedTag: 'p-switch',
    litTagDefined: !!customElements.get('lit-switch'),
    litSpinnerDefined: !!customElements.get('lit-spinner'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const wrap = el.shadowRoot?.querySelector('.wrap');
      const button = el.shadowRoot?.querySelector('button');
      const toggle = el.shadowRoot?.querySelector('.toggle');
      const spinner = el.shadowRoot?.querySelector('p-spinner');
      const svg = spinner?.shadowRoot?.querySelector('svg');
      const spinnerHidden = !!spinner && getComputedStyle(spinner).display === 'none';
      return {
        tag: el.localName,
        checked: el.getAttribute('checked'),
        loading: el.getAttribute('loading'),
        disabled: el.getAttribute('disabled'),
        wrapTag: wrap?.localName ?? null,
        buttonRole: button?.getAttribute('role') ?? null,
        hasToggle: !!toggle,
        innerSpinner: spinner?.localName ?? null,
        spinnerHidden,
        hasShadow: !!el.shadowRoot,
        hasStyle: !!el.shadowRoot?.querySelector('style'),
        hasSlot: !!el.shadowRoot?.querySelector('slot'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        hasSvg: !!svg,
        text: el.textContent?.trim() ?? '',
      };
    }),
  };
});

const box = await page.locator('[data-card="switch"]').boundingBox();
if (!box) {
  console.error('land-switch-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitSwitch' ||
  proof.spinnerCtorName !== 'LitSpinner' ||
  proof.litTagDefined ||
  proof.litSpinnerDefined ||
  proof.animationDuration !== '0s' ||
  proof.hostCount < 6 ||
  proof.hosts.some((h) => {
    const loading = h.loading === 'true' || h.loading === '';
    return (
      h.tag !== 'p-switch' ||
      h.wrapTag !== 'div' ||
      h.buttonRole !== 'switch' ||
      !h.hasToggle ||
      h.innerSpinner !== 'p-spinner' ||
      !h.hasStyle ||
      !h.hasSlot ||
      h.hasFragment ||
      !h.text ||
      (loading ? h.spinnerHidden || !h.hasSvg : !h.spinnerHidden)
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
