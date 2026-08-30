import type { NativeAppearance } from '../appearance';

export const INLINE_NOTIFICATION_ROOT_CLASS = 'p-inline-notification' as const;
export const INLINE_NOTIFICATION_DISMISS_CLASS = 'p-inline-notification__dismiss' as const;
export const INLINE_NOTIFICATION_ACTION_CLASS = 'p-inline-notification__action' as const;
export const INLINE_NOTIFICATION_DISMISS_LABEL = 'Close notification' as const;

export const INLINE_NOTIFICATION_STATES = ['info', 'success', 'warning', 'error'] as const;
export type InlineNotificationState = (typeof INLINE_NOTIFICATION_STATES)[number];

export const INLINE_NOTIFICATION_HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type InlineNotificationHeadingTag = (typeof INLINE_NOTIFICATION_HEADING_TAGS)[number];

export type InlineNotificationAppearanceProps = {
  state?: InlineNotificationState;
};

const DEFAULT_STATE: InlineNotificationState = 'info';

export const inlineNotificationAppearance = (props: InlineNotificationAppearanceProps = {}): NativeAppearance => {
  const { state = DEFAULT_STATE } = props;
  return {
    className: INLINE_NOTIFICATION_ROOT_CLASS,
    attrs: {
      ...(state !== DEFAULT_STATE ? { 'data-p-state': state } : {}),
    },
  };
};

export const inlineNotificationLive = (
  state: InlineNotificationState = DEFAULT_STATE
): { role: 'alert' | 'status'; 'aria-live': 'assertive' | 'polite' } => {
  const isAlert = state === 'warning' || state === 'error';
  return {
    role: isAlert ? 'alert' : 'status',
    'aria-live': isAlert ? 'assertive' : 'polite',
  };
};
