import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/table.html');
await page.waitForFunction(() => customElements.get('lit-table'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-table')?.shadowRoot?.querySelector('.table'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-table');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const table = sr?.querySelector('.table');
  const scroller = sr?.querySelector('p-scroller');
  const caption = sr?.querySelector('.caption');
  const ref = document.querySelector('#primary-ref');
  return {
    isDefined: !!customElements.get('lit-table'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostBlock: css.includes(':host{display:block'),
    cssHasPadFluid: css.includes('--_p-table-a:var(--p-spacing-fluid-sm)'),
    cssHasHover: css.includes('--_p-table-b:var(--p-color-frosted)'),
    cssHasBorder: css.includes('--_p-table-c:var(--p-color-contrast-low)'),
    cssHasScrollerVars: css.includes('--p-scroller-indicator-top:var(--p-table-scroll-indicator-top,0px)'),
    cssHasWidth: css.includes('width:100%'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    tableRole: table?.getAttribute('role'),
    ariaLabel: table?.getAttribute('aria-label'),
    scrollerTag: scroller?.tagName ?? null,
    scrollerScrollbar: scroller?.getAttribute('scrollbar'),
    hasCaptionDiv: !!caption,
    innerLit: !!sr?.querySelector('lit-scroller,lit-table-head,lit-heading'),
    hostDisplay: getComputedStyle(el).display,
    colorMatch: table && ref ? getComputedStyle(el).color === getComputedStyle(ref).color : false,
  };
});

const slotted = await page.evaluate(() => {
  const el = document.querySelector('#slotted lit-table');
  const caption = el.shadowRoot?.querySelector('.caption');
  const slot = el.shadowRoot?.querySelector('slot[name="caption"]');
  const table = el.shadowRoot?.querySelector('.table');
  return {
    hasCaptionDiv: !!caption,
    assigned: slot ? slot.assignedNodes().map((n) => n.nodeType === 1 ? n.tagName : n.textContent.trim()) : [],
    labelledBy: table?.getAttribute('aria-labelledby'),
    ariaLabel: table?.getAttribute('aria-label'),
  };
});

const compact = await page.evaluate(() => {
  const el = document.querySelector('#compact lit-table');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const scroller = el.shadowRoot?.querySelector('p-scroller');
  return {
    cssHasStatic: css.includes('--_p-table-a:var(--p-spacing-static-sm)'),
    cssHasFluid: css.includes('--_p-table-a:var(--p-spacing-fluid-sm)'),
    compactAttr: scroller?.hasAttribute('compact'),
  };
});

const fixed = await page.evaluate(() => {
  const el = document.querySelector('#fixed lit-table');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssFixed: css.includes('table-layout:fixed'),
    cssMinWidth: css.includes('min-width:100%'),
    cssWidth100: css.includes('.table{display:table;border-collapse:collapse;white-space:nowrap;width:100%}'),
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-table');
  return { display: getComputedStyle(el).display };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-table not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasHostBlock) failures.push('css missing :host block');
if (!live.cssHasPadFluid) failures.push('css missing fluid padding var');
if (!live.cssHasHover) failures.push('css missing hover var');
if (!live.cssHasBorder) failures.push('css missing border var');
if (!live.cssHasScrollerVars) failures.push('css missing scroller indicator vars');
if (!live.cssHasWidth) failures.push('css missing width 100%');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.tableRole !== 'table') failures.push('table role');
if (live.ariaLabel !== 'Some caption') failures.push('aria-label');
if (live.scrollerTag !== 'P-SCROLLER') failures.push('nested scroller is not Stencil p-scroller');
if (live.scrollerScrollbar !== 'true') failures.push('p-scroller scrollbar');
if (live.hasCaptionDiv) failures.push('caption div on property caption');
if (live.innerLit) failures.push('inner lit-* tags');
if (live.hostDisplay !== 'block') failures.push('host display');
if (!slotted.hasCaptionDiv) failures.push('missing caption div');
if (!slotted.assigned.length) failures.push('caption slot empty');
if (slotted.labelledBy !== 'caption') failures.push('aria-labelledby');
if (slotted.ariaLabel) failures.push('slotted caption should not set aria-label');
if (!compact.cssHasStatic) failures.push('compact padding');
if (compact.cssHasFluid) failures.push('compact still uses fluid padding');
if (!compact.compactAttr) failures.push('p-scroller compact');
if (!fixed.cssFixed) failures.push('fixed layout');
if (!fixed.cssMinWidth) failures.push('fixed min-width');
if (fixed.cssWidth100) failures.push('fixed still uses width 100%');
if (hidden.display !== 'none') failures.push('hidden host display');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, slotted, compact, fixed, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
