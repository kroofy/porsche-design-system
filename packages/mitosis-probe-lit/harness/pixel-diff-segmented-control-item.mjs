import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=segmented-control';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_segmented_control_item_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_segmented_control_item_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/segmented_control_item_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_segmented_control_item_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const pauseCardAnimation = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
  });
};

const hostReady = () => {
  const items = [
    ...document.querySelectorAll(
      '[data-card="segmented-control"] p-segmented-control-item, [data-card="segmented-control"] lit-segmented-control-item',
    ),
  ];
  const parents = [...document.querySelectorAll('[data-card="segmented-control"] p-segmented-control')];
  return (
    items.length >= 12 &&
    parents.length >= 3 &&
    parents.every((el) => el.classList.contains('hydrated')) &&
    items.every((el) => {
      if (el.parentElement?.tagName !== 'P-SEGMENTED-CONTROL') return false;
      const button = el.shadowRoot?.querySelector('button');
      if (!button) return false;
      if (el.tagName === 'P-SEGMENTED-CONTROL-ITEM' && !el.classList.contains('hydrated')) return false;
      const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
        (icon) => getComputedStyle(icon).display !== 'none',
      );
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
  () =>
    customElements.get('p-segmented-control') &&
    customElements.get('p-segmented-control-item') &&
    customElements.get('p-icon'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="segmented-control"] p-segmented-control-item.hydrated', { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="segmented-control"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-segmented-control-item.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-segmented-control-item'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="segmented-control"] p-segmented-control-item')];
  for (const el of hosts) {
    const lit = document.createElement('lit-segmented-control-item');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const iconSource = el.getAttribute('icon-source');
    if (iconSource !== null) {
      lit.setAttribute('iconsource', iconSource);
      lit.iconSource = iconSource;
    }
    lit.selected = el.selected;
    lit.compact = el.compact;
    lit.disabledParent = el.disabledParent;
    lit.state = el.state;
    lit.message = el.message;
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="segmented-control"] lit-segmented-control-item')].filter((el) =>
      el.shadowRoot?.querySelector('button'),
    ).length,
);
swap.fragment = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="segmented-control"] lit-segmented-control-item')
      ?.shadowRoot?.querySelector('my-fragment'),
);
swap.parentStillStencil = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="segmented-control"] lit-segmented-control-item')].every(
      (el) => el.parentElement?.tagName === 'P-SEGMENTED-CONTROL',
    ) && document.querySelectorAll('[data-card="segmented-control"] lit-segmented-control').length === 0,
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="segmented-control"] lit-segmented-control-item')].every((el) =>
      /[1-4]/.test(el.textContent ?? ''),
    ),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="segmented-control"] lit-segmented-control-item')
      ?.shadowRoot?.querySelector('lit-icon'),
);
swap.icons = await page.evaluate(() => {
  const icons = [
    ...document.querySelectorAll('[data-card="segmented-control"] lit-segmented-control-item'),
  ].flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])].map((n) => n.tagName));
  return [...new Set(icons)];
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
  !swap.parentStillStencil ||
  !swap.slottedCopied ||
  swap.swapped < 12 ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
