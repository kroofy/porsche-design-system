import{j as i}from"./react-C3neMvrl.js";import{I as y}from"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const f={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},v={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)","contrast-low":"var(--p-color-contrast-low)","contrast-lower":"var(--p-color-contrast-lower)",success:"var(--p-color-success)",warning:"var(--p-color-warning)",error:"var(--p-color-error)",info:"var(--p-color-info)",inherit:"currentcolor"},u={"arrow-compact-left":1,"arrow-compact-right":1,"arrow-double-left":1,"arrow-double-right":1,"arrow-first":1,"arrow-head-left":1,"arrow-head-right":1,"arrow-last":1,"arrow-left":1,"arrow-right":1,chart:1,chat:1,copy:1,external:1,increase:1,list:1,logout:1,return:1,send:1},d=y,w=["base","xs","s","m","l","xl","xxl"],p=n=>f[String(n)]||f.sm,b=n=>{if(n==null||n==="")return"sm";if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return n},g=(n,a,o)=>{const t=o==="inherit"?"":o;if(a==="base"){n["--p-icon-fs"]=t;return}n[`--p-icon-fs-${a}`]=t},x=(n,a)=>a&&/(\/)/.test(a)?a:"https://cdn.ui.porsche.com/porsche-design-system/icons/"+(d[n||"arrow-right"]||d["arrow-right"]);function N(n){function a(){const r=n.source||"",s=n.name||"arrow-right",h=x(s,r),c={"--p-icon-fallback":v[n.color||"primary"]||v.primary,"--p-icon-mask":'url("'+h+'") center/contain no-repeat',"--p-icon-flip":!r&&u[s]?"scaleX(-1)":"none"},e=b(n.size);if(typeof e=="object"&&e!==null){let m=p(e.base||"sm");for(const l of w)e[l]!==void 0&&(m=p(e[l])),g(c,l,m)}else g(c,"base",p(e));return c}function o(){return x(n.name,n.source)}function t(){let r=n.aria;if(!r)return"";if(typeof r=="string")try{r=JSON.parse(r.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{r=null}return typeof r=="object"&&r!==null&&r["aria-label"]||""}return i.jsxs("div",{className:["p-icon",n.className].filter(Boolean).join(" "),"data-pds":"icon",style:a(),children:[i.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-icon :where([data-pds-slot]){display:contents}

        .p-icon {
          display: inline-flex;
          vertical-align: top;
        }
        .p-icon[hidden] {
          display: none !important;
        }
        .p-icon img{
          display: block;
          margin: 0;
          padding: 0;
          border: 0;
          outline: 0;
          overflow: hidden;
          object-position: -9999px -9999px;
          pointer-events: none;
          width: var(--p-icon-size, var(--p-leading-normal));
          height: var(--p-icon-size, var(--p-leading-normal));
          font-family: var(--p-font-porsche-next);
          font-size: inherit;
          font-size: var(--p-icon-fs);
          -webkit-mask: var(--p-icon-mask);
          mask: var(--p-icon-mask);
          background: var(
            --p-icon-color,
            var(--p-icon-fallback, var(--p-color-primary))
          );
        }
        @media (forced-colors: active) {
          .p-icon img{
            background: CanvasText;
          }
        }
        .p-icon img:dir(rtl){
          transform: var(--p-icon-flip, none);
        }
        @media (min-width: 480px) {
          .p-icon img{
            font-size: var(--p-icon-fs-xs, var(--p-icon-fs));
          }
        }
        @media (min-width: 760px) {
          .p-icon img{
            font-size: var(--p-icon-fs-s, var(--p-icon-fs));
          }
        }
        @media (min-width: 1000px) {
          .p-icon img{
            font-size: var(--p-icon-fs-m, var(--p-icon-fs));
          }
        }
        @media (min-width: 1300px) {
          .p-icon img{
            font-size: var(--p-icon-fs-l, var(--p-icon-fs));
          }
        }
        @media (min-width: 1760px) {
          .p-icon img{
            font-size: var(--p-icon-fs-xl, var(--p-icon-fs));
          }
        }
        @media (min-width: 1920px) {
          .p-icon img{
            font-size: var(--p-icon-fs-xxl, var(--p-icon-fs));
          }
        }`}}),i.jsxs(i.Fragment,{children:[" ",i.jsx("img",{width:"24",height:"24",loading:"lazy",src:o(),alt:t()})," "," "]})]})}export{N as default};
