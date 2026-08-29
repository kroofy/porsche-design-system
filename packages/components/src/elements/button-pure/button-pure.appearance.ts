import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const BUTTON_PURE_ROOT_CLASS = 'p-button-pure' as const;
export const BUTTON_PURE_LABEL_CLASS = 'p-button-pure__label' as const;
export const BUTTON_PURE_ICON_CLASS = 'p-button-pure__icon' as const;
export const BUTTON_PURE_SPINNER_CLASS = 'p-button-pure__spinner' as const;

export const BUTTON_PURE_SIZES = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  'inherit',
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
] as const;
export type ButtonPureSize = (typeof BUTTON_PURE_SIZES)[number];

export const BUTTON_PURE_COLORS = [
  'primary',
  'contrast-higher',
  'contrast-high',
  'contrast-medium',
  'inherit',
] as const;
export type ButtonPureColor = (typeof BUTTON_PURE_COLORS)[number];

export const BUTTON_PURE_ALIGN_LABELS = ['start', 'end'] as const;
export type ButtonPureAlignLabel = (typeof BUTTON_PURE_ALIGN_LABELS)[number];

export type ButtonPureAppearanceProps = {
  size?: Responsive<ButtonPureSize>;
  color?: ButtonPureColor;
  icon?: string | 'none';
  hideLabel?: Responsive<boolean>;
  alignLabel?: Responsive<ButtonPureAlignLabel>;
  stretch?: Responsive<boolean>;
  underline?: boolean;
  active?: boolean;
  loading?: boolean;
};

const DEFAULT_SIZE: ButtonPureSize = 'sm';
const DEFAULT_COLOR: ButtonPureColor = 'primary';
const DEFAULT_ICON = 'arrow-right';
const DEFAULT_ALIGN: ButtonPureAlignLabel = 'end';

export const buttonPureAppearance = (props: ButtonPureAppearanceProps = {}): NativeAppearance => {
  const {
    size,
    color = DEFAULT_COLOR,
    icon = DEFAULT_ICON,
    hideLabel,
    alignLabel,
    stretch,
    underline = false,
    active = false,
    loading = false,
  } = props;
  return {
    className: BUTTON_PURE_ROOT_CLASS,
    attrs: {
      ...serializeResponsive('size', size, DEFAULT_SIZE),
      ...(color !== DEFAULT_COLOR ? { 'data-p-color': color } : {}),
      ...(icon !== DEFAULT_ICON ? { 'data-p-icon': icon } : {}),
      ...serializeResponsive('hide-label', hideLabel, false),
      ...serializeResponsive('align-label', alignLabel, DEFAULT_ALIGN),
      ...serializeResponsive('stretch', stretch, false),
      ...(underline ? { 'data-p-underline': 'true' } : {}),
      ...(active ? { 'data-p-active': 'true' } : {}),
      ...(loading ? { 'data-p-loading': 'true' } : {}),
    },
  };
};
