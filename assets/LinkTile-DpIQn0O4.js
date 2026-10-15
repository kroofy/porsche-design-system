import{S as tt,i as nt,s as lt,c as J,a as U,d as at,t as K,b as L,u as Z,g as D,e as Q,f as et,h as V,j as ot,k as rt,l as m,m as _,H as it,n as B,o as st,p as O,q as X}from"./svelte-DoO7z26N.js";import{s as pt,h as dt}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const ft=l=>({}),Y=l=>({}),ct=l=>({}),$=l=>({});function vt(l){let a,s,T=`<style>${mt}</style>`,A,u,w,I,z,j,H,h,x,c=l[2]()+"",P,q,S,k,i;const R=l[12].header,p=J(R,l,l[11],$),b=l[12].default,d=J(b,l,l[11],null),y=l[12].footer,t=J(y,l,l[11],Y);let e=[{class:k="p-link-tile"+(l[3].class?` ${l[3].class}`:"")},{"data-pds":"link-tile"},{style:l[1]},l[0]],f={};for(let n=0;n<e.length;n+=1)f=U(f,e[n]);return{c(){a=_("div"),s=new it(!1),A=B(),u=_("div"),w=_("span"),p&&p.c(),I=B(),z=_("div"),j=_("span"),d&&d.c(),H=B(),h=_("div"),x=_("p"),P=st(c),q=B(),S=_("span"),t&&t.c(),s.a=A,O(w,"data-pds-slot","header"),O(j,"data-pds-slot",""),O(z,"class","media"),O(S,"data-pds-slot","footer"),O(h,"class","footer"),O(u,"class","root"),V(a,f)},m(n,o){rt(n,a,o),s.m(T,a),m(a,A),m(a,u),m(u,w),p&&p.m(w,null),m(u,I),m(u,z),m(z,j),d&&d.m(j,null),m(u,H),m(u,h),m(h,x),m(x,P),m(h,q),m(h,S),t&&t.m(S,null),i=!0},p(n,[o]){p&&p.p&&(!i||o&2048)&&Z(p,R,n,n[11],i?Q(R,n[11],o,ct):D(n[11]),$),d&&d.p&&(!i||o&2048)&&Z(d,b,n,n[11],i?Q(b,n[11],o,null):D(n[11]),null),(!i||o&4)&&c!==(c=n[2]()+"")&&et(P,c),t&&t.p&&(!i||o&2048)&&Z(t,y,n,n[11],i?Q(y,n[11],o,ft):D(n[11]),Y),V(a,f=ot(e,[(!i||o&8&&k!==(k="p-link-tile"+(n[3].class?` ${n[3].class}`:"")))&&{class:k},{"data-pds":"link-tile"},(!i||o&2)&&{style:n[1]},o&1&&n[0]]))},i(n){i||(L(p,n),L(d,n),L(t,n),i=!0)},o(n){K(p,n),K(d,n),K(t,n),i=!1},d(n){n&&at(a),p&&p.d(n),d&&d.d(n),t&&t.d(n)}}}const mt=`.p-link-tile :where([data-pds-slot]){display:contents}

  .p-link-tile {
    display: flex;
    align-items: stretch;
    color-scheme: dark;
    hyphens: auto;
  }
  .p-link-tile[hidden] {
    display: none !important;
  }
  .p-link-tile [data-pds-slot]{
    display: block;
  }
  .p-link-tile [data-pds-slot]:not([name]){
    width: 100%;
    height: 100%;
    transition: transform var(--p-transition-duration, var(--p-duration-md))
      var(--p-ease-in-out);
  }
  .p-link-tile [data-pds-slot="header"]{
    grid-area: 2 / 2;
    z-index: 5;
  }
  .p-link-tile[align="top"] [data-pds-slot="header"] {
    grid-area: 4 / 2;
  }
  .p-link-tile [data-pds-slot="footer"]{
    grid-row: 2;
    z-index: 3;
  }
  .p-link-tile [data-pds-slot] > :is(img, video, picture){
    display: block !important;
    width: 100% !important;
    height: 100% !important;
  }
  .p-link-tile [data-pds-slot] > :is(img, video){
    object-fit: cover !important;
  }
  .p-link-tile a{
    grid-area: 1 / 1 / -1 / -1;
    z-index: 4;
    outline: 0;
  }
  .p-link-tile p{
    all: unset;
    z-index: 3;
    max-width: 34.375rem;
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-primary);
    hyphens: inherit;
    font-size: inherit;
    font-size: var(--p-lt-fs);
    font-weight: var(--p-lt-fw);
  }
  @supports (-webkit-hyphens: auto) {
    .p-link-tile {
      align-items: baseline;
    }
  }
  .p-link-tile .root{
    display: grid;
    grid-template: var(--p-spacing-fluid-md) auto minmax(0px, 1fr) auto var(
        --p-spacing-fluid-md
      ) / var(--p-spacing-fluid-md) minmax(0px, 1fr) var(--p-spacing-fluid-md);
    width: 100%;
    border-radius: var(--p-radius-3xl);
    aspect-ratio: var(--p-lt-ar);
  }
  .p-link-tile .root::after{
    content: "";
    z-index: 2;
    grid-area: 4 / 1 / 6 / -1;
    background: linear-gradient(
      to top,
      hsla(from var(--p-color-canvas) h s l / 0.8) 0%,
      hsla(from var(--p-color-canvas) h s l / 0.8) 8.1%,
      hsla(from var(--p-color-canvas) h s l / 0.8) 15.5%,
      hsla(from var(--p-color-canvas) h s l / 0.8) 22.5%,
      hsla(from var(--p-color-canvas) h s l / 0.78) 29%,
      hsla(from var(--p-color-canvas) h s l / 0.73) 35.3%,
      hsla(from var(--p-color-canvas) h s l / 0.67) 41.2%,
      hsla(from var(--p-color-canvas) h s l / 0.6) 47.1%,
      hsla(from var(--p-color-canvas) h s l / 0.52) 52.9%,
      hsla(from var(--p-color-canvas) h s l / 0.44) 58.8%,
      hsla(from var(--p-color-canvas) h s l / 0.33) 64.7%,
      hsla(from var(--p-color-canvas) h s l / 0.22) 71%,
      hsla(from var(--p-color-canvas) h s l / 0.12) 77.5%,
      hsla(from var(--p-color-canvas) h s l / 0.05) 84.5%,
      hsla(from var(--p-color-canvas) h s l / 0.011) 91.9%,
      hsla(from var(--p-color-canvas) h s l / 0) 100%
    );
    margin-top: calc(var(--p-spacing-fluid-lg) * -1);
    border-end-start-radius: inherit;
    border-end-end-radius: inherit;
  }
  .p-link-tile[align="top"] .root::after {
    grid-area: 1 / 1 / 3 / -1;
    background: linear-gradient(
      to bottom,
      hsla(from var(--p-color-canvas) h s l / 0.8) 0%,
      hsla(from var(--p-color-canvas) h s l / 0.8) 8.1%,
      hsla(from var(--p-color-canvas) h s l / 0.8) 15.5%,
      hsla(from var(--p-color-canvas) h s l / 0.8) 22.5%,
      hsla(from var(--p-color-canvas) h s l / 0.78) 29%,
      hsla(from var(--p-color-canvas) h s l / 0.73) 35.3%,
      hsla(from var(--p-color-canvas) h s l / 0.67) 41.2%,
      hsla(from var(--p-color-canvas) h s l / 0.6) 47.1%,
      hsla(from var(--p-color-canvas) h s l / 0.52) 52.9%,
      hsla(from var(--p-color-canvas) h s l / 0.44) 58.8%,
      hsla(from var(--p-color-canvas) h s l / 0.33) 64.7%,
      hsla(from var(--p-color-canvas) h s l / 0.22) 71%,
      hsla(from var(--p-color-canvas) h s l / 0.12) 77.5%,
      hsla(from var(--p-color-canvas) h s l / 0.05) 84.5%,
      hsla(from var(--p-color-canvas) h s l / 0.011) 91.9%,
      hsla(from var(--p-color-canvas) h s l / 0) 100%
    );
    margin-top: 0;
    margin-bottom: calc(var(--p-spacing-fluid-lg) * -1);
    border-end-start-radius: 0;
    border-end-end-radius: 0;
    border-start-start-radius: inherit;
    border-start-end-radius: inherit;
  }
  .p-link-tile:not([gradient]) .root::after {
    content: none;
  }
  .p-link-tile .media{
    position: relative;
    grid-area: 1 / 1 / -1 / -1;
    z-index: 1;
    overflow: hidden;
    border-radius: inherit;
  }
  .p-link-tile .footer{
    grid-area: 4 / 2;
    display: var(--p-lt-foot-d);
    grid-template-columns: var(--p-lt-foot-cols);
    column-gap: var(--p-lt-foot-gap);
    flex-direction: var(--p-lt-foot-dir);
    align-items: var(--p-lt-foot-ai);
  }
  .p-link-tile[align="top"] .footer {
    grid-area: 2 / 2;
  }
  .p-link-tile .link-or-button-pure{
    z-index: 5;
    grid-column: 2;
    grid-row: var(--p-lt-pure-row);
    align-self: flex-end;
    display: var(--p-lt-pure-d);
  }
  .p-link-tile[align="top"] .link-or-button-pure {
    align-self: flex-start;
  }
  .p-link-tile .link-or-button{
    min-height: 54px;
    z-index: 5;
    margin-top: var(--p-spacing-static-md);
    display: var(--p-lt-btn-d);
  }
  @media (hover: hover) {
    .p-link-tile .root:hover [data-pds-slot]:not([name]){
      transform: scale3d(1.05, 1.05, 1.05);
    }
  }
  @supports (-webkit-hyphens: auto) {
    .p-link-tile .root{
      height: 100%;
    }
  }
  @media (min-width: 480px) {
    .p-link-tile .root{
      aspect-ratio: var(--p-lt-ar-xs, var(--p-lt-ar));
    }
    .p-link-tile p{
      font-size: var(--p-lt-fs-xs, var(--p-lt-fs));
      font-weight: var(--p-lt-fw-xs, var(--p-lt-fw));
    }
    .p-link-tile .footer{
      display: var(--p-lt-foot-d-xs);
      grid-template-columns: var(--p-lt-foot-cols-xs);
      column-gap: var(--p-lt-foot-gap-xs);
      flex-direction: var(--p-lt-foot-dir-xs);
      align-items: var(--p-lt-foot-ai-xs);
    }
    .p-link-tile .link-or-button-pure{
      display: var(--p-lt-pure-d-xs);
    }
    .p-link-tile .link-or-button{
      display: var(--p-lt-btn-d-xs);
    }
  }
  @media (min-width: 760px) {
    .p-link-tile .root{
      aspect-ratio: var(--p-lt-ar-s, var(--p-lt-ar));
    }
    .p-link-tile p{
      font-size: var(--p-lt-fs-s, var(--p-lt-fs));
      font-weight: var(--p-lt-fw-s, var(--p-lt-fw));
    }
    .p-link-tile .footer{
      display: var(--p-lt-foot-d-s);
      grid-template-columns: var(--p-lt-foot-cols-s);
      column-gap: var(--p-lt-foot-gap-s);
      flex-direction: var(--p-lt-foot-dir-s);
      align-items: var(--p-lt-foot-ai-s);
    }
    .p-link-tile .link-or-button-pure{
      display: var(--p-lt-pure-d-s);
    }
    .p-link-tile .link-or-button{
      display: var(--p-lt-btn-d-s);
    }
  }
  @media (min-width: 1000px) {
    .p-link-tile .root{
      aspect-ratio: var(--p-lt-ar-m, var(--p-lt-ar));
    }
    .p-link-tile p{
      font-size: var(--p-lt-fs-m, var(--p-lt-fs));
      font-weight: var(--p-lt-fw-m, var(--p-lt-fw));
    }
    .p-link-tile .footer{
      display: var(--p-lt-foot-d-m);
      grid-template-columns: var(--p-lt-foot-cols-m);
      column-gap: var(--p-lt-foot-gap-m);
      flex-direction: var(--p-lt-foot-dir-m);
      align-items: var(--p-lt-foot-ai-m);
    }
    .p-link-tile .link-or-button-pure{
      display: var(--p-lt-pure-d-m);
    }
    .p-link-tile .link-or-button{
      display: var(--p-lt-btn-d-m);
    }
  }
  @media (min-width: 1300px) {
    .p-link-tile .root{
      aspect-ratio: var(--p-lt-ar-l, var(--p-lt-ar));
    }
    .p-link-tile p{
      font-size: var(--p-lt-fs-l, var(--p-lt-fs));
      font-weight: var(--p-lt-fw-l, var(--p-lt-fw));
    }
    .p-link-tile .footer{
      display: var(--p-lt-foot-d-l);
      grid-template-columns: var(--p-lt-foot-cols-l);
      column-gap: var(--p-lt-foot-gap-l);
      flex-direction: var(--p-lt-foot-dir-l);
      align-items: var(--p-lt-foot-ai-l);
    }
    .p-link-tile .link-or-button-pure{
      display: var(--p-lt-pure-d-l);
    }
    .p-link-tile .link-or-button{
      display: var(--p-lt-btn-d-l);
    }
  }
  @media (min-width: 1760px) {
    .p-link-tile .root{
      aspect-ratio: var(--p-lt-ar-xl, var(--p-lt-ar));
    }
    .p-link-tile p{
      font-size: var(--p-lt-fs-xl, var(--p-lt-fs));
      font-weight: var(--p-lt-fw-xl, var(--p-lt-fw));
    }
    .p-link-tile .footer{
      display: var(--p-lt-foot-d-xl);
      grid-template-columns: var(--p-lt-foot-cols-xl);
      column-gap: var(--p-lt-foot-gap-xl);
      flex-direction: var(--p-lt-foot-dir-xl);
      align-items: var(--p-lt-foot-ai-xl);
    }
    .p-link-tile .link-or-button-pure{
      display: var(--p-lt-pure-d-xl);
    }
    .p-link-tile .link-or-button{
      display: var(--p-lt-btn-d-xl);
    }
  }
  @media (min-width: 1920px) {
    .p-link-tile .root{
      aspect-ratio: var(--p-lt-ar-xxl, var(--p-lt-ar));
    }
    .p-link-tile p{
      font-size: var(--p-lt-fs-xxl, var(--p-lt-fs));
      font-weight: var(--p-lt-fw-xxl, var(--p-lt-fw));
    }
    .p-link-tile .footer{
      display: var(--p-lt-foot-d-xxl);
      grid-template-columns: var(--p-lt-foot-cols-xxl);
      column-gap: var(--p-lt-foot-gap-xxl);
      flex-direction: var(--p-lt-foot-dir-xxl);
      align-items: var(--p-lt-foot-ai-xxl);
    }
    .p-link-tile .link-or-button-pure{
      display: var(--p-lt-pure-d-xxl);
    }
    .p-link-tile .link-or-button{
      display: var(--p-lt-btn-d-xxl);
    }
  }`;function ut(l,a,s){let T,A,u,w,{$$slots:I={},$$scope:z}=a;const j={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},H={regular:"var(--p-font-weight-normal)","semi-bold":"var(--p-font-weight-semibold)",normal:"var(--p-font-weight-normal)",semibold:"var(--p-font-weight-semibold)",bold:"var(--p-font-weight-bold)"},h=["base","xs","s","m","l","xl","xxl"],x=(t,e)=>{if(t==null)return e;if(t==="")return typeof e=="boolean"?!0:e;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return e}return t==="true"?!0:t==="false"?!1:t},c=(t,e,f)=>t&&typeof t=="object"?t[e]===void 0?f:t[e]:t,P=t=>t==="inherit"?"":j[String(t)]||j.medium,q=t=>H[String(t)]||H["semi-bold"],S=(t,e,f,n,o,F)=>{const r=e==="base"?"":`-${e}`,v=F===!0||F==="true";t[`--p-lt-fs${r}`]=P(f),t[`--p-lt-fw${r}`]=q(n),t[`--p-lt-ar${r}`]=String(o||"4/3"),t[`--p-lt-foot-d${r}`]=v?"grid":"flex",t[`--p-lt-foot-cols${r}`]=v?"minmax(0, 1fr) auto":"none",t[`--p-lt-foot-gap${r}`]=v?"var(--p-spacing-static-md)":"0",t[`--p-lt-foot-dir${r}`]=v?"row":"column",t[`--p-lt-foot-ai${r}`]=v?"stretch":"start",t[`--p-lt-pure-d${r}`]=v?"inline-block":"none",t[`--p-lt-btn-d${r}`]=v?"none":"inline-block"};let{size:k}=a,{weight:i}=a,{aspectRatio:R}=a,{compact:p}=a,{description:b}=a,{label:d}=a;function y(){return{size:k,weight:i,aspectRatio:R,compact:p,description:b,label:d}}return l.$$set=t=>{s(3,a=U(U({},a),X(t))),"size"in t&&s(4,k=t.size),"weight"in t&&s(5,i=t.weight),"aspectRatio"in t&&s(6,R=t.aspectRatio),"compact"in t&&s(7,p=t.compact),"description"in t&&s(8,b=t.description),"label"in t&&s(9,d=t.label),"$$scope"in t&&s(11,z=t.$$scope)},l.$$.update=()=>{l.$$.dirty&256&&s(2,A=()=>b||""),l.$$.dirty&512,l.$$.dirty&1024&&s(1,u=pt(T())),s(0,w=dt({align:a.align,gradient:a.gradient}))},s(10,T=()=>{const t=x(y().size,"medium"),e=x(y().weight,"semi-bold"),f=x(y().aspectRatio,"4/3");let n=x(y().compact,!1);n==="true"&&(n=!0),n==="false"&&(n=!1);const o={"--p-lt-pure-row":"1 / 2"};if(typeof t=="object"||typeof e=="object"||typeof f=="object"||typeof n=="object"){const r=typeof t=="object"&&t!==null?t:null,v=typeof e=="object"&&e!==null?e:null,C=typeof f=="object"&&f!==null?f:null,E=typeof n=="object"&&n!==null?n:null;let M=r?c(r,"base","medium"):t,N=v?c(v,"base","semi-bold"):e,W=C?c(C,"base","4/3"):f,G=E?c(E,"base",!1):n;for(const g of h)r&&r[g]!==void 0&&(M=c(r,g,M)),v&&v[g]!==void 0&&(N=c(v,g,N)),C&&C[g]!==void 0&&(W=c(C,g,W)),E&&E[g]!==void 0&&(G=c(E,g,G)),S(o,g,M,N,W,G)}else for(const r of h)S(o,r,t,e,f,n);return o}),a=X(a),[w,u,A,a,k,i,R,p,b,d,T,z,I]}class yt extends tt{constructor(a){super(),nt(this,a,ut,vt,lt,{size:4,weight:5,aspectRatio:6,compact:7,description:8,label:9})}}export{yt as default};
