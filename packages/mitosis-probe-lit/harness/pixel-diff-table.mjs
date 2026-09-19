import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=table';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_table_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/table_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_table_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const pauseCardAnimation = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
    document.documentElement.style.setProperty('--p-duration-md', '0s');
    document.documentElement.style.setProperty('--p-duration-sm', '0s');
  });
};

const hostReady = () => {
  const hosts = [...document.querySelectorAll('[data-card="table"] p-table, [data-card="table"] lit-table')];
  return (
    hosts.length >= 2 &&
    hosts.every((el) => {
      if (el.tagName === 'P-TABLE' && !el.classList.contains('hydrated')) return false;
      const table = el.shadowRoot?.querySelector('.table');
      const scroller = el.shadowRoot?.querySelector('p-scroller');
      if (!table || !scroller) return false;
      if (scroller.tagName !== 'P-SCROLLER') return false;
      if (!scroller.classList.contains('hydrated')) return false;
      const nested = [
        ...el.querySelectorAll(
          ':scope p-table-head, :scope p-table-body, :scope p-table-row, :scope p-table-cell, :scope p-table-head-row, :scope p-table-head-cell, :scope p-heading',
        ),
      ];
      return nested.length > 0 && nested.every((child) => child.classList.contains('hydrated'));
    })
  );
};

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() !== 'error') return;
  const text = msg.text();
  const loc = msg.location()?.url ?? '';
  if (text.includes('ERR_CONNECTION_REFUSED') && (text.includes('3002') || loc.includes('3002'))) return;
  if (text.includes('parent HTMLElement of p-table-') && text.includes('got lit-table')) return;
  consoleErrors.push(loc ? `${text} @ ${loc}` : text);
});
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-table') &&
    customElements.get('p-scroller') &&
    customElements.get('p-table-head') &&
    customElements.get('p-table-body') &&
    customElements.get('p-heading'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="table"] p-table.hydrated', {
  timeout: 20_000,
  state: 'attached',
});
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="table"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-table.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-table'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="table"] p-table')];
  for (const el of hosts) {
    const lit = document.createElement('lit-table');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    lit.caption = el.caption ?? el.getAttribute('caption');
    lit.compact = el.compact;
    lit.layout = el.layout ?? el.getAttribute('layout');
    lit.sticky = el.sticky;
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
await page.evaluate(async () => {
  await Promise.all([...document.querySelectorAll('[data-card="table"] lit-table')].map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="table"] lit-table')].filter((el) =>
      el.shadowRoot?.querySelector('.table'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="table"] lit-table')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="table"] lit-table')
      ?.shadowRoot?.querySelector('lit-scroller,lit-table-head,lit-table-body,lit-heading'),
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="table"] lit-table')].every((el) => el.querySelector(':scope > p-table-head')) &&
    !!document.querySelector('[data-card="table"] lit-table > p-heading[slot="caption"]'),
);
swap.nested = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="table"] lit-table')];
  const scrollers = hosts.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-scroller') ?? [])]);
  const heads = [...document.querySelectorAll('[data-card="table"] lit-table > p-table-head')];
  const bodies = [...document.querySelectorAll('[data-card="table"] lit-table > p-table-body')];
  const headings = [...document.querySelectorAll('[data-card="table"] lit-table > p-heading')];
  return {
    hostCount: hosts.length,
    scrollerTags: [...new Set(scrollers.map((n) => n.tagName))],
    headTags: [...new Set(heads.map((n) => n.tagName))],
    bodyTags: [...new Set(bodies.map((n) => n.tagName))],
    headingTags: [...new Set(headings.map((n) => n.tagName))],
  };
});

await mkdir(dirname(AFTER_PNG), { recursive: true });
await writeFile(AFTER_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));
await browser.close();

const diffPair = (aBuf, bBuf, outPath) => {
  const a = PNG.sync.read(aBuf);
  const b = PNG.sync.read(bBuf);
  const result = { aSize: `${a.width}x${a.height}`, bSize: `${b.width}x${b.height}` };
  if (a.width !== b.width || a.height !== b.height) {
    result.error = 'dimension mismatch, no per-pixel diff possible';
    return result;
  }
  const diff = new PNG({ width: a.width, height: a.height });
  result.strictMismatch = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
    threshold: 0,
    includeAA: true,
  });
  result.perceptualMismatch = pixelmatch(a.data, b.data, null, a.width, a.height, { threshold: 0.1 });
  result.totalPixels = a.width * a.height;
  if (outPath) {
    result.diffPng = outPath;
    return { ...result, _diffBuf: PNG.sync.write(diff) };
  }
  return result;
};

const baselineBuf = await readFile(BASELINE_PNG);
const control = diffPair(baselineBuf, await readFile(CONTROL_PNG), null);
const litResult = diffPair(baselineBuf, await readFile(AFTER_PNG), DIFF_PNG);
if (litResult._diffBuf) {
  await writeFile(DIFF_PNG, litResult._diffBuf);
  delete litResult._diffBuf;
}

const summary = {
  baseline: BASELINE_PNG,
  after: AFTER_PNG,
  swap,
  controlStencilVsBaseline: control,
  litVsBaseline: litResult,
  consoleErrors,
};
console.warn(JSON.stringify(summary, null, 2));
const failed =
  litResult.error ||
  litResult.strictMismatch !== 0 ||
  control.strictMismatch !== 0 ||
  swap.litRendered !== swap.swapped ||
  swap.fragment ||
  swap.innerLit ||
  !swap.slottedCopied ||
  swap.swapped < 2 ||
  (swap.nested && swap.nested.scrollerTags.some((tag) => tag !== 'P-SCROLLER')) ||
  (swap.nested && swap.nested.headTags.some((tag) => tag !== 'P-TABLE-HEAD')) ||
  (swap.nested && swap.nested.bodyTags.some((tag) => tag !== 'P-TABLE-BODY')) ||
  (swap.nested && swap.nested.headingTags.some((tag) => tag !== 'P-HEADING')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
