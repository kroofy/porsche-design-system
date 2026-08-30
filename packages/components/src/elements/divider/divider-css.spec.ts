import { getComponentCss as getShadowDividerCss } from '../../components/divider/divider-styles';
import { getNativeDividerCss } from './divider-css';

const shadowHrBackground = (css: string): string => {
  const match = css.match(/hr \{[\s\S]*?background: ([^;]+);/);
  if (!match) {
    throw new Error('missing hr background');
  }
  return match[1];
};

describe('getNativeDividerCss()', () => {
  const css = getNativeDividerCss();

  it('scopes the control to .p-divider inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-divider {');
    expect(css).toContain('.p-divider[hidden]');
  });

  it('inherits color-scheme outside the layer so unlayered hr resets lose', () => {
    expect(css.startsWith('.p-divider{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it.each(['contrast-lower', 'contrast-low', 'contrast-medium', 'contrast-high'] as const)(
    'keeps the %s token contract',
    (color) => {
      const shadow = getShadowDividerCss(color, 'horizontal');
      expect(css).toContain(shadowHrBackground(shadow));
    }
  );

  it('encodes color and direction on the same node', () => {
    expect(css).toContain('[data-p-color="contrast-high"]');
    expect(css).toContain('[data-p-direction="vertical"]');
    expect(css).toContain('height: 1px');
    expect(css).toContain('width: 1px');
    expect(css).toContain('height: 100%');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
