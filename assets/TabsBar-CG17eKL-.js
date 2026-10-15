import{j as s}from"./react-C3neMvrl.js";import{h as m}from"./host-DRskmCSE.js";import g from"./Scroller-Ckh7Friq.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const b=["base","xs","s","m","l","xl","xxl"],f=(a,n)=>{if(a==null||a==="")return n;if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return n}return a},u=(a,n,c)=>a&&typeof a=="object"?a[n]===void 0?c:a[n]:a;function N(a){function n(){const p=(t=>t===!0||t==="true"||t==="")(a.compact),l=a.background||"none",e=l!=="none",i=f(a.size,"small"),d=t=>t==="medium"?"var(--p-typescale-md)":"var(--p-typescale-sm)",r={"--p-tb-radius":e?p?"var(--p-radius-md)":"var(--p-radius-lg)":p?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-tb-pad":e?p?"calc(7 * var(--p-spacing-static-2xs) - var(--p-spacing-static-xs)) calc(var(--p-spacing-static-md) - var(--p-spacing-static-xs))":"calc(var(--p-spacing-static-md) - var(--p-spacing-static-xs)) calc(28 * var(--p-spacing-static-2xs) - var(--p-spacing-static-xs))":p?"calc(6 * var(--p-spacing-static-2xs)) var(--p-spacing-static-md)":"var(--p-spacing-static-md) calc(28 * var(--p-spacing-static-2xs))"};if(typeof i=="object"&&i!==null){let t=String(u(i,"base","small")||"small");for(const o of b){i[o]!==void 0&&(t=String(u(i,o,t)));const v=o==="base"?"--p-tb-fs":`--p-tb-fs-${o}`;r[v]=d(t)}}else{const t=d(i);r["--p-tb-fs"]=t;for(const o of b)o!=="base"&&(r[`--p-tb-fs-${o}`]=t)}if(e){const t={canvas:"var(--p-color-canvas)",surface:"var(--p-color-surface)",frosted:"var(--p-color-frosted)"};r["--p-tb-scroller-bg"]=t[l]||"",r["--p-tb-scroller-pad"]=p?"calc(3 * var(--p-spacing-static-2xs))":"var(--p-spacing-static-xs)",r["--p-tb-scroller-radius"]=p?"var(--p-radius-lg)":"var(--p-radius-xl)"}else r["--p-tb-scroller-bg"]="",r["--p-tb-scroller-pad"]="",r["--p-tb-scroller-radius"]="";return r}return s.jsxs("div",{className:["p-tabs-bar",a.className].filter(Boolean).join(" "),"data-pds":"tabs-bar",style:n(),...m({background:a.background}),children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-tabs-bar :where([data-pds-slot]){display:contents}

        .p-tabs-bar {
          display: grid;
        }
        .p-tabs-bar[hidden] {
          display: none !important;
        }
        .p-tabs-bar .wrap{
          display: contents;
        }
        .p-tabs-bar [data-pds-slot] > a,
        .p-tabs-bar [data-pds-slot] > button{
          all: unset !important;
          white-space: nowrap !important;
          cursor: pointer !important;
          border-radius: var(--p-tb-radius) !important;
          padding: var(--p-tb-pad) !important;
          font: var(--p-typescale-sm) / var(--p-leading-normal)
            var(--p-font-porsche-next) !important;
          font-size: var(--p-tb-fs) !important;
          color: var(--p-color-primary) !important;
          background: 0 0 / 0% 100% no-repeat !important;
          transition: background-color var(--p-duration-sm) var(--p-ease-in-out) !important;
        }
        .p-tabs-bar [data-pds-slot] > a:focus-visible,
        .p-tabs-bar [data-pds-slot] > button:focus-visible{
          outline: 2px solid var(--p-color-focus) !important;
          outline-offset: 2px !important;
        }
        .p-tabs-bar [data-pds-slot] > a[aria-current="true"],
        .p-tabs-bar [data-pds-slot] > button[aria-selected="true"]{
          background-image: linear-gradient(
            var(--p-color-frosted-strong),
            var(--p-color-frosted-strong)
          ) !important;
          background-size: 100% 100% !important;
          transition: background-size 0s linear var(--p-duration-md) !important;
        }
        @media (forced-colors: active) {
          .p-tabs-bar [data-pds-slot] > a,
          .p-tabs-bar [data-pds-slot] > button{
            forced-color-adjust: none !important;
            background: Canvas !important;
          }
          .p-tabs-bar [data-pds-slot] > a{
            color: LinkText !important;
            box-shadow: inset 0 0 0 2px LinkText !important;
          }
          .p-tabs-bar [data-pds-slot] > button{
            color: ButtonText !important;
            box-shadow: inset 0 0 0 2px ButtonBorder !important;
          }
          .p-tabs-bar [data-pds-slot] > a:focus-visible,
          .p-tabs-bar [data-pds-slot] > button:focus-visible{
            outline-color: Highlight !important;
          }
          .p-tabs-bar .bar{
            display: none;
          }
          .p-tabs-bar[background]:not([background="none"]) .scroller {
            forced-color-adjust: none;
            outline: 1px solid CanvasText;
          }
        }
        @media (hover: hover) {
          .p-tabs-bar [data-pds-slot] > a:not([aria-current="true"]):hover,
          .p-tabs-bar [data-pds-slot] > button:not([aria-selected="true"]):hover{
            background-color: var(--p-color-frosted) !important;
          }
        }
        .p-tabs-bar .scroller{
          --_p-scroller-focus-ring-radius: var(--p-tb-radius);
          place-self: flex-start;
        }
        .p-tabs-bar[background]:not([background="none"]) .scroller {
          background: var(--p-tb-scroller-bg);
          padding: var(--p-tb-scroller-pad);
          border-radius: var(--p-tb-scroller-radius);
        }
        .p-tabs-bar[background="frosted"] .scroller {
          -webkit-backdrop-filter: var(--p-blur-frosted);
          backdrop-filter: var(--p-blur-frosted);
        }
        .p-tabs-bar .bar{
          position: absolute;
          inset-inline-start: 0;
          width: 0px;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          border-radius: var(--p-tb-radius);
          background: var(--p-color-frosted-strong);
        }`}}),s.jsxs(s.Fragment,{children:[" ",s.jsx("div",{className:"wrap",children:s.jsxs(g,{className:"scroller",children:[s.jsx("span",{"data-pds-slot":"",children:a.children}),s.jsx("span",{className:"bar"})]})})," "," "]})]})}export{N as default};
