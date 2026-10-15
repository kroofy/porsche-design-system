import{S as Y,i as $,s as nn,c as L,a as D,d as rn,t as N,b as q,u as J,g as M,e as P,h as Z,j as an,k as on,l as x,m as y,H as tn,n as sn,p as g,q as j}from"./svelte-DoO7z26N.js";import{s as en,h as ln}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const dn=a=>({}),G=a=>({}),pn=a=>({}),Q=a=>({}),fn=a=>({}),V=a=>({});function un(a){let o,s,F=`<style>${cn}</style>`,T,h,I,c,w,W,B,C,b,_,i;const S=a[12].header,e=L(S,a,a[11],V),z=a[12].default,d=L(z,a,a[11],null),k=a[12].footer,n=L(k,a,a[11],Q),t=a[12]["sub-footer"],l=L(t,a,a[11],G);let O=[{class:_="p-flyout"+(a[2].class?` ${a[2].class}`:"")},{"data-pds":"flyout"},{style:a[1]},a[0]],A={};for(let r=0;r<O.length;r+=1)A=D(A,O[r]);return{c(){o=y("div"),s=new tn(!1),T=sn(),h=y("dialog"),I=y("div"),c=y("div"),w=y("button"),w.innerHTML="<span>Dismiss flyout</span>",W=y("span"),e&&e.c(),B=y("span"),d&&d.c(),C=y("span"),n&&n.c(),b=y("span"),l&&l.c(),s.a=T,g(w,"class","dismiss"),g(w,"type","button"),g(W,"data-pds-slot","header"),g(B,"data-pds-slot",""),g(C,"data-pds-slot","footer"),g(b,"data-pds-slot","sub-footer"),g(c,"class","flyout"),g(I,"class","scroller"),g(h,"aria-modal","true"),h.inert=!0,g(h,"tabindex",-1),Z(o,A)},m(r,p){on(r,o,p),s.m(F,o),x(o,T),x(o,h),x(h,I),x(I,c),x(c,w),x(c,W),e&&e.m(W,null),x(c,B),d&&d.m(B,null),x(c,C),n&&n.m(C,null),x(c,b),l&&l.m(b,null),i=!0},p(r,[p]){e&&e.p&&(!i||p&2048)&&J(e,S,r,r[11],i?P(S,r[11],p,fn):M(r[11]),V),d&&d.p&&(!i||p&2048)&&J(d,z,r,r[11],i?P(z,r[11],p,null):M(r[11]),null),n&&n.p&&(!i||p&2048)&&J(n,k,r,r[11],i?P(k,r[11],p,pn):M(r[11]),Q),l&&l.p&&(!i||p&2048)&&J(l,t,r,r[11],i?P(t,r[11],p,dn):M(r[11]),G),Z(o,A=an(O,[(!i||p&4&&_!==(_="p-flyout"+(r[2].class?` ${r[2].class}`:"")))&&{class:_},{"data-pds":"flyout"},(!i||p&2)&&{style:r[1]},p&1&&r[0]]))},i(r){i||(q(e,r),q(d,r),q(n,r),q(l,r),i=!0)},o(r){N(e,r),N(d,r),N(n,r),N(l,r),i=!1},d(r){r&&rn(o),e&&e.d(r),d&&d.d(r),n&&n.d(r),l&&l.d(r)}}}const cn=`.p-flyout :where([data-pds-slot]){display:contents}

  .p-flyout {
    display: contents;
    --ref-p-flyout-pt: var(--p-spacing-fluid-md) !important;
    --ref-p-flyout-pb: calc(
      var(--p-radius-3xl) + var(--p-spacing-fluid-md)
    ) !important;
    --ref-p-flyout-px: var(--p-spacing-fluid-lg) !important;
    --pds-internal-grid-outer-column: calc(
      var(--p-spacing-fluid-lg) - clamp(16px, 1.25vw + 12px, 36px)
    ) !important;
    --pds-internal-grid-margin: calc(var(--p-spacing-fluid-lg) * -1) !important;
    --pds-internal-grid-width-min: auto !important;
    --pds-internal-grid-width-max: none !important;
    --_p-dialog-a: var(--p-fo-dialog-bg) !important;
  }
  .p-flyout[hidden] {
    display: none !important;
  }
  .p-flyout [data-pds-slot]{
    display: block;
  }
  .p-flyout [data-pds-slot]:first-of-type{
    grid-row-start: 1;
  }
  .p-flyout [data-pds-slot]:not([name]){
    grid-column: 2/3;
    z-index: 0;
  }
  .p-flyout [data-pds-slot="header"]{
    grid-column: 1/-1;
    z-index: 1;
    position: sticky;
    top: 0;
    margin-block: calc(-1 * var(--p-spacing-fluid-md))
      calc(-1 * var(--p-spacing-static-md));
    padding: var(--p-spacing-fluid-md) var(--p-spacing-fluid-lg)
      var(--p-spacing-static-md);
    background: linear-gradient(
      180deg,
      var(--_p-dialog-a) 0%,
      var(--_p-dialog-a) 80%,
      transparent 100%
    );
    border-start-start-radius: var(--p-fo-hdr-ss);
    border-start-end-radius: var(--p-fo-hdr-se);
  }
  .p-flyout [data-pds-slot="footer"]{
    grid-column: 1/-1;
    z-index: 2;
    position: sticky;
    bottom: -0.1px;
    margin-block: calc(
      -1 * calc(calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) -
            var(--p-radius-3xl))
    );
    padding: calc(
        calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) -
          var(--p-radius-3xl)
      )
      var(--p-spacing-fluid-lg);
    background: linear-gradient(
      0deg,
      var(--_p-dialog-a) 0%,
      var(--_p-dialog-a) 20%,
      transparent 80%
    );
  }
  .p-flyout [data-pds-slot="footer"][data-stuck]::after{
    content: "";
    z-index: -1;
    position: absolute;
    inset: calc(
        calc(
            calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) -
              var(--p-radius-3xl)
          ) - 12 * var(--p-spacing-static-2xs)
      )
      calc(var(--p-spacing-fluid-lg) - 12 * var(--p-spacing-static-2xs));
    background: var(--p-color-frosted);
    border-radius: var(--p-radius-2xl);
    -webkit-backdrop-filter: var(--p-blur-frosted);
    backdrop-filter: var(--p-blur-frosted);
  }
  .p-flyout [data-pds-slot="sub-footer"]{
    grid-column: 1/-1;
    z-index: 3;
    padding-inline: var(--p-spacing-fluid-lg);
    background-color: var(--_p-dialog-a);
  }
  .p-flyout dialog{
    all: unset;
    position: fixed;
    inset: 0;
    max-width: 100dvw;
    max-height: 100dvh;
    overflow: hidden;
    display: block;
    user-select: text;
    outline: 0;
    width: var(--p-fo-w-dialog, 0px);
    height: var(--p-fo-h-dialog, 0px);
    visibility: var(--p-fo-vis, hidden);
    pointer-events: var(--p-fo-pe, none);
    background: var(--p-fo-db, transparent);
    -webkit-backdrop-filter: var(--p-fo-bf);
    backdrop-filter: var(--p-fo-bf);
    transition: visibility 0s linear var(--p-fo-delay),
      width 0s linear var(--p-fo-delay), height 0s linear var(--p-fo-delay),
      background-color var(--p-fo-ddur) var(--p-fo-ease),
      -webkit-backdrop-filter var(--p-fo-ddur) var(--p-fo-ease),
      backdrop-filter var(--p-fo-ddur) var(--p-fo-ease);
    overlay: none;
  }
  .p-flyout dialog:modal{
    overlay: auto;
  }
  .p-flyout dialog::backdrop{
    display: none;
  }
  @supports (overlay: auto) and (transition-behavior: allow-discrete) {
    .p-flyout dialog{
      transition: visibility 0s linear var(--p-fo-delay),
        width 0s linear var(--p-fo-delay), height 0s linear var(--p-fo-delay),
        background-color var(--p-fo-ddur) var(--p-fo-ease),
        -webkit-backdrop-filter var(--p-fo-ddur) var(--p-fo-ease),
        backdrop-filter var(--p-fo-ddur) var(--p-fo-ease),
        overlay var(--p-fo-ddur) var(--p-fo-ease) allow-discrete;
    }
  }
  .p-flyout .scroller{
    position: absolute;
    isolation: isolate;
    display: grid;
    inset-block: 0;
    inset-inline-start: var(--p-fo-in-s);
    inset-inline-end: var(--p-fo-in-e);
    overflow: hidden auto;
    overscroll-behavior-y: none;
    background: rgba(255, 255, 255, 0.01);
    opacity: var(--p-fo-sc-op, 0);
    transform: var(--p-fo-sc-tf, translate3d(100%, 0, 0));
    transition: opacity var(--p-fo-pdur) var(--p-fo-ease),
      transform var(--p-fo-pdur) var(--p-fo-ease);
  }
  .p-flyout .scroller:dir(rtl){
    transform: var(--p-fo-sc-tf-rtl, translate3d(-100%, 0, 0));
  }
  .p-flyout .scroller:focus-visible{
    outline: none;
  }
  .p-flyout .flyout{
    position: relative;
    display: grid;
    grid-template: auto / var(--p-spacing-fluid-sm) minmax(0, 1fr) var(
        --p-spacing-fluid-sm
      );
    grid-template-rows: var(--p-fo-rows, auto);
    gap: var(--p-spacing-fluid-md)
      calc(var(--p-spacing-fluid-lg) - var(--p-spacing-fluid-sm));
    padding-top: var(--p-spacing-fluid-md);
    padding-bottom: calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md));
    align-content: flex-start;
    transform: translate3d(0, 0, 0);
    color: var(--p-color-primary);
    background: var(--_p-dialog-a);
    width: var(--p-fo-w);
    min-width: var(--p-fo-min-w);
    max-width: var(--p-fo-max-w);
    clip-path: var(--p-fo-clip);
    border-start-start-radius: var(--p-fo-r-ss);
    border-start-end-radius: var(--p-fo-r-se);
    border-end-start-radius: var(--p-fo-r-es);
    border-end-end-radius: var(--p-fo-r-ee);
  }
  .p-flyout .flyout:dir(rtl){
    clip-path: var(--p-fo-clip-rtl);
  }
  .p-flyout[footer-behavior="fixed"] .flyout {
    grid-template-rows: auto 1fr auto;
  }
  @media (forced-colors: active) {
    .p-flyout .flyout{
      border-inline-start: var(--p-fo-hcm-is);
      border-inline-end: var(--p-fo-hcm-ie);
    }
  }
  @media (min-width: 480px) {
    .p-flyout .flyout{
      width: var(--p-fo-w-xs);
      min-width: var(--p-fo-min-w-xs);
      max-width: var(--p-fo-max-w-xs);
      clip-path: var(--p-fo-clip-xs);
      border-start-start-radius: var(--p-fo-r-ss-xs);
      border-start-end-radius: var(--p-fo-r-se-xs);
      border-end-start-radius: var(--p-fo-r-es-xs);
      border-end-end-radius: var(--p-fo-r-ee-xs);
    }
    .p-flyout .flyout:dir(rtl){
      clip-path: var(--p-fo-clip-rtl-xs);
    }
    @media (forced-colors: active) {
      .p-flyout .flyout{
        border-inline-start: var(--p-fo-hcm-is-xs);
        border-inline-end: var(--p-fo-hcm-ie-xs);
      }
    }
  }
  @media (min-width: 760px) {
    .p-flyout .flyout{
      width: var(--p-fo-w-s);
      min-width: var(--p-fo-min-w-s);
      max-width: var(--p-fo-max-w-s);
      clip-path: var(--p-fo-clip-s);
      border-start-start-radius: var(--p-fo-r-ss-s);
      border-start-end-radius: var(--p-fo-r-se-s);
      border-end-start-radius: var(--p-fo-r-es-s);
      border-end-end-radius: var(--p-fo-r-ee-s);
    }
    .p-flyout .flyout:dir(rtl){
      clip-path: var(--p-fo-clip-rtl-s);
    }
    @media (forced-colors: active) {
      .p-flyout .flyout{
        border-inline-start: var(--p-fo-hcm-is-s);
        border-inline-end: var(--p-fo-hcm-ie-s);
      }
    }
  }
  @media (min-width: 1000px) {
    .p-flyout .flyout{
      width: var(--p-fo-w-m);
      min-width: var(--p-fo-min-w-m);
      max-width: var(--p-fo-max-w-m);
      clip-path: var(--p-fo-clip-m);
      border-start-start-radius: var(--p-fo-r-ss-m);
      border-start-end-radius: var(--p-fo-r-se-m);
      border-end-start-radius: var(--p-fo-r-es-m);
      border-end-end-radius: var(--p-fo-r-ee-m);
    }
    .p-flyout .flyout:dir(rtl){
      clip-path: var(--p-fo-clip-rtl-m);
    }
    @media (forced-colors: active) {
      .p-flyout .flyout{
        border-inline-start: var(--p-fo-hcm-is-m);
        border-inline-end: var(--p-fo-hcm-ie-m);
      }
    }
  }
  @media (min-width: 1300px) {
    .p-flyout .flyout{
      width: var(--p-fo-w-l);
      min-width: var(--p-fo-min-w-l);
      max-width: var(--p-fo-max-w-l);
      clip-path: var(--p-fo-clip-l);
      border-start-start-radius: var(--p-fo-r-ss-l);
      border-start-end-radius: var(--p-fo-r-se-l);
      border-end-start-radius: var(--p-fo-r-es-l);
      border-end-end-radius: var(--p-fo-r-ee-l);
    }
    .p-flyout .flyout:dir(rtl){
      clip-path: var(--p-fo-clip-rtl-l);
    }
    @media (forced-colors: active) {
      .p-flyout .flyout{
        border-inline-start: var(--p-fo-hcm-is-l);
        border-inline-end: var(--p-fo-hcm-ie-l);
      }
    }
  }
  @media (min-width: 1760px) {
    .p-flyout .flyout{
      width: var(--p-fo-w-xl);
      min-width: var(--p-fo-min-w-xl);
      max-width: var(--p-fo-max-w-xl);
      clip-path: var(--p-fo-clip-xl);
      border-start-start-radius: var(--p-fo-r-ss-xl);
      border-start-end-radius: var(--p-fo-r-se-xl);
      border-end-start-radius: var(--p-fo-r-es-xl);
      border-end-end-radius: var(--p-fo-r-ee-xl);
    }
    .p-flyout .flyout:dir(rtl){
      clip-path: var(--p-fo-clip-rtl-xl);
    }
    @media (forced-colors: active) {
      .p-flyout .flyout{
        border-inline-start: var(--p-fo-hcm-is-xl);
        border-inline-end: var(--p-fo-hcm-ie-xl);
      }
    }
  }
  @media (min-width: 1920px) {
    .p-flyout .flyout{
      width: var(--p-fo-w-xxl);
      min-width: var(--p-fo-min-w-xxl);
      max-width: var(--p-fo-max-w-xxl);
      clip-path: var(--p-fo-clip-xxl);
      border-start-start-radius: var(--p-fo-r-ss-xxl);
      border-start-end-radius: var(--p-fo-r-se-xxl);
      border-end-start-radius: var(--p-fo-r-es-xxl);
      border-end-end-radius: var(--p-fo-r-ee-xxl);
    }
    .p-flyout .flyout:dir(rtl){
      clip-path: var(--p-fo-clip-rtl-xxl);
    }
    @media (forced-colors: active) {
      .p-flyout .flyout{
        border-inline-start: var(--p-fo-hcm-is-xxl);
        border-inline-end: var(--p-fo-hcm-ie-xxl);
      }
    }
  }
  .p-flyout .dismiss{
    all: unset;
    box-sizing: border-box;
    display: grid;
    place-items: center;
    padding: 6px;
    border-radius: var(--p-radius-full);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    background-color: var(--p-fo-dismiss-bg);
    color: var(--p-color-primary);
    cursor: pointer;
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    grid-area: 1/3;
    z-index: 5;
    position: sticky;
    top: var(--p-spacing-fluid-sm);
    margin-top: calc(
      -1 * var(--p-spacing-fluid-md) + var(--p-spacing-fluid-sm)
    );
    margin-inline-end: var(--p-spacing-fluid-sm);
    place-self: flex-start flex-end;
  }
  .p-flyout .dismiss:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-flyout .dismiss::before{
    content: "";
    width: var(--p-leading-normal);
    height: var(--p-leading-normal);
    -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    background: currentColor;
  }
  .p-flyout .dismiss span{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  @media (forced-colors: active) {
    .p-flyout .dismiss{
      forced-color-adjust: none;
      background: Canvas;
      box-shadow: inset 0 0 0 2px ButtonBorder;
      color: ButtonText;
    }
    .p-flyout .dismiss:focus-visible{
      outline-color: Highlight;
    }
  }
  @media (hover: hover) {
    .p-flyout .dismiss:hover{
      background-color: var(--p-fo-dismiss-hover);
    }
    @media (forced-colors: active) {
      .p-flyout .dismiss:hover{
        background: Canvas;
      }
    }
  }`;function vn(a,o,s){let F,T,h,{$$slots:I={},$$scope:c}=o;const w=["base","xs","s","m","l","xl","xxl"],W=(n,t)=>{if(n==null)return t;if(n==="")return!0;if(typeof n=="string"&&n.trim().charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"'))}catch{try{return JSON.parse(n.replace(/'/g,'"').replace(/([{,]\s*)([A-Za-z_]\w*)\s*:/g,'$1"$2":'))}catch{return t}}return n},B=(n,t,l)=>n&&typeof n=="object"?n[t]===void 0?l:n[t]:n,C=(n,t)=>n===!0||n==="true"?{w:"100dvw",minW:"auto",maxW:"none",clip:"none",clipRtl:"none",rss:"0",rse:"0",res:"0",ree:"0",hcmIs:"",hcmIe:""}:t?{w:"var(--p-flyout-width, auto)",minW:"320px",maxW:"100vw",clip:"inset(0 round 0 var(--p-radius-3xl) var(--p-radius-3xl) 0)",clipRtl:"inset(0 round var(--p-radius-3xl) 0 0 var(--p-radius-3xl))",rss:"0",rse:"var(--p-radius-3xl)",res:"0",ree:"var(--p-radius-3xl)",hcmIs:"",hcmIe:"2px solid CanvasText"}:{w:"var(--p-flyout-width, auto)",minW:"320px",maxW:"100vw",clip:"inset(0 round var(--p-radius-3xl) 0 0 var(--p-radius-3xl))",clipRtl:"inset(0 round 0 var(--p-radius-3xl) var(--p-radius-3xl) 0)",rss:"var(--p-radius-3xl)",rse:"0",res:"var(--p-radius-3xl)",ree:"0",hcmIs:"2px solid CanvasText",hcmIe:""};let{open:b}=o,{background:_}=o,{backdrop:i}=o,{position:S}=o,{footerBehavior:e}=o,{fullscreen:z}=o,{aria:d}=o;function k(){return{open:b,background:_,backdrop:i,position:S,footerBehavior:e,fullscreen:z,aria:d}}return a.$$set=n=>{s(2,o=D(D({},o),j(n))),"open"in n&&s(3,b=n.open),"background"in n&&s(4,_=n.background),"backdrop"in n&&s(5,i=n.backdrop),"position"in n&&s(6,S=n.position),"footerBehavior"in n&&s(7,e=n.footerBehavior),"fullscreen"in n&&s(8,z=n.fullscreen),"aria"in n&&s(9,d=n.aria),"$$scope"in n&&s(11,c=n.$$scope)},a.$$.update=()=>{a.$$.dirty&136&&s(10,F=()=>{const n=u=>u===!0||u==="true"||u==="",t=n(b),l=k().background==="surface"?"surface":"canvas",O=k().backdrop==="shading"?"shading":"blur",r=(k().position==="start"?"start":"end")==="start",p=e==="fixed",H=W(k().fullscreen,!1),E=l==="surface"?"var(--p-color-surface)":"var(--p-color-canvas)",X=l==="surface"?"var(--p-color-canvas)":"var(--p-color-surface)",U="var(--p-transition-duration, var(--p-duration-md))",f={"--p-fo-w-dialog":t?"100dvw":"0px","--p-fo-h-dialog":t?"100dvh":"0px","--p-fo-vis":t?"inherit":"hidden","--p-fo-pe":t?"auto":"none","--p-fo-db":t?"var(--p-color-backdrop)":"transparent","--p-fo-bf":t&&O==="blur"?"var(--p-blur-frosted)":"","--p-fo-delay":t?"var(--p-transition-duration, 0s)":U,"--p-fo-ease":t?"var(--p-ease-in)":"var(--p-ease-out)","--p-fo-ddur":t?"var(--p-transition-duration, var(--p-duration-lg))":U,"--p-fo-pdur":t?U:"var(--p-transition-duration, var(--p-duration-sm))","--p-fo-sc-op":t?"1":"0","--p-fo-sc-tf":t?"translate3d(0, 0, 0)":r?"translate3d(-100%, 0, 0)":"translate3d(100%, 0, 0)","--p-fo-sc-tf-rtl":t?"translate3d(0, 0, 0)":r?"translate3d(100%, 0, 0)":"translate3d(-100%, 0, 0)","--p-fo-in-s":r?"0":"auto","--p-fo-in-e":r?"auto":"0","--p-fo-rows":p?"auto 1fr auto":"auto","--p-fo-hdr-ss":r?"0":"var(--p-radius-3xl)","--p-fo-hdr-se":r?"var(--p-radius-3xl)":"0","--p-fo-dialog-bg":E,"--p-fo-dismiss-bg":E,"--p-fo-dismiss-hover":X},K=(u,R)=>{const v=C(R,r),m=u==="base"?"":`-${u}`;f[`--p-fo-w${m}`]=v.w,f[`--p-fo-min-w${m}`]=v.minW,f[`--p-fo-max-w${m}`]=v.maxW,f[`--p-fo-clip${m}`]=v.clip,f[`--p-fo-clip-rtl${m}`]=v.clipRtl,f[`--p-fo-r-ss${m}`]=v.rss,f[`--p-fo-r-se${m}`]=v.rse,f[`--p-fo-r-es${m}`]=v.res,f[`--p-fo-r-ee${m}`]=v.ree,f[`--p-fo-hcm-is${m}`]=v.hcmIs,f[`--p-fo-hcm-ie${m}`]=v.hcmIe};if(typeof H=="object"&&H!==null){let u=B(H,"base",!1);for(const R of w)H[R]!==void 0&&(u=B(H,R,u)),K(R,u)}else for(const u of w)K(u,n(H));return f}),a.$$.dirty&512,a.$$.dirty&1024&&s(1,T=en(F())),s(0,h=ln({"footer-behavior":o.footerBehavior}))},o=j(o),[h,T,o,b,_,i,S,e,z,d,F,c,I]}class kn extends Y{constructor(o){super(),$(this,o,vn,un,nn,{open:3,background:4,backdrop:5,position:6,footerBehavior:7,fullscreen:8,aria:9})}}export{kn as default};
