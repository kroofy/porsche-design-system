import {
  BUTTON_PURE_ICON_CLASS,
  BUTTON_PURE_LABEL_CLASS,
  BUTTON_PURE_ROOT_CLASS,
  buttonPureAppearance,
} from './button-pure.appearance';

describe('buttonPureAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(buttonPureAppearance()).toEqual({ className: BUTTON_PURE_ROOT_CLASS, attrs: {} });
  });

  it('omits the default size, color, icon and align-label', () => {
    expect(
      buttonPureAppearance({
        size: 'sm',
        color: 'primary',
        icon: 'arrow-right',
        alignLabel: 'end',
      }).attrs
    ).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      buttonPureAppearance({
        size: { base: 'sm', m: 'lg' },
        color: 'contrast-high',
        icon: 'delete',
        hideLabel: true,
        alignLabel: 'start',
        stretch: true,
        underline: true,
        active: true,
        loading: true,
      })
    ).toEqual({
      className: 'p-button-pure',
      attrs: {
        'data-p-size-m': 'lg',
        'data-p-color': 'contrast-high',
        'data-p-icon': 'delete',
        'data-p-hide-label': 'true',
        'data-p-align-label': 'start',
        'data-p-stretch': 'true',
        'data-p-underline': 'true',
        'data-p-active': 'true',
        'data-p-loading': 'true',
      },
    });
  });

  it('encodes icon none so CSS can drop the icon slot', () => {
    expect(buttonPureAppearance({ icon: 'none' }).attrs).toEqual({ 'data-p-icon': 'none' });
  });

  it('keeps the label and icon class names stable for wrappers', () => {
    expect(BUTTON_PURE_LABEL_CLASS).toBe('p-button-pure__label');
    expect(BUTTON_PURE_ICON_CLASS).toBe('p-button-pure__icon');
  });
});
