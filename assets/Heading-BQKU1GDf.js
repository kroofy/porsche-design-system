import{S as E,i as I,s as M,c as q,d as F,t as N,b as R,u as j,g as B,e as G,p as m,k as J,l as H,m as P,H as K,n as L,a as T,q as C}from"./svelte-DoO7z26N.js";import{s as W}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function Z(t){let a,s,v=`<style>${D}</style>`,g,u,h,o,l;const c=t[10].default,i=q(c,t,t[9],null);return{c(){a=P("div"),s=new K(!1),g=L(),u=P("h2"),h=P("span"),i&&i.c(),s.a=g,m(h,"data-pds-slot",""),m(a,"class",o="p-heading"+(t[1].class?` ${t[1].class}`:"")),m(a,"data-pds","heading"),m(a,"style",t[0])},m(n,p){J(n,a,p),s.m(v,a),H(a,g),H(a,u),H(u,h),i&&i.m(h,null),l=!0},p(n,[p]){i&&i.p&&(!l||p&512)&&j(i,c,n,n[9],l?G(c,n[9],p,null):B(n[9]),null),(!l||p&2&&o!==(o="p-heading"+(n[1].class?` ${n[1].class}`:"")))&&m(a,"class",o),(!l||p&1)&&m(a,"style",n[0])},i(n){l||(R(i,n),l=!0)},o(n){N(i,n),l=!1},d(n){n&&F(a),i&&i.d(n)}}}const D=`.p-heading :where([data-pds-slot]){display:contents}

  .p-heading {
    display: block;
  }
  .p-heading[hidden] {
    display: none !important;
  }
  .p-heading [data-pds-slot] > :is(h1, h2, h3, h4, h5, h6){
    all: unset;
  }
  .p-heading h2{
    all: unset;
    display: block;
    font: var(--p-heading-weight) var(--p-typescale-2xl) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    font-size: inherit;
    font-size: var(--p-heading-fs);
    color: var(--p-heading-fg);
    text-align: var(--p-heading-align);
    hyphens: var(--p-heading-hyphens);
    overflow-wrap: var(--p-heading-wrap);
    max-width: var(--p-heading-max);
    overflow: var(--p-heading-overflow);
    text-overflow: var(--p-heading-ellipsis);
    white-space: var(--p-heading-ws);
  }
  @media (min-width: 480px) {
    .p-heading h2{
      font-size: var(--p-heading-fs-xs, var(--p-heading-fs));
    }
  }
  @media (min-width: 760px) {
    .p-heading h2{
      font-size: var(--p-heading-fs-s, var(--p-heading-fs));
    }
  }
  @media (min-width: 1000px) {
    .p-heading h2{
      font-size: var(--p-heading-fs-m, var(--p-heading-fs));
    }
  }
  @media (min-width: 1300px) {
    .p-heading h2{
      font-size: var(--p-heading-fs-l, var(--p-heading-fs));
    }
  }
  @media (min-width: 1760px) {
    .p-heading h2{
      font-size: var(--p-heading-fs-xl, var(--p-heading-fs));
    }
  }
  @media (min-width: 1920px) {
    .p-heading h2{
      font-size: var(--p-heading-fs-xxl, var(--p-heading-fs));
    }
  }`;function Q(t,a,s){let v,g,{$$slots:u={},$$scope:h}=a;const o={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},l={regular:"var(--p-font-weight-normal)",normal:"var(--p-font-weight-normal)","semi-bold":"var(--p-font-weight-semibold)",semibold:"var(--p-font-weight-semibold)",bold:"var(--p-font-weight-bold)"},c={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",inherit:"currentcolor"},i=["base","xs","s","m","l","xl","xxl"],n=e=>o[String(e)]||o["2xl"],p=e=>{if(e==null||e==="")return"2xl";if(typeof e=="string"&&e.charAt(0)==="{")try{return JSON.parse(e.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"2xl"}return e},k=(e,d,f)=>{const r=f==="inherit"?"":f;if(d==="base"){e["--p-heading-fs"]=r;return}e[`--p-heading-fs-${d}`]=r};let{hyphens:w}=a,{ellipsis:_}=a,{weight:x}=a,{color:b}=a,{align:z}=a,{size:S}=a;function y(){return{hyphens:w,ellipsis:_,weight:x,color:b,align:z,size:S}}return t.$$set=e=>{s(1,a=T(T({},a),C(e))),"hyphens"in e&&s(2,w=e.hyphens),"ellipsis"in e&&s(3,_=e.ellipsis),"weight"in e&&s(4,x=e.weight),"color"in e&&s(5,b=e.color),"align"in e&&s(6,z=e.align),"size"in e&&s(7,S=e.size),"$$scope"in e&&s(9,h=e.$$scope)},t.$$.update=()=>{t.$$.dirty&112&&s(8,v=()=>{const e=y().hyphens||"none",d=y().ellipsis===!0||y().ellipsis==="true"||y().ellipsis==="",f={"--p-heading-weight":l[x||"normal"]||l.normal,"--p-heading-fg":c[b||"primary"]||c.primary,"--p-heading-align":z||"start","--p-heading-hyphens":e,"--p-heading-wrap":e==="auto"||e==="manual"?"break-word":"","--p-heading-max":d?"100%":"","--p-heading-overflow":d?"hidden":"","--p-heading-ellipsis":d?"ellipsis":"","--p-heading-ws":d?"nowrap":""},r=p(y().size);if(typeof r=="object"&&r!==null){let O=n(r.base||"2xl");for(const A of i)r[A]!==void 0&&(O=n(r[A])),k(f,A,O)}else k(f,"base",n(r));return f}),t.$$.dirty&256&&s(0,g=W(v()))},a=C(a),[g,a,w,_,x,b,z,S,v,h,u]}class ee extends E{constructor(a){super(),I(this,a,Q,Z,M,{hyphens:2,ellipsis:3,weight:4,color:5,align:6,size:7})}}export{ee as default};
