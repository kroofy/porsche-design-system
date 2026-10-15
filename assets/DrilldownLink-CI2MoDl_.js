import{I as d,C as s,V as c,a as u}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var v=Object.defineProperty,m=Object.getOwnPropertyDescriptor,e=(a,o,t,i)=>{for(var r=i>1?void 0:i?m(o,t):o,n=a.length-1,l;n>=0;n--)(l=a[n])&&(r=(i?l(o,t,r):l(r))||r);return i&&r&&v(o,t,r),r};let p=class{get hostStyle(){const o=(t=>t===!0||t==="true"||t==="")(this.active);return{"--p-ddl-deco":o?"":"transparent","--p-ddl-cursor":o?"default":"pointer"}}};e([d()],p.prototype,"active",2);p=e([s({selector:"p-drilldown-link",standalone:!0,imports:[u],encapsulation:c.None,template:`
    <div class="p-drilldown-link" data-pds="drilldown-link" [style]="hostStyle">
    <span data-pds-slot=""><ng-content></ng-content></span> 
    </div>
  `,styles:[`.p-drilldown-link :where([data-pds-slot]){display:contents}

      .p-drilldown-link {
        display: contents;
      }
      .p-drilldown-link {
        display: grid;
      }
      .p-drilldown-link[hidden] {
        display: none !important;
      }
      .p-drilldown-link a{
        all: unset;
        padding: calc(var(--p-spacing-fluid-sm) + 2px)
          calc(var(--p-spacing-fluid-sm) + 4px);
        margin: -2px calc(var(--p-spacing-fluid-sm) * -1 - 4px);
        border-radius: var(--p-radius-sm);
        font: var(--p-font-weight-normal) var(--p-typescale-md) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--_p-drilldown-a);
        text-decoration: underline;
        text-decoration-color: var(--p-ddl-deco, inherit);
        cursor: var(--p-ddl-cursor, pointer);
        transition: text-decoration-color
          var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
      }
      .p-drilldown-link [data-pds-slot] > a{
        all: unset !important;
        padding: calc(var(--p-spacing-fluid-sm) + 2px)
          calc(var(--p-spacing-fluid-sm) + 4px) !important;
        margin: -2px calc(var(--p-spacing-fluid-sm) * -1 - 4px) !important;
        border-radius: var(--p-radius-sm) !important;
        font: var(--p-font-weight-normal) var(--p-typescale-md) /
          var(--p-leading-normal) var(--p-font-porsche-next) !important;
        color: var(--_p-drilldown-a) !important;
        text-decoration: underline !important;
        text-decoration-color: var(--p-ddl-deco, inherit) !important;
        cursor: var(--p-ddl-cursor, pointer) !important;
        transition: text-decoration-color
          var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out) !important;
      }
      .p-drilldown-link a:focus-visible{
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-drilldown-link [data-pds-slot] > a:focus-visible{
        outline: 2px solid var(--p-color-focus) !important;
        outline-offset: 2px !important;
      }
      @media (forced-colors: active) {
        .p-drilldown-link a:focus-visible{
          outline-color: Highlight;
        }
        .p-drilldown-link [data-pds-slot] > a:focus-visible{
          outline-color: Highlight !important;
        }
      }
      @media (hover: hover) {
        .p-drilldown-link a:hover{
          text-decoration-color: inherit;
        }
        .p-drilldown-link [data-pds-slot] > a:hover{
          text-decoration-color: inherit !important;
        }
      }`]})],p);export{p as default};
