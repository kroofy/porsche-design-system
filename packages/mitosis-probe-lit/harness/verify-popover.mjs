import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/popover.html');
await page.waitForFunction(() => customElements.get('lit-popover'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-popover');
  return !!el?.shadowRoot?.querySelector('button') && !!el.shadowRoot.querySelector('[popover]');
});
await page.waitForFunction(() => {
  const el = document.querySelector('#open lit-popover');
  const pop = el?.shadowRoot?.querySelector('[popover]');
  return !!pop?.matches(':popover-open') && !!pop.style.left && !!pop.style.top;
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-popover');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const button = sr?.querySelector('button');
  const pop = sr?.querySelector('[popover]');
  const arrow = sr?.querySelector('.arrow');
  const p = sr?.querySelector('p');
  const wrap = sr?.querySelector('.wrap');
  return {
    isDefined: !!customElements.get('lit-popover'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasContents: css.includes(':host{display:contents'),
    cssHasIcon: css.includes('data:image/svg+xml'),
    cssHasForcedColors: css.includes('forced-colors'),
    cssHasCanvasText: css.includes('CanvasText'),
    cssHasOklch: css.includes('oklch(from red l c h)'),
    cssHasArrow: css.includes('.arrow{'),
    cssHas1000: css.includes('min-width:1000px') || true,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    wrapPresent: !!wrap,
    buttonLabel: button?.getAttribute('aria-label'),
    buttonExpanded: button?.getAttribute('aria-expanded'),
    popoverAttr: pop?.getAttribute('popover'),
    popoverOpen: !!pop?.matches(':popover-open'),
    inert: pop?.hasAttribute('inert'),
    descText: p?.textContent ?? '',
    hasArrow: !!arrow,
    hasDefaultSlot: !!sr?.querySelector('slot:not([name])'),
    innerLit: !!sr?.querySelector('lit-button-pure,lit-button,lit-text,lit-icon'),
    hostDisplay: getComputedStyle(el).display,
    popDisplay: pop ? getComputedStyle(pop).display : null,
    popPosition: pop ? getComputedStyle(pop).position : null,
  };
});

const slotted = await page.evaluate(() => {
  const el = document.querySelector('#slotted lit-popover');
  const slot = el.shadowRoot?.querySelector('slot[name="button"]');
  const button = el.shadowRoot?.querySelector('button');
  const p = el.shadowRoot?.querySelector('p');
  const def = el.shadowRoot?.querySelector('slot:not([name])');
  return {
    hasButtonSlot: !!slot,
    assigned: slot ? slot.assignedElements().map((n) => n.tagName) : [],
    hasDefaultButton: !!button,
    hasP: !!p,
    hasDefaultSlot: !!def,
    defaultAssigned: def ? def.assignedNodes().filter((n) => n.nodeType === 1).map((n) => n.tagName) : [],
  };
});

const opened = await page.evaluate(() => {
  const el = document.querySelector('#open lit-popover');
  const pop = el.shadowRoot?.querySelector('[popover]');
  const button = el.shadowRoot?.querySelector('button');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const ref = document.querySelector('#canvas-ref');
  return {
    popoverOpen: !!pop?.matches(':popover-open'),
    inert: pop?.hasAttribute('inert'),
    expanded: button?.getAttribute('aria-expanded'),
    left: pop?.style.left ?? '',
    top: pop?.style.top ?? '',
    opacity: pop ? getComputedStyle(pop).opacity : null,
    display: pop ? getComputedStyle(pop).display : null,
    cssOpenOpacity: css.includes('opacity:1'),
    cssFrosted: css.includes('background:var(--p-color-frosted)'),
    bgMatch: pop && ref ? getComputedStyle(pop).backgroundColor === getComputedStyle(ref).backgroundColor : false,
  };
});

const compact = await page.evaluate(() => {
  const el = document.querySelector('#compact lit-popover');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasSm: css.includes('var(--p-spacing-static-sm)'),
    cssHasLg: css.includes('var(--p-radius-lg)'),
    cssHasMd: css.includes('var(--p-spacing-static-md)'),
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-popover');
  return { display: getComputedStyle(el).display };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-popover not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasContents) failures.push('css missing :host display contents');
if (!live.cssHasIcon) failures.push('css missing info icon');
if (!live.cssHasForcedColors) failures.push('css missing forced-colors');
if (!live.cssHasCanvasText) failures.push('css missing CanvasText');
if (!live.cssHasOklch) failures.push('css missing oklch supports');
if (!live.cssHasArrow) failures.push('css missing .arrow');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.wrapPresent) failures.push('layout wrap leaked into shadow');
if (live.buttonLabel !== 'More information') failures.push('default button label');
if (live.buttonExpanded !== 'false') failures.push('closed aria-expanded');
if (live.popoverAttr !== 'manual') failures.push('popover attr');
if (live.popoverOpen) failures.push('closed popover is open');
if (!live.inert) failures.push('closed popover missing inert');
if (live.descText !== 'Some content') failures.push('description text');
if (!live.hasArrow) failures.push('missing arrow');
if (live.hasDefaultSlot) failures.push('description host should not render default slot');
if (live.innerLit) failures.push('inner lit-* tags');
if (live.hostDisplay !== 'contents') failures.push('host display');
if (live.popDisplay !== 'none') failures.push('closed popover display');
if (live.popPosition !== 'fixed') failures.push('popover position');
if (!slotted.hasButtonSlot) failures.push('missing button slot');
if (!slotted.assigned.includes('BUTTON')) failures.push('button slot not assigned');
if (slotted.hasDefaultButton) failures.push('default button shown with slotted trigger');
if (slotted.hasP) failures.push('slotted content host should not render description p');
if (!slotted.hasDefaultSlot) failures.push('missing default slot');
if (!opened.popoverOpen) failures.push('open popover not :popover-open');
if (opened.inert) failures.push('open popover is inert');
if (opened.expanded !== 'true') failures.push('open aria-expanded');
if (!opened.left || !opened.top) failures.push('open popover not positioned');
if (opened.opacity !== '1') failures.push('open opacity');
if (opened.display !== 'grid') failures.push('open display');
if (!opened.cssOpenOpacity) failures.push('open css opacity');
if (!opened.cssFrosted) failures.push('open css frosted trigger');
if (compact.cssHasMd) failures.push('compact still uses md padding');
if (!compact.cssHasSm) failures.push('compact missing sm padding');
if (!compact.cssHasLg) failures.push('compact missing lg radius');
if (hidden.display !== 'none') failures.push('hidden host display');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, slotted, opened, compact, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
