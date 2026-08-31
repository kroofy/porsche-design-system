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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=tabs';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_tabs_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_tabs_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 91188;
const EXPECTED_BASELINE_SHA = '32908d37ba81c9f332d32adf0cb11ce7bb72bc1246e992ad86cfb7e70164525c';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-tabs.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`tabs IIFE HTTP ${iifeAsset.status()}`);
}
const barIife = await page.request.get('http://localhost:3333/assets/p-tabs-bar.iife.js');
if (barIife.status() !== 200) {
  throw new Error(`tabs-bar IIFE HTTP ${barIife.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-tabs"/.test(loaderText);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-tabs') &&
    customElements.get('p-tabs-bar') &&
    customElements.get('p-tabs-item') &&
    customElements.get('p-text') &&
    customElements.get('p-scroller'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="tabs"] p-tabs', { state: 'attached', timeout: 20_000 });
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="tabs"] > p-tabs')];
  const Tabs = customElements.get('p-tabs');
  const Bar = customElements.get('p-tabs-bar');
  const Text = customElements.get('p-text');
  if (hosts.length !== 5) return false;
  if (Tabs?.name !== 'LitTabs') return false;
  if (Bar?.name !== 'LitTabsBar') return false;
  if (Text?.name !== 'LitText') return false;
  return hosts.every((el) => {
    if (el.classList.contains('hydrated')) return false;
    const root = el.shadowRoot;
    const wrap = root?.querySelector('.wrap');
    const style = root?.querySelector('style');
    const bar = root?.querySelector('p-tabs-bar.root');
    const buttons = [...(bar?.querySelectorAll(':scope > button') ?? [])];
    const items = [...el.querySelectorAll(':scope > p-tabs-item')];
    const texts = items.flatMap((item) => [...item.querySelectorAll('p-text')]);
    if (!root || !wrap || !style || !bar) return false;
    if (root.querySelector('my-fragment') || root.querySelector('lit-tabs')) return false;
    if (bar.constructor?.name !== 'LitTabsBar') return false;
    if (buttons.length !== 3) return false;
    if (items.length !== 3) return false;
    if (texts.length !== 3) return false;
    if (texts.some((t) => t.constructor?.name !== 'LitText')) return false;
    if (items[0]?.hasAttribute('hidden')) return false;
    if (!items[1]?.hasAttribute('hidden') || !items[2]?.hasAttribute('hidden')) return false;
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const hosts = [...document.querySelectorAll('[data-card="tabs"] > p-tabs')];
  await Promise.all(hosts.map((el) => el.updateComplete));
  await Promise.all(
    hosts.map((el) => el.shadowRoot?.querySelector('p-tabs-bar')?.updateComplete).filter(Boolean),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="tabs"] > p-tabs')];
  if (hosts.length !== 5) return false;
  return hosts.every((el) => {
    const bar = el.shadowRoot?.querySelector('p-tabs-bar.root');
    const scroller = bar?.shadowRoot?.querySelector('p-scroller.scroller');
    const prev = scroller?.shadowRoot?.querySelector('.prev');
    const next = scroller?.shadowRoot?.querySelector('.next');
    if (!prev || !next) return false;
    const prevOp = Number(getComputedStyle(prev).opacity);
    const nextOp = Number(getComputedStyle(next).opacity);
    if (prevOp > 0.1) return false;
    if (nextOp < 0.9) return false;
    return true;
  });
}, { timeout: 20_000 });

const proof = await page.evaluate(() => {
  const Tabs = customElements.get('p-tabs');
  const hosts = [...document.querySelectorAll('[data-card="tabs"] > p-tabs')];
  const items = hosts.flatMap((el) => [...el.querySelectorAll(':scope > p-tabs-item')]);
  return {
    title: document.title,
    href: location.href,
    ctorName: Tabs?.name ?? null,
    isLit: !!Tabs && 'elementProperties' in Tabs,
    definedTag: 'p-tabs',
    litTagDefined: !!customElements.get('lit-tabs'),
    barCtor: customElements.get('p-tabs-bar')?.name ?? null,
    itemCtor: customElements.get('p-tabs-item')?.name ?? null,
    textCtor: customElements.get('p-text')?.name ?? null,
    hostCount: hosts.length,
    itemCount: items.length,
    hosts: hosts.map((el) => {
      const bar = el.shadowRoot?.querySelector('p-tabs-bar');
      const style = el.shadowRoot?.querySelector('style');
      const children = [...el.querySelectorAll(':scope > p-tabs-item')];
      const buttons = [...(bar?.querySelectorAll(':scope > button') ?? [])];
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        background: el.getAttribute('background'),
        size: el.getAttribute('size'),
        childCount: children.length,
        buttonCount: buttons.length,
        buttonLabels: buttons.map((b) => b.textContent?.trim()),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        hasWrap: !!el.shadowRoot?.querySelector('.wrap'),
        hasBar: !!bar,
        barCtor: bar?.constructor?.name ?? null,
        firstHidden: children[0]?.hasAttribute('hidden') ?? null,
        secondHidden: children[1]?.hasAttribute('hidden') ?? null,
        hydrated: el.classList.contains('hydrated'),
        itemHydrated: children.every((c) => c.classList.contains('hydrated')),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        cssHas1000: !!style?.textContent?.includes('1000'),
      };
    }),
  };
});

const box = await page.locator('[data-card="tabs"]').boundingBox();
if (!box) {
  console.error('land-tabs-pixel-diff: card has no bounding box');
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
  { background: null, size: null },
  { background: 'canvas', size: null },
  { background: 'surface', size: null },
  { background: 'frosted', size: null },
  { background: null, size: 'medium' },
];

const failed =
  !!result.error ||
  result.strictMismatch !== 0 ||
  proof.title !== 'Playground' ||
  !proof.isLit ||
  proof.ctorName !== 'LitTabs' ||
  proof.barCtor !== 'LitTabsBar' ||
  proof.textCtor !== 'LitText' ||
  proof.litTagDefined ||
  proof.hostCount !== 5 ||
  proof.itemCount !== 15 ||
  stillLazy ||
  proof.hosts.some((h, i) => {
    const expected = expectedHosts[i];
    return (
      h.tag !== 'p-tabs' ||
      h.ctor !== 'LitTabs' ||
      h.background !== expected.background ||
      h.size !== expected.size ||
      h.childCount !== 3 ||
      h.buttonCount !== 3 ||
      h.buttonLabels?.join('|') !== 'Some label (1)|Some label (2)|Some label (3)' ||
      !h.hasShadow ||
      !h.hasStyle ||
      !h.hasWrap ||
      !h.hasBar ||
      h.barCtor !== 'LitTabsBar' ||
      h.firstHidden ||
      !h.secondHidden ||
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
