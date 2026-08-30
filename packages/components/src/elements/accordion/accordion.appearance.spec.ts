import { ACCORDION_ROOT_CLASS, accordionAppearance } from './accordion.appearance';

describe('accordionAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(accordionAppearance()).toEqual({ className: ACCORDION_ROOT_CLASS, attrs: {} });
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      accordionAppearance({
        alignMarker: 'start',
        background: 'surface',
        compact: true,
        indent: true,
        sticky: true,
        size: 'medium',
      })
    ).toEqual({
      className: 'p-accordion',
      attrs: {
        'data-p-align-marker': 'start',
        'data-p-background': 'surface',
        'data-p-compact': 'true',
        'data-p-indent': 'true',
        'data-p-sticky': 'true',
        'data-p-size': 'medium',
      },
    });
  });

  it('encodes responsive indent without a default base attr', () => {
    expect(accordionAppearance({ indent: { base: false, m: true } })).toEqual({
      className: 'p-accordion',
      attrs: {
        'data-p-indent-m': 'true',
      },
    });
  });
});
