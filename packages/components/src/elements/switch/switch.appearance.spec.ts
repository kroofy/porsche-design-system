import { SWITCH_ROOT_CLASS, switchAppearance } from './switch.appearance';

describe('switchAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(switchAppearance()).toEqual({ className: SWITCH_ROOT_CLASS, attrs: {} });
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      switchAppearance({
        alignLabel: 'start',
        hideLabel: true,
        stretch: true,
        compact: true,
        loading: true,
      })
    ).toEqual({
      className: 'p-switch',
      attrs: {
        'data-p-align-label': 'start',
        'data-p-hide-label': 'true',
        'data-p-stretch': 'true',
        'data-p-compact': 'true',
        'data-p-loading': 'true',
      },
    });
  });

  it('encodes responsive align without a default base attr', () => {
    expect(switchAppearance({ alignLabel: { base: 'end', m: 'start' } })).toEqual({
      className: 'p-switch',
      attrs: {
        'data-p-align-label-m': 'start',
      },
    });
  });
});
