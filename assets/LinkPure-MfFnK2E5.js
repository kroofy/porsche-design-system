import{j as o}from"./react-C3neMvrl.js";import{h as S}from"./host-DRskmCSE.js";import L from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const y={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},w={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",inherit:"currentcolor"},j=["base","xs","s","m","l","xl","xxl"],x=(n,r)=>{if(n==null)return r;if(n==="")return typeof r=="boolean"?!0:r;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return r}return n},$=n=>n===!0||n==="true"||n==="",s=(n,r,v)=>n&&typeof n=="object"?n[r]===void 0?v:n[r]:n,N=n=>n==="inherit"?"":y[String(n)]||y.sm,z=(n,r,v,h,t,e)=>{const p=r==="base"?"":`-${r}`,l=$(t),a=$(h);n[`--p-lp-host-d${p}`]=a?"block":"inline-block",n[`--p-lp-host-w${p}`]=a?"100%":"auto",n[`--p-lp-fs${p}`]=N(v),n[`--p-lp-gap${p}`]=l?"0":"var(--p-spacing-static-xs)",n[`--p-lp-just${p}`]=a?"space-between":"flex-start",n[`--p-lp-ai${p}`]=a?"center":"flex-start",n[`--p-lp-inset${p}`]=l?"-2px":"-4px",n[`--p-lp-rad${p}`]=l?"var(--p-radius-full)":"var(--p-radius-lg)",n[`--p-lp-l-ws${p}`]=l?"nowrap":"",n[`--p-lp-l-ti${p}`]=l?"-999999px":"0",n[`--p-lp-l-ov${p}`]=l?"hidden":"visible",n[`--p-lp-l-ord${p}`]=e==="start"||e==="left"?"-1":"0"};function E(n){function r(){const t=x(n.size,"sm"),e=x(n.stretch,!1),p=x(n.hideLabel,!1),l=x(n.alignLabel,"end"),a={"--p-lp-fg":w[n.color||"primary"]||w.primary};if(typeof t=="object"||typeof e=="object"||typeof p=="object"||typeof l=="object"){const c=typeof t=="object"&&t!==null?t:null,d=typeof e=="object"&&e!==null?e:null,u=typeof p=="object"&&p!==null?p:null,f=typeof l=="object"&&l!==null?l:null;let m=c?s(c,"base","sm"):t,b=d?s(d,"base",!1):e,g=u?s(u,"base",!1):p,k=f?s(f,"base","end"):l;for(const i of j)c&&c[i]!==void 0&&(m=s(c,i,m)),d&&d[i]!==void 0&&(b=s(d,i,b)),u&&u[i]!==void 0&&(g=s(u,i,g)),f&&f[i]!==void 0&&(k=s(f,i,k)),z(a,i,m,b,g,k)}else for(const c of j)z(a,c,t,e,p,l);return a}function v(){const t=n.icon||"arrow-right";return t==="none"?"":t}function h(){return n.iconSource||""}return o.jsxs("div",{className:["p-link-pure",n.className].filter(Boolean).join(" "),"data-pds":"link-pure",style:r(),...S({active:n.active,href:n.href,icon:n.icon,"icon-source":n.iconSource,underline:n.underline}),children:[o.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-link-pure :where([data-pds-slot]){display:contents}

        .p-link-pure {
          transform: translate3d(0, 0, 0) !important;
          display: var(--p-lp-host-d);
          width: var(--p-lp-host-w);
          vertical-align: top;
          --p-lp-slot-in: var(--p-lp-inset);
          --p-lp-slot-r: var(--p-lp-rad);
        }
        .p-link-pure[hidden] {
          display: none !important;
        }
        .p-link-pure [data-pds-slot] > a{
          all: unset !important;
        }
        .p-link-pure [data-pds-slot] > a::before{
          content: "" !important;
          position: fixed !important;
          inset-block: -2px !important;
          inset-inline: var(--p-lp-slot-in) !important;
          border-radius: var(--p-lp-slot-r) !important;
        }
        .p-link-pure [data-pds-slot] > a:focus-visible::before{
          outline: 2px solid var(--p-color-focus) !important;
          outline-offset: 2px !important;
        }
        .p-link-pure .root{
          all: unset;
          display: flex;
          width: 100%;
          cursor: pointer;
          color: var(--p-lp-fg);
          text-decoration: none;
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          font-size: inherit;
          font-size: var(--p-lp-fs);
          gap: var(--p-lp-gap);
          justify-content: var(--p-lp-just);
          align-items: var(--p-lp-ai);
        }
        .p-link-pure[underline] .root {
          text-decoration: underline;
        }
        .p-link-pure .root::before{
          content: "";
          position: absolute;
          top: -2px;
          bottom: -2px;
          right: var(--p-lp-inset);
          left: var(--p-lp-inset);
          border-radius: var(--p-lp-rad);
          transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        }
        .p-link-pure[active] .root::before {
          -webkit-backdrop-filter: var(--p-blur-frosted);
          backdrop-filter: var(--p-blur-frosted);
          background-color: var(--p-color-frosted);
        }
        .p-link-pure[href] .root:focus-visible::before {
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-link-pure .icon,
        .p-link-pure .p-icon{
          position: relative;
          flex-shrink: 0;
        }
        .p-link-pure .label{
          z-index: 1;
          white-space: inherit;
          white-space: var(--p-lp-l-ws);
          text-indent: var(--p-lp-l-ti);
          overflow: var(--p-lp-l-ov);
          order: var(--p-lp-l-ord);
        }
        .p-link-pure[icon="none"]:not([icon-source]) .p-icon {
          display: none;
        }
        @media (forced-colors: active) {
          .p-link-pure .root{
            color: LinkText;
          }
          .p-link-pure .root:is(button){
            color: ButtonText;
          }
          .p-link-pure[href] .root:focus-visible::before {
            outline-color: Highlight;
          }
          .p-link-pure [data-pds-slot] > a:focus-visible::before{
            outline-color: Highlight !important;
          }
        }
        @media (hover: hover) {
          .p-link-pure .root:hover::before{
            -webkit-backdrop-filter: var(--p-blur-frosted);
            backdrop-filter: var(--p-blur-frosted);
            background-color: var(--p-color-frosted-strong);
          }
        }
        @media (min-width: 480px) {
          .p-link-pure {
            display: var(--p-lp-host-d-xs);
            width: var(--p-lp-host-w-xs);
            --p-lp-slot-in: var(--p-lp-inset-xs);
            --p-lp-slot-r: var(--p-lp-rad-xs);
          }
          .p-link-pure .root{
            font-size: var(--p-lp-fs-xs, var(--p-lp-fs));
            gap: var(--p-lp-gap-xs);
            justify-content: var(--p-lp-just-xs);
            align-items: var(--p-lp-ai-xs);
          }
          .p-link-pure .root::before{
            right: var(--p-lp-inset-xs);
            left: var(--p-lp-inset-xs);
            border-radius: var(--p-lp-rad-xs);
          }
          .p-link-pure .label{
            white-space: inherit;
            white-space: var(--p-lp-l-ws-xs);
            text-indent: var(--p-lp-l-ti-xs);
            overflow: var(--p-lp-l-ov-xs);
            order: var(--p-lp-l-ord-xs);
          }
        }
        @media (min-width: 760px) {
          .p-link-pure {
            display: var(--p-lp-host-d-s);
            width: var(--p-lp-host-w-s);
            --p-lp-slot-in: var(--p-lp-inset-s);
            --p-lp-slot-r: var(--p-lp-rad-s);
          }
          .p-link-pure .root{
            font-size: var(--p-lp-fs-s, var(--p-lp-fs));
            gap: var(--p-lp-gap-s);
            justify-content: var(--p-lp-just-s);
            align-items: var(--p-lp-ai-s);
          }
          .p-link-pure .root::before{
            right: var(--p-lp-inset-s);
            left: var(--p-lp-inset-s);
            border-radius: var(--p-lp-rad-s);
          }
          .p-link-pure .label{
            white-space: inherit;
            white-space: var(--p-lp-l-ws-s);
            text-indent: var(--p-lp-l-ti-s);
            overflow: var(--p-lp-l-ov-s);
            order: var(--p-lp-l-ord-s);
          }
        }
        @media (min-width: 1000px) {
          .p-link-pure {
            display: var(--p-lp-host-d-m);
            width: var(--p-lp-host-w-m);
            --p-lp-slot-in: var(--p-lp-inset-m);
            --p-lp-slot-r: var(--p-lp-rad-m);
          }
          .p-link-pure .root{
            font-size: var(--p-lp-fs-m, var(--p-lp-fs));
            gap: var(--p-lp-gap-m);
            justify-content: var(--p-lp-just-m);
            align-items: var(--p-lp-ai-m);
          }
          .p-link-pure .root::before{
            right: var(--p-lp-inset-m);
            left: var(--p-lp-inset-m);
            border-radius: var(--p-lp-rad-m);
          }
          .p-link-pure .label{
            white-space: inherit;
            white-space: var(--p-lp-l-ws-m);
            text-indent: var(--p-lp-l-ti-m);
            overflow: var(--p-lp-l-ov-m);
            order: var(--p-lp-l-ord-m);
          }
        }
        @media (min-width: 1300px) {
          .p-link-pure {
            display: var(--p-lp-host-d-l);
            width: var(--p-lp-host-w-l);
            --p-lp-slot-in: var(--p-lp-inset-l);
            --p-lp-slot-r: var(--p-lp-rad-l);
          }
          .p-link-pure .root{
            font-size: var(--p-lp-fs-l, var(--p-lp-fs));
            gap: var(--p-lp-gap-l);
            justify-content: var(--p-lp-just-l);
            align-items: var(--p-lp-ai-l);
          }
          .p-link-pure .root::before{
            right: var(--p-lp-inset-l);
            left: var(--p-lp-inset-l);
            border-radius: var(--p-lp-rad-l);
          }
          .p-link-pure .label{
            white-space: inherit;
            white-space: var(--p-lp-l-ws-l);
            text-indent: var(--p-lp-l-ti-l);
            overflow: var(--p-lp-l-ov-l);
            order: var(--p-lp-l-ord-l);
          }
        }
        @media (min-width: 1760px) {
          .p-link-pure {
            display: var(--p-lp-host-d-xl);
            width: var(--p-lp-host-w-xl);
            --p-lp-slot-in: var(--p-lp-inset-xl);
            --p-lp-slot-r: var(--p-lp-rad-xl);
          }
          .p-link-pure .root{
            font-size: var(--p-lp-fs-xl, var(--p-lp-fs));
            gap: var(--p-lp-gap-xl);
            justify-content: var(--p-lp-just-xl);
            align-items: var(--p-lp-ai-xl);
          }
          .p-link-pure .root::before{
            right: var(--p-lp-inset-xl);
            left: var(--p-lp-inset-xl);
            border-radius: var(--p-lp-rad-xl);
          }
          .p-link-pure .label{
            white-space: inherit;
            white-space: var(--p-lp-l-ws-xl);
            text-indent: var(--p-lp-l-ti-xl);
            overflow: var(--p-lp-l-ov-xl);
            order: var(--p-lp-l-ord-xl);
          }
        }
        @media (min-width: 1920px) {
          .p-link-pure {
            display: var(--p-lp-host-d-xxl);
            width: var(--p-lp-host-w-xxl);
            --p-lp-slot-in: var(--p-lp-inset-xxl);
            --p-lp-slot-r: var(--p-lp-rad-xxl);
          }
          .p-link-pure .root{
            font-size: var(--p-lp-fs-xxl, var(--p-lp-fs));
            gap: var(--p-lp-gap-xxl);
            justify-content: var(--p-lp-just-xxl);
            align-items: var(--p-lp-ai-xxl);
          }
          .p-link-pure .root::before{
            right: var(--p-lp-inset-xxl);
            left: var(--p-lp-inset-xxl);
            border-radius: var(--p-lp-rad-xxl);
          }
          .p-link-pure .label{
            white-space: inherit;
            white-space: var(--p-lp-l-ws-xxl);
            text-indent: var(--p-lp-l-ti-xxl);
            overflow: var(--p-lp-l-ov-xxl);
            order: var(--p-lp-l-ord-xxl);
          }
        }`}}),o.jsxs(o.Fragment,{children:[" ",o.jsxs("span",{className:"root",children:[o.jsx(L,{className:"icon",size:"inherit",color:"inherit","aria-hidden":"true",name:v(),source:h()}),o.jsx("span",{className:"label",children:o.jsx("span",{"data-pds-slot":"",children:n.children})})]})," "," "]})]})}export{E as default};
