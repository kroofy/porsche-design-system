import{j as r}from"./react-C3neMvrl.js";import k from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function C(n){function b(){const c=s=>s===!0||s==="true"||s==="",i=c(n.compact),o=c(n.disabled)||c(n.disabledParent),e=c(n.selected),a=n.state==="success"||n.state==="error"?n.state:"none",y=n.icon||"",S=n.iconSource||"",l=y!==""||S!=="",p=!0,j=i?"0.5":"1",t="max(2px, var(--p-spacing-static-sm) * var(--_p-segmented-control-a, var(--p-sci-a, 1)))",d="calc("+t+" + 4px)",m={none:"var(--p-color-contrast-lower)",success:"var(--p-color-success)",error:"var(--p-color-error)"},v={none:"var(--p-color-primary)",success:"var(--p-color-success)",error:"var(--p-color-error)"},u={none:"var(--p-color-frosted)",success:"var(--p-color-success-frosted-soft)",error:"var(--p-color-error-frosted-soft)"},w=e?v[a]||v.none:m[a]||m.none,g=e?"var(--p-color-frosted-strong)":u[a]||u.none;return{"--p-sci-a":j,"--p-sci-radius":i?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-sci-pad":l&&p?t+" "+d+" "+t+" "+t:t+" "+d,"--p-sci-border":w,"--p-sci-bg":g,"--p-sci-hover-bg":!o&&!e?"var(--p-color-frosted-strong)":g,"--p-sci-cursor":o?"not-allowed":"pointer","--p-sci-opacity":o?"0.4":"","--p-sci-span":e?"var(--p-color-contrast-high)":"var(--p-color-contrast-medium)","--p-sci-icon-me":l&&p?"0.25rem":"0","--p-sci-btn-font":"normal normal 400 1rem/calc(6px + 2.125ex) 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif","--p-sci-label-font":"normal normal 400 .875rem/calc(6px + 2.125ex) 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif","--p-sci-fc-opacity":o?"1":"","--p-sci-fc-color":o?"GrayText":"","--p-sci-fc-border":o?"GrayText":"","--p-sci-hover-transition":!o&&!e?"background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out)":""}}function f(){return n.label||""}function h(){return n.icon||""}function x(){return n.iconSource||""}return r.jsxs("div",{className:["p-segmented-control-item",n.className].filter(Boolean).join(" "),"data-pds":"segmented-control-item",style:b(),children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-segmented-control-item :where([data-pds-slot]){display:contents}

        .p-segmented-control-item {
          display: block;
          opacity: var(--p-sci-opacity);
        }
        .p-segmented-control-item[hidden] {
          display: none !important;
        }
        .p-segmented-control-item button{
          position: relative;
          display: block;
          height: 100%;
          width: 100%;
          min-height: calc(
            max(
                var(--p-leading-normal),
                var(--_p-segmented-control-a, var(--p-sci-a, 1)) *
                  (var(--p-leading-normal) + 10px)
              ) +
              (
                max(
                    2px,
                    var(--p-spacing-static-sm) *
                      var(--_p-segmented-control-a, var(--p-sci-a, 1))
                  ) + 1px
              ) * 2
          );
          min-width: calc(
            max(
                var(--p-leading-normal),
                var(--_p-segmented-control-a, var(--p-sci-a, 1)) *
                  (var(--p-leading-normal) + 10px)
              ) +
              (
                max(
                    2px,
                    var(--p-spacing-static-sm) *
                      var(--_p-segmented-control-a, var(--p-sci-a, 1))
                  ) + 1px
              ) * 2
          );
          padding: var(--p-sci-pad);
          border: 1px solid var(--p-sci-border);
          border-radius: var(--p-sci-radius);
          background: var(--p-sci-bg);
          color: var(--p-color-primary);
          font: var(--p-sci-btn-font);
          cursor: var(--p-sci-cursor, pointer);
          transition: var(--p-sci-hover-transition);
        }
        .p-segmented-control-item button:focus-visible{
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-segmented-control-item span{
          display: block;
          font: var(--p-sci-label-font);
          overflow-wrap: normal;
          color: var(--p-sci-span);
        }
        .p-segmented-control-item .icon{
          height: 1.5rem;
          width: 1.5rem;
          margin-inline-end: var(--p-sci-icon-me);
        }
        @media (forced-colors: active) {
          .p-segmented-control-item {
            opacity: var(--p-sci-fc-opacity, var(--p-sci-opacity, 1));
            color: var(--p-sci-fc-color);
          }
          .p-segmented-control-item button{
            color: var(--p-sci-fc-color, var(--p-color-primary));
            border-color: var(--p-sci-fc-border, var(--p-sci-border));
          }
          .p-segmented-control-item button:focus-visible{
            outline-color: Highlight;
          }
          .p-segmented-control-item span{
            color: var(--p-sci-fc-color, var(--p-sci-span));
          }
        }
        @media (hover: hover) {
          .p-segmented-control-item button:hover{
            background-color: var(--p-sci-hover-bg, var(--p-sci-bg));
          }
        }`}}),r.jsx(r.Fragment,{children:r.jsxs("button",{type:"button",children:[r.jsx("span",{children:f()}),r.jsx(k,{className:"icon",color:"inherit",size:"inherit","aria-hidden":"true",name:h(),source:x()}),r.jsx("span",{"data-pds-slot":"",children:n.children})]})})]})}export{C as default};
