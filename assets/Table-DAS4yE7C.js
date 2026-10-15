import{S as h,i as w,s as S,c as T,d as H,t as k,b as q,u as C,g as x,e as P,p as r,k as j,l as y,m as _,H as z,n as A,a as v,q as g}from"./svelte-DoO7z26N.js";import{s as B}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function D(e){let a,o,d=`<style>${E}</style>`,u,p,c,s,n;const m=e[7].default,l=T(m,e,e[6],null);return{c(){a=_("div"),o=new z(!1),u=A(),p=_("div"),c=_("span"),l&&l.c(),o.a=u,r(c,"data-pds-slot",""),r(p,"class","table"),r(p,"role","table"),r(a,"class",s="p-table"+(e[1].class?` ${e[1].class}`:"")),r(a,"data-pds","table"),r(a,"style",e[0])},m(t,i){j(t,a,i),o.m(d,a),y(a,u),y(a,p),y(p,c),l&&l.m(c,null),n=!0},p(t,[i]){l&&l.p&&(!n||i&64)&&C(l,m,t,t[6],n?P(m,t[6],i,null):x(t[6]),null),(!n||i&2&&s!==(s="p-table"+(t[1].class?` ${t[1].class}`:"")))&&r(a,"class",s),(!n||i&1)&&r(a,"style",t[0])},i(t){n||(q(l,t),n=!0)},o(t){k(l,t),n=!1},d(t){t&&H(a),l&&l.d(t)}}}const E=`.p-table :where([data-pds-slot]){display:contents}

  .p-table {
    display: block;
    --p-scroller-indicator-top: var(
      --p-table-scroll-indicator-top,
      0px
    ) !important;
    --p-scroller-indicator-bottom: var(
      --p-table-scroll-indicator-bottom,
      0px
    ) !important;
    --_p-table-b: var(--p-color-frosted) !important;
    --_p-table-c: var(--p-color-contrast-low) !important;
    --_p-table-a: var(--p-table-pad, var(--p-spacing-fluid-sm)) !important;
    --_p-table-d: 1px !important;
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next) !important;
    color: var(--p-color-primary) !important;
    text-align: start !important;
  }
  .p-table[hidden] {
    display: none !important;
  }
  .p-table .caption{
    margin-bottom: var(--p-spacing-fluid-md);
  }
  .p-table .table{
    display: table;
    border-collapse: collapse;
    white-space: nowrap;
    table-layout: var(--p-table-layout, auto);
    width: var(--p-table-w, auto);
    min-width: var(--p-table-min-w, auto);
  }`;function F(e,a,o){let d,u,{$$slots:p={},$$scope:c}=a,{compact:s}=a,{layout:n}=a,{caption:m}=a;function l(){return{compact:s,layout:n,caption:m}}return e.$$set=t=>{o(1,a=v(v({},a),g(t))),"compact"in t&&o(2,s=t.compact),"layout"in t&&o(3,n=t.layout),"caption"in t&&o(4,m=t.caption),"$$scope"in t&&o(6,c=t.$$scope)},e.$$.update=()=>{e.$$.dirty&16,e.$$.dirty&32&&o(0,u=B(d()))},o(5,d=()=>{const i=(f=>f===!0||f==="true"||f==="")(l().compact),b=(l().layout||"auto")==="fixed";return{"--p-table-pad":i?"var(--p-spacing-static-sm)":"var(--p-spacing-fluid-sm)","--p-table-layout":b?"fixed":"","--p-table-w":b?"":"100%","--p-table-min-w":b?"100%":""}}),a=g(a),[u,a,s,n,m,d,c,p]}class N extends h{constructor(a){super(),w(this,a,F,D,S,{compact:2,layout:3,caption:4})}}export{N as default};
