import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/link-pure.html');
await page.waitForFunction(() => customElements.get('lit-link-pure'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-link-pure');
  return !!el?.shadowRoot?.querySelector('.root') && !!el.shadowRoot.querySelector('p-icon');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-link-pure');
  const sr = el.shadowRoot;
  const root = sr?.querySelector('.root');
  const style = sr?.querySelector('style');
  const icon = sr?.querySelector('p-icon');
  const slot = sr?.querySelector('slot');
  const colorRef = document.querySelector('#color-ref');
  const css = root ? getComputedStyle(root) : null;
  return {
    isDefined: !!customElements.get('lit-link-pure'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasRoot: !!style?.textContent?.includes('.root{'),
    cssTextHasSlotted: !!style?.textContent?.includes('::slotted(a)'),
    cssTextHasForcedColors: !!style?.textContent?.includes('forced-colors'),
    cssTextHasLinkText: !!style?.textContent?.includes('LinkText'),
    cssTextHasPrimary: !!style?.textContent?.includes('var(--p-color-primary)'),
    cssTextHasIcon: !!style?.textContent?.includes('.icon{position:relative'),
    adoptedSheets: sr?.adoptedStyleSheets?.length ?? 0,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootTag: root?.tagName ?? null,
    rootClass: root?.className ?? null,
    innerIconTag: icon?.tagName ?? null,
    innerIsLitIcon: icon?.tagName === 'LIT-ICON',
    iconName: icon?.getAttribute('name'),
    iconColor: icon?.getAttribute('color'),
    iconSize: icon?.getAttribute('size'),
    hasSlot: !!slot,
    assigned: slot?.assignedNodes({ flatten: true }).length ?? 0,
    assignedAnchor: !!el.querySelector('a'),
    color: css?.color ?? null,
    colorRef: colorRef ? getComputedStyle(colorRef).color : null,
    colorMatch: root && colorRef ? css.color === getComputedStyle(colorRef).color : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const active = await page.evaluate(() => {
  const el = document.querySelector('#active lit-link-pure');
  const style = el.shadowRoot?.querySelector('style');
  const root = el.shadowRoot?.querySelector('.root');
  return {
    cssHasFrosted: !!style?.textContent?.includes('background-color:var(--p-color-frosted)'),
    cssHas5xl: !!style?.textContent?.includes('var(--p-typescale-5xl)'),
    cssHasUnderline: !!style?.textContent?.includes('text-decoration:underline'),
    fontSize: root ? getComputedStyle(root).fontSize : null,
    textDecoration: root ? getComputedStyle(root).textDecorationLine : null,
  };
});

const href = await page.evaluate(() => {
  const el = document.querySelector('#href lit-link-pure');
  const style = el.shadowRoot?.querySelector('style');
  return {
    cssHasFocus: !!style?.textContent?.includes('.root:focus-visible::before'),
    cssHasNoSlotted: !style?.textContent?.includes('::slotted(a)'),
  };
});

const noicon = await page.evaluate(() => {
  const el = document.querySelector('#noicon lit-link-pure');
  const style = el.shadowRoot?.querySelector('style');
  const icon = el.shadowRoot?.querySelector('p-icon');
  return {
    cssHidesIcon: !!style?.textContent?.includes('p-icon{display:none}'),
    iconDisplay: icon ? getComputedStyle(icon).display : null,
    iconName: icon?.getAttribute('name'),
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-link-pure');
  return getComputedStyle(el).display;
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-link-pure');
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
  const el = document.querySelector('#breakpoint lit-link-pure');
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
  const el = document.querySelector('#breakpoint lit-link-pure');
  const root = el.shadowRoot?.querySelector('.root');
  return { fontSize: root ? getComputedStyle(root).fontSize : null };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-link-pure is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasRoot) failures.push('cssText missing .root rules');
if (!live.cssTextHasSlotted) failures.push('cssText missing ::slotted(a)');
if (!live.cssTextHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssTextHasLinkText) failures.push('cssText missing LinkText');
if (!live.cssTextHasPrimary) failures.push('cssText missing primary token');
if (!live.cssTextHasIcon) failures.push('cssText missing .icon rule');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootTag !== 'SPAN') failures.push(`root tag ${live.rootTag}`);
if (live.rootClass !== 'root') failures.push(`root class ${live.rootClass}`);
if (live.innerIconTag !== 'P-ICON') failures.push(`inner icon ${live.innerIconTag}`);
if (live.innerIsLitIcon) failures.push('inner icon was swapped to lit-icon');
if (live.iconName !== 'arrow-right') failures.push(`icon name ${live.iconName}`);
if (live.iconColor !== 'inherit') failures.push(`icon color ${live.iconColor}`);
if (live.iconSize !== 'inherit') failures.push(`icon size ${live.iconSize}`);
if (!live.hasSlot) failures.push('no slot');
if (!(live.assigned > 0)) failures.push('slot assigned no nodes');
if (!live.assignedAnchor) failures.push('slotted anchor missing');
if (!live.colorMatch) failures.push(`color ${live.color} != ref ${live.colorRef}`);
if (live.hostDisplay !== 'inline-block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!active.cssHasFrosted) failures.push('active missing frosted');
if (!active.cssHas5xl) failures.push('active missing 5xl');
if (!active.cssHasUnderline) failures.push('active missing underline');
if (!href.cssHasFocus) failures.push('href missing .root:focus-visible');
if (!href.cssHasNoSlotted) failures.push('href still emits slotted-a styles');
if (!noicon.cssHidesIcon) failures.push('no-icon missing p-icon{display:none}');
if (noicon.iconDisplay !== 'none') failures.push(`no-icon display ${noicon.iconDisplay}`);
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
  href,
  noicon,
  hidden,
  attrChange,
  at999,
  at1000,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
