import{S as q,i as I,s as O,c as R,d as z,v as B,t as T,b as C,u as D,g as F,e as G,p as g,k as N,l as _,w as P,m as S,H as V,n as X,x as j,a as H,q as E}from"./svelte-DoO7z26N.js";import{s as A}from"./host-DRskmCSE.js";import J from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function K(n){let a,t,b=`<style>${L}</style>`,u,p,c,f,l,i;c=new J({props:{class:"icon",color:"inherit",size:"x-small","aria-hidden":"true",name:n[2](),source:n[1]()}});const m=n[10].default,s=R(m,n,n[9],null);return{c(){a=S("div"),t=new V(!1),u=X(),p=S("span"),j(c.$$.fragment),f=S("span"),s&&s.c(),t.a=u,g(f,"data-pds-slot",""),g(a,"class",l="p-tag"+(n[3].class?` ${n[3].class}`:"")),g(a,"data-pds","tag"),g(a,"style",n[0])},m(o,e){N(o,a,e),t.m(b,a),_(a,u),_(a,p),P(c,p,null),_(p,f),s&&s.m(f,null),i=!0},p(o,[e]){const d={};e&4&&(d.name=o[2]()),e&2&&(d.source=o[1]()),c.$set(d),s&&s.p&&(!i||e&512)&&D(s,m,o,o[9],i?G(m,o[9],e,null):F(o[9]),null),(!i||e&8&&l!==(l="p-tag"+(o[3].class?` ${o[3].class}`:"")))&&g(a,"class",l),(!i||e&1)&&g(a,"style",o[0])},i(o){i||(C(c.$$.fragment,o),C(s,o),i=!0)},o(o){T(c.$$.fragment,o),T(s,o),i=!1},d(o){o&&z(a),B(c),s&&s.d(o)}}}const L=`.p-tag :where([data-pds-slot]){display:contents}

  .p-tag {
    display: inline-flex;
    vertical-align: top;
    white-space: nowrap;
  }
  .p-tag[hidden] {
    display: none !important;
  }
  .p-tag span{
    position: relative;
    display: flex;
    gap: 2px;
    padding: var(--p-tag-pad);
    border-radius: var(--p-tag-radius);
    font: var(--p-font-weight-normal) var(--p-typescale-xs) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    -webkit-backdrop-filter: var(--p-tag-blur);
    backdrop-filter: var(--p-tag-blur);
    color: var(--p-tag-color);
    background: var(--p-tag-bg);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      background-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      backdrop-filter var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-tag [data-pds-slot] > a,
  .p-tag [data-pds-slot] > button{
    all: unset !important;
    text-decoration: underline !important;
    cursor: pointer !important;
    font: inherit !important;
    color: inherit !important;
  }
  .p-tag [data-pds-slot] > a::before,
  .p-tag [data-pds-slot] > button::before{
    content: "" !important;
    position: absolute !important;
    inset: 0 !important;
    border-radius: var(--p-radius-full) !important;
  }
  .p-tag [data-pds-slot] > a:focus-visible::before,
  .p-tag [data-pds-slot] > button:focus-visible::before{
    outline: 2px solid var(--p-color-focus) !important;
    outline-offset: 2px !important;
  }
  .p-tag [data-pds-slot] > br{
    display: none !important;
  }
  @media (forced-colors: active) {
    .p-tag span{
      outline: 2px solid CanvasText;
      outline-offset: -2px;
      background-color: Canvas;
      color: CanvasText;
    }
    .p-tag [data-pds-slot] > a:focus-visible::before,
    .p-tag [data-pds-slot] > button:focus-visible::before{
      outline-color: Highlight !important;
    }
  }
  @media (hover: hover) {
    .p-tag span:hover{
      background: var(--p-tag-hover);
    }
  }
  .p-tag .p-icon{
    display: var(--p-tag-icon-display, unset);
    margin-inline-start: var(--p-tag-icon-margin, unset);
  }`;function M(n,a,t){let b,u,p,c,{$$slots:f={},$$scope:l}=a;const i={primary:"var(--p-color-canvas)",secondary:"var(--p-color-primary)",info:"var(--p-color-canvas)","info-frosted":"var(--p-color-primary)",success:"var(--p-color-canvas)","success-frosted":"var(--p-color-primary)",warning:"var(--p-color-canvas)","warning-frosted":"var(--p-color-primary)",error:"var(--p-color-canvas)","error-frosted":"var(--p-color-primary)"},m={primary:"var(--p-color-primary)",secondary:"var(--p-color-frosted-strong)",info:"var(--p-color-info)","info-frosted":"var(--p-color-info-frosted)",success:"var(--p-color-success)","success-frosted":"var(--p-color-success-frosted)",warning:"var(--p-color-warning)","warning-frosted":"var(--p-color-warning-frosted)",error:"var(--p-color-error)","error-frosted":"var(--p-color-error-frosted)"},s={primary:"var(--p-color-contrast-high)",secondary:"var(--p-color-frosted)",info:"var(--p-color-info-medium)","info-frosted":"var(--p-color-info-frosted-soft)",success:"var(--p-color-success-medium)","success-frosted":"var(--p-color-success-frosted-soft)",warning:"var(--p-color-warning-medium)","warning-frosted":"var(--p-color-warning-frosted-soft)",error:"var(--p-color-error-medium)","error-frosted":"var(--p-color-error-frosted-soft)"},o={secondary:1,"info-frosted":1,"success-frosted":1,"warning-frosted":1,"error-frosted":1};let{variant:e}=a,{compact:d}=a,{icon:h}=a,{iconSource:y}=a;function v(){return{variant:e,compact:d,icon:h,iconSource:y}}return n.$$set=r=>{t(3,a=H(H({},a),E(r))),"variant"in r&&t(4,e=r.variant),"compact"in r&&t(5,d=r.compact),"icon"in r&&t(6,h=r.icon),"iconSource"in r&&t(7,y=r.iconSource),"$$scope"in r&&t(9,l=r.$$scope)},n.$$.update=()=>{n.$$.dirty&128&&t(8,b=()=>{const r=v().variant||"secondary",w=v().compact===!0||v().compact==="true"||v().compact==="",k=v().icon||"none",x=k!=="none"&&k!==""||(y||"")!=="";return{"--p-tag-color":i[r]||i.secondary,"--p-tag-bg":m[r]||m.secondary,"--p-tag-hover":s[r]||s.secondary,"--p-tag-pad":w?"var(--p-spacing-static-2xs) var(--p-spacing-static-sm)":"4px calc(12 * var(--p-spacing-static-2xs))","--p-tag-radius":w?"calc(1px + (var(--p-leading-normal) / 2))":"calc(4px + (var(--p-leading-normal) / 2))","--p-tag-blur":o[r]?"var(--p-blur-frosted)":"","--p-tag-icon-display":x?"":"none","--p-tag-icon-margin":x?"-2px":""}}),n.$$.dirty&128&&t(1,p=()=>y||""),n.$$.dirty&256&&t(0,c=A(b()))},t(2,u=()=>{const r=v().icon||"none";return r==="none"||r===""?"":r}),a=E(a),[c,p,u,a,e,d,h,y,b,l,f]}class ra extends q{constructor(a){super(),I(this,a,M,K,O,{variant:4,compact:5,icon:6,iconSource:7})}}export{ra as default};
