import{S as T,i as k,s as q,c as A,a as x,d as C,t as j,b as G,f as O,u as P,g as z,e as B,h as S,j as D,k as E,l as m,m as v,H as F,n as I,o as J,p as y,q as H}from"./svelte-DoO7z26N.js";import{s as K,h as L}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function M(e){let a,s,f=`<style>${N}</style>`,c,r,i,g=e[2]()+"",_,d,n,l;const o=e[8].default,p=A(o,e,e[7],null);let h=[{class:n="p-optgroup"+(e[3].class?` ${e[3].class}`:"")},{"data-pds":"optgroup"},{style:e[1]},e[0]],b={};for(let t=0;t<h.length;t+=1)b=x(b,h[t]);return{c(){a=v("div"),s=new F(!1),c=I(),r=v("div"),i=v("span"),_=J(g),d=v("span"),p&&p.c(),s.a=c,y(i,"id","label"),y(i,"role","presentation"),y(d,"data-pds-slot",""),y(r,"role","group"),S(a,b)},m(t,u){E(t,a,u),s.m(f,a),m(a,c),m(a,r),m(r,i),m(i,_),m(r,d),p&&p.m(d,null),l=!0},p(t,[u]){(!l||u&4)&&g!==(g=t[2]()+"")&&O(_,g),p&&p.p&&(!l||u&128)&&P(p,o,t,t[7],l?B(o,t[7],u,null):z(t[7]),null),S(a,b=D(h,[(!l||u&8&&n!==(n="p-optgroup"+(t[3].class?` ${t[3].class}`:"")))&&{class:n},{"data-pds":"optgroup"},(!l||u&2)&&{style:t[1]},u&1&&t[0]]))},i(t){l||(G(p,t),l=!0)},o(t){j(p,t),l=!1},d(t){t&&C(a),p&&p.d(t)}}}const N=`.p-optgroup :where([data-pds-slot]){display:contents}

  .p-optgroup {
    display: block;
  }
  .p-optgroup[hidden] {
    display: none !important;
  }
  .p-optgroup [data-pds-slot] > *{
    --_p-select-option-b: calc(
      44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px
    );
    --_p-multi-select-option-b: calc(
      44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px
    );
  }
  .p-optgroup [role="group"]{
    display: flex;
    flex-direction: column;
    gap: calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);
  }
  .p-optgroup [role="presentation"]{
    padding-block: calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);
    padding-inline: calc(16.8px * (var(--_p-optgroup-a) - 0.64285714) + 6px);
    font: var(--p-font-weight-semibold) var(--p-typescale-xs) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-primary);
    opacity: var(--p-optgroup-opacity, 1);
  }
  @media (forced-colors: active) {
    .p-optgroup [role="presentation"]{
      opacity: 1;
      color: var(--p-optgroup-hcm-color, var(--p-color-primary));
    }
  }`;function Q(e,a,s){let f,c,r,i,{$$slots:g={},$$scope:_}=a,{disabled:d}=a,{label:n}=a;function l(){return{disabled:d,label:n}}return e.$$set=o=>{s(3,a=x(x({},a),H(o))),"disabled"in o&&s(4,d=o.disabled),"label"in o&&s(5,n=o.label),"$$scope"in o&&s(7,_=o.$$scope)},e.$$.update=()=>{e.$$.dirty&32&&s(2,c=()=>n||""),e.$$.dirty&16,e.$$.dirty&64&&s(1,r=K(f())),s(0,i=L({hidden:a.hidden}))},s(6,f=()=>{const o=l().disabled===!0||l().disabled==="true"||l().disabled==="";return{"--p-optgroup-opacity":o?"0.4":"1","--p-optgroup-hcm-color":o?"GrayText":"var(--p-color-primary)"}}),a=H(a),[i,r,c,a,d,n,f,_,g]}class Y extends T{constructor(a){super(),k(this,a,Q,M,q,{disabled:4,label:5})}}export{Y as default};
