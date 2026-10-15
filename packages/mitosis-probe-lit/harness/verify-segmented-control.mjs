import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/segmented-control.html');
await page.waitForFunction(() => customElements.get('lit-segmented-control'));
await page.waitForFunction(() => document.querySelector('#default lit-segmented-control')?.shadowRoot?.querySelector('fieldset'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-segmented-control');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const fieldset = sr?.querySelector('fieldset');
  const slot = sr?.querySelector('slot:not([name])');
  return {
    isDefined: !!customElements.get('lit-segmented-control'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasRoot: css.includes('.root{all:unset'),
    cssHasAutoFit: css.includes('repeat(auto-fit,'),
    cssHasGap: css.includes('gap:6px'),
    cssHasForcedColors: css.includes('forced-colors'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    hasDefaultSlot: !!slot,
    fieldsetClass: fieldset?.className ?? null,
    detailsOpen: fieldset?.hasAttribute('disabled') ?? null,
    hostDisplay: getComputedStyle(el).display,
    innerLit: !!sr?.querySelector('lit-icon'),
    slotted: slot ? slot.assignedElements().map((n) => n.getAttribute('data-item')) : [],
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-segmented-control');
  const fieldset = el.shadowRoot?.querySelector('fieldset');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    fieldsetDisabled: fieldset?.hasAttribute('disabled') ?? null,
    cssHasGrayText: css.includes('GrayText'),
  };
});

const labeled = await page.evaluate(() => {
  const el = document.querySelector('#labeled lit-segmented-control');
  const label = el.shadowRoot?.querySelector('#label');
  return {
    labelText: label?.textContent?.trim() ?? null,
    hasWrapper: !!el.shadowRoot?.querySelector('.label-wrapper'),
  };
});

const success = await page.evaluate(() => {
  const el = document.querySelector('#success lit-segmented-control');
  const icon = el.shadowRoot?.querySelector('.message p-icon');
  const msg = el.shadowRoot?.querySelector('.message');
  const ref = document.querySelector('#success-ref');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    iconName: icon?.getAttribute('name'),
    iconColor: icon?.getAttribute('color'),
    iconTag: icon?.tagName ?? null,
    text: msg?.textContent?.trim(),
    cssHasSuccess: css.includes('var(--p-color-success)'),
    colorMatch: msg && ref ? getComputedStyle(msg).color === getComputedStyle(ref).color : false,
  };
});

const columns = await page.evaluate(() => {
  const css = document.querySelector('#columns lit-segmented-control')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasTwo: css.includes('repeat(2, minmax(0, 1fr))'),
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-segmented-control')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-segmented-control is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasRoot) failures.push('cssText missing .root');
if (!live.cssHasAutoFit) failures.push('cssText missing auto-fit columns');
if (!live.cssHasGap) failures.push('cssText missing 6px gap');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.fieldsetClass !== 'root') failures.push(`fieldset class ${live.fieldsetClass}`);
if (live.detailsOpen) failures.push('default fieldset is disabled');
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (!live.slotted.includes('1') || !live.slotted.includes('2')) failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (!disabled.fieldsetDisabled) failures.push('disabled fieldset missing disabled');
if (!disabled.cssHasGrayText) failures.push('disabled css missing GrayText');
if (labeled.labelText !== 'Some label') failures.push(`label ${labeled.labelText}`);
if (!labeled.hasWrapper) failures.push('labeled host missing label-wrapper');
if (success.iconName !== 'check') failures.push(`success icon ${success.iconName}`);
if (success.iconTag !== 'P-ICON') failures.push(`message icon ${success.iconTag}`);
if (success.text !== 'Some message.') failures.push(`success text ${success.text}`);
if (!success.cssHasSuccess) failures.push('success css missing color');
if (!success.colorMatch) failures.push('success color mismatch');
if (!columns.cssHasTwo) failures.push('columns=2 missing repeat(2)');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, disabled, labeled, success, columns, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
