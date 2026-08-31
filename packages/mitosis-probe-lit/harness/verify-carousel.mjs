import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/carousel.html');
await page.waitForFunction(() => customElements.get('lit-carousel'));
await page.waitForFunction(() => document.querySelector('#basic lit-carousel')?.shadowRoot?.querySelector('#splide'));

const live = await page.evaluate(async () => {
  const el = document.querySelector('#basic lit-carousel');
  await el.updateComplete;
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  return {
    isDefined: !!customElements.get('lit-carousel'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasFlex: css.includes(':host{display:flex'),
    cssHasS: css.includes('@media(min-width:760px)'),
    cssHasXxl: css.includes('@media(min-width:1920px)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    innerLit: !!sr?.querySelector('lit-button-pure,lit-link-pure,lit-heading,lit-scroller'),
    hostDisplay: getComputedStyle(el).display,
    hasHeader: !!sr?.querySelector('.header'),
    hasSplide: !!sr?.querySelector('#splide'),
    hasTrack: !!sr?.querySelector('.splide__track'),
    slideSlots: [...sr.querySelectorAll('slot')].map((s) => s.name).filter((n) => n.startsWith('slide-')),
    heading: sr?.querySelector('h2.heading')?.textContent ?? '',
    hrefUndefined: !!sr?.querySelector('[href="undefined"]'),
    prev: sr?.querySelector('.btn-prev')?.tagName ?? '',
    next: sr?.querySelector('.btn-next')?.tagName ?? '',
  };
});

const slots = await page.evaluate(async () => {
  const el = document.querySelector('#slots lit-carousel');
  await el.updateComplete;
  const sr = el.shadowRoot;
  const heading = sr?.querySelector('slot[name="heading"]');
  const description = sr?.querySelector('slot[name="description"]');
  const controls = sr?.querySelector('slot[name="controls"]');
  return {
    headingAssigned: heading?.assignedElements().some((n) => n.tagName === 'H2') ?? false,
    descriptionAssigned: description?.assignedElements().some((n) => n.tagName === 'P') ?? false,
    controlsAssigned: controls?.assignedElements().length > 0,
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-carousel not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasFlex) failures.push('css missing display:flex');
if (!live.cssHasS) failures.push('css missing s=760');
if (!live.cssHasXxl) failures.push('css missing xxl=1920');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (live.innerLit) failures.push('inner lit-* tags');
if (live.hostDisplay !== 'flex') failures.push('host display');
if (!live.hasHeader) failures.push('missing header');
if (!live.hasSplide) failures.push('missing #splide');
if (!live.hasTrack) failures.push('missing track');
if (live.slideSlots.length < 3) failures.push('slide slots');
if (live.heading !== 'Some heading') failures.push('heading text');
if (live.hrefUndefined) failures.push('href=undefined leaked');
if (live.prev !== 'P-BUTTON-PURE') failures.push('prev should be p-button-pure');
if (live.next !== 'P-BUTTON-PURE') failures.push('next should be p-button-pure');
if (!slots.headingAssigned) failures.push('heading slot');
if (!slots.descriptionAssigned) failures.push('description slot');
if (!slots.controlsAssigned) failures.push('controls slot');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, slots, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
