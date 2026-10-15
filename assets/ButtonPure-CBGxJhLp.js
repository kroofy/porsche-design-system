import{j as o}from"./react-C3neMvrl.js";import{h as O}from"./host-DRskmCSE.js";import T from"./Spinner-DLZl2BeF.js";import A from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const S={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},k={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",inherit:"currentcolor"},L=["base","xs","s","m","l","xl","xxl"],x=(n,r)=>{if(n==null)return r;if(n==="")return typeof r=="boolean"?!0:r;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return r}return n},$=n=>n===!0||n==="true"||n==="",i=(n,r,u)=>n&&typeof n=="object"?n[r]===void 0?u:n[r]:n,B=n=>n==="inherit"?"":S[String(n)]||S.sm,N=(n,r,u,h,m,f)=>{const t=r==="base"?"":`-${r}`,e=$(m),p=$(h);n[`--p-bp-host-d${t}`]=p?"block":"inline-block",n[`--p-bp-host-w${t}`]=p?"100%":"auto",n[`--p-bp-fs${t}`]=B(u),n[`--p-bp-gap${t}`]=e?"0":"var(--p-spacing-static-xs)",n[`--p-bp-just${t}`]=p?"space-between":"flex-start",n[`--p-bp-ai${t}`]=p?"center":"flex-start",n[`--p-bp-inset${t}`]=e?"-2px":"-4px",n[`--p-bp-rad${t}`]=e?"var(--p-radius-full)":"var(--p-radius-lg)",n[`--p-bp-l-ws${t}`]=e?"nowrap":"",n[`--p-bp-l-ti${t}`]=e?"-999999px":"0",n[`--p-bp-l-ov${t}`]=e?"hidden":"visible",n[`--p-bp-l-ord${t}`]=f==="start"||f==="left"?"-1":"0"};function J(n){function r(){const t=$(n.disabled),e=x(n.size,"sm"),p=x(n.stretch,!1),l=x(n.hideLabel,!1),b=x(n.alignLabel,"end"),g={"--p-bp-fg":t?"var(--p-color-contrast-low)":k[n.color||"primary"]||k.primary};if(typeof e=="object"||typeof p=="object"||typeof l=="object"||typeof b=="object"){const s=typeof e=="object"&&e!==null?e:null,c=typeof p=="object"&&p!==null?p:null,d=typeof l=="object"&&l!==null?l:null,v=typeof b=="object"&&b!==null?b:null;let y=s?i(s,"base","sm"):e,w=c?i(c,"base",!1):p,j=d?i(d,"base",!1):l,z=v?i(v,"base","end"):b;for(const a of L)s&&s[a]!==void 0&&(y=i(s,a,y)),c&&c[a]!==void 0&&(w=i(c,a,w)),d&&d[a]!==void 0&&(j=i(d,a,j)),v&&v[a]!==void 0&&(z=i(v,a,z)),N(g,a,y,w,j,z)}else for(const s of L)N(g,s,e,p,l,b);return g}function u(){const t=n.icon||"arrow-right";return t==="none"?"":t}function h(){if(n.iconSource)return n.iconSource;const t={copy:"copy.0fcd086.svg",like:"like.a7468cd.svg"},e=n.icon||"arrow-right";return t[e]?"https://cdn.ui.porsche.com/porsche-design-system/icons/"+t[e]:""}function m(){return n.type||"submit"}function f(){return n.loading===!0||n.loading==="true"||n.loading===""?"Loading":""}return o.jsxs("div",{className:["p-button-pure",n.className].filter(Boolean).join(" "),"data-pds":"button-pure",style:r(),...O({active:n.active,disabled:n.disabled,icon:n.icon,"icon-source":n.iconSource,loading:n.loading,underline:n.underline}),children:[o.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-button-pure :where([data-pds-slot]){display:contents}

        .p-button-pure {
          transform: translate3d(0, 0, 0) !important;
          display: var(--p-bp-host-d);
          width: var(--p-bp-host-w);
          vertical-align: top;
        }
        .p-button-pure[hidden] {
          display: none !important;
        }
        .p-button-pure .root{
          all: unset;
          display: flex;
          width: 100%;
          cursor: pointer;
          color: var(--p-bp-fg);
          text-decoration: none;
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          font-size: inherit;
          font-size: var(--p-bp-fs);
          gap: var(--p-bp-gap);
          justify-content: var(--p-bp-just);
          align-items: var(--p-bp-ai);
        }
        .p-button-pure[underline] .root {
          text-decoration: underline;
        }
        .p-button-pure[disabled] .root,
        .p-button-pure[loading] .root {
          cursor: not-allowed;
        }
        .p-button-pure .root::before{
          content: "";
          position: absolute;
          top: -2px;
          bottom: -2px;
          right: var(--p-bp-inset);
          left: var(--p-bp-inset);
          border-radius: var(--p-bp-rad);
          transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        }
        .p-button-pure[active] .root::before {
          -webkit-backdrop-filter: var(--p-blur-frosted);
          backdrop-filter: var(--p-blur-frosted);
          background-color: var(--p-color-frosted);
        }
        .p-button-pure .root:focus-visible::before{
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-button-pure .loading,
        .p-button-pure #loading{
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }
        .p-button-pure .icon,
        .p-button-pure .p-icon,
        .p-button-pure .p-spinner{
          position: relative;
          flex-shrink: 0;
        }
        .p-button-pure .label{
          z-index: 1;
          white-space: inherit;
          white-space: var(--p-bp-l-ws);
          text-indent: var(--p-bp-l-ti);
          overflow: var(--p-bp-l-ov);
          order: var(--p-bp-l-ord);
        }
        .p-button-pure:not([loading]) .p-spinner {
          display: none;
        }
        .p-button-pure[loading] .p-icon {
          display: none;
        }
        .p-button-pure[icon="none"]:not([icon-source]):not([loading]) .p-icon {
          display: none;
        }
        @media (forced-colors: active) {
          .p-button-pure .root{
            color: LinkText;
          }
          .p-button-pure .root:is(button){
            color: ButtonText;
          }
          .p-button-pure .root:focus-visible::before{
            outline-color: Highlight;
          }
        }
        @media (hover: hover) {
          .p-button-pure:not([disabled]):not([loading]) .root:hover::before {
            -webkit-backdrop-filter: var(--p-blur-frosted);
            backdrop-filter: var(--p-blur-frosted);
            background-color: var(--p-color-frosted-strong);
          }
        }
        @media (min-width: 480px) {
          .p-button-pure {
            display: var(--p-bp-host-d-xs);
            width: var(--p-bp-host-w-xs);
          }
          .p-button-pure .root{
            font-size: var(--p-bp-fs-xs, var(--p-bp-fs));
            gap: var(--p-bp-gap-xs);
            justify-content: var(--p-bp-just-xs);
            align-items: var(--p-bp-ai-xs);
          }
          .p-button-pure .root::before{
            right: var(--p-bp-inset-xs);
            left: var(--p-bp-inset-xs);
            border-radius: var(--p-bp-rad-xs);
          }
          .p-button-pure .label{
            white-space: inherit;
            white-space: var(--p-bp-l-ws-xs);
            text-indent: var(--p-bp-l-ti-xs);
            overflow: var(--p-bp-l-ov-xs);
            order: var(--p-bp-l-ord-xs);
          }
        }
        @media (min-width: 760px) {
          .p-button-pure {
            display: var(--p-bp-host-d-s);
            width: var(--p-bp-host-w-s);
          }
          .p-button-pure .root{
            font-size: var(--p-bp-fs-s, var(--p-bp-fs));
            gap: var(--p-bp-gap-s);
            justify-content: var(--p-bp-just-s);
            align-items: var(--p-bp-ai-s);
          }
          .p-button-pure .root::before{
            right: var(--p-bp-inset-s);
            left: var(--p-bp-inset-s);
            border-radius: var(--p-bp-rad-s);
          }
          .p-button-pure .label{
            white-space: inherit;
            white-space: var(--p-bp-l-ws-s);
            text-indent: var(--p-bp-l-ti-s);
            overflow: var(--p-bp-l-ov-s);
            order: var(--p-bp-l-ord-s);
          }
        }
        @media (min-width: 1000px) {
          .p-button-pure {
            display: var(--p-bp-host-d-m);
            width: var(--p-bp-host-w-m);
          }
          .p-button-pure .root{
            font-size: var(--p-bp-fs-m, var(--p-bp-fs));
            gap: var(--p-bp-gap-m);
            justify-content: var(--p-bp-just-m);
            align-items: var(--p-bp-ai-m);
          }
          .p-button-pure .root::before{
            right: var(--p-bp-inset-m);
            left: var(--p-bp-inset-m);
            border-radius: var(--p-bp-rad-m);
          }
          .p-button-pure .label{
            white-space: inherit;
            white-space: var(--p-bp-l-ws-m);
            text-indent: var(--p-bp-l-ti-m);
            overflow: var(--p-bp-l-ov-m);
            order: var(--p-bp-l-ord-m);
          }
        }
        @media (min-width: 1300px) {
          .p-button-pure {
            display: var(--p-bp-host-d-l);
            width: var(--p-bp-host-w-l);
          }
          .p-button-pure .root{
            font-size: var(--p-bp-fs-l, var(--p-bp-fs));
            gap: var(--p-bp-gap-l);
            justify-content: var(--p-bp-just-l);
            align-items: var(--p-bp-ai-l);
          }
          .p-button-pure .root::before{
            right: var(--p-bp-inset-l);
            left: var(--p-bp-inset-l);
            border-radius: var(--p-bp-rad-l);
          }
          .p-button-pure .label{
            white-space: inherit;
            white-space: var(--p-bp-l-ws-l);
            text-indent: var(--p-bp-l-ti-l);
            overflow: var(--p-bp-l-ov-l);
            order: var(--p-bp-l-ord-l);
          }
        }
        @media (min-width: 1760px) {
          .p-button-pure {
            display: var(--p-bp-host-d-xl);
            width: var(--p-bp-host-w-xl);
          }
          .p-button-pure .root{
            font-size: var(--p-bp-fs-xl, var(--p-bp-fs));
            gap: var(--p-bp-gap-xl);
            justify-content: var(--p-bp-just-xl);
            align-items: var(--p-bp-ai-xl);
          }
          .p-button-pure .root::before{
            right: var(--p-bp-inset-xl);
            left: var(--p-bp-inset-xl);
            border-radius: var(--p-bp-rad-xl);
          }
          .p-button-pure .label{
            white-space: inherit;
            white-space: var(--p-bp-l-ws-xl);
            text-indent: var(--p-bp-l-ti-xl);
            overflow: var(--p-bp-l-ov-xl);
            order: var(--p-bp-l-ord-xl);
          }
        }
        @media (min-width: 1920px) {
          .p-button-pure {
            display: var(--p-bp-host-d-xxl);
            width: var(--p-bp-host-w-xxl);
          }
          .p-button-pure .root{
            font-size: var(--p-bp-fs-xxl, var(--p-bp-fs));
            gap: var(--p-bp-gap-xxl);
            justify-content: var(--p-bp-just-xxl);
            align-items: var(--p-bp-ai-xxl);
          }
          .p-button-pure .root::before{
            right: var(--p-bp-inset-xxl);
            left: var(--p-bp-inset-xxl);
            border-radius: var(--p-bp-rad-xxl);
          }
          .p-button-pure .label{
            white-space: inherit;
            white-space: var(--p-bp-l-ws-xxl);
            text-indent: var(--p-bp-l-ti-xxl);
            overflow: var(--p-bp-l-ov-xxl);
            order: var(--p-bp-l-ord-xxl);
          }
        }`}}),o.jsxs(o.Fragment,{children:[" ",o.jsxs("button",{className:"root",type:m(),children:[o.jsx(A,{className:"icon",size:"inherit",color:"inherit","aria-hidden":"true",name:u(),source:h()}),o.jsx(T,{className:"icon",size:"inherit",color:"inherit","aria-hidden":"true"}),o.jsx("span",{className:"label",children:o.jsx("span",{"data-pds-slot":"",children:n.children})}),o.jsx("span",{className:"loading",id:"loading",role:"status",children:f()})]})," "," "]})]})}export{J as default};
