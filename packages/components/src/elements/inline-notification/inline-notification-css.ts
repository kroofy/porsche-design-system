import {
  blurFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  radius2Xl,
  ref,
  spacingFluidSm,
  spacingStatic2Xs,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { getFCDismissButtonStyles } from '../../components/common/fc-dismiss-button/fc-dismiss-button-styles';
import { forcedColorsMediaQuery } from '../../styles';
import { notificationBackgroundMap, notificationColorMap, notificationIconMap } from '../../styles/maps';
import { getCss } from '../../utils';
import { mediaQueryMin } from '../appearance-mq';
import {
  INLINE_NOTIFICATION_ACTION_CLASS,
  INLINE_NOTIFICATION_DISMISS_CLASS,
  INLINE_NOTIFICATION_ROOT_CLASS,
  type InlineNotificationState,
} from './inline-notification.appearance';

const toLayeredCss = (styles: Styles): string => `@layer pds.elements {\n${getCss(styles).trim()}\n}\n`;

const inheritColorScheme = (selector: string, layered: string): string =>
  `${selector}{color-scheme:inherit}\n${layered}`;

const HEADING_CHILD = '& > h1, & > h2, & > h3, & > h4, & > h5, & > h6';
const HAS_HEADING_DESCRIPTION =
  '&:has(> h1) > p, &:has(> h2) > p, &:has(> h3) > p, &:has(> h4) > p, &:has(> h5) > p, &:has(> h6) > p';
const HAS_HEADING_BEFORE =
  '&:has(> h1)::before, &:has(> h2)::before, &:has(> h3)::before, &:has(> h4)::before, &:has(> h5)::before, &:has(> h6)::before';

const stateIcon = (state: InlineNotificationState): JssStyle => ({
  background: notificationColorMap[state],
  WebkitMask: `${notificationIconMap[state]} center/contain no-repeat`,
  mask: `${notificationIconMap[state]} center/contain no-repeat`,
});

const getNativeInlineNotificationStyles = (): Styles => ({
  [INLINE_NOTIFICATION_ROOT_CLASS]: {
    display: 'grid',
    gridTemplate: 'repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto)',
    padding: `calc(${ref(spacingStaticSm)} + ${ref(spacingFluidSm)})`,
    borderRadius: ref(radius2Xl),
    background: notificationBackgroundMap.info,
    WebkitBackdropFilter: ref(blurFrosted),
    backdropFilter: ref(blurFrosted),
    '&[hidden]': {
      display: 'none !important',
    },
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
    [mediaQueryMin('s')]: {
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
    [`& .${INLINE_NOTIFICATION_DISMISS_CLASS}`]: {
      ...getFCDismissButtonStyles('frosted'),
      gridArea: '1/4/-1',
      alignSelf: 'flex-start',
      marginBlock: `calc(-6 * ${ref(spacingStatic2Xs)})`,
      marginInline: `${ref(spacingStaticMd)} calc(-6 * ${ref(spacingStatic2Xs)})`,
    },
    [`& .${INLINE_NOTIFICATION_ACTION_CLASS}`]: {
      gridArea: '3/1/auto/-1',
      marginTop: ref(spacingStaticMd),
      alignSelf: 'flex-start',
      [mediaQueryMin('s')]: {
        gridArea: '1/3',
        marginTop: '0px',
        marginInlineStart: ref(spacingStaticMd),
      },
    },
  } as JssStyle,
});

export const getNativeInlineNotificationCss = (): string =>
  inheritColorScheme('.p-inline-notification', toLayeredCss(getNativeInlineNotificationStyles()));
