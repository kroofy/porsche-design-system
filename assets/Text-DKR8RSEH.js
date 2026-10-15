import{j as a}from"./react-C3neMvrl.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const x={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},c={regular:"var(--p-font-weight-normal)",normal:"var(--p-font-weight-normal)","semi-bold":"var(--p-font-weight-semibold)",semibold:"var(--p-font-weight-semibold)",bold:"var(--p-font-weight-bold)"},v={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",success:"var(--p-color-success)",warning:"var(--p-color-warning)",error:"var(--p-color-error)",info:"var(--p-color-info)",inherit:"currentcolor"},d=["base","xs","s","m","l","xl","xxl"],i=t=>x[String(t)]||x.sm,h=t=>{if(t==null||t==="")return"sm";if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return t},m=(t,r,e)=>{const n=e==="inherit"?"":e;if(r==="base"){t["--p-text-fs"]=n;return}t[`--p-text-fs-${r}`]=n};function w(t){function r(){const e=t.hyphens||"inherit",n=t.ellipsis===!0||t.ellipsis==="true"||t.ellipsis==="",p={"--p-text-weight":c[t.weight||"normal"]||c.normal,"--p-text-fg":v[t.color||"primary"]||v.primary,"--p-text-align":t.align||"start","--p-text-hyphens":e==="inherit"?"":e,"--p-text-wrap":e==="auto"||e==="manual"?"break-word":"","--p-text-max":n?"100%":"","--p-text-overflow":n?"hidden":"","--p-text-ellipsis":n?"ellipsis":"","--p-text-ws":n?"nowrap":""},s=h(t.size);if(typeof s=="object"&&s!==null){let o=i(s.base||"sm");for(const l of d)s[l]!==void 0&&(o=i(s[l])),m(p,l,o)}else m(p,"base",i(s));return p}return a.jsxs("div",{className:["p-text",t.className].filter(Boolean).join(" "),"data-pds":"text",style:r(),children:[a.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-text :where([data-pds-slot]){display:contents}

        .p-text {
          display: block;
        }
        .p-text[hidden] {
          display: none !important;
        }
        .p-text [data-pds-slot] > 
            :is(
                p,
                span,
                div,
                address,
                blockquote,
                figcaption,
                cite,
                time,
                legend
              ){
          all: unset;
        }
        .p-text p{
          all: unset;
          display: block;
          font: var(--p-text-weight) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          font-size: inherit;
          font-size: var(--p-text-fs);
          color: var(--p-text-fg);
          text-align: var(--p-text-align);
          hyphens: inherit;
          hyphens: var(--p-text-hyphens);
          overflow-wrap: var(--p-text-wrap);
          max-width: var(--p-text-max);
          overflow: var(--p-text-overflow);
          text-overflow: var(--p-text-ellipsis);
          white-space: var(--p-text-ws);
        }
        @media (min-width: 480px) {
          .p-text p{
            font-size: var(--p-text-fs-xs, var(--p-text-fs));
          }
        }
        @media (min-width: 760px) {
          .p-text p{
            font-size: var(--p-text-fs-s, var(--p-text-fs));
          }
        }
        @media (min-width: 1000px) {
          .p-text p{
            font-size: var(--p-text-fs-m, var(--p-text-fs));
          }
        }
        @media (min-width: 1300px) {
          .p-text p{
            font-size: var(--p-text-fs-l, var(--p-text-fs));
          }
        }
        @media (min-width: 1760px) {
          .p-text p{
            font-size: var(--p-text-fs-xl, var(--p-text-fs));
          }
        }
        @media (min-width: 1920px) {
          .p-text p{
            font-size: var(--p-text-fs-xxl, var(--p-text-fs));
          }
        }`}}),a.jsxs(a.Fragment,{children:[" ",a.jsx("p",{children:a.jsx("span",{"data-pds-slot":"",children:t.children})})," "," "]})]})}export{w as default};
