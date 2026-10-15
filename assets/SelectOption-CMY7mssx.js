import{j as n}from"./react-C3neMvrl.js";import{h as a}from"./host-DRskmCSE.js";import r from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function u(o){function p(){const i=e=>e===!0||e==="true"||e==="",t=i(o.disabled)||i(o.disabledParent);return{"--p-select-option-opacity":t?"0.4":"","--p-select-option-fc-opacity":t?"1":"","--p-select-option-fc-color":t?"GrayText":"","--p-select-option-cursor":t?"not-allowed":""}}return n.jsxs("div",{className:["p-select-option",o.className].filter(Boolean).join(" "),"data-pds":"select-option",style:p(),...a({hidden:o.hidden}),children:[n.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-select-option :where([data-pds-slot]){display:contents}

        .p-select-option {
          display: block;
          opacity: var(--p-select-option-opacity) !important;
          scroll-margin-block-start: calc(
            max(2px, var(--_p-select-option-a, 1) * 6px) + 36px
          ) !important;
          scroll-margin-block-end: max(
            2px,
            var(--_p-select-option-a, 1) * 6px
          ) !important;
        }
        .p-select-option[hidden] {
          display: none !important;
        }
        .p-select-option [data-pds-slot] > img{
          font: var(--p-typescale-sm) var(--p-font-porsche-next) !important;
          width: auto !important;
          height: var(--p-leading-normal) !important;
          border-radius: var(--p-radius-sm) !important;
        }
        .p-select-option .option{
          display: flex;
          gap: calc(11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px);
          padding-block: calc(
            11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px
          );
          padding-inline: var(
              --_p-select-option-b,
              calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px)
            )
            calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px);
          min-height: var(--p-leading-normal);
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-color-contrast-high);
          cursor: var(--p-select-option-cursor, pointer);
          text-align: start;
          word-break: break-word;
          box-sizing: content-box;
          border-radius: var(--p-radius-sm);
          transition: background-color
              var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
        }
        .p-select-option .option--highlighted{
          background: var(--p-color-frosted);
        }
        .p-select-option .option--highlighted,
        .p-select-option .option--selected{
          color: var(--p-color-primary);
        }
        .p-select-option .option--disabled{
          cursor: not-allowed;
        }
        .p-select-option .option--hidden{
          display: none;
        }
        .p-select-option .icon{
          margin-inline-start: auto;
        }
        @media (forced-colors: active) {
          .p-select-option {
            opacity: var(--p-select-option-fc-opacity) !important;
            color: var(--p-select-option-fc-color) !important;
          }
          .p-select-option .option--disabled{
            color: GrayText;
          }
          .p-select-option .option--highlighted{
            forced-color-adjust: none;
            outline: 2px solid Highlight;
            outline-offset: -2px;
          }
        }`}}),n.jsx(n.Fragment,{children:n.jsxs("div",{className:"option",children:[n.jsx("span",{"data-pds-slot":"",children:o.children}),n.jsx(r,{name:"check",color:"primary"})]})})]})}export{u as default};
