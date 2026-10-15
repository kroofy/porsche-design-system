import{a as $}from"./host-DRskmCSE.js";import S from"./Icon-DzSCh0v5.js";import{I as u,C as O,V as L,a as A}from"./angular-aNJmk6GY.js";import"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var P=Object.defineProperty,_=Object.getOwnPropertyDescriptor,v=(p,t,l,e)=>{for(var o=e>1?void 0:e?_(t,l):t,d=p.length-1,r;d>=0;d--)(r=p[d])&&(o=(e?r(t,l,o):r(o))||o);return e&&o&&P(t,l,o),o};const y={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},k={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",inherit:"currentcolor"},w=["base","xs","s","m","l","xl","xxl"],x=(p,t)=>{if(p==null)return t;if(p==="")return typeof t=="boolean"?!0:t;if(typeof p=="string"&&p.charAt(0)==="{")try{return JSON.parse(p.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return t}return p},j=p=>p===!0||p==="true"||p==="",c=(p,t,l)=>p&&typeof p=="object"?p[t]===void 0?l:p[t]:p,C=p=>p==="inherit"?"":y[String(p)]||y.sm,z=(p,t,l,e,o,d)=>{const r=t==="base"?"":`-${t}`,i=j(o),a=j(e);p[`--p-lp-host-d${r}`]=a?"block":"inline-block",p[`--p-lp-host-w${r}`]=a?"100%":"auto",p[`--p-lp-fs${r}`]=C(l),p[`--p-lp-gap${r}`]=i?"0":"var(--p-spacing-static-xs)",p[`--p-lp-just${r}`]=a?"space-between":"flex-start",p[`--p-lp-ai${r}`]=a?"center":"flex-start",p[`--p-lp-inset${r}`]=i?"-2px":"-4px",p[`--p-lp-rad${r}`]=i?"var(--p-radius-full)":"var(--p-radius-lg)",p[`--p-lp-l-ws${r}`]=i?"nowrap":"",p[`--p-lp-l-ti${r}`]=i?"-999999px":"0",p[`--p-lp-l-ov${r}`]=i?"hidden":"visible",p[`--p-lp-l-ord${r}`]=d==="start"||d==="left"?"-1":"0"};let n=class{constructor(){this.hostAttr=$}get hostStyle(){const p=x(this.size,"sm"),t=x(this.stretch,!1),l=x(this.hideLabel,!1),e=x(this.alignLabel,"end"),o={"--p-lp-fg":k[this.color||"primary"]||k.primary};if(typeof p=="object"||typeof t=="object"||typeof l=="object"||typeof e=="object"){const r=typeof p=="object"&&p!==null?p:null,i=typeof t=="object"&&t!==null?t:null,a=typeof l=="object"&&l!==null?l:null,f=typeof e=="object"&&e!==null?e:null;let h=r?c(r,"base","sm"):p,m=i?c(i,"base",!1):t,b=a?c(a,"base",!1):l,g=f?c(f,"base","end"):e;for(const s of w)r&&r[s]!==void 0&&(h=c(r,s,h)),i&&i[s]!==void 0&&(m=c(i,s,m)),a&&a[s]!==void 0&&(b=c(a,s,b)),f&&f[s]!==void 0&&(g=c(f,s,g)),z(o,s,h,m,b,g)}else for(const r of w)z(o,r,p,t,l,e);return o}get iconName(){const p=this.icon||"arrow-right";return p==="none"?"":p}get iconSrc(){return this.iconSource||""}};v([u()],n.prototype,"size",2);v([u()],n.prototype,"stretch",2);v([u()],n.prototype,"hideLabel",2);v([u()],n.prototype,"alignLabel",2);v([u()],n.prototype,"color",2);v([u()],n.prototype,"icon",2);v([u()],n.prototype,"iconSource",2);n=v([O({selector:"p-link-pure",standalone:!0,imports:[A,S],encapsulation:L.None,template:`
    <div class="p-link-pure" data-pds="link-pure" [style]="hostStyle" [attr.icon]="hostAttr(icon) ?? null" [attr.icon-source]="hostAttr(iconSource) ?? null">
    <span class="root"
      ><p-icon
        class="icon"
        size="inherit"
        color="inherit"
        aria-hidden="true"
        [name]="iconName"
        [source]="iconSrc"
      ></p-icon>
      <span class="label"><span data-pds-slot=""><ng-content></ng-content></span></span
    ></span>
  
    </div>
  `,styles:[`.p-link-pure :where([data-pds-slot]){display:contents}

      .p-link-pure {
        display: contents;
      }
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
      }`]})],n);export{n as default};
