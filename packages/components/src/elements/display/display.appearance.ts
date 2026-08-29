import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const DISPLAY_ROOT_CLASS = 'p-display' as const;

export const DISPLAY_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type DisplayTag = (typeof DISPLAY_TAGS)[number];

export const DISPLAY_SIZES = ['small', 'medium', 'large', 'inherit'] as const;
export type DisplaySize = (typeof DISPLAY_SIZES)[number];

export const DISPLAY_COLORS = ['primary', 'inherit'] as const;
export type DisplayColor = (typeof DISPLAY_COLORS)[number];

export const DISPLAY_ALIGNS = ['start', 'center', 'end', 'inherit'] as const;
export type DisplayAlign = (typeof DISPLAY_ALIGNS)[number];

export type DisplayAppearanceProps = {
  size?: Responsive<DisplaySize>;
  align?: DisplayAlign;
  color?: DisplayColor;
  ellipsis?: boolean;
};

const DEFAULT_SIZE: DisplaySize = 'large';
const DEFAULT_ALIGN: DisplayAlign = 'start';
const DEFAULT_COLOR: DisplayColor = 'primary';

const displaySizeToTagMap: Record<DisplaySize, DisplayTag> = {
  small: 'h3',
  medium: 'h2',
  large: 'h1',
  inherit: 'h1',
};

export const displayTagForSize = (size?: Responsive<DisplaySize>, tag?: DisplayTag): DisplayTag => {
  if (tag) {
    return tag;
  }
  if (size && typeof size !== 'object') {
    return displaySizeToTagMap[size];
  }
  return 'h1';
};

export const displayAppearance = (props: DisplayAppearanceProps = {}): NativeAppearance => {
  const { size, align = DEFAULT_ALIGN, color = DEFAULT_COLOR, ellipsis = false } = props;
  return {
    className: DISPLAY_ROOT_CLASS,
    attrs: {
      ...(align !== DEFAULT_ALIGN ? { 'data-p-align': align } : {}),
      ...(color !== DEFAULT_COLOR ? { 'data-p-color': color } : {}),
      ...(ellipsis ? { 'data-p-ellipsis': 'true' } : {}),
      ...serializeResponsive('size', size, DEFAULT_SIZE),
    },
  };
};
