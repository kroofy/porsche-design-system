import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=divider';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_canvas_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_canvas_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/canvas_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_canvas_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_HOSTS = 1;

const pauseMotion = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
    document.documentElement.style.setProperty('--p-duration-md', '0s');
    document.documentElement.style.setProperty('--p-duration-sm', '0s');
  });
};

const chromeReady = () => {
  const stencil = document.querySelector('p-canvas');
  const lit = document.querySelector('lit-canvas');
  const host = stencil || lit;
  if (!host || host.getAttribute('sidebar-start-open') !== 'true' || host.getAttribute('sidebar-end-open') !== 'true') {
    return false;
  }
  const sr = host.shadowRoot;
  if (!sr || sr.querySelector('my-fragment')) return false;
  if (sr.querySelectorAll('.root').length !== 1) return false;
  const header = sr.querySelector('.header');
  const start = sr.querySelector('.sidebar--start');
  const end = sr.querySelector('.sidebar--end');
  if (!header || !start || !end) return false;
  const crest = sr.querySelector('p-crest');
  const wordmark = sr.querySelector('p-wordmark');
  const buttons = [...sr.querySelectorAll('p-button')];
  if (!crest || !wordmark || buttons.length < 2) return false;
  if (stencil && !stencil.classList.contains('hydrated')) return false;
  return (
    crest.classList.contains('hydrated') &&
    wordmark.classList.contains('hydrated') &&
    buttons.every((el) => el.classList.contains('hydrated'))
  );
};

const clipOf = async (page) => {
  const box = await page.evaluate(() => {
    const host = document.querySelector('p-canvas, lit-canvas');
    const sr = host?.shadowRoot;
    const nodes = [
      sr?.querySelector('.header'),
      sr?.querySelector('.sidebar__header--start'),
      sr?.querySelector('.sidebar__header--end'),
    ].filter(Boolean);
    const rects = nodes.map((n) => n.getBoundingClientRect());
    const left = Math.min(...rects.map((r) => r.left));
    const top = Math.min(...rects.map((r) => r.top));
    const right = Math.max(...rects.map((r) => r.right));
    const bottom = Math.max(...rects.map((r) => r.bottom));
    return { x: left, y: top, width: right - left, height: bottom - top };
  });
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
const isBenign = (text) =>
  text.includes('ERR_CONNECTION_REFUSED') || text.includes('3002');
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
await page.waitForFunction(() => customElements.get('p-canvas') && customElements.get('p-button'), {
  timeout: 20_000,
});
await page.waitForSelector('p-canvas.hydrated', { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await pauseMotion(page);
await page.waitForFunction(chromeReady, { timeout: 30_000 });

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf(page) }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-canvas.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-canvas'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('p-canvas')];
  for (const el of hosts) {
    const lit = document.createElement('lit-canvas');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    if (el.background && !lit.hasAttribute('background')) lit.setAttribute('background', el.background);
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseMotion(page);
await page.waitForFunction(chromeReady, { timeout: 30_000 });
await page.evaluate(async () => {
  await Promise.all([...document.querySelectorAll('lit-canvas')].map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () => [...document.querySelectorAll('lit-canvas')].filter((el) => el.shadowRoot?.querySelector('.root')).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('lit-canvas')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('lit-canvas')
      ?.shadowRoot?.querySelector('lit-button,lit-crest,lit-wordmark,lit-heading,lit-input-search'),
);
swap.slotsCopied = await page.evaluate(() =>
  [...document.querySelectorAll('lit-canvas')].every((el) => [...el.children].some((n) => n.nodeType === 1)),
);
swap.namedSlots = await page.evaluate(() => {
  const el = document.querySelector('lit-canvas');
  const names = [
    'title',
    'header-start',
    'header-end',
    'footer',
    'sidebar-start',
    'sidebar-end',
    'sidebar-end-header',
    'background',
  ];
  const present = names.filter((name) => el.querySelector(`:scope > [slot="${name}"]`));
  const projected = present.filter((name) => el.shadowRoot?.querySelector(`slot[name="${name}"]`));
  return { present: present.length, projected: projected.length, names: present };
});
swap.nested = await page.evaluate(() => {
  const el = document.querySelector('lit-canvas');
  const sr = el?.shadowRoot;
  const leftover = document.querySelectorAll('p-canvas').length;
  const slotted = [...(el?.children ?? [])].map((n) => n.tagName);
  const shadowBtns = [...(sr?.querySelectorAll('p-button') ?? [])];
  return {
    leftoverStencil: leftover,
    slottedTags: [...new Set(slotted)],
    shadowButtonTags: [...new Set(shadowBtns.map((n) => n.tagName))],
    crest: sr?.querySelector('p-crest')?.tagName ?? '',
    wordmark: sr?.querySelector('p-wordmark')?.tagName ?? '',
    startOpen: el?.getAttribute('sidebar-start-open'),
    endOpen: el?.getAttribute('sidebar-end-open'),
    background: el?.getAttribute('background'),
    hrefUndefined: !!sr?.querySelector('[href="undefined"]'),
    rootCount: sr?.querySelectorAll('.root').length ?? 0,
    hideLabel: shadowBtns.map((n) => n.getAttribute('hide-label')),
    compact: shadowBtns.map((n) => n.getAttribute('compact')),
  };
});

await mkdir(dirname(AFTER_PNG), { recursive: true });
await writeFile(AFTER_PNG, await page.screenshot({ type: 'png', clip: await clipOf(page) }));
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
  !swap.slotsCopied ||
  swap.swapped !== EXPECTED_HOSTS ||
  (swap.namedSlots && swap.namedSlots.present !== swap.namedSlots.projected) ||
  (swap.nested && swap.nested.leftoverStencil !== 0) ||
  (swap.nested && swap.nested.hrefUndefined) ||
  (swap.nested && swap.nested.rootCount !== 1) ||
  (swap.nested && swap.nested.crest !== 'P-CREST') ||
  (swap.nested && swap.nested.wordmark !== 'P-WORDMARK') ||
  (swap.nested && swap.nested.startOpen !== 'true') ||
  (swap.nested && swap.nested.endOpen !== 'true') ||
  (swap.nested && !swap.nested.shadowButtonTags.includes('P-BUTTON')) ||
  (swap.nested && swap.nested.hideLabel.some((v) => v !== 'true')) ||
  (swap.nested && swap.nested.compact.some((v) => v !== 'true')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
