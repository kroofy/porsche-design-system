import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/text-list.html');
await page.waitForFunction(() => customElements.get('lit-text-list'));
await page.waitForFunction(() => {
  const el = document.querySelector('#unordered lit-text-list');
  return !!el?.shadowRoot?.querySelector('ul,ol');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#unordered lit-text-list');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const list = sr?.querySelector('ul,ol');
  const slot = sr?.querySelector('slot:not([name])');
  return {
    isDefined: !!customElements.get('lit-text-list'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssTextHasList: !!style?.textContent?.includes('ol,ul{'),
    cssTextHasBullet: !!style?.textContent?.includes("--_p-text-list-g,'•'"),
    cssTextHasCounterReset: !!style?.textContent?.includes('counter-reset:p-text-list-counter !important'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    listTag: list?.tagName ?? null,
    hasOl: !!sr?.querySelector('ol'),
    hasDefaultSlot: !!slot,
    slotted: slot ? slot.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const numbered = await page.evaluate(() => {
  const el = document.querySelector('#numbered lit-text-list');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  return {
    listTag: sr?.querySelector('ul,ol')?.tagName ?? null,
    cssHasDecimal: !!style?.textContent?.includes('decimal'),
    cssHasLatin: !!style?.textContent?.includes('lower-latin'),
  };
});

const alphabetically = await page.evaluate(() => {
  const el = document.querySelector('#alphabetically lit-text-list');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  return {
    listTag: sr?.querySelector('ul,ol')?.tagName ?? null,
    cssHasLatin: !!style?.textContent?.includes('lower-latin'),
    cssHasDecimal: !!style?.textContent?.includes('decimal'),
  };
});

const def = await page.evaluate(() => {
  const el = document.querySelector('#default lit-text-list');
  return {
    listTag: el.shadowRoot?.querySelector('ul,ol')?.tagName ?? null,
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-text-list')).display);

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-text-list');
  const before = el.shadowRoot?.querySelector('ul,ol')?.tagName ?? null;
  el.setAttribute('type', 'numbered');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const afterTag = el.shadowRoot?.querySelector('ul,ol')?.tagName ?? null;
        const afterCss = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.removeAttribute('type');
        resolve({
          before,
          afterTag,
          afterHasDecimal: afterCss.includes('decimal'),
        });
      }),
    );
  });
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-text-list is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssTextHasList) failures.push('cssText missing ol,ul rules');
if (!live.cssTextHasBullet) failures.push('cssText missing unordered bullet');
if (!live.cssTextHasCounterReset) failures.push('cssText missing counter-reset');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.listTag !== 'UL') failures.push(`unordered tag ${live.listTag}`);
if (live.hasOl) failures.push('unordered host rendered ol');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (!live.slotted.includes('ABC')) failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 4)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (numbered.listTag !== 'OL') failures.push(`numbered tag ${numbered.listTag}`);
if (!numbered.cssHasDecimal) failures.push('numbered missing decimal counters');
if (numbered.cssHasLatin) failures.push('numbered used lower-latin');
if (alphabetically.listTag !== 'OL') failures.push(`alphabetically tag ${alphabetically.listTag}`);
if (!alphabetically.cssHasLatin) failures.push('alphabetically missing lower-latin');
if (alphabetically.cssHasDecimal) failures.push('alphabetically used decimal');
if (def.listTag !== 'UL') failures.push(`default tag ${def.listTag}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (attrChange.afterTag !== 'OL') failures.push(`type change tag ${attrChange.afterTag}`);
if (!attrChange.afterHasDecimal) failures.push('type change missing decimal css');
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = {
  live,
  numbered,
  alphabetically,
  def,
  hidden,
  attrChange,
  consoleErrors,
  failures,
};
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
