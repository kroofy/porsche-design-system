import { getNativeCrestCss } from './crest-css';
import { nativeCrestImgSrc } from './crest-url';

describe('getNativeCrestCss()', () => {
  const css = getNativeCrestCss();

  it('scopes the control to .p-crest inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-crest {');
    expect(css).toContain('.p-crest[hidden]');
    expect(css).toContain('.p-crest:is(picture)');
  });

  it('inherits color-scheme outside the layer', () => {
    expect(css.startsWith('.p-crest{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toContain('::slotted');
  });

  it('keeps crest dimensions and focus on the native a', () => {
    expect(css).toContain('max-width: 30px');
    expect(css).toContain('max-height: 40px');
    expect(css).toContain('.p-crest:is(a):focus-visible::before');
  });
});

describe('nativeCrestImgSrc()', () => {
  it('points at the 2x png on the PDS CDN', () => {
    expect(nativeCrestImgSrc()).toContain('/crest/porsche-crest.');
    expect(nativeCrestImgSrc()).toContain('@2x.png');
  });
});
