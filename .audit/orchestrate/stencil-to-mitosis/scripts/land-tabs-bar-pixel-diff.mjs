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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=tabs-bar';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_bar_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_tabs_bar_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_tabs_bar_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 85161;
const EXPECTED_BASELINE_SHA = '767cedec698e45d1e370b68d0165898349cf3f4047474c995857f68195e60df9';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-tabs-bar.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`tabs-bar IIFE HTTP ${iifeAsset.status()}`);
}
const scrollerIife = await page.request.get('http://localhost:3333/assets/p-scroller.iife.js');
if (scrollerIife.status() !== 200) {
  throw new Error(`scroller IIFE HTTP ${scrollerIife.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-tabs-bar"/.test(loaderText);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () => customElements.get('p-tabs-bar') && customElements.get('p-scroller') && customElements.get('p-icon'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="tabs-bar"] p-tabs-bar', { state: 'attached', timeout: 20_000 });
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="tabs-bar"] p-tabs-bar')];
  const TabsBar = customElements.get('p-tabs-bar');
  const Scroller = customElements.get('p-scroller');
  const Icon = customElements.get('p-icon');
  if (hosts.length !== 7) return false;
  if (TabsBar?.name !== 'LitTabsBar') return false;
  if (Scroller?.name !== 'LitScroller') return false;
  if (Icon?.name !== 'LitIcon') return false;
  return hosts.every((el) => {
    if (el.classList.contains('hydrated')) return false;
    const root = el.shadowRoot;
    const wrap = root?.querySelector('.wrap');
    const style = root?.querySelector('style');
    const scroller = root?.querySelector('p-scroller.scroller');
    const bar = root?.querySelector('.bar');
    const tabs = [...el.querySelectorAll(':scope > button, :scope > a')];
    if (!root || !wrap || !style || !scroller || !bar) return false;
    if (root.querySelector('my-fragment') || root.querySelector('lit-tabs-bar')) return false;
    if (tabs.length < 2) return false;
    if (scroller.constructor?.name !== 'LitScroller') return false;
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const hosts = [...document.querySelectorAll('[data-card="tabs-bar"] p-tabs-bar')];
  await Promise.all(hosts.map((el) => el.updateComplete));
  for (const el of hosts) el.scrollActiveIntoView?.();
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="tabs-bar"] p-tabs-bar')];
  if (hosts.length !== 7) return false;
  return hosts.every((el, index) => {
    const scroller = el.shadowRoot?.querySelector('p-scroller.scroller');
    const prev = scroller?.shadowRoot?.querySelector('.prev');
    const next = scroller?.shadowRoot?.querySelector('.next');
    if (!prev || !next) return false;
    const prevOp = Number(getComputedStyle(prev).opacity);
    const nextOp = Number(getComputedStyle(next).opacity);
    const expectPrev = index === 1 || index === 2 || index === 3 || index === 4;
    const expectNext = index !== 2;
    if (expectPrev ? prevOp < 0.9 : prevOp > 0.1) return false;
    if (expectNext ? nextOp < 0.9 : nextOp > 0.1) return false;
    return true;
  });
}, { timeout: 20_000 });

const proof = await page.evaluate(() => {
  const TabsBar = customElements.get('p-tabs-bar');
  const hosts = [...document.querySelectorAll('[data-card="tabs-bar"] p-tabs-bar')];
  const tabs = hosts.flatMap((el) => [...el.querySelectorAll(':scope > button, :scope > a')]);
  return {
    title: document.title,
    href: location.href,
    ctorName: TabsBar?.name ?? null,
    isLit: !!TabsBar && 'elementProperties' in TabsBar,
    definedTag: 'p-tabs-bar',
    litTagDefined: !!customElements.get('lit-tabs-bar'),
    scrollerCtor: customElements.get('p-scroller')?.name ?? null,
    iconCtor: customElements.get('p-icon')?.name ?? null,
    hostCount: hosts.length,
    tabCount: tabs.length,
    hosts: hosts.map((el) => {
      const scroller = el.shadowRoot?.querySelector('p-scroller');
      const bar = el.shadowRoot?.querySelector('.bar');
      const style = el.shadowRoot?.querySelector('style');
      const children = [...el.querySelectorAll(':scope > button, :scope > a')];
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        background: el.getAttribute('background'),
        size: el.getAttribute('size'),
        activeTabIndex: el.getAttribute('active-tab-index'),
        childCount: children.length,
        childTags: [...new Set(children.map((n) => n.tagName))],
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        hasWrap: !!el.shadowRoot?.querySelector('.wrap'),
        hasScroller: !!scroller,
        scrollerCtor: scroller?.constructor?.name ?? null,
        hasBar: !!bar,
        barWidth: bar ? getComputedStyle(bar).width : null,
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        cssHas1000: !!style?.textContent?.includes('1000'),
      };
    }),
  };
});

const box = await page.locator('[data-card="tabs-bar"]').boundingBox();
if (!box) {
  console.error('land-tabs-bar-pixel-diff: card has no bounding box');
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
  { background: null, size: null, activeTabIndex: null, childCount: 3, childTags: ['BUTTON'] },
  { background: null, size: null, activeTabIndex: '1', childCount: 3, childTags: ['A'] },
  { background: 'canvas', size: null, activeTabIndex: '2', childCount: 3, childTags: ['BUTTON'] },
  { background: 'surface', size: null, activeTabIndex: '1', childCount: 3, childTags: ['BUTTON'] },
  { background: 'frosted', size: null, activeTabIndex: '5', childCount: 7, childTags: ['BUTTON'] },
  { background: null, size: 'medium', activeTabIndex: '99', childCount: 6, childTags: ['BUTTON'] },
  { background: null, size: 'medium', activeTabIndex: '0', childCount: 6, childTags: ['BUTTON'] },
];

const failed =
  !!result.error ||
  result.strictMismatch !== 0 ||
  proof.title !== 'Playground' ||
  !proof.isLit ||
  proof.ctorName !== 'LitTabsBar' ||
  proof.scrollerCtor !== 'LitScroller' ||
  proof.iconCtor !== 'LitIcon' ||
  proof.litTagDefined ||
  proof.hostCount !== 7 ||
  proof.tabCount !== 31 ||
  stillLazy ||
  proof.hosts.some((h, i) => {
    const expected = expectedHosts[i];
    return (
      h.tag !== 'p-tabs-bar' ||
      h.ctor !== 'LitTabsBar' ||
      h.background !== expected.background ||
      h.size !== expected.size ||
      h.activeTabIndex !== expected.activeTabIndex ||
      h.childCount !== expected.childCount ||
      h.childTags.join(',') !== expected.childTags.join(',') ||
      !h.hasShadow ||
      !h.hasStyle ||
      !h.hasWrap ||
      !h.hasScroller ||
      h.scrollerCtor !== 'LitScroller' ||
      !h.hasBar ||
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
