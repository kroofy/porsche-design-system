import{a as f}from"./host-DRskmCSE.js";import y from"./Icon-DzSCh0v5.js";import{I as i,C as $,V as T,a as _}from"./angular-aNJmk6GY.js";import"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var N=Object.defineProperty,S=Object.getOwnPropertyDescriptor,s=(p,c,o,a)=>{for(var r=a>1?void 0:a?S(c,o):c,l=p.length-1,t;l>=0;l--)(t=p[l])&&(r=(a?t(c,o,r):t(r))||r);return a&&r&&N(c,o,r),r};const g=["base","xs","s","m","l","xl","xxl"],L=(p,c)=>{if(p==null)return c;if(p==="")return!0;if(typeof p=="string"&&p.charAt(0)==="{")try{return JSON.parse(p.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return c}return p},d=p=>p===!0||p==="true"||p==="",x=(p,c,o)=>p&&typeof p=="object"?p[c]===void 0?o:p[c]:p,b=(p,c,o)=>{const a=c==="base"?"--p-pc-lw":`--p-pc-lw-${c}`,r=c==="base"?"--p-pc-desc":`--p-pc-desc-${c}`;if(o){p[`${a}-pos`]="absolute",p[`${a}-w`]="1px",p[`${a}-h`]="1px",p[`${a}-pad`]="0",p[`${a}-m`]="-1px",p[`${a}-ov`]="hidden",p[`${a}-clip`]="rect(0, 0, 0, 0)",p[`${a}-ws`]="nowrap",p[`${a}-minw`]="",p[`${r}-pos`]="absolute",p[`${r}-w`]="1px",p[`${r}-h`]="1px",p[`${r}-pad`]="0",p[`${r}-m`]="-1px",p[`${r}-ov`]="hidden",p[`${r}-clip`]="rect(0, 0, 0, 0)",p[`${r}-ws`]="nowrap";return}p[`${a}-pos`]="static",p[`${a}-w`]="auto",p[`${a}-h`]="auto",p[`${a}-pad`]="0",p[`${a}-m`]="0",p[`${a}-ov`]="visible",p[`${a}-clip`]="auto",p[`${a}-ws`]="normal",p[`${a}-minw`]="fit-content",p[`${r}-pos`]="static",p[`${r}-w`]="auto",p[`${r}-h`]="auto",p[`${r}-pad`]="0",p[`${r}-m`]="0",p[`${r}-ov`]="visible",p[`${r}-clip`]="auto",p[`${r}-ws`]="normal"};let e=class{constructor(){this.hostAttr=f}get hostStyle(){const p=d(this.disabled),c=d(this.loading),o=d(this.compact),a=this.state==="success"||this.state==="error"?this.state:"none",l=!!(this.message||"")&&(a==="success"||a==="error"),t=L(this.hideLabel,!1);let n=Number(this.length);(!Number.isFinite(n)||n<1)&&(n=4),n>6&&(n=6);const h={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},w=h[a]||h.none,u={"--p-pc-scale":o?"0.64285714":"1","--p-pc-radius":o?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-pc-border":w.border,"--p-pc-bg":w.bg,"--p-pc-hover":w.hover,"--p-pc-pad":"calc(11.2px * (var(--_p-pin-code-a) - 0.64285714) + 4px)","--p-pc-cols":"repeat("+n+", 1fr)","--p-pc-font":"var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next)","--p-pc-cursor":p||c?"not-allowed":"text","--p-pc-input-op":p||c?"0.4":"","--p-pc-input-fc-op":p||c?"1":"","--p-pc-input-fc-color":p||c?"GrayText":"","--p-pc-label-cursor":p||c?"not-allowed":"pointer","--p-pc-pe":p||c?"none":"","--p-pc-opacity":p?"0.4":"","--p-pc-fc-op":p?"1":"","--p-pc-fc-color":p?"GrayText":"","--p-pc-msg":w.message||"","--p-pc-msg-op":l?"":"0","--p-pc-msg-pos":l?"":"absolute","--p-pc-icon-display":l?"inline-flex":"none"};if(typeof t=="object"&&t!==null){let m=d(x(t,"base",!1));for(const v of g)t[v]!==void 0&&(m=d(x(t,v,!1))),b(u,v,m)}else{const m=d(t);for(const v of g)b(u,v,m)}return u}get labelText(){return this.label||""}get descriptionText(){return this.description||""}get messageText(){const p=this.state||"none",c=this.message||"";return!c||p!=="success"&&p!=="error"?"":c}get iconName(){const p=this.state||"none";return!(this.message||"")||p!=="success"&&p!=="error"?"":p==="error"?"exclamation":"check"}get iconColor(){const p=this.state||"none";return p==="error"?"error":p==="success"?"success":""}get isDisabled(){return this.disabled===!0||this.disabled==="true"||this.disabled===""}get isLoading(){return this.loading===!0||this.loading==="true"||this.loading===""}get isRequired(){return this.required===!0||this.required==="true"||this.required===""}get ariaInvalid(){return this.state==="error"?"true":""}get messageRole(){return this.state==="success"?"status":"alert"}get loadingText(){return this.loading===!0||this.loading==="true"||this.loading===""?"Loading":""}get inputType(){return this.type==="password"?"password":"text"}get pinLength(){let p=Number(this.length);return(!Number.isFinite(p)||p<1)&&(p=4),p>6&&(p=6),p}get parsedValue(){return this.value==null?"":String(this.value)}};s([i()],e.prototype,"disabled",2);s([i()],e.prototype,"loading",2);s([i()],e.prototype,"compact",2);s([i()],e.prototype,"state",2);s([i()],e.prototype,"message",2);s([i()],e.prototype,"hideLabel",2);s([i()],e.prototype,"length",2);s([i()],e.prototype,"label",2);s([i()],e.prototype,"description",2);s([i()],e.prototype,"required",2);s([i()],e.prototype,"type",2);s([i()],e.prototype,"value",2);e=s([$({selector:"p-pin-code",standalone:!0,imports:[_,y],encapsulation:T.None,template:`
    <div class="p-pin-code" data-pds="pin-code" [style]="hostStyle" [attr.disabled]="hostAttr(disabled) ?? null" [attr.loading]="hostAttr(loading) ?? null">
    <fieldset class="root">
      <div class="label-wrapper">
        <label
          class="label"
          id="label"
          for="current-input"
          >{{labelText}}</label
        >
        <span data-pds-slot="label-after"><ng-content select="[slot=label-after]"></ng-content></span>
      </div>
      <span class="label" id="description">{{descriptionText}}</span>
      <div class="wrapper">
        <input  [disabled]="isDisabled" />
        <input  [disabled]="isDisabled" />
        <input  [disabled]="isDisabled" />
        <input  [disabled]="isDisabled" />
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
  `,styles:[`.p-pin-code :where([data-pds-slot]){display:contents}

      .p-pin-code {
        display: contents;
      }
      .p-pin-code {
        display: block;
        --_p-pin-code-a: var(--p-pc-scale, 1);
      }
      .p-pin-code[hidden] {
        display: none !important;
      }
      .p-pin-code [data-pds-slot="label-after"]{
        display: inline-block;
        vertical-align: top;
      }
      .p-pin-code [data-pds-slot="label-after"] > *{
        margin-inline-start: var(--p-spacing-static-xs) !important;
      }
      .p-pin-code .label-after{
        display: inline-block;
        vertical-align: top;
      }
      .p-pin-code input{
        all: unset;
        display: block;
        width: auto;
        min-width: calc(1ch + var(--p-pc-pad) * 2 + 1px * 2);
        max-width: calc(var(--_p-pin-code-a) * 3.5rem);
        height: calc(var(--_p-pin-code-a) * 3.5rem);
        padding: var(--p-pc-pad);
        box-sizing: border-box;
        border: 1px solid var(--p-pc-border);
        border-radius: var(--p-pc-radius, var(--p-radius-xl));
        background: var(--p-pc-bg);
        font: var(--p-pc-font);
        color: var(--p-color-primary);
        transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          border-color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        text-overflow: ellipsis;
        cursor: var(--p-pc-cursor, text);
        text-align: center;
        opacity: var(--p-pc-input-op);
      }
      .p-pin-code input:focus-visible{
        border-color: var(--p-pc-hover);
      }
      .p-pin-code .root{
        all: unset;
        display: grid;
        gap: var(--p-spacing-static-xs);
      }
      .p-pin-code .wrapper{
        position: relative;
        display: grid;
        grid-template-columns: var(--p-pc-cols);
        justify-self: flex-start;
        gap: var(--p-pc-pad);
      }
      .p-pin-code .spinner{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }
      .p-pin-code .loading{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }
      .p-pin-code .label-wrapper{
        min-width: var(--p-pc-lw-minw);
        position: var(--p-pc-lw-pos, static);
        width: var(--p-pc-lw-w, auto);
        height: var(--p-pc-lw-h, auto);
        padding: var(--p-pc-lw-pad, 0);
        margin: var(--p-pc-lw-m, 0);
        overflow: var(--p-pc-lw-ov, visible);
        clip: var(--p-pc-lw-clip, auto);
        white-space: var(--p-pc-lw-ws, normal);
      }
      .p-pin-code .label{
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        cursor: var(--p-pc-label-cursor, pointer);
        color: var(--p-color-primary);
        pointer-events: var(--p-pc-pe);
        opacity: var(--p-pc-opacity);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
        display: inline;
      }
      .p-pin-code .label:empty{
        display: none;
      }
      .p-pin-code .label:is(span){
        cursor: unset;
        font-size: var(--p-typescale-xs);
        color: var(--p-color-contrast-high);
        min-width: unset;
        position: var(--p-pc-desc-pos, static);
        width: var(--p-pc-desc-w, auto);
        height: var(--p-pc-desc-h, auto);
        padding: var(--p-pc-desc-pad, 0);
        margin: var(--p-pc-desc-m, 0);
        overflow: var(--p-pc-desc-ov, visible);
        clip: var(--p-pc-desc-clip, auto);
        white-space: var(--p-pc-desc-ws, normal);
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
      .p-pin-code .label > [data-pds-slot="label"] > *{
        display: inline !important;
      }
      .p-pin-code .required{
        user-select: none;
      }
      .p-pin-code .message{
        display: flex;
        gap: var(--p-spacing-static-xs);
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-pc-msg, inherit);
        opacity: var(--p-pc-msg-op);
        position: var(--p-pc-msg-pos);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
      }
      .p-pin-code .message:empty{
        opacity: 0;
        position: absolute;
      }
      .p-pin-code .message .p-icon{
        display: var(--p-pc-icon-display, none);
      }
      @media (forced-colors: active) {
        .p-pin-code input{
          opacity: var(--p-pc-input-fc-op, var(--p-pc-input-op, 1));
          color: var(--p-pc-input-fc-color, var(--p-color-primary));
        }
        .p-pin-code .label{
          opacity: var(--p-pc-fc-op, var(--p-pc-opacity, 1));
          color: var(--p-pc-fc-color, var(--p-color-primary));
        }
      }
      @media (hover: hover) {
        .p-pin-code:not([disabled]):not([loading]) input:hover {
          border-color: var(--p-pc-hover);
        }
      }
      @media (min-width: 480px) {
        .p-pin-code .label-wrapper{
          min-width: var(--p-pc-lw-xs-minw, var(--p-pc-lw-minw));
          position: var(--p-pc-lw-xs-pos, var(--p-pc-lw-pos, static));
          width: var(--p-pc-lw-xs-w, var(--p-pc-lw-w, auto));
          height: var(--p-pc-lw-xs-h, var(--p-pc-lw-h, auto));
          padding: var(--p-pc-lw-xs-pad, var(--p-pc-lw-pad, 0));
          margin: var(--p-pc-lw-xs-m, var(--p-pc-lw-m, 0));
          overflow: var(--p-pc-lw-xs-ov, var(--p-pc-lw-ov, visible));
          clip: var(--p-pc-lw-xs-clip, var(--p-pc-lw-clip, auto));
          white-space: var(--p-pc-lw-xs-ws, var(--p-pc-lw-ws, normal));
        }
        .p-pin-code .label:is(span){
          position: var(--p-pc-desc-xs-pos, var(--p-pc-desc-pos, static));
          width: var(--p-pc-desc-xs-w, var(--p-pc-desc-w, auto));
          height: var(--p-pc-desc-xs-h, var(--p-pc-desc-h, auto));
          padding: var(--p-pc-desc-xs-pad, var(--p-pc-desc-pad, 0));
          margin: var(--p-pc-desc-xs-m, var(--p-pc-desc-m, 0));
          overflow: var(--p-pc-desc-xs-ov, var(--p-pc-desc-ov, visible));
          clip: var(--p-pc-desc-xs-clip, var(--p-pc-desc-clip, auto));
          white-space: var(--p-pc-desc-xs-ws, var(--p-pc-desc-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 760px) {
        .p-pin-code .label-wrapper{
          min-width: var(
            --p-pc-lw-s-minw,
            var(--p-pc-lw-xs-minw, var(--p-pc-lw-minw))
          );
          position: var(
            --p-pc-lw-s-pos,
            var(--p-pc-lw-xs-pos, var(--p-pc-lw-pos, static))
          );
          width: var(
            --p-pc-lw-s-w,
            var(--p-pc-lw-xs-w, var(--p-pc-lw-w, auto))
          );
          height: var(
            --p-pc-lw-s-h,
            var(--p-pc-lw-xs-h, var(--p-pc-lw-h, auto))
          );
          padding: var(
            --p-pc-lw-s-pad,
            var(--p-pc-lw-xs-pad, var(--p-pc-lw-pad, 0))
          );
          margin: var(--p-pc-lw-s-m, var(--p-pc-lw-xs-m, var(--p-pc-lw-m, 0)));
          overflow: var(
            --p-pc-lw-s-ov,
            var(--p-pc-lw-xs-ov, var(--p-pc-lw-ov, visible))
          );
          clip: var(
            --p-pc-lw-s-clip,
            var(--p-pc-lw-xs-clip, var(--p-pc-lw-clip, auto))
          );
          white-space: var(
            --p-pc-lw-s-ws,
            var(--p-pc-lw-xs-ws, var(--p-pc-lw-ws, normal))
          );
        }
        .p-pin-code .label:is(span){
          position: var(
            --p-pc-desc-s-pos,
            var(--p-pc-desc-xs-pos, var(--p-pc-desc-pos, static))
          );
          width: var(
            --p-pc-desc-s-w,
            var(--p-pc-desc-xs-w, var(--p-pc-desc-w, auto))
          );
          height: var(
            --p-pc-desc-s-h,
            var(--p-pc-desc-xs-h, var(--p-pc-desc-h, auto))
          );
          padding: var(
            --p-pc-desc-s-pad,
            var(--p-pc-desc-xs-pad, var(--p-pc-desc-pad, 0))
          );
          margin: var(
            --p-pc-desc-s-m,
            var(--p-pc-desc-xs-m, var(--p-pc-desc-m, 0))
          );
          overflow: var(
            --p-pc-desc-s-ov,
            var(--p-pc-desc-xs-ov, var(--p-pc-desc-ov, visible))
          );
          clip: var(
            --p-pc-desc-s-clip,
            var(--p-pc-desc-xs-clip, var(--p-pc-desc-clip, auto))
          );
          white-space: var(
            --p-pc-desc-s-ws,
            var(--p-pc-desc-xs-ws, var(--p-pc-desc-ws, normal))
          );
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1000px) {
        .p-pin-code .label-wrapper{
          min-width: var(--p-pc-lw-m-minw, var(--p-pc-lw-s-minw));
          position: var(--p-pc-lw-m-pos, var(--p-pc-lw-s-pos, static));
          width: var(--p-pc-lw-m-w, var(--p-pc-lw-s-w, auto));
          height: var(--p-pc-lw-m-h, var(--p-pc-lw-s-h, auto));
          padding: var(--p-pc-lw-m-pad, var(--p-pc-lw-s-pad, 0));
          margin: var(--p-pc-lw-m-m, var(--p-pc-lw-s-m, 0));
          overflow: var(--p-pc-lw-m-ov, var(--p-pc-lw-s-ov, visible));
          clip: var(--p-pc-lw-m-clip, var(--p-pc-lw-s-clip, auto));
          white-space: var(--p-pc-lw-m-ws, var(--p-pc-lw-s-ws, normal));
        }
        .p-pin-code .label:is(span){
          position: var(--p-pc-desc-m-pos, var(--p-pc-desc-s-pos, static));
          width: var(--p-pc-desc-m-w, var(--p-pc-desc-s-w, auto));
          height: var(--p-pc-desc-m-h, var(--p-pc-desc-s-h, auto));
          padding: var(--p-pc-desc-m-pad, var(--p-pc-desc-s-pad, 0));
          margin: var(--p-pc-desc-m-m, var(--p-pc-desc-s-m, 0));
          overflow: var(--p-pc-desc-m-ov, var(--p-pc-desc-s-ov, visible));
          clip: var(--p-pc-desc-m-clip, var(--p-pc-desc-s-clip, auto));
          white-space: var(--p-pc-desc-m-ws, var(--p-pc-desc-s-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1300px) {
        .p-pin-code .label-wrapper{
          min-width: var(--p-pc-lw-l-minw, var(--p-pc-lw-m-minw));
          position: var(--p-pc-lw-l-pos, var(--p-pc-lw-m-pos, static));
          width: var(--p-pc-lw-l-w, var(--p-pc-lw-m-w, auto));
          height: var(--p-pc-lw-l-h, var(--p-pc-lw-m-h, auto));
          padding: var(--p-pc-lw-l-pad, var(--p-pc-lw-m-pad, 0));
          margin: var(--p-pc-lw-l-m, var(--p-pc-lw-m-m, 0));
          overflow: var(--p-pc-lw-l-ov, var(--p-pc-lw-m-ov, visible));
          clip: var(--p-pc-lw-l-clip, var(--p-pc-lw-m-clip, auto));
          white-space: var(--p-pc-lw-l-ws, var(--p-pc-lw-m-ws, normal));
        }
        .p-pin-code .label:is(span){
          position: var(--p-pc-desc-l-pos, var(--p-pc-desc-m-pos, static));
          width: var(--p-pc-desc-l-w, var(--p-pc-desc-m-w, auto));
          height: var(--p-pc-desc-l-h, var(--p-pc-desc-m-h, auto));
          padding: var(--p-pc-desc-l-pad, var(--p-pc-desc-m-pad, 0));
          margin: var(--p-pc-desc-l-m, var(--p-pc-desc-m-m, 0));
          overflow: var(--p-pc-desc-l-ov, var(--p-pc-desc-m-ov, visible));
          clip: var(--p-pc-desc-l-clip, var(--p-pc-desc-m-clip, auto));
          white-space: var(--p-pc-desc-l-ws, var(--p-pc-desc-m-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1760px) {
        .p-pin-code .label-wrapper{
          min-width: var(--p-pc-lw-xl-minw, var(--p-pc-lw-l-minw));
          position: var(--p-pc-lw-xl-pos, var(--p-pc-lw-l-pos, static));
          width: var(--p-pc-lw-xl-w, var(--p-pc-lw-l-w, auto));
          height: var(--p-pc-lw-xl-h, var(--p-pc-lw-l-h, auto));
          padding: var(--p-pc-lw-xl-pad, var(--p-pc-lw-l-pad, 0));
          margin: var(--p-pc-lw-xl-m, var(--p-pc-lw-l-m, 0));
          overflow: var(--p-pc-lw-xl-ov, var(--p-pc-lw-l-ov, visible));
          clip: var(--p-pc-lw-xl-clip, var(--p-pc-lw-l-clip, auto));
          white-space: var(--p-pc-lw-xl-ws, var(--p-pc-lw-l-ws, normal));
        }
        .p-pin-code .label:is(span){
          position: var(--p-pc-desc-xl-pos, var(--p-pc-desc-l-pos, static));
          width: var(--p-pc-desc-xl-w, var(--p-pc-desc-l-w, auto));
          height: var(--p-pc-desc-xl-h, var(--p-pc-desc-l-h, auto));
          padding: var(--p-pc-desc-xl-pad, var(--p-pc-desc-l-pad, 0));
          margin: var(--p-pc-desc-xl-m, var(--p-pc-desc-l-m, 0));
          overflow: var(--p-pc-desc-xl-ov, var(--p-pc-desc-l-ov, visible));
          clip: var(--p-pc-desc-xl-clip, var(--p-pc-desc-l-clip, auto));
          white-space: var(--p-pc-desc-xl-ws, var(--p-pc-desc-l-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1920px) {
        .p-pin-code .label-wrapper{
          min-width: var(--p-pc-lw-xxl-minw, var(--p-pc-lw-xl-minw));
          position: var(--p-pc-lw-xxl-pos, var(--p-pc-lw-xl-pos, static));
          width: var(--p-pc-lw-xxl-w, var(--p-pc-lw-xl-w, auto));
          height: var(--p-pc-lw-xxl-h, var(--p-pc-lw-xl-h, auto));
          padding: var(--p-pc-lw-xxl-pad, var(--p-pc-lw-xl-pad, 0));
          margin: var(--p-pc-lw-xxl-m, var(--p-pc-lw-xl-m, 0));
          overflow: var(--p-pc-lw-xxl-ov, var(--p-pc-lw-xl-ov, visible));
          clip: var(--p-pc-lw-xxl-clip, var(--p-pc-lw-xl-clip, auto));
          white-space: var(--p-pc-lw-xxl-ws, var(--p-pc-lw-xl-ws, normal));
        }
        .p-pin-code .label:is(span){
          position: var(--p-pc-desc-xxl-pos, var(--p-pc-desc-xl-pos, static));
          width: var(--p-pc-desc-xxl-w, var(--p-pc-desc-xl-w, auto));
          height: var(--p-pc-desc-xxl-h, var(--p-pc-desc-xl-h, auto));
          padding: var(--p-pc-desc-xxl-pad, var(--p-pc-desc-xl-pad, 0));
          margin: var(--p-pc-desc-xxl-m, var(--p-pc-desc-xl-m, 0));
          overflow: var(--p-pc-desc-xxl-ov, var(--p-pc-desc-xl-ov, visible));
          clip: var(--p-pc-desc-xxl-clip, var(--p-pc-desc-xl-clip, auto));
          white-space: var(--p-pc-desc-xxl-ws, var(--p-pc-desc-xl-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }`]})],e);export{e as default};
