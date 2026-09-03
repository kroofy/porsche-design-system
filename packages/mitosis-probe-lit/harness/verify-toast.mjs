import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/toast.html');
await page.waitForFunction(() => customElements.get('lit-toast'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-toast')?.shadowRoot?.querySelector('style'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-toast');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const cs = getComputedStyle(el);
  return {
    isDefined: !!customElements.get('lit-toast'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasFixed: css.includes('position:fixed'),
    cssHasZ: css.includes('z-index:999999'),
    cssHasBottomVar: css.includes('--_p-toast-a:var(--p-toast-position-bottom,56px)'),
    cssHasS: css.includes('@media(min-width:760px)'),
    cssHasHydratedAnim: css.includes('var(--p-animation-duration,.4s)'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    innerLit: !!sr?.querySelector('lit-toast-item,p-toast-item'),
    role: el.getAttribute('role'),
    position: cs.position,
    zIndex: cs.zIndex,
    bottom: cs.bottom,
    left: cs.left,
    maxWidth: cs.maxWidth,
  };
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-toast')).display);

await page.setViewportSize({ width: 759, height: 640 });
const belowS = await page.evaluate(() => {
  const cs = getComputedStyle(document.querySelector('#default lit-toast'));
  return { bottom: cs.bottom, left: cs.left, maxWidth: cs.maxWidth };
});

await page.setViewportSize({ width: 760, height: 640 });
const atS = await page.evaluate(() => {
  const cs = getComputedStyle(document.querySelector('#default lit-toast'));
  return { bottom: cs.bottom, left: cs.left, maxWidth: cs.maxWidth };
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-toast not defined');
if (!live.hasShadowRoot) failures.push('missing shadowRoot');
if (!live.dynamicStyleTag) failures.push('missing cssText style tag');
if (!live.cssHasFixed) failures.push('css missing position:fixed');
if (!live.cssHasZ) failures.push('css missing z-index');
if (!live.cssHasBottomVar) failures.push('css missing --_p-toast-a');
if (!live.cssHasS) failures.push('css missing 760 media');
if (!live.cssHasHydratedAnim) failures.push('css missing animation var');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout wrap leaked');
if (live.innerLit) failures.push('inner toast-item');
if (live.role !== 'status') failures.push('role');
if (live.position !== 'fixed') failures.push('host position');
if (live.zIndex !== '999999') failures.push('z-index');
if (live.bottom !== '64px') failures.push('1440 bottom');
if (live.left !== '64px') failures.push('1440 left');
if (hidden !== 'none') failures.push('hidden host display');
if (belowS.bottom !== '56px') failures.push('759 bottom');
if (atS.bottom !== '64px' || atS.left !== '64px') failures.push('760 inset');
if (consoleErrors.length) failures.push('console: ' + consoleErrors.join(' | '));

const summary = { live, hidden, belowS, atS, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
