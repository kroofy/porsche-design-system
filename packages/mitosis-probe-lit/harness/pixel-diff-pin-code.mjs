import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=pin-code';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_pin_code_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_pin_code_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/pin_code_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_pin_code_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const pauseCardAnimation = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
  });
};

const hostReady = (tag) => {
  const hosts = [...document.querySelectorAll(`[data-card="pin-code"] ${tag}`)];
  return (
    hosts.length >= 5 &&
    hosts.every((el) => {
      if (tag === 'p-pin-code' && !el.classList.contains('hydrated')) return false;
      const sr = el.shadowRoot;
      if ((sr?.querySelectorAll('input').length ?? 0) < 4) return false;
      if (!sr?.querySelector('fieldset.root, fieldset')) return false;
      const spinner = sr.querySelector('p-spinner');
      if (spinner && getComputedStyle(spinner).display !== 'none') {
        if (spinner.tagName !== 'P-SPINNER') return false;
        if (!spinner.classList.contains('hydrated')) return false;
        if (!spinner.shadowRoot?.querySelector('svg')) return false;
      }
      const icons = [...sr.querySelectorAll('p-icon')].filter((icon) => getComputedStyle(icon).display !== 'none');
      return icons.every((icon) => {
        if (icon.tagName !== 'P-ICON') return false;
        const img = icon.shadowRoot?.querySelector('img');
        return icon.classList.contains('hydrated') && img?.complete;
      });
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
  consoleErrors.push(loc ? `${text} @ ${loc}` : text);
});
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(
  () => customElements.get('p-pin-code') && customElements.get('p-icon') && customElements.get('p-spinner'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="pin-code"] p-pin-code.hydrated', { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, 'p-pin-code', { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="pin-code"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-pin-code.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-pin-code'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="pin-code"] p-pin-code')];
  for (const el of hosts) {
    const lit = document.createElement('lit-pin-code');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const hideLabel = el.getAttribute('hide-label');
    if (hideLabel !== null) {
      lit.setAttribute('hidelabel', hideLabel);
      lit.hideLabel = hideLabel;
    }
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, 'lit-pin-code', { timeout: 30_000 });
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="pin-code"] lit-pin-code')].filter(
      (el) => (el.shadowRoot?.querySelectorAll('input').length ?? 0) >= 4,
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="pin-code"] lit-pin-code')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document.querySelector('[data-card="pin-code"] lit-pin-code')?.shadowRoot?.querySelector(
      'lit-icon,lit-spinner',
    ),
);
swap.nested = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="pin-code"] lit-pin-code')];
  return {
    icons: hosts.flatMap((el) =>
      [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])]
        .filter((icon) => getComputedStyle(icon).display !== 'none')
        .map((icon) => icon.tagName),
    ),
    spinners: hosts.flatMap((el) =>
      [...(el.shadowRoot?.querySelectorAll('p-spinner') ?? [])].map((n) => n.tagName),
    ),
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
  swap.swapped < 5 ||
  (swap.nested?.icons && swap.nested.icons.some((tag) => tag !== 'P-ICON')) ||
  (swap.nested?.spinners && swap.nested.spinners.some((tag) => tag !== 'P-SPINNER')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
