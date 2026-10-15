import{j as t}from"./react-C3neMvrl.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function m(a){function o(){const e=(l=>l===!0||l==="true"||l==="")(a.compact),n=(a.layout||"auto")==="fixed";return{"--p-table-pad":e?"var(--p-spacing-static-sm)":"var(--p-spacing-fluid-sm)","--p-table-layout":n?"fixed":"","--p-table-w":n?"":"100%","--p-table-min-w":n?"100%":""}}return t.jsxs("div",{className:["p-table",a.className].filter(Boolean).join(" "),"data-pds":"table",style:o(),children:[t.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-table :where([data-pds-slot]){display:contents}

        .p-table {
          display: block;
          --p-scroller-indicator-top: var(
            --p-table-scroll-indicator-top,
            0px
          ) !important;
          --p-scroller-indicator-bottom: var(
            --p-table-scroll-indicator-bottom,
            0px
          ) !important;
          --_p-table-b: var(--p-color-frosted) !important;
          --_p-table-c: var(--p-color-contrast-low) !important;
          --_p-table-a: var(
            --p-table-pad,
            var(--p-spacing-fluid-sm)
          ) !important;
          --_p-table-d: 1px !important;
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next) !important;
          color: var(--p-color-primary) !important;
          text-align: start !important;
        }
        .p-table[hidden] {
          display: none !important;
        }
        .p-table .caption{
          margin-bottom: var(--p-spacing-fluid-md);
        }
        .p-table .table{
          display: table;
          border-collapse: collapse;
          white-space: nowrap;
          table-layout: var(--p-table-layout, auto);
          width: var(--p-table-w, auto);
          min-width: var(--p-table-min-w, auto);
        }`}}),t.jsx(t.Fragment,{children:t.jsx("div",{className:"table",role:"table",children:t.jsx("span",{"data-pds-slot":"",children:a.children})})})]})}export{m as default};
