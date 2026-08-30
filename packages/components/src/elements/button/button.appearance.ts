import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const BUTTON_ROOT_CLASS = 'p-button' as const;
export const BUTTON_LABEL_CLASS = 'p-button__label' as const;
export const BUTTON_ICON_CLASS = 'p-button__icon' as const;
export const BUTTON_SPINNER_CLASS = 'p-button__spinner' as const;

export const BUTTON_VARIANTS = ['primary', 'secondary', 'destructive'] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export type ButtonAppearanceProps = {
  variant?: ButtonVariant;
  icon?: string | 'none';
  hideLabel?: Responsive<boolean>;
  compact?: Responsive<boolean>;
  loading?: boolean;
};

const DEFAULT_VARIANT: ButtonVariant = 'primary';

export const buttonAppearance = (props: ButtonAppearanceProps = {}): NativeAppearance => {
  const { variant = DEFAULT_VARIANT, icon = 'none', hideLabel, compact, loading = false } = props;
  return {
    className: BUTTON_ROOT_CLASS,
    attrs: {
      ...(variant !== DEFAULT_VARIANT ? { 'data-p-variant': variant } : {}),
      ...(icon !== 'none' ? { 'data-p-icon': icon } : {}),
      ...(loading ? { 'data-p-loading': 'true' } : {}),
      ...serializeResponsive('hide-label', hideLabel, false),
      ...serializeResponsive('compact', compact, false),
    },
  };
};
