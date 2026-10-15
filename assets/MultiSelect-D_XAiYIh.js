import{a as g}from"./host-DRskmCSE.js";import b from"./Icon-DzSCh0v5.js";import{I as i,C as f,V as y,a as $}from"./angular-aNJmk6GY.js";import"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var _=Object.defineProperty,T=Object.getOwnPropertyDescriptor,o=(s,e,t,p)=>{for(var a=p>1?void 0:p?T(e,t):e,r=s.length-1,m;r>=0;r--)(m=s[r])&&(a=(p?m(e,t,a):m(a))||a);return p&&a&&_(e,t,a),a};const u=["base","xs","s","m","l","xl","xxl"],S=(s,e)=>{if(s==null)return e;if(s==="")return!0;if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return e}return s},n=s=>s===!0||s==="true"||s==="",x=(s,e,t)=>s&&typeof s=="object"?s[e]===void 0?t:s[e]:s,h=(s,e,t)=>{const p=e==="base"?"--p-ms-lw":`--p-ms-lw-${e}`,a=e==="base"?"--p-ms-desc":`--p-ms-desc-${e}`;if(t){s[`${p}-pos`]="absolute",s[`${p}-w`]="1px",s[`${p}-h`]="1px",s[`${p}-pad`]="0",s[`${p}-m`]="-1px",s[`${p}-ov`]="hidden",s[`${p}-clip`]="rect(0, 0, 0, 0)",s[`${p}-ws`]="nowrap",s[`${p}-minw`]="",s[`${a}-pos`]="absolute",s[`${a}-w`]="1px",s[`${a}-h`]="1px",s[`${a}-pad`]="0",s[`${a}-m`]="-1px",s[`${a}-ov`]="hidden",s[`${a}-clip`]="rect(0, 0, 0, 0)",s[`${a}-ws`]="nowrap";return}s[`${p}-pos`]="static",s[`${p}-w`]="auto",s[`${p}-h`]="auto",s[`${p}-pad`]="0",s[`${p}-m`]="0",s[`${p}-ov`]="visible",s[`${p}-clip`]="auto",s[`${p}-ws`]="normal",s[`${p}-minw`]="fit-content",s[`${a}-pos`]="static",s[`${a}-w`]="auto",s[`${a}-h`]="auto",s[`${a}-pad`]="0",s[`${a}-m`]="0",s[`${a}-ov`]="visible",s[`${a}-clip`]="auto",s[`${a}-ws`]="normal"};let l=class{constructor(){this.hostAttr=g}get hostStyle(){const s=n(this.disabled),e=n(this.compact),t=this.state==="success"||this.state==="error"?this.state:"none",a=!!(this.message||"")&&(t==="success"||t==="error"),r=S(this.hideLabel,!1),m={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},v=m[t]||m.none,w={"--p-ms-scale":e?"0.64285714":"1","--p-ms-radius":e?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-ms-bg":v.bg,"--p-ms-border":v.border,"--p-ms-hover":v.hover,"--p-ms-btn-cursor":s?"not-allowed":"pointer","--p-ms-btn-op":s?"0.4":"","--p-ms-btn-fc-op":s?"1":"","--p-ms-btn-fc-color":s?"GrayText":"","--p-ms-cursor":s?"not-allowed":"pointer","--p-ms-pe":s?"none":"","--p-ms-opacity":s?"0.4":"","--p-ms-fc-opacity":s?"1":"","--p-ms-fc-color":s?"GrayText":"","--p-ms-msg":v.message||"","--p-ms-msg-op":a?"":"0","--p-ms-msg-pos":a?"":"absolute","--p-ms-icon-display":a?"inline-flex":"none"};if(typeof r=="object"&&r!==null){let d=n(x(r,"base",!1));for(const c of u)r[c]!==void 0&&(d=n(x(r,c,!1))),h(w,c,d)}else{const d=n(r);for(const c of u)h(w,c,d)}return w}get labelText(){return this.label||""}get descriptionText(){return this.description||""}get messageText(){const s=this.state||"none",e=this.message||"";return!e||s!=="success"&&s!=="error"?"":e}get iconName(){const s=this.state||"none";return!(this.message||"")||s!=="success"&&s!=="error"?"":s==="error"?"exclamation":"check"}get iconColor(){const s=this.state||"none";return s==="error"?"error":s==="success"?"success":""}get isDisabled(){return this.disabled===!0||this.disabled==="true"||this.disabled===""}get isRequired(){return this.required===!0||this.required==="true"||this.required===""}get ariaInvalid(){return this.state==="error"?"true":""}get messageRole(){return this.state==="success"?"status":"alert"}get selectedText(){return""}};o([i()],l.prototype,"disabled",2);o([i()],l.prototype,"compact",2);o([i()],l.prototype,"state",2);o([i()],l.prototype,"message",2);o([i()],l.prototype,"hideLabel",2);o([i()],l.prototype,"label",2);o([i()],l.prototype,"description",2);o([i()],l.prototype,"required",2);l=o([f({selector:"p-multi-select",standalone:!0,imports:[$,b],encapsulation:y.None,template:`
    <div class="p-multi-select" data-pds="multi-select" [style]="hostStyle" [attr.disabled]="hostAttr(disabled) ?? null">
    <div class="root">
      <div class="label-wrapper">
        <label class="label" id="label" for="button"
          >{{labelText}} <span data-pds-slot="label"><ng-content select="[slot=label]"></ng-content></span></label>
        <span data-pds-slot="label-after"><ng-content select="[slot=label-after]"></ng-content></span>
      </div>
      <span class="label" id="description"
        >{{descriptionText}} <span data-pds-slot="description"><ng-content select="[slot=description]"></ng-content></span></span>
      <button type="button" role="combobox" id="button">
        <span>{{selectedText}}</span>
        <p-icon name="arrow-head-down" color="primary"></p-icon>
      </button>
      <div>
        <div class="options" id="listbox"><span data-pds-slot=""><ng-content></ng-content></span></div>
      </div>
      <span class="message" id="message"
        ><p-icon></p-icon> {{messageText}}</span
      >
    </div>
  
    </div>
  `,styles:[`.p-multi-select :where([data-pds-slot]){display:contents}

      .p-multi-select {
        display: contents;
      }
      @keyframes fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .p-multi-select {
        display: block;
        --_p-multi-select-a: var(--p-ms-scale, 1) !important;
        --_p-multi-select-option-a: var(--p-ms-scale, 1) !important;
        --_p-optgroup-a: var(--p-ms-scale, 1) !important;
      }
      .p-multi-select[hidden] {
        display: none !important;
      }
      .p-multi-select [data-pds-slot="label-after"]{
        display: inline-block;
        vertical-align: top;
      }
      .p-multi-select [data-pds-slot="label-after"] > *{
        margin-inline-start: var(--p-spacing-static-xs) !important;
      }
      .p-multi-select .label-after{
        display: inline-block;
        vertical-align: top;
      }
      .p-multi-select button{
        all: unset;
        display: flex;
        align-items: center;
        gap: calc(22.4px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
        height: calc(var(--_p-multi-select-a) * 3.5rem);
        box-sizing: border-box;
        min-width: 0;
        padding-inline: calc(
          22.4px * (var(--_p-multi-select-a) - 0.64285714) + 8px
        );
        border: 1px solid var(--p-multi-select-border-color, var(--p-ms-border));
        border-radius: var(--p-ms-radius, var(--p-radius-xl));
        background: var(--p-multi-select-background-color, var(--p-ms-bg));
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-multi-select-text-color, var(--p-color-primary));
        cursor: var(--p-ms-btn-cursor, pointer);
        opacity: var(--p-ms-btn-op);
        transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          border-color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
      }
      .p-multi-select:not([disabled]) button:focus-visible {
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-multi-select button span{
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .p-multi-select [popover]{
        all: unset;
        position: absolute;
        z-index: 99;
        padding: calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
        display: none;
        flex-direction: column;
        gap: calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
        max-height: max(calc(242px), calc(50vh - 54px / 2 - 6px * 2));
        box-sizing: border-box;
        overflow: hidden auto;
        scrollbar-width: thin;
        scrollbar-color: auto;
        animation: var(--p-animation-duration, var(--p-duration-sm)) fade-in
          var(--p-ease-in-out) forwards;
        filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.15));
        background: var(--p-color-canvas);
        border: 1px solid var(--p-color-contrast-low);
        border-radius: var(--p-radius-xl);
      }
      .p-multi-select [popover]:not(:popover-open){
        display: none;
      }
      .p-multi-select [data-pds-slot="selected"]{
        display: block;
        height: 100%;
        flex-grow: 1;
        overflow: hidden;
      }
      .p-multi-select .root{
        display: grid;
        gap: var(--p-spacing-static-xs);
        min-width: calc(
          1rem + var(--p-spacing-static-md) + 1px * 2 +
            calc(
              9px + var(--p-spacing-static-md) / 2 +
                (var(--p-leading-normal) + var(--p-spacing-static-xs) * 2) * 2
            )
        );
      }
      .p-multi-select .options{
        display: flex;
        flex-direction: column;
        gap: calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
      }
      .p-multi-select .icon{
        margin-inline-end: -3px;
        pointer-events: none;
        transform: rotate3d(0, 0, 1, 0.0001deg);
        transition: transform var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
      }
      .p-multi-select .sr-only{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }
      .p-multi-select .label-wrapper{
        min-width: var(--p-ms-lw-minw);
        position: var(--p-ms-lw-pos, static);
        width: var(--p-ms-lw-w, auto);
        height: var(--p-ms-lw-h, auto);
        padding: var(--p-ms-lw-pad, 0);
        margin: var(--p-ms-lw-m, 0);
        overflow: var(--p-ms-lw-ov, visible);
        clip: var(--p-ms-lw-clip, auto);
        white-space: var(--p-ms-lw-ws, normal);
      }
      .p-multi-select .label{
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        cursor: var(--p-ms-cursor, pointer);
        color: var(--p-color-primary);
        pointer-events: var(--p-ms-pe);
        opacity: var(--p-ms-opacity);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
        display: inline;
      }
      .p-multi-select .label:empty{
        display: none;
      }
      .p-multi-select .label:is(span){
        cursor: unset;
        font-size: var(--p-typescale-xs);
        color: var(--p-color-contrast-high);
        min-width: unset;
        position: var(--p-ms-desc-pos, static);
        width: var(--p-ms-desc-w, auto);
        height: var(--p-ms-desc-h, auto);
        padding: var(--p-ms-desc-pad, 0);
        margin: var(--p-ms-desc-m, 0);
        overflow: var(--p-ms-desc-ov, visible);
        clip: var(--p-ms-desc-clip, auto);
        white-space: var(--p-ms-desc-ws, normal);
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
      .p-multi-select .label > [data-pds-slot="label"] > *{
        display: inline !important;
      }
      .p-multi-select .required{
        user-select: none;
      }
      .p-multi-select .message{
        display: flex;
        gap: var(--p-spacing-static-xs);
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-ms-msg, inherit);
        opacity: var(--p-ms-msg-op);
        position: var(--p-ms-msg-pos);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
      }
      .p-multi-select .message:empty{
        opacity: 0;
        position: absolute;
      }
      .p-multi-select .message .p-icon{
        display: var(--p-ms-icon-display, none);
      }
      @media (forced-colors: active) {
        .p-multi-select button{
          opacity: var(--p-ms-btn-fc-op, var(--p-ms-btn-op, 1));
          color: var(
            --p-ms-btn-fc-color,
            var(--p-multi-select-text-color, var(--p-color-primary))
          );
        }
        .p-multi-select .label{
          opacity: var(--p-ms-fc-opacity, var(--p-ms-opacity, 1));
          color: var(--p-ms-fc-color, var(--p-color-primary));
        }
        .p-multi-select:not([disabled]) button:focus-visible {
          outline-color: Highlight;
        }
      }
      @media (hover: hover) {
        .p-multi-select:not([disabled]) button:hover,
        .p-multi-select:not([disabled]) label:hover ~ button {
          border-color: var(--p-multi-select-border-color, var(--p-ms-hover));
        }
      }
      @media (min-width: 480px) {
        .p-multi-select .label-wrapper{
          min-width: var(--p-ms-lw-xs-minw, var(--p-ms-lw-minw));
          position: var(--p-ms-lw-xs-pos, var(--p-ms-lw-pos, static));
          width: var(--p-ms-lw-xs-w, var(--p-ms-lw-w, auto));
          height: var(--p-ms-lw-xs-h, var(--p-ms-lw-h, auto));
          padding: var(--p-ms-lw-xs-pad, var(--p-ms-lw-pad, 0));
          margin: var(--p-ms-lw-xs-m, var(--p-ms-lw-m, 0));
          overflow: var(--p-ms-lw-xs-ov, var(--p-ms-lw-ov, visible));
          clip: var(--p-ms-lw-xs-clip, var(--p-ms-lw-clip, auto));
          white-space: var(--p-ms-lw-xs-ws, var(--p-ms-lw-ws, normal));
        }
        .p-multi-select .label:is(span){
          position: var(--p-ms-desc-xs-pos, var(--p-ms-desc-pos, static));
          width: var(--p-ms-desc-xs-w, var(--p-ms-desc-w, auto));
          height: var(--p-ms-desc-xs-h, var(--p-ms-desc-h, auto));
          padding: var(--p-ms-desc-xs-pad, var(--p-ms-desc-pad, 0));
          margin: var(--p-ms-desc-xs-m, var(--p-ms-desc-m, 0));
          overflow: var(--p-ms-desc-xs-ov, var(--p-ms-desc-ov, visible));
          clip: var(--p-ms-desc-xs-clip, var(--p-ms-desc-clip, auto));
          white-space: var(--p-ms-desc-xs-ws, var(--p-ms-desc-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 760px) {
        .p-multi-select .label-wrapper{
          min-width: var(
            --p-ms-lw-s-minw,
            var(--p-ms-lw-xs-minw, var(--p-ms-lw-minw))
          );
          position: var(
            --p-ms-lw-s-pos,
            var(--p-ms-lw-xs-pos, var(--p-ms-lw-pos, static))
          );
          width: var(
            --p-ms-lw-s-w,
            var(--p-ms-lw-xs-w, var(--p-ms-lw-w, auto))
          );
          height: var(
            --p-ms-lw-s-h,
            var(--p-ms-lw-xs-h, var(--p-ms-lw-h, auto))
          );
          padding: var(
            --p-ms-lw-s-pad,
            var(--p-ms-lw-xs-pad, var(--p-ms-lw-pad, 0))
          );
          margin: var(--p-ms-lw-s-m, var(--p-ms-lw-xs-m, var(--p-ms-lw-m, 0)));
          overflow: var(
            --p-ms-lw-s-ov,
            var(--p-ms-lw-xs-ov, var(--p-ms-lw-ov, visible))
          );
          clip: var(
            --p-ms-lw-s-clip,
            var(--p-ms-lw-xs-clip, var(--p-ms-lw-clip, auto))
          );
          white-space: var(
            --p-ms-lw-s-ws,
            var(--p-ms-lw-xs-ws, var(--p-ms-lw-ws, normal))
          );
        }
        .p-multi-select .label:is(span){
          position: var(
            --p-ms-desc-s-pos,
            var(--p-ms-desc-xs-pos, var(--p-ms-desc-pos, static))
          );
          width: var(
            --p-ms-desc-s-w,
            var(--p-ms-desc-xs-w, var(--p-ms-desc-w, auto))
          );
          height: var(
            --p-ms-desc-s-h,
            var(--p-ms-desc-xs-h, var(--p-ms-desc-h, auto))
          );
          padding: var(
            --p-ms-desc-s-pad,
            var(--p-ms-desc-xs-pad, var(--p-ms-desc-pad, 0))
          );
          margin: var(
            --p-ms-desc-s-m,
            var(--p-ms-desc-xs-m, var(--p-ms-desc-m, 0))
          );
          overflow: var(
            --p-ms-desc-s-ov,
            var(--p-ms-desc-xs-ov, var(--p-ms-desc-ov, visible))
          );
          clip: var(
            --p-ms-desc-s-clip,
            var(--p-ms-desc-xs-clip, var(--p-ms-desc-clip, auto))
          );
          white-space: var(
            --p-ms-desc-s-ws,
            var(--p-ms-desc-xs-ws, var(--p-ms-desc-ws, normal))
          );
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1000px) {
        .p-multi-select .label-wrapper{
          min-width: var(--p-ms-lw-m-minw, var(--p-ms-lw-s-minw));
          position: var(--p-ms-lw-m-pos, var(--p-ms-lw-s-pos, static));
          width: var(--p-ms-lw-m-w, var(--p-ms-lw-s-w, auto));
          height: var(--p-ms-lw-m-h, var(--p-ms-lw-s-h, auto));
          padding: var(--p-ms-lw-m-pad, var(--p-ms-lw-s-pad, 0));
          margin: var(--p-ms-lw-m-m, var(--p-ms-lw-s-m, 0));
          overflow: var(--p-ms-lw-m-ov, var(--p-ms-lw-s-ov, visible));
          clip: var(--p-ms-lw-m-clip, var(--p-ms-lw-s-clip, auto));
          white-space: var(--p-ms-lw-m-ws, var(--p-ms-lw-s-ws, normal));
        }
        .p-multi-select .label:is(span){
          position: var(--p-ms-desc-m-pos, var(--p-ms-desc-s-pos, static));
          width: var(--p-ms-desc-m-w, var(--p-ms-desc-s-w, auto));
          height: var(--p-ms-desc-m-h, var(--p-ms-desc-s-h, auto));
          padding: var(--p-ms-desc-m-pad, var(--p-ms-desc-s-pad, 0));
          margin: var(--p-ms-desc-m-m, var(--p-ms-desc-s-m, 0));
          overflow: var(--p-ms-desc-m-ov, var(--p-ms-desc-s-ov, visible));
          clip: var(--p-ms-desc-m-clip, var(--p-ms-desc-s-clip, auto));
          white-space: var(--p-ms-desc-m-ws, var(--p-ms-desc-s-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1300px) {
        .p-multi-select .label-wrapper{
          min-width: var(--p-ms-lw-l-minw, var(--p-ms-lw-m-minw));
          position: var(--p-ms-lw-l-pos, var(--p-ms-lw-m-pos, static));
          width: var(--p-ms-lw-l-w, var(--p-ms-lw-m-w, auto));
          height: var(--p-ms-lw-l-h, var(--p-ms-lw-m-h, auto));
          padding: var(--p-ms-lw-l-pad, var(--p-ms-lw-m-pad, 0));
          margin: var(--p-ms-lw-l-m, var(--p-ms-lw-m-m, 0));
          overflow: var(--p-ms-lw-l-ov, var(--p-ms-lw-m-ov, visible));
          clip: var(--p-ms-lw-l-clip, var(--p-ms-lw-m-clip, auto));
          white-space: var(--p-ms-lw-l-ws, var(--p-ms-lw-m-ws, normal));
        }
        .p-multi-select .label:is(span){
          position: var(--p-ms-desc-l-pos, var(--p-ms-desc-m-pos, static));
          width: var(--p-ms-desc-l-w, var(--p-ms-desc-m-w, auto));
          height: var(--p-ms-desc-l-h, var(--p-ms-desc-m-h, auto));
          padding: var(--p-ms-desc-l-pad, var(--p-ms-desc-m-pad, 0));
          margin: var(--p-ms-desc-l-m, var(--p-ms-desc-m-m, 0));
          overflow: var(--p-ms-desc-l-ov, var(--p-ms-desc-m-ov, visible));
          clip: var(--p-ms-desc-l-clip, var(--p-ms-desc-m-clip, auto));
          white-space: var(--p-ms-desc-l-ws, var(--p-ms-desc-m-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1760px) {
        .p-multi-select .label-wrapper{
          min-width: var(--p-ms-lw-xl-minw, var(--p-ms-lw-l-minw));
          position: var(--p-ms-lw-xl-pos, var(--p-ms-lw-l-pos, static));
          width: var(--p-ms-lw-xl-w, var(--p-ms-lw-l-w, auto));
          height: var(--p-ms-lw-xl-h, var(--p-ms-lw-l-h, auto));
          padding: var(--p-ms-lw-xl-pad, var(--p-ms-lw-l-pad, 0));
          margin: var(--p-ms-lw-xl-m, var(--p-ms-lw-l-m, 0));
          overflow: var(--p-ms-lw-xl-ov, var(--p-ms-lw-l-ov, visible));
          clip: var(--p-ms-lw-xl-clip, var(--p-ms-lw-l-clip, auto));
          white-space: var(--p-ms-lw-xl-ws, var(--p-ms-lw-l-ws, normal));
        }
        .p-multi-select .label:is(span){
          position: var(--p-ms-desc-xl-pos, var(--p-ms-desc-l-pos, static));
          width: var(--p-ms-desc-xl-w, var(--p-ms-desc-l-w, auto));
          height: var(--p-ms-desc-xl-h, var(--p-ms-desc-l-h, auto));
          padding: var(--p-ms-desc-xl-pad, var(--p-ms-desc-l-pad, 0));
          margin: var(--p-ms-desc-xl-m, var(--p-ms-desc-l-m, 0));
          overflow: var(--p-ms-desc-xl-ov, var(--p-ms-desc-l-ov, visible));
          clip: var(--p-ms-desc-xl-clip, var(--p-ms-desc-l-clip, auto));
          white-space: var(--p-ms-desc-xl-ws, var(--p-ms-desc-l-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1920px) {
        .p-multi-select .label-wrapper{
          min-width: var(--p-ms-lw-xxl-minw, var(--p-ms-lw-xl-minw));
          position: var(--p-ms-lw-xxl-pos, var(--p-ms-lw-xl-pos, static));
          width: var(--p-ms-lw-xxl-w, var(--p-ms-lw-xl-w, auto));
          height: var(--p-ms-lw-xxl-h, var(--p-ms-lw-xl-h, auto));
          padding: var(--p-ms-lw-xxl-pad, var(--p-ms-lw-xl-pad, 0));
          margin: var(--p-ms-lw-xxl-m, var(--p-ms-lw-xl-m, 0));
          overflow: var(--p-ms-lw-xxl-ov, var(--p-ms-lw-xl-ov, visible));
          clip: var(--p-ms-lw-xxl-clip, var(--p-ms-lw-xl-clip, auto));
          white-space: var(--p-ms-lw-xxl-ws, var(--p-ms-lw-xl-ws, normal));
        }
        .p-multi-select .label:is(span){
          position: var(--p-ms-desc-xxl-pos, var(--p-ms-desc-xl-pos, static));
          width: var(--p-ms-desc-xxl-w, var(--p-ms-desc-xl-w, auto));
          height: var(--p-ms-desc-xxl-h, var(--p-ms-desc-xl-h, auto));
          padding: var(--p-ms-desc-xxl-pad, var(--p-ms-desc-xl-pad, 0));
          margin: var(--p-ms-desc-xxl-m, var(--p-ms-desc-xl-m, 0));
          overflow: var(--p-ms-desc-xxl-ov, var(--p-ms-desc-xl-ov, visible));
          clip: var(--p-ms-desc-xxl-clip, var(--p-ms-desc-xl-clip, auto));
          white-space: var(--p-ms-desc-xxl-ws, var(--p-ms-desc-xl-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }`]})],l);export{l as default};
