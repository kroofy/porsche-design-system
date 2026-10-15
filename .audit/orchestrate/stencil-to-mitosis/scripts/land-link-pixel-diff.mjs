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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=link';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_link_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_link_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() !== 'error') return;
  const text = msg.text();
  const url = msg.location()?.url ?? '';
  if (text.includes('ERR_CONNECTION_REFUSED') || text.includes('ERR_ABORTED') || url.includes('3002')) return;
  consoleErrors.push(text);
});
page.on('pageerror', (err) => {
  const text = String(err);
  if (text.includes('ERR_CONNECTION_REFUSED') || text.includes('ERR_ABORTED') || text.includes('3002')) return;
  consoleErrors.push(text);
});

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-link') && customElements.get('p-icon'), {
  timeout: 20_000,
});
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="link"] p-link')];
  return (
    hosts.length >= 7 &&
    hosts.every((el) => {
      const root = el.shadowRoot?.querySelector('.root');
      const icon = el.shadowRoot?.querySelector('p-icon');
      const img = icon?.shadowRoot?.querySelector('img');
      const iconHidden = !!icon && getComputedStyle(icon).display === 'none';
      return (
        !el.shadowRoot?.querySelector('style') &&
        (el.shadowRoot?.adoptedStyleSheets?.length ?? 0) >= 1 &&
        !!root &&
        !!el.shadowRoot.querySelector('slot') &&
        icon?.localName === 'p-icon' &&
        !el.shadowRoot.querySelector('lit-icon') &&
        !el.shadowRoot.querySelector('lit-link') &&
        !el.shadowRoot.querySelector('my-fragment') &&
        root.getAttribute('href') !== 'undefined' &&
        (iconHidden || (!!img?.complete && (img?.naturalWidth ?? 0) > 0)) &&
        (el.textContent?.trim().length ?? 0) > 0
      );
    })
  );
}, { timeout: 20_000 });

const proof = await page.evaluate(() => {
  const Ctor = customElements.get('p-link');
  const IconCtor = customElements.get('p-icon');
  const hosts = [...document.querySelectorAll('[data-card="link"] p-link')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    iconCtorName: IconCtor?.name ?? null,
    definedTag: 'p-link',
    litTagDefined: !!customElements.get('lit-link'),
    litIconDefined: !!customElements.get('lit-icon'),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const root = el.shadowRoot?.querySelector('.root');
      const icon = el.shadowRoot?.querySelector('p-icon');
      const img = icon?.shadowRoot?.querySelector('img');
      const css = root ? getComputedStyle(root) : null;
      const iconHidden = !!icon && getComputedStyle(icon).display === 'none';
      return {
        tag: el.localName,
        variant: el.getAttribute('variant'),
        icon: el.getAttribute('icon'),
        hideLabel: el.getAttribute('hide-label'),
        hostHref: el.getAttribute('href'),
        rootTag: root?.localName ?? null,
        rootHref: root?.getAttribute('href') ?? null,
        innerTag: icon?.localName ?? null,
        iconHidden,
        hasShadow: !!el.shadowRoot,
        hasStyle: !!el.shadowRoot?.querySelector('style'),
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        hasRoot: !!root,
        hasSlot: !!el.shadowRoot?.querySelector('slot'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        imgComplete: !!img?.complete,
        imgNaturalWidth: img?.naturalWidth ?? 0,
        text: el.textContent?.trim() ?? '',
        background: css?.backgroundColor ?? null,
      };
    }),
  };
});

const box = await page.locator('[data-card="link"]').boundingBox();
if (!box) {
  console.error('land-link-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitLink' ||
  proof.iconCtorName !== 'LitIcon' ||
  proof.litTagDefined ||
  proof.litIconDefined ||
  proof.hostCount < 7 ||
  proof.hosts.some(
    (h) =>
      h.tag !== 'p-link' ||
      h.innerTag !== 'p-icon' ||
      h.rootTag !== 'span' ||
      h.rootHref === 'undefined' ||
      h.hostHref === 'undefined' ||
      h.hasStyle ||
      !h.adoptedSheets ||
      !h.hasRoot ||
      !h.hasSlot ||
      h.hasFragment ||
      !h.text ||
      (!h.iconHidden && (!h.imgComplete || h.imgNaturalWidth === 0))
  ) ||
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
