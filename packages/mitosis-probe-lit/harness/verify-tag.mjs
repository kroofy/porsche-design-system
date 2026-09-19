import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/tag.html');
await page.waitForFunction(() => customElements.get('lit-tag'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-tag');
  return !!el?.shadowRoot?.querySelector('span') && !!el.shadowRoot.querySelector('p-icon');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-tag');
  const sr = el.shadowRoot;
  const root = sr?.querySelector('span');
  const style = sr?.querySelector('style');
  const icon = sr?.querySelector('p-icon');
  const slot = sr?.querySelector('slot');
  const colorRef = document.querySelector('#color-ref');
  const textRef = document.querySelector('#text-ref');
  const css = root ? getComputedStyle(root) : null;
  return {
    isDefined: !!customElements.get('lit-tag'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasSpan: !!style?.textContent?.includes('span{'),
    cssTextHasSlotted: !!style?.textContent?.includes('::slotted(button)'),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasCanvasText: !!style?.textContent?.includes('CanvasText'),
    cssTextHasPrimaryBg: !!style?.textContent?.includes('var(--p-color-primary)'),
    cssTextHasIcon: !!style?.textContent?.includes('.icon{margin-inline-start:-2px}'),
    adoptedSheets: sr?.adoptedStyleSheets?.length ?? 0,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootTag: root?.tagName ?? null,
    innerIconTag: icon?.tagName ?? null,
    innerIsLitIcon: icon?.tagName === 'LIT-ICON',
    iconName: icon?.getAttribute('name'),
    iconColor: icon?.getAttribute('color'),
    iconSize: icon?.getAttribute('size'),
    hasSlot: !!slot,
    assigned: slot?.assignedNodes({ flatten: true }).length ?? 0,
    assignedButton: !!el.querySelector('button'),
    background: css?.backgroundColor ?? null,
    backgroundRef: colorRef ? getComputedStyle(colorRef).backgroundColor : null,
    backgroundMatch: root && colorRef ? css.backgroundColor === getComputedStyle(colorRef).backgroundColor : false,
    color: css?.color ?? null,
    colorRef: textRef ? getComputedStyle(textRef).color : null,
    colorMatch: root && textRef ? css.color === getComputedStyle(textRef).color : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const secondary = await page.evaluate(() => {
  const el = document.querySelector('#secondary lit-tag');
  const style = el.shadowRoot?.querySelector('style');
  return {
    cssHasFrostedStrong: !!style?.textContent?.includes('var(--p-color-frosted-strong)'),
    cssHasBlur: !!style?.textContent?.includes('backdrop-filter:var(--p-blur-frosted)'),
  };
});

const noicon = await page.evaluate(() => {
  const el = document.querySelector('#noicon lit-tag');
  const style = el.shadowRoot?.querySelector('style');
  const icon = el.shadowRoot?.querySelector('p-icon');
  return {
    cssHidesIcon: !!style?.textContent?.includes('p-icon{display:none}'),
    iconDisplay: icon ? getComputedStyle(icon).display : null,
  };
});

const source = await page.evaluate(() => {
  const el = document.querySelector('#source lit-tag');
  const icon = el.shadowRoot?.querySelector('p-icon');
  el.iconSource = el.getAttribute('icon-source') || el.getAttribute('iconsource') || '';
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('p-icon');
        resolve({
          sourceAttr: el.getAttribute('icon-source'),
          iconSource: after?.getAttribute('source') || after?.source || el.iconSrc,
        });
      })
    );
  });
});

const compact = await page.evaluate(() => {
  const el = document.querySelector('#compact lit-tag');
  const style = el.shadowRoot?.querySelector('style');
  return {
    cssHasCompactPad: !!style?.textContent?.includes('var(--p-spacing-static-2xs) var(--p-spacing-static-sm)'),
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-tag');
  return getComputedStyle(el).display;
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-tag');
  const before = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  el.setAttribute('variant', 'error');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.setAttribute('variant', 'primary');
        resolve({ beforeHasError: before.includes('error'), afterHasError: after.includes('var(--p-color-error)') });
      })
    );
  });
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-tag is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasSpan) failures.push('cssText missing span rules');
if (!live.cssTextHasSlotted) failures.push('cssText missing ::slotted(button)');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasCanvasText) failures.push('cssText missing CanvasText');
if (!live.cssTextHasPrimaryBg) failures.push('cssText missing primary token');
if (!live.cssTextHasIcon) failures.push('cssText missing .icon rule');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootTag !== 'SPAN') failures.push(`root tag ${live.rootTag}`);
if (live.innerIconTag !== 'P-ICON') failures.push(`inner icon ${live.innerIconTag}`);
if (live.innerIsLitIcon) failures.push('inner icon was swapped to lit-icon');
if (live.iconName !== 'car') failures.push(`icon name ${live.iconName}`);
if (live.iconColor !== 'inherit') failures.push(`icon color ${live.iconColor}`);
if (live.iconSize !== 'x-small') failures.push(`icon size ${live.iconSize}`);
if (!live.hasSlot) failures.push('no slot');
if (!(live.assigned > 0)) failures.push('slot assigned no nodes');
if (!live.assignedButton) failures.push('slotted button missing');
if (!live.backgroundMatch) failures.push(`background ${live.background} != ref ${live.backgroundRef}`);
if (!live.colorMatch) failures.push(`color ${live.color} != ref ${live.colorRef}`);
if (live.hostDisplay !== 'inline-flex') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!secondary.cssHasFrostedStrong) failures.push('secondary missing frosted-strong');
if (!secondary.cssHasBlur) failures.push('secondary missing backdrop-filter');
if (!noicon.cssHidesIcon) failures.push('no-icon missing p-icon{display:none}');
if (noicon.iconDisplay !== 'none') failures.push(`no-icon display ${noicon.iconDisplay}`);
if (!source.sourceAttr) failures.push('icon-source attribute dropped');
if (!compact.cssHasCompactPad) failures.push('compact padding missing');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterHasError) failures.push('attribute change after connect not reactive');
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  secondary,
  noicon,
  source,
  compact,
  hidden,
  attrChange,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
