import { ICON_COLORS, ICON_SIZES, type IconColor, type IconSize } from '../../components/icon/icon-utils';
import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';
import { DEFAULT_ICON_NAME } from './icon-url';

export const ICON_ROOT_CLASS = 'p-icon' as const;

export type { IconColor, IconSize };
export { ICON_COLORS, ICON_SIZES };

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
