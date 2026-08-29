import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const INPUT_ROOT_CLASS = 'p-input' as const;
export const TEXTAREA_ROOT_CLASS = 'p-textarea' as const;
export const FIELD_ROOT_CLASS = 'p-field' as const;

export const FIELD_STATES = ['none', 'error', 'success'] as const;
export type FieldState = (typeof FIELD_STATES)[number];

export type InputAppearanceProps = {
  compact?: Responsive<boolean>;
  state?: FieldState;
  loading?: boolean;
};

const DEFAULT_STATE: FieldState = 'none';

export const inputAppearance = (props: InputAppearanceProps = {}): NativeAppearance => {
  const { compact, state = DEFAULT_STATE, loading = false } = props;
  return {
    className: INPUT_ROOT_CLASS,
    attrs: {
      ...(state !== DEFAULT_STATE ? { 'data-p-state': state } : {}),
      ...(loading ? { 'data-p-loading': 'true' } : {}),
      ...serializeResponsive('compact', compact, false),
    },
  };
};

export const textareaAppearance = (props: InputAppearanceProps = {}): NativeAppearance => ({
  ...inputAppearance(props),
  className: TEXTAREA_ROOT_CLASS,
});
