import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=tabs';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_item_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_tabs_item_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/tabs_item_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_tabs_item_control.png`;
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
  const items = [
    ...document.querySelectorAll('[data-card="tabs"] p-tabs-item, [data-card="tabs"] lit-tabs-item'),
  ];
  const parents = [...document.querySelectorAll('[data-card="tabs"] p-tabs')];
  return (
    items.length >= 15 &&
    parents.length >= 5 &&
    parents.every((el) => el.classList.contains('hydrated')) &&
    items.every((el) => {
      if (el.parentElement?.tagName !== 'P-TABS') return false;
      if (el.tagName === 'P-TABS-ITEM' && !el.classList.contains('hydrated')) return false;
      if (!el.shadowRoot?.querySelector('slot')) return false;
      const texts = [...el.querySelectorAll(':scope > p-text')];
      return texts.every((text) => text.tagName === 'P-TEXT' && text.classList.contains('hydrated'));
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
  () =>
    customElements.get('p-tabs') &&
    customElements.get('p-tabs-item') &&
    customElements.get('p-tabs-bar') &&
    customElements.get('p-text'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="tabs"] p-tabs-item.hydrated', { timeout: 20_000, state: 'attached' });
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="tabs"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-tabs-item.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-tabs-item'));
const swap = await page.evaluate(() => {
  const parents = [...document.querySelectorAll('[data-card="tabs"] p-tabs')];
  for (const parent of parents) {
    parent.defineTabsItems = function defineTabsItems() {
      const host = this.host ?? this;
      this.tabsItems = [...host.children].filter(
        (el) => el.tagName === 'P-TABS-ITEM' || el.tagName === 'LIT-TABS-ITEM',
      );
    };
  }
  const hosts = [...document.querySelectorAll('[data-card="tabs"] p-tabs-item')];
  for (const el of hosts) {
    const lit = document.createElement('lit-tabs-item');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    lit.label = el.label ?? el.getAttribute('label') ?? '';
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
await page.evaluate(async () => {
  await Promise.all(
    [...document.querySelectorAll('[data-card="tabs"] lit-tabs-item')].map((el) => el.updateComplete),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="tabs"] lit-tabs-item')].filter((el) =>
      el.shadowRoot?.querySelector('slot'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="tabs"] lit-tabs-item')?.shadowRoot?.querySelector('my-fragment'),
);
swap.parentStillStencil = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="tabs"] lit-tabs-item')].every(
      (el) => el.parentElement?.tagName === 'P-TABS',
    ) && document.querySelectorAll('[data-card="tabs"] lit-tabs').length === 0,
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="tabs"] lit-tabs-item')].every(
      (el) => el.querySelectorAll(':scope > p-text').length >= 1,
    ),
);
swap.nested = await page.evaluate(() => {
  const items = [...document.querySelectorAll('[data-card="tabs"] lit-tabs-item')];
  const texts = items.flatMap((el) => [...el.querySelectorAll(':scope > p-text')]);
  const hidden = items.filter((el) => el.hasAttribute('hidden')).length;
  return {
    itemCount: items.length,
    textTags: [...new Set(texts.map((n) => n.tagName))],
    textCount: texts.length,
    hiddenCount: hidden,
    visibleCount: items.length - hidden,
  };
});
swap.innerLit = await page.evaluate(
  () =>
    !!document.querySelector('[data-card="tabs"] lit-tabs') ||
    !!document.querySelector('[data-card="tabs"] lit-tabs-item')?.shadowRoot?.querySelector('lit-text'),
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
  !swap.parentStillStencil ||
  !swap.slottedCopied ||
  swap.swapped < 15 ||
  swap.nested?.itemCount < 15 ||
  !swap.nested?.textTags.includes('P-TEXT') ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
