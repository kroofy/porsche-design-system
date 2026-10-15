import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch();
// 1440 makes breakpoint m active under both readings (tokens say m=1000; the
// unit brief says 760). The flip boundary is probed explicitly below.
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/index.html');
await page.waitForTimeout(300);

const probeAll = () =>
  page.evaluate(() => {
    // Reference color: what a plain div with the same var() computes to. The
    // divider is at parity when its hr computes to the same rgba.
    const refColor = (cssValue) => {
      const div = document.createElement('div');
      div.style.background = cssValue;
      document.body.appendChild(div);
      const c = getComputedStyle(div).backgroundColor;
      div.remove();
      return c;
    };
    const probe = (el) => {
      const hr = el.shadowRoot?.querySelector('hr');
      const cs = hr ? getComputedStyle(hr) : null;
      return {
        hasShadowRoot: !!el.shadowRoot,
        dynamicStyleTag: !!el.shadowRoot?.querySelector('style'),
        adoptedSheets: el.shadowRoot?.adoptedStyleSheets?.length ?? 0,
        unknownWrapper: el.shadowRoot?.querySelector('my-fragment') ? 'my-fragment' : null,
        background: cs?.backgroundColor ?? null,
        height: cs?.height ?? null,
        width: cs?.width ?? null,
        hostDisplay: getComputedStyle(el).display,
      };
    };
    const colors = ['contrast-lower', 'contrast-low', 'contrast-medium', 'contrast-high'];
    const colorResults = {};
    for (const c of colors) {
      const el = document.querySelector(`#colors lit-divider[color="${c}"]`);
      const p = probe(el);
      colorResults[c] = {
        background: p.background,
        expected: refColor(`var(--p-color-${c})`),
        match: p.background === refColor(`var(--p-color-${c})`),
      };
    }
    const high = document.querySelector('lit-divider[color="contrast-high"]');
    const before = probe(high).background;
    high.setAttribute('color', 'contrast-lower');
    return new Promise((resolvePromise) => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const after = probe(high).background;
          high.setAttribute('color', 'contrast-high');
          resolvePromise({
            isDefined: !!customElements.get('lit-divider'),
            default: probe(document.querySelector('#default lit-divider')),
            colors: colorResults,
            vertical: probe(document.querySelector('#vertical lit-divider')),
            breakpointObject: probe(document.querySelector('#bp lit-divider')),
            attrChangeReactive: before !== after,
            attrChange: { before, after },
          });
        })
      );
    });
  });

const results = await probeAll();

// Locate the real flip boundary of {"base":"horizontal","m":"vertical"}.
const bpGeometry = async (width) => {
  await page.setViewportSize({ width, height: 640 });
  await page.waitForTimeout(50);
  return page.evaluate(() => {
    const hr = document.querySelector('#bp lit-divider').shadowRoot.querySelector('hr');
    const cs = getComputedStyle(hr);
    return { width: cs.width, height: cs.height, vertical: cs.width === '1px' };
  });
};
results.breakpointFlip = {
  at640: await bpGeometry(640),
  at800: await bpGeometry(800),
  at999: await bpGeometry(999),
  at1000: await bpGeometry(1000),
  at1440: await bpGeometry(1440),
};

await page.emulateMedia({ forcedColors: 'active' });
results.forcedColors = await page.evaluate(() => {
  const hr = document.querySelector('#default lit-divider').shadowRoot.querySelector('hr');
  const div = document.createElement('div');
  div.style.background = 'CanvasText';
  document.body.appendChild(div);
  const expected = getComputedStyle(div).backgroundColor;
  div.remove();
  return { background: getComputedStyle(hr).backgroundColor, expectedCanvasText: expected };
});
await page.emulateMedia({ forcedColors: 'none' });

results.consoleErrors = consoleErrors;

const failures = [];
if (!results.isDefined) failures.push('custom element not defined');
if (!results.default.hasShadowRoot) failures.push('no shadow root');
if (!results.default.dynamicStyleTag) failures.push('no dynamic <style> in shadow root');
for (const [c, r] of Object.entries(results.colors)) {
  if (!r.match) failures.push(`color ${c} mismatch: ${r.background} != ${r.expected}`);
}
if (results.vertical.width !== '1px' || results.vertical.height !== '60px')
  failures.push(`vertical geometry wrong: ${results.vertical.width} x ${results.vertical.height}`);
if (!results.breakpointFlip.at1440.vertical) failures.push('breakpoint object not vertical at 1440 (m active)');
if (results.breakpointFlip.at640.vertical) failures.push('breakpoint object vertical at 640 (below every m candidate)');
if (!results.attrChangeReactive) failures.push('attribute change after connect not reactive');
if (results.forcedColors.background !== results.forcedColors.expectedCanvasText)
  failures.push(`forced-colors: got ${results.forcedColors.background}, expected ${results.forcedColors.expectedCanvasText}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

results.failures = failures;
console.warn(JSON.stringify(results, null, 2));

await page.setViewportSize({ width: 1440, height: 640 });
await page.screenshot({ path: new URL('./harness.png', import.meta.url).pathname, fullPage: true });
await browser.close();
process.exit(failures.length ? 1 : 0);
