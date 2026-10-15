import{S as _,i as k,s as C,r as x,d as O,p as h,k as T,l as f,m as g,H,n as q,a as y,q as b}from"./svelte-DoO7z26N.js";import{s as z}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function A(n){let r,t,p=`<style>${D}</style>`,s,l,o;return{c(){r=g("div"),t=new H(!1),s=q(),l=g("hr"),t.a=s,h(r,"class",o="p-divider"+(n[1].class?` ${n[1].class}`:"")),h(r,"data-pds","divider"),h(r,"style",n[0])},m(d,v){T(d,r,v),t.m(p,r),f(r,s),f(r,l)},p(d,[v]){v&2&&o!==(o="p-divider"+(d[1].class?` ${d[1].class}`:""))&&h(r,"class",o),v&1&&h(r,"style",d[0])},i:x,o:x,d(d){d&&O(r)}}}const D=`.p-divider :where([data-pds-slot]){display:contents}

  .p-divider {
    display: block;
  }
  .p-divider[hidden] {
    display: none !important;
  }
  .p-divider hr{
    all: unset;
    display: block;
    background: var(--p-divider-bg);
    height: var(--p-divider-h, 1px);
    width: var(--p-divider-w, 100%);
  }
  @media (forced-colors: active) {
    .p-divider hr{
      background: CanvasText;
    }
  }
  @media (min-width: 480px) {
    .p-divider hr{
      height: var(--p-divider-h-xs, var(--p-divider-h, 1px));
      width: var(--p-divider-w-xs, var(--p-divider-w, 100%));
    }
  }
  @media (min-width: 760px) {
    .p-divider hr{
      height: var(--p-divider-h-s, var(--p-divider-h, 1px));
      width: var(--p-divider-w-s, var(--p-divider-w, 100%));
    }
  }
  @media (min-width: 1000px) {
    .p-divider hr{
      height: var(--p-divider-h-m, var(--p-divider-h, 1px));
      width: var(--p-divider-w-m, var(--p-divider-w, 100%));
    }
  }
  @media (min-width: 1300px) {
    .p-divider hr{
      height: var(--p-divider-h-l, var(--p-divider-h, 1px));
      width: var(--p-divider-w-l, var(--p-divider-w, 100%));
    }
  }
  @media (min-width: 1760px) {
    .p-divider hr{
      height: var(--p-divider-h-xl, var(--p-divider-h, 1px));
      width: var(--p-divider-w-xl, var(--p-divider-w, 100%));
    }
  }
  @media (min-width: 1920px) {
    .p-divider hr{
      height: var(--p-divider-h-xxl, var(--p-divider-h, 1px));
      width: var(--p-divider-w-xxl, var(--p-divider-w, 100%));
    }
  }`;function N(n,r,t){let p,s;const l={"contrast-lower":"var(--p-color-contrast-lower)","contrast-low":"var(--p-color-contrast-low)","contrast-medium":"var(--p-color-contrast-medium)","contrast-high":"var(--p-color-contrast-high)"},o=["base","xs","s","m","l","xl","xxl"],d=i=>i==="vertical"?{h:"100%",w:"1px"}:{h:"1px",w:"100%"},v=i=>{if(i==null||i==="")return"horizontal";if(typeof i=="string"&&i.charAt(0)==="{")try{return JSON.parse(i)}catch{return"horizontal"}return i},u=(i,e,a)=>{if(e==="base"){i["--p-divider-h"]=a.h,i["--p-divider-w"]=a.w;return}i[`--p-divider-h-${e}`]=a.h,i[`--p-divider-w-${e}`]=a.w};let{color:c}=r,{direction:m}=r;function S(){return{color:c,direction:m}}return n.$$set=i=>{t(1,r=y(y({},r),b(i))),"color"in i&&t(2,c=i.color),"direction"in i&&t(3,m=i.direction)},n.$$.update=()=>{n.$$.dirty&4&&t(4,p=()=>{const i={"--p-divider-bg":l[c||"contrast-lower"]||l["contrast-lower"]},e=v(S().direction);if(typeof e=="object"&&e!==null){let a=d(e.base||"horizontal");for(const w of o)e[w]!==void 0&&(a=d(e[w])),u(i,w,a)}else u(i,"base",d(String(e)));return i}),n.$$.dirty&16&&t(0,s=z(p()))},r=b(r),[s,r,c,m,p]}class F extends _{constructor(r){super(),k(this,r,N,A,C,{color:2,direction:3})}}export{F as default};
