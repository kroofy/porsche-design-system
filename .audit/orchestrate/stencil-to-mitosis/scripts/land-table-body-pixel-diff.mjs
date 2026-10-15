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
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_body_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_table_body_after.png';
const AFTER_PASS = '/opt/cursor/artifacts/mitosis_land_table_body_after_pass.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_table_body_pixel_diff.png';
const LOG = '/opt/cursor/artifacts/land_table_body_verify.log';
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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-table-body.iife.js');
log(`iife HEAD /assets/p-table-body.iife.js status=${iifeAsset.status()}`);
if (iifeAsset.status() !== 200) {
  throw new Error(`table-body IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-table-body"/.test(loaderText);
log(`loader exact "p-table-body"=${stillLazy}`);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-table') &&
    customElements.get('p-table-head') &&
    customElements.get('p-table-body') &&
    customElements.get('p-table-row') &&
    customElements.get('p-table-cell'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="table"] p-table-body', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const tables = [...document.querySelectorAll('[data-card="table"] p-table')];
  const bodies = [...document.querySelectorAll('[data-card="table"] p-table-body')];
  const rows = [...document.querySelectorAll('[data-card="table"] p-table-row')];
  const cells = [...document.querySelectorAll('[data-card="table"] p-table-cell')];
  const Table = customElements.get('p-table');
  const Body = customElements.get('p-table-body');
  if (tables.length !== 2 || bodies.length !== 2 || rows.length !== 4 || cells.length !== 20) return false;
  if (Table?.name !== 'LitTable') return false;
  if (Body?.name !== 'LitTableBody') return false;
  if (tables.some((el) => el.classList.contains('hydrated'))) return false;
  return bodies.every((el) => {
    if (el.classList.contains('hydrated')) return false;
    if (el.parentElement?.tagName !== 'P-TABLE') return false;
    if (el.parentElement?.constructor?.name !== 'LitTable') return false;
    const root = el.shadowRoot;
    const style = root?.querySelector('style');
    const slot = root?.querySelector('slot');
    if (!root || !style || !slot) return false;
    if (root.querySelector('my-fragment') || root.querySelector('lit-table-body') || root.querySelector('.root')) {
      return false;
    }
    if (el.getAttribute('role') !== 'rowgroup') return false;
    const css = style.textContent || '';
    if (!css.includes('table-row-group')) return false;
    const nestedRows = [...el.querySelectorAll(':scope > p-table-row')];
    const nestedCells = [...el.querySelectorAll('p-table-cell')];
    return (
      nestedRows.length > 0 &&
      nestedRows.every((row) => row.classList.contains('hydrated')) &&
      nestedCells.length > 0 &&
      nestedCells.every((cell) => cell.classList.contains('hydrated'))
    );
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const bodies = [...document.querySelectorAll('[data-card="table"] p-table-body')];
  await Promise.all(bodies.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const Body = customElements.get('p-table-body');
  const tables = [...document.querySelectorAll('[data-card="table"] p-table')];
  const bodies = [...document.querySelectorAll('[data-card="table"] p-table-body')];
  const rows = [...document.querySelectorAll('[data-card="table"] p-table-row')];
  const cells = [...document.querySelectorAll('[data-card="table"] p-table-cell')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Body?.name ?? null,
    isLit: !!Body && 'elementProperties' in Body,
    definedTag: 'p-table-body',
    litTagDefined: !!customElements.get('lit-table-body'),
    tableCtor: customElements.get('p-table')?.name ?? null,
    rowCtor: customElements.get('p-table-row')?.name ?? null,
    cellCtor: customElements.get('p-table-cell')?.name ?? null,
    parentCount: tables.length,
    hostCount: bodies.length,
    rowCount: rows.length,
    cellCount: cells.length,
    hosts: bodies.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const css = style?.textContent ?? '';
      const nestedRows = [...el.querySelectorAll(':scope > p-table-row')];
      const nestedCells = [...el.querySelectorAll('p-table-cell')];
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        parentTag: el.parentElement?.tagName ?? null,
        parentCtor: el.parentElement?.constructor?.name ?? null,
        role: el.getAttribute('role'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        cssText: css,
        hasRowGroup: css.includes('table-row-group'),
        hasRootWrap: !!el.shadowRoot?.querySelector('.root'),
        hasSlot: !!el.shadowRoot?.querySelector('slot'),
        rowCount: nestedRows.length,
        cellCount: nestedCells.length,
        rowsHydrated: nestedRows.every((row) => row.classList.contains('hydrated')),
        cellsHydrated: nestedCells.every((cell) => cell.classList.contains('hydrated')),
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
  console.error('land-table-body-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitTableBody' ||
  proof.tableCtor !== 'LitTable' ||
  proof.litTagDefined ||
  proof.parentCount !== 2 ||
  proof.hostCount !== 2 ||
  proof.rowCount !== 4 ||
  proof.cellCount !== 20 ||
  stillLazy ||
  proof.hosts.some((item) => {
    return (
      item.tag !== 'p-table-body' ||
      item.ctor !== 'LitTableBody' ||
      item.parentTag !== 'P-TABLE' ||
      item.parentCtor !== 'LitTable' ||
      item.role !== 'rowgroup' ||
      !item.hasShadow ||
      !item.hasStyle ||
      !item.hasRowGroup ||
      item.hasRootWrap ||
      !item.hasSlot ||
      item.rowCount < 1 ||
      item.cellCount < 1 ||
      !item.rowsHydrated ||
      !item.cellsHydrated ||
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
