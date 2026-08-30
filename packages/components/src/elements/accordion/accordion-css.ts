import {
  blurFrosted,
  colorCanvas,
  colorFrosted,
  colorPrimary,
  colorSurface,
  fontPorscheNext,
  leadingNormal,
  radius2Xl,
  radiusFull,
  radiusXl,
  ref,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import {
  addImportantToEachRule,
  cssVariableTransitionDuration,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getTransition,
  hoverMediaQuery,
  motionDurationMap,
} from '../../styles';
import { getCss, mergeDeep } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { RESPONSIVE_BREAKPOINTS } from '../appearance';
import { mediaQueryMin } from '../appearance-mq';
import { ACCORDION_ROOT_CLASS } from './accordion.appearance';

const cssVarSummaryTop = '--p-accordion-summary-top';
const cssVarSummaryTopDeprecated = '--p-accordion-position-sticky-top';
const cssVarPaddingInline = '--p-accordion-px';
const cssVarPaddingBlock = '--p-accordion-py';
const cssVarFactor = '--_p-accordion-a';
const cssVarPadBlock = '--_p-accordion-b';
const cssVarPadInline = '--_p-accordion-c';
const cssVarGap = '--_p-accordion-d';
const cssVarRadius = '--_p-accordion-e';
const cssVarBackground = '--_p-accordion-f';

const COMPACT_FACTOR = 0.64285714;
const paddingBlock = `calc(28px * (${ref(cssVarFactor)} - ${COMPACT_FACTOR}) + 6px)`;
const paddingInline = `calc(11.2px * (${ref(cssVarFactor)} - ${COMPACT_FACTOR}) + 12px)`;

const iconMarker = getInlineSVGBackgroundImage(
  `<path d="m12 15.125h-.001l-.005-.006-6.494-5.476.642-.768 5.858 4.94 5.858-4.94.642.769-6.497 5.477z"/>`
);

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const indentBody = (isIndented: boolean): JssStyle => ({
  '& > :not(summary)': {
    gridColumnStart: 1,
  },
  '&[data-p-align-marker="start"] > :not(summary)': {
    gridColumnStart: isIndented ? 2 : 1,
  },
});

const responsiveIndent = (): JssStyle => {
  const styles: JssStyle = {
    '&[data-p-indent="true"]': indentBody(true),
    '&[data-p-indent="false"]': indentBody(false),
  };
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    Object.assign(styles, {
      [mediaQueryMin(breakpoint)]: {
        [`&[data-p-indent-${breakpoint}="true"]`]: indentBody(true),
        [`&[data-p-indent-${breakpoint}="false"]`]: indentBody(false),
      },
    });
  }
  return styles;
};

const backgroundToken = (background: string, pad: boolean): JssStyle => ({
  [cssVarBackground]: background,
  ...(pad
    ? {
        [cssVarPadBlock]: paddingBlock,
        [cssVarPadInline]: paddingInline,
      }
    : {}),
});

