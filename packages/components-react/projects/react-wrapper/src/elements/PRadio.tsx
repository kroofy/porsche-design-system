import { forwardRef, type InputHTMLAttributes } from 'react';
import { type InputAppearanceProps, radioAppearance } from '../../../../../components/src/elements/input/input.appearance';

export type PRadioProps = InputAppearanceProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputAppearanceProps | 'type'>;

export const PRadio = forwardRef<HTMLInputElement, PRadioProps>(function PRadio(
  { compact, state, loading = false, disabled = false, className, ...rest },
  ref
) {
  const appearance = radioAppearance({ compact, state, loading });

  return (
    <input
      {...rest}
      {...appearance.attrs}
      ref={ref}
      type="radio"
      disabled={Boolean(disabled || loading)}
      aria-busy={loading || undefined}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    />
  );
});
