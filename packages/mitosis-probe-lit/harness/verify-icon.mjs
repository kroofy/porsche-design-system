import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/icon.html');
await page.waitForFunction(() => customElements.get('lit-icon'));
await page.waitForFunction(() => {
  const img = document.querySelector('#default lit-icon')?.shadowRoot?.querySelector('img');
  return !!img && img.complete && img.naturalWidth > 0;
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-icon');
  const sr = el.shadowRoot;
  const img = sr?.querySelector('img');
  const style = sr?.querySelector('style');
  const sizeRef = document.querySelector('#size-ref');
  const colorRef = document.querySelector('#color-ref');
  const css = img ? getComputedStyle(img) : null;
  return {
    isDefined: !!customElements.get('lit-icon'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasImg: !!style?.textContent?.includes('img{'),
    cssTextHasTypescale: !!style?.textContent?.includes('var(--p-typescale-sm)'),
    cssTextHasMask: !!style?.textContent?.includes('mask:url('),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasCanvasText: !!style?.textContent?.includes('CanvasText'),
    cssTextHasMedia: !!document.querySelector('#bp lit-icon')?.shadowRoot
      ?.querySelector('style')
      ?.textContent?.includes('@media(min-width:1000px)'),
    adoptedSheets: sr?.adoptedStyleSheets?.length ?? 0,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    imgSrc: img?.src ?? null,
    imgAlt: img?.alt ?? null,
    imgNatural: img ? { w: img.naturalWidth, h: img.naturalHeight } : null,
    fontSize: css?.fontSize ?? null,
    fontSizeRef: sizeRef ? getComputedStyle(sizeRef).fontSize : null,
    fontSizeMatch: img && sizeRef ? css.fontSize === getComputedStyle(sizeRef).fontSize : false,
    background: css?.backgroundColor ?? null,
    backgroundRef: colorRef ? getComputedStyle(colorRef).backgroundColor : null,
    backgroundMatch: img && colorRef ? css.backgroundColor === getComputedStyle(colorRef).backgroundColor : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
    maskImage: css?.maskImage || css?.webkitMaskImage,
  };
});

const xl = await page.evaluate(() => {
  const el = document.querySelector('#xl lit-icon');
  return { h: el.getBoundingClientRect().height };
});

const inherit = await page.evaluate(() => {
  const el = document.querySelector('#inherit lit-icon');
  const img = el.shadowRoot?.querySelector('img');
  const style = el.shadowRoot?.querySelector('style');
  return {
    src: img?.src ?? null,
    cssHasInherit: !!style?.textContent?.includes('font-size:inherit'),
    fontSize: img ? getComputedStyle(img).fontSize : null,
  };
});

const cssvar = await page.evaluate(() => {
  const el = document.querySelector('#cssvar lit-icon');
  const img = el.shadowRoot?.querySelector('img');
  return {
    src: img?.src ?? null,
    h: img ? getComputedStyle(img).height : null,
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-icon');
  return getComputedStyle(el).display;
});

const source = await page.evaluate(() => {
  const el = document.querySelector('#source lit-icon');
  const img = el.shadowRoot?.querySelector('img');
  const style = el.shadowRoot?.querySelector('style');
  return {
    srcIsData: !!img?.src?.startsWith('data:image/svg+xml'),
    cssHasData: !!style?.textContent?.includes('data:image/svg+xml'),
    cssHasLg: !!style?.textContent?.includes('typescale-lg'),
  };
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-icon');
  const before = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  el.setAttribute('size', '5xl');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.setAttribute('size', 'sm');
        resolve({ beforeHas5xl: before.includes('5xl'), afterHas5xl: after.includes('typescale-5xl') });
      })
    );
  });
});

const bpGeometry = async (width) => {
  await page.setViewportSize({ width, height: 640 });
  await page.waitForTimeout(50);
  return page.evaluate(() => {
    const img = document.querySelector('#bp lit-icon').shadowRoot.querySelector('img');
    return { fontSize: getComputedStyle(img).fontSize, height: getComputedStyle(img).height };
  });
};
const at999 = await bpGeometry(999);
const at1000 = await bpGeometry(1000);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-icon is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasImg) failures.push('cssText missing img rules');
if (!live.cssTextHasTypescale) failures.push('cssText missing typescale token');
if (!live.cssTextHasMask) failures.push('cssText missing mask');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasCanvasText) failures.push('cssText missing CanvasText');
if (!live.cssTextHasMedia) failures.push('breakpoint cssText missing 1000px media');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.imgSrc?.includes('car.35229c9.svg')) failures.push(`img src ${live.imgSrc}`);
if (live.imgAlt !== 'Car') failures.push(`alt is ${live.imgAlt}`);
if (!live.imgNatural || live.imgNatural.w < 1) failures.push('img did not load');
if (!live.fontSizeMatch) failures.push(`font-size ${live.fontSize} != ref ${live.fontSizeRef}`);
if (!live.backgroundMatch) failures.push(`background ${live.background} != ref ${live.backgroundRef}`);
if (live.hostDisplay !== 'inline-flex') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!live.maskImage || live.maskImage === 'none') failures.push(`mask-image ${live.maskImage}`);
if (!(xl.h > live.hostSize.h + 20)) failures.push(`5xl height ${xl.h} not larger than sm ${live.hostSize.h}`);
if (!inherit.src?.includes('car.35229c9.svg')) failures.push(`inherit src ${inherit.src}`);
if (!inherit.cssHasInherit) failures.push('inherit size missing font-size:inherit');
if (!cssvar.src?.includes('car.35229c9.svg')) failures.push(`cssvar src ${cssvar.src}`);
if (cssvar.h !== '99px') failures.push(`cssvar height ${cssvar.h}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!source.srcIsData) failures.push('source img src is not data URI');
if (!source.cssHasData) failures.push('source cssText missing data URI mask');
if (!source.cssHasLg) failures.push('size large missing typescale-lg');
if (!attrChange.afterHas5xl) failures.push('attribute change after connect not reactive');
if (at999.fontSize === at1000.fontSize) {
  failures.push(`no 999/1000 flip: ${at999.fontSize} vs ${at1000.fontSize}`);
}
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  xl,
  inherit,
  cssvar,
  hidden,
  source,
  attrChange,
  at999,
  at1000,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
