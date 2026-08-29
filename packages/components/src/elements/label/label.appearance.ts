import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const LABEL_ROOT_CLASS = 'p-label' as const;
export const LABEL_REQUIRED_CLASS = 'p-label__required' as const;
export const DESCRIPTION_ROOT_CLASS = 'p-description' as const;
export const MESSAGE_ROOT_CLASS = 'p-message' as const;

export type LabelAppearanceProps = {
  hideLabel?: Responsive<boolean>;
};

export const labelAppearance = (props: LabelAppearanceProps = {}): NativeAppearance => {
  const { hideLabel } = props;
  return {
    className: LABEL_ROOT_CLASS,
    attrs: {
      ...serializeResponsive('hide-label', hideLabel, false),
    },
  };
};
