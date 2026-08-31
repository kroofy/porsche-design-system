import * as React from 'react';





  export interface LitTagDismissibleProps {
label?: string;
compact?: any;
aria?: any;
}





  function LitTagDismissible(props:LitTagDismissibleProps) {

  function cssText() {
let compact: any = props.compact;
if (compact === true || compact === 'true' || compact === '') {
compact = true;
} else {
compact = false;
}
const hasLabel = !!(props.label && props.label !== '');
const scale = compact ? '0.64285714' : '1';
const radius = compact ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)';
const padBlock = hasLabel ? 'calc(16.8px * (var(--_p-tag-dismissible-a) - 0.64285714))' : 'calc(28px * (var(--_p-tag-dismissible-a) - 0.64285714) + 6px)';
const padInline = 'calc(22.4px * (var(--_p-tag-dismissible-a) - 0.64285714) + 4px)';
const gap = padInline;
const iconPad = 'calc(11.2px * (var(--_p-tag-dismissible-a) - 0.64285714))';
const labelRule = hasLabel ? '.label,button>span:nth-of-type(2)>span{display:block;margin-bottom:-4px;color:var(--p-color-contrast-high);font-size:var(--p-typescale-xs)}' : '.label,button>span:nth-of-type(2)>span{display:none}';
return ':host{--_p-tag-dismissible-a:' + scale + '}' + ':not(:defined,[data-ssr]){visibility:hidden}' + 'button{all:unset;display:flex;position:relative;align-items:center;gap:' + gap + ';padding:' + padBlock + ' ' + padInline + ';border-radius:' + radius + ';cursor:pointer;background:var(--p-color-frosted);color:var(--p-color-primary);text-align:start;font:var(--p-font-weight-normal) var(--p-typescale-sm)/var(--p-leading-normal) var(--p-font-porsche-next)}' + 'button:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}' + '@media(forced-colors:active){button{outline:2px solid CanvasText;outline-offset:-2px}button:focus-visible{outline-color:Highlight}}' + '@media(hover:hover){button:hover>.icon{background-color:var(--p-color-frosted)}}' + labelRule + '.icon,button>span:last-of-type{padding:' + iconPad + ';margin:calc(-1 * ' + iconPad + ');transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);border-radius:var(--p-radius-full)}' + '.sr-only,span.sr-only,button>span:first-of-type{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}';
}


function ariaLabel() {
let raw: any = props.aria;
if (!raw) return '';
if (typeof raw === 'string') {
try {
  raw = JSON.parse(raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')); } catch (e) {   raw = null; } } if (typeof raw === 'object' && raw !== null) return raw['aria-label'] || ''; return ''; }   function labelText() { return props.label || ''; }   function closeIconSrc() { // Landed LitIcon only maps car / arrow-right. name="close" would paint // arrow-right. Feed the CDN close SVG so the nested p-icon matches the // stored Stencil baseline. return 'http://localhost:3001/icons/close.eec3c5d.svg'; }            return (   <>    <button  type="button"  aria-label={ariaLabel()}><style  dangerouslySetInnerHTML={{__html: cssText()}}  /><span className="sr-only">Remove:</span><span><span className="label">{labelText()}</span><slot  /></span><span className="icon"><p-icon  name="close"  aria-hidden="true"  source={closeIconSrc()}  /></span></button>   <style jsx>{`     :host {       display: inline-block;       vertical-align: top;     }     :host([hidden]) {       display: none !important;     }  `}</style>   </> ); }       export default LitTagDismissible;


