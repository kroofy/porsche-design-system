import{I as c,C as j,V as $,a as O}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var S=Object.defineProperty,_=Object.getOwnPropertyDescriptor,b=(t,o,e,r)=>{for(var l=r>1?void 0:r?_(o,e):o,d=t.length-1,a;d>=0;d--)(a=t[d])&&(l=(r?a(o,e,l):a(l))||l);return r&&l&&S(o,e,l),l};const y={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},w={regular:"var(--p-font-weight-normal)","semi-bold":"var(--p-font-weight-semibold)",normal:"var(--p-font-weight-normal)",semibold:"var(--p-font-weight-semibold)",bold:"var(--p-font-weight-bold)"},z=["base","xs","s","m","l","xl","xxl"],u=(t,o)=>{if(t==null)return o;if(t==="")return typeof o=="boolean"?!0:o;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return o}return t==="true"?!0:t==="false"?!1:t},s=(t,o,e)=>t&&typeof t=="object"?t[o]===void 0?e:t[o]:t,P=t=>t==="inherit"?"":y[String(t)]||y.medium,T=t=>w[String(t)]||w["semi-bold"],k=(t,o,e,r,l,d)=>{const a=o==="base"?"":`-${o}`,p=d===!0||d==="true";t[`--p-bt-fs${a}`]=P(e),t[`--p-bt-fw${a}`]=T(r),t[`--p-bt-ar${a}`]=String(l||"4/3"),t[`--p-bt-foot-d${a}`]=p?"grid":"flex",t[`--p-bt-foot-cols${a}`]=p?"minmax(0, 1fr) auto":"none",t[`--p-bt-foot-gap${a}`]=p?"var(--p-spacing-static-md)":"0",t[`--p-bt-foot-dir${a}`]=p?"row":"column",t[`--p-bt-foot-ai${a}`]=p?"stretch":"start",t[`--p-bt-pure-d${a}`]=p?"inline-block":"none",t[`--p-bt-btn-d${a}`]=p?"none":"inline-block"};let n=class{get hostStyle(){const t=u(this.size,"medium"),o=u(this.weight,"semi-bold"),e=u(this.aspectRatio,"4/3");let r=u(this.compact,!1);this.compact==="true"&&(r=!0),this.compact==="false"&&(r=!1);const l={"--p-bt-pure-row":"1 / 2"};if(typeof t=="object"||typeof o=="object"||typeof e=="object"||typeof r=="object"){const a=typeof t=="object"&&t!==null?t:null,p=typeof o=="object"&&o!==null?o:null,v=typeof e=="object"&&e!==null?e:null,f=typeof r=="object"&&r!==null?r:null;let m=a?s(a,"base","medium"):t,h=p?s(p,"base","semi-bold"):o,g=v?s(v,"base","4/3"):e,x=f?s(f,"base",!1):r;for(const i of z)a&&a[i]!==void 0&&(m=s(a,i,m)),p&&p[i]!==void 0&&(h=s(p,i,h)),v&&v[i]!==void 0&&(g=s(v,i,g)),f&&f[i]!==void 0&&(x=s(f,i,x)),k(l,i,m,h,g,x)}else for(const a of z)k(l,a,t,o,e,r);return l}get descriptionText(){return this.description||""}get labelText(){return this.label||""}};b([c()],n.prototype,"size",2);b([c()],n.prototype,"weight",2);b([c()],n.prototype,"aspectRatio",2);b([c()],n.prototype,"compact",2);b([c()],n.prototype,"description",2);b([c()],n.prototype,"label",2);n=b([j({selector:"p-button-tile",standalone:!0,imports:[O],encapsulation:$.None,template:`
    <div class="p-button-tile" data-pds="button-tile" [style]="hostStyle">
    <div class="root">
      <span data-pds-slot="header"><ng-content select="[slot=header]"></ng-content></span>
      <div class="media"><span data-pds-slot=""><ng-content></ng-content></span></div>
      <div class="footer">
        <p>{{descriptionText}}</p>
        <span data-pds-slot="footer"><ng-content select="[slot=footer]"></ng-content></span>
      </div>
    </div>
  
    </div>
  `,styles:[`.p-button-tile :where([data-pds-slot]){display:contents}

      .p-button-tile {
        display: contents;
      }
      .p-button-tile {
        display: flex;
        align-items: stretch;
        color-scheme: dark;
        hyphens: auto;
      }
      .p-button-tile[hidden] {
        display: none !important;
      }
      .p-button-tile [data-pds-slot]{
        display: block;
      }
      .p-button-tile [data-pds-slot]:not([name]){
        width: 100%;
        height: 100%;
        transition: transform var(--p-transition-duration, var(--p-duration-md))
          var(--p-ease-in-out);
      }
      .p-button-tile [data-pds-slot="header"]{
        grid-area: 2 / 2;
        z-index: 5;
      }
      .p-button-tile[align="top"] [data-pds-slot="header"] {
        grid-area: 4 / 2;
      }
      .p-button-tile [data-pds-slot="footer"]{
        grid-row: 2;
        z-index: 3;
      }
      .p-button-tile [data-pds-slot] > :is(img, video, picture){
        display: block !important;
        width: 100% !important;
        height: 100% !important;
      }
      .p-button-tile [data-pds-slot] > :is(img, video){
        object-fit: cover !important;
      }
      .p-button-tile a{
        grid-area: 1 / 1 / -1 / -1;
        z-index: 4;
        outline: 0;
      }
      .p-button-tile p{
        all: unset;
        z-index: 3;
        max-width: 34.375rem;
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-color-primary);
        hyphens: inherit;
        font-size: inherit;
        font-size: var(--p-bt-fs);
        font-weight: var(--p-bt-fw);
      }
      @supports (-webkit-hyphens: auto) {
        .p-button-tile {
          align-items: baseline;
        }
      }
      .p-button-tile .root{
        display: grid;
        grid-template:
          var(--p-spacing-fluid-md) auto minmax(0px, 1fr) auto var(
            --p-spacing-fluid-md
          )
          / var(--p-spacing-fluid-md) minmax(0px, 1fr) var(--p-spacing-fluid-md);
        width: 100%;
        border-radius: var(--p-radius-3xl);
        aspect-ratio: var(--p-bt-ar);
        cursor: pointer;
      }
      .p-button-tile[disabled] .root,
      .p-button-tile[loading] .root {
        cursor: not-allowed;
      }
      .p-button-tile .root::after{
        content: "";
        z-index: 2;
        grid-area: 4 / 1 / 6 / -1;
        background: linear-gradient(
          to top,
          hsla(from var(--p-color-canvas) h s l / 0.8) 0%,
          hsla(from var(--p-color-canvas) h s l / 0.8) 8.1%,
          hsla(from var(--p-color-canvas) h s l / 0.8) 15.5%,
          hsla(from var(--p-color-canvas) h s l / 0.8) 22.5%,
          hsla(from var(--p-color-canvas) h s l / 0.78) 29%,
          hsla(from var(--p-color-canvas) h s l / 0.73) 35.3%,
          hsla(from var(--p-color-canvas) h s l / 0.67) 41.2%,
          hsla(from var(--p-color-canvas) h s l / 0.6) 47.1%,
          hsla(from var(--p-color-canvas) h s l / 0.52) 52.9%,
          hsla(from var(--p-color-canvas) h s l / 0.44) 58.8%,
          hsla(from var(--p-color-canvas) h s l / 0.33) 64.7%,
          hsla(from var(--p-color-canvas) h s l / 0.22) 71%,
          hsla(from var(--p-color-canvas) h s l / 0.12) 77.5%,
          hsla(from var(--p-color-canvas) h s l / 0.05) 84.5%,
          hsla(from var(--p-color-canvas) h s l / 0.011) 91.9%,
          hsla(from var(--p-color-canvas) h s l / 0) 100%
        );
        margin-top: calc(var(--p-spacing-fluid-lg) * -1);
        border-end-start-radius: inherit;
        border-end-end-radius: inherit;
      }
      .p-button-tile[align="top"] .root::after {
        grid-area: 1 / 1 / 3 / -1;
        background: linear-gradient(
          to bottom,
          hsla(from var(--p-color-canvas) h s l / 0.8) 0%,
          hsla(from var(--p-color-canvas) h s l / 0.8) 8.1%,
          hsla(from var(--p-color-canvas) h s l / 0.8) 15.5%,
          hsla(from var(--p-color-canvas) h s l / 0.8) 22.5%,
          hsla(from var(--p-color-canvas) h s l / 0.78) 29%,
          hsla(from var(--p-color-canvas) h s l / 0.73) 35.3%,
          hsla(from var(--p-color-canvas) h s l / 0.67) 41.2%,
          hsla(from var(--p-color-canvas) h s l / 0.6) 47.1%,
          hsla(from var(--p-color-canvas) h s l / 0.52) 52.9%,
          hsla(from var(--p-color-canvas) h s l / 0.44) 58.8%,
          hsla(from var(--p-color-canvas) h s l / 0.33) 64.7%,
          hsla(from var(--p-color-canvas) h s l / 0.22) 71%,
          hsla(from var(--p-color-canvas) h s l / 0.12) 77.5%,
          hsla(from var(--p-color-canvas) h s l / 0.05) 84.5%,
          hsla(from var(--p-color-canvas) h s l / 0.011) 91.9%,
          hsla(from var(--p-color-canvas) h s l / 0) 100%
        );
        margin-top: 0;
        margin-bottom: calc(var(--p-spacing-fluid-lg) * -1);
        border-end-start-radius: 0;
        border-end-end-radius: 0;
        border-start-start-radius: inherit;
        border-start-end-radius: inherit;
      }
      .p-button-tile:not([gradient]) .root::after {
        content: none;
      }
      .p-button-tile .media{
        position: relative;
        grid-area: 1 / 1 / -1 / -1;
        z-index: 1;
        overflow: hidden;
        border-radius: inherit;
      }
      .p-button-tile .footer{
        grid-area: 4 / 2;
        display: var(--p-bt-foot-d);
        grid-template-columns: var(--p-bt-foot-cols);
        column-gap: var(--p-bt-foot-gap);
        flex-direction: var(--p-bt-foot-dir);
        align-items: var(--p-bt-foot-ai);
      }
      .p-button-tile[align="top"] .footer {
        grid-area: 2 / 2;
      }
      .p-button-tile .link-or-button-pure{
        z-index: 5;
        grid-column: 2;
        grid-row: var(--p-bt-pure-row);
        align-self: flex-end;
        display: var(--p-bt-pure-d);
      }
      .p-button-tile[align="top"] .link-or-button-pure {
        align-self: flex-start;
      }
      .p-button-tile .link-or-button{
        min-height: 54px;
        z-index: 5;
        margin-top: var(--p-spacing-static-md);
        display: var(--p-bt-btn-d);
      }
      @media (hover: hover) {
        .p-button-tile:not([disabled]) .root:hover [data-pds-slot]:not([name]) {
          transform: scale3d(1.05, 1.05, 1.05);
        }
      }
      @supports (-webkit-hyphens: auto) {
        .p-button-tile .root{
          height: 100%;
        }
      }
      @media (min-width: 480px) {
        .p-button-tile .root{
          aspect-ratio: var(--p-bt-ar-xs, var(--p-bt-ar));
        }
        .p-button-tile p{
          font-size: var(--p-bt-fs-xs, var(--p-bt-fs));
          font-weight: var(--p-bt-fw-xs, var(--p-bt-fw));
        }
        .p-button-tile .footer{
          display: var(--p-bt-foot-d-xs);
          grid-template-columns: var(--p-bt-foot-cols-xs);
          column-gap: var(--p-bt-foot-gap-xs);
          flex-direction: var(--p-bt-foot-dir-xs);
          align-items: var(--p-bt-foot-ai-xs);
        }
        .p-button-tile .link-or-button-pure{
          display: var(--p-bt-pure-d-xs);
        }
        .p-button-tile .link-or-button{
          display: var(--p-bt-btn-d-xs);
        }
      }
      @media (min-width: 760px) {
        .p-button-tile .root{
          aspect-ratio: var(--p-bt-ar-s, var(--p-bt-ar));
        }
        .p-button-tile p{
          font-size: var(--p-bt-fs-s, var(--p-bt-fs));
          font-weight: var(--p-bt-fw-s, var(--p-bt-fw));
        }
        .p-button-tile .footer{
          display: var(--p-bt-foot-d-s);
          grid-template-columns: var(--p-bt-foot-cols-s);
          column-gap: var(--p-bt-foot-gap-s);
          flex-direction: var(--p-bt-foot-dir-s);
          align-items: var(--p-bt-foot-ai-s);
        }
        .p-button-tile .link-or-button-pure{
          display: var(--p-bt-pure-d-s);
        }
        .p-button-tile .link-or-button{
          display: var(--p-bt-btn-d-s);
        }
      }
      @media (min-width: 1000px) {
        .p-button-tile .root{
          aspect-ratio: var(--p-bt-ar-m, var(--p-bt-ar));
        }
        .p-button-tile p{
          font-size: var(--p-bt-fs-m, var(--p-bt-fs));
          font-weight: var(--p-bt-fw-m, var(--p-bt-fw));
        }
        .p-button-tile .footer{
          display: var(--p-bt-foot-d-m);
          grid-template-columns: var(--p-bt-foot-cols-m);
          column-gap: var(--p-bt-foot-gap-m);
          flex-direction: var(--p-bt-foot-dir-m);
          align-items: var(--p-bt-foot-ai-m);
        }
        .p-button-tile .link-or-button-pure{
          display: var(--p-bt-pure-d-m);
        }
        .p-button-tile .link-or-button{
          display: var(--p-bt-btn-d-m);
        }
      }
      @media (min-width: 1300px) {
        .p-button-tile .root{
          aspect-ratio: var(--p-bt-ar-l, var(--p-bt-ar));
        }
        .p-button-tile p{
          font-size: var(--p-bt-fs-l, var(--p-bt-fs));
          font-weight: var(--p-bt-fw-l, var(--p-bt-fw));
        }
        .p-button-tile .footer{
          display: var(--p-bt-foot-d-l);
          grid-template-columns: var(--p-bt-foot-cols-l);
          column-gap: var(--p-bt-foot-gap-l);
          flex-direction: var(--p-bt-foot-dir-l);
          align-items: var(--p-bt-foot-ai-l);
        }
        .p-button-tile .link-or-button-pure{
          display: var(--p-bt-pure-d-l);
        }
        .p-button-tile .link-or-button{
          display: var(--p-bt-btn-d-l);
        }
      }
      @media (min-width: 1760px) {
        .p-button-tile .root{
          aspect-ratio: var(--p-bt-ar-xl, var(--p-bt-ar));
        }
        .p-button-tile p{
          font-size: var(--p-bt-fs-xl, var(--p-bt-fs));
          font-weight: var(--p-bt-fw-xl, var(--p-bt-fw));
        }
        .p-button-tile .footer{
          display: var(--p-bt-foot-d-xl);
          grid-template-columns: var(--p-bt-foot-cols-xl);
          column-gap: var(--p-bt-foot-gap-xl);
          flex-direction: var(--p-bt-foot-dir-xl);
          align-items: var(--p-bt-foot-ai-xl);
        }
        .p-button-tile .link-or-button-pure{
          display: var(--p-bt-pure-d-xl);
        }
        .p-button-tile .link-or-button{
          display: var(--p-bt-btn-d-xl);
        }
      }
      @media (min-width: 1920px) {
        .p-button-tile .root{
          aspect-ratio: var(--p-bt-ar-xxl, var(--p-bt-ar));
        }
        .p-button-tile p{
          font-size: var(--p-bt-fs-xxl, var(--p-bt-fs));
          font-weight: var(--p-bt-fw-xxl, var(--p-bt-fw));
        }
        .p-button-tile .footer{
          display: var(--p-bt-foot-d-xxl);
          grid-template-columns: var(--p-bt-foot-cols-xxl);
          column-gap: var(--p-bt-foot-gap-xxl);
          flex-direction: var(--p-bt-foot-dir-xxl);
          align-items: var(--p-bt-foot-ai-xxl);
        }
        .p-button-tile .link-or-button-pure{
          display: var(--p-bt-pure-d-xxl);
        }
        .p-button-tile .link-or-button{
          display: var(--p-bt-btn-d-xxl);
        }
      }`]})],n);export{n as default};
