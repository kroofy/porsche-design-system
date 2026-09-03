import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/tabs.html');
await page.waitForFunction(() => customElements.get('lit-tabs'));
await page.waitForFunction(() => document.querySelector('#default lit-tabs')?.shadowRoot?.querySelector('p-tabs-bar'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-tabs');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const wrap = sr?.querySelector('.wrap');
  const bar = sr?.querySelector('p-tabs-bar');
  const slot = sr?.querySelector('slot:not([name])');
  const items = [...el.querySelectorAll(':scope > p-tabs-item')];
  return {
    isDefined: !!customElements.get('lit-tabs'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostBlock: css.includes(':host{display:block}'),
    cssHasRootMargin: css.includes('.root{margin-bottom:var(--p-spacing-static-sm)}'),
    cssHasWrapContents: css.includes('.wrap{display:contents}'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    wrapDisplay: wrap ? getComputedStyle(wrap).display : null,
    hostDisplay: getComputedStyle(el).display,
    barTag: bar?.tagName ?? null,
    barClass: bar?.className ?? null,
    barSize: bar?.getAttribute('size') ?? bar?.size,
    barBackground: bar?.getAttribute('background') ?? bar?.background,
    barActive: bar?.activeTabIndex,
    buttons: [...(bar?.querySelectorAll(':scope > button') ?? [])].map((n) => n.textContent),
    hasDefaultSlot: !!slot,
    innerLit: !!sr?.querySelector('lit-tabs-bar,lit-tabs-item,lit-text,lit-scroller'),
    slotted: slot ? slot.assignedElements().map((n) => n.tagName) : [],
    itemRoles: items.map((n) => n.getAttribute('role')),
    itemHidden: items.map((n) => n.hasAttribute('hidden')),
    itemTabIndex: items.map((n) => n.getAttribute('tabindex')),
  };
});

const canvas = await page.evaluate(() => {
  const el = document.querySelector('#canvas lit-tabs');
  const bar = el.shadowRoot?.querySelector('p-tabs-bar');
  return {
    barBackground: bar?.getAttribute('background') ?? bar?.background,
  };
});

const medium = await page.evaluate(() => {
  const el = document.querySelector('#medium lit-tabs');
  const bar = el.shadowRoot?.querySelector('p-tabs-bar');
  return {
    barSize: bar?.getAttribute('size') ?? bar?.size,
  };
});

const hideSize = await page.evaluate(() => {
  const el = document.querySelector('#hide-size lit-tabs');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const bar = el.shadowRoot?.querySelector('p-tabs-bar');
  return {
    cssHasMedia: css.includes('@media(min-width:1000px){:host{--_p-tabs-size:medium}}'),
    barSize: bar?.getAttribute('size') ?? bar?.size,
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-tabs')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-tabs is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostBlock) failures.push('cssText missing :host block');
if (!live.cssHasRootMargin) failures.push('cssText missing .root margin');
if (!live.cssHasWrapContents) failures.push('cssText missing wrap display:contents');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.wrapDisplay !== 'contents') failures.push(`wrap display ${live.wrapDisplay}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (live.barTag !== 'P-TABS-BAR') failures.push(`bar tag ${live.barTag}`);
if (!String(live.barClass).includes('root')) failures.push(`bar class ${live.barClass}`);
if (live.barSize !== 'small') failures.push(`bar size ${live.barSize}`);
if (live.barBackground !== 'none') failures.push(`bar background ${live.barBackground}`);
if (Number(live.barActive) !== 0) failures.push(`bar active ${live.barActive}`);
if (live.buttons.join() !== 'Some label (1),Some label (2),Some label (3)') {
  failures.push(`buttons ${JSON.stringify(live.buttons)}`);
}
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (live.slotted.join() !== 'P-TABS-ITEM,P-TABS-ITEM,P-TABS-ITEM') {
  failures.push(`slotted ${JSON.stringify(live.slotted)}`);
}
if (live.itemRoles.join() !== 'tabpanel,tabpanel,tabpanel') failures.push(`item roles ${live.itemRoles}`);
if (live.itemHidden.join() !== 'false,true,true') failures.push(`item hidden ${live.itemHidden}`);
if (live.itemTabIndex.join() !== '0,,') failures.push(`item tabindex ${live.itemTabIndex}`);
if (canvas.barBackground !== 'canvas') failures.push(`canvas background ${canvas.barBackground}`);
if (medium.barSize !== 'medium') failures.push(`medium size ${medium.barSize}`);
if (!hideSize.cssHasMedia) failures.push('size breakpoint missing m=1000');
if (hideSize.barSize !== '{"base":"small","m":"medium"}') failures.push(`hide-size bar size ${hideSize.barSize}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, canvas, medium, hideSize, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
