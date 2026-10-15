import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:3333/?components=carousel';
const BASELINE_PNG =
  process.env.BASELINE_PNG ?? '/workspace/.audit/orchestrate/stencil-to-mitosis/baseline/stencil_carousel_before.png';
const AFTER_PNG = process.env.AFTER_PNG ?? '/opt/cursor/artifacts/mitosis_lit_carousel_after.png';
const DIFF_PNG = process.env.DIFF_PNG ?? '/opt/cursor/artifacts/carousel_pixel_diff.png';
const CONTROL_PNG = `${HARNESS_DIR}/stencil_carousel_control.png`;
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE_FACTOR = 2;
const EXPECTED_HOSTS = 5;

const pauseCardAnimation = async (page) => {
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
    document.documentElement.style.setProperty('--p-duration-md', '0s');
    document.documentElement.style.setProperty('--p-duration-sm', '0s');
  });
};

const hostReady = () => {
  const popover = document.querySelector('#popover-carousel');
  const stencil = [...document.querySelectorAll('[data-card="carousel"] p-carousel')];
  const lit = [...document.querySelectorAll('[data-card="carousel"] lit-carousel')];
  const hosts = [...stencil, ...lit];
  const button = document.querySelector('[data-card="carousel"] [popovertarget="popover-carousel"]');
  return (
    !!button &&
    popover &&
    !popover.matches(':popover-open') &&
    hosts.length === 5 &&
    stencil.every((el) => el.classList.contains('hydrated')) &&
    lit.every((el) => {
      const sr = el.shadowRoot;
      if (!sr) return false;
      if (sr.querySelector('my-fragment') || sr.querySelector('.root')) return false;
      return !!sr.querySelector('#splide');
    })
  );
};

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
const consoleErrors = [];
const isBenign = (text) =>
  text.includes('ERR_CONNECTION_REFUSED') ||
  text.includes('3002');
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
await page.waitForFunction(() => customElements.get('p-carousel') && customElements.get('p-button-pure'), {
  timeout: 20_000,
});
await page.waitForSelector('[data-card="carousel"] p-carousel.hydrated', { timeout: 20_000, state: 'attached' });
await page.evaluate(() => document.fonts.ready);
await pauseCardAnimation(page);
await page.waitForFunction(hostReady, { timeout: 30_000 });

const clipOf = async () => {
  const box = await page.locator('[data-card="carousel"]').boundingBox();
  return {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(box.height, VIEWPORT.height - Math.max(0, box.y)),
  };
};

await writeFile(CONTROL_PNG, await page.screenshot({ type: 'png', clip: await clipOf() }));

await page.addScriptTag({ path: `${HARNESS_DIR}/lit-carousel.bundle.js` });
await page.waitForFunction(() => customElements.get('lit-carousel'));
const swap = await page.evaluate(() => {
  const hosts = [...document.querySelectorAll('[data-card="carousel"] p-carousel')];
  for (const el of hosts) {
    const lit = document.createElement('lit-carousel');
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
    [...document.querySelectorAll('[data-card="carousel"] lit-carousel')].map((el) => el.updateComplete),
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});
swap.litRendered = await page.evaluate(
  () =>
    [...document.querySelectorAll('[data-card="carousel"] lit-carousel')].filter((el) =>
      el.shadowRoot?.querySelector('#splide'),
    ).length,
);
swap.fragment = await page.evaluate(
  () => !!document.querySelector('[data-card="carousel"] lit-carousel')?.shadowRoot?.querySelector('my-fragment'),
);
swap.innerLit = await page.evaluate(
  () =>
    !!document
      .querySelector('[data-card="carousel"] lit-carousel')
      ?.shadowRoot?.querySelector('lit-button-pure,lit-link-pure,lit-heading,lit-scroller,lit-tag'),
);
swap.slotsCopied = await page.evaluate(() =>
  [...document.querySelectorAll('[data-card="carousel"] lit-carousel')].every((el) =>
    [...el.children].some((n) => n.nodeType === 1),
  ),
);
swap.namedSlots = await page.evaluate(() => {
  const withHeading = [...document.querySelectorAll('[data-card="carousel"] lit-carousel')].filter((el) =>
    el.querySelector(':scope > [slot="heading"]'),
  );
  const withDescription = [...document.querySelectorAll('[data-card="carousel"] lit-carousel')].filter((el) =>
    el.querySelector(':scope > [slot="description"]'),
  );
  const withControls = [...document.querySelectorAll('[data-card="carousel"] lit-carousel')].filter((el) =>
    el.querySelector(':scope > [slot="controls"]'),
  );
  return {
    headingHosts: withHeading.length,
    headingSlots: withHeading.filter((el) => el.shadowRoot?.querySelector('slot[name="heading"]')).length,
    descriptionHosts: withDescription.length,
    descriptionSlots: withDescription.filter((el) => el.shadowRoot?.querySelector('slot[name="description"]')).length,
    controlsHosts: withControls.length,
    controlsSlots: withControls.filter((el) => el.shadowRoot?.querySelector('slot[name="controls"]')).length,
  };
});
swap.nested = await page.evaluate(() => {
  const carousels = [...document.querySelectorAll('[data-card="carousel"] lit-carousel')];
  const leftover = [...document.querySelectorAll('[data-card="carousel"] p-carousel')];
  const headings = [...document.querySelectorAll('[data-card="carousel"] p-heading')];
  const scrollers = [...document.querySelectorAll('[data-card="carousel"] p-scroller')];
  const tags = [...document.querySelectorAll('[data-card="carousel"] p-tag')];
  const popover = document.querySelector('#popover-carousel');
  const shadowBtns = carousels.flatMap((el) => [...(el.shadowRoot?.querySelectorAll('p-button-pure') ?? [])]);
  return {
    carouselCount: carousels.length,
    leftoverStencil: leftover.length,
    headingTags: [...new Set(headings.map((n) => n.tagName))],
    scrollerTags: [...new Set(scrollers.map((n) => n.tagName))],
    tagTags: [...new Set(tags.map((n) => n.tagName))],
    shadowButtonTags: [...new Set(shadowBtns.map((n) => n.tagName))],
    popoverOpen: popover?.matches(':popover-open') ?? null,
    hrefUndefined: carousels.some((el) => el.shadowRoot?.querySelector('[href="undefined"]')),
    extraRoot: carousels.some((el) => el.shadowRoot?.querySelector('.root')),
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
  (swap.namedSlots && swap.namedSlots.headingHosts !== swap.namedSlots.headingSlots) ||
  (swap.namedSlots && swap.namedSlots.descriptionHosts !== swap.namedSlots.descriptionSlots) ||
  (swap.namedSlots && swap.namedSlots.controlsHosts !== swap.namedSlots.controlsSlots) ||
  (swap.nested && swap.nested.popoverOpen) ||
  (swap.nested && swap.nested.leftoverStencil !== 0) ||
  (swap.nested && swap.nested.hrefUndefined) ||
  (swap.nested && swap.nested.extraRoot) ||
  (swap.nested && swap.nested.headingTags.some((tag) => tag !== 'P-HEADING')) ||
  (swap.nested && swap.nested.scrollerTags.some((tag) => tag !== 'P-SCROLLER')) ||
  (swap.nested && swap.nested.tagTags.some((tag) => tag !== 'P-TAG')) ||
  (swap.nested && !swap.nested.shadowButtonTags.includes('P-BUTTON-PURE')) ||
  consoleErrors.length > 0;
process.exit(failed ? 1 : 0);
