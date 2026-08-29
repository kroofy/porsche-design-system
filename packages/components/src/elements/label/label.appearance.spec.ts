import { LABEL_REQUIRED_CLASS, LABEL_ROOT_CLASS, labelAppearance } from './label.appearance';

describe('labelAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(labelAppearance()).toEqual({ className: LABEL_ROOT_CLASS, attrs: {} });
  });

  it('sets hide-label for non-defaults', () => {
    expect(labelAppearance({ hideLabel: true })).toEqual({
      className: 'p-label',
      attrs: { 'data-p-hide-label': 'true' },
    });
    expect(labelAppearance({ hideLabel: { base: false, m: true } })).toEqual({
      className: 'p-label',
      attrs: { 'data-p-hide-label-m': 'true' },
    });
  });

  it('keeps the required class name stable for wrappers', () => {
    expect(LABEL_REQUIRED_CLASS).toBe('p-label__required');
  });
});
