import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=accordion';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_accordion_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_accordion_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/accordion_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_accordion_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const pauseCardAnimation = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
  });
};

const hostReady = (tag) => {
  const hosts = [...document.querySelectorAll(`[data-card="accordion"] ${tag}`)];
  return (
    hosts.length >= 21 &&
    hosts.every((el) => {
      if (tag === 'p-accordion' && !el.classList.contains('hydrated')) return false;
      const details = el.shadowRoot?.querySelector('details');
      if (!details) return false;
      const isOpen = el.getAttribute('open') === 'true' || el.getAttribute('open') === '';
      if (isOpen && !details.hasAttribute('open')) return false;
      if (isOpen) {
        const body = details.querySelector(':scope > div');
        if (!body || getComputedStyle(body).opacity !== '1') return false;
      }
      const light = [
        ...el.querySelectorAll(':scope > p-heading, :scope > p-text, :scope > p-checkbox, :scope > p-popover'),
      ];
      return light.every((child) => {
        if (!child.classList.contains('hydrated')) return false;
        const icons = [...(child.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
          (icon) => getComputedStyle(icon).display !== 'none',
        );
        return icons.every((icon) => {
          if (icon.tagName !== 'P-ICON') return false;
          const img = icon.shadowRoot?.querySelector('img');
          return icon.classList.contains('hydrated') && img?.complete;
        });
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
    customElements.get('p-accordion') &&
    customElements.get('p-heading') &&
    customElements.get('p-text') &&
    customElements.get('p-icon'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="accordion"] p-accordion.hydrated', { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, 'p-accordion', { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="accordion"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-accordion.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-accordion'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="accordion"] p-accordion')];
  for (const el of hosts) {
    const lit = document.createElement('lit-accordion');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const align = el.getAttribute('align-marker');
    if (align !== null) {
      lit.setAttribute('alignmarker', align);
      lit.alignMarker = align;
    }
    const headingTag = el.getAttribute('heading-tag');
    if (headingTag !== null) {
      lit.setAttribute('headingtag', headingTag);
      lit.headingTag = headingTag;
    }
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, 'lit-accordion', { timeout: 30_000 });
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="accordion"] lit-accordion')].filter((el) =>
      el.shadowRoot?.querySelector('details'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="accordion"] lit-accordion')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document.querySelector('[data-card="accordion"] lit-accordion')?.shadowRoot?.querySelector(
      'lit-icon,lit-heading,lit-text,lit-checkbox,lit-popover',
    ),
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="accordion"] lit-accordion')].every(
      (el) => el.querySelector(':scope > p-text, :scope > [slot]'),
    ),
);
swap.openCount = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="accordion"] lit-accordion')].filter((el) =>
      el.shadowRoot?.querySelector('details[open]'),
    ).length,
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
  !swap.slottedCopied ||
  swap.swapped < 21 ||
  swap.openCount !== 3 ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
