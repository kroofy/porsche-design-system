/* mitosis-native-host: native react from ButtonPure.lite.tsx */
import * as React from 'react';





  import PSpinner from "../../../../spinner/output/frameworks/react/Spinner";
import PIcon from "../../../../icon/output/frameworks/react/Icon";
import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitButtonPureProps {
  className?: string;
type?: string;
size?: any;
color?: string;
underline?: any;
active?: any;
stretch?: any;
hideLabel?: any;
alignLabel?: any;
icon?: string;
iconSource?: string;
disabled?: any;
loading?: any;
name?: string;
value?: string;
aria?: any;
}





  function LitButtonPure(props:LitButtonPureProps) {

  function cssText() {
const sizeMap: any = {
'xx-small': 'var(--p-typescale-2xs)',
'x-small': 'var(--p-typescale-xs)',
small: 'var(--p-typescale-sm)',
medium: 'var(--p-typescale-md)',
large: 'var(--p-typescale-lg)',
'x-large': 'var(--p-typescale-xl)',
'xx-large': 'var(--p-typescale-2xl)',
'2xs': 'var(--p-typescale-2xs)',
xs: 'var(--p-typescale-xs)',
sm: 'var(--p-typescale-sm)',
md: 'var(--p-typescale-md)',
lg: 'var(--p-typescale-lg)',
xl: 'var(--p-typescale-xl)',
'2xl': 'var(--p-typescale-2xl)',
'3xl': 'var(--p-typescale-3xl)',
'4xl': 'var(--p-typescale-4xl)',
'5xl': 'var(--p-typescale-5xl)',
inherit: 'inherit'
};
const colorMap: any = {
primary: 'var(--p-color-primary)',
'contrast-higher': 'var(--p-color-contrast-higher)',
'contrast-high': 'var(--p-color-contrast-high)',
'contrast-medium': 'var(--p-color-contrast-medium)',
inherit: 'currentcolor'
};
const minWidth: any = {
xs: 480,
s: 760,
m: 1000,
l: 1300,
xl: 1760,
xxl: 1920
};
const parse = (raw: any, fallback: any) => {
if (raw === undefined || raw === null || raw === '') return fallback;
if (typeof raw === 'string' && raw.charAt(0) === '{') {
  try {
    return JSON.parse(raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":'));   } catch (e) {     return fallback;   } } return raw; }; const isTrue = (v: any) => v === true || v === 'true' || v === ''; const pick = (obj: any, key: any, fallback: any) => { if (obj && typeof obj === 'object') {   if (obj[key] === undefined) return fallback;   return obj[key]; } return obj; }; const disabled = isTrue(props.disabled); const loading = isTrue(props.loading); const blocked = disabled || loading; const color = disabled ? 'var(--p-color-contrast-low)' : colorMap[props.color || 'primary'] || colorMap.primary; const underline = isTrue(props.underline); const active = isTrue(props.active); const icon = props.icon || 'arrow-right'; const source = props.iconSource || ''; const hasIcon = icon !== 'none' || source !== ''; const size = parse(props.size, 'sm'); const stretch = parse(props.stretch, false); const hideLabel = parse(props.hideLabel, false); const alignLabel = parse(props.alignLabel, 'end'); const hostFor = (v: any) => isTrue(v) ? 'display:block;width:100%' : 'display:inline-block;width:auto;vertical-align:top'; const hideFor = (v: any) => isTrue(v); const alignStart = (v: any) => v === 'start' || v === 'left'; const fontFor = (s: any) => sizeMap[s] || sizeMap.sm; const gapFor = (hide: any) => hideFor(hide) ? '0' : 'var(--p-spacing-static-xs)'; const justFor = (st: any) => isTrue(st) ? 'space-between' : 'flex-start'; const alignItemsFor = (st: any) => isTrue(st) ? 'center' : 'flex-start'; const insetFor = (hide: any) => hideFor(hide) ? '-2px' : '-4px'; const radiusFor = (hide: any) => hideFor(hide) ? 'var(--p-radius-full)' : 'var(--p-radius-lg)'; const visFor = (hide: any) => hideFor(hide) ? 'white-space:nowrap;text-indent:-999999px;overflow:hidden' : 'white-space:inherit;text-indent:0;overflow:visible'; const orderFor = (al: any) => alignStart(al) ? '-1' : '0'; const sizeBase = typeof size === 'object' && size !== null ? size.base || 'sm' : size; const stretchBase = typeof stretch === 'object' && stretch !== null ? pick(stretch, 'base', false) : stretch; const hideBase = typeof hideLabel === 'object' && hideLabel !== null ? pick(hideLabel, 'base', false) : hideLabel; const alignBase = typeof alignLabel === 'object' && alignLabel !== null ? pick(alignLabel, 'base', 'end') : alignLabel; const activeBefore = active ? ';-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted);background-color:var(--p-color-frosted)' : ''; let out = ':host{' + hostFor(stretchBase) + '}' + ':not(:defined,[data-ssr]){visibility:hidden}' + '@media(forced-colors:active){.root{color:LinkText}.root:is(button){color:ButtonText}.root:focus-visible::before{outline-color:Highlight}}' + '.root{all:unset;display:flex;width:100%;cursor:' + (blocked ? 'not-allowed' : 'pointer') + ';color:' + color + ';text-decoration:' + (underline ? 'underline' : 'none') + ';font:var(--p-font-weight-normal) var(--p-typescale-sm)/var(--p-leading-normal) var(--p-font-porsche-next);gap:' + gapFor(hideBase) + ';justify-content:' + justFor(stretchBase) + ';align-items:' + alignItemsFor(stretchBase) + ';font-size:' + fontFor(sizeBase) + '}' + '.root::before{content:"";position:absolute;top:-2px;bottom:-2px;right:' + insetFor(hideBase) + ';left:' + insetFor(hideBase) + ';border-radius:' + radiusFor(hideBase) + ';transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)' + activeBefore + '}' + '.root:focus-visible::before{outline:2px solid var(--p-color-focus);outline-offset:2px}' + '.loading,#loading{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}'; if (!blocked) { out += '@media(hover:hover){.root:hover::before{-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted);background-color:var(--p-color-frosted-strong)}}'; } if (hasIcon) { out += '.icon,p-icon,p-spinner{position:relative;flex-shrink:0}.label{z-index:1;' + visFor(hideBase) + ';order:' + orderFor(alignBase) + '}'; } else if (loading) { out += '.label{position:relative;opacity:0}.icon,p-spinner{position:absolute;top:0;left:calc(50% - var(--p-leading-normal) / 2)}'; } else { out += '.label{position:relative}'; } if (loading) { out += 'p-icon{display:none}'; } else { out += 'p-spinner{display:none}'; if (!hasIcon) out += 'p-icon{display:none}'; } const keys: any = {}; if (typeof size === 'object' && size !== null) for (const k of Object.keys(size)) keys[k] = 1; if (typeof stretch === 'object' && stretch !== null) for (const k of Object.keys(stretch)) keys[k] = 1; if (typeof hideLabel === 'object' && hideLabel !== null) for (const k of Object.keys(hideLabel)) keys[k] = 1; if (typeof alignLabel === 'object' && alignLabel !== null) for (const k of Object.keys(alignLabel)) keys[k] = 1; for (const bp of Object.keys(keys)) { if (bp === 'base') continue; if (!minWidth[bp]) continue; const s = pick(size, bp, sizeBase); const st = pick(stretch, bp, stretchBase); const h = pick(hideLabel, bp, hideBase); const al = pick(alignLabel, bp, alignBase); out += '@media(min-width:' + minWidth[bp] + 'px){:host{' + hostFor(st) + '}.root{gap:' + gapFor(h) + ';justify-content:' + justFor(st) + ';align-items:' + alignItemsFor(st) + ';font-size:' + fontFor(s) + '}.root::before{right:' + insetFor(h) + ';left:' + insetFor(h) + ';border-radius:' + radiusFor(h) + '}.label{' + visFor(h) + ';order:' + orderFor(al) + '}}'; } return out; }   function iconName() { const icon = props.icon || 'arrow-right'; if (icon === 'none') return ''; return icon; }   function iconSrc() { if (props.iconSource) return props.iconSource; /* Landed LitIcon only maps car / arrow-right. Playground copy / like // would otherwise paint arrow-right. */ const files: any = { copy: 'copy.0fcd086.svg', like: 'like.a7468cd.svg' }; const icon = props.icon || 'arrow-right'; if (files[icon]) return 'http://localhost:3001/icons/' + files[icon]; return ''; }   function buttonType() { return props.type || 'submit'; }   function ariaDisabled() { const disabled = props.disabled === true || props.disabled === 'true' || props.disabled === ''; const loading = props.loading === true || props.loading === 'true' || props.loading === ''; return disabled || loading ? 'true' : ''; }   function loadingText() { const loading = props.loading === true || props.loading === 'true' || props.loading === ''; return loading ? 'Loading' : ''; }            return (
    <div
      className={["p-button-pure", props.className].filter(Boolean).join(" ")}
      data-pds="button-pure"
    >
      <button className="root"  type={buttonType()}><style  dangerouslySetInnerHTML={{ __html: scopeCss("     :host {       transform: translate3d(0, 0, 0) !important;     }     :host([hidden]) {       display: none !important;     }  " + cssText(), ".p-button-pure") }}  /><PIcon className="icon"  size="inherit"  color="inherit"  aria-hidden="true"  name={iconName()}  source={iconSrc()}  /><PSpinner className="icon"  size="inherit"  color="inherit"  aria-hidden="true"  /><span className="label">{props.children}</span><span className="loading"  id="loading"  role="status">{loadingText()}</span></button>
    </div>
  ); }       export default LitButtonPure;


