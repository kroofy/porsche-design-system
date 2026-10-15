import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/button.html');
await page.waitForFunction(() => customElements.get('lit-button'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-button');
  return !!el?.shadowRoot?.querySelector('.root');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-button');
  const sr = el.shadowRoot;
  const root = sr?.querySelector('.root');
  const style = sr?.querySelector('style');
  const icon = sr?.querySelector('p-icon');
  const spinner = sr?.querySelector('p-spinner');
  const slot = sr?.querySelector('slot');
  const bgRef = document.querySelector('#bg-ref');
  const fgRef = document.querySelector('#fg-ref');
  const css = root ? getComputedStyle(root) : null;
  return {
    isDefined: !!customElements.get('lit-button'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasRoot: !!style?.textContent?.includes('.root{'),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasButtonText: !!style?.textContent?.includes('ButtonText'),
    cssTextHasPrimary: !!style?.textContent?.includes('var(--p-color-primary)'),
    cssTextHasScale: !!style?.textContent?.includes('--_p-button-a:1'),
    cssTextHasHover: !!style?.textContent?.includes('@media(hover:hover)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootTag: root?.tagName ?? null,
    rootClass: root?.className ?? null,
    buttonType: root?.getAttribute('type'),
    innerIconTag: icon?.tagName ?? null,
    innerIsLitIcon: icon?.tagName === 'LIT-ICON' || spinner?.tagName === 'LIT-SPINNER',
    iconHidden: icon ? getComputedStyle(icon).display === 'none' : false,
    spinnerHidden: spinner ? getComputedStyle(spinner).display === 'none' : false,
    hasSlot: !!slot,
    assigned: slot?.assignedNodes({ flatten: true }).length ?? 0,
    background: css?.backgroundColor ?? null,
    backgroundRef: bgRef ? getComputedStyle(bgRef).backgroundColor : null,
    backgroundMatch: root && bgRef ? css.backgroundColor === getComputedStyle(bgRef).backgroundColor : false,
    color: css?.color ?? null,
    colorRef: fgRef ? getComputedStyle(fgRef).color : null,
    colorMatch: root && fgRef ? css.color === getComputedStyle(fgRef).color : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const secondary = await page.evaluate(() => {
  const el = document.querySelector('#secondary lit-button');
  const style = el.shadowRoot?.querySelector('style');
  const root = el.shadowRoot?.querySelector('.root');
  const bgRef = document.querySelector('#secondary-bg-ref');
  const css = root ? getComputedStyle(root) : null;
  return {
    cssHasFrostedStrong: !!style?.textContent?.includes('var(--p-color-frosted-strong)'),
    backgroundMatch: root && bgRef ? css.backgroundColor === getComputedStyle(bgRef).backgroundColor : false,
  };
});

const destructive = await page.evaluate(() => {
  const el = document.querySelector('#destructive lit-button');
  const style = el.shadowRoot?.querySelector('style');
  const root = el.shadowRoot?.querySelector('.root');
  const bgRef = document.querySelector('#destructive-bg-ref');
  const css = root ? getComputedStyle(root) : null;
  return {
    cssHasError: !!style?.textContent?.includes('var(--p-color-error)'),
    cssHasErrorMedium: !!style?.textContent?.includes('var(--p-color-error-medium)'),
    backgroundMatch: root && bgRef ? css.backgroundColor === getComputedStyle(bgRef).backgroundColor : false,
  };
});

const withIcon = await page.evaluate(() => {
  const el = document.querySelector('#icon lit-button');
  const icon = el.shadowRoot?.querySelector('p-icon');
  return {
    iconName: icon?.getAttribute('name'),
    iconDisplay: icon ? getComputedStyle(icon).display : null,
    innerTag: icon?.tagName ?? null,
  };
});

const hideLabel = await page.evaluate(() => {
  const el = document.querySelector('#hide-label lit-button');
  const style = el.shadowRoot?.querySelector('style');
  const label = el.shadowRoot?.querySelector('.label');
  return {
    cssHasFullRadius: !!style?.textContent?.includes('var(--p-radius-full)'),
    labelOverflow: label ? getComputedStyle(label).overflow : null,
  };
});

const loading = await page.evaluate(() => {
  const el = document.querySelector('#loading lit-button');
  const style = el.shadowRoot?.querySelector('style');
  const icon = el.shadowRoot?.querySelector('p-icon');
  const spinner = el.shadowRoot?.querySelector('p-spinner');
  const msg = el.shadowRoot?.querySelector('.loading');
  const label = el.shadowRoot?.querySelector('.label');
  return {
    cssHasSpinner: !!style?.textContent?.includes('.spinner{'),
    cssHasNoHover: !style?.textContent?.includes('@media(hover:hover)'),
    iconOpacity: icon ? getComputedStyle(icon).opacity : null,
    iconDisplay: icon ? getComputedStyle(icon).display : null,
    spinnerDisplay: spinner ? getComputedStyle(spinner).display : null,
    spinnerTag: spinner?.tagName ?? null,
    spinnerIsLit: spinner?.tagName === 'LIT-SPINNER',
    labelOpacity: label ? getComputedStyle(label).opacity : null,
    loadingText: msg?.textContent,
    ariaDisabled: el.shadowRoot?.querySelector('.root')?.getAttribute('aria-disabled'),
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-button');
  const style = el.shadowRoot?.querySelector('style');
  const root = el.shadowRoot?.querySelector('.root');
  return {
    cssHasOpacity: !!style?.textContent?.includes('opacity:0.4'),
    cssHasNotAllowed: !!style?.textContent?.includes('cursor:not-allowed'),
    cssHasNoHover: !style?.textContent?.includes('@media(hover:hover)'),
    cssHasGrayText: !!style?.textContent?.includes('GrayText'),
    ariaDisabled: root?.getAttribute('aria-disabled'),
    opacity: root ? getComputedStyle(root).opacity : null,
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-button');
  return getComputedStyle(el).display;
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-button');
  const before = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  el.setAttribute('variant', 'destructive');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.setAttribute('variant', 'primary');
        resolve({
          beforeHasError: before.includes('var(--p-color-error)'),
          afterHasError: after.includes('var(--p-color-error)'),
        });
      }),
    );
  });
});

await page.setViewportSize({ width: 999, height: 640 });
const at999 = await page.evaluate(() => {
  const el = document.querySelector('#breakpoint lit-button');
  const label = el.shadowRoot?.querySelector('.label');
  const style = el.shadowRoot?.querySelector('style');
  return {
    labelOverflow: label ? getComputedStyle(label).overflow : null,
    cssHasMedia: !!style?.textContent?.includes('@media(min-width:1000px)'),
    hostWidth: el.getBoundingClientRect().width,
  };
});
await page.setViewportSize({ width: 1000, height: 640 });
const at1000 = await page.evaluate(() => {
  const el = document.querySelector('#breakpoint lit-button');
  const label = el.shadowRoot?.querySelector('.label');
  return {
    labelOverflow: label ? getComputedStyle(label).overflow : null,
    hostWidth: el.getBoundingClientRect().width,
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-button is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasRoot) failures.push('cssText missing .root rules');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasButtonText) failures.push('cssText missing ButtonText');
if (!live.cssTextHasPrimary) failures.push('cssText missing primary token');
if (!live.cssTextHasScale) failures.push('cssText missing --_p-button-a:1');
if (!live.cssTextHasHover) failures.push('cssText missing hover');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootTag !== 'BUTTON') failures.push(`root tag ${live.rootTag}`);
if (live.rootClass !== 'root') failures.push(`root class ${live.rootClass}`);
if (live.buttonType !== 'submit') failures.push(`type ${live.buttonType}`);
if (live.innerIconTag !== 'P-ICON') failures.push(`inner icon ${live.innerIconTag}`);
if (live.innerIsLitIcon) failures.push('inner icon/spinner was swapped to lit-*');
if (!live.iconHidden) failures.push('default icon should be display:none');
if (!live.spinnerHidden) failures.push('default spinner should be display:none');
if (!live.hasSlot) failures.push('no slot');
if (!(live.assigned > 0)) failures.push('slot assigned no nodes');
if (!live.backgroundMatch) failures.push(`bg ${live.background} != ref ${live.backgroundRef}`);
if (!live.colorMatch) failures.push(`color ${live.color} != ref ${live.colorRef}`);
if (live.hostDisplay !== 'inline-block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!secondary.cssHasFrostedStrong) failures.push('secondary missing frosted-strong');
if (!secondary.backgroundMatch) failures.push('secondary background mismatch');
if (!destructive.cssHasError) failures.push('destructive missing error');
if (!destructive.cssHasErrorMedium) failures.push('destructive missing error-medium');
if (!destructive.backgroundMatch) failures.push('destructive background mismatch');
if (withIcon.iconName !== 'car') failures.push(`icon name ${withIcon.iconName}`);
if (withIcon.iconDisplay === 'none') failures.push('icon hidden when named');
if (withIcon.innerTag !== 'P-ICON') failures.push(`icon tag ${withIcon.innerTag}`);
if (!hideLabel.cssHasFullRadius) failures.push('hide-label missing full radius');
if (hideLabel.labelOverflow !== 'hidden') failures.push(`hide-label overflow ${hideLabel.labelOverflow}`);
if (!loading.cssHasSpinner) failures.push('loading missing .spinner');
if (!loading.cssHasNoHover) failures.push('loading still has hover');
if (loading.iconDisplay === 'none') failures.push('loading icon should stay in layout');
if (loading.iconOpacity !== '0') failures.push(`loading icon opacity ${loading.iconOpacity}`);
if (loading.spinnerDisplay === 'none') failures.push('loading spinner hidden');
if (loading.spinnerTag !== 'P-SPINNER') failures.push(`spinner tag ${loading.spinnerTag}`);
if (loading.spinnerIsLit) failures.push('spinner was swapped to lit-spinner');
if (loading.labelOpacity !== '0') failures.push(`loading label opacity ${loading.labelOpacity}`);
if (loading.loadingText !== 'Loading') failures.push(`loading text ${loading.loadingText}`);
if (loading.ariaDisabled !== 'true') failures.push(`loading aria-disabled ${loading.ariaDisabled}`);
if (!disabled.cssHasOpacity) failures.push('disabled missing opacity 0.4');
if (!disabled.cssHasNotAllowed) failures.push('disabled missing not-allowed');
if (!disabled.cssHasNoHover) failures.push('disabled still has hover');
if (!disabled.cssHasGrayText) failures.push('disabled missing GrayText');
if (disabled.ariaDisabled !== 'true') failures.push(`aria-disabled ${disabled.ariaDisabled}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterHasError) failures.push('attribute change after connect not reactive');
if (!at999.cssHasMedia) failures.push('breakpoint css missing 1000px media');
if (at999.labelOverflow !== 'hidden') failures.push(`999 label overflow ${at999.labelOverflow}`);
if (at1000.labelOverflow !== 'visible') failures.push(`1000 label overflow ${at1000.labelOverflow}`);
if (!(at1000.hostWidth > at999.hostWidth)) {
  failures.push(`expected width flip 999=${at999.hostWidth} vs 1000=${at1000.hostWidth}`);
}
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  secondary,
  destructive,
  withIcon,
  hideLabel,
  loading,
  disabled,
  hidden,
  attrChange,
  at999,
  at1000,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
