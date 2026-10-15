import{I as s,C as d,V as c,a as b}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var h=Object.defineProperty,u=Object.getOwnPropertyDescriptor,r=(e,a,o,l)=>{for(var t=l>1?void 0:l?u(a,o):a,i=e.length-1,n;i>=0;i--)(n=e[i])&&(t=(l?n(a,o,t):n(t))||t);return l&&t&&h(a,o,t),t};let p=class{parseSort(){let e=this.sort;if(typeof e=="string"&&e.charAt(0)==="{")try{e=JSON.parse(e)}catch{e=void 0}return e}get sortable(){const e=this.parseSort();return e?e.active!==void 0&&e.direction!==void 0:!1}get hostStyle(){const e=this.parseSort(),a=this.hideLabel===!0||this.hideLabel==="true"||this.hideLabel==="",o=this.multiline===!0||this.multiline==="true"||this.multiline==="",l=e?e.active:void 0,t=e?e.direction:void 0;return{"--p-table-head-cell-ws":o?"normal":"nowrap","--p-table-head-cell-icon-opacity":l?"1":"0","--p-table-head-cell-icon-deg":t==="asc"?"0deg":"180deg","--p-table-head-cell-span-pos":a?"absolute":"","--p-table-head-cell-span-w":a?"1px":"","--p-table-head-cell-span-h":a?"1px":"","--p-table-head-cell-span-pad":a?"0":"","--p-table-head-cell-span-m":a?"-1px":"","--p-table-head-cell-span-overflow":a?"hidden":"","--p-table-head-cell-span-clip":a?"rect(0, 0, 0, 0)":"","--p-table-head-cell-span-ws":a?"nowrap":"","--p-table-head-cell-span-display":a?"block":"","--p-table-head-cell-span-border":a?"0":""}}};r([s()],p.prototype,"sort",2);r([s()],p.prototype,"hideLabel",2);r([s()],p.prototype,"multiline",2);p=r([d({selector:"p-table-head-cell",standalone:!0,imports:[b],encapsulation:c.None,template:`
    <div class="p-table-head-cell" data-pds="table-head-cell" [style]="hostStyle">
    <span><span data-pds-slot=""><ng-content></ng-content></span></span> 
    </div>
  `,styles:[`.p-table-head-cell :where([data-pds-slot]){display:contents}

      .p-table-head-cell {
        display: contents;
      }
      .p-table-head-cell {
        display: table-cell;
        padding: 2px var(--_p-table-a, var(--p-spacing-fluid-sm))
          var(--_p-table-a, var(--p-spacing-fluid-sm)) !important;
        vertical-align: bottom !important;
        white-space: var(--p-table-head-cell-ws, nowrap) !important;
      }
      .p-table-head-cell[hidden] {
        display: none !important;
      }
      .p-table-head-cell button{
        position: relative;
        display: flex;
        gap: var(--p-spacing-static-xs);
        width: auto;
        margin: 0;
        padding: 0;
        font: inherit;
        color: inherit;
        align-items: flex-end;
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        text-align: start;
        border: 0;
        z-index: 0;
        cursor: pointer;
      }
      .p-table-head-cell button:focus,
      .p-table-head-cell button:focus-visible{
        outline: none;
      }
      .p-table-head-cell button::before{
        content: "";
        position: absolute;
        inset: -2px -4px;
        border-radius: var(--p-radius-sm);
        z-index: -1;
        transition: background-color
          var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
      }
      .p-table-head-cell button:focus-visible::before{
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      @media (forced-colors: active) {
        .p-table-head-cell button:focus-visible::before{
          outline-color: Highlight;
        }
      }
      @media (hover: hover) {
        .p-table-head-cell button:hover::before{
          -webkit-backdrop-filter: var(--p-blur-frosted);
          backdrop-filter: var(--p-blur-frosted);
          background-color: var(--p-color-frosted);
        }
        .p-table-head-cell button:hover .icon,
        .p-table-head-cell button:focus-visible .icon{
          opacity: 1;
        }
      }
      .p-table-head-cell .icon{
        transition: opacity var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
        opacity: var(--p-table-head-cell-icon-opacity, 0);
        transform: rotate3d(0, 0, 1, var(--p-table-head-cell-icon-deg, 0deg));
        transform-origin: 50% 50%;
      }
      .p-table-head-cell span{
        position: var(--p-table-head-cell-span-pos);
        width: var(--p-table-head-cell-span-w);
        height: var(--p-table-head-cell-span-h);
        padding: var(--p-table-head-cell-span-pad);
        margin: var(--p-table-head-cell-span-m);
        overflow: var(--p-table-head-cell-span-overflow);
        clip: var(--p-table-head-cell-span-clip);
        white-space: var(--p-table-head-cell-span-ws);
        display: var(--p-table-head-cell-span-display);
        border: var(--p-table-head-cell-span-border);
      }`]})],p);export{p as default};
