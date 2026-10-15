import{j as s}from"./react-C3neMvrl.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const d={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},o={regular:"var(--p-font-weight-normal)",normal:"var(--p-font-weight-normal)","semi-bold":"var(--p-font-weight-semibold)",semibold:"var(--p-font-weight-semibold)",bold:"var(--p-font-weight-bold)"},g={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",inherit:"currentcolor"},v=["base","xs","s","m","l","xl","xxl"],p=n=>d[String(n)]||d["2xl"],m=n=>{if(n==null||n==="")return"2xl";if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"2xl"}return n},c=(n,t,a)=>{const e=a==="inherit"?"":a;if(t==="base"){n["--p-heading-fs"]=e;return}n[`--p-heading-fs-${t}`]=e};function w(n){function t(){const a=n.hyphens||"none",e=n.ellipsis===!0||n.ellipsis==="true"||n.ellipsis==="",l={"--p-heading-weight":o[n.weight||"normal"]||o.normal,"--p-heading-fg":g[n.color||"primary"]||g.primary,"--p-heading-align":n.align||"start","--p-heading-hyphens":a,"--p-heading-wrap":a==="auto"||a==="manual"?"break-word":"","--p-heading-max":e?"100%":"","--p-heading-overflow":e?"hidden":"","--p-heading-ellipsis":e?"ellipsis":"","--p-heading-ws":e?"nowrap":""},i=m(n.size);if(typeof i=="object"&&i!==null){let h=p(i.base||"2xl");for(const r of v)i[r]!==void 0&&(h=p(i[r])),c(l,r,h)}else c(l,"base",p(i));return l}return s.jsxs("div",{className:["p-heading",n.className].filter(Boolean).join(" "),"data-pds":"heading",style:t(),children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-heading :where([data-pds-slot]){display:contents}

        .p-heading {
          display: block;
        }
        .p-heading[hidden] {
          display: none !important;
        }
        .p-heading [data-pds-slot] > :is(h1, h2, h3, h4, h5, h6){
          all: unset;
        }
        .p-heading h2{
          all: unset;
          display: block;
          font: var(--p-heading-weight) var(--p-typescale-2xl) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          font-size: inherit;
          font-size: var(--p-heading-fs);
          color: var(--p-heading-fg);
          text-align: var(--p-heading-align);
          hyphens: var(--p-heading-hyphens);
          overflow-wrap: var(--p-heading-wrap);
          max-width: var(--p-heading-max);
          overflow: var(--p-heading-overflow);
          text-overflow: var(--p-heading-ellipsis);
          white-space: var(--p-heading-ws);
        }
        @media (min-width: 480px) {
          .p-heading h2{
            font-size: var(--p-heading-fs-xs, var(--p-heading-fs));
          }
        }
        @media (min-width: 760px) {
          .p-heading h2{
            font-size: var(--p-heading-fs-s, var(--p-heading-fs));
          }
        }
        @media (min-width: 1000px) {
          .p-heading h2{
            font-size: var(--p-heading-fs-m, var(--p-heading-fs));
          }
        }
        @media (min-width: 1300px) {
          .p-heading h2{
            font-size: var(--p-heading-fs-l, var(--p-heading-fs));
          }
        }
        @media (min-width: 1760px) {
          .p-heading h2{
            font-size: var(--p-heading-fs-xl, var(--p-heading-fs));
          }
        }
        @media (min-width: 1920px) {
          .p-heading h2{
            font-size: var(--p-heading-fs-xxl, var(--p-heading-fs));
          }
        }`}}),s.jsxs(s.Fragment,{children:[" ",s.jsx("h2",{children:s.jsx("span",{"data-pds-slot":"",children:n.children})})," "," "]})]})}export{w as default};
