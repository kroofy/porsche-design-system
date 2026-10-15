import{a as L}from"./host-DRskmCSE.js";import O from"./Spinner-TTCsUayI.js";import A from"./Icon-DzSCh0v5.js";import{I as u,C as P,V as T,a as _}from"./angular-aNJmk6GY.js";import"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var k=Object.defineProperty,C=Object.getOwnPropertyDescriptor,n=(t,p,o,i)=>{for(var e=i>1?void 0:i?C(p,o):p,l=t.length-1,r;l>=0;l--)(r=t[l])&&(e=(i?r(p,o,e):r(e))||e);return i&&e&&k(p,o,e),e};const j={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},z={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",inherit:"currentcolor"},S=["base","xs","s","m","l","xl","xxl"],f=(t,p)=>{if(t==null)return p;if(t==="")return typeof p=="boolean"?!0:p;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return p}return t},w=t=>t===!0||t==="true"||t==="",c=(t,p,o)=>t&&typeof t=="object"?t[p]===void 0?o:t[p]:t,I=t=>t==="inherit"?"":j[String(t)]||j.sm,$=(t,p,o,i,e,l)=>{const r=p==="base"?"":`-${p}`,a=w(e),b=w(i);t[`--p-bp-host-d${r}`]=b?"block":"inline-block",t[`--p-bp-host-w${r}`]=b?"100%":"auto",t[`--p-bp-fs${r}`]=I(o),t[`--p-bp-gap${r}`]=a?"0":"var(--p-spacing-static-xs)",t[`--p-bp-just${r}`]=b?"space-between":"flex-start",t[`--p-bp-ai${r}`]=b?"center":"flex-start",t[`--p-bp-inset${r}`]=a?"-2px":"-4px",t[`--p-bp-rad${r}`]=a?"var(--p-radius-full)":"var(--p-radius-lg)",t[`--p-bp-l-ws${r}`]=a?"nowrap":"",t[`--p-bp-l-ti${r}`]=a?"-999999px":"0",t[`--p-bp-l-ov${r}`]=a?"hidden":"visible",t[`--p-bp-l-ord${r}`]=l==="start"||l==="left"?"-1":"0"};let s=class{constructor(){this.hostAttr=L}get hostStyle(){const t=w(this.disabled),p=f(this.size,"sm"),o=f(this.stretch,!1),i=f(this.hideLabel,!1),e=f(this.alignLabel,"end"),l={"--p-bp-fg":t?"var(--p-color-contrast-low)":z[this.color||"primary"]||z.primary};if(typeof p=="object"||typeof o=="object"||typeof i=="object"||typeof e=="object"){const a=typeof p=="object"&&p!==null?p:null,b=typeof o=="object"&&o!==null?o:null,v=typeof i=="object"&&i!==null?i:null,h=typeof e=="object"&&e!==null?e:null;let x=a?c(a,"base","sm"):p,g=b?c(b,"base",!1):o,m=v?c(v,"base",!1):i,y=h?c(h,"base","end"):e;for(const d of S)a&&a[d]!==void 0&&(x=c(a,d,x)),b&&b[d]!==void 0&&(g=c(b,d,g)),v&&v[d]!==void 0&&(m=c(v,d,m)),h&&h[d]!==void 0&&(y=c(h,d,y)),$(l,d,x,g,m,y)}else for(const a of S)$(l,a,p,o,i,e);return l}get iconName(){const t=this.icon||"arrow-right";return t==="none"?"":t}get iconSrc(){if(this.iconSource)return this.iconSource;const t={copy:"copy.0fcd086.svg",like:"like.a7468cd.svg"},p=this.icon||"arrow-right";return t[p]?"https://cdn.ui.porsche.com/porsche-design-system/icons/"+t[p]:""}get buttonType(){return this.type||"submit"}get ariaDisabled(){const t=this.disabled===!0||this.disabled==="true"||this.disabled==="",p=this.loading===!0||this.loading==="true"||this.loading==="";return t||p?"true":""}get loadingText(){return this.loading===!0||this.loading==="true"||this.loading===""?"Loading":""}};n([u()],s.prototype,"disabled",2);n([u()],s.prototype,"size",2);n([u()],s.prototype,"stretch",2);n([u()],s.prototype,"hideLabel",2);n([u()],s.prototype,"alignLabel",2);n([u()],s.prototype,"color",2);n([u()],s.prototype,"icon",2);n([u()],s.prototype,"iconSource",2);n([u()],s.prototype,"type",2);n([u()],s.prototype,"loading",2);s=n([P({selector:"p-button-pure",standalone:!0,imports:[_,A,O],encapsulation:T.None,template:`
    <div class="p-button-pure" data-pds="button-pure" [style]="hostStyle" [attr.disabled]="hostAttr(disabled) ?? null" [attr.icon]="hostAttr(icon) ?? null" [attr.icon-source]="hostAttr(iconSource) ?? null" [attr.loading]="hostAttr(loading) ?? null">
    <button class="root" [attr.type]="buttonType">
      <p-icon
        class="icon"
        size="inherit"
        color="inherit"
        aria-hidden="true"
        [name]="iconName"
        [source]="iconSrc"
      ></p-icon>
      <p-spinner
        class="icon"
        size="inherit"
        color="inherit"
        aria-hidden="true"
      ></p-spinner>
      <span class="label"><span data-pds-slot=""><ng-content></ng-content></span></span>
      <span class="loading" id="loading" role="status">{{loadingText}}</span>
    </button>
  
    </div>
  `,styles:[`.p-button-pure :where([data-pds-slot]){display:contents}

      .p-button-pure {
        display: contents;
      }
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
      }`]})],s);export{s as default};
