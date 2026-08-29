import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import {
  BUTTON_ICON_CLASS,
  BUTTON_LABEL_CLASS,
  BUTTON_SPINNER_CLASS,
  type ButtonAppearanceProps,
  buttonAppearance,
} from '../../../../../components/src/elements/button/button.appearance';
import { PIcon } from './PIcon';

export type PButtonProps = ButtonAppearanceProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonAppearanceProps> & {
    children?: ReactNode;
  };

export const PButton = forwardRef<HTMLButtonElement, PButtonProps>(function PButton(
  {
    variant,
    icon = 'none',
    hideLabel,
    compact,
    loading = false,
    disabled = false,
    type = 'submit',
    className,
    children,
    ...rest
  },
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
      {icon !== 'none' && (
        <PIcon className={BUTTON_ICON_CLASS} name={icon} size="inherit" color="inherit" aria-hidden="true" />
      )}
      {loading && (
        <span className={BUTTON_SPINNER_CLASS} aria-hidden="true">
          <svg viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false" aria-hidden="true">
            <circle r="11" />
            <circle r="11" />
          </svg>
        </span>
      )}
      <span className={BUTTON_LABEL_CLASS}>{children}</span>
    </button>
  );
});
