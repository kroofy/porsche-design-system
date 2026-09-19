import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/banner.html');
await page.waitForFunction(() => customElements.get('lit-banner'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-banner');
  const pop = el?.shadowRoot?.querySelector('[popover]');
  return !!pop?.matches(':popover-open') && !!el.shadowRoot.querySelector('.notification');
});
await page.waitForFunction(() => {
  const el = document.querySelector('#slotted lit-banner');
  const slot = el?.shadowRoot?.querySelector('slot[name="heading"]');
  return !!slot && slot.assignedNodes().length > 0;
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-banner');
  const sr = el.shadowRoot;
  const pop = sr?.querySelector('[popover]');
  const root = sr?.querySelector('.notification');
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const heading = root?.querySelector('h2,h5,h1,h3,h4,h6');
  const desc = root?.querySelector('p');
  const infoRef = document.querySelector('#info-ref');
  const computed = root ? getComputedStyle(root) : null;
  const popComputed = pop ? getComputedStyle(pop) : null;
  const before = root ? getComputedStyle(root, '::before') : null;
  return {
    isDefined: !!customElements.get('lit-banner'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasFrosted: css.includes('var(--p-color-info-frosted)'),
    cssHasMask: css.includes('data:image/svg+xml'),
    cssHasForcedColors: css.includes('forced-colors'),
    cssHasCanvasText: css.includes('CanvasText'),
    cssHas760: css.includes('min-width:760px'),
    cssHasPopover: css.includes('[popover]'),
    cssHasShadow: css.includes('var(--p-shadow-lg)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootClass: root?.className ?? null,
    popoverOpen: !!pop?.matches(':popover-open'),
    popoverAttr: pop?.getAttribute('popover') ?? null,
    inert: pop?.hasAttribute('inert') ?? null,
    role: pop?.getAttribute('role'),
    ariaLive: pop?.getAttribute('aria-live'),
    ariaLabel: pop?.getAttribute('aria-label'),
    headingTag: heading?.tagName ?? null,
    headingText: heading?.textContent ?? '',
    descText: desc?.textContent ?? '',
    hasDismiss: !!root?.querySelector('button.dismiss'),
    dismissLabel: root?.querySelector('button.dismiss span')?.textContent ?? '',
    innerLit: !!sr?.querySelector('lit-button-pure,lit-icon,lit-spinner,lit-button'),
    background: computed?.backgroundColor ?? null,
    backgroundRef: infoRef ? getComputedStyle(infoRef).backgroundColor : null,
    backgroundMatch: root && infoRef ? computed.backgroundColor === getComputedStyle(infoRef).backgroundColor : false,
    beforeWidth: before?.width ?? null,
    hostDisplay: getComputedStyle(el).display,
    popDisplay: popComputed?.display ?? null,
    popPosition: popComputed?.position ?? null,
    popTransform: popComputed?.transform ?? null,
    boxShadow: computed?.boxShadow ?? null,
    opacity: computed?.opacity ?? null,
  };
});

const closed = await page.evaluate(() => {
  const el = document.querySelector('#closed lit-banner');
  const pop = el.shadowRoot?.querySelector('[popover]');
  return {
    popoverOpen: !!pop?.matches(':popover-open'),
    inert: pop?.hasAttribute('inert') ?? null,
    display: pop ? getComputedStyle(pop).display : null,
  };
});

const noDismiss = await page.evaluate(() => {
  const el = document.querySelector('#no-dismiss lit-banner');
  return {
    hasDismiss: !!el.shadowRoot?.querySelector('button.dismiss'),
    cssHasDismiss: !!el.shadowRoot?.querySelector('style')?.textContent?.includes('.dismiss{'),
    popoverOpen: !!el.shadowRoot?.querySelector('[popover]')?.matches(':popover-open'),
  };
});

const slotted = await page.evaluate(() => {
  const el = document.querySelector('#slotted lit-banner');
  const headingSlot = el.shadowRoot?.querySelector('slot[name="heading"]');
  const descSlot = el.shadowRoot?.querySelector('slot[name="description"]');
  return {
    headingAssigned: headingSlot ? headingSlot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    descAssigned: descSlot ? descSlot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    hasP: !!el.shadowRoot?.querySelector('p'),
  };
});

const errorState = await page.evaluate(() => {
  const el = document.querySelector('#error lit-banner');
  const pop = el.shadowRoot?.querySelector('[popover]');
  const root = el.shadowRoot?.querySelector('.notification');
  const errorRef = document.querySelector('#error-ref');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    role: pop?.getAttribute('role'),
    cssHasError: css.includes('var(--p-color-error-frosted)'),
    backgroundMatch: root && errorRef ? getComputedStyle(root).backgroundColor === getComputedStyle(errorRef).backgroundColor : false,
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-banner')).display);

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#closed lit-banner');
  const pop = el.shadowRoot?.querySelector('[popover]');
  const beforeOpen = pop?.matches(':popover-open');
  el.setAttribute('open', 'true');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const afterPop = el.shadowRoot?.querySelector('[popover]');
        resolve({
          beforeOpen,
          afterOpen: !!afterPop?.matches(':popover-open'),
        });
      }),
    );
  });
});

