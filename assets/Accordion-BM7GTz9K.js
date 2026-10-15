import{j as o}from"./react-C3neMvrl.js";import{h as I}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const m=["base","xs","s","m","l","xl","xxl"],S=(a,n)=>{if(a==null)return n;if(a==="")return typeof n=="boolean"?!0:n;if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return n}return a},u=(a,n,v)=>a&&typeof a=="object"?a[n]===void 0?v:a[n]:a;function _(a){function n(){const s=r=>r===!0||r==="true"||r==="",x=s(a.open),h=s(a.compact),p=(a.alignMarker||"end")==="start",l=a.background||"none",i=S(a.indent,!1),e=S(a.size,"small"),f=h?.64285714:1,g="calc(28px * ("+f+" - 0.64285714) + 6px)",b="calc(11.2px * ("+f+" - 0.64285714) + 12px)",z="calc(11.2px * ("+f+" - 0.64285714) + 4px)",T=l==="none"?"0":g,C=l==="none"?"0":b,B=h?"var(--p-radius-xl)":"var(--p-radius-2xl)",k={canvas:"var(--p-color-canvas)",surface:"var(--p-color-surface)",frosted:"var(--p-color-frosted)",none:"transparent"},w=p?2:1,F=p?1:2,$=p?2:1,A=p?3:2,N=p?"auto minmax(0, 1fr)":"minmax(0, 1fr) auto",j=r=>r==="medium"?"var(--p-typescale-md)":"var(--p-typescale-sm)",y=r=>s(r)?String(w):"1",t={"--p-acc-gap":z,"--p-acc-py":T,"--p-acc-px":C,"--p-acc-py-fc":g,"--p-acc-px-fc":b,"--p-acc-radius":B,"--p-acc-bg":k[l]||k.none,"--p-acc-dur":x?"var(--p-transition-duration, var(--p-duration-md))":"var(--p-transition-duration, var(--p-duration-sm))","--p-acc-ease":x?"var(--p-ease-in)":"var(--p-ease-out)","--p-acc-pad-top":g,"--p-acc-cols":N,"--p-acc-summary-col":String(w),"--p-acc-icon-col":String(F),"--p-acc-before-col":String($),"--p-acc-after-col":String(A),"--p-acc-fc-off":l==="none"?"0":"-1px"};if(typeof e=="object"&&e!==null){let r=String(u(e,"base","small")||"small");for(const c of m){e[c]!==void 0&&(r=String(u(e,c,r)));const d=c==="base"?"--p-acc-fs":`--p-acc-fs-${c}`;t[d]=j(r)}}else{const r=j(e);t["--p-acc-fs"]=r;for(const c of m)c!=="base"&&(t[`--p-acc-fs-${c}`]=r)}if(typeof i=="object"&&i!==null){let r=s(u(i,"base",!1)),c=y(r);for(const d of m){i[d]!==void 0&&(r=s(u(i,d,r)),c=y(r));const O=d==="base"?"--p-acc-indent":`--p-acc-indent-${d}`;t[O]=c}}else{const r=y(i);t["--p-acc-indent"]=r;for(const c of m)c!=="base"&&(t[`--p-acc-indent-${c}`]=r)}return t}function v(){return a.heading||""}return o.jsxs("div",{className:["p-accordion",a.className].filter(Boolean).join(" "),"data-pds":"accordion",style:n(),...I({background:a.background,sticky:a.sticky}),children:[o.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-accordion :where([data-pds-slot]){display:contents}

        @keyframes overflow-hidden {
          from {
            overflow: hidden;
          }
          to {
            overflow: hidden;
          }
        }
        .p-accordion {
          display: block;
        }
        .p-accordion[hidden] {
          display: none !important;
        }
        .p-accordion [data-pds-slot="summary-before"],
        .p-accordion [data-pds-slot="summary"],
        .p-accordion [data-pds-slot="summary-after"]{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--p-acc-gap);
        }
        .p-accordion [data-pds-slot="summary-before"]{
          grid-area: 1 / var(--p-acc-before-col);
          z-index: 2;
        }
        .p-accordion [data-pds-slot="summary"]{
          grid-area: 1 / var(--p-acc-summary-col);
        }
        .p-accordion [data-pds-slot="summary-after"]{
          grid-area: 1 / var(--p-acc-after-col);
          z-index: 2;
        }
        .p-accordion [data-pds-slot]:not([name]){
          display: block;
          overflow: hidden;
          transform: translate3d(0, 0, 0);
        }
        .p-accordion details[open] [data-pds-slot]:not([name]){
          overflow: visible;
          animation: overflow-hidden var(--p-acc-dur);
        }
        .p-accordion h1,
        .p-accordion h2,
        .p-accordion h3,
        .p-accordion h4,
        .p-accordion h5,
        .p-accordion h6{
          all: unset;
          grid-area: 1 / var(--p-acc-summary-col);
          font: inherit;
          font-weight: var(--p-font-weight-semibold);
          font-size: var(--p-acc-fs);
        }
        .p-accordion details{
          all: unset;
          font: var(--p-typescale-sm) / var(--p-leading-normal)
            var(--p-font-porsche-next);
          color: var(--p-color-primary);
          display: grid;
          grid-template: repeat(2, auto) / var(--p-acc-cols);
          column-gap: var(--p-acc-gap);
          align-items: center;
          padding: var(--p-accordion-py, var(--p-acc-py))
            var(--p-accordion-px, var(--p-acc-px));
          background: var(--p-acc-bg);
          border-radius: var(--p-acc-radius);
        }
        .p-accordion[background="frosted"] details {
          -webkit-backdrop-filter: var(--p-blur-frosted);
          backdrop-filter: var(--p-blur-frosted);
        }
        .p-accordion details::details-content{
          display: contents !important;
          content-visibility: visible !important;
        }
        .p-accordion details > div{
          grid-area: 2/1 / auto/-1;
          grid-column-start: var(--p-acc-indent);
          z-index: 0;
          display: grid;
          opacity: 0;
          margin-top: 0px;
          grid-template-rows: 0fr;
          visibility: hidden;
          transition: visibility 0s linear var(--p-acc-dur),
            grid-template-rows var(--p-acc-dur) var(--p-acc-ease),
            padding-top var(--p-acc-dur) var(--p-acc-ease),
            opacity var(--p-acc-dur) var(--p-acc-ease);
        }
        .p-accordion details[open] > div{
          opacity: 1;
          padding-top: var(--p-acc-pad-top);
          z-index: 2;
          padding-inline: var(--p-accordion-px, var(--p-acc-px));
          margin-inline: calc(-1 * var(--p-accordion-px, var(--p-acc-px)));
          grid-template-rows: 1fr;
          visibility: inherit;
          transition: visibility 0s linear 0s,
            grid-template-rows var(--p-acc-dur) var(--p-acc-ease),
            margin-top var(--p-acc-dur) var(--p-acc-ease),
            opacity var(--p-acc-dur) var(--p-acc-ease);
        }
        .p-accordion summary{
          all: unset;
          grid-area: 1/1 / auto/-1;
          z-index: 1;
          display: grid;
          grid-template-columns: subgrid;
          align-items: center;
          cursor: pointer;
          padding: var(--p-accordion-py, var(--p-acc-py))
            var(--p-accordion-px, var(--p-acc-px));
          margin: calc(-1 * var(--p-accordion-py, var(--p-acc-py)))
            calc(-1 * var(--p-accordion-px, var(--p-acc-px)));
        }
        .p-accordion[sticky][background="canvas"] summary,
        .p-accordion[sticky][background="surface"] summary {
          position: sticky;
          top: var(
            --p-accordion-summary-top,
            var(--p-accordion-position-sticky-top, 0px)
          );
          background: linear-gradient(
            180deg,
            var(--p-acc-bg) 0%,
            var(--p-acc-bg) 90%,
            transparent 100%
          );
          border-radius: var(--p-acc-radius);
        }
        .p-accordion summary:focus-visible::before{
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-accordion summary::before{
          grid-area: 1 / var(--p-acc-icon-col);
          place-self: center;
          content: "";
          width: 1.5rem;
          height: 1.5rem;
          pointer-events: none;
          border-radius: var(--p-radius-full);
          background: transparent;
          transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        }
        .p-accordion summary::after{
          grid-area: 1 / var(--p-acc-icon-col);
          place-self: center;
          content: "";
          width: 1rem;
          height: 1rem;
          pointer-events: none;
          -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 15.125h-.001l-.005-.006-6.494-5.476.642-.768 5.858 4.94 5.858-4.94.642.769-6.497 5.477z"/></svg>')
            center/contain no-repeat;
          mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 15.125h-.001l-.005-.006-6.494-5.476.642-.768 5.858 4.94 5.858-4.94.642.769-6.497 5.477z"/></svg>')
            center/contain no-repeat;
          background: var(--p-color-primary);
          transform: rotate3d(0);
          transition: transform var(--p-acc-dur) var(--p-acc-ease);
        }
        .p-accordion details[open] summary::after{
          transform: rotate3d(0, 0, 1, 180deg);
        }
        @media (forced-colors: active) {
          .p-accordion details{
            outline: 1px solid CanvasText;
            outline-offset: var(--p-acc-fc-off);
            padding: var(--p-accordion-py, var(--p-acc-py-fc))
              var(--p-accordion-px, var(--p-acc-px-fc));
          }
          .p-accordion summary::after{
            background-color: LinkText;
          }
          .p-accordion summary:focus-visible::before{
            outline-color: Highlight;
          }
        }
        @media (hover: hover) {
          .p-accordion summary:hover::before{
            background: var(--p-color-frosted);
          }
        }
        .p-accordion:not([data-before]) [data-pds-slot="summary-before"] {
          display: none;
        }
        .p-accordion:not([data-after]) [data-pds-slot="summary-after"] {
          display: none;
        }
        .p-accordion[data-summary] summary > h1,
        .p-accordion[data-summary] summary > h2,
        .p-accordion[data-summary] summary > h3,
        .p-accordion[data-summary] summary > h4,
        .p-accordion[data-summary] summary > h5,
        .p-accordion[data-summary] summary > h6 {
          display: none;
        }
        .p-accordion:not([data-summary]) [data-pds-slot="summary"] {
          display: none;
        }
        @media (min-width: 480px) {
          .p-accordion details > div{
            grid-column-start: var(--p-acc-indent-xs, var(--p-acc-indent));
          }
        }
        @media (min-width: 760px) {
          .p-accordion details > div{
            grid-column-start: var(
              --p-acc-indent-s,
              var(--p-acc-indent-xs, var(--p-acc-indent))
            );
          }
        }
        @media (min-width: 1000px) {
          .p-accordion details > div{
            grid-column-start: var(
              --p-acc-indent-m,
              var(--p-acc-indent-s, var(--p-acc-indent))
            );
          }
        }
        @media (min-width: 1300px) {
          .p-accordion details > div{
            grid-column-start: var(
              --p-acc-indent-l,
              var(--p-acc-indent-m, var(--p-acc-indent))
            );
          }
        }
        @media (min-width: 1760px) {
          .p-accordion details > div{
            grid-column-start: var(
              --p-acc-indent-xl,
              var(--p-acc-indent-l, var(--p-acc-indent))
            );
          }
        }
        @media (min-width: 1920px) {
          .p-accordion details > div{
            grid-column-start: var(
              --p-acc-indent-xxl,
              var(--p-acc-indent-xl, var(--p-acc-indent))
            );
          }
        }`}}),o.jsxs(o.Fragment,{children:[" ",o.jsxs("details",{children:[o.jsxs("summary",{children:[o.jsx("span",{"data-pds-slot":"summary",children:a.summary??null}),o.jsxs("h2",{children:[v(),o.jsx("span",{"data-pds-slot":"heading",children:a.heading??null})]})]}),o.jsx("span",{"data-pds-slot":"summary-before",children:a["summary-before"]??null}),o.jsx("span",{"data-pds-slot":"summary-after",children:a["summary-after"]??null}),o.jsx("div",{children:o.jsx("span",{"data-pds-slot":"",children:a.children})})]})," "," "]})]})}export{_ as default};
