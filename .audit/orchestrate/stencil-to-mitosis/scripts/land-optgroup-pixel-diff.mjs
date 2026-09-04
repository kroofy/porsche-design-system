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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=select';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_optgroup_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_optgroup_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_optgroup_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 33197;
const EXPECTED_BASELINE_SHA = '9f6eac94a24cfed66f10097fb6014d046ee327013484410b757af0a693d40aad';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-optgroup.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`optgroup IIFE HTTP ${iifeAsset.status()}`);
}
const parentIife = await page.request.get('http://localhost:3333/assets/p-select.iife.js');
if (parentIife.status() !== 200) {
  throw new Error(`parent IIFE HTTP ${parentIife.status()}`);
}
const optionIife = await page.request.get('http://localhost:3333/assets/p-select-option.iife.js');
if (optionIife.status() !== 200) {
  throw new Error(`option IIFE HTTP ${optionIife.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const stillLazy = /"p-optgroup"/.test(loaderText);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-select') &&
    customElements.get('p-select-option') &&
    customElements.get('p-optgroup') &&
    customElements.get('p-icon'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content: ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; }',
});
await page.waitForSelector('[data-card="select"] p-optgroup', { state: 'attached', timeout: 20_000 });
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="select"] > p-select')];
  const groups = [...document.querySelectorAll('[data-card="select"] p-optgroup')];
  const options = [...document.querySelectorAll('[data-card="select"] p-select-option')];
  const Parent = customElements.get('p-select');
  const Option = customElements.get('p-select-option');
  const Group = customElements.get('p-optgroup');
  const Icon = customElements.get('p-icon');
  return (
    hosts.length === 4 &&
    groups.length === 8 &&
    options.length === 20 &&
    Parent?.name === 'LitSelect' &&
    Option?.name === 'LitSelectOption' &&
    Group?.name === 'LitOptgroup' &&
    Icon?.name === 'LitIcon' &&
    hosts.every((el) => {
      const button = el.shadowRoot?.querySelector('button[role="combobox"]');
      const popover = el.shadowRoot?.querySelector('[popover]');
      if (el.classList.contains('hydrated')) return false;
      if (button?.getAttribute('aria-expanded') !== 'false') return false;
      if (popover && popover.matches(':popover-open')) return false;
      return true;
    }) &&
    groups.every((el) => {
      const root = el.shadowRoot;
      const style = root?.querySelector('style');
      const group = root?.querySelector('[role="group"]');
      const label = root?.querySelector('[role="presentation"]');
      const adopted = root?.adoptedStyleSheets?.length ?? 0;
      if (!root || style || adopted < 1 || !group || !label) return false;
      if (el.classList.contains('hydrated')) return false;
      if (root.querySelector('my-fragment') || root.querySelector('lit-optgroup')) return false;
      if (el.getAttribute('label') !== 'Some optgroup') return false;
      const kids = [...el.querySelectorAll(':scope > p-select-option')];
      if (kids.length !== 2) return false;
      return kids.every((option) => option.constructor?.name === 'LitSelectOption' && option.textContent?.trim());
    })
  );
}, { timeout: 30_000 });

const proof = await page.evaluate(() => {
  const Parent = customElements.get('p-select');
  const Option = customElements.get('p-select-option');
  const Group = customElements.get('p-optgroup');
  const hosts = [...document.querySelectorAll('[data-card="select"] > p-select')];
  const groups = [...document.querySelectorAll('[data-card="select"] p-optgroup')];
  const options = [...document.querySelectorAll('[data-card="select"] p-select-option')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Group?.name ?? null,
    parentCtor: Parent?.name ?? null,
    optionCtor: Option?.name ?? null,
    isLit: !!Group && 'elementProperties' in Group,
    definedTag: 'p-optgroup',
    litTagDefined: !!customElements.get('lit-optgroup'),
    iconCtor: customElements.get('p-icon')?.name ?? null,
    hostCount: hosts.length,
    groupCount: groups.length,
    optionCount: options.length,
    hosts: hosts.map((el) => {
      const button = el.shadowRoot?.querySelector('button[role="combobox"]');
      const popover = el.shadowRoot?.querySelector('[popover]');
      return {
        tag: el.localName,
        className: el.className,
        ctor: el.constructor?.name,
        label: el.getAttribute('label'),
        ariaExpanded: button?.getAttribute('aria-expanded') ?? null,
        popoverOpen: popover ? popover.matches(':popover-open') : false,
        hydrated: el.classList.contains('hydrated'),
      };
    }),
    groups: groups.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const group = el.shadowRoot?.querySelector('[role="group"]');
      const kids = [...el.querySelectorAll(':scope > p-select-option')];
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        label: el.getAttribute('label'),
        disabled: el.getAttribute('disabled'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        hasGroup: !!group,
        optionCount: kids.length,
        optionCtors: [...new Set(kids.map((n) => n.constructor?.name))],
        childDisabledParent: kids.map((n) => !!n.disabledParent),
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        visible: el.checkVisibility?.() ?? (el.offsetParent !== null),
      };
    }),
  };
});

const box = await page.locator('[data-card="select"]').boundingBox();
if (!box) {
  console.error('land-optgroup-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitOptgroup' ||
  proof.parentCtor !== 'LitSelect' ||
  proof.optionCtor !== 'LitSelectOption' ||
  proof.litTagDefined ||
  proof.hostCount !== 4 ||
  proof.groupCount !== 8 ||
  proof.optionCount !== 20 ||
  proof.iconCtor !== 'LitIcon' ||
  stillLazy ||
  proof.hosts.some((h) => {
    return (
      h.tag !== 'p-select' ||
      h.className !== 'w-full' ||
      h.ctor !== 'LitSelect' ||
      h.ariaExpanded !== 'false' ||
      h.popoverOpen ||
      h.hydrated
    );
  }) ||
  proof.groups.some((item, i) => {
    return (
      item.tag !== 'p-optgroup' ||
      item.ctor !== 'LitOptgroup' ||
      item.label !== 'Some optgroup' ||
      !item.hasShadow ||
      item.hasStyle ||
      !item.adoptedSheets ||
      !item.hasGroup ||
      item.optionCount !== 2 ||
      item.hydrated ||
      item.hasFragment ||
      (i % 2 === 1 && item.disabled !== 'true') ||
      (i % 2 === 0 && item.disabled !== null)
    );
  }) ||
  consoleErrors.some((err) => !/ERR_CONNECTION_REFUSED|ERR_ABORTED/.test(err));

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
