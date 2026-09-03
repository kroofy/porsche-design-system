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
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_toast_item_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_toast_item_after.png';
const AFTER_PASS = '/opt/cursor/artifacts/mitosis_land_toast_item_after_pass.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_toast_item_pixel_diff.png';
const LOG = '/opt/cursor/artifacts/land_toast_item_verify.log';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 106421;
const EXPECTED_BASELINE_SHA = '9f4ccf71694021cbac6df325a046b66cc584b08d93b70c9823ea493e417b32ba';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-toast-item.iife.js');
log(`iife HEAD /assets/p-toast-item.iife.js status=${iifeAsset.status()}`);
if (iifeAsset.status() !== 200) {
  throw new Error(`toast-item IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-toast-item"/.test(loaderText);
log(`loader exact "p-toast-item"=${stillLazy}`);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () => customElements.get('p-toast') && customElements.get('p-toast-item') && customElements.get('p-button'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; --p-temporary-toast-skip-timeout: true; }',
});
await page.waitForSelector('[data-card="toast"] p-toast', {
  state: 'attached',
  timeout: 20_000,
});
await page.evaluate(() => {
  document.querySelector('[data-card="toast"] p-toast').addMessage({ text: 'Some content' });
});
await page.waitForFunction(() => {
  const toast = document.querySelector('[data-card="toast"] p-toast');
  const buttons = [...document.querySelectorAll('[data-card="toast"] p-button')];
  const item = toast?.shadowRoot?.querySelector('p-toast-item');
  const Toast = customElements.get('p-toast');
  const Item = customElements.get('p-toast-item');
  const Button = customElements.get('p-button');
  if (Toast?.name !== 'LitToast') return false;
  if (Item?.name !== 'LitToastItem') return false;
  if (Button?.name !== 'LitButton') return false;
  if (!toast || toast.classList.contains('hydrated')) return false;
  if (buttons.length !== 4 || buttons.some((el) => el.classList.contains('hydrated'))) return false;
  if (!item || item.classList.contains('hydrated')) return false;
  if (item.getAttribute('popover') !== 'manual') return false;
  if (!item.matches(':popover-open')) return false;
  const root = item.shadowRoot;
  if (!root?.querySelector('.notification')) return false;
  if (!root.querySelector('button.dismiss')) return false;
  if (root.querySelector('p-icon, p-button-pure, lit-icon, lit-button-pure, .root, my-fragment, lit-toast-item')) {
    return false;
  }
  const text = root.querySelector('p')?.textContent ?? '';
  if (text !== 'Some content') return false;
  const css = root.querySelector('style')?.textContent || '';
  if (!css.includes('min-width:760px') || !css.includes('info-frosted')) return false;
  return true;
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const toast = document.querySelector('[data-card="toast"] p-toast');
  const item = toast?.shadowRoot?.querySelector('p-toast-item');
  await Promise.all([toast?.updateComplete, item?.updateComplete].filter(Boolean));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const toast = document.querySelector('[data-card="toast"] p-toast');
  const buttons = [...document.querySelectorAll('[data-card="toast"] p-button')];
  const item = toast?.shadowRoot?.querySelector('p-toast-item');
  const css = item?.shadowRoot?.querySelector('style')?.textContent ?? '';
  const rect = item?.getBoundingClientRect()?.toJSON() ?? null;
  return {
    title: document.title,
    href: location.href,
    ctorName: customElements.get('p-toast-item')?.name ?? null,
    isLit: !!customElements.get('p-toast-item') && 'elementProperties' in customElements.get('p-toast-item'),
    definedTag: 'p-toast-item',
    litTagDefined: !!customElements.get('lit-toast-item'),
    toastCtor: customElements.get('p-toast')?.name ?? null,
    buttonCtor: customElements.get('p-button')?.name ?? null,
    hostCount: item ? 1 : 0,
    buttonCount: buttons.length,
    toastHydrated: toast?.classList.contains('hydrated') ?? null,
    hosts: item
      ? [
          {
            tag: item.localName,
            ctor: item.constructor?.name,
            parentHost: item.getRootNode()?.host?.tagName ?? null,
            parentCtor: item.getRootNode()?.host?.constructor?.name ?? null,
            popover: item.getAttribute('popover'),
            popoverOpen: item.matches(':popover-open'),
            hasShadow: !!item.shadowRoot,
            hasNotification: !!item.shadowRoot?.querySelector('.notification'),
            hasDismiss: !!item.shadowRoot?.querySelector('button.dismiss'),
            hasNestedIcon: !!item.shadowRoot?.querySelector('p-icon, p-button-pure, lit-icon, lit-button-pure'),
            hasRootWrap: !!item.shadowRoot?.querySelector('.root'),
            hasFragment: !!item.shadowRoot?.querySelector('my-fragment'),
            text: item.shadowRoot?.querySelector('p')?.textContent ?? '',
            textProp: item.text ?? item.getAttribute('text') ?? '',
            stateProp: item.state ?? item.getAttribute('state') ?? '',
            hasSBreakpoint: css.includes('min-width:760px'),
            hasFrosted: css.includes('info-frosted'),
            hydrated: item.classList.contains('hydrated'),
            rect,
          },
        ]
      : [],
    buttons: buttons.map((el) => ({
      ctor: el.constructor?.name,
      hydrated: el.classList.contains('hydrated'),
    })),
  };
});
log(proof);

const cardBox = await page.locator('[data-card="toast"]').boundingBox();
if (!cardBox) {
  await writeFile(LOG, `${lines.join('\n')}\n`);
  console.error('land-toast-item-pixel-diff: card has no bounding box');
  process.exit(1);
}
const itemRect = proof.hosts[0]?.rect;
if (!itemRect) {
  await writeFile(LOG, `${lines.join('\n')}\n`);
  console.error('land-toast-item-pixel-diff: open toast-item has no rect');
  process.exit(1);
}
const x = Math.max(0, Math.min(cardBox.x, itemRect.x));
const y = Math.max(0, Math.min(cardBox.y, itemRect.y));
const right = Math.max(cardBox.x + cardBox.width, itemRect.x + itemRect.width);
const bottom = Math.max(cardBox.y + cardBox.height, itemRect.y + itemRect.height);
const clip = {
  x,
  y,
  width: Math.min(right, VIEWPORT.width) - x,
  height: Math.min(bottom, VIEWPORT.height) - y,
};
log(`card box x=${cardBox.x} y=${cardBox.y} w=${cardBox.width} h=${cardBox.height}`);
log(`item box x=${itemRect.x} y=${itemRect.y} w=${itemRect.width} h=${itemRect.height}`);
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
  proof.ctorName !== 'LitToastItem' ||
  proof.toastCtor !== 'LitToast' ||
  proof.buttonCtor !== 'LitButton' ||
  proof.litTagDefined ||
  proof.hostCount !== 1 ||
  proof.buttonCount !== 4 ||
  proof.toastHydrated ||
  stillLazy ||
  proof.hosts.some((item) => {
    return (
      item.tag !== 'p-toast-item' ||
      item.ctor !== 'LitToastItem' ||
      item.parentHost !== 'P-TOAST' ||
      item.parentCtor !== 'LitToast' ||
      item.popover !== 'manual' ||
      !item.popoverOpen ||
      !item.hasShadow ||
      !item.hasNotification ||
      !item.hasDismiss ||
      item.hasNestedIcon ||
      item.hasRootWrap ||
      item.hasFragment ||
      item.text !== 'Some content' ||
      item.textProp !== 'Some content' ||
      item.stateProp !== 'info' ||
      !item.hasSBreakpoint ||
      !item.hasFrosted ||
      item.hydrated
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
