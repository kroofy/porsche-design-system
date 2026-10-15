import{S as pn,i as on,s as an,c as sn,a as Y,d as ln,v as $,t as W,b as X,u as bn,g as un,e as cn,f as dn,p as w,h as nn,j as fn,k as vn,l as B,w as tn,m as M,H as hn,n as gn,x as en,o as mn,q as rn}from"./svelte-DoO7z26N.js";import{s as xn,h as yn}from"./host-DRskmCSE.js";import wn from"./Spinner-CHLfbpXm.js";import jn from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function zn(a){let t,r,C=`<style>${Sn}</style>`,A,u,c,h,j,z,m,S=a[2]()+"",H,_,L,s;c=new jn({props:{class:"icon",size:"inherit",color:"inherit","aria-hidden":"true",name:a[5](),source:a[4]()}}),h=new wn({props:{class:"icon",size:"inherit",color:"inherit","aria-hidden":"true"}});const k=a[19].default,p=sn(k,a,a[18],null);let I=[{class:L="p-button-pure"+(a[6].class?` ${a[6].class}`:"")},{"data-pds":"button-pure"},{style:a[1]},a[0]],O={};for(let e=0;e<I.length;e+=1)O=Y(O,I[e]);return{c(){t=M("div"),r=new hn(!1),A=gn(),u=M("button"),en(c.$$.fragment),en(h.$$.fragment),j=M("span"),z=M("span"),p&&p.c(),m=M("span"),H=mn(S),r.a=A,w(z,"data-pds-slot",""),w(j,"class","label"),w(m,"class","loading"),w(m,"id","loading"),w(m,"role","status"),w(u,"class","root"),w(u,"type",_=a[3]()),nn(t,O)},m(e,i){vn(e,t,i),r.m(C,t),B(t,A),B(t,u),tn(c,u,null),tn(h,u,null),B(u,j),B(j,z),p&&p.m(z,null),B(u,m),B(m,H),s=!0},p(e,[i]){const T={};i&32&&(T.name=e[5]()),i&16&&(T.source=e[4]()),c.$set(T),p&&p.p&&(!s||i&262144)&&bn(p,k,e,e[18],s?cn(k,e[18],i,null):un(e[18]),null),(!s||i&4)&&S!==(S=e[2]()+"")&&dn(H,S),(!s||i&8&&_!==(_=e[3]()))&&w(u,"type",_),nn(t,O=fn(I,[(!s||i&64&&L!==(L="p-button-pure"+(e[6].class?` ${e[6].class}`:"")))&&{class:L},{"data-pds":"button-pure"},(!s||i&2)&&{style:e[1]},i&1&&e[0]]))},i(e){s||(X(c.$$.fragment,e),X(h.$$.fragment,e),X(p,e),s=!0)},o(e){W(c.$$.fragment,e),W(h.$$.fragment,e),W(p,e),s=!1},d(e){e&&ln(t),$(c),$(h),p&&p.d(e)}}}const Sn=`.p-button-pure :where([data-pds-slot]){display:contents}

  .p-button-pure {
    transform: translate3d(0, 0, 0) !important;
    display: var(--p-bp-host-d);
    width: var(--p-bp-host-w);
    vertical-align: top;
  }
  .p-button-pure[hidden] {
    display: none !important;
  }
  .p-button-pure .root{
    all: unset;
    display: flex;
    width: 100%;
    cursor: pointer;
    color: var(--p-bp-fg);
    text-decoration: none;
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    font-size: inherit;
    font-size: var(--p-bp-fs);
    gap: var(--p-bp-gap);
    justify-content: var(--p-bp-just);
    align-items: var(--p-bp-ai);
  }
  .p-button-pure[underline] .root {
    text-decoration: underline;
  }
  .p-button-pure[disabled] .root,
  .p-button-pure[loading] .root {
    cursor: not-allowed;
  }
  .p-button-pure .root::before{
    content: "";
    position: absolute;
    top: -2px;
    bottom: -2px;
    right: var(--p-bp-inset);
    left: var(--p-bp-inset);
    border-radius: var(--p-bp-rad);
    transition: background-color
      var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
  }
  .p-button-pure[active] .root::before {
    -webkit-backdrop-filter: var(--p-blur-frosted);
    backdrop-filter: var(--p-blur-frosted);
    background-color: var(--p-color-frosted);
  }
  .p-button-pure .root:focus-visible::before{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-button-pure .loading,
  .p-button-pure #loading{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  .p-button-pure .icon,
  .p-button-pure .p-icon,
  .p-button-pure .p-spinner{
    position: relative;
    flex-shrink: 0;
  }
  .p-button-pure .label{
    z-index: 1;
    white-space: inherit;
    white-space: var(--p-bp-l-ws);
    text-indent: var(--p-bp-l-ti);
    overflow: var(--p-bp-l-ov);
    order: var(--p-bp-l-ord);
  }
  .p-button-pure:not([loading]) .p-spinner {
    display: none;
  }
  .p-button-pure[loading] .p-icon {
    display: none;
  }
  .p-button-pure[icon="none"]:not([icon-source]):not([loading]) .p-icon {
    display: none;
  }
  @media (forced-colors: active) {
    .p-button-pure .root{
      color: LinkText;
    }
    .p-button-pure .root:is(button){
      color: ButtonText;
    }
    .p-button-pure .root:focus-visible::before{
      outline-color: Highlight;
    }
  }
  @media (hover: hover) {
    .p-button-pure:not([disabled]):not([loading]) .root:hover::before {
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
      background-color: var(--p-color-frosted-strong);
    }
  }
  @media (min-width: 480px) {
    .p-button-pure {
      display: var(--p-bp-host-d-xs);
      width: var(--p-bp-host-w-xs);
    }
    .p-button-pure .root{
      font-size: var(--p-bp-fs-xs, var(--p-bp-fs));
      gap: var(--p-bp-gap-xs);
      justify-content: var(--p-bp-just-xs);
      align-items: var(--p-bp-ai-xs);
    }
    .p-button-pure .root::before{
      right: var(--p-bp-inset-xs);
      left: var(--p-bp-inset-xs);
      border-radius: var(--p-bp-rad-xs);
    }
    .p-button-pure .label{
      white-space: inherit;
      white-space: var(--p-bp-l-ws-xs);
      text-indent: var(--p-bp-l-ti-xs);
      overflow: var(--p-bp-l-ov-xs);
      order: var(--p-bp-l-ord-xs);
    }
  }
  @media (min-width: 760px) {
    .p-button-pure {
      display: var(--p-bp-host-d-s);
      width: var(--p-bp-host-w-s);
    }
    .p-button-pure .root{
      font-size: var(--p-bp-fs-s, var(--p-bp-fs));
      gap: var(--p-bp-gap-s);
      justify-content: var(--p-bp-just-s);
      align-items: var(--p-bp-ai-s);
    }
    .p-button-pure .root::before{
      right: var(--p-bp-inset-s);
      left: var(--p-bp-inset-s);
      border-radius: var(--p-bp-rad-s);
    }
    .p-button-pure .label{
      white-space: inherit;
      white-space: var(--p-bp-l-ws-s);
      text-indent: var(--p-bp-l-ti-s);
      overflow: var(--p-bp-l-ov-s);
      order: var(--p-bp-l-ord-s);
    }
  }
  @media (min-width: 1000px) {
    .p-button-pure {
      display: var(--p-bp-host-d-m);
      width: var(--p-bp-host-w-m);
    }
    .p-button-pure .root{
      font-size: var(--p-bp-fs-m, var(--p-bp-fs));
      gap: var(--p-bp-gap-m);
      justify-content: var(--p-bp-just-m);
      align-items: var(--p-bp-ai-m);
    }
    .p-button-pure .root::before{
      right: var(--p-bp-inset-m);
      left: var(--p-bp-inset-m);
      border-radius: var(--p-bp-rad-m);
    }
    .p-button-pure .label{
      white-space: inherit;
      white-space: var(--p-bp-l-ws-m);
      text-indent: var(--p-bp-l-ti-m);
      overflow: var(--p-bp-l-ov-m);
      order: var(--p-bp-l-ord-m);
    }
  }
  @media (min-width: 1300px) {
    .p-button-pure {
      display: var(--p-bp-host-d-l);
      width: var(--p-bp-host-w-l);
    }
    .p-button-pure .root{
      font-size: var(--p-bp-fs-l, var(--p-bp-fs));
      gap: var(--p-bp-gap-l);
      justify-content: var(--p-bp-just-l);
      align-items: var(--p-bp-ai-l);
    }
    .p-button-pure .root::before{
      right: var(--p-bp-inset-l);
      left: var(--p-bp-inset-l);
      border-radius: var(--p-bp-rad-l);
    }
    .p-button-pure .label{
      white-space: inherit;
      white-space: var(--p-bp-l-ws-l);
      text-indent: var(--p-bp-l-ti-l);
      overflow: var(--p-bp-l-ov-l);
      order: var(--p-bp-l-ord-l);
    }
  }
  @media (min-width: 1760px) {
    .p-button-pure {
      display: var(--p-bp-host-d-xl);
      width: var(--p-bp-host-w-xl);
    }
    .p-button-pure .root{
      font-size: var(--p-bp-fs-xl, var(--p-bp-fs));
      gap: var(--p-bp-gap-xl);
      justify-content: var(--p-bp-just-xl);
      align-items: var(--p-bp-ai-xl);
    }
    .p-button-pure .root::before{
      right: var(--p-bp-inset-xl);
      left: var(--p-bp-inset-xl);
      border-radius: var(--p-bp-rad-xl);
    }
    .p-button-pure .label{
      white-space: inherit;
      white-space: var(--p-bp-l-ws-xl);
      text-indent: var(--p-bp-l-ti-xl);
      overflow: var(--p-bp-l-ov-xl);
      order: var(--p-bp-l-ord-xl);
    }
  }
  @media (min-width: 1920px) {
    .p-button-pure {
      display: var(--p-bp-host-d-xxl);
      width: var(--p-bp-host-w-xxl);
    }
    .p-button-pure .root{
      font-size: var(--p-bp-fs-xxl, var(--p-bp-fs));
      gap: var(--p-bp-gap-xxl);
      justify-content: var(--p-bp-just-xxl);
      align-items: var(--p-bp-ai-xxl);
    }
    .p-button-pure .root::before{
      right: var(--p-bp-inset-xxl);
      left: var(--p-bp-inset-xxl);
      border-radius: var(--p-bp-rad-xxl);
    }
    .p-button-pure .label{
      white-space: inherit;
      white-space: var(--p-bp-l-ws-xxl);
      text-indent: var(--p-bp-l-ti-xxl);
      overflow: var(--p-bp-l-ov-xxl);
      order: var(--p-bp-l-ord-xxl);
    }
  }`;function _n(a,t,r){let C,A,u,c,h,j,z,{$$slots:m={},$$scope:S}=t;const H={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},_={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",inherit:"currentcolor"},L=["base","xs","s","m","l","xl","xxl"],s=(n,o)=>{if(n==null)return o;if(n==="")return typeof o=="boolean"?!0:o;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return o}return n},k=n=>n===!0||n==="true"||n==="",p=(n,o,f)=>n&&typeof n=="object"?n[o]===void 0?f:n[o]:n,I=n=>n==="inherit"?"":H[String(n)]||H.sm,O=(n,o,f,x,y,P)=>{const b=o==="base"?"":`-${o}`,l=k(y),v=k(x);n[`--p-bp-host-d${b}`]=v?"block":"inline-block",n[`--p-bp-host-w${b}`]=v?"100%":"auto",n[`--p-bp-fs${b}`]=I(f),n[`--p-bp-gap${b}`]=l?"0":"var(--p-spacing-static-xs)",n[`--p-bp-just${b}`]=v?"space-between":"flex-start",n[`--p-bp-ai${b}`]=v?"center":"flex-start",n[`--p-bp-inset${b}`]=l?"-2px":"-4px",n[`--p-bp-rad${b}`]=l?"var(--p-radius-full)":"var(--p-radius-lg)",n[`--p-bp-l-ws${b}`]=l?"nowrap":"",n[`--p-bp-l-ti${b}`]=l?"-999999px":"0",n[`--p-bp-l-ov${b}`]=l?"hidden":"visible",n[`--p-bp-l-ord${b}`]=P==="start"||P==="left"?"-1":"0"};let{disabled:e}=t,{size:i}=t,{stretch:T}=t,{hideLabel:J}=t,{alignLabel:K}=t,{color:R}=t,{icon:Z}=t,{iconSource:N}=t,{type:F}=t,{loading:D}=t;function d(){return{disabled:e,size:i,stretch:T,hideLabel:J,alignLabel:K,color:R,icon:Z,iconSource:N,type:F,loading:D}}return a.$$set=n=>{r(6,t=Y(Y({},t),rn(n))),"disabled"in n&&r(7,e=n.disabled),"size"in n&&r(8,i=n.size),"stretch"in n&&r(9,T=n.stretch),"hideLabel"in n&&r(10,J=n.hideLabel),"alignLabel"in n&&r(11,K=n.alignLabel),"color"in n&&r(12,R=n.color),"icon"in n&&r(13,Z=n.icon),"iconSource"in n&&r(14,N=n.iconSource),"type"in n&&r(15,F=n.type),"loading"in n&&r(16,D=n.loading),"$$scope"in n&&r(18,S=n.$$scope)},a.$$.update=()=>{a.$$.dirty&4096&&r(17,C=()=>{const n=k(d().disabled),o=s(d().size,"sm"),f=s(d().stretch,!1),x=s(d().hideLabel,!1),y=s(d().alignLabel,"end"),P={"--p-bp-fg":n?"var(--p-color-contrast-low)":_[R||"primary"]||_.primary};if(typeof o=="object"||typeof f=="object"||typeof x=="object"||typeof y=="object"){const l=typeof o=="object"&&o!==null?o:null,v=typeof f=="object"&&f!==null?f:null,q=typeof x=="object"&&x!==null?x:null,E=typeof y=="object"&&y!==null?y:null;let G=l?p(l,"base","sm"):o,Q=v?p(v,"base",!1):f,U=q?p(q,"base",!1):x,V=E?p(E,"base","end"):y;for(const g of L)l&&l[g]!==void 0&&(G=p(l,g,G)),v&&v[g]!==void 0&&(Q=p(v,g,Q)),q&&q[g]!==void 0&&(U=p(q,g,U)),E&&E[g]!==void 0&&(V=p(E,g,V)),O(P,g,G,Q,U,V)}else for(const l of L)O(P,l,o,f,x,y);return P}),a.$$.dirty&16384&&r(4,u=()=>{if(N)return N;const n={copy:"copy.0fcd086.svg",like:"like.a7468cd.svg"},o=d().icon||"arrow-right";return n[o]?"https://cdn.ui.porsche.com/porsche-design-system/icons/"+n[o]:""}),a.$$.dirty&32768&&r(3,c=()=>F||"submit"),a.$$.dirty&131072&&r(1,j=xn(C())),r(0,z=yn({active:t.active,disabled:t.disabled,icon:t.icon,"icon-source":t.iconSource,loading:t.loading,underline:t.underline}))},r(5,A=()=>{const n=d().icon||"arrow-right";return n==="none"?"":n}),r(2,h=()=>d().loading===!0||d().loading==="true"||d().loading===""?"Loading":""),t=rn(t),[z,j,h,c,u,A,t,e,i,T,J,K,R,Z,N,F,D,C,S,m]}class Cn extends pn{constructor(t){super(),on(this,t,_n,zn,an,{disabled:7,size:8,stretch:9,hideLabel:10,alignLabel:11,color:12,icon:13,iconSource:14,type:15,loading:16})}}export{Cn as default};
