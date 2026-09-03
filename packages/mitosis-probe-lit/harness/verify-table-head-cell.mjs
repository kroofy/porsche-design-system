import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/table-head-cell.html');
await page.waitForFunction(() => customElements.get('lit-table-head-cell'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-table-head-cell')?.shadowRoot?.querySelector('slot'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-table-head-cell');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const slot = sr?.querySelector('slot:not([name])');
  const span = sr?.querySelector('span');
  const css = style?.textContent ?? '';
  const ref = document.querySelector('#pad-ref');
  return {
    isDefined: !!customElements.get('lit-table-head-cell'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasTableCell: css.includes(':host{display:table-cell'),
    cssHasPaddingVar: css.includes('var(--_p-table-a,var(--p-spacing-fluid-sm))'),
    cssHasNowrap: css.includes('white-space:nowrap'),
    cssHasFouc: css.includes(':not(:defined,[data-ssr]){visibility:hidden}'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    hasSpan: !!span,
    hasDefaultSlot: !!slot,
    slotInSpan: !!span?.querySelector('slot'),
    assigned: slot ? slot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    role: el.getAttribute('role'),
    scope: el.getAttribute('scope'),
    hostDisplay: getComputedStyle(el).display,
    verticalAlign: getComputedStyle(el).verticalAlign,
    whiteSpace: getComputedStyle(el).whiteSpace,
    padding: getComputedStyle(el).padding,
    padRef: ref ? getComputedStyle(ref).padding : null,
    innerLit: !!sr?.querySelector('lit-icon,lit-table-head-row,lit-table-head,lit-table'),
    innerPIcon: !!sr?.querySelector('p-icon'),
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-table-head-cell')).display);

const hideLabel = await page.evaluate(() => {
  const el = document.querySelector('#hide-label lit-table-head-cell');
  const span = el.shadowRoot?.querySelector('span');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasClip: css.includes('clip:rect(0,0,0,0)'),
    spanPosition: span ? getComputedStyle(span).position : null,
  };
});

const sort = await page.evaluate(() => {
  const el = document.querySelector('#sort lit-table-head-cell');
  const sr = el.shadowRoot;
  const icon = sr?.querySelector('p-icon');
  return {
    role: el.getAttribute('role'),
    ariaSort: el.getAttribute('aria-sort'),
    hasButton: !!sr?.querySelector('button'),
    iconTag: icon?.tagName ?? null,
    iconName: icon?.getAttribute('name') ?? null,
    innerLitIcon: !!sr?.querySelector('lit-icon'),
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-table-head-cell not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasTableCell) failures.push('css missing table-cell');
if (!live.cssHasPaddingVar) failures.push('css missing padding var');
if (!live.cssHasNowrap) failures.push('css missing nowrap');
if (!live.cssHasFouc) failures.push('css missing fouc');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (!live.hasSpan) failures.push('missing span');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (!live.slotInSpan) failures.push('slot not in span');
if (!live.assigned.includes('Model')) failures.push('slot assignment');
if (live.role !== 'columnheader') failures.push('role');
if (live.scope !== 'col') failures.push('scope');
if (live.hostDisplay !== 'table-cell') failures.push('host display');
if (live.verticalAlign !== 'bottom') failures.push('vertical-align');
if (live.whiteSpace !== 'nowrap') failures.push('white-space');
if (live.padding !== live.padRef) failures.push('padding vs ref');
if (live.innerLit) failures.push('inner lit-* tags');
if (live.innerPIcon) failures.push('unexpected p-icon on default');
if (hidden !== 'none') failures.push('hidden host display');
if (!hideLabel.cssHasClip) failures.push('hideLabel css');
if (hideLabel.spanPosition !== 'absolute') failures.push('hideLabel span');
if (sort.ariaSort !== 'ascending') failures.push('aria-sort');
if (!sort.hasButton) failures.push('sort button');
if (sort.iconTag !== 'P-ICON') failures.push('sort p-icon not Stencil');
if (sort.iconName !== 'arrow-up') failures.push('sort icon name');
if (sort.innerLitIcon) failures.push('lit-icon leaked');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, hidden, hideLabel, sort, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
