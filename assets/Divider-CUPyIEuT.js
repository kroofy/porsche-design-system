import{j as e}from"./react-C3neMvrl.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const p={"contrast-lower":"var(--p-color-contrast-lower)","contrast-low":"var(--p-color-contrast-low)","contrast-medium":"var(--p-color-contrast-medium)","contrast-high":"var(--p-color-contrast-high)"},h=["base","xs","s","m","l","xl","xxl"],v=i=>i==="vertical"?{h:"100%",w:"1px"}:{h:"1px",w:"100%"},s=i=>{if(i==null||i==="")return"horizontal";if(typeof i=="string"&&i.charAt(0)==="{")try{return JSON.parse(i)}catch{return"horizontal"}return i},o=(i,n,r)=>{if(n==="base"){i["--p-divider-h"]=r.h,i["--p-divider-w"]=r.w;return}i[`--p-divider-h-${n}`]=r.h,i[`--p-divider-w-${n}`]=r.w};function m(i){function n(){const r={"--p-divider-bg":p[i.color||"contrast-lower"]||p["contrast-lower"]},d=s(i.direction);if(typeof d=="object"&&d!==null){let a=v(d.base||"horizontal");for(const t of h)d[t]!==void 0&&(a=v(d[t])),o(r,t,a)}else o(r,"base",v(String(d)));return r}return e.jsxs("div",{className:["p-divider",i.className].filter(Boolean).join(" "),"data-pds":"divider",style:n(),children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-divider :where([data-pds-slot]){display:contents}

        .p-divider {
          display: block;
        }
        .p-divider[hidden] {
          display: none !important;
        }
        .p-divider hr{
          all: unset;
          display: block;
          background: var(--p-divider-bg);
          height: var(--p-divider-h, 1px);
          width: var(--p-divider-w, 100%);
        }
        @media (forced-colors: active) {
          .p-divider hr{
            background: CanvasText;
          }
        }
        @media (min-width: 480px) {
          .p-divider hr{
            height: var(--p-divider-h-xs, var(--p-divider-h, 1px));
            width: var(--p-divider-w-xs, var(--p-divider-w, 100%));
          }
        }
        @media (min-width: 760px) {
          .p-divider hr{
            height: var(--p-divider-h-s, var(--p-divider-h, 1px));
            width: var(--p-divider-w-s, var(--p-divider-w, 100%));
          }
        }
        @media (min-width: 1000px) {
          .p-divider hr{
            height: var(--p-divider-h-m, var(--p-divider-h, 1px));
            width: var(--p-divider-w-m, var(--p-divider-w, 100%));
          }
        }
        @media (min-width: 1300px) {
          .p-divider hr{
            height: var(--p-divider-h-l, var(--p-divider-h, 1px));
            width: var(--p-divider-w-l, var(--p-divider-w, 100%));
          }
        }
        @media (min-width: 1760px) {
          .p-divider hr{
            height: var(--p-divider-h-xl, var(--p-divider-h, 1px));
            width: var(--p-divider-w-xl, var(--p-divider-w, 100%));
          }
        }
        @media (min-width: 1920px) {
          .p-divider hr{
            height: var(--p-divider-h-xxl, var(--p-divider-h, 1px));
            width: var(--p-divider-w-xxl, var(--p-divider-w, 100%));
          }
        }`}}),e.jsx(e.Fragment,{children:e.jsx("hr",{})})]})}export{m as default};
