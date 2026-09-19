import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=link-tile-product';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_tile_product_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_link_tile_product_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/link_tile_product_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_link_tile_product_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const pauseCardAnimation = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
    document.documentElement.style.setProperty('--p-duration-md', '0s');
    document.documentElement.style.setProperty('--p-duration-sm', '0s');
  });
};

const hostReady = () => {
  const hosts = [
    ...document.querySelectorAll(
      '[data-card="link-tile-product"] p-link-tile-product, [data-card="link-tile-product"] lit-link-tile-product',
    ),
  ];
  return (
    hosts.length >= 2 &&
    hosts.every((el) => {
      if (el.tagName === 'P-LINK-TILE-PRODUCT' && !el.classList.contains('hydrated')) return false;
      if (!el.shadowRoot?.querySelector('.root')) return false;
      const imgs = [...el.querySelectorAll(':scope > img')];
      if (!imgs.length || imgs.some((img) => !img.complete || img.naturalWidth === 0)) return false;
      const tags = [...el.querySelectorAll(':scope > p-tag')];
      if (tags.some((child) => !child.classList.contains('hydrated'))) return false;
      const likes = [...(el.shadowRoot?.querySelectorAll('p-button-pure') ?? [])];
      return likes.every((btn) => {
        if (btn.tagName !== 'P-BUTTON-PURE') return false;
        if (!btn.classList.contains('hydrated')) return false;
        const icon = btn.shadowRoot?.querySelector('p-icon');
        if (!icon) return true;
        const img = icon.shadowRoot?.querySelector('img');
        return icon.classList.contains('hydrated') && img?.complete;
      });
    })
  );
};

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() !== 'error') return;
  const text = msg.text();
  const loc = msg.location()?.url ?? '';
  if (text.includes('ERR_CONNECTION_REFUSED') && (text.includes('3002') || loc.includes('3002'))) return;
  consoleErrors.push(loc ? `${text} @ ${loc}` : text);
});
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-link-tile-product') &&
    customElements.get('p-button-pure') &&
    customElements.get('p-tag') &&
    customElements.get('p-icon'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="link-tile-product"] p-link-tile-product.hydrated', {
  timeout: 20_000,
  state: 'attached',
});
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="link-tile-product"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-link-tile-product.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-link-tile-product'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="link-tile-product"] p-link-tile-product')];
  for (const el of hosts) {
    const lit = document.createElement('lit-link-tile-product');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const hyphen = {
      'aspect-ratio': 'aspectRatio',
      'price-original': 'priceOriginal',
      'like-button': 'likeButton',
    };
    for (const [attr, prop] of Object.entries(hyphen)) {
      const value = el.getAttribute(attr);
      if (value !== null) {
        lit.setAttribute(prop.toLowerCase(), value);
        lit[prop] = value;
      }
    }
    lit.heading = el.heading ?? el.getAttribute('heading') ?? '';
    lit.price = el.price ?? el.getAttribute('price') ?? '';
    lit.priceOriginal = el.priceOriginal ?? el.getAttribute('price-original');
    lit.description = el.description ?? el.getAttribute('description');
    lit.likeButton = el.likeButton ?? el.getAttribute('like-button');
    lit.liked = el.liked;
    lit.href = el.href ?? el.getAttribute('href');
    lit.target = el.target ?? el.getAttribute('target');
    lit.rel = el.rel ?? el.getAttribute('rel');
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
await page.evaluate(async () => {
  await Promise.all(
    [...document.querySelectorAll('[data-card="link-tile-product"] lit-link-tile-product')].map(
      (el) => el.updateComplete,
    ),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="link-tile-product"] lit-link-tile-product')].filter((el) =>
      el.shadowRoot?.querySelector('.root'),
    ).length,
);
swap.fragment = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="link-tile-product"] lit-link-tile-product')
      ?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="link-tile-product"] lit-link-tile-product')
      ?.shadowRoot?.querySelector('lit-link,lit-button-pure,lit-tag,lit-icon,lit-button'),
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="link-tile-product"] lit-link-tile-product')].every((el) =>
      el.querySelector(':scope > img'),
    ) &&
    !!document.querySelector('[data-card="link-tile-product"] lit-link-tile-product > a[slot="anchor"]') &&
    !!document.querySelector('[data-card="link-tile-product"] lit-link-tile-product > p-tag[slot="header"]'),
);
swap.hrefOmitted = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="link-tile-product"] lit-link-tile-product')];
  return hosts.every((el) => {
    const overlay = el.shadowRoot?.querySelector('a.anchor');
    if (el.getAttribute('href')) return overlay?.getAttribute('href') !== 'undefined';
    return !overlay && !el.shadowRoot?.querySelector('a.anchor[href="undefined"]');
  });
});
swap.nested = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="link-tile-product"] lit-link-tile-product')];
  const likes = hosts.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-button-pure') ?? [])]);
  const tags = [...document.querySelectorAll('[data-card="link-tile-product"] lit-link-tile-product > p-tag')];
  const anchors = [...document.querySelectorAll('[data-card="link-tile-product"] lit-link-tile-product > a[slot="anchor"]')];
  return {
    hostCount: hosts.length,
    likeTags: [...new Set(likes.map((n) => n.tagName))],
    likeCount: likes.length,
    tagTags: [...new Set(tags.map((n) => n.tagName))],
    slottedAnchorCount: anchors.length,
  };
});

await mkdir(dirname(AFTER_PNG), { recursive: true });
await writeFile(AFTER_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));
await browser.close();

const diffPair = (aBuf, bBuf, outPath) => {
  const a = PNG.sync.read(aBuf);
  const b = PNG.sync.read(bBuf);
  const result = { aSize: `${a.width}x${a.height}`, bSize: `${b.width}x${b.height}` };
  if (a.width !== b.width || a.height !== b.height) {
    result.error = 'dimension mismatch, no per-pixel diff possible';
    return result;
  }
  const diff = new PNG({ width: a.width, height: a.height });
  result.strictMismatch = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
    threshold: 0,
    includeAA: true,
  });
  result.perceptualMismatch = pixelmatch(a.data, b.data, null, a.width, a.height, { threshold: 0.1 });
  result.totalPixels = a.width * a.height;
  if (outPath) {
    result.diffPng = outPath;
    return { ...result, _diffBuf: PNG.sync.write(diff) };
  }
  return result;
};

const baselineBuf = await readFile(BASELINE_PNG);
const control = diffPair(baselineBuf, await readFile(CONTROL_PNG), null);
const litResult = diffPair(baselineBuf, await readFile(AFTER_PNG), DIFF_PNG);
if (litResult._diffBuf) {
  await writeFile(DIFF_PNG, litResult._diffBuf);
  delete litResult._diffBuf;
}

const summary = {
  baseline: BASELINE_PNG,
  after: AFTER_PNG,
  swap,
  controlStencilVsBaseline: control,
  litVsBaseline: litResult,
  consoleErrors,
};
console.warn(JSON.stringify(summary, null, 2));
const failed =
  litResult.error ||
  litResult.strictMismatch !== 0 ||
  control.strictMismatch !== 0 ||
  swap.litRendered !== swap.swapped ||
  swap.fragment ||
  swap.innerLit ||
  !swap.slottedCopied ||
  swap.hrefOmitted === false ||
  swap.swapped < 2 ||
  (swap.nested && swap.nested.likeTags.some((tag) => tag !== 'P-BUTTON-PURE')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
