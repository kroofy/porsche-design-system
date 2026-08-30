import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const BANNER_ROOT_CLASS = 'p-banner' as const;
export const BANNER_DISMISS_CLASS = 'p-banner__dismiss' as const;
export const BANNER_DISMISS_LABEL = 'Close banner' as const;

export const BANNER_STATES = ['info', 'success', 'warning', 'error'] as const;
export type BannerState = (typeof BANNER_STATES)[number];

export const BANNER_POSITIONS = ['top', 'bottom'] as const;
export type BannerPosition = (typeof BANNER_POSITIONS)[number];

export const BANNER_HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type BannerHeadingTag = (typeof BANNER_HEADING_TAGS)[number];

export type BannerAppearanceProps = {
  state?: BannerState;
  position?: Responsive<BannerPosition>;
};

const DEFAULT_STATE: BannerState = 'info';

export const bannerAppearance = (props: BannerAppearanceProps = {}): NativeAppearance => {
  const { state = DEFAULT_STATE, position } = props;
  const positionAttrs =
    typeof position === 'string'
      ? { 'data-p-position': position }
      : serializeResponsive('position', position, 'bottom');
  return {
    className: BANNER_ROOT_CLASS,
    attrs: {
      ...(state !== DEFAULT_STATE ? { 'data-p-state': state } : {}),
      ...positionAttrs,
    },
  };
};

export const bannerLive = (
  state: BannerState = DEFAULT_STATE
): { role: 'alert' | 'status'; 'aria-live': 'assertive' | 'polite' } => {
  const isAlert = state === 'warning' || state === 'error';
  return {
    role: isAlert ? 'alert' : 'status',
    'aria-live': isAlert ? 'assertive' : 'polite',
  };
};
