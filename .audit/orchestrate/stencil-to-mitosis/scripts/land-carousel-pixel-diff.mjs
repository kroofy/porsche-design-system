#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=carousel';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_carousel_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_carousel_after.png';
const AFTER_PASS = '/opt/cursor/artifacts/mitosis_land_carousel_after_pass.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_carousel_pixel_diff.png';
const LOG = '/opt/cursor/artifacts/land_carousel_verify.log';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 7096;
const EXPECTED_BASELINE_SHA = '61bd4864ddbae06db394c375ac4320c812a0869863caf1402fe415666cc12b84';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const lines = [];
const log = (msg) => {
  lines.push(typeof msg === 'string' ? msg : JSON.stringify(msg));
  console.warn(typeof msg === 'string' ? msg : JSON.stringify(msg));
};

const baselineBuf = await readFile(BASELINE_PNG);
if (baselineBuf.byteLength !== EXPECTED_BASELINE_BYTES) {
  throw new Error(`baseline bytes ${baselineBuf.byteLength} !== ${EXPECTED_BASELINE_BYTES}`);
}
const baselineSha = sha256(baselineBuf);
if (baselineSha !== EXPECTED_BASELINE_SHA) {
  throw new Error(`baseline sha ${baselineSha} !== ${EXPECTED_BASELINE_SHA}`);
}
log(`baseline bytes=${baselineBuf.byteLength} sha256=${baselineSha}`);

const isBenign = (text) =>
  text.includes('ERR_CONNECTION_REFUSED') ||
  text.includes('ERR_ABORTED') ||
  text.includes("can't be used like this") ||
  text.includes('should be of kind') ||
  text.includes('parent HTMLElement of') ||
  text.includes('throwIfParentIsNotOfKind') ||
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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-carousel.iife.js');
log(`iife HEAD /assets/p-carousel.iife.js status=${iifeAsset.status()}`);
if (iifeAsset.status() !== 200) {
  throw new Error(`carousel IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-carousel"/.test(loaderText);
log(`loader exact "p-carousel"=${stillLazy}`);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-carousel'), { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="carousel"] p-carousel', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="carousel"] p-carousel')];
  const Carousel = customElements.get('p-carousel');
  if (Carousel?.name !== 'LitCarousel') return false;
  if (hosts.length !== 5) return false;
  if (hosts.some((el) => el.classList.contains('hydrated'))) return false;
  const popover = document.querySelector('#popover-carousel');
  if (popover?.matches(':popover-open')) return false;
  return hosts.every((el) => {
    if (el.closest('[data-card="carousel"]')?.getAttribute('data-card') !== 'carousel') return false;
    const style = getComputedStyle(el);
    if (style.display !== 'flex' || style.flexDirection !== 'column') return false;
    const root = el.shadowRoot;
    if (!root) return false;
    if (root.querySelector('.root, my-fragment, lit-carousel')) return false;
    if (!root.querySelector('.header')) return false;
    if (!root.querySelector('#splide.splide')) return false;
    if (!root.querySelector('.splide__track')) return false;
    if (!root.querySelector('.splide__list')) return false;
    if (!root.querySelector('.slide-status')) return false;
    if (root.querySelector('style')) return false;
    const sheets = root.adoptedStyleSheets ?? [];
    const css = [...sheets].flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText)).join('');
    if (sheets.length < 1) return false;
    if (!css.includes('min-width: 760px') && !css.includes('min-width:760px')) return false;
    if (!css.includes('min-width: 1920px') && !css.includes('min-width:1920px')) return false;
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const hosts = [...document.querySelectorAll('[data-card="carousel"] p-carousel')];
  await Promise.all(hosts.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="carousel"] p-carousel')];
  const popover = document.querySelector('#popover-carousel');
  return {
    title: document.title,
    href: location.href,
    ctorName: customElements.get('p-carousel')?.name ?? null,
    isLit: !!customElements.get('p-carousel') && 'elementProperties' in customElements.get('p-carousel'),
    definedTag: 'p-carousel',
    litTagDefined: !!customElements.get('lit-carousel'),
    hostCount: hosts.length,
    hydrated: hosts.some((el) => el.classList.contains('hydrated')),
    popoverOpen: popover?.matches(':popover-open') ?? null,
    hosts: hosts.map((el) => {
      const injected = el.shadowRoot?.querySelector('style');
      const sheets = el.shadowRoot?.adoptedStyleSheets ?? [];
      const css = [...sheets].flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText)).join('');
      const style = getComputedStyle(el);
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        parentCard: el.closest('[data-card="carousel"]')?.getAttribute('data-card') ?? null,
        display: style.display,
        flexDirection: style.flexDirection,
        hasHeader: !!el.shadowRoot?.querySelector('.header'),
        hasSplide: !!el.shadowRoot?.querySelector('#splide.splide'),
        hasTrack: !!el.shadowRoot?.querySelector('.splide__track'),
        hasList: !!el.shadowRoot?.querySelector('.splide__list'),
        hasStatus: !!el.shadowRoot?.querySelector('.slide-status'),
        hasRootWrap: !!el.shadowRoot?.querySelector('.root'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        hasStyle: !!injected,
        adoptedSheets: sheets.length,
        cssHasS: css.includes('min-width: 760px') || css.includes('min-width:760px'),
        cssHasXxl: css.includes('min-width: 1920px') || css.includes('min-width:1920px'),
        hydrated: el.classList.contains('hydrated'),
      };
    }),
  };
});
log(proof);

const box = await page.locator('[data-card="carousel"]').boundingBox();
if (!box) {
  await writeFile(LOG, `${lines.join('\n')}\n`);
  console.error('land-carousel-pixel-diff: card has no bounding box');
  process.exit(1);
}
const clip = {
  x: Math.max(0, box.x),
  y: Math.max(0, box.y),
  width: box.width,
  height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
};
log(`card box x=${box.x} y=${box.y} w=${box.width} h=${box.height}`);
log(`clip x=${clip.x} y=${clip.y} w=${clip.width} h=${clip.height}`);
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
  proof.ctorName !== 'LitCarousel' ||
  proof.litTagDefined ||
  proof.hostCount !== 5 ||
  stillLazy ||
  proof.hydrated ||
  proof.popoverOpen ||
  proof.hosts.some((item) => {
    return (
      item.tag !== 'p-carousel' ||
      item.ctor !== 'LitCarousel' ||
      item.parentCard !== 'carousel' ||
      item.display !== 'flex' ||
      item.flexDirection !== 'column' ||
      !item.hasHeader ||
      !item.hasSplide ||
      !item.hasTrack ||
      !item.hasList ||
      !item.hasStatus ||
      item.hasRootWrap ||
      item.hasFragment ||
      item.hasStyle ||
      (item.adoptedSheets ?? 0) < 1 ||
      !item.cssHasS ||
      !item.cssHasXxl ||
      item.hydrated
    );
  }) ||
  consoleErrors.length > 0;

log(`strictMismatch=${result.strictMismatch} total=${result.totalPixels}`);
log(`after bytes=${png.byteLength} sha256=${sha256(png)}`);
log(`byteEqual=${Buffer.compare(png, baselineBuf) === 0}`);
log(`consoleErrors=${JSON.stringify(consoleErrors)}`);
log(`failed=${failed}`);

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
log(JSON.stringify(summary, null, 2));
await writeFile(LOG, `${lines.join('\n')}\n`);

if (!failed) {
  await copyFile(AFTER_PNG, AFTER_PASS);
  log(`copied after → ${AFTER_PASS}`);
  await writeFile(LOG, `${lines.join('\n')}\n`);
}

process.exit(failed ? 1 : 0);
