import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { prefixSelectors, rewriteHost, rewritePdsTags, rewriteSlots, scopeCss } from './scope-css.js';

describe('rewriteHost', () => {
  it('maps :host and :host([hidden]) onto the framework host', () => {
    const css = ':host{display:inline-block}:host([hidden]){display:none!important}';
    assert.equal(
      rewriteHost(css, '.p-button'),
      '.p-button{display:inline-block}.p-button[hidden]{display:none!important}'
    );
  });

  it('maps :host(:dir(rtl)) without eating the rest of the selector', () => {
    assert.equal(
      rewriteHost(':host(:dir(rtl)) input::placeholder{direction:rtl}', '.p-input-text'),
      '.p-input-text:dir(rtl) input::placeholder{direction:rtl}'
    );
  });

  it('keeps nested parens of chained :not() inside :host()', () => {
    assert.equal(
      rewriteHost(':host(:not([icon-source]):not([icon])) p-icon{display:none}', '.p-button'),
      '.p-button:not([icon-source]):not([icon]) p-icon{display:none}'
    );
  });
});

describe('rewritePdsTags', () => {
  it('rewrites element selectors but not CSS variables', () => {
    const css = 'p-icon{display:none}p-button-pure{opacity:1}color:var(--p-icon-color,red);--p-button-bg:x';
    const next = rewritePdsTags(css, ['p-icon', 'p-button-pure', 'p-button']);
    assert.match(next, /\.p-icon\{display:none\}/);
    assert.match(next, /\.p-button-pure\{opacity:1\}/);
    assert.match(next, /var\(--p-icon-color,red\)/);
    assert.match(next, /--p-button-bg:x/);
    assert.doesNotMatch(next, /(?<![.\w-])p-icon/);
  });
});

describe('prefixSelectors', () => {
  it('prefixes descendants and leaves an already-scoped host alone', () => {
    const css = '.p-wordmark{height:1rem}a{display:block}svg{fill:currentColor}';
    const next = prefixSelectors(css, '.p-wordmark');
    assert.equal(next, '.p-wordmark{height:1rem}.p-wordmark a{display:block}.p-wordmark svg{fill:currentColor}');
  });

  it('walks @media / @supports bodies', () => {
    const css = '@media(min-width:480px){.p-button{color:red}.root{padding:0}}';
    const next = prefixSelectors(css, '.p-button');
    assert.equal(next, '@media(min-width:480px){.p-button{color:red}.p-button .root{padding:0}}');
  });

  it('prefixes the first rule inside an @media body', () => {
    const css = '.a{x:1}\n@media (hover: hover) {\n  a:not(:hover), button {\n    color: red;\n  }\n  .root { y: 2 }\n}';
    assert.equal(
      prefixSelectors(css, '.p-tabs-bar'),
      '.p-tabs-bar .a{x:1}\n@media (hover: hover) {\n  .p-tabs-bar a:not(:hover), .p-tabs-bar button{\n    color: red;\n  }\n  .p-tabs-bar .root{ y: 2 }\n}'
    );
  });

  it('does not treat .p-button-pure as already scoped to .p-button', () => {
    const next = prefixSelectors('.p-button-pure{opacity:1}', '.p-button');
    assert.equal(next, '.p-button .p-button-pure{opacity:1}');
  });

  it('does not split commas inside :is()', () => {
    const next = prefixSelectors(':is(h1,h2,h3){all:unset}', '.p-heading');
    assert.equal(next, '.p-heading :is(h1,h2,h3){all:unset}');
  });
});

describe('rewriteSlots', () => {
  it('limits ::slotted to direct children of the slot marker', () => {
    assert.equal(rewriteSlots('::slotted(:is(h1, h2)){all:unset}'), '[data-pds-slot] > :is(h1, h2){all:unset}');
    assert.equal(rewriteSlots('.wrapper ::slotted(a:focus-visible){x:1}'), '.wrapper [data-pds-slot] > a:focus-visible{x:1}');
  });

  it('maps slot element selectors but not [slot] attributes', () => {
    assert.equal(rewriteSlots('.a slot{display:grid}'), '.a [data-pds-slot]{display:grid}');
    assert.equal(rewriteSlots('slot[name="end"]{x:1}'), '[data-pds-slot="end"]{x:1}');
    assert.equal(rewriteSlots('[slot="description"]{x:1}'), '[slot="description"]{x:1}');
    assert.equal(rewriteSlots('@media (min-width: 1px){slot{x:1}}'), '@media (min-width: 1px){[data-pds-slot]{x:1}}');
  });
});

describe('scopeCss', () => {
  it('keeps the display heading styled: slotted reset must not hit the internal h3', () => {
    const next = scopeCss('::slotted(:is(h1, h2, h3)){all:unset !important}h3{font-size:9px}', '.p-display');
    assert.match(next, /\.p-display \[data-pds-slot\] > :is\(h1, h2, h3\)\{all:unset !important\}/);
    assert.match(next, /\.p-display :where\(\[data-pds-slot\]\)\{display:contents\}/);
  });

  it('drops the formatted Lit FOUC guard', () => {
    const css = ':host {\n  display: block;\n}\n:not(:defined, [data-ssr]) {\n  visibility: hidden;\n}\n.root { color: red }';
    const next = scopeCss(css, '.p-button');
    assert.doesNotMatch(next, /:defined/);
    assert.match(next, /\.p-button \.root/);
  });

  it('scopes a button-like cssText blob', () => {
    const css =
      ':host{--_p-button-a:1;border-radius:8px!important}' +
      ':not(:defined,[data-ssr]){visibility:hidden}' +
      '.root{display:flex}' +
      'p-icon{display:none}' +
      '@media(hover:hover){.root:hover{color:red}}';
    const next = scopeCss(css, '.p-button');
    assert.doesNotMatch(next, /:host/);
    assert.doesNotMatch(next, /visibility:hidden/);
    assert.match(next, /\.p-button\{--_p-button-a:1/);
    assert.match(next, /\.p-button \.root\{display:flex\}/);
    assert.match(next, /\.p-button \.p-icon\{display:none\}/);
    assert.match(next, /@media\(hover:hover\)\{\.p-button \.root:hover\{color:red\}\}/);
  });

  it('keeps wordmark host height on the wrapper', () => {
    const css =
      ':host{height:clamp(0.63rem, 0.42vw + 0.5rem, 1rem)!important}' +
      '@supports (height: round(down, 1px, 1px)){:host{height:1px!important}}' +
      'a{height:inherit}svg{height:inherit}';
    const next = scopeCss(css, '.p-wordmark');
    assert.match(next, /(^|\n)\.p-wordmark\{height:clamp/);
    assert.match(next, /@supports \(height: round\(down, 1px, 1px\)\)\{\.p-wordmark\{height:1px!important\}\}/);
    assert.match(next, /\.p-wordmark a\{height:inherit\}/);
    assert.match(next, /\.p-wordmark svg\{height:inherit\}/);
  });

  it('flattens slotted rules onto the host tree', () => {
    const css = 'slot[name="label-after"]::slotted(*){margin:0}.label > slot[name="label"]::slotted(*){display:inline}';
    const next = scopeCss(css, '.p-input-text');
    assert.match(next, /\.p-input-text \[data-pds-slot="label-after"\] > \*/);
    assert.match(next, /\.p-input-text \.label > \[data-pds-slot="label"\] > \*/);
  });
});
