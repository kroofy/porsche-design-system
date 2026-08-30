import { TAG_ROOT_CLASS, tagAppearance } from './tag.appearance';

describe('tagAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(tagAppearance()).toEqual({ className: TAG_ROOT_CLASS, attrs: {} });
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(tagAppearance({ variant: 'primary', compact: true })).toEqual({
      className: 'p-tag',
      attrs: {
        'data-p-variant': 'primary',
        'data-p-compact': 'true',
      },
    });
  });
});
