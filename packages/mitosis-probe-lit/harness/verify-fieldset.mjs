import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/fieldset.html');
await page.waitForFunction(() => customElements.get('lit-fieldset'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-fieldset');
  return !!el?.shadowRoot?.querySelector('fieldset');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-fieldset');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const legend = sr?.querySelector('legend');
  const slot = sr?.querySelector('slot:not([name])');
  return {
    isDefined: !!customElements.get('lit-fieldset'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasFieldset: !!style?.textContent?.includes('fieldset{'),
    cssTextHasLegend: !!style?.textContent?.includes('legend{all:unset'),
    cssTextHasMedium: !!style?.textContent?.includes('var(--p-typescale-md)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    legendText: legend?.textContent,
    hasDefaultSlot: !!slot,
    slotted: slot ? slot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const small = await page.evaluate(() => {
  const el = document.querySelector('#small lit-fieldset');
  const style = el.shadowRoot?.querySelector('style');
  const legend = el.shadowRoot?.querySelector('legend');
  return {
    cssHasSmall: !!style?.textContent?.includes('var(--p-typescale-sm)') && !!style?.textContent?.includes('var(--p-font-weight-semibold)'),
    cssHasMedium: !!style?.textContent?.includes('var(--p-typescale-md)'),
    fontWeight: legend ? getComputedStyle(legend).fontWeight : null,
  };
});

const success = await page.evaluate(() => {
  const el = document.querySelector('#success lit-fieldset');
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
  const el = document.querySelector('#error lit-fieldset');
  const icon = el.shadowRoot?.querySelector('.message p-icon');
  const msg = el.shadowRoot?.querySelector('.message');
  const ref = document.querySelector('#error-ref');
  return {
    iconName: icon?.getAttribute('name'),
    colorMatch: msg && ref ? getComputedStyle(msg).color === getComputedStyle(ref).color : false,
  };
});

const noLabel = await page.evaluate(() => {
  const el = document.querySelector('#no-label lit-fieldset');
  const legend = el.shadowRoot?.querySelector('legend');
  return {
    display: legend ? getComputedStyle(legend).display : null,
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-fieldset')).display);

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-fieldset');
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
          afterHasError: after.includes('var(--p-color-error)'),
        });
      }),
    );
  });
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-fieldset is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasFieldset) failures.push('cssText missing fieldset rules');
if (!live.cssTextHasLegend) failures.push('cssText missing legend rules');
if (!live.cssTextHasMedium) failures.push('default legend not typescale-md');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.legendText !== 'Some legend label') failures.push(`legend ${live.legendText}`);
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (!live.slotted.includes('slot child')) failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!small.cssHasSmall) failures.push('small label-size missing semibold/typescale-sm');
if (small.cssHasMedium) failures.push('small label-size still has typescale-md');
if (success.iconName !== 'check') failures.push(`success icon ${success.iconName}`);
if (success.iconColor !== 'success') failures.push(`success color attr ${success.iconColor}`);
if (success.iconTag !== 'P-ICON') failures.push(`message icon ${success.iconTag}`);
if (success.iconIsLit) failures.push('message icon was swapped to lit-icon');
if (success.text !== 'Some message.') failures.push(`success text ${success.text}`);
if (!success.colorMatch) failures.push('success color mismatch');
if (errorState.iconName !== 'exclamation') failures.push(`error icon ${errorState.iconName}`);
if (!errorState.colorMatch) failures.push('error color mismatch');
if (noLabel.display !== 'none') failures.push(`no-label legend display ${noLabel.display}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterHasError) failures.push('attribute change after connect not reactive');
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  small,
  success,
  errorState,
  noLabel,
  hidden,
  attrChange,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
