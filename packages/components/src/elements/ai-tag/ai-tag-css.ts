import {
  blurFrosted,
  colorContrastHigh,
  colorFrostedStrong,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  ref,
  spacingStaticSm,
  spacingStaticXs,
  typescale2Xs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { AI_TAG_ICON_PATH } from '../../components/ai-tag/ai-tag-utils';
import { forcedColorsMediaQuery, getTransition } from '../../styles';
import { getCss } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { AI_TAG_ROOT_CLASS } from './ai-tag.appearance';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const iconMask = `${getInlineSVGBackgroundImage(AI_TAG_ICON_PATH)} center/contain no-repeat`;

const getNativeAiTagStyles = (): Styles => ({
  [AI_TAG_ROOT_CLASS]: {
    display: 'inline-flex',
    verticalAlign: 'top',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    gap: '2px',
    padding: `0 ${ref(spacingStaticSm)} 0 ${ref(spacingStaticXs)}`,
    borderRadius: `calc(${ref(spacingStaticXs)} + (${ref(leadingNormal)} / 2))`,
    fontFamily: ref(fontPorscheNext),
    fontWeight: ref(fontWeightNormal),
    fontSize: ref(typescale2Xs),
    // Stencil computes line-height on the 1rem host (`ex` of typescaleSm) and the inner pill inherits that length.
    lineHeight: `calc(6px + 2.125ex * ${ref(typescaleSm)} / 1em)`,
    color: ref(colorContrastHigh),
    background: ref(colorFrostedStrong),
    WebkitBackdropFilter: ref(blurFrosted),
    backdropFilter: ref(blurFrosted),
    transition: `${getTransition('color')}, ${getTransition('background-color')}, ${getTransition('backdrop-filter')}`,
    '&[hidden]': {
      display: 'none !important',
    },
    ...forcedColorsMediaQuery({
      outline: '1px solid transparent',
    }),
    '&::before': {
      content: '""',
      width: '1rem',
      height: '1rem',
      background: ref(colorContrastHigh),
      mask: iconMask,
      WebkitMask: iconMask,
      ...forcedColorsMediaQuery({
        background: 'CanvasText',
      }),
    },
    '& > abbr': {
      all: 'unset',
    },
  } as JssStyle,
});

export const getNativeAiTagCss = (): string => inheritColorScheme('.p-ai-tag', toLayeredCss(getNativeAiTagStyles()));