const positionCss = await page.evaluate(() => {
  const el = document.querySelector('#position-json lit-banner');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const pop = el.shadowRoot?.querySelector('[popover]');
  const computed = pop ? getComputedStyle(pop) : null;
  return {
    cssHas760: css.includes('min-width:760px'),
    cssHas1000: css.includes('min-width:1000px'),
    cssHasBottomBase: css.includes('inset-block:auto var(--p-banner-bottom'),
    cssHasTopAtS: css.includes('min-width:760px') && css.includes('--p-banner-top'),
    insetBlockStart: computed?.insetBlockStart ?? null,
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-banner is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasFrosted) failures.push('cssText missing info-frosted');
if (!live.cssHasMask) failures.push('cssText missing svg mask');
if (!live.cssHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssHasCanvasText) failures.push('cssText missing CanvasText');
if (!live.cssHas760) failures.push('cssText missing 760px breakpoint');
if (!live.cssHasPopover) failures.push('cssText missing [popover]');
if (!live.cssHasShadow) failures.push('cssText missing shadow-lg');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootClass !== 'notification') failures.push(`root class ${live.rootClass}`);
if (!live.popoverOpen) failures.push('open host is not :popover-open');
if (live.popoverAttr !== 'manual') failures.push(`popover ${live.popoverAttr}`);
if (live.inert) failures.push('open host is inert');
if (live.role !== 'status') failures.push(`role ${live.role}`);
if (live.ariaLive !== 'polite') failures.push(`aria-live ${live.ariaLive}`);
if (live.ariaLabel !== 'Some heading') failures.push(`aria-label ${live.ariaLabel}`);
if (live.headingTag !== 'H3') failures.push(`heading tag ${live.headingTag}`);
if (live.headingText !== 'Some heading') failures.push(`heading text ${live.headingText}`);
if (live.descText !== 'Some content') failures.push(`desc ${live.descText}`);
if (!live.hasDismiss) failures.push('default missing dismiss');
if (live.dismissLabel !== 'Close banner') failures.push(`dismiss label ${live.dismissLabel}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (!live.backgroundMatch) failures.push(`background ${live.background} != ref ${live.backgroundRef}`);
if (!(live.beforeWidth === '24px' || live.beforeWidth === '1.5rem')) {
  failures.push(`::before width ${live.beforeWidth}`);
}
if (live.hostDisplay !== 'contents') failures.push(`host display ${live.hostDisplay}`);
if (live.popDisplay !== 'grid') failures.push(`open popover display ${live.popDisplay}`);
if (live.popPosition !== 'fixed') failures.push(`popover position ${live.popPosition}`);
if (live.opacity !== '1') failures.push(`opacity ${live.opacity}`);
if (!live.boxShadow || live.boxShadow === 'none') failures.push(`box-shadow ${live.boxShadow}`);
if (closed.popoverOpen) failures.push('closed host is :popover-open');
if (!closed.inert) failures.push('closed host is not inert');
if (closed.display !== 'none') failures.push(`closed display ${closed.display}`);
if (noDismiss.hasDismiss) failures.push('dismiss-button=false still rendered dismiss');
if (noDismiss.cssHasDismiss) failures.push('dismiss-button=false still has .dismiss CSS');
if (!noDismiss.popoverOpen) failures.push('no-dismiss open host is not :popover-open');
if (!slotted.headingAssigned.includes('Slot heading')) failures.push(`heading slot ${JSON.stringify(slotted.headingAssigned)}`);
if (!slotted.descAssigned.includes('Slot body')) failures.push(`description slot ${JSON.stringify(slotted.descAssigned)}`);
if (slotted.hasP) failures.push('slotted host rendered description <p>');
if (errorState.role !== 'alert') failures.push(`error role ${errorState.role}`);
if (!errorState.cssHasError) failures.push('error missing error-frosted');
if (!errorState.backgroundMatch) failures.push('error background mismatch');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (attrChange.beforeOpen) failures.push('closed host started open');
if (!attrChange.afterOpen) failures.push('open attribute after connect did not showPopover');
if (!positionCss.cssHas760) failures.push('position json missing 760px');
if (positionCss.cssHas1000) failures.push('default position compiled an m/1000 rule');
if (!positionCss.cssHasBottomBase) failures.push('position missing base bottom');
if (!positionCss.cssHasTopAtS) failures.push('position missing s/top');
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  closed,
  noDismiss,
  slotted,
  errorState,
  hidden,
  attrChange,
  positionCss,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
