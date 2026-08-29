import {
  LINK_PURE_ICON_CLASS,
  LINK_PURE_LABEL_CLASS,
  LINK_PURE_ROOT_CLASS,
  linkPureAppearance,
} from './link-pure.appearance';

describe('linkPureAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(linkPureAppearance()).toEqual({ className: LINK_PURE_ROOT_CLASS, attrs: {} });
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      linkPureAppearance({
        size: 'md',
        color: 'inherit',
        icon: 'none',
        hideLabel: { base: true, s: false },
        alignLabel: 'start',
        stretch: true,
        underline: true,
        active: true,
      })
    ).toEqual({
      className: 'p-link-pure',
      attrs: {
        'data-p-size': 'md',
        'data-p-color': 'inherit',
        'data-p-icon': 'none',
        'data-p-hide-label': 'true',
        'data-p-hide-label-s': 'false',
        'data-p-align-label': 'start',
        'data-p-stretch': 'true',
        'data-p-underline': 'true',
        'data-p-active': 'true',
      },
    });
  });

  it('keeps the label and icon class names stable for wrappers', () => {
    expect(LINK_PURE_LABEL_CLASS).toBe('p-link-pure__label');
    expect(LINK_PURE_ICON_CLASS).toBe('p-link-pure__icon');
  });
});
