import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/segmented-control-item.html');
await page.waitForFunction(() => customElements.get('lit-segmented-control-item'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-segmented-control-item')?.shadowRoot?.querySelector('button'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-segmented-control-item');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const button = sr?.querySelector('button');
  const slot = sr?.querySelector('slot:not([name])');
  const ref = document.querySelector('#frosted-ref');
  return {
    isDefined: !!customElements.get('lit-segmented-control-item'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostBlock: css.includes(':host{display:block'),
    cssHasButtonFont: css.includes('1rem/calc(6px + 2.125ex)'),
    cssHasHover: css.includes('button:hover'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    hasDefaultSlot: !!slot,
    buttonType: button?.getAttribute('type'),
    hostDisplay: getComputedStyle(el).display,
    innerLit: !!sr?.querySelector('lit-icon'),
    slotted: slot ? slot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    backgroundMatch:
      button && ref ? getComputedStyle(button).backgroundColor === getComputedStyle(ref).backgroundColor : false,
  };
});

const labeled = await page.evaluate(() => {
  const sr = document.querySelector('#labeled lit-segmented-control-item')?.shadowRoot;
  return {
    spanText: sr?.querySelector('span')?.textContent ?? null,
    hasIcon: !!sr?.querySelector('p-icon'),
  };
});

const iconed = await page.evaluate(() => {
  const sr = document.querySelector('#icon lit-segmented-control-item')?.shadowRoot;
  const css = sr?.querySelector('style')?.textContent ?? '';
  const icon = sr?.querySelector('p-icon');
  return {
    iconName: icon?.getAttribute('name'),
    iconTag: icon?.tagName ?? null,
    iconIsLit: icon?.tagName === 'LIT-ICON',
    cssHasIconMargin: css.includes('margin-inline-end:.25rem'),
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-segmented-control-item');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    hostOpacity: getComputedStyle(el).opacity,
    cssHasNotAllowed: css.includes('cursor:not-allowed'),
    cssHasGrayText: css.includes('GrayText'),
    cssHasHover: css.includes('button:hover'),
  };
});

const selected = await page.evaluate(() => {
  const el = document.querySelector('#selected lit-segmented-control-item');
  const button = el.shadowRoot?.querySelector('button');
  const ref = document.querySelector('#selected-ref');
  return {
    ariaPressed: button?.getAttribute('aria-pressed'),
    backgroundMatch:
      button && ref ? getComputedStyle(button).backgroundColor === getComputedStyle(ref).backgroundColor : false,
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-segmented-control-item')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-segmented-control-item is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostBlock) failures.push('cssText missing :host display block');
if (!live.cssHasButtonFont) failures.push('cssText missing button font');
if (!live.cssHasHover) failures.push('default missing hover');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.buttonType !== 'button') failures.push(`button type ${live.buttonType}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (!live.slotted.includes('1')) failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (!live.backgroundMatch) failures.push('default background mismatch');
if (labeled.spanText !== 'Model') failures.push(`label span ${labeled.spanText}`);
if (labeled.hasIcon) failures.push('labeled host unexpectedly has icon');
if (iconed.iconName !== 'car') failures.push(`icon name ${iconed.iconName}`);
if (iconed.iconTag !== 'P-ICON') failures.push(`icon tag ${iconed.iconTag}`);
if (iconed.iconIsLit) failures.push('icon was swapped to lit-icon');
if (!iconed.cssHasIconMargin) failures.push('icon+slot missing margin-inline-end');
if (disabled.hostOpacity !== '0.4') failures.push(`disabled opacity ${disabled.hostOpacity}`);
if (!disabled.cssHasNotAllowed) failures.push('disabled missing not-allowed');
if (!disabled.cssHasGrayText) failures.push('disabled missing GrayText');
if (disabled.cssHasHover) failures.push('disabled still has hover');
if (selected.ariaPressed !== 'true') failures.push(`selected aria-pressed ${selected.ariaPressed}`);
if (!selected.backgroundMatch) failures.push('selected background mismatch');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, labeled, iconed, disabled, selected, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
