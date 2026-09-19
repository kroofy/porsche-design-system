import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/scroller.html');
await page.waitForFunction(() => customElements.get('lit-scroller'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-scroller');
  const scroll = el?.shadowRoot?.querySelector('.scroll');
  const next = el?.shadowRoot?.querySelector('.next');
  if (!scroll || !next) return false;
  return scroll.scrollWidth > scroll.clientWidth + 1 && getComputedStyle(next).opacity === '1';
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-scroller');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const scroll = sr?.querySelector('.scroll');
  const next = sr?.querySelector('.next');
  const prev = sr?.querySelector('.prev');
  const slot = sr?.querySelector('slot:not([name])');
  const ref = document.querySelector('#primary-ref');
  const after = next ? getComputedStyle(next, '::after') : null;
  return {
    isDefined: !!customElements.get('lit-scroller'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasForcedColors: css.includes('forced-colors'),
    cssHasCanvasText: css.includes('CanvasText'),
    cssHasMask: css.includes('-webkit-mask') || css.includes('mask:'),
    cssHasRightFade: css.includes('black 0%'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    hasDefaultSlot: !!slot,
    slotted: slot ? slot.assignedElements().map((n) => n.tagName) : [],
    hostDisplay: getComputedStyle(el).display,
    nextOpacity: next ? getComputedStyle(next).opacity : null,
    prevOpacity: prev ? getComputedStyle(prev).opacity : null,
    overflows: scroll ? scroll.scrollWidth > scroll.clientWidth + 1 : false,
    afterBg: after?.backgroundColor ?? null,
    afterBgMatch:
      after && ref ? after.backgroundColor === getComputedStyle(ref).backgroundColor : false,
    innerLit: !!sr?.querySelector('lit-icon,lit-button,lit-button-pure'),
    tabIndex: scroll?.getAttribute('tabindex'),
  };
});

const scrollbar = await page.evaluate(() => {
  const el = document.querySelector('#scrollbar lit-scroller');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const scroll = el.shadowRoot?.querySelector('.scroll');
  return {
    cssHasThin: css.includes('scrollbar-width:thin') || css.includes('scrollbar-width: thin'),
    cssHasBarPad: css.includes('calc(4px + 12px)'),
    paddingBottom: scroll ? getComputedStyle(scroll).paddingBottom : null,
  };
});

const fits = await page.evaluate(() => {
  const el = document.querySelector('#fits lit-scroller');
  const scroll = el.shadowRoot?.querySelector('.scroll');
  const next = el.shadowRoot?.querySelector('.next');
  return {
    overflows: scroll ? scroll.scrollWidth > scroll.clientWidth + 1 : null,
    nextOpacity: next ? getComputedStyle(next).opacity : null,
    cssHasMask: (el.shadowRoot?.querySelector('style')?.textContent ?? '').includes('linear-gradient(to right'),
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-scroller')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-scroller is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssHasCanvasText) failures.push('cssText missing CanvasText');
if (!live.cssHasMask) failures.push('cssText missing mask on overflow');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.slotted.length < 6) failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (!live.overflows) failures.push('default fixture does not overflow');
if (live.nextOpacity !== '1') failures.push(`next opacity ${live.nextOpacity}`);
if (live.prevOpacity !== '0') failures.push(`prev opacity ${live.prevOpacity}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (live.tabIndex !== '0') failures.push(`tabindex ${live.tabIndex}`);
if (!scrollbar.cssHasThin) failures.push('scrollbar missing thin');
if (!scrollbar.cssHasBarPad) failures.push('scrollbar missing pad');
if (fits.overflows) failures.push('fits fixture overflows');
if (fits.nextOpacity !== '0') failures.push(`fits next opacity ${fits.nextOpacity}`);
if (fits.cssHasMask) failures.push('fits fixture still has fade mask');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, scrollbar, fits, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
