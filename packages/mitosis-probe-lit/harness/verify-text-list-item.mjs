import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/text-list-item.html');
await page.waitForFunction(() => customElements.get('lit-text-list-item'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-text-list-item');
  return !!el?.shadowRoot?.querySelector('slot');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-text-list-item');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const slot = sr?.querySelector('slot:not([name])');
  const css = style?.textContent ?? '';
  return {
    isDefined: !!customElements.get('lit-text-list-item'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasGrid: css.includes(':host{display:grid'),
    cssHasPseudoSpace: css.includes('var(--_p-text-list-e) 1fr'),
    cssHasNestedDash: css.includes('--_p-text-list-g:"–"'),
    cssHasLastChild: css.includes('::slotted(*:last-child){grid-column:2 !important}'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    hasDefaultSlot: !!slot,
    slotted: slot ? slot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    role: el.getAttribute('role'),
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const nested = await page.evaluate(() => {
  const el = document.querySelector('#nested lit-text-list-item');
  const slot = el.shadowRoot?.querySelector('slot:not([name])');
  const last = [...(slot?.assignedElements() ?? [])].at(-1);
  return {
    lastTag: last?.tagName ?? null,
    lastGridColumn: last ? getComputedStyle(last).gridColumn : null,
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-text-list-item')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-text-list-item is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasGrid) failures.push('cssText missing host grid');
if (!live.cssHasPseudoSpace) failures.push('cssText missing --_p-text-list-e columns');
if (!live.cssHasNestedDash) failures.push('cssText missing nested en-dash var');
if (!live.cssHasLastChild) failures.push('cssText missing last-child grid-column');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout-affecting .root wrapper leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (!live.slotted.includes('ABC')) failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (live.role !== 'listitem') failures.push(`role ${live.role}`);
if (live.hostDisplay !== 'grid') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 4)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (nested.lastTag !== 'SPAN') failures.push(`nested last ${nested.lastTag}`);
if (nested.lastGridColumn !== '2' && nested.lastGridColumn !== '2 / auto') {
  failures.push(`last-child grid-column ${nested.lastGridColumn}`);
}
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, nested, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
