import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=toast';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_toast_item_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_toast_item_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/toast_item_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_toast_item_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const pauseAndSkipTimeout = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
    document.documentElement.style.setProperty('--p-duration-md', '0s');
    document.documentElement.style.setProperty('--p-duration-sm', '0s');
    document.documentElement.style.setProperty('--p-temporary-toast-skip-timeout', 'true');
  });
};

const openInfoToast = async (page) => {
  await page.evaluate(() => {
    const toast = document.querySelector('[data-card="toast"] p-toast');
    toast.addMessage({ text: 'Some content' });
  });
};

const hostReady = () => {
  const toast = document.querySelector('[data-card="toast"] p-toast');
  const buttons = [...document.querySelectorAll('[data-card="toast"] p-button')];
  const items = [...(toast?.shadowRoot?.querySelectorAll('p-toast-item, lit-toast-item') ?? [])];
  return (
    toast?.classList.contains('hydrated') &&
    buttons.length === 4 &&
    buttons.every((el) => el.classList.contains('hydrated')) &&
    items.length === 1 &&
    items.every((el) => {
      if (el.tagName === 'P-TOAST-ITEM' && !el.classList.contains('hydrated')) return false;
      if (!el.shadowRoot?.querySelector('.notification')) return false;
      if (!el.matches(':popover-open')) return false;
      return true;
    })
  );
};

const clipOf = async (page) => {
  const card = await page.locator('[data-card="toast"]').boundingBox();
  const itemBox = await page.evaluate(() => {
    const toast = document.querySelector('[data-card="toast"] p-toast');
    const item = toast?.shadowRoot?.querySelector('p-toast-item, lit-toast-item');
    return item ? item.getBoundingClientRect().toJSON() : null;
  });
  const boxes = [card, itemBox].filter(Boolean);
  const x = Math.max(0, Math.min(...boxes.map((b) => b.x)));
  const y = Math.max(0, Math.min(...boxes.map((b) => b.y)));
  const right = Math.max(...boxes.map((b) => b.x + b.width));
  const bottom = Math.max(...boxes.map((b) => b.y + b.height));
  return {
    x,
    y,
    width: Math.min(right, VIEWPORT.width) - x,
    height: Math.min(bottom, VIEWPORT.height) - y,
  };
};

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
const isBenign = (text) =>
  text.includes('ERR_CONNECTION_REFUSED') ||
  text.includes("can't be used like this") ||
  text.includes('should be of kind') ||
  text.includes('parent HTMLElement of');
page.on('console', (msg) => {
  if (msg.type() !== 'error') return;
  const text = msg.text();
  const loc = msg.location()?.url ?? '';
  if (isBenign(text) || (text.includes('3002') && loc.includes('3002'))) return;
  consoleErrors.push(loc ? `${text} @ ${loc}` : text);
});
page.on('pageerror', (err) => {
  const text = String(err);
  if (isBenign(text)) return;
  consoleErrors.push(text);
});

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(
  () => customElements.get('p-toast') && customElements.get('p-toast-item') && customElements.get('p-button'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="toast"] p-toast.hydrated', { timeout: 20_000, state: 'attached' });
await page.evaluate(() => document.fonts.ready);
await pauseAndSkipTimeout(page);
await openInfoToast(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf(page) }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-toast-item.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-toast-item'));
const swap = await page.evaluate(() => {
  const toast = document.querySelector('[data-card="toast"] p-toast');
  const hosts = [...(toast?.shadowRoot?.querySelectorAll('p-toast-item') ?? [])];
  for (const el of hosts) {
    const lit = document.createElement('lit-toast-item');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const text = el.text ?? el.getAttribute('text') ?? '';
    const state = el.state ?? el.getAttribute('state') ?? 'info';
    if (text) lit.setAttribute('text', text);
    if (state) lit.setAttribute('state', state);
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length, parentTag: toast?.tagName ?? null };
});
await pauseAndSkipTimeout(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
await page.evaluate(async () => {
  await Promise.all(
    [...document.querySelector('[data-card="toast"] p-toast').shadowRoot.querySelectorAll('lit-toast-item')].map(
      (el) => el.updateComplete,
    ),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(() => {
  const toast = document.querySelector('[data-card="toast"] p-toast');
  return [...(toast?.shadowRoot?.querySelectorAll('lit-toast-item') ?? [])].filter(
    (el) => el.shadowRoot?.querySelector('.notification') && el.matches(':popover-open'),
  ).length;
});
swap.fragment = await page.evaluate(() => {
  const toast = document.querySelector('[data-card="toast"] p-toast');
  return !!toast?.shadowRoot?.querySelector('lit-toast-item')?.shadowRoot?.querySelector('my-fragment');
});
swap.innerLit = await page.evaluate(() => {
  const toast = document.querySelector('[data-card="toast"] p-toast');
  return !!toast?.shadowRoot
    ?.querySelector('lit-toast-item')
    ?.shadowRoot?.querySelector('lit-icon,lit-button-pure,p-icon,p-button-pure');
});
swap.parentStillStencil = await page.evaluate(() => {
  const toast = document.querySelector('[data-card="toast"] p-toast');
  const item = toast?.shadowRoot?.querySelector('lit-toast-item');
  return item?.getRootNode()?.host?.tagName === 'P-TOAST';
});
swap.buttonsStillStencil = await page.evaluate(() =>
  [...document.querySelectorAll('[data-card="toast"] p-button')].every((el) => el.tagName === 'P-BUTTON'),
);
swap.nested = await page.evaluate(() => {
  const toast = document.querySelector('[data-card="toast"] p-toast');
  const items = [...(toast?.shadowRoot?.querySelectorAll('lit-toast-item') ?? [])];
  return {
    itemCount: items.length,
    parentTag: toast?.tagName ?? null,
    texts: items.map((el) => el.shadowRoot?.querySelector('p')?.textContent ?? ''),
  };
});

await mkdir(dirname(AFTER_PNG), { recursive: true });
await writeFile(AFTER_PNG, await page.screenshot({ type: 'png', clip: await clipOf(page) }));
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
  !swap.parentStillStencil ||
  !swap.buttonsStillStencil ||
  swap.swapped !== 1 ||
  (swap.nested && swap.nested.parentTag !== 'P-TOAST') ||
  (swap.nested && !swap.nested.texts.includes('Some content')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
