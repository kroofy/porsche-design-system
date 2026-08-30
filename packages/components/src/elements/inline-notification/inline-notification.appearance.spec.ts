import {
  INLINE_NOTIFICATION_ROOT_CLASS,
  inlineNotificationAppearance,
  inlineNotificationLive,
} from './inline-notification.appearance';

describe('inlineNotificationAppearance()', () => {
  it('emits only the root class for defaults', () => {
    expect(inlineNotificationAppearance()).toEqual({ className: INLINE_NOTIFICATION_ROOT_CLASS, attrs: {} });
  });

  it('sets state on a data attribute', () => {
    expect(inlineNotificationAppearance({ state: 'success' })).toEqual({
      className: 'p-inline-notification',
      attrs: {
        'data-p-state': 'success',
      },
    });
  });
});

describe('inlineNotificationLive()', () => {
  it('uses status for info and success', () => {
    expect(inlineNotificationLive()).toEqual({ role: 'status', 'aria-live': 'polite' });
    expect(inlineNotificationLive('success')).toEqual({ role: 'status', 'aria-live': 'polite' });
  });

  it('uses alert for warning and error', () => {
    expect(inlineNotificationLive('warning')).toEqual({ role: 'alert', 'aria-live': 'assertive' });
    expect(inlineNotificationLive('error')).toEqual({ role: 'alert', 'aria-live': 'assertive' });
  });
});
