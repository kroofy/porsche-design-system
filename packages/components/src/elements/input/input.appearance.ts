import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const INPUT_ROOT_CLASS = 'p-input' as const;
export const TEXTAREA_ROOT_CLASS = 'p-textarea' as const;
export const SELECT_ROOT_CLASS = 'p-select' as const;
export const OPTGROUP_ROOT_CLASS = 'p-optgroup' as const;
export const CHECKBOX_ROOT_CLASS = 'p-checkbox' as const;
export const CHECKBOX_SPINNER_CLASS = 'p-checkbox__spinner' as const;
export const RADIO_ROOT_CLASS = 'p-radio' as const;
export const RADIO_SPINNER_CLASS = 'p-radio__spinner' as const;
export const RADIOS_ROOT_CLASS = 'p-radios' as const;
export const FIELD_ROOT_CLASS = 'p-field' as const;

export const FIELD_STATES = ['none', 'error', 'success'] as const;
export type FieldState = (typeof FIELD_STATES)[number];

export const NATIVE_INPUT_TYPES = [
  'text',
  'email',
  'tel',
  'url',
  'search',
  'password',
  'number',
  'date',
  'time',
  'month',
  'week',
] as const;
export type NativeInputType = (typeof NATIVE_INPUT_TYPES)[number];

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

export const selectAppearance = (props: InputAppearanceProps = {}): NativeAppearance => ({
  ...inputAppearance(props),
  className: SELECT_ROOT_CLASS,
});

export const optgroupAppearance = (): NativeAppearance => ({
  className: OPTGROUP_ROOT_CLASS,
  attrs: {},
});

export type CheckboxAppearanceProps = InputAppearanceProps & {
  indeterminate?: boolean;
};

export const checkboxAppearance = (props: CheckboxAppearanceProps = {}): NativeAppearance => {
  const { indeterminate = false, ...rest } = props;
  return {
    ...inputAppearance(rest),
    className: CHECKBOX_ROOT_CLASS,
    attrs: {
      ...inputAppearance(rest).attrs,
      ...(indeterminate ? { 'data-p-indeterminate': 'true' } : {}),
    },
  };
};

export const radioAppearance = (props: InputAppearanceProps = {}): NativeAppearance => ({
  ...inputAppearance(props),
  className: RADIO_ROOT_CLASS,
});
