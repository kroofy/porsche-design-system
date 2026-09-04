#!/usr/bin/env node
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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=text-list';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_text_list_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_text_list_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_text_list_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() !== 'error') return;
  const text = msg.text();
  const url = msg.location()?.url ?? '';
  if (text.includes('ERR_CONNECTION_REFUSED') || url.includes('3002')) return;
  consoleErrors.push(text);
});
page.on('pageerror', (err) => {
  const text = String(err);
  if (text.includes('ERR_CONNECTION_REFUSED') || text.includes('3002')) return;
  consoleErrors.push(text);
});

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () => customElements.get('p-text-list') && customElements.get('p-text-list-item'),
  { timeout: 20_000 }
);
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="text-list"] > p-text-list')];
  return (
    hosts.length >= 3 &&
    hosts.every((el) => {
      const list = el.shadowRoot?.querySelector('ul,ol');
      const style = el.shadowRoot?.querySelector('style');
      const sheets = el.shadowRoot?.adoptedStyleSheets ?? [];
      const sheetText = sheets
        .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
        .join(' ');
      const items = [...el.querySelectorAll(':scope > p-text-list-item')];
      const nested = el.querySelector(':scope > p-text-list-item p-text-list');
      const type = el.getAttribute('type');
      const expectOl = type === 'numbered' || type === 'alphabetically';
      return (
        !style &&
        sheets.length > 0 &&
        sheetText.includes('::slotted(*)') &&
        sheetText.includes('p-text-list-counter') &&
        list?.localName === (expectOl ? 'ol' : 'ul') &&
        !!el.shadowRoot?.querySelector('slot:not([name])') &&
        items.length === 3 &&
        items.every((item) => item.localName === 'p-text-list-item' && customElements.get(item.localName)?.name === 'LitTextListItem') &&
        nested?.localName === 'p-text-list' &&
        customElements.get(nested.localName)?.name === 'LitTextList' &&
        !nested.shadowRoot?.querySelector('style') &&
        (nested.shadowRoot?.adoptedStyleSheets?.length ?? 0) > 0 &&
        !el.shadowRoot.querySelector('lit-text-list') &&
        !el.shadowRoot.querySelector('my-fragment')
      );
    })
  );
}, { timeout: 20_000 });

await page.evaluate(() => {
  const root = document.documentElement.style;
  root.setProperty('--p-animation-duration', '0s');
  root.setProperty('--p-transition-duration', '0s');
  root.setProperty('--p-duration-md', '0s');
  root.setProperty('--p-duration-xl', '0s');
});

const proof = await page.evaluate(() => {
  const Ctor = customElements.get('p-text-list');
  const hosts = [...document.querySelectorAll('[data-card="text-list"] > p-text-list')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    itemCtorName: customElements.get('p-text-list-item')?.name ?? null,
    definedTag: 'p-text-list',
    litTagDefined: !!customElements.get('lit-text-list'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const list = el.shadowRoot?.querySelector('ul,ol');
      const style = el.shadowRoot?.querySelector('style');
      const items = [...el.querySelectorAll(':scope > p-text-list-item')];
      const nested = el.querySelector(':scope > p-text-list-item p-text-list');
      return {
        tag: el.localName,
        type: el.getAttribute('type'),
        listTag: list?.localName ?? null,
        itemCount: items.length,
        itemsLit: items.every((item) => customElements.get(item.localName)?.name === 'LitTextListItem'),
        nestedTag: nested?.localName ?? null,
        nestedCtor: nested ? customElements.get(nested.localName)?.name ?? null : null,
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        hasSlotted: (el.shadowRoot?.adoptedStyleSheets ?? [])
          .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
          .join(' ')
          .includes('::slotted(*)'),
        hasCounter: (el.shadowRoot?.adoptedStyleSheets ?? [])
          .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
          .join(' ')
          .includes('p-text-list-counter'),
        hasSlot: !!el.shadowRoot?.querySelector('slot:not([name])'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});

const box = await page.locator('[data-card="text-list"]').boundingBox();
if (!box) {
  console.error('land-text-list-pixel-diff: card has no bounding box');
  process.exit(1);
}
const clip = {
  x: Math.max(0, box.x),
  y: Math.max(0, box.y),
  width: box.width,
  height: box.height,
};
await mkdir(dirname(AFTER_PNG), { recursive: true });
let png;
try {
  png = await page.screenshot({ type: 'png', clip });
} catch {
  const needed = Math.ceil(box.y + box.height + 8);
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
  proof.ctorName !== 'LitTextList' ||
  proof.litTagDefined ||
  proof.animationDuration !== '0s' ||
  proof.hostCount < 3 ||
  proof.hosts.some((h) => {
    const expectOl = h.type === 'numbered' || h.type === 'alphabetically';
    return (
      h.tag !== 'p-text-list' ||
      h.listTag !== (expectOl ? 'ol' : 'ul') ||
      h.itemCount !== 3 ||
      !h.itemsLit ||
      h.nestedTag !== 'p-text-list' ||
      h.nestedCtor !== 'LitTextList' ||
      h.hasStyle ||
      !h.adoptedSheets ||
      !h.hasSlotted ||
      !h.hasCounter ||
      !h.hasSlot ||
      h.hasFragment
    );
  }) ||
  consoleErrors.length > 0;

const summary = {
  playground: PLAYGROUND_URL,
  baseline: BASELINE_PNG,
  after: AFTER_PNG,
  proof,
  litVsBaseline: result,
  consoleErrors,
  failed,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failed ? 1 : 0);
