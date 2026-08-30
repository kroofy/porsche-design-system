import { getComponentCss as getShadowAccordionCss } from '../../components/accordion/accordion-styles';
import { getNativeAccordionCss } from './accordion-css';

const shadowDetailsFont = (css: string): string => {
  const match = css.match(/details \{[\s\S]*?font: ([^;]+);/);
  if (!match) {
    throw new Error('missing details font');
  }
  return match[1];
};

describe('getNativeAccordionCss()', () => {
  const css = getNativeAccordionCss();

  it('scopes the control to .p-accordion inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-accordion {');
    expect(css).toContain('.p-accordion[hidden]');
    expect(css).toContain('.p-accordion > summary');
  });

  it('inherits color-scheme outside the layer so unlayered details resets lose', () => {
    expect(css.startsWith('.p-accordion{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the default token contract', () => {
    expect(css).toContain(
      shadowDetailsFont(getShadowAccordionCss('end', 'none', false, false, false, false, false, false, 'small'))
    );
  });

  it('encodes background, compact, align-marker, indent and sticky on the details', () => {
    expect(css).toContain('[data-p-background="canvas"]');
    expect(css).toContain('[data-p-background="surface"]');
    expect(css).toContain('[data-p-background="frosted"]');
    expect(css).toContain('[data-p-compact="true"]');
    expect(css).toContain('[data-p-align-marker="start"]');
    expect(css).toContain('[data-p-indent="true"]');
    expect(css).toContain('[data-p-sticky="true"]');
    expect(css).toContain('::details-content');
    expect(css).toContain('::-webkit-details-marker');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
