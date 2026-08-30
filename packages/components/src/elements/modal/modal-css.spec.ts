import { getComponentCss as getShadowModalCss } from '../../components/modal/modal-styles';
import { getNativeModalCss } from './modal-css';

const shadowPanelMinWidth = (css: string): string => {
  const match = css.match(/min-width: ([^;]+);/);
  if (!match) {
    throw new Error('missing modal min-width');
  }
  return match[1];
};

describe('getNativeModalCss()', () => {
  const css = getNativeModalCss();

  it('scopes the control to .p-modal inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-modal {');
    expect(css).toContain('.p-modal[hidden]');
    expect(css).toContain('.p-modal:modal');
    expect(css).toContain('.p-modal__panel');
    expect(css).toContain('.p-modal__dismiss');
  });

  it('inherits color-scheme outside the layer so unlayered dialog resets lose', () => {
    expect(css.startsWith('.p-modal{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the panel token contract', () => {
    expect(css).toContain(shadowPanelMinWidth(getShadowModalCss(true, 'canvas', 'blur', false, true, true, false)));
  });

  it('encodes backdrop, background, fullscreen and public css vars', () => {
    expect(css).toContain('[data-p-backdrop="shading"]');
    expect(css).toContain('[data-p-background="surface"]');
    expect(css).toContain('[data-p-fullscreen="true"]');
    expect(css).toContain('--p-modal-width');
    expect(css).toContain('--ref-p-modal-pt');
    expect(css).toContain('::backdrop');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
