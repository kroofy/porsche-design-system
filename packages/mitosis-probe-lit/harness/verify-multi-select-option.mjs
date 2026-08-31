import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/multi-select-option.html');
await page.waitForFunction(() => customElements.get('lit-multi-select-option'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-multi-select-option')?.shadowRoot?.querySelector('.option'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-multi-select-option');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const option = sr?.querySelector('.option');
  const slot = sr?.querySelector('slot:not([name])');
  const checkbox = sr?.querySelector('.checkbox');
  const ref = document.querySelector('#contrast-ref');
  return {
    isDefined: !!customElements.get('lit-multi-select-option'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostBlock: css.includes(':host{display:block'),
    cssHasOptionFlex: css.includes('.option{display:flex'),
    cssHasScale: css.includes('--_p-multi-select-option-a'),
    cssHasCheckboxVar: css.includes('--_p-checkbox-scaling:var(--_p-multi-select-option-a)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    hasDefaultSlot: !!slot,
    optionClass: option?.className ?? null,
    checkboxClass: checkbox?.className ?? null,
    checkboxAria: checkbox?.getAttribute('aria-hidden'),
    hostRole: el.getAttribute('role'),
    ariaSelected: el.getAttribute('aria-selected'),
    hostDisplay: getComputedStyle(el).display,
    innerLit: !!sr?.querySelector('lit-icon'),
    slotted: slot ? slot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    colorMatch: option && ref ? getComputedStyle(option).color === getComputedStyle(ref).color : false,
    checkIcon: !!sr?.querySelector('p-icon'),
  };
});

const selected = await page.evaluate(() => {
  const el = document.querySelector('#selected lit-multi-select-option');
  const option = el.shadowRoot?.querySelector('.option');
  const checkbox = el.shadowRoot?.querySelector('.checkbox');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const ref = document.querySelector('#primary-ref');
  return {
    ariaSelected: el.getAttribute('aria-selected'),
    hasSelectedClass: option?.classList.contains('option--selected') ?? null,
    cssHasCheckMask: css.includes('mask:url(') && css.includes('m20.22,7.47'),
    cssHasPrimaryBg: css.includes('.checkbox{background:var(--p-color-primary)}'),
    checkboxBgMatch: checkbox && ref ? getComputedStyle(checkbox).backgroundColor === getComputedStyle(ref).color : false,
    colorMatch: option && ref ? getComputedStyle(option).color === getComputedStyle(ref).color : false,
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-multi-select-option');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const option = el.shadowRoot?.querySelector('.option');
  return {
    hostOpacity: getComputedStyle(el).opacity,
    cssHasNotAllowed: css.includes('cursor:not-allowed'),
    cssHasGrayText: css.includes('GrayText'),
    cssHasPointerNone: css.includes('pointer-events:none'),
    hasDisabledClass: option?.classList.contains('option--disabled') ?? null,
    ariaDisabled: el.getAttribute('aria-disabled'),
  };
});

const disabledParent = await page.evaluate(() => {
  const el = document.querySelector('#disabled-parent lit-multi-select-option');
  return {
    hostOpacity: getComputedStyle(el).opacity,
    ariaDisabled: el.getAttribute('aria-disabled'),
  };
});

const highlighted = await page.evaluate(() => {
  const el = document.querySelector('#highlighted lit-multi-select-option');
  const option = el.shadowRoot?.querySelector('.option');
  const ref = document.querySelector('#frosted-ref');
  return {
    hasHighlightedClass: option?.classList.contains('option--highlighted') ?? null,
    backgroundMatch:
      option && ref ? getComputedStyle(option).backgroundColor === getComputedStyle(ref).backgroundColor : false,
  };
});

const hidden = await page.evaluate(
  () => getComputedStyle(document.querySelector('#hidden lit-multi-select-option')).display,
);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-multi-select-option is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostBlock) failures.push('cssText missing :host display block');
if (!live.cssHasOptionFlex) failures.push('cssText missing .option flex');
if (!live.cssHasScale) failures.push('cssText missing option scale var');
if (!live.cssHasCheckboxVar) failures.push('cssText missing checkbox scaling var');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.optionClass !== 'option') failures.push(`option class ${live.optionClass}`);
if (live.checkboxClass !== 'checkbox') failures.push(`checkbox class ${live.checkboxClass}`);
if (live.checkboxAria !== 'true') failures.push(`checkbox aria-hidden ${live.checkboxAria}`);
if (live.hostRole !== 'option') failures.push(`host role ${live.hostRole}`);
if (live.ariaSelected !== 'false') failures.push(`aria-selected ${live.ariaSelected}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (!live.slotted.includes('Option A')) failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (!live.colorMatch) failures.push('default color mismatch');
if (live.checkIcon) failures.push('default shows p-icon; checkbox should be a span');
if (selected.ariaSelected !== 'true') failures.push(`selected aria ${selected.ariaSelected}`);
if (!selected.hasSelectedClass) failures.push('selected missing option--selected');
if (!selected.cssHasCheckMask) failures.push('selected missing check mask');
if (!selected.cssHasPrimaryBg) failures.push('selected missing primary checkbox bg');
if (!selected.colorMatch) failures.push('selected color mismatch');
if (disabled.hostOpacity !== '0.4') failures.push(`disabled opacity ${disabled.hostOpacity}`);
if (!disabled.cssHasNotAllowed) failures.push('disabled missing not-allowed');
if (!disabled.cssHasGrayText) failures.push('disabled missing GrayText');
if (!disabled.cssHasPointerNone) failures.push('disabled missing pointer-events none');
if (!disabled.hasDisabledClass) failures.push('disabled missing option--disabled');
if (disabled.ariaDisabled !== 'true') failures.push(`disabled aria ${disabled.ariaDisabled}`);
if (disabledParent.hostOpacity !== '0.4') failures.push(`disabledParent opacity ${disabledParent.hostOpacity}`);
if (disabledParent.ariaDisabled !== 'true') failures.push(`disabledParent aria ${disabledParent.ariaDisabled}`);
if (!highlighted.hasHighlightedClass) failures.push('highlighted missing class');
if (!highlighted.backgroundMatch) failures.push('highlighted background mismatch');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, selected, disabled, disabledParent, highlighted, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
