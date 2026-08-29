import { getComponentCss as getShadowIconCss } from '../../components/icon/icon-styles';
import { getNativeIconCss } from './icon-css';
import { nativeIconUrl } from './icon-url';

describe('getNativeIconCss()', () => {
  const css = getNativeIconCss();

  it('scopes the control to .p-icon inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-icon {');
    expect(css).toContain('.p-icon[hidden]');
  });

  it('inherits color-scheme outside the layer so unlayered img resets lose', () => {
    expect(css.startsWith('.p-icon{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toContain('::slotted');
  });

  it('paints the glyph with the same CDN mask as shadow', () => {
    const shadow = getShadowIconCss('delete', '', 'inherit', 'inherit');
    expect(css).toContain(nativeIconUrl('delete'));
    expect(css).toContain(nativeIconUrl('arrow-right'));
    expect(shadow).toContain(nativeIconUrl('delete'));
  });

  it('encodes color and size on the same node', () => {
    expect(css).toContain('[data-p-color="inherit"]');
    expect(css).toContain('[data-p-size="inherit"]');
    expect(css).toContain('--p-icon-color');
    expect(css).toContain('--p-icon-size');
  });
});
