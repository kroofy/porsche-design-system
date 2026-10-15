import{S as H,i as N,s as O,r as b,d as P,z as _,p as i,k as T,l as S,m as q,H as j,n as k,a as A,q as F}from"./svelte-DoO7z26N.js";import{s as C}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function E(r){let a,n,d=`<style>${I}</style>`,c,s,f,g,m;return{c(){a=q("div"),n=new j(!1),c=k(),s=q("img"),n.a=c,i(s,"width","24"),i(s,"height","24"),i(s,"loading","lazy"),_(s.src,f=r[2]())||i(s,"src",f),i(s,"alt",g=r[1]()),i(a,"class",m="p-flag"+(r[3].class?` ${r[3].class}`:"")),i(a,"data-pds","flag"),i(a,"style",r[0])},m(l,p){T(l,a,p),n.m(d,a),S(a,c),S(a,s)},p(l,[p]){p&4&&!_(s.src,f=l[2]())&&i(s,"src",f),p&2&&g!==(g=l[1]())&&i(s,"alt",g),p&8&&m!==(m="p-flag"+(l[3].class?` ${l[3].class}`:""))&&i(a,"class",m),p&1&&i(a,"style",l[0])},i:b,o:b,d(l){l&&P(a)}}}const I=`.p-flag :where([data-pds-slot]){display:contents}

  .p-flag {
    display: inline-flex;
    vertical-align: top;
  }
  .p-flag[hidden] {
    display: none !important;
  }
  .p-flag img{
    display: block;
    margin: 0;
    padding: 1px;
    border: 0;
    outline: 0;
    overflow: hidden;
    box-sizing: border-box;
    pointer-events: none;
    width: var(--p-flag-size, var(--p-leading-normal));
    height: var(--p-flag-size, var(--p-leading-normal));
    font-family: var(--p-font-porsche-next);
    font-size: inherit;
    font-size: var(--p-flag-fs);
  }
  @media (min-width: 480px) {
    .p-flag img{
      font-size: var(--p-flag-fs-xs, var(--p-flag-fs));
    }
  }
  @media (min-width: 760px) {
    .p-flag img{
      font-size: var(--p-flag-fs-s, var(--p-flag-fs));
    }
  }
  @media (min-width: 1000px) {
    .p-flag img{
      font-size: var(--p-flag-fs-m, var(--p-flag-fs));
    }
  }
  @media (min-width: 1300px) {
    .p-flag img{
      font-size: var(--p-flag-fs-l, var(--p-flag-fs));
    }
  }
  @media (min-width: 1760px) {
    .p-flag img{
      font-size: var(--p-flag-fs-xl, var(--p-flag-fs));
    }
  }
  @media (min-width: 1920px) {
    .p-flag img{
      font-size: var(--p-flag-fs-xxl, var(--p-flag-fs));
    }
  }`;function J(r,a,n){let d,c,s,f;const g={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},m=["base","xs","s","m","l","xl","xxl"],l=e=>g[String(e)]||g.sm,p=e=>{if(e==null||e==="")return"sm";if(typeof e=="string"&&e.charAt(0)==="{")try{return JSON.parse(e.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return e},h=(e,t,x)=>{const o=x==="inherit"?"":x;if(t==="base"){e["--p-flag-fs"]=o;return}e[`--p-flag-fs-${t}`]=o};let{size:u}=a,{name:y}=a,{aria:v}=a;function z(){return{size:u,name:y,aria:v}}return r.$$set=e=>{n(3,a=A(A({},a),F(e))),"size"in e&&n(4,u=e.size),"name"in e&&n(5,y=e.name),"aria"in e&&n(6,v=e.aria)},r.$$.update=()=>{r.$$.dirty&64&&n(1,s=()=>{let e=v;if(!e)return"";if(typeof e=="string")try{e=JSON.parse(e.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{e=null}return typeof e=="object"&&e!==null&&e["aria-label"]||""}),r.$$.dirty&128&&n(0,f=C(d()))},n(7,d=()=>{const e={},t=p(z().size);if(typeof t=="object"&&t!==null){let x=l(t.base||"sm");for(const o of m)t[o]!==void 0&&(x=l(t[o])),h(e,o,x)}else h(e,"base",l(t));return e}),n(2,c=()=>{const e={de:"de.b575e11.svg",ch:"ch.1cc9a58.svg",pt:"pt.c903b10.svg",xx:"xx.acc7ae8.svg"},t=z().name||"de";return"https://cdn.ui.porsche.com/porsche-design-system/flags/"+(e[t]||e.xx)}),a=F(a),[f,s,c,a,u,y,v,d]}class Z extends H{constructor(a){super(),N(this,a,J,E,O,{size:4,name:5,aria:6})}}export{Z as default};
