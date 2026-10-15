import{j as i}from"./react-C3neMvrl.js";import{h as a}from"./host-DRskmCSE.js";import d from"./ButtonPure-CBGxJhLp.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./Spinner-DLZl2BeF.js";import"./Icon-CUF7WVtc.js";import"./index-ChNsHkGO.js";function g(n){return i.jsxs("div",{className:["p-drilldown-item",n.className].filter(Boolean).join(" "),"data-pds":"drilldown-item",...a({cascade:n.cascade,primary:n.primary,secondary:n.secondary}),children:[i.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-drilldown-item :where([data-pds-slot]){display:contents}

        @keyframes slide-up-mobile {
          from {
            transform: translate3d(0, var(--p-spacing-fluid-md), 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes slide-up-desktop-primary {
          from {
            margin-block-start: var(--p-spacing-fluid-md);
          }
          to {
            margin-block-start: 0px;
          }
        }
        @keyframes slide-up-desktop-secondary {
          from {
            margin-block-start: var(--p-spacing-fluid-md);
          }
          to {
            margin-block-start: 0px;
          }
        }
        .p-drilldown-item {
          display: contents;
        }
        .p-drilldown-item[hidden] {
          display: none !important;
        }
        .p-drilldown-item [data-pds-slot="header"]{
          display: none;
        }
        .p-drilldown-item[primary] [data-pds-slot="button"],
        .p-drilldown-item[cascade] [data-pds-slot="button"] {
          display: none;
        }
        .p-drilldown-item [data-pds-slot]:not([name]){
          display: none;
        }
        .p-drilldown-item h2{
          display: none;
        }
        .p-drilldown-item[cascade] [data-pds-slot] > *:not([primary], [cascade]) {
          display: none !important;
        }
        .p-drilldown-item [data-pds-slot] > *{
          --p-drilldown-grid-template: auto/auto;
          --p-drilldown-gap: var(--p-spacing-fluid-xs);
        }
        .p-drilldown-item .scroller{
          display: none;
          overflow: hidden auto;
          background: var(--_p-drilldown-f);
        }
        .p-drilldown-item .button{
          grid-column: 1/-1;
          padding: var(--p-spacing-fluid-sm);
          margin: 0 calc(var(--p-spacing-fluid-sm) * -1);
        }
        .p-drilldown-item[primary] .button,
        .p-drilldown-item[cascade] .button {
          display: none;
        }
        .p-drilldown-item:not([primary]) .back {
          display: none;
        }
        .p-drilldown-item .drawer{
          display: none;
        }
        @media (max-width: 759px) {
          .p-drilldown-item[secondary] [data-pds-slot="header"] {
            grid-area: 2/3;
            display: grid;
            place-items: center;
            z-index: 2;
          }
          .p-drilldown-item[secondary] [data-pds-slot="button"] {
            display: none;
          }
          .p-drilldown-item[secondary] [data-pds-slot]:not([name]) {
            grid-area: 4/2 / auto/-2;
            z-index: 0;
            display: grid;
            grid-template: var(--p-drilldown-grid-template, auto/auto);
            gap: var(--p-drilldown-gap, var(--p-spacing-fluid-xs));
            align-content: start;
            align-items: start;
            box-sizing: border-box;
            min-height: 100%;
            height: fit-content;
            padding-block-end: var(--p-spacing-fluid-lg);
            animation: slide-up-mobile
              var(--p-animation-duration, var(--p-duration-md))
              var(--p-ease-in-out);
          }
          .p-drilldown-item[primary] [data-pds-slot]:not([name]),
          .p-drilldown-item[cascade] [data-pds-slot]:not([name]) {
            display: contents;
          }
          .p-drilldown-item[secondary] h2 {
            font: var(--p-font-weight-semibold) var(--p-typescale-sm) /
              var(--p-leading-normal) var(--p-font-porsche-next);
            display: block;
            grid-area: 2/3;
            place-self: center;
            z-index: 2;
            margin: 0;
            padding-inline: var(--p-spacing-static-md);
            max-width: 100%;
            box-sizing: border-box;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--_p-drilldown-a);
          }
          .p-drilldown-item[primary] [data-pds-slot] > *:not([secondary]) {
            display: none;
          }
          .p-drilldown-item[secondary] .scroller {
            display: grid;
            grid-template-rows: subgrid;
            grid-template-columns: subgrid;
            grid-area: 1/1/-1/-1;
          }
          .p-drilldown-item[secondary] .scroller::before {
            z-index: 1;
            content: "";
            position: sticky;
            top: 0;
            grid-area: 1/1/4/-1;
            background: linear-gradient(
              180deg,
              var(--_p-drilldown-b) 0%,
              var(--_p-drilldown-b) 65%,
              transparent 100%
            );
          }
          .p-drilldown-item[primary] .scroller,
          .p-drilldown-item[cascade] .scroller {
            display: contents;
          }
          .p-drilldown-item[secondary] .button {
            display: none;
          }
          .p-drilldown-item[primary] .back {
            grid-area: 2/2;
            margin-top: 2px;
            width: fit-content;
            height: fit-content;
            place-self: start;
            z-index: 2;
          }
          .p-drilldown-item[secondary] .drawer {
            display: contents;
          }
          .p-drilldown-item[primary] .drawer,
          .p-drilldown-item[cascade] .drawer {
            display: contents;
          }
        }
        @media (min-width: 760px) {
          .p-drilldown-item[primary] [data-pds-slot]:not([name]) {
            grid-area: 3/2 / auto/-2;
            display: grid;
            grid-template: var(--p-drilldown-grid-template, auto/auto);
            gap: var(--p-drilldown-gap, var(--p-spacing-fluid-xs));
            align-content: start;
            align-items: start;
            box-sizing: border-box;
            min-height: 100%;
            height: fit-content;
            padding-block-end: var(--p-spacing-fluid-lg);
            animation: slide-up-desktop-primary
              var(--p-animation-duration, var(--p-duration-md))
              var(--p-ease-in-out);
          }
          .p-drilldown-item[secondary] [data-pds-slot]:not([name]) {
            grid-area: 2/2 / auto/-2;
            display: grid;
            grid-template: var(--p-drilldown-grid-template, auto/auto);
            gap: var(--p-drilldown-gap, var(--p-spacing-fluid-xs));
            align-content: start;
            align-items: start;
            box-sizing: border-box;
            min-height: 100%;
            height: fit-content;
            padding-block-end: var(--p-spacing-fluid-lg);
            animation: slide-up-desktop-secondary
              var(--p-animation-duration, var(--p-duration-md))
              var(--p-ease-in-out);
          }
          .p-drilldown-item[cascade] [data-pds-slot]:not([name]) {
            display: contents;
          }
          .p-drilldown-item[secondary] .scroller {
            grid-area: 1/1/-1/-1;
            display: grid;
            grid-template-rows: subgrid;
            grid-template-columns: subgrid;
          }
          .p-drilldown-item[primary] .scroller,
          .p-drilldown-item[cascade] .scroller {
            display: contents;
          }
          .p-drilldown-item[primary] .back {
            grid-area: 2/2;
            margin-bottom: var(--p-spacing-fluid-md);
            width: fit-content;
            height: fit-content;
            margin-inline-start: -4px;
          }
          .p-drilldown-item[secondary] .drawer {
            position: absolute;
            inset: 0;
            inset-inline-start: clamp(338px, 210px + 18vw, 640px);
            display: grid;
            grid-template: var(--p-spacing-fluid-md) minmax(0, 1fr) / var(
                --p-spacing-fluid-lg
              ) minmax(0, 1fr) var(--p-spacing-fluid-lg);
          }
          .p-drilldown-item[primary] .drawer,
          .p-drilldown-item[cascade] .drawer {
            display: contents;
          }
        }`}}),i.jsx(i.Fragment,{children:i.jsx(d,{className:"button",type:"button",size:"medium",alignLabel:"start",stretch:"true",icon:"arrow-head-right",children:n.label})})]})}export{g as default};
