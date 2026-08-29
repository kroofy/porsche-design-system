import { INPUT_ROOT_CLASS, inputAppearance, TEXTAREA_ROOT_CLASS, textareaAppearance } from './input.appearance';

describe('inputAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(inputAppearance()).toEqual({ className: INPUT_ROOT_CLASS, attrs: {} });
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
