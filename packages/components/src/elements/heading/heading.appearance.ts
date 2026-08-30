import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const HEADING_ROOT_CLASS = 'p-heading' as const;

export const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type HeadingTag = (typeof HEADING_TAGS)[number];

export const HEADING_COLORS = ['primary', 'contrast-higher', 'contrast-high', 'contrast-medium', 'inherit'] as const;
export type HeadingColor = (typeof HEADING_COLORS)[number];

export const HEADING_WEIGHTS = ['normal', 'semibold', 'bold', 'regular', 'semi-bold'] as const;
export type HeadingWeight = (typeof HEADING_WEIGHTS)[number];

export const HEADING_ALIGNS = ['start', 'center', 'end', 'inherit'] as const;
export type HeadingAlign = (typeof HEADING_ALIGNS)[number];

export const HEADING_SIZES = [
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
  'x-large',
  'xx-large',
] as const;
export type HeadingSize = (typeof HEADING_SIZES)[number];

export const HEADING_HYPHENS = ['none', 'manual', 'auto', 'inherit'] as const;
export type HeadingHyphens = (typeof HEADING_HYPHENS)[number];

export type HeadingAppearanceProps = {
  size?: Responsive<HeadingSize>;
  weight?: HeadingWeight;
  align?: HeadingAlign;
  color?: HeadingColor;
  hyphens?: HeadingHyphens;
  ellipsis?: boolean;
};

const DEFAULT_SIZE: HeadingSize = '2xl';
const DEFAULT_WEIGHT: HeadingWeight = 'normal';
const DEFAULT_ALIGN: HeadingAlign = 'start';
const DEFAULT_COLOR: HeadingColor = 'primary';
const DEFAULT_HYPHENS: HeadingHyphens = 'none';

const headingSizeToTagMap: Record<HeadingSize, HeadingTag> = {
  small: 'h6',
  medium: 'h5',
  large: 'h4',
  'x-large': 'h3',
  'xx-large': 'h2',
  '2xs': 'h6',
  xs: 'h6',
  sm: 'h6',
  md: 'h5',
  lg: 'h4',
  xl: 'h3',
  '2xl': 'h2',
  '3xl': 'h2',
  '4xl': 'h2',
  '5xl': 'h2',
  inherit: 'h2',
};

export const headingTagForSize = (size?: Responsive<HeadingSize>, tag?: HeadingTag): HeadingTag => {
  if (tag) {
    return tag;
  }
  if (size && typeof size !== 'object') {
    return headingSizeToTagMap[size];
  }
  return 'h2';
};

export const headingAppearance = (props: HeadingAppearanceProps = {}): NativeAppearance => {
  const {
    size,
    weight = DEFAULT_WEIGHT,
    align = DEFAULT_ALIGN,
    color = DEFAULT_COLOR,
    hyphens = DEFAULT_HYPHENS,
    ellipsis = false,
  } = props;
  return {
    className: HEADING_ROOT_CLASS,
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
