import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/drilldown-link.html');
await page.waitForFunction(() => customElements.get('lit-drilldown-link'));
await page.waitForFunction(() => document.querySelector('#href lit-drilldown-link')?.shadowRoot?.querySelector('a,slot'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#href lit-drilldown-link');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const a = sr?.querySelector('a');
  const def = sr?.querySelector('slot:not([name])');
  return {
    isDefined: !!customElements.get('lit-drilldown-link'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasGrid: css.includes(':host{display:grid'),
    cssHasHidden: css.includes(':host([hidden]){display:none !important}'),
    cssHasAnchor: css.includes('a{all:unset'),
    cssHasHover: css.includes('@media(hover:hover)'),
    cssHasForced: css.includes('@media(forced-colors:active)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    hostDisplay: getComputedStyle(el).display,
    href: a?.getAttribute('href') ?? null,
    hrefUndefined: !!sr?.querySelector('[href="undefined"]'),
    assigned: def ? def.assignedNodes().map((n) => n.textContent?.trim()).filter(Boolean) : [],
    innerA: a?.tagName ?? '',
  };
});

const slotted = await page.evaluate(() => {
  const el = document.querySelector('#slotted lit-drilldown-link');
  const sr = el.shadowRoot;
  const css = sr?.querySelector('style')?.textContent ?? '';
  const def = sr?.querySelector('slot:not([name])');
  return {
    noInnerA: !sr?.querySelector('a'),
    cssSlotted: css.includes('::slotted(a)'),
    hrefUndefined: !!sr?.querySelector('[href="undefined"]'),
    assignedAnchor: def?.assignedElements().some((n) => n.tagName === 'A') ?? false,
  };
});

const active = await page.evaluate(() => {
  const css = document.querySelector('#active lit-drilldown-link')?.shadowRoot?.querySelector('style')?.textContent ?? '';
  const a = document.querySelector('#active lit-drilldown-link')?.shadowRoot?.querySelector('a');
  return {
    decoInherit: css.includes('text-decoration-color:inherit'),
    cursorDefault: css.includes('cursor:default'),
    ariaCurrent: a?.getAttribute('aria-current') ?? '',
  };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-drilldown-link not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasGrid) failures.push('css missing display:grid');
if (!live.cssHasHidden) failures.push('css missing :host([hidden])');
if (!live.cssHasAnchor) failures.push('css missing overlay a');
if (!live.cssHasHover) failures.push('css missing hover');
if (!live.cssHasForced) failures.push('css missing forced-colors');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (live.hostDisplay !== 'grid') failures.push('host display');
if (live.href !== '#') failures.push('overlay href');
if (live.hrefUndefined) failures.push('href=undefined leaked');
if (!live.assigned.includes('Some anchor')) failures.push('default slot');
if (live.innerA !== 'A') failures.push('overlay a missing');
if (!slotted.noInnerA) failures.push('slotted host should not render overlay a');
if (!slotted.cssSlotted) failures.push('slotted css');
if (slotted.hrefUndefined) failures.push('slotted href=undefined');
if (!slotted.assignedAnchor) failures.push('slotted native a');
if (!active.decoInherit) failures.push('active decoration');
if (!active.cursorDefault) failures.push('active cursor');
if (active.ariaCurrent !== 'true') failures.push('active aria-current');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, slotted, active, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
