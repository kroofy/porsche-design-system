import { getComponentCss as getShadowTextListCss } from '../../components/text-list/text-list/text-list-styles';
import { getNativeTextListCss } from './text-list-css';

const shadowListFont = (css: string): string => {
  const match = css.match(/ol,ul \{[\s\S]*?font: ([^;]+);/);
  if (!match) {
    throw new Error('missing ol,ul font');
  }
  return match[1];
};

describe('getNativeTextListCss()', () => {
  const css = getNativeTextListCss();

  it('scopes the control to .p-text-list and .p-text-list-item inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-text-list {');
    expect(css).toContain('.p-text-list-item {');
    expect(css).toContain('.p-text-list[hidden]');
  });

  it('inherits color-scheme outside the layer so unlayered list resets lose', () => {
    expect(css.startsWith('.p-text-list,.p-text-list-item{color-scheme:inherit}')).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the default token contract', () => {
    expect(css).toContain(shadowListFont(getShadowTextListCss('unordered')));
  });

  it('encodes type, counters and nested list vars', () => {
    expect(css).toContain('[data-p-type="numbered"]');
    expect(css).toContain('[data-p-type="alphabetically"]');
    expect(css).toContain(`counters(p-text-list-counter,'.',decimal)`);
    expect(css).toContain(`counters(p-text-list-counter,'.',lower-latin)`);
    expect(css).toContain('--_p-text-list-g: "–"');
    expect(css).toContain('.p-text-list-item > .p-text-list:last-child');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
