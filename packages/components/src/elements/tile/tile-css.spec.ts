import { getComponentCss as getShadowButtonTileCss } from '../../components/button-tile/button-tile-styles';
import { getNativeButtonTileCss, getNativeLinkTileCss } from './tile-css';

const shadowRootRadius = (css: string): string => {
  const match = css.match(/\.root \{[\s\S]*?border-radius: ([^;]+);/);
  if (!match) {
    throw new Error('missing tile border-radius');
  }
  return match[1];
};

describe('getNativeButtonTileCss()', () => {
  const css = getNativeButtonTileCss();

  it('scopes the control to .p-button-tile inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-button-tile {');
    expect(css).toContain('.p-button-tile[hidden]');
    expect(css).toContain('.p-button-tile:focus-visible');
  });

  it('sets color-scheme dark outside the layer so frosted inner actions match stencil', () => {
    expect(css.startsWith('.p-button-tile{color-scheme:dark}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the radius token contract', () => {
    expect(css).toContain(
      shadowRootRadius(getShadowButtonTileCss(false, '4/3', 'medium', 'semi-bold', 'bottom', false, false, false))
    );
  });

  it('encodes media, header, content, gradient, compact and aspect-ratio', () => {
    expect(css).toContain('.p-button-tile__media');
    expect(css).toContain('.p-button-tile__header');
    expect(css).toContain('.p-button-tile__content');
    expect(css).toContain('.p-button-tile__description');
    expect(css).toContain('[data-p-gradient="true"]');
    expect(css).toContain('[data-p-compact="true"]');
    expect(css).toContain('[data-p-aspect-ratio="16/9"]');
    expect(css).toContain('[data-p-align="top"]');
    expect(css).toContain('.p-button-tile__action {');
    expect(css).toMatch(/\.p-button-tile__action \{[^}]*display: inline-flex;/);
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});

describe('getNativeLinkTileCss()', () => {
  const css = getNativeLinkTileCss();

  it('scopes the control to .p-link-tile inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-link-tile {');
    expect(css).toContain('.p-link-tile__media');
  });

  it('sets color-scheme dark outside the layer', () => {
    expect(css.startsWith('.p-link-tile{color-scheme:dark}')).toBe(true);
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
