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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=toast';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_toast_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_toast_after.png';
const AFTER_PASS = '/opt/cursor/artifacts/mitosis_land_toast_after_pass.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_toast_pixel_diff.png';
const LOG = '/opt/cursor/artifacts/land_toast_verify.log';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 30687;
const EXPECTED_BASELINE_SHA = 'f1d76c7bf007f4a2bb3935b1d0a4356c488e7a8428fee03f62089624883a4994';

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
  text.includes('should be of kind') ||
  text.includes('parent HTMLElement of') ||
  text.includes('3002');

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-toast.iife.js');
log(`iife HEAD /assets/p-toast.iife.js status=${iifeAsset.status()}`);
if (iifeAsset.status() !== 200) {
  throw new Error(`toast IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-toast"/.test(loaderText);
log(`loader exact "p-toast"=${stillLazy}`);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () => customElements.get('p-toast') && customElements.get('p-button'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="toast"] p-toast', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const toasts = [...document.querySelectorAll('[data-card="toast"] p-toast')];
  const buttons = [...document.querySelectorAll('[data-card="toast"] p-button')];
  const items = [...document.querySelectorAll('[data-card="toast"] p-toast-item')];
  const Toast = customElements.get('p-toast');
  const Button = customElements.get('p-button');
  if (toasts.length !== 1 || buttons.length !== 4 || items.length !== 0) return false;
  if (Toast?.name !== 'LitToast') return false;
  if (Button?.name !== 'LitButton') return false;
  if (buttons.some((el) => el.classList.contains('hydrated'))) return false;
  return toasts.every((el) => {
    if (el.classList.contains('hydrated')) return false;
    if (el.parentElement?.getAttribute('data-card') !== 'toast') return false;
    if (typeof el.addMessage !== 'function') return false;
    const root = el.shadowRoot;
    const style = root?.querySelector('style');
    const slot = root?.querySelector('slot');
    if (!root || !style || !slot) return false;
    if (root.querySelector('my-fragment') || root.querySelector('lit-toast') || root.querySelector('.root')) {
      return false;
    }
    if (root.querySelector('p-toast-item')) return false;
    if (el.getAttribute('role') !== 'status') return false;
    const css = style.textContent || '';
    if (!css.includes('--_p-toast-a') || !css.includes('z-index:999999') || !css.includes('min-width:760px')) {
      return false;
    }
    if (getComputedStyle(el).position !== 'fixed') return false;
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const toasts = [...document.querySelectorAll('[data-card="toast"] p-toast')];
  await Promise.all(toasts.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const Toast = customElements.get('p-toast');
  const toasts = [...document.querySelectorAll('[data-card="toast"] p-toast')];
  const buttons = [...document.querySelectorAll('[data-card="toast"] p-button')];
  const items = [...document.querySelectorAll('[data-card="toast"] p-toast-item')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Toast?.name ?? null,
    isLit: !!Toast && 'elementProperties' in Toast,
    definedTag: 'p-toast',
    litTagDefined: !!customElements.get('lit-toast'),
    buttonCtor: customElements.get('p-button')?.name ?? null,
    hostCount: toasts.length,
    buttonCount: buttons.length,
    itemCount: items.length,
    hosts: toasts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const css = style?.textContent ?? '';
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        parentCard: el.parentElement?.getAttribute('data-card') ?? null,
        role: el.getAttribute('role'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        cssText: css,
        hasToastVar: css.includes('--_p-toast-a'),
        hasZIndex: css.includes('z-index:999999'),
        hasSBreakpoint: css.includes('min-width:760px'),
        hasRootWrap: !!el.shadowRoot?.querySelector('.root'),
        hasSlot: !!el.shadowRoot?.querySelector('slot'),
        hasItem: !!el.shadowRoot?.querySelector('p-toast-item'),
        hasAddMessage: typeof el.addMessage === 'function',
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        position: getComputedStyle(el).position,
      };
    }),
    buttons: buttons.map((el) => ({
      ctor: el.constructor?.name,
      hydrated: el.classList.contains('hydrated'),
    })),
  };
});
log(proof);

const box = await page.locator('[data-card="toast"]').boundingBox();
if (!box) {
  await writeFile(LOG, `${lines.join('\n')}\n`);
  console.error('land-toast-pixel-diff: card has no bounding box');
  process.exit(1);
}
const clip = {
  x: Math.max(0, box.x),
  y: Math.max(0, box.y),
  width: box.width,
  height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
};
log(`card box x=${box.x} y=${box.y} w=${box.width} h=${box.height}`);
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
  proof.ctorName !== 'LitToast' ||
  proof.buttonCtor !== 'LitButton' ||
  proof.litTagDefined ||
  proof.hostCount !== 1 ||
  proof.buttonCount !== 4 ||
  proof.itemCount !== 0 ||
  stillLazy ||
  proof.hosts.some((item) => {
    return (
      item.tag !== 'p-toast' ||
      item.ctor !== 'LitToast' ||
      item.parentCard !== 'toast' ||
      item.role !== 'status' ||
      !item.hasShadow ||
      !item.hasStyle ||
      !item.hasToastVar ||
      !item.hasZIndex ||
      !item.hasSBreakpoint ||
      item.hasRootWrap ||
      !item.hasSlot ||
      item.hasItem ||
      !item.hasAddMessage ||
      item.hydrated ||
      item.hasFragment ||
      item.position !== 'fixed'
    );
  }) ||
  proof.buttons.some((item) => item.ctor !== 'LitButton' || item.hydrated) ||
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
