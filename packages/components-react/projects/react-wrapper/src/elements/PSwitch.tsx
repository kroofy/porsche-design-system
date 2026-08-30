import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import {
  SWITCH_KNOB_CLASS,
  SWITCH_LABEL_CLASS,
  SWITCH_SPINNER_CLASS,
  SWITCH_TOGGLE_CLASS,
  type SwitchAppearanceProps,
  switchAppearance,
} from '../../../../../components/src/elements/switch/switch.appearance';
import { PSpinner } from './PSpinner';

export type PSwitchProps = SwitchAppearanceProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SwitchAppearanceProps | 'type'> & {
    checked?: boolean;
    children?: ReactNode;
  };

export const PSwitch = forwardRef<HTMLButtonElement, PSwitchProps>(function PSwitch(
  {
    alignLabel,
    hideLabel,
    stretch,
    compact,
    loading = false,
    checked = false,
    disabled = false,
    className,
    children,
    ...rest
  },
  ref
) {
  const appearance = switchAppearance({ alignLabel, hideLabel, stretch, compact, loading });

  return (
    <button
      {...rest}
      {...appearance.attrs}
      ref={ref}
      type="button"
      role="switch"
      disabled={Boolean(disabled || loading)}
      aria-checked={checked ? 'true' : 'false'}
      aria-busy={loading || undefined}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      <span className={SWITCH_TOGGLE_CLASS}>
        <span className={SWITCH_KNOB_CLASS}>
          {loading && <PSpinner className={SWITCH_SPINNER_CLASS} aria-hidden="true" role="presentation" />}
        </span>
      </span>
      <span className={SWITCH_LABEL_CLASS}>{children}</span>
    </button>
  );
});
