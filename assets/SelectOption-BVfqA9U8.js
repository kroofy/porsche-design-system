import{S as H,i as P,s as T,c as j,a as _,d as q,v as A,t as b,b as y,u as C,g as G,e as w,h as x,j as z,k as I,l as f,w as O,m as v,H as B,n as D,x as E,p as k,q as S}from"./svelte-DoO7z26N.js";import{s as F,h as J}from"./host-DRskmCSE.js";import K from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function L(o){let n,i,g=`<style>${M}</style>`,m,p,u,r,c,s;const d=o[9].default,a=j(d,o,o[8],null);r=new K({props:{name:"check",color:"primary"}});let h=[{class:c="p-select-option"+(o[2].class?` ${o[2].class}`:"")},{"data-pds":"select-option"},{style:o[1]},o[0]],e={};for(let t=0;t<h.length;t+=1)e=_(e,h[t]);return{c(){n=v("div"),i=new B(!1),m=D(),p=v("div"),u=v("span"),a&&a.c(),E(r.$$.fragment),i.a=m,k(u,"data-pds-slot",""),k(p,"class","option"),x(n,e)},m(t,l){I(t,n,l),i.m(g,n),f(n,m),f(n,p),f(p,u),a&&a.m(u,null),O(r,p,null),s=!0},p(t,[l]){a&&a.p&&(!s||l&256)&&C(a,d,t,t[8],s?w(d,t[8],l,null):G(t[8]),null),x(n,e=z(h,[(!s||l&4&&c!==(c="p-select-option"+(t[2].class?` ${t[2].class}`:"")))&&{class:c},{"data-pds":"select-option"},(!s||l&2)&&{style:t[1]},l&1&&t[0]]))},i(t){s||(y(a,t),y(r.$$.fragment,t),s=!0)},o(t){b(a,t),b(r.$$.fragment,t),s=!1},d(t){t&&q(n),a&&a.d(t),A(r)}}}const M=`.p-select-option :where([data-pds-slot]){display:contents}

  .p-select-option {
    display: block;
    opacity: var(--p-select-option-opacity) !important;
    scroll-margin-block-start: calc(
      max(2px, var(--_p-select-option-a, 1) * 6px) + 36px
    ) !important;
    scroll-margin-block-end: max(
      2px,
      var(--_p-select-option-a, 1) * 6px
    ) !important;
  }
  .p-select-option[hidden] {
    display: none !important;
  }
  .p-select-option [data-pds-slot] > img{
    font: var(--p-typescale-sm) var(--p-font-porsche-next) !important;
    width: auto !important;
    height: var(--p-leading-normal) !important;
    border-radius: var(--p-radius-sm) !important;
  }
  .p-select-option .option{
    display: flex;
    gap: calc(11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px);
    padding-block: calc(
      11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px
    );
    padding-inline: var(
        --_p-select-option-b,
        calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px)
      )
      calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px);
    min-height: var(--p-leading-normal);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-contrast-high);
    cursor: var(--p-select-option-cursor, pointer);
    text-align: start;
    word-break: break-word;
    box-sizing: content-box;
    border-radius: var(--p-radius-sm);
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-select-option .option--highlighted{
    background: var(--p-color-frosted);
  }
  .p-select-option .option--highlighted,
  .p-select-option .option--selected{
    color: var(--p-color-primary);
  }
  .p-select-option .option--disabled{
    cursor: not-allowed;
  }
  .p-select-option .option--hidden{
    display: none;
  }
  .p-select-option .icon{
    margin-inline-start: auto;
  }
  @media (forced-colors: active) {
    .p-select-option {
      opacity: var(--p-select-option-fc-opacity) !important;
      color: var(--p-select-option-fc-color) !important;
    }
    .p-select-option .option--disabled{
      color: GrayText;
    }
    .p-select-option .option--highlighted{
      forced-color-adjust: none;
      outline: 2px solid Highlight;
      outline-offset: -2px;
    }
  }`;function N(o,n,i){let g,m,p,{$$slots:u={},$$scope:r}=n,{disabled:c}=n,{disabledParent:s}=n,{selected:d}=n,{highlighted:a}=n;function h(){return{disabled:c,disabledParent:s,selected:d,highlighted:a}}return o.$$set=e=>{i(2,n=_(_({},n),S(e))),"disabled"in e&&i(3,c=e.disabled),"disabledParent"in e&&i(4,s=e.disabledParent),"selected"in e&&i(5,d=e.selected),"highlighted"in e&&i(6,a=e.highlighted),"$$scope"in e&&i(8,r=e.$$scope)},o.$$.update=()=>{o.$$.dirty&16&&i(7,g=()=>{const e=l=>l===!0||l==="true"||l==="",t=e(h().disabled)||e(s);return{"--p-select-option-opacity":t?"0.4":"","--p-select-option-fc-opacity":t?"1":"","--p-select-option-fc-color":t?"GrayText":"","--p-select-option-cursor":t?"not-allowed":""}}),o.$$.dirty&24,o.$$.dirty&32,o.$$.dirty&64,o.$$.dirty&16,o.$$.dirty&128&&i(1,m=F(g())),i(0,p=J({hidden:n.hidden}))},n=S(n),[p,m,n,c,s,d,a,g,r,u]}class Z extends H{constructor(n){super(),P(this,n,N,L,T,{disabled:3,disabledParent:4,selected:5,highlighted:6})}}export{Z as default};
