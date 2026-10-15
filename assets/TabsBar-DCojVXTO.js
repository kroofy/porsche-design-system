import{S as j,i as E,s as F,a as S,d as T,v as I,t as L,b as N,h as C,j as J,k as B,l as P,w as K,m as x,H as M,n as R,x as D,p as H,q,c as G,u as Q,g as U,e as V}from"./svelte-DoO7z26N.js";import{s as W,h as X}from"./host-DRskmCSE.js";import Y from"./Scroller-DOZi1zGI.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function Z(e){let t,o,c;const u=e[7].default,n=G(u,e,e[8],null);return{c(){t=x("span"),n&&n.c(),o=x("span"),H(t,"data-pds-slot",""),H(o,"class","bar")},m(a,p){B(a,t,p),n&&n.m(t,null),B(a,o,p),c=!0},p(a,p){n&&n.p&&(!c||p&256)&&Q(n,u,a,a[8],c?V(u,a[8],p,null):U(a[8]),null)},i(a){c||(N(n,a),c=!0)},o(a){L(n,a),c=!1},d(a){a&&(T(t),T(o)),n&&n.d(a)}}}function w(e){let t,o,c=`<style>${$}</style>`,u,n,a,p,f;a=new Y({props:{class:"scroller",$$slots:{default:[Z]},$$scope:{ctx:e}}});let k=[{class:p="p-tabs-bar"+(e[2].class?` ${e[2].class}`:"")},{"data-pds":"tabs-bar"},{style:e[1]},e[0]],m={};for(let r=0;r<k.length;r+=1)m=S(m,k[r]);return{c(){t=x("div"),o=new M(!1),u=R(),n=x("div"),D(a.$$.fragment),o.a=u,H(n,"class","wrap"),C(t,m)},m(r,d){B(r,t,d),o.m(c,t),P(t,u),P(t,n),K(a,n,null),f=!0},p(r,[d]){const v={};d&256&&(v.$$scope={dirty:d,ctx:r}),a.$set(v),C(t,m=J(k,[(!f||d&4&&p!==(p="p-tabs-bar"+(r[2].class?` ${r[2].class}`:"")))&&{class:p},{"data-pds":"tabs-bar"},(!f||d&2)&&{style:r[1]},d&1&&r[0]]))},i(r){f||(N(a.$$.fragment,r),f=!0)},o(r){L(a.$$.fragment,r),f=!1},d(r){r&&T(t),I(a)}}}const $=`.p-tabs-bar :where([data-pds-slot]){display:contents}

  .p-tabs-bar {
    display: grid;
  }
  .p-tabs-bar[hidden] {
    display: none !important;
  }
  .p-tabs-bar .wrap{
    display: contents;
  }
  .p-tabs-bar [data-pds-slot] > a,
  .p-tabs-bar [data-pds-slot] > button{
    all: unset !important;
    white-space: nowrap !important;
    cursor: pointer !important;
    border-radius: var(--p-tb-radius) !important;
    padding: var(--p-tb-pad) !important;
    font: var(--p-typescale-sm) / var(--p-leading-normal)
      var(--p-font-porsche-next) !important;
    font-size: var(--p-tb-fs) !important;
    color: var(--p-color-primary) !important;
    background: 0 0 / 0% 100% no-repeat !important;
    transition: background-color var(--p-duration-sm) var(--p-ease-in-out) !important;
  }
  .p-tabs-bar [data-pds-slot] > a:focus-visible,
  .p-tabs-bar [data-pds-slot] > button:focus-visible{
    outline: 2px solid var(--p-color-focus) !important;
    outline-offset: 2px !important;
  }
  .p-tabs-bar [data-pds-slot] > a[aria-current="true"],
  .p-tabs-bar [data-pds-slot] > button[aria-selected="true"]{
    background-image: linear-gradient(
      var(--p-color-frosted-strong),
      var(--p-color-frosted-strong)
    ) !important;
    background-size: 100% 100% !important;
    transition: background-size 0s linear var(--p-duration-md) !important;
  }
  @media (forced-colors: active) {
    .p-tabs-bar [data-pds-slot] > a,
    .p-tabs-bar [data-pds-slot] > button{
      forced-color-adjust: none !important;
      background: Canvas !important;
    }
    .p-tabs-bar [data-pds-slot] > a{
      color: LinkText !important;
      box-shadow: inset 0 0 0 2px LinkText !important;
    }
    .p-tabs-bar [data-pds-slot] > button{
      color: ButtonText !important;
      box-shadow: inset 0 0 0 2px ButtonBorder !important;
    }
    .p-tabs-bar [data-pds-slot] > a:focus-visible,
    .p-tabs-bar [data-pds-slot] > button:focus-visible{
      outline-color: Highlight !important;
    }
    .p-tabs-bar .bar{
      display: none;
    }
    .p-tabs-bar[background]:not([background="none"]) .scroller {
      forced-color-adjust: none;
      outline: 1px solid CanvasText;
    }
  }
  @media (hover: hover) {
    .p-tabs-bar [data-pds-slot] > a:not([aria-current="true"]):hover,
    .p-tabs-bar [data-pds-slot] > button:not([aria-selected="true"]):hover{
      background-color: var(--p-color-frosted) !important;
    }
  }
  .p-tabs-bar .scroller{
    --_p-scroller-focus-ring-radius: var(--p-tb-radius);
    place-self: flex-start;
  }
  .p-tabs-bar[background]:not([background="none"]) .scroller {
    background: var(--p-tb-scroller-bg);
    padding: var(--p-tb-scroller-pad);
    border-radius: var(--p-tb-scroller-radius);
  }
  .p-tabs-bar[background="frosted"] .scroller {
    -webkit-backdrop-filter: var(--p-blur-frosted);
    backdrop-filter: var(--p-blur-frosted);
  }
  .p-tabs-bar .bar{
    position: absolute;
    inset-inline-start: 0;
    width: 0px;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    border-radius: var(--p-tb-radius);
    background: var(--p-color-frosted-strong);
  }`;function tt(e,t,o){let c,u,n,{$$slots:a={},$$scope:p}=t;const f=["base","xs","s","m","l","xl","xxl"],k=(s,i)=>{if(s==null||s==="")return i;if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return i}return s},m=(s,i,h)=>s&&typeof s=="object"?s[i]===void 0?h:s[i]:s;let{compact:r}=t,{background:d}=t,{size:v}=t;function y(){return{compact:r,background:d,size:v}}return e.$$set=s=>{o(2,t=S(S({},t),q(s))),"compact"in s&&o(3,r=s.compact),"background"in s&&o(4,d=s.background),"size"in s&&o(5,v=s.size),"$$scope"in s&&o(8,p=s.$$scope)},e.$$.update=()=>{e.$$.dirty&8,e.$$.dirty&64&&o(1,u=W(c())),o(0,n=X({background:t.background}))},o(6,c=()=>{const i=(l=>l===!0||l==="true"||l==="")(y().compact),h=y().background||"none",z=h!=="none",_=k(y().size,"small"),A=l=>l==="medium"?"var(--p-typescale-md)":"var(--p-typescale-sm)",b={"--p-tb-radius":z?i?"var(--p-radius-md)":"var(--p-radius-lg)":i?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-tb-pad":z?i?"calc(7 * var(--p-spacing-static-2xs) - var(--p-spacing-static-xs)) calc(var(--p-spacing-static-md) - var(--p-spacing-static-xs))":"calc(var(--p-spacing-static-md) - var(--p-spacing-static-xs)) calc(28 * var(--p-spacing-static-2xs) - var(--p-spacing-static-xs))":i?"calc(6 * var(--p-spacing-static-2xs)) var(--p-spacing-static-md)":"var(--p-spacing-static-md) calc(28 * var(--p-spacing-static-2xs))"};if(typeof _=="object"&&_!==null){let l=String(m(_,"base","small")||"small");for(const g of f){_[g]!==void 0&&(l=String(m(_,g,l)));const O=g==="base"?"--p-tb-fs":`--p-tb-fs-${g}`;b[O]=A(l)}}else{const l=A(_);b["--p-tb-fs"]=l;for(const g of f)g!=="base"&&(b[`--p-tb-fs-${g}`]=l)}if(z){const l={canvas:"var(--p-color-canvas)",surface:"var(--p-color-surface)",frosted:"var(--p-color-frosted)"};b["--p-tb-scroller-bg"]=l[h]||"",b["--p-tb-scroller-pad"]=i?"calc(3 * var(--p-spacing-static-2xs))":"var(--p-spacing-static-xs)",b["--p-tb-scroller-radius"]=i?"var(--p-radius-lg)":"var(--p-radius-xl)"}else b["--p-tb-scroller-bg"]="",b["--p-tb-scroller-pad"]="",b["--p-tb-scroller-radius"]="";return b}),t=q(t),[n,u,t,r,d,v,c,a,p]}class it extends j{constructor(t){super(),E(this,t,tt,w,F,{compact:3,background:4,size:5})}}export{it as default};
