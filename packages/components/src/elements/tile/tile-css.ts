import { gradientToBottomStyle, gradientToTopStyle } from '@porsche-design-system/emotion';
import {
  colorCanvas,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radius3Xl,
  ref,
  spacingFluidLg,
  spacingFluidMd,
  spacingStaticMd,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { getDisabledBaseStyles, getFocusBaseStyles, getTransition, hoverMediaQuery } from '../../styles';
import { sizeMap, weightMap } from '../../styles/maps';
import { getCss, mergeDeep } from '../../utils';
import { RESPONSIVE_BREAKPOINTS } from '../appearance';
import { mediaQueryMin } from '../appearance-mq';
import {
  BUTTON_TILE_ACTION_CLASS,
  BUTTON_TILE_ACTION_COMPACT_CLASS,
  BUTTON_TILE_CONTENT_CLASS,
  BUTTON_TILE_DESCRIPTION_CLASS,
  BUTTON_TILE_FOOTER_CLASS,
  BUTTON_TILE_HEADER_CLASS,
  BUTTON_TILE_MEDIA_CLASS,
  BUTTON_TILE_ROOT_CLASS,
  LINK_TILE_ACTION_CLASS,
  LINK_TILE_ACTION_COMPACT_CLASS,
  LINK_TILE_CONTENT_CLASS,
  LINK_TILE_DESCRIPTION_CLASS,
  LINK_TILE_FOOTER_CLASS,
  LINK_TILE_HEADER_CLASS,
  LINK_TILE_MEDIA_CLASS,
  LINK_TILE_ROOT_CLASS,
  TILE_ASPECT_RATIOS,
  TILE_SIZES,
  TILE_WEIGHTS,
} from './tile.appearance';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const colorSchemeDark = (selector: string, layered: string): string => `${selector}{color-scheme:dark}\n${layered}`;

type TileCssConfig = {
  rootClass: string;
  mediaClass: string;
  headerClass: string;
  contentClass: string;
  descriptionClass: string;
  footerClass: string;
  actionClass: string;
  actionCompactClass: string;
  isButton: boolean;
};

const BUTTON_TILE_CONFIG: TileCssConfig = {
  rootClass: BUTTON_TILE_ROOT_CLASS,
  mediaClass: BUTTON_TILE_MEDIA_CLASS,
  headerClass: BUTTON_TILE_HEADER_CLASS,
  contentClass: BUTTON_TILE_CONTENT_CLASS,
  descriptionClass: BUTTON_TILE_DESCRIPTION_CLASS,
  footerClass: BUTTON_TILE_FOOTER_CLASS,
  actionClass: BUTTON_TILE_ACTION_CLASS,
  actionCompactClass: BUTTON_TILE_ACTION_COMPACT_CLASS,
  isButton: true,
};

const LINK_TILE_CONFIG: TileCssConfig = {
  rootClass: LINK_TILE_ROOT_CLASS,
  mediaClass: LINK_TILE_MEDIA_CLASS,
  headerClass: LINK_TILE_HEADER_CLASS,
  contentClass: LINK_TILE_CONTENT_CLASS,
  descriptionClass: LINK_TILE_DESCRIPTION_CLASS,
  footerClass: LINK_TILE_FOOTER_CLASS,
  actionClass: LINK_TILE_ACTION_CLASS,
  actionCompactClass: LINK_TILE_ACTION_COMPACT_CLASS,
  isButton: false,
};

const gradientBottom = gradientToBottomStyle.background.replaceAll('0,0%,0%,', `from ${ref(colorCanvas)} h s l / `);
const gradientTop = gradientToTopStyle.background.replaceAll('0,0%,0%,', `from ${ref(colorCanvas)} h s l / `);

const responsiveBooleanStyles = (name: string, apply: (value: boolean) => JssStyle): JssStyle => {
  const styles: JssStyle = {
    [`&[data-p-${name}="true"]`]: apply(true),
    [`&[data-p-${name}="false"]`]: apply(false),
  };
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    Object.assign(styles, {
      [mediaQueryMin(breakpoint)]: {
        [`&[data-p-${name}-${breakpoint}="true"]`]: apply(true),
        [`&[data-p-${name}-${breakpoint}="false"]`]: apply(false),
      },
    });
  }
  return styles;
};

