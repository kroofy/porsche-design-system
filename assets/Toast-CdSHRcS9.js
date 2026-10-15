import{S as h,i as g,s as w,c as x,d as y,t as k,b as z,u as T,g as q,e as C,p,k as H,l as f,m as _,H as S,n as j,a as v,q as b}from"./svelte-DoO7z26N.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function A(n){let t,i,c=`<style>${B}</style>`,l,o,m,d,e;const u=n[2].default,s=x(u,n,n[1],null);return{c(){t=_("div"),i=new S(!1),l=j(),o=_("div"),m=_("span"),s&&s.c(),i.a=l,p(m,"data-pds-slot",""),p(o,"class","root"),p(t,"class",d="p-toast"+(n[0].class?` ${n[0].class}`:"")),p(t,"data-pds","toast")},m(a,r){H(a,t,r),i.m(c,t),f(t,l),f(t,o),f(o,m),s&&s.m(m,null),e=!0},p(a,[r]){s&&s.p&&(!e||r&2)&&T(s,u,a,a[1],e?C(u,a[1],r,null):q(a[1]),null),(!e||r&1&&d!==(d="p-toast"+(a[0].class?` ${a[0].class}`:"")))&&p(t,"class",d)},i(a){e||(z(s,a),e=!0)},o(a){k(s,a),e=!1},d(a){a&&y(t),s&&s.d(a)}}}const B=`.p-toast :where([data-pds-slot]){display:contents}

  .p-toast {
    --_p-toast-a: var(--p-toast-position-bottom, 56px) !important;
    position: fixed !important;
    inset: auto max(22px, 10.625vw - 12px) var(--_p-toast-a) !important;
    z-index: 999999 !important;
  }
  .p-toast[hidden] {
    display: none !important;
  }
  @keyframes in {
    from {
      transform: translate3d(0, calc(var(--_p-toast-a) + 100%), 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes out {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, calc(var(--_p-toast-a) + 100%), 0);
    }
  }
  @media (min-width: 760px) {
    .p-toast {
      --_p-toast-a: var(--p-toast-position-bottom, 64px) !important;
      inset: auto auto var(--_p-toast-a) 64px !important;
      max-width: min(42rem, calc(100vw - 64px * 2)) !important;
    }
  }
  .p-toast .hydrated{
    animation: var(--p-animation-duration, 0.4s) in cubic-bezier(0, 0, 0.2, 1)
      forwards;
  }
  .p-toast .close{
    animation: 0.4s out cubic-bezier(0.4, 0, 0.5, 1) forwards !important;
  }`;function D(n,t,i){let{$$slots:c={},$$scope:l}=t;return n.$$set=o=>{i(0,t=v(v({},t),b(o))),"$$scope"in o&&i(1,l=o.$$scope)},t=b(t),[t,l,c]}class J extends h{constructor(t){super(),g(this,t,D,A,w,{})}}export{J as default};
