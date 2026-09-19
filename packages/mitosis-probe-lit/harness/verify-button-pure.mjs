import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/button-pure.html');
await page.waitForFunction(() => customElements.get('lit-button-pure'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-button-pure');
  return !!el?.shadowRoot?.querySelector('.root');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-button-pure');
  const sr = el.shadowRoot;
  const root = sr?.querySelector('.root');
  const style = sr?.querySelector('style');
  const icon = sr?.querySelector('p-icon');
  const spinner = sr?.querySelector('p-spinner');
  const slot = sr?.querySelector('slot');
  const colorRef = document.querySelector('#color-ref');
  const css = root ? getComputedStyle(root) : null;
  return {
    isDefined: !!customElements.get('lit-button-pure'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasRoot: !!style?.textContent?.includes('.root{'),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasButtonText: !!style?.textContent?.includes('ButtonText'),
    cssTextHasPrimary: !!style?.textContent?.includes('var(--p-color-primary)'),
    cssTextHasIcon: !!style?.textContent?.includes('.icon{position:relative'),
    cssTextHasHover: !!style?.textContent?.includes('@media(hover:hover)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootTag: root?.tagName ?? null,
    rootClass: root?.className ?? null,
    buttonType: root?.getAttribute('type'),
    innerIconTag: icon?.tagName ?? null,
    innerIsLitIcon: icon?.tagName === 'LIT-ICON' || spinner?.tagName === 'LIT-SPINNER',
    iconName: icon?.getAttribute('name'),
    spinnerHidden: spinner ? getComputedStyle(spinner).display === 'none' : false,
    hasSlot: !!slot,
    assigned: slot?.assignedNodes({ flatten: true }).length ?? 0,
    color: css?.color ?? null,
    colorRef: colorRef ? getComputedStyle(colorRef).color : null,
    colorMatch: root && colorRef ? css.color === getComputedStyle(colorRef).color : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const active = await page.evaluate(() => {
  const el = document.querySelector('#active lit-button-pure');
  const style = el.shadowRoot?.querySelector('style');
  const root = el.shadowRoot?.querySelector('.root');
  return {
    cssHasFrosted: !!style?.textContent?.includes('background-color:var(--p-color-frosted)'),
    cssHas5xl: !!style?.textContent?.includes('var(--p-typescale-5xl)'),
    fontSize: root ? getComputedStyle(root).fontSize : null,
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-button-pure');
  const style = el.shadowRoot?.querySelector('style');
  const root = el.shadowRoot?.querySelector('.root');
  const colorRef = document.querySelector('#disabled-ref');
  const css = root ? getComputedStyle(root) : null;
  return {
    cssHasContrastLow: !!style?.textContent?.includes('var(--p-color-contrast-low)'),
    cssHasNotAllowed: !!style?.textContent?.includes('cursor:not-allowed'),
    cssHasNoHover: !style?.textContent?.includes('@media(hover:hover)'),
    ariaDisabled: root?.getAttribute('aria-disabled'),
    colorMatch: root && colorRef ? css.color === getComputedStyle(colorRef).color : false,
  };
});

const loading = await page.evaluate(() => {
  const el = document.querySelector('#loading lit-button-pure');
  const style = el.shadowRoot?.querySelector('style');
  const icon = el.shadowRoot?.querySelector('p-icon');
  const spinner = el.shadowRoot?.querySelector('p-spinner');
  const msg = el.shadowRoot?.querySelector('.loading');
  return {
    cssHidesIcon: !!style?.textContent?.includes('p-icon{display:none}'),
    iconDisplay: icon ? getComputedStyle(icon).display : null,
    spinnerDisplay: spinner ? getComputedStyle(spinner).display : null,
    spinnerTag: spinner?.tagName ?? null,
    spinnerIsLit: spinner?.tagName === 'LIT-SPINNER',
    loadingText: msg?.textContent,
  };
});

const hideLabel = await page.evaluate(() => {
  const el = document.querySelector('#hide-label lit-button-pure');
  const style = el.shadowRoot?.querySelector('style');
  const label = el.shadowRoot?.querySelector('.label');
  return {
    cssHasFullRadius: !!style?.textContent?.includes('var(--p-radius-full)'),
    labelOverflow: label ? getComputedStyle(label).overflow : null,
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-button-pure');
  return getComputedStyle(el).display;
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-button-pure');
  const before = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  el.setAttribute('color', 'contrast-medium');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.setAttribute('color', 'primary');
        resolve({
          beforeHasContrast: before.includes('contrast-medium'),
          afterHasContrast: after.includes('var(--p-color-contrast-medium)'),
        });
      }),
    );
  });
});

await page.setViewportSize({ width: 999, height: 640 });
const at999 = await page.evaluate(() => {
  const el = document.querySelector('#breakpoint lit-button-pure');
  const root = el.shadowRoot?.querySelector('.root');
  const style = el.shadowRoot?.querySelector('style');
  return {
    fontSize: root ? getComputedStyle(root).fontSize : null,
    cssHasMedia: !!style?.textContent?.includes('@media(min-width:1000px)'),
    cssHas5xl: !!style?.textContent?.includes('var(--p-typescale-5xl)'),
  };
});
await page.setViewportSize({ width: 1000, height: 640 });
const at1000 = await page.evaluate(() => {
  const el = document.querySelector('#breakpoint lit-button-pure');
  const root = el.shadowRoot?.querySelector('.root');
  return { fontSize: root ? getComputedStyle(root).fontSize : null };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-button-pure is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasRoot) failures.push('cssText missing .root rules');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasButtonText) failures.push('cssText missing ButtonText');
if (!live.cssTextHasPrimary) failures.push('cssText missing primary token');
if (!live.cssTextHasIcon) failures.push('cssText missing .icon rule');
if (!live.cssTextHasHover) failures.push('cssText missing hover');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootTag !== 'BUTTON') failures.push(`root tag ${live.rootTag}`);
if (live.rootClass !== 'root') failures.push(`root class ${live.rootClass}`);
if (live.buttonType !== 'submit') failures.push(`type ${live.buttonType}`);
if (live.innerIconTag !== 'P-ICON') failures.push(`inner icon ${live.innerIconTag}`);
if (live.innerIsLitIcon) failures.push('inner icon/spinner was swapped to lit-*');
if (live.iconName !== 'arrow-right') failures.push(`icon name ${live.iconName}`);
if (!live.spinnerHidden) failures.push('default spinner should be display:none');
if (!live.hasSlot) failures.push('no slot');
if (!(live.assigned > 0)) failures.push('slot assigned no nodes');
if (!live.colorMatch) failures.push(`color ${live.color} != ref ${live.colorRef}`);
if (live.hostDisplay !== 'inline-block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!active.cssHasFrosted) failures.push('active missing frosted');
if (!active.cssHas5xl) failures.push('active missing 5xl');
if (!disabled.cssHasContrastLow) failures.push('disabled missing contrast-low');
if (!disabled.cssHasNotAllowed) failures.push('disabled missing not-allowed');
if (!disabled.cssHasNoHover) failures.push('disabled still has hover');
if (disabled.ariaDisabled !== 'true') failures.push(`aria-disabled ${disabled.ariaDisabled}`);
if (!disabled.colorMatch) failures.push('disabled color mismatch');
if (!loading.cssHidesIcon) failures.push('loading missing p-icon{display:none}');
if (loading.iconDisplay !== 'none') failures.push(`loading icon display ${loading.iconDisplay}`);
if (loading.spinnerDisplay === 'none') failures.push('loading spinner hidden');
if (loading.spinnerTag !== 'P-SPINNER') failures.push(`spinner tag ${loading.spinnerTag}`);
if (loading.spinnerIsLit) failures.push('spinner was swapped to lit-spinner');
if (loading.loadingText !== 'Loading') failures.push(`loading text ${loading.loadingText}`);
if (!hideLabel.cssHasFullRadius) failures.push('hide-label missing full radius');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterHasContrast) failures.push('attribute change after connect not reactive');
if (!at999.cssHasMedia) failures.push('breakpoint css missing 1000px media');
if (!at999.cssHas5xl) failures.push('breakpoint css missing 5xl token');
if (at999.fontSize === at1000.fontSize) {
  failures.push(`expected size flip 999=${at999.fontSize} vs 1000=${at1000.fontSize}`);
}
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  active,
  disabled,
  loading,
  hideLabel,
  hidden,
  attrChange,
  at999,
  at1000,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
