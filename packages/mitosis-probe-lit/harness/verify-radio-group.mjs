import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/radio-group.html');
await page.waitForFunction(() => customElements.get('lit-radio-group'));
await page.waitForFunction(() => document.querySelector('#default lit-radio-group')?.shadowRoot?.querySelector('fieldset'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-radio-group');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const fieldset = sr?.querySelector('fieldset');
  const slot = sr?.querySelector('slot:not([name])');
  return {
    isDefined: !!customElements.get('lit-radio-group'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasRoot: css.includes('.root{all:unset'),
    cssHasScale: css.includes('--_p-radio-group-a:1') && css.includes('--_p-radio-group-option-a:1'),
    cssHasColumn: css.includes('flex-flow:column nowrap'),
    cssHasForcedColors: css.includes('forced-colors'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    hasDefaultSlot: !!slot,
    fieldsetClass: fieldset?.className ?? null,
    fieldsetRole: fieldset?.getAttribute('role'),
    fieldsetDisabled: fieldset?.hasAttribute('disabled') ?? null,
    hostDisplay: getComputedStyle(el).display,
    innerLit: !!sr?.querySelector('lit-icon,lit-spinner,lit-radio-group-option'),
    slotted: slot ? slot.assignedElements().map((n) => n.getAttribute('data-item')) : [],
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-radio-group');
  const fieldset = el.shadowRoot?.querySelector('fieldset');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    fieldsetDisabled: fieldset?.hasAttribute('disabled') ?? null,
    cssHasGrayText: css.includes('GrayText'),
  };
});

const labeled = await page.evaluate(() => {
  const el = document.querySelector('#labeled lit-radio-group');
  const label = el.shadowRoot?.querySelector('#label');
  return {
    labelText: label?.textContent?.trim() ?? null,
    hasWrapper: !!el.shadowRoot?.querySelector('.label-wrapper'),
    tag: label?.tagName ?? null,
  };
});

const success = await page.evaluate(() => {
  const el = document.querySelector('#success lit-radio-group');
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

const loading = await page.evaluate(() => {
  const el = document.querySelector('#loading lit-radio-group');
  const spinner = el.shadowRoot?.querySelector('p-spinner');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    spinnerTag: spinner?.tagName ?? null,
    cssHasSpinner: css.includes('.spinner{'),
    cssHasSlottedDisabled: css.includes('::slotted(*:not([slot])){opacity:0.4'),
    loadingText: el.shadowRoot?.querySelector('.loading')?.textContent,
  };
});

const direction = await page.evaluate(() => {
  const css =
    document.querySelector('#direction lit-radio-group')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasBaseColumn: css.includes('flex-flow:column nowrap'),
    cssHasMediaRow: css.includes('@media(min-width:1000px){.wrapper{flex-flow:row wrap'),
  };
});

const hidden = await page.evaluate(
  () => getComputedStyle(document.querySelector('#hidden lit-radio-group')).display,
);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-radio-group is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasRoot) failures.push('cssText missing .root');
if (!live.cssHasScale) failures.push('cssText missing host scaling vars');
if (!live.cssHasColumn) failures.push('cssText missing column direction');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.fieldsetClass !== 'root') failures.push(`fieldset class ${live.fieldsetClass}`);
if (live.fieldsetRole !== 'radiogroup') failures.push(`role ${live.fieldsetRole}`);
if (live.fieldsetDisabled) failures.push('default fieldset is disabled');
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (!live.slotted.includes('a') || !live.slotted.includes('b')) failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (!disabled.fieldsetDisabled) failures.push('disabled fieldset missing disabled');
if (!disabled.cssHasGrayText) failures.push('disabled css missing GrayText');
if (labeled.labelText !== 'Some label') failures.push(`label ${labeled.labelText}`);
if (!labeled.hasWrapper) failures.push('labeled host missing label-wrapper');
if (labeled.tag !== 'DIV') failures.push(`label tag ${labeled.tag}`);
if (success.iconName !== 'check') failures.push(`success icon ${success.iconName}`);
if (success.iconTag !== 'P-ICON') failures.push(`message icon ${success.iconTag}`);
if (success.text !== 'Some message.') failures.push(`success text ${success.text}`);
if (!success.cssHasSuccess) failures.push('success css missing color');
if (!success.colorMatch) failures.push('success color mismatch');
if (loading.spinnerTag !== 'P-SPINNER') failures.push(`loading spinner ${loading.spinnerTag}`);
if (!loading.cssHasSpinner) failures.push('loading css missing spinner');
if (!loading.cssHasSlottedDisabled) failures.push('loading css missing slotted disabled');
if (loading.loadingText !== 'Loading') failures.push(`loading text ${loading.loadingText}`);
if (!direction.cssHasBaseColumn) failures.push('direction missing base column');
if (!direction.cssHasMediaRow) failures.push('direction missing m=1000 row');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, disabled, labeled, success, loading, direction, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
