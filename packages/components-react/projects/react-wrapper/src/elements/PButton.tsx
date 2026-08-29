import { type ButtonHTMLAttributes, createElement, forwardRef, type ReactNode } from 'react';
import {
  BUTTON_ICON_CLASS,
  BUTTON_LABEL_CLASS,
  type ButtonAppearanceProps,
  buttonAppearance,
} from '../../../../../components/src/elements/button';

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
      {icon !== 'none' &&
        createElement('p-icon', {
          className: BUTTON_ICON_CLASS,
          name: icon,
          size: 'inherit',
          color: 'inherit',
          'aria-hidden': 'true',
        })}
      <span className={BUTTON_LABEL_CLASS}>{children}</span>
    </button>
  );
});
