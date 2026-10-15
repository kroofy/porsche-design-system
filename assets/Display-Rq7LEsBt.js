import{S as w,i as C,s as H,c as T,d as q,t as E,b as F,u as I,g as M,e as N,p as c,k as R,l as A,m as O,H as j,n as B,a as P,q as k}from"./svelte-DoO7z26N.js";import{s as D}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function J(e){let l,n,m=`<style>${K}</style>`,f,u,d,o,t;const h=e[8].default,i=T(h,e,e[7],null);return{c(){l=O("div"),n=new j(!1),f=B(),u=O("h3"),d=O("span"),i&&i.c(),n.a=f,c(d,"data-pds-slot",""),c(l,"class",o="p-display"+(e[1].class?` ${e[1].class}`:"")),c(l,"data-pds","display"),c(l,"style",e[0])},m(a,p){R(a,l,p),n.m(m,l),A(l,f),A(l,u),A(u,d),i&&i.m(d,null),t=!0},p(a,[p]){i&&i.p&&(!t||p&128)&&I(i,h,a,a[7],t?N(h,a[7],p,null):M(a[7]),null),(!t||p&2&&o!==(o="p-display"+(a[1].class?` ${a[1].class}`:"")))&&c(l,"class",o),(!t||p&1)&&c(l,"style",a[0])},i(a){t||(F(i,a),t=!0)},o(a){E(i,a),t=!1},d(a){a&&q(l),i&&i.d(a)}}}const K=`.p-display :where([data-pds-slot]){display:contents}

  .p-display {
    display: block;
  }
  .p-display[hidden] {
    display: none !important;
  }
  .p-display [data-pds-slot] > :is(h1, h2, h3, h4, h5, h6){
    all: unset !important;
  }
  .p-display h3{
    all: unset;
    display: block;
    font: var(--p-font-weight-normal) var(--p-typescale-5xl) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    font-size: inherit;
    font-size: var(--p-display-fs);
    color: var(--p-display-fg);
    text-align: var(--p-display-align);
    max-width: var(--p-display-max);
    overflow: var(--p-display-overflow);
    text-overflow: var(--p-display-ellipsis);
    white-space: var(--p-display-ws);
  }
  @media (min-width: 480px) {
    .p-display h3{
      font-size: var(--p-display-fs-xs, var(--p-display-fs));
    }
  }
  @media (min-width: 760px) {
    .p-display h3{
      font-size: var(--p-display-fs-s, var(--p-display-fs));
    }
  }
  @media (min-width: 1000px) {
    .p-display h3{
      font-size: var(--p-display-fs-m, var(--p-display-fs));
    }
  }
  @media (min-width: 1300px) {
    .p-display h3{
      font-size: var(--p-display-fs-l, var(--p-display-fs));
    }
  }
  @media (min-width: 1760px) {
    .p-display h3{
      font-size: var(--p-display-fs-xl, var(--p-display-fs));
    }
  }
  @media (min-width: 1920px) {
    .p-display h3{
      font-size: var(--p-display-fs-xxl, var(--p-display-fs));
    }
  }`;function L(e,l,n){let m,f,{$$slots:u={},$$scope:d}=l;const o={small:"var(--p-typescale-3xl)",medium:"var(--p-typescale-4xl)",large:"var(--p-typescale-5xl)",inherit:"inherit","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},t={primary:"var(--p-color-primary)",inherit:"currentcolor"},h=["base","xs","s","m","l","xl","xxl"],i=s=>o[String(s)]||o.large,a=s=>{if(s==null||s==="")return"large";if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"large"}return s},p=(s,y,r)=>{const v=r==="inherit"?"":r;if(y==="base"){s["--p-display-fs"]=v;return}s[`--p-display-fs-${y}`]=v};let{ellipsis:z}=l,{color:g}=l,{align:x}=l,{size:S}=l;function _(){return{ellipsis:z,color:g,align:x,size:S}}return e.$$set=s=>{n(1,l=P(P({},l),k(s))),"ellipsis"in s&&n(2,z=s.ellipsis),"color"in s&&n(3,g=s.color),"align"in s&&n(4,x=s.align),"size"in s&&n(5,S=s.size),"$$scope"in s&&n(7,d=s.$$scope)},e.$$.update=()=>{e.$$.dirty&24&&n(6,m=()=>{const s=_().ellipsis===!0||_().ellipsis==="true"||_().ellipsis==="",y={"--p-display-fg":t[g||"primary"]||t.primary,"--p-display-align":x||"start","--p-display-max":s?"100%":"","--p-display-overflow":s?"hidden":"","--p-display-ellipsis":s?"ellipsis":"","--p-display-ws":s?"nowrap":""},r=a(_().size);if(typeof r=="object"&&r!==null){let v=i(r.base||"large");for(const b of h)r[b]!==void 0&&(v=i(r[b])),p(y,b,v)}else p(y,"base",i(r));return y}),e.$$.dirty&64&&n(0,f=D(m()))},l=k(l),[f,l,z,g,x,S,m,d,u]}class W extends w{constructor(l){super(),C(this,l,L,J,H,{ellipsis:2,color:3,align:4,size:5})}}export{W as default};
