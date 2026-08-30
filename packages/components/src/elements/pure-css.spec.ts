import { getComponentCss as getShadowButtonPureCss } from '../components/button-pure/button-pure-styles';
import { getComponentCss as getShadowLinkPureCss } from '../components/link-pure/link-pure-styles';
import { getNativeButtonPureCss, getNativeLinkPureCss } from './pure-css';

const shadowRootColor = (css: string): string => {
  const match = css.match(/\.root \{[\s\S]*?color: ([^;]+);/);
  if (!match) {
    throw new Error('missing .root color');
  }
  return match[1];
};

describe('getNativeButtonPureCss()', () => {
  const css = getNativeButtonPureCss();

  it('scopes the control to .p-button-pure inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-button-pure {');
    expect(css).toContain('.p-button-pure[hidden]');
    expect(css).toContain('.p-button-pure:focus-visible::before');
  });

  it('inherits color-scheme outside the layer so unlayered button resets lose', () => {
    expect(css.startsWith('.p-button-pure{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it.each(['primary', 'contrast-high', 'inherit'] as const)('keeps the %s token contract', (color) => {
    const shadow = getShadowButtonPureCss(
      'arrow-right',
      '',
      false,
      false,
      false,
      false,
      false,
      'sm',
      color,
      false,
      'end',
      false
    );
    expect(css).toContain(shadowRootColor(shadow));
  });

  it('encodes size, color, hide-label, stretch, align, underline, active and loading', () => {
    expect(css).toContain('[data-p-size="md"]');
    expect(css).toContain('[data-p-color="contrast-high"]');
    expect(css).toContain('[data-p-hide-label="true"]');
    expect(css).toContain('[data-p-stretch="true"]');
    expect(css).toContain('[data-p-align-label="start"]');
    expect(css).toContain('[data-p-underline="true"]');
    expect(css).toContain('[data-p-active="true"]');
    expect(css).toContain('[data-p-loading="true"]');
    expect(css).toContain('.p-button-pure:disabled');
    expect(css).toContain('.p-button-pure:disabled:not([data-p-loading="true"])');
    expect(css).toContain('text-indent: -999999px');
    expect(css).toContain('.p-button-pure__spinner svg');
    expect(css).toContain('--p-temporary-spinner-stroke-dasharray');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});

describe('getNativeLinkPureCss()', () => {
  const css = getNativeLinkPureCss();

  it('scopes the control to .p-link-pure inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-link-pure {');
    expect(css).toContain('.p-link-pure[hidden]');
  });

  it('inherits color-scheme outside the layer so unlayered link resets lose', () => {
    expect(css.startsWith('.p-link-pure{color-scheme:inherit}')).toBe(true);
  });

  it.each(['primary', 'contrast-medium'] as const)('keeps the %s token contract', (color) => {
    const shadow = getShadowLinkPureCss('arrow-right', '', false, false, 'sm', color, false, 'end', false, false);
    expect(css).toContain(shadowRootColor(shadow));
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
