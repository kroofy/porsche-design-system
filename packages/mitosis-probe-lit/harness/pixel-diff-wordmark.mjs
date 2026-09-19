import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = 'http://localhost:3333/?components=wordmark';
const BASELINE_PNG = '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_wordmark_before.png';
const AFTER_PNG = '/opt/cursor/artifacts/mitosis_lit_wordmark_after.png';
const DIFF_PNG = '/opt/cursor/artifacts/wordmark_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_wordmark_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-wordmark'), { timeout: 20_000 });
await page.waitForSelector('[data-card="wordmark"] p-wordmark.hydrated', { timeout: 20_000 });
await page.waitForFunction(() => {
  const svg = document.querySelector('[data-card="wordmark"] p-wordmark')?.shadowRoot?.querySelector('svg');
  return !!svg && svg.getBBox().width > 0;
});

const card = page.locator('[data-card="wordmark"]');
await card.scrollIntoViewIfNeeded();

await writeFile(CONTROL_PNG, await card.screenshot({ type: 'png' }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-wordmark.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-wordmark'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="wordmark"] p-wordmark')];
  for (const el of hosts) {
    const lit = document.createElement('lit-wordmark');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await page.waitForFunction(() => {
  const svg = document.querySelector('[data-card="wordmark"] lit-wordmark')?.shadowRoot?.querySelector('svg');
  return !!svg && svg.getBBox().width > 0;
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="wordmark"] lit-wordmark')].filter((el) =>
      el.shadowRoot?.querySelector('svg')
    ).length
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="wordmark"] lit-wordmark')?.shadowRoot?.querySelector('my-fragment')
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
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
