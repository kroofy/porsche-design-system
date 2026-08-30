import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const ACCORDION_ROOT_CLASS = 'p-accordion' as const;

export const ACCORDION_BACKGROUNDS = ['canvas', 'surface', 'frosted', 'none'] as const;
export type AccordionBackground = (typeof ACCORDION_BACKGROUNDS)[number];

export const ACCORDION_ALIGN_MARKERS = ['start', 'end'] as const;
export type AccordionAlignMarker = (typeof ACCORDION_ALIGN_MARKERS)[number];

export const ACCORDION_SIZES = ['small', 'medium'] as const;
export type AccordionSize = (typeof ACCORDION_SIZES)[number];

export type AccordionAppearanceProps = {
  alignMarker?: AccordionAlignMarker;
  background?: AccordionBackground;
  compact?: boolean;
  indent?: Responsive<boolean>;
  sticky?: boolean;
  size?: Responsive<AccordionSize>;
};

const DEFAULT_ALIGN: AccordionAlignMarker = 'end';
const DEFAULT_BACKGROUND: AccordionBackground = 'none';
const DEFAULT_SIZE: AccordionSize = 'small';

export const accordionAppearance = (props: AccordionAppearanceProps = {}): NativeAppearance => {
  const {
    alignMarker = DEFAULT_ALIGN,
    background = DEFAULT_BACKGROUND,
    compact = false,
    indent,
    sticky = false,
    size,
  } = props;
  return {
    className: ACCORDION_ROOT_CLASS,
    attrs: {
      ...(alignMarker !== DEFAULT_ALIGN ? { 'data-p-align-marker': alignMarker } : {}),
      ...(background !== DEFAULT_BACKGROUND ? { 'data-p-background': background } : {}),
      ...(compact ? { 'data-p-compact': 'true' } : {}),
      ...serializeResponsive('indent', indent, false),
      ...(sticky ? { 'data-p-sticky': 'true' } : {}),
      ...serializeResponsive('size', size, DEFAULT_SIZE),
    },
  };
};
