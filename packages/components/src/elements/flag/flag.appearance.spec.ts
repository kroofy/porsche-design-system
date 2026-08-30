import { FLAG_ROOT_CLASS, flagAppearance } from './flag.appearance';

describe('flagAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(flagAppearance()).toEqual({ className: FLAG_ROOT_CLASS, attrs: {} });
  });

  it('omits the default size', () => {
    expect(flagAppearance({ size: 'sm' }).attrs).toEqual({});
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(flagAppearance({ size: { base: 'sm', m: 'lg' } })).toEqual({
      className: 'p-flag',
      attrs: {
        'data-p-size-m': 'lg',
      },
    });
  });
});
