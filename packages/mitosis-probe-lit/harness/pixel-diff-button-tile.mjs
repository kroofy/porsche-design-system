import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=button-tile';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_button_tile_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_button_tile_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/button_tile_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_button_tile_control.png`;
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
    ...document.querySelectorAll('[data-card="button-tile"] p-button-tile, [data-card="button-tile"] lit-button-tile'),
  ];
  return (
    hosts.length >= 5 &&
    hosts.every((el) => {
      if (el.tagName === 'P-BUTTON-TILE' && !el.classList.contains('hydrated')) return false;
      if (!el.shadowRoot?.querySelector('.root')) return false;
      const imgs = [...el.querySelectorAll(':scope > img')];
      if (!imgs.length || imgs.some((img) => !img.complete || img.naturalWidth === 0)) return false;
      const nested = [...el.querySelectorAll(':scope > p-tag, :scope > p-text')];
      if (nested.some((child) => !child.classList.contains('hydrated'))) return false;
      const buttons = [...(el.shadowRoot?.querySelectorAll('p-button') ?? [])];
      if (!buttons.length) return false;
      return buttons.every((button) => {
        if (button.tagName !== 'P-BUTTON') return false;
        if (!button.classList.contains('hydrated')) return false;
        const spinner = button.shadowRoot?.querySelector('p-spinner');
        if (spinner) {
          return spinner.classList.contains('hydrated') && !!spinner.shadowRoot?.querySelector('svg');
        }
        return true;
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
    customElements.get('p-button-tile') &&
    customElements.get('p-button') &&
    customElements.get('p-tag') &&
    customElements.get('p-text') &&
    customElements.get('p-spinner'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="button-tile"] p-button-tile.hydrated', {
  timeout: 20_000,
  state: 'attached',
});
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="button-tile"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-button-tile.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-button-tile'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="button-tile"] p-button-tile')];
  for (const el of hosts) {
    const lit = document.createElement('lit-button-tile');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    const hyphen = {
      'aspect-ratio': 'aspectRatio',
      'icon-source': 'iconSource',
    };
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
    lit.disabled = el.disabled;
    lit.loading = el.loading;
    lit.icon = el.icon ?? el.getAttribute('icon');
    lit.type = el.type ?? el.getAttribute('type');
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
await page.evaluate(async () => {
  await Promise.all(
    [...document.querySelectorAll('[data-card="button-tile"] lit-button-tile')].map((el) => el.updateComplete),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="button-tile"] lit-button-tile')].filter((el) =>
      el.shadowRoot?.querySelector('.root'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="button-tile"] lit-button-tile')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="button-tile"] lit-button-tile')
      ?.shadowRoot?.querySelector('lit-button,lit-tag,lit-text,lit-icon,lit-spinner'),
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="button-tile"] lit-button-tile')].every((el) =>
      el.querySelector(':scope > img'),
    ) &&
    [...document.querySelectorAll('[data-card="button-tile"] lit-button-tile')].filter((el) =>
      el.querySelector(':scope > p-tag[slot="header"]'),
    ).length >= 4 &&
    [...document.querySelectorAll('[data-card="button-tile"] lit-button-tile')].filter((el) =>
      el.querySelector(':scope > p-text[slot="footer"]'),
    ).length >= 4,
);
swap.nested = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="button-tile"] lit-button-tile')];
  const buttons = hosts.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-button') ?? [])]);
  const tags = [...document.querySelectorAll('[data-card="button-tile"] lit-button-tile > p-tag')];
  const texts = [...document.querySelectorAll('[data-card="button-tile"] lit-button-tile > p-text')];
  return {
    hostCount: hosts.length,
    buttonTags: [...new Set(buttons.map((n) => n.tagName))],
    buttonCount: buttons.length,
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
  swap.swapped < 5 ||
  (swap.nested && swap.nested.buttonTags.some((tag) => tag !== 'P-BUTTON')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
