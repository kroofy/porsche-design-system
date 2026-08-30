import { FIELDSET_ROOT_CLASS, fieldsetAppearance } from './fieldset.appearance';

describe('fieldsetAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(fieldsetAppearance()).toEqual({ className: FIELDSET_ROOT_CLASS, attrs: {} });
  });

  it('omits default label size, required and state', () => {
    expect(fieldsetAppearance({ labelSize: 'medium', required: false, state: 'none' }).attrs).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(fieldsetAppearance({ labelSize: 'small', required: true, state: 'error' })).toEqual({
      className: 'p-fieldset',
      attrs: {
        'data-p-label-size': 'small',
        'data-p-required': 'true',
        'data-p-state': 'error',
      },
    });
  });
});
