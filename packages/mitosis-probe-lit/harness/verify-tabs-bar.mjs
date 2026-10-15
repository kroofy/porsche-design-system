import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/tabs-bar.html');
await page.waitForFunction(() => customElements.get('lit-tabs-bar'));
await page.waitForFunction(() => document.querySelector('#default lit-tabs-bar')?.shadowRoot?.querySelector('p-scroller'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-tabs-bar');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const scroller = sr?.querySelector('p-scroller');
  const slot = sr?.querySelector('slot:not([name])');
  const bar = sr?.querySelector('.bar');
  return {
    isDefined: !!customElements.get('lit-tabs-bar'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostGrid: css.includes(':host{display:grid}'),
    cssHasWrapContents: css.includes('.wrap{display:contents}'),
    cssHasSlotted: css.includes('::slotted(a),::slotted(button)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    hasDefaultSlot: !!slot,
    scrollerTag: scroller?.tagName ?? null,
    scrollerClass: scroller?.className ?? null,
    barClass: bar?.className ?? null,
    hostDisplay: getComputedStyle(el).display,
    innerLit: !!sr?.querySelector('lit-scroller,lit-icon'),
    slotted: slot ? slot.assignedElements().map((n) => n.tagName) : [],
    tabRole: el.querySelector('button')?.getAttribute('role'),
    ariaSelected: [...el.querySelectorAll('button')].map((n) => n.getAttribute('aria-selected')),
  };
});

const links = await page.evaluate(() => {
  const el = document.querySelector('#links lit-tabs-bar');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const tabs = [...el.querySelectorAll('a')];
  return {
    cssHasNth2: css.includes('::slotted(a:nth-child(2))'),
    ariaCurrent: tabs.map((n) => n.getAttribute('aria-current')),
    scrollerAria: el.shadowRoot?.querySelector('p-scroller')?.aria,
  };
});

const canvas = await page.evaluate(() => {
  const el = document.querySelector('#canvas lit-tabs-bar');
  const scroller = el.shadowRoot?.querySelector('.scroller');
  const ref = document.querySelector('#canvas-ref');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasCanvas: css.includes('background:var(--p-color-canvas)'),
    cssHasNth3: css.includes('nth-child(3)'),
    colorMatch: scroller && ref ? getComputedStyle(scroller).backgroundColor === getComputedStyle(ref).backgroundColor : false,
  };
});

const medium = await page.evaluate(() => {
  const el = document.querySelector('#medium lit-tabs-bar');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const btn = el.querySelector('button');
  const ref = document.querySelector('#md-ref');
  return {
    cssHasMd: css.includes('font-size:var(--p-typescale-md)'),
    fontMatch: btn && ref ? getComputedStyle(btn).fontSize === getComputedStyle(ref).fontSize : false,
  };
});

const hideSize = await page.evaluate(() => {
  const css = document.querySelector('#hide-size lit-tabs-bar')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasMedia: css.includes('@media(min-width:1000px){::slotted(a),::slotted(button){font-size:var(--p-typescale-md)'),
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-tabs-bar')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-tabs-bar is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostGrid) failures.push('cssText missing :host grid');
if (!live.cssHasWrapContents) failures.push('cssText missing wrap display:contents');
if (!live.cssHasSlotted) failures.push('cssText missing ::slotted tabs');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.scrollerTag !== 'P-SCROLLER') failures.push(`scroller tag ${live.scrollerTag}`);
if (!String(live.scrollerClass).includes('scroller')) failures.push(`scroller class ${live.scrollerClass}`);
if (live.barClass !== 'bar') failures.push(`bar class ${live.barClass}`);
if (live.hostDisplay !== 'grid') failures.push(`host display ${live.hostDisplay}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (live.slotted.join() !== 'BUTTON,BUTTON,BUTTON') failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (live.tabRole !== 'tab') failures.push(`tab role ${live.tabRole}`);
if (live.ariaSelected.join() !== 'false,false,false') failures.push(`aria-selected ${live.ariaSelected}`);
if (!links.cssHasNth2) failures.push('links missing nth-child(2) active');
if (links.ariaCurrent.join() !== 'false,true,false') failures.push(`aria-current ${links.ariaCurrent}`);
if (!canvas.cssHasCanvas) failures.push('canvas missing scroller background');
if (!canvas.cssHasNth3) failures.push('canvas missing nth-child(3)');
if (!canvas.colorMatch) failures.push('canvas background mismatch');
if (!medium.cssHasMd) failures.push('medium missing typescale-md');
if (!medium.fontMatch) failures.push('medium font-size mismatch');
if (!hideSize.cssHasMedia) failures.push('size breakpoint missing m=1000');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, links, canvas, medium, hideSize, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
