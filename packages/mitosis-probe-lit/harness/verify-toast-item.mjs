import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/toast-item.html');
await page.waitForFunction(() => customElements.get('lit-toast-item'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-toast-item')?.shadowRoot?.querySelector('.notification'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-toast-item');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const note = sr?.querySelector('.notification');
  const ref = document.querySelector('#bg-ref');
  return {
    isDefined: !!customElements.get('lit-toast-item'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostBlock: css.includes(':host{display:block'),
    cssHasShadow: css.includes('box-shadow:var(--p-shadow-lg)'),
    cssHasInfoBg: css.includes('background:var(--p-color-info-frosted)'),
    cssHasS: css.includes('@media(min-width:760px)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    innerLit: !!sr?.querySelector('lit-icon,lit-button-pure,p-icon,p-button-pure'),
    hasNotification: !!note,
    text: sr?.querySelector('p')?.textContent ?? '',
    dismissLabel: sr?.querySelector('.dismiss span')?.textContent ?? '',
    popover: el.getAttribute('popover'),
    popoverOpen: el.matches(':popover-open'),
    hostDisplay: getComputedStyle(el).display,
    noteBg: note ? getComputedStyle(note).backgroundColor : null,
    refBg: ref ? getComputedStyle(ref).backgroundColor : null,
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-toast-item')).display);

const success = await page.evaluate(() => {
  const el = document.querySelector('#success lit-toast-item');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return { cssHasSuccess: css.includes('background:var(--p-color-success-frosted)') };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-toast-item not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasHostBlock) failures.push('css missing host block');
if (!live.cssHasShadow) failures.push('css missing box-shadow');
if (!live.cssHasInfoBg) failures.push('css missing info background');
if (!live.cssHasS) failures.push('css missing 760 media');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (live.innerLit) failures.push('nested icon/button tags');
if (!live.hasNotification) failures.push('missing .notification');
if (live.text !== 'Some content') failures.push('text');
if (live.dismissLabel !== 'Close notification message') failures.push('dismiss label');
if (live.popover !== 'manual') failures.push('popover');
if (!live.popoverOpen) failures.push('popover not open');
if (live.hostDisplay !== 'block') failures.push('host display');
if (live.noteBg !== live.refBg) failures.push('background vs ref');
if (hidden !== 'none') failures.push('hidden host display');
if (!success.cssHasSuccess) failures.push('success css');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, hidden, success, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
