import { BUTTON_TILE_ROOT_CLASS, LINK_TILE_ROOT_CLASS, tileAppearance } from './tile.appearance';

describe('buttonTileAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(tileAppearance(BUTTON_TILE_ROOT_CLASS)).toEqual({ className: BUTTON_TILE_ROOT_CLASS, attrs: {} });
  });
});

describe('linkTileAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(tileAppearance(LINK_TILE_ROOT_CLASS)).toEqual({ className: LINK_TILE_ROOT_CLASS, attrs: {} });
  });
});

describe('tileAppearance()', () => {
  it('sets visual data attributes for non-defaults', () => {
    expect(
      tileAppearance(BUTTON_TILE_ROOT_CLASS, {
        size: 'large',
        weight: 'regular',
        aspectRatio: '16/9',
        align: 'top',
        gradient: true,
        compact: true,
      })
    ).toEqual({
      className: 'p-button-tile',
      attrs: {
        'data-p-size': 'large',
        'data-p-weight': 'regular',
        'data-p-aspect-ratio': '16/9',
        'data-p-align': 'top',
        'data-p-gradient': 'true',
        'data-p-compact': 'true',
      },
    });
  });

  it('encodes responsive compact without a default base attr', () => {
    expect(tileAppearance(LINK_TILE_ROOT_CLASS, { compact: { base: false, m: true } })).toEqual({
      className: 'p-link-tile',
      attrs: {
        'data-p-compact-m': 'true',
      },
    });
  });
});
