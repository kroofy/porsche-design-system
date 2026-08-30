import { BANNER_ROOT_CLASS, bannerAppearance, bannerLive } from './banner.appearance';

describe('bannerAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(bannerAppearance()).toEqual({ className: BANNER_ROOT_CLASS, attrs: {} });
  });

  it('sets visual data attributes for non-defaults', () => {
    expect(bannerAppearance({ state: 'error', position: 'top' })).toEqual({
      className: 'p-banner',
      attrs: {
        'data-p-state': 'error',
        'data-p-position': 'top',
      },
    });
  });

  it('always writes a string position so bottom is not overridden at s+', () => {
    expect(bannerAppearance({ position: 'bottom' })).toEqual({
      className: 'p-banner',
      attrs: { 'data-p-position': 'bottom' },
    });
  });

  it('encodes responsive position without a default base attr', () => {
    expect(bannerAppearance({ position: { base: 'bottom', s: 'top', m: 'bottom' } })).toEqual({
      className: 'p-banner',
      attrs: {
        'data-p-position-s': 'top',
        'data-p-position-m': 'bottom',
      },
    });
  });
});

describe('bannerLive()', () => {
  it('uses status for info and success', () => {
    expect(bannerLive()).toEqual({ role: 'status', 'aria-live': 'polite' });
    expect(bannerLive('success')).toEqual({ role: 'status', 'aria-live': 'polite' });
  });

  it('uses alert for warning and error', () => {
    expect(bannerLive('warning')).toEqual({ role: 'alert', 'aria-live': 'assertive' });
    expect(bannerLive('error')).toEqual({ role: 'alert', 'aria-live': 'assertive' });
  });
});
