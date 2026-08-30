import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const SPINNER_ROOT_CLASS = 'p-spinner' as const;
export const SPINNER_VIEWBOX = '-16 -16 32 32' as const;

export const SPINNER_COLORS = ['primary', 'inherit'] as const;
export type SpinnerColor = (typeof SPINNER_COLORS)[number];

export const SPINNER_SIZES = [
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
  'small',
  'medium',
  'large',
] as const;
export type SpinnerSize = (typeof SPINNER_SIZES)[number];

export type SpinnerAppearanceProps = {
  color?: SpinnerColor;
  size?: Responsive<SpinnerSize>;
};

const DEFAULT_COLOR: SpinnerColor = 'primary';
const DEFAULT_SIZE: SpinnerSize = 'sm';

export const spinnerAppearance = (props: SpinnerAppearanceProps = {}): NativeAppearance => {
  const { color = DEFAULT_COLOR, size } = props;
  return {
    className: SPINNER_ROOT_CLASS,
    attrs: {
      ...(color !== DEFAULT_COLOR ? { 'data-p-color': color } : {}),
      ...serializeResponsive('size', size, DEFAULT_SIZE),
    },
  };
};
