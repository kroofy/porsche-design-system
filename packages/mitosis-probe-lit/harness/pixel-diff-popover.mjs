import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=popover';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_popover_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_popover_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/popover_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_popover_control.png`;
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
  const hosts = [...document.querySelectorAll('[data-card="popover"] p-popover, [data-card="popover"] lit-popover')];
  return (
    hosts.length >= 10 &&
    hosts.every((el) => {
      if (el.tagName === 'P-POPOVER' && !el.classList.contains('hydrated')) return false;
      const pop = el.shadowRoot?.querySelector('[popover]');
      if (!pop) return false;
      const isOpen = el.getAttribute('open') === 'true' || el.getAttribute('open') === '' || el.open === true;
      if (isOpen) {
        if (!pop.matches(':popover-open')) return false;
        if (!pop.style.left || !pop.style.top) return false;
      }
      const light = [...el.querySelectorAll(':scope > p-button-pure, :scope > p-button, :scope > p-text')];
      return light.every((child) => child.classList.contains('hydrated'));
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
    customElements.get('p-popover') &&
    customElements.get('p-button-pure') &&
    customElements.get('p-button') &&
    customElements.get('p-text'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="popover"] p-popover.hydrated', {
  timeout: 20_000,
  state: 'attached',
});
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const stencilOpenPos = await page.evaluate(() =>
  [...document.querySelectorAll('[data-card="popover"] p-popover')]
    .filter((el) => el.getAttribute('open') === 'true' || el.open === true)
    .map((el) => {
      const pop = el.shadowRoot?.querySelector('[popover]');
      return { left: pop?.style.left, top: pop?.style.top };
    }),
);

const clipOf = async () => {
  const box = await page.locator('[data-card="popover"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-popover.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-popover'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="popover"] p-popover')];
  for (const el of hosts) {
    const lit = document.createElement('lit-popover');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    if (el.open === true || el.open === false) lit.open = el.open;
    lit.direction = el.direction ?? el.getAttribute('direction');
    lit.description = el.description ?? el.getAttribute('description');
    lit.compact = el.compact;
    lit.aria = el.aria;
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
await page.waitForFunction(
  (expected) => {
    const actual = [...document.querySelectorAll('[data-card="popover"] lit-popover')]
      .filter((el) => el.getAttribute('open') === 'true' || el.open === true)
      .map((el) => {
        const pop = el.shadowRoot?.querySelector('[popover]');
        return { left: pop?.style.left, top: pop?.style.top };
      });
    return (
      actual.length === expected.length &&
      actual.every((row, i) => row.left === expected[i].left && row.top === expected[i].top)
    );
  },
  stencilOpenPos,
  { timeout: 15_000 },
);
await page.evaluate(async () => {
  await Promise.all(
    [...document.querySelectorAll('[data-card="popover"] lit-popover')].map((el) => el.updateComplete),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="popover"] lit-popover')].filter((el) =>
      el.shadowRoot?.querySelector('[popover]'),
    ).length,
);
swap.fragment = await page.evaluate(
  () =>
    !!document.querySelector('[data-card="popover"] lit-popover')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="popover"] lit-popover')
      ?.shadowRoot?.querySelector('lit-button-pure,lit-button,lit-text,lit-icon'),
);
swap.slottedCopied = await page.evaluate(
  () =>
    !!document.querySelector('[data-card="popover"] lit-popover > p-button-pure[slot="button"]') &&
    !!document.querySelector('[data-card="popover"] lit-popover > p-button[slot="button"]') &&
    !!document.querySelector('[data-card="popover"] lit-popover > p-text'),
);
swap.stencilOpenPos = stencilOpenPos;
swap.litOpenPos = await page.evaluate(() =>
  [...document.querySelectorAll('[data-card="popover"] lit-popover')]
    .filter((el) => el.getAttribute('open') === 'true' || el.open === true)
    .map((el) => {
      const pop = el.shadowRoot?.querySelector('[popover]');
      return { left: pop?.style.left, top: pop?.style.top };
    }),
);
swap.openAttached = await page.evaluate(() => {
  const opens = [...document.querySelectorAll('[data-card="popover"] lit-popover[open]')];
  return (
    opens.length >= 2 &&
    opens.every((el) => {
      const pop = el.shadowRoot?.querySelector('[popover]');
      return pop?.matches(':popover-open') && !!pop.style.left && !!pop.style.top;
    })
  );
});
swap.nested = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="popover"] lit-popover')];
  const buttons = [...document.querySelectorAll('[data-card="popover"] lit-popover > p-button')];
  const pures = [...document.querySelectorAll('[data-card="popover"] lit-popover > p-button-pure')];
  const texts = [...document.querySelectorAll('[data-card="popover"] lit-popover > p-text')];
  const nested = [...document.querySelectorAll('[data-card="popover"] lit-popover lit-popover')];
  return {
    hostCount: hosts.length,
    buttonTags: [...new Set(buttons.map((n) => n.tagName))],
    pureTags: [...new Set(pures.map((n) => n.tagName))],
    textTags: [...new Set(texts.map((n) => n.tagName))],
    nestedLit: nested.length,
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
  !swap.openAttached ||
  swap.swapped < 10 ||
  (swap.nested && swap.nested.buttonTags.some((tag) => tag !== 'P-BUTTON')) ||
  (swap.nested && swap.nested.pureTags.some((tag) => tag !== 'P-BUTTON-PURE')) ||
  (swap.nested && swap.nested.textTags.some((tag) => tag !== 'P-TEXT')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
