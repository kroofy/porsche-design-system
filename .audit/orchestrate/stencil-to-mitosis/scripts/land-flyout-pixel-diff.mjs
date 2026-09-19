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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=flyout';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_flyout_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_flyout_after.png';
const AFTER_PASS = '/opt/cursor/artifacts/mitosis_land_flyout_after_pass.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_flyout_pixel_diff.png';
const LOG = '/opt/cursor/artifacts/land_flyout_verify.log';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 66802;
const EXPECTED_BASELINE_SHA = '0a79ad2d8e2031d819091f71a8c17bc0cd8a15d0531f39705e1e7814da1cb1b6';

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
  text.includes('ERR_ABORTED') ||
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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-flyout.iife.js');
log(`iife HEAD /assets/p-flyout.iife.js status=${iifeAsset.status()}`);
if (iifeAsset.status() !== 200) {
  throw new Error(`flyout IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-flyout"/.test(loaderText);
log(`loader exact "p-flyout"=${stillLazy}`);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () => customElements.get('p-flyout') && customElements.get('p-button'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="flyout"] p-flyout', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="flyout"] p-flyout')];
  const buttons = [...document.querySelectorAll('[data-card="flyout"] > p-button')];
  const Flyout = customElements.get('p-flyout');
  const Button = customElements.get('p-button');
  if (Flyout?.name !== 'LitFlyout') return false;
  if (Button?.name !== 'LitButton') return false;
  if (hosts.length !== 9 || buttons.length < 9) return false;
  if (buttons.some((el) => el.classList.contains('hydrated'))) return false;
  return hosts.every((el) => {
    if (el.classList.contains('hydrated')) return false;
    if (el.parentElement?.getAttribute('data-card') !== 'flyout') return false;
    const root = el.shadowRoot;
    const dialog = root?.querySelector('dialog');
    if (!root || !dialog) return false;
    if (dialog.open) return false;
    if (getComputedStyle(dialog).visibility !== 'hidden') return false;
    if (getComputedStyle(el).display !== 'contents') return false;
    if (!root.querySelector('.scroller') || !root.querySelector('.flyout')) return false;
    if (!root.querySelector('slot:not([name])')) return false;
    if (!root.querySelector('slot[name="header"]') || !root.querySelector('slot[name="footer"]')) return false;
    if (!root.querySelector('slot[name="sub-footer"]')) return false;
    if (root.querySelector('p-button-pure, lit-button-pure, .root, my-fragment, lit-flyout')) return false;
    const dismiss = root.querySelector('button.dismiss');
    if (!dismiss || !dismiss.textContent.includes('Dismiss flyout')) return false;
    if (root.querySelector('style')) return false;
    if ((root.adoptedStyleSheets?.length ?? 0) < 1) return false;
    const css = [...(root.adoptedStyleSheets ?? [])]
      .flatMap((sheet) => {
        try {
          return [...sheet.cssRules].map((rule) => rule.cssText);
        } catch {
          return [];
        }
      })
      .join('\n');
    if (!css.includes('display: contents') && !css.includes('display:contents')) return false;
    if (!css.includes('hidden')) return false;
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const hosts = [...document.querySelectorAll('[data-card="flyout"] p-flyout')];
  await Promise.all(hosts.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="flyout"] p-flyout')];
  const buttons = [...document.querySelectorAll('[data-card="flyout"] > p-button')];
  const nestedModal = document.querySelector('[data-card="flyout"] p-flyout p-modal');
  return {
    title: document.title,
    href: location.href,
    ctorName: customElements.get('p-flyout')?.name ?? null,
    isLit: !!customElements.get('p-flyout') && 'elementProperties' in customElements.get('p-flyout'),
    definedTag: 'p-flyout',
    litTagDefined: !!customElements.get('lit-flyout'),
    buttonCtor: customElements.get('p-button')?.name ?? null,
    textCtor: customElements.get('p-text')?.name ?? null,
    headingCtor: customElements.get('p-heading')?.name ?? null,
    modalCtor: customElements.get('p-modal')?.name ?? null,
    nestedModalCtor: nestedModal?.constructor?.name ?? null,
    nestedModalHydrated: nestedModal?.classList.contains('hydrated') ?? null,
    hostCount: hosts.length,
    buttonCount: buttons.length,
    hosts: hosts.map((el) => {
      const dialog = el.shadowRoot?.querySelector('dialog');
      const css = [...(el.shadowRoot?.adoptedStyleSheets ?? [])]
        .map((sheet) => {
          try {
            return [...sheet.cssRules].map((rule) => rule.cssText).join('');
          } catch {
            return '';
          }
        })
        .join('');
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        parentCard: el.parentElement?.getAttribute('data-card') ?? null,
        display: getComputedStyle(el).display,
        dialogOpen: dialog?.open ?? null,
        dialogVis: dialog ? getComputedStyle(dialog).visibility : null,
        dialogWidth: dialog ? getComputedStyle(dialog).width : null,
        dialogHeight: dialog ? getComputedStyle(dialog).height : null,
        hasScroller: !!el.shadowRoot?.querySelector('.scroller'),
        hasFlyout: !!el.shadowRoot?.querySelector('.flyout'),
        hasDismiss: !!el.shadowRoot?.querySelector('button.dismiss'),
        dismissLabel: el.shadowRoot?.querySelector('button.dismiss')?.textContent?.trim() ?? null,
        hasHeaderSlot: !!el.shadowRoot?.querySelector('slot[name="header"]'),
        hasDefaultSlot: !!el.shadowRoot?.querySelector('slot:not([name])'),
        hasFooterSlot: !!el.shadowRoot?.querySelector('slot[name="footer"]'),
        hasSubFooterSlot: !!el.shadowRoot?.querySelector('slot[name="sub-footer"]'),
        hasNestedPure: !!el.shadowRoot?.querySelector('p-button-pure, lit-button-pure'),
        hasRootWrap: !!el.shadowRoot?.querySelector('.root'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        hasStyle: !!el.shadowRoot?.querySelector('style'),
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        hasContents: css.includes('display: contents') || css.includes('display:contents'),
        hasHiddenVis: css.includes('hidden'),
        hasFixedRows:
          css.includes('grid-template-rows:auto 1fr auto') ||
          css.includes('grid-template-rows: auto 1fr auto'),
        hasStickyVar:
          css.includes('--p-flyout-sticky-top') || (el.shadowRoot?.adoptedStyleSheets?.length ?? 0) > 0,
        hydrated: el.classList.contains('hydrated'),
      };
    }),
    buttons: buttons.map((el) => ({
      ctor: el.constructor?.name,
      hydrated: el.classList.contains('hydrated'),
    })),
  };
});
log(proof);

const box = await page.locator('[data-card="flyout"]').boundingBox();
if (!box) {
  await writeFile(LOG, `${lines.join('\n')}\n`);
  console.error('land-flyout-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitFlyout' ||
  proof.buttonCtor !== 'LitButton' ||
  proof.modalCtor !== 'LitModal' ||
  proof.litTagDefined ||
  proof.hostCount !== 9 ||
  proof.buttonCount < 9 ||
  stillLazy ||
  proof.hosts.some((item) => {
    return (
      item.tag !== 'p-flyout' ||
      item.ctor !== 'LitFlyout' ||
      item.parentCard !== 'flyout' ||
      item.display !== 'contents' ||
      item.dialogOpen ||
      item.dialogVis !== 'hidden' ||
      !item.hasScroller ||
      !item.hasFlyout ||
      !item.hasDismiss ||
      item.dismissLabel !== 'Dismiss flyout' ||
      !item.hasDefaultSlot ||
      !item.hasHeaderSlot ||
      !item.hasFooterSlot ||
      !item.hasSubFooterSlot ||
      item.hasNestedPure ||
      item.hasRootWrap ||
      item.hasFragment ||
      item.hasStyle ||
      item.adoptedSheets < 1 ||
      !item.hasContents ||
      !item.hasHiddenVis ||
      !item.hasStickyVar ||
      item.hydrated
    );
  }) ||
  !proof.hosts.some((item) => item.hasFixedRows) ||
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
