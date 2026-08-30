import { colorBackdrop, ref, spacingFluidLg } from '@porsche-design-system/stylesheets';
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
  getSlotMainJssStyle,
} from '../../components/common/dialog-base/dialog-base-styles';
import {
  cssVarRefPaddingBottom,
  cssVarRefPaddingInline,
  cssVarRefPaddingTop,
} from '../../components/sheet/sheet-styles';
import { forcedColorsMediaQuery } from '../../styles';
import { getCss } from '../../utils';
import {
  SHEET_DISMISS_CLASS,
  SHEET_HEADER_CLASS,
  SHEET_PANEL_CLASS,
  SHEET_ROOT_CLASS,
  SHEET_SCROLLER_CLASS,
} from './sheet.appearance';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const getNativeSheetStyles = (): Styles => ({
  [SHEET_ROOT_CLASS]: {
    ...getFunctionalComponentDialogBaseStyles(false, 'shading'),
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
    },
    '&[data-p-background="surface"]': dialogHostJssStyle('surface'),
    [`& .${SHEET_SCROLLER_CLASS}`]: getScrollerJssStyle('fullscreen'),
    [`& .${SHEET_PANEL_CLASS}`]: {
      ...dialogGridJssStyle(),
      ...getDialogColorJssStyle(),
      ...getDialogTransitionJssStyle(false, '^'),
      width: '100%',
      alignSelf: 'flex-end',
      marginBlockStart: ref(spacingFluidLg),
      borderTopLeftRadius: dialogBorderRadius,
      borderTopRightRadius: dialogBorderRadius,
      clipPath: `inset(0 round ${dialogBorderRadius} ${dialogBorderRadius} 0 0)`,
      ...forcedColorsMediaQuery({
        borderTop: '2px solid CanvasText',
      }),
    },
    [`&:modal .${SHEET_PANEL_CLASS}, &[open] .${SHEET_PANEL_CLASS}`]: getDialogTransitionJssStyle(true, '^'),
    [`& .${SHEET_PANEL_CLASS} > *`]: getSlotMainJssStyle(),
    [`& .${SHEET_HEADER_CLASS}`]: {
      gridColumn: '2/3',
      zIndex: 0,
    },
    [`& .${SHEET_DISMISS_CLASS}`]: getDialogDismissButtonJssStyle('canvas'),
    [`&[data-p-background="surface"] .${SHEET_DISMISS_CLASS}`]: getDialogDismissButtonJssStyle('surface'),
  } as JssStyle,
});

export const getNativeSheetCss = (): string => inheritColorScheme('.p-sheet', toLayeredCss(getNativeSheetStyles()));
