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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=ai-tag';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_ai_tag_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_ai_tag_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_ai_tag_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 10583;
const EXPECTED_BASELINE_SHA = 'c51807f21e37a58384f11e093ba089e209b1b93d11c555e2eabaabf2b2a4f32f';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-ai-tag.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`IIFE HTTP ${iifeAsset.status()}`);
}

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-ai-tag'), { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="ai-tag"] > p-ai-tag')];
  const Ctor = customElements.get('p-ai-tag');
  return (
    hosts.length === 3 &&
    Ctor?.name === 'LitAiTag' &&
    hosts.every((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const pill = el.shadowRoot?.querySelector('div');
      const abbr = el.shadowRoot?.querySelector('abbr');
      const variant = el.getAttribute('variant');
      const expectAbbr = variant === 'abbreviation';
      const text = pill?.textContent ?? '';
      const copyOk = expectAbbr
        ? !!abbr && (abbr.textContent ?? '').includes('AI')
        : variant === 'modified'
          ? text.includes('AI-modified')
          : text.includes('AI-generated');
      const sheets = el.shadowRoot?.adoptedStyleSheets ?? [];
      const sheetText = sheets
        .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
        .join(' ');
      return (
        !!el.shadowRoot &&
        !style &&
        sheets.length > 0 &&
        sheetText.includes('div::before') &&
        !!pill &&
        copyOk &&
        (expectAbbr ? !!abbr : !abbr) &&
        !el.classList.contains('hydrated') &&
        !el.shadowRoot.querySelector('my-fragment') &&
        !el.shadowRoot.querySelector('lit-ai-tag')
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
  const Ctor = customElements.get('p-ai-tag');
  const source = Ctor ? Function.prototype.toString.call(Ctor) : '';
  const hosts = [...document.querySelectorAll('[data-card="ai-tag"] > p-ai-tag')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    hasCustomElementDecorator: source.includes('p-ai-tag'),
    definedTag: 'p-ai-tag',
    litTagDefined: !!customElements.get('lit-ai-tag'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const pill = el.shadowRoot?.querySelector('div');
      const abbr = el.shadowRoot?.querySelector('abbr');
      return {
        tag: el.localName,
        variant: el.getAttribute('variant'),
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        hasIconMask: (el.shadowRoot?.adoptedStyleSheets ?? [])
          .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
          .join(' ')
          .includes('div::before'),
        hasAbbr: !!abbr,
        copy: (pill?.textContent ?? '').trim(),
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});

const box = await page.locator('[data-card="ai-tag"]').boundingBox();
if (!box) {
  console.error('land-ai-tag-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitAiTag' ||
  proof.litTagDefined ||
  proof.animationDuration !== '0s' ||
  proof.hostCount !== 3 ||
  proof.hosts.some((h) => {
    const expectAbbr = h.variant === 'abbreviation';
    const expectCopy = expectAbbr
      ? 'AI'
      : h.variant === 'modified'
        ? 'AI-modified'
        : 'AI-generated';
    return (
      h.tag !== 'p-ai-tag' ||
      !h.hasShadow ||
      h.hasStyle ||
      !h.adoptedSheets ||
      !h.hasIconMask ||
      h.hasAbbr !== expectAbbr ||
      !h.copy.includes(expectCopy) ||
      h.hydrated ||
      h.hasFragment
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
  proof,
  litVsBaseline: result,
  consoleErrors,
  failed,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failed ? 1 : 0);
