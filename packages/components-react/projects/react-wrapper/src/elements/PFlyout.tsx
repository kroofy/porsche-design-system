import { type DialogHTMLAttributes, forwardRef, type ReactNode, type Ref } from 'react';
import {
  FLYOUT_DISMISS_CLASS,
  FLYOUT_PANEL_CLASS,
  FLYOUT_SCROLLER_CLASS,
  type FlyoutAppearanceProps,
  flyoutAppearance,
} from '../../../../../components/src/elements/flyout/flyout.appearance';

export type PFlyoutProps = FlyoutAppearanceProps &
  Omit<DialogHTMLAttributes<HTMLDialogElement>, keyof FlyoutAppearanceProps> & {
    dismissButton?: boolean;
    children?: ReactNode;
  };

export const PFlyout = forwardRef<HTMLDialogElement, PFlyoutProps>(function PFlyout(
  { background, backdrop, position, fullscreen, footerBehavior, dismissButton = true, className, children, ...rest },
  ref
) {
  const appearance = flyoutAppearance({ background, backdrop, position, fullscreen, footerBehavior });
  const classNames = [appearance.className, className].filter(Boolean).join(' ');

  return (
    <dialog
      aria-modal="true"
      tabIndex={-1}
      {...rest}
      {...appearance.attrs}
      ref={ref as Ref<HTMLDialogElement>}
      className={classNames}
    >
      <div className={FLYOUT_SCROLLER_CLASS}>
        <div className={FLYOUT_PANEL_CLASS}>
          {dismissButton && (
            <button type="button" className={FLYOUT_DISMISS_CLASS} aria-label="Dismiss flyout">
              <span>Dismiss flyout</span>
            </button>
          )}
          {children}
        </div>
      </div>
    </dialog>
  );
});
