import{S as C,i as H,s as B,c as q,d as F,t as P,b as U,f as V,u as O,g as j,e as A,p as t,k as D,l as s,m as g,H as E,n as T,o as G,a as M,q as S}from"./svelte-DoO7z26N.js";import{s as I}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function J(p){let n,e,y=`<style>${K}</style>`,b,l,u,w,r,m,f,x,o=p[1]()+"",d,k,c,_,v;const z=p[8].default,i=q(z,p,p[7],null);return{c(){n=g("div"),e=new E(!1),b=T(),l=g("div"),u=g("button"),w=T(),r=g("div"),m=g("div"),f=T(),x=g("p"),d=G(o),k=T(),c=g("span"),i&&i.c(),e.a=b,t(u,"type","button"),t(u,"aria-label","More information"),t(u,"aria-details","popover"),t(m,"class","arrow"),t(c,"data-pds-slot",""),t(r,"id","popover"),t(r,"popover","manual"),t(l,"class","wrap"),t(n,"class",_="p-popover"+(p[2].class?` ${p[2].class}`:"")),t(n,"data-pds","popover"),t(n,"style",p[0])},m(a,h){D(a,n,h),e.m(y,n),s(n,b),s(n,l),s(l,u),s(l,w),s(l,r),s(r,m),s(r,f),s(r,x),s(x,d),s(r,k),s(r,c),i&&i.m(c,null),v=!0},p(a,[h]){(!v||h&2)&&o!==(o=a[1]()+"")&&V(d,o),i&&i.p&&(!v||h&128)&&O(i,z,a,a[7],v?A(z,a[7],h,null):j(a[7]),null),(!v||h&4&&_!==(_="p-popover"+(a[2].class?` ${a[2].class}`:"")))&&t(n,"class",_),(!v||h&1)&&t(n,"style",a[0])},i(a){v||(U(i,a),v=!0)},o(a){P(i,a),v=!1},d(a){a&&F(n),i&&i.d(a)}}}const K=`.p-popover :where([data-pds-slot]){display:contents}

  .p-popover {
    display: contents;
    margin: 0;
  }
  .p-popover[hidden] {
    display: none !important;
  }
  .p-popover .wrap{
    display: contents;
  }
  .p-popover [data-pds-slot]:not([name]),
  .p-popover p{
    display: block;
    margin: 0;
    min-width: 0;
    min-height: 0;
    max-width: inherit;
    max-height: inherit;
    box-sizing: border-box;
    padding-block: var(--p-popover-py, var(--p-pop-pad));
    padding-inline: var(--p-popover-px, var(--p-pop-pad));
    overflow: hidden auto;
    overscroll-behavior-y: none;
  }
  .p-popover button{
    all: unset;
    margin: inherit;
    display: inline-grid;
    vertical-align: top;
    font: var(--p-typescale-sm) var(--p-font-porsche-next);
    width: var(--p-leading-normal);
    height: var(--p-leading-normal);
    flex: none;
    cursor: pointer;
  }
  .p-popover button:focus-visible::before{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-popover button::before{
    grid-area: 1/1;
    content: "";
    margin: -2px;
    transition: background-color
      var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    border-radius: var(--p-radius-full);
    background: var(--p-pop-btn-bg);
    -webkit-backdrop-filter: var(--p-pop-btn-blur);
    backdrop-filter: var(--p-pop-btn-blur);
  }
  .p-popover button::after{
    grid-area: 1/1;
    content: "";
    -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.5 10v6h-1v-6zm0-2v1h-1V8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16m0-1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9"/></svg>')
      center/contain no-repeat;
    mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.5 10v6h-1v-6zm0-2v1h-1V8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16m0-1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9"/></svg>')
      center/contain no-repeat;
    background: var(--p-color-primary);
  }
  .p-popover [popover]{
    all: unset;
    position: fixed;
    top: 0;
    left: 0;
    filter: drop-shadow(0 0 16px rgba(0, 0, 0, 0.3));
    backdrop-filter: drop-shadow(0 0 transparent);
    border-radius: var(--p-popover-radius, var(--p-pop-radius));
    background: var(--p-color-canvas);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-primary);
    width: var(--p-popover-w, max-content);
    height: var(--p-popover-h, auto);
    min-width: var(--p-popover-min-w, 0px);
    min-height: var(--p-popover-min-h, auto);
    max-width: var(--p-popover-max-w, min(calc(100dvw - 16px), 48ch));
    max-height: var(--p-popover-max-h, calc(100dvh - 16px));
    opacity: var(--p-pop-opacity);
    transition: opacity var(--p-transition-duration, var(--p-duration-sm))
      var(--p-pop-ease);
    overlay: none;
    display: none;
  }
  .p-popover [popover]:popover-open{
    overlay: auto;
    display: grid;
  }
  .p-popover [popover]::backdrop{
    display: none;
  }
  @media (forced-colors: active) {
    .p-popover button::after{
      background: ButtonText;
    }
    .p-popover button:focus-visible::before{
      outline-color: Highlight;
    }
    .p-popover [popover]{
      outline: 2px solid CanvasText;
      outline-offset: -2px;
    }
  }
  @media (hover: hover) {
    .p-popover button:hover::before{
      background: var(--p-color-frosted-strong);
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
    }
  }
  @supports (color: oklch(from red l c h)) {
    .p-popover [popover]{
      background: hsl(from var(--p-color-canvas) h 0% calc(l + 14));
    }
  }
  @supports (overlay: auto) and (transition-behavior: allow-discrete) {
    .p-popover [popover]{
      transition: opacity var(--p-transition-duration, var(--p-duration-sm))
          var(--p-pop-ease),
        overlay var(--p-transition-duration, var(--p-duration-sm))
          var(--p-pop-ease) allow-discrete,
        display var(--p-transition-duration, var(--p-duration-sm))
          var(--p-pop-ease) allow-discrete;
    }
  }
  .p-popover .arrow{
    position: absolute;
    width: 24px;
    height: 12px;
    clip-path: polygon(50% 0, 100% 110%, 0 110%);
    background: inherit;
  }
  @media (forced-colors: active) {
    .p-popover .arrow{
      background: CanvasText;
    }
  }
  @starting-style {
    .p-popover [popover]{
      opacity: 0;
    }
  }`;function L(p,n,e){let y,b,l,{$$slots:u={},$$scope:w}=n,{open:r}=n,{compact:m}=n,{description:f}=n;function x(){return{open:r,compact:m,description:f}}return p.$$set=o=>{e(2,n=M(M({},n),S(o))),"open"in o&&e(3,r=o.open),"compact"in o&&e(4,m=o.compact),"description"in o&&e(5,f=o.description),"$$scope"in o&&e(7,w=o.$$scope)},p.$$.update=()=>{p.$$.dirty&8&&e(6,y=()=>{const o=c=>c===!0||c==="true"||c==="",d=o(r),k=o(x().compact);return{"--p-pop-pad":k?"var(--p-spacing-static-sm)":"var(--p-spacing-static-md)","--p-pop-radius":k?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-pop-ease":d?"var(--p-ease-in)":"var(--p-ease-out)","--p-pop-opacity":d?"1":"0","--p-pop-btn-bg":d?"var(--p-color-frosted)":"","--p-pop-btn-blur":d?"var(--p-blur-frosted)":""}}),p.$$.dirty&32&&e(1,b=()=>f||""),p.$$.dirty&64&&e(0,l=I(y()))},n=S(n),[l,b,n,r,m,f,y,w,u]}class Y extends C{constructor(n){super(),H(this,n,L,J,B,{open:3,compact:4,description:5})}}export{Y as default};
