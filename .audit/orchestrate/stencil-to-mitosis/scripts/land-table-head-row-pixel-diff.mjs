#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const BASELINE = new URL(
  '../baseline/stencil_table_head_row_before.png',
  import.meta.url
);
const AFTER = '/opt/cursor/artifacts/mitosis_land_table_head_row_after.png';
const AFTER_PASS = '/opt/cursor/artifacts/mitosis_land_table_head_row_after_pass.png';
const DIFF = '/opt/cursor/artifacts/land_table_head_row_pixel_diff.png';
const LOG = '/opt/cursor/artifacts/land_table_head_row_verify.log';
const URL = 'http://localhost:3333/?components=table';
const EXPECTED_BYTES = 57465;
const EXPECTED_SHA = '15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3';

const lines = [];
const log = (msg) => {
  lines.push(msg);
  console.log(msg);
};

const fail = async (msg) => {
  log(`FAIL: ${msg}`);
  await writeFile(LOG, `${lines.join('\n')}\n`);
  process.exit(1);
};

const baselineBuf = await readFile(BASELINE);
log(`baseline bytes=${baselineBuf.length} expected=${EXPECTED_BYTES}`);
if (baselineBuf.length !== EXPECTED_BYTES) {
  await fail(`baseline size mismatch: ${baselineBuf.length} !== ${EXPECTED_BYTES}`);
}
const baselineSha = createHash('sha256').update(baselineBuf).digest('hex');
log(`baseline sha256=${baselineSha}`);
if (baselineSha !== EXPECTED_SHA) {
  await fail(`baseline sha mismatch: ${baselineSha} !== ${EXPECTED_SHA}`);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

const consoleMessages = [];
page.on('console', (msg) => {
  consoleMessages.push(`${msg.type()}: ${msg.text()}`);
});
page.on('pageerror', (err) => {
  consoleMessages.push(`pageerror: ${err.message}`);
});

await page.goto(URL, { waitUntil: 'load', timeout: 120_000 });
await page.waitForSelector('[data-card="table"]', { timeout: 60_000 });
await page.waitForFunction(
  () =>
    document.querySelectorAll('p-table-head-row').length === 2 &&
    [...document.querySelectorAll('p-table-head-row')].every((el) => el.shadowRoot),
  { timeout: 60_000 }
);

const iifeStatus = await page.evaluate(async () => {
  const res = await fetch('/assets/p-table-head-row.iife.js', { method: 'HEAD' });
  return res.status;
});
log(`iife HEAD /assets/p-table-head-row.iife.js status=${iifeStatus}`);
if (iifeStatus !== 200) {
  await browser.close();
  await fail(`IIFE not served: ${iifeStatus}`);
}

const snapshot = await page.evaluate(async () => {
  const loader = await fetch('/build/porsche-design-system.esm.js').then((r) => r.text());
  const exactTag = /"p-table-head-row"/.test(loader);
  const rows = [...document.querySelectorAll('p-table-head-row')];
  const heads = [...document.querySelectorAll('p-table-head')];
  const table = document.querySelector('p-table');
  return {
    exactTag,
    tableCtor: table?.constructor?.name ?? null,
    tableHydrated: table?.classList.contains('hydrated') ?? null,
    headCount: heads.length,
    headCtors: heads.map((el) => el.constructor.name),
    headHydrated: heads.map((el) => el.classList.contains('hydrated')),
    count: rows.length,
    ctors: rows.map((el) => el.constructor.name),
    hydrated: rows.map((el) => el.classList.contains('hydrated')),
    roles: rows.map((el) => el.getAttribute('role')),
    cssTexts: rows.map((el) => el.shadowRoot?.adoptedStyleSheets?.[0]?.cssRules?.[0]?.cssText ?? ''),
    htmls: rows.map((el) => el.shadowRoot?.innerHTML ?? ''),
    cells: rows.map((el) =>
      [...el.querySelectorAll('p-table-head-cell')].map((cell) => ({
        ctor: cell.constructor.name,
        hydrated: cell.classList.contains('hydrated'),
      }))
    ),
  };
});

log(`loader exact "p-table-head-row"=${snapshot.exactTag}`);
log(`p-table ctor=${snapshot.tableCtor} hydrated=${snapshot.tableHydrated}`);
log(`p-table-head count=${snapshot.headCount} ctors=${snapshot.headCtors.join(',')} hydrated=${snapshot.headHydrated.join(',')}`);
log(`p-table-head-row count=${snapshot.count} ctors=${snapshot.ctors.join(',')} hydrated=${snapshot.hydrated.join(',')}`);
log(`roles=${JSON.stringify(snapshot.roles)}`);
log(`cssTexts=${JSON.stringify(snapshot.cssTexts)}`);
log(`htmls=${JSON.stringify(snapshot.htmls)}`);
log(`cells=${JSON.stringify(snapshot.cells)}`);

if (snapshot.exactTag) {
  await browser.close();
  await fail('bootstrapLazy still registers exact "p-table-head-row"');
}
if (snapshot.tableCtor !== 'LitTable' || snapshot.tableHydrated) {
  await browser.close();
  await fail('p-table is not the already-landed Lit host');
}
if (snapshot.headCount !== 2 || snapshot.headCtors.some((name) => name !== 'LitTableHead') || snapshot.headHydrated.some(Boolean)) {
  await browser.close();
  await fail('p-table-head is not the already-landed Lit host');
}
if (snapshot.count !== 2) {
  await browser.close();
  await fail(`expected 2 p-table-head-row hosts, got ${snapshot.count}`);
}
if (snapshot.ctors.some((name) => name !== 'LitTableHeadRow')) {
  await browser.close();
  await fail(`unexpected constructors: ${snapshot.ctors.join(',')}`);
}
if (snapshot.hydrated.some(Boolean)) {
  await browser.close();
  await fail('p-table-head-row still has Stencil hydrated class');
}
if (snapshot.roles.some((role) => role !== 'row')) {
  await browser.close();
  await fail(`expected role=row on both hosts, got ${JSON.stringify(snapshot.roles)}`);
}
if (snapshot.cssTexts.some((css) => !css.includes('table-row'))) {
  await browser.close();
  await fail('cssText missing table-row');
}
if (snapshot.htmls.some((html) => html.includes('class="root"') || html.includes('my-fragment'))) {
  await browser.close();
  await fail('shadow HTML still wraps slot in .root or my-fragment');
}
if (snapshot.htmls.some((html) => !html.includes('<slot></slot>'))) {
  await browser.close();
  await fail('shadow HTML missing default slot');
}
if (snapshot.cells.some((list) => list.length === 0 || list.some((cell) => cell.ctor === 'LitTableHeadRow' || !cell.hydrated))) {
  await browser.close();
  await fail('nested p-table-head-cell is not the leftover Stencil host');
}

await page.addStyleTag({
  content: ':root { --p-animation-duration: 0s; --p-transition-duration: 0s; }',
});
await page.waitForTimeout(250);

const card = page.locator('[data-card="table"]');
const box = await card.boundingBox();
if (!box) {
  await browser.close();
  await fail('table card has no bounding box');
}
log(`card box x=${box.x} y=${box.y} w=${box.width} h=${box.height}`);

const clip = {
  x: Math.max(0, box.x),
  y: Math.max(0, box.y),
  width: Math.min(box.width, 1440 - Math.max(0, box.x)),
  height: Math.min(box.height, 900 - Math.max(0, box.y)),
};
log(`clip x=${clip.x} y=${clip.y} w=${clip.width} h=${clip.height}`);

const shot = await page.screenshot({
  type: 'png',
  clip,
  animations: 'disabled',
});

await mkdir('/opt/cursor/artifacts', { recursive: true });
await writeFile(AFTER, shot);

const afterPng = PNG.sync.read(shot);
const baselinePng = PNG.sync.read(baselineBuf);
log(`after ${afterPng.width}x${afterPng.height} baseline ${baselinePng.width}x${baselinePng.height}`);
if (afterPng.width !== baselinePng.width || afterPng.height !== baselinePng.height) {
  await browser.close();
  await fail(
    `dimension mismatch after ${afterPng.width}x${afterPng.height} vs baseline ${baselinePng.width}x${baselinePng.height}`
  );
}

const diffPng = new PNG({ width: afterPng.width, height: afterPng.height });
const mismatched = pixelmatch(
  baselinePng.data,
  afterPng.data,
  diffPng.data,
  afterPng.width,
  afterPng.height,
  { threshold: 0, includeAA: true }
);
await writeFile(DIFF, PNG.sync.write(diffPng));
const total = afterPng.width * afterPng.height;
log(`strictMismatch=${mismatched} total=${total}`);

const afterSha = createHash('sha256').update(shot).digest('hex');
log(`after bytes=${shot.length} sha256=${afterSha}`);
log(`byteEqual=${Buffer.compare(shot, baselineBuf) === 0}`);

const interesting = consoleMessages.filter(
  (msg) =>
    !msg.includes('ERR_CONNECTION_REFUSED') &&
    !msg.includes('should be of kind') &&
    !msg.includes('parent HTMLElement of') &&
    !msg.includes('3002')
);
log(`console interesting=${JSON.stringify(interesting)}`);

await browser.close();

if (mismatched !== 0) {
  await fail(`pixel-diff ${mismatched}`);
}

await copyFile(AFTER, AFTER_PASS);
log(`copied after → ${AFTER_PASS}`);
await writeFile(LOG, `${lines.join('\n')}\n`);
console.log(`wrote ${LOG}`);
