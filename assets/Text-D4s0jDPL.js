import{S as C,i as E,s as I,c as M,d as F,t as N,b as R,u as j,g as B,e as G,p as d,k as J,l as A,m as P,H as K,n as L,a as O,q}from"./svelte-DoO7z26N.js";import{s as W}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function Z(l){let e,a,v=`<style>${D}</style>`,f,u,o,c,i;const m=l[10].default,n=M(m,l,l[9],null);return{c(){e=P("div"),a=new K(!1),f=L(),u=P("p"),o=P("span"),n&&n.c(),a.a=f,d(o,"data-pds-slot",""),d(e,"class",c="p-text"+(l[1].class?` ${l[1].class}`:"")),d(e,"data-pds","text"),d(e,"style",l[0])},m(s,p){J(s,e,p),a.m(v,e),A(e,f),A(e,u),A(u,o),n&&n.m(o,null),i=!0},p(s,[p]){n&&n.p&&(!i||p&512)&&j(n,m,s,s[9],i?G(m,s[9],p,null):B(s[9]),null),(!i||p&2&&c!==(c="p-text"+(s[1].class?` ${s[1].class}`:"")))&&d(e,"class",c),(!i||p&1)&&d(e,"style",s[0])},i(s){i||(R(n,s),i=!0)},o(s){N(n,s),i=!1},d(s){s&&F(e),n&&n.d(s)}}}const D=`.p-text :where([data-pds-slot]){display:contents}

  .p-text {
    display: block;
  }
  .p-text[hidden] {
    display: none !important;
  }
  .p-text [data-pds-slot] > 
      :is(p, span, div, address, blockquote, figcaption, cite, time, legend){
    all: unset;
  }
  .p-text p{
    all: unset;
    display: block;
    font: var(--p-text-weight) var(--p-typescale-sm) / var(--p-leading-normal)
      var(--p-font-porsche-next);
    font-size: inherit;
    font-size: var(--p-text-fs);
    color: var(--p-text-fg);
    text-align: var(--p-text-align);
    hyphens: inherit;
    hyphens: var(--p-text-hyphens);
    overflow-wrap: var(--p-text-wrap);
    max-width: var(--p-text-max);
    overflow: var(--p-text-overflow);
    text-overflow: var(--p-text-ellipsis);
    white-space: var(--p-text-ws);
  }
  @media (min-width: 480px) {
    .p-text p{
      font-size: var(--p-text-fs-xs, var(--p-text-fs));
    }
  }
  @media (min-width: 760px) {
    .p-text p{
      font-size: var(--p-text-fs-s, var(--p-text-fs));
    }
  }
  @media (min-width: 1000px) {
    .p-text p{
      font-size: var(--p-text-fs-m, var(--p-text-fs));
    }
  }
  @media (min-width: 1300px) {
    .p-text p{
      font-size: var(--p-text-fs-l, var(--p-text-fs));
    }
  }
  @media (min-width: 1760px) {
    .p-text p{
      font-size: var(--p-text-fs-xl, var(--p-text-fs));
    }
  }
  @media (min-width: 1920px) {
    .p-text p{
      font-size: var(--p-text-fs-xxl, var(--p-text-fs));
    }
  }`;function Q(l,e,a){let v,f,{$$slots:u={},$$scope:o}=e;const c={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},i={regular:"var(--p-font-weight-normal)",normal:"var(--p-font-weight-normal)","semi-bold":"var(--p-font-weight-semibold)",semibold:"var(--p-font-weight-semibold)",bold:"var(--p-font-weight-bold)"},m={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",success:"var(--p-color-success)",warning:"var(--p-color-warning)",error:"var(--p-color-error)",info:"var(--p-color-info)",inherit:"currentcolor"},n=["base","xs","s","m","l","xl","xxl"],s=t=>c[String(t)]||c.sm,p=t=>{if(t==null||t==="")return"sm";if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return t},T=(t,x,h)=>{const r=h==="inherit"?"":h;if(x==="base"){t["--p-text-fs"]=r;return}t[`--p-text-fs-${x}`]=r};let{hyphens:z}=e,{ellipsis:_}=e,{weight:y}=e,{color:b}=e,{align:w}=e,{size:S}=e;function g(){return{hyphens:z,ellipsis:_,weight:y,color:b,align:w,size:S}}return l.$$set=t=>{a(1,e=O(O({},e),q(t))),"hyphens"in t&&a(2,z=t.hyphens),"ellipsis"in t&&a(3,_=t.ellipsis),"weight"in t&&a(4,y=t.weight),"color"in t&&a(5,b=t.color),"align"in t&&a(6,w=t.align),"size"in t&&a(7,S=t.size),"$$scope"in t&&a(9,o=t.$$scope)},l.$$.update=()=>{l.$$.dirty&112&&a(8,v=()=>{const t=g().hyphens||"inherit",x=g().ellipsis===!0||g().ellipsis==="true"||g().ellipsis==="",h={"--p-text-weight":i[y||"normal"]||i.normal,"--p-text-fg":m[b||"primary"]||m.primary,"--p-text-align":w||"start","--p-text-hyphens":t==="inherit"?"":t,"--p-text-wrap":t==="auto"||t==="manual"?"break-word":"","--p-text-max":x?"100%":"","--p-text-overflow":x?"hidden":"","--p-text-ellipsis":x?"ellipsis":"","--p-text-ws":x?"nowrap":""},r=p(g().size);if(typeof r=="object"&&r!==null){let H=s(r.base||"sm");for(const k of n)r[k]!==void 0&&(H=s(r[k])),T(h,k,H)}else T(h,"base",s(r));return h}),l.$$.dirty&256&&a(0,f=W(v()))},e=q(e),[f,e,z,_,y,b,w,S,v,o,u]}class tt extends C{constructor(e){super(),E(this,e,Q,Z,I,{hyphens:2,ellipsis:3,weight:4,color:5,align:6,size:7})}}export{tt as default};
