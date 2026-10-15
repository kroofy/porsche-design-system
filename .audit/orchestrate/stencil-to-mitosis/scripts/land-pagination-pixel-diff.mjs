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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=pagination';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_pagination_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_pagination_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_pagination_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 13801;
const EXPECTED_BASELINE_SHA = 'efc02a36beb4f7618696769d8a03c56b2bb32d6747a2b6ba579dac98daaddc4f';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-pagination.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`IIFE HTTP ${iifeAsset.status()}`);
}

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-pagination') && customElements.get('p-icon'), {
  timeout: 20_000,
});
await page.evaluate(() => document.fonts.ready);
await page.waitForSelector('[data-card="pagination"] p-pagination', { state: 'attached', timeout: 20_000 });
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="pagination"] > p-pagination')];
  const Ctor = customElements.get('p-pagination');
  const Icon = customElements.get('p-icon');
  return (
    hosts.length >= 2 &&
    Ctor?.name === 'LitPagination' &&
    Icon?.name === 'LitIcon' &&
    hosts.every((el) => {
      const root = el.shadowRoot;
      const style = root?.querySelector('style');
      const sheets = root?.adoptedStyleSheets ?? [];
      const sheetText = [...sheets].flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText)).join('');
      const nav = root?.querySelector('nav');
      const lis = root?.querySelectorAll('li') ?? [];
      const icons = [...(root?.querySelectorAll('p-icon') ?? [])];
      return (
        !!root &&
        !style &&
        sheets.length >= 1 &&
        sheetText.includes('min-width: 760px') &&
        !!nav &&
        lis.length >= 8 &&
        icons.length >= 2 &&
        icons.every((icon) => icon.shadowRoot?.querySelector('img')?.complete) &&
        !el.classList.contains('hydrated') &&
        !root.querySelector('my-fragment') &&
        !root.querySelector('lit-pagination')
      );
    })
  );
}, { timeout: 20_000 });

await page.evaluate(() => {
  const root = document.documentElement.style;
  root.setProperty('--p-animation-duration', '0s');
  root.setProperty('--p-transition-duration', '0s');
});

const proof = await page.evaluate(() => {
  const Ctor = customElements.get('p-pagination');
  const hosts = [...document.querySelectorAll('[data-card="pagination"] > p-pagination')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    definedTag: 'p-pagination',
    litTagDefined: !!customElements.get('lit-pagination'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const nav = el.shadowRoot?.querySelector('nav');
      const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])];
      return {
        tag: el.localName,
        totalItemsCount: el.getAttribute('total-items-count'),
        itemsPerPage: el.getAttribute('items-per-page'),
        activePage: el.getAttribute('active-page'),
        showLastPage: el.getAttribute('show-last-page'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        ellipVar: el.style.getPropertyValue('--p-pg-ellip'),
        hasNav: !!nav,
        liCount: el.shadowRoot?.querySelectorAll('li').length ?? 0,
        hasEllipStart: !!el.shadowRoot?.querySelector('li.ellip-start'),
        ellipStartDisplay: el.shadowRoot?.querySelector('li.ellip-start')
          ? getComputedStyle(el.shadowRoot.querySelector('li.ellip-start')).display
          : null,
        iconNames: icons.map((n) => n.getAttribute('name')),
        iconCtor: icons.map((n) => n.constructor?.name),
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});

const box = await page.locator('[data-card="pagination"]').boundingBox();
if (!box) {
  console.error('land-pagination-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitPagination' ||
  proof.litTagDefined ||
  proof.animationDuration !== '0s' ||
  proof.hostCount < 2 ||
  proof.hosts.some((h) => {
    return (
      h.tag !== 'p-pagination' ||
      !h.hasShadow ||
      h.hasStyle ||
      (h.adoptedSheets ?? 0) < 1 ||
      !h.hasNav ||
      h.liCount < 8 ||
      h.hydrated ||
      h.hasFragment ||
      h.iconCtor.some((name) => name !== 'LitIcon')
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
