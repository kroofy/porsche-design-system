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
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_tabs_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/tabs_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_tabs_control.png`;
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

const hostReady = (tag) => {
  const hosts = [...document.querySelectorAll(`[data-card="tabs"] ${tag}`)];
  return (
    hosts.length >= 5 &&
    hosts.every((el) => {
      if (tag === 'p-tabs' && !el.classList.contains('hydrated')) return false;
      const bar = el.shadowRoot?.querySelector('p-tabs-bar');
      if (!bar || bar.tagName !== 'P-TABS-BAR') return false;
      if (!bar.classList.contains('hydrated')) return false;
      const scroller = bar.shadowRoot?.querySelector('p-scroller');
      if (!scroller || !scroller.classList.contains('hydrated')) return false;
      if (!bar.shadowRoot?.querySelector('.bar')) return false;
      const buttons = [...bar.querySelectorAll(':scope > button')];
      if (buttons.length < 2) return false;
      const items = [...el.querySelectorAll(':scope > p-tabs-item')];
      if (items.length < 2) return false;
      if (!items.every((item) => item.tagName === 'P-TABS-ITEM' && item.classList.contains('hydrated'))) return false;
      const texts = items.flatMap((item) => [...item.querySelectorAll('p-text')]);
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
    customElements.get('p-tabs-bar') &&
    customElements.get('p-tabs-item') &&
    customElements.get('p-scroller') &&
    customElements.get('p-text'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="tabs"] p-tabs.hydrated', { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, 'p-tabs', { timeout: 30_000 });

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

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-tabs.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-tabs'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="tabs"] p-tabs')];
  for (const el of hosts) {
    const lit = document.createElement('lit-tabs');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const active = el.getAttribute('active-tab-index');
    if (active !== null) {
      lit.setAttribute('activetabindex', active);
      lit.activeTabIndex = Number(active);
    } else {
      lit.activeTabIndex = el.activeTabIndex ?? 0;
    }
    const items = [...el.querySelectorAll(':scope > p-tabs-item')];
    for (const item of items) {
      item.connectedCallback = function connectedCallback() {
        try {
          Object.getPrototypeOf(this).connectedCallback.call(this);
        } catch (error) {
          if (!String(error).includes('should be of kind') && !String(error).includes('parent HTMLElement of')) {
            throw error;
          }
        }
      };
    }
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, 'lit-tabs', { timeout: 30_000 });
await page.evaluate(async () => {
  await Promise.all(
    [...document.querySelectorAll('[data-card="tabs"] lit-tabs')].map((el) => el.updateComplete),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="tabs"] lit-tabs')].filter((el) =>
      el.shadowRoot?.querySelector('p-tabs-bar.root, p-tabs-bar'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="tabs"] lit-tabs')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document.querySelector('[data-card="tabs"] lit-tabs')?.shadowRoot?.querySelector(
      'lit-tabs-bar,lit-tabs-item,lit-text,lit-scroller',
    ) ||
    !!document.querySelector(
      '[data-card="tabs"] lit-tabs-bar, [data-card="tabs"] lit-tabs-item, [data-card="tabs"] lit-text',
    ),
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="tabs"] lit-tabs')].every(
      (el) => el.querySelectorAll(':scope > p-tabs-item').length >= 2,
    ),
);
swap.nested = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="tabs"] lit-tabs')];
  const bars = hosts.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-tabs-bar') ?? [])]);
  const items = hosts.flatMap((el) => [...el.querySelectorAll(':scope > p-tabs-item')]);
  const texts = items.flatMap((el) => [...el.querySelectorAll('p-text')]);
  const buttons = bars.flatMap((el) => [...el.querySelectorAll(':scope > button')]);
  return {
    hostCount: hosts.length,
    barTags: [...new Set(bars.map((n) => n.tagName))],
    itemTags: [...new Set(items.map((n) => n.tagName))],
    textTags: [...new Set(texts.map((n) => n.tagName))],
    buttonCount: buttons.length,
    itemCount: items.length,
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
  !swap.slottedCopied ||
  swap.swapped < 5 ||
  swap.nested?.hostCount < 5 ||
  !swap.nested?.barTags.includes('P-TABS-BAR') ||
  !swap.nested?.itemTags.includes('P-TABS-ITEM') ||
  !swap.nested?.textTags.includes('P-TEXT') ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
