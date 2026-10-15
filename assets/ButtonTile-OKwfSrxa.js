import{S as tt,i as nt,s as at,c as J,a as U,d as ot,t as K,b as Z,u as D,g as L,e as Q,f as et,h as V,j as lt,k as rt,l as u,m as w,H as st,n as q,o as it,p as O,q as X}from"./svelte-DoO7z26N.js";import{s as pt,h as dt}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const ft=o=>({}),Y=o=>({}),bt=o=>({}),$=o=>({});function ct(o){let a,i,T=`<style>${ut}</style>`,A,v,z,E,k,j,H,m,g,b=o[2]()+"",P,I,S,x,s;const R=o[12].header,p=J(R,o,o[11],$),y=o[12].default,d=J(y,o,o[11],null),_=o[12].footer,t=J(_,o,o[11],Y);let e=[{class:x="p-button-tile"+(o[3].class?` ${o[3].class}`:"")},{"data-pds":"button-tile"},{style:o[1]},o[0]],f={};for(let n=0;n<e.length;n+=1)f=U(f,e[n]);return{c(){a=w("div"),i=new st(!1),A=q(),v=w("div"),z=w("span"),p&&p.c(),E=q(),k=w("div"),j=w("span"),d&&d.c(),H=q(),m=w("div"),g=w("p"),P=it(b),I=q(),S=w("span"),t&&t.c(),i.a=A,O(z,"data-pds-slot","header"),O(j,"data-pds-slot",""),O(k,"class","media"),O(S,"data-pds-slot","footer"),O(m,"class","footer"),O(v,"class","root"),V(a,f)},m(n,l){rt(n,a,l),i.m(T,a),u(a,A),u(a,v),u(v,z),p&&p.m(z,null),u(v,E),u(v,k),u(k,j),d&&d.m(j,null),u(v,H),u(v,m),u(m,g),u(g,P),u(m,I),u(m,S),t&&t.m(S,null),s=!0},p(n,[l]){p&&p.p&&(!s||l&2048)&&D(p,R,n,n[11],s?Q(R,n[11],l,bt):L(n[11]),$),d&&d.p&&(!s||l&2048)&&D(d,y,n,n[11],s?Q(y,n[11],l,null):L(n[11]),null),(!s||l&4)&&b!==(b=n[2]()+"")&&et(P,b),t&&t.p&&(!s||l&2048)&&D(t,_,n,n[11],s?Q(_,n[11],l,ft):L(n[11]),Y),V(a,f=lt(e,[(!s||l&8&&x!==(x="p-button-tile"+(n[3].class?` ${n[3].class}`:"")))&&{class:x},{"data-pds":"button-tile"},(!s||l&2)&&{style:n[1]},l&1&&n[0]]))},i(n){s||(Z(p,n),Z(d,n),Z(t,n),s=!0)},o(n){K(p,n),K(d,n),K(t,n),s=!1},d(n){n&&ot(a),p&&p.d(n),d&&d.d(n),t&&t.d(n)}}}const ut=`.p-button-tile :where([data-pds-slot]){display:contents}

  .p-button-tile {
    display: flex;
    align-items: stretch;
    color-scheme: dark;
    hyphens: auto;
  }
  .p-button-tile[hidden] {
    display: none !important;
  }
  .p-button-tile [data-pds-slot]{
    display: block;
  }
  .p-button-tile [data-pds-slot]:not([name]){
    width: 100%;
    height: 100%;
    transition: transform var(--p-transition-duration, var(--p-duration-md))
      var(--p-ease-in-out);
  }
  .p-button-tile [data-pds-slot="header"]{
    grid-area: 2 / 2;
    z-index: 5;
  }
  .p-button-tile[align="top"] [data-pds-slot="header"] {
    grid-area: 4 / 2;
  }
  .p-button-tile [data-pds-slot="footer"]{
    grid-row: 2;
    z-index: 3;
  }
  .p-button-tile [data-pds-slot] > :is(img, video, picture){
    display: block !important;
    width: 100% !important;
    height: 100% !important;
  }
  .p-button-tile [data-pds-slot] > :is(img, video){
    object-fit: cover !important;
  }
  .p-button-tile a{
    grid-area: 1 / 1 / -1 / -1;
    z-index: 4;
    outline: 0;
  }
  .p-button-tile p{
    all: unset;
    z-index: 3;
    max-width: 34.375rem;
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-primary);
    hyphens: inherit;
    font-size: inherit;
    font-size: var(--p-bt-fs);
    font-weight: var(--p-bt-fw);
  }
  @supports (-webkit-hyphens: auto) {
    .p-button-tile {
      align-items: baseline;
    }
  }
  .p-button-tile .root{
    display: grid;
    grid-template: var(--p-spacing-fluid-md) auto minmax(0px, 1fr) auto var(
        --p-spacing-fluid-md
      ) / var(--p-spacing-fluid-md) minmax(0px, 1fr) var(--p-spacing-fluid-md);
    width: 100%;
    border-radius: var(--p-radius-3xl);
    aspect-ratio: var(--p-bt-ar);
    cursor: pointer;
  }
  .p-button-tile[disabled] .root,
  .p-button-tile[loading] .root {
    cursor: not-allowed;
  }
  .p-button-tile .root::after{
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
  .p-button-tile[align="top"] .root::after {
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
  .p-button-tile:not([gradient]) .root::after {
    content: none;
  }
  .p-button-tile .media{
    position: relative;
    grid-area: 1 / 1 / -1 / -1;
    z-index: 1;
    overflow: hidden;
    border-radius: inherit;
  }
  .p-button-tile .footer{
    grid-area: 4 / 2;
    display: var(--p-bt-foot-d);
    grid-template-columns: var(--p-bt-foot-cols);
    column-gap: var(--p-bt-foot-gap);
    flex-direction: var(--p-bt-foot-dir);
    align-items: var(--p-bt-foot-ai);
  }
  .p-button-tile[align="top"] .footer {
    grid-area: 2 / 2;
  }
  .p-button-tile .link-or-button-pure{
    z-index: 5;
    grid-column: 2;
    grid-row: var(--p-bt-pure-row);
    align-self: flex-end;
    display: var(--p-bt-pure-d);
  }
  .p-button-tile[align="top"] .link-or-button-pure {
    align-self: flex-start;
  }
  .p-button-tile .link-or-button{
    min-height: 54px;
    z-index: 5;
    margin-top: var(--p-spacing-static-md);
    display: var(--p-bt-btn-d);
  }
  @media (hover: hover) {
    .p-button-tile:not([disabled]) .root:hover [data-pds-slot]:not([name]) {
      transform: scale3d(1.05, 1.05, 1.05);
    }
  }
  @supports (-webkit-hyphens: auto) {
    .p-button-tile .root{
      height: 100%;
    }
  }
  @media (min-width: 480px) {
    .p-button-tile .root{
      aspect-ratio: var(--p-bt-ar-xs, var(--p-bt-ar));
    }
    .p-button-tile p{
      font-size: var(--p-bt-fs-xs, var(--p-bt-fs));
      font-weight: var(--p-bt-fw-xs, var(--p-bt-fw));
    }
    .p-button-tile .footer{
      display: var(--p-bt-foot-d-xs);
      grid-template-columns: var(--p-bt-foot-cols-xs);
      column-gap: var(--p-bt-foot-gap-xs);
      flex-direction: var(--p-bt-foot-dir-xs);
      align-items: var(--p-bt-foot-ai-xs);
    }
    .p-button-tile .link-or-button-pure{
      display: var(--p-bt-pure-d-xs);
    }
    .p-button-tile .link-or-button{
      display: var(--p-bt-btn-d-xs);
    }
  }
  @media (min-width: 760px) {
    .p-button-tile .root{
      aspect-ratio: var(--p-bt-ar-s, var(--p-bt-ar));
    }
    .p-button-tile p{
      font-size: var(--p-bt-fs-s, var(--p-bt-fs));
      font-weight: var(--p-bt-fw-s, var(--p-bt-fw));
    }
    .p-button-tile .footer{
      display: var(--p-bt-foot-d-s);
      grid-template-columns: var(--p-bt-foot-cols-s);
      column-gap: var(--p-bt-foot-gap-s);
      flex-direction: var(--p-bt-foot-dir-s);
      align-items: var(--p-bt-foot-ai-s);
    }
    .p-button-tile .link-or-button-pure{
      display: var(--p-bt-pure-d-s);
    }
    .p-button-tile .link-or-button{
      display: var(--p-bt-btn-d-s);
    }
  }
  @media (min-width: 1000px) {
    .p-button-tile .root{
      aspect-ratio: var(--p-bt-ar-m, var(--p-bt-ar));
    }
    .p-button-tile p{
      font-size: var(--p-bt-fs-m, var(--p-bt-fs));
      font-weight: var(--p-bt-fw-m, var(--p-bt-fw));
    }
    .p-button-tile .footer{
      display: var(--p-bt-foot-d-m);
      grid-template-columns: var(--p-bt-foot-cols-m);
      column-gap: var(--p-bt-foot-gap-m);
      flex-direction: var(--p-bt-foot-dir-m);
      align-items: var(--p-bt-foot-ai-m);
    }
    .p-button-tile .link-or-button-pure{
      display: var(--p-bt-pure-d-m);
    }
    .p-button-tile .link-or-button{
      display: var(--p-bt-btn-d-m);
    }
  }
  @media (min-width: 1300px) {
    .p-button-tile .root{
      aspect-ratio: var(--p-bt-ar-l, var(--p-bt-ar));
    }
    .p-button-tile p{
      font-size: var(--p-bt-fs-l, var(--p-bt-fs));
      font-weight: var(--p-bt-fw-l, var(--p-bt-fw));
    }
    .p-button-tile .footer{
      display: var(--p-bt-foot-d-l);
      grid-template-columns: var(--p-bt-foot-cols-l);
      column-gap: var(--p-bt-foot-gap-l);
      flex-direction: var(--p-bt-foot-dir-l);
      align-items: var(--p-bt-foot-ai-l);
    }
    .p-button-tile .link-or-button-pure{
      display: var(--p-bt-pure-d-l);
    }
    .p-button-tile .link-or-button{
      display: var(--p-bt-btn-d-l);
    }
  }
  @media (min-width: 1760px) {
    .p-button-tile .root{
      aspect-ratio: var(--p-bt-ar-xl, var(--p-bt-ar));
    }
    .p-button-tile p{
      font-size: var(--p-bt-fs-xl, var(--p-bt-fs));
      font-weight: var(--p-bt-fw-xl, var(--p-bt-fw));
    }
    .p-button-tile .footer{
      display: var(--p-bt-foot-d-xl);
      grid-template-columns: var(--p-bt-foot-cols-xl);
      column-gap: var(--p-bt-foot-gap-xl);
      flex-direction: var(--p-bt-foot-dir-xl);
      align-items: var(--p-bt-foot-ai-xl);
    }
    .p-button-tile .link-or-button-pure{
      display: var(--p-bt-pure-d-xl);
    }
    .p-button-tile .link-or-button{
      display: var(--p-bt-btn-d-xl);
    }
  }
  @media (min-width: 1920px) {
    .p-button-tile .root{
      aspect-ratio: var(--p-bt-ar-xxl, var(--p-bt-ar));
    }
    .p-button-tile p{
      font-size: var(--p-bt-fs-xxl, var(--p-bt-fs));
      font-weight: var(--p-bt-fw-xxl, var(--p-bt-fw));
    }
    .p-button-tile .footer{
      display: var(--p-bt-foot-d-xxl);
      grid-template-columns: var(--p-bt-foot-cols-xxl);
      column-gap: var(--p-bt-foot-gap-xxl);
      flex-direction: var(--p-bt-foot-dir-xxl);
      align-items: var(--p-bt-foot-ai-xxl);
    }
    .p-button-tile .link-or-button-pure{
      display: var(--p-bt-pure-d-xxl);
    }
    .p-button-tile .link-or-button{
      display: var(--p-bt-btn-d-xxl);
    }
  }`;function vt(o,a,i){let T,A,v,z,{$$slots:E={},$$scope:k}=a;const j={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},H={regular:"var(--p-font-weight-normal)","semi-bold":"var(--p-font-weight-semibold)",normal:"var(--p-font-weight-normal)",semibold:"var(--p-font-weight-semibold)",bold:"var(--p-font-weight-bold)"},m=["base","xs","s","m","l","xl","xxl"],g=(t,e)=>{if(t==null)return e;if(t==="")return typeof e=="boolean"?!0:e;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return e}return t==="true"?!0:t==="false"?!1:t},b=(t,e,f)=>t&&typeof t=="object"?t[e]===void 0?f:t[e]:t,P=t=>t==="inherit"?"":j[String(t)]||j.medium,I=t=>H[String(t)]||H["semi-bold"],S=(t,e,f,n,l,F)=>{const r=e==="base"?"":`-${e}`,c=F===!0||F==="true";t[`--p-bt-fs${r}`]=P(f),t[`--p-bt-fw${r}`]=I(n),t[`--p-bt-ar${r}`]=String(l||"4/3"),t[`--p-bt-foot-d${r}`]=c?"grid":"flex",t[`--p-bt-foot-cols${r}`]=c?"minmax(0, 1fr) auto":"none",t[`--p-bt-foot-gap${r}`]=c?"var(--p-spacing-static-md)":"0",t[`--p-bt-foot-dir${r}`]=c?"row":"column",t[`--p-bt-foot-ai${r}`]=c?"stretch":"start",t[`--p-bt-pure-d${r}`]=c?"inline-block":"none",t[`--p-bt-btn-d${r}`]=c?"none":"inline-block"};let{size:x}=a,{weight:s}=a,{aspectRatio:R}=a,{compact:p}=a,{description:y}=a,{label:d}=a;function _(){return{size:x,weight:s,aspectRatio:R,compact:p,description:y,label:d}}return o.$$set=t=>{i(3,a=U(U({},a),X(t))),"size"in t&&i(4,x=t.size),"weight"in t&&i(5,s=t.weight),"aspectRatio"in t&&i(6,R=t.aspectRatio),"compact"in t&&i(7,p=t.compact),"description"in t&&i(8,y=t.description),"label"in t&&i(9,d=t.label),"$$scope"in t&&i(11,k=t.$$scope)},o.$$.update=()=>{o.$$.dirty&256&&i(2,A=()=>y||""),o.$$.dirty&512,o.$$.dirty&1024&&i(1,v=pt(T())),i(0,z=dt({align:a.align,disabled:a.disabled,gradient:a.gradient,loading:a.loading}))},i(10,T=()=>{const t=g(_().size,"medium"),e=g(_().weight,"semi-bold"),f=g(_().aspectRatio,"4/3");let n=g(_().compact,!1);n==="true"&&(n=!0),n==="false"&&(n=!1);const l={"--p-bt-pure-row":"1 / 2"};if(typeof t=="object"||typeof e=="object"||typeof f=="object"||typeof n=="object"){const r=typeof t=="object"&&t!==null?t:null,c=typeof e=="object"&&e!==null?e:null,B=typeof f=="object"&&f!==null?f:null,C=typeof n=="object"&&n!==null?n:null;let M=r?b(r,"base","medium"):t,N=c?b(c,"base","semi-bold"):e,W=B?b(B,"base","4/3"):f,G=C?b(C,"base",!1):n;for(const h of m)r&&r[h]!==void 0&&(M=b(r,h,M)),c&&c[h]!==void 0&&(N=b(c,h,N)),B&&B[h]!==void 0&&(W=b(B,h,W)),C&&C[h]!==void 0&&(G=b(C,h,G)),S(l,h,M,N,W,G)}else for(const r of m)S(l,r,t,e,f,n);return l}),a=X(a),[z,v,A,a,x,s,R,p,y,d,T,k,E]}class _t extends tt{constructor(a){super(),nt(this,a,vt,ct,at,{size:4,weight:5,aspectRatio:6,compact:7,description:8,label:9})}}export{_t as default};
