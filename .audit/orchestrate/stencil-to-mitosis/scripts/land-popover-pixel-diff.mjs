#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=popover';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_popover_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_popover_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_popover_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 54855;
const EXPECTED_BASELINE_SHA = 'd63be3f3cf5a954dc2adf4bbaa7914abee530b82a041a7b81fdab7148a63fb8e';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const baselineBuf = await readFile(BASELINE_PNG);
if (baselineBuf.byteLength !== EXPECTED_BASELINE_BYTES) {
  throw new Error(`baseline bytes ${baselineBuf.byteLength} !== ${EXPECTED_BASELINE_BYTES}`);
}
const baselineSha = sha256(baselineBuf);
if (baselineSha !== EXPECTED_BASELINE_SHA) {
  throw new Error(`baseline sha ${baselineSha} !== ${EXPECTED_BASELINE_SHA}`);
}

const isBenign = (text) =>
  text.includes('ERR_CONNECTION_REFUSED') ||
  text.includes('ERR_ABORTED') ||
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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-popover.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`popover IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-popover"/.test(loaderText);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-popover') &&
    customElements.get('p-button-pure') &&
    customElements.get('p-button') &&
    customElements.get('p-text'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="popover"] p-popover', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="popover"] p-popover')];
  const Host = customElements.get('p-popover');
  const Button = customElements.get('p-button');
  const Pure = customElements.get('p-button-pure');
  const Text = customElements.get('p-text');
  if (hosts.length !== 12) return false;
  if (Host?.name !== 'LitPopover') return false;
  if (Button?.name !== 'LitButton') return false;
  if (Pure?.name !== 'LitButtonPure') return false;
  if (Text?.name !== 'LitText') return false;
  return hosts.every((el) => {
    if (el.classList.contains('hydrated')) return false;
    const root = el.shadowRoot;
    const style = root?.querySelector('style');
    const pop = root?.querySelector('[popover]');
    const arrow = root?.querySelector('.arrow');
    if (!root || style || (root.adoptedStyleSheets?.length ?? 0) < 1 || !pop || !arrow) return false;
    if (pop.getAttribute('popover') !== 'manual') return false;
    if (root.querySelector('my-fragment') || root.querySelector('lit-popover')) return false;
    const isOpen = el.getAttribute('open') === 'true' || el.getAttribute('open') === '' || el.open === true;
    if (isOpen) {
      if (!pop.matches(':popover-open')) return false;
      if (!pop.style.left || !pop.style.top) return false;
    } else if (pop.matches(':popover-open')) {
      return false;
    }
    const hasButtonSlot = !!el.querySelector('[slot="button"]');
    const defaultBtn = root.querySelector('button');
    const namedSlot = root.querySelector('slot[name="button"]');
    if (hasButtonSlot ? !namedSlot || defaultBtn : !defaultBtn || namedSlot) return false;
    const hasDescription = !!(el.getAttribute('description') || el.description);
    const p = root.querySelector('p');
    const defaultSlot = [...root.querySelectorAll('slot')].find((s) => !s.getAttribute('name'));
    if (hasDescription ? !p : !defaultSlot) return false;
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const hosts = [...document.querySelectorAll('[data-card="popover"] p-popover')];
  await Promise.all(hosts.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const Host = customElements.get('p-popover');
  const hosts = [...document.querySelectorAll('[data-card="popover"] p-popover')];
  const nested = [...document.querySelectorAll('[data-card="popover"] p-popover p-popover')];
  const pures = [...document.querySelectorAll('[data-card="popover"] p-popover > p-button-pure')];
  const buttons = [...document.querySelectorAll('[data-card="popover"] p-popover > p-button')];
  const texts = [...document.querySelectorAll('[data-card="popover"] p-popover > p-text')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Host?.name ?? null,
    isLit: !!Host && 'elementProperties' in Host,
    definedTag: 'p-popover',
    litTagDefined: !!customElements.get('lit-popover'),
    buttonCtor: customElements.get('p-button')?.name ?? null,
    pureCtor: customElements.get('p-button-pure')?.name ?? null,
    textCtor: customElements.get('p-text')?.name ?? null,
    hostCount: hosts.length,
    nestedCount: nested.length,
    slottedPure: pures.length,
    slottedButton: buttons.length,
    slottedText: texts.length,
    hosts: hosts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const pop = el.shadowRoot?.querySelector('[popover]');
      const hasButtonSlot = !!el.querySelector('[slot="button"]');
      const hasDescription = !!(el.getAttribute('description') || el.description);
      const sheetText = [...(el.shadowRoot?.adoptedStyleSheets ?? [])]
        .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
        .join('\n');
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        open: el.getAttribute('open'),
        direction: el.getAttribute('direction'),
        description: el.getAttribute('description'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        cssTextLen: sheetText.length,
        popover: pop?.getAttribute('popover') ?? null,
        hasArrow: !!el.shadowRoot?.querySelector('.arrow'),
        popoverOpen: !!pop?.matches(':popover-open'),
        left: pop?.style.left || null,
        top: pop?.style.top || null,
        hasDefaultButton: !!el.shadowRoot?.querySelector('button'),
        hasNamedButtonSlot: !!el.shadowRoot?.querySelector('slot[name="button"]'),
        hasDescriptionP: !!el.shadowRoot?.querySelector('p'),
        hasDefaultSlot: !![...el.shadowRoot?.querySelectorAll('slot') ?? []].find((s) => !s.getAttribute('name')),
        lightButton: el.querySelector(':scope > [slot="button"]')?.tagName ?? null,
        expectedButtonSlot: hasButtonSlot,
        expectedDescription: hasDescription,
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});

const box = await page.locator('[data-card="popover"]').boundingBox();
if (!box) {
  console.error('land-popover-pixel-diff: card has no bounding box');
  process.exit(1);
}
const clip = {
  x: Math.max(0, box.x),
  y: Math.max(0, box.y),
  width: box.width,
  height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
};
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
  proof.ctorName !== 'LitPopover' ||
  proof.buttonCtor !== 'LitButton' ||
  proof.pureCtor !== 'LitButtonPure' ||
  proof.textCtor !== 'LitText' ||
  proof.litTagDefined ||
  proof.hostCount !== 12 ||
  proof.nestedCount !== 1 ||
  proof.slottedPure < 1 ||
  proof.slottedButton < 1 ||
  proof.slottedText < 1 ||
  stillLazy ||
  proof.hosts.some((item) => {
    const isOpen = item.open === 'true' || item.open === '';
    return (
      item.tag !== 'p-popover' ||
      item.ctor !== 'LitPopover' ||
      !item.hasShadow ||
      item.hasStyle ||
      item.adoptedSheets < 1 ||
      item.cssTextLen < 100 ||
      item.popover !== 'manual' ||
      !item.hasArrow ||
      item.hydrated ||
      item.hasFragment ||
      item.hasDefaultButton === item.expectedButtonSlot ||
      item.hasNamedButtonSlot !== item.expectedButtonSlot ||
      item.hasDescriptionP !== item.expectedDescription ||
      item.hasDefaultSlot === item.expectedDescription ||
      (isOpen
        ? !item.popoverOpen || !item.left || !item.top
        : item.popoverOpen)
    );
  }) ||
  consoleErrors.length > 0;

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
console.warn(JSON.stringify(summary, null, 2));
process.exit(failed ? 1 : 0);
