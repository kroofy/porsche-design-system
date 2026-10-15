import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/model-signature.html');
await page.waitForFunction(() => customElements.get('lit-model-signature'));
await page.waitForFunction(() => {
  const img = document.querySelector('#default lit-model-signature')?.shadowRoot?.querySelector('img');
  return !!img && img.complete && img.naturalWidth > 0;
});

await page.evaluate(() => {
  const el = document.querySelector('#safe-off');
  el.safeZone = false;
});
await page.waitForTimeout(50);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-model-signature');
  const sr = el.shadowRoot;
  const img = sr?.querySelector('img');
  const style = sr?.querySelector('style');
  const ref = document.querySelector('#color-ref');
  const css = getComputedStyle(el);
  return {
    isDefined: !!customElements.get('lit-model-signature'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasMask: !!style?.textContent?.includes('mask:url('),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasCanvasText: !!style?.textContent?.includes('CanvasText'),
    cssTextHasMedia1000: !!style?.textContent?.includes('min-width:1000px'),
    adoptedSheets: sr?.adoptedStyleSheets?.length ?? 0,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    hasSlot: !!sr?.querySelector('slot'),
    imgSrc: img?.getAttribute('src') ?? img?.src ?? null,
    imgAlt: img?.getAttribute('alt') ?? img?.alt ?? null,
    imgNatural: img ? { w: img.naturalWidth, h: img.naturalHeight } : null,
    background: css.backgroundColor,
    backgroundRef: ref ? getComputedStyle(ref).backgroundColor : null,
    backgroundMatch: ref ? css.backgroundColor === getComputedStyle(ref).backgroundColor : false,
    hostDisplay: css.display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
    aspectRatio: css.aspectRatio,
    maskImage: css.maskImage || css.webkitMaskImage,
  };
});

const contrast = await page.evaluate(() => {
  const el = document.querySelector('#contrast lit-model-signature');
  const ref = document.querySelector('#contrast-ref');
  return {
    background: getComputedStyle(el).backgroundColor,
    backgroundRef: ref ? getComputedStyle(ref).backgroundColor : null,
    match: ref ? getComputedStyle(el).backgroundColor === getComputedStyle(ref).backgroundColor : false,
  };
});

const inherit = await page.evaluate(() => {
  const el = document.querySelector('#inherit lit-model-signature');
  const img = el.shadowRoot?.querySelector('img');
  const style = el.shadowRoot?.querySelector('style');
  return {
    src: img?.src ?? null,
    alt: img?.alt ?? null,
    cssHasCurrentcolor: !!style?.textContent?.includes('currentcolor'),
    color: getComputedStyle(el).color,
  };
});

const noSafeZone = await page.evaluate(() => {
  const el = document.querySelector('#safe-off');
  const style = el.shadowRoot?.querySelector('style');
  return {
    cssHasAspect: style?.textContent?.includes('aspect-ratio:94 / 25') ?? false,
    height: el.getBoundingClientRect().height,
  };
});

const sizeInherit = await page.evaluate(() => {
  const el = document.querySelector('#size-inherit lit-model-signature');
  const style = el.shadowRoot?.querySelector('style');
  return {
    cssHasAuto: !!style?.textContent?.includes('--p-model-signature-width,auto'),
    width: el.getBoundingClientRect().width,
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-model-signature');
  return getComputedStyle(el).display;
});

const slotted = await page.evaluate(() => {
  const el = document.querySelector('#slotted lit-model-signature');
  const assigned = el.shadowRoot?.querySelector('slot')?.assignedElements() ?? [];
  return { assigned: assigned.length, tag: assigned[0]?.tagName ?? null };
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-model-signature');
  const before = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  el.setAttribute('model', 'cayenne');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.setAttribute('model', '911');
        resolve({
          beforeHas911: before.includes('911.b68f913.svg'),
          afterHasCayenne: after.includes('cayenne.2556201.svg'),
        });
      })
    );
  });
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-model-signature is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasMask) failures.push('cssText missing mask');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasCanvasText) failures.push('cssText missing CanvasText');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.hasSlot) failures.push('no slot');
if (!live.imgSrc?.includes('911.b68f913.svg')) failures.push(`img src ${live.imgSrc}`);
if (live.imgAlt !== '911') failures.push(`alt is ${live.imgAlt}`);
if (!live.imgNatural || live.imgNatural.w < 1) failures.push('img did not load');
if (!live.backgroundMatch) failures.push(`background ${live.background} != ref ${live.backgroundRef}`);
if (live.hostDisplay !== 'inline-block') failures.push(`host display ${live.hostDisplay}`);
if (!(Math.abs(live.hostSize.w - 94) < 1)) failures.push(`host width ${live.hostSize.w}`);
if (!(Math.abs(live.hostSize.h - 36) < 1)) failures.push(`host height ${live.hostSize.h} (safe-zone 36)`);
if (!live.maskImage || live.maskImage === 'none') failures.push(`mask-image ${live.maskImage}`);
if (!contrast.match) failures.push(`contrast background ${contrast.background} != ${contrast.backgroundRef}`);
if (!inherit.src?.includes('turbo.6a4084a.svg')) failures.push(`inherit src ${inherit.src}`);
if (inherit.alt !== 'turbo') failures.push(`inherit alt ${inherit.alt}`);
if (!inherit.cssHasCurrentcolor) failures.push('inherit color missing currentcolor');
if (!noSafeZone.cssHasAspect) failures.push('safeZone false missing aspect-ratio 94 / 25');
if (!(Math.abs(noSafeZone.height - 25) < 1)) failures.push(`safeZone false height ${noSafeZone.height}`);
if (!sizeInherit.cssHasAuto) failures.push('size inherit missing width auto');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (slotted.assigned < 1) failures.push('slot did not assign light img');
if (!attrChange.afterHasCayenne) failures.push('attribute change after connect not reactive');
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  contrast,
  inherit,
  noSafeZone,
  sizeInherit,
  hidden,
  slotted,
  attrChange,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
