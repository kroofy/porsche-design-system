import { BUTTON_ICON_CLASS, BUTTON_LABEL_CLASS, BUTTON_ROOT_CLASS, buttonAppearance } from './button.appearance';

describe('buttonAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(buttonAppearance()).toEqual({ className: BUTTON_ROOT_CLASS, attrs: {} });
  });

  it('omits the default primary variant', () => {
    expect(buttonAppearance({ variant: 'primary' }).attrs).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      buttonAppearance({
        variant: 'destructive',
        icon: 'delete',
        loading: true,
        compact: true,
        hideLabel: { base: false, m: true },
      })
    ).toEqual({
      className: 'p-button',
      attrs: {
        'data-p-variant': 'destructive',
        'data-p-icon': 'delete',
        'data-p-loading': 'true',
        'data-p-compact': 'true',
        'data-p-hide-label-m': 'true',
      },
    });
  });

  it('keeps the label and icon class names stable for wrappers', () => {
    expect(BUTTON_LABEL_CLASS).toBe('p-button__label');
    expect(BUTTON_ICON_CLASS).toBe('p-button__icon');
  });
});
