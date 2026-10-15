import{S as w,i as g,s as h,c as y,d as k,t as T,b as q,u as C,g as H,e as S,p as d,k as R,l as m,m as f,H as j,n as z,a as b,q as v}from"./svelte-DoO7z26N.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function A(s){let a,o,c=`<style>${B}</style>`,r,l,p,u,n;const _=s[2].default,e=y(_,s,s[1],null);return{c(){a=f("div"),o=new j(!1),r=z(),l=f("div"),p=f("span"),e&&e.c(),o.a=r,d(p,"data-pds-slot",""),d(l,"class","root"),d(a,"class",u="p-table-row"+(s[0].class?` ${s[0].class}`:"")),d(a,"data-pds","table-row")},m(t,i){R(t,a,i),o.m(c,a),m(a,r),m(a,l),m(l,p),e&&e.m(p,null),n=!0},p(t,[i]){e&&e.p&&(!n||i&2)&&C(e,_,t,t[1],n?S(_,t[1],i,null):H(t[1]),null),(!n||i&1&&u!==(u="p-table-row"+(t[0].class?` ${t[0].class}`:"")))&&d(a,"class",u)},i(t){n||(q(e,t),n=!0)},o(t){T(e,t),n=!1},d(t){t&&k(a),e&&e.d(t)}}}const B=`.p-table-row :where([data-pds-slot]){display:contents}

  .p-table-row {
    display: table-row;
    border-bottom: var(--_p-table-d) solid var(--_p-table-c) !important;
    transition: background var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out) !important;
  }
  .p-table-row[hidden] {
    display: none !important;
  }
  @media (hover: hover) {
    .p-table-row:hover {
      background: var(--_p-table-b) !important;
    }
  }`;function D(s,a,o){let{$$slots:c={},$$scope:r}=a;return s.$$set=l=>{o(0,a=b(b({},a),v(l))),"$$scope"in l&&o(1,r=l.$$scope)},a=v(a),[a,r,c]}class J extends w{constructor(a){super(),g(this,a,D,A,h,{})}}export{J as default};
