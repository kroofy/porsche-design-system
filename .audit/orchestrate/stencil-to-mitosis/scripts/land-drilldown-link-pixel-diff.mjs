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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=drilldown';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_drilldown_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_drilldown_link_after.png';
const AFTER_PASS = '/opt/cursor/artifacts/mitosis_land_drilldown_link_after_pass.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_drilldown_link_pixel_diff.png';
const LOG = '/opt/cursor/artifacts/land_drilldown_link_verify.log';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 18500;
const EXPECTED_BASELINE_SHA = '7e397a872604e2ae0b88a78b991751a56ee5ef2f005f4ebae99998be9ce49ddc';

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
  text.includes('throwIfParentIsNotOfKind') ||
  text.includes('supplied to p-drilldown') ||
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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-drilldown-link.iife.js');
log(`iife HEAD /assets/p-drilldown-link.iife.js status=${iifeAsset.status()}`);
if (iifeAsset.status() !== 200) {
  throw new Error(`drilldown-link IIFE HTTP ${iifeAsset.status()}`);
}
const loader = await page.request.get('http://localhost:3333/build/porsche-design-system.esm.js');
const loaderText = loader.status() === 200 ? await loader.text() : '';
const parentStillLazy = /"p-drilldown"/.test(loaderText);
const itemStillLazy = /"p-drilldown-item"/.test(loaderText);
const linkStillLazy = /"p-drilldown-link"/.test(loaderText);
log(`loader exact "p-drilldown"=${parentStillLazy} item=${itemStillLazy} link=${linkStillLazy}`);

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-drilldown') &&
    customElements.get('p-drilldown-item') &&
    customElements.get('p-drilldown-link') &&
    customElements.get('p-button'),
  { timeout: 20_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content:
    ':root, :host, * { --p-animation-duration: 0s !important; --p-transition-duration: 0s !important; --p-duration-md: 0s !important; --p-duration-sm: 0s !important; }',
});
await page.waitForSelector('[data-card="drilldown"] p-drilldown-link', {
  state: 'attached',
  timeout: 20_000,
});
await page.waitForFunction(() => {
  const parents = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown')];
  const items = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-item')];
  const links = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-link')];
  const Drilldown = customElements.get('p-drilldown');
  const Item = customElements.get('p-drilldown-item');
  const Link = customElements.get('p-drilldown-link');
  if (Drilldown?.name !== 'LitDrilldown') return false;
  if (Item?.name !== 'LitDrilldownItem') return false;
  if (Link?.name !== 'LitDrilldownLink') return false;
  if (parents.length !== 2 || items.length !== 17 || links.length !== 57) return false;
  if (parents.some((el) => el.classList.contains('hydrated'))) return false;
  if (items.some((el) => el.classList.contains('hydrated'))) return false;
  if (links.some((el) => el.classList.contains('hydrated'))) return false;
  return links.every((el) => {
    if (el.closest('[data-card="drilldown"]')?.getAttribute('data-card') !== 'drilldown') return false;
    if (getComputedStyle(el).display !== 'grid') return false;
    const root = el.shadowRoot;
    if (!root) return false;
    if (!root.querySelector('slot:not([name])')) return false;
    if (root.querySelector('.root, my-fragment, lit-drilldown-link')) return false;
    if (root.querySelector('[href="undefined"]')) return false;
    const css = root.querySelector('style')?.textContent || '';
    if (!css.includes('display:grid')) return false;
    const wrap = root.querySelector('a');
    const hasHrefAttr = el.hasAttribute('href');
    if (hasHrefAttr) {
      if (!wrap || wrap.getAttribute('href') === 'undefined') return false;
      if (!wrap.querySelector('slot')) return false;
    } else if (wrap) {
      return false;
    }
    return true;
  });
}, { timeout: 30_000 });

await page.evaluate(async () => {
  const links = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-link')];
  await Promise.all(links.map((el) => el.updateComplete));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));

const proof = await page.evaluate(() => {
  const parents = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown')];
  const items = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-item')];
  const links = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-link')];
  return {
    title: document.title,
    href: location.href,
    parentCtor: customElements.get('p-drilldown')?.name ?? null,
    itemCtor: customElements.get('p-drilldown-item')?.name ?? null,
    ctorName: customElements.get('p-drilldown-link')?.name ?? null,
    isLit: !!customElements.get('p-drilldown-link') && 'elementProperties' in customElements.get('p-drilldown-link'),
    definedTag: 'p-drilldown-link',
    litTagDefined: !!customElements.get('lit-drilldown-link'),
    parentCount: parents.length,
    itemCount: items.length,
    hostCount: links.length,
    hrefWrapCount: links.filter((el) => el.hasAttribute('href') && el.shadowRoot?.querySelector('a')).length,
    slottedCount: links.filter((el) => !el.hasAttribute('href') && !el.shadowRoot?.querySelector('a')).length,
    parentsHydrated: parents.some((el) => el.classList.contains('hydrated')),
    itemsHydrated: items.some((el) => el.classList.contains('hydrated')),
    linksHydrated: links.some((el) => el.classList.contains('hydrated')),
    dialogsOpen: parents.some((el) => el.shadowRoot?.querySelector('dialog')?.open),
    hrefUndefined: links.some((el) => el.shadowRoot?.querySelector('[href="undefined"]')),
    hosts: links.slice(0, 3).map((el) => {
      const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
      const wrap = el.shadowRoot?.querySelector('a');
      return {
        tag: el.localName,
        ctor: el.constructor?.name,
        parentCard: el.closest('[data-card="drilldown"]')?.getAttribute('data-card') ?? null,
        display: getComputedStyle(el).display,
        hasHref: el.hasAttribute('href'),
        wrapHref: wrap?.getAttribute('href') ?? null,
        hasSlot: !!el.shadowRoot?.querySelector('slot:not([name])'),
        hasRootWrap: !!el.shadowRoot?.querySelector('.root'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        hasGrid: css.includes(':host{display:grid') || css.includes('display:grid'),
        hydrated: el.classList.contains('hydrated'),
      };
    }),
  };
});
log(proof);

const box = await page.locator('[data-card="drilldown"]').boundingBox();
if (!box) {
  await writeFile(LOG, `${lines.join('\n')}\n`);
  console.error('land-drilldown-link-pixel-diff: card has no bounding box');
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
  proof.parentCtor !== 'LitDrilldown' ||
  proof.itemCtor !== 'LitDrilldownItem' ||
  proof.ctorName !== 'LitDrilldownLink' ||
  proof.litTagDefined ||
  proof.parentCount !== 2 ||
  proof.itemCount !== 17 ||
  proof.hostCount !== 57 ||
  proof.hrefWrapCount !== 56 ||
  proof.slottedCount !== 1 ||
  parentStillLazy ||
  itemStillLazy ||
  linkStillLazy ||
  proof.parentsHydrated ||
  proof.itemsHydrated ||
  proof.linksHydrated ||
  proof.dialogsOpen ||
  proof.hrefUndefined ||
  proof.hosts.some((item) => {
    return (
      item.tag !== 'p-drilldown-link' ||
      item.ctor !== 'LitDrilldownLink' ||
      item.parentCard !== 'drilldown' ||
      item.display !== 'grid' ||
      !item.hasSlot ||
      item.hasRootWrap ||
      item.hasFragment ||
      !item.hasGrid ||
      item.hydrated
    );
  }) ||
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
  parentStillLazy,
  itemStillLazy,
  linkStillLazy,
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
