import{S as V,i as W,s as X,c as Y,a as Z,d as $,v as nn,t as D,b as G,u as ln,g as en,e as tn,h as Q,j as pn,k as rn,l as T,w as an,m as P,H as sn,n as on,x as cn,p as K,q as U}from"./svelte-DoO7z26N.js";import{s as un,h as dn}from"./host-DRskmCSE.js";import vn from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function fn(a){let e,p,z=`<style>${hn}</style>`,y,h,u,b,w,g,o;u=new vn({props:{class:"icon",size:"inherit",color:"inherit","aria-hidden":"true",name:a[3](),source:a[2]()}});const j=a[14].default,i=Y(j,a,a[13],null);let x=[{class:g="p-link-pure"+(a[4].class?` ${a[4].class}`:"")},{"data-pds":"link-pure"},{style:a[1]},a[0]],k={};for(let l=0;l<x.length;l+=1)k=Z(k,x[l]);return{c(){e=P("div"),p=new sn(!1),y=on(),h=P("span"),cn(u.$$.fragment),b=P("span"),w=P("span"),i&&i.c(),p.a=y,K(w,"data-pds-slot",""),K(b,"class","label"),K(h,"class","root"),Q(e,k)},m(l,c){rn(l,e,c),p.m(z,e),T(e,y),T(e,h),an(u,h,null),T(h,b),T(b,w),i&&i.m(w,null),o=!0},p(l,[c]){const _={};c&8&&(_.name=l[3]()),c&4&&(_.source=l[2]()),u.$set(_),i&&i.p&&(!o||c&8192)&&ln(i,j,l,l[13],o?tn(j,l[13],c,null):en(l[13]),null),Q(e,k=pn(x,[(!o||c&16&&g!==(g="p-link-pure"+(l[4].class?` ${l[4].class}`:"")))&&{class:g},{"data-pds":"link-pure"},(!o||c&2)&&{style:l[1]},c&1&&l[0]]))},i(l){o||(G(u.$$.fragment,l),G(i,l),o=!0)},o(l){D(u.$$.fragment,l),D(i,l),o=!1},d(l){l&&$(e),nn(u),i&&i.d(l)}}}const hn=`.p-link-pure :where([data-pds-slot]){display:contents}

  .p-link-pure {
    transform: translate3d(0, 0, 0) !important;
    display: var(--p-lp-host-d);
    width: var(--p-lp-host-w);
    vertical-align: top;
    --p-lp-slot-in: var(--p-lp-inset);
    --p-lp-slot-r: var(--p-lp-rad);
  }
  .p-link-pure[hidden] {
    display: none !important;
  }
  .p-link-pure [data-pds-slot] > a{
    all: unset !important;
  }
  .p-link-pure [data-pds-slot] > a::before{
    content: "" !important;
    position: fixed !important;
    inset-block: -2px !important;
    inset-inline: var(--p-lp-slot-in) !important;
    border-radius: var(--p-lp-slot-r) !important;
  }
  .p-link-pure [data-pds-slot] > a:focus-visible::before{
    outline: 2px solid var(--p-color-focus) !important;
    outline-offset: 2px !important;
  }
  .p-link-pure .root{
    all: unset;
    display: flex;
    width: 100%;
    cursor: pointer;
    color: var(--p-lp-fg);
    text-decoration: none;
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    font-size: inherit;
    font-size: var(--p-lp-fs);
    gap: var(--p-lp-gap);
    justify-content: var(--p-lp-just);
    align-items: var(--p-lp-ai);
  }
  .p-link-pure[underline] .root {
    text-decoration: underline;
  }
  .p-link-pure .root::before{
    content: "";
    position: absolute;
    top: -2px;
    bottom: -2px;
    right: var(--p-lp-inset);
    left: var(--p-lp-inset);
    border-radius: var(--p-lp-rad);
    transition: background-color
      var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
  }
  .p-link-pure[active] .root::before {
    -webkit-backdrop-filter: var(--p-blur-frosted);
    backdrop-filter: var(--p-blur-frosted);
    background-color: var(--p-color-frosted);
  }
  .p-link-pure[href] .root:focus-visible::before {
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-link-pure .icon,
  .p-link-pure .p-icon{
    position: relative;
    flex-shrink: 0;
  }
  .p-link-pure .label{
    z-index: 1;
    white-space: inherit;
    white-space: var(--p-lp-l-ws);
    text-indent: var(--p-lp-l-ti);
    overflow: var(--p-lp-l-ov);
    order: var(--p-lp-l-ord);
  }
  .p-link-pure[icon="none"]:not([icon-source]) .p-icon {
    display: none;
  }
  @media (forced-colors: active) {
    .p-link-pure .root{
      color: LinkText;
    }
    .p-link-pure .root:is(button){
      color: ButtonText;
    }
    .p-link-pure[href] .root:focus-visible::before {
      outline-color: Highlight;
    }
    .p-link-pure [data-pds-slot] > a:focus-visible::before{
      outline-color: Highlight !important;
    }
  }
  @media (hover: hover) {
    .p-link-pure .root:hover::before{
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
      background-color: var(--p-color-frosted-strong);
    }
  }
  @media (min-width: 480px) {
    .p-link-pure {
      display: var(--p-lp-host-d-xs);
      width: var(--p-lp-host-w-xs);
      --p-lp-slot-in: var(--p-lp-inset-xs);
      --p-lp-slot-r: var(--p-lp-rad-xs);
    }
    .p-link-pure .root{
      font-size: var(--p-lp-fs-xs, var(--p-lp-fs));
      gap: var(--p-lp-gap-xs);
      justify-content: var(--p-lp-just-xs);
      align-items: var(--p-lp-ai-xs);
    }
    .p-link-pure .root::before{
      right: var(--p-lp-inset-xs);
      left: var(--p-lp-inset-xs);
      border-radius: var(--p-lp-rad-xs);
    }
    .p-link-pure .label{
      white-space: inherit;
      white-space: var(--p-lp-l-ws-xs);
      text-indent: var(--p-lp-l-ti-xs);
      overflow: var(--p-lp-l-ov-xs);
      order: var(--p-lp-l-ord-xs);
    }
  }
  @media (min-width: 760px) {
    .p-link-pure {
      display: var(--p-lp-host-d-s);
      width: var(--p-lp-host-w-s);
      --p-lp-slot-in: var(--p-lp-inset-s);
      --p-lp-slot-r: var(--p-lp-rad-s);
    }
    .p-link-pure .root{
      font-size: var(--p-lp-fs-s, var(--p-lp-fs));
      gap: var(--p-lp-gap-s);
      justify-content: var(--p-lp-just-s);
      align-items: var(--p-lp-ai-s);
    }
    .p-link-pure .root::before{
      right: var(--p-lp-inset-s);
      left: var(--p-lp-inset-s);
      border-radius: var(--p-lp-rad-s);
    }
    .p-link-pure .label{
      white-space: inherit;
      white-space: var(--p-lp-l-ws-s);
      text-indent: var(--p-lp-l-ti-s);
      overflow: var(--p-lp-l-ov-s);
      order: var(--p-lp-l-ord-s);
    }
  }
  @media (min-width: 1000px) {
    .p-link-pure {
      display: var(--p-lp-host-d-m);
      width: var(--p-lp-host-w-m);
      --p-lp-slot-in: var(--p-lp-inset-m);
      --p-lp-slot-r: var(--p-lp-rad-m);
    }
    .p-link-pure .root{
      font-size: var(--p-lp-fs-m, var(--p-lp-fs));
      gap: var(--p-lp-gap-m);
      justify-content: var(--p-lp-just-m);
      align-items: var(--p-lp-ai-m);
    }
    .p-link-pure .root::before{
      right: var(--p-lp-inset-m);
      left: var(--p-lp-inset-m);
      border-radius: var(--p-lp-rad-m);
    }
    .p-link-pure .label{
      white-space: inherit;
      white-space: var(--p-lp-l-ws-m);
      text-indent: var(--p-lp-l-ti-m);
      overflow: var(--p-lp-l-ov-m);
      order: var(--p-lp-l-ord-m);
    }
  }
  @media (min-width: 1300px) {
    .p-link-pure {
      display: var(--p-lp-host-d-l);
      width: var(--p-lp-host-w-l);
      --p-lp-slot-in: var(--p-lp-inset-l);
      --p-lp-slot-r: var(--p-lp-rad-l);
    }
    .p-link-pure .root{
      font-size: var(--p-lp-fs-l, var(--p-lp-fs));
      gap: var(--p-lp-gap-l);
      justify-content: var(--p-lp-just-l);
      align-items: var(--p-lp-ai-l);
    }
    .p-link-pure .root::before{
      right: var(--p-lp-inset-l);
      left: var(--p-lp-inset-l);
      border-radius: var(--p-lp-rad-l);
    }
    .p-link-pure .label{
      white-space: inherit;
      white-space: var(--p-lp-l-ws-l);
      text-indent: var(--p-lp-l-ti-l);
      overflow: var(--p-lp-l-ov-l);
      order: var(--p-lp-l-ord-l);
    }
  }
  @media (min-width: 1760px) {
    .p-link-pure {
      display: var(--p-lp-host-d-xl);
      width: var(--p-lp-host-w-xl);
      --p-lp-slot-in: var(--p-lp-inset-xl);
      --p-lp-slot-r: var(--p-lp-rad-xl);
    }
    .p-link-pure .root{
      font-size: var(--p-lp-fs-xl, var(--p-lp-fs));
      gap: var(--p-lp-gap-xl);
      justify-content: var(--p-lp-just-xl);
      align-items: var(--p-lp-ai-xl);
    }
    .p-link-pure .root::before{
      right: var(--p-lp-inset-xl);
      left: var(--p-lp-inset-xl);
      border-radius: var(--p-lp-rad-xl);
    }
    .p-link-pure .label{
      white-space: inherit;
      white-space: var(--p-lp-l-ws-xl);
      text-indent: var(--p-lp-l-ti-xl);
      overflow: var(--p-lp-l-ov-xl);
      order: var(--p-lp-l-ord-xl);
    }
  }
  @media (min-width: 1920px) {
    .p-link-pure {
      display: var(--p-lp-host-d-xxl);
      width: var(--p-lp-host-w-xxl);
      --p-lp-slot-in: var(--p-lp-inset-xxl);
      --p-lp-slot-r: var(--p-lp-rad-xxl);
    }
    .p-link-pure .root{
      font-size: var(--p-lp-fs-xxl, var(--p-lp-fs));
      gap: var(--p-lp-gap-xxl);
      justify-content: var(--p-lp-just-xxl);
      align-items: var(--p-lp-ai-xxl);
    }
    .p-link-pure .root::before{
      right: var(--p-lp-inset-xxl);
      left: var(--p-lp-inset-xxl);
      border-radius: var(--p-lp-rad-xxl);
    }
    .p-link-pure .label{
      white-space: inherit;
      white-space: var(--p-lp-l-ws-xxl);
      text-indent: var(--p-lp-l-ti-xxl);
      overflow: var(--p-lp-l-ov-xxl);
      order: var(--p-lp-l-ord-xxl);
    }
  }`;function xn(a,e,p){let z,y,h,u,b,{$$slots:w={},$$scope:g}=e;const o={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},j={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",inherit:"currentcolor"},i=["base","xs","s","m","l","xl","xxl"],x=(n,r)=>{if(n==null)return r;if(n==="")return typeof r=="boolean"?!0:r;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return r}return n},k=n=>n===!0||n==="true"||n==="",l=(n,r,d)=>n&&typeof n=="object"?n[r]===void 0?d:n[r]:n,c=n=>n==="inherit"?"":o[String(n)]||o.sm,_=(n,r,d,m,L,E)=>{const t=r==="base"?"":`-${r}`,s=k(L),v=k(m);n[`--p-lp-host-d${t}`]=v?"block":"inline-block",n[`--p-lp-host-w${t}`]=v?"100%":"auto",n[`--p-lp-fs${t}`]=c(d),n[`--p-lp-gap${t}`]=s?"0":"var(--p-spacing-static-xs)",n[`--p-lp-just${t}`]=v?"space-between":"flex-start",n[`--p-lp-ai${t}`]=v?"center":"flex-start",n[`--p-lp-inset${t}`]=s?"-2px":"-4px",n[`--p-lp-rad${t}`]=s?"var(--p-radius-full)":"var(--p-radius-lg)",n[`--p-lp-l-ws${t}`]=s?"nowrap":"",n[`--p-lp-l-ti${t}`]=s?"-999999px":"0",n[`--p-lp-l-ov${t}`]=s?"hidden":"visible",n[`--p-lp-l-ord${t}`]=E==="start"||E==="left"?"-1":"0"};let{size:B}=e,{stretch:C}=e,{hideLabel:I}=e,{alignLabel:N}=e,{color:A}=e,{icon:q}=e,{iconSource:H}=e;function S(){return{size:B,stretch:C,hideLabel:I,alignLabel:N,color:A,icon:q,iconSource:H}}return a.$$set=n=>{p(4,e=Z(Z({},e),U(n))),"size"in n&&p(5,B=n.size),"stretch"in n&&p(6,C=n.stretch),"hideLabel"in n&&p(7,I=n.hideLabel),"alignLabel"in n&&p(8,N=n.alignLabel),"color"in n&&p(9,A=n.color),"icon"in n&&p(10,q=n.icon),"iconSource"in n&&p(11,H=n.iconSource),"$$scope"in n&&p(13,g=n.$$scope)},a.$$.update=()=>{a.$$.dirty&512&&p(12,z=()=>{const n=x(S().size,"sm"),r=x(S().stretch,!1),d=x(S().hideLabel,!1),m=x(S().alignLabel,"end"),L={"--p-lp-fg":j[A||"primary"]||j.primary};if(typeof n=="object"||typeof r=="object"||typeof d=="object"||typeof m=="object"){const t=typeof n=="object"&&n!==null?n:null,s=typeof r=="object"&&r!==null?r:null,v=typeof d=="object"&&d!==null?d:null,O=typeof m=="object"&&m!==null?m:null;let M=t?l(t,"base","sm"):n,R=s?l(s,"base",!1):r,F=v?l(v,"base",!1):d,J=O?l(O,"base","end"):m;for(const f of i)t&&t[f]!==void 0&&(M=l(t,f,M)),s&&s[f]!==void 0&&(R=l(s,f,R)),v&&v[f]!==void 0&&(F=l(v,f,F)),O&&O[f]!==void 0&&(J=l(O,f,J)),_(L,f,M,R,F,J)}else for(const t of i)_(L,t,n,r,d,m);return L}),a.$$.dirty&2048&&p(2,h=()=>H||""),a.$$.dirty&4096&&p(1,u=un(z())),p(0,b=dn({active:e.active,href:e.href,icon:e.icon,"icon-source":e.iconSource,underline:e.underline}))},p(3,y=()=>{const n=S().icon||"arrow-right";return n==="none"?"":n}),e=U(e),[b,u,h,y,e,B,C,I,N,A,q,H,z,g,w]}class _n extends V{constructor(e){super(),W(this,e,xn,fn,X,{size:5,stretch:6,hideLabel:7,alignLabel:8,color:9,icon:10,iconSource:11})}}export{_n as default};
