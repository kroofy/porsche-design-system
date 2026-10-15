import{j as a}from"./react-C3neMvrl.js";import{h as _}from"./host-DRskmCSE.js";import k from"./Spinner-DLZl2BeF.js";import j from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const w=["base","xs","s","m","l","xl","xxl"],y=(n,o)=>{if(n==null)return o;if(n==="")return!0;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return o}return n},h=n=>n===!0||n==="true"||n==="",v=(n,o,e)=>n&&typeof n=="object"?n[o]===void 0?e:n[o]:n,$=(n,o,e,c)=>{const t=o==="base"?"":`-${o}`,r=h(e);if(n[`--p-btn-scale${t}`]=h(c)?"0.64285714":"1",n[`--p-btn-br${t}`]=h(c)?"var(--p-radius-lg)":"var(--p-radius-xl)",n[`--p-btn-host-r${t}`]=r?"var(--p-button-radius, var(--p-radius-full))":"var(--p-button-radius, var(--_p-link-button-a))",n[`--p-btn-pad${t}`]=r?"var(--p-button-py, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px)) var(--p-button-px, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px))":"var(--p-button-py, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px)) var(--p-button-px, calc(33.6px * (var(--_p-button-a) - 0.64285714) + 16px))",n[`--p-btn-gap${t}`]=r?"var(--p-button-gap, 0)":"var(--p-button-gap, calc(11.2px * (var(--_p-button-a) - 0.64285714) + 4px))",n[`--p-btn-icon-m${t}`]=r?"0":"calc(-1 * (11.2px * (var(--_p-button-a) - 0.64285714) + 4px))",r){n[`--p-btn-l-pos${t}`]="absolute",n[`--p-btn-l-w${t}`]="1px",n[`--p-btn-l-h${t}`]="1px",n[`--p-btn-l-pad${t}`]="0",n[`--p-btn-l-m${t}`]="-1px",n[`--p-btn-l-ov${t}`]="hidden",n[`--p-btn-l-clip${t}`]="rect(0, 0, 0, 0)",n[`--p-btn-l-ws${t}`]="nowrap";return}n[`--p-btn-l-pos${t}`]="static",n[`--p-btn-l-w${t}`]="auto",n[`--p-btn-l-h${t}`]="auto",n[`--p-btn-l-pad${t}`]="0",n[`--p-btn-l-m${t}`]="0",n[`--p-btn-l-ov${t}`]="visible",n[`--p-btn-l-clip${t}`]="auto",n[`--p-btn-l-ws${t}`]="normal"};function A(n){function o(){const i=n.variant||"primary",l=y(n.hideLabel,!1),b=y(n.compact,!1),f={primary:{bg:"var(--p-button-bg, var(--p-color-primary))",fg:"var(--p-button-fg, var(--p-color-canvas))",hoverBg:"var(--p-button-bg, var(--p-color-contrast-high))",hoverFg:"var(--p-button-fg, var(--p-color-canvas))"},secondary:{bg:"var(--p-button-bg, var(--p-color-frosted-strong))",fg:"var(--p-button-fg, var(--p-color-primary))",hoverBg:"var(--p-button-bg, var(--p-color-frosted))",hoverFg:"var(--p-button-fg, var(--p-color-primary))"},destructive:{bg:"var(--p-button-bg, var(--p-color-error))",fg:"var(--p-button-fg, var(--p-color-canvas))",hoverBg:"var(--p-button-bg, var(--p-color-error-medium))",hoverFg:"var(--p-button-fg, var(--p-color-primary))"}},u=f[i]||f.primary,g={"--p-btn-bg":u.bg,"--p-btn-fg":u.fg,"--p-btn-hbg":u.hoverBg,"--p-btn-hfg":u.hoverFg};if(typeof l=="object"||typeof b=="object"){const p=typeof l=="object"&&l!==null?l:null,s=typeof b=="object"&&b!==null?b:null;let m=p?v(p,"base",!1):l,x=s?v(s,"base",!1):b;for(const d of w)p&&p[d]!==void 0&&(m=v(p,d,m)),s&&s[d]!==void 0&&(x=v(s,d,x)),$(g,d,m,x)}else for(const p of w)$(g,p,l,b);return g}function e(){if(n.iconSource)return"";const i=n.icon||"none";return i==="none"||i===""?"":i}function c(){return n.iconSource||""}function t(){return n.type||"submit"}function r(){return n.loading===!0||n.loading==="true"||n.loading===""?"Loading":""}return a.jsxs("div",{className:["p-button",n.className].filter(Boolean).join(" "),"data-pds":"button",style:o(),..._({disabled:n.disabled,icon:n.icon,"icon-source":n.iconSource,loading:n.loading}),children:[a.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-button :where([data-pds-slot]){display:contents}

        .p-button {
          display: inline-block;
          vertical-align: top;
          --_p-button-a: var(--p-btn-scale);
          --_p-link-button-a: var(--p-btn-br);
          border-radius: var(--p-btn-host-r) !important;
        }
        .p-button[hidden] {
          display: none !important;
        }
        .p-button .root{
          all: unset;
          display: flex;
          justify-content: center;
          width: 100%;
          min-width: min-content;
          box-sizing: border-box;
          -webkit-backdrop-filter: var(--p-blur-frosted);
          backdrop-filter: var(--p-blur-frosted);
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          border-radius: inherit;
          transform: translate3d(0, 0, 0);
          background-color: var(--p-btn-bg);
          color: var(--p-btn-fg);
          cursor: pointer;
          transition: background-color
              var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            border-color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
          padding: var(--p-btn-pad);
          gap: var(--p-btn-gap);
        }
        .p-button[disabled] .root,
        .p-button[loading] .root {
          cursor: not-allowed;
        }
        .p-button[disabled] .root {
          opacity: 0.4;
        }
        .p-button .root:focus-visible{
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-button .label{
          position: var(--p-btn-l-pos);
          width: var(--p-btn-l-w);
          height: var(--p-btn-l-h);
          padding: var(--p-btn-l-pad);
          margin: var(--p-btn-l-m);
          overflow: var(--p-btn-l-ov);
          clip: var(--p-btn-l-clip);
          white-space: var(--p-btn-l-ws);
          transition: opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        }
        .p-button[loading]:not([disabled]) .label,
        .p-button[loading]:not([disabled]) .icon {
          opacity: 0;
        }
        .p-button[disabled] .label,
        .p-button[disabled] .icon {
          opacity: 0.4;
        }
        .p-button .icon{
          font: var(--p-typescale-sm) var(--p-font-porsche-next);
          width: var(--p-leading-normal);
          height: var(--p-leading-normal);
          margin-inline-start: var(--p-btn-icon-m);
          transition: opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        }
        .p-button:not([icon-source]):not([icon]) .p-icon,
        .p-button[icon="none"]:not([icon-source]) .p-icon,
        .p-button[icon=""]:not([icon-source]) .p-icon {
          display: none;
        }
        .p-button .spinner{
          --p-spinner-color: currentcolor;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .p-button:not([loading]) .p-spinner {
          display: none;
        }
        .p-button .loading{
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }
        @media (forced-colors: active) {
          .p-button .root{
            forced-color-adjust: none;
            background: Canvas;
            color: LinkText;
            box-shadow: inset 0 0 0 2px LinkText;
          }
          .p-button .root:is(button){
            box-shadow: inset 0 0 0 2px ButtonBorder;
            color: ButtonText;
          }
          .p-button .root:focus-visible{
            outline-color: Highlight;
          }
          .p-button[disabled] .root {
            color: GrayText;
            box-shadow: inset 0 0 0 2px GrayText !important;
            opacity: 1;
          }
          .p-button[disabled] .root:is(button) {
            box-shadow: inset 0 0 0 2px ButtonBorder;
            color: ButtonText;
          }
          .p-button[disabled] .label,
          .p-button[disabled] .icon {
            opacity: 1;
            color: GrayText;
          }
        }
        @media (hover: hover) {
          .p-button:not([disabled]):not([loading]) .root:hover {
            color: var(--p-btn-hfg);
            background-color: var(--p-btn-hbg);
          }
          @media (forced-colors: active) {
            .p-button:not([disabled]):not([loading]) .root:hover {
              background: Canvas;
            }
          }
        }
        @media (min-width: 480px) {
          .p-button {
            --_p-button-a: var(--p-btn-scale-xs);
            --_p-link-button-a: var(--p-btn-br-xs);
            border-radius: var(--p-btn-host-r-xs) !important;
          }
          .p-button .root{
            padding: var(--p-btn-pad-xs);
            gap: var(--p-btn-gap-xs);
          }
          .p-button .label{
            position: var(--p-btn-l-pos-xs);
            width: var(--p-btn-l-w-xs);
            height: var(--p-btn-l-h-xs);
            padding: var(--p-btn-l-pad-xs);
            margin: var(--p-btn-l-m-xs);
            overflow: var(--p-btn-l-ov-xs);
            clip: var(--p-btn-l-clip-xs);
            white-space: var(--p-btn-l-ws-xs);
          }
          .p-button .icon{
            margin-inline-start: var(--p-btn-icon-m-xs);
          }
        }
        @media (min-width: 760px) {
          .p-button {
            --_p-button-a: var(--p-btn-scale-s);
            --_p-link-button-a: var(--p-btn-br-s);
            border-radius: var(--p-btn-host-r-s) !important;
          }
          .p-button .root{
            padding: var(--p-btn-pad-s);
            gap: var(--p-btn-gap-s);
          }
          .p-button .label{
            position: var(--p-btn-l-pos-s);
            width: var(--p-btn-l-w-s);
            height: var(--p-btn-l-h-s);
            padding: var(--p-btn-l-pad-s);
            margin: var(--p-btn-l-m-s);
            overflow: var(--p-btn-l-ov-s);
            clip: var(--p-btn-l-clip-s);
            white-space: var(--p-btn-l-ws-s);
          }
          .p-button .icon{
            margin-inline-start: var(--p-btn-icon-m-s);
          }
        }
        @media (min-width: 1000px) {
          .p-button {
            --_p-button-a: var(--p-btn-scale-m);
            --_p-link-button-a: var(--p-btn-br-m);
            border-radius: var(--p-btn-host-r-m) !important;
          }
          .p-button .root{
            padding: var(--p-btn-pad-m);
            gap: var(--p-btn-gap-m);
          }
          .p-button .label{
            position: var(--p-btn-l-pos-m);
            width: var(--p-btn-l-w-m);
            height: var(--p-btn-l-h-m);
            padding: var(--p-btn-l-pad-m);
            margin: var(--p-btn-l-m-m);
            overflow: var(--p-btn-l-ov-m);
            clip: var(--p-btn-l-clip-m);
            white-space: var(--p-btn-l-ws-m);
          }
          .p-button .icon{
            margin-inline-start: var(--p-btn-icon-m-m);
          }
        }
        @media (min-width: 1300px) {
          .p-button {
            --_p-button-a: var(--p-btn-scale-l);
            --_p-link-button-a: var(--p-btn-br-l);
            border-radius: var(--p-btn-host-r-l) !important;
          }
          .p-button .root{
            padding: var(--p-btn-pad-l);
            gap: var(--p-btn-gap-l);
          }
          .p-button .label{
            position: var(--p-btn-l-pos-l);
            width: var(--p-btn-l-w-l);
            height: var(--p-btn-l-h-l);
            padding: var(--p-btn-l-pad-l);
            margin: var(--p-btn-l-m-l);
            overflow: var(--p-btn-l-ov-l);
            clip: var(--p-btn-l-clip-l);
            white-space: var(--p-btn-l-ws-l);
          }
          .p-button .icon{
            margin-inline-start: var(--p-btn-icon-m-l);
          }
        }
        @media (min-width: 1760px) {
          .p-button {
            --_p-button-a: var(--p-btn-scale-xl);
            --_p-link-button-a: var(--p-btn-br-xl);
            border-radius: var(--p-btn-host-r-xl) !important;
          }
          .p-button .root{
            padding: var(--p-btn-pad-xl);
            gap: var(--p-btn-gap-xl);
          }
          .p-button .label{
            position: var(--p-btn-l-pos-xl);
            width: var(--p-btn-l-w-xl);
            height: var(--p-btn-l-h-xl);
            padding: var(--p-btn-l-pad-xl);
            margin: var(--p-btn-l-m-xl);
            overflow: var(--p-btn-l-ov-xl);
            clip: var(--p-btn-l-clip-xl);
            white-space: var(--p-btn-l-ws-xl);
          }
          .p-button .icon{
            margin-inline-start: var(--p-btn-icon-m-xl);
          }
        }
        @media (min-width: 1920px) {
          .p-button {
            --_p-button-a: var(--p-btn-scale-xxl);
            --_p-link-button-a: var(--p-btn-br-xxl);
            border-radius: var(--p-btn-host-r-xxl) !important;
          }
          .p-button .root{
            padding: var(--p-btn-pad-xxl);
            gap: var(--p-btn-gap-xxl);
          }
          .p-button .label{
            position: var(--p-btn-l-pos-xxl);
            width: var(--p-btn-l-w-xxl);
            height: var(--p-btn-l-h-xxl);
            padding: var(--p-btn-l-pad-xxl);
            margin: var(--p-btn-l-m-xxl);
            overflow: var(--p-btn-l-ov-xxl);
            clip: var(--p-btn-l-clip-xxl);
            white-space: var(--p-btn-l-ws-xxl);
          }
          .p-button .icon{
            margin-inline-start: var(--p-btn-icon-m-xxl);
          }
        }`}}),a.jsxs(a.Fragment,{children:[" ",a.jsxs("button",{className:"root",type:t(),children:[a.jsx(j,{className:"icon",size:"inherit",color:"inherit","aria-hidden":"true",name:e(),source:c()}),a.jsx(k,{className:"spinner",size:"inherit","aria-hidden":"true"}),a.jsx("span",{className:"label",children:a.jsx("span",{"data-pds-slot":"",children:n.children})}),a.jsx("span",{className:"loading",id:"loading",role:"status",children:r()})]})," "," "]})]})}export{A as default};
