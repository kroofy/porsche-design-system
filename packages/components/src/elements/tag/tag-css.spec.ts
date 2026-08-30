import { getComponentCss as getShadowTagCss } from '../../components/tag/tag-styles';
import { getNativeTagCss } from './tag-css';

const shadowSpanBackground = (css: string): string => {
  const match = css.match(/span \{[\s\S]*?background: ([^;]+);/);
  if (!match) {
    throw new Error('missing span background');
  }
  return match[1];
};

describe('getNativeTagCss()', () => {
  const css = getNativeTagCss();

  it('scopes the control to .p-tag inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-tag {');
    expect(css).toContain('.p-tag[hidden]');
    expect(css).toContain('.p-tag:is(a):focus-visible');
    expect(css).toContain('.p-tag:is(button):focus-visible');
  });

  it('inherits color-scheme outside the layer so unlayered span resets lose', () => {
    expect(css.startsWith('.p-tag{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it.each(['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const)(
    'keeps the %s token contract',
    (variant) => {
      expect(css).toContain(shadowSpanBackground(getShadowTagCss(variant, false, false, false)));
    }
  );

  it('encodes variant, compact, icon and native interactive tags', () => {
    expect(css).toContain('[data-p-variant="primary"]');
    expect(css).toContain('[data-p-compact="true"]');
    expect(css).toContain('.p-tag > .p-tag__icon');
    expect(css).toContain('.p-tag:is(a)');
    expect(css).toContain('.p-tag:is(button)');
    expect(css).toContain('.p-tag > br');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
