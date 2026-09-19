import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/multi-select.html');
await page.waitForFunction(() => customElements.get('lit-multi-select'));
await page.waitForFunction(() => document.querySelector('#default lit-multi-select')?.shadowRoot?.querySelector('button'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-multi-select');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const button = sr?.querySelector('button');
  const slot = sr?.querySelector('slot:not([name])');
  const popover = sr?.querySelector('[popover]');
  const icon = sr?.querySelector('button p-icon');
  return {
    isDefined: !!customElements.get('lit-multi-select'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasRoot: css.includes('.root{display:grid'),
    cssHasScale:
      css.includes('--_p-multi-select-a:1') &&
      css.includes('--_p-multi-select-option-a:1') &&
      css.includes('--_p-optgroup-a:1'),
    cssHasForcedColors: css.includes('forced-colors'),
    cssHasMinWidthTwoIcons: css.includes('* 2))'),
    cssHasPopover242: css.includes('max(calc(242px)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    hasDefaultSlot: !!slot,
    rootClass: sr?.querySelector('.root')?.className ?? null,
    buttonRole: button?.getAttribute('role'),
    buttonExpanded: button?.getAttribute('aria-expanded'),
    buttonHaspopup: button?.getAttribute('aria-haspopup'),
    spanText: button?.querySelector('span')?.textContent ?? null,
    iconName: icon?.getAttribute('name'),
    iconClass: icon?.className ?? null,
    iconTag: icon?.tagName ?? null,
    popoverDisplay: popover ? getComputedStyle(popover).display : null,
    popoverAttr: popover?.getAttribute('popover') ?? null,
    listboxMulti: sr?.querySelector('#listbox')?.getAttribute('aria-multiselectable'),
    hostDisplay: getComputedStyle(el).display,
    innerLit: !!sr?.querySelector('lit-icon,lit-multi-select-option,lit-optgroup'),
    slotted: slot ? slot.assignedElements().map((n) => n.getAttribute('data-item')) : [],
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-multi-select');
  const button = el.shadowRoot?.querySelector('button');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    buttonDisabled: button?.disabled ?? null,
    cssHasGrayText: css.includes('GrayText'),
    cssHasOpacity: css.includes('opacity:0.4'),
  };
});

const labeled = await page.evaluate(() => {
  const el = document.querySelector('#default lit-multi-select');
  const label = el.shadowRoot?.querySelector('#label');
  return {
    labelText: label?.textContent?.trim() ?? null,
    hasWrapper: !!el.shadowRoot?.querySelector('.label-wrapper'),
    tag: label?.tagName ?? null,
    htmlFor: label?.getAttribute('for'),
  };
});

const success = await page.evaluate(() => {
  const el = document.querySelector('#success lit-multi-select');
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
    role: msg?.getAttribute('role'),
  };
});

const errorState = await page.evaluate(() => {
  const el = document.querySelector('#error lit-multi-select');
  const icon = el.shadowRoot?.querySelector('.message p-icon');
  const button = el.shadowRoot?.querySelector('button');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    iconName: icon?.getAttribute('name'),
    ariaInvalid: button?.getAttribute('aria-invalid'),
    cssHasError: css.includes('var(--p-color-error)'),
  };
});

const compact = await page.evaluate(() => {
  const css = document.querySelector('#compact lit-multi-select')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasCompactScale: css.includes('--_p-multi-select-a:0.64285714'),
    cssHasCompactRadius: css.includes('var(--p-radius-lg)'),
  };
});

const hideLabel = await page.evaluate(() => {
  const css = document.querySelector('#hide-label lit-multi-select')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasMedia: css.includes('@media(min-width:1000px){.label-wrapper{position:absolute'),
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-multi-select')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-multi-select is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasRoot) failures.push('cssText missing .root');
if (!live.cssHasScale) failures.push('cssText missing host scaling vars');
if (!live.cssHasMinWidthTwoIcons) failures.push('cssText missing two-icon min-width');
if (!live.cssHasPopover242) failures.push('cssText missing 242px popover max-height');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.rootClass !== 'root') failures.push(`root class ${live.rootClass}`);
if (live.buttonRole !== 'combobox') failures.push(`role ${live.buttonRole}`);
if (live.buttonExpanded !== 'false') failures.push(`aria-expanded ${live.buttonExpanded}`);
if (live.buttonHaspopup !== 'listbox') failures.push(`aria-haspopup ${live.buttonHaspopup}`);
if (live.spanText !== '') failures.push(`closed span ${JSON.stringify(live.spanText)}`);
if (live.iconName !== 'arrow-head-down') failures.push(`arrow ${live.iconName}`);
if (!String(live.iconClass).includes('icon')) failures.push(`icon class ${live.iconClass}`);
if (live.iconTag !== 'P-ICON') failures.push(`arrow tag ${live.iconTag}`);
if (live.popoverDisplay !== 'none') failures.push(`popover display ${live.popoverDisplay}`);
if (live.popoverAttr !== 'manual') failures.push(`popover attr ${live.popoverAttr}`);
if (live.listboxMulti !== 'true') failures.push(`aria-multiselectable ${live.listboxMulti}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (!live.slotted.includes('a') || !live.slotted.includes('b')) failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (!disabled.buttonDisabled) failures.push('disabled button missing disabled');
if (!disabled.cssHasGrayText) failures.push('disabled css missing GrayText');
if (!disabled.cssHasOpacity) failures.push('disabled css missing opacity');
if (labeled.labelText !== 'Some label') failures.push(`label ${labeled.labelText}`);
if (!labeled.hasWrapper) failures.push('labeled host missing label-wrapper');
if (labeled.tag !== 'LABEL') failures.push(`label tag ${labeled.tag}`);
if (labeled.htmlFor !== 'button') failures.push(`label for ${labeled.htmlFor}`);
if (success.iconName !== 'check') failures.push(`success icon ${success.iconName}`);
if (success.iconTag !== 'P-ICON') failures.push(`message icon ${success.iconTag}`);
if (success.text !== 'Some message.') failures.push(`success text ${success.text}`);
if (!success.cssHasSuccess) failures.push('success css missing color');
if (!success.colorMatch) failures.push('success color mismatch');
if (errorState.iconName !== 'exclamation') failures.push(`error icon ${errorState.iconName}`);
if (errorState.ariaInvalid !== 'true') failures.push(`aria-invalid ${errorState.ariaInvalid}`);
if (!errorState.cssHasError) failures.push('error css missing color');
if (!compact.cssHasCompactScale) failures.push('compact missing scale');
if (!compact.cssHasCompactRadius) failures.push('compact missing radius-lg');
if (!hideLabel.cssHasMedia) failures.push('hide-label missing m=1000');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, disabled, labeled, success, errorState, compact, hideLabel, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
