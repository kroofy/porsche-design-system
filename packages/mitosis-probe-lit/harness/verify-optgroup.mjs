import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/optgroup.html');
await page.waitForFunction(() => customElements.get('lit-optgroup'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-optgroup')?.shadowRoot?.querySelector('[role="group"]'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-optgroup');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const group = sr?.querySelector('[role="group"]');
  const label = sr?.querySelector('[role="presentation"]');
  const slot = sr?.querySelector('slot:not([name])');
  const ref = document.querySelector('#primary-ref');
  return {
    isDefined: !!customElements.get('lit-optgroup'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostBlock: css.includes(':host{display:block'),
    cssHasSlottedPad: css.includes('--_p-select-option-b:calc(44.8px'),
    cssHasGroupFlex: css.includes('[role="group"]{display:flex'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    hasDefaultSlot: !!slot,
    groupRole: group?.getAttribute('role'),
    labelledBy: group?.getAttribute('aria-labelledby'),
    labelText: label?.textContent?.trim() ?? null,
    labelRole: label?.getAttribute('role'),
    hostDisplay: getComputedStyle(el).display,
    innerLit: !!sr?.querySelector('lit-icon,lit-select-option'),
    slotted: slot ? slot.assignedElements().map((n) => n.getAttribute('data-item')) : [],
    colorMatch: label && ref ? getComputedStyle(label).color === getComputedStyle(ref).color : false,
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-optgroup');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const label = el.shadowRoot?.querySelector('[role="presentation"]');
  const group = el.shadowRoot?.querySelector('[role="group"]');
  return {
    labelOpacity: label ? getComputedStyle(label).opacity : null,
    cssHasGrayText: css.includes('GrayText'),
    ariaDisabled: group?.getAttribute('aria-disabled'),
  };
});

const hidden = await page.evaluate(
  () => getComputedStyle(document.querySelector('#hidden lit-optgroup')).display,
);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-optgroup is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostBlock) failures.push('cssText missing :host display block');
if (!live.cssHasSlottedPad) failures.push('cssText missing slotted option padding var');
if (!live.cssHasGroupFlex) failures.push('cssText missing group flex');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.groupRole !== 'group') failures.push(`group role ${live.groupRole}`);
if (live.labelledBy !== 'label') failures.push(`labelledby ${live.labelledBy}`);
if (live.labelText !== 'Some optgroup') failures.push(`label ${live.labelText}`);
if (live.labelRole !== 'presentation') failures.push(`label role ${live.labelRole}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (!live.slotted.includes('b') || !live.slotted.includes('c')) failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (!live.colorMatch) failures.push('label color mismatch');
if (disabled.labelOpacity !== '0.4') failures.push(`disabled opacity ${disabled.labelOpacity}`);
if (!disabled.cssHasGrayText) failures.push('disabled missing GrayText');
if (disabled.ariaDisabled !== 'true') failures.push(`aria-disabled ${disabled.ariaDisabled}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, disabled, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
