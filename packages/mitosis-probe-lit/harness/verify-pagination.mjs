import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/pagination.html');
await page.waitForFunction(() => customElements.get('lit-pagination'));
await page.waitForFunction(() => {
  const el = document.querySelector('#default lit-pagination');
  return (el?.shadowRoot?.querySelectorAll('li').length ?? 0) >= 8;
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-pagination');
  const sr = el.shadowRoot;
  const nav = sr?.querySelector('nav');
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const current = sr?.querySelector('li.current span');
  const currentRef = document.querySelector('#current-ref');
  const icons = [...(sr?.querySelectorAll('p-icon') ?? [])];
  const labels = [...(sr?.querySelectorAll('li span[aria-label]') ?? [])].map((n) => n.getAttribute('aria-label'));
  const pageNums = [...(sr?.querySelectorAll('li:not(.prev):not(.next):not(.ellip) span') ?? [])].map((n) =>
    n.textContent?.trim(),
  );
  return {
    isDefined: !!customElements.get('lit-pagination'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHas760: css.includes('min-width:760px'),
    cssHas759: css.includes('max-width:759px'),
    cssHasForcedColors: css.includes('forced-colors'),
    cssHasCanvasText: css.includes('CanvasText'),
    cssHasEllipStart: css.includes('li.ellip-start'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    navLabel: nav?.getAttribute('aria-label') ?? null,
    liCount: sr?.querySelectorAll('li').length ?? 0,
    pageNums,
    hasLast20: pageNums.includes('20'),
    currentText: current?.textContent?.trim() ?? null,
    currentAria: current?.getAttribute('aria-current') ?? null,
    background: current ? getComputedStyle(current).backgroundColor : null,
    backgroundRef: currentRef ? getComputedStyle(currentRef).backgroundColor : null,
    backgroundMatch: current && currentRef
      ? getComputedStyle(current).backgroundColor === getComputedStyle(currentRef).backgroundColor
      : false,
    iconTags: icons.map((n) => n.tagName),
    iconNames: icons.map((n) => n.getAttribute('name')),
    innerLit: !!sr?.querySelector('lit-icon'),
    prevDisabled: sr?.querySelector('li.prev span')?.getAttribute('aria-disabled') ?? null,
    nextDisabled: sr?.querySelector('li.next span')?.getAttribute('aria-disabled') ?? null,
    hostDisplay: getComputedStyle(el).display,
    labels,
  };
});

const noLast = await page.evaluate(() => {
  const el = document.querySelector('#no-last lit-pagination');
  const pageNums = [...(el.shadowRoot?.querySelectorAll('li:not(.prev):not(.next):not(.ellip) span') ?? [])].map((n) =>
    n.textContent?.trim(),
  );
  return {
    pageNums,
    hasLast20: pageNums.includes('20'),
    liCount: el.shadowRoot?.querySelectorAll('li').length ?? 0,
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-pagination')).display);

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#default lit-pagination');
  const before = [...(el.shadowRoot?.querySelectorAll('li:not(.prev):not(.next):not(.ellip) span') ?? [])].map((n) =>
    n.textContent?.trim(),
  );
  el.setAttribute('active-page', '5');
  el.activePage = '5';
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = [...(el.shadowRoot?.querySelectorAll('li.current span') ?? [])].map((n) => n.textContent?.trim());
        const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
        el.setAttribute('active-page', '1');
        el.activePage = '1';
        resolve({ beforeHas1: before.includes('1'), afterCurrent: after, cssHidesStart: css.includes('li.ellip-start') });
      }),
    );
  });
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-pagination is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHas760) failures.push('cssText missing 760px');
if (!live.cssHas759) failures.push('cssText missing 759px');
if (!live.cssHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssHasCanvasText) failures.push('cssText missing CanvasText');
if (!live.cssHasEllipStart) failures.push('cssText missing ellip-start hide at 1440');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.navLabel !== 'Pagination') failures.push(`nav label ${live.navLabel}`);
if (live.currentText !== '1') failures.push(`current ${live.currentText}`);
if (live.currentAria !== 'page') failures.push(`aria-current ${live.currentAria}`);
if (!live.hasLast20) failures.push(`pages ${JSON.stringify(live.pageNums)}`);
if (!live.backgroundMatch) failures.push(`current bg ${live.background} != ${live.backgroundRef}`);
if (live.iconTags.some((t) => t !== 'P-ICON')) failures.push(`icons ${JSON.stringify(live.iconTags)}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (!(live.iconNames.includes('arrow-left') && live.iconNames.includes('arrow-right'))) {
  failures.push(`icon names ${JSON.stringify(live.iconNames)}`);
}
if (live.prevDisabled !== 'true') failures.push(`prev disabled ${live.prevDisabled}`);
if (live.nextDisabled) failures.push(`next disabled ${live.nextDisabled}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (noLast.hasLast20) failures.push('show-last-page=false still rendered last page 20');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (!attrChange.afterCurrent.includes('5')) failures.push(`active-page change ${JSON.stringify(attrChange.afterCurrent)}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, noLast, hidden, attrChange, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
