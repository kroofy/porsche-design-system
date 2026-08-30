import { getComponentCss as getShadowInputTextCss } from '../components/input-text/input-text-styles';
import { getNativeFieldCss } from './field-css';

describe('getNativeFieldCss()', () => {
  const css = getNativeFieldCss();

  it('scopes input, textarea, select, checkbox, radio and label inside a cascade layer', () => {
    expect(css).toContain('@layer pds.elements');
    expect(css).toContain('.p-input {');
    expect(css).toContain('.p-textarea {');
    expect(css).toContain('.p-select {');
    expect(css).toContain('.p-optgroup {');
    expect(css).toContain('.p-checkbox {');
    expect(css).toContain('.p-radio {');
    expect(css).toContain('.p-label {');
    expect(css).toContain('.p-field {');
    expect(css).toContain('.p-description {');
    expect(css).toContain('.p-message {');
    expect(css).toContain('.p-radios {');
  });

  it('inherits color-scheme outside the layer so unlayered input resets lose', () => {
    expect(
      css.startsWith('.p-input,.p-textarea,.p-select,.p-checkbox,.p-radio,.p-label{color-scheme:inherit}')
    ).toBe(true);
  });

  it('drops shadow-only selectors', () => {
    expect(css).not.toContain(':host');
    expect(css).not.toMatch(/(^|[^\w-])\.root\b/);
    expect(css).not.toContain('::slotted');
    expect(css).not.toContain(':defined');
  });

  it('keeps the default input token contract', () => {
    const shadow = getShadowInputTextCss(false, false, false, 'none', false, false, false);
    const match = shadow.match(/\.wrapper \{[\s\S]*?background: ([^;]+);/);
    if (!match) {
      throw new Error('missing .wrapper background');
    }
    expect(css).toContain(match[1]);
  });

  it('encodes compact, hide-label, loading, disabled, readonly and state on the native nodes', () => {
    expect(css).toContain('[data-p-compact="true"]');
    expect(css).toContain('[data-p-hide-label="true"]');
    expect(css).toContain('[data-p-loading="true"]');
    expect(css).toContain('[data-p-state="error"]');
    expect(css).toContain('[data-p-state="success"]');
    expect(css).toContain('.p-input:disabled');
    expect(css).toContain('.p-input[readonly]');
    expect(css).toContain('.p-label__required');
    expect(css).toContain('.p-checkbox:checked');
    expect(css).toContain('.p-checkbox:indeterminate');
    expect(css).toContain('.p-radio:checked');
    expect(css).toContain('.p-select {');
    expect(css).toContain('.p-select optgroup');
    expect(css).toContain('.p-select[multiple]');
    expect(css).toContain('.p-optgroup:disabled');
  });

  it('strips UA chrome on search, number and datetime types', () => {
    expect(css).toContain('[type="search"]::-webkit-search-cancel-button');
    expect(css).toContain('[type="number"]::-webkit-inner-spin-button');
    expect(css).toContain('[type="date"]::-webkit-calendar-picker-indicator');
    expect(css).toContain('::-webkit-datetime-edit');
  });

  it('matches the rewritten snapshot', () => {
    expect(css).toMatchSnapshot();
  });
});
