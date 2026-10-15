import{j as t}from"./react-C3neMvrl.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function i(n){return t.jsxs("div",{className:["p-toast",n.className].filter(Boolean).join(" "),"data-pds":"toast",children:[t.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-toast :where([data-pds-slot]){display:contents}

        .p-toast {
          --_p-toast-a: var(--p-toast-position-bottom, 56px) !important;
          position: fixed !important;
          inset: auto max(22px, 10.625vw - 12px) var(--_p-toast-a) !important;
          z-index: 999999 !important;
        }
        .p-toast[hidden] {
          display: none !important;
        }
        @keyframes in {
          from {
            transform: translate3d(0, calc(var(--_p-toast-a) + 100%), 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes out {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(0, calc(var(--_p-toast-a) + 100%), 0);
          }
        }
        @media (min-width: 760px) {
          .p-toast {
            --_p-toast-a: var(--p-toast-position-bottom, 64px) !important;
            inset: auto auto var(--_p-toast-a) 64px !important;
            max-width: min(42rem, calc(100vw - 64px * 2)) !important;
          }
        }
        .p-toast .hydrated{
          animation: var(--p-animation-duration, 0.4s) in
            cubic-bezier(0, 0, 0.2, 1) forwards;
        }
        .p-toast .close{
          animation: 0.4s out cubic-bezier(0.4, 0, 0.5, 1) forwards !important;
        }`}}),t.jsx(t.Fragment,{children:t.jsx("div",{className:"root",children:t.jsx("span",{"data-pds-slot":"",children:n.children})})})]})}export{i as default};
