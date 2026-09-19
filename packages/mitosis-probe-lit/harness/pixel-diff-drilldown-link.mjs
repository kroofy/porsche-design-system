import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=drilldown';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_drilldown_link_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_drilldown_link_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/drilldown_link_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_drilldown_link_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_HOSTS = 57;

const pauseCardAnimation = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
    document.documentElement.style.setProperty('--p-duration-md', '0s');
    document.documentElement.style.setProperty('--p-duration-sm', '0s');
  });
};

const hostReady = () => {
  const parents = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown')];
  const items = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-item')];
  const stencilLinks = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-link')];
  const litLinks = [...document.querySelectorAll('[data-card="drilldown"] lit-drilldown-link')];
  const links = [...stencilLinks, ...litLinks];
  const buttons = [...document.querySelectorAll('[data-card="drilldown"] > nav > p-button')];
  return (
    parents.length === 2 &&
    items.length === 17 &&
    links.length === 57 &&
    buttons.length >= 2 &&
    buttons.every((el) => el.classList.contains('hydrated')) &&
    parents.every((el) => {
      if (!el.classList.contains('hydrated')) return false;
      const dialog = el.shadowRoot?.querySelector('dialog');
      return dialog && !dialog.open;
    }) &&
    items.every((el) => el.classList.contains('hydrated')) &&
    stencilLinks.every((el) => el.classList.contains('hydrated')) &&
    litLinks.every((el) => {
      const sr = el.shadowRoot;
      if (!sr) return false;
      if (sr.querySelector('my-fragment') || sr.querySelector('.root')) return false;
      return !!sr.querySelector('slot:not([name])');
    })
  );
};

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
const isBenign = (text) =>
  text.includes('ERR_CONNECTION_REFUSED') ||
  text.includes('should be of kind') ||
  text.includes('parent HTMLElement of') ||
  text.includes("can't be used like this") ||
  text.includes('throwIfParentIsNotOfKind') ||
  text.includes('supplied to p-drilldown');
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
    customElements.get('p-drilldown') &&
    customElements.get('p-drilldown-item') &&
    customElements.get('p-drilldown-link') &&
    customElements.get('p-button'),
  { timeout: 20_000 },
);
await page.waitForSelector('[data-card="drilldown"] p-drilldown-link.hydrated', { timeout: 20_000, state: 'attached' });
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="drilldown"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-drilldown-link.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-drilldown-link'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-link')];
  for (const el of hosts) {
    const lit = document.createElement('lit-drilldown-link');
    for (const { name, value } of [...el.attributes]) lit.setAttribute(name, value);
    while (el.firstChild) lit.appendChild(el.firstChild);
    el.replaceWith(lit);
  }
  return { swapped: hosts.length };
});
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });
await page.evaluate(async () => {
  await Promise.all(
    [...document.querySelectorAll('[data-card="drilldown"] lit-drilldown-link')].map((el) => el.updateComplete),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="drilldown"] lit-drilldown-link')].filter((el) =>
      el.shadowRoot?.querySelector('slot:not([name])'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="drilldown"] lit-drilldown-link')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="drilldown"] lit-drilldown-link')
      ?.shadowRoot?.querySelector('lit-button,lit-button-pure,lit-drilldown,lit-drilldown-item'),
);
swap.slotsCopied = await page.evaluate(() =>
  [...document.querySelectorAll('[data-card="drilldown"] lit-drilldown-link')].every((el) => {
    const def = el.shadowRoot?.querySelector('slot:not([name])');
    return def?.assignedNodes().some((n) => n.nodeType === 1 || n.textContent?.trim());
  }),
);
swap.nested = await page.evaluate(() => {
  const links = [...document.querySelectorAll('[data-card="drilldown"] lit-drilldown-link')];
  const leftover = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-link')];
  const parents = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown')];
  const items = [...document.querySelectorAll('[data-card="drilldown"] p-drilldown-item')];
  const buttons = [...document.querySelectorAll('[data-card="drilldown"] > nav > p-button')];
  const slotted = links.filter((el) => !el.hasAttribute('href'));
  const overlay = links.filter((el) => el.hasAttribute('href'));
  return {
    linkCount: links.length,
    leftoverStencil: leftover.length,
    parentTags: [...new Set(parents.map((n) => n.tagName))],
    itemTags: [...new Set(items.map((n) => n.tagName))],
    buttonTags: [...new Set(buttons.map((n) => n.tagName))],
    slottedCount: slotted.length,
    slottedNoOverlay: slotted.every((el) => !el.shadowRoot?.querySelector('a')),
    overlayCount: overlay.length,
    overlayHasA: overlay.every((el) => el.shadowRoot?.querySelector('a')),
    anyDialogOpen: parents.some((el) => el.shadowRoot?.querySelector('dialog')?.open),
    hrefUndefined: links.some((el) => el.shadowRoot?.querySelector('[href="undefined"]')),
    extraRoot: links.some((el) => el.shadowRoot?.querySelector('.root')),
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
  !swap.slotsCopied ||
  swap.swapped !== EXPECTED_HOSTS ||
  (swap.nested && swap.nested.anyDialogOpen) ||
  (swap.nested && swap.nested.leftoverStencil !== 0) ||
  (swap.nested && swap.nested.hrefUndefined) ||
  (swap.nested && swap.nested.extraRoot) ||
  (swap.nested && !swap.nested.slottedNoOverlay) ||
  (swap.nested && !swap.nested.overlayHasA) ||
  (swap.nested && swap.nested.parentTags.some((tag) => tag !== 'P-DRILLDOWN')) ||
  (swap.nested && swap.nested.itemTags.some((tag) => tag !== 'P-DRILLDOWN-ITEM')) ||
  (swap.nested && swap.nested.buttonTags.some((tag) => tag !== 'P-BUTTON')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
