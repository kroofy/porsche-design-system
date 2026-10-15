import{C as l,V as i,a as d}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var b=Object.getOwnPropertyDescriptor,v=(o,e,s,r)=>{for(var t=r>1?void 0:r?b(e,s):e,a=o.length-1,n;a>=0;a--)(n=o[a])&&(t=n(t)||t);return t};let p=class{};p=v([l({selector:"p-table-row",standalone:!0,imports:[d],encapsulation:i.None,template:`
    <div class="p-table-row" data-pds="table-row">
    <div class="root"><span data-pds-slot=""><ng-content></ng-content></span></div> 
    </div>
  `,styles:[`.p-table-row :where([data-pds-slot]){display:contents}

      .p-table-row {
        display: contents;
      }
      .p-table-row {
        display: table-row;
        border-bottom: var(--_p-table-d) solid var(--_p-table-c) !important;
        transition: background
          var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out) !important;
      }
      .p-table-row[hidden] {
        display: none !important;
      }
      @media (hover: hover) {
        .p-table-row:hover {
          background: var(--_p-table-b) !important;
        }
      }`]})],p);export{p as default};
