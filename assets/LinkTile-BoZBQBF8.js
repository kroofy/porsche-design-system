import{j as r}from"./react-C3neMvrl.js";import{h as z}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const b={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},y={regular:"var(--p-font-weight-normal)","semi-bold":"var(--p-font-weight-semibold)",normal:"var(--p-font-weight-normal)",semibold:"var(--p-font-weight-semibold)",bold:"var(--p-font-weight-bold)"},w=["base","xs","s","m","l","xl","xxl"],h=(n,l)=>{if(n==null)return l;if(n==="")return typeof l=="boolean"?!0:l;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return l}return n==="true"?!0:n==="false"?!1:n},s=(n,l,c)=>n&&typeof n=="object"?n[l]===void 0?c:n[l]:n,$=n=>n==="inherit"?"":b[String(n)]||b.medium,S=n=>y[String(n)]||y["semi-bold"],j=(n,l,c,e,p,o)=>{const t=l==="base"?"":`-${l}`,a=o===!0||o==="true";n[`--p-lt-fs${t}`]=$(c),n[`--p-lt-fw${t}`]=S(e),n[`--p-lt-ar${t}`]=String(p||"4/3"),n[`--p-lt-foot-d${t}`]=a?"grid":"flex",n[`--p-lt-foot-cols${t}`]=a?"minmax(0, 1fr) auto":"none",n[`--p-lt-foot-gap${t}`]=a?"var(--p-spacing-static-md)":"0",n[`--p-lt-foot-dir${t}`]=a?"row":"column",n[`--p-lt-foot-ai${t}`]=a?"stretch":"start",n[`--p-lt-pure-d${t}`]=a?"inline-block":"none",n[`--p-lt-btn-d${t}`]=a?"none":"inline-block"};function I(n){function l(){const e=h(n.size,"medium"),p=h(n.weight,"semi-bold"),o=h(n.aspectRatio,"4/3");let t=h(n.compact,!1);n.compact==="true"&&(t=!0),n.compact==="false"&&(t=!1);const a={"--p-lt-pure-row":"1 / 2"};if(typeof e=="object"||typeof p=="object"||typeof o=="object"||typeof t=="object"){const d=typeof e=="object"&&e!==null?e:null,f=typeof p=="object"&&p!==null?p:null,v=typeof o=="object"&&o!==null?o:null,m=typeof t=="object"&&t!==null?t:null;let u=d?s(d,"base","medium"):e,x=f?s(f,"base","semi-bold"):p,g=v?s(v,"base","4/3"):o,k=m?s(m,"base",!1):t;for(const i of w)d&&d[i]!==void 0&&(u=s(d,i,u)),f&&f[i]!==void 0&&(x=s(f,i,x)),v&&v[i]!==void 0&&(g=s(v,i,g)),m&&m[i]!==void 0&&(k=s(m,i,k)),j(a,i,u,x,g,k)}else for(const d of w)j(a,d,e,p,o,t);return a}function c(){return n.description||""}return r.jsxs("div",{className:["p-link-tile",n.className].filter(Boolean).join(" "),"data-pds":"link-tile",style:l(),...z({align:n.align,gradient:n.gradient}),children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-link-tile :where([data-pds-slot]){display:contents}

        .p-link-tile {
          display: flex;
          align-items: stretch;
          color-scheme: dark;
          hyphens: auto;
        }
        .p-link-tile[hidden] {
          display: none !important;
        }
        .p-link-tile [data-pds-slot]{
          display: block;
        }
        .p-link-tile [data-pds-slot]:not([name]){
          width: 100%;
          height: 100%;
          transition: transform
            var(--p-transition-duration, var(--p-duration-md))
            var(--p-ease-in-out);
        }
        .p-link-tile [data-pds-slot="header"]{
          grid-area: 2 / 2;
          z-index: 5;
        }
        .p-link-tile[align="top"] [data-pds-slot="header"] {
          grid-area: 4 / 2;
        }
        .p-link-tile [data-pds-slot="footer"]{
          grid-row: 2;
          z-index: 3;
        }
        .p-link-tile [data-pds-slot] > :is(img, video, picture){
          display: block !important;
          width: 100% !important;
          height: 100% !important;
        }
        .p-link-tile [data-pds-slot] > :is(img, video){
          object-fit: cover !important;
        }
        .p-link-tile a{
          grid-area: 1 / 1 / -1 / -1;
          z-index: 4;
          outline: 0;
        }
        .p-link-tile p{
          all: unset;
          z-index: 3;
          max-width: 34.375rem;
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-color-primary);
          hyphens: inherit;
          font-size: inherit;
          font-size: var(--p-lt-fs);
          font-weight: var(--p-lt-fw);
        }
        @supports (-webkit-hyphens: auto) {
          .p-link-tile {
            align-items: baseline;
          }
        }
        .p-link-tile .root{
          display: grid;
          grid-template: var(--p-spacing-fluid-md) auto minmax(0px, 1fr) auto var(
              --p-spacing-fluid-md
            ) / var(--p-spacing-fluid-md) minmax(0px, 1fr) var(
              --p-spacing-fluid-md
            );
          width: 100%;
          border-radius: var(--p-radius-3xl);
          aspect-ratio: var(--p-lt-ar);
        }
        .p-link-tile .root::after{
          content: "";
          z-index: 2;
          grid-area: 4 / 1 / 6 / -1;
          background: linear-gradient(
            to top,
            hsla(from var(--p-color-canvas) h s l / 0.8) 0%,
            hsla(from var(--p-color-canvas) h s l / 0.8) 8.1%,
            hsla(from var(--p-color-canvas) h s l / 0.8) 15.5%,
            hsla(from var(--p-color-canvas) h s l / 0.8) 22.5%,
            hsla(from var(--p-color-canvas) h s l / 0.78) 29%,
            hsla(from var(--p-color-canvas) h s l / 0.73) 35.3%,
            hsla(from var(--p-color-canvas) h s l / 0.67) 41.2%,
            hsla(from var(--p-color-canvas) h s l / 0.6) 47.1%,
            hsla(from var(--p-color-canvas) h s l / 0.52) 52.9%,
            hsla(from var(--p-color-canvas) h s l / 0.44) 58.8%,
            hsla(from var(--p-color-canvas) h s l / 0.33) 64.7%,
            hsla(from var(--p-color-canvas) h s l / 0.22) 71%,
            hsla(from var(--p-color-canvas) h s l / 0.12) 77.5%,
            hsla(from var(--p-color-canvas) h s l / 0.05) 84.5%,
            hsla(from var(--p-color-canvas) h s l / 0.011) 91.9%,
            hsla(from var(--p-color-canvas) h s l / 0) 100%
          );
          margin-top: calc(var(--p-spacing-fluid-lg) * -1);
          border-end-start-radius: inherit;
          border-end-end-radius: inherit;
        }
        .p-link-tile[align="top"] .root::after {
          grid-area: 1 / 1 / 3 / -1;
          background: linear-gradient(
            to bottom,
            hsla(from var(--p-color-canvas) h s l / 0.8) 0%,
            hsla(from var(--p-color-canvas) h s l / 0.8) 8.1%,
            hsla(from var(--p-color-canvas) h s l / 0.8) 15.5%,
            hsla(from var(--p-color-canvas) h s l / 0.8) 22.5%,
            hsla(from var(--p-color-canvas) h s l / 0.78) 29%,
            hsla(from var(--p-color-canvas) h s l / 0.73) 35.3%,
            hsla(from var(--p-color-canvas) h s l / 0.67) 41.2%,
            hsla(from var(--p-color-canvas) h s l / 0.6) 47.1%,
            hsla(from var(--p-color-canvas) h s l / 0.52) 52.9%,
            hsla(from var(--p-color-canvas) h s l / 0.44) 58.8%,
            hsla(from var(--p-color-canvas) h s l / 0.33) 64.7%,
            hsla(from var(--p-color-canvas) h s l / 0.22) 71%,
            hsla(from var(--p-color-canvas) h s l / 0.12) 77.5%,
            hsla(from var(--p-color-canvas) h s l / 0.05) 84.5%,
            hsla(from var(--p-color-canvas) h s l / 0.011) 91.9%,
            hsla(from var(--p-color-canvas) h s l / 0) 100%
          );
          margin-top: 0;
          margin-bottom: calc(var(--p-spacing-fluid-lg) * -1);
          border-end-start-radius: 0;
          border-end-end-radius: 0;
          border-start-start-radius: inherit;
          border-start-end-radius: inherit;
        }
        .p-link-tile:not([gradient]) .root::after {
          content: none;
        }
        .p-link-tile .media{
          position: relative;
          grid-area: 1 / 1 / -1 / -1;
          z-index: 1;
          overflow: hidden;
          border-radius: inherit;
        }
        .p-link-tile .footer{
          grid-area: 4 / 2;
          display: var(--p-lt-foot-d);
          grid-template-columns: var(--p-lt-foot-cols);
          column-gap: var(--p-lt-foot-gap);
          flex-direction: var(--p-lt-foot-dir);
          align-items: var(--p-lt-foot-ai);
        }
        .p-link-tile[align="top"] .footer {
          grid-area: 2 / 2;
        }
        .p-link-tile .link-or-button-pure{
          z-index: 5;
          grid-column: 2;
          grid-row: var(--p-lt-pure-row);
          align-self: flex-end;
          display: var(--p-lt-pure-d);
        }
        .p-link-tile[align="top"] .link-or-button-pure {
          align-self: flex-start;
        }
        .p-link-tile .link-or-button{
          min-height: 54px;
          z-index: 5;
          margin-top: var(--p-spacing-static-md);
          display: var(--p-lt-btn-d);
        }
        @media (hover: hover) {
          .p-link-tile .root:hover [data-pds-slot]:not([name]){
            transform: scale3d(1.05, 1.05, 1.05);
          }
        }
        @supports (-webkit-hyphens: auto) {
          .p-link-tile .root{
            height: 100%;
          }
        }
        @media (min-width: 480px) {
          .p-link-tile .root{
            aspect-ratio: var(--p-lt-ar-xs, var(--p-lt-ar));
          }
          .p-link-tile p{
            font-size: var(--p-lt-fs-xs, var(--p-lt-fs));
            font-weight: var(--p-lt-fw-xs, var(--p-lt-fw));
          }
          .p-link-tile .footer{
            display: var(--p-lt-foot-d-xs);
            grid-template-columns: var(--p-lt-foot-cols-xs);
            column-gap: var(--p-lt-foot-gap-xs);
            flex-direction: var(--p-lt-foot-dir-xs);
            align-items: var(--p-lt-foot-ai-xs);
          }
          .p-link-tile .link-or-button-pure{
            display: var(--p-lt-pure-d-xs);
          }
          .p-link-tile .link-or-button{
            display: var(--p-lt-btn-d-xs);
          }
        }
        @media (min-width: 760px) {
          .p-link-tile .root{
            aspect-ratio: var(--p-lt-ar-s, var(--p-lt-ar));
          }
          .p-link-tile p{
            font-size: var(--p-lt-fs-s, var(--p-lt-fs));
            font-weight: var(--p-lt-fw-s, var(--p-lt-fw));
          }
          .p-link-tile .footer{
            display: var(--p-lt-foot-d-s);
            grid-template-columns: var(--p-lt-foot-cols-s);
            column-gap: var(--p-lt-foot-gap-s);
            flex-direction: var(--p-lt-foot-dir-s);
            align-items: var(--p-lt-foot-ai-s);
          }
          .p-link-tile .link-or-button-pure{
            display: var(--p-lt-pure-d-s);
          }
          .p-link-tile .link-or-button{
            display: var(--p-lt-btn-d-s);
          }
        }
        @media (min-width: 1000px) {
          .p-link-tile .root{
            aspect-ratio: var(--p-lt-ar-m, var(--p-lt-ar));
          }
          .p-link-tile p{
            font-size: var(--p-lt-fs-m, var(--p-lt-fs));
            font-weight: var(--p-lt-fw-m, var(--p-lt-fw));
          }
          .p-link-tile .footer{
            display: var(--p-lt-foot-d-m);
            grid-template-columns: var(--p-lt-foot-cols-m);
            column-gap: var(--p-lt-foot-gap-m);
            flex-direction: var(--p-lt-foot-dir-m);
            align-items: var(--p-lt-foot-ai-m);
          }
          .p-link-tile .link-or-button-pure{
            display: var(--p-lt-pure-d-m);
          }
          .p-link-tile .link-or-button{
            display: var(--p-lt-btn-d-m);
          }
        }
        @media (min-width: 1300px) {
          .p-link-tile .root{
            aspect-ratio: var(--p-lt-ar-l, var(--p-lt-ar));
          }
          .p-link-tile p{
            font-size: var(--p-lt-fs-l, var(--p-lt-fs));
            font-weight: var(--p-lt-fw-l, var(--p-lt-fw));
          }
          .p-link-tile .footer{
            display: var(--p-lt-foot-d-l);
            grid-template-columns: var(--p-lt-foot-cols-l);
            column-gap: var(--p-lt-foot-gap-l);
            flex-direction: var(--p-lt-foot-dir-l);
            align-items: var(--p-lt-foot-ai-l);
          }
          .p-link-tile .link-or-button-pure{
            display: var(--p-lt-pure-d-l);
          }
          .p-link-tile .link-or-button{
            display: var(--p-lt-btn-d-l);
          }
        }
        @media (min-width: 1760px) {
          .p-link-tile .root{
            aspect-ratio: var(--p-lt-ar-xl, var(--p-lt-ar));
          }
          .p-link-tile p{
            font-size: var(--p-lt-fs-xl, var(--p-lt-fs));
            font-weight: var(--p-lt-fw-xl, var(--p-lt-fw));
          }
          .p-link-tile .footer{
            display: var(--p-lt-foot-d-xl);
            grid-template-columns: var(--p-lt-foot-cols-xl);
            column-gap: var(--p-lt-foot-gap-xl);
            flex-direction: var(--p-lt-foot-dir-xl);
            align-items: var(--p-lt-foot-ai-xl);
          }
          .p-link-tile .link-or-button-pure{
            display: var(--p-lt-pure-d-xl);
          }
          .p-link-tile .link-or-button{
            display: var(--p-lt-btn-d-xl);
          }
        }
        @media (min-width: 1920px) {
          .p-link-tile .root{
            aspect-ratio: var(--p-lt-ar-xxl, var(--p-lt-ar));
          }
          .p-link-tile p{
            font-size: var(--p-lt-fs-xxl, var(--p-lt-fs));
            font-weight: var(--p-lt-fw-xxl, var(--p-lt-fw));
          }
          .p-link-tile .footer{
            display: var(--p-lt-foot-d-xxl);
            grid-template-columns: var(--p-lt-foot-cols-xxl);
            column-gap: var(--p-lt-foot-gap-xxl);
            flex-direction: var(--p-lt-foot-dir-xxl);
            align-items: var(--p-lt-foot-ai-xxl);
          }
          .p-link-tile .link-or-button-pure{
            display: var(--p-lt-pure-d-xxl);
          }
          .p-link-tile .link-or-button{
            display: var(--p-lt-btn-d-xxl);
          }
        }`}}),r.jsxs(r.Fragment,{children:[" ",r.jsxs("div",{className:"root",children:[r.jsx("span",{"data-pds-slot":"header",children:n.header??null}),r.jsx("div",{className:"media",children:r.jsx("span",{"data-pds-slot":"",children:n.children})}),r.jsxs("div",{className:"footer",children:[r.jsx("p",{children:c()}),r.jsx("span",{"data-pds-slot":"footer",children:n.footer??null})]})]})," "," "]})]})}export{I as default};
