import{j as t}from"./react-C3neMvrl.js";import{h as u}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const l=["base","xs","s","m","l","xl","xxl"],m=(n,i)=>{if(n==null||n==="")return i;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return i}return n},s=(n,i,a)=>n&&typeof n=="object"?n[i]===void 0?a:n[i]:n;function k(n){function i(){const r=m(n.aspectRatio,"3/4"),p={};if(typeof r=="object"&&r!==null){let o=s(r,"base","3/4");for(const e of l){r[e]!==void 0&&(o=s(r,e,o));const c=e==="base"?"":`-${e}`;p[`--p-ltp-ar${c}`]=String(o)}}else for(const o of l){const e=o==="base"?"":`-${o}`;p[`--p-ltp-ar${e}`]=String(r||"3/4")}return p}function a(){return n.heading||""}function d(){return n.price||""}return t.jsxs("div",{className:["p-link-tile-product",n.className].filter(Boolean).join(" "),"data-pds":"link-tile-product",style:i(),...u({href:n.href,"like-button":n.likeButton,"price-original":n.priceOriginal},["like-button"]),children:[t.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-link-tile-product :where([data-pds-slot]){display:contents}

        .p-link-tile-product {
          display: block;
          position: relative;
        }
        .p-link-tile-product[hidden] {
          display: none !important;
        }
        .p-link-tile-product [data-pds-slot="header"]{
          display: block;
        }
        .p-link-tile-product [data-pds-slot] > [slot="header"]{
          display: flex !important;
          flex-wrap: wrap !important;
          gap: var(--p-spacing-fluid-xs) !important;
        }
        .p-link-tile-product [data-pds-slot] > :is(img, picture){
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          border-radius: var(--p-radius-2xl) !important;
          overflow: hidden !important;
        }
        .p-link-tile-product:not([href]) [data-pds-slot] > a[slot="anchor"] {
          position: absolute !important;
          inset: 0 !important;
          z-index: 1 !important;
          border-radius: var(--p-radius-3xl) !important;
          text-indent: -999999px !important;
        }
        .p-link-tile-product:not([href]) [data-pds-slot] > a[slot="anchor"]:focus-visible {
          outline: 2px solid var(--p-color-focus) !important;
          outline-offset: 2px !important;
        }
        .p-link-tile-product[price-original] s {
          color: var(--p-color-contrast-medium);
        }
        .p-link-tile-product .root{
          display: flex;
          flex-direction: column;
          aspect-ratio: var(--p-ltp-ar);
          overflow: hidden;
          box-sizing: border-box;
          border-radius: var(--p-radius-3xl);
          padding: var(--p-spacing-fluid-sm);
          color: var(--p-color-primary);
          background-color: var(--p-color-surface);
        }
        .p-link-tile-product[href] .anchor {
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: var(--p-radius-3xl);
        }
        .p-link-tile-product[href] .anchor:focus-visible {
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-link-tile-product .header{
          display: flex;
          gap: var(--p-spacing-fluid-sm);
          justify-content: space-between;
          align-items: flex-start;
        }
        .p-link-tile-product .button{
          position: relative;
          z-index: 2;
        }
        .p-link-tile-product[like-button="false"] .button {
          display: none;
        }
        .p-link-tile-product .image{
          aspect-ratio: 8 / 9;
          margin: var(--p-spacing-fluid-sm) auto var(--p-spacing-fluid-xs);
          overflow: hidden;
          transition: transform
            var(--p-transition-duration, var(--p-duration-md))
            var(--p-ease-in-out);
        }
        .p-link-tile-product .wrapper{
          display: flex;
          flex-direction: column;
          margin: auto;
          text-align: center;
        }
        .p-link-tile-product .heading{
          margin: 0 0 2px;
          font: var(--p-font-weight-semibold) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .p-link-tile-product .price{
          margin: 0;
          font: var(--p-font-weight-normal) var(--p-typescale-xs) /
            var(--p-leading-normal) var(--p-font-porsche-next);
        }
        .p-link-tile-product[price-original] .price {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: var(--p-spacing-fluid-xs);
        }
        .p-link-tile-product .description{
          margin: 0;
          font: var(--p-font-weight-normal) var(--p-typescale-2xs) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-color-contrast-high);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .p-link-tile-product .sr-only{
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }
        @media (min-width: 760px) {
          .p-link-tile-product .image{
            padding: 0 var(--p-spacing-fluid-md);
          }
          .p-link-tile-product .root{
            aspect-ratio: var(--p-ltp-ar-s, var(--p-ltp-ar));
          }
        }
        @media (min-width: 480px) {
          .p-link-tile-product .root{
            aspect-ratio: var(--p-ltp-ar-xs, var(--p-ltp-ar));
          }
        }
        @media (min-width: 1000px) {
          .p-link-tile-product .root{
            aspect-ratio: var(--p-ltp-ar-m, var(--p-ltp-ar));
          }
        }
        @media (min-width: 1300px) {
          .p-link-tile-product .root{
            aspect-ratio: var(--p-ltp-ar-l, var(--p-ltp-ar));
          }
        }
        @media (min-width: 1760px) {
          .p-link-tile-product .root{
            aspect-ratio: var(--p-ltp-ar-xl, var(--p-ltp-ar));
          }
        }
        @media (min-width: 1920px) {
          .p-link-tile-product .root{
            aspect-ratio: var(--p-ltp-ar-xxl, var(--p-ltp-ar));
          }
        }
        @media (forced-colors: active) {
          .p-link-tile-product:not([href]) [data-pds-slot] > a[slot="anchor"]:focus-visible {
            outline-color: Highlight !important;
          }
          .p-link-tile-product:not([href]) [data-pds-slot] > a[slot="anchor"] {
            forced-color-adjust: none !important;
            box-shadow: inset 0 0 0 2px LinkText !important;
          }
          .p-link-tile-product[href] .anchor {
            forced-color-adjust: none;
            box-shadow: inset 0 0 0 2px LinkText;
          }
          .p-link-tile-product[href] .anchor:focus-visible {
            outline-color: Highlight;
          }
        }
        @media (hover: hover) {
          .p-link-tile-product .root:hover .image{
            transform: scale3d(1.05, 1.05, 1.05);
          }
        }`}}),t.jsxs(t.Fragment,{children:[" ",t.jsxs("div",{className:"root",children:[t.jsx("div",{className:"image",children:t.jsx("span",{"data-pds-slot":"",children:n.children})}),t.jsxs("div",{className:"wrapper",children:[t.jsx("h3",{className:"heading",children:a()}),t.jsx("p",{className:"price",children:d()})]})]})," "," "]})]})}export{k as default};
