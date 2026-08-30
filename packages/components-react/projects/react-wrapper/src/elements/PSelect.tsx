import { forwardRef, type SelectHTMLAttributes } from 'react';
import { type InputAppearanceProps, selectAppearance } from '../../../../../components/src/elements/input/input.appearance';

export type PSelectProps = InputAppearanceProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, keyof InputAppearanceProps>;

export const PSelect = forwardRef<HTMLSelectElement, PSelectProps>(function PSelect(
  { compact, state, loading = false, disabled = false, className, children, ...rest },
  ref
) {
  const appearance = selectAppearance({ compact, state, loading });

  return (
    <select
      {...rest}
      {...appearance.attrs}
      ref={ref}
      disabled={Boolean(disabled || loading)}
      aria-busy={loading || undefined}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {children}
    </select>
  );
});
