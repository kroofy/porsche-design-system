import{S as O,i as A,s as C,r as S,d as P,p as r,k as T,l as y,m as z,H,n as N,y as b,a as _,q as w}from"./svelte-DoO7z26N.js";import{s as j}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function q(i){let e,t,x=`<style>${B}</style>`,d,l,m,a,u,c,v,f;return{c(){e=z("div"),t=new H(!1),d=N(),l=z("div"),m=z("span"),a=b("svg"),u=b("circle"),c=b("circle"),t.a=d,r(m,"class","sr-only"),r(u,"r","11"),r(c,"r","11"),r(a,"viewBox","-16 -16 32 32"),r(a,"width","100%"),r(a,"height","100%"),r(a,"focusable","false"),r(a,"aria-hidden","true"),r(l,"role","alert"),r(l,"aria-live","assertive"),r(l,"aria-label",v=i[1]()),r(e,"class",f="p-spinner"+(i[2].class?` ${i[2].class}`:"")),r(e,"data-pds","spinner"),r(e,"style",i[0])},m(s,o){T(s,e,o),t.m(x,e),y(e,d),y(e,l),y(l,m),y(l,a),y(a,u),y(a,c)},p(s,[o]){o&2&&v!==(v=s[1]())&&r(l,"aria-label",v),o&4&&f!==(f="p-spinner"+(s[2].class?` ${s[2].class}`:""))&&r(e,"class",f),o&1&&r(e,"style",s[0])},i:S,o:S,d(s){s&&P(e)}}}const B=`.p-spinner :where([data-pds-slot]){display:contents}

  .p-spinner {
    display: inline-flex;
    vertical-align: top;
  }
  .p-spinner[hidden] {
    display: none !important;
  }
  @keyframes rotate {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dashoffset: 69;
      transform: rotateZ(0);
    }
    50%,
    75% {
      stroke-dashoffset: 24;
      transform: rotateZ(80deg);
    }
    100% {
      stroke-dashoffset: 69;
      transform: rotateZ(360deg);
    }
  }
  .p-spinner div{
    width: var(--p-spinner-size, var(--p-leading-normal));
    height: var(--p-spinner-size, var(--p-leading-normal));
    font-family: var(--p-font-porsche-next);
    font-size: inherit;
    font-size: var(--p-spinner-fs);
  }
  .p-spinner svg{
    display: block;
    fill: none;
    stroke-width: 1.5;
    animation: rotate var(--p-animation-duration, var(--p-duration-xl))
      steps(50) infinite;
  }
  .p-spinner circle:first-child{
    stroke: var(--p-spinner-track-color, var(--p-color-contrast-lower));
  }
  .p-spinner circle:last-child{
    stroke: var(
      --p-spinner-color,
      var(--p-spinner-fallback, var(--p-color-primary))
    );
    stroke-dasharray: var(--p-temporary-spinner-stroke-dasharray, 69);
    stroke-linecap: round;
    animation: dash var(--p-animation-duration, var(--p-duration-xl)) steps(50)
      infinite;
  }
  @media (forced-colors: active) {
    .p-spinner circle:last-child{
      stroke: CanvasText;
    }
    .p-spinner circle:first-child{
      stroke: none !important;
    }
  }
  @supports (color: oklch(from red l c h)) {
    .p-spinner circle:first-child{
      stroke: var(
        --p-spinner-track-color,
        oklch(
          from
            var(
              --p-spinner-color,
              var(--p-spinner-fallback, var(--p-color-primary))
            )
            l c h/.2
        )
      );
    }
  }
  .p-spinner span,
  .p-spinner .sr-only{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  @media (min-width: 480px) {
    .p-spinner div{
      font-size: var(--p-spinner-fs-xs, var(--p-spinner-fs));
    }
  }
  @media (min-width: 760px) {
    .p-spinner div{
      font-size: var(--p-spinner-fs-s, var(--p-spinner-fs));
    }
  }
  @media (min-width: 1000px) {
    .p-spinner div{
      font-size: var(--p-spinner-fs-m, var(--p-spinner-fs));
    }
  }
  @media (min-width: 1300px) {
    .p-spinner div{
      font-size: var(--p-spinner-fs-l, var(--p-spinner-fs));
    }
  }
  @media (min-width: 1760px) {
    .p-spinner div{
      font-size: var(--p-spinner-fs-xl, var(--p-spinner-fs));
    }
  }
  @media (min-width: 1920px) {
    .p-spinner div{
      font-size: var(--p-spinner-fs-xxl, var(--p-spinner-fs));
    }
  }`;function E(i,e,t){let x,d,l;const m={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},a={primary:"var(--p-color-primary)",inherit:"currentcolor"},u=["base","xs","s","m","l","xl","xxl"],c=n=>m[String(n)]||m.sm,v=n=>{if(n==null||n==="")return"sm";if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return n},f=(n,p,g)=>{const h=g==="inherit"?"":g;if(p==="base"){n["--p-spinner-fs"]=h;return}n[`--p-spinner-fs-${p}`]=h};let{color:s}=e,{size:o}=e,{aria:k}=e;function Z(){return{color:s,size:o,aria:k}}return i.$$set=n=>{t(2,e=_(_({},e),w(n))),"color"in n&&t(3,s=n.color),"size"in n&&t(4,o=n.size),"aria"in n&&t(5,k=n.aria)},i.$$.update=()=>{i.$$.dirty&8&&t(6,x=()=>{const n={"--p-spinner-fallback":a[s||"primary"]||a.primary},p=v(Z().size);if(typeof p=="object"&&p!==null){let g=c(p.base||"sm");for(const h of u)p[h]!==void 0&&(g=c(p[h])),f(n,h,g)}else f(n,"base",c(p));return n}),i.$$.dirty&32&&t(1,d=()=>{let n=k;if(!n)return"";if(typeof n=="string")try{n=JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{n=null}return typeof n=="object"&&n!==null&&n["aria-label"]||""}),i.$$.dirty&64&&t(0,l=j(x()))},e=w(e),[l,d,e,s,o,k,x]}class R extends O{constructor(e){super(),A(this,e,E,q,C,{color:3,size:4,aria:5})}}export{R as default};
