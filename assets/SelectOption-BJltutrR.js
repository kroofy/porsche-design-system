import c from"./Icon-DzSCh0v5.js";import{I as r,C as d,V as h,a as g}from"./angular-aNJmk6GY.js";import"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var u=Object.defineProperty,m=Object.getOwnPropertyDescriptor,a=(i,t,e,o)=>{for(var p=o>1?void 0:o?m(t,e):t,n=i.length-1,l;n>=0;n--)(l=i[n])&&(p=(o?l(t,e,p):l(p))||p);return o&&p&&u(t,e,p),p};let s=class{get hostStyle(){const i=e=>e===!0||e==="true"||e==="",t=i(this.disabled)||i(this.disabledParent);return{"--p-select-option-opacity":t?"0.4":"","--p-select-option-fc-opacity":t?"1":"","--p-select-option-fc-color":t?"GrayText":"","--p-select-option-cursor":t?"not-allowed":""}}get isDisabled(){return this.disabled===!0||this.disabled==="true"||this.disabled===""||this.disabledParent===!0||this.disabledParent==="true"||this.disabledParent===""}get isSelected(){return this.selected===!0||this.selected==="true"||this.selected===""}get isHighlighted(){return this.highlighted===!0||this.highlighted==="true"||this.highlighted===""}get optionClass(){const i=this.disabled===!0||this.disabled==="true"||this.disabled===""||this.disabledParent===!0||this.disabledParent==="true"||this.disabledParent==="",t=this.selected===!0||this.selected==="true"||this.selected==="",e=this.highlighted===!0||this.highlighted==="true"||this.highlighted==="";let o="option";return t&&(o+=" option--selected"),e&&(o+=" option--highlighted"),i&&(o+=" option--disabled"),o}};a([r()],s.prototype,"disabled",2);a([r()],s.prototype,"disabledParent",2);a([r()],s.prototype,"selected",2);a([r()],s.prototype,"highlighted",2);s=a([d({selector:"p-select-option",standalone:!0,imports:[g,c],encapsulation:h.None,template:`
    <div class="p-select-option" data-pds="select-option" [style]="hostStyle">
    <div class="option">
      <span data-pds-slot=""><ng-content></ng-content></span> <p-icon name="check" color="primary"></p-icon>
    </div>
  
    </div>
  `,styles:[`.p-select-option :where([data-pds-slot]){display:contents}

      .p-select-option {
        display: contents;
      }
      .p-select-option {
        display: block;
        opacity: var(--p-select-option-opacity) !important;
        scroll-margin-block-start: calc(
          max(2px, var(--_p-select-option-a, 1) * 6px) + 36px
        ) !important;
        scroll-margin-block-end: max(
          2px,
          var(--_p-select-option-a, 1) * 6px
        ) !important;
      }
      .p-select-option[hidden] {
        display: none !important;
      }
      .p-select-option [data-pds-slot] > img{
        font: var(--p-typescale-sm) var(--p-font-porsche-next) !important;
        width: auto !important;
        height: var(--p-leading-normal) !important;
        border-radius: var(--p-radius-sm) !important;
      }
      .p-select-option .option{
        display: flex;
        gap: calc(11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px);
        padding-block: calc(
          11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px
        );
        padding-inline: var(
            --_p-select-option-b,
            calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px)
          )
          calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px);
        min-height: var(--p-leading-normal);
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-color-contrast-high);
        cursor: var(--p-select-option-cursor, pointer);
        text-align: start;
        word-break: break-word;
        box-sizing: content-box;
        border-radius: var(--p-radius-sm);
        transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
      }
      .p-select-option .option--highlighted{
        background: var(--p-color-frosted);
      }
      .p-select-option .option--highlighted,
      .p-select-option .option--selected{
        color: var(--p-color-primary);
      }
      .p-select-option .option--disabled{
        cursor: not-allowed;
      }
      .p-select-option .option--hidden{
        display: none;
      }
      .p-select-option .icon{
        margin-inline-start: auto;
      }
      @media (forced-colors: active) {
        .p-select-option {
          opacity: var(--p-select-option-fc-opacity) !important;
          color: var(--p-select-option-fc-color) !important;
        }
        .p-select-option .option--disabled{
          color: GrayText;
        }
        .p-select-option .option--highlighted{
          forced-color-adjust: none;
          outline: 2px solid Highlight;
          outline-offset: -2px;
        }
      }`]})],s);export{s as default};
