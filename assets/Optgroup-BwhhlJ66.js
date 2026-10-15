import{I as n,C as d,V as c,a as u}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var g=Object.defineProperty,v=Object.getOwnPropertyDescriptor,i=(o,t,e,r)=>{for(var p=r>1?void 0:r?v(t,e):t,l=o.length-1,s;l>=0;l--)(s=o[l])&&(p=(r?s(t,e,p):s(p))||p);return r&&p&&g(t,e,p),p};let a=class{get hostStyle(){const o=this.disabled===!0||this.disabled==="true"||this.disabled==="";return{"--p-optgroup-opacity":o?"0.4":"1","--p-optgroup-hcm-color":o?"GrayText":"var(--p-color-primary)"}}get labelText(){return this.label||""}get isDisabled(){return this.disabled===!0||this.disabled==="true"||this.disabled===""}};i([n()],a.prototype,"disabled",2);i([n()],a.prototype,"label",2);a=i([d({selector:"p-optgroup",standalone:!0,imports:[u],encapsulation:c.None,template:`
    <div class="p-optgroup" data-pds="optgroup" [style]="hostStyle">
    <div role="group">
      <span id="label" role="presentation">{{labelText}}</span> <span data-pds-slot=""><ng-content></ng-content></span>
    </div>
  
    </div>
  `,styles:[`.p-optgroup :where([data-pds-slot]){display:contents}

      .p-optgroup {
        display: contents;
      }
      .p-optgroup {
        display: block;
      }
      .p-optgroup[hidden] {
        display: none !important;
      }
      .p-optgroup [data-pds-slot] > *{
        --_p-select-option-b: calc(
          44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px
        );
        --_p-multi-select-option-b: calc(
          44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px
        );
      }
      .p-optgroup [role="group"]{
        display: flex;
        flex-direction: column;
        gap: calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);
      }
      .p-optgroup [role="presentation"]{
        padding-block: calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);
        padding-inline: calc(
          16.8px * (var(--_p-optgroup-a) - 0.64285714) + 6px
        );
        font: var(--p-font-weight-semibold) var(--p-typescale-xs) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-color-primary);
        opacity: var(--p-optgroup-opacity, 1);
      }
      @media (forced-colors: active) {
        .p-optgroup [role="presentation"]{
          opacity: 1;
          color: var(--p-optgroup-hcm-color, var(--p-color-primary));
        }
      }`]})],a);export{a as default};
