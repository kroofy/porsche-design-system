import{j as s}from"./react-C3neMvrl.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const g={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},c=["base","xs","s","m","l","xl","xxl"],p=a=>g[String(a)]||g.sm,m=a=>{if(a==null||a==="")return"sm";if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return a},o=(a,l,t)=>{const i=t==="inherit"?"":t;if(l==="base"){a["--p-flag-fs"]=i;return}a[`--p-flag-fs-${l}`]=i};function h(a){function l(){const e={},n=m(a.size);if(typeof n=="object"&&n!==null){let f=p(n.base||"sm");for(const r of c)n[r]!==void 0&&(f=p(n[r])),o(e,r,f)}else o(e,"base",p(n));return e}function t(){const e={de:"de.b575e11.svg",ch:"ch.1cc9a58.svg",pt:"pt.c903b10.svg",xx:"xx.acc7ae8.svg"},n=a.name||"de";return"https://cdn.ui.porsche.com/porsche-design-system/flags/"+(e[n]||e.xx)}function i(){let e=a.aria;if(!e)return"";if(typeof e=="string")try{e=JSON.parse(e.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{e=null}return typeof e=="object"&&e!==null&&e["aria-label"]||""}return s.jsxs("div",{className:["p-flag",a.className].filter(Boolean).join(" "),"data-pds":"flag",style:l(),children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-flag :where([data-pds-slot]){display:contents}

        .p-flag {
          display: inline-flex;
          vertical-align: top;
        }
        .p-flag[hidden] {
          display: none !important;
        }
        .p-flag img{
          display: block;
          margin: 0;
          padding: 1px;
          border: 0;
          outline: 0;
          overflow: hidden;
          box-sizing: border-box;
          pointer-events: none;
          width: var(--p-flag-size, var(--p-leading-normal));
          height: var(--p-flag-size, var(--p-leading-normal));
          font-family: var(--p-font-porsche-next);
          font-size: inherit;
          font-size: var(--p-flag-fs);
        }
        @media (min-width: 480px) {
          .p-flag img{
            font-size: var(--p-flag-fs-xs, var(--p-flag-fs));
          }
        }
        @media (min-width: 760px) {
          .p-flag img{
            font-size: var(--p-flag-fs-s, var(--p-flag-fs));
          }
        }
        @media (min-width: 1000px) {
          .p-flag img{
            font-size: var(--p-flag-fs-m, var(--p-flag-fs));
          }
        }
        @media (min-width: 1300px) {
          .p-flag img{
            font-size: var(--p-flag-fs-l, var(--p-flag-fs));
          }
        }
        @media (min-width: 1760px) {
          .p-flag img{
            font-size: var(--p-flag-fs-xl, var(--p-flag-fs));
          }
        }
        @media (min-width: 1920px) {
          .p-flag img{
            font-size: var(--p-flag-fs-xxl, var(--p-flag-fs));
          }
        }`}}),s.jsxs(s.Fragment,{children:[" ",s.jsx("img",{width:"24",height:"24",loading:"lazy",src:t(),alt:i()})," "," "]})]})}export{h as default};
