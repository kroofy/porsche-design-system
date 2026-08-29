import { ICON_ROOT_CLASS, iconAppearance } from './icon.appearance';

describe('iconAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(iconAppearance()).toEqual({ className: ICON_ROOT_CLASS, attrs: {} });
  });

  it('omits the default name, color and size', () => {
    expect(iconAppearance({ name: 'arrow-right', color: 'primary', size: 'sm' }).attrs).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      iconAppearance({
        name: 'delete',
        color: 'inherit',
        size: { base: 'sm', m: 'lg' },
      })
    ).toEqual({
      className: 'p-icon',
      attrs: {
        'data-p-name': 'delete',
        'data-p-color': 'inherit',
        'data-p-size-m': 'lg',
      },
    });
  });

  it('keeps the root class name stable for wrappers', () => {
    expect(ICON_ROOT_CLASS).toBe('p-icon');
  });
});
