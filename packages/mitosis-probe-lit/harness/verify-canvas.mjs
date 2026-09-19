import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/canvas.html');
await page.waitForFunction(() => customElements.get('lit-canvas'));
await page.waitForFunction(() => document.querySelector('#open lit-canvas')?.shadowRoot?.querySelector('.root'));

const live = await page.evaluate(async () => {
  const el = document.querySelector('#open lit-canvas');
  await el.updateComplete;
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const slots = [...sr.querySelectorAll('slot')].map((s) => s.name || '(default)');
  const buttons = [...sr.querySelectorAll('p-button')].map((n) => ({
    tag: n.tagName,
    hideLabel: n.getAttribute('hide-label'),
    compact: n.getAttribute('compact'),
  }));
  return {
    isDefined: !!customElements.get('lit-canvas'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasBlock: css.includes(':host{display:block'),
    cssHasM: css.includes('@media(min-width:1000px)'),
    cssHasMaxM: css.includes('@media(max-width:999px)'),
    cssHasSurface: css.includes('var(--p-color-surface)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootCount: sr?.querySelectorAll('.root').length ?? 0,
    innerLit: !!sr?.querySelector('lit-button,lit-crest,lit-wordmark'),
    hostDisplay: getComputedStyle(el).display,
    hasHeader: !!sr?.querySelector('.header'),
    hasStart: !!sr?.querySelector('.sidebar--start'),
    hasEnd: !!sr?.querySelector('.sidebar--end'),
    hasMain: !!sr?.querySelector('main.main'),
    crest: sr?.querySelector('.header__crest')?.tagName ?? '',
    wordmark: sr?.querySelector('.header__wordmark')?.tagName ?? '',
    wordmarkSize: sr?.querySelector('p-wordmark')?.getAttribute('size') ?? '',
    slots,
    buttons,
    hrefUndefined: !!sr?.querySelector('[href="undefined"]'),
    titleAssigned: sr?.querySelector('slot[name="title"]')?.assignedElements().some((n) => n.tagName === 'A') ?? false,
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-canvas not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasBlock) failures.push('css missing display:block');
if (!live.cssHasM) failures.push('css missing m=1000');
if (!live.cssHasMaxM) failures.push('css missing max-m=999');
if (!live.cssHasSurface) failures.push('css missing surface');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootCount !== 1) failures.push('expected one .root');
if (live.innerLit) failures.push('inner lit-* tags');
if (live.hostDisplay !== 'block') failures.push('host display');
if (!live.hasHeader) failures.push('missing header');
if (!live.hasStart) failures.push('missing sidebar-start');
if (!live.hasEnd) failures.push('missing sidebar-end');
if (!live.hasMain) failures.push('missing main');
if (live.crest !== 'P-CREST') failures.push('crest should be p-crest');
if (live.wordmark !== 'P-WORDMARK') failures.push('wordmark should be p-wordmark');
if (live.wordmarkSize !== 'inherit') failures.push('wordmark size');
if (!live.slots.includes('title')) failures.push('title slot');
if (!live.slots.includes('header-start')) failures.push('header-start slot');
if (!live.slots.includes('header-end')) failures.push('header-end slot');
if (!live.slots.includes('sidebar-start')) failures.push('sidebar-start slot');
if (!live.slots.includes('sidebar-end')) failures.push('sidebar-end slot');
if (!live.slots.includes('sidebar-end-header')) failures.push('sidebar-end-header slot');
if (!live.slots.includes('background')) failures.push('background slot');
if (!live.slots.includes('(default)')) failures.push('default slot');
if (live.buttons.length < 2) failures.push('nav buttons');
if (live.buttons.some((b) => b.tag !== 'P-BUTTON')) failures.push('buttons should be p-button');
if (live.buttons.some((b) => b.hideLabel !== 'true')) failures.push('hide-label must be true');
if (live.buttons.some((b) => b.compact !== 'true')) failures.push('compact must be true');
if (live.hrefUndefined) failures.push('href=undefined leaked');
if (!live.titleAssigned) failures.push('title slot assigned');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
