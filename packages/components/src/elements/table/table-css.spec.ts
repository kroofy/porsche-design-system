import { getComponentCss as getShadowTableCss } from '../../components/table/table/table-styles';
import { getNativeTableCss } from './table-css';

const shadowTableFont = (css: string): string => {
  const match = css.match(/:host \{[\s\S]*?font: ([^;]+);/);
  if (!match) {
    throw new Error('missing host font');
  }
  return match[1].replace(' !important', '');
};

describe('getNativeTableCss()', () => {
  const css = getNativeTableCss();

  it('scopes table parts inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-table {');
    expect(css).toContain('.p-table-head {');
    expect(css).toContain('.p-table-body {');
    expect(css).toContain('.p-table-row {');
    expect(css).toContain('.p-table-head-cell {');
    expect(css).toContain('.p-table-cell {');
    expect(css).toContain('.p-table[hidden]');
  });

  it('inherits color-scheme outside the layer', () => {
    expect(
      css.startsWith(
        '.p-table,.p-table-head,.p-table-body,.p-table-row,.p-table-head-cell,.p-table-cell{color-scheme:inherit}'
      )
    ).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
    expect(css).not.toContain('p-scroller');
  });

  it('keeps the default token contract', () => {
    expect(css).toContain(shadowTableFont(getShadowTableCss(false, 'auto')));
    expect(css).toContain('border-collapse: collapse');
    expect(css).toContain('width: 100%');
  });

  it('encodes compact, layout, multiline and hide-label', () => {
    expect(css).toContain('[data-p-compact="true"]');
    expect(css).toContain('[data-p-layout="fixed"]');
    expect(css).toContain('table-layout: fixed');
    expect(css).toContain('[data-p-multiline="true"]');
    expect(css).toContain('[data-p-hide-label="true"]');
    expect(css).toContain('.p-table > caption');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
