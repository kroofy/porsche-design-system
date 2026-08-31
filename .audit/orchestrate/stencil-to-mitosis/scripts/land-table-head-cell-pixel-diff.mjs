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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=table';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_head_cell_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_table_head_cell_after.png';
const AFTER_PASS = '/opt/cursor/artifacts/mitosis_land_table_head_cell_after_pass.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_table_head_cell_pixel_diff.png';
const LOG = '/opt/cursor/artifacts/land_table_head_cell_verify.log';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 57465;
const EXPECTED_BASELINE_SHA = '15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-table-head-cell.iife.js');
log(`iife HEAD /assets/p-table-head-cell.iife.js status=${iifeAsset.status()}`);
if (iifeAsset.status() !== 200) {
  throw new Error(`table-head-cell IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-table-head-cell"/.test(loaderText);
log(`loader exact "p-table-head-cell"=${stillLazy}`);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-table') &&
    customElements.get('p-table-head') &&
    customElements.get('p-table-head-row') &&
    customElements.get('p-table-head-cell'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="table"] p-table-head-cell', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const rows = [...document.querySelectorAll('[data-card="table"] p-table-head-row')];
  const cells = [...document.querySelectorAll('[data-card="table"] p-table-head-cell')];
  const Table = customElements.get('p-table');
  const Head = customElements.get('p-table-head');
  const Row = customElements.get('p-table-head-row');
  const Cell = customElements.get('p-table-head-cell');
  if (rows.length !== 2 || cells.length !== 10) return false;
  if (Table?.name !== 'LitTable') return false;
  if (Head?.name !== 'LitTableHead') return false;
  if (Row?.name !== 'LitTableHeadRow') return false;
  if (Cell?.name !== 'LitTableHeadCell') return false;
  if (rows.some((el) => el.classList.contains('hydrated'))) return false;
  return cells.every((el) => {
    if (el.classList.contains('hydrated')) return false;
    if (el.parentElement?.tagName !== 'P-TABLE-HEAD-ROW') return false;
    if (el.parentElement?.constructor?.name !== 'LitTableHeadRow') return false;
    const root = el.shadowRoot;
    const style = root?.querySelector('style');
    const slot = root?.querySelector('slot');
    const span = root?.querySelector('span');
    if (!root || !style || !slot || !span) return false;
    if (root.querySelector('my-fragment') || root.querySelector('lit-table-head-cell') || root.querySelector('.root')) {
      return false;
    }
    if (root.querySelector('button')) return false;
    if (el.getAttribute('role') !== 'columnheader') return false;
    if (el.getAttribute('scope') !== 'col') return false;
    const css = style.textContent || '';
    if (!css.includes('table-cell') || !css.includes('--_p-table-a')) return false;
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const cells = [...document.querySelectorAll('[data-card="table"] p-table-head-cell')];
  await Promise.all(cells.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const Cell = customElements.get('p-table-head-cell');
  const rows = [...document.querySelectorAll('[data-card="table"] p-table-head-row')];
  const cells = [...document.querySelectorAll('[data-card="table"] p-table-head-cell')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Cell?.name ?? null,
    isLit: !!Cell && 'elementProperties' in Cell,
    definedTag: 'p-table-head-cell',
    litTagDefined: !!customElements.get('lit-table-head-cell'),
    tableCtor: customElements.get('p-table')?.name ?? null,
    headCtor: customElements.get('p-table-head')?.name ?? null,
    rowCtor: customElements.get('p-table-head-row')?.name ?? null,
    parentCount: rows.length,
    hostCount: cells.length,
    hosts: cells.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const css = style?.textContent ?? '';
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        parentTag: el.parentElement?.tagName ?? null,
        parentCtor: el.parentElement?.constructor?.name ?? null,
        role: el.getAttribute('role'),
        scope: el.getAttribute('scope'),
        ariaSort: el.getAttribute('aria-sort'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        cssText: css,
        hasTableCell: css.includes('table-cell'),
        hasPaddingVar: css.includes('--_p-table-a'),
        hasNowrap: css.includes('white-space:nowrap'),
        hasRootWrap: !!el.shadowRoot?.querySelector('.root'),
        hasSpan: !!el.shadowRoot?.querySelector('span'),
        hasSlot: !!el.shadowRoot?.querySelector('slot'),
        hasButton: !!el.shadowRoot?.querySelector('button'),
        parentHydrated: el.parentElement?.classList.contains('hydrated') ?? true,
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});
log(proof);

const box = await page.locator('[data-card="table"]').boundingBox();
if (!box) {
  await writeFile(LOG, `${lines.join('\n')}\n`);
  console.error('land-table-head-cell-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitTableHeadCell' ||
  proof.tableCtor !== 'LitTable' ||
  proof.headCtor !== 'LitTableHead' ||
  proof.rowCtor !== 'LitTableHeadRow' ||
  proof.litTagDefined ||
  proof.parentCount !== 2 ||
  proof.hostCount !== 10 ||
  stillLazy ||
  proof.hosts.some((item) => {
    return (
      item.tag !== 'p-table-head-cell' ||
      item.ctor !== 'LitTableHeadCell' ||
      item.parentTag !== 'P-TABLE-HEAD-ROW' ||
      item.parentCtor !== 'LitTableHeadRow' ||
      item.role !== 'columnheader' ||
      item.scope !== 'col' ||
      item.ariaSort != null ||
      !item.hasShadow ||
      !item.hasStyle ||
      !item.hasTableCell ||
      !item.hasPaddingVar ||
      !item.hasNowrap ||
      item.hasRootWrap ||
      !item.hasSpan ||
      !item.hasSlot ||
      item.hasButton ||
      item.parentHydrated ||
      item.hydrated ||
      item.hasFragment
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
