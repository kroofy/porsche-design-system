import { rewriteShadowElementCss } from '../to-light-dom-css';
import { LINK_ROOT_CLASS } from './link.appearance';

export const rewriteShadowLinkCss = (shadowCss: string): string =>
  rewriteShadowElementCss(shadowCss, LINK_ROOT_CLASS);
