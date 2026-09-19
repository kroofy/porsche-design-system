import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=tabs-bar';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_bar_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_tabs_bar_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/tabs_bar_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_tabs_bar_control.png`;
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
  const hosts = [...document.querySelectorAll(`[data-card="tabs-bar"] ${tag}`)];
  return (
    hosts.length >= 7 &&
    hosts.every((el) => {
      if (tag === 'p-tabs-bar' && !el.classList.contains('hydrated')) return false;
      const scroller = el.shadowRoot?.querySelector('p-scroller');
      if (!scroller || scroller.tagName !== 'P-SCROLLER') return false;
      if (!scroller.classList.contains('hydrated')) return false;
      const bar = el.shadowRoot?.querySelector('.bar');
      if (!bar) return false;
      const tabs = [...el.querySelectorAll(':scope > button, :scope > a')];
      if (tabs.length < 2) return false;
      const icons = [...(scroller.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
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
  () => customElements.get('p-tabs-bar') && customElements.get('p-scroller') && customElements.get('p-icon'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="tabs-bar"] p-tabs-bar.hydrated', { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, 'p-tabs-bar', { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="tabs-bar"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-tabs-bar.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-tabs-bar'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="tabs-bar"] p-tabs-bar')];
  for (const el of hosts) {
    const lit = document.createElement('lit-tabs-bar');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const active = el.getAttribute('active-tab-index');
    if (active !== null) {
      lit.setAttribute('activetabindex', active);
      lit.activeTabIndex = Number(active);
    }
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, 'lit-tabs-bar', { timeout: 30_000 });
await page.evaluate(async () => {
  await Promise.all(
    [...document.querySelectorAll('[data-card="tabs-bar"] lit-tabs-bar')].map(
      (el) => el.updateComplete && el.scrollActiveIntoView?.(),
    ),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="tabs-bar"] lit-tabs-bar')].filter((el) =>
      el.shadowRoot?.querySelector('p-scroller.scroller, p-scroller'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="tabs-bar"] lit-tabs-bar')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document.querySelector('[data-card="tabs-bar"] lit-tabs-bar')?.shadowRoot?.querySelector('lit-scroller,lit-icon') ||
    !!document.querySelector('[data-card="tabs-bar"] lit-scroller, [data-card="tabs-bar"] lit-icon'),
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="tabs-bar"] lit-tabs-bar')].every(
      (el) => el.querySelectorAll(':scope > button, :scope > a').length >= 2,
    ),
);
swap.nested = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="tabs-bar"] lit-tabs-bar')];
  const scrollers = hosts.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-scroller') ?? [])]);
  const icons = scrollers.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])]);
  const tabs = hosts.flatMap((el) => [...el.querySelectorAll(':scope > button, :scope > a')]);
  return {
    hostCount: hosts.length,
    scrollerTags: [...new Set(scrollers.map((n) => n.tagName))],
    iconTags: [...new Set(icons.map((n) => n.tagName))],
    tabCount: tabs.length,
    tabTags: [...new Set(tabs.map((n) => n.tagName))],
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
  swap.swapped < 7 ||
  swap.nested?.hostCount < 7 ||
  !swap.nested?.scrollerTags.includes('P-SCROLLER') ||
  !swap.nested?.tabTags.includes('BUTTON') ||
  !swap.nested?.tabTags.includes('A') ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
