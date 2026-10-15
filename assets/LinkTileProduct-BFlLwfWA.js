import{S as q,i as B,s as C,c as N,a as j,d as E,t as I,b as J,u as K,g as D,e as F,f as A,h as L,j as G,k as M,l as p,m as g,H as Q,n as z,o as O,p as _,q as P}from"./svelte-DoO7z26N.js";import{s as U,h as V}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function W(r){let n,o,w=`<style>${X}</style>`,k,s,m,h,R,d,v,x=r[3]()+"",b,y,c,u=r[2]()+"",S,t,e;const l=r[10].default,a=N(l,r,r[9],null);let T=[{class:t="p-link-tile-product"+(r[4].class?` ${r[4].class}`:"")},{"data-pds":"link-tile-product"},{style:r[1]},r[0]],H={};for(let i=0;i<T.length;i+=1)H=j(H,T[i]);return{c(){n=g("div"),o=new Q(!1),k=z(),s=g("div"),m=g("div"),h=g("span"),a&&a.c(),R=z(),d=g("div"),v=g("h3"),b=O(x),y=z(),c=g("p"),S=O(u),o.a=k,_(h,"data-pds-slot",""),_(m,"class","image"),_(v,"class","heading"),_(c,"class","price"),_(d,"class","wrapper"),_(s,"class","root"),L(n,H)},m(i,f){M(i,n,f),o.m(w,n),p(n,k),p(n,s),p(s,m),p(m,h),a&&a.m(h,null),p(s,R),p(s,d),p(d,v),p(v,b),p(d,y),p(d,c),p(c,S),e=!0},p(i,[f]){a&&a.p&&(!e||f&512)&&K(a,l,i,i[9],e?F(l,i[9],f,null):D(i[9]),null),(!e||f&8)&&x!==(x=i[3]()+"")&&A(b,x),(!e||f&4)&&u!==(u=i[2]()+"")&&A(S,u),L(n,H=G(T,[(!e||f&16&&t!==(t="p-link-tile-product"+(i[4].class?` ${i[4].class}`:"")))&&{class:t},{"data-pds":"link-tile-product"},(!e||f&2)&&{style:i[1]},f&1&&i[0]]))},i(i){e||(J(a,i),e=!0)},o(i){I(a,i),e=!1},d(i){i&&E(n),a&&a.d(i)}}}const X=`.p-link-tile-product :where([data-pds-slot]){display:contents}

  .p-link-tile-product {
    display: block;
    position: relative;
  }
  .p-link-tile-product[hidden] {
    display: none !important;
  }
  .p-link-tile-product [data-pds-slot="header"]{
    display: block;
  }
  .p-link-tile-product [data-pds-slot] > [slot="header"]{
    display: flex !important;
    flex-wrap: wrap !important;
    gap: var(--p-spacing-fluid-xs) !important;
  }
  .p-link-tile-product [data-pds-slot] > :is(img, picture){
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: var(--p-radius-2xl) !important;
    overflow: hidden !important;
  }
  .p-link-tile-product:not([href]) [data-pds-slot] > a[slot="anchor"] {
    position: absolute !important;
    inset: 0 !important;
    z-index: 1 !important;
    border-radius: var(--p-radius-3xl) !important;
    text-indent: -999999px !important;
  }
  .p-link-tile-product:not([href]) [data-pds-slot] > a[slot="anchor"]:focus-visible {
    outline: 2px solid var(--p-color-focus) !important;
    outline-offset: 2px !important;
  }
  .p-link-tile-product[price-original] s {
    color: var(--p-color-contrast-medium);
  }
  .p-link-tile-product .root{
    display: flex;
    flex-direction: column;
    aspect-ratio: var(--p-ltp-ar);
    overflow: hidden;
    box-sizing: border-box;
    border-radius: var(--p-radius-3xl);
    padding: var(--p-spacing-fluid-sm);
    color: var(--p-color-primary);
    background-color: var(--p-color-surface);
  }
  .p-link-tile-product[href] .anchor {
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: var(--p-radius-3xl);
  }
  .p-link-tile-product[href] .anchor:focus-visible {
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-link-tile-product .header{
    display: flex;
    gap: var(--p-spacing-fluid-sm);
    justify-content: space-between;
    align-items: flex-start;
  }
  .p-link-tile-product .button{
    position: relative;
    z-index: 2;
  }
  .p-link-tile-product[like-button="false"] .button {
    display: none;
  }
  .p-link-tile-product .image{
    aspect-ratio: 8 / 9;
    margin: var(--p-spacing-fluid-sm) auto var(--p-spacing-fluid-xs);
    overflow: hidden;
    transition: transform var(--p-transition-duration, var(--p-duration-md))
      var(--p-ease-in-out);
  }
  .p-link-tile-product .wrapper{
    display: flex;
    flex-direction: column;
    margin: auto;
    text-align: center;
  }
  .p-link-tile-product .heading{
    margin: 0 0 2px;
    font: var(--p-font-weight-semibold) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .p-link-tile-product .price{
    margin: 0;
    font: var(--p-font-weight-normal) var(--p-typescale-xs) /
      var(--p-leading-normal) var(--p-font-porsche-next);
  }
  .p-link-tile-product[price-original] .price {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: var(--p-spacing-fluid-xs);
  }
  .p-link-tile-product .description{
    margin: 0;
    font: var(--p-font-weight-normal) var(--p-typescale-2xs) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-contrast-high);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .p-link-tile-product .sr-only{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  @media (min-width: 760px) {
    .p-link-tile-product .image{
      padding: 0 var(--p-spacing-fluid-md);
    }
    .p-link-tile-product .root{
      aspect-ratio: var(--p-ltp-ar-s, var(--p-ltp-ar));
    }
  }
  @media (min-width: 480px) {
    .p-link-tile-product .root{
      aspect-ratio: var(--p-ltp-ar-xs, var(--p-ltp-ar));
    }
  }
  @media (min-width: 1000px) {
    .p-link-tile-product .root{
      aspect-ratio: var(--p-ltp-ar-m, var(--p-ltp-ar));
    }
  }
  @media (min-width: 1300px) {
    .p-link-tile-product .root{
      aspect-ratio: var(--p-ltp-ar-l, var(--p-ltp-ar));
    }
  }
  @media (min-width: 1760px) {
    .p-link-tile-product .root{
      aspect-ratio: var(--p-ltp-ar-xl, var(--p-ltp-ar));
    }
  }
  @media (min-width: 1920px) {
    .p-link-tile-product .root{
      aspect-ratio: var(--p-ltp-ar-xxl, var(--p-ltp-ar));
    }
  }
  @media (forced-colors: active) {
    .p-link-tile-product:not([href]) [data-pds-slot] > a[slot="anchor"]:focus-visible {
      outline-color: Highlight !important;
    }
    .p-link-tile-product:not([href]) [data-pds-slot] > a[slot="anchor"] {
      forced-color-adjust: none !important;
      box-shadow: inset 0 0 0 2px LinkText !important;
    }
    .p-link-tile-product[href] .anchor {
      forced-color-adjust: none;
      box-shadow: inset 0 0 0 2px LinkText;
    }
    .p-link-tile-product[href] .anchor:focus-visible {
      outline-color: Highlight;
    }
  }
  @media (hover: hover) {
    .p-link-tile-product .root:hover .image{
      transform: scale3d(1.05, 1.05, 1.05);
    }
  }`;function Y(r,n,o){let w,k,s,m,h,{$$slots:R={},$$scope:d}=n;const v=["base","xs","s","m","l","xl","xxl"],x=(t,e)=>{if(t==null||t==="")return e;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return e}return t},b=(t,e,l)=>t&&typeof t=="object"?t[e]===void 0?l:t[e]:t;let{aspectRatio:y}=n,{heading:c}=n,{price:u}=n;function S(){return{aspectRatio:y,heading:c,price:u}}return r.$$set=t=>{o(4,n=j(j({},n),P(t))),"aspectRatio"in t&&o(5,y=t.aspectRatio),"heading"in t&&o(6,c=t.heading),"price"in t&&o(7,u=t.price),"$$scope"in t&&o(9,d=t.$$scope)},r.$$.update=()=>{r.$$.dirty&64&&o(3,k=()=>c||""),r.$$.dirty&128&&o(2,s=()=>u||""),r.$$.dirty&256&&o(1,m=U(w())),o(0,h=V({href:n.href,"like-button":n.likeButton,"price-original":n.priceOriginal},["like-button"]))},o(8,w=()=>{const t=x(S().aspectRatio,"3/4"),e={};if(typeof t=="object"&&t!==null){let l=b(t,"base","3/4");for(const a of v){t[a]!==void 0&&(l=b(t,a,l));const T=a==="base"?"":`-${a}`;e[`--p-ltp-ar${T}`]=String(l)}}else for(const l of v){const a=l==="base"?"":`-${l}`;e[`--p-ltp-ar${a}`]=String(t||"3/4")}return e}),n=P(n),[h,m,s,k,n,y,c,u,w,d,R]}class et extends q{constructor(n){super(),B(this,n,Y,W,C,{aspectRatio:5,heading:6,price:7})}}export{et as default};
