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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=button-tile';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_button_tile_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_button_tile_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_button_tile_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 397967;
const EXPECTED_BASELINE_SHA = '48c6b6bc8a4310330c6b2057eca90c0bdd265eb446a641c72667dfedff1a459d';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-button-tile.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`button-tile IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-button-tile"/.test(loaderText);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-button-tile') &&
    customElements.get('p-button') &&
    customElements.get('p-tag') &&
    customElements.get('p-text') &&
    customElements.get('p-spinner'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="button-tile"] p-button-tile', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="button-tile"] p-button-tile')];
  const Host = customElements.get('p-button-tile');
  const Button = customElements.get('p-button');
  const Tag = customElements.get('p-tag');
  const Text = customElements.get('p-text');
  if (hosts.length !== 5) return false;
  if (Host?.name !== 'LitButtonTile') return false;
  if (Button?.name !== 'LitButton') return false;
  if (Tag?.name !== 'LitTag') return false;
  if (Text?.name !== 'LitText') return false;
  return hosts.every((el) => {
    if (el.classList.contains('hydrated')) return false;
    const root = el.shadowRoot;
    const style = root?.querySelector('style');
    const wrap = root?.querySelector('.root');
    const media = root?.querySelector('.media');
    const footer = root?.querySelector('.footer');
    const buttons = [...(root?.querySelectorAll('p-button') ?? [])];
    const imgs = [...el.querySelectorAll(':scope > img')];
    if (!root || !style || !wrap || !media || !footer) return false;
    if (root.querySelector('my-fragment') || root.querySelector('lit-button-tile')) return false;
    if (buttons.length !== 2) return false;
    if (!buttons.some((btn) => btn.classList.contains('link-or-button'))) return false;
    if (!buttons.some((btn) => btn.classList.contains('link-or-button-pure'))) return false;
    if (buttons.some((btn) => btn.constructor?.name !== 'LitButton')) return false;
    if (!imgs.length || imgs.some((img) => !img.complete || img.naturalWidth <= 0)) return false;
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const hosts = [...document.querySelectorAll('[data-card="button-tile"] p-button-tile')];
  await Promise.all(hosts.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const Host = customElements.get('p-button-tile');
  const hosts = [...document.querySelectorAll('[data-card="button-tile"] p-button-tile')];
  const buttons = hosts.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-button') ?? [])]);
  const tags = hosts.flatMap((el) => [...el.querySelectorAll(':scope > p-tag')]);
  const texts = hosts.flatMap((el) => [...el.querySelectorAll(':scope > p-text')]);
  return {
    title: document.title,
    href: location.href,
    ctorName: Host?.name ?? null,
    isLit: !!Host && 'elementProperties' in Host,
    definedTag: 'p-button-tile',
    litTagDefined: !!customElements.get('lit-button-tile'),
    buttonCtor: customElements.get('p-button')?.name ?? null,
    tagCtor: customElements.get('p-tag')?.name ?? null,
    textCtor: customElements.get('p-text')?.name ?? null,
    hostCount: hosts.length,
    buttonCount: buttons.length,
    tagCount: tags.length,
    textCount: texts.length,
    hosts: hosts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const buttonsIn = [...(el.shadowRoot?.querySelectorAll('p-button') ?? [])];
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        aspectRatio: el.getAttribute('aspect-ratio'),
        align: el.getAttribute('align'),
        gradient: el.getAttribute('gradient'),
        disabled: el.getAttribute('disabled'),
        loading: el.getAttribute('loading'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        hasRoot: !!el.shadowRoot?.querySelector('.root'),
        hasMedia: !!el.shadowRoot?.querySelector('.media'),
        hasFooter: !!el.shadowRoot?.querySelector('.footer'),
        buttonCount: buttonsIn.length,
        hasLabeledButton: buttonsIn.some((btn) => btn.classList.contains('link-or-button')),
        hasCompactButton: buttonsIn.some((btn) => btn.classList.contains('link-or-button-pure')),
        header: el.querySelector(':scope > [slot="header"]')?.tagName ?? null,
        footer: el.querySelector(':scope > [slot="footer"]')?.tagName ?? null,
        imgComplete: [...el.querySelectorAll(':scope > img')].every((img) => img.complete && img.naturalWidth > 0),
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        cssHasFooterSlot: (style?.textContent || '').includes('grid-row:1/3'),
      };
    }),
  };
});

const box = await page.locator('[data-card="button-tile"]').boundingBox();
if (!box) {
  console.error('land-button-tile-pixel-diff: card has no bounding box');
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

const expected = [
  { aspectRatio: '3/4', align: null, gradient: null, disabled: null, loading: null, header: null, footer: null, cssHasFooterSlot: false },
  { aspectRatio: '9/16', align: 'top', gradient: 'true', disabled: null, loading: null, header: 'P-TAG', footer: 'P-TEXT', cssHasFooterSlot: true },
  { aspectRatio: 'auto', align: null, gradient: 'true', disabled: null, loading: null, header: 'P-TAG', footer: 'P-TEXT', cssHasFooterSlot: true },
  { aspectRatio: '3/4', align: null, gradient: 'true', disabled: 'true', loading: null, header: 'P-TAG', footer: 'P-TEXT', cssHasFooterSlot: true },
  { aspectRatio: '3/4', align: null, gradient: 'true', disabled: null, loading: 'true', header: 'P-TAG', footer: 'P-TEXT', cssHasFooterSlot: true },
];

const failed =
  !!result.error ||
  result.strictMismatch !== 0 ||
  proof.title !== 'Playground' ||
  !proof.isLit ||
  proof.ctorName !== 'LitButtonTile' ||
  proof.buttonCtor !== 'LitButton' ||
  proof.tagCtor !== 'LitTag' ||
  proof.textCtor !== 'LitText' ||
  proof.litTagDefined ||
  proof.hostCount !== 5 ||
  proof.buttonCount !== 10 ||
  proof.tagCount !== 4 ||
  proof.textCount !== 4 ||
  stillLazy ||
  proof.hosts.some((item, i) => {
    const want = expected[i];
    return (
      item.tag !== 'p-button-tile' ||
      item.ctor !== 'LitButtonTile' ||
      item.aspectRatio !== want.aspectRatio ||
      item.align !== want.align ||
      item.gradient !== want.gradient ||
      item.disabled !== want.disabled ||
      item.loading !== want.loading ||
      item.header !== want.header ||
      item.footer !== want.footer ||
      item.cssHasFooterSlot !== want.cssHasFooterSlot ||
      !item.hasShadow ||
      !item.hasStyle ||
      !item.hasRoot ||
      !item.hasMedia ||
      !item.hasFooter ||
      item.buttonCount !== 2 ||
      !item.hasLabeledButton ||
      !item.hasCompactButton ||
      !item.imgComplete ||
      item.hydrated ||
      item.hasFragment
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
