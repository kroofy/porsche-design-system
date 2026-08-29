import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const LINK_PURE_ROOT_CLASS = 'p-link-pure' as const;
export const LINK_PURE_LABEL_CLASS = 'p-link-pure__label' as const;
export const LINK_PURE_ICON_CLASS = 'p-link-pure__icon' as const;

export const LINK_PURE_SIZES = [
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
export type LinkPureSize = (typeof LINK_PURE_SIZES)[number];

export const LINK_PURE_COLORS = [
  'primary',
  'contrast-higher',
  'contrast-high',
  'contrast-medium',
  'inherit',
] as const;
export type LinkPureColor = (typeof LINK_PURE_COLORS)[number];

export const LINK_PURE_ALIGN_LABELS = ['start', 'end'] as const;
export type LinkPureAlignLabel = (typeof LINK_PURE_ALIGN_LABELS)[number];

export type LinkPureAppearanceProps = {
  size?: Responsive<LinkPureSize>;
  color?: LinkPureColor;
  icon?: string | 'none';
  hideLabel?: Responsive<boolean>;
  alignLabel?: Responsive<LinkPureAlignLabel>;
  stretch?: Responsive<boolean>;
  underline?: boolean;
  active?: boolean;
};

const DEFAULT_SIZE: LinkPureSize = 'sm';
const DEFAULT_COLOR: LinkPureColor = 'primary';
const DEFAULT_ICON = 'arrow-right';
const DEFAULT_ALIGN: LinkPureAlignLabel = 'end';

export const linkPureAppearance = (props: LinkPureAppearanceProps = {}): NativeAppearance => {
  const {
    size,
    color = DEFAULT_COLOR,
    icon = DEFAULT_ICON,
    hideLabel,
    alignLabel,
    stretch,
    underline = false,
    active = false,
  } = props;
  return {
    className: LINK_PURE_ROOT_CLASS,
    attrs: {
      ...serializeResponsive('size', size, DEFAULT_SIZE),
      ...(color !== DEFAULT_COLOR ? { 'data-p-color': color } : {}),
      ...(icon !== DEFAULT_ICON ? { 'data-p-icon': icon } : {}),
      ...serializeResponsive('hide-label', hideLabel, false),
      ...serializeResponsive('align-label', alignLabel, DEFAULT_ALIGN),
      ...serializeResponsive('stretch', stretch, false),
      ...(underline ? { 'data-p-underline': 'true' } : {}),
      ...(active ? { 'data-p-active': 'true' } : {}),
    },
  };
};
