import{S as _,i as L,s as E,d as H,v as N,t as j,b as q,p as h,k as M,l as b,w as z,m as x,H as G,n as A,x as B,a as C,q as I}from"./svelte-DoO7z26N.js";import{s as D}from"./host-DRskmCSE.js";import F from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function J(r){let n,o,y=`<style>${K}</style>`,v,d,c,p,g,t,m,e;return t=new F({props:{name:"arrow-left",color:"primary","aria-hidden":"true"}}),{c(){n=x("div"),o=new G(!1),v=A(),d=x("nav"),c=x("ul"),p=x("li"),g=x("span"),B(t.$$.fragment),o.a=v,h(p,"class","prev"),h(n,"class",m="p-pagination"+(r[1].class?` ${r[1].class}`:"")),h(n,"data-pds","pagination"),h(n,"style",r[0])},m(a,i){M(a,n,i),o.m(y,n),b(n,v),b(n,d),b(d,c),b(c,p),b(p,g),z(t,g,null),e=!0},p(a,[i]){(!e||i&2&&m!==(m="p-pagination"+(a[1].class?` ${a[1].class}`:"")))&&h(n,"class",m),(!e||i&1)&&h(n,"style",a[0])},i(a){e||(q(t.$$.fragment,a),e=!0)},o(a){j(t.$$.fragment,a),e=!1},d(a){a&&H(n),N(t)}}}const K=`.p-pagination :where([data-pds-slot]){display:contents}

  .p-pagination {
    display: block;
  }
  .p-pagination[hidden] {
    display: none !important;
  }
  .p-pagination nav{
    display: flex;
    justify-content: center;
    user-select: none;
  }
  .p-pagination ul{
    display: flex;
    gap: var(--p-spacing-static-xs);
    margin: 0;
    padding: 0;
  }
  .p-pagination li{
    list-style-type: none;
  }
  .p-pagination span{
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    position: relative;
    padding: 0 6px;
    min-width: 2.25rem;
    height: 2.25rem;
    box-sizing: border-box;
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    white-space: nowrap;
    cursor: pointer;
    background-color: transparent;
    color: var(--p-color-primary);
    border-radius: var(--p-radius-full);
    border-color: transparent;
    outline: 0;
  }
  .p-pagination span[aria-current]{
    cursor: default;
    pointer-events: none;
    background-color: var(--p-color-frosted-strong);
  }
  .p-pagination span[aria-disabled]{
    cursor: default;
    pointer-events: none;
    opacity: 0.4;
  }
  .p-pagination span:not(.ellipsis):focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-pagination .ellipsis{
    cursor: default;
    pointer-events: none;
  }
  .p-pagination .ellipsis::after{
    content: "…";
  }
  @media (min-width: 760px) {
    .p-pagination ul{
      gap: var(--p-spacing-static-sm);
    }
    .p-pagination[data-pg-few] li.ellip {
      display: none;
    }
    .p-pagination[data-pg-start] li.ellip-start {
      display: none;
    }
    .p-pagination[data-pg-end-4] li.ellip-end:nth-last-child(3) {
      display: none;
    }
    .p-pagination[data-pg-end-3] li.ellip-end:nth-last-child(2) {
      display: none;
    }
  }
  @media (max-width: 759px) {
    .p-pagination[data-pg-m-start] li.ellip-start,
    .p-pagination[data-pg-m-start] li:nth-child(6),
    .p-pagination[data-pg-m-start] li:nth-child(7),
    .p-pagination[data-pg-m-start] li:not(.ellip):nth-child(8) {
      display: none;
    }
    .p-pagination[data-pg-m-end] li.ellip-end,
    .p-pagination[data-pg-m-end] li.ellip-start + li:not(.current),
    .p-pagination[data-pg-m-end]
      li.ellip-start
      + li:not(.current)
      + li:not(.current) {
      display: none;
    }
    .p-pagination[data-pg-m-mid] li.ellip-start + li:not(.current),
    .p-pagination[data-pg-m-mid] li.current-1,
    .p-pagination[data-pg-m-mid] li[class~="current+1"],
    .p-pagination[data-pg-m-mid] li[class~="current+1"] + li:not(.ellip) {
      display: none;
    }
    .p-pagination[data-pg-m-cur-2] li.current-2 {
      display: none;
    }
    .p-pagination[data-pg-m-cur-1] li.current-1 {
      display: none;
    }
    .p-pagination[data-pg-m-cur-after] li[class~="current+1"],
    .p-pagination[data-pg-m-cur-after] li[class~="current+2"] {
      display: none;
    }
    .p-pagination[data-pg-m-ellip-end-show] li.ellip-end {
      display: initial;
    }
  }
  @media (forced-colors: active) {
    .p-pagination span:not(.ellipsis):focus-visible{
      outline-color: Highlight;
    }
    .p-pagination span[aria-disabled]{
      opacity: 1;
      color: GrayText;
    }
    .p-pagination span[aria-current]{
      border: 2px solid CanvasText;
    }
  }
  @media (hover: hover) {
    .p-pagination span:not([aria-disabled]):not(.ellipsis):hover{
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
      background: var(--p-color-frosted);
    }
    @media (forced-colors: active) {
      .p-pagination span:not([aria-disabled]):not(.ellipsis):hover{
        outline: 2px solid CanvasText;
        outline-offset: -2px;
      }
    }
  }`;function O(r,n,o){let y,v,{totalItemsCount:d}=n,{itemsPerPage:c}=n,{activePage:p}=n,{showLastPage:g}=n;return r.$$set=t=>{o(1,n=C(C({},n),I(t))),"totalItemsCount"in t&&o(2,d=t.totalItemsCount),"itemsPerPage"in t&&o(3,c=t.itemsPerPage),"activePage"in t&&o(4,p=t.activePage),"showLastPage"in t&&o(5,g=t.showLastPage)},r.$$.update=()=>{r.$$.dirty&60&&o(6,y=()=>{const t=Number(d==null||d===""?1:d),m=Number(c==null||c===""?1:c),e=Math.ceil((t<1?1:t)/(m<1?1:m));let a=Number(p==null||p===""?1:p);a<1&&(a=1),a>e&&(a=e);let i=g;i===!1||i==="false"?i=!1:i=!0;const l="list-item",s="none",P=e<8,u=e>5,f=e-a,w=u&&a<4,k=u&&f<3,S=u&&!w&&!k,T=u&&!i&&f>=2&&a>2;return{"--p-pg-ellip":P?s:l,"--p-pg-ellip-start":!P&&a<=4?s:l,"--p-pg-ellip-end-3":!P&&f<4?s:l,"--p-pg-ellip-end-2":!P&&f<3?s:l,"--p-pg-m-start":w?s:l,"--p-pg-m-end":k?s:l,"--p-pg-m-mid":S?s:l,"--p-pg-m-ellip-end-show":T?"1":"","--p-pg-m-cur-2":u&&!i&&f<2?s:l,"--p-pg-m-cur-1":u&&!i&&f===1?s:l,"--p-pg-m-cur-after":u&&!i&&f>=2&&a>2?s:l}}),r.$$.dirty&64&&o(0,v=D(y()))},n=I(n),[v,n,d,c,p,g,y]}class Z extends _{constructor(n){super(),L(this,n,O,J,E,{totalItemsCount:2,itemsPerPage:3,activePage:4,showLastPage:5})}}export{Z as default};
