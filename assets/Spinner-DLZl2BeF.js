import{j as e}from"./react-C3neMvrl.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const o={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},c={primary:"var(--p-color-primary)",inherit:"currentcolor"},f=["base","xs","s","m","l","xl","xxl"],t=n=>o[String(n)]||o.sm,v=n=>{if(n==null||n==="")return"sm";if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return n},d=(n,i,a)=>{const r=a==="inherit"?"":a;if(i==="base"){n["--p-spinner-fs"]=r;return}n[`--p-spinner-fs-${i}`]=r};function u(n){function i(){const r={"--p-spinner-fallback":c[n.color||"primary"]||c.primary},s=v(n.size);if(typeof s=="object"&&s!==null){let l=t(s.base||"sm");for(const p of f)s[p]!==void 0&&(l=t(s[p])),d(r,p,l)}else d(r,"base",t(s));return r}function a(){let r=n.aria;if(!r)return"";if(typeof r=="string")try{r=JSON.parse(r.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{r=null}return typeof r=="object"&&r!==null&&r["aria-label"]||""}return e.jsxs("div",{className:["p-spinner",n.className].filter(Boolean).join(" "),"data-pds":"spinner",style:i(),children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-spinner :where([data-pds-slot]){display:contents}

        .p-spinner {
          display: inline-flex;
          vertical-align: top;
        }
        .p-spinner[hidden] {
          display: none !important;
        }
        @keyframes rotate {
          0% {
            transform: rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg);
          }
        }
        @keyframes dash {
          0% {
            stroke-dashoffset: 69;
            transform: rotateZ(0);
          }
          50%,
          75% {
            stroke-dashoffset: 24;
            transform: rotateZ(80deg);
          }
          100% {
            stroke-dashoffset: 69;
            transform: rotateZ(360deg);
          }
        }
        .p-spinner div{
          width: var(--p-spinner-size, var(--p-leading-normal));
          height: var(--p-spinner-size, var(--p-leading-normal));
          font-family: var(--p-font-porsche-next);
          font-size: inherit;
          font-size: var(--p-spinner-fs);
        }
        .p-spinner svg{
          display: block;
          fill: none;
          stroke-width: 1.5;
          animation: rotate var(--p-animation-duration, var(--p-duration-xl))
            steps(50) infinite;
        }
        .p-spinner circle:first-child{
          stroke: var(--p-spinner-track-color, var(--p-color-contrast-lower));
        }
        .p-spinner circle:last-child{
          stroke: var(
            --p-spinner-color,
            var(--p-spinner-fallback, var(--p-color-primary))
          );
          stroke-dasharray: var(--p-temporary-spinner-stroke-dasharray, 69);
          stroke-linecap: round;
          animation: dash var(--p-animation-duration, var(--p-duration-xl))
            steps(50) infinite;
        }
        @media (forced-colors: active) {
          .p-spinner circle:last-child{
            stroke: CanvasText;
          }
          .p-spinner circle:first-child{
            stroke: none !important;
          }
        }
        @supports (color: oklch(from red l c h)) {
          .p-spinner circle:first-child{
            stroke: var(
              --p-spinner-track-color,
              oklch(
                from
                  var(
                    --p-spinner-color,
                    var(--p-spinner-fallback, var(--p-color-primary))
                  )
                  l c h/.2
              )
            );
          }
        }
        .p-spinner span,
        .p-spinner .sr-only{
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }
        @media (min-width: 480px) {
          .p-spinner div{
            font-size: var(--p-spinner-fs-xs, var(--p-spinner-fs));
          }
        }
        @media (min-width: 760px) {
          .p-spinner div{
            font-size: var(--p-spinner-fs-s, var(--p-spinner-fs));
          }
        }
        @media (min-width: 1000px) {
          .p-spinner div{
            font-size: var(--p-spinner-fs-m, var(--p-spinner-fs));
          }
        }
        @media (min-width: 1300px) {
          .p-spinner div{
            font-size: var(--p-spinner-fs-l, var(--p-spinner-fs));
          }
        }
        @media (min-width: 1760px) {
          .p-spinner div{
            font-size: var(--p-spinner-fs-xl, var(--p-spinner-fs));
          }
        }
        @media (min-width: 1920px) {
          .p-spinner div{
            font-size: var(--p-spinner-fs-xxl, var(--p-spinner-fs));
          }
        }`}}),e.jsxs(e.Fragment,{children:[" ",e.jsxs("div",{role:"alert","aria-live":"assertive","aria-label":a(),children:[e.jsx("span",{className:"sr-only"}),e.jsxs("svg",{viewBox:"-16 -16 32 32",width:"100%",height:"100%",focusable:"false","aria-hidden":"true",children:[e.jsx("circle",{r:"11"}),e.jsx("circle",{r:"11"})]})]})," "," "]})]})}export{u as default};
