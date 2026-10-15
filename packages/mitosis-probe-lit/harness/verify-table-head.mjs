import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/table-head.html');
await page.waitForFunction(() => customElements.get('lit-table-head'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-table-head')?.shadowRoot?.querySelector('slot'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-table-head');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const slot = sr?.querySelector('slot:not([name])');
  const css = style?.textContent ?? '';
  const slotted = slot?.assignedElements()?.[0];
  const ref = document.querySelector('#border-ref');
  return {
    isDefined: !!customElements.get('lit-table-head'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHeaderGroup: css.includes(':host{display:table-header-group'),
    cssHasSemibold: css.includes('var(--p-font-weight-semibold)'),
    cssHasTypescaleXs: css.includes('var(--p-typescale-xs)'),
    cssHasBorderVar: css.includes('border-bottom:1px solid var(--_p-table-c)'),
    cssHasSlottedVars: css.includes('::slotted(*){--_p-table-d:0px !important;--_p-table-b:none !important}'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    hasDefaultSlot: !!slot,
    assigned: slot ? slot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    role: el.getAttribute('role'),
    hostDisplay: getComputedStyle(el).display,
    borderBottom: getComputedStyle(el).borderBottom,
    borderRef: ref ? getComputedStyle(ref).borderBottom : null,
    slottedD: slotted ? getComputedStyle(slotted).getPropertyValue('--_p-table-d').trim() : null,
    slottedB: slotted ? getComputedStyle(slotted).getPropertyValue('--_p-table-b').trim() : null,
    innerLit: !!sr?.querySelector('lit-table-head-row,lit-table-head-cell'),
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-table-head')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-table-head not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasHeaderGroup) failures.push('css missing table-header-group');
if (!live.cssHasSemibold) failures.push('css missing semibold');
if (!live.cssHasTypescaleXs) failures.push('css missing typescale-xs');
if (!live.cssHasBorderVar) failures.push('css missing border var');
if (!live.cssHasSlottedVars) failures.push('css missing slotted vars');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (!live.assigned.includes('Model')) failures.push('slot assignment');
if (live.role !== 'rowgroup') failures.push('role');
if (live.hostDisplay !== 'table-header-group') failures.push('host display');
if (live.slottedD !== '0px') failures.push('slotted --_p-table-d');
if (live.slottedB !== 'none') failures.push('slotted --_p-table-b');
if (live.innerLit) failures.push('inner lit-* tags');
if (hidden !== 'none') failures.push('hidden host display');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