const getNativeAccordionStyles = (): Styles => ({
  [ACCORDION_ROOT_CLASS]: mergeDeep({
    [cssVarFactor]: 1,
    [cssVarPadBlock]: '0',
    [cssVarPadInline]: '0',
    [cssVarGap]: `calc(11.2px * (${ref(cssVarFactor)} - ${COMPACT_FACTOR}) + 4px)`,
    [cssVarRadius]: ref(radius2Xl),
    [cssVarBackground]: 'transparent',
    all: 'unset',
    display: 'grid',
    gridTemplate: 'repeat(2, auto) / minmax(0, 1fr) auto',
    columnGap: ref(cssVarGap),
    alignItems: 'center',
    font: `${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
    color: ref(colorPrimary),
    padding: `${ref(cssVarPaddingBlock, ref(cssVarPadBlock))} ${ref(cssVarPaddingInline, ref(cssVarPadInline))}`,
    background: ref(cssVarBackground),
    borderRadius: ref(cssVarRadius),
    '&[hidden]': {
      display: 'none !important',
    },
    '&[data-p-compact="true"]': {
      [cssVarFactor]: COMPACT_FACTOR,
      [cssVarRadius]: ref(radiusXl),
    },
    '&[data-p-background="canvas"]': backgroundToken(ref(colorCanvas), true),
    '&[data-p-background="surface"]': backgroundToken(ref(colorSurface), true),
    '&[data-p-background="frosted"]': {
      ...backgroundToken(ref(colorFrosted), true),
      WebkitBackdropFilter: ref(blurFrosted),
      backdropFilter: ref(blurFrosted),
    },
    '&[data-p-background="none"]': backgroundToken('transparent', false),
    '&[data-p-align-marker="start"]': {
      gridTemplate: 'repeat(2, auto) / auto minmax(0, 1fr)',
    },
    '&::details-content': addImportantToEachRule({
      display: 'contents',
      contentVisibility: 'visible',
    }),
    ...forcedColorsMediaQuery({
      outline: '1px solid CanvasText',
      outlineOffset: '0',
      padding: `${ref(cssVarPaddingBlock, paddingBlock)} ${ref(cssVarPaddingInline, paddingInline)}`,
    }),
    '&[data-p-background="canvas"], &[data-p-background="surface"], &[data-p-background="frosted"]':
      forcedColorsMediaQuery({
        outlineOffset: '-1px',
      }),
    '& > summary': {
      all: 'unset',
      gridArea: '1/1/auto/-1',
      zIndex: 1,
      display: 'grid',
      gridTemplateColumns: 'subgrid',
      alignItems: 'center',
      cursor: 'pointer',
      listStyle: 'none',
      padding: `${ref(cssVarPaddingBlock, ref(cssVarPadBlock))} ${ref(cssVarPaddingInline, ref(cssVarPadInline))}`,
      margin: `calc(-1 * ${ref(cssVarPaddingBlock, ref(cssVarPadBlock))}) calc(-1 * ${ref(cssVarPaddingInline, ref(cssVarPadInline))})`,
      '&::-webkit-details-marker': {
        display: 'none',
      },
      '&::marker': {
        content: 'none',
      },
      '& > *': {
        gridColumn: 1,
        minWidth: 0,
      },
      '&:focus-visible::before': getFocusBaseStyles(),
      ...hoverMediaQuery({
        '&:hover::before': {
          background: ref(colorFrosted),
        },
      }),
      '&::before': {
        gridArea: '1/2',
        placeSelf: 'center',
        content: '""',
        width: '1.5rem',
        height: '1.5rem',
        pointerEvents: 'none',
        borderRadius: ref(radiusFull),
        background: 'transparent',
        transition: getTransition('background-color'),
      },
      '&::after': {
        gridArea: '1/2',
        placeSelf: 'center',
        content: '""',
        width: '1rem',
        height: '1rem',
        pointerEvents: 'none',
        WebkitMask: `${iconMarker} center/contain no-repeat`,
        mask: `${iconMarker} center/contain no-repeat`,
        background: ref(colorPrimary),
        transform: 'rotate3d(0)',
        transition: getTransition('transform', 'short', 'out'),
        ...forcedColorsMediaQuery({
          backgroundColor: 'LinkText',
        }),
      },
    },
    '&[data-p-align-marker="start"] > summary > *': {
      gridColumn: 2,
    },
    '&[data-p-align-marker="start"] > summary::before, &[data-p-align-marker="start"] > summary::after': {
      gridArea: '1/1',
    },
    '&[open] > summary::after': {
      transform: 'rotate3d(0,0,1,180deg)',
      transition: getTransition('transform', 'moderate', 'in'),
    },
    '&[data-p-sticky="true"][data-p-background="canvas"] > summary, &[data-p-sticky="true"][data-p-background="surface"] > summary':
      {
        position: 'sticky',
        top: ref(cssVarSummaryTop, ref(cssVarSummaryTopDeprecated, '0px')),
        background: `linear-gradient(180deg,${ref(cssVarBackground)} 0%,${ref(cssVarBackground)} 90%,transparent 100%)`,
        borderRadius: ref(cssVarRadius),
      },
    '& > :not(summary)': {
      gridArea: '2/1/auto/-1',
      zIndex: 0,
      display: 'grid',
      minHeight: 0,
      opacity: 0,
      marginTop: '0px',
      gridTemplateRows: '0fr',
      visibility: 'hidden',
      overflow: 'hidden',
      transform: 'translate3d(0,0,0)',
      transition: `visibility 0s linear ${ref(cssVariableTransitionDuration, motionDurationMap.short)}, ${getTransition('grid-template-rows', 'short', 'out')}, ${getTransition('padding-top', 'short', 'out')}, ${getTransition('opacity', 'short', 'out')}`,
      '& > *': {
        minHeight: 0,
        overflow: 'hidden',
      },
    },
    '&[open] > :not(summary)': {
      opacity: 1,
      paddingTop: paddingBlock,
      zIndex: 2,
      paddingInline: ref(cssVarPaddingInline, ref(cssVarPadInline)),
      marginInline: `calc(-1 * ${ref(cssVarPaddingInline, ref(cssVarPadInline))})`,
      gridTemplateRows: '1fr',
      visibility: 'inherit',
      overflow: 'visible',
      transition: `visibility 0s linear 0s, ${getTransition('grid-template-rows', 'moderate', 'in')}, ${getTransition('margin-top', 'moderate', 'in')}, ${getTransition('opacity', 'moderate', 'in')}`,
      '& > *': {
        overflow: 'visible',
      },
    },
    ...responsiveIndent(),
  } as JssStyle),
});

export const getNativeAccordionCss = (): string =>
  inheritColorScheme('.p-accordion', toLayeredCss(getNativeAccordionStyles()));
