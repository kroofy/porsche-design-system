import c from"./Icon-DzSCh0v5.js";import{I as p,C as d,V as m,a as f}from"./angular-aNJmk6GY.js";import"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var g=Object.defineProperty,u=Object.getOwnPropertyDescriptor,n=(e,s,a,r)=>{for(var t=r>1?void 0:r?u(s,a):s,i=e.length-1,l;i>=0;i--)(l=e[i])&&(t=(r?l(s,a,t):l(t))||t);return r&&t&&g(s,a,t),t};let o=class{get hostStyle(){const e=this.state==="success"||this.state==="error"?this.state:"none",a=!!(this.message||"")&&(e==="success"||e==="error"),t=!!(this.label||""),i=(this.labelSize||"medium")==="small";return{"--p-fieldset-legend-display":t?"":"none","--p-fieldset-legend-font":i?"var(--p-font-weight-semibold) var(--p-typescale-sm)":"var(--p-font-weight-normal) var(--p-typescale-md)","--p-fieldset-msg-color":{none:"",success:"var(--p-color-success)",error:"var(--p-color-error)"}[e]||"","--p-fieldset-msg-opacity":a?"":"0","--p-fieldset-msg-pos":a?"":"absolute","--p-fieldset-icon-display":a?"":"none"}}get labelText(){return this.label||""}get messageText(){const e=this.state||"none",s=this.message||"";return!s||e!=="success"&&e!=="error"?"":s}get iconName(){const e=this.state||"none";return!(this.message||"")||e!=="success"&&e!=="error"?"":e==="error"?"exclamation":"check"}get iconColor(){const e=this.state||"none";return e==="error"?"error":e==="success"?"success":""}};n([p()],o.prototype,"state",2);n([p()],o.prototype,"message",2);n([p()],o.prototype,"label",2);n([p()],o.prototype,"labelSize",2);o=n([d({selector:"p-fieldset",standalone:!0,imports:[f,c],encapsulation:m.None,template:`
    <div class="p-fieldset" data-pds="fieldset" [style]="hostStyle">
    <fieldset>
      <legend>{{labelText}}</legend>
      <span data-pds-slot=""><ng-content></ng-content></span>
      <span class="message" id="message"
        ><p-icon
          aria-hidden="true"
          [name]="iconName"
          [color]="iconColor"
        ></p-icon>
        {{messageText}}</span
      >
    </fieldset>
  
    </div>
  `,styles:[`.p-fieldset :where([data-pds-slot]){display:contents}

      .p-fieldset {
        display: contents;
      }
      .p-fieldset {
        display: block;
      }
      .p-fieldset[hidden] {
        display: none !important;
      }
      .p-fieldset fieldset{
        all: unset;
        display: block;
      }
      .p-fieldset legend{
        all: unset;
        display: var(--p-fieldset-legend-display);
        margin-bottom: var(--p-spacing-static-md);
        color: var(--p-color-primary);
        font: var(--p-fieldset-legend-font) / var(--p-leading-normal)
          var(--p-font-porsche-next);
      }
      .p-fieldset .required{
        user-select: none;
      }
      .p-fieldset .message{
        display: flex;
        gap: var(--p-spacing-static-xs);
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-fieldset-msg-color);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        margin-top: var(--p-spacing-static-md);
        opacity: var(--p-fieldset-msg-opacity);
        position: var(--p-fieldset-msg-pos);
      }
      .p-fieldset .message:empty{
        opacity: 0;
        position: absolute;
      }
      .p-fieldset .message .p-icon{
        display: var(--p-fieldset-icon-display);
      }`]})],o);export{o as default};
