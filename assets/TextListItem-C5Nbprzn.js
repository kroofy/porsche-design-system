import{S as v,i as h,s as y,c as b,d as T,t as q,b as C,u as H,g as S,e as k,p as r,k as w,l as _,m as f,H as I,n as L,a as g,q as x}from"./svelte-DoO7z26N.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function j(a){let t,i,c=`<style>${z}</style>`,o,n,m,d,l;const u=a[2].default,e=b(u,a,a[1],null);return{c(){t=f("div"),i=new I(!1),o=L(),n=f("div"),m=f("span"),e&&e.c(),i.a=o,r(m,"data-pds-slot",""),r(n,"class","root"),r(t,"class",d="p-text-list-item"+(a[0].class?` ${a[0].class}`:"")),r(t,"data-pds","text-list-item")},m(s,p){w(s,t,p),i.m(c,t),_(t,o),_(t,n),_(n,m),e&&e.m(m,null),l=!0},p(s,[p]){e&&e.p&&(!l||p&2)&&H(e,u,s,s[1],l?k(u,s[1],p,null):S(s[1]),null),(!l||p&1&&d!==(d="p-text-list-item"+(s[0].class?` ${s[0].class}`:"")))&&r(t,"class",d)},i(s){l||(C(e,s),l=!0)},o(s){q(e,s),l=!1},d(s){s&&T(t),e&&e.d(s)}}}const z=`.p-text-list-item :where([data-pds-slot]){display:contents}

  .p-text-list-item {
    display: grid;
    grid-template-columns: var(--_p-text-list-e) 1fr !important;
    column-gap: var(--p-spacing-static-md) !important;
    font: inherit !important;
    color: inherit !important;
  }
  .p-text-list-item[hidden] {
    display: none !important;
  }
  .p-text-list-item .root{
    display: contents;
  }
  .p-text-list-item [data-pds-slot]{
    display: inline;
  }
  .p-text-list-item [data-pds-slot] > *{
    --_p-text-list-f: 0.625rem !important;
    --_p-text-list-g: "–" !important;
    --_p-text-list-a: 2rem !important;
    --_p-text-list-b: "" !important;
  }
  .p-text-list-item [data-pds-slot] > *:last-child{
    grid-column: 2 !important;
  }`;function A(a,t,i){let{$$slots:c={},$$scope:o}=t;return a.$$set=n=>{i(0,t=g(g({},t),x(n))),"$$scope"in n&&i(1,o=n.$$scope)},t=x(t),[t,o,c]}class G extends v{constructor(t){super(),h(this,t,A,j,y,{})}}export{G as default};
