import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/checkbox.html');
await page.waitForFunction(() => customElements.get('lit-checkbox'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-checkbox');
  return !!el?.shadowRoot?.querySelector('input[type="checkbox"]');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-checkbox');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const input = sr?.querySelector('input');
  const spinner = sr?.querySelector('p-spinner');
  const label = sr?.querySelector('.label');
  const bgRef = document.querySelector('#bg-ref');
  const css = input ? getComputedStyle(input) : null;
  return {
    isDefined: !!customElements.get('lit-checkbox'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasInput: !!style?.textContent?.includes('input{'),
    cssTextHasScale: !!style?.textContent?.includes('--_p-checkbox-scaling:1'),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasChecked: !!style?.textContent?.includes('input:checked'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootClass: sr?.querySelector('.root')?.className ?? null,
    inputType: input?.getAttribute('type'),
    labelText: label?.textContent,
    spinnerHidden: spinner ? getComputedStyle(spinner).display === 'none' : false,
    innerSpinnerTag: spinner?.tagName ?? null,
    innerIsLit: spinner?.tagName === 'LIT-SPINNER',
    backgroundMatch: input && bgRef ? css.backgroundColor === getComputedStyle(bgRef).backgroundColor : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const checked = await page.evaluate(() => {
  const el = document.querySelector('#checked lit-checkbox');
  const input = el.shadowRoot?.querySelector('input');
  const ref = document.querySelector('#checked-ref');
  return {
    nativeChecked: input?.checked,
    backgroundMatch: input && ref ? getComputedStyle(input).backgroundColor === getComputedStyle(ref).backgroundColor : false,
  };
});

const indeterminate = await page.evaluate(() => {
  const el = document.querySelector('#indeterminate lit-checkbox');
  const input = el.shadowRoot?.querySelector('input');
  const style = el.shadowRoot?.querySelector('style');
  return {
    nativeIndeterminate: input?.indeterminate,
    cssHasDash: !!style?.textContent?.includes('m20,11v2H4v-2h16Z'),
  };
});

const loading = await page.evaluate(() => {
  const el = document.querySelector('#loading lit-checkbox');
  const style = el.shadowRoot?.querySelector('style');
  const spinner = el.shadowRoot?.querySelector('p-spinner');
  return {
    cssHasSpinner: !!style?.textContent?.includes('.spinner{'),
    cssHidesChecked: !style?.textContent?.includes('input:checked{'),
    spinnerDisplay: spinner ? getComputedStyle(spinner).display : null,
    spinnerTag: spinner?.tagName ?? null,
    spinnerIsLit: spinner?.tagName === 'LIT-SPINNER',
    ariaDisabled: el.shadowRoot?.querySelector('input')?.getAttribute('aria-disabled'),
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-checkbox');
  const wrap = el.shadowRoot?.querySelector('.input-wrapper');
  return {
    opacity: wrap ? getComputedStyle(wrap).opacity : null,
    ariaDisabled: el.shadowRoot?.querySelector('input')?.getAttribute('aria-disabled'),
  };
});

const success = await page.evaluate(() => {
  const el = document.querySelector('#success lit-checkbox');
  const icon = el.shadowRoot?.querySelector('p-icon');
  const msg = el.shadowRoot?.querySelector('.message');
  const ref = document.querySelector('#success-ref');
  return {
    iconName: icon?.getAttribute('name'),
    iconColor: icon?.getAttribute('color'),
    iconTag: icon?.tagName ?? null,
    iconIsLit: icon?.tagName === 'LIT-ICON',
    text: msg?.textContent?.trim(),
    colorMatch: msg && ref ? getComputedStyle(msg).color === getComputedStyle(ref).color : false,
  };
});

const errorState = await page.evaluate(() => {
  const el = document.querySelector('#error lit-checkbox');
  const icon = el.shadowRoot?.querySelector('p-icon');
  const input = el.shadowRoot?.querySelector('input');
  return {
    iconName: icon?.getAttribute('name'),
    ariaInvalid: input?.getAttribute('aria-invalid'),
  };
});

const hideLabel = await page.evaluate(() => {
  const el = document.querySelector('#hide-label lit-checkbox');
  const wrap = el.shadowRoot?.querySelector('.label-wrapper');
  return { overflow: wrap ? getComputedStyle(wrap).overflow : null };
});

const nolabel = await page.evaluate(() => {
  const el = document.querySelector('#nolabel lit-checkbox');
  const wrap = el.shadowRoot?.querySelector('.label-wrapper');
  return { display: wrap ? getComputedStyle(wrap).display : null };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-checkbox')).display);

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-checkbox');
  const before = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  el.setAttribute('state', 'error');
  el.setAttribute('message', 'Some message.');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.removeAttribute('state');
        el.removeAttribute('message');
        resolve({
          beforeHasError: before.includes('var(--p-color-error)'),
          afterHasError: after.includes('var(--p-color-error-frosted-soft)'),
        });
      }),
    );
  });
});

await page.setViewportSize({ width: 999, height: 640 });
const at999 = await page.evaluate(() => {
  const el = document.querySelector('#breakpoint lit-checkbox');
  const wrap = el.shadowRoot?.querySelector('.label-wrapper');
  const style = el.shadowRoot?.querySelector('style');
  return {
    overflow: wrap ? getComputedStyle(wrap).overflow : null,
    cssHasMedia: !!style?.textContent?.includes('@media(min-width:1000px)'),
    width: el.getBoundingClientRect().width,
  };
});
await page.setViewportSize({ width: 1000, height: 640 });
const at1000 = await page.evaluate(() => {
  const el = document.querySelector('#breakpoint lit-checkbox');
  const wrap = el.shadowRoot?.querySelector('.label-wrapper');
  return {
    overflow: wrap ? getComputedStyle(wrap).overflow : null,
    width: el.getBoundingClientRect().width,
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-checkbox is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasInput) failures.push('cssText missing input rules');
if (!live.cssTextHasScale) failures.push('cssText missing --_p-checkbox-scaling:1');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasChecked) failures.push('cssText missing input:checked');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootClass !== 'root') failures.push(`root class ${live.rootClass}`);
if (live.inputType !== 'checkbox') failures.push(`input type ${live.inputType}`);
if (live.labelText !== 'Some label') failures.push(`label ${live.labelText}`);
if (!live.spinnerHidden) failures.push('default spinner should be display:none');
if (live.innerSpinnerTag !== 'P-SPINNER') failures.push(`spinner ${live.innerSpinnerTag}`);
if (live.innerIsLit) failures.push('spinner was swapped to lit-spinner');
if (!live.backgroundMatch) failures.push('background mismatch');
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!checked.nativeChecked) failures.push('checked input not checked');
if (!checked.backgroundMatch) failures.push('checked background mismatch');
if (!indeterminate.nativeIndeterminate) failures.push('indeterminate property not set');
if (!indeterminate.cssHasDash) failures.push('indeterminate missing dash mask');
if (!loading.cssHasSpinner) failures.push('loading missing .spinner');
if (!loading.cssHidesChecked) failures.push('loading still has checked fill');
if (loading.spinnerDisplay === 'none') failures.push('loading spinner hidden');
if (loading.spinnerTag !== 'P-SPINNER') failures.push(`spinner tag ${loading.spinnerTag}`);
if (loading.spinnerIsLit) failures.push('spinner was swapped to lit-spinner');
if (loading.ariaDisabled !== 'true') failures.push(`loading aria-disabled ${loading.ariaDisabled}`);
if (disabled.opacity !== '0.4') failures.push(`disabled opacity ${disabled.opacity}`);
if (disabled.ariaDisabled !== 'true') failures.push(`aria-disabled ${disabled.ariaDisabled}`);
if (success.iconName !== 'check') failures.push(`success icon ${success.iconName}`);
if (success.iconColor !== 'success') failures.push(`success color attr ${success.iconColor}`);
if (success.iconTag !== 'P-ICON') failures.push(`message icon ${success.iconTag}`);
if (success.iconIsLit) failures.push('message icon was swapped to lit-icon');
if (success.text !== 'Some message.') failures.push(`success text ${success.text}`);
if (!success.colorMatch) failures.push('success color mismatch');
if (errorState.iconName !== 'exclamation') failures.push(`error icon ${errorState.iconName}`);
if (errorState.ariaInvalid !== 'true') failures.push(`aria-invalid ${errorState.ariaInvalid}`);
if (hideLabel.overflow !== 'hidden') failures.push(`hide-label overflow ${hideLabel.overflow}`);
if (nolabel.display !== 'none') failures.push(`nolabel wrapper ${nolabel.display}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterHasError) failures.push('attribute change after connect not reactive');
if (!at999.cssHasMedia) failures.push('breakpoint css missing 1000px media');
if (at999.overflow !== 'hidden') failures.push(`999 overflow ${at999.overflow}`);
if (at1000.overflow !== 'visible') failures.push(`1000 overflow ${at1000.overflow}`);
if (!(at1000.width > at999.width)) {
  failures.push(`expected width flip 999=${at999.width} vs 1000=${at1000.width}`);
}
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  checked,
  indeterminate,
  loading,
  disabled,
  success,
  errorState,
  hideLabel,
  nolabel,
  hidden,
  attrChange,
  at999,
  at1000,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
