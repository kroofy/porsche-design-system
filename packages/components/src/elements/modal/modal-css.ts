import { gridExtendedOffsetBase } from '@porsche-design-system/emotion';
import { blurFrosted, colorBackdrop, ref } from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import {
  dialogBorderRadius,
  dialogGridJssStyle,
  dialogHostJssStyle,
  dialogPaddingBottom,
  dialogPaddingInline,
  dialogPaddingTop,
  getDialogColorJssStyle,
  getDialogDismissButtonJssStyle,
  getDialogTransitionJssStyle,
  getFunctionalComponentDialogBaseStyles,
  getScrollerJssStyle,
  getSlotFooterJssStyle,
  getSlotMainJssStyle,
} from '../../components/common/dialog-base/dialog-base-styles';
import {
  cssVarRefPaddingBottom,
  cssVarRefPaddingInline,
  cssVarRefPaddingTop,
} from '../../components/modal/modal-styles';
import { forcedColorsMediaQuery } from '../../styles';
import { getCss } from '../../utils';
import { RESPONSIVE_BREAKPOINTS } from '../appearance';
import { mediaQueryMin } from '../appearance-mq';
import {
  MODAL_DISMISS_CLASS,
  MODAL_FOOTER_CLASS,
  MODAL_HEADER_CLASS,
  MODAL_PANEL_CLASS,
  MODAL_ROOT_CLASS,
  MODAL_SCROLLER_CLASS,
} from './modal.appearance';

const cssVariableWidth = '--p-modal-width';
const cssVariableSpacingTop = '--p-modal-spacing-top';
const cssVariableSpacingBottom = '--p-modal-spacing-bottom';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const panelLayout = (fullscreen: boolean): JssStyle =>
  fullscreen
    ? {
        width: 'auto',
        minWidth: 'auto',
        maxWidth: 'none',
        placeSelf: 'stretch',
        margin: 0,
        borderRadius: 0,
        clipPath: 'none',
      }
    : {
        width: ref(cssVariableWidth, 'auto'),
        minWidth: '276px',
        maxWidth: '1535.5px',
        placeSelf: 'center',
        margin: `${ref(cssVariableSpacingTop, 'clamp(16px, 10vh, 192px)')} ${gridExtendedOffsetBase} ${ref(cssVariableSpacingBottom, 'clamp(16px, 10vh, 192px)')}`,
        borderRadius: dialogBorderRadius,
        clipPath: `inset(0 round ${dialogBorderRadius})`,
        ...forcedColorsMediaQuery({
          outline: '2px solid CanvasText',
          outlineOffset: '-2px',
        }),
      };

const responsiveFullscreen = (): JssStyle => {
  const styles: JssStyle = {
    [`&[data-p-fullscreen="true"] .${MODAL_PANEL_CLASS}`]: panelLayout(true),
    [`&[data-p-fullscreen="false"] .${MODAL_PANEL_CLASS}`]: panelLayout(false),
  };
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    Object.assign(styles, {
      [mediaQueryMin(breakpoint)]: {
        [`&[data-p-fullscreen-${breakpoint}="true"] .${MODAL_PANEL_CLASS}`]: panelLayout(true),
        [`&[data-p-fullscreen-${breakpoint}="false"] .${MODAL_PANEL_CLASS}`]: panelLayout(false),
      },
    });
  }
  return styles;
};

const getNativeModalStyles = (): Styles => ({
  [MODAL_ROOT_CLASS]: {
    ...getFunctionalComponentDialogBaseStyles(false, 'blur'),
    ...dialogHostJssStyle('canvas'),
    [cssVarRefPaddingTop]: dialogPaddingTop,
    [cssVarRefPaddingBottom]: dialogPaddingBottom,
    [cssVarRefPaddingInline]: dialogPaddingInline,
    '&[hidden]': {
      display: 'none !important',
    },
    '&:modal, &[open]': {
      width: '100dvw',
      height: '100dvh',
      visibility: 'inherit',
      pointerEvents: 'auto',
      background: ref(colorBackdrop),
      WebkitBackdropFilter: ref(blurFrosted),
      backdropFilter: ref(blurFrosted),
    },
    '&[data-p-backdrop="shading"]:modal, &[data-p-backdrop="shading"][open]': {
      WebkitBackdropFilter: 'none',
      backdropFilter: 'none',
    },
    '&[data-p-background="surface"]': dialogHostJssStyle('surface'),
    [`& .${MODAL_SCROLLER_CLASS}`]: getScrollerJssStyle('fullscreen'),
    [`& .${MODAL_PANEL_CLASS}`]: {
      ...dialogGridJssStyle(),
      ...getDialogColorJssStyle(),
      ...getDialogTransitionJssStyle(false, '^'),
      ...panelLayout(false),
    },
    [`&:modal .${MODAL_PANEL_CLASS}, &[open] .${MODAL_PANEL_CLASS}`]: getDialogTransitionJssStyle(true, '^'),
    [`& .${MODAL_PANEL_CLASS} > *`]: getSlotMainJssStyle(),
    [`& .${MODAL_HEADER_CLASS}`]: {
      gridRowStart: 1,
    },
    [`& .${MODAL_FOOTER_CLASS}`]: getSlotFooterJssStyle(),
    [`& .${MODAL_DISMISS_CLASS}`]: getDialogDismissButtonJssStyle('canvas'),
    [`&[data-p-background="surface"] .${MODAL_DISMISS_CLASS}`]: getDialogDismissButtonJssStyle('surface'),
    ...responsiveFullscreen(),
  } as JssStyle,
});

export const getNativeModalCss = (): string => inheritColorScheme('.p-modal', toLayeredCss(getNativeModalStyles()));
