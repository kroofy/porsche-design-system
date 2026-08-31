import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=banner';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_banner_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_banner_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/banner_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_banner_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const pauseCardAnimation = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
  });
};

const hostReady = () => {
  const hosts = [...document.querySelectorAll('[data-card="banner"] p-banner, [data-card="banner"] lit-banner')];
  return (
    hosts.length >= 5 &&
    hosts.every((el) => {
      const pop = el.shadowRoot?.querySelector('[popover]');
      const root = el.shadowRoot?.querySelector('.notification');
      if (!pop || !root) return false;
      if (el.tagName === 'P-BANNER' && !el.classList.contains('hydrated')) return false;
      const isOpen = el.getAttribute('open') === 'true' || el.getAttribute('open') === '';
      if (isOpen && !pop.matches(':popover-open')) return false;
      const light = [...el.querySelectorAll(':scope > p-heading, :scope > p-text')];
      return light.every((child) => child.classList.contains('hydrated'));
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
  () => customElements.get('p-banner') && customElements.get('p-button') && customElements.get('p-heading'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="banner"] p-banner.hydrated', { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
await pauseCardAnimation(page);

const clipOf = async () => {
  const box = await page.locator('[data-card="banner"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-banner.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-banner'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="banner"] p-banner')];
  for (const el of hosts) {
    const lit = document.createElement('lit-banner');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const hyphen = {
      'heading-tag': 'headingTag',
      'dismiss-button': 'dismissButton',
    };
    for (const [attr, prop] of Object.entries(hyphen)) {
      const value = el.getAttribute(attr);
      if (value !== null) {
        lit.setAttribute(prop.toLowerCase(), value);
        lit[prop] = value;
      }
    }
    const open = el.getAttribute('open');
    if (open !== null) lit.open = open;
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="banner"] lit-banner')].filter((el) =>
      el.shadowRoot?.querySelector('.notification'),
    ).length,
);
swap.openPopover = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="banner"] lit-banner')].filter((el) =>
      el.shadowRoot?.querySelector('[popover]')?.matches(':popover-open'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="banner"] lit-banner')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="banner"] lit-banner')
      ?.shadowRoot?.querySelector('lit-button-pure,lit-icon,lit-spinner,lit-button'),
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="banner"] lit-banner')].filter((el) =>
      el.querySelector(':scope > p-heading'),
    ).length >= 4,
);
swap.buttonsLeft = await page.evaluate(
  () => [...document.querySelectorAll('[data-card="banner"] p-button')].map((el) => el.tagName),
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
  swap.openPopover !== 1 ||
  swap.fragment ||
  swap.innerLit ||
  !swap.slottedCopied ||
  swap.swapped < 5 ||
  (swap.buttonsLeft && swap.buttonsLeft.some((tag) => tag !== 'P-BUTTON')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
