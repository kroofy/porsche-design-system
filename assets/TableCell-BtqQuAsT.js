import{I as r,C as c,V as m,a as d}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var u=Object.defineProperty,b=Object.getOwnPropertyDescriptor,o=(a,l,n,e)=>{for(var t=e>1?void 0:e?b(l,n):l,s=a.length-1,p;s>=0;s--)(p=a[s])&&(t=(e?p(l,n,t):p(t))||t);return e&&t&&u(l,n,t),t};let i=class{get hostStyle(){return{"--p-table-cell-ws":this.multiline===!0||this.multiline==="true"||this.multiline===""?"normal":"nowrap"}}};o([r()],i.prototype,"multiline",2);i=o([c({selector:"p-table-cell",standalone:!0,imports:[d],encapsulation:m.None,template:`
    <div class="p-table-cell" data-pds="table-cell" [style]="hostStyle">
    <div class="root"><span data-pds-slot=""><ng-content></ng-content></span></div> 
    </div>
  `,styles:[`.p-table-cell :where([data-pds-slot]){display:contents}

      .p-table-cell {
        display: contents;
      }
      .p-table-cell {
        display: table-cell;
        vertical-align: middle;
        padding: var(--_p-table-a) !important;
        margin: 0 !important;
        white-space: var(--p-table-cell-ws, nowrap) !important;
      }
      .p-table-cell[hidden] {
        display: none !important;
      }`]})],i);export{i as default};
