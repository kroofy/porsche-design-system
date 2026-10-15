import { createRequire } from 'node:module';

const require = createRequire('/workspace/package.json');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 640 } });
const consoleErrors = [];
page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(msg.text()));
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('file:///workspace/packages/mitosis-probe-lit/harness/link-tile.html');
await page.waitForFunction(() => customElements.get('lit-link-tile'));
await page.waitForFunction(() =>
  document.querySelector('#default lit-link-tile')?.shadowRoot?.querySelector('.root'),
);

const live = await page.evaluate(() => {
  const el = document.querySelector('#default lit-link-tile');
  const sr = el.shadowRoot;
  const style = sr?.querySelector('style');
  const css = style?.textContent ?? '';
  const root = sr?.querySelector('.root');
  const desc = sr?.querySelector('p');
  const overlay = sr?.querySelector('a');
  const links = [...(sr?.querySelectorAll('p-link') ?? [])];
  const headerSlot = sr?.querySelector('slot[name="header"]');
  const footerSlot = sr?.querySelector('slot[name="footer"]');
  const mediaSlot = sr?.querySelector('.media slot:not([name])') ?? sr?.querySelector('.media slot');
  const ref = document.querySelector('#primary-ref');
  return {
    isDefined: !!customElements.get('lit-link-tile'),
    hasShadowRoot: !!sr,
    dynamicStyleTag: !!style,
    cssHasHostFlex: css.includes(':host{display:flex'),
    cssHasAspect: css.includes('aspect-ratio:3/4'),
    cssHasHover: css.includes('.root:hover slot:not([name])'),
    cssHasCursor: css.includes('cursor:'),
    unknownWrapper: sr?.querySelector('my-fragment') ? 'my-fragment' : null,
    rootClass: root?.className ?? null,
    descText: desc?.textContent ?? '',
    descColorMatch: desc && ref ? getComputedStyle(desc).color === getComputedStyle(ref).color : false,
    overlayHref: overlay?.getAttribute('href'),
    overlayTarget: overlay?.getAttribute('target'),
    overlayTabIndex: overlay?.getAttribute('tabindex'),
    overlayAriaHidden: overlay?.getAttribute('aria-hidden'),
    linkTags: links.map((n) => n.tagName),
    linkClasses: links.map((n) => n.getAttribute('class')),
    fullLabel: links.find((n) => n.classList.contains('link-or-button'))?.textContent,
    fullHref: links.find((n) => n.classList.contains('link-or-button'))?.getAttribute('href'),
    hasHeaderSlot: !!headerSlot,
    hasFooterSlot: !!footerSlot,
    hasDefaultSlot: !!mediaSlot,
    innerLit: !!sr?.querySelector('lit-link,lit-tag,lit-text,lit-icon,lit-button'),
    hostDisplay: getComputedStyle(el).display,
  };
});

const top = await page.evaluate(() => {
  const el = document.querySelector('#top lit-link-tile');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  const headerSlot = el.shadowRoot?.querySelector('slot[name="header"]');
  const footerSlot = el.shadowRoot?.querySelector('slot[name="footer"]');
  return {
    cssHasTopHeader: css.includes('slot[name="header"]{grid-area:4/2'),
    cssHasGradientBottom: css.includes('linear-gradient(to bottom'),
    cssHasTypescaleLg: css.includes('font-size:var(--p-typescale-lg)'),
    cssHasWeightNormal: css.includes('font-weight:var(--p-font-weight-normal)'),
    headerAssigned: headerSlot ? headerSlot.assignedNodes().map((n) => n.tagName) : [],
    footerAssigned: footerSlot ? footerSlot.assignedNodes().map((n) => n.tagName) : [],
  };
});

const compactJson = await page.evaluate(() => {
  const el = document.querySelector('#compact-json lit-link-tile');
  const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
  return {
    cssHas1000: css.includes('min-width:1000px'),
    cssHas760: css.includes('min-width:760px'),
    cssHidesLinkAtM: css.includes('@media(min-width:1000px){.link-or-button{display:none}}'),
    cssShowsPureAtM: css.includes('@media(min-width:1000px){.link-or-button-pure{display:inline-block}}'),
  };
});

