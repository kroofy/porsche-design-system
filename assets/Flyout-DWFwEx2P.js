import{j as o}from"./react-C3neMvrl.js";import{h as w}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const x=["base","xs","s","m","l","xl","xxl"],k=(r,d)=>{if(r==null)return d;if(r==="")return!0;if(typeof r=="string"&&r.trim().charAt(0)==="{")try{return JSON.parse(r.replace(/'/g,'"'))}catch{try{return JSON.parse(r.replace(/'/g,'"').replace(/([{,]\s*)([A-Za-z_]\w*)\s*:/g,'$1"$2":'))}catch{return d}}return r},g=(r,d,f)=>r&&typeof r=="object"?r[d]===void 0?f:r[d]:r,j=(r,d)=>r===!0||r==="true"?{w:"100dvw",minW:"auto",maxW:"none",clip:"none",clipRtl:"none",rss:"0",rse:"0",res:"0",ree:"0",hcmIs:"",hcmIe:""}:d?{w:"var(--p-flyout-width, auto)",minW:"320px",maxW:"100vw",clip:"inset(0 round 0 var(--p-radius-3xl) var(--p-radius-3xl) 0)",clipRtl:"inset(0 round var(--p-radius-3xl) 0 0 var(--p-radius-3xl))",rss:"0",rse:"var(--p-radius-3xl)",res:"0",ree:"var(--p-radius-3xl)",hcmIs:"",hcmIe:"2px solid CanvasText"}:{w:"var(--p-flyout-width, auto)",minW:"320px",maxW:"100vw",clip:"inset(0 round var(--p-radius-3xl) 0 0 var(--p-radius-3xl))",clipRtl:"inset(0 round 0 var(--p-radius-3xl) var(--p-radius-3xl) 0)",rss:"var(--p-radius-3xl)",rse:"0",res:"var(--p-radius-3xl)",ree:"0",hcmIs:"2px solid CanvasText",hcmIe:""};function F(r){function d(){const f=i=>i===!0||i==="true"||i==="",a=f(r.open),u=r.background==="surface"?"surface":"canvas",h=r.backdrop==="shading"?"shading":"blur",p=(r.position==="start"?"start":"end")==="start",b=r.footerBehavior==="fixed",l=k(r.fullscreen,!1),v=u==="surface"?"var(--p-color-surface)":"var(--p-color-canvas)",y=u==="surface"?"var(--p-color-canvas)":"var(--p-color-surface)",c="var(--p-transition-duration, var(--p-duration-md))",t={"--p-fo-w-dialog":a?"100dvw":"0px","--p-fo-h-dialog":a?"100dvh":"0px","--p-fo-vis":a?"inherit":"hidden","--p-fo-pe":a?"auto":"none","--p-fo-db":a?"var(--p-color-backdrop)":"transparent","--p-fo-bf":a&&h==="blur"?"var(--p-blur-frosted)":"","--p-fo-delay":a?"var(--p-transition-duration, 0s)":c,"--p-fo-ease":a?"var(--p-ease-in)":"var(--p-ease-out)","--p-fo-ddur":a?"var(--p-transition-duration, var(--p-duration-lg))":c,"--p-fo-pdur":a?c:"var(--p-transition-duration, var(--p-duration-sm))","--p-fo-sc-op":a?"1":"0","--p-fo-sc-tf":a?"translate3d(0, 0, 0)":p?"translate3d(-100%, 0, 0)":"translate3d(100%, 0, 0)","--p-fo-sc-tf-rtl":a?"translate3d(0, 0, 0)":p?"translate3d(100%, 0, 0)":"translate3d(-100%, 0, 0)","--p-fo-in-s":p?"0":"auto","--p-fo-in-e":p?"auto":"0","--p-fo-rows":b?"auto 1fr auto":"auto","--p-fo-hdr-ss":p?"0":"var(--p-radius-3xl)","--p-fo-hdr-se":p?"var(--p-radius-3xl)":"0","--p-fo-dialog-bg":v,"--p-fo-dismiss-bg":v,"--p-fo-dismiss-hover":y},m=(i,n)=>{const s=j(n,p),e=i==="base"?"":`-${i}`;t[`--p-fo-w${e}`]=s.w,t[`--p-fo-min-w${e}`]=s.minW,t[`--p-fo-max-w${e}`]=s.maxW,t[`--p-fo-clip${e}`]=s.clip,t[`--p-fo-clip-rtl${e}`]=s.clipRtl,t[`--p-fo-r-ss${e}`]=s.rss,t[`--p-fo-r-se${e}`]=s.rse,t[`--p-fo-r-es${e}`]=s.res,t[`--p-fo-r-ee${e}`]=s.ree,t[`--p-fo-hcm-is${e}`]=s.hcmIs,t[`--p-fo-hcm-ie${e}`]=s.hcmIe};if(typeof l=="object"&&l!==null){let i=g(l,"base",!1);for(const n of x)l[n]!==void 0&&(i=g(l,n,i)),m(n,i)}else for(const i of x)m(i,f(l));return t}return o.jsxs("div",{className:["p-flyout",r.className].filter(Boolean).join(" "),"data-pds":"flyout",style:d(),...w({"footer-behavior":r.footerBehavior}),children:[o.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-flyout :where([data-pds-slot]){display:contents}

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
          --pds-internal-grid-margin: calc(
            var(--p-spacing-fluid-lg) * -1
          ) !important;
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
            width 0s linear var(--p-fo-delay),
            height 0s linear var(--p-fo-delay),
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
              width 0s linear var(--p-fo-delay),
              height 0s linear var(--p-fo-delay),
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
              var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
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
        }`}}),o.jsx(o.Fragment,{children:o.jsx("dialog",{"aria-modal":"true",inert:!0,tabIndex:-1,children:o.jsx("div",{className:"scroller",children:o.jsxs("div",{className:"flyout",children:[o.jsx("button",{className:"dismiss",type:"button",children:o.jsx("span",{children:"Dismiss flyout"})}),o.jsx("span",{"data-pds-slot":"header",children:r.header??null}),o.jsx("span",{"data-pds-slot":"",children:r.children}),o.jsx("span",{"data-pds-slot":"footer",children:r.footer??null}),o.jsx("span",{"data-pds-slot":"sub-footer",children:r["sub-footer"]??null})]})})})})]})}export{F as default};
