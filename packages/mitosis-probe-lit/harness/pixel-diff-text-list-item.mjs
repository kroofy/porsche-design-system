import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=text-list';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_text_list_item_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_text_list_item_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/text_list_item_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_text_list_item_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const pauseCardAnimation = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
  });
};

const hostReady = () => {
  const hosts = [
    ...document.querySelectorAll(
      '[data-card="text-list"] p-text-list-item, [data-card="text-list"] lit-text-list-item',
    ),
  ];
  return (
    hosts.length >= 15 &&
    hosts.every((el) => {
      if (el.getAttribute('role') !== 'listitem') return false;
      if (!el.shadowRoot?.querySelector('slot')) return false;
      if (el.parentElement?.tagName !== 'P-TEXT-LIST') return false;
      if (el.tagName === 'P-TEXT-LIST-ITEM' && !el.classList.contains('hydrated')) return false;
      return true;
    })
  );
};

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(
  () => customElements.get('p-text-list') && customElements.get('p-text-list-item'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="text-list"] p-text-list-item.hydrated', { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(hostReady);
await pauseCardAnimation(page);

const clipOf = async () => {
  const box = await page.locator('[data-card="text-list"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-text-list-item.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-text-list-item'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="text-list"] p-text-list-item')];
  for (const el of hosts) {
    const lit = document.createElement('lit-text-list-item');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady);
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="text-list"] lit-text-list-item')].filter((el) =>
      el.shadowRoot?.querySelector('slot'),
    ).length,
);
swap.fragment = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="text-list"] lit-text-list-item')
      ?.shadowRoot?.querySelector('my-fragment'),
);
swap.parentStillStencil = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="text-list"] lit-text-list-item')].every(
      (el) => el.parentElement?.tagName === 'P-TEXT-LIST',
    ) && document.querySelectorAll('[data-card="text-list"] lit-text-list').length === 0,
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="text-list"] lit-text-list-item')].every((el) => {
      const text = el.textContent ?? '';
      return text.includes('ABC');
    }),
);
swap.nestedLists = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="text-list"] lit-text-list-item p-text-list')].length,
);

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
  !swap.parentStillStencil ||
  !swap.slottedCopied ||
  swap.nestedLists < 3 ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
