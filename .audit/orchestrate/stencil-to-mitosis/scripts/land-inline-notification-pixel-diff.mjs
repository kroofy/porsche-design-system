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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=inline-notification';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_inline_notification_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_inline_notification_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_inline_notification_pixel_diff.png';
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_BASELINE_BYTES = 127470;
const EXPECTED_BASELINE_SHA = 'ed8957f7ec99bf72e8de3cf9665d222c371bd10def614ad2c5988757f4a778b3';

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

const iifeAsset = await page.request.get('http://localhost:3333/assets/p-inline-notification.iife.js');
if (iifeAsset.status() !== 200) {
  throw new Error(`IIFE HTTP ${iifeAsset.status()}`);
}

await page.goto(PLAYGROUND_URL, { waitUntil: 'load', timeout: 30_000 });
await page.waitForFunction(() => customElements.get('p-inline-notification'), { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="inline-notification"] > p-inline-notification')];
  const Ctor = customElements.get('p-inline-notification');
  return (
    hosts.length >= 11 &&
    Ctor?.name === 'LitInlineNotification' &&
    hosts.every((el) => {
      const root = el.shadowRoot;
      const style = root?.querySelector('style');
      const box = root?.querySelector('.notification');
      const headingSlot = el.querySelector('[slot="heading"]');
      const nestedHeading = headingSlot && customElements.get(headingSlot.localName);
      return (
        !!root &&
        !!style &&
        (style.textContent?.includes('.notification') ?? false) &&
        !!box &&
        !el.classList.contains('hydrated') &&
        !root.querySelector('my-fragment') &&
        !root.querySelector('lit-inline-notification') &&
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
  const Ctor = customElements.get('p-inline-notification');
  const hosts = [...document.querySelectorAll('[data-card="inline-notification"] > p-inline-notification')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    definedTag: 'p-inline-notification',
    litTagDefined: !!customElements.get('lit-inline-notification'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const style = el.shadowRoot?.querySelector('style');
      const box = el.shadowRoot?.querySelector('.notification');
      const action = el.shadowRoot?.querySelector('p-button-pure.action');
      const dismiss = el.shadowRoot?.querySelector('button.dismiss');
      const headingSlot = el.shadowRoot?.querySelector('slot[name="heading"]');
      const defaultSlot = el.shadowRoot?.querySelector('slot:not([name])');
      return {
        tag: el.localName,
        state: el.getAttribute('state'),
        heading: el.getAttribute('heading'),
        headingTag: el.shadowRoot?.querySelector('h1,h2,h3,h4,h5,h6')?.localName ?? null,
        hasHeadingSlot: !!headingSlot,
        hasDefaultSlot: !!defaultSlot,
        hasAction: !!action,
        actionIcon: action?.getAttribute('icon') ?? null,
        hasDismiss: !!dismiss,
        hasShadow: !!el.shadowRoot,
        hasStyle: !!style,
        hasNotificationClass: !!box,
        hasIconMask: !!style?.textContent?.includes('.notification::before'),
        hydrated: el.classList.contains('hydrated'),
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
      };
    }),
  };
});

const box = await page.locator('[data-card="inline-notification"]').boundingBox();
if (!box) {
  console.error('land-inline-notification-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitInlineNotification' ||
  proof.litTagDefined ||
  proof.animationDuration !== '0s' ||
  proof.hostCount < 11 ||
  proof.hosts.some((h) => {
    return (
      h.tag !== 'p-inline-notification' ||
      !h.hasShadow ||
      !h.hasStyle ||
      !h.hasNotificationClass ||
      !h.hasIconMask ||
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
