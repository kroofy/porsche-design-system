import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/tag-dismissible.html');
await page.waitForFunction(() => customElements.get('lit-tag-dismissible'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-tag-dismissible');
  return !!el?.shadowRoot?.querySelector('button') && !!el.shadowRoot.querySelector('p-icon');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-tag-dismissible');
  const sr = el.shadowRoot;
  const root = sr?.querySelector('button');
  const style = sr?.querySelector('style');
  const icon = sr?.querySelector('p-icon');
  const slot = sr?.querySelector('slot');
  const label = sr?.querySelector('.label');
  const bgRef = document.querySelector('#bg-ref');
  const colorRef = document.querySelector('#color-ref');
  const css = root ? getComputedStyle(root) : null;
  return {
    isDefined: !!customElements.get('lit-tag-dismissible'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasButton: !!style?.textContent?.includes('button{'),
    cssTextHasScale: !!style?.textContent?.includes('--_p-tag-dismissible-a:1'),
    cssTextHasFrosted: !!style?.textContent?.includes('var(--p-color-frosted)'),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasCanvasText: !!style?.textContent?.includes('CanvasText'),
    cssTextHasNoLabelPad: !!style?.textContent?.includes('calc(28px *'),
    adoptedSheets: sr?.adoptedStyleSheets?.length ?? 0,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootTag: root?.tagName ?? null,
    buttonType: root?.getAttribute('type'),
    innerIconTag: icon?.tagName ?? null,
    innerIsLitIcon: icon?.tagName === 'LIT-ICON',
    iconName: icon?.getAttribute('name'),
    hasSlot: !!slot,
    assigned: slot?.assignedNodes({ flatten: true }).length ?? 0,
    labelHidden: label ? getComputedStyle(label).display === 'none' : false,
    srOnly: sr?.querySelector('.sr-only')?.textContent,
    background: css?.backgroundColor ?? null,
    backgroundRef: bgRef ? getComputedStyle(bgRef).backgroundColor : null,
    backgroundMatch: root && bgRef ? css.backgroundColor === getComputedStyle(bgRef).backgroundColor : false,
    color: css?.color ?? null,
    colorRef: colorRef ? getComputedStyle(colorRef).color : null,
    colorMatch: root && colorRef ? css.color === getComputedStyle(colorRef).color : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const withLabel = await page.evaluate(() => {
  const el = document.querySelector('#with-label lit-tag-dismissible');
  const style = el.shadowRoot?.querySelector('style');
  const label = el.shadowRoot?.querySelector('.label');
  const labelRef = document.querySelector('#label-ref');
  return {
    cssHasLabelPad: !!style?.textContent?.includes('calc(16.8px *'),
    cssHasLabelRule: !!style?.textContent?.includes('.label{display:block'),
    labelText: label?.textContent,
    labelDisplay: label ? getComputedStyle(label).display : null,
    labelColor: label ? getComputedStyle(label).color : null,
    labelColorRef: labelRef ? getComputedStyle(labelRef).color : null,
    labelColorMatch: label && labelRef ? getComputedStyle(label).color === getComputedStyle(labelRef).color : false,
  };
});

const compact = await page.evaluate(() => {
  const el = document.querySelector('#compact lit-tag-dismissible');
  const style = el.shadowRoot?.querySelector('style');
  return {
    cssHasCompactScale: !!style?.textContent?.includes('--_p-tag-dismissible-a:0.64285714'),
    cssHasLgRadius: !!style?.textContent?.includes('var(--p-radius-lg)'),
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-tag-dismissible');
  return getComputedStyle(el).display;
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-tag-dismissible');
  const before = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  el.setAttribute('label', 'Extra');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        const label = el.shadowRoot?.querySelector('.label');
        el.removeAttribute('label');
        resolve({
          beforeHasLabelPad: before.includes('16.8px'),
          afterHasLabelPad: after.includes('16.8px'),
          labelText: label?.textContent,
        });
      })
    );
  });
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-tag-dismissible is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasButton) failures.push('cssText missing button rules');
if (!live.cssTextHasScale) failures.push('cssText missing scale var');
if (!live.cssTextHasFrosted) failures.push('cssText missing frosted token');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasCanvasText) failures.push('cssText missing CanvasText');
if (!live.cssTextHasNoLabelPad) failures.push('cssText missing no-label padding');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootTag !== 'BUTTON') failures.push(`root tag ${live.rootTag}`);
if (live.buttonType !== 'button') failures.push(`button type ${live.buttonType}`);
if (live.innerIconTag !== 'P-ICON') failures.push(`inner icon ${live.innerIconTag}`);
if (live.innerIsLitIcon) failures.push('inner icon was swapped to lit-icon');
if (live.iconName !== 'close') failures.push(`icon name ${live.iconName}`);
if (!live.hasSlot) failures.push('no slot');
if (!(live.assigned > 0)) failures.push('slot assigned no nodes');
if (!live.labelHidden) failures.push('empty label span is visible');
if (live.srOnly !== 'Remove:') failures.push(`sr-only ${live.srOnly}`);
if (!live.backgroundMatch) failures.push(`background ${live.background} != ref ${live.backgroundRef}`);
if (!live.colorMatch) failures.push(`color ${live.color} != ref ${live.colorRef}`);
if (live.hostDisplay !== 'inline-block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!withLabel.cssHasLabelPad) failures.push('labeled host missing 16.8px pad');
if (!withLabel.cssHasLabelRule) failures.push('labeled host missing .label rule');
if (withLabel.labelText !== 'Some label') failures.push(`label text ${withLabel.labelText}`);
if (withLabel.labelDisplay !== 'block') failures.push(`label display ${withLabel.labelDisplay}`);
if (!withLabel.labelColorMatch) failures.push(`label color ${withLabel.labelColor} != ref ${withLabel.labelColorRef}`);
if (!compact.cssHasCompactScale) failures.push('compact missing scale 0.64285714');
if (!compact.cssHasLgRadius) failures.push('compact missing radius-lg');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterHasLabelPad) failures.push('attribute change after connect not reactive');
if (attrChange.labelText !== 'Extra') failures.push(`attr label text ${attrChange.labelText}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  withLabel,
  compact,
  hidden,
  attrChange,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
