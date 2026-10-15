import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/table-cell.html');
await page.waitForFunction(() => customElements.get('lit-table-cell'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-table-cell')?.shadowRoot?.querySelector('slot'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-table-cell');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const slot = sr?.querySelector('slot:not([name])');
  const css = style?.textContent ?? '';
  const ref = document.querySelector('#pad-ref');
  return {
    isDefined: !!customElements.get('lit-table-cell'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasTableCell: css.includes(':host{display:table-cell'),
    cssHasPaddingVar: css.includes('padding:var(--_p-table-a)'),
    cssHasNowrap: css.includes('white-space:nowrap'),
    cssHasMiddle: css.includes('vertical-align:middle'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    hasDefaultSlot: !!slot,
    assigned: slot ? slot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    role: el.getAttribute('role'),
    hostDisplay: getComputedStyle(el).display,
    verticalAlign: getComputedStyle(el).verticalAlign,
    whiteSpace: getComputedStyle(el).whiteSpace,
    padding: getComputedStyle(el).padding,
    padRef: ref ? getComputedStyle(ref).padding : null,
    innerLit: !!sr?.querySelector('lit-table-row,lit-table-body,lit-table'),
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-table-cell')).display);

const multiline = await page.evaluate(() => {
  const el = document.querySelector('#multiline lit-table-cell');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasNormal: css.includes('white-space:normal'),
    whiteSpace: getComputedStyle(el).whiteSpace,
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-table-cell not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasTableCell) failures.push('css missing table-cell');
if (!live.cssHasPaddingVar) failures.push('css missing padding var');
if (!live.cssHasNowrap) failures.push('css missing nowrap');
if (!live.cssHasMiddle) failures.push('css missing vertical-align');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (!live.assigned.includes('718 Cayman')) failures.push('slot assignment');
if (live.role !== 'cell') failures.push('role');
if (live.hostDisplay !== 'table-cell') failures.push('host display');
if (live.verticalAlign !== 'middle') failures.push('vertical-align');
if (live.whiteSpace !== 'nowrap') failures.push('white-space');
if (live.padding !== live.padRef) failures.push('padding vs ref');
if (live.innerLit) failures.push('inner lit-* tags');
if (hidden !== 'none') failures.push('hidden host display');
if (!multiline.cssHasNormal) failures.push('multiline css');
if (multiline.whiteSpace !== 'normal') failures.push('multiline white-space');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, hidden, multiline, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
