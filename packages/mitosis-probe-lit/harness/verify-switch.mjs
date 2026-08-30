import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/switch.html');
await page.waitForFunction(() => customElements.get('lit-switch'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-switch');
  return !!el?.shadowRoot?.querySelector('button');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-switch');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const button = sr?.querySelector('button');
  const toggle = sr?.querySelector('.toggle');
  const spinner = sr?.querySelector('p-spinner');
  const slot = sr?.querySelector('slot');
  const wrap = sr?.querySelector('.wrap');
  const bgRef = document.querySelector('#bg-ref');
  const toggleRef = document.querySelector('#toggle-ref');
  const css = button ? getComputedStyle(button) : null;
  const toggleCss = toggle ? getComputedStyle(toggle) : null;
  return {
    isDefined: !!customElements.get('lit-switch'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasButton: !!style?.textContent?.includes('button{'),
    cssTextHasScale: !!style?.textContent?.includes('--_p-switch-a:1'),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasHover: !!style?.textContent?.includes('@media(hover:hover)'),
    cssTextHasContents: !!style?.textContent?.includes('display:contents'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    wrapDisplay: wrap ? getComputedStyle(wrap).display : null,
    buttonRole: button?.getAttribute('role'),
    buttonType: button?.getAttribute('type'),
    ariaChecked: button?.getAttribute('aria-checked'),
    innerSpinnerTag: spinner?.tagName ?? null,
    innerIsLit: spinner?.tagName === 'LIT-SPINNER',
    spinnerHidden: spinner ? getComputedStyle(spinner).display === 'none' : false,
    hasSlot: !!slot,
    assigned: slot?.assignedNodes({ flatten: true }).length ?? 0,
    background: css?.backgroundColor ?? null,
    backgroundMatch: button && bgRef ? css.backgroundColor === getComputedStyle(bgRef).backgroundColor : false,
    toggleMatch: toggle && toggleRef ? toggleCss.backgroundColor === getComputedStyle(toggleRef).backgroundColor : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const checked = await page.evaluate(() => {
  const el = document.querySelector('#checked lit-switch');
  const style = el.shadowRoot?.querySelector('style');
  const button = el.shadowRoot?.querySelector('button');
  const toggle = el.shadowRoot?.querySelector('.toggle');
  const bgRef = document.querySelector('#checked-bg-ref');
  const toggleRef = document.querySelector('#checked-toggle-ref');
  const css = button ? getComputedStyle(button) : null;
  const toggleCss = toggle ? getComputedStyle(toggle) : null;
  return {
    cssHasSuccess: !!style?.textContent?.includes('var(--p-color-success)'),
    ariaChecked: button?.getAttribute('aria-checked'),
    backgroundMatch: button && bgRef ? css.backgroundColor === getComputedStyle(bgRef).backgroundColor : false,
    toggleMatch: toggle && toggleRef ? toggleCss.backgroundColor === getComputedStyle(toggleRef).backgroundColor : false,
    transform: toggleCss?.transform ?? null,
  };
});

const loading = await page.evaluate(() => {
  const el = document.querySelector('#loading lit-switch');
  const style = el.shadowRoot?.querySelector('style');
  const spinner = el.shadowRoot?.querySelector('p-spinner');
  const toggle = el.shadowRoot?.querySelector('.toggle');
  const msg = el.shadowRoot?.querySelector('.loading');
  return {
    cssHasSpinner: !!style?.textContent?.includes('.spinner{'),
    cssHasNoHover: !style?.textContent?.includes('@media(hover:hover)'),
    spinnerDisplay: spinner ? getComputedStyle(spinner).display : null,
    spinnerTag: spinner?.tagName ?? null,
    spinnerIsLit: spinner?.tagName === 'LIT-SPINNER',
    toggleBg: toggle ? getComputedStyle(toggle).backgroundColor : null,
    loadingText: msg?.textContent,
    ariaDisabled: el.shadowRoot?.querySelector('button')?.getAttribute('aria-disabled'),
  };
});

const disabled = await page.evaluate(() => {
  const el = document.querySelector('#disabled lit-switch');
  const style = el.shadowRoot?.querySelector('style');
  return {
    cssHasOpacity: !!style?.textContent?.includes('opacity:0.4'),
    cssHasNotAllowed: !!style?.textContent?.includes('cursor:not-allowed'),
    cssHasNoHover: !style?.textContent?.includes('@media(hover:hover)'),
    hostOpacity: getComputedStyle(el).opacity,
    ariaDisabled: el.shadowRoot?.querySelector('button')?.getAttribute('aria-disabled'),
  };
});

const hideLabel = await page.evaluate(() => {
  const el = document.querySelector('#hide-label lit-switch');
  const label = el.shadowRoot?.querySelector('label');
  return {
    overflow: label ? getComputedStyle(label).overflow : null,
  };
});

const stretch = await page.evaluate(() => {
  const el = document.querySelector('#stretch lit-switch');
  const style = el.shadowRoot?.querySelector('style');
  return {
    cssHasFlex: !!style?.textContent?.includes('display:flex;justify-content:space-between'),
    hostDisplay: getComputedStyle(el).display,
    hostWidth: getComputedStyle(el).width,
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-switch');
  return getComputedStyle(el).display;
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-switch');
  const before = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  el.setAttribute('checked', 'true');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.removeAttribute('checked');
        resolve({
          beforeHasSuccess: before.includes('var(--p-color-success)'),
          afterHasSuccess: after.includes('var(--p-color-success-frosted-soft)'),
        });
      }),
    );
  });
});

await page.setViewportSize({ width: 999, height: 640 });
const at999 = await page.evaluate(() => {
  const el = document.querySelector('#breakpoint lit-switch');
  const style = el.shadowRoot?.querySelector('style');
  return {
    display: getComputedStyle(el).display,
    cssHasMedia: !!style?.textContent?.includes('@media(min-width:1000px)'),
    width: el.getBoundingClientRect().width,
  };
});
await page.setViewportSize({ width: 1000, height: 640 });
const at1000 = await page.evaluate(() => {
  const el = document.querySelector('#breakpoint lit-switch');
  return {
    display: getComputedStyle(el).display,
    width: el.getBoundingClientRect().width,
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-switch is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasButton) failures.push('cssText missing button rules');
if (!live.cssTextHasScale) failures.push('cssText missing --_p-switch-a:1');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasHover) failures.push('cssText missing hover');
if (!live.cssTextHasContents) failures.push('cssText missing display:contents');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.wrapDisplay !== 'contents') failures.push(`wrap display ${live.wrapDisplay}`);
if (live.buttonRole !== 'switch') failures.push(`role ${live.buttonRole}`);
if (live.buttonType !== 'button') failures.push(`type ${live.buttonType}`);
if (live.ariaChecked !== 'false') failures.push(`aria-checked ${live.ariaChecked}`);
if (live.innerSpinnerTag !== 'P-SPINNER') failures.push(`spinner ${live.innerSpinnerTag}`);
if (live.innerIsLit) failures.push('spinner was swapped to lit-spinner');
if (!live.spinnerHidden) failures.push('default spinner should be display:none');
if (!live.hasSlot) failures.push('no slot');
if (!(live.assigned > 0)) failures.push('slot assigned no nodes');
if (!live.backgroundMatch) failures.push(`bg ${live.background} != ref`);
if (!live.toggleMatch) failures.push('toggle color mismatch');
if (live.hostDisplay !== 'inline-flex') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!checked.cssHasSuccess) failures.push('checked missing success token');
if (checked.ariaChecked !== 'true') failures.push(`checked aria ${checked.ariaChecked}`);
if (!checked.backgroundMatch) failures.push('checked background mismatch');
if (!checked.toggleMatch) failures.push('checked toggle mismatch');
if (!loading.cssHasSpinner) failures.push('loading missing .spinner');
if (!loading.cssHasNoHover) failures.push('loading still has hover');
if (loading.spinnerDisplay === 'none') failures.push('loading spinner hidden');
if (loading.spinnerTag !== 'P-SPINNER') failures.push(`spinner tag ${loading.spinnerTag}`);
if (loading.spinnerIsLit) failures.push('spinner was swapped to lit-spinner');
if (loading.toggleBg !== 'rgba(0, 0, 0, 0)') failures.push(`loading toggle bg ${loading.toggleBg}`);
if (loading.loadingText !== 'Loading') failures.push(`loading text ${loading.loadingText}`);
if (loading.ariaDisabled !== 'true') failures.push(`loading aria-disabled ${loading.ariaDisabled}`);
if (!disabled.cssHasOpacity) failures.push('disabled missing opacity');
if (!disabled.cssHasNotAllowed) failures.push('disabled missing not-allowed');
if (!disabled.cssHasNoHover) failures.push('disabled still has hover');
if (disabled.hostOpacity !== '0.4') failures.push(`disabled opacity ${disabled.hostOpacity}`);
if (disabled.ariaDisabled !== 'true') failures.push(`aria-disabled ${disabled.ariaDisabled}`);
if (hideLabel.overflow !== 'hidden') failures.push(`hide-label overflow ${hideLabel.overflow}`);
if (!stretch.cssHasFlex) failures.push('stretch missing flex host');
if (stretch.hostDisplay !== 'flex') failures.push(`stretch display ${stretch.hostDisplay}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterHasSuccess) failures.push('attribute change after connect not reactive');
if (!at999.cssHasMedia) failures.push('breakpoint css missing 1000px media');
if (at999.display !== 'inline-flex') failures.push(`999 display ${at999.display}`);
if (at1000.display !== 'flex') failures.push(`1000 display ${at1000.display}`);
if (!(at1000.width > at999.width)) {
  failures.push(`expected width flip 999=${at999.width} vs 1000=${at1000.width}`);
}
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  checked,
  loading,
  disabled,
  hideLabel,
  stretch,
  hidden,
  attrChange,
  at999,
  at1000,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
