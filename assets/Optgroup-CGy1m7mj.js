import{j as p}from"./react-C3neMvrl.js";import{h as a}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function s(o){function r(){const n=o.disabled===!0||o.disabled==="true"||o.disabled==="";return{"--p-optgroup-opacity":n?"0.4":"1","--p-optgroup-hcm-color":n?"GrayText":"var(--p-color-primary)"}}function t(){return o.label||""}return p.jsxs("div",{className:["p-optgroup",o.className].filter(Boolean).join(" "),"data-pds":"optgroup",style:r(),...a({hidden:o.hidden}),children:[p.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-optgroup :where([data-pds-slot]){display:contents}

        .p-optgroup {
          display: block;
        }
        .p-optgroup[hidden] {
          display: none !important;
        }
        .p-optgroup [data-pds-slot] > *{
          --_p-select-option-b: calc(
            44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px
          );
          --_p-multi-select-option-b: calc(
            44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px
          );
        }
        .p-optgroup [role="group"]{
          display: flex;
          flex-direction: column;
          gap: calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);
        }
        .p-optgroup [role="presentation"]{
          padding-block: calc(
            11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px
          );
          padding-inline: calc(
            16.8px * (var(--_p-optgroup-a) - 0.64285714) + 6px
          );
          font: var(--p-font-weight-semibold) var(--p-typescale-xs) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-color-primary);
          opacity: var(--p-optgroup-opacity, 1);
        }
        @media (forced-colors: active) {
          .p-optgroup [role="presentation"]{
            opacity: 1;
            color: var(--p-optgroup-hcm-color, var(--p-color-primary));
          }
        }`}}),p.jsx(p.Fragment,{children:p.jsxs("div",{role:"group",children:[p.jsx("span",{id:"label",role:"presentation",children:t()}),p.jsx("span",{"data-pds-slot":"",children:o.children})]})})]})}export{s as default};
