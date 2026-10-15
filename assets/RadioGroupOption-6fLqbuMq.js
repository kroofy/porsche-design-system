import u from"./Spinner-TTCsUayI.js";import{I as i,C as v,V as h,a as b}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var m=Object.defineProperty,f=Object.getOwnPropertyDescriptor,e=(o,r,p,s)=>{for(var a=s>1?void 0:s?f(r,p):r,n=o.length-1,l;n>=0;n--)(l=o[n])&&(a=(s?l(r,p,a):l(a))||a);return s&&a&&m(r,p,a),a};let t=class{get hostStyle(){const o=c=>c===!0||c==="true"||c==="",r=o(this.disabled)||o(this.disabledParent),p=o(this.selected),a=o(this.loading)&&!p||o(this.loadingParent),n=r||a,l=this.state==="success"||this.state==="error"?this.state:"none",g={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",checked:"var(--p-color-primary)"},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",checked:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",checked:"var(--p-color-error)"}},d=g[l]||g.none;return{"--p-rgo-bg":d.bg,"--p-rgo-border":d.border,"--p-rgo-hover":n?"":d.hover,"--p-rgo-checked":d.checked,"--p-rgo-pe":n?"none":"","--p-rgo-cursor":n?"not-allowed":"pointer","--p-rgo-opacity":r?"0.4":"","--p-rgo-fc-opacity":r?"1":"","--p-rgo-fc-color":r?"GrayText":"","--p-rgo-fc-input-border":n?"GrayText":""}}get labelText(){return this.label||""}get isDisabled(){return this.disabled===!0||this.disabled==="true"||this.disabled===""||this.disabledParent===!0||this.disabledParent==="true"||this.disabledParent===""}get isSelected(){return this.selected===!0||this.selected==="true"||this.selected===""}get isLoadingParent(){return this.loadingParent===!0||this.loadingParent==="true"||this.loadingParent===""}get isOptionLoading(){const o=this.selected===!0||this.selected==="true"||this.selected==="";return(this.loading===!0||this.loading==="true"||this.loading==="")&&!o}get isLoading(){const o=this.selected===!0||this.selected==="true"||this.selected==="",r=this.loading===!0||this.loading==="true"||this.loading==="",p=this.loadingParent===!0||this.loadingParent==="true"||this.loadingParent==="";return r&&!o||p}get loadingText(){const o=this.selected===!0||this.selected==="true"||this.selected==="",r=this.loading===!0||this.loading==="true"||this.loading==="";return this.loadingParent===!0||this.loadingParent==="true"||this.loadingParent===""?"":r&&!o?"Loading":""}get ariaInvalid(){return this.state==="error"?"true":""}get inputName(){return this.name||""}get inputValue(){return this.value==null?"":String(this.value)}};e([i()],t.prototype,"disabled",2);e([i()],t.prototype,"disabledParent",2);e([i()],t.prototype,"selected",2);e([i()],t.prototype,"loading",2);e([i()],t.prototype,"loadingParent",2);e([i()],t.prototype,"state",2);e([i()],t.prototype,"label",2);e([i()],t.prototype,"name",2);e([i()],t.prototype,"value",2);t=e([v({selector:"p-radio-group-option",standalone:!0,imports:[b,u],encapsulation:h.None,template:`
    <div class="p-radio-group-option" data-pds="radio-group-option" [style]="hostStyle">
    <div class="root">
      <div class="wrapper">
        <input type="radio"  [value]="inputValue" [disabled]="isDisabled" />
        <p-spinner class="spinner" aria-hidden="true"></p-spinner>
      </div>
      <div class="label-wrapper">
        <label class="label" id="label"
          >{{labelText}} <span data-pds-slot="label"><ng-content select="[slot=label]"></ng-content></span></label>
        <span class="label-after"><span data-pds-slot="label-after"><ng-content select="[slot=label-after]"></ng-content></span></span>
      </div>
      <span class="loading" id="loading">{{loadingText}}</span>
    </div>
  
    </div>
  `,styles:[`.p-radio-group-option :where([data-pds-slot]){display:contents}

      .p-radio-group-option {
        display: contents;
      }
      .p-radio-group-option {
        display: block;
      }
      .p-radio-group-option[hidden] {
        display: none !important;
      }
      .p-radio-group-option [data-pds-slot="label-after"]{
        display: inline-block;
        vertical-align: top;
      }
      .p-radio-group-option [data-pds-slot="label-after"] > *{
        margin-inline-start: var(--p-spacing-static-xs) !important;
      }
      .p-radio-group-option .label-after{
        display: inline-block;
        vertical-align: top;
      }
      .p-radio-group-option input{
        all: unset;
        display: grid;
        width: calc(var(--_p-radio-group-option-a) * 1.75rem);
        height: calc(var(--_p-radio-group-option-a) * 1.75rem);
        margin-block: max(
          0px,
          calc(
            (
                var(--p-leading-normal) -
                  calc(var(--_p-radio-group-option-a) * 1.75rem)
              ) / 2
          )
        );
        box-sizing: border-box;
        font: var(--p-typescale-sm) var(--p-font-porsche-next);
        background: var(--p-rgo-bg);
        transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          border-color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        border: 1px solid var(--p-rgo-border);
        border-radius: var(--p-radius-full);
        pointer-events: var(--p-rgo-pe);
      }
      .p-radio-group-option input:focus-visible{
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-radio-group-option input:checked{
        background: var(--p-rgo-checked);
      }
      .p-radio-group-option input::before{
        content: "";
        grid-area: 1 / 1;
      }
      .p-radio-group-option input::after{
        content: "";
        margin: calc(
          -1px - max(0px, calc(
                  24px - calc(var(--_p-radio-group-option-a) * 1.75rem)
                ) / 2)
        );
        grid-area: 1 / 1;
      }
      .p-radio-group-option input:checked::before{
        -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>')
          center / contain no-repeat;
        mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>')
          center / contain no-repeat;
        background-color: var(--p-color-canvas);
      }
      .p-radio-group-option .root{
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        row-gap: var(--p-spacing-static-xs);
      }
      .p-radio-group-option .wrapper{
        position: relative;
        display: flex;
        align-items: center;
        align-self: flex-start;
        min-height: var(--p-leading-normal);
        cursor: var(--p-rgo-cursor, pointer);
        opacity: var(--p-rgo-opacity);
      }
      .p-radio-group-option .spinner{
        --p-spinner-size: calc(
          calc(var(--_p-radio-group-option-a) * 1.75rem) - 2px
        );
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .p-radio-group-option .label-wrapper{
        min-width: fit-content;
        position: static;
        width: auto;
        height: auto;
        padding: 0;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
        padding-top: max(
          0px,
          calc(
            (
                calc(var(--_p-radio-group-option-a) * 1.75rem) -
                  var(--p-leading-normal)
              ) / 2
          )
        );
        padding-inline-start: calc(
          11.2px * (var(--_p-radio-group-option-a) - 0.64285714) + 4px
        );
      }
      .p-radio-group-option .label{
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        cursor: var(--p-rgo-cursor, pointer);
        color: var(--p-color-primary);
        pointer-events: var(--p-rgo-pe);
        opacity: var(--p-rgo-opacity);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
        display: inline;
      }
      .p-radio-group-option .label:empty{
        display: none;
      }
      .p-radio-group-option .label:is(span){
        cursor: unset;
        font-size: var(--p-typescale-xs);
        color: var(--p-color-contrast-high);
        position: static;
        width: auto;
        height: auto;
        padding: 0;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
      .p-radio-group-option .label > [data-pds-slot="label"] > *{
        display: inline !important;
      }
      .p-radio-group-option .required{
        user-select: none;
      }
      .p-radio-group-option .loading{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }
      @media (forced-colors: active) {
        .p-radio-group-option input{
          border-color: var(--p-rgo-fc-input-border);
        }
        .p-radio-group-option input:checked::before{
          background: CanvasText;
        }
        .p-radio-group-option input:focus-visible{
          outline-color: Highlight;
        }
        .p-radio-group-option .wrapper{
          opacity: var(--p-rgo-fc-opacity);
          color: var(--p-rgo-fc-color);
        }
        .p-radio-group-option .label{
          opacity: var(--p-rgo-fc-opacity);
          color: var(--p-rgo-fc-color);
        }
      }
      @media (hover: hover) {
        .p-radio-group-option input:hover{
          border-color: var(--p-rgo-hover);
        }
      }`]})],t);export{t as default};
