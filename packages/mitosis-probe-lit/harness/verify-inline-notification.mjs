import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/inline-notification.html');
await page.waitForFunction(() => customElements.get('lit-inline-notification'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-inline-notification');
  return !!el?.shadowRoot?.querySelector('.notification');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-inline-notification');
  const sr = el.shadowRoot;
  const root = sr?.querySelector('.notification');
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const heading = root?.querySelector('h2,h5,h1,h3,h4,h6');
  const desc = root?.querySelector('p');
  const infoRef = document.querySelector('#info-ref');
  const computed = root ? getComputedStyle(root) : null;
  const before = root ? getComputedStyle(root, '::before') : null;
  return {
    isDefined: !!customElements.get('lit-inline-notification'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasFrosted: css.includes('var(--p-color-info-frosted)'),
    cssHasMask: css.includes('data:image/svg+xml'),
    cssHasForcedColors: css.includes('forced-colors'),
    cssHasCanvasText: css.includes('CanvasText'),
    cssHas760: css.includes('min-width:760px'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootClass: root?.className ?? null,
    role: root?.getAttribute('role'),
    ariaLive: root?.getAttribute('aria-live'),
    ariaLabel: root?.getAttribute('aria-label'),
    headingTag: heading?.tagName ?? null,
    headingText: heading?.textContent ?? '',
    descText: desc?.textContent ?? '',
    hasDismiss: !!root?.querySelector('button.dismiss'),
    innerLitAction: !!root?.querySelector('lit-button-pure,lit-icon,lit-spinner,lit-button'),
    background: computed?.backgroundColor ?? null,
    backgroundRef: infoRef ? getComputedStyle(infoRef).backgroundColor : null,
    backgroundMatch: root && infoRef ? computed.backgroundColor === getComputedStyle(infoRef).backgroundColor : false,
    beforeWidth: before?.width ?? null,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const descriptionOnly = await page.evaluate(() => {
  const el = document.querySelector('#description-only lit-inline-notification');
  const root = el.shadowRoot?.querySelector('.notification');
  return {
    heading: !!root?.querySelector('h1,h2,h3,h4,h5,h6,slot[name="heading"]'),
    desc: root?.querySelector('p')?.textContent ?? '',
    hasDismiss: !!root?.querySelector('button.dismiss'),
  };
});

const noDismiss = await page.evaluate(() => {
  const el = document.querySelector('#no-dismiss lit-inline-notification');
  return {
    hasDismiss: !!el.shadowRoot?.querySelector('button.dismiss'),
    cssHasDismiss: !!el.shadowRoot?.querySelector('style')?.textContent?.includes('.dismiss{'),
  };
});

const slotted = await page.evaluate(() => {
  const el = document.querySelector('#slotted lit-inline-notification');
  const headingSlot = el.shadowRoot?.querySelector('slot[name="heading"]');
  const defaultSlot = el.shadowRoot?.querySelector('slot:not([name])');
  return {
    headingAssigned: headingSlot ? headingSlot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    bodyAssigned: defaultSlot ? defaultSlot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    hasP: !!el.shadowRoot?.querySelector('p'),
  };
});

const action = await page.evaluate(() => {
  const el = document.querySelector('#action lit-inline-notification');
  const btn = el.shadowRoot?.querySelector('.action');
  return {
    tag: btn?.tagName ?? null,
    icon: btn?.getAttribute('icon'),
    text: btn?.textContent?.trim() ?? '',
    isLit: btn?.tagName?.startsWith('LIT-') ?? false,
  };
});

const loading = await page.evaluate(() => {
  const el = document.querySelector('#loading lit-inline-notification');
  const btn = el.shadowRoot?.querySelector('.action');
  return {
    tag: btn?.tagName ?? null,
    loading: btn?.hasAttribute('loading') || btn?.loading === true || btn?.getAttribute('loading') === 'true',
    isLit: btn?.tagName?.startsWith('LIT-') ?? false,
  };
});

const errorState = await page.evaluate(() => {
  const el = document.querySelector('#error lit-inline-notification');
  const root = el.shadowRoot?.querySelector('.notification');
  const errorRef = document.querySelector('#error-ref');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    role: root?.getAttribute('role'),
    cssHasError: css.includes('var(--p-color-error-frosted)'),
    backgroundMatch: root && errorRef ? getComputedStyle(root).backgroundColor === getComputedStyle(errorRef).backgroundColor : false,
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-inline-notification')).display);

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-inline-notification');
  const before = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  el.setAttribute('state', 'error');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.setAttribute('state', 'info');
        resolve({ beforeHasError: before.includes('error-frosted'), afterHasError: after.includes('var(--p-color-error-frosted)') });
      }),
    );
  });
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-inline-notification is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasFrosted) failures.push('cssText missing info-frosted');
if (!live.cssHasMask) failures.push('cssText missing svg mask');
if (!live.cssHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssHasCanvasText) failures.push('cssText missing CanvasText');
if (!live.cssHas760) failures.push('cssText missing 760px breakpoint');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootClass !== 'notification') failures.push(`root class ${live.rootClass}`);
if (live.role !== 'status') failures.push(`role ${live.role}`);
if (live.ariaLive !== 'polite') failures.push(`aria-live ${live.ariaLive}`);
if (live.ariaLabel !== 'Some heading') failures.push(`aria-label ${live.ariaLabel}`);
if (live.headingTag !== 'H2') failures.push(`heading tag ${live.headingTag}`);
if (live.headingText !== 'Some heading') failures.push(`heading text ${live.headingText}`);
if (live.descText !== 'Some content') failures.push(`desc ${live.descText}`);
if (!live.hasDismiss) failures.push('default missing dismiss');
if (live.innerLitAction) failures.push('nested control was swapped to a lit-* tag');
if (!live.backgroundMatch) failures.push(`background ${live.background} != ref ${live.backgroundRef}`);
if (!(live.beforeWidth === '24px' || live.beforeWidth === '1.5rem')) {
  failures.push(`::before width ${live.beforeWidth}`);
}
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (descriptionOnly.heading) failures.push('description-only rendered a heading');
if (descriptionOnly.desc !== 'Some content') failures.push(`description-only ${descriptionOnly.desc}`);
if (!descriptionOnly.hasDismiss) failures.push('description-only missing dismiss');
if (noDismiss.hasDismiss) failures.push('dismiss-button=false still rendered dismiss');
if (noDismiss.cssHasDismiss) failures.push('dismiss-button=false still has .dismiss CSS');
if (!slotted.headingAssigned.includes('Slot heading')) failures.push(`heading slot ${JSON.stringify(slotted.headingAssigned)}`);
if (!slotted.bodyAssigned.some((t) => t.includes('Slot body'))) failures.push(`default slot ${JSON.stringify(slotted.bodyAssigned)}`);
if (slotted.hasP) failures.push('slotted host rendered description <p>');
if (action.tag !== 'P-BUTTON-PURE') failures.push(`action tag ${action.tag}`);
if (action.isLit) failures.push('action was lit-button-pure');
if (action.icon !== 'car') failures.push(`action icon ${action.icon}`);
if (action.text !== 'Some action') failures.push(`action text ${action.text}`);
if (loading.tag !== 'P-BUTTON-PURE') failures.push(`loading action tag ${loading.tag}`);
if (!loading.loading) failures.push('action-loading did not set loading on p-button-pure');
if (loading.isLit) failures.push('loading action was a lit-* tag');
if (errorState.role !== 'alert') failures.push(`error role ${errorState.role}`);
if (!errorState.cssHasError) failures.push('error missing error-frosted');
if (!errorState.backgroundMatch) failures.push('error background mismatch');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterHasError) failures.push('attribute change after connect not reactive');
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  descriptionOnly,
  noDismiss,
  slotted,
  action,
  loading,
  errorState,
  hidden,
  attrChange,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
