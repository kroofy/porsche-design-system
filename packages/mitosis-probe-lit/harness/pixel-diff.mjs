import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = 'http://localhost:3333/?components=divider';
const BASELINE_PNG = '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_divider_before.png';
const AFTER_PNG = '/opt/cursor/artifacts/mitosis_lit_divider_after.png';
const DIFF_PNG = '/opt/cursor/artifacts/divider_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_control.png`;
// Identical to capture-stencil-divider-baseline.mjs.
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-divider'), { timeout: 20_000 });
await page.waitForSelector('[data-card="divider"] p-divider.hydrated', { timeout: 20_000 });

// Stencil semantics reference: where does the live p-divider flip the
// breakpoint object? Measured off-card, element removed afterwards.
const stencilFlip = {};
await page.evaluate(() => {
  const el = document.createElement('p-divider');
  el.id = 'bp-probe';
  el.setAttribute('direction', '{"base":"horizontal","m":"vertical"}');
  el.style.height = '60px';
  document.body.appendChild(el);
});
for (const width of [640, 999, 1000, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(100);
  stencilFlip[`at${width}`] = await page.evaluate(() => {
    const hr = document.querySelector('#bp-probe').shadowRoot.querySelector('hr');
    const cs = getComputedStyle(hr);
    return { width: cs.width, height: cs.height, vertical: cs.width === '1px' };
  });
}
await page.evaluate(() => document.querySelector('#bp-probe').remove());
await page.setViewportSize(VIEWPORT);
await page.waitForTimeout(200);

const card = page.locator('[data-card="divider"]');
await card.scrollIntoViewIfNeeded();

// Control: fresh Stencil capture vs stored baseline proves the environment
// has not drifted since the baseline was taken, so any lit diff is the
// component's own doing.
await writeFile(CONTROL_PNG, await card.screenshot({ type: 'png' }));

// Swap the five p-divider hosts in the card for lit-divider, all attributes
// copied verbatim. Baseline markup and card CSS stay untouched.
await page.addScriptTag({ path: `${HARNESS_DIR}/lit-divider.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-divider'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="divider"] p-divider')];
  for (const el of hosts) {
    const lit = document.createElement('lit-divider');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await page.waitForTimeout(300);
swap.litRendered = await page.evaluate(
  () => [...document.querySelectorAll('[data-card="divider"] lit-divider')].filter((el) => el.shadowRoot?.querySelector('hr')).length
);

await mkdir(dirname(AFTER_PNG), { recursive: true });
await writeFile(AFTER_PNG, await card.screenshot({ type: 'png' }));
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
  stencilBreakpointFlip: stencilFlip,
  swap,
  controlStencilVsBaseline: control,
  litVsBaseline: litResult,
  consoleErrors,
};
console.warn(JSON.stringify(summary, null, 2));
const failed =
  litResult.error || litResult.strictMismatch !== 0 || swap.litRendered !== swap.swapped || consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
