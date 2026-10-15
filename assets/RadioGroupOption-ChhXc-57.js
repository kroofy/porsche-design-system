import{j as r}from"./react-C3neMvrl.js";import b from"./Spinner-DLZl2BeF.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function j(o){function c(){const a=n=>n===!0||n==="true"||n==="",e=a(o.disabled)||a(o.disabledParent),p=a(o.selected),v=a(o.loading)&&!p||a(o.loadingParent),i=e||v,m=o.state==="success"||o.state==="error"?o.state:"none",l={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",checked:"var(--p-color-primary)"},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",checked:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",checked:"var(--p-color-error)"}},t=l[m]||l.none;return{"--p-rgo-bg":t.bg,"--p-rgo-border":t.border,"--p-rgo-hover":i?"":t.hover,"--p-rgo-checked":t.checked,"--p-rgo-pe":i?"none":"","--p-rgo-cursor":i?"not-allowed":"pointer","--p-rgo-opacity":e?"0.4":"","--p-rgo-fc-opacity":e?"1":"","--p-rgo-fc-color":e?"GrayText":"","--p-rgo-fc-input-border":i?"GrayText":""}}function d(){return o.label||""}function s(){return o.disabled===!0||o.disabled==="true"||o.disabled===""||o.disabledParent===!0||o.disabledParent==="true"||o.disabledParent===""}function g(){const a=o.selected===!0||o.selected==="true"||o.selected==="",e=o.loading===!0||o.loading==="true"||o.loading==="";return o.loadingParent===!0||o.loadingParent==="true"||o.loadingParent===""?"":e&&!a?"Loading":""}function u(){return o.value==null?"":String(o.value)}return r.jsxs("div",{className:["p-radio-group-option",o.className].filter(Boolean).join(" "),"data-pds":"radio-group-option",style:c(),children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-radio-group-option :where([data-pds-slot]){display:contents}

        .p-radio-group-option {
          display: block;
        }
        .p-radio-group-option[hidden] {
          display: none !important;
        }
        .p-radio-group-option [data-pds-slot="label-after"]{
          display: inline-block;
          vertical-align: top;
        }
        .p-radio-group-option [data-pds-slot="label-after"] > *{
          margin-inline-start: var(--p-spacing-static-xs) !important;
        }
        .p-radio-group-option .label-after{
          display: inline-block;
          vertical-align: top;
        }
        .p-radio-group-option input{
          all: unset;
          display: grid;
          width: calc(var(--_p-radio-group-option-a) * 1.75rem);
          height: calc(var(--_p-radio-group-option-a) * 1.75rem);
          margin-block: max(
            0px,
            calc(
              (
                  var(--p-leading-normal) -
                    calc(var(--_p-radio-group-option-a) * 1.75rem)
                ) / 2
            )
          );
          box-sizing: border-box;
          font: var(--p-typescale-sm) var(--p-font-porsche-next);
          background: var(--p-rgo-bg);
          transition: background-color
              var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            border-color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
          border: 1px solid var(--p-rgo-border);
          border-radius: var(--p-radius-full);
          pointer-events: var(--p-rgo-pe);
        }
        .p-radio-group-option input:focus-visible{
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-radio-group-option input:checked{
          background: var(--p-rgo-checked);
        }
        .p-radio-group-option input::before{
          content: "";
          grid-area: 1 / 1;
        }
        .p-radio-group-option input::after{
          content: "";
          margin: calc(
            -1px - max(0px, calc(
                    24px - calc(var(--_p-radio-group-option-a) * 1.75rem)
                  ) / 2)
          );
          grid-area: 1 / 1;
        }
        .p-radio-group-option input:checked::before{
          -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>')
            center / contain no-repeat;
          mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>')
            center / contain no-repeat;
          background-color: var(--p-color-canvas);
        }
        .p-radio-group-option .root{
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          row-gap: var(--p-spacing-static-xs);
        }
        .p-radio-group-option .wrapper{
          position: relative;
          display: flex;
          align-items: center;
          align-self: flex-start;
          min-height: var(--p-leading-normal);
          cursor: var(--p-rgo-cursor, pointer);
          opacity: var(--p-rgo-opacity);
        }
        .p-radio-group-option .spinner{
          --p-spinner-size: calc(
            calc(var(--_p-radio-group-option-a) * 1.75rem) - 2px
          );
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .p-radio-group-option .label-wrapper{
          min-width: fit-content;
          position: static;
          width: auto;
          height: auto;
          padding: 0;
          margin: 0;
          overflow: visible;
          clip: auto;
          white-space: normal;
          padding-top: max(
            0px,
            calc(
              (
                  calc(var(--_p-radio-group-option-a) * 1.75rem) -
                    var(--p-leading-normal)
                ) / 2
            )
          );
          padding-inline-start: calc(
            11.2px * (var(--_p-radio-group-option-a) - 0.64285714) + 4px
          );
        }
        .p-radio-group-option .label{
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          cursor: var(--p-rgo-cursor, pointer);
          color: var(--p-color-primary);
          pointer-events: var(--p-rgo-pe);
          opacity: var(--p-rgo-opacity);
          transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
          display: inline;
        }
        .p-radio-group-option .label:empty{
          display: none;
        }
        .p-radio-group-option .label:is(span){
          cursor: unset;
          font-size: var(--p-typescale-xs);
          color: var(--p-color-contrast-high);
          position: static;
          width: auto;
          height: auto;
          padding: 0;
          margin: 0;
          overflow: visible;
          clip: auto;
          white-space: normal;
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
        .p-radio-group-option .label > [data-pds-slot="label"] > *{
          display: inline !important;
        }
        .p-radio-group-option .required{
          user-select: none;
        }
        .p-radio-group-option .loading{
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
          .p-radio-group-option input{
            border-color: var(--p-rgo-fc-input-border);
          }
          .p-radio-group-option input:checked::before{
            background: CanvasText;
          }
          .p-radio-group-option input:focus-visible{
            outline-color: Highlight;
          }
          .p-radio-group-option .wrapper{
            opacity: var(--p-rgo-fc-opacity);
            color: var(--p-rgo-fc-color);
          }
          .p-radio-group-option .label{
            opacity: var(--p-rgo-fc-opacity);
            color: var(--p-rgo-fc-color);
          }
        }
        @media (hover: hover) {
          .p-radio-group-option input:hover{
            border-color: var(--p-rgo-hover);
          }
        }`}}),r.jsx(r.Fragment,{children:r.jsxs("div",{className:"root",children:[r.jsxs("div",{className:"wrapper",children:[r.jsx("input",{type:"radio",value:u(),disabled:!!s(),name:o.name}),r.jsx(b,{className:"spinner","aria-hidden":"true"})]}),r.jsxs("div",{className:"label-wrapper",children:[r.jsxs("label",{className:"label",id:"label",children:[d(),r.jsx("span",{"data-pds-slot":"label",children:o.label??null})]}),r.jsx("span",{className:"label-after",children:r.jsx("span",{"data-pds-slot":"label-after",children:o["label-after"]??null})})]}),r.jsx("span",{className:"loading",id:"loading",children:g()})]})})]})}export{j as default};
