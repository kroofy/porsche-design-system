import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/pin-code.html');
await page.waitForFunction(() => customElements.get('lit-pin-code'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-pin-code');
  return (el?.shadowRoot?.querySelectorAll('input').length ?? 0) === 4;
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-pin-code');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const inputs = [...(sr?.querySelectorAll('input') ?? [])];
  const label = sr?.querySelector('.label-wrapper .label');
  const ref = document.querySelector('#bg-ref');
  return {
    isDefined: !!customElements.get('lit-pin-code'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasScale: css.includes('--_p-pin-code-a:1'),
    cssHasRepeat4: css.includes('repeat(4, 1fr)'),
    cssHasForcedColors: css.includes('forced-colors'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    inputCount: inputs.length,
    firstId: inputs[0]?.id ?? null,
    inputType: inputs[0]?.getAttribute('type'),
    inputMode: inputs[0]?.getAttribute('inputmode'),
    labelText: label?.textContent,
    backgroundMatch:
      inputs[0] && ref
        ? getComputedStyle(inputs[0]).backgroundColor === getComputedStyle(ref).backgroundColor
        : false,
    hostDisplay: getComputedStyle(el).display,
    innerLit: !!sr?.querySelector('lit-icon,lit-spinner'),
  };
});

const loading = await page.evaluate(() => {
  const el = document.querySelector('#loading lit-pin-code');
  const spinner = el.shadowRoot?.querySelector('p-spinner');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    spinnerTag: spinner?.tagName ?? null,
    spinnerSize: spinner?.getAttribute('size'),
    cssHasSpinner: css.includes('.spinner{'),
    loadingText: el.shadowRoot?.querySelector('.loading')?.textContent,
    inputOpacity: getComputedStyle(el.shadowRoot?.querySelector('input')).opacity,
  };
});

const success = await page.evaluate(() => {
  const el = document.querySelector('#success lit-pin-code');
  const icon = el.shadowRoot?.querySelector('.message p-icon');
  const msg = el.shadowRoot?.querySelector('.message');
  const ref = document.querySelector('#success-ref');
  return {
    iconName: icon?.getAttribute('name'),
    iconColor: icon?.getAttribute('color'),
    iconTag: icon?.tagName ?? null,
    text: msg?.textContent?.trim(),
    colorMatch: msg && ref ? getComputedStyle(msg).color === getComputedStyle(ref).color : false,
    role: msg?.getAttribute('role'),
  };
});

const errorState = await page.evaluate(() => {
  const el = document.querySelector('#error lit-pin-code');
  const icon = el.shadowRoot?.querySelector('.message p-icon');
  const input = el.shadowRoot?.querySelector('input');
  return {
    iconName: icon?.getAttribute('name'),
    ariaInvalid: input?.getAttribute('aria-invalid'),
    fieldsetInvalid: el.shadowRoot?.querySelector('fieldset')?.getAttribute('aria-invalid'),
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-pin-code');
  const input = el.shadowRoot?.querySelector('input');
  const label = el.shadowRoot?.querySelector('.label-wrapper .label');
  return {
    inputDisabled: input?.disabled ?? null,
    inputOpacity: input ? getComputedStyle(input).opacity : null,
    labelOpacity: label ? getComputedStyle(label).opacity : null,
  };
});

const lengthSix = await page.evaluate(() => {
  const el = document.querySelector('#length lit-pin-code');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    inputCount: el.shadowRoot?.querySelectorAll('input').length ?? 0,
    cssHasRepeat6: css.includes('repeat(6, 1fr)'),
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-pin-code')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-pin-code is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasScale) failures.push('cssText missing scale');
if (!live.cssHasRepeat4) failures.push('cssText missing repeat(4)');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.inputCount !== 4) failures.push(`input count ${live.inputCount}`);
if (live.firstId !== 'current-input') failures.push(`first id ${live.firstId}`);
if (live.inputType !== 'text') failures.push(`type ${live.inputType}`);
if (live.inputMode !== 'numeric') failures.push(`inputmode ${live.inputMode}`);
if (live.labelText !== 'Some label') failures.push(`label ${live.labelText}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (loading.spinnerTag !== 'P-SPINNER') failures.push(`spinner ${loading.spinnerTag}`);
if (loading.spinnerSize !== 'inherit') failures.push(`spinner size ${loading.spinnerSize}`);
if (!loading.cssHasSpinner) failures.push('loading css missing .spinner');
if (loading.loadingText !== 'Loading') failures.push(`loading text ${loading.loadingText}`);
if (success.iconName !== 'check') failures.push(`success icon ${success.iconName}`);
if (success.iconTag !== 'P-ICON') failures.push(`success icon tag ${success.iconTag}`);
if (success.role !== 'status') failures.push(`success role ${success.role}`);
if (errorState.iconName !== 'exclamation') failures.push(`error icon ${errorState.iconName}`);
if (errorState.ariaInvalid !== 'true') failures.push(`input aria-invalid ${errorState.ariaInvalid}`);
if (disabled.inputDisabled !== true) failures.push(`disabled input ${disabled.inputDisabled}`);
if (lengthSix.inputCount !== 6) failures.push(`length-6 count ${lengthSix.inputCount}`);
if (!lengthSix.cssHasRepeat6) failures.push('length-6 missing repeat(6)');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, loading, success, errorState, disabled, lengthSix, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
