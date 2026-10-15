import{a as y}from"./host-DRskmCSE.js";import $ from"./Spinner-TTCsUayI.js";import T from"./Icon-DzSCh0v5.js";import{I as g,C as _,V as S,a as L}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";var q=Object.defineProperty,C=Object.getOwnPropertyDescriptor,e=(r,s,i,a)=>{for(var p=a>1?void 0:a?C(s,i):s,l=r.length-1,t;l>=0;l--)(t=r[l])&&(p=(a?t(s,i,p):t(p))||p);return a&&p&&q(s,i,p),p};const m=["base","xs","s","m","l","xl","xxl"],x=(r,s)=>{if(r==null)return s;if(r==="")return typeof s=="boolean"?!0:s;if(typeof r=="string"&&r.charAt(0)==="{")try{return JSON.parse(r.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return s}return r},v=r=>r===!0||r==="true"||r==="",u=(r,s,i)=>r&&typeof r=="object"?r[s]===void 0?i:r[s]:r,f=(r,s,i)=>{const a=s==="base"?"--p-rg-lw":`--p-rg-lw-${s}`,p=s==="base"?"--p-rg-desc":`--p-rg-desc-${s}`;if(i){r[`${a}-pos`]="absolute",r[`${a}-w`]="1px",r[`${a}-h`]="1px",r[`${a}-pad`]="0",r[`${a}-m`]="-1px",r[`${a}-ov`]="hidden",r[`${a}-clip`]="rect(0, 0, 0, 0)",r[`${a}-ws`]="nowrap",r[`${a}-minw`]="",r[`${p}-pos`]="absolute",r[`${p}-w`]="1px",r[`${p}-h`]="1px",r[`${p}-pad`]="0",r[`${p}-m`]="-1px",r[`${p}-ov`]="hidden",r[`${p}-clip`]="rect(0, 0, 0, 0)",r[`${p}-ws`]="nowrap";return}r[`${a}-pos`]="static",r[`${a}-w`]="auto",r[`${a}-h`]="auto",r[`${a}-pad`]="0",r[`${a}-m`]="0",r[`${a}-ov`]="visible",r[`${a}-clip`]="auto",r[`${a}-ws`]="normal",r[`${a}-minw`]="fit-content",r[`${p}-pos`]="static",r[`${p}-w`]="auto",r[`${p}-h`]="auto",r[`${p}-pad`]="0",r[`${p}-m`]="0",r[`${p}-ov`]="visible",r[`${p}-clip`]="auto",r[`${p}-ws`]="normal"},b=(r,s,i)=>{const a=i==="row",p=a?"row wrap":"column nowrap",l=a?"start":"stretch";if(s==="base"){r["--p-rg-flow"]=p,r["--p-rg-align"]=l;return}r[`--p-rg-flow-${s}`]=p,r[`--p-rg-align-${s}`]=l};let o=class{constructor(){this.hostAttr=y}get hostStyle(){const r=v(this.disabled),s=v(this.loading),i=v(this.compact),a=this.state==="success"||this.state==="error"?this.state:"none",l=!!(this.message||"")&&(a==="success"||a==="error"),t=x(this.hideLabel,!1),d=x(this.direction,"column"),h=i?"0.64285714":"1",w={"--_p-radio-group-a":h,"--_p-radio-group-option-a":h,"--p-rg-cursor":r?"not-allowed":"inherit","--p-rg-pe":r||s?"none":"","--p-rg-opacity":r?"0.4":"","--p-rg-fc-opacity":r?"1":"","--p-rg-fc-color":r?"GrayText":"","--p-rg-msg":{none:"",success:"var(--p-color-success)",error:"var(--p-color-error)"}[a]||"","--p-rg-msg-op":l?"":"0","--p-rg-msg-pos":l?"":"absolute","--p-rg-icon-display":l?"inline-flex":"none"};if(typeof t=="object"&&t!==null){let n=v(u(t,"base",!1));for(const c of m)t[c]!==void 0&&(n=v(u(t,c,!1))),f(w,c,n)}else{const n=v(t);for(const c of m)f(w,c,n)}if(typeof d=="object"&&d!==null){let n=u(d,"base","column");for(const c of m)d[c]!==void 0&&(n=u(d,c,"column")),b(w,c,n)}else for(const n of m)b(w,n,d);return w}get labelText(){return this.label||""}get descriptionText(){return this.description||""}get messageText(){const r=this.state||"none",s=this.message||"";return!s||r!=="success"&&r!=="error"?"":s}get iconName(){const r=this.state||"none";return!(this.message||"")||r!=="success"&&r!=="error"?"":r==="error"?"exclamation":"check"}get iconColor(){const r=this.state||"none";return r==="error"?"error":r==="success"?"success":""}get isDisabled(){return this.disabled===!0||this.disabled==="true"||this.disabled===""}get isLoading(){return this.loading===!0||this.loading==="true"||this.loading===""}get isRequired(){return this.required===!0||this.required==="true"||this.required===""}get ariaInvalid(){return this.state==="error"?"true":""}get messageRole(){return this.state==="success"?"status":"alert"}get loadingText(){return this.loading===!0||this.loading==="true"||this.loading===""?"Loading":""}};e([g()],o.prototype,"disabled",2);e([g()],o.prototype,"loading",2);e([g()],o.prototype,"compact",2);e([g()],o.prototype,"state",2);e([g()],o.prototype,"message",2);e([g()],o.prototype,"hideLabel",2);e([g()],o.prototype,"direction",2);e([g()],o.prototype,"label",2);e([g()],o.prototype,"description",2);e([g()],o.prototype,"required",2);o=e([_({selector:"p-radio-group",standalone:!0,imports:[L,T,$],encapsulation:S.None,template:`
    <div class="p-radio-group" data-pds="radio-group" [style]="hostStyle" [attr.loading]="hostAttr(loading) ?? null">
    <fieldset class="root">
      <div class="label-wrapper">
        <div class="label" id="label">
          {{labelText}} <span data-pds-slot="label"><ng-content select="[slot=label]"></ng-content></span>
        </div>
        <span data-pds-slot="label-after"><ng-content select="[slot=label-after]"></ng-content></span>
      </div>
      <span class="label" id="description"
        >{{descriptionText}} <span data-pds-slot="description"><ng-content select="[slot=description]"></ng-content></span></span>
      <div class="wrapper">
        <span data-pds-slot=""><ng-content></ng-content></span> <p-spinner class="spinner" aria-hidden="true"></p-spinner>
      </div>
      <span class="message" id="message"
        ><p-icon
          aria-hidden="true"
          [name]="iconName"
          [color]="iconColor"
        ></p-icon>
        {{messageText}}</span
      >
      <span class="loading" id="loading">{{loadingText}}</span>
    </fieldset>
  
    </div>
  `,styles:[`.p-radio-group :where([data-pds-slot]){display:contents}

      .p-radio-group {
        display: contents;
      }
      .p-radio-group[hidden] {
        display: none !important;
      }
      .p-radio-group [data-pds-slot="label-after"]{
        display: inline-block;
        vertical-align: top;
      }
      .p-radio-group [data-pds-slot="label-after"] > *{
        margin-inline-start: var(--p-spacing-static-xs) !important;
      }
      .p-radio-group .label-after{
        display: inline-block;
        vertical-align: top;
      }
      .p-radio-group[loading] [data-pds-slot] > *:not([slot]) {
        opacity: 0.4 !important;
      }
      .p-radio-group .root{
        all: unset;
        display: grid;
        justify-self: flex-start;
        row-gap: var(--p-spacing-static-xs);
      }
      .p-radio-group .wrapper{
        position: relative;
        display: flex;
        flex-flow: var(--p-rg-flow, column nowrap);
        align-items: var(--p-rg-align, stretch);
        column-gap: calc(22.4px * (var(--_p-radio-group-a) - 0.64285714) + 8px);
        row-gap: calc(11.2px * (var(--_p-radio-group-a) - 0.64285714) + 4px);
      }
      .p-radio-group .spinner{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }
      .p-radio-group .label-wrapper{
        min-width: var(--p-rg-lw-minw);
        position: var(--p-rg-lw-pos, static);
        width: var(--p-rg-lw-w, auto);
        height: var(--p-rg-lw-h, auto);
        padding: var(--p-rg-lw-pad, 0);
        margin: var(--p-rg-lw-m, 0);
        overflow: var(--p-rg-lw-ov, visible);
        clip: var(--p-rg-lw-clip, auto);
        white-space: var(--p-rg-lw-ws, normal);
      }
      .p-radio-group .label{
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        cursor: var(--p-rg-cursor, inherit);
        color: var(--p-color-primary);
        pointer-events: var(--p-rg-pe);
        opacity: var(--p-rg-opacity);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
        display: inline;
      }
      .p-radio-group .label:empty{
        display: none;
      }
      .p-radio-group .label:is(span){
        cursor: unset;
        font-size: var(--p-typescale-xs);
        color: var(--p-color-contrast-high);
        min-width: unset;
        position: var(--p-rg-desc-pos, static);
        width: var(--p-rg-desc-w, auto);
        height: var(--p-rg-desc-h, auto);
        padding: var(--p-rg-desc-pad, 0);
        margin: var(--p-rg-desc-m, 0);
        overflow: var(--p-rg-desc-ov, visible);
        clip: var(--p-rg-desc-clip, auto);
        white-space: var(--p-rg-desc-ws, normal);
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
      .p-radio-group .label > [data-pds-slot="label"] > *{
        display: inline !important;
      }
      .p-radio-group .required{
        user-select: none;
      }
      .p-radio-group .message{
        display: flex;
        gap: var(--p-spacing-static-xs);
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-rg-msg, inherit);
        opacity: var(--p-rg-msg-op);
        position: var(--p-rg-msg-pos);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
      }
      .p-radio-group .message:empty{
        opacity: 0;
        position: absolute;
      }
      .p-radio-group .message .p-icon{
        display: var(--p-rg-icon-display, none);
      }
      .p-radio-group .loading{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }
      .p-radio-group .sr-only{
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
        .p-radio-group .label{
          opacity: var(--p-rg-fc-opacity, var(--p-rg-opacity, 1));
          color: var(--p-rg-fc-color, var(--p-color-primary));
        }
        .p-radio-group[loading] [data-pds-slot] > *:not([slot]) {
          opacity: 1 !important;
          color: GrayText !important;
        }
      }
      @media (min-width: 480px) {
        .p-radio-group .wrapper{
          flex-flow: var(--p-rg-flow-xs, var(--p-rg-flow, column nowrap));
          align-items: var(--p-rg-align-xs, var(--p-rg-align, stretch));
        }
        .p-radio-group .label-wrapper{
          min-width: var(--p-rg-lw-xs-minw, var(--p-rg-lw-minw));
          position: var(--p-rg-lw-xs-pos, var(--p-rg-lw-pos, static));
          width: var(--p-rg-lw-xs-w, var(--p-rg-lw-w, auto));
          height: var(--p-rg-lw-xs-h, var(--p-rg-lw-h, auto));
          padding: var(--p-rg-lw-xs-pad, var(--p-rg-lw-pad, 0));
          margin: var(--p-rg-lw-xs-m, var(--p-rg-lw-m, 0));
          overflow: var(--p-rg-lw-xs-ov, var(--p-rg-lw-ov, visible));
          clip: var(--p-rg-lw-xs-clip, var(--p-rg-lw-clip, auto));
          white-space: var(--p-rg-lw-xs-ws, var(--p-rg-lw-ws, normal));
        }
        .p-radio-group .label:is(span){
          position: var(--p-rg-desc-xs-pos, var(--p-rg-desc-pos, static));
          width: var(--p-rg-desc-xs-w, var(--p-rg-desc-w, auto));
          height: var(--p-rg-desc-xs-h, var(--p-rg-desc-h, auto));
          padding: var(--p-rg-desc-xs-pad, var(--p-rg-desc-pad, 0));
          margin: var(--p-rg-desc-xs-m, var(--p-rg-desc-m, 0));
          overflow: var(--p-rg-desc-xs-ov, var(--p-rg-desc-ov, visible));
          clip: var(--p-rg-desc-xs-clip, var(--p-rg-desc-clip, auto));
          white-space: var(--p-rg-desc-xs-ws, var(--p-rg-desc-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 760px) {
        .p-radio-group .wrapper{
          flex-flow: var(
            --p-rg-flow-s,
            var(--p-rg-flow-xs, var(--p-rg-flow, column nowrap))
          );
          align-items: var(
            --p-rg-align-s,
            var(--p-rg-align-xs, var(--p-rg-align, stretch))
          );
        }
        .p-radio-group .label-wrapper{
          min-width: var(
            --p-rg-lw-s-minw,
            var(--p-rg-lw-xs-minw, var(--p-rg-lw-minw))
          );
          position: var(
            --p-rg-lw-s-pos,
            var(--p-rg-lw-xs-pos, var(--p-rg-lw-pos, static))
          );
          width: var(
            --p-rg-lw-s-w,
            var(--p-rg-lw-xs-w, var(--p-rg-lw-w, auto))
          );
          height: var(
            --p-rg-lw-s-h,
            var(--p-rg-lw-xs-h, var(--p-rg-lw-h, auto))
          );
          padding: var(
            --p-rg-lw-s-pad,
            var(--p-rg-lw-xs-pad, var(--p-rg-lw-pad, 0))
          );
          margin: var(--p-rg-lw-s-m, var(--p-rg-lw-xs-m, var(--p-rg-lw-m, 0)));
          overflow: var(
            --p-rg-lw-s-ov,
            var(--p-rg-lw-xs-ov, var(--p-rg-lw-ov, visible))
          );
          clip: var(
            --p-rg-lw-s-clip,
            var(--p-rg-lw-xs-clip, var(--p-rg-lw-clip, auto))
          );
          white-space: var(
            --p-rg-lw-s-ws,
            var(--p-rg-lw-xs-ws, var(--p-rg-lw-ws, normal))
          );
        }
        .p-radio-group .label:is(span){
          position: var(
            --p-rg-desc-s-pos,
            var(--p-rg-desc-xs-pos, var(--p-rg-desc-pos, static))
          );
          width: var(
            --p-rg-desc-s-w,
            var(--p-rg-desc-xs-w, var(--p-rg-desc-w, auto))
          );
          height: var(
            --p-rg-desc-s-h,
            var(--p-rg-desc-xs-h, var(--p-rg-desc-h, auto))
          );
          padding: var(
            --p-rg-desc-s-pad,
            var(--p-rg-desc-xs-pad, var(--p-rg-desc-pad, 0))
          );
          margin: var(
            --p-rg-desc-s-m,
            var(--p-rg-desc-xs-m, var(--p-rg-desc-m, 0))
          );
          overflow: var(
            --p-rg-desc-s-ov,
            var(--p-rg-desc-xs-ov, var(--p-rg-desc-ov, visible))
          );
          clip: var(
            --p-rg-desc-s-clip,
            var(--p-rg-desc-xs-clip, var(--p-rg-desc-clip, auto))
          );
          white-space: var(
            --p-rg-desc-s-ws,
            var(--p-rg-desc-xs-ws, var(--p-rg-desc-ws, normal))
          );
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1000px) {
        .p-radio-group .wrapper{
          flex-flow: var(--p-rg-flow-m, var(--p-rg-flow-s));
          align-items: var(--p-rg-align-m, var(--p-rg-align-s));
        }
        .p-radio-group .label-wrapper{
          min-width: var(--p-rg-lw-m-minw, var(--p-rg-lw-s-minw));
          position: var(--p-rg-lw-m-pos, var(--p-rg-lw-s-pos, static));
          width: var(--p-rg-lw-m-w, var(--p-rg-lw-s-w, auto));
          height: var(--p-rg-lw-m-h, var(--p-rg-lw-s-h, auto));
          padding: var(--p-rg-lw-m-pad, var(--p-rg-lw-s-pad, 0));
          margin: var(--p-rg-lw-m-m, var(--p-rg-lw-s-m, 0));
          overflow: var(--p-rg-lw-m-ov, var(--p-rg-lw-s-ov, visible));
          clip: var(--p-rg-lw-m-clip, var(--p-rg-lw-s-clip, auto));
          white-space: var(--p-rg-lw-m-ws, var(--p-rg-lw-s-ws, normal));
        }
        .p-radio-group .label:is(span){
          position: var(--p-rg-desc-m-pos, var(--p-rg-desc-s-pos, static));
          width: var(--p-rg-desc-m-w, var(--p-rg-desc-s-w, auto));
          height: var(--p-rg-desc-m-h, var(--p-rg-desc-s-h, auto));
          padding: var(--p-rg-desc-m-pad, var(--p-rg-desc-s-pad, 0));
          margin: var(--p-rg-desc-m-m, var(--p-rg-desc-s-m, 0));
          overflow: var(--p-rg-desc-m-ov, var(--p-rg-desc-s-ov, visible));
          clip: var(--p-rg-desc-m-clip, var(--p-rg-desc-s-clip, auto));
          white-space: var(--p-rg-desc-m-ws, var(--p-rg-desc-s-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1300px) {
        .p-radio-group .wrapper{
          flex-flow: var(--p-rg-flow-l, var(--p-rg-flow-m));
          align-items: var(--p-rg-align-l, var(--p-rg-align-m));
        }
        .p-radio-group .label-wrapper{
          min-width: var(--p-rg-lw-l-minw, var(--p-rg-lw-m-minw));
          position: var(--p-rg-lw-l-pos, var(--p-rg-lw-m-pos, static));
          width: var(--p-rg-lw-l-w, var(--p-rg-lw-m-w, auto));
          height: var(--p-rg-lw-l-h, var(--p-rg-lw-m-h, auto));
          padding: var(--p-rg-lw-l-pad, var(--p-rg-lw-m-pad, 0));
          margin: var(--p-rg-lw-l-m, var(--p-rg-lw-m-m, 0));
          overflow: var(--p-rg-lw-l-ov, var(--p-rg-lw-m-ov, visible));
          clip: var(--p-rg-lw-l-clip, var(--p-rg-lw-m-clip, auto));
          white-space: var(--p-rg-lw-l-ws, var(--p-rg-lw-m-ws, normal));
        }
        .p-radio-group .label:is(span){
          position: var(--p-rg-desc-l-pos, var(--p-rg-desc-m-pos, static));
          width: var(--p-rg-desc-l-w, var(--p-rg-desc-m-w, auto));
          height: var(--p-rg-desc-l-h, var(--p-rg-desc-m-h, auto));
          padding: var(--p-rg-desc-l-pad, var(--p-rg-desc-m-pad, 0));
          margin: var(--p-rg-desc-l-m, var(--p-rg-desc-m-m, 0));
          overflow: var(--p-rg-desc-l-ov, var(--p-rg-desc-m-ov, visible));
          clip: var(--p-rg-desc-l-clip, var(--p-rg-desc-m-clip, auto));
          white-space: var(--p-rg-desc-l-ws, var(--p-rg-desc-m-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1760px) {
        .p-radio-group .wrapper{
          flex-flow: var(--p-rg-flow-xl, var(--p-rg-flow-l));
          align-items: var(--p-rg-align-xl, var(--p-rg-align-l));
        }
        .p-radio-group .label-wrapper{
          min-width: var(--p-rg-lw-xl-minw, var(--p-rg-lw-l-minw));
          position: var(--p-rg-lw-xl-pos, var(--p-rg-lw-l-pos, static));
          width: var(--p-rg-lw-xl-w, var(--p-rg-lw-l-w, auto));
          height: var(--p-rg-lw-xl-h, var(--p-rg-lw-l-h, auto));
          padding: var(--p-rg-lw-xl-pad, var(--p-rg-lw-l-pad, 0));
          margin: var(--p-rg-lw-xl-m, var(--p-rg-lw-l-m, 0));
          overflow: var(--p-rg-lw-xl-ov, var(--p-rg-lw-l-ov, visible));
          clip: var(--p-rg-lw-xl-clip, var(--p-rg-lw-l-clip, auto));
          white-space: var(--p-rg-lw-xl-ws, var(--p-rg-lw-l-ws, normal));
        }
        .p-radio-group .label:is(span){
          position: var(--p-rg-desc-xl-pos, var(--p-rg-desc-l-pos, static));
          width: var(--p-rg-desc-xl-w, var(--p-rg-desc-l-w, auto));
          height: var(--p-rg-desc-xl-h, var(--p-rg-desc-l-h, auto));
          padding: var(--p-rg-desc-xl-pad, var(--p-rg-desc-l-pad, 0));
          margin: var(--p-rg-desc-xl-m, var(--p-rg-desc-l-m, 0));
          overflow: var(--p-rg-desc-xl-ov, var(--p-rg-desc-l-ov, visible));
          clip: var(--p-rg-desc-xl-clip, var(--p-rg-desc-l-clip, auto));
          white-space: var(--p-rg-desc-xl-ws, var(--p-rg-desc-l-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1920px) {
        .p-radio-group .wrapper{
          flex-flow: var(--p-rg-flow-xxl, var(--p-rg-flow-xl));
          align-items: var(--p-rg-align-xxl, var(--p-rg-align-xl));
        }
        .p-radio-group .label-wrapper{
          min-width: var(--p-rg-lw-xxl-minw, var(--p-rg-lw-xl-minw));
          position: var(--p-rg-lw-xxl-pos, var(--p-rg-lw-xl-pos, static));
          width: var(--p-rg-lw-xxl-w, var(--p-rg-lw-xl-w, auto));
          height: var(--p-rg-lw-xxl-h, var(--p-rg-lw-xl-h, auto));
          padding: var(--p-rg-lw-xxl-pad, var(--p-rg-lw-xl-pad, 0));
          margin: var(--p-rg-lw-xxl-m, var(--p-rg-lw-xl-m, 0));
          overflow: var(--p-rg-lw-xxl-ov, var(--p-rg-lw-xl-ov, visible));
          clip: var(--p-rg-lw-xxl-clip, var(--p-rg-lw-xl-clip, auto));
          white-space: var(--p-rg-lw-xxl-ws, var(--p-rg-lw-xl-ws, normal));
        }
        .p-radio-group .label:is(span){
          position: var(--p-rg-desc-xxl-pos, var(--p-rg-desc-xl-pos, static));
          width: var(--p-rg-desc-xxl-w, var(--p-rg-desc-xl-w, auto));
          height: var(--p-rg-desc-xxl-h, var(--p-rg-desc-xl-h, auto));
          padding: var(--p-rg-desc-xxl-pad, var(--p-rg-desc-xl-pad, 0));
          margin: var(--p-rg-desc-xxl-m, var(--p-rg-desc-xl-m, 0));
          overflow: var(--p-rg-desc-xxl-ov, var(--p-rg-desc-xl-ov, visible));
          clip: var(--p-rg-desc-xxl-clip, var(--p-rg-desc-xl-clip, auto));
          white-space: var(--p-rg-desc-xxl-ws, var(--p-rg-desc-xl-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }`]})],o);export{o as default};
