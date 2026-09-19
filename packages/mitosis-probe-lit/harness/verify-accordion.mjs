import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/accordion.html');
await page.waitForFunction(() => customElements.get('lit-accordion'));
await page.waitForFunction(() => document.querySelector('#default lit-accordion')?.shadowRoot?.querySelector('details'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-accordion');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const details = sr?.querySelector('details');
  const body = sr?.querySelector('details > div');
  return {
    isDefined: !!customElements.get('lit-accordion'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasKeyframes: css.includes('@keyframes overflow-hidden'),
    cssHasForcedColors: css.includes('forced-colors'),
    cssHasCanvasText: css.includes('CanvasText'),
    cssHasLinkText: css.includes('LinkText'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    hasSummarySlot: !!sr?.querySelector('slot[name="summary"]'),
    hasDefaultSlot: !!sr?.querySelector('slot:not([name])'),
    detailsOpen: details?.hasAttribute('open') ?? null,
    bodyVisibility: body ? getComputedStyle(body).visibility : null,
    bodyOpacity: body ? getComputedStyle(body).opacity : null,
    hostDisplay: getComputedStyle(el).display,
    innerLit: !!sr?.querySelector('lit-icon'),
  };
});

const opened = await page.evaluate(() => {
  const el = document.querySelector('#open lit-accordion');
  const details = el.shadowRoot?.querySelector('details');
  const body = el.shadowRoot?.querySelector('details > div');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const ref = document.querySelector('#surface-ref');
  return {
    detailsOpen: details?.hasAttribute('open') ?? null,
    bodyVisibility: body ? getComputedStyle(body).visibility : null,
    bodyOpacity: body ? getComputedStyle(body).opacity : null,
    cssHidesSummarySlot: css.includes('slot[name="summary"]{display:none}'),
    cssHasHeading: css.includes('h1,h2,h3,h4,h5,h6{'),
    backgroundMatch:
      details && ref ? getComputedStyle(details).backgroundColor === getComputedStyle(ref).backgroundColor : false,
    headingTag: el.shadowRoot?.querySelector('h2')?.tagName ?? null,
  };
});

const start = await page.evaluate(() => {
  const css = document.querySelector('#start lit-accordion')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasStartGrid: css.includes('auto minmax(0, 1fr)'),
    cssHasEndGrid: css.includes('minmax(0, 1fr) auto'),
  };
});

const slots = await page.evaluate(() => {
  const css = document.querySelector('#slots lit-accordion')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHidesBefore: css.includes('slot[name="summary-before"]{display:none}'),
    cssHasBeforeArea: css.includes('slot[name="summary-before"]{grid-area:'),
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-accordion')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-accordion is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasKeyframes) failures.push('cssText missing keyframes');
if (!live.cssHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssHasCanvasText) failures.push('cssText missing CanvasText');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.hasSummarySlot) failures.push('missing summary slot');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.detailsOpen) failures.push('default details is open');
if (live.bodyVisibility !== 'hidden') failures.push(`closed visibility ${live.bodyVisibility}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (!opened.detailsOpen) failures.push('open details missing open');
if (opened.bodyVisibility !== 'visible' && opened.bodyVisibility !== 'inherit') {
  failures.push(`open visibility ${opened.bodyVisibility}`);
}
if (opened.bodyOpacity !== '1') failures.push(`open opacity ${opened.bodyOpacity}`);
if (!opened.cssHidesSummarySlot) failures.push('heading host still shows summary slot');
if (!start.cssHasStartGrid) failures.push('align-marker start missing start grid');
if (slots.cssHidesBefore) failures.push('summary-before hidden despite slotted child');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, opened, start, slots, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
