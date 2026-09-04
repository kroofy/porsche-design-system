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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=scroller';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_scroller_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_scroller_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_scroller_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 31123;
const EXPECTED_BASELINE_SHA = '51b498a668c42badaeb725c68b27cdf6351c2223f7bea37b7f5241d9fa09b703';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-scroller.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`IIFE HTTP ${iifeAsset.status()}`);
}

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-scroller') && customElements.get('p-tag'), {
  timeout: 20_000,
});
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content: ':root, :host, * { --p-transition-duration: 0s !important; --p-animation-duration: 0s !important; }',
});
await page.waitForSelector('[data-card="scroller"] p-scroller', { state: 'attached', timeout: 20_000 });
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="scroller"] > p-scroller')];
  const Ctor = customElements.get('p-scroller');
  const Tag = customElements.get('p-tag');
  return (
    hosts.length >= 5 &&
    Ctor?.name === 'LitScroller' &&
    Tag?.name === 'LitTag' &&
    hosts.every((el) => {
      const root = el.shadowRoot;
      const style = root?.querySelector('style');
      const sheets = root?.adoptedStyleSheets ?? [];
      const sheetText = [...sheets].flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText)).join('');
      const scroll = root?.querySelector('.scroll');
      const next = root?.querySelector('.next');
      const prev = root?.querySelector('.prev');
      const sentinels = root?.querySelectorAll('.sentinel') ?? [];
      if (!root || style || sheets.length < 1 || !scroll || !next || !prev || sentinels.length < 2) return false;
      if (el.classList.contains('hydrated')) return false;
      if (root.querySelector('my-fragment') || root.querySelector('lit-scroller')) return false;
      if (!sheetText.includes('.next')) return false;
      const overflows = scroll.scrollWidth > scroll.clientWidth + 1;
      const opacity = getComputedStyle(next).opacity;
      if (overflows ? opacity !== '1' : opacity !== '0') return false;
      const tags = [...el.querySelectorAll(':scope > p-tag')];
      return tags.every((tag) => customElements.get(tag.localName)?.name === 'LitTag');
    })
  );
}, { timeout: 20_000 });

const proof = await page.evaluate(() => {
  const Ctor = customElements.get('p-scroller');
  const hosts = [...document.querySelectorAll('[data-card="scroller"] > p-scroller')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    definedTag: 'p-scroller',
    litTagDefined: !!customElements.get('lit-scroller'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    transitionDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-transition-duration').trim(),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const scroll = el.shadowRoot?.querySelector('.scroll');
      const next = el.shadowRoot?.querySelector('.next');
      const prev = el.shadowRoot?.querySelector('.prev');
      const tags = [...el.querySelectorAll(':scope > p-tag')];
      const prevPos = prev ? getComputedStyle(prev).position : null;
      return {
        tag: el.localName,
        scrollbar: el.getAttribute('scrollbar'),
        sticky: el.getAttribute('sticky'),
        indicatorSticky: el.getAttribute('indicator-sticky'),
        indicatorPosition: el.getAttribute('indicator-position'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        fade: el.getAttribute('data-fade'),
        hasScroll: !!scroll,
        hasPrev: !!prev,
        hasNext: !!next,
        sentinelCount: el.shadowRoot?.querySelectorAll('.sentinel').length ?? 0,
        nextOpacity: next ? getComputedStyle(next).opacity : null,
        prevOpacity: prev ? getComputedStyle(prev).opacity : null,
        overflows: scroll ? scroll.scrollWidth > scroll.clientWidth + 1 : null,
        prevPosition: prevPos,
        hasStickyCss: prevPos === 'sticky',
        tagCount: tags.length,
        tagCtor: tags.map((n) => n.constructor?.name),
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});

const box = await page.locator('[data-card="scroller"]').boundingBox();
if (!box) {
  console.error('land-scroller-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitScroller' ||
  proof.litTagDefined ||
  proof.hostCount < 5 ||
  proof.hosts.some((h) => {
    return (
      h.tag !== 'p-scroller' ||
      !h.hasShadow ||
      h.hasStyle ||
      (h.adoptedSheets ?? 0) < 1 ||
      !h.hasScroll ||
      !h.hasNext ||
      h.sentinelCount < 2 ||
      h.hydrated ||
      h.hasFragment ||
      h.hasStickyCss ||
      (h.overflows && h.nextOpacity !== '1') ||
      h.tagCtor.some((name) => name !== 'LitTag')
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
  proof,
  litVsBaseline: result,
  consoleErrors,
  failed,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failed ? 1 : 0);
