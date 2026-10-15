import{S as g,i as v,s as h,c as T,d as q,t as w,b as C,u as H,g as S,e as k,p as r,k as B,l as _,m,H as j,n as z,a as b,q as y}from"./svelte-DoO7z26N.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function A(e){let s,o,p=`<style>${D}</style>`,i,l,u,c,n;const f=e[2].default,a=T(f,e,e[1],null);return{c(){s=m("div"),o=new j(!1),i=z(),l=m("div"),u=m("span"),a&&a.c(),o.a=i,r(u,"data-pds-slot",""),r(l,"class","root"),r(s,"class",c="p-table-body"+(e[0].class?` ${e[0].class}`:"")),r(s,"data-pds","table-body")},m(t,d){B(t,s,d),o.m(p,s),_(s,i),_(s,l),_(l,u),a&&a.m(u,null),n=!0},p(t,[d]){a&&a.p&&(!n||d&2)&&H(a,f,t,t[1],n?k(f,t[1],d,null):S(t[1]),null),(!n||d&1&&c!==(c="p-table-body"+(t[0].class?` ${t[0].class}`:"")))&&r(s,"class",c)},i(t){n||(C(a,t),n=!0)},o(t){w(a,t),n=!1},d(t){t&&q(s),a&&a.d(t)}}}const D=`.p-table-body :where([data-pds-slot]){display:contents}

  .p-table-body {
    display: table-row-group;
  }
  .p-table-body[hidden] {
    display: none !important;
  }`;function E(e,s,o){let{$$slots:p={},$$scope:i}=s;return e.$$set=l=>{o(0,s=b(b({},s),y(l))),"$$scope"in l&&o(1,i=l.$$scope)},s=y(s),[s,i,p]}class K extends g{constructor(s){super(),v(this,s,E,A,h,{})}}export{K as default};
