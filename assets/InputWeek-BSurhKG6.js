import{a as f}from"./host-DRskmCSE.js";import y from"./Spinner-TTCsUayI.js";import k from"./Icon-DzSCh0v5.js";import $ from"./ButtonPure-NwIxAAH4.js";import{I as s,C as O,V as L,a as T}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";var _=Object.defineProperty,S=Object.getOwnPropertyDescriptor,r=(t,p,l,a)=>{for(var i=a>1?void 0:a?S(p,l):p,v=t.length-1,o;v>=0;v--)(o=t[v])&&(i=(a?o(p,l,i):o(i))||i);return a&&i&&_(p,l,i),i};const g=["base","xs","s","m","l","xl","xxl"],A=(t,p)=>{if(t==null)return p;if(t==="")return!0;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return p}return t},n=t=>t===!0||t==="true"||t==="",x=(t,p,l)=>t&&typeof t=="object"?t[p]===void 0?l:t[p]:t,b=(t,p,l)=>{const a=p==="base"?"--p-it-lw":`--p-it-lw-${p}`,i=p==="base"?"--p-it-desc":`--p-it-desc-${p}`;if(l){t[`${a}-pos`]="absolute",t[`${a}-w`]="1px",t[`${a}-h`]="1px",t[`${a}-pad`]="0",t[`${a}-m`]="-1px",t[`${a}-ov`]="hidden",t[`${a}-clip`]="rect(0, 0, 0, 0)",t[`${a}-ws`]="nowrap",t[`${a}-minw`]="",t[`${i}-pos`]="absolute",t[`${i}-w`]="1px",t[`${i}-h`]="1px",t[`${i}-pad`]="0",t[`${i}-m`]="-1px",t[`${i}-ov`]="hidden",t[`${i}-clip`]="rect(0, 0, 0, 0)",t[`${i}-ws`]="nowrap";return}t[`${a}-pos`]="static",t[`${a}-w`]="auto",t[`${a}-h`]="auto",t[`${a}-pad`]="0",t[`${a}-m`]="0",t[`${a}-ov`]="visible",t[`${a}-clip`]="auto",t[`${a}-ws`]="normal",t[`${a}-minw`]="fit-content",t[`${i}-pos`]="static",t[`${i}-w`]="auto",t[`${i}-h`]="auto",t[`${i}-pad`]="0",t[`${i}-m`]="0",t[`${i}-ov`]="visible",t[`${i}-clip`]="auto",t[`${i}-ws`]="normal"};let e=class{constructor(){this.hostAttr=f}get hostStyle(){const t=n(this.disabled),p=n(this.loading),l=n(this.compact),a=n(this.readOnly),i=this.state==="success"||this.state==="error"?this.state:"none",o=!!(this.message||"")&&(i==="success"||i==="error"),d=A(this.hideLabel,!1),h={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},w=h[i]||h.none,m={"--p-it-scale":l?"0.64285714":"1","--p-it-radius":l?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-it-border":a?"transparent":w.border,"--p-it-bg":a?"var(--p-color-frosted)":w.bg,"--p-it-color":a?"var(--p-color-contrast-medium)":"var(--p-color-primary)","--p-it-hover":w.hover,"--p-it-cursor":t?"not-allowed":"text","--p-it-wrap-op":t?"0.4":"","--p-it-child-op":t?"0.4":"","--p-it-label-cursor":t||p?"not-allowed":"pointer","--p-it-pe":t||p?"none":"","--p-it-opacity":t?"0.4":"","--p-it-msg":w.message||"","--p-it-msg-op":o?"":"0","--p-it-msg-pos":o?"":"absolute","--p-it-icon-display":o?"inline-flex":"none","--p-it-spinner-display":p?"inline-flex":"none","--p-it-font":"var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next)"};if(typeof d=="object"&&d!==null){let u=n(x(d,"base",!1));for(const c of g)d[c]!==void 0&&(u=n(x(d,c,!1))),b(m,c,u)}else{const u=n(d);for(const c of g)b(m,c,u)}return m}get labelText(){return this.label||""}get descriptionText(){return this.description||""}get messageText(){const t=this.state||"none",p=this.message||"";return!p||t!=="success"&&t!=="error"?"":p}get iconName(){const t=this.state||"none";return!(this.message||"")||t!=="success"&&t!=="error"?"":t==="error"?"exclamation":"check"}get iconColor(){const t=this.state||"none";return t==="error"?"error":t==="success"?"success":""}get inputValue(){return this.value==null?"":String(this.value)}get maxLengthValue(){return this.maxLength==null||this.maxLength===""?"":String(this.maxLength)}get isDisabled(){return this.disabled===!0||this.disabled==="true"||this.disabled===""}get isReadOnly(){return this.readOnly===!0||this.readOnly==="true"||this.readOnly===""}get ariaDisabled(){const t=this.disabled===!0||this.disabled==="true"||this.disabled==="",p=this.loading===!0||this.loading==="true"||this.loading==="";return t||p?"true":""}get ariaInvalid(){return this.state==="error"?"true":""}get ariaReadonly(){return this.readOnly===!0||this.readOnly==="true"||this.readOnly===""?"true":""}get loadingText(){return this.loading===!0||this.loading==="true"||this.loading===""?"Loading":""}get placeholderText(){return this.placeholder||""}};r([s()],e.prototype,"disabled",2);r([s()],e.prototype,"loading",2);r([s()],e.prototype,"compact",2);r([s()],e.prototype,"readOnly",2);r([s()],e.prototype,"state",2);r([s()],e.prototype,"message",2);r([s()],e.prototype,"hideLabel",2);r([s()],e.prototype,"label",2);r([s()],e.prototype,"description",2);r([s()],e.prototype,"value",2);r([s()],e.prototype,"maxLength",2);r([s()],e.prototype,"placeholder",2);e=r([O({selector:"p-input-week",standalone:!0,imports:[T,$,k,y],encapsulation:L.None,template:`
    <div class="p-input-week" data-pds="input-week" [style]="hostStyle" [attr.disabled]="hostAttr(disabled) ?? null" [attr.loading]="hostAttr(loading) ?? null" [attr.read-only]="hostAttr(readOnly) ?? null">
    <div class="root">
      <div class="label-wrapper">
        <label class="label" id="label" for="input-week">{{labelText}}</label>
        <span data-pds-slot="label-after"><ng-content select="[slot=label-after]"></ng-content></span>
      </div>
      <span class="label" id="description">{{descriptionText}}</span>
      <div class="wrapper">
        <span data-pds-slot="start"><ng-content select="[slot=start]"></ng-content></span>
        <input type="week" id="input-week" dir="auto"  [value]="inputValue" [placeholder]="placeholderText" [disabled]="isDisabled" [readOnly]="isReadOnly" [maxLength]="maxLengthValue" />
        <p-button-pure
          class="button"
          type="button"
          icon="calendar"
          hideLabel="true"
        >
          Open date picker
        </p-button-pure>
        <span data-pds-slot="end"><ng-content select="[slot=end]"></ng-content></span>
        <p-spinner aria-hidden="true"></p-spinner>
      </div>
      <span class="message" id="message"
        ><p-icon
          aria-hidden="true"
          [name]="iconName"
          [color]="iconColor"
        ></p-icon>
        {{messageText}}</span
      >
      <span class="loading" id="loading" role="status">{{loadingText}}</span>
    </div>
  
    </div>
  `,styles:[`.p-input-week :where([data-pds-slot]){display:contents}

      .p-input-week {
        display: contents;
      }
      .p-input-week {
        display: block;
        --_p-input-base-a: var(--p-it-scale, 1);
        --ref-p-input-slotted-padding: calc(
          11.2px * (var(--_p-input-base-a) - 0.64285714)
        ) !important;
        --ref-p-input-slotted-margin: calc(
          -1 * calc(11.2px * (var(--_p-input-base-a) - 0.64285714))
        ) !important;
      }
      .p-input-week[hidden] {
        display: none !important;
      }
      .p-input-week:dir(rtl) input::placeholder {
        direction: rtl;
        text-align: end;
      }
      .p-input-week [data-pds-slot="label-after"]{
        display: inline-block;
        vertical-align: top;
      }
      .p-input-week [data-pds-slot="label-after"] > *{
        margin-inline-start: var(--p-spacing-static-xs) !important;
      }
      .p-input-week .label-after{
        display: inline-block;
        vertical-align: top;
      }
      .p-input-week input{
        all: unset;
        display: flex;
        flex: 1;
        align-items: center;
        width: max(100%, 2ch);
        height: 100%;
        font: var(--p-it-font);
        text-overflow: ellipsis;
      }
      .p-input-week input::-webkit-calendar-picker-indicator{
        display: none;
      }
      .p-input-week .root{
        display: grid;
        gap: var(--p-spacing-static-xs);
      }
      .p-input-week .wrapper{
        display: flex;
        align-items: center;
        gap: calc(22.4px * (var(--_p-input-base-a) - 0.64285714) + 4px);
        height: calc(var(--_p-input-base-a) * 3.5rem);
        box-sizing: border-box;
        padding-inline: calc(
          22.4px * (var(--_p-input-base-a) - 0.64285714) + 8px
        );
        border: 1px solid var(--p-it-border);
        border-radius: var(--p-it-radius, var(--p-radius-xl));
        background: var(--p-it-bg);
        color: var(--p-it-color);
        cursor: var(--p-it-cursor, text);
        opacity: var(--p-it-wrap-op);
        transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          border-color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
      }
      .p-input-week .wrapper > *{
        opacity: var(--p-it-child-op);
      }
      .p-input-week .wrapper:not(:has(input:disabled)):focus-within{
        border-color: var(--p-it-hover);
      }
      .p-input-week .label-wrapper{
        min-width: var(--p-it-lw-minw);
        position: var(--p-it-lw-pos, static);
        width: var(--p-it-lw-w, auto);
        height: var(--p-it-lw-h, auto);
        padding: var(--p-it-lw-pad, 0);
        margin: var(--p-it-lw-m, 0);
        overflow: var(--p-it-lw-ov, visible);
        clip: var(--p-it-lw-clip, auto);
        white-space: var(--p-it-lw-ws, normal);
      }
      .p-input-week .label{
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        cursor: var(--p-it-label-cursor, pointer);
        color: var(--p-color-primary);
        pointer-events: var(--p-it-pe);
        opacity: var(--p-it-opacity);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
        display: inline;
      }
      .p-input-week .label:empty{
        display: none;
      }
      .p-input-week .label:is(span){
        cursor: unset;
        font-size: var(--p-typescale-xs);
        color: var(--p-color-contrast-high);
        min-width: unset;
        position: var(--p-it-desc-pos, static);
        width: var(--p-it-desc-w, auto);
        height: var(--p-it-desc-h, auto);
        padding: var(--p-it-desc-pad, 0);
        margin: var(--p-it-desc-m, 0);
        overflow: var(--p-it-desc-ov, visible);
        clip: var(--p-it-desc-clip, auto);
        white-space: var(--p-it-desc-ws, normal);
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
      .p-input-week .label > [data-pds-slot="label"] > *{
        display: inline !important;
      }
      .p-input-week .required{
        user-select: none;
      }
      .p-input-week .message{
        display: flex;
        gap: var(--p-spacing-static-xs);
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-it-msg, inherit);
        opacity: var(--p-it-msg-op);
        position: var(--p-it-msg-pos);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
      }
      .p-input-week .message:empty{
        opacity: 0;
        position: absolute;
      }
      .p-input-week .message .p-icon{
        display: var(--p-it-icon-display, none);
      }
      .p-input-week .p-spinner{
        display: var(--p-it-spinner-display, none);
      }
      .p-input-week .button{
        padding: var(--ref-p-input-slotted-padding);
        margin: var(--ref-p-input-slotted-margin);
      }
      .p-input-week .loading{
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
        .p-input-week .wrapper:not(:has(input:disabled)):focus-within{
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
        .p-input-week[disabled] .wrapper {
          opacity: 1;
          color: GrayText;
          border-color: GrayText;
        }
        .p-input-week[disabled] .wrapper > * {
          opacity: 1;
          color: GrayText;
        }
        .p-input-week[disabled] .label {
          opacity: 1;
          color: GrayText;
        }
      }
      @media (hover: hover) {
        .p-input-week:not([disabled]):not([read-only]):not([loading])
          .wrapper:hover:not(.button:hover),
        .p-input-week:not([disabled]):not([read-only]):not([loading])
          .label-wrapper:hover
          ~ .wrapper {
          border-color: var(--p-it-hover);
        }
      }
      @media (min-width: 480px) {
        .p-input-week .label-wrapper{
          min-width: var(--p-it-lw-xs-minw, var(--p-it-lw-minw));
          position: var(--p-it-lw-xs-pos, var(--p-it-lw-pos, static));
          width: var(--p-it-lw-xs-w, var(--p-it-lw-w, auto));
          height: var(--p-it-lw-xs-h, var(--p-it-lw-h, auto));
          padding: var(--p-it-lw-xs-pad, var(--p-it-lw-pad, 0));
          margin: var(--p-it-lw-xs-m, var(--p-it-lw-m, 0));
          overflow: var(--p-it-lw-xs-ov, var(--p-it-lw-ov, visible));
          clip: var(--p-it-lw-xs-clip, var(--p-it-lw-clip, auto));
          white-space: var(--p-it-lw-xs-ws, var(--p-it-lw-ws, normal));
        }
        .p-input-week .label:is(span){
          position: var(--p-it-desc-xs-pos, var(--p-it-desc-pos, static));
          width: var(--p-it-desc-xs-w, var(--p-it-desc-w, auto));
          height: var(--p-it-desc-xs-h, var(--p-it-desc-h, auto));
          padding: var(--p-it-desc-xs-pad, var(--p-it-desc-pad, 0));
          margin: var(--p-it-desc-xs-m, var(--p-it-desc-m, 0));
          overflow: var(--p-it-desc-xs-ov, var(--p-it-desc-ov, visible));
          clip: var(--p-it-desc-xs-clip, var(--p-it-desc-clip, auto));
          white-space: var(--p-it-desc-xs-ws, var(--p-it-desc-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 760px) {
        .p-input-week .label-wrapper{
          min-width: var(
            --p-it-lw-s-minw,
            var(--p-it-lw-xs-minw, var(--p-it-lw-minw))
          );
          position: var(
            --p-it-lw-s-pos,
            var(--p-it-lw-xs-pos, var(--p-it-lw-pos, static))
          );
          width: var(
            --p-it-lw-s-w,
            var(--p-it-lw-xs-w, var(--p-it-lw-w, auto))
          );
          height: var(
            --p-it-lw-s-h,
            var(--p-it-lw-xs-h, var(--p-it-lw-h, auto))
          );
          padding: var(
            --p-it-lw-s-pad,
            var(--p-it-lw-xs-pad, var(--p-it-lw-pad, 0))
          );
          margin: var(--p-it-lw-s-m, var(--p-it-lw-xs-m, var(--p-it-lw-m, 0)));
          overflow: var(
            --p-it-lw-s-ov,
            var(--p-it-lw-xs-ov, var(--p-it-lw-ov, visible))
          );
          clip: var(
            --p-it-lw-s-clip,
            var(--p-it-lw-xs-clip, var(--p-it-lw-clip, auto))
          );
          white-space: var(
            --p-it-lw-s-ws,
            var(--p-it-lw-xs-ws, var(--p-it-lw-ws, normal))
          );
        }
        .p-input-week .label:is(span){
          position: var(
            --p-it-desc-s-pos,
            var(--p-it-desc-xs-pos, var(--p-it-desc-pos, static))
          );
          width: var(
            --p-it-desc-s-w,
            var(--p-it-desc-xs-w, var(--p-it-desc-w, auto))
          );
          height: var(
            --p-it-desc-s-h,
            var(--p-it-desc-xs-h, var(--p-it-desc-h, auto))
          );
          padding: var(
            --p-it-desc-s-pad,
            var(--p-it-desc-xs-pad, var(--p-it-desc-pad, 0))
          );
          margin: var(
            --p-it-desc-s-m,
            var(--p-it-desc-xs-m, var(--p-it-desc-m, 0))
          );
          overflow: var(
            --p-it-desc-s-ov,
            var(--p-it-desc-xs-ov, var(--p-it-desc-ov, visible))
          );
          clip: var(
            --p-it-desc-s-clip,
            var(--p-it-desc-xs-clip, var(--p-it-desc-clip, auto))
          );
          white-space: var(
            --p-it-desc-s-ws,
            var(--p-it-desc-xs-ws, var(--p-it-desc-ws, normal))
          );
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1000px) {
        .p-input-week .label-wrapper{
          min-width: var(--p-it-lw-m-minw, var(--p-it-lw-s-minw));
          position: var(--p-it-lw-m-pos, var(--p-it-lw-s-pos, static));
          width: var(--p-it-lw-m-w, var(--p-it-lw-s-w, auto));
          height: var(--p-it-lw-m-h, var(--p-it-lw-s-h, auto));
          padding: var(--p-it-lw-m-pad, var(--p-it-lw-s-pad, 0));
          margin: var(--p-it-lw-m-m, var(--p-it-lw-s-m, 0));
          overflow: var(--p-it-lw-m-ov, var(--p-it-lw-s-ov, visible));
          clip: var(--p-it-lw-m-clip, var(--p-it-lw-s-clip, auto));
          white-space: var(--p-it-lw-m-ws, var(--p-it-lw-s-ws, normal));
        }
        .p-input-week .label:is(span){
          position: var(--p-it-desc-m-pos, var(--p-it-desc-s-pos, static));
          width: var(--p-it-desc-m-w, var(--p-it-desc-s-w, auto));
          height: var(--p-it-desc-m-h, var(--p-it-desc-s-h, auto));
          padding: var(--p-it-desc-m-pad, var(--p-it-desc-s-pad, 0));
          margin: var(--p-it-desc-m-m, var(--p-it-desc-s-m, 0));
          overflow: var(--p-it-desc-m-ov, var(--p-it-desc-s-ov, visible));
          clip: var(--p-it-desc-m-clip, var(--p-it-desc-s-clip, auto));
          white-space: var(--p-it-desc-m-ws, var(--p-it-desc-s-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1300px) {
        .p-input-week .label-wrapper{
          min-width: var(--p-it-lw-l-minw, var(--p-it-lw-m-minw));
          position: var(--p-it-lw-l-pos, var(--p-it-lw-m-pos, static));
          width: var(--p-it-lw-l-w, var(--p-it-lw-m-w, auto));
          height: var(--p-it-lw-l-h, var(--p-it-lw-m-h, auto));
          padding: var(--p-it-lw-l-pad, var(--p-it-lw-m-pad, 0));
          margin: var(--p-it-lw-l-m, var(--p-it-lw-m-m, 0));
          overflow: var(--p-it-lw-l-ov, var(--p-it-lw-m-ov, visible));
          clip: var(--p-it-lw-l-clip, var(--p-it-lw-m-clip, auto));
          white-space: var(--p-it-lw-l-ws, var(--p-it-lw-m-ws, normal));
        }
        .p-input-week .label:is(span){
          position: var(--p-it-desc-l-pos, var(--p-it-desc-m-pos, static));
          width: var(--p-it-desc-l-w, var(--p-it-desc-m-w, auto));
          height: var(--p-it-desc-l-h, var(--p-it-desc-m-h, auto));
          padding: var(--p-it-desc-l-pad, var(--p-it-desc-m-pad, 0));
          margin: var(--p-it-desc-l-m, var(--p-it-desc-m-m, 0));
          overflow: var(--p-it-desc-l-ov, var(--p-it-desc-m-ov, visible));
          clip: var(--p-it-desc-l-clip, var(--p-it-desc-m-clip, auto));
          white-space: var(--p-it-desc-l-ws, var(--p-it-desc-m-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1760px) {
        .p-input-week .label-wrapper{
          min-width: var(--p-it-lw-xl-minw, var(--p-it-lw-l-minw));
          position: var(--p-it-lw-xl-pos, var(--p-it-lw-l-pos, static));
          width: var(--p-it-lw-xl-w, var(--p-it-lw-l-w, auto));
          height: var(--p-it-lw-xl-h, var(--p-it-lw-l-h, auto));
          padding: var(--p-it-lw-xl-pad, var(--p-it-lw-l-pad, 0));
          margin: var(--p-it-lw-xl-m, var(--p-it-lw-l-m, 0));
          overflow: var(--p-it-lw-xl-ov, var(--p-it-lw-l-ov, visible));
          clip: var(--p-it-lw-xl-clip, var(--p-it-lw-l-clip, auto));
          white-space: var(--p-it-lw-xl-ws, var(--p-it-lw-l-ws, normal));
        }
        .p-input-week .label:is(span){
          position: var(--p-it-desc-xl-pos, var(--p-it-desc-l-pos, static));
          width: var(--p-it-desc-xl-w, var(--p-it-desc-l-w, auto));
          height: var(--p-it-desc-xl-h, var(--p-it-desc-l-h, auto));
          padding: var(--p-it-desc-xl-pad, var(--p-it-desc-l-pad, 0));
          margin: var(--p-it-desc-xl-m, var(--p-it-desc-l-m, 0));
          overflow: var(--p-it-desc-xl-ov, var(--p-it-desc-l-ov, visible));
          clip: var(--p-it-desc-xl-clip, var(--p-it-desc-l-clip, auto));
          white-space: var(--p-it-desc-xl-ws, var(--p-it-desc-l-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1920px) {
        .p-input-week .label-wrapper{
          min-width: var(--p-it-lw-xxl-minw, var(--p-it-lw-xl-minw));
          position: var(--p-it-lw-xxl-pos, var(--p-it-lw-xl-pos, static));
          width: var(--p-it-lw-xxl-w, var(--p-it-lw-xl-w, auto));
          height: var(--p-it-lw-xxl-h, var(--p-it-lw-xl-h, auto));
          padding: var(--p-it-lw-xxl-pad, var(--p-it-lw-xl-pad, 0));
          margin: var(--p-it-lw-xxl-m, var(--p-it-lw-xl-m, 0));
          overflow: var(--p-it-lw-xxl-ov, var(--p-it-lw-xl-ov, visible));
          clip: var(--p-it-lw-xxl-clip, var(--p-it-lw-xl-clip, auto));
          white-space: var(--p-it-lw-xxl-ws, var(--p-it-lw-xl-ws, normal));
        }
        .p-input-week .label:is(span){
          position: var(--p-it-desc-xxl-pos, var(--p-it-desc-xl-pos, static));
          width: var(--p-it-desc-xxl-w, var(--p-it-desc-xl-w, auto));
          height: var(--p-it-desc-xxl-h, var(--p-it-desc-xl-h, auto));
          padding: var(--p-it-desc-xxl-pad, var(--p-it-desc-xl-pad, 0));
          margin: var(--p-it-desc-xxl-m, var(--p-it-desc-xl-m, 0));
          overflow: var(--p-it-desc-xxl-ov, var(--p-it-desc-xl-ov, visible));
          clip: var(--p-it-desc-xxl-clip, var(--p-it-desc-xl-clip, auto));
          white-space: var(--p-it-desc-xxl-ws, var(--p-it-desc-xl-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }`]})],e);export{e as default};
