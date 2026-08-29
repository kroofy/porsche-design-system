import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getComponentCss as getShadowButtonCss } from '../components/button/button-styles';
import { getComponentCss as getShadowLinkCss } from '../components/link/link-styles';
import { getElementsCss, getNativeButtonCss, getNativeLinkCss } from './link-button-css';

const shadowRootBackground = (css: string): string => {
  const match = css.match(/\.root \{[\s\S]*?background-color: ([^;]+);/);
  if (!match) {
    throw new Error('missing .root background-color');
  }
  return match[1];
};

describe('getNativeButtonCss()', () => {
  const css = getNativeButtonCss();

  it('scopes the control to .p-button inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-button {');
    expect(css).toContain('.p-button[hidden]');
    expect(css).toContain('.p-button:focus-visible');
  });

  it('inherits color-scheme outside the layer so unlayered button resets lose', () => {
    expect(css.startsWith('.p-button{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it.each(['primary', 'secondary', 'destructive'] as const)('keeps the %s token contract', (variant) => {
    const shadow = getShadowButtonCss('none', '', variant, false, false, false, false);
    expect(css).toContain(shadowRootBackground(shadow));
  });

  it('shows the label by default without a hide-label attribute', () => {
    expect(css).toMatch(/\.p-button \.p-button__label \{[\s\S]*?position: static/);
  });

  it('encodes compact, hide-label, loading and disabled on the same node', () => {
    expect(css).toContain('[data-p-compact="true"]');
    expect(css).toContain('[data-p-hide-label="true"]');
    expect(css).toContain('[data-p-loading="true"]');
    expect(css).toContain('.p-button:disabled');
    expect(css).toContain('--p-button-bg');
    expect(css).toContain('@keyframes p-spin-rotate');
    expect(css).toContain('.p-button__spinner svg');
    expect(css).toContain('--p-temporary-spinner-stroke-dasharray');
    expect(css).not.toMatch(/circle:last-child \{[\s\S]*?stroke-dashoffset/);
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});

describe('getNativeLinkCss()', () => {
  const css = getNativeLinkCss();

  it('scopes the control to .p-link inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-link {');
    expect(css).toContain('.p-link[hidden]');
  });

  it('inherits color-scheme outside the layer so unlayered link resets lose', () => {
    expect(css.startsWith('.p-link{color-scheme:inherit}')).toBe(true);
  });

  it.each(['primary', 'secondary'] as const)('keeps the %s token contract', (variant) => {
    const shadow = getShadowLinkCss('none', '', variant, false, false, false);
    expect(css).toContain(shadowRootBackground(shadow));
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});

describe('elements.css', () => {
  it('stays generated from button, link, button-pure, link-pure, icon, field, fieldset, divider and typography css', () => {
    const committed = readFileSync(resolve(__dirname, 'elements.css'), 'utf8');
    expect(committed).toBe(getElementsCss());
  });
});
