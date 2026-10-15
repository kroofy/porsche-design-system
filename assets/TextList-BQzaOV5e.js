import{S as v,i as g,s as b,c as h,d as w,t as j,b as S,u as H,g as T,e as k,p as c,k as q,l as m,m as d,H as C,n as L,a as _,q as y}from"./svelte-DoO7z26N.js";import{s as P}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function z(l){let t,i,x=`<style>${A}</style>`,o,f,r,p,a;const s=l[5].default,n=h(s,l,l[4],null);return{c(){t=d("div"),i=new C(!1),o=L(),f=d("ul"),r=d("span"),n&&n.c(),i.a=o,c(r,"data-pds-slot",""),c(t,"class",p="p-text-list"+(l[1].class?` ${l[1].class}`:"")),c(t,"data-pds","text-list"),c(t,"style",l[0])},m(e,u){q(e,t,u),i.m(x,t),m(t,o),m(t,f),m(f,r),n&&n.m(r,null),a=!0},p(e,[u]){n&&n.p&&(!a||u&16)&&H(n,s,e,e[4],a?k(s,e[4],u,null):T(e[4]),null),(!a||u&2&&p!==(p="p-text-list"+(e[1].class?` ${e[1].class}`:"")))&&c(t,"class",p),(!a||u&1)&&c(t,"style",e[0])},i(e){a||(S(n,e),a=!0)},o(e){j(n,e),a=!1},d(e){e&&w(t),n&&n.d(e)}}}const A=`.p-text-list :where([data-pds-slot]){display:contents}

  .p-text-list {
    display: block;
    counter-reset: p-text-list-counter !important;
  }
  .p-text-list[hidden] {
    display: none !important;
  }
  .p-text-list ol,
  .p-text-list ul{
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    margin: 0;
    padding: var(--_p-text-list-d, 0) 0 var(--_p-text-list-c, 0) 0;
    list-style-type: none;
    color: var(--p-color-primary);
  }
  .p-text-list [data-pds-slot] > *{
    --_p-text-list-d: var(--p-spacing-static-xs) !important;
    --_p-text-list-c: var(--p-spacing-static-md) !important;
    --_p-text-list-e: var(
      --p-text-list-e,
      var(--_p-text-list-f, 0.375rem)
    ) !important;
  }
  .p-text-list [data-pds-slot] > *::before{
    content: var(--p-text-list-before, var(--_p-text-list-g, "•")) !important;
    counter-increment: var(--p-text-list-inc, none) !important;
    justify-self: var(--p-text-list-justify, unset) !important;
    white-space: var(--p-text-list-ws, unset) !important;
  }`;function B(l,t,i){let x,o,{$$slots:f={},$$scope:r}=t,{type:p}=t;function a(){return{type:p}}return l.$$set=s=>{i(1,t=_(_({},t),y(s))),"type"in s&&i(2,p=s.type),"$$scope"in s&&i(4,r=s.$$scope)},l.$$.update=()=>{l.$$.dirty&8&&i(0,o=P(x()))},i(3,x=()=>{const s=a().type||"unordered";return s==="numbered"?{"--p-text-list-e":"var(--_p-text-list-a, 1.5rem)","--p-text-list-before":"counters(p-text-list-counter, '.', decimal) var(--_p-text-list-b, '.')","--p-text-list-inc":"p-text-list-counter","--p-text-list-justify":"flex-end","--p-text-list-ws":"nowrap"}:s==="alphabetically"?{"--p-text-list-e":"var(--_p-text-list-a, 1.5rem)","--p-text-list-before":"counters(p-text-list-counter, '.', lower-latin) var(--_p-text-list-b, '.')","--p-text-list-inc":"p-text-list-counter","--p-text-list-justify":"flex-end","--p-text-list-ws":"nowrap"}:{"--p-text-list-e":"var(--_p-text-list-f, .375rem)","--p-text-list-before":"var(--_p-text-list-g, '•')","--p-text-list-inc":"none","--p-text-list-justify":"unset","--p-text-list-ws":"unset"}}),t=y(t),[o,t,p,x,r,f]}class J extends v{constructor(t){super(),g(this,t,B,z,b,{type:2})}}export{J as default};
