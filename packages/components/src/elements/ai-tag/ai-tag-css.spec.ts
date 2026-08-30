import { getComponentCss as getShadowAiTagCss } from '../../components/ai-tag/ai-tag-styles';
import { getNativeAiTagCss } from './ai-tag-css';

const shadowPillBackground = (css: string): string => {
  const match = css.match(/\bdiv \{[\s\S]*?background: ([^;]+);/);
  if (!match) {
    throw new Error('missing ai-tag background');
  }
  return match[1];
};

describe('getNativeAiTagCss()', () => {
  const css = getNativeAiTagCss();

  it('scopes the control to .p-ai-tag inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-ai-tag {');
    expect(css).toContain('.p-ai-tag[hidden]');
    expect(css).toContain('.p-ai-tag > abbr');
    expect(css).toContain('.p-ai-tag::before');
  });

  it('inherits color-scheme outside the layer so unlayered span resets lose', () => {
    expect(css.startsWith('.p-ai-tag{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the pill token contract', () => {
    expect(css).toContain(shadowPillBackground(getShadowAiTagCss()));
  });

  it('uses the host sm line-height so the pill is not shorter than stencil', () => {
    expect(css).toContain('font-size: var(--p-typescale-2xs)');
    expect(css).toContain('line-height: calc(6px + 2.125ex * var(--p-typescale-sm) / 1em)');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
