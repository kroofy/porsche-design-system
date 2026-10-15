import{j as i}from"./react-C3neMvrl.js";import{h as b}from"./host-DRskmCSE.js";import w from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const x=["base","xs","s","m","l","xl","xxl"],h=(n,a)=>{if(n==null)return a;if(n==="")return!0;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return a}return n},g=n=>n===!0||n==="true"||n==="",k=(n,a,t)=>n&&typeof n=="object"?n[a]===void 0?t:n[a]:n,f=(n,a,t,c)=>{const l=a==="base"?"":`-${a}`,p=g(t),r=g(c);if(n[`--p-lnk-scale${l}`]=r?"0.64285714":"1",n[`--p-lnk-br${l}`]=r?"var(--p-radius-lg)":"var(--p-radius-xl)",n[`--p-lnk-host-r${l}`]=p?"var(--p-link-radius, var(--p-radius-full))":"var(--p-link-radius, var(--_p-link-button-a))",n[`--p-lnk-slot-r${l}`]=p?"var(--p-link-radius, var(--p-radius-full))":r?"var(--p-link-radius, var(--p-radius-lg))":"var(--p-link-radius, var(--p-radius-xl))",n[`--p-lnk-pad${l}`]=p?"var(--p-link-py, calc(28px * (var(--_p-link-a) - 0.64285714) + 6px)) var(--p-link-px, calc(28px * (var(--_p-link-a) - 0.64285714) + 6px))":"var(--p-link-py, calc(28px * (var(--_p-link-a) - 0.64285714) + 6px)) var(--p-link-px, calc(33.6px * (var(--_p-link-a) - 0.64285714) + 16px))",n[`--p-lnk-gap${l}`]=p?"var(--p-link-gap, 0)":"var(--p-link-gap, calc(11.2px * (var(--_p-link-a) - 0.64285714) + 4px))",n[`--p-lnk-icon-m${l}`]=p?"0":"calc(-1 * (11.2px * (var(--_p-link-a) - 0.64285714) + 4px))",p){n[`--p-lnk-l-pos${l}`]="absolute",n[`--p-lnk-l-w${l}`]="1px",n[`--p-lnk-l-h${l}`]="1px",n[`--p-lnk-l-pad${l}`]="0",n[`--p-lnk-l-m${l}`]="-1px",n[`--p-lnk-l-ov${l}`]="hidden",n[`--p-lnk-l-clip${l}`]=a==="base"?"unset":"rect(0, 0, 0, 0)",n[`--p-lnk-l-ws${l}`]="nowrap";return}n[`--p-lnk-l-pos${l}`]="static",n[`--p-lnk-l-w${l}`]="auto",n[`--p-lnk-l-h${l}`]="auto",n[`--p-lnk-l-pad${l}`]="0",n[`--p-lnk-l-m${l}`]="0",n[`--p-lnk-l-ov${l}`]="visible",n[`--p-lnk-l-clip${l}`]=a==="base"?"unset":"auto",n[`--p-lnk-l-ws${l}`]="normal"};function B(n){function a(){const l=n.variant||"primary",p=h(n.hideLabel,!1),r=h(n.compact,!1),v=l==="secondary",d={"--p-lnk-bg":v?"var(--p-link-bg, var(--p-color-frosted-strong))":"var(--p-link-bg, var(--p-color-primary))","--p-lnk-fg":v?"var(--p-link-fg, var(--p-color-primary))":"var(--p-link-fg, var(--p-color-canvas))","--p-lnk-hbg":v?"var(--p-link-bg, var(--p-color-frosted))":"var(--p-link-bg, var(--p-color-contrast-high))"};if(typeof p=="object"||typeof r=="object"){const o=typeof p=="object"&&p!==null?p:null,e=typeof r=="object"&&r!==null?r:null;let u=o?k(o,"base",!1):p,m=e?k(e,"base",!1):r;for(const s of x)o&&o[s]!==void 0&&(u=k(o,s,u)),e&&e[s]!==void 0&&(m=k(e,s,m)),f(d,s,u,m)}else for(const o of x)f(d,o,p,r);return d}function t(){if(n.iconSource)return"";const l=n.icon||"none";return l==="none"||l===""?"":l}function c(){return n.iconSource||""}return i.jsxs("div",{className:["p-link",n.className].filter(Boolean).join(" "),"data-pds":"link",style:a(),...b({href:n.href,icon:n.icon,"icon-source":n.iconSource}),children:[i.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-link :where([data-pds-slot]){display:contents}

        .p-link {
          display: inline-block;
          vertical-align: top;
          --_p-link-a: var(--p-lnk-scale);
          --_p-link-button-a: var(--p-lnk-br);
          --p-lnk-slot-cur: var(--p-lnk-slot-r);
          border-radius: var(--p-lnk-host-r) !important;
        }
        .p-link[hidden] {
          display: none !important;
        }
        .p-link [data-pds-slot] > a{
          all: unset !important;
        }
        .p-link [data-pds-slot] > a::before{
          content: "" !important;
          position: fixed !important;
          inset: 0 !important;
          border-radius: var(--p-lnk-slot-cur) !important;
        }
        .p-link [data-pds-slot] > a:focus-visible::before{
          outline: 2px solid var(--p-color-focus) !important;
          outline-offset: 2px !important;
        }
        .p-link .root{
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
          background-color: var(--p-lnk-bg);
          color: var(--p-lnk-fg);
          cursor: pointer;
          transition: background-color
              var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            border-color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
          padding: var(--p-lnk-pad);
          gap: var(--p-lnk-gap);
        }
        .p-link[href] .root:focus-visible {
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-link .label{
          position: var(--p-lnk-l-pos);
          width: var(--p-lnk-l-w);
          height: var(--p-lnk-l-h);
          padding: var(--p-lnk-l-pad);
          margin: var(--p-lnk-l-m);
          overflow: var(--p-lnk-l-ov);
          clip: var(--p-lnk-l-clip);
          white-space: var(--p-lnk-l-ws);
        }
        .p-link .icon,
        .p-link .p-icon{
          font: var(--p-typescale-sm) var(--p-font-porsche-next);
          width: var(--p-leading-normal);
          height: var(--p-leading-normal);
          margin-inline-start: var(--p-lnk-icon-m);
        }
        .p-link:not([icon-source]):not([icon]) .p-icon,
        .p-link[icon="none"]:not([icon-source]) .p-icon,
        .p-link[icon=""]:not([icon-source]) .p-icon {
          display: none;
        }
        @media (forced-colors: active) {
          .p-link .root{
            forced-color-adjust: none;
            background: Canvas;
            color: LinkText;
            box-shadow: inset 0 0 0 2px LinkText;
          }
          .p-link .root:is(button){
            box-shadow: inset 0 0 0 2px ButtonBorder;
            color: ButtonText;
          }
          .p-link[href] .root:focus-visible {
            outline-color: Highlight;
          }
          .p-link [data-pds-slot] > a:focus-visible::before{
            outline-color: Highlight !important;
          }
        }
        @media (hover: hover) {
          .p-link .root:hover{
            color: var(--p-lnk-fg);
            background-color: var(--p-lnk-hbg);
          }
          @media (forced-colors: active) {
            .p-link .root:hover{
              background: Canvas;
            }
          }
        }
        @media (min-width: 480px) {
          .p-link {
            --_p-link-a: var(--p-lnk-scale-xs);
            --_p-link-button-a: var(--p-lnk-br-xs);
            --p-lnk-slot-cur: var(--p-lnk-slot-r-xs);
            border-radius: var(--p-lnk-host-r-xs) !important;
          }
          .p-link .root{
            padding: var(--p-lnk-pad-xs);
            gap: var(--p-lnk-gap-xs);
          }
          .p-link .label{
            position: var(--p-lnk-l-pos-xs);
            width: var(--p-lnk-l-w-xs);
            height: var(--p-lnk-l-h-xs);
            padding: var(--p-lnk-l-pad-xs);
            margin: var(--p-lnk-l-m-xs);
            overflow: var(--p-lnk-l-ov-xs);
            clip: var(--p-lnk-l-clip-xs);
            white-space: var(--p-lnk-l-ws-xs);
          }
          .p-link .icon,
          .p-link .p-icon{
            margin-inline-start: var(--p-lnk-icon-m-xs);
          }
        }
        @media (min-width: 760px) {
          .p-link {
            --_p-link-a: var(--p-lnk-scale-s);
            --_p-link-button-a: var(--p-lnk-br-s);
            --p-lnk-slot-cur: var(--p-lnk-slot-r-s);
            border-radius: var(--p-lnk-host-r-s) !important;
          }
          .p-link .root{
            padding: var(--p-lnk-pad-s);
            gap: var(--p-lnk-gap-s);
          }
          .p-link .label{
            position: var(--p-lnk-l-pos-s);
            width: var(--p-lnk-l-w-s);
            height: var(--p-lnk-l-h-s);
            padding: var(--p-lnk-l-pad-s);
            margin: var(--p-lnk-l-m-s);
            overflow: var(--p-lnk-l-ov-s);
            clip: var(--p-lnk-l-clip-s);
            white-space: var(--p-lnk-l-ws-s);
          }
          .p-link .icon,
          .p-link .p-icon{
            margin-inline-start: var(--p-lnk-icon-m-s);
          }
        }
        @media (min-width: 1000px) {
          .p-link {
            --_p-link-a: var(--p-lnk-scale-m);
            --_p-link-button-a: var(--p-lnk-br-m);
            --p-lnk-slot-cur: var(--p-lnk-slot-r-m);
            border-radius: var(--p-lnk-host-r-m) !important;
          }
          .p-link .root{
            padding: var(--p-lnk-pad-m);
            gap: var(--p-lnk-gap-m);
          }
          .p-link .label{
            position: var(--p-lnk-l-pos-m);
            width: var(--p-lnk-l-w-m);
            height: var(--p-lnk-l-h-m);
            padding: var(--p-lnk-l-pad-m);
            margin: var(--p-lnk-l-m-m);
            overflow: var(--p-lnk-l-ov-m);
            clip: var(--p-lnk-l-clip-m);
            white-space: var(--p-lnk-l-ws-m);
          }
          .p-link .icon,
          .p-link .p-icon{
            margin-inline-start: var(--p-lnk-icon-m-m);
          }
        }
        @media (min-width: 1300px) {
          .p-link {
            --_p-link-a: var(--p-lnk-scale-l);
            --_p-link-button-a: var(--p-lnk-br-l);
            --p-lnk-slot-cur: var(--p-lnk-slot-r-l);
            border-radius: var(--p-lnk-host-r-l) !important;
          }
          .p-link .root{
            padding: var(--p-lnk-pad-l);
            gap: var(--p-lnk-gap-l);
          }
          .p-link .label{
            position: var(--p-lnk-l-pos-l);
            width: var(--p-lnk-l-w-l);
            height: var(--p-lnk-l-h-l);
            padding: var(--p-lnk-l-pad-l);
            margin: var(--p-lnk-l-m-l);
            overflow: var(--p-lnk-l-ov-l);
            clip: var(--p-lnk-l-clip-l);
            white-space: var(--p-lnk-l-ws-l);
          }
          .p-link .icon,
          .p-link .p-icon{
            margin-inline-start: var(--p-lnk-icon-m-l);
          }
        }
        @media (min-width: 1760px) {
          .p-link {
            --_p-link-a: var(--p-lnk-scale-xl);
            --_p-link-button-a: var(--p-lnk-br-xl);
            --p-lnk-slot-cur: var(--p-lnk-slot-r-xl);
            border-radius: var(--p-lnk-host-r-xl) !important;
          }
          .p-link .root{
            padding: var(--p-lnk-pad-xl);
            gap: var(--p-lnk-gap-xl);
          }
          .p-link .label{
            position: var(--p-lnk-l-pos-xl);
            width: var(--p-lnk-l-w-xl);
            height: var(--p-lnk-l-h-xl);
            padding: var(--p-lnk-l-pad-xl);
            margin: var(--p-lnk-l-m-xl);
            overflow: var(--p-lnk-l-ov-xl);
            clip: var(--p-lnk-l-clip-xl);
            white-space: var(--p-lnk-l-ws-xl);
          }
          .p-link .icon,
          .p-link .p-icon{
            margin-inline-start: var(--p-lnk-icon-m-xl);
          }
        }
        @media (min-width: 1920px) {
          .p-link {
            --_p-link-a: var(--p-lnk-scale-xxl);
            --_p-link-button-a: var(--p-lnk-br-xxl);
            --p-lnk-slot-cur: var(--p-lnk-slot-r-xxl);
            border-radius: var(--p-lnk-host-r-xxl) !important;
          }
          .p-link .root{
            padding: var(--p-lnk-pad-xxl);
            gap: var(--p-lnk-gap-xxl);
          }
          .p-link .label{
            position: var(--p-lnk-l-pos-xxl);
            width: var(--p-lnk-l-w-xxl);
            height: var(--p-lnk-l-h-xxl);
            padding: var(--p-lnk-l-pad-xxl);
            margin: var(--p-lnk-l-m-xxl);
            overflow: var(--p-lnk-l-ov-xxl);
            clip: var(--p-lnk-l-clip-xxl);
            white-space: var(--p-lnk-l-ws-xxl);
          }
          .p-link .icon,
          .p-link .p-icon{
            margin-inline-start: var(--p-lnk-icon-m-xxl);
          }
        }`}}),i.jsxs(i.Fragment,{children:[" ",i.jsxs("span",{className:"root",children:[i.jsx(w,{className:"icon",size:"inherit",color:"inherit","aria-hidden":"true",name:t(),source:c()}),i.jsx("span",{className:"label",children:i.jsx("span",{"data-pds-slot":"",children:n.children})})]})," "," "]})]})}export{B as default};
