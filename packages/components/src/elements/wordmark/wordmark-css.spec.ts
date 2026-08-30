import { getNativeWordmarkCss } from './wordmark-css';

describe('getNativeWordmarkCss()', () => {
  const css = getNativeWordmarkCss();

  it('scopes the control to .p-wordmark inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-wordmark {');
    expect(css).toContain('.p-wordmark[hidden]');
    expect(css).toContain('.p-wordmark:is(svg)');
  });

  it('inherits color-scheme outside the layer', () => {
    expect(css.startsWith('.p-wordmark{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toContain('::slotted');
  });

  it('keeps inherit height and focus on the native a', () => {
    expect(css).toContain('[data-p-size="inherit"]');
    expect(css).toContain('.p-wordmark:is(a):focus-visible::before');
    expect(css).toContain('round(down');
  });
});
