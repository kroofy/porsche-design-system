import { rewriteShadowLinkCss } from './to-light-dom-link-css';

const SHADOW_CSS = `:host {
  display: inline-block;
  --p-link-bg: red;
}
:host([hidden]) {
  display: none !important;
}
:not(:defined,[data-ssr]) {
  visibility: hidden;
}
.root {
  display: flex;
}
.root:focus-visible {
  outline: 2px solid;
}
`;

describe('rewriteShadowLinkCss()', () => {
  const css = rewriteShadowLinkCss(SHADOW_CSS);

  it('scopes rules to .p-link inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-link {');
    expect(css).toContain('.p-link[hidden]');
    expect(css).toContain('.p-link:focus-visible');
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the existing token contract', () => {
    expect(css).toContain('--p-link-bg');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
