import { SPINNER_ROOT_CLASS, spinnerAppearance } from './spinner.appearance';

describe('spinnerAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(spinnerAppearance()).toEqual({ className: SPINNER_ROOT_CLASS, attrs: {} });
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(spinnerAppearance({ color: 'inherit', size: 'lg' })).toEqual({
      className: 'p-spinner',
      attrs: {
        'data-p-color': 'inherit',
        'data-p-size': 'lg',
      },
    });
  });

  it('encodes responsive size without a default base attr', () => {
    expect(spinnerAppearance({ size: { base: 'sm', m: 'lg' } })).toEqual({
      className: 'p-spinner',
      attrs: {
        'data-p-size-m': 'lg',
      },
    });
  });
});
