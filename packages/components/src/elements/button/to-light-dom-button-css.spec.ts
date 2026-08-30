import { rewriteShadowButtonCss } from './to-light-dom-button-css';

const SHADOW_CSS = `:host {
  display: inline-block;
  --p-button-bg: red;
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

describe('rewriteShadowButtonCss()', () => {
  const css = rewriteShadowButtonCss(SHADOW_CSS);

  it('scopes rules to .p-button inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-button {');
    expect(css).toContain('.p-button[hidden]');
    expect(css).toContain('.p-button:focus-visible');
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the existing token contract', () => {
    expect(css).toContain('--p-button-bg');
  });
});
