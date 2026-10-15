import{I as v,C as j,V as $,a as O}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var S=Object.defineProperty,_=Object.getOwnPropertyDescriptor,c=(t,l,r,o)=>{for(var i=o>1?void 0:o?_(l,r):l,d=t.length-1,a;d>=0;d--)(a=t[d])&&(i=(o?a(l,r,i):a(i))||i);return o&&i&&S(l,r,i),i};const y={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},b={regular:"var(--p-font-weight-normal)","semi-bold":"var(--p-font-weight-semibold)",normal:"var(--p-font-weight-normal)",semibold:"var(--p-font-weight-semibold)",bold:"var(--p-font-weight-bold)"},w=["base","xs","s","m","l","xl","xxl"],h=(t,l)=>{if(t==null)return l;if(t==="")return typeof l=="boolean"?!0:l;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return l}return t==="true"?!0:t==="false"?!1:t},s=(t,l,r)=>t&&typeof t=="object"?t[l]===void 0?r:t[l]:t,P=t=>t==="inherit"?"":y[String(t)]||y.medium,T=t=>b[String(t)]||b["semi-bold"],z=(t,l,r,o,i,d)=>{const a=l==="base"?"":`-${l}`,e=d===!0||d==="true";t[`--p-lt-fs${a}`]=P(r),t[`--p-lt-fw${a}`]=T(o),t[`--p-lt-ar${a}`]=String(i||"4/3"),t[`--p-lt-foot-d${a}`]=e?"grid":"flex",t[`--p-lt-foot-cols${a}`]=e?"minmax(0, 1fr) auto":"none",t[`--p-lt-foot-gap${a}`]=e?"var(--p-spacing-static-md)":"0",t[`--p-lt-foot-dir${a}`]=e?"row":"column",t[`--p-lt-foot-ai${a}`]=e?"stretch":"start",t[`--p-lt-pure-d${a}`]=e?"inline-block":"none",t[`--p-lt-btn-d${a}`]=e?"none":"inline-block"};let n=class{get hostStyle(){const t=h(this.size,"medium"),l=h(this.weight,"semi-bold"),r=h(this.aspectRatio,"4/3");let o=h(this.compact,!1);this.compact==="true"&&(o=!0),this.compact==="false"&&(o=!1);const i={"--p-lt-pure-row":"1 / 2"};if(typeof t=="object"||typeof l=="object"||typeof r=="object"||typeof o=="object"){const a=typeof t=="object"&&t!==null?t:null,e=typeof l=="object"&&l!==null?l:null,f=typeof r=="object"&&r!==null?r:null,m=typeof o=="object"&&o!==null?o:null;let u=a?s(a,"base","medium"):t,g=e?s(e,"base","semi-bold"):l,x=f?s(f,"base","4/3"):r,k=m?s(m,"base",!1):o;for(const p of w)a&&a[p]!==void 0&&(u=s(a,p,u)),e&&e[p]!==void 0&&(g=s(e,p,g)),f&&f[p]!==void 0&&(x=s(f,p,x)),m&&m[p]!==void 0&&(k=s(m,p,k)),z(i,p,u,g,x,k)}else for(const a of w)z(i,a,t,l,r,o);return i}get descriptionText(){return this.description||""}get labelText(){return this.label||""}};c([v()],n.prototype,"size",2);c([v()],n.prototype,"weight",2);c([v()],n.prototype,"aspectRatio",2);c([v()],n.prototype,"compact",2);c([v()],n.prototype,"description",2);c([v()],n.prototype,"label",2);n=c([j({selector:"p-link-tile",standalone:!0,imports:[O],encapsulation:$.None,template:`
    <div class="p-link-tile" data-pds="link-tile" [style]="hostStyle">
    <div class="root">
      <span data-pds-slot="header"><ng-content select="[slot=header]"></ng-content></span>
      <div class="media"><span data-pds-slot=""><ng-content></ng-content></span></div>
      <div class="footer">
        <p>{{descriptionText}}</p>
        <span data-pds-slot="footer"><ng-content select="[slot=footer]"></ng-content></span>
      </div>
    </div>
  
    </div>
  `,styles:[`.p-link-tile :where([data-pds-slot]){display:contents}

      .p-link-tile {
        display: contents;
      }
      .p-link-tile {
        display: flex;
        align-items: stretch;
        color-scheme: dark;
        hyphens: auto;
      }
      .p-link-tile[hidden] {
        display: none !important;
      }
      .p-link-tile [data-pds-slot]{
        display: block;
      }
      .p-link-tile [data-pds-slot]:not([name]){
        width: 100%;
        height: 100%;
        transition: transform var(--p-transition-duration, var(--p-duration-md))
          var(--p-ease-in-out);
      }
      .p-link-tile [data-pds-slot="header"]{
        grid-area: 2 / 2;
        z-index: 5;
      }
      .p-link-tile[align="top"] [data-pds-slot="header"] {
        grid-area: 4 / 2;
      }
      .p-link-tile [data-pds-slot="footer"]{
        grid-row: 2;
        z-index: 3;
      }
      .p-link-tile [data-pds-slot] > :is(img, video, picture){
        display: block !important;
        width: 100% !important;
        height: 100% !important;
      }
      .p-link-tile [data-pds-slot] > :is(img, video){
        object-fit: cover !important;
      }
      .p-link-tile a{
        grid-area: 1 / 1 / -1 / -1;
        z-index: 4;
        outline: 0;
      }
      .p-link-tile p{
        all: unset;
        z-index: 3;
        max-width: 34.375rem;
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-color-primary);
        hyphens: inherit;
        font-size: inherit;
        font-size: var(--p-lt-fs);
        font-weight: var(--p-lt-fw);
      }
      @supports (-webkit-hyphens: auto) {
        .p-link-tile {
          align-items: baseline;
        }
      }
      .p-link-tile .root{
        display: grid;
        grid-template:
          var(--p-spacing-fluid-md) auto minmax(0px, 1fr) auto var(
            --p-spacing-fluid-md
          )
          / var(--p-spacing-fluid-md) minmax(0px, 1fr) var(--p-spacing-fluid-md);
        width: 100%;
        border-radius: var(--p-radius-3xl);
        aspect-ratio: var(--p-lt-ar);
      }
      .p-link-tile .root::after{
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
      .p-link-tile[align="top"] .root::after {
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
      .p-link-tile:not([gradient]) .root::after {
        content: none;
      }
      .p-link-tile .media{
        position: relative;
        grid-area: 1 / 1 / -1 / -1;
        z-index: 1;
        overflow: hidden;
        border-radius: inherit;
      }
      .p-link-tile .footer{
        grid-area: 4 / 2;
        display: var(--p-lt-foot-d);
        grid-template-columns: var(--p-lt-foot-cols);
        column-gap: var(--p-lt-foot-gap);
        flex-direction: var(--p-lt-foot-dir);
        align-items: var(--p-lt-foot-ai);
      }
      .p-link-tile[align="top"] .footer {
        grid-area: 2 / 2;
      }
      .p-link-tile .link-or-button-pure{
        z-index: 5;
        grid-column: 2;
        grid-row: var(--p-lt-pure-row);
        align-self: flex-end;
        display: var(--p-lt-pure-d);
      }
      .p-link-tile[align="top"] .link-or-button-pure {
        align-self: flex-start;
      }
      .p-link-tile .link-or-button{
        min-height: 54px;
        z-index: 5;
        margin-top: var(--p-spacing-static-md);
        display: var(--p-lt-btn-d);
      }
      @media (hover: hover) {
        .p-link-tile .root:hover [data-pds-slot]:not([name]){
          transform: scale3d(1.05, 1.05, 1.05);
        }
      }
      @supports (-webkit-hyphens: auto) {
        .p-link-tile .root{
          height: 100%;
        }
      }
      @media (min-width: 480px) {
        .p-link-tile .root{
          aspect-ratio: var(--p-lt-ar-xs, var(--p-lt-ar));
        }
        .p-link-tile p{
          font-size: var(--p-lt-fs-xs, var(--p-lt-fs));
          font-weight: var(--p-lt-fw-xs, var(--p-lt-fw));
        }
        .p-link-tile .footer{
          display: var(--p-lt-foot-d-xs);
          grid-template-columns: var(--p-lt-foot-cols-xs);
          column-gap: var(--p-lt-foot-gap-xs);
          flex-direction: var(--p-lt-foot-dir-xs);
          align-items: var(--p-lt-foot-ai-xs);
        }
        .p-link-tile .link-or-button-pure{
          display: var(--p-lt-pure-d-xs);
        }
        .p-link-tile .link-or-button{
          display: var(--p-lt-btn-d-xs);
        }
      }
      @media (min-width: 760px) {
        .p-link-tile .root{
          aspect-ratio: var(--p-lt-ar-s, var(--p-lt-ar));
        }
        .p-link-tile p{
          font-size: var(--p-lt-fs-s, var(--p-lt-fs));
          font-weight: var(--p-lt-fw-s, var(--p-lt-fw));
        }
        .p-link-tile .footer{
          display: var(--p-lt-foot-d-s);
          grid-template-columns: var(--p-lt-foot-cols-s);
          column-gap: var(--p-lt-foot-gap-s);
          flex-direction: var(--p-lt-foot-dir-s);
          align-items: var(--p-lt-foot-ai-s);
        }
        .p-link-tile .link-or-button-pure{
          display: var(--p-lt-pure-d-s);
        }
        .p-link-tile .link-or-button{
          display: var(--p-lt-btn-d-s);
        }
      }
      @media (min-width: 1000px) {
        .p-link-tile .root{
          aspect-ratio: var(--p-lt-ar-m, var(--p-lt-ar));
        }
        .p-link-tile p{
          font-size: var(--p-lt-fs-m, var(--p-lt-fs));
          font-weight: var(--p-lt-fw-m, var(--p-lt-fw));
        }
        .p-link-tile .footer{
          display: var(--p-lt-foot-d-m);
          grid-template-columns: var(--p-lt-foot-cols-m);
          column-gap: var(--p-lt-foot-gap-m);
          flex-direction: var(--p-lt-foot-dir-m);
          align-items: var(--p-lt-foot-ai-m);
        }
        .p-link-tile .link-or-button-pure{
          display: var(--p-lt-pure-d-m);
        }
        .p-link-tile .link-or-button{
          display: var(--p-lt-btn-d-m);
        }
      }
      @media (min-width: 1300px) {
        .p-link-tile .root{
          aspect-ratio: var(--p-lt-ar-l, var(--p-lt-ar));
        }
        .p-link-tile p{
          font-size: var(--p-lt-fs-l, var(--p-lt-fs));
          font-weight: var(--p-lt-fw-l, var(--p-lt-fw));
        }
        .p-link-tile .footer{
          display: var(--p-lt-foot-d-l);
          grid-template-columns: var(--p-lt-foot-cols-l);
          column-gap: var(--p-lt-foot-gap-l);
          flex-direction: var(--p-lt-foot-dir-l);
          align-items: var(--p-lt-foot-ai-l);
        }
        .p-link-tile .link-or-button-pure{
          display: var(--p-lt-pure-d-l);
        }
        .p-link-tile .link-or-button{
          display: var(--p-lt-btn-d-l);
        }
      }
      @media (min-width: 1760px) {
        .p-link-tile .root{
          aspect-ratio: var(--p-lt-ar-xl, var(--p-lt-ar));
        }
        .p-link-tile p{
          font-size: var(--p-lt-fs-xl, var(--p-lt-fs));
          font-weight: var(--p-lt-fw-xl, var(--p-lt-fw));
        }
        .p-link-tile .footer{
          display: var(--p-lt-foot-d-xl);
          grid-template-columns: var(--p-lt-foot-cols-xl);
          column-gap: var(--p-lt-foot-gap-xl);
          flex-direction: var(--p-lt-foot-dir-xl);
          align-items: var(--p-lt-foot-ai-xl);
        }
        .p-link-tile .link-or-button-pure{
          display: var(--p-lt-pure-d-xl);
        }
        .p-link-tile .link-or-button{
          display: var(--p-lt-btn-d-xl);
        }
      }
      @media (min-width: 1920px) {
        .p-link-tile .root{
          aspect-ratio: var(--p-lt-ar-xxl, var(--p-lt-ar));
        }
        .p-link-tile p{
          font-size: var(--p-lt-fs-xxl, var(--p-lt-fs));
          font-weight: var(--p-lt-fw-xxl, var(--p-lt-fw));
        }
        .p-link-tile .footer{
          display: var(--p-lt-foot-d-xxl);
          grid-template-columns: var(--p-lt-foot-cols-xxl);
          column-gap: var(--p-lt-foot-gap-xxl);
          flex-direction: var(--p-lt-foot-dir-xxl);
          align-items: var(--p-lt-foot-ai-xxl);
        }
        .p-link-tile .link-or-button-pure{
          display: var(--p-lt-pure-d-xxl);
        }
        .p-link-tile .link-or-button{
          display: var(--p-lt-btn-d-xxl);
        }
      }`]})],n);export{n as default};
