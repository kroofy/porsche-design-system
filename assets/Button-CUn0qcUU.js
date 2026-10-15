import{a as f}from"./host-DRskmCSE.js";import w from"./Spinner-TTCsUayI.js";import y from"./Icon-DzSCh0v5.js";import{I as b,C as _,V as $,a as k}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";var B=Object.defineProperty,T=Object.getOwnPropertyDescriptor,e=(t,o,a,i)=>{for(var n=i>1?void 0:i?T(o,a):o,r=t.length-1,p;r>=0;r--)(p=t[r])&&(n=(i?p(o,a,n):p(n))||n);return i&&n&&B(o,a,n),n};const h=["base","xs","s","m","l","xl","xxl"],m=(t,o)=>{if(t==null)return o;if(t==="")return!0;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return o}return t},g=t=>t===!0||t==="true"||t==="",c=(t,o,a)=>t&&typeof t=="object"?t[o]===void 0?a:t[o]:t,x=(t,o,a,i)=>{const n=o==="base"?"":`-${o}`,r=g(a);if(t[`--p-btn-scale${n}`]=g(i)?"0.64285714":"1",t[`--p-btn-br${n}`]=g(i)?"var(--p-radius-lg)":"var(--p-radius-xl)",t[`--p-btn-host-r${n}`]=r?"var(--p-button-radius, var(--p-radius-full))":"var(--p-button-radius, var(--_p-link-button-a))",t[`--p-btn-pad${n}`]=r?"var(--p-button-py, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px)) var(--p-button-px, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px))":"var(--p-button-py, calc(28px * (var(--_p-button-a) - 0.64285714) + 6px)) var(--p-button-px, calc(33.6px * (var(--_p-button-a) - 0.64285714) + 16px))",t[`--p-btn-gap${n}`]=r?"var(--p-button-gap, 0)":"var(--p-button-gap, calc(11.2px * (var(--_p-button-a) - 0.64285714) + 4px))",t[`--p-btn-icon-m${n}`]=r?"0":"calc(-1 * (11.2px * (var(--_p-button-a) - 0.64285714) + 4px))",r){t[`--p-btn-l-pos${n}`]="absolute",t[`--p-btn-l-w${n}`]="1px",t[`--p-btn-l-h${n}`]="1px",t[`--p-btn-l-pad${n}`]="0",t[`--p-btn-l-m${n}`]="-1px",t[`--p-btn-l-ov${n}`]="hidden",t[`--p-btn-l-clip${n}`]="rect(0, 0, 0, 0)",t[`--p-btn-l-ws${n}`]="nowrap";return}t[`--p-btn-l-pos${n}`]="static",t[`--p-btn-l-w${n}`]="auto",t[`--p-btn-l-h${n}`]="auto",t[`--p-btn-l-pad${n}`]="0",t[`--p-btn-l-m${n}`]="0",t[`--p-btn-l-ov${n}`]="visible",t[`--p-btn-l-clip${n}`]="auto",t[`--p-btn-l-ws${n}`]="normal"};let l=class{constructor(){this.hostAttr=f}get hostStyle(){const t=this.variant||"primary",o=m(this.hideLabel,!1),a=m(this.compact,!1),i={primary:{bg:"var(--p-button-bg, var(--p-color-primary))",fg:"var(--p-button-fg, var(--p-color-canvas))",hoverBg:"var(--p-button-bg, var(--p-color-contrast-high))",hoverFg:"var(--p-button-fg, var(--p-color-canvas))"},secondary:{bg:"var(--p-button-bg, var(--p-color-frosted-strong))",fg:"var(--p-button-fg, var(--p-color-primary))",hoverBg:"var(--p-button-bg, var(--p-color-frosted))",hoverFg:"var(--p-button-fg, var(--p-color-primary))"},destructive:{bg:"var(--p-button-bg, var(--p-color-error))",fg:"var(--p-button-fg, var(--p-color-canvas))",hoverBg:"var(--p-button-bg, var(--p-color-error-medium))",hoverFg:"var(--p-button-fg, var(--p-color-primary))"}},n=i[t]||i.primary,r={"--p-btn-bg":n.bg,"--p-btn-fg":n.fg,"--p-btn-hbg":n.hoverBg,"--p-btn-hfg":n.hoverFg};if(typeof o=="object"||typeof a=="object"){const p=typeof o=="object"&&o!==null?o:null,s=typeof a=="object"&&a!==null?a:null;let u=p?c(p,"base",!1):o,v=s?c(s,"base",!1):a;for(const d of h)p&&p[d]!==void 0&&(u=c(p,d,u)),s&&s[d]!==void 0&&(v=c(s,d,v)),x(r,d,u,v)}else for(const p of h)x(r,p,o,a);return r}get iconName(){if(this.iconSource)return"";const t=this.icon||"none";return t==="none"||t===""?"":t}get iconSrc(){return this.iconSource||""}get buttonType(){return this.type||"submit"}get ariaDisabled(){const t=this.disabled===!0||this.disabled==="true"||this.disabled==="",o=this.loading===!0||this.loading==="true"||this.loading==="";return t||o?"true":""}get loadingText(){return this.loading===!0||this.loading==="true"||this.loading===""?"Loading":""}};e([b()],l.prototype,"variant",2);e([b()],l.prototype,"hideLabel",2);e([b()],l.prototype,"compact",2);e([b()],l.prototype,"iconSource",2);e([b()],l.prototype,"icon",2);e([b()],l.prototype,"type",2);e([b()],l.prototype,"disabled",2);e([b()],l.prototype,"loading",2);l=e([_({selector:"p-button",standalone:!0,imports:[k,y,w],encapsulation:$.None,template:`
    <div class="p-button" data-pds="button" [style]="hostStyle" [attr.disabled]="hostAttr(disabled) ?? null" [attr.icon]="hostAttr(icon) ?? null" [attr.icon-source]="hostAttr(iconSource) ?? null" [attr.loading]="hostAttr(loading) ?? null">
    <button class="root" [attr.type]="buttonType">
      <p-icon
        class="icon"
        size="inherit"
        color="inherit"
        aria-hidden="true"
        [name]="iconName"
        [source]="iconSrc"
      ></p-icon>
      <p-spinner class="spinner" size="inherit" aria-hidden="true"></p-spinner>
      <span class="label"><span data-pds-slot=""><ng-content></ng-content></span></span>
      <span class="loading" id="loading" role="status">{{loadingText}}</span>
    </button>
  
    </div>
  `,styles:[`.p-button :where([data-pds-slot]){display:contents}

      .p-button {
        display: contents;
      }
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
      }`]})],l);export{l as default};
