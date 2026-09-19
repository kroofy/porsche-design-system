import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/table-row.html');
await page.waitForFunction(() => customElements.get('lit-table-row'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-table-row')?.shadowRoot?.querySelector('slot'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-table-row');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const slot = sr?.querySelector('slot:not([name])');
  const css = style?.textContent ?? '';
  const ref = document.querySelector('#border-ref');
  return {
    isDefined: !!customElements.get('lit-table-row'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasTableRow: css.includes(':host{display:table-row'),
    cssHasBorderVars: css.includes('border-bottom:var(--_p-table-d) solid var(--_p-table-c)'),
    cssHasHover: css.includes('@media(hover:hover){:host(:hover){background:var(--_p-table-b)'),
    cssHasHidden: css.includes(':host([hidden]){display:none !important}'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    hasDefaultSlot: !!slot,
    assigned: slot ? slot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    role: el.getAttribute('role'),
    hostDisplay: getComputedStyle(el).display,
    borderBottom: getComputedStyle(el).borderBottom,
    borderRef: ref ? getComputedStyle(ref).borderBottom : null,
    innerLit: !!sr?.querySelector('lit-table-cell,lit-table-body,lit-table'),
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-table-row')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-table-row not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasTableRow) failures.push('css missing table-row');
if (!live.cssHasBorderVars) failures.push('css missing border vars');
if (!live.cssHasHover) failures.push('css missing hover');
if (!live.cssHasHidden) failures.push('css missing hidden');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (!live.assigned.includes('718 Cayman')) failures.push('slot assignment');
if (live.role !== 'row') failures.push('role');
if (live.hostDisplay !== 'table-row') failures.push('host display');
if (live.borderBottom !== live.borderRef) failures.push('border vs ref');
if (live.innerLit) failures.push('inner lit-* tags');
if (hidden !== 'none') failures.push('hidden host display');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
