import { getComponentCss as getShadowDisplayCss } from '../components/display/display-styles';
import { getComponentCss as getShadowHeadingCss } from '../components/heading/heading-styles';
import { getComponentCss as getShadowTextCss } from '../components/text/text-styles';
import { getNativeDisplayCss, getNativeHeadingCss, getNativeTextCss } from './typography-css';

const shadowRootFont = (css: string): string => {
  const match = css.match(/\.root \{[\s\S]*?font: ([^;]+);/);
  if (!match) {
    throw new Error('missing .root font');
  }
  return match[1];
};

describe('getNativeHeadingCss()', () => {
  const css = getNativeHeadingCss();

  it('scopes the control to .p-heading inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-heading {');
    expect(css).toContain('.p-heading[hidden]');
  });

  it('inherits color-scheme outside the layer', () => {
    expect(css.startsWith('.p-heading{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
  });

  it('keeps the default token contract', () => {
    const shadow = getShadowHeadingCss('2xl', 'normal', 'start', 'primary', 'none', false);
    expect(css).toContain(shadowRootFont(shadow));
  });

  it('encodes size, weight, align, color, hyphens and ellipsis', () => {
    expect(css).toContain('[data-p-size="sm"]');
    expect(css).toContain('[data-p-weight="bold"]');
    expect(css).toContain('[data-p-align="center"]');
    expect(css).toContain('[data-p-color="contrast-high"]');
    expect(css).toContain('[data-p-hyphens="auto"]');
    expect(css).toContain('[data-p-ellipsis="true"]');
    expect(css).toContain('overflow-wrap: break-word');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});

describe('getNativeTextCss()', () => {
  const css = getNativeTextCss();

  it('scopes the control to .p-text inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-text {');
  });

  it('keeps the default token contract', () => {
    const shadow = getShadowTextCss('sm', 'normal', 'start', 'primary', 'inherit', false);
    expect(css).toContain(shadowRootFont(shadow));
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});

describe('getNativeDisplayCss()', () => {
  const css = getNativeDisplayCss();

  it('scopes the control to .p-display inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-display {');
  });

  it('keeps the default token contract', () => {
    const shadow = getShadowDisplayCss('large', 'start', 'primary', false);
    expect(css).toContain(shadowRootFont(shadow));
  });

  it('encodes display sizes', () => {
    expect(css).toContain('[data-p-size="small"]');
    expect(css).toContain('[data-p-size="medium"]');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
