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
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_toast_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_toast_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/toast_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_toast_control.png`;
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
  const hosts = [...document.querySelectorAll('[data-card="toast"] p-toast, [data-card="toast"] lit-toast')];
  const buttons = [...document.querySelectorAll('[data-card="toast"] p-button')];
  return (
    hosts.length === 1 &&
    buttons.length === 4 &&
    buttons.every((el) => el.classList.contains('hydrated')) &&
    hosts.every((el) => {
      if (el.parentElement?.getAttribute('data-card') !== 'toast') return false;
      if (el.tagName === 'P-TOAST' && !el.classList.contains('hydrated')) return false;
      if (el.tagName === 'LIT-TOAST' && !el.shadowRoot?.querySelector('style')) return false;
      return true;
    })
  );
};

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
const isBenign = (text) =>
  text.includes('ERR_CONNECTION_REFUSED') ||
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
  () => customElements.get('p-toast') && customElements.get('p-button'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="toast"] p-toast.hydrated', {
  timeout: 20_000,
  state: 'attached',
});
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="toast"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-toast.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-toast'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="toast"] p-toast')];
  for (const el of hosts) {
    const lit = document.createElement('lit-toast');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
await page.evaluate(async () => {
  await Promise.all(
    [...document.querySelectorAll('[data-card="toast"] lit-toast')].map((el) => el.updateComplete),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="toast"] lit-toast')].filter((el) =>
      el.shadowRoot?.querySelector('style'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="toast"] lit-toast')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="toast"] lit-toast')
      ?.shadowRoot?.querySelector('lit-toast-item,p-toast-item'),
);
swap.buttonsStillStencil = await page.evaluate(() =>
  [...document.querySelectorAll('[data-card="toast"] p-button')].every((el) => el.tagName === 'P-BUTTON'),
);
swap.emptyState = await page.evaluate(
  () => document.querySelectorAll('[data-card="toast"] p-toast-item, [data-card="toast"] lit-toast-item').length === 0,
);
swap.nested = await page.evaluate(() => {
  const toasts = [...document.querySelectorAll('[data-card="toast"] lit-toast')];
  const buttons = [...document.querySelectorAll('[data-card="toast"] p-button')];
  return {
    toastCount: toasts.length,
    buttonTags: [...new Set(buttons.map((n) => n.tagName))],
    toastItems: document.querySelectorAll('[data-card="toast"] p-toast-item').length,
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
  !swap.buttonsStillStencil ||
  !swap.emptyState ||
  swap.swapped !== 1 ||
  (swap.nested && swap.nested.buttonTags.some((tag) => tag !== 'P-BUTTON')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
