import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const MODAL_ROOT_CLASS = 'p-modal' as const;
export const MODAL_SCROLLER_CLASS = 'p-modal__scroller' as const;
export const MODAL_PANEL_CLASS = 'p-modal__panel' as const;
export const MODAL_DISMISS_CLASS = 'p-modal__dismiss' as const;
export const MODAL_HEADER_CLASS = 'p-modal__header' as const;
export const MODAL_FOOTER_CLASS = 'p-modal__footer' as const;

export const MODAL_BACKGROUNDS = ['canvas', 'surface'] as const;
export type ModalBackground = (typeof MODAL_BACKGROUNDS)[number];

export const MODAL_BACKDROPS = ['blur', 'shading'] as const;
export type ModalBackdrop = (typeof MODAL_BACKDROPS)[number];

export type ModalAppearanceProps = {
  background?: ModalBackground;
  backdrop?: ModalBackdrop;
  fullscreen?: Responsive<boolean>;
};

const DEFAULT_BACKGROUND: ModalBackground = 'canvas';
const DEFAULT_BACKDROP: ModalBackdrop = 'blur';

export const modalAppearance = (props: ModalAppearanceProps = {}): NativeAppearance => {
  const { background = DEFAULT_BACKGROUND, backdrop = DEFAULT_BACKDROP, fullscreen } = props;
  return {
    className: MODAL_ROOT_CLASS,
    attrs: {
      ...(background !== DEFAULT_BACKGROUND ? { 'data-p-background': background } : {}),
      ...(backdrop !== DEFAULT_BACKDROP ? { 'data-p-backdrop': backdrop } : {}),
      ...serializeResponsive('fullscreen', fullscreen, false),
    },
  };
};
