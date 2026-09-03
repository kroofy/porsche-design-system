#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const requireRoot = createRequire('/workspace/package.json');
const requireProbe = createRequire('/workspace/packages/mitosis-probe-lit/package.json');
const { chromium } = requireRoot('playwright-core');
const pixelmatchMod = requireProbe('pixelmatch');
const pixelmatch = pixelmatchMod.default ?? pixelmatchMod;
const pngjs = requireProbe('pngjs');
const { PNG } = pngjs.PNG ? pngjs : pngjs.default ?? pngjs;

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=divider';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_canvas_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_canvas_after.png';
const AFTER_PASS = '/opt/cursor/artifacts/mitosis_land_canvas_after_pass.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_canvas_pixel_diff.png';
const LOG = '/opt/cursor/artifacts/land_canvas_verify.log';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 40157;
const EXPECTED_BASELINE_SHA = '28de5f4bfb3bfd7be7a26beebb89bb114b419f318af8c9e777e7dea52ff18c97';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const lines = [];
const log = (msg) => {
  lines.push(typeof msg === 'string' ? msg : JSON.stringify(msg));
  console.warn(typeof msg === 'string' ? msg : JSON.stringify(msg));
};

const baselineBuf = await readFile(BASELINE_PNG);
if (baselineBuf.byteLength !== EXPECTED_BASELINE_BYTES) {
  throw new Error(`baseline bytes ${baselineBuf.byteLength} !== ${EXPECTED_BASELINE_BYTES}`);
}
const baselineSha = sha256(baselineBuf);
if (baselineSha !== EXPECTED_BASELINE_SHA) {
  throw new Error(`baseline sha ${baselineSha} !== ${EXPECTED_BASELINE_SHA}`);
}
log(`baseline bytes=${baselineBuf.byteLength} sha256=${baselineSha}`);

const isBenign = (text) =>
  text.includes('ERR_CONNECTION_REFUSED') ||
  text.includes("can't be used like this") ||
  text.includes('should be of kind') ||
  text.includes('parent HTMLElement of') ||
  text.includes('throwIfParentIsNotOfKind') ||
  text.includes('3002');

