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
  getSlotHeaderJssStyle,
  getSlotMainJssStyle,
  getSlotSubFooterJssStyle,
} from '../../components/common/dialog-base/dialog-base-styles';
import {
  cssVarRefPaddingBottom,
  cssVarRefPaddingInline,
  cssVarRefPaddingTop,
} from '../../components/flyout/flyout-styles';
import { forcedColorsMediaQuery } from '../../styles';
import { getCss } from '../../utils';
import { RESPONSIVE_BREAKPOINTS } from '../appearance';
import { mediaQueryMin } from '../appearance-mq';
import {
  FLYOUT_DISMISS_CLASS,
  FLYOUT_FOOTER_CLASS,
  FLYOUT_HEADER_CLASS,
  FLYOUT_PANEL_CLASS,
  FLYOUT_ROOT_CLASS,
  FLYOUT_SCROLLER_CLASS,
  FLYOUT_SUB_FOOTER_CLASS,
} from './flyout.appearance';

const cssVariableWidth = '--p-flyout-width';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const panelFullscreen = (): JssStyle => ({
  width: '100dvw',
  minWidth: 'auto',
  maxWidth: 'none',
  borderRadius: 0,
  clipPath: 'none',
  '&:dir(rtl)': {
    clipPath: 'none',
  },
});

const panelSide = (isPositionStart: boolean): JssStyle => ({
  width: ref(cssVariableWidth, 'auto'),
  minWidth: '320px',
  maxWidth: '100vw',
  clipPath: isPositionStart
    ? `inset(0 round 0 ${dialogBorderRadius} ${dialogBorderRadius} 0)`
    : `inset(0 round ${dialogBorderRadius} 0 0 ${dialogBorderRadius})`,
  '&:dir(rtl)': {
    clipPath: isPositionStart
      ? `inset(0 round ${dialogBorderRadius} 0 0 ${dialogBorderRadius})`
      : `inset(0 round 0 ${dialogBorderRadius} ${dialogBorderRadius} 0)`,
  },
  ...(isPositionStart
    ? {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
        borderStartEndRadius: dialogBorderRadius,
        borderEndEndRadius: dialogBorderRadius,
        ...forcedColorsMediaQuery({
          borderInlineStart: 'none',
          borderInlineEnd: '2px solid CanvasText',
        }),
      }
    : {
        borderStartStartRadius: dialogBorderRadius,
        borderEndStartRadius: dialogBorderRadius,
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
        ...forcedColorsMediaQuery({
          borderInlineStart: '2px solid CanvasText',
          borderInlineEnd: 'none',
        }),
      }),
});

const responsiveFullscreen = (): JssStyle => {
  const styles: JssStyle = {
    [`&[data-p-fullscreen="true"] .${FLYOUT_PANEL_CLASS}`]: panelFullscreen(),
    [`&[data-p-fullscreen="false"] .${FLYOUT_PANEL_CLASS}`]: panelSide(false),
    [`&[data-p-position="start"][data-p-fullscreen="false"] .${FLYOUT_PANEL_CLASS}`]: panelSide(true),
  };
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    Object.assign(styles, {
      [mediaQueryMin(breakpoint)]: {
        [`&[data-p-fullscreen-${breakpoint}="true"] .${FLYOUT_PANEL_CLASS}`]: panelFullscreen(),
        [`&[data-p-fullscreen-${breakpoint}="false"] .${FLYOUT_PANEL_CLASS}`]: panelSide(false),
        [`&[data-p-position="start"][data-p-fullscreen-${breakpoint}="false"] .${FLYOUT_PANEL_CLASS}`]: panelSide(true),
      },
    });
  }
  return styles;
};

const getNativeFlyoutStyles = (): Styles => ({
  [FLYOUT_ROOT_CLASS]: {
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
    [`& .${FLYOUT_SCROLLER_CLASS}`]: {
      ...getScrollerJssStyle('end'),
      ...getDialogTransitionJssStyle(false, '<'),
      '&:focus-visible': {
        outline: 'none',
      },
    },
    [`&[data-p-position="start"] .${FLYOUT_SCROLLER_CLASS}`]: {
      ...getScrollerJssStyle('start'),
      insetInlineEnd: 'auto',
      ...getDialogTransitionJssStyle(false, '>'),
    },
    [`&:modal .${FLYOUT_SCROLLER_CLASS}, &[open] .${FLYOUT_SCROLLER_CLASS}`]: getDialogTransitionJssStyle(true, '<'),
    [`&[data-p-position="start"]:modal .${FLYOUT_SCROLLER_CLASS}, &[data-p-position="start"][open] .${FLYOUT_SCROLLER_CLASS}`]:
      getDialogTransitionJssStyle(true, '>'),
    [`& .${FLYOUT_PANEL_CLASS}`]: {
      ...dialogGridJssStyle(),
      ...getDialogColorJssStyle(),
      ...panelSide(false),
    },
    [`&[data-p-position="start"] .${FLYOUT_PANEL_CLASS}`]: panelSide(true),
    [`&[data-p-footer-behavior="fixed"] .${FLYOUT_PANEL_CLASS}`]: {
      gridTemplateRows: '1fr',
    },
    [`&[data-p-footer-behavior="fixed"]:has(.${FLYOUT_HEADER_CLASS}) .${FLYOUT_PANEL_CLASS}`]: {
      gridTemplateRows: 'auto 1fr auto',
    },
    [`& .${FLYOUT_PANEL_CLASS} > *`]: getSlotMainJssStyle(),
    [`& .${FLYOUT_HEADER_CLASS}`]: {
      ...getSlotHeaderJssStyle(),
      gridRowStart: 1,
      borderStartStartRadius: dialogBorderRadius,
    },
    [`&[data-p-position="start"] .${FLYOUT_HEADER_CLASS}`]: {
      borderStartStartRadius: 0,
      borderStartEndRadius: dialogBorderRadius,
    },
    [`& .${FLYOUT_FOOTER_CLASS}`]: getSlotFooterJssStyle(),
    [`& .${FLYOUT_SUB_FOOTER_CLASS}`]: getSlotSubFooterJssStyle(),
    [`& .${FLYOUT_DISMISS_CLASS}`]: getDialogDismissButtonJssStyle('canvas'),
    [`&[data-p-background="surface"] .${FLYOUT_DISMISS_CLASS}`]: getDialogDismissButtonJssStyle('surface'),
    ...responsiveFullscreen(),
  } as JssStyle,
});

export const getNativeFlyoutCss = (): string => inheritColorScheme('.p-flyout', toLayeredCss(getNativeFlyoutStyles()));
