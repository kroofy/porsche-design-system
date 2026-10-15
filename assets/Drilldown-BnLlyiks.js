import{a as s}from"./host-DRskmCSE.js";import c from"./ButtonPure-NwIxAAH4.js";import u from"./Button-CUn0qcUU.js";import{I as e,C as m,V as g,a as v}from"./angular-aNJmk6GY.js";import"./Spinner-TTCsUayI.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./Icon-DzSCh0v5.js";import"./index-ChNsHkGO.js";var w=Object.defineProperty,b=Object.getOwnPropertyDescriptor,p=(a,i,n,t)=>{for(var r=t>1?void 0:t?b(i,n):i,o=a.length-1,l;o>=0;o--)(l=a[o])&&(r=(t?l(i,n,r):l(r))||r);return t&&r&&w(i,n,r),r};let d=class{constructor(){this.hostAttr=s}get isOpenFlag(){const a=this.open;return a===!0||a==="true"||a===""}get ariaLabelText(){const a=this.aria;if(a&&typeof a=="object"&&a["aria-label"])return a["aria-label"];if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"'))["aria-label"]||""}catch{return""}return""}};p([e()],d.prototype,"open",2);p([e()],d.prototype,"aria",2);d=p([m({selector:"p-drilldown",standalone:!0,imports:[v,u,c],encapsulation:g.None,template:`
    <div class="p-drilldown" data-pds="drilldown" [attr.open]="hostAttr(open) ?? null">
    <dialog [attr.inert]="true">
      <div class="drawer">
        <p-button-pure
          class="back"
          type="button"
          size="small"
          alignLabel="end"
          stretch="true"
          icon="arrow-left"
          hideLabel="true"
        >
          Back
        </p-button-pure>
        <p-button
          class="dismiss-mobile"
          type="button"
          icon="close"
          compact="true"
          variant="secondary"
          hideLabel="true"
        >
          Dismiss drilldown
        </p-button>
        <p-button
          class="dismiss-desktop"
          type="button"
          icon="close"
          variant="secondary"
          hideLabel="true"
        >
          Dismiss drilldown
        </p-button>
        <div class="scroller"><span data-pds-slot=""><ng-content></ng-content></span></div>
      </div>
    </dialog>
  
    </div>
  `,styles:[`.p-drilldown :where([data-pds-slot]){display:contents}

      .p-drilldown {
        display: contents;
      }
      @keyframes slide-up-mobile {
        from {
          transform: translate3d(0, var(--p-spacing-fluid-md), 0);
        }
        to {
          transform: translate3d(0, 0, 0);
        }
      }
      @keyframes slide-up-desktop {
        from {
          margin-block-start: var(--p-spacing-fluid-md);
        }
        to {
          margin-block-start: 0px;
        }
      }
      .p-drilldown {
        display: block;
        --_p-drilldown-a: var(--p-color-primary) !important;
        --_p-drilldown-b: var(--p-color-canvas) !important;
        --_p-drilldown-c: var(--p-color-surface) !important;
        --_p-drilldown-d: var(--p-color-backdrop) !important;
        --_p-drilldown-f: rgba(255, 255, 255, 0.01) !important;
      }
      .p-drilldown[hidden] {
        display: none !important;
      }
      .p-drilldown [data-pds-slot] > *{
        --p-drilldown-grid-template: auto/auto;
        --p-drilldown-gap: var(--p-spacing-fluid-xs);
      }
      .p-drilldown dialog{
        all: unset;
        position: fixed;
        inset: 0;
        z-index: 999999999;
        outline: 0;
        visibility: hidden;
        transition: visibility 0s linear
            var(--p-transition-duration, var(--p-duration-md)),
          overlay var(--p-transition-duration, var(--p-duration-md))
            var(--p-ease-out) allow-discrete,
          background var(--p-transition-duration, var(--p-duration-md))
            var(--p-ease-out),
          backdrop-filter var(--p-transition-duration, var(--p-duration-md))
            var(--p-ease-out),
          -webkit-backdrop-filter var(
              --p-transition-duration,
              var(--p-duration-md)
            ) var(--p-ease-out);
      }
      .p-drilldown[open] dialog {
        visibility: inherit;
        -webkit-backdrop-filter: var(--p-blur-frosted);
        backdrop-filter: var(--p-blur-frosted);
        background: var(--_p-drilldown-d);
        transition: background
            var(--p-transition-duration, var(--p-duration-lg)) var(--p-ease-in),
          backdrop-filter var(--p-transition-duration, var(--p-duration-lg))
            var(--p-ease-in),
          -webkit-backdrop-filter var(
              --p-transition-duration,
              var(--p-duration-lg)
            ) var(--p-ease-in);
      }
      .p-drilldown dialog::backdrop{
        display: none;
      }
      .p-drilldown .drawer{
        position: absolute;
        inset: 0;
        display: grid;
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
        transition: opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-out),
          transform var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-out);
      }
      .p-drilldown[open] .drawer {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: opacity var(--p-transition-duration, var(--p-duration-md))
            var(--p-ease-in),
          transform var(--p-transition-duration, var(--p-duration-md))
            var(--p-ease-in);
      }
      .p-drilldown:not([open]) .drawer:dir(rtl) {
        transform: translate3d(100%, 0, 0);
      }
      .p-drilldown .drawer::before,
      .p-drilldown .drawer::after{
        content: "";
        position: relative;
        z-index: 2;
        pointer-events: none;
        opacity: 0;
      }
      .p-drilldown .scroller{
        display: contents;
        overflow: hidden auto;
        background: var(--_p-drilldown-f);
      }
      .p-drilldown .back{
        display: none;
      }
      @media (min-width: 760px) {
        .p-drilldown[data-primary] [data-pds-slot] {
          grid-area: 3/2 / auto/-2;
          display: grid;
          grid-template: var(--p-drilldown-grid-template, auto/auto);
          gap: var(--p-drilldown-gap, var(--p-spacing-fluid-xs));
          align-content: start;
          align-items: start;
          box-sizing: border-box;
          min-height: 100%;
          height: fit-content;
          padding-block-end: var(--p-spacing-fluid-lg);
          animation: slide-up-desktop
            var(--p-animation-duration, var(--p-duration-md))
            var(--p-ease-in-out);
        }
        .p-drilldown[data-secondary]:not([data-primary])
          [data-pds-slot] > *:not([primary], [cascade]) {
          display: none !important;
        }
        .p-drilldown[data-secondary] .drawer {
          width: calc(clamp(338px, 210px + 18vw, 640px) * 2);
          grid-template: var(--p-spacing-fluid-md) auto minmax(0, 1fr) / repeat(
              2,
              var(--p-spacing-fluid-lg) minmax(0, 1fr) var(--p-spacing-fluid-lg)
            );
          background: linear-gradient(
            90deg,
            var(--_p-drilldown-b) 0%,
            var(--_p-drilldown-b) 50%,
            var(--_p-drilldown-c) 50%,
            var(--_p-drilldown-c) 100%
          );
        }
        .p-drilldown[data-secondary] .drawer:dir(rtl) {
          background: linear-gradient(
            90deg,
            var(--_p-drilldown-c) 0%,
            var(--_p-drilldown-c) 50%,
            var(--_p-drilldown-b) 50%,
            var(--_p-drilldown-b) 100%
          );
        }
        .p-drilldown:not([data-secondary]) .drawer {
          width: clamp(338px, 210px + 18vw, 640px);
          grid-template: var(--p-spacing-fluid-md) auto minmax(0, 1fr) / repeat(
              1,
              var(--p-spacing-fluid-lg) minmax(0, 1fr) var(--p-spacing-fluid-lg)
            );
          background: var(--_p-drilldown-b);
        }
        .p-drilldown .drawer::after{
          grid-area: 1/4/-1/-1;
          background: var(--_p-drilldown-c);
        }
        .p-drilldown .drawer::before{
          grid-area: 1/1/-1/4;
          background: var(--_p-drilldown-b);
        }
        .p-drilldown .scroller{
          grid-area: 1/1/-1/4;
          display: grid;
          grid-template-rows: subgrid;
          grid-template-columns: subgrid;
        }
        .p-drilldown .dismiss-mobile{
          display: none;
        }
        .p-drilldown .dismiss-desktop{
          --p-color-primary: hsl(225 100% 99%);
          --p-color-frosted: hsl(240 2% 43% / 0.228);
          --p-color-frosted-soft: hsl(240 3.7% 26.5% / 0.154);
          position: absolute;
          inset-inline-start: calc(100% + var(--p-spacing-fluid-sm));
          inset-block-start: var(--p-spacing-fluid-sm);
          padding: var(--p-spacing-static-sm);
        }
      }
      @media (max-width: 759px) {
        .p-drilldown:not([data-secondary]) [data-pds-slot] {
          display: grid;
          grid-area: 4/2 / auto/-2;
          z-index: 0;
          grid-template: var(--p-drilldown-grid-template, auto/auto);
          gap: var(--p-drilldown-gap, var(--p-spacing-fluid-xs));
          align-content: start;
          align-items: start;
          box-sizing: border-box;
          min-height: 100%;
          height: fit-content;
          padding-block-end: var(--p-spacing-fluid-lg);
        }
        .p-drilldown[data-primary]:not([data-secondary]) [data-pds-slot] {
          animation: slide-up-mobile
            var(--p-animation-duration, var(--p-duration-md))
            var(--p-ease-in-out);
        }
        .p-drilldown[data-secondary] [data-pds-slot] {
          display: contents;
        }
        .p-drilldown[data-secondary]
          [data-pds-slot] > *:not([primary], [secondary], [cascade]) {
          display: none !important;
        }
        .p-drilldown .drawer{
          grid-template:
            var(--p-spacing-fluid-md) auto var(--p-spacing-fluid-lg) minmax(
              0,
              1fr
            )
            / var(--p-spacing-fluid-lg) auto minmax(0, 1fr) auto var(--p-spacing-fluid-lg);
          background: var(--_p-drilldown-b);
        }
        .p-drilldown .drawer::after,
        .p-drilldown .drawer::before{
          grid-area: 1/1/-1/-1;
          background: var(--_p-drilldown-b);
        }
        .p-drilldown:not([data-secondary]) .scroller {
          grid-area: 1/1/-1/-1;
          display: grid;
          grid-template-rows: subgrid;
          grid-template-columns: subgrid;
        }
        .p-drilldown:not([data-secondary]) .scroller::before {
          content: "";
          position: sticky;
          top: 0;
          grid-area: 1/1/4/-1;
          z-index: 1;
          background: linear-gradient(
            180deg,
            var(--_p-drilldown-b) 0%,
            var(--_p-drilldown-b) 65%,
            transparent 100%
          );
        }
        .p-drilldown .dismiss-mobile{
          width: fit-content;
          height: fit-content;
          place-self: start end;
          grid-area: 2/4;
          z-index: 3;
          margin-inline-end: -1px;
        }
        .p-drilldown .dismiss-desktop{
          display: none;
        }
        .p-drilldown[data-secondary][data-primary] .back {
          display: block;
          grid-area: 2/2;
          width: fit-content;
          height: fit-content;
          place-self: center;
          z-index: 2;
        }
      }`]})],d);export{d as default};
