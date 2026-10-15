import{I as p,C as n,V as d,a as h}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var m=Object.defineProperty,u=Object.getOwnPropertyDescriptor,s=(r,o,e,t)=>{for(var i=t>1?void 0:t?u(o,e):o,l=r.length-1,c;l>=0;l--)(c=r[l])&&(i=(t?c(o,e,i):c(i))||i);return t&&i&&m(o,e,i),i};const b=`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/></svg>') center/contain no-repeat`;let a=class{get hostStyle(){const r=t=>t===!0||t==="true"||t==="",o=r(this.disabled)||r(this.disabledParent),e=r(this.selected);return{"--p-mso-opacity":o?"0.4":"","--p-mso-fc-opacity":o?"1":"","--p-mso-fc-color":o?"GrayText":"","--p-mso-pe":o?"none":"","--p-mso-cb-fc-border":o?"GrayText":"","--p-mso-mask":e?b:"","--p-mso-mask-bg":e?"var(--p-checkbox-icon-color, var(--p-color-canvas))":"","--p-mso-cb-bg":e?"var(--p-color-primary)":"","--p-mso-fc-check":e?"CanvasText":"","--p-mso-hover-border":e?"transparent":"var(--p-checkbox-border-color, var(--p-color-primary))","--p-mso-hover-bg":e?"var(--p-checkbox-border-color, var(--p-color-contrast-high))":""}}get isDisabled(){return this.disabled===!0||this.disabled==="true"||this.disabled===""||this.disabledParent===!0||this.disabledParent==="true"||this.disabledParent===""}get isSelected(){return this.selected===!0||this.selected==="true"||this.selected===""}get isHighlighted(){return this.highlighted===!0||this.highlighted==="true"||this.highlighted===""}get optionClass(){const r=this.disabled===!0||this.disabled==="true"||this.disabled===""||this.disabledParent===!0||this.disabledParent==="true"||this.disabledParent==="",o=this.selected===!0||this.selected==="true"||this.selected==="",e=this.highlighted===!0||this.highlighted==="true"||this.highlighted==="";let t="option";return o&&(t+=" option--selected"),e&&(t+=" option--highlighted"),r&&(t+=" option--disabled"),t}};s([p()],a.prototype,"disabled",2);s([p()],a.prototype,"disabledParent",2);s([p()],a.prototype,"selected",2);s([p()],a.prototype,"highlighted",2);a=s([n({selector:"p-multi-select-option",standalone:!0,imports:[h],encapsulation:d.None,template:`
    <div class="p-multi-select-option" data-pds="multi-select-option" [style]="hostStyle">
    <div class="option"><span class="checkbox"></span> <span data-pds-slot=""><ng-content></ng-content></span></div>
  
    </div>
  `,styles:[`.p-multi-select-option :where([data-pds-slot]){display:contents}

      .p-multi-select-option {
        display: contents;
      }
      .p-multi-select-option {
        display: block;
        opacity: var(--p-mso-opacity) !important;
        scroll-margin-block-start: calc(
          max(2px, var(--_p-multi-select-option-a, 1) * 6px) + 36px
        ) !important;
        scroll-margin-block-end: max(
          2px,
          var(--_p-multi-select-option-a, 1) * 6px
        ) !important;
        --_p-checkbox-scaling: var(--_p-multi-select-option-a) !important;
      }
      .p-multi-select-option[hidden] {
        display: none !important;
      }
      .p-multi-select-option [data-pds-slot]{
        display: block;
        padding-top: max(
          0px,
          calc(
            (
                calc(var(--_p-checkbox-scaling) * 1.75rem) -
                  var(--p-leading-normal)
              ) / 2
          )
        );
      }
      .p-multi-select-option .option{
        display: flex;
        gap: calc(
          11.2px * (var(--_p-multi-select-option-a) - 0.64285714) + 4px
        );
        padding-block: calc(
          11.2px * (var(--_p-multi-select-option-a) - 0.64285714) + 4px
        );
        padding-inline: var(
            --_p-multi-select-option-b,
            calc(16.8px * (var(--_p-multi-select-option-a) - 0.64285714) + 6px)
          )
          calc(16.8px * (var(--_p-multi-select-option-a) - 0.64285714) + 6px);
        min-height: var(--p-leading-normal);
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-color-contrast-high);
        cursor: pointer;
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
      .p-multi-select-option .option--highlighted{
        background: var(--p-color-frosted);
      }
      .p-multi-select-option .option--highlighted,
      .p-multi-select-option .option--selected{
        color: var(--p-color-primary);
      }
      .p-multi-select-option .option--disabled{
        cursor: not-allowed;
      }
      .p-multi-select-option .option--hidden{
        display: none;
      }
      .p-multi-select-option .checkbox{
        all: unset;
        display: grid;
        width: calc(var(--_p-checkbox-scaling) * 1.75rem);
        height: calc(var(--_p-checkbox-scaling) * 1.75rem);
        margin-block: max(
          0px,
          calc(
            (
                var(--p-leading-normal) -
                  calc(var(--_p-checkbox-scaling) * 1.75rem)
              ) / 2
          )
        );
        box-sizing: border-box;
        font: var(--p-typescale-sm) var(--p-font-porsche-next);
        background: var(
          --p-mso-cb-bg,
          var(--p-checkbox-background-color, var(--p-color-frosted))
        );
        transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          border-color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        border: 1px solid
          var(--p-checkbox-border-color, var(--p-color-contrast-lower));
        border-radius: var(--p-radius-md);
        pointer-events: var(--p-mso-pe);
        flex-shrink: 0;
      }
      .p-multi-select-option .checkbox::before{
        content: "";
        grid-area: 1 / 1;
        -webkit-mask: var(--p-mso-mask);
        mask: var(--p-mso-mask);
        background-color: var(--p-mso-mask-bg);
      }
      .p-multi-select-option .checkbox::after{
        content: "";
        margin: calc(
          -1px - max(0px, calc(
                  24px - calc(var(--_p-checkbox-scaling) * 1.75rem)
                ) / 2)
        );
        grid-area: 1 / 1;
      }
      @media (forced-colors: active) {
        .p-multi-select-option {
          opacity: var(--p-mso-fc-opacity) !important;
          color: var(--p-mso-fc-color) !important;
        }
        .p-multi-select-option .option--disabled{
          color: GrayText;
        }
        .p-multi-select-option .option--highlighted{
          forced-color-adjust: none;
          outline: 2px solid Highlight;
          outline-offset: -2px;
        }
        .p-multi-select-option .checkbox{
          border-color: var(--p-mso-cb-fc-border);
        }
        .p-multi-select-option .checkbox::before{
          background: var(--p-mso-fc-check);
        }
      }
      @media (hover: hover) {
        .p-multi-select-option .checkbox:hover{
          border-color: var(--p-mso-hover-border);
          background-color: var(--p-mso-hover-bg);
        }
      }`]})],a);export{a as default};
