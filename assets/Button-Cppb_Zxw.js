import{S as V,i as W,s as X,c as Y,a as K,d as Z,v as R,t as E,b as J,u as $,g as nn,e as tn,f as on,p as x,h as D,j as an,k as rn,l as C,w as M,m as G,H as pn,n as ln,x as Q,o as en,q as U}from"./svelte-DoO7z26N.js";import{s as bn,h as sn}from"./host-DRskmCSE.js";import un from"./Spinner-CHLfbpXm.js";import dn from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function cn(p){let o,r,z=`<style>${vn}</style>`,L,s,u,c,y,w,g,_=p[2]()+"",j,k,m,i;u=new dn({props:{class:"icon",size:"inherit",color:"inherit","aria-hidden":"true",name:p[5](),source:p[4]()}}),c=new un({props:{class:"spinner",size:"inherit","aria-hidden":"true"}});const H=p[17].default,l=Y(H,p,p[16],null);let S=[{class:m="p-button"+(p[6].class?` ${p[6].class}`:"")},{"data-pds":"button"},{style:p[1]},p[0]],f={};for(let t=0;t<S.length;t+=1)f=K(f,S[t]);return{c(){o=G("div"),r=new pn(!1),L=ln(),s=G("button"),Q(u.$$.fragment),Q(c.$$.fragment),y=G("span"),w=G("span"),l&&l.c(),g=G("span"),j=en(_),r.a=L,x(w,"data-pds-slot",""),x(y,"class","label"),x(g,"class","loading"),x(g,"id","loading"),x(g,"role","status"),x(s,"class","root"),x(s,"type",k=p[3]()),D(o,f)},m(t,e){rn(t,o,e),r.m(z,o),C(o,L),C(o,s),M(u,s,null),M(c,s,null),C(s,y),C(y,w),l&&l.m(w,null),C(s,g),C(g,j),i=!0},p(t,[e]){const h={};e&32&&(h.name=t[5]()),e&16&&(h.source=t[4]()),u.$set(h),l&&l.p&&(!i||e&65536)&&$(l,H,t,t[16],i?tn(H,t[16],e,null):nn(t[16]),null),(!i||e&4)&&_!==(_=t[2]()+"")&&on(j,_),(!i||e&8&&k!==(k=t[3]()))&&x(s,"type",k),D(o,f=an(S,[(!i||e&64&&m!==(m="p-button"+(t[6].class?` ${t[6].class}`:"")))&&{class:m},{"data-pds":"button"},(!i||e&2)&&{style:t[1]},e&1&&t[0]]))},i(t){i||(J(u.$$.fragment,t),J(c.$$.fragment,t),J(l,t),i=!0)},o(t){E(u.$$.fragment,t),E(c.$$.fragment,t),E(l,t),i=!1},d(t){t&&Z(o),R(u),R(c),l&&l.d(t)}}}const vn=`.p-button :where([data-pds-slot]){display:contents}

  .p-button {
    display: inline-block;
    vertical-align: top;
    --_p-button-a: var(--p-btn-scale);
    --_p-link-button-a: var(--p-btn-br);
    border-radius: var(--p-btn-host-r) !important;
  }
  .p-button[hidden] {
    display: none !important;
  }
  .p-button .root{
    all: unset;
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: min-content;
    box-sizing: border-box;
    -webkit-backdrop-filter: var(--p-blur-frosted);
    backdrop-filter: var(--p-blur-frosted);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    border-radius: inherit;
    transform: translate3d(0, 0, 0);
    background-color: var(--p-btn-bg);
    color: var(--p-btn-fg);
    cursor: pointer;
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      border-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    padding: var(--p-btn-pad);
    gap: var(--p-btn-gap);
  }
  .p-button[disabled] .root,
  .p-button[loading] .root {
    cursor: not-allowed;
  }
  .p-button[disabled] .root {
    opacity: 0.4;
  }
  .p-button .root:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-button .label{
    position: var(--p-btn-l-pos);
    width: var(--p-btn-l-w);
    height: var(--p-btn-l-h);
    padding: var(--p-btn-l-pad);
    margin: var(--p-btn-l-m);
    overflow: var(--p-btn-l-ov);
    clip: var(--p-btn-l-clip);
    white-space: var(--p-btn-l-ws);
    transition: opacity var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
  }
  .p-button[loading]:not([disabled]) .label,
  .p-button[loading]:not([disabled]) .icon {
    opacity: 0;
  }
  .p-button[disabled] .label,
  .p-button[disabled] .icon {
    opacity: 0.4;
  }
  .p-button .icon{
    font: var(--p-typescale-sm) var(--p-font-porsche-next);
    width: var(--p-leading-normal);
    height: var(--p-leading-normal);
    margin-inline-start: var(--p-btn-icon-m);
    transition: opacity var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
  }
  .p-button:not([icon-source]):not([icon]) .p-icon,
  .p-button[icon="none"]:not([icon-source]) .p-icon,
  .p-button[icon=""]:not([icon-source]) .p-icon {
    display: none;
  }
  .p-button .spinner{
    --p-spinner-color: currentcolor;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .p-button:not([loading]) .p-spinner {
    display: none;
  }
  .p-button .loading{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  @media (forced-colors: active) {
    .p-button .root{
      forced-color-adjust: none;
      background: Canvas;
      color: LinkText;
      box-shadow: inset 0 0 0 2px LinkText;
    }
    .p-button .root:is(button){
      box-shadow: inset 0 0 0 2px ButtonBorder;
      color: ButtonText;
    }
    .p-button .root:focus-visible{
      outline-color: Highlight;
    }
    .p-button[disabled] .root {
      color: GrayText;
      box-shadow: inset 0 0 0 2px GrayText !important;
      opacity: 1;
    }
    .p-button[disabled] .root:is(button) {
      box-shadow: inset 0 0 0 2px ButtonBorder;
      color: ButtonText;
    }
    .p-button[disabled] .label,
    .p-button[disabled] .icon {
      opacity: 1;
      color: GrayText;
    }
  }
  @media (hover: hover) {
    .p-button:not([disabled]):not([loading]) .root:hover {
      color: var(--p-btn-hfg);
      background-color: var(--p-btn-hbg);
    }
    @media (forced-colors: active) {
      .p-button:not([disabled]):not([loading]) .root:hover {
        background: Canvas;
      }
    }
  }
  @media (min-width: 480px) {
    .p-button {
      --_p-button-a: var(--p-btn-scale-xs);
      --_p-link-button-a: var(--p-btn-br-xs);
      border-radius: var(--p-btn-host-r-xs) !important;
    }
    .p-button .root{
      padding: var(--p-btn-pad-xs);
      gap: var(--p-btn-gap-xs);
    }
    .p-button .label{
      position: var(--p-btn-l-pos-xs);
      width: var(--p-btn-l-w-xs);
      height: var(--p-btn-l-h-xs);
      padding: var(--p-btn-l-pad-xs);
      margin: var(--p-btn-l-m-xs);
      overflow: var(--p-btn-l-ov-xs);
      clip: var(--p-btn-l-clip-xs);
      white-space: var(--p-btn-l-ws-xs);
    }
    .p-button .icon{
      margin-inline-start: var(--p-btn-icon-m-xs);
    }
  }
  @media (min-width: 760px) {
    .p-button {
      --_p-button-a: var(--p-btn-scale-s);
      --_p-link-button-a: var(--p-btn-br-s);
      border-radius: var(--p-btn-host-r-s) !important;
    }
    .p-button .root{
      padding: var(--p-btn-pad-s);
      gap: var(--p-btn-gap-s);
    }
    .p-button .label{
      position: var(--p-btn-l-pos-s);
      width: var(--p-btn-l-w-s);
      height: var(--p-btn-l-h-s);
      padding: var(--p-btn-l-pad-s);
      margin: var(--p-btn-l-m-s);
      overflow: var(--p-btn-l-ov-s);
      clip: var(--p-btn-l-clip-s);
      white-space: var(--p-btn-l-ws-s);
    }
    .p-button .icon{
      margin-inline-start: var(--p-btn-icon-m-s);
    }
  }
  @media (min-width: 1000px) {
    .p-button {
      --_p-button-a: var(--p-btn-scale-m);
      --_p-link-button-a: var(--p-btn-br-m);
      border-radius: var(--p-btn-host-r-m) !important;
    }
    .p-button .root{
      padding: var(--p-btn-pad-m);
      gap: var(--p-btn-gap-m);
    }
    .p-button .label{
      position: var(--p-btn-l-pos-m);
      width: var(--p-btn-l-w-m);
      height: var(--p-btn-l-h-m);
      padding: var(--p-btn-l-pad-m);
      margin: var(--p-btn-l-m-m);
      overflow: var(--p-btn-l-ov-m);
      clip: var(--p-btn-l-clip-m);
      white-space: var(--p-btn-l-ws-m);
    }
    .p-button .icon{
      margin-inline-start: var(--p-btn-icon-m-m);
    }
  }
  @media (min-width: 1300px) {
    .p-button {
      --_p-button-a: var(--p-btn-scale-l);
      --_p-link-button-a: var(--p-btn-br-l);
      border-radius: var(--p-btn-host-r-l) !important;
    }
    .p-button .root{
      padding: var(--p-btn-pad-l);
      gap: var(--p-btn-gap-l);
    }
    .p-button .label{
      position: var(--p-btn-l-pos-l);
      width: var(--p-btn-l-w-l);
      height: var(--p-btn-l-h-l);
      padding: var(--p-btn-l-pad-l);
      margin: var(--p-btn-l-m-l);
      overflow: var(--p-btn-l-ov-l);
      clip: var(--p-btn-l-clip-l);
      white-space: var(--p-btn-l-ws-l);
    }
    .p-button .icon{
      margin-inline-start: var(--p-btn-icon-m-l);
    }
  }
  @media (min-width: 1760px) {
    .p-button {
      --_p-button-a: var(--p-btn-scale-xl);
      --_p-link-button-a: var(--p-btn-br-xl);
      border-radius: var(--p-btn-host-r-xl) !important;
    }
    .p-button .root{
      padding: var(--p-btn-pad-xl);
      gap: var(--p-btn-gap-xl);
    }
    .p-button .label{
      position: var(--p-btn-l-pos-xl);
      width: var(--p-btn-l-w-xl);
      height: var(--p-btn-l-h-xl);
      padding: var(--p-btn-l-pad-xl);
      margin: var(--p-btn-l-m-xl);
      overflow: var(--p-btn-l-ov-xl);
      clip: var(--p-btn-l-clip-xl);
      white-space: var(--p-btn-l-ws-xl);
    }
    .p-button .icon{
      margin-inline-start: var(--p-btn-icon-m-xl);
    }
  }
  @media (min-width: 1920px) {
    .p-button {
      --_p-button-a: var(--p-btn-scale-xxl);
      --_p-link-button-a: var(--p-btn-br-xxl);
      border-radius: var(--p-btn-host-r-xxl) !important;
    }
    .p-button .root{
      padding: var(--p-btn-pad-xxl);
      gap: var(--p-btn-gap-xxl);
    }
    .p-button .label{
      position: var(--p-btn-l-pos-xxl);
      width: var(--p-btn-l-w-xxl);
      height: var(--p-btn-l-h-xxl);
      padding: var(--p-btn-l-pad-xxl);
      margin: var(--p-btn-l-m-xxl);
      overflow: var(--p-btn-l-ov-xxl);
      clip: var(--p-btn-l-clip-xxl);
      white-space: var(--p-btn-l-ws-xxl);
    }
    .p-button .icon{
      margin-inline-start: var(--p-btn-icon-m-xxl);
    }
  }`;function gn(p,o,r){let z,L,s,u,c,y,w,{$$slots:g={},$$scope:_}=o;const j=["base","xs","s","m","l","xl","xxl"],k=(n,b)=>{if(n==null)return b;if(n==="")return!0;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return b}return n},m=n=>n===!0||n==="true"||n==="",i=(n,b,d)=>n&&typeof n=="object"?n[b]===void 0?d:n[b]:n,H=(n,b,d,A)=>{const a=b==="base"?"":`-${b}`,v=m(d);if(n[`--p-btn-scale${a}`]=m(A)?"0.64285714":"1",n[`--p-btn-br${a}`]=m(A)?"var(--p-radius-lg)":"var(--p-radius-xl)",n[`--p-btn-host-r${a}`]=v?"var(--p-button-radius, var(--p-radius-full))":"var(--p-button-radius, var(--_p-link-button-a))",n[`--p-btn-pad${a}`]=v?"var(--p-button-py, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px)) var(--p-button-px, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px))":"var(--p-button-py, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px)) var(--p-button-px, calc(33.6px * (var(--_p-button-a) - 0.64285714) + 16px))",n[`--p-btn-gap${a}`]=v?"var(--p-button-gap, 0)":"var(--p-button-gap, calc(11.2px * (var(--_p-button-a) - 0.64285714) + 4px))",n[`--p-btn-icon-m${a}`]=v?"0":"calc(-1 * (11.2px * (var(--_p-button-a) - 0.64285714) + 4px))",v){n[`--p-btn-l-pos${a}`]="absolute",n[`--p-btn-l-w${a}`]="1px",n[`--p-btn-l-h${a}`]="1px",n[`--p-btn-l-pad${a}`]="0",n[`--p-btn-l-m${a}`]="-1px",n[`--p-btn-l-ov${a}`]="hidden",n[`--p-btn-l-clip${a}`]="rect(0, 0, 0, 0)",n[`--p-btn-l-ws${a}`]="nowrap";return}n[`--p-btn-l-pos${a}`]="static",n[`--p-btn-l-w${a}`]="auto",n[`--p-btn-l-h${a}`]="auto",n[`--p-btn-l-pad${a}`]="0",n[`--p-btn-l-m${a}`]="0",n[`--p-btn-l-ov${a}`]="visible",n[`--p-btn-l-clip${a}`]="auto",n[`--p-btn-l-ws${a}`]="normal"};let{variant:l}=o,{hideLabel:S}=o,{compact:f}=o,{iconSource:t}=o,{icon:e}=o,{type:h}=o,{disabled:N}=o,{loading:q}=o;function B(){return{variant:l,hideLabel:S,compact:f,iconSource:t,icon:e,type:h,disabled:N,loading:q}}return p.$$set=n=>{r(6,o=K(K({},o),U(n))),"variant"in n&&r(7,l=n.variant),"hideLabel"in n&&r(8,S=n.hideLabel),"compact"in n&&r(9,f=n.compact),"iconSource"in n&&r(10,t=n.iconSource),"icon"in n&&r(11,e=n.icon),"type"in n&&r(12,h=n.type),"disabled"in n&&r(13,N=n.disabled),"loading"in n&&r(14,q=n.loading),"$$scope"in n&&r(16,_=n.$$scope)},p.$$.update=()=>{p.$$.dirty&1024&&r(5,L=()=>{if(t)return"";const n=B().icon||"none";return n==="none"||n===""?"":n}),p.$$.dirty&1024&&r(4,s=()=>t||""),p.$$.dirty&4096&&r(3,u=()=>h||"submit"),p.$$.dirty&32768&&r(1,y=bn(z())),r(0,w=sn({disabled:o.disabled,icon:o.icon,"icon-source":o.iconSource,loading:o.loading}))},r(15,z=()=>{const n=B().variant||"primary",b=k(B().hideLabel,!1),d=k(B().compact,!1),A={primary:{bg:"var(--p-button-bg, var(--p-color-primary))",fg:"var(--p-button-fg, var(--p-color-canvas))",hoverBg:"var(--p-button-bg, var(--p-color-contrast-high))",hoverFg:"var(--p-button-fg, var(--p-color-canvas))"},secondary:{bg:"var(--p-button-bg, var(--p-color-frosted-strong))",fg:"var(--p-button-fg, var(--p-color-primary))",hoverBg:"var(--p-button-bg, var(--p-color-frosted))",hoverFg:"var(--p-button-fg, var(--p-color-primary))"},destructive:{bg:"var(--p-button-bg, var(--p-color-error))",fg:"var(--p-button-fg, var(--p-color-canvas))",hoverBg:"var(--p-button-bg, var(--p-color-error-medium))",hoverFg:"var(--p-button-fg, var(--p-color-primary))"}},a=A[n]||A.primary,v={"--p-btn-bg":a.bg,"--p-btn-fg":a.fg,"--p-btn-hbg":a.hoverBg,"--p-btn-hfg":a.hoverFg};if(typeof b=="object"||typeof d=="object"){const T=typeof b=="object"&&b!==null?b:null,F=typeof d=="object"&&d!==null?d:null;let I=T?i(T,"base",!1):b,P=F?i(F,"base",!1):d;for(const O of j)T&&T[O]!==void 0&&(I=i(T,O,I)),F&&F[O]!==void 0&&(P=i(F,O,P)),H(v,O,I,P)}else for(const T of j)H(v,T,b,d);return v}),r(2,c=()=>B().loading===!0||B().loading==="true"||B().loading===""?"Loading":""),o=U(o),[w,y,c,u,s,L,o,l,S,f,t,e,h,N,q,z,_,g]}class Sn extends V{constructor(o){super(),W(this,o,gn,cn,X,{variant:7,hideLabel:8,compact:9,iconSource:10,icon:11,type:12,disabled:13,loading:14})}}export{Sn as default};
