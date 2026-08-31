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
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=input-date';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  resolve(REPO_ROOT, '.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_date_before.png');
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_land_input_date_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/land_input_date_pixel_diff.png';
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

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-input-date') &&
    customElements.get('p-icon') &&
    customElements.get('p-spinner') &&
    customElements.get('p-button-pure'),
  { timeout: 20_000 }
);
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const hosts = [...document.querySelectorAll('[data-card="input-date"] p-input-date')];
  return (
    hosts.length >= 6 &&
    hosts.every((el) => {
      const root = el.shadowRoot?.querySelector('.root');
      const input = el.shadowRoot?.querySelector('input[type="date"]');
      const spinner = el.shadowRoot?.querySelector('p-spinner');
      const button = el.shadowRoot?.querySelector('p-button-pure.button');
      const messageIcon = el.shadowRoot?.querySelector('.message p-icon');
      const svg = spinner?.shadowRoot?.querySelector('svg');
      const buttonImg = button?.shadowRoot?.querySelector('p-icon')?.shadowRoot?.querySelector('img');
      const messageImg = messageIcon?.shadowRoot?.querySelector('img');
      const spinnerHidden = !!spinner && getComputedStyle(spinner).display === 'none';
      const buttonHidden = !!button && getComputedStyle(button).display === 'none';
      const messageIconHidden = !!messageIcon && getComputedStyle(messageIcon).display === 'none';
      const loading = el.getAttribute('loading') === 'true' || el.hasAttribute('loading');
      const state = el.getAttribute('state');
      const message = el.getAttribute('message');
      const hasMsg = !!message && (state === 'success' || state === 'error');
      const spinnerOk = loading ? !spinnerHidden && !!svg : spinnerHidden;
      const buttonOk = !buttonHidden && !!buttonImg?.complete && (buttonImg?.naturalWidth ?? 0) > 0;
      const messageOk = hasMsg
        ? !messageIconHidden && !!messageImg?.complete && (messageImg?.naturalWidth ?? 0) > 0
        : messageIconHidden;
      return (
        !!el.shadowRoot?.querySelector('style') &&
        root?.localName === 'div' &&
        input?.type === 'date' &&
        (input?.value?.length ?? 0) > 0 &&
        spinner?.localName === 'p-spinner' &&
        button?.localName === 'p-button-pure' &&
        messageIcon?.localName === 'p-icon' &&
        !el.shadowRoot.querySelector('lit-input-date') &&
        !el.shadowRoot.querySelector('lit-icon') &&
        !el.shadowRoot.querySelector('lit-spinner') &&
        !el.shadowRoot.querySelector('lit-button-pure') &&
        !el.shadowRoot.querySelector('my-fragment') &&
        spinnerOk &&
        buttonOk &&
        messageOk
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
  const Ctor = customElements.get('p-input-date');
  const hosts = [...document.querySelectorAll('[data-card="input-date"] p-input-date')];
  return {
    title: document.title,
    href: location.href,
    ctorName: Ctor?.name ?? null,
    isLit: !!Ctor && 'elementProperties' in Ctor,
    iconCtorName: customElements.get('p-icon')?.name ?? null,
    spinnerCtorName: customElements.get('p-spinner')?.name ?? null,
    buttonCtorName: customElements.get('p-button-pure')?.name ?? null,
    definedTag: 'p-input-date',
    litTagDefined: !!customElements.get('lit-input-date'),
    litIconDefined: !!customElements.get('lit-icon'),
    litSpinnerDefined: !!customElements.get('lit-spinner'),
    litButtonDefined: !!customElements.get('lit-button-pure'),
    animationDuration: getComputedStyle(document.documentElement).getPropertyValue('--p-animation-duration').trim(),
    hostCount: hosts.length,
    hosts: hosts.map((el) => {
      const root = el.shadowRoot?.querySelector('.root');
      const input = el.shadowRoot?.querySelector('input[type="date"]');
      const spinner = el.shadowRoot?.querySelector('p-spinner');
      const button = el.shadowRoot?.querySelector('p-button-pure.button');
      const messageIcon = el.shadowRoot?.querySelector('.message p-icon');
      const svg = spinner?.shadowRoot?.querySelector('svg');
      const buttonImg = button?.shadowRoot?.querySelector('p-icon')?.shadowRoot?.querySelector('img');
      const messageImg = messageIcon?.shadowRoot?.querySelector('img');
      const spinnerHidden = !!spinner && getComputedStyle(spinner).display === 'none';
      const buttonHidden = !!button && getComputedStyle(button).display === 'none';
      const messageIconHidden = !!messageIcon && getComputedStyle(messageIcon).display === 'none';
      return {
        tag: el.localName,
        label: el.getAttribute('label'),
        loading: el.getAttribute('loading'),
        disabled: el.getAttribute('disabled'),
        readOnly: el.getAttribute('read-only'),
        state: el.getAttribute('state'),
        message: el.getAttribute('message'),
        inputType: input?.type ?? null,
        inputValue: input?.value ?? '',
        inputReadOnly: !!input?.readOnly,
        inputDisabled: !!input?.disabled,
        innerSpinner: spinner?.localName ?? null,
        buttonIcon: button?.getAttribute('icon'),
        buttonSource: button?.getAttribute('icon-source'),
        innerMessageIcon: messageIcon?.localName ?? null,
        messageIconName: messageIcon?.getAttribute('name'),
        spinnerHidden,
        buttonHidden,
        messageIconHidden,
        hasShadow: !!el.shadowRoot,
        hasStyle: !!el.shadowRoot?.querySelector('style'),
        hasRoot: !!root,
        hasFragment: !!el.shadowRoot?.querySelector('my-fragment'),
        hasSvg: !!svg,
        hidesNativePicker: !!el.shadowRoot
          ?.querySelector('style')
          ?.textContent?.includes('::-webkit-calendar-picker-indicator'),
        buttonImgComplete: !!buttonImg?.complete,
        buttonImgNaturalWidth: buttonImg?.naturalWidth ?? 0,
        messageImgComplete: !!messageImg?.complete,
        messageImgNaturalWidth: messageImg?.naturalWidth ?? 0,
      };
    }),
  };
});

const box = await page.locator('[data-card="input-date"]').boundingBox();
if (!box) {
  console.error('land-input-date-pixel-diff: card has no bounding box');
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
  proof.ctorName !== 'LitInputDate' ||
  proof.iconCtorName !== 'LitIcon' ||
  proof.spinnerCtorName !== 'LitSpinner' ||
  proof.buttonCtorName !== 'LitButtonPure' ||
  proof.litTagDefined ||
  proof.litIconDefined ||
  proof.litSpinnerDefined ||
  proof.litButtonDefined ||
  proof.animationDuration !== '0s' ||
  proof.hostCount < 6 ||
  proof.hosts.some((h) => {
    const loading = h.loading === 'true' || h.loading === '';
    const hasMsg = !!h.message && (h.state === 'success' || h.state === 'error');
    return (
      h.tag !== 'p-input-date' ||
      h.inputType !== 'date' ||
      !h.inputValue ||
      h.innerSpinner !== 'p-spinner' ||
      h.buttonIcon !== 'calendar' ||
      h.innerMessageIcon !== 'p-icon' ||
      !h.hasStyle ||
      !h.hasRoot ||
      h.hasFragment ||
      !h.hidesNativePicker ||
      (loading ? h.spinnerHidden || !h.hasSvg : !h.spinnerHidden) ||
      h.buttonHidden ||
      !h.buttonImgComplete ||
      h.buttonImgNaturalWidth === 0 ||
      (hasMsg
        ? h.messageIconHidden || !h.messageImgComplete || h.messageImgNaturalWidth === 0
        : !h.messageIconHidden)
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
