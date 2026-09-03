import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/stepper-horizontal.html');
await page.waitForFunction(() => customElements.get('lit-stepper-horizontal'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-stepper-horizontal')?.shadowRoot?.querySelector('p-scroller'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-stepper-horizontal');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const wrap = sr?.querySelector('.wrap');
  const scroller = sr?.querySelector('p-scroller');
  const slot = sr?.querySelector('slot:not([name])');
  return {
    isDefined: !!customElements.get('lit-stepper-horizontal'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostGrid: css.includes(':host{display:grid}'),
    cssHasWrapContents: css.includes('.wrap{display:contents}'),
    cssHasScroller: css.includes('.scroller{place-self:flex-start'),
    cssHasSm: css.includes('font-size:var(--p-typescale-sm)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    wrapDisplay: wrap ? getComputedStyle(wrap).display : null,
    hostDisplay: getComputedStyle(el).display,
    scrollerTag: scroller?.tagName ?? null,
    scrollerClass: scroller?.className ?? null,
    scrollerAria: scroller?.aria,
    hasDefaultSlot: !!slot,
    innerLit: !!sr?.querySelector('lit-scroller,lit-stepper-horizontal-item,lit-button,lit-text'),
    slotted: slot ? slot.assignedElements().map((n) => n.tagName) : [],
  };
});

const medium = await page.evaluate(() => {
  const el = document.querySelector('#medium lit-stepper-horizontal');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasMd: css.includes('font-size:var(--p-typescale-md)'),
  };
});

const hideSize = await page.evaluate(() => {
  const css =
    document.querySelector('#hide-size lit-stepper-horizontal')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasMedia: css.includes('@media(min-width:1000px){.scroller{font-size:var(--p-typescale-md)}}'),
  };
});

const hidden = await page.evaluate(
  () => getComputedStyle(document.querySelector('#hidden lit-stepper-horizontal')).display,
);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-stepper-horizontal is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostGrid) failures.push('cssText missing :host grid');
if (!live.cssHasWrapContents) failures.push('cssText missing wrap display:contents');
if (!live.cssHasScroller) failures.push('cssText missing .scroller place-self');
if (!live.cssHasSm) failures.push('cssText missing typescale-sm');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.wrapDisplay !== 'contents') failures.push(`wrap display ${live.wrapDisplay}`);
if (live.hostDisplay !== 'grid') failures.push(`host display ${live.hostDisplay}`);
if (live.scrollerTag !== 'P-SCROLLER') failures.push(`scroller tag ${live.scrollerTag}`);
if (!String(live.scrollerClass).includes('scroller')) failures.push(`scroller class ${live.scrollerClass}`);
if (live.scrollerAria?.role !== 'list') failures.push(`scroller aria ${JSON.stringify(live.scrollerAria)}`);
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (live.slotted.join() !== 'P-STEPPER-HORIZONTAL-ITEM,P-STEPPER-HORIZONTAL-ITEM,P-STEPPER-HORIZONTAL-ITEM') {
  failures.push(`slotted ${JSON.stringify(live.slotted)}`);
}
if (!medium.cssHasMd) failures.push('medium missing typescale-md');
if (!hideSize.cssHasMedia) failures.push('size breakpoint missing m=1000');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, medium, hideSize, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
