import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/crest.html');
await page.waitForFunction(() => customElements.get('lit-crest'));
await page.waitForFunction(() => {
  const img = document.querySelector('#default lit-crest')?.shadowRoot?.querySelector('img');
  return !!img && img.complete && img.naturalWidth > 0;
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-crest');
  const sr = el.shadowRoot;
  const img = sr?.querySelector('img');
  const a = sr?.querySelector('a');
  const style = sr?.querySelector('style');
  return {
    isDefined: !!customElements.get('lit-crest'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasPicture: !!style?.textContent?.includes('picture'),
    adoptedSheets: sr?.adoptedStyleSheets?.length ?? 0,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    aHref: a?.getAttribute('href') ?? null,
    aTarget: a?.getAttribute('target') ?? null,
    pictureCount: sr?.querySelectorAll('picture').length ?? 0,
    sourceTypes: [...(sr?.querySelectorAll('source') ?? [])].map((s) => s.getAttribute('type')),
    imgSrc: img?.getAttribute('src') ?? null,
    imgAlt: img?.getAttribute('alt') ?? null,
    imgNatural: img ? { w: img.naturalWidth, h: img.naturalHeight } : null,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const noHref = await page.evaluate(() => {
  const el = document.querySelector('#nohref lit-crest');
  return {
    aHref: el.shadowRoot?.querySelector('a')?.getAttribute('href') ?? null,
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-crest');
  return getComputedStyle(el).display;
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-crest is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.aHref !== '#') failures.push(`href is ${live.aHref}`);
if (live.aTarget !== '_self') failures.push(`target is ${live.aTarget}`);
if (live.pictureCount !== 1) failures.push(`picture count ${live.pictureCount}`);
if (live.imgAlt !== 'Porsche') failures.push(`alt is ${live.imgAlt}`);
if (!live.imgSrc?.includes('porsche-crest.8a292fb@2x.png')) failures.push(`img src ${live.imgSrc}`);
if (!live.imgNatural || live.imgNatural.w < 1) failures.push('img did not load');
if (Math.round(live.hostSize.w) !== 30 || Math.round(live.hostSize.h) !== 40) {
  failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
}
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, noHref, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
