import { getComponentCss as getShadowSwitchCss } from '../../components/switch/switch-styles';
import { getNativeSwitchCss } from './switch-css';

const shadowButtonBackground = (css: string): string => {
  const match = css.match(/button \{[\s\S]*?background: ([^;]+);/);
  if (!match) {
    throw new Error('missing switch button background');
  }
  return match[1];
};

describe('getNativeSwitchCss()', () => {
  const css = getNativeSwitchCss();

  it('scopes the control to .p-switch inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-switch {');
    expect(css).toContain('.p-switch[hidden]');
    expect(css).toContain('.p-switch:focus-visible .p-switch__toggle');
  });

  it('inherits color-scheme outside the layer so unlayered button resets lose', () => {
    expect(css.startsWith('.p-switch{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the track token contract', () => {
    expect(css).toContain(shadowButtonBackground(getShadowSwitchCss('end', false, false, false, false, false, false)));
  });

  it('encodes checked, loading, compact, stretch, hide-label and align-label', () => {
    expect(css).toContain('[aria-checked="true"]');
    expect(css).toContain('[data-p-loading]');
    expect(css).toContain('[data-p-compact="true"]');
    expect(css).toContain('[data-p-stretch="true"]');
    expect(css).toContain('[data-p-hide-label="true"]');
    expect(css).toContain('[data-p-align-label="start"]');
    expect(css).toContain('.p-switch__toggle');
    expect(css).toContain('.p-switch__knob');
    expect(css).toContain('.p-switch__label');
    expect(css).toContain('--p-spinner-size');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
