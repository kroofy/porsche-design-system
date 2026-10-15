import $ from"./Icon-DzSCh0v5.js";import{I as d,C as S,V as T,a as C}from"./angular-aNJmk6GY.js";import"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var q=Object.defineProperty,O=Object.getOwnPropertyDescriptor,o=(s,a,p,e)=>{for(var c=e>1?void 0:e?O(a,p):a,i=s.length-1,n;i>=0;i--)(n=s[i])&&(c=(e?n(a,p,c):n(c))||c);return e&&c&&q(a,p,c),c};const w=["base","xs","s","m","l","xl","xxl"],b=(s,a)=>{if(s==null)return a;if(s==="")return typeof a=="boolean"?!0:a;if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return a}return s},m=s=>s===!0||s==="true"||s==="",g=(s,a,p)=>s&&typeof s=="object"?s[a]===void 0?p:s[a]:s,h=(s,a,p)=>s==="auto"||s===void 0||s===null||s===""?"repeat(auto-fit, "+p+"px)":"repeat("+s+", minmax(0, 1fr))",y=(s,a,p)=>{const e=a==="base"?"--p-sc-lw":`--p-sc-lw-${a}`,c=a==="base"?"--p-sc-desc":`--p-sc-desc-${a}`;if(p){s[`${e}-pos`]="absolute",s[`${e}-w`]="1px",s[`${e}-h`]="1px",s[`${e}-pad`]="0",s[`${e}-m`]="-1px",s[`${e}-ov`]="hidden",s[`${e}-clip`]="rect(0, 0, 0, 0)",s[`${e}-ws`]="nowrap",s[`${e}-minw`]="",s[`${c}-pos`]="absolute",s[`${c}-w`]="1px",s[`${c}-h`]="1px",s[`${c}-pad`]="0",s[`${c}-m`]="-1px",s[`${c}-ov`]="hidden",s[`${c}-clip`]="rect(0, 0, 0, 0)",s[`${c}-ws`]="nowrap";return}s[`${e}-pos`]="static",s[`${e}-w`]="auto",s[`${e}-h`]="auto",s[`${e}-pad`]="0",s[`${e}-m`]="0",s[`${e}-ov`]="visible",s[`${e}-clip`]="auto",s[`${e}-ws`]="normal",s[`${e}-minw`]="fit-content",s[`${c}-pos`]="static",s[`${c}-w`]="auto",s[`${c}-h`]="auto",s[`${c}-pad`]="0",s[`${c}-m`]="0",s[`${c}-ov`]="visible",s[`${c}-clip`]="auto",s[`${c}-ws`]="normal"},f=(s,a,p)=>{if(a==="base"){s["--p-sc-cols"]=p;return}s[`--p-sc-cols-${a}`]=p};let t=class{get hostStyle(){const s=m(this.disabled);m(this.compact);const a=m(this.noWrap),p=this.state==="success"||this.state==="error"?this.state:"none",c=!!(this.message||"")&&(p==="success"||p==="error"),i=b(this.hideLabel,!1),n=b(this.columns,"auto"),u=46,x=80,v={"--p-sc-cursor":s?"not-allowed":"inherit","--p-sc-pe":s?"none":"","--p-sc-opacity":s?"0.4":"","--p-sc-fc-opacity":s?"1":"","--p-sc-fc-color":s?"GrayText":"","--p-sc-msg":{none:"",success:"var(--p-color-success)",error:"var(--p-color-error)"}[p]||"","--p-sc-msg-opacity":c?"":"0","--p-sc-msg-pos":c?"":"absolute","--p-sc-icon-display":c?"inline-flex":"none","--p-sc-flow":a?"column":"","--p-sc-auto-cols":a?"max-content":"","--p-sc-scroller-m":a?"calc(-1 * var(--p-spacing-static-xs)) 0":""};if(typeof i=="object"&&i!==null){let r=m(g(i,"base",!1));for(const l of w)i[l]!==void 0&&(r=m(g(i,l,!1))),y(v,l,r)}else{const r=m(i);for(const l of w)y(v,l,r)}if(a)for(const r of w)f(v,r,"");else if(typeof n=="object"&&n!==null){let r=h(g(n,"base","auto"),u,x);for(const l of w)n[l]!==void 0&&(r=h(g(n,l,"auto"),u,x)),f(v,l,r)}else{const r=h(n,u,x);for(const l of w)f(v,l,r)}return v}get labelText(){return this.label||""}get descriptionText(){return this.description||""}get messageText(){const s=this.state||"none",a=this.message||"";return!a||s!=="success"&&s!=="error"?"":a}get iconName(){const s=this.state||"none";return!(this.message||"")||s!=="success"&&s!=="error"?"":s==="error"?"exclamation":"check"}get iconColor(){const s=this.state||"none";return s==="error"?"error":s==="success"?"success":""}get isDisabled(){return this.disabled===!0||this.disabled==="true"||this.disabled===""}get isRequired(){return this.required===!0||this.required==="true"||this.required===""}get ariaInvalid(){return this.state==="error"?"true":""}get messageRole(){return this.state==="success"?"status":"alert"}};o([d()],t.prototype,"disabled",2);o([d()],t.prototype,"compact",2);o([d()],t.prototype,"noWrap",2);o([d()],t.prototype,"state",2);o([d()],t.prototype,"message",2);o([d()],t.prototype,"hideLabel",2);o([d()],t.prototype,"columns",2);o([d()],t.prototype,"label",2);o([d()],t.prototype,"description",2);o([d()],t.prototype,"required",2);t=o([S({selector:"p-segmented-control",standalone:!0,imports:[C,$],encapsulation:T.None,template:`
    <div class="p-segmented-control" data-pds="segmented-control" [style]="hostStyle">
    <fieldset class="root">
      <div class="label-wrapper">
        <div class="label" id="label">
          {{labelText}} <span data-pds-slot="label"><ng-content select="[slot=label]"></ng-content></span>
        </div>
        <span data-pds-slot="label-after"><ng-content select="[slot=label-after]"></ng-content></span>
      </div>
      <span class="label" id="description"
        >{{descriptionText}} <span data-pds-slot="description"><ng-content select="[slot=description]"></ng-content></span></span>
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
  `,styles:[`.p-segmented-control :where([data-pds-slot]){display:contents}

      .p-segmented-control {
        display: contents;
      }
      .p-segmented-control[hidden] {
        display: none !important;
      }
      .p-segmented-control [data-pds-slot="label-after"]{
        display: inline-block;
        vertical-align: top;
      }
      .p-segmented-control [data-pds-slot="label-after"] > *{
        margin-inline-start: var(--p-spacing-static-xs) !important;
      }
      .p-segmented-control .label-after{
        display: inline-block;
        vertical-align: top;
      }
      .p-segmented-control [data-pds-slot]:not([name]){
        display: grid;
        grid-auto-rows: 1fr;
        grid-auto-flow: var(--p-sc-flow);
        grid-auto-columns: var(--p-sc-auto-cols);
        grid-template-columns: var(--p-sc-cols);
        gap: 6px;
      }
      .p-segmented-control .root{
        all: unset;
        display: grid;
        gap: var(--p-spacing-static-xs);
      }
      .p-segmented-control .scroller{
        margin: var(--p-sc-scroller-m);
      }
      .p-segmented-control .label-wrapper{
        min-width: var(--p-sc-lw-minw);
        position: var(--p-sc-lw-pos, static);
        width: var(--p-sc-lw-w, auto);
        height: var(--p-sc-lw-h, auto);
        padding: var(--p-sc-lw-pad, 0);
        margin: var(--p-sc-lw-m, 0);
        overflow: var(--p-sc-lw-ov, visible);
        clip: var(--p-sc-lw-clip, auto);
        white-space: var(--p-sc-lw-ws, normal);
      }
      .p-segmented-control .label{
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        cursor: var(--p-sc-cursor, inherit);
        color: var(--p-color-primary);
        pointer-events: var(--p-sc-pe);
        opacity: var(--p-sc-opacity);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
        display: inline;
      }
      .p-segmented-control .label:empty{
        display: none;
      }
      .p-segmented-control .label:is(span){
        cursor: unset;
        font-size: var(--p-typescale-xs);
        color: var(--p-color-contrast-high);
        min-width: unset;
        position: var(--p-sc-desc-pos, static);
        width: var(--p-sc-desc-w, auto);
        height: var(--p-sc-desc-h, auto);
        padding: var(--p-sc-desc-pad, 0);
        margin: var(--p-sc-desc-m, 0);
        overflow: var(--p-sc-desc-ov, visible);
        clip: var(--p-sc-desc-clip, auto);
        white-space: var(--p-sc-desc-ws, normal);
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
      .p-segmented-control .label > [data-pds-slot="label"] > *{
        display: inline !important;
      }
      .p-segmented-control .required{
        user-select: none;
      }
      .p-segmented-control .message{
        display: flex;
        gap: var(--p-spacing-static-xs);
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-sc-msg);
        opacity: var(--p-sc-msg-opacity);
        position: var(--p-sc-msg-pos);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
      }
      .p-segmented-control .message:empty{
        opacity: 0;
        position: absolute;
      }
      .p-segmented-control .message .p-icon{
        display: var(--p-sc-icon-display, none);
      }
      @media (forced-colors: active) {
        .p-segmented-control .label{
          opacity: var(--p-sc-fc-opacity, var(--p-sc-opacity, 1));
          color: var(--p-sc-fc-color, var(--p-color-primary));
        }
      }
      @media (min-width: 480px) {
        .p-segmented-control [data-pds-slot]:not([name]){
          grid-template-columns: var(--p-sc-cols-xs, var(--p-sc-cols));
        }
        .p-segmented-control .label-wrapper{
          min-width: var(--p-sc-lw-xs-minw, var(--p-sc-lw-minw));
          position: var(--p-sc-lw-xs-pos, var(--p-sc-lw-pos, static));
          width: var(--p-sc-lw-xs-w, var(--p-sc-lw-w, auto));
          height: var(--p-sc-lw-xs-h, var(--p-sc-lw-h, auto));
          padding: var(--p-sc-lw-xs-pad, var(--p-sc-lw-pad, 0));
          margin: var(--p-sc-lw-xs-m, var(--p-sc-lw-m, 0));
          overflow: var(--p-sc-lw-xs-ov, var(--p-sc-lw-ov, visible));
          clip: var(--p-sc-lw-xs-clip, var(--p-sc-lw-clip, auto));
          white-space: var(--p-sc-lw-xs-ws, var(--p-sc-lw-ws, normal));
        }
        .p-segmented-control .label:is(span){
          position: var(--p-sc-desc-xs-pos, var(--p-sc-desc-pos, static));
          width: var(--p-sc-desc-xs-w, var(--p-sc-desc-w, auto));
          height: var(--p-sc-desc-xs-h, var(--p-sc-desc-h, auto));
          padding: var(--p-sc-desc-xs-pad, var(--p-sc-desc-pad, 0));
          margin: var(--p-sc-desc-xs-m, var(--p-sc-desc-m, 0));
          overflow: var(--p-sc-desc-xs-ov, var(--p-sc-desc-ov, visible));
          clip: var(--p-sc-desc-xs-clip, var(--p-sc-desc-clip, auto));
          white-space: var(--p-sc-desc-xs-ws, var(--p-sc-desc-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 760px) {
        .p-segmented-control [data-pds-slot]:not([name]){
          grid-template-columns: var(
            --p-sc-cols-s,
            var(--p-sc-cols-xs, var(--p-sc-cols))
          );
        }
        .p-segmented-control .label-wrapper{
          min-width: var(
            --p-sc-lw-s-minw,
            var(--p-sc-lw-xs-minw, var(--p-sc-lw-minw))
          );
          position: var(
            --p-sc-lw-s-pos,
            var(--p-sc-lw-xs-pos, var(--p-sc-lw-pos, static))
          );
          width: var(
            --p-sc-lw-s-w,
            var(--p-sc-lw-xs-w, var(--p-sc-lw-w, auto))
          );
          height: var(
            --p-sc-lw-s-h,
            var(--p-sc-lw-xs-h, var(--p-sc-lw-h, auto))
          );
          padding: var(
            --p-sc-lw-s-pad,
            var(--p-sc-lw-xs-pad, var(--p-sc-lw-pad, 0))
          );
          margin: var(--p-sc-lw-s-m, var(--p-sc-lw-xs-m, var(--p-sc-lw-m, 0)));
          overflow: var(
            --p-sc-lw-s-ov,
            var(--p-sc-lw-xs-ov, var(--p-sc-lw-ov, visible))
          );
          clip: var(
            --p-sc-lw-s-clip,
            var(--p-sc-lw-xs-clip, var(--p-sc-lw-clip, auto))
          );
          white-space: var(
            --p-sc-lw-s-ws,
            var(--p-sc-lw-xs-ws, var(--p-sc-lw-ws, normal))
          );
        }
        .p-segmented-control .label:is(span){
          position: var(
            --p-sc-desc-s-pos,
            var(--p-sc-desc-xs-pos, var(--p-sc-desc-pos, static))
          );
          width: var(
            --p-sc-desc-s-w,
            var(--p-sc-desc-xs-w, var(--p-sc-desc-w, auto))
          );
          height: var(
            --p-sc-desc-s-h,
            var(--p-sc-desc-xs-h, var(--p-sc-desc-h, auto))
          );
          padding: var(
            --p-sc-desc-s-pad,
            var(--p-sc-desc-xs-pad, var(--p-sc-desc-pad, 0))
          );
          margin: var(
            --p-sc-desc-s-m,
            var(--p-sc-desc-xs-m, var(--p-sc-desc-m, 0))
          );
          overflow: var(
            --p-sc-desc-s-ov,
            var(--p-sc-desc-xs-ov, var(--p-sc-desc-ov, visible))
          );
          clip: var(
            --p-sc-desc-s-clip,
            var(--p-sc-desc-xs-clip, var(--p-sc-desc-clip, auto))
          );
          white-space: var(
            --p-sc-desc-s-ws,
            var(--p-sc-desc-xs-ws, var(--p-sc-desc-ws, normal))
          );
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1000px) {
        .p-segmented-control [data-pds-slot]:not([name]){
          grid-template-columns: var(
            --p-sc-cols-m,
            var(--p-sc-cols-s, var(--p-sc-cols-xs, var(--p-sc-cols)))
          );
        }
        .p-segmented-control .label-wrapper{
          min-width: var(--p-sc-lw-m-minw, var(--p-sc-lw-s-minw));
          position: var(--p-sc-lw-m-pos, var(--p-sc-lw-s-pos, static));
          width: var(--p-sc-lw-m-w, var(--p-sc-lw-s-w, auto));
          height: var(--p-sc-lw-m-h, var(--p-sc-lw-s-h, auto));
          padding: var(--p-sc-lw-m-pad, var(--p-sc-lw-s-pad, 0));
          margin: var(--p-sc-lw-m-m, var(--p-sc-lw-s-m, 0));
          overflow: var(--p-sc-lw-m-ov, var(--p-sc-lw-s-ov, visible));
          clip: var(--p-sc-lw-m-clip, var(--p-sc-lw-s-clip, auto));
          white-space: var(--p-sc-lw-m-ws, var(--p-sc-lw-s-ws, normal));
        }
        .p-segmented-control .label:is(span){
          position: var(--p-sc-desc-m-pos, var(--p-sc-desc-s-pos, static));
          width: var(--p-sc-desc-m-w, var(--p-sc-desc-s-w, auto));
          height: var(--p-sc-desc-m-h, var(--p-sc-desc-s-h, auto));
          padding: var(--p-sc-desc-m-pad, var(--p-sc-desc-s-pad, 0));
          margin: var(--p-sc-desc-m-m, var(--p-sc-desc-s-m, 0));
          overflow: var(--p-sc-desc-m-ov, var(--p-sc-desc-s-ov, visible));
          clip: var(--p-sc-desc-m-clip, var(--p-sc-desc-s-clip, auto));
          white-space: var(--p-sc-desc-m-ws, var(--p-sc-desc-s-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1300px) {
        .p-segmented-control [data-pds-slot]:not([name]){
          grid-template-columns: var(--p-sc-cols-l, var(--p-sc-cols-m));
        }
        .p-segmented-control .label-wrapper{
          min-width: var(--p-sc-lw-l-minw, var(--p-sc-lw-m-minw));
          position: var(--p-sc-lw-l-pos, var(--p-sc-lw-m-pos, static));
          width: var(--p-sc-lw-l-w, var(--p-sc-lw-m-w, auto));
          height: var(--p-sc-lw-l-h, var(--p-sc-lw-m-h, auto));
          padding: var(--p-sc-lw-l-pad, var(--p-sc-lw-m-pad, 0));
          margin: var(--p-sc-lw-l-m, var(--p-sc-lw-m-m, 0));
          overflow: var(--p-sc-lw-l-ov, var(--p-sc-lw-m-ov, visible));
          clip: var(--p-sc-lw-l-clip, var(--p-sc-lw-m-clip, auto));
          white-space: var(--p-sc-lw-l-ws, var(--p-sc-lw-m-ws, normal));
        }
        .p-segmented-control .label:is(span){
          position: var(--p-sc-desc-l-pos, var(--p-sc-desc-m-pos, static));
          width: var(--p-sc-desc-l-w, var(--p-sc-desc-m-w, auto));
          height: var(--p-sc-desc-l-h, var(--p-sc-desc-m-h, auto));
          padding: var(--p-sc-desc-l-pad, var(--p-sc-desc-m-pad, 0));
          margin: var(--p-sc-desc-l-m, var(--p-sc-desc-m-m, 0));
          overflow: var(--p-sc-desc-l-ov, var(--p-sc-desc-m-ov, visible));
          clip: var(--p-sc-desc-l-clip, var(--p-sc-desc-m-clip, auto));
          white-space: var(--p-sc-desc-l-ws, var(--p-sc-desc-m-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1760px) {
        .p-segmented-control [data-pds-slot]:not([name]){
          grid-template-columns: var(--p-sc-cols-xl, var(--p-sc-cols-l));
        }
        .p-segmented-control .label-wrapper{
          min-width: var(--p-sc-lw-xl-minw, var(--p-sc-lw-l-minw));
          position: var(--p-sc-lw-xl-pos, var(--p-sc-lw-l-pos, static));
          width: var(--p-sc-lw-xl-w, var(--p-sc-lw-l-w, auto));
          height: var(--p-sc-lw-xl-h, var(--p-sc-lw-l-h, auto));
          padding: var(--p-sc-lw-xl-pad, var(--p-sc-lw-l-pad, 0));
          margin: var(--p-sc-lw-xl-m, var(--p-sc-lw-l-m, 0));
          overflow: var(--p-sc-lw-xl-ov, var(--p-sc-lw-l-ov, visible));
          clip: var(--p-sc-lw-xl-clip, var(--p-sc-lw-l-clip, auto));
          white-space: var(--p-sc-lw-xl-ws, var(--p-sc-lw-l-ws, normal));
        }
        .p-segmented-control .label:is(span){
          position: var(--p-sc-desc-xl-pos, var(--p-sc-desc-l-pos, static));
          width: var(--p-sc-desc-xl-w, var(--p-sc-desc-l-w, auto));
          height: var(--p-sc-desc-xl-h, var(--p-sc-desc-l-h, auto));
          padding: var(--p-sc-desc-xl-pad, var(--p-sc-desc-l-pad, 0));
          margin: var(--p-sc-desc-xl-m, var(--p-sc-desc-l-m, 0));
          overflow: var(--p-sc-desc-xl-ov, var(--p-sc-desc-l-ov, visible));
          clip: var(--p-sc-desc-xl-clip, var(--p-sc-desc-l-clip, auto));
          white-space: var(--p-sc-desc-xl-ws, var(--p-sc-desc-l-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }
      @media (min-width: 1920px) {
        .p-segmented-control [data-pds-slot]:not([name]){
          grid-template-columns: var(--p-sc-cols-xxl, var(--p-sc-cols-xl));
        }
        .p-segmented-control .label-wrapper{
          min-width: var(--p-sc-lw-xxl-minw, var(--p-sc-lw-xl-minw));
          position: var(--p-sc-lw-xxl-pos, var(--p-sc-lw-xl-pos, static));
          width: var(--p-sc-lw-xxl-w, var(--p-sc-lw-xl-w, auto));
          height: var(--p-sc-lw-xxl-h, var(--p-sc-lw-xl-h, auto));
          padding: var(--p-sc-lw-xxl-pad, var(--p-sc-lw-xl-pad, 0));
          margin: var(--p-sc-lw-xxl-m, var(--p-sc-lw-xl-m, 0));
          overflow: var(--p-sc-lw-xxl-ov, var(--p-sc-lw-xl-ov, visible));
          clip: var(--p-sc-lw-xxl-clip, var(--p-sc-lw-xl-clip, auto));
          white-space: var(--p-sc-lw-xxl-ws, var(--p-sc-lw-xl-ws, normal));
        }
        .p-segmented-control .label:is(span){
          position: var(--p-sc-desc-xxl-pos, var(--p-sc-desc-xl-pos, static));
          width: var(--p-sc-desc-xxl-w, var(--p-sc-desc-xl-w, auto));
          height: var(--p-sc-desc-xxl-h, var(--p-sc-desc-xl-h, auto));
          padding: var(--p-sc-desc-xxl-pad, var(--p-sc-desc-xl-pad, 0));
          margin: var(--p-sc-desc-xxl-m, var(--p-sc-desc-xl-m, 0));
          overflow: var(--p-sc-desc-xxl-ov, var(--p-sc-desc-xl-ov, visible));
          clip: var(--p-sc-desc-xxl-clip, var(--p-sc-desc-xl-clip, auto));
          white-space: var(--p-sc-desc-xxl-ws, var(--p-sc-desc-xl-ws, normal));
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
      }`]})],t);export{t as default};
