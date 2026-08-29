import {
  checkboxAppearance,
  INPUT_ROOT_CLASS,
  inputAppearance,
  NATIVE_INPUT_TYPES,
  radioAppearance,
  selectAppearance,
  TEXTAREA_ROOT_CLASS,
  textareaAppearance,
} from './input.appearance';

describe('inputAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(inputAppearance()).toEqual({ className: INPUT_ROOT_CLASS, attrs: {} });
  });

  it('lists the typed native input types', () => {
    expect(NATIVE_INPUT_TYPES).toEqual([
      'text',
      'email',
      'tel',
      'url',
      'search',
      'password',
      'number',
      'date',
      'time',
      'month',
      'week',
    ]);
  });

  it('omits the default none state', () => {
    expect(inputAppearance({ state: 'none' }).attrs).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      inputAppearance({
        state: 'error',
        loading: true,
        compact: true,
      })
    ).toEqual({
      className: 'p-input',
      attrs: {
        'data-p-state': 'error',
        'data-p-loading': 'true',
        'data-p-compact': 'true',
      },
    });
  });
});

describe('textareaAppearance()', () => {
  it('uses the textarea class with the same attrs', () => {
    expect(textareaAppearance({ compact: true, state: 'success' })).toEqual({
      className: TEXTAREA_ROOT_CLASS,
      attrs: {
        'data-p-compact': 'true',
        'data-p-state': 'success',
      },
    });
  });
});

describe('checkboxAppearance()', () => {
  it('uses the checkbox class and indeterminate attr', () => {
    expect(checkboxAppearance({ indeterminate: true, compact: true })).toEqual({
      className: 'p-checkbox',
      attrs: {
        'data-p-compact': 'true',
        'data-p-indeterminate': 'true',
      },
    });
  });
});

describe('radioAppearance() / selectAppearance()', () => {
  it('uses the radio and select classes', () => {
    expect(radioAppearance({ state: 'error' }).className).toBe('p-radio');
    expect(selectAppearance({ compact: true }).className).toBe('p-select');
  });
});
