import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/flag.html');
await page.waitForFunction(() => customElements.get('lit-flag'));
await page.waitForFunction(() => {
  const img = document.querySelector('#default lit-flag')?.shadowRoot?.querySelector('img');
  return !!img && img.complete && img.naturalWidth > 0;
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-flag');
  const sr = el.shadowRoot;
  const img = sr?.querySelector('img');
  const style = sr?.querySelector('style');
  const ref = document.querySelector('#size-ref');
  return {
    isDefined: !!customElements.get('lit-flag'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasImg: !!style?.textContent?.includes('img{'),
    cssTextHasTypescale: !!style?.textContent?.includes('var(--p-typescale-sm)'),
    cssTextHasMedia: !!document.querySelector('#bp lit-flag')?.shadowRoot
      ?.querySelector('style')
      ?.textContent?.includes('@media(min-width:1000px)'),
    adoptedSheets: sr?.adoptedStyleSheets?.length ?? 0,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    imgSrc: img?.getAttribute('src') ?? null,
    imgAlt: img?.getAttribute('alt') ?? null,
    imgNatural: img ? { w: img.naturalWidth, h: img.naturalHeight } : null,
    fontSize: img ? getComputedStyle(img).fontSize : null,
    fontSizeRef: ref ? getComputedStyle(ref).fontSize : null,
    fontSizeMatch: img && ref ? getComputedStyle(img).fontSize === getComputedStyle(ref).fontSize : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const xl = await page.evaluate(() => {
  const el = document.querySelector('#xl lit-flag');
  return { h: el.getBoundingClientRect().height };
});

const inherit = await page.evaluate(() => {
  const el = document.querySelector('#inherit lit-flag');
  const img = el.shadowRoot?.querySelector('img');
  return {
    src: img?.getAttribute('src') ?? null,
    alt: img?.getAttribute('alt') ?? null,
    fontSize: img ? getComputedStyle(img).fontSize : null,
  };
});

const cssvar = await page.evaluate(() => {
  const el = document.querySelector('#cssvar lit-flag');
  const img = el.shadowRoot?.querySelector('img');
  return {
    src: img?.getAttribute('src') ?? null,
    h: img ? getComputedStyle(img).height : null,
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-flag');
  return getComputedStyle(el).display;
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-flag');
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
    const img = document.querySelector('#bp lit-flag').shadowRoot.querySelector('img');
    return { fontSize: getComputedStyle(img).fontSize, height: getComputedStyle(img).height };
  });
};
const at999 = await bpGeometry(999);
const at1000 = await bpGeometry(1000);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-flag is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasImg) failures.push('cssText missing img rules');
if (!live.cssTextHasTypescale) failures.push('cssText missing typescale token');
if (!live.cssTextHasMedia) failures.push('breakpoint cssText missing 1000px media');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.imgSrc?.includes('de.b575e11.svg')) failures.push(`img src ${live.imgSrc}`);
if (live.imgAlt !== 'Flag of Germany') failures.push(`alt is ${live.imgAlt}`);
if (!live.imgNatural || live.imgNatural.w < 1) failures.push('img did not load');
if (!live.fontSizeMatch) failures.push(`font-size ${live.fontSize} != ref ${live.fontSizeRef}`);
if (live.hostDisplay !== 'inline-flex') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!(xl.h > live.hostSize.h + 20)) failures.push(`5xl height ${xl.h} not larger than sm ${live.hostSize.h}`);
if (!inherit.src?.includes('ch.1cc9a58.svg')) failures.push(`inherit src ${inherit.src}`);
if (inherit.alt !== 'Flag of France') failures.push(`inherit alt ${inherit.alt}`);
if (!cssvar.src?.includes('pt.c903b10.svg')) failures.push(`cssvar src ${cssvar.src}`);
if (cssvar.h !== '99px') failures.push(`cssvar height ${cssvar.h}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterHas5xl) failures.push('attribute change after connect not reactive');
if (at999.fontSize === at1000.fontSize) {
  failures.push(`no 999/1000 flip: ${at999.fontSize} vs ${at1000.fontSize}`);
}
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, xl, inherit, cssvar, hidden, attrChange, at999, at1000, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
