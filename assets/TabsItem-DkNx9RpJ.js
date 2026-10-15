import{I as n,C as m,V as c,a as d}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var b=Object.defineProperty,u=Object.getOwnPropertyDescriptor,l=(r,e,a,o)=>{for(var t=o>1?void 0:o?u(e,a):e,s=r.length-1,i;s>=0;s--)(i=r[s])&&(t=(o?i(e,a,t):i(t))||t);return o&&t&&b(e,a,t),t};let p=class{get labelValue(){return this.label||""}};l([n()],p.prototype,"label",2);p=l([m({selector:"p-tabs-item",standalone:!0,imports:[d],encapsulation:c.None,template:`
    <div class="p-tabs-item" data-pds="tabs-item">
    <div class="root"><span data-pds-slot=""><ng-content></ng-content></span></div> 
    </div>
  `,styles:[`.p-tabs-item :where([data-pds-slot]){display:contents}

      .p-tabs-item {
        display: contents;
      }
      .p-tabs-item {
        display: block;
        color: var(--p-color-primary) !important;
        border-radius: 2px !important;
      }
      .p-tabs-item[hidden] {
        display: none !important;
      }
      .p-tabs-item:focus-visible {
        outline: 2px solid var(--p-color-focus) !important;
        outline-offset: 2px !important;
      }
      @media (forced-colors: active) {
        .p-tabs-item:focus-visible {
          outline-color: Highlight !important;
        }
      }`]})],p);export{p as default};
