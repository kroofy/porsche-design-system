import{S as j,i as q,s as H,r as O,d as M,z as P,p as i,k as B,l as C,m as E,H as J,n as R,a as F,q as N}from"./svelte-DoO7z26N.js";import{s as K}from"./host-DRskmCSE.js";import{I as X}from"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function Z(t){let r,e,v=`<style>${D}</style>`,f,a,l,p,m;return{c(){r=E("div"),e=new J(!1),f=R(),a=E("img"),e.a=f,i(a,"width","24"),i(a,"height","24"),i(a,"loading","lazy"),P(a.src,l=t[0]())||i(a,"src",l),i(a,"alt",p=t[2]()),i(r,"class",m="p-icon"+(t[3].class?` ${t[3].class}`:"")),i(r,"data-pds","icon"),i(r,"style",t[1])},m(s,c){B(s,r,c),e.m(v,r),C(r,f),C(r,a)},p(s,[c]){c&1&&!P(a.src,l=s[0]())&&i(a,"src",l),c&4&&p!==(p=s[2]())&&i(a,"alt",p),c&8&&m!==(m="p-icon"+(s[3].class?` ${s[3].class}`:""))&&i(r,"class",m),c&2&&i(r,"style",s[1])},i:O,o:O,d(s){s&&M(r)}}}const D=`.p-icon :where([data-pds-slot]){display:contents}

  .p-icon {
    display: inline-flex;
    vertical-align: top;
  }
  .p-icon[hidden] {
    display: none !important;
  }
  .p-icon img{
    display: block;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    overflow: hidden;
    object-position: -9999px -9999px;
    pointer-events: none;
    width: var(--p-icon-size, var(--p-leading-normal));
    height: var(--p-icon-size, var(--p-leading-normal));
    font-family: var(--p-font-porsche-next);
    font-size: inherit;
    font-size: var(--p-icon-fs);
    -webkit-mask: var(--p-icon-mask);
    mask: var(--p-icon-mask);
    background: var(
      --p-icon-color,
      var(--p-icon-fallback, var(--p-color-primary))
    );
  }
  @media (forced-colors: active) {
    .p-icon img{
      background: CanvasText;
    }
  }
  .p-icon img:dir(rtl){
    transform: var(--p-icon-flip, none);
  }
  @media (min-width: 480px) {
    .p-icon img{
      font-size: var(--p-icon-fs-xs, var(--p-icon-fs));
    }
  }
  @media (min-width: 760px) {
    .p-icon img{
      font-size: var(--p-icon-fs-s, var(--p-icon-fs));
    }
  }
  @media (min-width: 1000px) {
    .p-icon img{
      font-size: var(--p-icon-fs-m, var(--p-icon-fs));
    }
  }
  @media (min-width: 1300px) {
    .p-icon img{
      font-size: var(--p-icon-fs-l, var(--p-icon-fs));
    }
  }
  @media (min-width: 1760px) {
    .p-icon img{
      font-size: var(--p-icon-fs-xl, var(--p-icon-fs));
    }
  }
  @media (min-width: 1920px) {
    .p-icon img{
      font-size: var(--p-icon-fs-xxl, var(--p-icon-fs));
    }
  }`;function G(t,r,e){let v,f,a,l;const p={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},m={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)","contrast-low":"var(--p-color-contrast-low)","contrast-lower":"var(--p-color-contrast-lower)",success:"var(--p-color-success)",warning:"var(--p-color-warning)",error:"var(--p-color-error)",info:"var(--p-color-info)",inherit:"currentcolor"},s={"arrow-compact-left":1,"arrow-compact-right":1,"arrow-double-left":1,"arrow-double-right":1,"arrow-first":1,"arrow-head-left":1,"arrow-head-right":1,"arrow-last":1,"arrow-left":1,"arrow-right":1,chart:1,chat:1,copy:1,external:1,increase:1,list:1,logout:1,return:1,send:1},c=X,T=["base","xs","s","m","l","xl","xxl"],b=n=>p[String(n)]||p.sm,L=n=>{if(n==null||n==="")return"sm";if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return n},_=(n,o,u)=>{const d=u==="inherit"?"":u;if(o==="base"){n["--p-icon-fs"]=d;return}n[`--p-icon-fs-${o}`]=d},I=(n,o)=>o&&/(\/)/.test(o)?o:"https://cdn.ui.porsche.com/porsche-design-system/icons/"+(c[n||"arrow-right"]||c["arrow-right"]);let{source:h}=r,{name:y}=r,{color:x}=r,{size:w}=r,{aria:z}=r;function S(){return{source:h,name:y,color:x,size:w,aria:z}}return t.$$set=n=>{e(3,r=F(F({},r),N(n))),"source"in n&&e(4,h=n.source),"name"in n&&e(5,y=n.name),"color"in n&&e(6,x=n.color),"size"in n&&e(7,w=n.size),"aria"in n&&e(8,z=n.aria)},t.$$.update=()=>{t.$$.dirty&64&&e(9,v=()=>{const n=S().source||"",o=S().name||"arrow-right",u=I(o,n),d={"--p-icon-fallback":m[x||"primary"]||m.primary,"--p-icon-mask":'url("'+u+'") center/contain no-repeat',"--p-icon-flip":!n&&s[o]?"scaleX(-1)":"none"},g=L(S().size);if(typeof g=="object"&&g!==null){let A=b(g.base||"sm");for(const k of T)g[k]!==void 0&&(A=b(g[k])),_(d,k,A)}else _(d,"base",b(g));return d}),t.$$.dirty&48&&e(0,f=()=>I(y,h)),t.$$.dirty&256&&e(2,a=()=>{let n=z;if(!n)return"";if(typeof n=="string")try{n=JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{n=null}return typeof n=="object"&&n!==null&&n["aria-label"]||""}),t.$$.dirty&512&&e(1,l=K(v()))},r=N(r),[f,l,a,r,h,y,x,w,z,v]}class nn extends j{constructor(r){super(),q(this,r,G,Z,H,{source:4,name:5,color:6,size:7,aria:8})}}export{nn as default};
