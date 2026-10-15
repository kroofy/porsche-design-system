import{S as R,i as G,s as Q,c as F,d as V,t as L,b as M,u as q,g as A,e as N,p as e,k as X,l as h,m as x,H as Y,n as Z,a as D,q as E}from"./svelte-DoO7z26N.js";import{s as j}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const $=i=>({}),I=i=>({}),aa=i=>({}),J=i=>({});function na(i){let o,d,H=`<style>${ra}</style>`,z,v,b,c,w,k,C,u,g,t;const y=i[10].header,s=F(y,i,i[9],J),_=i[10].default,l=F(_,i,i[9],null),a=i[10].footer,r=F(a,i,i[9],I);return{c(){o=x("div"),d=new Y(!1),z=Z(),v=x("dialog"),b=x("div"),c=x("div"),w=x("button"),w.innerHTML="<span>Dismiss modal</span>",k=x("span"),s&&s.c(),C=x("span"),l&&l.c(),u=x("span"),r&&r.c(),d.a=z,e(w,"class","dismiss"),e(w,"type","button"),e(k,"data-pds-slot","header"),e(C,"data-pds-slot",""),e(u,"data-pds-slot","footer"),e(c,"class","modal"),e(b,"class","scroller"),e(v,"aria-modal","true"),v.inert=!0,e(v,"tabindex",-1),e(o,"class",g="p-modal"+(i[1].class?` ${i[1].class}`:"")),e(o,"data-pds","modal"),e(o,"style",i[0])},m(n,p){X(n,o,p),d.m(H,o),h(o,z),h(o,v),h(v,b),h(b,c),h(c,w),h(c,k),s&&s.m(k,null),h(c,C),l&&l.m(C,null),h(c,u),r&&r.m(u,null),t=!0},p(n,[p]){s&&s.p&&(!t||p&512)&&q(s,y,n,n[9],t?N(y,n[9],p,aa):A(n[9]),J),l&&l.p&&(!t||p&512)&&q(l,_,n,n[9],t?N(_,n[9],p,null):A(n[9]),null),r&&r.p&&(!t||p&512)&&q(r,a,n,n[9],t?N(a,n[9],p,$):A(n[9]),I),(!t||p&2&&g!==(g="p-modal"+(n[1].class?` ${n[1].class}`:"")))&&e(o,"class",g),(!t||p&1)&&e(o,"style",n[0])},i(n){t||(M(s,n),M(l,n),M(r,n),t=!0)},o(n){L(s,n),L(l,n),L(r,n),t=!1},d(n){n&&V(o),s&&s.d(n),l&&l.d(n),r&&r.d(n)}}}const ra=`.p-modal :where([data-pds-slot]){display:contents}

  .p-modal {
    display: contents;
    --ref-p-modal-pt: var(--p-spacing-fluid-md) !important;
    --ref-p-modal-pb: calc(
      var(--p-radius-3xl) + var(--p-spacing-fluid-md)
    ) !important;
    --ref-p-modal-px: var(--p-spacing-fluid-lg) !important;
    --pds-internal-grid-outer-column: calc(
      var(--p-spacing-fluid-lg) - clamp(16px, 1.25vw + 12px, 36px)
    ) !important;
    --pds-internal-grid-margin: calc(var(--p-spacing-fluid-lg) * -1) !important;
    --pds-internal-grid-width-min: auto !important;
    --pds-internal-grid-width-max: none !important;
    --_p-dialog-a: var(--p-mo-dialog-bg) !important;
  }
  .p-modal[hidden] {
    display: none !important;
  }
  .p-modal [data-pds-slot]{
    display: block;
  }
  .p-modal [data-pds-slot]:first-of-type{
    grid-row-start: 1;
  }
  .p-modal [data-pds-slot]:not([name]){
    grid-column: 2/3;
    z-index: 0;
  }
  .p-modal [data-pds-slot="header"]{
    grid-column: 2/3;
    z-index: 0;
  }
  .p-modal [data-pds-slot="footer"]{
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
  .p-modal [data-pds-slot="footer"][data-stuck]::after{
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
  .p-modal dialog{
    all: unset;
    position: fixed;
    inset: 0;
    max-width: 100dvw;
    max-height: 100dvh;
    overflow: hidden;
    display: block;
    user-select: text;
    outline: 0;
    width: var(--p-mo-w-dialog, 0px);
    height: var(--p-mo-h-dialog, 0px);
    visibility: var(--p-mo-vis, hidden);
    pointer-events: var(--p-mo-pe, none);
    background: var(--p-mo-db, transparent);
    -webkit-backdrop-filter: var(--p-mo-bf);
    backdrop-filter: var(--p-mo-bf);
    transition: visibility 0s linear var(--p-mo-delay),
      width 0s linear var(--p-mo-delay), height 0s linear var(--p-mo-delay),
      background-color var(--p-mo-ddur) var(--p-mo-ease),
      -webkit-backdrop-filter var(--p-mo-ddur) var(--p-mo-ease),
      backdrop-filter var(--p-mo-ddur) var(--p-mo-ease);
    overlay: none;
  }
  .p-modal dialog:modal{
    overlay: auto;
  }
  .p-modal dialog::backdrop{
    display: none;
  }
  @supports (overlay: auto) and (transition-behavior: allow-discrete) {
    .p-modal dialog{
      transition: visibility 0s linear var(--p-mo-delay),
        width 0s linear var(--p-mo-delay), height 0s linear var(--p-mo-delay),
        background-color var(--p-mo-ddur) var(--p-mo-ease),
        -webkit-backdrop-filter var(--p-mo-ddur) var(--p-mo-ease),
        backdrop-filter var(--p-mo-ddur) var(--p-mo-ease),
        overlay var(--p-mo-ddur) var(--p-mo-ease) allow-discrete;
    }
  }
  .p-modal .scroller{
    position: absolute;
    isolation: isolate;
    display: grid;
    inset: 0;
    overflow: hidden auto;
    overscroll-behavior-y: none;
    background: rgba(255, 255, 255, 0.01);
    transform: translate3d(0, 0, 0);
  }
  .p-modal .modal{
    position: relative;
    display: grid;
    grid-template: auto / var(--p-spacing-fluid-sm) minmax(0, 1fr) var(
        --p-spacing-fluid-sm
      );
    gap: var(--p-spacing-fluid-md)
      calc(var(--p-spacing-fluid-lg) - var(--p-spacing-fluid-sm));
    padding-top: var(--p-spacing-fluid-md);
    padding-bottom: calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md));
    align-content: flex-start;
    color: var(--p-color-primary);
    background: var(--_p-dialog-a);
    opacity: var(--p-mo-op, 0);
    transform: var(--p-mo-tf, translate3d(0, 25vh, 0));
    transition: opacity var(--p-mo-pdur) var(--p-mo-ease),
      transform var(--p-mo-pdur) var(--p-mo-ease);
    width: var(--p-mo-w);
    min-width: var(--p-mo-min-w);
    max-width: var(--p-mo-max-w);
    place-self: var(--p-mo-place);
    margin: var(--p-mo-margin);
    border-radius: var(--p-mo-radius);
    clip-path: var(--p-mo-clip);
  }
  .p-modal .modal:dir(rtl){
    transform: var(--p-mo-tf, translate3d(0, 25vh, 0));
  }
  @media (forced-colors: active) {
    .p-modal .modal{
      outline: var(--p-mo-hcm);
      outline-offset: -2px;
    }
  }
  @media (min-width: 480px) {
    .p-modal .modal{
      width: var(--p-mo-w-xs);
      min-width: var(--p-mo-min-w-xs);
      max-width: var(--p-mo-max-w-xs);
      place-self: var(--p-mo-place-xs);
      margin: var(--p-mo-margin-xs);
      border-radius: var(--p-mo-radius-xs);
      clip-path: var(--p-mo-clip-xs);
    }
  }
  @media (min-width: 760px) {
    .p-modal .modal{
      width: var(--p-mo-w-s);
      min-width: var(--p-mo-min-w-s);
      max-width: var(--p-mo-max-w-s);
      place-self: var(--p-mo-place-s);
      margin: var(--p-mo-margin-s);
      border-radius: var(--p-mo-radius-s);
      clip-path: var(--p-mo-clip-s);
    }
  }
  @media (min-width: 1000px) {
    .p-modal .modal{
      width: var(--p-mo-w-m);
      min-width: var(--p-mo-min-w-m);
      max-width: var(--p-mo-max-w-m);
      place-self: var(--p-mo-place-m);
      margin: var(--p-mo-margin-m);
      border-radius: var(--p-mo-radius-m);
      clip-path: var(--p-mo-clip-m);
    }
  }
  @media (min-width: 1300px) {
    .p-modal .modal{
      width: var(--p-mo-w-l);
      min-width: var(--p-mo-min-w-l);
      max-width: var(--p-mo-max-w-l);
      place-self: var(--p-mo-place-l);
      margin: var(--p-mo-margin-l);
      border-radius: var(--p-mo-radius-l);
      clip-path: var(--p-mo-clip-l);
    }
  }
  @media (min-width: 1760px) {
    .p-modal .modal{
      width: var(--p-mo-w-xl);
      min-width: var(--p-mo-min-w-xl);
      max-width: var(--p-mo-max-w-xl);
      place-self: var(--p-mo-place-xl);
      margin: var(--p-mo-margin-xl);
      border-radius: var(--p-mo-radius-xl);
      clip-path: var(--p-mo-clip-xl);
    }
  }
  @media (min-width: 1920px) {
    .p-modal .modal{
      width: var(--p-mo-w-xxl);
      min-width: var(--p-mo-min-w-xxl);
      max-width: var(--p-mo-max-w-xxl);
      place-self: var(--p-mo-place-xxl);
      margin: var(--p-mo-margin-xxl);
      border-radius: var(--p-mo-radius-xxl);
      clip-path: var(--p-mo-clip-xxl);
    }
  }
  .p-modal .dismiss{
    all: unset;
    box-sizing: border-box;
    display: grid;
    place-items: center;
    padding: 6px;
    border-radius: var(--p-radius-full);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    background-color: var(--p-mo-dismiss-bg);
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
  .p-modal .dismiss:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-modal .dismiss::before{
    content: "";
    width: var(--p-leading-normal);
    height: var(--p-leading-normal);
    -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    background: currentColor;
  }
  .p-modal .dismiss span{
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
    .p-modal .dismiss{
      forced-color-adjust: none;
      background: Canvas;
      box-shadow: inset 0 0 0 2px ButtonBorder;
      color: ButtonText;
    }
    .p-modal .dismiss:focus-visible{
      outline-color: Highlight;
    }
  }
  @media (hover: hover) {
    .p-modal .dismiss:hover{
      background-color: var(--p-mo-dismiss-hover);
    }
    @media (forced-colors: active) {
      .p-modal .dismiss:hover{
        background: Canvas;
      }
    }
  }`;function oa(i,o,d){let H,z,{$$slots:v={},$$scope:b}=o;const c=["base","xs","s","m","l","xl","xxl"],w=(a,r)=>{if(a==null)return r;if(a==="")return!0;if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"'))}catch{return r}return a},k=(a,r,n)=>a&&typeof a=="object"?a[r]===void 0?n:a[r]:a,C=a=>a===!0||a==="true"?{w:"auto",minW:"auto",maxW:"none",place:"stretch",margin:"0",radius:"0",clip:"none"}:{w:"var(--p-modal-width, auto)",minW:"276px",maxW:"1535.5px",place:"center",margin:"var(--p-modal-spacing-top, clamp(16px, 10vh, 192px)) max(22px, 10.625vw - 12px) var(--p-modal-spacing-bottom, clamp(16px, 10vh, 192px))",radius:"var(--p-radius-3xl)",clip:"inset(0 round var(--p-radius-3xl))"};let{open:u}=o,{background:g}=o,{backdrop:t}=o,{fullscreen:y}=o,{dismissButton:s}=o,{aria:_}=o;function l(){return{open:u,background:g,backdrop:t,fullscreen:y,dismissButton:s,aria:_}}return i.$$set=a=>{d(1,o=D(D({},o),E(a))),"open"in a&&d(2,u=a.open),"background"in a&&d(3,g=a.background),"backdrop"in a&&d(4,t=a.backdrop),"fullscreen"in a&&d(5,y=a.fullscreen),"dismissButton"in a&&d(6,s=a.dismissButton),"aria"in a&&d(7,_=a.aria),"$$scope"in a&&d(9,b=a.$$scope)},i.$$.update=()=>{i.$$.dirty&4&&d(8,H=()=>{const a=m=>m===!0||m==="true"||m==="",r=a(u),n=l().background==="surface"?"surface":"canvas",p=l().backdrop==="shading"?"shading":"blur",B=w(l().fullscreen,!1),P=n==="surface"?"var(--p-color-surface)":"var(--p-color-canvas)",K=n==="surface"?"var(--p-color-canvas)":"var(--p-color-surface)",O="var(--p-transition-duration, var(--p-duration-md))",f={"--p-mo-w-dialog":r?"100dvw":"0px","--p-mo-h-dialog":r?"100dvh":"0px","--p-mo-vis":r?"inherit":"hidden","--p-mo-pe":r?"auto":"none","--p-mo-db":r?"var(--p-color-backdrop)":"transparent","--p-mo-bf":r&&p==="blur"?"var(--p-blur-frosted)":"","--p-mo-delay":r?"var(--p-transition-duration, 0s)":O,"--p-mo-ease":r?"var(--p-ease-in)":"var(--p-ease-out)","--p-mo-ddur":r?"var(--p-transition-duration, var(--p-duration-lg))":O,"--p-mo-pdur":r?O:"var(--p-transition-duration, var(--p-duration-sm))","--p-mo-op":r?"1":"0","--p-mo-tf":r?"translate3d(0, 0, 0)":"translate3d(0, 25vh, 0)","--p-mo-hcm":a(B)?"":"2px solid CanvasText","--p-mo-dialog-bg":P,"--p-mo-dismiss-bg":P,"--p-mo-dismiss-hover":K},U=(m,W)=>{const S=C(W),T=m==="base"?"":`-${m}`;f[`--p-mo-w${T}`]=S.w,f[`--p-mo-min-w${T}`]=S.minW,f[`--p-mo-max-w${T}`]=S.maxW,f[`--p-mo-place${T}`]=S.place,f[`--p-mo-margin${T}`]=S.margin,f[`--p-mo-radius${T}`]=S.radius,f[`--p-mo-clip${T}`]=S.clip};if(typeof B=="object"&&B!==null){let m=k(B,"base",!1);for(const W of c)B[W]!==void 0&&(m=k(B,W,m)),U(W,m)}else for(const m of c)U(m,a(B));return f}),i.$$.dirty&64,i.$$.dirty&128,i.$$.dirty&256&&d(0,z=j(H()))},o=E(o),[z,o,u,g,t,y,s,_,H,b,v]}class ca extends R{constructor(o){super(),G(this,o,oa,na,Q,{open:2,background:3,backdrop:4,fullscreen:5,dismissButton:6,aria:7})}}export{ca as default};
