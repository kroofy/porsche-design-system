import { TAG_DISMISSIBLE_ROOT_CLASS, tagDismissibleAppearance } from './tag-dismissible.appearance';

describe('tagDismissibleAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(tagDismissibleAppearance()).toEqual({ className: TAG_DISMISSIBLE_ROOT_CLASS, attrs: {} });
  });

  it('sets compact on a data attribute', () => {
    expect(tagDismissibleAppearance({ compact: true })).toEqual({
      className: 'p-tag-dismissible',
      attrs: {
        'data-p-compact': 'true',
      },
    });
  });
});
