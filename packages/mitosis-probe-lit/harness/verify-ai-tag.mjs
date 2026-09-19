import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/ai-tag.html');
await page.waitForFunction(() => customElements.get('lit-ai-tag'));
await page.waitForFunction(() => {
  const el = document.querySelector('#generated lit-ai-tag');
  return !!el?.shadowRoot?.querySelector('div');
});

const live = await page.evaluate(() => {
  const el = document.querySelector('#generated lit-ai-tag');
  const sr = el.shadowRoot;
  const root = sr?.querySelector('div');
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const colorRef = document.querySelector('#color-ref');
  const bgRef = document.querySelector('#bg-ref');
  const computed = root ? getComputedStyle(root) : null;
  const before = root ? getComputedStyle(root, '::before') : null;
  return {
    isDefined: !!customElements.get('lit-ai-tag'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostFont: css.includes('var(--p-font-porsche-next)'),
    cssHasFrosted: css.includes('var(--p-color-frosted-strong)'),
    cssHasBlur: css.includes('backdrop-filter:var(--p-blur-frosted)'),
    cssHasMask: css.includes('data:image/svg+xml'),
    cssHasForcedColors: css.includes('forced-colors'),
    cssHasCanvasText: css.includes('CanvasText'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    extraRoot: sr?.querySelector('.root') ? 'root' : null,
    rootTag: root?.tagName ?? null,
    abbrInGenerated: !!root?.querySelector('abbr'),
    text: root?.textContent ?? '',
    color: computed?.color ?? null,
    colorRef: colorRef ? getComputedStyle(colorRef).color : null,
    colorMatch: root && colorRef ? computed.color === getComputedStyle(colorRef).color : false,
    background: computed?.backgroundColor ?? null,
    backgroundRef: bgRef ? getComputedStyle(bgRef).backgroundColor : null,
    backgroundMatch: root && bgRef ? computed.backgroundColor === getComputedStyle(bgRef).backgroundColor : false,
    beforeContent: before?.content ?? null,
    beforeWidth: before?.width ?? null,
    hostDisplay: getComputedStyle(el).display,
    hostSize: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height },
  };
});

const modified = await page.evaluate(() => {
  const el = document.querySelector('#modified lit-ai-tag');
  const root = el.shadowRoot?.querySelector('div');
  return {
    text: root?.textContent ?? '',
    hasAbbr: !!root?.querySelector('abbr'),
  };
});

const abbreviation = await page.evaluate(() => {
  const el = document.querySelector('#abbreviation lit-ai-tag');
  const abbr = el.shadowRoot?.querySelector('abbr');
  return {
    tag: abbr?.tagName ?? null,
    title: abbr?.getAttribute('title') ?? null,
    text: abbr?.textContent ?? '',
  };
});

const de = await page.evaluate(() => {
  const el = document.querySelector('#de lit-ai-tag');
  return el.shadowRoot?.querySelector('div')?.textContent ?? '';
});

const hidden = await page.evaluate(() => getComputedStyle(document.querySelector('#hidden lit-ai-tag')).display);

const attrChange = await page.evaluate(() => {
  const el = document.querySelector('#generated lit-ai-tag');
  const before = el.shadowRoot?.querySelector('div')?.textContent ?? '';
  el.setAttribute('variant', 'modified');
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const after = el.shadowRoot?.querySelector('div')?.textContent ?? '';
        el.setAttribute('variant', 'generated');
        resolve({ before, after });
      }),
    );
  });
});

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-ai-tag is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostFont) failures.push('cssText missing host font');
if (!live.cssHasFrosted) failures.push('cssText missing frosted-strong');
if (!live.cssHasBlur) failures.push('cssText missing backdrop-filter');
if (!live.cssHasMask) failures.push('cssText missing svg mask');
if (!live.cssHasForcedColors) failures.push('cssText missing forced-colors');
if (!live.cssHasCanvasText) failures.push('cssText missing CanvasText');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.extraRoot) failures.push('layout-affecting .root wrapper leaked');
if (live.rootTag !== 'DIV') failures.push(`root tag ${live.rootTag}`);
if (live.abbrInGenerated) failures.push('generated variant used abbr');
if (live.text !== 'AI-generated') failures.push(`generated text ${JSON.stringify(live.text)}`);
if (!live.colorMatch) failures.push(`color ${live.color} != ref ${live.colorRef}`);
if (!live.backgroundMatch) failures.push(`background ${live.background} != ref ${live.backgroundRef}`);
if (live.beforeContent !== '""' && live.beforeContent !== '"\\""') {
  if (!live.beforeWidth || live.beforeWidth === '0px' || live.beforeWidth === 'auto') {
    failures.push(`::before missing icon, content=${live.beforeContent} width=${live.beforeWidth}`);
  }
}
if (live.hostDisplay !== 'inline-flex') failures.push(`host display ${live.hostDisplay}`);
if (!(live.hostSize.h > 8)) failures.push(`host size ${live.hostSize.w}x${live.hostSize.h}`);
if (modified.text !== 'AI-modified') failures.push(`modified text ${JSON.stringify(modified.text)}`);
if (modified.hasAbbr) failures.push('modified variant used abbr');
if (abbreviation.tag !== 'ABBR') failures.push(`abbreviation tag ${abbreviation.tag}`);
if (abbreviation.title !== 'artificial intelligence') failures.push(`abbr title ${abbreviation.title}`);
if (abbreviation.text !== 'AI') failures.push(`abbr text ${JSON.stringify(abbreviation.text)}`);
if (de !== 'KI-generiert') failures.push(`de-DE text ${JSON.stringify(de)}`);
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (attrChange.after !== 'AI-modified') failures.push(`attribute change after connect: ${JSON.stringify(attrChange)}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, modified, abbreviation, de, hidden, attrChange, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
