import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 800, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe/harness/index.html');
await page.waitForTimeout(300);

const results = await page.evaluate(() => {
  const probe = (el) => {
    const hr = el.shadowRoot?.querySelector('hr');
    const cs = hr ? getComputedStyle(hr) : null;
    return hr
      ? {
          hasShadowRoot: !!el.shadowRoot,
          styleTagInShadowRoot: !!el.shadowRoot.querySelector('style'),
          inlineBackground: hr.style.background || '(not set)',
          background: cs.backgroundColor,
          height: cs.height,
          width: cs.width,
          hostDisplay: getComputedStyle(el).display,
        }
      : { hasShadowRoot: !!el.shadowRoot, hr: null };
  };

  const defaultEl = document.querySelector('#default probe-divider');
  const verticalEl = document.querySelector('#vertical probe-divider');
  const bpEl = document.querySelector('#bp');
  const high = document.querySelector('probe-divider[color="contrast-high"]');

  // Reactivity: Stencil re-renders on attribute change. Does Mitosis?
  const before = probe(high).inlineBackground;
  high.setAttribute('color', 'contrast-lower');
  const after = probe(high).inlineBackground;

  return {
    isDefined: !!customElements.get('probe-divider'),
    default: probe(defaultEl),
    vertical: probe(verticalEl),
    breakpointObject: probe(bpEl),
    attrChangeReactive: before !== after,
  };
});

// PDS sets background: CanvasText in a forced-colors media query. With the
// color forced inline instead, HCM should force it away. Verify.
await page.emulateMedia({ forcedColors: 'active' });
results.forcedColors = await page.evaluate(() => {
  const hr = document.querySelector('#default probe-divider').shadowRoot.querySelector('hr');
  return { background: getComputedStyle(hr).backgroundColor };
});
await page.emulateMedia({ forcedColors: 'none' });

results.consoleErrors = consoleErrors;
console.warn(JSON.stringify(results, null, 2));

await page.screenshot({ path: '/opt/cursor/artifacts/mitosis_divider_after.png', fullPage: true });
await browser.close();
