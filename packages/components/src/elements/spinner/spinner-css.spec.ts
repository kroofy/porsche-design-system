import { getComponentCss as getShadowSpinnerCss } from '../../components/spinner/spinner-styles';
import { getNativeSpinnerCss } from './spinner-css';

const shadowFgStroke = (css: string): string => {
  const match = css.match(/circle:last-child \{[\s\S]*?stroke: ([^;]+);/);
  if (!match) {
    throw new Error('missing spinner stroke');
  }
  return match[1];
};

describe('getNativeSpinnerCss()', () => {
  const css = getNativeSpinnerCss();

  it('scopes the control to .p-spinner inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-spinner {');
    expect(css).toContain('.p-spinner[hidden]');
    expect(css).toContain('.p-spinner > circle:last-child');
  });

  it('inherits color-scheme outside the layer so unlayered svg resets lose', () => {
    expect(css.startsWith('.p-spinner{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the primary token contract', () => {
    expect(css).toContain(shadowFgStroke(getShadowSpinnerCss('primary', 'sm')));
  });

  it('encodes color, size and the shared spin keyframes', () => {
    expect(css).toContain('[data-p-color="inherit"]');
    expect(css).toContain('[data-p-size="lg"]');
    expect(css).toContain('--p-spinner-size');
    expect(css).toContain('--p-temporary-spinner-stroke-dasharray');
    expect(css).toContain('@keyframes p-spin-rotate');
    expect(css).toContain('@keyframes p-spin-dash');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
