import { FLYOUT_ROOT_CLASS, flyoutAppearance } from './flyout.appearance';

describe('flyoutAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(flyoutAppearance()).toEqual({ className: FLYOUT_ROOT_CLASS, attrs: {} });
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(
      flyoutAppearance({
        background: 'surface',
        backdrop: 'shading',
        position: 'start',
        fullscreen: true,
        footerBehavior: 'fixed',
      })
    ).toEqual({
      className: 'p-flyout',
      attrs: {
        'data-p-background': 'surface',
        'data-p-backdrop': 'shading',
        'data-p-position': 'start',
        'data-p-fullscreen': 'true',
        'data-p-footer-behavior': 'fixed',
      },
    });
  });

  it('encodes responsive fullscreen without a default base attr', () => {
    expect(flyoutAppearance({ fullscreen: { base: false, m: true } })).toEqual({
      className: 'p-flyout',
      attrs: {
        'data-p-fullscreen-m': 'true',
      },
    });
  });
});
