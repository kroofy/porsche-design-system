import { gridExtendedOffsetBase } from '@porsche-design-system/emotion';
import {
  blurFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  radius2Xl,
  ref,
  shadowLg,
  spacingFluidSm,
  spacingStatic2Xs,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { getFCDismissButtonStyles } from '../../components/common/fc-dismiss-button/fc-dismiss-button-styles';
import { forcedColorsMediaQuery, getTransition } from '../../styles';
import { notificationBackgroundMap, notificationColorMap, notificationIconMap } from '../../styles/maps';
import { getCss, mergeDeep } from '../../utils';
import { overlayTransitionSupportsQuery } from '../../utils/top-layer/supportsOverlayTransition';
import { RESPONSIVE_BREAKPOINTS } from '../appearance';
import { mediaQueryMin } from '../appearance-mq';
import {
  BANNER_DISMISS_CLASS,
  BANNER_POSITIONS,
  BANNER_ROOT_CLASS,
  type BannerPosition,
  type BannerState,
} from './banner.appearance';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const popoverHost = (selector: string, layered: string): string =>
  `${selector},${selector} .${BANNER_DISMISS_CLASS}{color-scheme:inherit}\n${selector}{position:fixed;margin:0;border:none;overflow:visible}\n${selector}:popover-open{display:grid}\n${layered}`;

const cssVarMaxWidth = '--p-banner-max-w';
const cssVarTop = '--p-banner-top';
const cssVarBottom = '--p-banner-bottom';
const cssVarInsetX = '--p-banner-inset-x';
const cssVarPositionTop = '--p-banner-position-top';
const cssVarPositionBottom = '--p-banner-position-bottom';
const cssVarTransform = '--_p-banner-a';
const topBottomFallback = '56px';

const HEADING_CHILD = '& > h1, & > h2, & > h3, & > h4, & > h5, & > h6';
const HAS_HEADING_DESCRIPTION =
  '&:has(> h1) > p, &:has(> h2) > p, &:has(> h3) > p, &:has(> h4) > p, &:has(> h5) > p, &:has(> h6) > p';
const HAS_HEADING_BEFORE =
  '&:has(> h1)::before, &:has(> h2)::before, &:has(> h3)::before, &:has(> h4)::before, &:has(> h5)::before, &:has(> h6)::before, &:has(> p-heading)::before';

const stateIcon = (state: BannerState): JssStyle => ({
  background: notificationColorMap[state],
  WebkitMask: `${notificationIconMap[state]} center/contain no-repeat`,
  mask: `${notificationIconMap[state]} center/contain no-repeat`,
});

const positionLayout = (position: BannerPosition): JssStyle =>
  position === 'top'
    ? {
        [cssVarTransform]: `translate3d(-50%,calc(-100% - ${ref(cssVarTop, ref(cssVarPositionTop, topBottomFallback))}),0)`,
        insetBlock: `${ref(cssVarTop, ref(cssVarPositionTop, topBottomFallback))} auto`,
      }
    : {
        [cssVarTransform]: `translate3d(-50%,calc(${ref(cssVarBottom, ref(cssVarPositionBottom, topBottomFallback))} + 100%),0)`,
        insetBlock: `auto ${ref(cssVarBottom, ref(cssVarPositionBottom, topBottomFallback))}`,
      };

const responsivePositionStyles = (): JssStyle => {
  const styles: JssStyle = {};
  for (const token of BANNER_POSITIONS) {
    styles[`&[data-p-position="${token}"]`] = positionLayout(token);
  }
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    const mq: JssStyle = {};
    for (const token of BANNER_POSITIONS) {
      mq[`&[data-p-position-${breakpoint}="${token}"]`] = positionLayout(token);
    }
    Object.assign(styles, { [mediaQueryMin(breakpoint)]: mq });
  }
  return styles;
};

