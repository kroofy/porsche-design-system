import{C as n,V as r,a as m}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var d=Object.getOwnPropertyDescriptor,c=(e,s,o,a)=>{for(var t=a>1?void 0:a?d(s,o):s,i=e.length-1,p;i>=0;i--)(p=e[i])&&(t=p(t)||t);return t};let l=class{};l=c([n({selector:"p-text-list-item",standalone:!0,imports:[m],encapsulation:r.None,template:`
    <div class="p-text-list-item" data-pds="text-list-item">
    <div class="root"><span data-pds-slot=""><ng-content></ng-content></span></div> 
    </div>
  `,styles:[`.p-text-list-item :where([data-pds-slot]){display:contents}

      .p-text-list-item {
        display: contents;
      }
      .p-text-list-item {
        display: grid;
        grid-template-columns: var(--_p-text-list-e) 1fr !important;
        column-gap: var(--p-spacing-static-md) !important;
        font: inherit !important;
        color: inherit !important;
      }
      .p-text-list-item[hidden] {
        display: none !important;
      }
      .p-text-list-item .root{
        display: contents;
      }
      .p-text-list-item [data-pds-slot]{
        display: inline;
      }
      .p-text-list-item [data-pds-slot] > *{
        --_p-text-list-f: 0.625rem !important;
        --_p-text-list-g: "–" !important;
        --_p-text-list-a: 2rem !important;
        --_p-text-list-b: "" !important;
      }
      .p-text-list-item [data-pds-slot] > *:last-child{
        grid-column: 2 !important;
      }`]})],l);export{l as default};
