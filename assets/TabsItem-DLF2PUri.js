import{S as g,i as h,s as y,c as H,d as T,t as k,b as q,u as C,g as S,e as I,p as m,k as j,l as f,m as b,H as z,n as A,a as _,q as v}from"./svelte-DoO7z26N.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function B(e){let t,n,d=`<style>${D}</style>`,r,i,l,u,o;const p=e[3].default,a=H(p,e,e[2],null);return{c(){t=b("div"),n=new z(!1),r=A(),i=b("div"),l=b("span"),a&&a.c(),n.a=r,m(l,"data-pds-slot",""),m(i,"class","root"),m(t,"class",u="p-tabs-item"+(e[0].class?` ${e[0].class}`:"")),m(t,"data-pds","tabs-item")},m(s,c){j(s,t,c),n.m(d,t),f(t,r),f(t,i),f(i,l),a&&a.m(l,null),o=!0},p(s,[c]){a&&a.p&&(!o||c&4)&&C(a,p,s,s[2],o?I(p,s[2],c,null):S(s[2]),null),(!o||c&1&&u!==(u="p-tabs-item"+(s[0].class?` ${s[0].class}`:"")))&&m(t,"class",u)},i(s){o||(q(a,s),o=!0)},o(s){k(a,s),o=!1},d(s){s&&T(t),a&&a.d(s)}}}const D=`.p-tabs-item :where([data-pds-slot]){display:contents}

  .p-tabs-item {
    display: block;
    color: var(--p-color-primary) !important;
    border-radius: 2px !important;
  }
  .p-tabs-item[hidden] {
    display: none !important;
  }
  .p-tabs-item:focus-visible {
    outline: 2px solid var(--p-color-focus) !important;
    outline-offset: 2px !important;
  }
  @media (forced-colors: active) {
    .p-tabs-item:focus-visible {
      outline-color: Highlight !important;
    }
  }`;function E(e,t,n){let{$$slots:d={},$$scope:r}=t,{label:i}=t;return e.$$set=l=>{n(0,t=_(_({},t),v(l))),"label"in l&&n(1,i=l.label),"$$scope"in l&&n(2,r=l.$$scope)},e.$$.update=()=>{e.$$.dirty&2},t=v(t),[t,i,r,d]}class L extends g{constructor(t){super(),h(this,t,E,B,y,{label:1})}}export{L as default};
