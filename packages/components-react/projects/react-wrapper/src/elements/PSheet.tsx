import { type DialogHTMLAttributes, forwardRef, type ReactNode, type Ref } from 'react';
import {
  SHEET_DISMISS_CLASS,
  SHEET_PANEL_CLASS,
  SHEET_SCROLLER_CLASS,
  type SheetAppearanceProps,
  sheetAppearance,
} from '../../../../../components/src/elements/sheet/sheet.appearance';

export type PSheetProps = SheetAppearanceProps &
  Omit<DialogHTMLAttributes<HTMLDialogElement>, keyof SheetAppearanceProps> & {
    dismissButton?: boolean;
    children?: ReactNode;
  };

export const PSheet = forwardRef<HTMLDialogElement, PSheetProps>(function PSheet(
  { background, dismissButton = true, className, children, ...rest },
  ref
) {
  const appearance = sheetAppearance({ background });
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
      <div className={SHEET_SCROLLER_CLASS}>
        <div className={SHEET_PANEL_CLASS}>
          {dismissButton && (
            <button type="button" className={SHEET_DISMISS_CLASS} aria-label="Dismiss sheet">
              <span>Dismiss sheet</span>
            </button>
          )}
          {children}
        </div>
      </div>
    </dialog>
  );
});
