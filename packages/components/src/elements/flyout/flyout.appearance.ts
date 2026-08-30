import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const FLYOUT_ROOT_CLASS = 'p-flyout' as const;
export const FLYOUT_SCROLLER_CLASS = 'p-flyout__scroller' as const;
export const FLYOUT_PANEL_CLASS = 'p-flyout__panel' as const;
export const FLYOUT_DISMISS_CLASS = 'p-flyout__dismiss' as const;
export const FLYOUT_HEADER_CLASS = 'p-flyout__header' as const;
export const FLYOUT_FOOTER_CLASS = 'p-flyout__footer' as const;
export const FLYOUT_SUB_FOOTER_CLASS = 'p-flyout__sub-footer' as const;

export const FLYOUT_BACKGROUNDS = ['canvas', 'surface'] as const;
export type FlyoutBackground = (typeof FLYOUT_BACKGROUNDS)[number];

export const FLYOUT_BACKDROPS = ['blur', 'shading'] as const;
export type FlyoutBackdrop = (typeof FLYOUT_BACKDROPS)[number];

export const FLYOUT_POSITIONS = ['start', 'end'] as const;
export type FlyoutPosition = (typeof FLYOUT_POSITIONS)[number];

export const FLYOUT_FOOTER_BEHAVIORS = ['sticky', 'fixed'] as const;
export type FlyoutFooterBehavior = (typeof FLYOUT_FOOTER_BEHAVIORS)[number];

export type FlyoutAppearanceProps = {
  background?: FlyoutBackground;
  backdrop?: FlyoutBackdrop;
  position?: FlyoutPosition;
  fullscreen?: Responsive<boolean>;
  footerBehavior?: FlyoutFooterBehavior;
};

const DEFAULT_BACKGROUND: FlyoutBackground = 'canvas';
const DEFAULT_BACKDROP: FlyoutBackdrop = 'blur';
const DEFAULT_POSITION: FlyoutPosition = 'end';
const DEFAULT_FOOTER_BEHAVIOR: FlyoutFooterBehavior = 'sticky';

export const flyoutAppearance = (props: FlyoutAppearanceProps = {}): NativeAppearance => {
  const {
    background = DEFAULT_BACKGROUND,
    backdrop = DEFAULT_BACKDROP,
    position = DEFAULT_POSITION,
    fullscreen,
    footerBehavior = DEFAULT_FOOTER_BEHAVIOR,
  } = props;
  return {
    className: FLYOUT_ROOT_CLASS,
    attrs: {
      ...(background !== DEFAULT_BACKGROUND ? { 'data-p-background': background } : {}),
      ...(backdrop !== DEFAULT_BACKDROP ? { 'data-p-backdrop': backdrop } : {}),
      ...(position !== DEFAULT_POSITION ? { 'data-p-position': position } : {}),
      ...(footerBehavior !== DEFAULT_FOOTER_BEHAVIOR ? { 'data-p-footer-behavior': footerBehavior } : {}),
      ...serializeResponsive('fullscreen', fullscreen, false),
    },
  };
};
