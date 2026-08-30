import { getComponentCss as getShadowFlyoutCss } from '../../components/flyout/flyout-styles';
import { getNativeFlyoutCss } from './flyout-css';

const shadowPanelMinWidth = (css: string): string => {
  const match = css.match(/min-width: ([^;]+);/);
  if (!match) {
    throw new Error('missing flyout min-width');
  }
  return match[1];
};

describe('getNativeFlyoutCss()', () => {
  const css = getNativeFlyoutCss();

  it('scopes the control to .p-flyout inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-flyout {');
    expect(css).toContain('.p-flyout[hidden]');
    expect(css).toContain('.p-flyout:modal');
    expect(css).toContain('.p-flyout__panel');
    expect(css).toContain('.p-flyout__scroller');
    expect(css).toContain('.p-flyout__dismiss');
    expect(css).toContain('.p-flyout__header');
    expect(css).toContain('.p-flyout__footer');
    expect(css).toContain('.p-flyout__sub-footer');
  });

  it('inherits color-scheme outside the layer so unlayered dialog resets lose', () => {
    expect(css.startsWith('.p-flyout{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the panel token contract', () => {
    expect(css).toContain(
      shadowPanelMinWidth(getShadowFlyoutCss(true, 'canvas', 'blur', 'end', false, false, false, 'sticky', false))
    );
  });

  it('encodes position, backdrop, background, fullscreen, footer and public css vars', () => {
    expect(css).toContain('[data-p-position="start"]');
    expect(css).toContain('[data-p-backdrop="shading"]');
    expect(css).toContain('[data-p-background="surface"]');
    expect(css).toContain('[data-p-fullscreen="true"]');
    expect(css).toContain('[data-p-footer-behavior="fixed"]');
    expect(css).toContain('--p-flyout-width');
    expect(css).toContain('--ref-p-flyout-pt');
    expect(css).toContain('--ref-p-flyout-pb');
    expect(css).toContain('--ref-p-flyout-px');
    expect(css).toContain('::backdrop');
  });

  it('puts the open transition on the scroller, not the panel', () => {
    expect(css).toContain('.p-flyout:modal .p-flyout__scroller');
    expect(css).not.toContain('.p-flyout:modal .p-flyout__panel');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
