import S from"./Icon-DzSCh0v5.js";import{I as c,C as w,V as P,a as _}from"./angular-aNJmk6GY.js";import"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var C=Object.defineProperty,N=Object.getOwnPropertyDescriptor,s=(a,i,o,r)=>{for(var e=r>1?void 0:r?N(i,o):i,n=a.length-1,p;n>=0;n--)(p=a[n])&&(e=(r?p(i,o,e):p(e))||e);return r&&e&&C(i,o,e),e};let t=class{get hostStyle(){const a=d=>d===!0||d==="true"||d==="",i=a(this.compact),o=a(this.disabled)||a(this.disabledParent),r=a(this.selected),e=this.state==="success"||this.state==="error"?this.state:"none",n=this.icon||"",p=this.iconSource||"",m=n!==""||p!=="",v=!0,y=i?"0.5":"1",l="max(2px, var(--p-spacing-static-sm) * var(--_p-segmented-control-a, var(--p-sci-a, 1)))",u="calc("+l+" + 4px)",g={none:"var(--p-color-contrast-lower)",success:"var(--p-color-success)",error:"var(--p-color-error)"},b={none:"var(--p-color-primary)",success:"var(--p-color-success)",error:"var(--p-color-error)"},h={none:"var(--p-color-frosted)",success:"var(--p-color-success-frosted-soft)",error:"var(--p-color-error-frosted-soft)"},x=r?b[e]||b.none:g[e]||g.none,f=r?"var(--p-color-frosted-strong)":h[e]||h.none;return{"--p-sci-a":y,"--p-sci-radius":i?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-sci-pad":m&&v?l+" "+u+" "+l+" "+l:l+" "+u,"--p-sci-border":x,"--p-sci-bg":f,"--p-sci-hover-bg":!o&&!r?"var(--p-color-frosted-strong)":f,"--p-sci-cursor":o?"not-allowed":"pointer","--p-sci-opacity":o?"0.4":"","--p-sci-span":r?"var(--p-color-contrast-high)":"var(--p-color-contrast-medium)","--p-sci-icon-me":m&&v?"0.25rem":"0","--p-sci-btn-font":"normal normal 400 1rem/calc(6px + 2.125ex) 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif","--p-sci-label-font":"normal normal 400 .875rem/calc(6px + 2.125ex) 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif","--p-sci-fc-opacity":o?"1":"","--p-sci-fc-color":o?"GrayText":"","--p-sci-fc-border":o?"GrayText":"","--p-sci-hover-transition":!o&&!r?"background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out)":""}}get labelText(){return this.label||""}get iconName(){return this.icon||""}get iconSrc(){return this.iconSource||""}get isDisabled(){return this.disabled===!0||this.disabled==="true"||this.disabled===""||this.disabledParent===!0||this.disabledParent==="true"||this.disabledParent===""}get isSelected(){return this.selected===!0||this.selected==="true"||this.selected===""}};s([c()],t.prototype,"compact",2);s([c()],t.prototype,"disabled",2);s([c()],t.prototype,"disabledParent",2);s([c()],t.prototype,"selected",2);s([c()],t.prototype,"state",2);s([c()],t.prototype,"icon",2);s([c()],t.prototype,"iconSource",2);s([c()],t.prototype,"label",2);t=s([w({selector:"p-segmented-control-item",standalone:!0,imports:[_,S],encapsulation:P.None,template:`
    <div class="p-segmented-control-item" data-pds="segmented-control-item" [style]="hostStyle">
    <button type="button">
      <span>{{labelText}}</span>
      <p-icon
        class="icon"
        color="inherit"
        size="inherit"
        aria-hidden="true"
        [name]="iconName"
        [source]="iconSrc"
      ></p-icon>
      <span data-pds-slot=""><ng-content></ng-content></span>
    </button>
  
    </div>
  `,styles:[`.p-segmented-control-item :where([data-pds-slot]){display:contents}

      .p-segmented-control-item {
        display: contents;
      }
      .p-segmented-control-item {
        display: block;
        opacity: var(--p-sci-opacity);
      }
      .p-segmented-control-item[hidden] {
        display: none !important;
      }
      .p-segmented-control-item button{
        position: relative;
        display: block;
        height: 100%;
        width: 100%;
        min-height: calc(
          max(
              var(--p-leading-normal),
              var(--_p-segmented-control-a, var(--p-sci-a, 1)) *
                (var(--p-leading-normal) + 10px)
            ) +
            (
              max(
                  2px,
                  var(--p-spacing-static-sm) *
                    var(--_p-segmented-control-a, var(--p-sci-a, 1))
                ) + 1px
            ) * 2
        );
        min-width: calc(
          max(
              var(--p-leading-normal),
              var(--_p-segmented-control-a, var(--p-sci-a, 1)) *
                (var(--p-leading-normal) + 10px)
            ) +
            (
              max(
                  2px,
                  var(--p-spacing-static-sm) *
                    var(--_p-segmented-control-a, var(--p-sci-a, 1))
                ) + 1px
            ) * 2
        );
        padding: var(--p-sci-pad);
        border: 1px solid var(--p-sci-border);
        border-radius: var(--p-sci-radius);
        background: var(--p-sci-bg);
        color: var(--p-color-primary);
        font: var(--p-sci-btn-font);
        cursor: var(--p-sci-cursor, pointer);
        transition: var(--p-sci-hover-transition);
      }
      .p-segmented-control-item button:focus-visible{
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-segmented-control-item span{
        display: block;
        font: var(--p-sci-label-font);
        overflow-wrap: normal;
        color: var(--p-sci-span);
      }
      .p-segmented-control-item .icon{
        height: 1.5rem;
        width: 1.5rem;
        margin-inline-end: var(--p-sci-icon-me);
      }
      @media (forced-colors: active) {
        .p-segmented-control-item {
          opacity: var(--p-sci-fc-opacity, var(--p-sci-opacity, 1));
          color: var(--p-sci-fc-color);
        }
        .p-segmented-control-item button{
          color: var(--p-sci-fc-color, var(--p-color-primary));
          border-color: var(--p-sci-fc-border, var(--p-sci-border));
        }
        .p-segmented-control-item button:focus-visible{
          outline-color: Highlight;
        }
        .p-segmented-control-item span{
          color: var(--p-sci-fc-color, var(--p-sci-span));
        }
      }
      @media (hover: hover) {
        .p-segmented-control-item button:hover{
          background-color: var(--p-sci-hover-bg, var(--p-sci-bg));
        }
      }`]})],t);export{t as default};