const clipOf = async (page) => {
  const box = await page.evaluate(() => {
    const host = document.querySelector('p-canvas');
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
page.on('console', (msg) => {
  if (msg.type() !== 'error') return;
  const text = msg.text();
  const url = msg.location()?.url ?? '';
  if (isBenign(text) || url.includes('3002')) return;
  consoleErrors.push(text);
});
page.on('pageerror', (err) => {
  const text = String(err);
  if (isBenign(text)) return;
  consoleErrors.push(text);
});

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-canvas.iife.js');
log(`iife HEAD /assets/p-canvas.iife.js status=${iifeAsset.status()}`);
if (iifeAsset.status() !== 200) {
  throw new Error(`canvas IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-canvas"/.test(loaderText);
log(`loader exact "p-canvas"=${stillLazy}`);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-canvas'), { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('p-canvas', { state: 'attached', timeout: 20_000 });
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('p-canvas')];
  const Canvas = customElements.get('p-canvas');
  if (Canvas?.name !== 'LitCanvas') return false;
  if (hosts.length !== 1) return false;
  if (hosts.some((el) => el.classList.contains('hydrated'))) return false;
  return hosts.every((el) => {
    const style = getComputedStyle(el);
    if (style.display !== 'block') return false;
    const root = el.shadowRoot;
    if (!root) return false;
    if (root.querySelector('my-fragment, lit-canvas')) return false;
    if (root.querySelectorAll('.root').length !== 1) return false;
    if (!root.querySelector('.header')) return false;
    if (!root.querySelector('.sidebar__header--start')) return false;
    if (!root.querySelector('.sidebar__header--end')) return false;
    if (!root.querySelector('p-crest')) return false;
    if (!root.querySelector('p-wordmark')) return false;
    const buttons = [...root.querySelectorAll('p-button')];
    if (buttons.length < 2) return false;
    if (buttons.some((btn) => btn.getAttribute('hide-label') !== 'true')) return false;
    if (buttons.some((btn) => btn.getAttribute('compact') !== 'true')) return false;
    if (root.querySelector('[href="undefined"]')) return false;
    const css = root.querySelector('style')?.textContent || '';
    if (!css.includes('min-width:1000px')) return false;
    if (!css.includes('max-width:999px')) return false;
    if (el.getAttribute('sidebar-start-open') !== 'true') return false;
    if (el.getAttribute('sidebar-end-open') !== 'true') return false;
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const hosts = [...document.querySelectorAll('p-canvas')];
  await Promise.all(hosts.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('p-canvas')];
  const el = hosts[0];
  const sr = el?.shadowRoot;
  const css = sr?.querySelector('style')?.textContent ?? '';
  const style = getComputedStyle(el);
  const buttons = [...(sr?.querySelectorAll('p-button') ?? [])];
  const named = [
    'title',
    'header-start',
    'header-end',
    'footer',
    'sidebar-start',
    'sidebar-end',
    'sidebar-end-header',
    'background',
  ];
  const present = named.filter((name) => el.querySelector(`:scope > [slot="${name}"]`));
  const projected = present.filter((name) => sr?.querySelector(`slot[name="${name}"]`));
  return {
    title: document.title,
    href: location.href,
    ctorName: customElements.get('p-canvas')?.name ?? null,
    isLit: !!customElements.get('p-canvas') && 'elementProperties' in customElements.get('p-canvas'),
    definedTag: 'p-canvas',
    litTagDefined: !!customElements.get('lit-canvas'),
    hostCount: hosts.length,
    hydrated: hosts.some((host) => host.classList.contains('hydrated')),
    backgroundProp: el?.background,
    backgroundAttr: el?.getAttribute('background'),
    startOpen: el?.getAttribute('sidebar-start-open'),
    endOpen: el?.getAttribute('sidebar-end-open'),
    display: style.display,
    hasHeader: !!sr?.querySelector('.header'),
    hasStartHeader: !!sr?.querySelector('.sidebar__header--start'),
    hasEndHeader: !!sr?.querySelector('.sidebar__header--end'),
    rootCount: sr?.querySelectorAll('.root').length ?? 0,
    hasFragment: !!sr?.querySelector('my-fragment'),
    cssHasM: css.includes('min-width:1000px'),
    cssHasMaxM: css.includes('max-width:999px'),
    crest: sr?.querySelector('p-crest')?.tagName ?? '',
    wordmark: sr?.querySelector('p-wordmark')?.tagName ?? '',
    nestedLit:
      !!customElements.get('p-button')?.elementProperties &&
      !!customElements.get('p-crest')?.elementProperties &&
      !!customElements.get('p-wordmark')?.elementProperties,
    hideLabel: buttons.map((n) => n.getAttribute('hide-label')),
    compact: buttons.map((n) => n.getAttribute('compact')),
    hrefUndefined: !!sr?.querySelector('[href="undefined"]'),
    namedSlots: { present: present.length, projected: projected.length, names: present },
  };
});
log(proof);

const clip = await clipOf(page);
log(`clip x=${clip.x} y=${clip.y} w=${clip.width} h=${clip.height}`);
await mkdir(dirname(AFTER_PNG), { recursive: true });
let png;
try {
  png = await page.screenshot({ type: 'png', clip });
} catch {
  const needed = Math.ceil(clip.y + clip.height + 8);
  await page.setViewportSize({ width: VIEWPORT.width, height: Math.max(VIEWPORT.height, needed) });
  png = await page.screenshot({ type: 'png', clip });
}
await writeFile(AFTER_PNG, png);
await browser.close();

const a = PNG.sync.read(await readFile(BASELINE_PNG));
const b = PNG.sync.read(await readFile(AFTER_PNG));
const result = { aSize: `${a.width}x${a.height}`, bSize: `${b.width}x${b.height}`, clip };
if (a.width !== b.width || a.height !== b.height) {
  result.error = 'dimension mismatch, no per-pixel diff possible';
} else {
  const diff = new PNG({ width: a.width, height: a.height });
  result.strictMismatch = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
    threshold: 0,
    includeAA: true,
  });
  result.perceptualMismatch = pixelmatch(a.data, b.data, null, a.width, a.height, { threshold: 0.1 });
  result.totalPixels = a.width * a.height;
  result.diffPng = DIFF_PNG;
  await writeFile(DIFF_PNG, PNG.sync.write(diff));
}

const failed =
  !!result.error ||
  result.strictMismatch !== 0 ||
  proof.title !== 'Playground' ||
  !proof.isLit ||
  proof.ctorName !== 'LitCanvas' ||
  proof.litTagDefined ||
  proof.hostCount !== 1 ||
  stillLazy ||
  proof.hydrated ||
  proof.display !== 'block' ||
  proof.rootCount !== 1 ||
  proof.hasFragment ||
  !proof.hasHeader ||
  !proof.hasStartHeader ||
  !proof.hasEndHeader ||
  !proof.cssHasM ||
  !proof.cssHasMaxM ||
  proof.crest !== 'P-CREST' ||
  proof.wordmark !== 'P-WORDMARK' ||
  !proof.nestedLit ||
  proof.startOpen !== 'true' ||
  proof.endOpen !== 'true' ||
  proof.backgroundProp !== 'surface' ||
  proof.hrefUndefined ||
  proof.hideLabel.some((v) => v !== 'true') ||
  proof.compact.some((v) => v !== 'true') ||
  proof.namedSlots.present !== proof.namedSlots.projected ||
  consoleErrors.length > 0;

log(`strictMismatch=${result.strictMismatch} total=${result.totalPixels}`);
log(`after bytes=${png.byteLength} sha256=${sha256(png)}`);
log(`byteEqual=${Buffer.compare(png, baselineBuf) === 0}`);
log(`consoleErrors=${JSON.stringify(consoleErrors)}`);
log(`failed=${failed}`);

const summary = {
  playground: PLAYGROUND_URL,
  baseline: BASELINE_PNG,
  baselineBytes: baselineBuf.byteLength,
  baselineSha,
  after: AFTER_PNG,
  afterBytes: png.byteLength,
  afterSha: sha256(png),
  stillLazy,
  proof,
  litVsBaseline: result,
  consoleErrors,
  failed,
};
log(JSON.stringify(summary, null, 2));
await writeFile(LOG, `${lines.join('\n')}\n`);

if (!failed) {
  await copyFile(AFTER_PNG, AFTER_PASS);
  log(`copied after → ${AFTER_PASS}`);
  await writeFile(LOG, `${lines.join('\n')}\n`);
}

process.exit(failed ? 1 : 0);
