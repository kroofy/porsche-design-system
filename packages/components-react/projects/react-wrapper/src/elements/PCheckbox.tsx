import { forwardRef, type InputHTMLAttributes, type Ref, useCallback } from 'react';
import { type CheckboxAppearanceProps, checkboxAppearance } from '../../../../../components/src/elements/input/input.appearance';

export type PCheckboxProps = CheckboxAppearanceProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof CheckboxAppearanceProps | 'type'>;

const assignRef = (ref: Ref<HTMLInputElement> | undefined, node: HTMLInputElement | null): void => {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref) {
    ref.current = node;
  }
};

export const PCheckbox = forwardRef<HTMLInputElement, PCheckboxProps>(function PCheckbox(
  { compact, state, loading = false, disabled = false, indeterminate = false, className, ...rest },
  ref
) {
  const appearance = checkboxAppearance({ compact, state, loading, indeterminate });
  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      assignRef(ref, node);
      if (node) {
        node.indeterminate = indeterminate;
      }
    },
    [ref, indeterminate]
  );

  return (
    <input
      {...rest}
      {...appearance.attrs}
      ref={setRef}
      type="checkbox"
      disabled={Boolean(disabled || loading)}
      aria-busy={loading || undefined}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    />
  );
});
