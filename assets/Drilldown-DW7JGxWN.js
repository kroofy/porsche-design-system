import{S as I,i as J,s as K,c as M,a as q,d as h,v as L,t as y,b as k,u as N,g as O,e as Q,h as P,j as R,k as x,l as m,w as B,m as f,H as U,n as E,x as D,p as H,q as F,o as A}from"./svelte-DoO7z26N.js";import{h as V}from"./host-DRskmCSE.js";import W from"./ButtonPure-Dc5XN6Cq.js";import G from"./Button-Cppb_Zxw.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./Spinner-CHLfbpXm.js";import"./Icon-MNhZuw6T.js";import"./index-ChNsHkGO.js";function X(t){let n;return{c(){n=A(`Back
    `)},m(r,l){x(r,n,l)},d(r){r&&h(n)}}}function Y(t){let n;return{c(){n=A(`Dismiss drilldown
    `)},m(r,l){x(r,n,l)},d(r){r&&h(n)}}}function Z(t){let n;return{c(){n=A("Dismiss drilldown")},m(r,l){x(r,n,l)},d(r){r&&h(n)}}}function nn(t){let n,r,l=`<style>${an}</style>`,g,p,o,s,i,c,C,v,w,b,u;s=new W({props:{class:"back",type:"button",size:"small",alignLabel:"end",stretch:"true",icon:"arrow-left",hideLabel:"true",$$slots:{default:[X]},$$scope:{ctx:t}}}),i=new G({props:{class:"dismiss-mobile",type:"button",icon:"close",compact:"true",variant:"secondary",hideLabel:"true",$$slots:{default:[Y]},$$scope:{ctx:t}}}),c=new G({props:{class:"dismiss-desktop",type:"button",icon:"close",variant:"secondary",hideLabel:"true",$$slots:{default:[Z]},$$scope:{ctx:t}}});const $=t[4].default,e=M($,t,t[5],null);let z=[{class:b="p-drilldown"+(t[1].class?` ${t[1].class}`:"")},{"data-pds":"drilldown"},t[0]],_={};for(let a=0;a<z.length;a+=1)_=q(_,z[a]);return{c(){n=f("div"),r=new U(!1),g=E(),p=f("dialog"),o=f("div"),D(s.$$.fragment),D(i.$$.fragment),D(c.$$.fragment),C=E(),v=f("div"),w=f("span"),e&&e.c(),r.a=g,H(w,"data-pds-slot",""),H(v,"class","scroller"),H(o,"class","drawer"),p.inert=!0,P(n,_)},m(a,d){x(a,n,d),r.m(l,n),m(n,g),m(n,p),m(p,o),B(s,o,null),B(i,o,null),B(c,o,null),m(o,C),m(o,v),m(v,w),e&&e.m(w,null),u=!0},p(a,[d]){const S={};d&32&&(S.$$scope={dirty:d,ctx:a}),s.$set(S);const T={};d&32&&(T.$$scope={dirty:d,ctx:a}),i.$set(T);const j={};d&32&&(j.$$scope={dirty:d,ctx:a}),c.$set(j),e&&e.p&&(!u||d&32)&&N(e,$,a,a[5],u?Q($,a[5],d,null):O(a[5]),null),P(n,_=R(z,[(!u||d&2&&b!==(b="p-drilldown"+(a[1].class?` ${a[1].class}`:"")))&&{class:b},{"data-pds":"drilldown"},d&1&&a[0]]))},i(a){u||(k(s.$$.fragment,a),k(i.$$.fragment,a),k(c.$$.fragment,a),k(e,a),u=!0)},o(a){y(s.$$.fragment,a),y(i.$$.fragment,a),y(c.$$.fragment,a),y(e,a),u=!1},d(a){a&&h(n),L(s),L(i),L(c),e&&e.d(a)}}}const an=`.p-drilldown :where([data-pds-slot]){display:contents}

  @keyframes slide-up-mobile {
    from {
      transform: translate3d(0, var(--p-spacing-fluid-md), 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes slide-up-desktop {
    from {
      margin-block-start: var(--p-spacing-fluid-md);
    }
    to {
      margin-block-start: 0px;
    }
  }
  .p-drilldown {
    display: block;
    --_p-drilldown-a: var(--p-color-primary) !important;
    --_p-drilldown-b: var(--p-color-canvas) !important;
    --_p-drilldown-c: var(--p-color-surface) !important;
    --_p-drilldown-d: var(--p-color-backdrop) !important;
    --_p-drilldown-f: rgba(255, 255, 255, 0.01) !important;
  }
  .p-drilldown[hidden] {
    display: none !important;
  }
  .p-drilldown [data-pds-slot] > *{
    --p-drilldown-grid-template: auto/auto;
    --p-drilldown-gap: var(--p-spacing-fluid-xs);
  }
  .p-drilldown dialog{
    all: unset;
    position: fixed;
    inset: 0;
    z-index: 999999999;
    outline: 0;
    visibility: hidden;
    transition: visibility 0s linear
        var(--p-transition-duration, var(--p-duration-md)),
      overlay var(--p-transition-duration, var(--p-duration-md))
        var(--p-ease-out) allow-discrete,
      background var(--p-transition-duration, var(--p-duration-md))
        var(--p-ease-out),
      backdrop-filter var(--p-transition-duration, var(--p-duration-md))
        var(--p-ease-out),
      -webkit-backdrop-filter var(--p-transition-duration, var(--p-duration-md))
        var(--p-ease-out);
  }
  .p-drilldown[open] dialog {
    visibility: inherit;
    -webkit-backdrop-filter: var(--p-blur-frosted);
    backdrop-filter: var(--p-blur-frosted);
    background: var(--_p-drilldown-d);
    transition: background var(--p-transition-duration, var(--p-duration-lg))
        var(--p-ease-in),
      backdrop-filter var(--p-transition-duration, var(--p-duration-lg))
        var(--p-ease-in),
      -webkit-backdrop-filter var(--p-transition-duration, var(--p-duration-lg))
        var(--p-ease-in);
  }
  .p-drilldown dialog::backdrop{
    display: none;
  }
  .p-drilldown .drawer{
    position: absolute;
    inset: 0;
    display: grid;
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    transition: opacity var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-out),
      transform var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-out);
  }
  .p-drilldown[open] .drawer {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: opacity var(--p-transition-duration, var(--p-duration-md))
        var(--p-ease-in),
      transform var(--p-transition-duration, var(--p-duration-md))
        var(--p-ease-in);
  }
  .p-drilldown:not([open]) .drawer:dir(rtl) {
    transform: translate3d(100%, 0, 0);
  }
  .p-drilldown .drawer::before,
  .p-drilldown .drawer::after{
    content: "";
    position: relative;
    z-index: 2;
    pointer-events: none;
    opacity: 0;
  }
  .p-drilldown .scroller{
    display: contents;
    overflow: hidden auto;
    background: var(--_p-drilldown-f);
  }
  .p-drilldown .back{
    display: none;
  }
  @media (min-width: 760px) {
    .p-drilldown[data-primary] [data-pds-slot] {
      grid-area: 3/2 / auto/-2;
      display: grid;
      grid-template: var(--p-drilldown-grid-template, auto/auto);
      gap: var(--p-drilldown-gap, var(--p-spacing-fluid-xs));
      align-content: start;
      align-items: start;
      box-sizing: border-box;
      min-height: 100%;
      height: fit-content;
      padding-block-end: var(--p-spacing-fluid-lg);
      animation: slide-up-desktop
        var(--p-animation-duration, var(--p-duration-md)) var(--p-ease-in-out);
    }
    .p-drilldown[data-secondary]:not([data-primary])
      [data-pds-slot] > *:not([primary], [cascade]) {
      display: none !important;
    }
    .p-drilldown[data-secondary] .drawer {
      width: calc(clamp(338px, 210px + 18vw, 640px) * 2);
      grid-template: var(--p-spacing-fluid-md) auto minmax(0, 1fr) / repeat(
          2,
          var(--p-spacing-fluid-lg) minmax(0, 1fr) var(--p-spacing-fluid-lg)
        );
      background: linear-gradient(
        90deg,
        var(--_p-drilldown-b) 0%,
        var(--_p-drilldown-b) 50%,
        var(--_p-drilldown-c) 50%,
        var(--_p-drilldown-c) 100%
      );
    }
    .p-drilldown[data-secondary] .drawer:dir(rtl) {
      background: linear-gradient(
        90deg,
        var(--_p-drilldown-c) 0%,
        var(--_p-drilldown-c) 50%,
        var(--_p-drilldown-b) 50%,
        var(--_p-drilldown-b) 100%
      );
    }
    .p-drilldown:not([data-secondary]) .drawer {
      width: clamp(338px, 210px + 18vw, 640px);
      grid-template: var(--p-spacing-fluid-md) auto minmax(0, 1fr) / repeat(
          1,
          var(--p-spacing-fluid-lg) minmax(0, 1fr) var(--p-spacing-fluid-lg)
        );
      background: var(--_p-drilldown-b);
    }
    .p-drilldown .drawer::after{
      grid-area: 1/4/-1/-1;
      background: var(--_p-drilldown-c);
    }
    .p-drilldown .drawer::before{
      grid-area: 1/1/-1/4;
      background: var(--_p-drilldown-b);
    }
    .p-drilldown .scroller{
      grid-area: 1/1/-1/4;
      display: grid;
      grid-template-rows: subgrid;
      grid-template-columns: subgrid;
    }
    .p-drilldown .dismiss-mobile{
      display: none;
    }
    .p-drilldown .dismiss-desktop{
      --p-color-primary: hsl(225 100% 99%);
      --p-color-frosted: hsl(240 2% 43% / 0.228);
      --p-color-frosted-soft: hsl(240 3.7% 26.5% / 0.154);
      position: absolute;
      inset-inline-start: calc(100% + var(--p-spacing-fluid-sm));
      inset-block-start: var(--p-spacing-fluid-sm);
      padding: var(--p-spacing-static-sm);
    }
  }
  @media (max-width: 759px) {
    .p-drilldown:not([data-secondary]) [data-pds-slot] {
      display: grid;
      grid-area: 4/2 / auto/-2;
      z-index: 0;
      grid-template: var(--p-drilldown-grid-template, auto/auto);
      gap: var(--p-drilldown-gap, var(--p-spacing-fluid-xs));
      align-content: start;
      align-items: start;
      box-sizing: border-box;
      min-height: 100%;
      height: fit-content;
      padding-block-end: var(--p-spacing-fluid-lg);
    }
    .p-drilldown[data-primary]:not([data-secondary]) [data-pds-slot] {
      animation: slide-up-mobile
        var(--p-animation-duration, var(--p-duration-md)) var(--p-ease-in-out);
    }
    .p-drilldown[data-secondary] [data-pds-slot] {
      display: contents;
    }
    .p-drilldown[data-secondary]
      [data-pds-slot] > *:not([primary], [secondary], [cascade]) {
      display: none !important;
    }
    .p-drilldown .drawer{
      grid-template: var(--p-spacing-fluid-md) auto var(--p-spacing-fluid-lg) minmax(
          0,
          1fr
        ) / var(--p-spacing-fluid-lg) auto minmax(0, 1fr) auto var(
          --p-spacing-fluid-lg
        );
      background: var(--_p-drilldown-b);
    }
    .p-drilldown .drawer::after,
    .p-drilldown .drawer::before{
      grid-area: 1/1/-1/-1;
      background: var(--_p-drilldown-b);
    }
    .p-drilldown:not([data-secondary]) .scroller {
      grid-area: 1/1/-1/-1;
      display: grid;
      grid-template-rows: subgrid;
      grid-template-columns: subgrid;
    }
    .p-drilldown:not([data-secondary]) .scroller::before {
      content: "";
      position: sticky;
      top: 0;
      grid-area: 1/1/4/-1;
      z-index: 1;
      background: linear-gradient(
        180deg,
        var(--_p-drilldown-b) 0%,
        var(--_p-drilldown-b) 65%,
        transparent 100%
      );
    }
    .p-drilldown .dismiss-mobile{
      width: fit-content;
      height: fit-content;
      place-self: start end;
      grid-area: 2/4;
      z-index: 3;
      margin-inline-end: -1px;
    }
    .p-drilldown .dismiss-desktop{
      display: none;
    }
    .p-drilldown[data-secondary][data-primary] .back {
      display: block;
      grid-area: 2/2;
      width: fit-content;
      height: fit-content;
      place-self: center;
      z-index: 2;
    }
  }`;function rn(t,n,r){let l,{$$slots:g={},$$scope:p}=n,{open:o}=n,{aria:s}=n;return t.$$set=i=>{r(1,n=q(q({},n),F(i))),"open"in i&&r(2,o=i.open),"aria"in i&&r(3,s=i.aria),"$$scope"in i&&r(5,p=i.$$scope)},t.$$.update=()=>{t.$$.dirty&8,r(0,l=V({open:n.open}))},n=F(n),[l,n,o,s,g,p]}class gn extends I{constructor(n){super(),J(this,n,rn,nn,K,{open:2,aria:3})}}export{gn as default};
