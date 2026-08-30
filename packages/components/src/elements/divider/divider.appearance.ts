import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const DIVIDER_ROOT_CLASS = 'p-divider' as const;

export const DIVIDER_COLORS = ['contrast-lower', 'contrast-low', 'contrast-medium', 'contrast-high'] as const;
export type DividerColor = (typeof DIVIDER_COLORS)[number];

export const DIVIDER_DIRECTIONS = ['vertical', 'horizontal'] as const;
export type DividerDirection = (typeof DIVIDER_DIRECTIONS)[number];

export type DividerAppearanceProps = {
  color?: DividerColor;
  direction?: Responsive<DividerDirection>;
};

const DEFAULT_COLOR: DividerColor = 'contrast-lower';
const DEFAULT_DIRECTION: DividerDirection = 'horizontal';

export const dividerAppearance = (props: DividerAppearanceProps = {}): NativeAppearance => {
  const { color = DEFAULT_COLOR, direction } = props;
  return {
    className: DIVIDER_ROOT_CLASS,
    attrs: {
      ...(color !== DEFAULT_COLOR ? { 'data-p-color': color } : {}),
      ...serializeResponsive('direction', direction, DEFAULT_DIRECTION),
    },
  };
};
