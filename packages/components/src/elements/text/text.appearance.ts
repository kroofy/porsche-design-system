import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const TEXT_ROOT_CLASS = 'p-text' as const;

export const TEXT_TAGS = ['p', 'span', 'div', 'address', 'blockquote', 'figcaption', 'cite', 'time', 'legend'] as const;
export type TextTag = (typeof TEXT_TAGS)[number];

export const TEXT_COLORS = [
  'primary',
  'contrast-higher',
  'contrast-high',
  'contrast-medium',
  'success',
  'warning',
  'error',
  'info',
  'inherit',
] as const;
export type TextColor = (typeof TEXT_COLORS)[number];

export const TEXT_WEIGHTS = ['normal', 'semibold', 'bold', 'regular', 'semi-bold'] as const;
export type TextWeight = (typeof TEXT_WEIGHTS)[number];

export const TEXT_ALIGNS = ['start', 'center', 'end', 'inherit'] as const;
export type TextAlign = (typeof TEXT_ALIGNS)[number];

export const TEXT_SIZES = [
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
export type TextSize = (typeof TEXT_SIZES)[number];

export const TEXT_HYPHENS = ['none', 'manual', 'auto', 'inherit'] as const;
export type TextHyphens = (typeof TEXT_HYPHENS)[number];

export type TextAppearanceProps = {
  size?: Responsive<TextSize>;
  weight?: TextWeight;
  align?: TextAlign;
  color?: TextColor;
  hyphens?: TextHyphens;
  ellipsis?: boolean;
};

const DEFAULT_SIZE: TextSize = 'sm';
const DEFAULT_WEIGHT: TextWeight = 'normal';
const DEFAULT_ALIGN: TextAlign = 'start';
const DEFAULT_COLOR: TextColor = 'primary';
const DEFAULT_HYPHENS: TextHyphens = 'inherit';

export const textAppearance = (props: TextAppearanceProps = {}): NativeAppearance => {
  const {
    size,
    weight = DEFAULT_WEIGHT,
    align = DEFAULT_ALIGN,
    color = DEFAULT_COLOR,
    hyphens = DEFAULT_HYPHENS,
    ellipsis = false,
  } = props;
  return {
    className: TEXT_ROOT_CLASS,
    attrs: {
      ...(weight !== DEFAULT_WEIGHT ? { 'data-p-weight': weight } : {}),
      ...(align !== DEFAULT_ALIGN ? { 'data-p-align': align } : {}),
      ...(color !== DEFAULT_COLOR ? { 'data-p-color': color } : {}),
      ...(hyphens !== DEFAULT_HYPHENS ? { 'data-p-hyphens': hyphens } : {}),
      ...(ellipsis ? { 'data-p-ellipsis': 'true' } : {}),
      ...serializeResponsive('size', size, DEFAULT_SIZE),
    },
  };
};
