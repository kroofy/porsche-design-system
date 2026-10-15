import{S as F,i as M,s as U,c as _,d as j,t as B,b as T,u as S,g as z,e as C,p as o,k as D,l as m,m as f,H as O,n as P,a as H,q as L}from"./svelte-DoO7z26N.js";import{s as A}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const E=e=>({}),q=e=>({});function G(e){let a,d,k=`<style>${I}</style>`,b,u,g,p,l,h,v,y,s;const t=e[8].header,r=_(t,e,e[7],q),x=e[8].default,i=_(x,e,e[7],null);return{c(){a=f("div"),d=new O(!1),b=P(),u=f("dialog"),g=f("div"),p=f("div"),l=f("button"),l.innerHTML="<span>Dismiss sheet</span>",h=f("span"),r&&r.c(),v=f("span"),i&&i.c(),d.a=b,o(l,"class","dismiss"),o(l,"type","button"),o(h,"data-pds-slot","header"),o(v,"data-pds-slot",""),o(p,"class","sheet"),o(g,"class","scroller"),o(u,"aria-modal","true"),u.inert=!0,o(u,"tabindex",-1),o(a,"class",y="p-sheet"+(e[1].class?` ${e[1].class}`:"")),o(a,"data-pds","sheet"),o(a,"style",e[0])},m(n,c){D(n,a,c),d.m(k,a),m(a,b),m(a,u),m(u,g),m(g,p),m(p,l),m(p,h),r&&r.m(h,null),m(p,v),i&&i.m(v,null),s=!0},p(n,[c]){r&&r.p&&(!s||c&128)&&S(r,t,n,n[7],s?C(t,n[7],c,E):z(n[7]),q),i&&i.p&&(!s||c&128)&&S(i,x,n,n[7],s?C(x,n[7],c,null):z(n[7]),null),(!s||c&2&&y!==(y="p-sheet"+(n[1].class?` ${n[1].class}`:"")))&&o(a,"class",y),(!s||c&1)&&o(a,"style",n[0])},i(n){s||(T(r,n),T(i,n),s=!0)},o(n){B(r,n),B(i,n),s=!1},d(n){n&&j(a),r&&r.d(n),i&&i.d(n)}}}const I=`.p-sheet :where([data-pds-slot]){display:contents}

  .p-sheet {
    display: contents;
    --ref-p-sheet-pt: var(--p-spacing-fluid-md) !important;
    --ref-p-sheet-pb: calc(
      var(--p-radius-3xl) + var(--p-spacing-fluid-md)
    ) !important;
    --ref-p-sheet-px: var(--p-spacing-fluid-lg) !important;
    --pds-internal-grid-outer-column: calc(
      var(--p-spacing-fluid-lg) - clamp(16px, 1.25vw + 12px, 36px)
    ) !important;
    --pds-internal-grid-margin: calc(var(--p-spacing-fluid-lg) * -1) !important;
    --pds-internal-grid-width-min: auto !important;
    --pds-internal-grid-width-max: none !important;
    --_p-dialog-a: var(--p-sh-dialog-bg) !important;
  }
  .p-sheet[hidden] {
    display: none !important;
  }
  .p-sheet [data-pds-slot]{
    display: block;
  }
  .p-sheet [data-pds-slot]:first-of-type{
    grid-row-start: 1;
  }
  .p-sheet [data-pds-slot]:not([name]){
    grid-column: 2/3;
    z-index: 0;
  }
  .p-sheet [data-pds-slot="header"]{
    grid-column: 2/3;
    z-index: 0;
  }
  .p-sheet dialog{
    all: unset;
    position: fixed;
    inset: 0;
    max-width: 100dvw;
    max-height: 100dvh;
    overflow: hidden;
    display: block;
    user-select: text;
    outline: 0;
    width: var(--p-sh-w, 0px);
    height: var(--p-sh-h, 0px);
    visibility: var(--p-sh-vis, hidden);
    pointer-events: var(--p-sh-pe, none);
    background: var(--p-sh-db, transparent);
    transition: visibility 0s linear var(--p-sh-delay),
      width 0s linear var(--p-sh-delay), height 0s linear var(--p-sh-delay),
      background-color var(--p-sh-ddur) var(--p-sh-ease),
      -webkit-backdrop-filter var(--p-sh-ddur) var(--p-sh-ease),
      backdrop-filter var(--p-sh-ddur) var(--p-sh-ease);
    overlay: none;
  }
  .p-sheet dialog:modal{
    overlay: auto;
  }
  .p-sheet dialog::backdrop{
    display: none;
  }
  @supports (overlay: auto) and (transition-behavior: allow-discrete) {
    .p-sheet dialog{
      transition: visibility 0s linear var(--p-sh-delay),
        width 0s linear var(--p-sh-delay), height 0s linear var(--p-sh-delay),
        background-color var(--p-sh-ddur) var(--p-sh-ease),
        -webkit-backdrop-filter var(--p-sh-ddur) var(--p-sh-ease),
        backdrop-filter var(--p-sh-ddur) var(--p-sh-ease),
        overlay var(--p-sh-ddur) var(--p-sh-ease) allow-discrete;
    }
  }
  .p-sheet .scroller{
    position: absolute;
    isolation: isolate;
    display: grid;
    inset: 0;
    overflow: hidden auto;
    overscroll-behavior-y: none;
    background: rgba(255, 255, 255, 0.01);
    transform: translate3d(0, 0, 0);
  }
  .p-sheet .sheet{
    position: relative;
    display: grid;
    grid-template: auto / var(--p-spacing-fluid-sm) minmax(0, 1fr) var(
        --p-spacing-fluid-sm
      );
    gap: var(--p-spacing-fluid-md)
      calc(var(--p-spacing-fluid-lg) - var(--p-spacing-fluid-sm));
    padding-top: var(--p-spacing-fluid-md);
    padding-bottom: calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md));
    align-content: flex-start;
    opacity: var(--p-sh-op, 0);
    transform: var(--p-sh-tf, translate3d(0, 25vh, 0));
    transition: opacity var(--p-sh-pdur) var(--p-sh-ease),
      transform var(--p-sh-pdur) var(--p-sh-ease);
    color: var(--p-color-primary);
    background: var(--_p-dialog-a);
    width: 100%;
    align-self: flex-end;
    margin-block-start: var(--p-spacing-fluid-lg);
    border-top-left-radius: var(--p-radius-3xl);
    border-top-right-radius: var(--p-radius-3xl);
    clip-path: inset(0 round var(--p-radius-3xl) var(--p-radius-3xl) 0 0);
  }
  .p-sheet .sheet:dir(rtl){
    transform: var(--p-sh-tf, translate3d(0, 25vh, 0));
  }
  @media (forced-colors: active) {
    .p-sheet .sheet{
      border-top: 2px solid CanvasText;
    }
  }
  .p-sheet .dismiss{
    all: unset;
    box-sizing: border-box;
    display: grid;
    place-items: center;
    padding: 6px;
    border-radius: var(--p-radius-full);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    background-color: var(--p-sh-dismiss-bg);
    color: var(--p-color-primary);
    cursor: pointer;
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    grid-area: 1/3;
    z-index: 5;
    position: sticky;
    top: var(--p-spacing-fluid-sm);
    margin-top: calc(
      -1 * var(--p-spacing-fluid-md) + var(--p-spacing-fluid-sm)
    );
    margin-inline-end: var(--p-spacing-fluid-sm);
    place-self: flex-start flex-end;
  }
  .p-sheet .dismiss:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-sheet .dismiss::before{
    content: "";
    width: var(--p-leading-normal);
    height: var(--p-leading-normal);
    -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    background: currentColor;
  }
  .p-sheet .dismiss span{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  @media (forced-colors: active) {
    .p-sheet .dismiss{
      forced-color-adjust: none;
      background: Canvas;
      box-shadow: inset 0 0 0 2px ButtonBorder;
      color: ButtonText;
    }
    .p-sheet .dismiss:focus-visible{
      outline-color: Highlight;
    }
  }
  @media (hover: hover) {
    .p-sheet .dismiss:hover{
      background-color: var(--p-sh-dismiss-hover);
    }
    @media (forced-colors: active) {
      .p-sheet .dismiss:hover{
        background: Canvas;
      }
    }
  }`;function J(e,a,d){let k,b,{$$slots:u={},$$scope:g}=a,{open:p}=a,{background:l}=a,{dismissButton:h}=a,{aria:v}=a;function y(){return{open:p,background:l,dismissButton:h,aria:v}}return e.$$set=s=>{d(1,a=H(H({},a),L(s))),"open"in s&&d(2,p=s.open),"background"in s&&d(3,l=s.background),"dismissButton"in s&&d(4,h=s.dismissButton),"aria"in s&&d(5,v=s.aria),"$$scope"in s&&d(7,g=s.$$scope)},e.$$.update=()=>{e.$$.dirty&4&&d(6,k=()=>{const t=(w=>w===!0||w==="true"||w==="")(p),r=y().background==="surface"?"surface":"canvas",x=r==="surface"?"var(--p-color-surface)":"var(--p-color-canvas)",i=r==="surface"?"var(--p-color-canvas)":"var(--p-color-surface)",n="var(--p-transition-duration, var(--p-duration-md))";return{"--p-sh-w":t?"100dvw":"0px","--p-sh-h":t?"100dvh":"0px","--p-sh-vis":t?"inherit":"hidden","--p-sh-pe":t?"auto":"none","--p-sh-db":t?"var(--p-color-backdrop)":"transparent","--p-sh-delay":t?"var(--p-transition-duration, 0s)":n,"--p-sh-ease":t?"var(--p-ease-in)":"var(--p-ease-out)","--p-sh-ddur":t?"var(--p-transition-duration, var(--p-duration-lg))":n,"--p-sh-pdur":t?n:"var(--p-transition-duration, var(--p-duration-sm))","--p-sh-op":t?"1":"0","--p-sh-tf":t?"translate3d(0, 0, 0)":"translate3d(0, 25vh, 0)","--p-sh-dialog-bg":x,"--p-sh-dismiss-bg":x,"--p-sh-dismiss-hover":i}}),e.$$.dirty&16,e.$$.dirty&32,e.$$.dirty&64&&d(0,b=A(k()))},a=L(a),[b,a,p,l,h,v,k,g,u]}class X extends F{constructor(a){super(),M(this,a,J,G,U,{open:2,background:3,dismissButton:4,aria:5})}}export{X as default};
