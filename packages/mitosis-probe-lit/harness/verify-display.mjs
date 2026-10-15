import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/display.html');
await page.waitForFunction(() => customElements.get('lit-display'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-display');
  return !!el?.shadowRoot?.querySelector('h3') && el.textContent.includes('ABC');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-display');
  const sr = el.shadowRoot;
  const root = sr?.querySelector('h3');
  const style = sr?.querySelector('style');
  const slot = sr?.querySelector('slot');
  const sizeRef = document.querySelector('#size-ref');
  const colorRef = document.querySelector('#color-ref');
  const css = root ? getComputedStyle(root) : null;
  return {
    isDefined: !!customElements.get('lit-display'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasRoot: !!style?.textContent?.includes('h3{'),
    cssTextHasTypescale: !!style?.textContent?.includes('var(--p-typescale-3xl)'),
    cssTextHasSlotted: !!style?.textContent?.includes('::slotted(:is(h1,h2,h3,h4,h5,h6))'),
    cssTextHasMedia: !!document.querySelector('#bp lit-display')?.shadowRoot
      ?.querySelector('style')
      ?.textContent?.includes('@media(min-width:1000px)'),
    adoptedSheets: sr?.adoptedStyleSheets?.length ?? 0,
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootTag: root?.tagName ?? null,
    hasSlot: !!slot,
    assigned: slot?.assignedNodes({ flatten: true }).length ?? 0,
    fontSize: css?.fontSize ?? null,
    fontSizeRef: sizeRef ? getComputedStyle(sizeRef).fontSize : null,
    fontSizeMatch: root && sizeRef ? css.fontSize === getComputedStyle(sizeRef).fontSize : false,
    color: css?.color ?? null,
    colorRef: colorRef ? getComputedStyle(colorRef).color : null,
    colorMatch: root && colorRef ? css.color === getComputedStyle(colorRef).color : false,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const xl = await page.evaluate(() => {
  const el = document.querySelector('#xl lit-display');
  const root = el.shadowRoot?.querySelector('h3');
  return { h: el.getBoundingClientRect().height, fontSize: root ? getComputedStyle(root).fontSize : null };
});

const inherit = await page.evaluate(() => {
  const el = document.querySelector('#inherit lit-display');
  const style = el.shadowRoot?.querySelector('style');
  const root = el.shadowRoot?.querySelector('h3');
  return {
    cssHasInherit: !!style?.textContent?.includes('font-size:inherit'),
    cssHasCurrentcolor: !!style?.textContent?.includes('currentcolor'),
    color: root ? getComputedStyle(root).color : null,
  };
});

const hidden = await page.evaluate(() => {
  const el = document.querySelector('#hidden lit-display');
  return getComputedStyle(el).display;
});

const rich = await page.evaluate(() => {
  const el = document.querySelector('#rich lit-display');
  const slot = el.shadowRoot?.querySelector('slot');
  const assigned = [...(slot?.assignedNodes({ flatten: true }) ?? [])];
  return {
    text: el.textContent,
    hasItalic: !!el.querySelector('i'),
    hasBold: !!el.querySelector('b'),
    assignedCount: assigned.length,
  };
});

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-display');
  const before = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  el.setAttribute('size', 'large');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.setAttribute('size', 'small');
        resolve({ beforeHas5xl: before.includes('5xl'), afterHas5xl: after.includes('typescale-5xl') });
      })
    );
  });
});

const bpGeometry = async (width) => {
  await page.setViewportSize({ width, height: 640 });
  await page.waitForTimeout(50);
  return page.evaluate(() => {
    const root = document.querySelector('#bp lit-display').shadowRoot.querySelector('h3');
    return { fontSize: getComputedStyle(root).fontSize };
  });
};
const at999 = await bpGeometry(999);
const at1000 = await bpGeometry(1000);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-display is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasRoot) failures.push('cssText missing h3 rules');
if (!live.cssTextHasTypescale) failures.push('cssText missing typescale token');
if (!live.cssTextHasSlotted) failures.push('cssText missing ::slotted heading reset');
if (!live.cssTextHasMedia) failures.push('breakpoint cssText missing 1000px media');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootTag !== 'H3') failures.push(`root tag ${live.rootTag}`);
if (!live.hasSlot) failures.push('no slot');
if (!(live.assigned > 0)) failures.push('slot assigned no nodes');
if (!live.fontSizeMatch) failures.push(`font-size ${live.fontSize} != ref ${live.fontSizeRef}`);
if (!live.colorMatch) failures.push(`color ${live.color} != ref ${live.colorRef}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (!(xl.h > live.hostSize.h + 8)) failures.push(`large height ${xl.h} not larger than small ${live.hostSize.h}`);
if (!inherit.cssHasInherit) failures.push('inherit size missing font-size:inherit');
if (!inherit.cssHasCurrentcolor) failures.push('inherit color missing currentcolor');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!rich.hasItalic || !rich.hasBold) failures.push(`rich content missing i/b: ${rich.text}`);
if (!attrChange.afterHas5xl) failures.push('attribute change after connect not reactive');
if (at999.fontSize === at1000.fontSize) {
  failures.push(`no 999/1000 flip: ${at999.fontSize} vs ${at1000.fontSize}`);
}
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  xl,
  inherit,
  hidden,
  rich,
  attrChange,
  at999,
  at1000,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
