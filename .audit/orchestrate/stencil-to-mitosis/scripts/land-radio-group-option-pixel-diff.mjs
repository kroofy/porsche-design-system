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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=radio-group';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_radio_group_option_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_radio_group_option_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_radio_group_option_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 93075;
const EXPECTED_BASELINE_SHA = 'abc65a990ebcfdb69a4b23e570d0dcde66759c1b3673c3dda3ca33fe7309f838';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-radio-group-option.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`option IIFE HTTP ${iifeAsset.status()}`);
}
const parentIife = await page.request.get('http://localhost:3333/assets/p-radio-group.iife.js');
if (parentIife.status() !== 200) {
  throw new Error(`parent IIFE HTTP ${parentIife.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-radio-group-option"/.test(loaderText);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-radio-group') &&
    customElements.get('p-radio-group-option') &&
    customElements.get('p-icon') &&
    customElements.get('p-spinner'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content: ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; }',
});
await page.waitForSelector('[data-card="radio-group"] p-radio-group-option', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="radio-group"] > p-radio-group')];
  const Parent = customElements.get('p-radio-group');
  const Option = customElements.get('p-radio-group-option');
  const Icon = customElements.get('p-icon');
  const Spinner = customElements.get('p-spinner');
  const options = [...document.querySelectorAll('[data-card="radio-group"] p-radio-group-option')];
  return (
    hosts.length === 5 &&
    options.length === 25 &&
    Parent?.name === 'LitRadioGroup' &&
    Option?.name === 'LitRadioGroupOption' &&
    Icon?.name === 'LitIcon' &&
    Spinner?.name === 'LitSpinner' &&
    options.every((el) => {
      const root = el.shadowRoot;
      const style = root?.querySelector('style');
      const input = root?.querySelector('input[type="radio"]');
      const sheets = root?.adoptedStyleSheets ?? [];
      const sheetText = sheets
        .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
        .join(' ');
      if (!root || style || !sheets.length || !input) return false;
      if (!sheetText.includes('radio') || !sheetText.includes('--_p-radio-group-option-a')) return false;
      if (el.classList.contains('hydrated')) return false;
      if (root.querySelector('my-fragment') || root.querySelector('lit-radio-group-option')) return false;
      return true;
    })
  );
}, { timeout: 30_000 });

const proof = await page.evaluate(() => {
  const Parent = customElements.get('p-radio-group');
  const Option = customElements.get('p-radio-group-option');
  const hosts = [...document.querySelectorAll('[data-card="radio-group"] > p-radio-group')];
  const options = [...document.querySelectorAll('[data-card="radio-group"] p-radio-group-option')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Option?.name ?? null,
    parentCtor: Parent?.name ?? null,
    isLit: !!Option && 'elementProperties' in Option,
    definedTag: 'p-radio-group-option',
    litTagDefined: !!customElements.get('lit-radio-group-option'),
    iconCtor: customElements.get('p-icon')?.name ?? null,
    spinnerCtor: customElements.get('p-spinner')?.name ?? null,
    hostCount: hosts.length,
    optionCount: options.length,
    hosts: hosts.map((el) => ({
      tag: el.localName,
      className: el.className,
      ctor: el.constructor?.name,
      hydrated: el.classList.contains('hydrated'),
      loading: el.getAttribute('loading'),
      disabled: el.getAttribute('disabled'),
      state: el.getAttribute('state'),
    })),
    options: options.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const input = el.shadowRoot?.querySelector('input[type="radio"]');
      const spinners = [...(el.shadowRoot?.querySelectorAll('p-spinner') ?? [])];
      const sheetText = (el.shadowRoot?.adoptedStyleSheets ?? [])
        .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
        .join(' ');
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        hasOptionVars: sheetText.includes('--_p-radio-group-option-a'),
        hasInput: !!input,
        checked: !!input?.checked,
        label: el.getAttribute('label'),
        loading: el.getAttribute('loading'),
        disabled: el.getAttribute('disabled'),
        selected: !!el.selected,
        disabledParent: !!el.disabledParent,
        loadingParent: !!el.loadingParent,
        spinnerCount: spinners.length,
        spinnerCtors: [...new Set(spinners.map((n) => n.constructor?.name))],
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        delegatesFocus: el.shadowRoot?.delegatesFocus ?? false,
      };
    }),
  };
});

const box = await page.locator('[data-card="radio-group"]').boundingBox();
if (!box) {
  console.error('land-radio-group-option-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitRadioGroupOption' ||
  proof.parentCtor !== 'LitRadioGroup' ||
  proof.litTagDefined ||
  proof.hostCount !== 5 ||
  proof.optionCount !== 25 ||
  proof.iconCtor !== 'LitIcon' ||
  proof.spinnerCtor !== 'LitSpinner' ||
  stillLazy ||
  proof.hosts.some((h) => h.tag !== 'p-radio-group' || h.className !== 'self-start' || h.ctor !== 'LitRadioGroup') ||
  proof.options.some((item) => {
    return (
      item.tag !== 'p-radio-group-option' ||
      item.ctor !== 'LitRadioGroupOption' ||
      !item.hasShadow ||
      item.hasStyle ||
      !item.adoptedSheets ||
      !item.hasOptionVars ||
      !item.hasInput ||
      item.hydrated ||
      item.hasFragment
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
