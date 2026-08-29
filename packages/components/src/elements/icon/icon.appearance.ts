import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';
import { DEFAULT_ICON_NAME } from './icon-url';

export const ICON_ROOT_CLASS = 'p-icon' as const;

export const ICON_SIZES = [
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
  'xx-large',
] as const;
export type IconSize = (typeof ICON_SIZES)[number];

export const ICON_COLORS = [
  'primary',
  'contrast-higher',
  'contrast-high',
  'contrast-medium',
  'contrast-low',
  'contrast-lower',
  'success',
  'warning',
  'error',
  'info',
  'inherit',
] as const;
export type IconColor = (typeof ICON_COLORS)[number];

export type IconAppearanceProps = {
  name?: string;
  color?: IconColor;
  size?: Responsive<IconSize>;
};

const DEFAULT_COLOR: IconColor = 'primary';
const DEFAULT_SIZE: IconSize = 'sm';

export const iconAppearance = (props: IconAppearanceProps = {}): NativeAppearance => {
  const { name = DEFAULT_ICON_NAME, color = DEFAULT_COLOR, size = DEFAULT_SIZE } = props;
  return {
    className: ICON_ROOT_CLASS,
    attrs: {
      ...(name !== DEFAULT_ICON_NAME ? { 'data-p-name': name } : {}),
      ...(color !== DEFAULT_COLOR ? { 'data-p-color': color } : {}),
      ...serializeResponsive('size', size, DEFAULT_SIZE),
    },
  };
};
