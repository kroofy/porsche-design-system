import{j as n}from"./react-C3neMvrl.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const d={small:"var(--p-typescale-3xl)",medium:"var(--p-typescale-4xl)",large:"var(--p-typescale-5xl)",inherit:"inherit","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},o={primary:"var(--p-color-primary)",inherit:"currentcolor"},f=["base","xs","s","m","l","xl","xxl"],t=s=>d[String(s)]||d.large,c=s=>{if(s==null||s==="")return"large";if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"large"}return s},y=(s,p,i)=>{const a=i==="inherit"?"":i;if(p==="base"){s["--p-display-fs"]=a;return}s[`--p-display-fs-${p}`]=a};function u(s){function p(){const i=s.ellipsis===!0||s.ellipsis==="true"||s.ellipsis==="",a={"--p-display-fg":o[s.color||"primary"]||o.primary,"--p-display-align":s.align||"start","--p-display-max":i?"100%":"","--p-display-overflow":i?"hidden":"","--p-display-ellipsis":i?"ellipsis":"","--p-display-ws":i?"nowrap":""},l=c(s.size);if(typeof l=="object"&&l!==null){let r=t(l.base||"large");for(const e of f)l[e]!==void 0&&(r=t(l[e])),y(a,e,r)}else y(a,"base",t(l));return a}return n.jsxs("div",{className:["p-display",s.className].filter(Boolean).join(" "),"data-pds":"display",style:p(),children:[n.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-display :where([data-pds-slot]){display:contents}

        .p-display {
          display: block;
        }
        .p-display[hidden] {
          display: none !important;
        }
        .p-display [data-pds-slot] > :is(h1, h2, h3, h4, h5, h6){
          all: unset !important;
        }
        .p-display h3{
          all: unset;
          display: block;
          font: var(--p-font-weight-normal) var(--p-typescale-5xl) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          font-size: inherit;
          font-size: var(--p-display-fs);
          color: var(--p-display-fg);
          text-align: var(--p-display-align);
          max-width: var(--p-display-max);
          overflow: var(--p-display-overflow);
          text-overflow: var(--p-display-ellipsis);
          white-space: var(--p-display-ws);
        }
        @media (min-width: 480px) {
          .p-display h3{
            font-size: var(--p-display-fs-xs, var(--p-display-fs));
          }
        }
        @media (min-width: 760px) {
          .p-display h3{
            font-size: var(--p-display-fs-s, var(--p-display-fs));
          }
        }
        @media (min-width: 1000px) {
          .p-display h3{
            font-size: var(--p-display-fs-m, var(--p-display-fs));
          }
        }
        @media (min-width: 1300px) {
          .p-display h3{
            font-size: var(--p-display-fs-l, var(--p-display-fs));
          }
        }
        @media (min-width: 1760px) {
          .p-display h3{
            font-size: var(--p-display-fs-xl, var(--p-display-fs));
          }
        }
        @media (min-width: 1920px) {
          .p-display h3{
            font-size: var(--p-display-fs-xxl, var(--p-display-fs));
          }
        }`}}),n.jsxs(n.Fragment,{children:[" ",n.jsx("h3",{children:n.jsx("span",{"data-pds-slot":"",children:s.children})})," "," "]})]})}export{u as default};
