import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = 'http://localhost:3333/?components=input-password';
const BASELINE_PNG = '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_password_before.png';
const AFTER_PNG = '/opt/cursor/artifacts/mitosis_lit_input_password_after.png';
const DIFF_PNG = '/opt/cursor/artifacts/input_password_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_input_password_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const pauseCardAnimation = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
  });
};

const hostReady = () => {
  const hosts = [
    ...document.querySelectorAll('[data-card="input-password"] p-input-password, [data-card="input-password"] lit-input-password'),
  ];
  return (
    hosts.length >= 6 &&
    hosts.every((el) => {
      const sr = el.shadowRoot;
      if (!sr?.querySelector('input[type="password"]')) return false;
      const spinner = sr.querySelector('p-spinner');
      if (spinner && getComputedStyle(spinner).display !== 'none') {
        if (spinner.tagName !== 'P-SPINNER') return false;
        if (!spinner.classList.contains('hydrated') || !spinner.shadowRoot?.querySelector('svg')) return false;
      }
      const toggle = sr.querySelector('p-button-pure');
      if (toggle && getComputedStyle(toggle).display !== 'none') {
        if (toggle.tagName !== 'P-BUTTON-PURE') return false;
        if (!toggle.classList.contains('hydrated')) return false;
        const innerIcon = toggle.shadowRoot?.querySelector('p-icon');
        const img = innerIcon?.shadowRoot?.querySelector('img');
        if (!innerIcon?.classList.contains('hydrated') || !img?.complete) return false;
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
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-input-password') &&
    customElements.get('p-icon') &&
    customElements.get('p-spinner') &&
    customElements.get('p-button-pure'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="input-password"] p-input-password.hydrated', { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(hostReady);
await pauseCardAnimation(page);

const clipOf = async () => {
  const box = await page.locator('[data-card="input-password"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-input-password.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-input-password'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="input-password"] p-input-password')];
  for (const el of hosts) {
    const lit = document.createElement('lit-input-password');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const hideLabel = el.getAttribute('hide-label');
    if (hideLabel !== null) {
      lit.setAttribute('hidelabel', hideLabel);
      lit.hideLabel = hideLabel;
    }
    const maxLength = el.getAttribute('max-length');
    if (maxLength !== null) {
      lit.setAttribute('maxlength', maxLength);
      lit.maxLength = maxLength;
    }
    const readOnly = el.getAttribute('read-only');
    if (readOnly !== null) {
      lit.setAttribute('readonly', readOnly);
      lit.readOnly = readOnly;
    }
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady);
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="input-password"] lit-input-password')].filter((el) =>
      el.shadowRoot?.querySelector('input[type="password"]'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="input-password"] lit-input-password')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="input-password"] lit-input-password')
      ?.shadowRoot?.querySelector('lit-icon,lit-spinner,lit-button-pure'),
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
  swap.innerLit ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
