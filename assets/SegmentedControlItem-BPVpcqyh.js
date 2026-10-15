import{S as M,i as O,s as Q,c as R,d as U,v as V,t as D,b as E,f as W,u as X,g as Y,e as Z,p as g,k as w,l as k,w as $,m as P,H as ee,n as ne,o as te,x as oe,a as F,q as J}from"./svelte-DoO7z26N.js";import{s as re}from"./host-DRskmCSE.js";import se from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function ae(o){let e,r,y=`<style>${ce}</style>`,b,l,h,u=o[3]()+"",_,i,p,d,c;i=new se({props:{class:"icon",color:"inherit",size:"inherit","aria-hidden":"true",name:o[2](),source:o[1]()}});const f=o[15].default,s=R(f,o,o[14],null);return{c(){e=P("div"),r=new ee(!1),b=ne(),l=P("button"),h=P("span"),_=te(u),oe(i.$$.fragment),p=P("span"),s&&s.c(),r.a=b,g(p,"data-pds-slot",""),g(l,"type","button"),g(e,"class",d="p-segmented-control-item"+(o[4].class?` ${o[4].class}`:"")),g(e,"data-pds","segmented-control-item"),g(e,"style",o[0])},m(n,a){w(n,e,a),r.m(y,e),k(e,b),k(e,l),k(l,h),k(h,_),$(i,l,null),k(l,p),s&&s.m(p,null),c=!0},p(n,[a]){(!c||a&8)&&u!==(u=n[3]()+"")&&W(_,u);const m={};a&4&&(m.name=n[2]()),a&2&&(m.source=n[1]()),i.$set(m),s&&s.p&&(!c||a&16384)&&X(s,f,n,n[14],c?Z(f,n[14],a,null):Y(n[14]),null),(!c||a&16&&d!==(d="p-segmented-control-item"+(n[4].class?` ${n[4].class}`:"")))&&g(e,"class",d),(!c||a&1)&&g(e,"style",n[0])},i(n){c||(E(i.$$.fragment,n),E(s,n),c=!0)},o(n){D(i.$$.fragment,n),D(s,n),c=!1},d(n){n&&U(e),V(i),s&&s.d(n)}}}const ce=`.p-segmented-control-item :where([data-pds-slot]){display:contents}

  .p-segmented-control-item {
    display: block;
    opacity: var(--p-sci-opacity);
  }
  .p-segmented-control-item[hidden] {
    display: none !important;
  }
  .p-segmented-control-item button{
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    min-height: calc(
      max(
          var(--p-leading-normal),
          var(--_p-segmented-control-a, var(--p-sci-a, 1)) *
            (var(--p-leading-normal) + 10px)
        ) +
        (
          max(
              2px,
              var(--p-spacing-static-sm) *
                var(--_p-segmented-control-a, var(--p-sci-a, 1))
            ) + 1px
        ) * 2
    );
    min-width: calc(
      max(
          var(--p-leading-normal),
          var(--_p-segmented-control-a, var(--p-sci-a, 1)) *
            (var(--p-leading-normal) + 10px)
        ) +
        (
          max(
              2px,
              var(--p-spacing-static-sm) *
                var(--_p-segmented-control-a, var(--p-sci-a, 1))
            ) + 1px
        ) * 2
    );
    padding: var(--p-sci-pad);
    border: 1px solid var(--p-sci-border);
    border-radius: var(--p-sci-radius);
    background: var(--p-sci-bg);
    color: var(--p-color-primary);
    font: var(--p-sci-btn-font);
    cursor: var(--p-sci-cursor, pointer);
    transition: var(--p-sci-hover-transition);
  }
  .p-segmented-control-item button:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-segmented-control-item span{
    display: block;
    font: var(--p-sci-label-font);
    overflow-wrap: normal;
    color: var(--p-sci-span);
  }
  .p-segmented-control-item .icon{
    height: 1.5rem;
    width: 1.5rem;
    margin-inline-end: var(--p-sci-icon-me);
  }
  @media (forced-colors: active) {
    .p-segmented-control-item {
      opacity: var(--p-sci-fc-opacity, var(--p-sci-opacity, 1));
      color: var(--p-sci-fc-color);
    }
    .p-segmented-control-item button{
      color: var(--p-sci-fc-color, var(--p-color-primary));
      border-color: var(--p-sci-fc-border, var(--p-sci-border));
    }
    .p-segmented-control-item button:focus-visible{
      outline-color: Highlight;
    }
    .p-segmented-control-item span{
      color: var(--p-sci-fc-color, var(--p-sci-span));
    }
  }
  @media (hover: hover) {
    .p-segmented-control-item button:hover{
      background-color: var(--p-sci-hover-bg, var(--p-sci-bg));
    }
  }`;function ie(o,e,r){let y,b,l,h,u,{$$slots:_={},$$scope:i}=e,{compact:p}=e,{disabled:d}=e,{disabledParent:c}=e,{selected:f}=e,{state:s}=e,{icon:n}=e,{iconSource:a}=e,{label:m}=e;function H(){return{compact:p,disabled:d,disabledParent:c,selected:f,state:s,icon:n,iconSource:a,label:m}}return o.$$set=t=>{r(4,e=F(F({},e),J(t))),"compact"in t&&r(5,p=t.compact),"disabled"in t&&r(6,d=t.disabled),"disabledParent"in t&&r(7,c=t.disabledParent),"selected"in t&&r(8,f=t.selected),"state"in t&&r(9,s=t.state),"icon"in t&&r(10,n=t.icon),"iconSource"in t&&r(11,a=t.iconSource),"label"in t&&r(12,m=t.label),"$$scope"in t&&r(14,i=t.$$scope)},o.$$.update=()=>{o.$$.dirty&2688&&r(13,y=()=>{const t=C=>C===!0||C==="true"||C==="",N=t(H().compact),v=t(H().disabled)||t(c),S=t(H().selected),T=s==="success"||s==="error"?s:"none",A=(H().icon||"")!==""||(a||"")!=="",I=!0,K=N?"0.5":"1",x="max(2px, var(--p-spacing-static-sm) * var(--_p-segmented-control-a, var(--p-sci-a, 1)))",q="calc("+x+" + 4px)",G={none:"var(--p-color-contrast-lower)",success:"var(--p-color-success)",error:"var(--p-color-error)"},z={none:"var(--p-color-primary)",success:"var(--p-color-success)",error:"var(--p-color-error)"},j={none:"var(--p-color-frosted)",success:"var(--p-color-success-frosted-soft)",error:"var(--p-color-error-frosted-soft)"},L=S?z[T]||z.none:G[T]||G.none,B=S?"var(--p-color-frosted-strong)":j[T]||j.none;return{"--p-sci-a":K,"--p-sci-radius":N?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-sci-pad":A&&I?x+" "+q+" "+x+" "+x:x+" "+q,"--p-sci-border":L,"--p-sci-bg":B,"--p-sci-hover-bg":!v&&!S?"var(--p-color-frosted-strong)":B,"--p-sci-cursor":v?"not-allowed":"pointer","--p-sci-opacity":v?"0.4":"","--p-sci-span":S?"var(--p-color-contrast-high)":"var(--p-color-contrast-medium)","--p-sci-icon-me":A&&I?"0.25rem":"0","--p-sci-btn-font":"normal normal 400 1rem/calc(6px + 2.125ex) 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif","--p-sci-label-font":"normal normal 400 .875rem/calc(6px + 2.125ex) 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif","--p-sci-fc-opacity":v?"1":"","--p-sci-fc-color":v?"GrayText":"","--p-sci-fc-border":v?"GrayText":"","--p-sci-hover-transition":!v&&!S?"background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out)":""}}),o.$$.dirty&4096&&r(3,b=()=>m||""),o.$$.dirty&1024&&r(2,l=()=>n||""),o.$$.dirty&2048&&r(1,h=()=>a||""),o.$$.dirty&192,o.$$.dirty&256,o.$$.dirty&8192&&r(0,u=re(y()))},e=J(e),[u,h,l,b,e,p,d,c,f,s,n,a,m,y,i,_]}class he extends M{constructor(e){super(),O(this,e,ie,ae,Q,{compact:5,disabled:6,disabledParent:7,selected:8,state:9,icon:10,iconSource:11,label:12})}}export{he as default};
