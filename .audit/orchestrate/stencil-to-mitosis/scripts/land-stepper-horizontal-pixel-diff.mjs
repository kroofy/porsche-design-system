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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=stepper-horizontal';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_stepper_horizontal_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_stepper_horizontal_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_stepper_horizontal_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 56074;
const EXPECTED_BASELINE_SHA = '502b71aef339f4c1453c2c83fb7ece59476ac6794e944c5876f3231b976ef7da';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const baselineBuf = await readFile(BASELINE_PNG);
if (baselineBuf.byteLength !== EXPECTED_BASELINE_BYTES) {
  throw new Error(`baseline bytes ${baselineBuf.byteLength} !== ${EXPECTED_BASELINE_BYTES}`);
}
const baselineSha = sha256(baselineBuf);
if (baselineSha !== EXPECTED_BASELINE_SHA) {
  throw new Error(`baseline sha ${baselineSha} !== ${EXPECTED_BASELINE_SHA}`);
}

const isBenign = (text) =>
  text.includes('ERR_CONNECTION_REFUSED') ||
  text.includes('ERR_ABORTED') ||
  text.includes('should be of kind') ||
  text.includes('parent HTMLElement of') ||
  text.includes('3002');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() !== 'error') return;
  const text = msg.text();
  const url = msg.location()?.url ?? '';
  if (isBenign(text) || url.includes('3002')) return;
  consoleErrors.push(text);
});
page.on('pageerror', (err) => {
  const text = String(err);
  if (isBenign(text)) return;
  consoleErrors.push(text);
});

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-stepper-horizontal.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`stepper-horizontal IIFE HTTP ${iifeAsset.status()}`);
}
const scrollerIife = await page.request.get('http://localhost:3333/assets/p-scroller.iife.js');
if (scrollerIife.status() !== 200) {
  throw new Error(`scroller IIFE HTTP ${scrollerIife.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-stepper-horizontal"/.test(loaderText);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-stepper-horizontal') &&
    customElements.get('p-stepper-horizontal-item') &&
    customElements.get('p-scroller') &&
    customElements.get('p-button') &&
    customElements.get('p-text'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="stepper-horizontal"] p-stepper-horizontal-item', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="stepper-horizontal"] p-stepper-horizontal')];
  const items = hosts.flatMap((el) => [...el.querySelectorAll(':scope > p-stepper-horizontal-item')]);
  const Host = customElements.get('p-stepper-horizontal');
  const Item = customElements.get('p-stepper-horizontal-item');
  const Scroller = customElements.get('p-scroller');
  const Button = customElements.get('p-button');
  const Text = customElements.get('p-text');
  if (hosts.length !== 3) return false;
  if (items.length !== 11) return false;
  if (Host?.name !== 'LitStepperHorizontal') return false;
  if (Item?.name !== 'LitStepperHorizontalItem') return false;
  if (Scroller?.name !== 'LitScroller') return false;
  if (Button?.name !== 'LitButton') return false;
  if (Text?.name !== 'LitText') return false;
  return hosts.every((el) => {
    if (el.classList.contains('hydrated')) return false;
    const root = el.shadowRoot;
    const wrap = root?.querySelector('.wrap');
    const style = root?.querySelector('style');
    const scroller = root?.querySelector('p-scroller.scroller');
    const slotted = [...el.querySelectorAll(':scope > p-stepper-horizontal-item')];
    if (!root || !wrap || style || !scroller) return false;
    if ((root.adoptedStyleSheets?.length ?? 0) < 1) return false;
    if (root.querySelector('my-fragment') || root.querySelector('lit-stepper-horizontal')) return false;
    if (scroller.constructor?.name !== 'LitScroller') return false;
    if (slotted.length < 2) return false;
    if (slotted.some((item) => item.classList.contains('hydrated'))) return false;
    const icons = slotted.flatMap((item) => [...(item.shadowRoot?.querySelectorAll('p-icon') ?? [])]);
    if (!icons.every((icon) => {
      const img = icon.shadowRoot?.querySelector('img');
      return icon.constructor?.name === 'LitIcon' && img?.complete;
    })) return false;
    return icons.every((icon) => {
      const name = icon.name || icon.getAttribute('name');
      if (name !== 'success' && name !== 'warning') return true;
      const src = icon.source || icon.shadowRoot?.querySelector('img')?.getAttribute('src') || '';
      return name === 'success' ? src.includes('success.') : src.includes('warning.');
    });
  }) && (() => {
    const prevIcon = document.querySelector('#prev-button')?.shadowRoot?.querySelector('p-icon');
    const src = prevIcon?.source || prevIcon?.shadowRoot?.querySelector('img')?.getAttribute('src') || '';
    return src.includes('arrow-head-left.');
  })();
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const hosts = [...document.querySelectorAll('[data-card="stepper-horizontal"] p-stepper-horizontal')];
  await Promise.all(hosts.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="stepper-horizontal"] p-stepper-horizontal')];
  if (hosts.length !== 3) return false;
  return hosts.every((el) => {
    const scroller = el.shadowRoot?.querySelector('p-scroller.scroller');
    const prev = scroller?.shadowRoot?.querySelector('.prev');
    const next = scroller?.shadowRoot?.querySelector('.next');
    return !!(prev && next);
  });
}, { timeout: 20_000 });

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const Host = customElements.get('p-stepper-horizontal');
  const hosts = [...document.querySelectorAll('[data-card="stepper-horizontal"] p-stepper-horizontal')];
  const items = hosts.flatMap((el) => [...el.querySelectorAll(':scope > p-stepper-horizontal-item')]);
  const buttons = [...document.querySelectorAll('[data-card="stepper-horizontal"] p-button')];
  const texts = [...document.querySelectorAll('[data-card="stepper-horizontal"] p-text')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Host?.name ?? null,
    isLit: !!Host && 'elementProperties' in Host,
    definedTag: 'p-stepper-horizontal',
    litTagDefined: !!customElements.get('lit-stepper-horizontal'),
    itemCtor: customElements.get('p-stepper-horizontal-item')?.name ?? null,
    scrollerCtor: customElements.get('p-scroller')?.name ?? null,
    buttonCtor: customElements.get('p-button')?.name ?? null,
    textCtor: customElements.get('p-text')?.name ?? null,
    hostCount: hosts.length,
    itemCount: items.length,
    buttonCount: buttons.length,
    textCount: texts.length,
    hosts: hosts.map((el) => {
      const scroller = el.shadowRoot?.querySelector('p-scroller');
      const style = el.shadowRoot?.querySelector('style');
      const children = [...el.querySelectorAll(':scope > p-stepper-horizontal-item')];
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        size: el.getAttribute('size'),
        childCount: children.length,
        itemStates: children.map((n) => n.getAttribute('state')),
        itemCtors: [...new Set(children.map((n) => n.constructor?.name))],
        itemsHydrated: children.every((n) => n.classList.contains('hydrated')),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        hasWrap: !!el.shadowRoot?.querySelector('.wrap'),
        hasScroller: !!scroller,
        scrollerCtor: scroller?.constructor?.name ?? null,
        scrollerRole: scroller?.getAttribute('role') ?? scroller?.aria?.role ?? null,
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        cssHas1000: !!style?.textContent?.includes('1000'),
      };
    }),
  };
});

const box = await page.locator('[data-card="stepper-horizontal"]').boundingBox();
if (!box) {
  console.error('land-stepper-horizontal-pixel-diff: card has no bounding box');
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

const expectedHosts = [
  { size: null, childCount: 3, itemStates: ['current', null, null] },
  { size: null, childCount: 4, itemStates: ['complete', 'warning', 'current', null] },
  { size: 'medium', childCount: 4, itemStates: ['complete', 'warning', 'current', null] },
];

const failed =
  !!result.error ||
  result.strictMismatch !== 0 ||
  proof.title !== 'Playground' ||
  !proof.isLit ||
  proof.ctorName !== 'LitStepperHorizontal' ||
  proof.itemCtor !== 'LitStepperHorizontalItem' ||
  proof.scrollerCtor !== 'LitScroller' ||
  proof.buttonCtor !== 'LitButton' ||
  proof.textCtor !== 'LitText' ||
  proof.litTagDefined ||
  proof.hostCount !== 3 ||
  proof.itemCount !== 11 ||
  stillLazy ||
  proof.hosts.some((h, i) => {
    const expected = expectedHosts[i];
    return (
      h.tag !== 'p-stepper-horizontal' ||
      h.ctor !== 'LitStepperHorizontal' ||
      h.size !== expected.size ||
      h.childCount !== expected.childCount ||
      h.itemStates.join(',') !== expected.itemStates.join(',') ||
      h.itemsHydrated ||
      !h.hasShadow ||
      h.hasStyle ||
      !h.adoptedSheets ||
      !h.hasWrap ||
      !h.hasScroller ||
      h.scrollerCtor !== 'LitScroller' ||
      h.scrollerRole !== 'list' ||
      h.hydrated ||
      h.hasFragment
    );
  }) ||
  consoleErrors.length > 0;

const summary = {
  playground: PLAYGROUND_URL,
  baseline: BASELINE_PNG,
  baselineBytes: baselineBuf.byteLength,
  baselineSha,
  after: AFTER_PNG,
  afterBytes: png.byteLength,
  afterSha: sha256(png),
  stillLazy,
  proof,
  litVsBaseline: result,
  consoleErrors,
  failed,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failed ? 1 : 0);
