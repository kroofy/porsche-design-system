import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { prefixSelectors, rewriteHost, rewritePdsTags, scopeCss } from './scope-css.js';

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

  it('does not treat .p-button-pure as already scoped to .p-button', () => {
    const next = prefixSelectors('.p-button-pure{opacity:1}', '.p-button');
    assert.equal(next, '.p-button .p-button-pure{opacity:1}');
  });

  it('does not split commas inside :is()', () => {
    const next = prefixSelectors(':is(h1,h2,h3){all:unset}', '.p-heading');
    assert.equal(next, '.p-heading :is(h1,h2,h3){all:unset}');
  });
});

describe('scopeCss', () => {
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
    assert.match(next, /^\.p-wordmark\{height:clamp/);
    assert.match(next, /@supports \(height: round\(down, 1px, 1px\)\)\{\.p-wordmark\{height:1px!important\}\}/);
    assert.match(next, /\.p-wordmark a\{height:inherit\}/);
    assert.match(next, /\.p-wordmark svg\{height:inherit\}/);
  });

  it('flattens slotted rules onto the host tree', () => {
    const css = 'slot[name="label-after"]::slotted(*){margin:0}.label > slot[name="label"]::slotted(*){display:inline}';
    const next = scopeCss(css, '.p-input-text');
    assert.match(next, /\.p-input-text \[data-pds-slot="label-after"\] \*/);
    assert.match(next, /\.p-input-text \.label > \[data-pds-slot="label"\] \*/);
  });
});
