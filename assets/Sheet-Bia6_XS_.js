import{j as r}from"./react-C3neMvrl.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function m(s){function d(){const a=(i=>i===!0||i==="true"||i==="")(s.open),t=s.background==="surface"?"surface":"canvas",o=t==="surface"?"var(--p-color-surface)":"var(--p-color-canvas)",p=t==="surface"?"var(--p-color-canvas)":"var(--p-color-surface)",e="var(--p-transition-duration, var(--p-duration-md))";return{"--p-sh-w":a?"100dvw":"0px","--p-sh-h":a?"100dvh":"0px","--p-sh-vis":a?"inherit":"hidden","--p-sh-pe":a?"auto":"none","--p-sh-db":a?"var(--p-color-backdrop)":"transparent","--p-sh-delay":a?"var(--p-transition-duration, 0s)":e,"--p-sh-ease":a?"var(--p-ease-in)":"var(--p-ease-out)","--p-sh-ddur":a?"var(--p-transition-duration, var(--p-duration-lg))":e,"--p-sh-pdur":a?e:"var(--p-transition-duration, var(--p-duration-sm))","--p-sh-op":a?"1":"0","--p-sh-tf":a?"translate3d(0, 0, 0)":"translate3d(0, 25vh, 0)","--p-sh-dialog-bg":o,"--p-sh-dismiss-bg":o,"--p-sh-dismiss-hover":p}}return r.jsxs("div",{className:["p-sheet",s.className].filter(Boolean).join(" "),"data-pds":"sheet",style:d(),children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-sheet :where([data-pds-slot]){display:contents}

        .p-sheet {
          display: contents;
          --ref-p-sheet-pt: var(--p-spacing-fluid-md) !important;
          --ref-p-sheet-pb: calc(
            var(--p-radius-3xl) + var(--p-spacing-fluid-md)
          ) !important;
          --ref-p-sheet-px: var(--p-spacing-fluid-lg) !important;
          --pds-internal-grid-outer-column: calc(
            var(--p-spacing-fluid-lg) - clamp(16px, 1.25vw + 12px, 36px)
          ) !important;
          --pds-internal-grid-margin: calc(
            var(--p-spacing-fluid-lg) * -1
          ) !important;
          --pds-internal-grid-width-min: auto !important;
          --pds-internal-grid-width-max: none !important;
          --_p-dialog-a: var(--p-sh-dialog-bg) !important;
        }
        .p-sheet[hidden] {
          display: none !important;
        }
        .p-sheet [data-pds-slot]{
          display: block;
        }
        .p-sheet [data-pds-slot]:first-of-type{
          grid-row-start: 1;
        }
        .p-sheet [data-pds-slot]:not([name]){
          grid-column: 2/3;
          z-index: 0;
        }
        .p-sheet [data-pds-slot="header"]{
          grid-column: 2/3;
          z-index: 0;
        }
        .p-sheet dialog{
          all: unset;
          position: fixed;
          inset: 0;
          max-width: 100dvw;
          max-height: 100dvh;
          overflow: hidden;
          display: block;
          user-select: text;
          outline: 0;
          width: var(--p-sh-w, 0px);
          height: var(--p-sh-h, 0px);
          visibility: var(--p-sh-vis, hidden);
          pointer-events: var(--p-sh-pe, none);
          background: var(--p-sh-db, transparent);
          transition: visibility 0s linear var(--p-sh-delay),
            width 0s linear var(--p-sh-delay),
            height 0s linear var(--p-sh-delay),
            background-color var(--p-sh-ddur) var(--p-sh-ease),
            -webkit-backdrop-filter var(--p-sh-ddur) var(--p-sh-ease),
            backdrop-filter var(--p-sh-ddur) var(--p-sh-ease);
          overlay: none;
        }
        .p-sheet dialog:modal{
          overlay: auto;
        }
        .p-sheet dialog::backdrop{
          display: none;
        }
        @supports (overlay: auto) and (transition-behavior: allow-discrete) {
          .p-sheet dialog{
            transition: visibility 0s linear var(--p-sh-delay),
              width 0s linear var(--p-sh-delay),
              height 0s linear var(--p-sh-delay),
              background-color var(--p-sh-ddur) var(--p-sh-ease),
              -webkit-backdrop-filter var(--p-sh-ddur) var(--p-sh-ease),
              backdrop-filter var(--p-sh-ddur) var(--p-sh-ease),
              overlay var(--p-sh-ddur) var(--p-sh-ease) allow-discrete;
          }
        }
        .p-sheet .scroller{
          position: absolute;
          isolation: isolate;
          display: grid;
          inset: 0;
          overflow: hidden auto;
          overscroll-behavior-y: none;
          background: rgba(255, 255, 255, 0.01);
          transform: translate3d(0, 0, 0);
        }
        .p-sheet .sheet{
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
          opacity: var(--p-sh-op, 0);
          transform: var(--p-sh-tf, translate3d(0, 25vh, 0));
          transition: opacity var(--p-sh-pdur) var(--p-sh-ease),
            transform var(--p-sh-pdur) var(--p-sh-ease);
          color: var(--p-color-primary);
          background: var(--_p-dialog-a);
          width: 100%;
          align-self: flex-end;
          margin-block-start: var(--p-spacing-fluid-lg);
          border-top-left-radius: var(--p-radius-3xl);
          border-top-right-radius: var(--p-radius-3xl);
          clip-path: inset(0 round var(--p-radius-3xl) var(--p-radius-3xl) 0 0);
        }
        .p-sheet .sheet:dir(rtl){
          transform: var(--p-sh-tf, translate3d(0, 25vh, 0));
        }
        @media (forced-colors: active) {
          .p-sheet .sheet{
            border-top: 2px solid CanvasText;
          }
        }
        .p-sheet .dismiss{
          all: unset;
          box-sizing: border-box;
          display: grid;
          place-items: center;
          padding: 6px;
          border-radius: var(--p-radius-full);
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          background-color: var(--p-sh-dismiss-bg);
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
        .p-sheet .dismiss:focus-visible{
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-sheet .dismiss::before{
          content: "";
          width: var(--p-leading-normal);
          height: var(--p-leading-normal);
          -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
            center/contain no-repeat;
          mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
            center/contain no-repeat;
          background: currentColor;
        }
        .p-sheet .dismiss span{
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
          .p-sheet .dismiss{
            forced-color-adjust: none;
            background: Canvas;
            box-shadow: inset 0 0 0 2px ButtonBorder;
            color: ButtonText;
          }
          .p-sheet .dismiss:focus-visible{
            outline-color: Highlight;
          }
        }
        @media (hover: hover) {
          .p-sheet .dismiss:hover{
            background-color: var(--p-sh-dismiss-hover);
          }
          @media (forced-colors: active) {
            .p-sheet .dismiss:hover{
              background: Canvas;
            }
          }
        }`}}),r.jsxs(r.Fragment,{children:[" ",r.jsx("dialog",{"aria-modal":"true",inert:!0,tabIndex:-1,children:r.jsx("div",{className:"scroller",children:r.jsxs("div",{className:"sheet",children:[r.jsx("button",{className:"dismiss",type:"button",children:r.jsx("span",{children:"Dismiss sheet"})}),r.jsx("span",{"data-pds-slot":"header",children:s.header??null}),r.jsx("span",{"data-pds-slot":"",children:s.children})]})})})," "," "]})]})}export{m as default};
