import{I as i,C as c,V as m,a as b}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var d=Object.defineProperty,u=Object.getOwnPropertyDescriptor,l=(r,o,e,a)=>{for(var t=a>1?void 0:a?u(o,e):o,n=r.length-1,s;n>=0;n--)(s=r[n])&&(t=(a?s(o,e,t):s(t))||t);return a&&t&&d(o,e,t),t};let p=class{get hostStyle(){const o=(t=>t===!0||t==="true"||t==="")(this.compact),a=(this.layout||"auto")==="fixed";return{"--p-table-pad":o?"var(--p-spacing-static-sm)":"var(--p-spacing-fluid-sm)","--p-table-layout":a?"fixed":"","--p-table-w":a?"":"100%","--p-table-min-w":a?"100%":""}}get captionText(){return this.caption||""}};l([i()],p.prototype,"compact",2);l([i()],p.prototype,"layout",2);l([i()],p.prototype,"caption",2);p=l([c({selector:"p-table",standalone:!0,imports:[b],encapsulation:m.None,template:`
    <div class="p-table" data-pds="table" [style]="hostStyle">
    <div class="table" role="table"><span data-pds-slot=""><ng-content></ng-content></span></div> 
    </div>
  `,styles:[`.p-table :where([data-pds-slot]){display:contents}

      .p-table {
        display: contents;
      }
      .p-table {
        display: block;
        --p-scroller-indicator-top: var(
          --p-table-scroll-indicator-top,
          0px
        ) !important;
        --p-scroller-indicator-bottom: var(
          --p-table-scroll-indicator-bottom,
          0px
        ) !important;
        --_p-table-b: var(--p-color-frosted) !important;
        --_p-table-c: var(--p-color-contrast-low) !important;
        --_p-table-a: var(--p-table-pad, var(--p-spacing-fluid-sm)) !important;
        --_p-table-d: 1px !important;
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next) !important;
        color: var(--p-color-primary) !important;
        text-align: start !important;
      }
      .p-table[hidden] {
        display: none !important;
      }
      .p-table .caption{
        margin-bottom: var(--p-spacing-fluid-md);
      }
      .p-table .table{
        display: table;
        border-collapse: collapse;
        white-space: nowrap;
        table-layout: var(--p-table-layout, auto);
        width: var(--p-table-w, auto);
        min-width: var(--p-table-min-w, auto);
      }`]})],p);export{p as default};