const getNativeBannerStyles = (): Styles => {
  const transition = getTransition('transform', 'moderate', 'in');
  return {
    [BANNER_ROOT_CLASS]: mergeDeep(
      {
        all: 'unset',
        boxSizing: 'border-box',
        display: 'none',
        position: 'fixed',
        left: '50vw',
        width: `min(calc(100vw - 2 * ${ref(cssVarInsetX, gridExtendedOffsetBase)}),${ref(cssVarMaxWidth, '100ch')})`,
        boxShadow: ref(shadowLg),
        gridTemplate: 'repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto)',
        padding: `calc(${ref(spacingStaticSm)} + ${ref(spacingFluidSm)})`,
        borderRadius: ref(radius2Xl),
        background: notificationBackgroundMap.info,
        WebkitBackdropFilter: ref(blurFrosted),
        backdropFilter: ref(blurFrosted),
        transform: ref(cssVarTransform),
        transition,
        overlay: 'none',
        ...positionLayout('bottom'),
        '&[hidden]': {
          display: 'none !important',
        },
        '&::backdrop': {
          display: 'none',
        },
        '&:popover-open': {
          overlay: 'auto',
          display: 'grid',
          transform: 'translate3d(-50%,0,0)',
        },
        ...overlayTransitionSupportsQuery({
          transition: `${transition},${getTransition('overlay', 'moderate', 'in')} allow-discrete, ${getTransition('display', 'moderate', 'in')} allow-discrete`,
        }),
        ...forcedColorsMediaQuery({
          outline: '2px solid CanvasText',
          outlineOffset: '-2px',
        }),
        '&[data-p-state="success"]': {
          background: notificationBackgroundMap.success,
        },
        '&[data-p-state="warning"]': {
          background: notificationBackgroundMap.warning,
        },
        '&[data-p-state="error"]': {
          background: notificationBackgroundMap.error,
        },
        [HEADING_CHILD]: {
          all: 'unset',
          gridArea: '1/2',
          font: `${ref(fontWeightSemibold)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
          color: ref(colorPrimary),
        },
        '& > p': {
          all: 'unset',
          gridArea: '1/2',
          marginTop: '0px',
          font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
          color: ref(colorPrimary),
        },
        [HAS_HEADING_DESCRIPTION]: {
          gridArea: '2/2',
          marginTop: ref(spacingStaticXs),
        },
        '& > p-heading': {
          gridArea: '1/2',
        },
        '& > p-text': {
          gridArea: '1/2',
        },
        '&:has(> p-heading) > p-text, &:has(> p-heading) > p': {
          gridArea: '2/2',
          marginTop: ref(spacingStaticXs),
        },
        [`& .${BANNER_DISMISS_CLASS}`]: {
          ...getFCDismissButtonStyles('frosted'),
          colorScheme: 'inherit',
          gridArea: '1/4/-1',
          alignSelf: 'flex-start',
          marginBlock: `calc(-6 * ${ref(spacingStatic2Xs)})`,
          marginInline: `${ref(spacingStaticMd)} calc(-6 * ${ref(spacingStatic2Xs)})`,
        },
      } as JssStyle,
      {
        [mediaQueryMin('s')]: {
          '&:not([data-p-position])': positionLayout('top'),
          '&::before': {
            gridArea: '1/1',
            placeSelf: 'flex-start',
            content: '""',
            width: '1.5rem',
            height: '1.5rem',
            marginInlineEnd: ref(spacingStaticSm),
            ...stateIcon('info'),
            ...forcedColorsMediaQuery({
              background: 'CanvasText',
            }),
          },
          [HAS_HEADING_BEFORE]: {
            placeSelf: 'center',
          },
          '&[data-p-state="success"]::before': stateIcon('success'),
          '&[data-p-state="warning"]::before': stateIcon('warning'),
          '&[data-p-state="error"]::before': stateIcon('error'),
        },
      },
      responsivePositionStyles()
    ),
  };
};

export const getNativeBannerCss = (): string => popoverHost('.p-banner', toLayeredCss(getNativeBannerStyles()));
