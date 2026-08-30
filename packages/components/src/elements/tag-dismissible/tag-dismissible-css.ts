import {
  colorContrastHigh,
  colorFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  radiusLg,
  radiusXl,
  ref,
  typescaleSm,
  typescaleXs,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { cssVarInternalTagDismissibleScaling } from '../../components/tag-dismissible/tag-dismissible-styles';
import {
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hoverMediaQuery,
} from '../../styles';
import { getCss, mergeDeep } from '../../utils';
import {
  TAG_DISMISSIBLE_ICON_CLASS,
  TAG_DISMISSIBLE_LABEL_CLASS,
  TAG_DISMISSIBLE_ROOT_CLASS,
  TAG_DISMISSIBLE_SR_CLASS,
} from './tag-dismissible.appearance';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const COMPACT_SCALE = 0.64285714;

const getNativeTagDismissibleStyles = (): Styles => {
  const padBlockLabel = `calc(16.8px * (${ref(cssVarInternalTagDismissibleScaling)} - ${COMPACT_SCALE}))`;
  const padBlock = `calc(28px * (${ref(cssVarInternalTagDismissibleScaling)} - ${COMPACT_SCALE}) + 6px)`;
  const padInline = `calc(22.4px * (${ref(cssVarInternalTagDismissibleScaling)} - ${COMPACT_SCALE}) + 4px)`;
  const iconPadding = `calc(11.2px * (${ref(cssVarInternalTagDismissibleScaling)} - ${COMPACT_SCALE}))`;

  return {
    [TAG_DISMISSIBLE_ROOT_CLASS]: mergeDeep({
      all: 'unset',
      [cssVarInternalTagDismissibleScaling]: 1,
      position: 'relative',
      display: 'inline-flex',
      verticalAlign: 'top',
      alignItems: 'center',
      gap: padInline,
      padding: `${padBlock} ${padInline}`,
      borderRadius: ref(radiusXl),
      cursor: 'pointer',
      background: ref(colorFrosted),
      color: ref(colorPrimary),
      textAlign: 'start',
      font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
      '&[hidden]': {
        display: 'none !important',
      },
      '&[data-p-compact="true"]': {
        [cssVarInternalTagDismissibleScaling]: COMPACT_SCALE,
        borderRadius: ref(radiusLg),
      },
      [`&:has(.${TAG_DISMISSIBLE_LABEL_CLASS})`]: {
        paddingBlock: padBlockLabel,
      },
      '&:focus-visible': getFocusBaseStyles(),
      ...hoverMediaQuery({
        [`&:hover > .${TAG_DISMISSIBLE_ICON_CLASS}`]: {
          backgroundColor: ref(colorFrosted),
        },
      }),
      [`& > .${TAG_DISMISSIBLE_SR_CLASS}`]: getHiddenTextJssStyle(),
      [`& .${TAG_DISMISSIBLE_LABEL_CLASS}`]: {
        display: 'block',
        marginBottom: '-4px',
        color: ref(colorContrastHigh),
        fontSize: ref(typescaleXs),
      },
      [`& > .${TAG_DISMISSIBLE_ICON_CLASS}`]: {
        padding: iconPadding,
        margin: `calc(-1 * ${iconPadding})`,
        transition: getTransition('background-color'),
        borderRadius: ref(radiusFull),
      },
      ...forcedColorsMediaQuery({
        outline: '2px solid CanvasText',
        outlineOffset: '-2px',
      }),
    } as JssStyle),
  };
};

export const getNativeTagDismissibleCss = (): string =>
  inheritColorScheme('.p-tag-dismissible', toLayeredCss(getNativeTagDismissibleStyles()));
