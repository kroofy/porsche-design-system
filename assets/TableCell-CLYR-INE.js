import{S as y,i as h,s as v,c as S,d as w,t as C,b as H,u as T,g as q,e as k,p as u,k as P,l as f,m as _,H as j,n as z,a as b,q as g}from"./svelte-DoO7z26N.js";import{s as A}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function B(a){let l,i,d=`<style>${D}</style>`,c,m,r,o,e;const n=a[5].default,s=S(n,a,a[4],null);return{c(){l=_("div"),i=new j(!1),c=z(),m=_("div"),r=_("span"),s&&s.c(),i.a=c,u(r,"data-pds-slot",""),u(m,"class","root"),u(l,"class",o="p-table-cell"+(a[1].class?` ${a[1].class}`:"")),u(l,"data-pds","table-cell"),u(l,"style",a[0])},m(t,p){P(t,l,p),i.m(d,l),f(l,c),f(l,m),f(m,r),s&&s.m(r,null),e=!0},p(t,[p]){s&&s.p&&(!e||p&16)&&T(s,n,t,t[4],e?k(n,t[4],p,null):q(t[4]),null),(!e||p&2&&o!==(o="p-table-cell"+(t[1].class?` ${t[1].class}`:"")))&&u(l,"class",o),(!e||p&1)&&u(l,"style",t[0])},i(t){e||(H(s,t),e=!0)},o(t){C(s,t),e=!1},d(t){t&&w(l),s&&s.d(t)}}}const D=`.p-table-cell :where([data-pds-slot]){display:contents}

  .p-table-cell {
    display: table-cell;
    vertical-align: middle;
    padding: var(--_p-table-a) !important;
    margin: 0 !important;
    white-space: var(--p-table-cell-ws, nowrap) !important;
  }
  .p-table-cell[hidden] {
    display: none !important;
  }`;function E(a,l,i){let d,c,{$$slots:m={},$$scope:r}=l,{multiline:o}=l;function e(){return{multiline:o}}return a.$$set=n=>{i(1,l=b(b({},l),g(n))),"multiline"in n&&i(2,o=n.multiline),"$$scope"in n&&i(4,r=n.$$scope)},a.$$.update=()=>{a.$$.dirty&8&&i(0,c=A(d()))},i(3,d=()=>({"--p-table-cell-ws":e().multiline===!0||e().multiline==="true"||e().multiline===""?"normal":"nowrap"})),l=g(l),[c,l,o,d,r,m]}class L extends y{constructor(l){super(),h(this,l,E,B,v,{multiline:2})}}export{L as default};
