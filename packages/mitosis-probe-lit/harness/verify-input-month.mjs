import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/input-month.html');
await page.waitForFunction(() => customElements.get('lit-input-month'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-input-month');
  return !!el?.shadowRoot?.querySelector('input[type="month"]');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-input-month');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const input = sr?.querySelector('input');
  const spinner = sr?.querySelector('p-spinner');
  const label = sr?.querySelector('.label-wrapper .label');
  const buttons = [...(sr?.querySelectorAll('p-button-pure') ?? [])];
  const calendar = buttons[0];
  const wrapper = sr?.querySelector('.wrapper');
  const bgRef = document.querySelector('#bg-ref');
  return {
    isDefined: !!customElements.get('lit-input-month'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasInput: !!style?.textContent?.includes('input{'),
    cssTextHasScale: !!style?.textContent?.includes('--_p-input-base-a:1'),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasPicker: !!style?.textContent?.includes('::-webkit-calendar-picker-indicator'),
    cssTextHasMoz: !!style?.textContent?.includes('-moz-appearance:textfield'),
    cssTextHasButton: !!style?.textContent?.includes('.button{padding:var(--ref-p-input-slotted-padding)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootClass: sr?.querySelector('.root')?.className ?? null,
    inputType: input?.getAttribute('type'),
    inputValue: input?.value,
    labelText: label?.textContent,
    buttonCount: buttons.length,
    calendarTag: calendar?.tagName ?? null,
    calendarIsLit: calendar?.tagName === 'LIT-BUTTON-PURE',
    calendarIcon: calendar?.getAttribute('icon'),
    calendarText: calendar?.textContent?.trim(),
    calendarHidden: calendar ? getComputedStyle(calendar).display === 'none' : true,
    spinnerHidden: spinner ? getComputedStyle(spinner).display === 'none' : false,
    innerSpinnerTag: spinner?.tagName ?? null,
    innerIsLit: spinner?.tagName === 'LIT-SPINNER',
    backgroundMatch: wrapper && bgRef ? getComputedStyle(wrapper).backgroundColor === getComputedStyle(bgRef).backgroundColor : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const loading = await page.evaluate(() => {
  const el = document.querySelector('#loading lit-input-month');
  const style = el.shadowRoot?.querySelector('style');
  const spinner = el.shadowRoot?.querySelector('p-spinner');
  return {
    cssHidesHover: !style?.textContent?.includes('@media(hover:hover)'),
    spinnerDisplay: spinner ? getComputedStyle(spinner).display : null,
    spinnerTag: spinner?.tagName ?? null,
    spinnerIsLit: spinner?.tagName === 'LIT-SPINNER',
    ariaDisabled: el.shadowRoot?.querySelector('input')?.getAttribute('aria-disabled'),
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-input-month');
  const wrap = el.shadowRoot?.querySelector('.wrapper');
  return {
    opacity: wrap ? getComputedStyle(wrap).opacity : null,
    ariaDisabled: el.shadowRoot?.querySelector('input')?.getAttribute('aria-disabled'),
  };
});

const success = await page.evaluate(() => {
  const el = document.querySelector('#success lit-input-month');
  const icon = el.shadowRoot?.querySelector('.message p-icon');
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
  const el = document.querySelector('#error lit-input-month');
  const icon = el.shadowRoot?.querySelector('.message p-icon');
  const input = el.shadowRoot?.querySelector('input');
  return {
    iconName: icon?.getAttribute('name'),
    ariaInvalid: input?.getAttribute('aria-invalid'),
  };
});

const readonly = await page.evaluate(() => {
  const el = document.querySelector('#readonly lit-input-month');
  const wrap = el.shadowRoot?.querySelector('.wrapper');
  const css = wrap ? getComputedStyle(wrap) : null;
  const ref = document.querySelector('#readonly-ref');
  return {
    borderColor: css?.borderColor,
    colorMatch: wrap && ref ? css.color === getComputedStyle(ref).color : false,
    inputReadonly: el.shadowRoot?.querySelector('input')?.readOnly,
  };
});

const hideLabel = await page.evaluate(() => {
  const el = document.querySelector('#hide-label lit-input-month');
  const wrap = el.shadowRoot?.querySelector('.label-wrapper');
  const calendar = el.shadowRoot?.querySelector('p-button-pure');
  return {
    overflow: wrap ? getComputedStyle(wrap).overflow : null,
    calendarVisible: calendar ? getComputedStyle(calendar).display !== 'none' : false,
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-input-month')).display);

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-input-month');
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
  const el = document.querySelector('#breakpoint lit-input-month');
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
  const el = document.querySelector('#breakpoint lit-input-month');
  const wrap = el.shadowRoot?.querySelector('.label-wrapper');
  return {
    overflow: wrap ? getComputedStyle(wrap).overflow : null,
    width: el.getBoundingClientRect().width,
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-input-month is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasInput) failures.push('cssText missing input rules');
if (!live.cssTextHasScale) failures.push('cssText missing --_p-input-base-a:1');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasPicker) failures.push('cssText missing webkit calendar picker');
if (!live.cssTextHasMoz) failures.push('cssText missing moz-appearance');
if (!live.cssTextHasButton) failures.push('cssText missing .button padding');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootClass !== 'root') failures.push(`root class ${live.rootClass}`);
if (live.inputType !== 'month') failures.push(`input type ${live.inputType}`);
if (live.inputValue !== '2018-05') failures.push(`input value ${live.inputValue}`);
if (live.labelText !== 'Some label') failures.push(`label ${live.labelText}`);
if (live.buttonCount !== 1) failures.push(`button count ${live.buttonCount}`);
if (live.calendarTag !== 'P-BUTTON-PURE') failures.push(`calendar tag ${live.calendarTag}`);
if (live.calendarIsLit) failures.push('calendar was swapped to lit-button-pure');
if (live.calendarIcon !== 'calendar') failures.push(`calendar icon ${live.calendarIcon}`);
if (live.calendarText !== 'Open date picker') failures.push(`calendar text ${live.calendarText}`);
if (live.calendarHidden) failures.push('default calendar hidden');
if (!live.spinnerHidden) failures.push('default spinner should be display:none');
if (live.innerSpinnerTag !== 'P-SPINNER') failures.push(`spinner ${live.innerSpinnerTag}`);
if (live.innerIsLit) failures.push('spinner was swapped to lit-spinner');
if (!live.backgroundMatch) failures.push('background mismatch');
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!loading.cssHidesHover) failures.push('loading still has hover rule');
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
if (readonly.borderColor !== 'rgba(0, 0, 0, 0)' && readonly.borderColor !== 'transparent') {
  failures.push(`readonly border ${readonly.borderColor}`);
}
if (!readonly.colorMatch) failures.push('readonly color mismatch');
if (!readonly.inputReadonly) failures.push('readonly input not readOnly');
if (hideLabel.overflow !== 'hidden') failures.push(`hide-label overflow ${hideLabel.overflow}`);
if (!hideLabel.calendarVisible) failures.push('hide-label hid the calendar button');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterHasError) failures.push('attribute change after connect not reactive');
if (!at999.cssHasMedia) failures.push('breakpoint css missing 1000px media');
if (at999.overflow !== 'hidden') failures.push(`999 overflow ${at999.overflow}`);
if (at1000.overflow !== 'visible') failures.push(`1000 overflow ${at1000.overflow}`);
if (at999.overflow === at1000.overflow) {
  failures.push(`expected hide-label flip 999=${at999.overflow} vs 1000=${at1000.overflow}`);
}
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  loading,
  disabled,
  success,
  errorState,
  readonly,
  hideLabel,
  hidden,
  attrChange,
  at999,
  at1000,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
