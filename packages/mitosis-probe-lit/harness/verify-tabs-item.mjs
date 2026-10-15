import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/tabs-item.html');
await page.waitForFunction(() => customElements.get('lit-tabs-item'));
await page.waitForFunction(() => document.querySelector('#default lit-tabs-item')?.shadowRoot?.querySelector('slot'));

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-tabs-item');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const slot = sr?.querySelector('slot:not([name])');
  const ref = document.querySelector('#primary-ref');
  return {
    isDefined: !!customElements.get('lit-tabs-item'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostBlock: css.includes(':host{display:block'),
    cssHasPrimary: css.includes('color:var(--p-color-primary) !important'),
    cssHasRadius: css.includes('border-radius:2px !important'),
    cssHasHidden: css.includes(':host([hidden]){display:none !important}'),
    cssHasFocus: css.includes(':host(:focus-visible){outline:2px solid var(--p-color-focus) !important'),
    cssHasHcm: css.includes('@media(forced-colors:active){:host(:focus-visible){outline-color:Highlight !important}}'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    hasDefaultSlot: !!slot,
    slotted: slot ? slot.assignedElements().map((n) => n.tagName) : [],
    hostDisplay: getComputedStyle(el).display,
    colorMatch: ref ? getComputedStyle(el).color === getComputedStyle(ref).color : false,
    label: el.label ?? el.getAttribute('label'),
    parentTag: el.parentElement?.tagName ?? null,
    innerLit: !!sr?.querySelector('lit-text,lit-tabs'),
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-tabs-item')).display);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-tabs-item is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostBlock) failures.push('cssText missing :host block');
if (!live.cssHasPrimary) failures.push('cssText missing primary color');
if (!live.cssHasRadius) failures.push('cssText missing border-radius');
if (!live.cssHasHidden) failures.push('cssText missing hidden');
if (!live.cssHasFocus) failures.push('cssText missing focus-visible');
if (!live.cssHasHcm) failures.push('cssText missing forced-colors Highlight');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout-affecting .root wrapper leaked');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.slotted.join() !== 'SPAN') failures.push(`slotted ${JSON.stringify(live.slotted)}`);
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (!live.colorMatch) failures.push('host color mismatch vs --p-color-primary');
if (live.label !== 'Some label (1)') failures.push(`label ${live.label}`);
if (live.parentTag !== 'P-TABS') failures.push(`parent ${live.parentTag}`);
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
