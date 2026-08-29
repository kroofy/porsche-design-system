import { forwardRef, type InputHTMLAttributes } from 'react';
import { type InputAppearanceProps, inputAppearance } from '../../../../../components/src/elements/input';

export type PInputTextProps = InputAppearanceProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputAppearanceProps | 'type'> & {
    type?: 'text';
  };

export const PInputText = forwardRef<HTMLInputElement, PInputTextProps>(function PInputText(
  { compact, state, loading = false, disabled = false, className, type = 'text', ...rest },
  ref
) {
  const appearance = inputAppearance({ compact, state, loading });

  return (
    <input
      {...rest}
      {...appearance.attrs}
      ref={ref}
      type={type}
      disabled={Boolean(disabled || loading)}
      aria-busy={loading || undefined}
      dir="auto"
      className={[appearance.className, className].filter(Boolean).join(' ')}
    />
  );
});
