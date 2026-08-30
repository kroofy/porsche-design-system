import { DIVIDER_ROOT_CLASS, dividerAppearance } from './divider.appearance';

describe('dividerAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(dividerAppearance()).toEqual({ className: DIVIDER_ROOT_CLASS, attrs: {} });
  });

  it('omits the default color and direction', () => {
    expect(dividerAppearance({ color: 'contrast-lower', direction: 'horizontal' }).attrs).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      dividerAppearance({
        color: 'contrast-high',
        direction: { base: 'horizontal', m: 'vertical' },
      })
    ).toEqual({
      className: 'p-divider',
      attrs: {
        'data-p-color': 'contrast-high',
        'data-p-direction-m': 'vertical',
      },
    });
  });

  it('keeps the root class name stable for wrappers', () => {
    expect(DIVIDER_ROOT_CLASS).toBe('p-divider');
  });
});
