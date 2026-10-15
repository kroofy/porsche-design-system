import{I as o,C as x,V as c,a as d}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var u=Object.defineProperty,m=Object.getOwnPropertyDescriptor,a=(e,s,i,p)=>{for(var t=p>1?void 0:p?m(s,i):s,r=e.length-1,l;r>=0;r--)(l=e[r])&&(t=(p?l(s,i,t):l(t))||t);return p&&t&&u(s,i,t),t};let n=class{get hostStyle(){const e=this.type||"unordered";return e==="numbered"?{"--p-text-list-e":"var(--_p-text-list-a, 1.5rem)","--p-text-list-before":"counters(p-text-list-counter, '.', decimal) var(--_p-text-list-b, '.')","--p-text-list-inc":"p-text-list-counter","--p-text-list-justify":"flex-end","--p-text-list-ws":"nowrap"}:e==="alphabetically"?{"--p-text-list-e":"var(--_p-text-list-a, 1.5rem)","--p-text-list-before":"counters(p-text-list-counter, '.', lower-latin) var(--_p-text-list-b, '.')","--p-text-list-inc":"p-text-list-counter","--p-text-list-justify":"flex-end","--p-text-list-ws":"nowrap"}:{"--p-text-list-e":"var(--_p-text-list-f, .375rem)","--p-text-list-before":"var(--_p-text-list-g, '•')","--p-text-list-inc":"none","--p-text-list-justify":"unset","--p-text-list-ws":"unset"}}get isOrdered(){return(this.type||"unordered")!=="unordered"}};a([o()],n.prototype,"type",2);n=a([x({selector:"p-text-list",standalone:!0,imports:[d],encapsulation:c.None,template:`
    <div class="p-text-list" data-pds="text-list" [style]="hostStyle">
    <ul>
      <span data-pds-slot=""><ng-content></ng-content></span>
    </ul>
  
    </div>
  `,styles:[`.p-text-list :where([data-pds-slot]){display:contents}

      .p-text-list {
        display: contents;
      }
      .p-text-list {
        display: block;
        counter-reset: p-text-list-counter !important;
      }
      .p-text-list[hidden] {
        display: none !important;
      }
      .p-text-list ol,
      .p-text-list ul{
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        margin: 0;
        padding: var(--_p-text-list-d, 0) 0 var(--_p-text-list-c, 0) 0;
        list-style-type: none;
        color: var(--p-color-primary);
      }
      .p-text-list [data-pds-slot] > *{
        --_p-text-list-d: var(--p-spacing-static-xs) !important;
        --_p-text-list-c: var(--p-spacing-static-md) !important;
        --_p-text-list-e: var(
          --p-text-list-e,
          var(--_p-text-list-f, 0.375rem)
        ) !important;
      }
      .p-text-list [data-pds-slot] > *::before{
        content: var(
          --p-text-list-before,
          var(--_p-text-list-g, "•")
        ) !important;
        counter-increment: var(--p-text-list-inc, none) !important;
        justify-self: var(--p-text-list-justify, unset) !important;
        white-space: var(--p-text-list-ws, unset) !important;
      }`]})],n);export{n as default};
