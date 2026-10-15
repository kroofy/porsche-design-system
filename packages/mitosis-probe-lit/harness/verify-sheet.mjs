import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/sheet.html');
await page.waitForFunction(() => customElements.get('lit-sheet'));
await page.waitForFunction(() => document.querySelector('#closed lit-sheet')?.shadowRoot?.querySelector('dialog'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#closed lit-sheet');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const dialog = sr?.querySelector('dialog');
  const header = sr?.querySelector('slot[name="header"]');
  const def = sr?.querySelector('slot:not([name])');
  return {
    isDefined: !!customElements.get('lit-sheet'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasContents: css.includes(':host{display:contents'),
    cssHasClosed: css.includes('width:0px') && css.includes('visibility:hidden'),
    cssHasCanvas: css.includes('--_p-dialog-a:var(--p-color-canvas)'),
    cssHasSheetSlide: css.includes('translate3d(0,25vh,0)'),
    cssHasAlignEnd: css.includes('align-self:flex-end'),
    cssHasInset0: css.includes('.scroller{') && css.includes('inset:0'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    innerLit: !!sr?.querySelector('lit-text,lit-button,lit-heading'),
    hostDisplay: getComputedStyle(el).display,
    dialogOpen: dialog?.open ?? null,
    inert: dialog?.inert ?? dialog?.hasAttribute('inert'),
    dialogWidth: dialog ? getComputedStyle(dialog).width : null,
    dialogVis: dialog ? getComputedStyle(dialog).visibility : null,
    assignedHeader: header ? header.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    assignedDefault: def ? def.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    ariaModal: dialog?.getAttribute('aria-modal'),
    ariaLabel: dialog?.getAttribute('aria-label'),
    dismiss: sr?.querySelector('.dismiss span')?.textContent ?? '',
  };
});

const surface = await page.evaluate(() => {
  const css = document.querySelector('#surface lit-sheet')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return { cssHasSurface: css.includes('--_p-dialog-a:var(--p-color-surface)') };
});

const noDismiss = await page.evaluate(() => {
  const el = document.querySelector('#no-dismiss lit-sheet');
  const css = el?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    hasButton: !!el?.shadowRoot?.querySelector('.dismiss'),
    cssHasDismiss: css.includes('.dismiss{'),
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-sheet not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasContents) failures.push('css missing display:contents');
if (!live.cssHasClosed) failures.push('css missing closed dialog collapse');
if (!live.cssHasCanvas) failures.push('css missing canvas var');
if (!live.cssHasSheetSlide) failures.push('css missing bottom slide');
if (!live.cssHasAlignEnd) failures.push('css missing align-self');
if (!live.cssHasInset0) failures.push('css missing fullscreen scroller');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (live.innerLit) failures.push('inner lit-* tags');
if (live.hostDisplay !== 'contents') failures.push('host display');
if (live.dialogOpen) failures.push('dialog should stay closed');
if (!live.inert) failures.push('closed dialog should be inert');
if (live.dialogWidth !== '0px') failures.push('closed dialog width');
if (live.dialogVis !== 'hidden') failures.push('closed dialog visibility');
if (!live.assignedHeader.includes('Some heading')) failures.push('header slot');
if (!live.assignedDefault.includes('Some content')) failures.push('default slot');
if (live.ariaModal !== 'true') failures.push('aria-modal');
if (live.ariaLabel !== 'Some heading') failures.push('aria-label');
if (live.dismiss !== 'Dismiss sheet') failures.push('dismiss label');
if (!surface.cssHasSurface) failures.push('surface css');
if (noDismiss.hasButton) failures.push('dismiss should hide');
if (noDismiss.cssHasDismiss) failures.push('dismiss css should hide');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, surface, noDismiss, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
