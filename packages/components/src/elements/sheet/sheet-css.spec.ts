import { getComponentCss as getShadowSheetCss } from '../../components/sheet/sheet-styles';
import { getNativeSheetCss } from './sheet-css';

const shadowSheetWidth = (css: string): string => {
  const match = css.match(/\.sheet \{[\s\S]*?width: ([^;]+);/);
  if (!match) {
    throw new Error('missing sheet width');
  }
  return match[1];
};

describe('getNativeSheetCss()', () => {
  const css = getNativeSheetCss();

  it('scopes the control to .p-sheet inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-sheet {');
    expect(css).toContain('.p-sheet[hidden]');
    expect(css).toContain('.p-sheet:modal');
    expect(css).toContain('.p-sheet__panel');
    expect(css).toContain('.p-sheet__dismiss');
  });

  it('inherits color-scheme outside the layer so unlayered dialog resets lose', () => {
    expect(css.startsWith('.p-sheet{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the panel token contract', () => {
    expect(css).toContain(shadowSheetWidth(getShadowSheetCss(true, 'canvas', true)));
  });

  it('encodes background, shading backdrop and public css vars', () => {
    expect(css).toContain('[data-p-background="surface"]');
    expect(css).toContain('--ref-p-sheet-pt');
    expect(css).toContain('--ref-p-sheet-pb');
    expect(css).toContain('--ref-p-sheet-px');
    expect(css).toContain('::backdrop');
    expect(css).toContain('align-self: flex-end');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
