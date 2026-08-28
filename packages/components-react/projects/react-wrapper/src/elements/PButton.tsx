import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import {
  BUTTON_LABEL_CLASS,
  buttonAppearance,
  type ButtonAppearanceProps,
} from '../../../../../components/src/elements/button';

export type PButtonProps = ButtonAppearanceProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonAppearanceProps> & {
    children?: ReactNode;
  };

export const PButton = forwardRef<HTMLButtonElement, PButtonProps>(function PButton(
  { variant, icon, hideLabel, compact, loading = false, disabled = false, type = 'submit', className, children, ...rest },
  ref
) {
  const appearance = buttonAppearance({ variant, icon, hideLabel, compact, loading });

  return (
    <button
      {...rest}
      {...appearance.attrs}
      ref={ref}
      type={type}
      disabled={Boolean(disabled || loading)}
      aria-busy={loading || undefined}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      <span className={BUTTON_LABEL_CLASS}>{children}</span>
    </button>
  );
});
