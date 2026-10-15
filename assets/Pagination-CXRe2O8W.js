import{j as e}from"./react-C3neMvrl.js";import h from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function k(n){function u(){const d=Number(n.totalItemsCount==null||n.totalItemsCount===""?1:n.totalItemsCount),c=Number(n.itemsPerPage==null||n.itemsPerPage===""?1:n.itemsPerPage),r=Math.ceil((d<1?1:d)/(c<1?1:c));let t=Number(n.activePage==null||n.activePage===""?1:n.activePage);t<1&&(t=1),t>r&&(t=r);let p=n.showLastPage;p===!1||p==="false"?p=!1:p=!0;const a="list-item",i="none",s=r<8,o=r>5,l=r-t,g=o&&t<4,m=o&&l<3,f=o&&!g&&!m,v=o&&!p&&l>=2&&t>2;return{"--p-pg-ellip":s?i:a,"--p-pg-ellip-start":!s&&t<=4?i:a,"--p-pg-ellip-end-3":!s&&l<4?i:a,"--p-pg-ellip-end-2":!s&&l<3?i:a,"--p-pg-m-start":g?i:a,"--p-pg-m-end":m?i:a,"--p-pg-m-mid":f?i:a,"--p-pg-m-ellip-end-show":v?"1":"","--p-pg-m-cur-2":o&&!p&&l<2?i:a,"--p-pg-m-cur-1":o&&!p&&l===1?i:a,"--p-pg-m-cur-after":o&&!p&&l>=2&&t>2?i:a}}return e.jsxs("div",{className:["p-pagination",n.className].filter(Boolean).join(" "),"data-pds":"pagination",style:u(),children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-pagination :where([data-pds-slot]){display:contents}

        .p-pagination {
          display: block;
        }
        .p-pagination[hidden] {
          display: none !important;
        }
        .p-pagination nav{
          display: flex;
          justify-content: center;
          user-select: none;
        }
        .p-pagination ul{
          display: flex;
          gap: var(--p-spacing-static-xs);
          margin: 0;
          padding: 0;
        }
        .p-pagination li{
          list-style-type: none;
        }
        .p-pagination span{
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color
              var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
          position: relative;
          padding: 0 6px;
          min-width: 2.25rem;
          height: 2.25rem;
          box-sizing: border-box;
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          white-space: nowrap;
          cursor: pointer;
          background-color: transparent;
          color: var(--p-color-primary);
          border-radius: var(--p-radius-full);
          border-color: transparent;
          outline: 0;
        }
        .p-pagination span[aria-current]{
          cursor: default;
          pointer-events: none;
          background-color: var(--p-color-frosted-strong);
        }
        .p-pagination span[aria-disabled]{
          cursor: default;
          pointer-events: none;
          opacity: 0.4;
        }
        .p-pagination span:not(.ellipsis):focus-visible{
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-pagination .ellipsis{
          cursor: default;
          pointer-events: none;
        }
        .p-pagination .ellipsis::after{
          content: "…";
        }
        @media (min-width: 760px) {
          .p-pagination ul{
            gap: var(--p-spacing-static-sm);
          }
          .p-pagination[data-pg-few] li.ellip {
            display: none;
          }
          .p-pagination[data-pg-start] li.ellip-start {
            display: none;
          }
          .p-pagination[data-pg-end-4] li.ellip-end:nth-last-child(3) {
            display: none;
          }
          .p-pagination[data-pg-end-3] li.ellip-end:nth-last-child(2) {
            display: none;
          }
        }
        @media (max-width: 759px) {
          .p-pagination[data-pg-m-start] li.ellip-start,
          .p-pagination[data-pg-m-start] li:nth-child(6),
          .p-pagination[data-pg-m-start] li:nth-child(7),
          .p-pagination[data-pg-m-start] li:not(.ellip):nth-child(8) {
            display: none;
          }
          .p-pagination[data-pg-m-end] li.ellip-end,
          .p-pagination[data-pg-m-end] li.ellip-start + li:not(.current),
          .p-pagination[data-pg-m-end]
            li.ellip-start
            + li:not(.current)
            + li:not(.current) {
            display: none;
          }
          .p-pagination[data-pg-m-mid] li.ellip-start + li:not(.current),
          .p-pagination[data-pg-m-mid] li.current-1,
          .p-pagination[data-pg-m-mid] li[class~="current+1"],
          .p-pagination[data-pg-m-mid] li[class~="current+1"] + li:not(.ellip) {
            display: none;
          }
          .p-pagination[data-pg-m-cur-2] li.current-2 {
            display: none;
          }
          .p-pagination[data-pg-m-cur-1] li.current-1 {
            display: none;
          }
          .p-pagination[data-pg-m-cur-after] li[class~="current+1"],
          .p-pagination[data-pg-m-cur-after] li[class~="current+2"] {
            display: none;
          }
          .p-pagination[data-pg-m-ellip-end-show] li.ellip-end {
            display: initial;
          }
        }
        @media (forced-colors: active) {
          .p-pagination span:not(.ellipsis):focus-visible{
            outline-color: Highlight;
          }
          .p-pagination span[aria-disabled]{
            opacity: 1;
            color: GrayText;
          }
          .p-pagination span[aria-current]{
            border: 2px solid CanvasText;
          }
        }
        @media (hover: hover) {
          .p-pagination span:not([aria-disabled]):not(.ellipsis):hover{
            -webkit-backdrop-filter: var(--p-blur-frosted);
            backdrop-filter: var(--p-blur-frosted);
            background: var(--p-color-frosted);
          }
          @media (forced-colors: active) {
            .p-pagination span:not([aria-disabled]):not(.ellipsis):hover{
              outline: 2px solid CanvasText;
              outline-offset: -2px;
            }
          }
        }`}}),e.jsx(e.Fragment,{children:e.jsx("nav",{children:e.jsx("ul",{children:e.jsx("li",{className:"prev",children:e.jsx("span",{children:e.jsx(h,{name:"arrow-left",color:"primary","aria-hidden":"true"})})})})})})]})}export{k as default};
