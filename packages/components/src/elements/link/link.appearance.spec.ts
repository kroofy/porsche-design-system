import {
  LINK_ICON_CLASS,
  LINK_LABEL_CLASS,
  LINK_ROOT_CLASS,
  linkAppearance,
  serializeResponsive,
} from './link.appearance';

describe('linkAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(linkAppearance()).toEqual({ className: LINK_ROOT_CLASS, attrs: {} });
  });

  it('omits the default primary variant', () => {
    expect(linkAppearance({ variant: 'primary' }).attrs).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      linkAppearance({
        variant: 'secondary',
        icon: 'arrow-right',
        compact: true,
        hideLabel: { base: false, m: true },
      })
    ).toEqual({
      className: 'p-link',
      attrs: {
        'data-p-variant': 'secondary',
        'data-p-icon': 'arrow-right',
        'data-p-compact': 'true',
        'data-p-hide-label-m': 'true',
      },
    });
  });

  it('keeps the label and icon class names stable for wrappers', () => {
    expect(LINK_LABEL_CLASS).toBe('p-link__label');
    expect(LINK_ICON_CLASS).toBe('p-link__icon');
  });
});

describe('serializeResponsive()', () => {
  it('omits values that match the CSS default', () => {
    expect(serializeResponsive('compact', false, false)).toEqual({});
  });

  it('writes base plus breakpoint overrides', () => {
    expect(serializeResponsive('compact', { base: true, l: false }, false)).toEqual({
      'data-p-compact': 'true',
      'data-p-compact-l': 'false',
    });
  });
});
