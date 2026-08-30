import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { type InputAppearanceProps, textareaAppearance } from '../../../../../components/src/elements/input/input.appearance';

export type PTextareaProps = InputAppearanceProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof InputAppearanceProps>;

export const PTextarea = forwardRef<HTMLTextAreaElement, PTextareaProps>(function PTextarea(
  { compact, state, loading = false, disabled = false, className, rows = 7, ...rest },
  ref
) {
  const appearance = textareaAppearance({ compact, state, loading });

  return (
    <textarea
      {...rest}
      {...appearance.attrs}
      ref={ref}
      disabled={Boolean(disabled || loading)}
      aria-busy={loading || undefined}
      dir="auto"
      rows={rows}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    />
  );
});
