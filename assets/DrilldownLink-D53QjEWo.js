import{S as h,i as _,s as w,c as k,d as x,t as y,b,u as H,g as S,e as T,p as c,k as q,l as m,m as f,H as C,n as A,a as v,q as g}from"./svelte-DoO7z26N.js";import{s as D}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function L(i){let n,r,u=`<style>${j}</style>`,s,d,e,l;const o=i[5].default,a=k(o,i,i[4],null);return{c(){n=f("div"),r=new C(!1),s=A(),d=f("span"),a&&a.c(),r.a=s,c(d,"data-pds-slot",""),c(n,"class",e="p-drilldown-link"+(i[1].class?` ${i[1].class}`:"")),c(n,"data-pds","drilldown-link"),c(n,"style",i[0])},m(t,p){q(t,n,p),r.m(u,n),m(n,s),m(n,d),a&&a.m(d,null),l=!0},p(t,[p]){a&&a.p&&(!l||p&16)&&H(a,o,t,t[4],l?T(o,t[4],p,null):S(t[4]),null),(!l||p&2&&e!==(e="p-drilldown-link"+(t[1].class?` ${t[1].class}`:"")))&&c(n,"class",e),(!l||p&1)&&c(n,"style",t[0])},i(t){l||(b(a,t),l=!0)},o(t){y(a,t),l=!1},d(t){t&&x(n),a&&a.d(t)}}}const j=`.p-drilldown-link :where([data-pds-slot]){display:contents}

  .p-drilldown-link {
    display: grid;
  }
  .p-drilldown-link[hidden] {
    display: none !important;
  }
  .p-drilldown-link a{
    all: unset;
    padding: calc(var(--p-spacing-fluid-sm) + 2px)
      calc(var(--p-spacing-fluid-sm) + 4px);
    margin: -2px calc(var(--p-spacing-fluid-sm) * -1 - 4px);
    border-radius: var(--p-radius-sm);
    font: var(--p-font-weight-normal) var(--p-typescale-md) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--_p-drilldown-a);
    text-decoration: underline;
    text-decoration-color: var(--p-ddl-deco, inherit);
    cursor: var(--p-ddl-cursor, pointer);
    transition: text-decoration-color
      var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
  }
  .p-drilldown-link [data-pds-slot] > a{
    all: unset !important;
    padding: calc(var(--p-spacing-fluid-sm) + 2px)
      calc(var(--p-spacing-fluid-sm) + 4px) !important;
    margin: -2px calc(var(--p-spacing-fluid-sm) * -1 - 4px) !important;
    border-radius: var(--p-radius-sm) !important;
    font: var(--p-font-weight-normal) var(--p-typescale-md) /
      var(--p-leading-normal) var(--p-font-porsche-next) !important;
    color: var(--_p-drilldown-a) !important;
    text-decoration: underline !important;
    text-decoration-color: var(--p-ddl-deco, inherit) !important;
    cursor: var(--p-ddl-cursor, pointer) !important;
    transition: text-decoration-color
      var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out) !important;
  }
  .p-drilldown-link a:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-drilldown-link [data-pds-slot] > a:focus-visible{
    outline: 2px solid var(--p-color-focus) !important;
    outline-offset: 2px !important;
  }
  @media (forced-colors: active) {
    .p-drilldown-link a:focus-visible{
      outline-color: Highlight;
    }
    .p-drilldown-link [data-pds-slot] > a:focus-visible{
      outline-color: Highlight !important;
    }
  }
  @media (hover: hover) {
    .p-drilldown-link a:hover{
      text-decoration-color: inherit;
    }
    .p-drilldown-link [data-pds-slot] > a:hover{
      text-decoration-color: inherit !important;
    }
  }`;function z(i,n,r){let u,s,{$$slots:d={},$$scope:e}=n,{active:l}=n;return i.$$set=o=>{r(1,n=v(v({},n),g(o))),"active"in o&&r(2,l=o.active),"$$scope"in o&&r(4,e=o.$$scope)},i.$$.update=()=>{i.$$.dirty&4&&r(3,u=()=>{const a=(t=>t===!0||t==="true"||t==="")(l);return{"--p-ddl-deco":a?"":"transparent","--p-ddl-cursor":a?"default":"pointer"}}),i.$$.dirty&8&&r(0,s=D(u()))},n=g(n),[s,n,l,u,e,d]}class J extends h{constructor(n){super(),_(this,n,z,L,w,{active:2})}}export{J as default};
