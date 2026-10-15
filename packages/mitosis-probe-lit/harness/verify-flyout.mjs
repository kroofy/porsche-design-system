import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/flyout.html');
await page.waitForFunction(() => customElements.get('lit-flyout'));
await page.waitForFunction(() => document.querySelector('#closed lit-flyout')?.shadowRoot?.querySelector('dialog'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#closed lit-flyout');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const dialog = sr?.querySelector('dialog');
  const header = sr?.querySelector('slot[name="header"]');
  const footer = sr?.querySelector('slot[name="footer"]');
  const sub = sr?.querySelector('slot[name="sub-footer"]');
  const def = sr?.querySelector('slot:not([name])');
  return {
    isDefined: !!customElements.get('lit-flyout'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasContents: css.includes(':host{display:contents'),
    cssHasClosed: css.includes('width:0px') && css.includes('visibility:hidden'),
    cssHasCanvas: css.includes('--_p-dialog-a:var(--p-color-canvas)'),
    cssHasEndInset: css.includes('inset-inline-end:0'),
    cssHasEndSlide: css.includes('translate3d(100%,0,0)'),
    cssHasSubFooter: css.includes('slot[name=sub-footer]'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    innerLit: !!sr?.querySelector('lit-text,lit-button,lit-heading'),
    hostDisplay: getComputedStyle(el).display,
    dialogOpen: dialog?.open ?? null,
    inert: dialog?.inert ?? dialog?.hasAttribute('inert'),
    dialogWidth: dialog ? getComputedStyle(dialog).width : null,
    dialogVis: dialog ? getComputedStyle(dialog).visibility : null,
    assignedHeader: header ? header.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    assignedFooter: footer ? footer.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    assignedSub: sub ? sub.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    assignedDefault: def ? def.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    ariaModal: dialog?.getAttribute('aria-modal'),
    ariaLabel: dialog?.getAttribute('aria-label'),
    dismiss: sr?.querySelector('.dismiss span')?.textContent ?? '',
  };
});

const surface = await page.evaluate(() => {
  const css = document.querySelector('#surface lit-flyout')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return { cssHasSurface: css.includes('--_p-dialog-a:var(--p-color-surface)') };
});

const start = await page.evaluate(() => {
  const css = document.querySelector('#start lit-flyout')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasStartInset: css.includes('inset-inline-start:0'),
    cssHasStartSlide: css.includes('translate3d(-100%,0,0)'),
  };
});

const fullscreen = await page.evaluate(() => {
  const css = document.querySelector('#fullscreen lit-flyout')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return { cssHasStretch: css.includes('width:100dvw') && css.includes('clip-path:none') };
});

await page.setViewportSize({ width: 999, height: 640 });
const at999 = await page.evaluate(() => {
  const css = document.querySelector('#responsive lit-flyout')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    hasM: css.includes('@media(min-width:1000px)'),
    hasStretch: css.includes('width:100dvw'),
  };
});
await page.setViewportSize({ width: 1000, height: 640 });
const at1000 = await page.evaluate(() => {
  const css = document.querySelector('#responsive lit-flyout')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    hasDockedInM: css.includes('@media(min-width:1000px){.flyout{') && css.includes('min-width:320px'),
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-flyout not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasContents) failures.push('css missing display:contents');
if (!live.cssHasClosed) failures.push('css missing closed dialog collapse');
if (!live.cssHasCanvas) failures.push('css missing canvas var');
if (!live.cssHasEndInset) failures.push('css missing end scroller inset');
if (!live.cssHasEndSlide) failures.push('css missing end slide');
if (!live.cssHasSubFooter) failures.push('css missing sub-footer');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (live.innerLit) failures.push('inner lit-* tags');
if (live.hostDisplay !== 'contents') failures.push('host display');
if (live.dialogOpen) failures.push('dialog should stay closed');
if (!live.inert) failures.push('closed dialog should be inert');
if (live.dialogWidth !== '0px') failures.push('closed dialog width');
if (live.dialogVis !== 'hidden') failures.push('closed dialog visibility');
if (!live.assignedHeader.includes('Some Header')) failures.push('header slot');
if (!live.assignedFooter.includes('Some Footer')) failures.push('footer slot');
if (!live.assignedSub.includes('Some Sub Footer')) failures.push('sub-footer slot');
if (!live.assignedDefault.includes('Some content')) failures.push('default slot');
if (live.ariaModal !== 'true') failures.push('aria-modal');
if (live.ariaLabel !== 'Some heading') failures.push('aria-label');
if (live.dismiss !== 'Dismiss flyout') failures.push('dismiss label');
if (!surface.cssHasSurface) failures.push('surface css');
if (!start.cssHasStartInset) failures.push('start inset');
if (!start.cssHasStartSlide) failures.push('start slide');
if (!fullscreen.cssHasStretch) failures.push('fullscreen css');
if (!at999.hasM) failures.push('missing m=1000 media');
if (!at999.hasStretch) failures.push('999 still base stretch');
if (!at1000.hasDockedInM) failures.push('m flip css');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, surface, start, fullscreen, at999, at1000, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
