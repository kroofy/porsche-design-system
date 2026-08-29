export {
  BREAKPOINTS,
  LINK_ICON_CLASS,
  LINK_LABEL_CLASS,
  LINK_ROOT_CLASS,
  LINK_VARIANTS,
  linkAppearance,
  serializeResponsive,
} from './link.appearance';
export type { LinkAppearanceProps, LinkVariant, NativeAppearance, Responsive } from './link.appearance';
export { getNativeLinkCss } from '../link-button-css';
export { rewriteShadowLinkCss } from './to-light-dom-link-css';