const responsiveTokenStyles = (
  name: string,
  tokens: readonly string[],
  apply: (value: string) => JssStyle
): JssStyle => {
  const styles: JssStyle = {};
  for (const token of tokens) {
    styles[`&[data-p-${name}="${token}"]`] = apply(token);
  }
  for (const breakpoint of RESPONSIVE_BREAKPOINTS) {
    const mq: JssStyle = {};
    for (const token of tokens) {
      mq[`&[data-p-${name}-${breakpoint}="${token}"]`] = apply(token);
    }
    Object.assign(styles, { [mediaQueryMin(breakpoint)]: mq });
  }
  return styles;
};

const contentLayout = (compact: boolean): JssStyle =>
  compact
    ? {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) auto',
        columnGap: ref(spacingStaticMd),
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      };

const actionVisibility = (compact: boolean): JssStyle => ({
  display: compact ? 'none' : 'inline-block',
});

const actionCompactVisibility = (compact: boolean): JssStyle => ({
  display: compact ? 'inline-block' : 'none',
});

const mediaFill: JssStyle = {
  display: 'block',
  width: '100%',
  height: '100%',
};

const getNativeTileStyles = (config: TileCssConfig): Styles => {
  const {
    rootClass,
    mediaClass,
    headerClass,
    contentClass,
    descriptionClass,
    footerClass,
    actionClass,
    actionCompactClass,
    isButton,
  } = config;

  const hoverTarget = isButton ? '&:hover:not(:disabled)' : '&:hover';
  const hoverScale = hoverMediaQuery({
    [`${hoverTarget} .${mediaClass} > img`]: {
      transform: 'scale3d(1.05,1.05,1.05)',
    },
    [`${hoverTarget} .${mediaClass} > video`]: {
      transform: 'scale3d(1.05,1.05,1.05)',
    },
    [`${hoverTarget} .${mediaClass} > picture`]: {
      transform: 'scale3d(1.05,1.05,1.05)',
    },
  });

  return {
    [rootClass]: mergeDeep(
      {
        all: 'unset',
        display: 'grid',
        gridTemplate: `${ref(spacingFluidMd)} auto minmax(0px, 1fr) auto ${ref(spacingFluidMd)}/${ref(spacingFluidMd)} minmax(0px, 1fr) ${ref(spacingFluidMd)}`,
        aspectRatio: '4/3',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: ref(radius3Xl),
        hyphens: 'auto',
        cursor: isButton ? 'pointer' : 'pointer',
        textAlign: 'start',
        color: ref(colorPrimary),
        '@supports (-webkit-hyphens: auto)': {
          height: '100%',
          alignItems: 'baseline',
        },
        '&[hidden]': {
          display: 'none !important',
        },
        ...(isButton
          ? {
              '&:disabled': {
                cursor: 'not-allowed',
              },
              '&:disabled:not([data-p-loading]) .p-button': getDisabledBaseStyles(),
            }
          : {}),
        '&:focus-visible': getFocusBaseStyles(),
        [`& .${mediaClass}`]: {
          position: 'relative',
          gridArea: '1/1/-1 /-1',
          zIndex: 1,
          overflow: 'hidden',
          borderRadius: 'inherit',
        },
        [`& .${mediaClass} > img`]: {
          ...mediaFill,
          objectFit: 'cover',
          transition: getTransition('transform', 'moderate'),
        },
        [`& .${mediaClass} > video`]: {
          ...mediaFill,
          objectFit: 'cover',
          transition: getTransition('transform', 'moderate'),
        },
        [`& .${mediaClass} > picture`]: {
          ...mediaFill,
          transition: getTransition('transform', 'moderate'),
        },
        [`& .${mediaClass} > picture > img`]: {
          ...mediaFill,
          objectFit: 'cover',
        },
        [`& .${headerClass}`]: {
          gridArea: '2/2',
          zIndex: 5,
        },
        [`& .${contentClass}`]: {
          gridArea: '4/2',
          zIndex: 3,
          ...contentLayout(false),
        },
        [`& .${descriptionClass}`]: {
          all: 'unset',
          zIndex: 3,
          maxWidth: '34.375rem',
          font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
          fontSize: sizeMap.medium,
          fontWeight: weightMap['semi-bold'],
          color: ref(colorPrimary),
          hyphens: 'inherit',
        },
        [`& .${footerClass}`]: {
          gridRow: 2,
          zIndex: 3,
        },
        [`& .${actionClass}`]: {
          minHeight: '54px',
          zIndex: 5,
          marginTop: ref(spacingStaticMd),
          pointerEvents: 'none',
          ...actionVisibility(false),
        },
        [`& .${actionCompactClass}`]: {
          zIndex: 5,
          gridColumn: 2,
          gridRow: '1/2',
          alignSelf: 'flex-end',
          pointerEvents: 'none',
          ...actionCompactVisibility(false),
        },
        [`&:has(.${footerClass}:not(:empty)) .${actionCompactClass}`]: {
          gridRow: '1/3',
        },
        '&[data-p-align="top"]': {
          [`& .${headerClass}`]: {
            gridArea: '4/2',
          },
          [`& .${contentClass}`]: {
            gridArea: '2/2',
          },
          [`& .${actionCompactClass}`]: {
            alignSelf: 'flex-start',
          },
        },
        '&[data-p-gradient="true"]::after': {
          content: '""',
          zIndex: 2,
          gridArea: '4/1/6/-1',
          background: gradientTop,
          marginTop: `calc(${ref(spacingFluidLg)} * -1)`,
          borderEndStartRadius: 'inherit',
          borderEndEndRadius: 'inherit',
        },
        '&[data-p-align="top"][data-p-gradient="true"]::after': {
          gridArea: '1/1/3/-1',
          background: gradientBottom,
          marginTop: 0,
          marginBottom: `calc(${ref(spacingFluidLg)} * -1)`,
          borderEndStartRadius: 0,
          borderEndEndRadius: 0,
          borderStartStartRadius: 'inherit',
          borderStartEndRadius: 'inherit',
        },
        ...hoverScale,
      } as JssStyle,
      responsiveTokenStyles('aspect-ratio', TILE_ASPECT_RATIOS, (aspectRatio) => ({
        aspectRatio,
      })),
      responsiveTokenStyles('size', TILE_SIZES, (size) => ({
        [`& .${descriptionClass}`]: {
          fontSize: sizeMap[size as keyof typeof sizeMap],
        },
      })),
      responsiveTokenStyles('weight', TILE_WEIGHTS, (weight) => ({
        [`& .${descriptionClass}`]: {
          fontWeight: weightMap[weight as keyof typeof weightMap],
        },
      })),
      responsiveBooleanStyles('compact', (compact) => ({
        [`& .${contentClass}`]: contentLayout(compact),
        [`& .${actionClass}`]: actionVisibility(compact),
        [`& .${actionCompactClass}`]: actionCompactVisibility(compact),
      }))
    ),
  };
};

export const getNativeButtonTileCss = (): string =>
  colorSchemeDark('.p-button-tile', toLayeredCss(getNativeTileStyles(BUTTON_TILE_CONFIG)));

export const getNativeLinkTileCss = (): string =>
  colorSchemeDark('.p-link-tile', toLayeredCss(getNativeTileStyles(LINK_TILE_CONFIG)));
