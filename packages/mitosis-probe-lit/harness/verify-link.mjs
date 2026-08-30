import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/link.html');
await page.waitForFunction(() => customElements.get('lit-link'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-link');
  return !!el?.shadowRoot?.querySelector('.root');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-link');
  const sr = el.shadowRoot;
  const root = sr?.querySelector('.root');
  const style = sr?.querySelector('style');
  const icon = sr?.querySelector('p-icon');
  const slot = sr?.querySelector('slot');
  const bgRef = document.querySelector('#bg-ref');
  const fgRef = document.querySelector('#fg-ref');
  const css = root ? getComputedStyle(root) : null;
  return {
    isDefined: !!customElements.get('lit-link'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasRoot: !!style?.textContent?.includes('.root{'),
    cssTextHasSlotted: !!style?.textContent?.includes('::slotted(a)'),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasLinkText: !!style?.textContent?.includes('LinkText'),
    cssTextHasPrimary: !!style?.textContent?.includes('var(--p-color-primary)'),
    cssTextHasScale: !!style?.textContent?.includes('--_p-link-a:1'),
    adoptedSheets: sr?.adoptedStyleSheets?.length ?? 0,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootTag: root?.tagName ?? null,
    rootClass: root?.className ?? null,
    innerIconTag: icon?.tagName ?? null,
    innerIsLitIcon: icon?.tagName === 'LIT-ICON',
    iconHidden: icon ? getComputedStyle(icon).display === 'none' : false,
    hasSlot: !!slot,
    assigned: slot?.assignedNodes({ flatten: true }).length ?? 0,
    assignedAnchor: !!el.querySelector('a'),
    background: css?.backgroundColor ?? null,
    backgroundRef: bgRef ? getComputedStyle(bgRef).backgroundColor : null,
    backgroundMatch: root && bgRef ? css.backgroundColor === getComputedStyle(bgRef).backgroundColor : false,
    color: css?.color ?? null,
    colorRef: fgRef ? getComputedStyle(fgRef).color : null,
    colorMatch: root && fgRef ? css.color === getComputedStyle(fgRef).color : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const secondary = await page.evaluate(() => {
  const el = document.querySelector('#secondary lit-link');
  const style = el.shadowRoot?.querySelector('style');
  const root = el.shadowRoot?.querySelector('.root');
  const bgRef = document.querySelector('#secondary-bg-ref');
  const css = root ? getComputedStyle(root) : null;
  return {
    cssHasFrostedStrong: !!style?.textContent?.includes('var(--p-color-frosted-strong)'),
    backgroundMatch: root && bgRef ? css.backgroundColor === getComputedStyle(bgRef).backgroundColor : false,
  };
});

const withIcon = await page.evaluate(() => {
  const el = document.querySelector('#icon lit-link');
  const icon = el.shadowRoot?.querySelector('p-icon');
  return {
    iconName: icon?.getAttribute('name'),
    iconDisplay: icon ? getComputedStyle(icon).display : null,
    innerTag: icon?.tagName ?? null,
  };
});

const hideLabel = await page.evaluate(() => {
  const el = document.querySelector('#hide-label lit-link');
  const style = el.shadowRoot?.querySelector('style');
  const label = el.shadowRoot?.querySelector('.label');
  const host = getComputedStyle(el);
  return {
    cssHasFullRadius: !!style?.textContent?.includes('var(--p-radius-full)'),
    labelPosition: label ? getComputedStyle(label).position : null,
    hostRadius: host.borderRadius,
  };
});

const href = await page.evaluate(() => {
  const el = document.querySelector('#href lit-link');
  const style = el.shadowRoot?.querySelector('style');
  return {
    cssHasFocus: !!style?.textContent?.includes('.root:focus-visible'),
    cssHasNoSlotted: !style?.textContent?.includes('::slotted(a)'),
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-link');
  return getComputedStyle(el).display;
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-link');
  const before = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  el.setAttribute('variant', 'secondary');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.setAttribute('variant', 'primary');
        resolve({
          beforeHasSecondary: before.includes('frosted-strong'),
          afterHasSecondary: after.includes('var(--p-color-frosted-strong)'),
        });
      }),
    );
  });
});

await page.setViewportSize({ width: 999, height: 640 });
const at999 = await page.evaluate(() => {
  const el = document.querySelector('#breakpoint lit-link');
  const label = el.shadowRoot?.querySelector('.label');
  const style = el.shadowRoot?.querySelector('style');
  return {
    labelPosition: label ? getComputedStyle(label).position : null,
    cssHasMedia: !!style?.textContent?.includes('@media(min-width:1000px)'),
  };
});
await page.setViewportSize({ width: 1000, height: 640 });
const at1000 = await page.evaluate(() => {
  const el = document.querySelector('#breakpoint lit-link');
  const label = el.shadowRoot?.querySelector('.label');
  return { labelPosition: label ? getComputedStyle(label).position : null };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-link is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasRoot) failures.push('cssText missing .root rules');
if (!live.cssTextHasSlotted) failures.push('cssText missing ::slotted(a)');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasLinkText) failures.push('cssText missing LinkText');
if (!live.cssTextHasPrimary) failures.push('cssText missing primary token');
if (!live.cssTextHasScale) failures.push('cssText missing --_p-link-a');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootTag !== 'SPAN') failures.push(`root tag ${live.rootTag}`);
if (live.rootClass !== 'root') failures.push(`root class ${live.rootClass}`);
if (live.innerIconTag !== 'P-ICON') failures.push(`inner icon ${live.innerIconTag}`);
if (live.innerIsLitIcon) failures.push('inner icon was swapped to lit-icon');
if (!live.iconHidden) failures.push('default icon should be display:none');
if (!live.hasSlot) failures.push('no slot');
if (!(live.assigned > 0)) failures.push('slot assigned no nodes');
if (!live.assignedAnchor) failures.push('slotted anchor missing');
if (!live.backgroundMatch) failures.push(`background ${live.background} != ref ${live.backgroundRef}`);
if (!live.colorMatch) failures.push(`color ${live.color} != ref ${live.colorRef}`);
if (live.hostDisplay !== 'inline-block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!secondary.cssHasFrostedStrong) failures.push('secondary missing frosted-strong');
if (!secondary.backgroundMatch) failures.push('secondary background mismatch');
if (withIcon.iconName !== 'car') failures.push(`icon name ${withIcon.iconName}`);
if (withIcon.innerTag !== 'P-ICON') failures.push(`icon tag ${withIcon.innerTag}`);
if (withIcon.iconDisplay === 'none') failures.push('car icon hidden');
if (!hideLabel.cssHasFullRadius) failures.push('hide-label missing full radius');
if (hideLabel.labelPosition !== 'absolute') failures.push(`hide-label position ${hideLabel.labelPosition}`);
if (!href.cssHasFocus) failures.push('href missing .root:focus-visible');
if (!href.cssHasNoSlotted) failures.push('href still emits slotted-a styles');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterHasSecondary) failures.push('attribute change after connect not reactive');
if (!at999.cssHasMedia) failures.push('breakpoint css missing 1000px media');
if (at999.labelPosition !== 'absolute') failures.push(`999 label ${at999.labelPosition}`);
if (at1000.labelPosition !== 'static') failures.push(`1000 label ${at1000.labelPosition}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  secondary,
  withIcon,
  hideLabel,
  href,
  hidden,
  attrChange,
  at999,
  at1000,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
