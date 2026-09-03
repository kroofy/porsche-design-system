import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = 'http://localhost:3333/?components=link-pure';
const BASELINE_PNG = '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_pure_before.png';
const AFTER_PNG = '/opt/cursor/artifacts/mitosis_lit_link_pure_after.png';
const DIFF_PNG = '/opt/cursor/artifacts/link_pure_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_link_pure_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-link-pure') && customElements.get('p-icon'), {
  timeout: 20_000,
});
await page.waitForSelector('[data-card="link-pure"] p-link-pure.hydrated', { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="link-pure"] p-link-pure')];
  return (
    hosts.length >= 12 &&
    hosts.every((el) => {
      const icon = el.shadowRoot?.querySelector('p-icon');
      const img = icon?.shadowRoot?.querySelector('img');
      return el.classList.contains('hydrated') && icon?.classList.contains('hydrated') && img?.complete;
    })
  );
});

const clipOf = async () => {
  const box = await page.locator('[data-card="link-pure"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-link-pure.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-link-pure'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="link-pure"] p-link-pure')];
  for (const el of hosts) {
    const lit = document.createElement('lit-link-pure');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const iconSource = el.getAttribute('icon-source');
    if (iconSource) {
      lit.setAttribute('iconsource', iconSource);
      lit.iconSource = iconSource;
    }
    const alignLabel = el.getAttribute('align-label');
    if (alignLabel) {
      lit.setAttribute('alignlabel', alignLabel);
      lit.alignLabel = alignLabel;
    }
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
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="link-pure"] lit-link-pure')];
  return (
    hosts.length >= 12 &&
    hosts.every((el) => {
      const icon = el.shadowRoot?.querySelector('p-icon');
      const slot = el.shadowRoot?.querySelector('slot');
      const img = icon?.shadowRoot?.querySelector('img');
      return (
        icon?.tagName === 'P-ICON' &&
        icon.classList.contains('hydrated') &&
        (slot?.assignedNodes({ flatten: true }).length ?? 0) > 0 &&
        img?.complete
      );
    })
  );
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="link-pure"] lit-link-pure')].filter((el) =>
      el.shadowRoot?.querySelector('p-icon'),
    ).length,
);
swap.fragment = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="link-pure"] lit-link-pure')
      ?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLitIcon = await page.evaluate(
  () =>
    !!document.querySelector('[data-card="link-pure"] lit-link-pure')?.shadowRoot?.querySelector('lit-icon'),
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
  swap.innerLitIcon ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
