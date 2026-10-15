import{S as J,i as K,s as R,c as D,a as N,d as F,v as G,t as q,b as I,u as M,g as Q,e as U,h as P,j as V,k as W,l as j,w as X,m as B,H as Y,n as Z,x as $,p as z,q as E}from"./svelte-DoO7z26N.js";import{s as nn,h as ln}from"./host-DRskmCSE.js";import an from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function rn(p){let r,o,y=`<style>${pn}</style>`,b,u,c,f,_,g,k;c=new an({props:{class:"icon",size:"inherit",color:"inherit","aria-hidden":"true",name:p[3](),source:p[2]()}});const w=p[12].default,t=D(w,p,p[11],null);let m=[{class:g="p-link"+(p[4].class?` ${p[4].class}`:"")},{"data-pds":"link"},{style:p[1]},p[0]],h={};for(let l=0;l<m.length;l+=1)h=N(h,m[l]);return{c(){r=B("div"),o=new Y(!1),b=Z(),u=B("span"),$(c.$$.fragment),f=B("span"),_=B("span"),t&&t.c(),o.a=b,z(_,"data-pds-slot",""),z(f,"class","label"),z(u,"class","root"),P(r,h)},m(l,s){W(l,r,s),o.m(y,r),j(r,b),j(r,u),X(c,u,null),j(u,f),j(f,_),t&&t.m(_,null),k=!0},p(l,[s]){const x={};s&8&&(x.name=l[3]()),s&4&&(x.source=l[2]()),c.$set(x),t&&t.p&&(!k||s&2048)&&M(t,w,l,l[11],k?U(w,l[11],s,null):Q(l[11]),null),P(r,h=V(m,[(!k||s&16&&g!==(g="p-link"+(l[4].class?` ${l[4].class}`:"")))&&{class:g},{"data-pds":"link"},(!k||s&2)&&{style:l[1]},s&1&&l[0]]))},i(l){k||(I(c.$$.fragment,l),I(t,l),k=!0)},o(l){q(c.$$.fragment,l),q(t,l),k=!1},d(l){l&&F(r),G(c),t&&t.d(l)}}}const pn=`.p-link :where([data-pds-slot]){display:contents}

  .p-link {
    display: inline-block;
    vertical-align: top;
    --_p-link-a: var(--p-lnk-scale);
    --_p-link-button-a: var(--p-lnk-br);
    --p-lnk-slot-cur: var(--p-lnk-slot-r);
    border-radius: var(--p-lnk-host-r) !important;
  }
  .p-link[hidden] {
    display: none !important;
  }
  .p-link [data-pds-slot] > a{
    all: unset !important;
  }
  .p-link [data-pds-slot] > a::before{
    content: "" !important;
    position: fixed !important;
    inset: 0 !important;
    border-radius: var(--p-lnk-slot-cur) !important;
  }
  .p-link [data-pds-slot] > a:focus-visible::before{
    outline: 2px solid var(--p-color-focus) !important;
    outline-offset: 2px !important;
  }
  .p-link .root{
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
    background-color: var(--p-lnk-bg);
    color: var(--p-lnk-fg);
    cursor: pointer;
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      border-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    padding: var(--p-lnk-pad);
    gap: var(--p-lnk-gap);
  }
  .p-link[href] .root:focus-visible {
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-link .label{
    position: var(--p-lnk-l-pos);
    width: var(--p-lnk-l-w);
    height: var(--p-lnk-l-h);
    padding: var(--p-lnk-l-pad);
    margin: var(--p-lnk-l-m);
    overflow: var(--p-lnk-l-ov);
    clip: var(--p-lnk-l-clip);
    white-space: var(--p-lnk-l-ws);
  }
  .p-link .icon,
  .p-link .p-icon{
    font: var(--p-typescale-sm) var(--p-font-porsche-next);
    width: var(--p-leading-normal);
    height: var(--p-leading-normal);
    margin-inline-start: var(--p-lnk-icon-m);
  }
  .p-link:not([icon-source]):not([icon]) .p-icon,
  .p-link[icon="none"]:not([icon-source]) .p-icon,
  .p-link[icon=""]:not([icon-source]) .p-icon {
    display: none;
  }
  @media (forced-colors: active) {
    .p-link .root{
      forced-color-adjust: none;
      background: Canvas;
      color: LinkText;
      box-shadow: inset 0 0 0 2px LinkText;
    }
    .p-link .root:is(button){
      box-shadow: inset 0 0 0 2px ButtonBorder;
      color: ButtonText;
    }
    .p-link[href] .root:focus-visible {
      outline-color: Highlight;
    }
    .p-link [data-pds-slot] > a:focus-visible::before{
      outline-color: Highlight !important;
    }
  }
  @media (hover: hover) {
    .p-link .root:hover{
      color: var(--p-lnk-fg);
      background-color: var(--p-lnk-hbg);
    }
    @media (forced-colors: active) {
      .p-link .root:hover{
        background: Canvas;
      }
    }
  }
  @media (min-width: 480px) {
    .p-link {
      --_p-link-a: var(--p-lnk-scale-xs);
      --_p-link-button-a: var(--p-lnk-br-xs);
      --p-lnk-slot-cur: var(--p-lnk-slot-r-xs);
      border-radius: var(--p-lnk-host-r-xs) !important;
    }
    .p-link .root{
      padding: var(--p-lnk-pad-xs);
      gap: var(--p-lnk-gap-xs);
    }
    .p-link .label{
      position: var(--p-lnk-l-pos-xs);
      width: var(--p-lnk-l-w-xs);
      height: var(--p-lnk-l-h-xs);
      padding: var(--p-lnk-l-pad-xs);
      margin: var(--p-lnk-l-m-xs);
      overflow: var(--p-lnk-l-ov-xs);
      clip: var(--p-lnk-l-clip-xs);
      white-space: var(--p-lnk-l-ws-xs);
    }
    .p-link .icon,
    .p-link .p-icon{
      margin-inline-start: var(--p-lnk-icon-m-xs);
    }
  }
  @media (min-width: 760px) {
    .p-link {
      --_p-link-a: var(--p-lnk-scale-s);
      --_p-link-button-a: var(--p-lnk-br-s);
      --p-lnk-slot-cur: var(--p-lnk-slot-r-s);
      border-radius: var(--p-lnk-host-r-s) !important;
    }
    .p-link .root{
      padding: var(--p-lnk-pad-s);
      gap: var(--p-lnk-gap-s);
    }
    .p-link .label{
      position: var(--p-lnk-l-pos-s);
      width: var(--p-lnk-l-w-s);
      height: var(--p-lnk-l-h-s);
      padding: var(--p-lnk-l-pad-s);
      margin: var(--p-lnk-l-m-s);
      overflow: var(--p-lnk-l-ov-s);
      clip: var(--p-lnk-l-clip-s);
      white-space: var(--p-lnk-l-ws-s);
    }
    .p-link .icon,
    .p-link .p-icon{
      margin-inline-start: var(--p-lnk-icon-m-s);
    }
  }
  @media (min-width: 1000px) {
    .p-link {
      --_p-link-a: var(--p-lnk-scale-m);
      --_p-link-button-a: var(--p-lnk-br-m);
      --p-lnk-slot-cur: var(--p-lnk-slot-r-m);
      border-radius: var(--p-lnk-host-r-m) !important;
    }
    .p-link .root{
      padding: var(--p-lnk-pad-m);
      gap: var(--p-lnk-gap-m);
    }
    .p-link .label{
      position: var(--p-lnk-l-pos-m);
      width: var(--p-lnk-l-w-m);
      height: var(--p-lnk-l-h-m);
      padding: var(--p-lnk-l-pad-m);
      margin: var(--p-lnk-l-m-m);
      overflow: var(--p-lnk-l-ov-m);
      clip: var(--p-lnk-l-clip-m);
      white-space: var(--p-lnk-l-ws-m);
    }
    .p-link .icon,
    .p-link .p-icon{
      margin-inline-start: var(--p-lnk-icon-m-m);
    }
  }
  @media (min-width: 1300px) {
    .p-link {
      --_p-link-a: var(--p-lnk-scale-l);
      --_p-link-button-a: var(--p-lnk-br-l);
      --p-lnk-slot-cur: var(--p-lnk-slot-r-l);
      border-radius: var(--p-lnk-host-r-l) !important;
    }
    .p-link .root{
      padding: var(--p-lnk-pad-l);
      gap: var(--p-lnk-gap-l);
    }
    .p-link .label{
      position: var(--p-lnk-l-pos-l);
      width: var(--p-lnk-l-w-l);
      height: var(--p-lnk-l-h-l);
      padding: var(--p-lnk-l-pad-l);
      margin: var(--p-lnk-l-m-l);
      overflow: var(--p-lnk-l-ov-l);
      clip: var(--p-lnk-l-clip-l);
      white-space: var(--p-lnk-l-ws-l);
    }
    .p-link .icon,
    .p-link .p-icon{
      margin-inline-start: var(--p-lnk-icon-m-l);
    }
  }
  @media (min-width: 1760px) {
    .p-link {
      --_p-link-a: var(--p-lnk-scale-xl);
      --_p-link-button-a: var(--p-lnk-br-xl);
      --p-lnk-slot-cur: var(--p-lnk-slot-r-xl);
      border-radius: var(--p-lnk-host-r-xl) !important;
    }
    .p-link .root{
      padding: var(--p-lnk-pad-xl);
      gap: var(--p-lnk-gap-xl);
    }
    .p-link .label{
      position: var(--p-lnk-l-pos-xl);
      width: var(--p-lnk-l-w-xl);
      height: var(--p-lnk-l-h-xl);
      padding: var(--p-lnk-l-pad-xl);
      margin: var(--p-lnk-l-m-xl);
      overflow: var(--p-lnk-l-ov-xl);
      clip: var(--p-lnk-l-clip-xl);
      white-space: var(--p-lnk-l-ws-xl);
    }
    .p-link .icon,
    .p-link .p-icon{
      margin-inline-start: var(--p-lnk-icon-m-xl);
    }
  }
  @media (min-width: 1920px) {
    .p-link {
      --_p-link-a: var(--p-lnk-scale-xxl);
      --_p-link-button-a: var(--p-lnk-br-xxl);
      --p-lnk-slot-cur: var(--p-lnk-slot-r-xxl);
      border-radius: var(--p-lnk-host-r-xxl) !important;
    }
    .p-link .root{
      padding: var(--p-lnk-pad-xxl);
      gap: var(--p-lnk-gap-xxl);
    }
    .p-link .label{
      position: var(--p-lnk-l-pos-xxl);
      width: var(--p-lnk-l-w-xxl);
      height: var(--p-lnk-l-h-xxl);
      padding: var(--p-lnk-l-pad-xxl);
      margin: var(--p-lnk-l-m-xxl);
      overflow: var(--p-lnk-l-ov-xxl);
      clip: var(--p-lnk-l-clip-xxl);
      white-space: var(--p-lnk-l-ws-xxl);
    }
    .p-link .icon,
    .p-link .p-icon{
      margin-inline-start: var(--p-lnk-icon-m-xxl);
    }
  }`;function on(p,r,o){let y,b,u,c,f,{$$slots:_={},$$scope:g}=r;const k=["base","xs","s","m","l","xl","xxl"],w=(n,i)=>{if(n==null)return i;if(n==="")return!0;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return i}return n},t=n=>n===!0||n==="true"||n==="",m=(n,i,d)=>n&&typeof n=="object"?n[i]===void 0?d:n[i]:n,h=(n,i,d,L)=>{const a=i==="base"?"":`-${i}`,e=t(d),v=t(L);if(n[`--p-lnk-scale${a}`]=v?"0.64285714":"1",n[`--p-lnk-br${a}`]=v?"var(--p-radius-lg)":"var(--p-radius-xl)",n[`--p-lnk-host-r${a}`]=e?"var(--p-link-radius, var(--p-radius-full))":"var(--p-link-radius, var(--_p-link-button-a))",n[`--p-lnk-slot-r${a}`]=e?"var(--p-link-radius, var(--p-radius-full))":v?"var(--p-link-radius, var(--p-radius-lg))":"var(--p-link-radius, var(--p-radius-xl))",n[`--p-lnk-pad${a}`]=e?"var(--p-link-py, calc(28px * (var(--_p-link-a) - 0.64285714) + 6px)) var(--p-link-px, calc(28px * (var(--_p-link-a) - 0.64285714) + 6px))":"var(--p-link-py, calc(28px * (var(--_p-link-a) - 0.64285714) + 6px)) var(--p-link-px, calc(33.6px * (var(--_p-link-a) - 0.64285714) + 16px))",n[`--p-lnk-gap${a}`]=e?"var(--p-link-gap, 0)":"var(--p-link-gap, calc(11.2px * (var(--_p-link-a) - 0.64285714) + 4px))",n[`--p-lnk-icon-m${a}`]=e?"0":"calc(-1 * (11.2px * (var(--_p-link-a) - 0.64285714) + 4px))",e){n[`--p-lnk-l-pos${a}`]="absolute",n[`--p-lnk-l-w${a}`]="1px",n[`--p-lnk-l-h${a}`]="1px",n[`--p-lnk-l-pad${a}`]="0",n[`--p-lnk-l-m${a}`]="-1px",n[`--p-lnk-l-ov${a}`]="hidden",n[`--p-lnk-l-clip${a}`]=i==="base"?"unset":"rect(0, 0, 0, 0)",n[`--p-lnk-l-ws${a}`]="nowrap";return}n[`--p-lnk-l-pos${a}`]="static",n[`--p-lnk-l-w${a}`]="auto",n[`--p-lnk-l-h${a}`]="auto",n[`--p-lnk-l-pad${a}`]="0",n[`--p-lnk-l-m${a}`]="0",n[`--p-lnk-l-ov${a}`]="visible",n[`--p-lnk-l-clip${a}`]=i==="base"?"unset":"auto",n[`--p-lnk-l-ws${a}`]="normal"};let{variant:l}=r,{hideLabel:s}=r,{compact:x}=r,{iconSource:S}=r,{icon:C}=r;function T(){return{variant:l,hideLabel:s,compact:x,iconSource:S,icon:C}}return p.$$set=n=>{o(4,r=N(N({},r),E(n))),"variant"in n&&o(5,l=n.variant),"hideLabel"in n&&o(6,s=n.hideLabel),"compact"in n&&o(7,x=n.compact),"iconSource"in n&&o(8,S=n.iconSource),"icon"in n&&o(9,C=n.icon),"$$scope"in n&&o(11,g=n.$$scope)},p.$$.update=()=>{p.$$.dirty&256&&o(3,b=()=>{if(S)return"";const n=T().icon||"none";return n==="none"||n===""?"":n}),p.$$.dirty&256&&o(2,u=()=>S||""),p.$$.dirty&1024&&o(1,c=nn(y())),o(0,f=ln({href:r.href,icon:r.icon,"icon-source":r.iconSource}))},o(10,y=()=>{const n=T().variant||"primary",i=w(T().hideLabel,!1),d=w(T().compact,!1),L=n==="secondary",a={"--p-lnk-bg":L?"var(--p-link-bg, var(--p-color-frosted-strong))":"var(--p-link-bg, var(--p-color-primary))","--p-lnk-fg":L?"var(--p-link-fg, var(--p-color-primary))":"var(--p-link-fg, var(--p-color-canvas))","--p-lnk-hbg":L?"var(--p-link-bg, var(--p-color-frosted))":"var(--p-link-bg, var(--p-color-contrast-high))"};if(typeof i=="object"||typeof d=="object"){const e=typeof i=="object"&&i!==null?i:null,v=typeof d=="object"&&d!==null?d:null;let O=e?m(e,"base",!1):i,A=v?m(v,"base",!1):d;for(const H of k)e&&e[H]!==void 0&&(O=m(e,H,O)),v&&v[H]!==void 0&&(A=m(v,H,A)),h(a,H,O,A)}else for(const e of k)h(a,e,i,d);return a}),r=E(r),[f,c,u,b,r,l,s,x,S,C,y,g,_]}class un extends J{constructor(r){super(),K(this,r,on,rn,R,{variant:5,hideLabel:6,compact:7,iconSource:8,icon:9})}}export{un as default};
