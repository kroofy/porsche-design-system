import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/drilldown-item.html');
await page.waitForFunction(() => customElements.get('lit-drilldown-item'));
await page.waitForFunction(() => document.querySelector('#default lit-drilldown-item')?.shadowRoot?.querySelector('.drawer'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-drilldown-item');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const def = sr?.querySelector('slot:not([name])');
  return {
    isDefined: !!customElements.get('lit-drilldown-item'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasContents: css.includes(':host{display:contents'),
    cssHasHidden: css.includes(':host([hidden]){display:none !important}'),
    cssHasS: css.includes('@media(min-width:760px)') && css.includes('@media(max-width:759px)'),
    cssHasDefaultDrawer: css.includes('.drawer{display:none}'),
    cssHasButtonPad: css.includes('grid-column:1/-1'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    innerLit: !!sr?.querySelector('lit-button,lit-button-pure'),
    hostDisplay: getComputedStyle(el).display,
    assignedDefault: def ? def.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    cascade: sr?.querySelector('.button')?.tagName ?? '',
    back: sr?.querySelector('.back')?.tagName ?? '',
    header: sr?.querySelector('h2')?.textContent ?? '',
    hrefUndefined: !!sr?.querySelector('[href="undefined"]'),
    hideLabel: sr?.querySelector('.back')?.getAttribute('hide-label') ?? '',
  };
});

const secondary = await page.evaluate(() => {
  const css = document.querySelector('#secondary lit-drilldown-item')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHasSecondaryDrawer: css.includes('inset-inline-start:clamp(338px, 210px + 18vw, 640px)'),
    cssHasSlideSecondary: css.includes('slide-up-desktop-secondary'),
  };
});

const slots = await page.evaluate(() => {
  const el = document.querySelector('#slots lit-drilldown-item');
  const sr = el.shadowRoot;
  const buttonSlot = sr?.querySelector('slot[name="button"]');
  const headerSlot = sr?.querySelector('slot[name="header"]');
  return {
    hasButtonSlot: !!buttonSlot,
    hasHeaderSlot: !!headerSlot,
    noDefaultButton: !sr?.querySelector('.button'),
    noDefaultH2: !sr?.querySelector('h2'),
    assignedButton: buttonSlot?.assignedNodes().some((n) => n.nodeType === 1) ?? false,
    assignedHeader: headerSlot?.assignedNodes().some((n) => n.nodeType === 1) ?? false,
  };
});

await page.setViewportSize({ width: 759, height: 640 });
const at759 = await page.evaluate(() => {
  const css = document.querySelector('#default lit-drilldown-item')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return { hasMax759: css.includes('@media(max-width:759px)') };
});
await page.setViewportSize({ width: 760, height: 640 });
const at760 = await page.evaluate(() => {
  const css = document.querySelector('#default lit-drilldown-item')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  return { hasMin760: css.includes('@media(min-width:760px)') };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-drilldown-item not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasContents) failures.push('css missing display:contents');
if (!live.cssHasHidden) failures.push('css missing :host([hidden])');
if (!live.cssHasS) failures.push('css missing s=760 media');
if (!live.cssHasDefaultDrawer) failures.push('css missing closed drawer');
if (!live.cssHasButtonPad) failures.push('css missing cascade button pad');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (live.innerLit) failures.push('inner lit-* tags');
if (live.hostDisplay !== 'contents') failures.push('host display');
if (!live.assignedDefault.includes('Child')) failures.push('default slot');
if (live.cascade !== 'P-BUTTON-PURE') failures.push('cascade should be p-button-pure');
if (live.back !== 'P-BUTTON-PURE') failures.push('back should be p-button-pure');
if (live.header !== 'Some label') failures.push('default h2 label');
if (live.hrefUndefined) failures.push('href=undefined leaked');
if (!live.hideLabel.includes('"s":false')) failures.push('back hide-label should use s=760');
if (live.hideLabel.includes('"m"')) failures.push('hide-label must not call 760 m');
if (!secondary.cssHasSecondaryDrawer) failures.push('secondary drawer');
if (!secondary.cssHasSlideSecondary) failures.push('secondary slide');
if (!slots.hasButtonSlot) failures.push('named button slot');
if (!slots.hasHeaderSlot) failures.push('named header slot');
if (!slots.noDefaultButton) failures.push('default cascade should yield to button slot');
if (!slots.noDefaultH2) failures.push('default h2 should yield to header slot');
if (!slots.assignedButton) failures.push('button slot assigned');
if (!slots.assignedHeader) failures.push('header slot assigned');
if (!at759.hasMax759) failures.push('759 still has max-width s');
if (!at760.hasMin760) failures.push('760 missing min-width s');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, secondary, slots, at759, at760, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