const noHref = await page.evaluate(() => {
  const el = document.querySelector('#no-href lit-link-tile');
  const overlay = el.shadowRoot?.querySelector('a');
  const link = el.shadowRoot?.querySelector('p-link.link-or-button');
  return {
    overlayHref: overlay?.getAttribute('href'),
    overlayHasHref: overlay?.hasAttribute('href') ?? null,
    linkHref: link?.getAttribute('href'),
    linkHasHref: link?.hasAttribute('href') ?? null,
  };
});

const hidden = await page.evaluate(
  () => getComputedStyle(document.querySelector('#hidden lit-link-tile')).display,
);

await browser.close();

const failures = [];
if (!live.isDefined) failures.push('lit-link-tile is not defined');
if (!live.hasShadowRoot) failures.push('no shadowRoot');
if (!live.dynamicStyleTag) failures.push('no cssText <style>');
if (!live.cssHasHostFlex) failures.push('cssText missing host flex');
if (!live.cssHasAspect) failures.push('cssText missing aspect-ratio 3/4');
if (!live.cssHasHover) failures.push('cssText missing hover scale');
if (live.cssHasCursor) failures.push('cssText has cursor (link-tile root has none)');
if (live.unknownWrapper) failures.push('my-fragment leaked');
if (live.rootClass !== 'root') failures.push(`root class ${live.rootClass}`);
if (live.descText !== 'Some description') failures.push(`desc ${live.descText}`);
if (!live.descColorMatch) failures.push('description color mismatch vs --p-color-primary');
if (live.overlayHref !== 'https://porsche.com') failures.push(`overlay href ${live.overlayHref}`);
if (live.overlayTarget !== '_blank') failures.push(`overlay target ${live.overlayTarget}`);
if (live.overlayTabIndex !== '-1') failures.push(`overlay tabindex ${live.overlayTabIndex}`);
if (live.overlayAriaHidden !== 'true') failures.push(`overlay aria-hidden ${live.overlayAriaHidden}`);
if (live.linkTags.join() !== 'P-LINK,P-LINK') failures.push(`links ${live.linkTags}`);
if (!live.linkClasses.includes('link-or-button')) failures.push('missing full p-link');
if (live.fullLabel !== 'Some label') failures.push(`label ${live.fullLabel}`);
if (live.fullHref !== 'https://porsche.com') failures.push(`link href ${live.fullHref}`);
if (!live.hasHeaderSlot) failures.push('missing header slot');
if (!live.hasFooterSlot) failures.push('missing footer slot');
if (!live.hasDefaultSlot) failures.push('missing default slot');
if (live.innerLit) failures.push('nested control was swapped to a lit-* tag');
if (live.hostDisplay !== 'flex') failures.push(`host display ${live.hostDisplay}`);
if (!top.cssHasTopHeader) failures.push('top align missing header grid-area 4/2');
if (!top.cssHasGradientBottom) failures.push('top gradient missing to-bottom');
if (!top.cssHasTypescaleLg) failures.push('large size missing typescale-lg');
if (!top.cssHasWeightNormal) failures.push('regular weight missing font-weight-normal');
if (!top.headerAssigned.includes('P-TAG')) failures.push(`header slot ${JSON.stringify(top.headerAssigned)}`);
if (!top.footerAssigned.includes('P-TEXT')) failures.push(`footer slot ${JSON.stringify(top.footerAssigned)}`);
if (!compactJson.cssHas1000) failures.push('compact json missing 1000px');
if (compactJson.cssHas760) failures.push('compact json compiled an s/760 rule');
if (!compactJson.cssHidesLinkAtM) failures.push('compact m does not hide full link');
if (!compactJson.cssShowsPureAtM) failures.push('compact m does not show pure link');
if (noHref.overlayHref === 'undefined' || noHref.overlayHasHref) {
  failures.push(`unset overlay href ${JSON.stringify(noHref.overlayHref)}`);
}
if (noHref.linkHref === 'undefined' || noHref.linkHasHref) {
  failures.push(`unset p-link href ${JSON.stringify(noHref.linkHref)}`);
}
if (hidden !== 'none') failures.push(`hidden display is ${hidden}`);
if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

const summary = { live, top, compactJson, noHref, hidden, consoleErrors, failures };
console.warn(JSON.stringify(summary, null, 2));
process.exit(failures.length ? 1 : 0);
