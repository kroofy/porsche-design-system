import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/spinner.html');
await page.waitForFunction(() => customElements.get('lit-spinner'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-spinner');
  return !!el?.shadowRoot?.querySelector('svg') && el.shadowRoot.querySelectorAll('circle').length === 2;
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-spinner');
  const sr = el.shadowRoot;
  const root = sr?.querySelector('div');
  const style = sr?.querySelector('style');
  const svg = sr?.querySelector('svg');
  const sizeRef = document.querySelector('#size-ref');
  const colorRef = document.querySelector('#color-ref');
  const last = sr?.querySelector('circle:last-child');
  const css = root ? getComputedStyle(root) : null;
  const stroke = last ? getComputedStyle(last).stroke : null;
  return {
    isDefined: !!customElements.get('lit-spinner'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasRoot: !!style?.textContent?.includes('div{'),
    cssTextHasTypescale: !!style?.textContent?.includes('var(--p-typescale-sm)'),
    cssTextHasKeyframes: !!style?.textContent?.includes('@keyframes rotate'),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasCanvasText: !!style?.textContent?.includes('CanvasText'),
    cssTextHasOklch: !!style?.textContent?.includes('oklch(from'),
    cssTextHasMedia: !!document.querySelector('#bp lit-spinner')?.shadowRoot
      ?.querySelector('style')
      ?.textContent?.includes('@media(min-width:1000px)'),
    adoptedSheets: sr?.adoptedStyleSheets?.length ?? 0,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootTag: root?.tagName ?? null,
    role: root?.getAttribute('role'),
    ariaLive: root?.getAttribute('aria-live'),
    ariaLabel: root?.getAttribute('aria-label'),
    circleCount: sr?.querySelectorAll('circle').length ?? 0,
    svgViewBox: svg?.getAttribute('viewBox'),
    fontSize: css?.fontSize ?? null,
    fontSizeRef: sizeRef ? getComputedStyle(sizeRef).fontSize : null,
    fontSizeMatch: root && sizeRef ? css.fontSize === getComputedStyle(sizeRef).fontSize : false,
    stroke,
    strokeRef: colorRef ? getComputedStyle(colorRef).color : null,
    strokeMatch: last && colorRef ? stroke === getComputedStyle(colorRef).color : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const xl = await page.evaluate(() => {
  const el = document.querySelector('#xl lit-spinner');
  return { h: el.getBoundingClientRect().height };
});

const inherit = await page.evaluate(() => {
  const el = document.querySelector('#inherit lit-spinner');
  const style = el.shadowRoot?.querySelector('style');
  return {
    cssHasInherit: !!style?.textContent?.includes('font-size:inherit'),
    cssHasCurrentcolor: !!style?.textContent?.includes('currentcolor'),
  };
});

const cssvar = await page.evaluate(() => {
  const el = document.querySelector('#cssvar lit-spinner');
  const root = el.shadowRoot?.querySelector('div');
  return { h: root ? getComputedStyle(root).height : null };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-spinner');
  return getComputedStyle(el).display;
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-spinner');
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
    const root = document.querySelector('#bp lit-spinner').shadowRoot.querySelector('div');
    return { fontSize: getComputedStyle(root).fontSize };
  });
};
const at999 = await bpGeometry(999);
const at1000 = await bpGeometry(1000);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-spinner is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasRoot) failures.push('cssText missing div rules');
if (!live.cssTextHasTypescale) failures.push('cssText missing typescale token');
if (!live.cssTextHasKeyframes) failures.push('cssText missing rotate keyframes');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasCanvasText) failures.push('cssText missing CanvasText');
if (!live.cssTextHasOklch) failures.push('cssText missing oklch track');
if (!live.cssTextHasMedia) failures.push('breakpoint cssText missing 1000px media');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootTag !== 'DIV') failures.push(`root tag ${live.rootTag}`);
if (live.role !== 'alert') failures.push(`role ${live.role}`);
if (live.ariaLive !== 'assertive') failures.push(`aria-live ${live.ariaLive}`);
if (live.ariaLabel !== 'Loading page content') failures.push(`aria-label ${live.ariaLabel}`);
if (live.circleCount !== 2) failures.push(`circle count ${live.circleCount}`);
if (live.svgViewBox !== '-16 -16 32 32') failures.push(`viewBox ${live.svgViewBox}`);
if (!live.fontSizeMatch) failures.push(`font-size ${live.fontSize} != ref ${live.fontSizeRef}`);
if (!live.strokeMatch) failures.push(`stroke ${live.stroke} != ref ${live.strokeRef}`);
if (live.hostDisplay !== 'inline-flex') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!(xl.h > live.hostSize.h + 8)) failures.push(`5xl height ${xl.h} not larger than sm ${live.hostSize.h}`);
if (!inherit.cssHasInherit) failures.push('inherit size missing font-size:inherit');
if (!inherit.cssHasCurrentcolor) failures.push('inherit color missing currentcolor');
if (cssvar.h !== '99px') failures.push(`css var size height ${cssvar.h}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
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
  attrChange,
  at999,
  at1000,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
