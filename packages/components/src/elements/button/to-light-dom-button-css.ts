import { rewriteShadowElementCss } from '../to-light-dom-css';
import { BUTTON_ROOT_CLASS } from './button.appearance';

export const rewriteShadowButtonCss = (shadowCss: string): string =>
  rewriteShadowElementCss(shadowCss, BUTTON_ROOT_CLASS);
