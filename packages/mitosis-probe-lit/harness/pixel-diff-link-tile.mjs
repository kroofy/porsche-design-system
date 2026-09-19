import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=link-tile';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_tile_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_link_tile_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/link_tile_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_link_tile_control.png`;
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
    ...document.querySelectorAll('[data-card="link-tile"] p-link-tile, [data-card="link-tile"] lit-link-tile'),
  ];
  return (
    hosts.length >= 3 &&
    hosts.every((el) => {
      if (el.tagName === 'P-LINK-TILE' && !el.classList.contains('hydrated')) return false;
      if (!el.shadowRoot?.querySelector('.root')) return false;
      if (!el.shadowRoot?.querySelector('a')) return false;
      const imgs = [...el.querySelectorAll(':scope > img')];
      if (!imgs.length || imgs.some((img) => !img.complete || img.naturalWidth === 0)) return false;
      const nested = [...el.querySelectorAll(':scope > p-tag, :scope > p-text')];
      if (nested.some((child) => !child.classList.contains('hydrated'))) return false;
      const links = [...(el.shadowRoot?.querySelectorAll('p-link') ?? [])];
      if (!links.length) return false;
      return links.every((link) => {
        if (link.tagName !== 'P-LINK') return false;
        return link.classList.contains('hydrated');
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
    customElements.get('p-link-tile') &&
    customElements.get('p-link') &&
    customElements.get('p-tag') &&
    customElements.get('p-text'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="link-tile"] p-link-tile.hydrated', {
  timeout: 20_000,
  state: 'attached',
});
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="link-tile"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-link-tile.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-link-tile'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="link-tile"] p-link-tile')];
  for (const el of hosts) {
    const lit = document.createElement('lit-link-tile');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const hyphen = { 'aspect-ratio': 'aspectRatio' };
    for (const [attr, prop] of Object.entries(hyphen)) {
      const value = el.getAttribute(attr);
      if (value !== null) {
        lit.setAttribute(prop.toLowerCase(), value);
        lit[prop] = value;
      }
    }
    lit.label = el.label ?? el.getAttribute('label') ?? '';
    lit.description = el.description ?? el.getAttribute('description') ?? '';
    lit.size = el.size ?? el.getAttribute('size');
    lit.weight = el.weight ?? el.getAttribute('weight');
    lit.align = el.align ?? el.getAttribute('align');
    lit.gradient = el.gradient ?? el.getAttribute('gradient');
    lit.compact = el.compact ?? el.getAttribute('compact');
    lit.href = el.href ?? el.getAttribute('href');
    lit.target = el.target ?? el.getAttribute('target');
    lit.download = el.download ?? el.getAttribute('download');
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
    [...document.querySelectorAll('[data-card="link-tile"] lit-link-tile')].map((el) => el.updateComplete),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="link-tile"] lit-link-tile')].filter((el) =>
      el.shadowRoot?.querySelector('.root'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="link-tile"] lit-link-tile')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="link-tile"] lit-link-tile')
      ?.shadowRoot?.querySelector('lit-link,lit-tag,lit-text,lit-icon,lit-button'),
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="link-tile"] lit-link-tile')].every((el) =>
      el.querySelector(':scope > img'),
    ) &&
    [...document.querySelectorAll('[data-card="link-tile"] lit-link-tile')].filter((el) =>
      el.querySelector(':scope > p-tag[slot="header"]'),
    ).length >= 2 &&
    [...document.querySelectorAll('[data-card="link-tile"] lit-link-tile')].filter((el) =>
      el.querySelector(':scope > p-text[slot="footer"]'),
    ).length >= 2,
);
swap.hrefOmitted = await page.evaluate(
  () =>
    ![...document.querySelectorAll('[data-card="link-tile"] lit-link-tile a')].some(
      (a) => a.getAttribute('href') === 'undefined',
    ),
);
swap.nested = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="link-tile"] lit-link-tile')];
  const links = hosts.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-link') ?? [])]);
  const tags = [...document.querySelectorAll('[data-card="link-tile"] lit-link-tile > p-tag')];
  const texts = [...document.querySelectorAll('[data-card="link-tile"] lit-link-tile > p-text')];
  return {
    hostCount: hosts.length,
    linkTags: [...new Set(links.map((n) => n.tagName))],
    linkCount: links.length,
    tagTags: [...new Set(tags.map((n) => n.tagName))],
    textTags: [...new Set(texts.map((n) => n.tagName))],
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
  swap.swapped < 3 ||
  (swap.nested && swap.nested.linkTags.some((tag) => tag !== 'P-LINK')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
