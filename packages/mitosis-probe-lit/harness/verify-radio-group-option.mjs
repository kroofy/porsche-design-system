import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/radio-group-option.html');
await page.waitForFunction(() => customElements.get('lit-radio-group-option'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-radio-group-option')?.shadowRoot?.querySelector('input[type="radio"]'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-radio-group-option');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const input = sr?.querySelector('input[type="radio"]');
  const ref = document.querySelector('#frosted-ref');
  return {
    isDefined: !!customElements.get('lit-radio-group-option'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostBlock: css.includes(':host{display:block'),
    cssHasRadiusFull: css.includes('border-radius:var(--p-radius-full)'),
    cssHasHover: css.includes('input:hover'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    inputType: input?.getAttribute('type'),
    hostDisplay: getComputedStyle(el).display,
    innerLit: !!sr?.querySelector('lit-icon,lit-spinner'),
    labelText: sr?.querySelector('.label')?.textContent?.trim() ?? null,
    backgroundMatch:
      input && ref ? getComputedStyle(input).backgroundColor === getComputedStyle(ref).backgroundColor : false,
  };
});

const selected = await page.evaluate(() => {
  const el = document.querySelector('#selected lit-radio-group-option');
  const input = el.shadowRoot?.querySelector('input');
  const ref = document.querySelector('#primary-ref');
  return {
    checked: input?.checked ?? null,
    backgroundMatch:
      input && ref ? getComputedStyle(input).backgroundColor === getComputedStyle(ref).backgroundColor : false,
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-radio-group-option');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const wrapper = el.shadowRoot?.querySelector('.wrapper');
  return {
    wrapperOpacity: wrapper ? getComputedStyle(wrapper).opacity : null,
    cssHasNotAllowed: css.includes('cursor:not-allowed'),
    cssHasGrayText: css.includes('GrayText'),
    cssHasHover: css.includes('input:hover'),
  };
});

const loading = await page.evaluate(() => {
  const el = document.querySelector('#loading lit-radio-group-option');
  const spinner = el.shadowRoot?.querySelector('p-spinner');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    spinnerTag: spinner?.tagName ?? null,
    cssHasSpinner: css.includes('.spinner{'),
    loadingText: el.shadowRoot?.querySelector('.loading')?.textContent,
  };
});

const success = await page.evaluate(() => {
  const el = document.querySelector('#success lit-radio-group-option');
  const input = el.shadowRoot?.querySelector('input');
  const ref = document.querySelector('#success-ref');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasSuccess: css.includes('var(--p-color-success)'),
    backgroundMatch:
      input && ref ? getComputedStyle(input).backgroundColor === getComputedStyle(ref).backgroundColor : false,
  };
});

const parentLoading = await page.evaluate(() => {
  const el = document.querySelector('#parent-loading lit-radio-group-option');
  return {
    spinner: !!el.shadowRoot?.querySelector('p-spinner'),
    loadingMsg: !!el.shadowRoot?.querySelector('.loading'),
  };
});

const hidden = await page.evaluate(
  () => getComputedStyle(document.querySelector('#hidden lit-radio-group-option')).display,
);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-radio-group-option is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostBlock) failures.push('cssText missing :host display block');
if (!live.cssHasRadiusFull) failures.push('cssText missing radius-full');
if (!live.cssHasHover) failures.push('default missing hover');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.inputType !== 'radio') failures.push(`input type ${live.inputType}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (live.labelText !== 'Option A') failures.push(`label ${live.labelText}`);
if (!live.backgroundMatch) failures.push('default background mismatch');
if (selected.checked !== true) failures.push(`selected checked ${selected.checked}`);
if (!selected.backgroundMatch) failures.push('selected background mismatch');
if (disabled.wrapperOpacity !== '0.4') failures.push(`disabled opacity ${disabled.wrapperOpacity}`);
if (!disabled.cssHasNotAllowed) failures.push('disabled missing not-allowed');
if (!disabled.cssHasGrayText) failures.push('disabled missing GrayText');
if (disabled.cssHasHover) failures.push('disabled still has hover');
if (loading.spinnerTag !== 'P-SPINNER') failures.push(`loading spinner ${loading.spinnerTag}`);
if (!loading.cssHasSpinner) failures.push('loading css missing spinner');
if (loading.loadingText !== 'Loading') failures.push(`loading text ${loading.loadingText}`);
if (!success.cssHasSuccess) failures.push('success css missing color');
if (!success.backgroundMatch) failures.push('success background mismatch');
if (parentLoading.spinner) failures.push('parent-loading still shows option spinner');
if (parentLoading.loadingMsg) failures.push('parent-loading still shows loading message');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, selected, disabled, loading, success, parentLoading, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
