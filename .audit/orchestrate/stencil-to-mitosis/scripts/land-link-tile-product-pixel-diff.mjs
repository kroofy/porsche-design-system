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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=link-tile-product';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_tile_product_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_link_tile_product_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_link_tile_product_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 88764;
const EXPECTED_BASELINE_SHA = '84eb86167149dac700e4b8bf34f87dc099eb67c1b8dd954fd0d7356faa4c3a79';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-link-tile-product.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`link-tile-product IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-link-tile-product"/.test(loaderText);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-link-tile-product') &&
    customElements.get('p-button-pure') &&
    customElements.get('p-tag') &&
    customElements.get('p-icon'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="link-tile-product"] p-link-tile-product', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="link-tile-product"] p-link-tile-product')];
  const Host = customElements.get('p-link-tile-product');
  const Button = customElements.get('p-button-pure');
  const Tag = customElements.get('p-tag');
  const Icon = customElements.get('p-icon');
  if (hosts.length !== 2) return false;
  if (Host?.name !== 'LitLinkTileProduct') return false;
  if (Button?.name !== 'LitButtonPure') return false;
  if (Tag?.name !== 'LitTag') return false;
  if (Icon?.name !== 'LitIcon') return false;
  return hosts.every((el, i) => {
    if (el.classList.contains('hydrated')) return false;
    const root = el.shadowRoot;
    const style = root?.querySelector('style');
    const wrap = root?.querySelector('.root');
    const header = root?.querySelector('.header');
    const image = root?.querySelector('.image');
    const wrapper = root?.querySelector('.wrapper');
    const overlay = root?.querySelector('a.anchor');
    const anchorSlot = root?.querySelector('slot[name="anchor"]');
    const like = root?.querySelector('p-button-pure.button');
    const imgs = [...el.querySelectorAll(':scope > img')];
    if (!root || style || (root.adoptedStyleSheets?.length ?? 0) < 1 || !wrap || !header || !image || !wrapper || !like) return false;
    if (root.querySelector('my-fragment') || root.querySelector('lit-link-tile-product')) return false;
    if (like.constructor?.name !== 'LitButtonPure') return false;
    if (overlay?.getAttribute('href') === 'undefined') return false;
    if (!imgs.length || imgs.some((img) => !img.complete || img.naturalWidth <= 0)) return false;
    const icon = like.shadowRoot?.querySelector('p-icon');
    const src = icon?.source || icon?.shadowRoot?.querySelector('img')?.getAttribute('src') || '';
    const iconImg = icon?.shadowRoot?.querySelector('img');
    if (!iconImg?.complete) return false;
    if (i === 0) {
      if (!overlay || overlay.getAttribute('href') !== 'https://porsche.com') return false;
      if (anchorSlot) return false;
      if (!src.includes('heart-filled.')) return false;
    } else {
      if (overlay) return false;
      if (!anchorSlot) return false;
      if (!src.includes('heart.') || src.includes('heart-filled.')) return false;
    }
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const hosts = [...document.querySelectorAll('[data-card="link-tile-product"] p-link-tile-product')];
  await Promise.all(hosts.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const Host = customElements.get('p-link-tile-product');
  const hosts = [...document.querySelectorAll('[data-card="link-tile-product"] p-link-tile-product')];
  const tags = hosts.flatMap((el) => [...el.querySelectorAll(':scope > p-tag')]);
  return {
    title: document.title,
    href: location.href,
    ctorName: Host?.name ?? null,
    isLit: !!Host && 'elementProperties' in Host,
    definedTag: 'p-link-tile-product',
    litTagDefined: !!customElements.get('lit-link-tile-product'),
    buttonCtor: customElements.get('p-button-pure')?.name ?? null,
    tagCtor: customElements.get('p-tag')?.name ?? null,
    iconCtor: customElements.get('p-icon')?.name ?? null,
    hostCount: hosts.length,
    tagCount: tags.length,
    hosts: hosts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const overlay = el.shadowRoot?.querySelector('a.anchor');
      const like = el.shadowRoot?.querySelector('p-button-pure.button');
      const icon = like?.shadowRoot?.querySelector('p-icon');
      const strike = el.shadowRoot?.querySelector('s');
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        heading: el.getAttribute('heading'),
        href: el.getAttribute('href'),
        target: el.getAttribute('target'),
        liked: el.getAttribute('liked'),
        aspectRatio: el.getAttribute('aspect-ratio'),
        priceOriginal: el.getAttribute('price-original'),
        description: el.getAttribute('description'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        hasRoot: !!el.shadowRoot?.querySelector('.root'),
        hasHeader: !!el.shadowRoot?.querySelector('.header'),
        hasImage: !!el.shadowRoot?.querySelector('.image'),
        hasWrapper: !!el.shadowRoot?.querySelector('.wrapper'),
        overlayHref: overlay?.getAttribute('href') ?? null,
        overlayHasUndefinedHref: overlay?.outerHTML.includes('href="undefined"') ?? false,
        hasAnchorSlot: !!el.shadowRoot?.querySelector('slot[name="anchor"]'),
        lightAnchor: el.querySelector(':scope > a[slot="anchor"]')?.tagName ?? null,
        header: el.querySelector(':scope > [slot="header"]')?.tagName ?? null,
        likeLabel: (like?.textContent || '').trim(),
        iconSrc: icon?.source || icon?.shadowRoot?.querySelector('img')?.getAttribute('src') || null,
        hasStrike: !!strike,
        strikeText: strike?.textContent ?? null,
        srOnlyCount: [...(el.shadowRoot?.querySelectorAll('.sr-only') ?? [])].length,
        imgComplete: [...el.querySelectorAll(':scope > img')].every((img) => img.complete && img.naturalWidth > 0),
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});

const box = await page.locator('[data-card="link-tile-product"]').boundingBox();
if (!box) {
  console.error('land-link-tile-product-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitLinkTileProduct' ||
  proof.buttonCtor !== 'LitButtonPure' ||
  proof.tagCtor !== 'LitTag' ||
  proof.iconCtor !== 'LitIcon' ||
  proof.litTagDefined ||
  proof.hostCount !== 2 ||
  proof.tagCount !== 1 ||
  stillLazy ||
  proof.hosts.some((item, i) => {
    const liked = i === 0;
    return (
      item.tag !== 'p-link-tile-product' ||
      item.ctor !== 'LitLinkTileProduct' ||
      item.heading !== 'Some heading' ||
      !item.hasShadow ||
      item.hasStyle ||
      !item.adoptedSheets ||
      !item.hasRoot ||
      !item.hasHeader ||
      !item.hasImage ||
      !item.hasWrapper ||
      item.overlayHasUndefinedHref ||
      !item.imgComplete ||
      item.hydrated ||
      item.hasFragment ||
      (liked
        ? item.href !== 'https://porsche.com' ||
          item.target !== '_blank' ||
          item.liked !== 'true' ||
          item.overlayHref !== 'https://porsche.com' ||
          item.hasAnchorSlot ||
          item.lightAnchor ||
          item.header ||
          item.likeLabel !== 'Remove from wishlist' ||
          !item.iconSrc?.includes('heart-filled.') ||
          item.hasStrike ||
          item.srOnlyCount !== 0
        : item.href != null ||
          item.aspectRatio !== '9/16' ||
          item.priceOriginal !== '911,00 €' ||
          item.description !== 'Some description' ||
          item.overlayHref != null ||
          !item.hasAnchorSlot ||
          item.lightAnchor !== 'A' ||
          item.header !== 'P-TAG' ||
          item.likeLabel !== 'Add to wishlist' ||
          !item.iconSrc?.includes('heart.') ||
          item.iconSrc?.includes('heart-filled.') ||
          !item.hasStrike ||
          item.strikeText !== '911,00 €' ||
          item.srOnlyCount !== 2)
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
