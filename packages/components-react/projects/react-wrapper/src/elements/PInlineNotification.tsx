import { createElement, forwardRef, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import {
  INLINE_NOTIFICATION_ACTION_CLASS,
  INLINE_NOTIFICATION_DISMISS_CLASS,
  INLINE_NOTIFICATION_DISMISS_LABEL,
  type InlineNotificationAppearanceProps,
  type InlineNotificationHeadingTag,
  inlineNotificationAppearance,
  inlineNotificationLive,
} from '../../../../../components/src/elements/inline-notification/inline-notification.appearance';
import { PButtonPure } from './PButtonPure';

export type PInlineNotificationProps = InlineNotificationAppearanceProps &
  Omit<HTMLAttributes<HTMLElement>, keyof InlineNotificationAppearanceProps> & {
    heading?: string;
    headingTag?: InlineNotificationHeadingTag;
    description?: string;
    dismissButton?: boolean;
    actionLabel?: string;
    actionLoading?: boolean;
    actionIcon?: string;
    children?: ReactNode;
  };

export const PInlineNotification = forwardRef<HTMLElement, PInlineNotificationProps>(function PInlineNotification(
  {
    state,
    heading,
    headingTag = 'h5',
    description,
    dismissButton = true,
    actionLabel,
    actionLoading = false,
    actionIcon = 'arrow-right',
    className,
    children,
    ...rest
  },
  ref
) {
  const appearance = inlineNotificationAppearance({ state });
  const live = inlineNotificationLive(state);
  const { ['aria-label']: ariaLabel, ...attrs } = rest;

  return (
    <aside
      {...live}
      {...attrs}
      {...appearance.attrs}
      aria-label={ariaLabel ?? heading ?? undefined}
      ref={ref as Ref<HTMLElement>}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {heading ? createElement(headingTag, null, heading) : null}
      {description ? <p>{description}</p> : null}
      {children}
      {actionLabel ? (
        <PButtonPure
          className={INLINE_NOTIFICATION_ACTION_CLASS}
          type="button"
          icon={actionIcon}
          loading={actionLoading}
        >
          {actionLabel}
        </PButtonPure>
      ) : null}
      {dismissButton ? (
        <button
          type="button"
          className={INLINE_NOTIFICATION_DISMISS_CLASS}
          aria-label={INLINE_NOTIFICATION_DISMISS_LABEL}
          {...(heading ? { 'aria-description': heading } : {})}
        >
          <span>{INLINE_NOTIFICATION_DISMISS_LABEL}</span>
        </button>
      ) : null}
    </aside>
  );
});
