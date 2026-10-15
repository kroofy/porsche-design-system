import{j as r}from"./react-C3neMvrl.js";import f from"./Scroller-Ckh7Friq.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const l=["base","xs","s","m","l","xl","xxl"],c=(s,n)=>{if(s==null||s==="")return n;if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return n}return s},i=(s,n,e)=>s&&typeof s=="object"?s[n]===void 0?e:s[n]:s,o=s=>s==="medium"?"var(--p-typescale-md)":"var(--p-typescale-sm)",h=(s,n,e)=>{if(n==="base"){s["--p-sh-fs"]=e;return}s[`--p-sh-fs-${n}`]=e};function u(s){function n(){const e=c(s.size,"small"),a={};if(typeof e=="object"&&e!==null){let p=o(i(e,"base","small"));for(const t of l)e[t]!==void 0&&(p=o(i(e,t,"small"))),h(a,t,p)}else{const p=o(e);for(const t of l)h(a,t,p)}return a}return r.jsxs("div",{className:["p-stepper-horizontal",s.className].filter(Boolean).join(" "),"data-pds":"stepper-horizontal",style:n(),children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-stepper-horizontal :where([data-pds-slot]){display:contents}

        .p-stepper-horizontal {
          display: grid;
        }
        .p-stepper-horizontal[hidden] {
          display: none !important;
        }
        .p-stepper-horizontal .wrap{
          display: contents;
        }
        .p-stepper-horizontal .scroller{
          place-self: flex-start;
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          font-size: var(--p-sh-fs, var(--p-typescale-sm));
        }
        @media (min-width: 480px) {
          .p-stepper-horizontal .scroller{
            font-size: var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm)));
          }
        }
        @media (min-width: 760px) {
          .p-stepper-horizontal .scroller{
            font-size: var(
              --p-sh-fs-s,
              var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm)))
            );
          }
        }
        @media (min-width: 1000px) {
          .p-stepper-horizontal .scroller{
            font-size: var(
              --p-sh-fs-m,
              var(
                --p-sh-fs-s,
                var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm)))
              )
            );
          }
        }
        @media (min-width: 1300px) {
          .p-stepper-horizontal .scroller{
            font-size: var(--p-sh-fs-l, var(--p-sh-fs-m));
          }
        }
        @media (min-width: 1760px) {
          .p-stepper-horizontal .scroller{
            font-size: var(--p-sh-fs-xl, var(--p-sh-fs-l));
          }
        }
        @media (min-width: 1920px) {
          .p-stepper-horizontal .scroller{
            font-size: var(--p-sh-fs-xxl, var(--p-sh-fs-xl));
          }
        }`}}),r.jsxs(r.Fragment,{children:[" ",r.jsx("div",{className:"wrap",children:r.jsx(f,{className:"scroller",children:r.jsx("span",{"data-pds-slot":"",children:s.children})})})," "," "]})]})}export{u as default};
