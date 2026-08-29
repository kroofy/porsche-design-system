import { getComponentCss as getShadowFieldsetCss } from '../../components/fieldset/fieldset-styles';
import { getNativeFieldsetCss } from './fieldset-css';

const shadowLegendFont = (css: string): string => {
  const match = css.match(/legend \{[\s\S]*?font: ([^;]+);/);
  if (!match) {
    throw new Error('missing legend font');
  }
  return match[1];
};

describe('getNativeFieldsetCss()', () => {
  const css = getNativeFieldsetCss();

  it('scopes the control to .p-fieldset inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-fieldset {');
    expect(css).toContain('.p-fieldset[hidden]');
  });

  it('inherits color-scheme outside the layer so unlayered fieldset resets lose', () => {
    expect(css.startsWith('.p-fieldset{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the default and small legend token contract', () => {
    expect(css).toContain(shadowLegendFont(getShadowFieldsetCss('none', 'medium', true)));
    expect(css).toContain(shadowLegendFont(getShadowFieldsetCss('none', 'small', true)));
  });

  it('styles legend, required mark and message on the fieldset', () => {
    expect(css).toContain('.p-fieldset > legend');
    expect(css).toContain('[data-p-label-size="small"]');
    expect(css).toContain('[data-p-required="true"]');
    expect(css).toContain('content: " *"');
    expect(css).toContain('.p-fieldset > .p-message');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
