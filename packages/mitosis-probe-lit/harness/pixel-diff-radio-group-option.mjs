import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=radio-group';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_radio_group_option_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_radio_group_option_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/radio_group_option_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_radio_group_option_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;

const pauseCardAnimation = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
  });
};

const hostReady = () => {
  const items = [
    ...document.querySelectorAll(
      '[data-card="radio-group"] p-radio-group-option, [data-card="radio-group"] lit-radio-group-option',
    ),
  ];
  const parents = [...document.querySelectorAll('[data-card="radio-group"] p-radio-group')];
  return (
    items.length >= 25 &&
    parents.length >= 5 &&
    parents.every((el) => el.classList.contains('hydrated')) &&
    items.every((el) => {
      if (el.parentElement?.tagName !== 'P-RADIO-GROUP') return false;
      const input = el.shadowRoot?.querySelector('input[type="radio"]');
      if (!input) return false;
      if (el.tagName === 'P-RADIO-GROUP-OPTION' && !el.classList.contains('hydrated')) return false;
      const spinners = [...(el.shadowRoot?.querySelectorAll('p-spinner') ?? [])].filter(
        (spinner) => getComputedStyle(spinner).display !== 'none',
      );
      const spinnersReady = spinners.every((spinner) => {
        if (spinner.tagName !== 'P-SPINNER') return false;
        if (!spinner.classList.contains('hydrated')) return false;
        return !!spinner.shadowRoot?.querySelector('svg');
      });
      if (!spinnersReady) return false;
      const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
        (icon) => getComputedStyle(icon).display !== 'none',
      );
      return icons.every((icon) => {
        if (icon.tagName !== 'P-ICON') return false;
        const img = icon.shadowRoot?.querySelector('img');
        return icon.classList.contains('hydrated') && img?.complete;
      });
    })
  );
};

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
const isBenign = (text) =>
  text.includes('ERR_CONNECTION_REFUSED') ||
  text.includes('should be of kind') ||
  text.includes('has to be a p-radio-group-option') ||
  text.includes('parent HTMLElement of');
page.on('console', (msg) => {
  if (msg.type() !== 'error') return;
  const text = msg.text();
  const loc = msg.location()?.url ?? '';
  if (isBenign(text) || (text.includes('3002') && loc.includes('3002'))) return;
  consoleErrors.push(loc ? `${text} @ ${loc}` : text);
});
page.on('pageerror', (err) => {
  const text = String(err);
  if (isBenign(text)) return;
  consoleErrors.push(text);
});

await page.goto(PLAYGROUND_URL, { waitUntil: 'networkidle', timeout: 30_000 });
await page.waitForFunction(
  () =>
    customElements.get('p-radio-group') &&
    customElements.get('p-radio-group-option') &&
    customElements.get('p-icon') &&
    customElements.get('p-spinner'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="radio-group"] p-radio-group-option.hydrated', { timeout: 20_000 });
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="radio-group"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-radio-group-option.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-radio-group-option'));
const swap = await page.evaluate(() => {
  const parents = [...document.querySelectorAll('[data-card="radio-group"] p-radio-group')];
  for (const parent of parents) {
    parent.updateOptions = function updateOptions() {
      this.radioGroupOptions = [...this.children].filter(
        (el) => el.slot !== 'label' && el.slot !== 'label-after' && el.slot !== 'description' && el.slot !== 'message',
      );
    };
  }
  const hosts = [...document.querySelectorAll('[data-card="radio-group"] p-radio-group-option')];
  for (const el of hosts) {
    const lit = document.createElement('lit-radio-group-option');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    lit.selected = el.selected;
    lit.disabledParent = el.disabledParent;
    lit.loadingParent = el.loadingParent;
    lit.state = el.state;
    lit.name = el.name;
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="radio-group"] lit-radio-group-option')].filter((el) =>
      el.shadowRoot?.querySelector('input[type="radio"]'),
    ).length,
);
swap.fragment = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="radio-group"] lit-radio-group-option')
      ?.shadowRoot?.querySelector('my-fragment'),
);
swap.parentStillStencil = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="radio-group"] lit-radio-group-option')].every(
      (el) => el.parentElement?.tagName === 'P-RADIO-GROUP',
    ) && document.querySelectorAll('[data-card="radio-group"] lit-radio-group').length === 0,
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="radio-group"] lit-radio-group-option')].every((el) =>
      /Option [A-E]/.test(el.getAttribute('label') ?? ''),
    ),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="radio-group"] lit-radio-group-option')
      ?.shadowRoot?.querySelector('lit-icon,lit-spinner'),
);
swap.nested = await page.evaluate(() => {
  const options = [...document.querySelectorAll('[data-card="radio-group"] lit-radio-group-option')];
  const spinners = options.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-spinner') ?? [])]);
  const icons = options.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])]);
  return {
    spinners: [...new Set(spinners.map((n) => n.tagName))],
    icons: [...new Set(icons.map((n) => n.tagName))],
    spinnerCount: spinners.length,
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
  !swap.parentStillStencil ||
  !swap.slottedCopied ||
  swap.swapped < 25 ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
