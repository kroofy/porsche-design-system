import{S as v,i as g,s as y,c as H,d as T,t as q,b as w,u as C,g as S,e as k,p,k as j,l as m,m as _,H as z,n as A,a as b,q as h}from"./svelte-DoO7z26N.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function B(s){let a,o,u=`<style>${D}</style>`,i,l,r,c,n;const f=s[2].default,e=H(f,s,s[1],null);return{c(){a=_("div"),o=new z(!1),i=A(),l=_("div"),r=_("span"),e&&e.c(),o.a=i,p(r,"data-pds-slot",""),p(l,"class","root"),p(a,"class",c="p-table-head"+(s[0].class?` ${s[0].class}`:"")),p(a,"data-pds","table-head")},m(t,d){j(t,a,d),o.m(u,a),m(a,i),m(a,l),m(l,r),e&&e.m(r,null),n=!0},p(t,[d]){e&&e.p&&(!n||d&2)&&C(e,f,t,t[1],n?k(f,t[1],d,null):S(t[1]),null),(!n||d&1&&c!==(c="p-table-head"+(t[0].class?` ${t[0].class}`:"")))&&p(a,"class",c)},i(t){n||(w(e,t),n=!0)},o(t){q(e,t),n=!1},d(t){t&&T(a),e&&e.d(t)}}}const D=`.p-table-head :where([data-pds-slot]){display:contents}

  .p-table-head {
    display: table-header-group;
    font: var(--p-font-weight-semibold) var(--p-typescale-xs) /
      var(--p-leading-normal) var(--p-font-porsche-next) !important;
    border-bottom: 1px solid var(--_p-table-c) !important;
  }
  .p-table-head[hidden] {
    display: none !important;
  }
  .p-table-head [data-pds-slot] > *{
    --_p-table-d: 0px !important;
    --_p-table-b: none !important;
  }`;function E(s,a,o){let{$$slots:u={},$$scope:i}=a;return s.$$set=l=>{o(0,a=b(b({},a),h(l))),"$$scope"in l&&o(1,i=l.$$scope)},a=h(a),[a,i,u]}class K extends v{constructor(a){super(),g(this,a,E,B,y,{})}}export{K as default};
