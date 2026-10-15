import{j as n}from"./react-C3neMvrl.js";import f from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const e={primary:"var(--p-color-canvas)",secondary:"var(--p-color-primary)",info:"var(--p-color-canvas)","info-frosted":"var(--p-color-primary)",success:"var(--p-color-canvas)","success-frosted":"var(--p-color-primary)",warning:"var(--p-color-canvas)","warning-frosted":"var(--p-color-primary)",error:"var(--p-color-canvas)","error-frosted":"var(--p-color-primary)"},i={primary:"var(--p-color-primary)",secondary:"var(--p-color-frosted-strong)",info:"var(--p-color-info)","info-frosted":"var(--p-color-info-frosted)",success:"var(--p-color-success)","success-frosted":"var(--p-color-success-frosted)",warning:"var(--p-color-warning)","warning-frosted":"var(--p-color-warning-frosted)",error:"var(--p-color-error)","error-frosted":"var(--p-color-error-frosted)"},c={primary:"var(--p-color-contrast-high)",secondary:"var(--p-color-frosted)",info:"var(--p-color-info-medium)","info-frosted":"var(--p-color-info-frosted-soft)",success:"var(--p-color-success-medium)","success-frosted":"var(--p-color-success-frosted-soft)",warning:"var(--p-color-warning-medium)","warning-frosted":"var(--p-color-warning-frosted-soft)",error:"var(--p-color-error-medium)","error-frosted":"var(--p-color-error-frosted-soft)"},u={secondary:1,"info-frosted":1,"success-frosted":1,"warning-frosted":1,"error-frosted":1};function w(r){function p(){const o=r.variant||"secondary",a=r.compact===!0||r.compact==="true"||r.compact==="",t=r.icon||"none",v=r.iconSource||"",s=t!=="none"&&t!==""||v!=="";return{"--p-tag-color":e[o]||e.secondary,"--p-tag-bg":i[o]||i.secondary,"--p-tag-hover":c[o]||c.secondary,"--p-tag-pad":a?"var(--p-spacing-static-2xs) var(--p-spacing-static-sm)":"4px calc(12 * var(--p-spacing-static-2xs))","--p-tag-radius":a?"calc(1px + (var(--p-leading-normal) / 2))":"calc(4px + (var(--p-leading-normal) / 2))","--p-tag-blur":u[o]?"var(--p-blur-frosted)":"","--p-tag-icon-display":s?"":"none","--p-tag-icon-margin":s?"-2px":""}}function l(){const o=r.icon||"none";return o==="none"||o===""?"":o}function d(){return r.iconSource||""}return n.jsxs("div",{className:["p-tag",r.className].filter(Boolean).join(" "),"data-pds":"tag",style:p(),children:[n.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-tag :where([data-pds-slot]){display:contents}

        .p-tag {
          display: inline-flex;
          vertical-align: top;
          white-space: nowrap;
        }
        .p-tag[hidden] {
          display: none !important;
        }
        .p-tag span{
          position: relative;
          display: flex;
          gap: 2px;
          padding: var(--p-tag-pad);
          border-radius: var(--p-tag-radius);
          font: var(--p-font-weight-normal) var(--p-typescale-xs) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          -webkit-backdrop-filter: var(--p-tag-blur);
          backdrop-filter: var(--p-tag-blur);
          color: var(--p-tag-color);
          background: var(--p-tag-bg);
          transition: color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            background-color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            backdrop-filter var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
        }
        .p-tag [data-pds-slot] > a,
        .p-tag [data-pds-slot] > button{
          all: unset !important;
          text-decoration: underline !important;
          cursor: pointer !important;
          font: inherit !important;
          color: inherit !important;
        }
        .p-tag [data-pds-slot] > a::before,
        .p-tag [data-pds-slot] > button::before{
          content: "" !important;
          position: absolute !important;
          inset: 0 !important;
          border-radius: var(--p-radius-full) !important;
        }
        .p-tag [data-pds-slot] > a:focus-visible::before,
        .p-tag [data-pds-slot] > button:focus-visible::before{
          outline: 2px solid var(--p-color-focus) !important;
          outline-offset: 2px !important;
        }
        .p-tag [data-pds-slot] > br{
          display: none !important;
        }
        @media (forced-colors: active) {
          .p-tag span{
            outline: 2px solid CanvasText;
            outline-offset: -2px;
            background-color: Canvas;
            color: CanvasText;
          }
          .p-tag [data-pds-slot] > a:focus-visible::before,
          .p-tag [data-pds-slot] > button:focus-visible::before{
            outline-color: Highlight !important;
          }
        }
        @media (hover: hover) {
          .p-tag span:hover{
            background: var(--p-tag-hover);
          }
        }
        .p-tag .p-icon{
          display: var(--p-tag-icon-display, unset);
          margin-inline-start: var(--p-tag-icon-margin, unset);
        }`}}),n.jsx(n.Fragment,{children:n.jsxs("span",{children:[n.jsx(f,{className:"icon",color:"inherit",size:"x-small","aria-hidden":"true",name:l(),source:d()}),n.jsx("span",{"data-pds-slot":"",children:r.children})]})})]})}export{w as default};
