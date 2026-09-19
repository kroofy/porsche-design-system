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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=table';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_table_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_table_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 57465;
const EXPECTED_BASELINE_SHA = '15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-table.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`table IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-table"/.test(loaderText);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-table') &&
    customElements.get('p-scroller') &&
    customElements.get('p-heading') &&
    customElements.get('p-table-head') &&
    customElements.get('p-table-body'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="table"] p-table', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="table"] p-table')];
  const Host = customElements.get('p-table');
  const Scroller = customElements.get('p-scroller');
  const Heading = customElements.get('p-heading');
  const Head = customElements.get('p-table-head');
  const Body = customElements.get('p-table-body');
  if (hosts.length !== 2) return false;
  if (Host?.name !== 'LitTable') return false;
  if (Scroller?.name !== 'LitScroller') return false;
  if (Heading?.name !== 'LitHeading') return false;
  if (Head?.name !== 'LitTableHead') return false;
  if (Body?.name !== 'LitTableBody') return false;
  return hosts.every((el, i) => {
    if (el.classList.contains('hydrated')) return false;
    const root = el.shadowRoot;
    const style = root?.querySelector('style');
    const table = root?.querySelector('.table');
    const scroller = root?.querySelector('p-scroller');
    const sheets = root?.adoptedStyleSheets ?? [];
    const sheetText = sheets
      .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
      .join(' ');
    if (!root || style || !sheets.length || !table || !scroller) return false;
    if (!sheetText.includes('--_p-table-a') || !sheetText.includes('--p-scroller-indicator-top')) return false;
    if (root.querySelector('my-fragment') || root.querySelector('lit-table') || root.querySelector('.root')) {
      return false;
    }
    if (scroller.constructor?.name !== 'LitScroller') return false;
    if (scroller.getAttribute('scrollbar') !== 'true') return false;
    const head = el.querySelector(':scope > p-table-head');
    const body = el.querySelector(':scope > p-table-body');
    if (!head || !body) return false;
    if (head.classList.contains('hydrated') || body.classList.contains('hydrated')) return false;
    if (head.constructor?.name !== 'LitTableHead' || body.constructor?.name !== 'LitTableBody') return false;
    if (i === 0) {
      if (table.getAttribute('aria-label') !== 'Some caption') return false;
      if (root.querySelector('slot[name="caption"]')) return false;
    } else {
      if (!root.querySelector('slot[name="caption"]')) return false;
      if (el.querySelector(':scope > p-heading[slot="caption"]')?.constructor?.name !== 'LitHeading') return false;
    }
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const hosts = [...document.querySelectorAll('[data-card="table"] p-table')];
  await Promise.all(hosts.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const Host = customElements.get('p-table');
  const hosts = [...document.querySelectorAll('[data-card="table"] p-table')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Host?.name ?? null,
    isLit: !!Host && 'elementProperties' in Host,
    definedTag: 'p-table',
    litTagDefined: !!customElements.get('lit-table'),
    scrollerCtor: customElements.get('p-scroller')?.name ?? null,
    headingCtor: customElements.get('p-heading')?.name ?? null,
    headCtor: customElements.get('p-table-head')?.name ?? null,
    hostCount: hosts.length,
    hosts: hosts.map((el, i) => {
      const style = el.shadowRoot?.querySelector('style');
      const table = el.shadowRoot?.querySelector('.table');
      const scroller = el.shadowRoot?.querySelector('p-scroller');
      const sheetText = (el.shadowRoot?.adoptedStyleSheets ?? [])
        .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
        .join(' ');
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        caption: el.getAttribute('caption'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        cssTextLen: sheetText.length,
        hasTableVars: sheetText.includes('--_p-table-a') && sheetText.includes('--p-scroller-indicator-top'),
        hasRootWrap: !!el.shadowRoot?.querySelector('.root'),
        hasTable: !!table,
        role: table?.getAttribute('role') ?? null,
        ariaLabel: table?.getAttribute('aria-label') ?? null,
        ariaLabelledby: table?.getAttribute('aria-labelledby') ?? null,
        scrollerTag: scroller?.tagName ?? null,
        scrollerCtor: scroller?.constructor?.name ?? null,
        scrollbar: scroller?.getAttribute('scrollbar') ?? null,
        compact: scroller?.hasAttribute('compact') ? scroller.getAttribute('compact') : null,
        sticky: scroller?.hasAttribute('sticky') ? scroller.getAttribute('sticky') : null,
        hasCaptionSlot: !!el.shadowRoot?.querySelector('slot[name="caption"]'),
        lightCaption: el.querySelector(':scope > [slot="caption"]')?.tagName ?? null,
        lightHead: el.querySelector(':scope > p-table-head')?.tagName ?? null,
        lightBody: el.querySelector(':scope > p-table-body')?.tagName ?? null,
        headHydrated: !!el.querySelector(':scope > p-table-head')?.classList.contains('hydrated'),
        bodyHydrated: !!el.querySelector(':scope > p-table-body')?.classList.contains('hydrated'),
        headingCtor: el.querySelector(':scope > p-heading')?.constructor?.name ?? null,
        headCtor: el.querySelector(':scope > p-table-head')?.constructor?.name ?? null,
        bodyCtor: el.querySelector(':scope > p-table-body')?.constructor?.name ?? null,
        hostStyle: el.getAttribute('style'),
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        index: i,
      };
    }),
  };
});

const box = await page.locator('[data-card="table"]').boundingBox();
if (!box) {
  console.error('land-table-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitTable' ||
  proof.scrollerCtor !== 'LitScroller' ||
  proof.headingCtor !== 'LitHeading' ||
  proof.litTagDefined ||
  proof.hostCount !== 2 ||
  stillLazy ||
  proof.hosts.some((item, i) => {
    return (
      item.tag !== 'p-table' ||
      item.ctor !== 'LitTable' ||
      !item.hasShadow ||
      item.hasStyle ||
      !item.adoptedSheets ||
      item.cssTextLen < 100 ||
      !item.hasTableVars ||
      item.hasRootWrap ||
      !item.hasTable ||
      item.role !== 'table' ||
      item.scrollerTag !== 'P-SCROLLER' ||
      item.scrollerCtor !== 'LitScroller' ||
      item.scrollbar !== 'true' ||
      item.lightHead !== 'P-TABLE-HEAD' ||
      item.lightBody !== 'P-TABLE-BODY' ||
      item.headCtor !== 'LitTableHead' ||
      item.bodyCtor !== 'LitTableBody' ||
      item.headHydrated ||
      item.bodyHydrated ||
      item.hydrated ||
      item.hasFragment ||
      (i === 0
        ? item.caption !== 'Some caption' ||
          item.ariaLabel !== 'Some caption' ||
          item.hasCaptionSlot ||
          item.lightCaption
        : item.hasCaptionSlot !== true ||
          item.lightCaption !== 'P-HEADING' ||
          item.headingCtor !== 'LitHeading' ||
          item.ariaLabelledby !== 'caption' ||
          !item.hostStyle?.includes('--p-table-scroll-indicator-top'))
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
