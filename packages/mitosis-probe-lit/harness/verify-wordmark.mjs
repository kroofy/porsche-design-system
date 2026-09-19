import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/wordmark.html');
await page.waitForFunction(() => customElements.get('lit-wordmark'));
await page.waitForFunction(() => {
  const svg = document.querySelector('#default lit-wordmark')?.shadowRoot?.querySelector('svg');
  return !!svg && svg.getBBox().width > 0;
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-wordmark');
  const sr = el.shadowRoot;
  const svg = sr?.querySelector('svg');
  const a = sr?.querySelector('a');
  const style = sr?.querySelector('style');
  const path = sr?.querySelector('path');
  const title = sr?.querySelector('title');
  const ref = document.querySelector('#fill-ref');
  return {
    isDefined: !!customElements.get('lit-wordmark'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasSvg: !!style?.textContent?.includes('svg{'),
    cssTextHasHostHeight: !!style?.textContent?.includes('clamp'),
    adoptedSheets: sr?.adoptedStyleSheets?.length ?? 0,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    aHref: a?.getAttribute('href') ?? null,
    aTarget: a?.getAttribute('target') ?? null,
    svgViewBox: svg?.getAttribute('viewBox') ?? null,
    titleText: title?.textContent ?? null,
    pathLength: path?.getAttribute('d')?.length ?? 0,
    fill: svg ? getComputedStyle(svg).fill : null,
    fillRef: ref ? getComputedStyle(ref).fill : null,
    fillMatch: svg && ref ? getComputedStyle(svg).fill === getComputedStyle(ref).fill : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const inherit = await page.evaluate(() => {
  const el = document.querySelector('#inherit lit-wordmark');
  const style = el.shadowRoot?.querySelector('style');
  return {
    cssTextHasHostHeight: !!style?.textContent?.includes('clamp'),
    hostHeight: getComputedStyle(el).height,
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-wordmark');
  return getComputedStyle(el).display;
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-wordmark is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.aHref !== '#') failures.push(`href is ${live.aHref}`);
if (live.aTarget !== '_self') failures.push(`target is ${live.aTarget}`);
if (live.svgViewBox !== '0 0 4500 300') failures.push(`viewBox is ${live.svgViewBox}`);
if (live.titleText !== 'Porsche') failures.push(`title is ${live.titleText}`);
if (live.pathLength < 100) failures.push(`path d length ${live.pathLength}`);
if (!live.fillMatch) failures.push(`fill ${live.fill} != ref ${live.fillRef}`);
if (live.hostDisplay !== 'inline-block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.w > 50) || !(live.hostSize.h > 5)) {
  failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
}
if (inherit.cssTextHasHostHeight) failures.push('inherit size still sets clamp height');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, inherit, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
