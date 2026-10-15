import{j as t}from"./react-C3neMvrl.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function a(e){function s(){const n=e.type||"unordered";return n==="numbered"?{"--p-text-list-e":"var(--_p-text-list-a, 1.5rem)","--p-text-list-before":"counters(p-text-list-counter, '.', decimal) var(--_p-text-list-b, '.')","--p-text-list-inc":"p-text-list-counter","--p-text-list-justify":"flex-end","--p-text-list-ws":"nowrap"}:n==="alphabetically"?{"--p-text-list-e":"var(--_p-text-list-a, 1.5rem)","--p-text-list-before":"counters(p-text-list-counter, '.', lower-latin) var(--_p-text-list-b, '.')","--p-text-list-inc":"p-text-list-counter","--p-text-list-justify":"flex-end","--p-text-list-ws":"nowrap"}:{"--p-text-list-e":"var(--_p-text-list-f, .375rem)","--p-text-list-before":"var(--_p-text-list-g, '•')","--p-text-list-inc":"none","--p-text-list-justify":"unset","--p-text-list-ws":"unset"}}return t.jsxs("div",{className:["p-text-list",e.className].filter(Boolean).join(" "),"data-pds":"text-list",style:s(),children:[t.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-text-list :where([data-pds-slot]){display:contents}

        .p-text-list {
          display: block;
          counter-reset: p-text-list-counter !important;
        }
        .p-text-list[hidden] {
          display: none !important;
        }
        .p-text-list ol,
        .p-text-list ul{
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          margin: 0;
          padding: var(--_p-text-list-d, 0) 0 var(--_p-text-list-c, 0) 0;
          list-style-type: none;
          color: var(--p-color-primary);
        }
        .p-text-list [data-pds-slot] > *{
          --_p-text-list-d: var(--p-spacing-static-xs) !important;
          --_p-text-list-c: var(--p-spacing-static-md) !important;
          --_p-text-list-e: var(
            --p-text-list-e,
            var(--_p-text-list-f, 0.375rem)
          ) !important;
        }
        .p-text-list [data-pds-slot] > *::before{
          content: var(
            --p-text-list-before,
            var(--_p-text-list-g, "•")
          ) !important;
          counter-increment: var(--p-text-list-inc, none) !important;
          justify-self: var(--p-text-list-justify, unset) !important;
          white-space: var(--p-text-list-ws, unset) !important;
        }`}}),t.jsx(t.Fragment,{children:t.jsx("ul",{children:t.jsx("span",{"data-pds-slot":"",children:e.children})})})]})}export{a as default};
