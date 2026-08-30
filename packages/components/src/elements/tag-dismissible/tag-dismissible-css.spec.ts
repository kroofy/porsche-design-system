import { getComponentCss as getShadowTagDismissibleCss } from '../../components/tag-dismissible/tag-dismissible-styles';
import { getNativeTagDismissibleCss } from './tag-dismissible-css';

const shadowButtonBackground = (css: string): string => {
  const match = css.match(/button \{[\s\S]*?background: ([^;]+);/);
  if (!match) {
    throw new Error('missing button background');
  }
  return match[1];
};

describe('getNativeTagDismissibleCss()', () => {
  const css = getNativeTagDismissibleCss();

  it('scopes the control to .p-tag-dismissible inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-tag-dismissible {');
    expect(css).toContain('.p-tag-dismissible[hidden]');
    expect(css).toContain('.p-tag-dismissible:focus-visible');
  });

  it('inherits color-scheme outside the layer so unlayered button resets lose', () => {
    expect(css.startsWith('.p-tag-dismissible{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the frosted token contract', () => {
    expect(css).toContain(shadowButtonBackground(getShadowTagDismissibleCss(false, false)));
  });

  it('encodes compact, label, icon and sr-only name', () => {
    expect(css).toContain('[data-p-compact="true"]');
    expect(css).toContain(':has(.p-tag-dismissible__label)');
    expect(css).toContain('.p-tag-dismissible > .p-tag-dismissible__icon');
    expect(css).toContain('.p-tag-dismissible > .p-tag-dismissible__sr');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
