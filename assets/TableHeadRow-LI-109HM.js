import{S as w,i as g,s as v,c as y,d as H,t as T,b as q,u as C,g as S,e as k,p as r,k as R,l as _,m,H as j,n as z,a as h,q as b}from"./svelte-DoO7z26N.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function A(t){let a,o,p=`<style>${B}</style>`,i,l,u,c,n;const f=t[2].default,s=y(f,t,t[1],null);return{c(){a=m("div"),o=new j(!1),i=z(),l=m("div"),u=m("span"),s&&s.c(),o.a=i,r(u,"data-pds-slot",""),r(l,"class","root"),r(a,"class",c="p-table-head-row"+(t[0].class?` ${t[0].class}`:"")),r(a,"data-pds","table-head-row")},m(e,d){R(e,a,d),o.m(p,a),_(a,i),_(a,l),_(l,u),s&&s.m(u,null),n=!0},p(e,[d]){s&&s.p&&(!n||d&2)&&C(s,f,e,e[1],n?k(f,e[1],d,null):S(e[1]),null),(!n||d&1&&c!==(c="p-table-head-row"+(e[0].class?` ${e[0].class}`:"")))&&r(a,"class",c)},i(e){n||(q(s,e),n=!0)},o(e){T(s,e),n=!1},d(e){e&&H(a),s&&s.d(e)}}}const B=`.p-table-head-row :where([data-pds-slot]){display:contents}

  .p-table-head-row {
    display: table-row;
  }
  .p-table-head-row[hidden] {
    display: none !important;
  }`;function D(t,a,o){let{$$slots:p={},$$scope:i}=a;return t.$$set=l=>{o(0,a=h(h({},a),b(l))),"$$scope"in l&&o(1,i=l.$$scope)},a=b(a),[a,i,p]}class J extends w{constructor(a){super(),g(this,a,D,A,v,{})}}export{J as default};
