import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import {
  BUTTON_PURE_ICON_CLASS,
  BUTTON_PURE_LABEL_CLASS,
  BUTTON_PURE_SPINNER_CLASS,
  type ButtonPureAppearanceProps,
  buttonPureAppearance,
} from '../../../../../components/src/elements/button-pure/button-pure.appearance';
import { PIcon } from './PIcon';

export type PButtonPureProps = ButtonPureAppearanceProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonPureAppearanceProps> & {
    iconSource?: string;
    children?: ReactNode;
  };

export const PButtonPure = forwardRef<HTMLButtonElement, PButtonPureProps>(function PButtonPure(
  {
    size,
    color,
    icon = 'arrow-right',
    iconSource,
    hideLabel,
    alignLabel,
    stretch,
    underline = false,
    active = false,
    loading = false,
    disabled = false,
    type = 'submit',
    className,
    children,
    ...rest
  },
  ref
) {
  const appearance = buttonPureAppearance({
    size,
    color,
    icon,
    hideLabel,
    alignLabel,
    stretch,
    underline,
    active,
    loading,
  });
  const showIcon = icon !== 'none' || Boolean(iconSource);

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
      {loading ? (
        <span className={BUTTON_PURE_SPINNER_CLASS} aria-hidden="true">
          <svg viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false" aria-hidden="true">
            <circle r="11" />
            <circle r="11" />
          </svg>
        </span>
      ) : (
        showIcon && (
          <PIcon
            className={BUTTON_PURE_ICON_CLASS}
            name={icon === 'none' ? 'arrow-right' : icon}
            source={iconSource}
            size="inherit"
            color="inherit"
            aria-hidden="true"
          />
        )
      )}
      <span className={BUTTON_PURE_LABEL_CLASS}>{children}</span>
    </button>
  );
});
