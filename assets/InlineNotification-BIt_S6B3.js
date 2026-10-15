import{j as i}from"./react-C3neMvrl.js";import f from"./ButtonPure-CBGxJhLp.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./host-DRskmCSE.js";import"./Spinner-DLZl2BeF.js";import"./Icon-CUF7WVtc.js";import"./index-ChNsHkGO.js";const o={info:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9m-.75 4.5h1.5V9h-1.5zm1.5 8.5h-1.5v-6h1.5z"/></svg>') center/contain no-repeat`,success:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.26 12.69-3.8-3.8 1.07-1.05 2.73 2.73 5.25-5.26 1.06 1.06z"/></svg>') center/contain no-repeat`,warning:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.58 18.26 13.3 3.75A1.5 1.5 0 0 0 12 3a1.5 1.5 0 0 0-1.3.75l-8.28 14.5a1.5 1.5 0 0 0 0 1.5c.28.47.76.75 1.3.75h16.56a1.5 1.5 0 0 0 1.3-2.25M13 17.5h-2v-2h2zm-.4-3.5h-1.2L11 8.5h2z"/></svg>') center/contain no-repeat`,error:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4l2 2 2-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 3.5-.4 5.5h-1.2L11 6.5zm-2 7h2v2h-2z"/></svg>') center/contain no-repeat`},r={info:"var(--p-color-info-frosted)",success:"var(--p-color-success-frosted)",warning:"var(--p-color-warning-frosted)",error:"var(--p-color-error-frosted)"},e={info:"var(--p-color-info)",success:"var(--p-color-success)",warning:"var(--p-color-warning)",error:"var(--p-color-error)"};function B(n){function s(){const a=n.state||"info",m=n.heading||"",v=c(),t=!!(m||v);return{"--p-in-bg":r[a]||r.info,"--p-in-icon":e[a]||e.info,"--p-in-mask":o[a]||o.info,"--p-in-place":t?"center":"flex-start","--p-in-desc-grid":t?"2/2":"1/2","--p-in-desc-mt":t?"var(--p-spacing-static-xs)":"0px"}}function c(){return!1}function l(){return n.heading||""}function p(){return n.description||""}function d(){return n.actionLabel||""}function g(){return n.actionIcon||"arrow-right"}return i.jsxs("div",{className:["p-inline-notification",n.className].filter(Boolean).join(" "),"data-pds":"inline-notification",style:s(),children:[i.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-inline-notification :where([data-pds-slot]){display:contents}

        .p-inline-notification {
          display: block;
        }
        .p-inline-notification[hidden] {
          display: none !important;
        }
        .p-inline-notification [data-pds-slot="heading"],
        .p-inline-notification h1,
        .p-inline-notification h2,
        .p-inline-notification h3,
        .p-inline-notification h4,
        .p-inline-notification h5,
        .p-inline-notification h6{
          all: unset;
          grid-area: 1 / 2;
          font: var(--p-font-weight-semibold) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-color-primary);
        }
        .p-inline-notification [data-pds-slot]:not([name]),
        .p-inline-notification [data-pds-slot="description"],
        .p-inline-notification p{
          all: unset;
          grid-area: var(--p-in-desc-grid, 1 / 2);
          margin-top: var(--p-in-desc-mt, 0px);
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-color-primary);
        }
        .p-inline-notification .notification{
          display: grid;
          grid-template: repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto);
          padding: calc(var(--p-spacing-static-sm) + var(--p-spacing-fluid-sm));
          border-radius: var(--p-radius-2xl);
          background: var(--p-in-bg);
          -webkit-backdrop-filter: var(--p-blur-frosted);
          backdrop-filter: var(--p-blur-frosted);
        }
        .p-inline-notification .dismiss{
          all: unset;
          box-sizing: border-box;
          display: grid;
          place-items: center;
          padding: 6px;
          border-radius: var(--p-radius-full);
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          background-color: var(--p-color-frosted-strong);
          color: var(--p-color-primary);
          cursor: pointer;
          -webkit-backdrop-filter: var(--p-blur-frosted);
          backdrop-filter: var(--p-blur-frosted);
          transition: background-color
              var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
          grid-area: 1 / 4 / -1;
          align-self: flex-start;
          margin-block: calc(-6 * var(--p-spacing-static-2xs));
          margin-inline: var(--p-spacing-static-md)
            calc(-6 * var(--p-spacing-static-2xs));
        }
        .p-inline-notification .dismiss:focus-visible{
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-inline-notification .dismiss::before{
          content: "";
          width: var(--p-leading-normal);
          height: var(--p-leading-normal);
          -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
            center/contain no-repeat;
          mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
            center/contain no-repeat;
          background: currentColor;
        }
        .p-inline-notification .dismiss span{
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }
        .p-inline-notification .action{
          grid-area: 3 / 1 / auto / -1;
          margin-top: var(--p-spacing-static-md);
          align-self: flex-start;
        }
        @media (min-width: 760px) {
          .p-inline-notification .notification::before{
            grid-area: 1 / 1;
            place-self: var(--p-in-place, flex-start);
            content: "";
            width: 1.5rem;
            height: 1.5rem;
            margin-inline-end: var(--p-spacing-static-sm);
            background: var(--p-in-icon);
            -webkit-mask: var(--p-in-mask);
            mask: var(--p-in-mask);
          }
          .p-inline-notification .action{
            grid-area: 1 / 3;
            margin-top: 0px;
            margin-inline-start: var(--p-spacing-static-md);
          }
        }
        @media (forced-colors: active) {
          .p-inline-notification .notification{
            outline: 2px solid CanvasText;
            outline-offset: -2px;
          }
          .p-inline-notification .dismiss{
            forced-color-adjust: none;
            background: Canvas;
            box-shadow: inset 0 0 0 2px ButtonBorder;
            color: ButtonText;
          }
          .p-inline-notification .dismiss:focus-visible{
            outline-color: Highlight;
          }
        }
        @media (min-width: 760px) and (forced-colors: active) {
          .p-inline-notification .notification::before{
            background: CanvasText;
          }
        }
        @media (hover: hover) {
          .p-inline-notification .dismiss:hover{
            background-color: var(--p-color-frosted);
          }
        }
        @media (hover: hover) and (forced-colors: active) {
          .p-inline-notification .dismiss:hover{
            background: Canvas;
          }
        }`}}),i.jsx(i.Fragment,{children:i.jsxs("div",{className:"notification",children:[i.jsx("h5",{children:l()}),i.jsx("p",{children:p()}),i.jsx("span",{"data-pds-slot":"heading",children:n.heading??null}),i.jsx("span",{"data-pds-slot":"",children:n.children}),i.jsx(f,{className:"action",icon:g(),children:d()}),i.jsx("button",{className:"dismiss",type:"button",children:i.jsx("span",{children:"Close notification"})})]})})]})}export{B as default};
