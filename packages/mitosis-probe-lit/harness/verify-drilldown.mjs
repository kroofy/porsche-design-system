import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/drilldown.html');
await page.waitForFunction(() => customElements.get('lit-drilldown'));
await page.waitForFunction(() => document.querySelector('#closed lit-drilldown')?.shadowRoot?.querySelector('dialog'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#closed lit-drilldown');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const dialog = sr?.querySelector('dialog');
  const def = sr?.querySelector('slot:not([name])');
  return {
    isDefined: !!customElements.get('lit-drilldown'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasBlock: css.includes(':host{display:block'),
    cssHasClosed: css.includes('visibility:hidden'),
    cssHasS: css.includes('@media(min-width:760px)') && css.includes('@media(max-width:759px)'),
    cssHasSlide: css.includes('translate3d(-100%,0,0)'),
    cssHasSingleWidth: css.includes('width:clamp(338px, 210px + 18vw, 640px)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    innerLit: !!sr?.querySelector('lit-button,lit-button-pure'),
    hostDisplay: getComputedStyle(el).display,
    dialogOpen: dialog?.open ?? null,
    inert: dialog?.inert ?? dialog?.hasAttribute('inert'),
    dialogVis: dialog ? getComputedStyle(dialog).visibility : null,
    assignedDefault: def ? def.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    ariaLabel: dialog?.getAttribute('aria-label'),
    back: sr?.querySelector('.back')?.tagName ?? '',
    dismissMobile: sr?.querySelector('.dismiss-mobile')?.tagName ?? '',
    dismissDesktop: sr?.querySelector('.dismiss-desktop')?.tagName ?? '',
    hrefUndefined: !!sr?.querySelector('[href="undefined"]'),
  };
});

const secondary = await page.evaluate(() => {
  const css = document.querySelector('#secondary lit-drilldown')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasDouble: css.includes('clamp(338px, 210px + 18vw, 640px) * 2'),
  };
});

await page.setViewportSize({ width: 759, height: 640 });
const at759 = await page.evaluate(() => {
  const css = document.querySelector('#closed lit-drilldown')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return { hasMax759: css.includes('@media(max-width:759px)') };
});
await page.setViewportSize({ width: 760, height: 640 });
const at760 = await page.evaluate(() => {
  const css = document.querySelector('#closed lit-drilldown')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return { hasMin760: css.includes('@media(min-width:760px)') };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-drilldown not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasBlock) failures.push('css missing display:block');
if (!live.cssHasClosed) failures.push('css missing closed visibility');
if (!live.cssHasS) failures.push('css missing s=760 media');
if (!live.cssHasSlide) failures.push('css missing closed slide');
if (!live.cssHasSingleWidth) failures.push('css missing desktop single width');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (live.innerLit) failures.push('inner lit-* tags');
if (live.hostDisplay !== 'block') failures.push('host display');
if (live.dialogOpen) failures.push('dialog should stay closed');
if (!live.inert) failures.push('closed dialog should be inert');
if (live.dialogVis !== 'hidden') failures.push('closed dialog visibility');
if (!live.assignedDefault.includes('Some item')) failures.push('default slot');
if (live.ariaLabel !== 'Main') failures.push('aria-label');
if (live.back !== 'P-BUTTON-PURE') failures.push('back should be p-button-pure');
if (live.dismissMobile !== 'P-BUTTON') failures.push('dismiss-mobile should be p-button');
if (live.dismissDesktop !== 'P-BUTTON') failures.push('dismiss-desktop should be p-button');
if (live.hrefUndefined) failures.push('href=undefined leaked');
if (!secondary.cssHasDouble) failures.push('secondary drawer width');
if (!at759.hasMax759) failures.push('759 still has max-width s');
if (!at760.hasMin760) failures.push('760 missing min-width s');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, secondary, at759, at760, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
