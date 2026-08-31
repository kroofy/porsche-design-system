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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=accordion';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_accordion_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_accordion_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_accordion_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 70863;
const EXPECTED_BASELINE_SHA = '84c400a3522ed035e8d9497aeb5985996a27677a6a7bc66185814b68b2c6f4cd';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const baselineBuf = await readFile(BASELINE_PNG);
if (baselineBuf.byteLength !== EXPECTED_BASELINE_BYTES) {
  throw new Error(`baseline bytes ${baselineBuf.byteLength} !== ${EXPECTED_BASELINE_BYTES}`);
}
const baselineSha = sha256(baselineBuf);
if (baselineSha !== EXPECTED_BASELINE_SHA) {
  throw new Error(`baseline sha ${baselineSha} !== ${EXPECTED_BASELINE_SHA}`);
}

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-accordion.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`IIFE HTTP ${iifeAsset.status()}`);
}

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-accordion') &&
    customElements.get('p-heading') &&
    customElements.get('p-text') &&
    customElements.get('p-checkbox') &&
    customElements.get('p-popover'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content: ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; }',
});
await page.waitForSelector('[data-card="accordion"] p-accordion', { state: 'attached', timeout: 20_000 });
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="accordion"] > p-accordion')];
  const Ctor = customElements.get('p-accordion');
  const Heading = customElements.get('p-heading');
  const Checkbox = customElements.get('p-checkbox');
  const Popover = customElements.get('p-popover');
  return (
    hosts.length >= 21 &&
    Ctor?.name === 'LitAccordion' &&
    Heading?.name === 'LitHeading' &&
    Checkbox?.name === 'LitCheckbox' &&
    !!Popover &&
    Popover.name !== 'LitAccordion' &&
    hosts.every((el) => {
      const root = el.shadowRoot;
      const style = root?.querySelector('style');
      const details = root?.querySelector('details');
      if (!root || !style || !details) return false;
      if (el.classList.contains('hydrated')) return false;
      if (root.querySelector('my-fragment') || root.querySelector('lit-accordion')) return false;
      if (!style.textContent?.includes('summary::after')) return false;
      const isOpen = el.getAttribute('open') === 'true' || el.getAttribute('open') === '';
      if (isOpen && !details.hasAttribute('open')) return false;
      if (isOpen) {
        const body = details.querySelector(':scope > div');
        if (!body || getComputedStyle(body).opacity !== '1') return false;
      }
      const headingSlot = el.querySelector('[slot="summary"], [slot="heading"]');
      if (headingSlot?.localName === 'p-heading' && headingSlot.constructor?.name !== 'LitHeading') return false;
      const checkbox = el.querySelector('p-checkbox');
      if (checkbox && checkbox.constructor?.name !== 'LitCheckbox') return false;
      return true;
    })
  );
}, { timeout: 20_000 });

const proof = await page.evaluate(() => {
  const Ctor = customElements.get('p-accordion');
  const hosts = [...document.querySelectorAll('[data-card="accordion"] > p-accordion')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    definedTag: 'p-accordion',
    litTagDefined: !!customElements.get('lit-accordion'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    transitionDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-transition-duration').trim(),
    hostCount: hosts.length,
    openCount: hosts.filter((el) => el.getAttribute('open') === 'true' || el.getAttribute('open') === '').length,
    popoverCtor: customElements.get('p-popover')?.name ?? null,
    hosts: hosts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const details = el.shadowRoot?.querySelector('details');
      const body = details?.querySelector(':scope > div');
      return {
        tag: el.localName,
        open: el.getAttribute('open'),
        alignMarker: el.getAttribute('align-marker'),
        background: el.getAttribute('background'),
        sticky: el.getAttribute('sticky'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        hasDetails: !!details,
        detailsOpen: details?.hasAttribute('open') ?? null,
        bodyOpacity: body ? getComputedStyle(body).opacity : null,
        hasSummarySlot: !!el.shadowRoot?.querySelector('slot[name="summary"]'),
        hasHeadingSlot: !!el.shadowRoot?.querySelector('slot[name="heading"]'),
        hasBeforeSlot: !!el.shadowRoot?.querySelector('slot[name="summary-before"]'),
        hasAfterSlot: !!el.shadowRoot?.querySelector('slot[name="summary-after"]'),
        hasChevron: !!style?.textContent?.includes('summary::after'),
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});

const box = await page.locator('[data-card="accordion"]').boundingBox();
if (!box) {
  console.error('land-accordion-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitAccordion' ||
  proof.litTagDefined ||
  proof.animationDuration !== '0s' ||
  proof.transitionDuration !== '0s' ||
  proof.hostCount < 21 ||
  proof.openCount !== 3 ||
  proof.hosts.some((h) => {
    return (
      h.tag !== 'p-accordion' ||
      !h.hasShadow ||
      !h.hasStyle ||
      !h.hasDetails ||
      !h.hasChevron ||
      h.hydrated ||
      h.hasFragment
    );
  }) ||
  !proof.hosts.some((h) => (h.open === 'true' || h.open === '') && h.detailsOpen && h.bodyOpacity === '1') ||
  consoleErrors.length > 0;

const summary = {
  playground: PLAYGROUND_URL,
  baseline: BASELINE_PNG,
  baselineBytes: baselineBuf.byteLength,
  baselineSha,
  after: AFTER_PNG,
  afterBytes: png.byteLength,
  afterSha: sha256(png),
  proof,
  litVsBaseline: result,
  consoleErrors,
  failed,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failed ? 1 : 0);
