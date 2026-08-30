import { getComponentCss as getShadowFlagCss } from '../../components/flag/flag-styles';
import { getNativeFlagCss } from './flag-css';

describe('getNativeFlagCss()', () => {
  const css = getNativeFlagCss();

  it('scopes the control to .p-flag inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-flag {');
    expect(css).toContain('.p-flag[hidden]');
  });

  it('inherits color-scheme outside the layer so unlayered img resets lose', () => {
    expect(css.startsWith('.p-flag{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toContain('::slotted');
  });

  it('keeps the size token contract', () => {
    const shadow = getShadowFlagCss('lg');
    expect(css).toContain('[data-p-size="lg"]');
    expect(shadow).toContain('font-size');
    expect(css).toContain('--p-flag-size');
  });
});
