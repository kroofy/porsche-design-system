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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=banner';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_banner_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_banner_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_banner_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 57293;
const EXPECTED_BASELINE_SHA = '2244203b6e1bbd2615ce867de61dc763dd000e092b4fe768957c06f06f34d28f';

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
  if (text.includes('ERR_CONNECTION_REFUSED') || text.includes('ERR_ABORTED') || url.includes('3002')) return;
  consoleErrors.push(text);
});
page.on('pageerror', (err) => {
  const text = String(err);
  if (text.includes('ERR_CONNECTION_REFUSED') || text.includes('3002')) return;
  consoleErrors.push(text);
});

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-banner.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`IIFE HTTP ${iifeAsset.status()}`);
}

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-banner'), { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForSelector('[data-card="banner"] p-banner', { state: 'attached', timeout: 20_000 });
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="banner"] > p-banner')];
  const Ctor = customElements.get('p-banner');
  return (
    hosts.length >= 5 &&
    Ctor?.name === 'LitBanner' &&
    hosts.every((el) => {
      const root = el.shadowRoot;
      const style = root?.querySelector('style');
      const pop = root?.querySelector('[popover]');
      const box = root?.querySelector('.notification');
      const isOpen = el.getAttribute('open') === 'true' || el.getAttribute('open') === '';
      const headingSlot = el.querySelector('[slot="heading"]');
      const nestedHeading = headingSlot && customElements.get(headingSlot.localName);
      return (
        !!root &&
        !style &&
        (root.adoptedStyleSheets?.length ?? 0) >= 1 &&
        [...(root.adoptedStyleSheets ?? [])]
          .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
          .join('')
          .includes('.notification') &&
        !!pop &&
        !!box &&
        (!isOpen || pop.matches(':popover-open')) &&
        !el.classList.contains('hydrated') &&
        !root.querySelector('my-fragment') &&
        !root.querySelector('lit-banner') &&
        (!headingSlot || nestedHeading?.name === 'LitHeading' || headingSlot.localName !== 'p-heading')
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
  const Ctor = customElements.get('p-banner');
  const hosts = [...document.querySelectorAll('[data-card="banner"] > p-banner')];
  const card = document.querySelector('[data-card="banner"]');
  const openHost = hosts.find((el) => el.getAttribute('open') === 'true' || el.getAttribute('open') === '');
  const pop = openHost?.shadowRoot?.querySelector('[popover]');
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    definedTag: 'p-banner',
    litTagDefined: !!customElements.get('lit-banner'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    hostCount: hosts.length,
    cardRect: card ? card.getBoundingClientRect().toJSON() : null,
    popRect: pop ? pop.getBoundingClientRect().toJSON() : null,
    hosts: hosts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const popover = el.shadowRoot?.querySelector('[popover]');
      const box = el.shadowRoot?.querySelector('.notification');
      const dismiss = el.shadowRoot?.querySelector('button.dismiss');
      const headingSlot = el.shadowRoot?.querySelector('slot[name="heading"]');
      const descriptionSlot = el.shadowRoot?.querySelector('slot[name="description"]');
      return {
        tag: el.localName,
        open: el.getAttribute('open'),
        state: el.getAttribute('state'),
        heading: el.getAttribute('heading'),
        headingTag: el.shadowRoot?.querySelector('h1,h2,h3,h4,h5,h6')?.localName ?? null,
        hasHeadingSlot: !!headingSlot,
        hasDescriptionSlot: !!descriptionSlot,
        hasDismiss: !!dismiss,
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        hasNotificationClass: !!box,
        hasPopover: !!popover,
        popoverOpen: !!popover?.matches(':popover-open'),
        hasIconMask: [...(el.shadowRoot?.adoptedStyleSheets ?? [])]
          .flatMap((sheet) => [...(sheet.cssRules ?? [])].map((rule) => rule.cssText))
          .join('')
          .includes('.notification::before'),
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});

const cardBox = await page.locator('[data-card="banner"]').boundingBox();
if (!cardBox) {
  console.error('land-banner-pixel-diff: card has no bounding box');
  process.exit(1);
}
const popoverBox = proof.popRect
  ? { x: proof.popRect.x, y: proof.popRect.y, width: proof.popRect.width, height: proof.popRect.height }
  : null;
if (!popoverBox || !(popoverBox.width > 4) || !(popoverBox.height > 4)) {
  console.error('land-banner-pixel-diff: open popover has no box');
  process.exit(1);
}
const unionLeft = Math.min(cardBox.x, popoverBox.x);
const unionTop = Math.min(cardBox.y, popoverBox.y);
const unionRight = Math.max(cardBox.x + cardBox.width, popoverBox.x + popoverBox.width);
const unionBottom = Math.max(cardBox.y + cardBox.height, popoverBox.y + popoverBox.height);
const unionClip = {
  x: Math.max(0, unionLeft),
  y: Math.max(0, unionTop),
  width: unionRight - Math.max(0, unionLeft),
  height: unionBottom - Math.max(0, unionTop),
};
const cardClip = {
  x: Math.max(0, cardBox.x),
  y: Math.max(0, cardBox.y),
  width: cardBox.width,
  height: Math.min(cardBox.height, VIEWPORT.height - Math.max(0, cardBox.y)),
};
const clip = cardClip;
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
const result = { aSize: `${a.width}x${a.height}`, bSize: `${b.width}x${b.height}`, clip, unionClip, cardClip };
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
  proof.ctorName !== 'LitBanner' ||
  proof.litTagDefined ||
  proof.animationDuration !== '0s' ||
  proof.hostCount < 5 ||
  proof.hosts.some((h) => {
    return (
      h.tag !== 'p-banner' ||
      !h.hasShadow ||
      h.hasStyle ||
      h.adoptedSheets < 1 ||
      !h.hasNotificationClass ||
      !h.hasPopover ||
      !h.hasIconMask ||
      h.hydrated ||
      h.hasFragment
    );
  }) ||
  !proof.hosts.some((h) => (h.open === 'true' || h.open === '') && h.popoverOpen) ||
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
