import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=select';
const BASELINE_PNG =
  process.env.BASELINE_PNG ??
  '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_select_option_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_select_option_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/select_option_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_select_option_control.png`;
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
    ...document.querySelectorAll('[data-card="select"] p-select-option, [data-card="select"] lit-select-option'),
  ];
  const parents = [...document.querySelectorAll('[data-card="select"] p-select')];
  return (
    items.length >= 20 &&
    parents.length >= 4 &&
    parents.every((el) => {
      if (!el.classList.contains('hydrated')) return false;
      const button = el.shadowRoot?.querySelector('button[role="combobox"], button');
      if (!button) return false;
      if (button.getAttribute('aria-expanded') === 'true') return false;
      const icons = [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])].filter(
        (icon) => getComputedStyle(icon).display !== 'none',
      );
      return icons.every((icon) => {
        if (icon.tagName !== 'P-ICON') return false;
        const img = icon.shadowRoot?.querySelector('img');
        return icon.classList.contains('hydrated') && img?.complete;
      });
    }) &&
    items.every((el) => {
      const parentTag = el.parentElement?.tagName;
      if (parentTag !== 'P-SELECT' && parentTag !== 'P-OPTGROUP') return false;
      if (el.tagName === 'P-SELECT-OPTION' && !el.classList.contains('hydrated')) return false;
      if (!el.shadowRoot?.querySelector('.option, [role="option"]')) return false;
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
  text.includes('has to be a p-select-option') ||
  text.includes('parent HTMLElement of') ||
  text.includes("Cannot read properties of null (reading 'children')");
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
    customElements.get('p-select') &&
    customElements.get('p-select-option') &&
    customElements.get('p-optgroup') &&
    customElements.get('p-icon'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="select"] p-select-option.hydrated', { timeout: 20_000, state: 'attached' });
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="select"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-select-option.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-select-option'));
const swap = await page.evaluate(() => {
  const parents = [...document.querySelectorAll('[data-card="select"] p-select')];
  for (const parent of parents) {
    parent.updateOptions = function updateOptions() {
      this.selectOptions = [];
      this.selectOptgroups = [];
      const host = this.host ?? this;
      for (const child of [...host.children].filter(
        (el) =>
          el.tagName !== 'SELECT' &&
          el.slot !== 'label' &&
          el.slot !== 'label-after' &&
          el.slot !== 'description' &&
          el.slot !== 'message' &&
          el.slot !== 'filter',
      )) {
        const tag = child.tagName;
        if (tag === 'P-SELECT-OPTION' || tag === 'LIT-SELECT-OPTION') {
          this.selectOptions.push(child);
        } else if (tag === 'P-OPTGROUP') {
          this.selectOptgroups.push(child);
          for (const optGroupChild of [...child.children]) {
            this.selectOptions.push(optGroupChild);
          }
        }
      }
    };
  }
  const hosts = [...document.querySelectorAll('[data-card="select"] p-select-option')];
  for (const el of hosts) {
    const lit = document.createElement('lit-select-option');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    lit.selected = el.selected;
    lit.highlighted = el.highlighted;
    lit.disabledParent = el.disabledParent;
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="select"] lit-select-option')].filter((el) =>
      el.shadowRoot?.querySelector('.option'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="select"] lit-select-option')?.shadowRoot?.querySelector('my-fragment'),
);
swap.parentStillStencil = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="select"] lit-select-option')].every((el) => {
      const parent = el.closest('p-select');
      return parent && parent.tagName === 'P-SELECT';
    }) && document.querySelectorAll('[data-card="select"] lit-select').length === 0,
);
swap.slottedCopied = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="select"] lit-select-option')].every((el) =>
      /Option [A-E]/.test(el.textContent ?? ''),
    ),
);
swap.closed = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="select"] p-select')].every((el) => {
      const button = el.shadowRoot?.querySelector('button');
      return button?.getAttribute('aria-expanded') === 'false';
    }),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document.querySelector('[data-card="select"] lit-select-option')?.shadowRoot?.querySelector('lit-icon') ||
    !!document.querySelector('[data-card="select"] lit-select, [data-card="select"] lit-optgroup'),
);
swap.nested = await page.evaluate(() => {
  const options = [...document.querySelectorAll('[data-card="select"] lit-select-option')];
  const icons = options.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-icon') ?? [])]);
  const parentTags = [...new Set(options.map((el) => el.parentElement?.tagName))];
  return {
    count: options.length,
    parentTags,
    icons: [...new Set(icons.map((n) => n.tagName))],
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
  !swap.closed ||
  swap.swapped < 20 ||
  swap.nested?.count < 20 ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
