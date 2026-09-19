import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/stepper-horizontal-item.html');
await page.waitForFunction(() => customElements.get('lit-stepper-horizontal-item'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-stepper-horizontal-item')?.shadowRoot?.querySelector('button'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-stepper-horizontal-item');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const button = sr?.querySelector('button');
  const slot = sr?.querySelector('slot:not([name])');
  const icon = sr?.querySelector('.icon');
  const ref = document.querySelector('#frosted-ref');
  return {
    isDefined: !!customElements.get('lit-stepper-horizontal-item'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostInherit: css.includes(':host{font-size:inherit !important'),
    cssHasCurrentBg: css.includes('background:var(--p-color-frosted)'),
    cssHasNth: css.includes(':host(:nth-of-type(1)) .icon::before'),
    cssHasMedia1000: false,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    role: el.getAttribute('role'),
    parentTag: el.parentElement?.tagName ?? null,
    buttonAriaCurrent: button?.getAttribute('aria-current'),
    iconTag: icon?.tagName ?? null,
    hasDefaultSlot: !!slot,
    slotted: slot ? slot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    bgMatch: button && ref ? getComputedStyle(button).backgroundColor === getComputedStyle(ref).backgroundColor : false,
    innerLit: !!sr?.querySelector('lit-icon'),
    unsetOpacity: getComputedStyle(document.querySelector('#default lit-stepper-horizontal-item:nth-of-type(2)')).opacity,
  };
});

const icons = await page.evaluate(() => {
  const complete = document.querySelector('#icons lit-stepper-horizontal-item[state="complete"]');
  const warning = document.querySelector('#icons lit-stepper-horizontal-item[state="warning"]');
  const completeIcon = complete?.shadowRoot?.querySelector('p-icon');
  const warningIcon = warning?.shadowRoot?.querySelector('p-icon');
  return {
    completeTag: completeIcon?.tagName ?? null,
    completeName: completeIcon?.getAttribute('name') ?? completeIcon?.name,
    warningTag: warningIcon?.tagName ?? null,
    warningName: warningIcon?.getAttribute('name') ?? warningIcon?.name,
    completeSr: complete?.shadowRoot?.querySelector('.sr-only')?.textContent,
  };
});

const hidden = await page.evaluate(
  () => getComputedStyle(document.querySelector('#hidden lit-stepper-horizontal-item')).display,
);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-stepper-horizontal-item is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostInherit) failures.push('cssText missing host inherit');
if (!live.cssHasCurrentBg) failures.push('cssText missing current frosted fill');
if (!live.cssHasNth) failures.push('cssText missing nth-of-type number masks');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout-affecting .root wrapper leaked');
if (live.role !== 'listitem') failures.push(`role ${live.role}`);
if (live.parentTag !== 'P-STEPPER-HORIZONTAL') failures.push(`parent ${live.parentTag}`);
if (live.buttonAriaCurrent !== 'step') failures.push(`aria-current ${live.buttonAriaCurrent}`);
if (live.iconTag !== 'SPAN') failures.push(`current icon tag ${live.iconTag}`);
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (!live.slotted.includes('Enter personal details')) failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (!live.bgMatch) failures.push('current background mismatch vs --p-color-frosted');
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (live.unsetOpacity !== '0.4') failures.push(`unset opacity ${live.unsetOpacity}`);
if (icons.completeTag !== 'P-ICON') failures.push(`complete icon ${icons.completeTag}`);
if (icons.completeName !== 'success') failures.push(`complete name ${icons.completeName}`);
if (icons.warningTag !== 'P-ICON') failures.push(`warning icon ${icons.warningTag}`);
if (icons.warningName !== 'warning') failures.push(`warning name ${icons.warningName}`);
if (icons.completeSr !== 'complete: ') failures.push(`sr-only ${JSON.stringify(icons.completeSr)}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, icons, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
