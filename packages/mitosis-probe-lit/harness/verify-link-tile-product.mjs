import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/link-tile-product.html');
await page.waitForFunction(() => customElements.get('lit-link-tile-product'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-link-tile-product')?.shadowRoot?.querySelector('.root'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-link-tile-product');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const root = sr?.querySelector('.root');
  const heading = sr?.querySelector('h3.heading');
  const price = sr?.querySelector('p.price');
  const overlay = sr?.querySelector('a.anchor');
  const like = sr?.querySelector('p-button-pure');
  const headerSlot = sr?.querySelector('slot[name="header"]');
  const mediaSlot = sr?.querySelector('.image slot');
  const ref = document.querySelector('#surface-ref');
  return {
    isDefined: !!customElements.get('lit-link-tile-product'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostBlock: css.includes(':host{display:block'),
    cssHasAspect: css.includes('aspect-ratio:3/4'),
    cssHasSurface: css.includes('background-color:var(--p-color-surface)'),
    cssHas760: css.includes('min-width:760px'),
    cssHasHover: css.includes('.root:hover .image'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootClass: root?.className ?? null,
    headingText: heading?.textContent ?? '',
    priceText: price?.textContent ?? '',
    bgMatch: root && ref ? getComputedStyle(root).backgroundColor === getComputedStyle(ref).backgroundColor : false,
    overlayHref: overlay?.getAttribute('href'),
    overlayTarget: overlay?.getAttribute('target'),
    likeTag: like?.tagName ?? null,
    likeIcon: like?.getAttribute('icon'),
    likeLabel: like?.textContent,
    hasHeaderSlot: !!headerSlot,
    hasDefaultSlot: !!mediaSlot,
    innerLit: !!sr?.querySelector('lit-link,lit-button-pure,lit-tag,lit-icon,lit-button'),
    hostDisplay: getComputedStyle(el).display,
  };
});

const slotted = await page.evaluate(() => {
  const el = document.querySelector('#slotted lit-link-tile-product');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const overlay = el.shadowRoot?.querySelector('a.anchor');
  const anchorSlot = el.shadowRoot?.querySelector('slot[name="anchor"]');
  const headerSlot = el.shadowRoot?.querySelector('slot[name="header"]');
  const strike = el.shadowRoot?.querySelector('s');
  const desc = el.shadowRoot?.querySelector('p.description');
  const like = el.shadowRoot?.querySelector('p-button-pure');
  return {
    cssHas916: css.includes('aspect-ratio:9/16'),
    cssHasSlottedAnchor: css.includes("::slotted(a[slot='anchor'])"),
    cssHasSrOnly: css.includes('.sr-only{'),
    cssHasDescription: css.includes('.description{'),
    hasOverlay: !!overlay,
    overlayHref: overlay?.getAttribute('href'),
    anchorAssigned: anchorSlot ? anchorSlot.assignedNodes().map((n) => n.tagName) : [],
    headerAssigned: headerSlot ? headerSlot.assignedNodes().map((n) => n.tagName) : [],
    strikeText: strike?.textContent ?? '',
    descText: desc?.textContent ?? '',
    likeIcon: like?.getAttribute('icon'),
  };
});

const ratioJson = await page.evaluate(() => {
  const el = document.querySelector('#ratio-json lit-link-tile-product');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHas1000: css.includes('min-width:1000px'),
    cssHas760: css.includes('min-width:760px'),
    cssFlipsAtM: css.includes('@media(min-width:1000px){.root{aspect-ratio:9/16}}'),
  };
});

const noLike = await page.evaluate(() => {
  const el = document.querySelector('#no-like lit-link-tile-product');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    hasButton: !!el.shadowRoot?.querySelector('p-button-pure'),
    cssHasButton: css.includes('.button{'),
  };
});

const hidden = await page.evaluate(
  () => getComputedStyle(document.querySelector('#hidden lit-link-tile-product')).display,
);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-link-tile-product is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostBlock) failures.push('cssText missing host block');
if (!live.cssHasAspect) failures.push('cssText missing aspect-ratio 3/4');
if (!live.cssHasSurface) failures.push('cssText missing surface fill');
if (!live.cssHas760) failures.push('cssText missing 760px image padding');
if (!live.cssHasHover) failures.push('cssText missing hover scale');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootClass !== 'root') failures.push(`root class ${live.rootClass}`);
if (live.headingText !== 'Some heading') failures.push(`heading ${live.headingText}`);
if (live.priceText !== '718,00 €') failures.push(`price ${live.priceText}`);
if (!live.bgMatch) failures.push('background mismatch vs --p-color-surface');
if (live.overlayHref !== 'https://porsche.com') failures.push(`overlay href ${live.overlayHref}`);
if (live.overlayTarget !== '_blank') failures.push(`overlay target ${live.overlayTarget}`);
if (live.likeTag !== 'P-BUTTON-PURE') failures.push(`like ${live.likeTag}`);
if (live.likeIcon !== 'heart-filled') failures.push(`like icon ${live.likeIcon}`);
if (live.likeLabel !== 'Remove from wishlist') failures.push(`like label ${live.likeLabel}`);
if (!live.hasHeaderSlot) failures.push('missing header slot');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (live.hostDisplay !== 'block') failures.push(`host display ${live.hostDisplay}`);
if (!slotted.cssHas916) failures.push('slotted missing 9/16');
if (!slotted.cssHasSlottedAnchor) failures.push('slotted missing ::slotted anchor');
if (!slotted.cssHasSrOnly) failures.push('slotted missing sr-only');
if (!slotted.cssHasDescription) failures.push('slotted missing description');
if (slotted.hasOverlay) failures.push('slotted host still rendered overlay a');
if (slotted.overlayHref === 'undefined') failures.push('slotted overlay href is undefined');
if (!slotted.anchorAssigned.includes('A')) failures.push(`anchor slot ${JSON.stringify(slotted.anchorAssigned)}`);
if (!slotted.headerAssigned.includes('P-TAG')) failures.push(`header slot ${JSON.stringify(slotted.headerAssigned)}`);
if (slotted.strikeText !== '911,00 €') failures.push(`strike ${slotted.strikeText}`);
if (slotted.descText !== 'Some description') failures.push(`desc ${slotted.descText}`);
if (slotted.likeIcon !== 'heart') failures.push(`slotted like icon ${slotted.likeIcon}`);
if (!ratioJson.cssHas1000) failures.push('ratio json missing 1000px');
if (!ratioJson.cssHas760) failures.push('ratio json missing 760 image padding');
if (!ratioJson.cssFlipsAtM) failures.push('ratio json does not flip at m');
if (noLike.hasButton) failures.push('like-button=false still rendered p-button-pure');
if (noLike.cssHasButton) failures.push('like-button=false still has .button CSS');
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, slotted, ratioJson, noLike, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
