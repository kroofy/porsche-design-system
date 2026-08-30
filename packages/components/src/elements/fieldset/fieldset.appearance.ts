import type { NativeAppearance } from '../appearance';
import type { FieldState } from '../input/input.appearance';

export const FIELDSET_ROOT_CLASS = 'p-fieldset' as const;

export const FIELDSET_LABEL_SIZES = ['small', 'medium'] as const;
export type FieldsetLabelSize = (typeof FIELDSET_LABEL_SIZES)[number];

export type FieldsetState = FieldState;

export type FieldsetAppearanceProps = {
  labelSize?: FieldsetLabelSize;
  required?: boolean;
  state?: FieldsetState;
};

const DEFAULT_LABEL_SIZE: FieldsetLabelSize = 'medium';
const DEFAULT_STATE: FieldsetState = 'none';

export const fieldsetAppearance = (props: FieldsetAppearanceProps = {}): NativeAppearance => {
  const { labelSize = DEFAULT_LABEL_SIZE, required = false, state = DEFAULT_STATE } = props;
  return {
    className: FIELDSET_ROOT_CLASS,
    attrs: {
      ...(labelSize !== DEFAULT_LABEL_SIZE ? { 'data-p-label-size': labelSize } : {}),
      ...(required ? { 'data-p-required': 'true' } : {}),
      ...(state !== DEFAULT_STATE ? { 'data-p-state': state } : {}),
    },
  };
};
