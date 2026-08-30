import { type DialogHTMLAttributes, forwardRef, type ReactNode, type Ref } from 'react';
import {
  MODAL_DISMISS_CLASS,
  MODAL_PANEL_CLASS,
  MODAL_SCROLLER_CLASS,
  type ModalAppearanceProps,
  modalAppearance,
} from '../../../../../components/src/elements/modal/modal.appearance';

export type PModalProps = ModalAppearanceProps &
  Omit<DialogHTMLAttributes<HTMLDialogElement>, keyof ModalAppearanceProps> & {
    dismissButton?: boolean;
    children?: ReactNode;
  };

export const PModal = forwardRef<HTMLDialogElement, PModalProps>(function PModal(
  { background, backdrop, fullscreen, dismissButton = true, className, children, ...rest },
  ref
) {
  const appearance = modalAppearance({ background, backdrop, fullscreen });
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
      <div className={MODAL_SCROLLER_CLASS}>
        <div className={MODAL_PANEL_CLASS}>
          {dismissButton && (
            <button type="button" className={MODAL_DISMISS_CLASS} aria-label="Dismiss modal">
              <span>Dismiss modal</span>
            </button>
          )}
          {children}
        </div>
      </div>
    </dialog>
  );
});
