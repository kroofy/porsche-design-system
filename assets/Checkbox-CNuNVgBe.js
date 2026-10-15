import y from"./Spinner-TTCsUayI.js";import $ from"./Icon-DzSCh0v5.js";import{I as n,C as _,V as C,a as T}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";var S=Object.defineProperty,H=Object.getOwnPropertyDescriptor,i=(a,p,s,r)=>{for(var e=r>1?void 0:r?H(p,s):p,w=a.length-1,b;w>=0;w--)(b=a[w])&&(e=(r?b(p,s,e):b(e))||e);return r&&e&&S(p,s,e),e};const L=`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/></svg>') center/contain no-repeat`,D=`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20,11v2H4v-2h16Z"/></svg>') center/contain no-repeat`,I=["base","xs","s","m","l","xl","xxl"],k=(a,p,s)=>{const r=p==="base"?"--p-cb-lw":`--p-cb-lw-${p}`;if(s){a[`${r}-pos`]="absolute",a[`${r}-w`]="1px",a[`${r}-h`]="1px",a[`${r}-pad`]="0",a[`${r}-m`]="-1px",a[`${r}-ov`]="hidden",a[`${r}-clip`]="rect(0, 0, 0, 0)",a[`${r}-ws`]="nowrap",a[`${r}-minw`]="",a[`${r}-pt`]="",a[`${r}-pis`]="";return}a[`${r}-pos`]="static",a[`${r}-w`]="auto",a[`${r}-h`]="auto",a[`${r}-pad`]="0",a[`${r}-m`]="0",a[`${r}-ov`]="visible",a[`${r}-clip`]="auto",a[`${r}-ws`]="normal",a[`${r}-minw`]="fit-content",a[`${r}-pt`]="max(0px, calc((calc(var(--_p-checkbox-scaling) * 1.75rem) - var(--p-leading-normal)) / 2))",a[`${r}-pis`]="calc(11.2px * (var(--_p-checkbox-scaling) - 0.64285714) + 4px)"};let l=class{get hostStyle(){const a=(c,o)=>{if(c==null)return o;if(c==="")return!0;if(typeof c=="string"&&c.charAt(0)==="{")try{return JSON.parse(c.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return o}return c},p=c=>c===!0||c==="true"||c==="",s=(c,o,u)=>c&&typeof c=="object"?c[o]===void 0?u:c[o]:c,r=p(this.disabled),e=p(this.loading),w=p(this.compact),b=r||e,d=this.state||"none",h=!!(this.message||"")&&(d==="success"||d==="error"),f=!!this.label,t=a(this.hideLabel,!1),m=typeof t=="object"&&t!==null?s(t,"base",!1):t,g={none:{bg:"var(--p-checkbox-background-color, var(--p-color-frosted))",border:"var(--p-checkbox-border-color, var(--p-color-contrast-lower))",hover:"var(--p-checkbox-border-color, var(--p-color-primary))",checked:"var(--p-color-primary)",checkedHover:"var(--p-checkbox-border-color, var(--p-color-contrast-high))",indeterminate:"var(--p-color-primary)",message:""},success:{bg:"var(--p-checkbox-background-color, var(--p-color-success-frosted-soft))",border:"var(--p-checkbox-border-color, var(--p-color-success))",hover:"var(--p-checkbox-border-color, var(--p-color-success))",checked:"var(--p-color-success)",checkedHover:"",indeterminate:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-checkbox-background-color, var(--p-color-error-frosted-soft))",border:"var(--p-checkbox-border-color, var(--p-color-error))",hover:"var(--p-checkbox-border-color, var(--p-color-error))",checked:"var(--p-color-error)",checkedHover:"",indeterminate:"var(--p-color-error)",message:"var(--p-color-error)"}},v=g[d]||g.none,x={"--p-cb-scale":w?"0.64285714":"1","--p-cb-radius":w?"var(--p-radius-md)":"var(--p-radius-lg)","--p-cb-bg":v.bg,"--p-cb-border":v.border,"--p-cb-hover":v.hover,"--p-cb-checked":e?"":v.checked,"--p-cb-checked-hover":!e&&d==="none"?v.checkedHover:"","--p-cb-checked-hover-border":!e&&d==="none"?"transparent":"","--p-cb-indeterminate":e?"":v.indeterminate,"--p-cb-check-mask":e?"":L,"--p-cb-dash-mask":e?"":D,"--p-cb-icon-bg":e?"":"var(--p-checkbox-icon-color, var(--p-color-canvas))","--p-cb-pe":b?"none":"","--p-cb-cursor":b?"not-allowed":"pointer","--p-cb-opacity":r?"0.4":"","--p-cb-fc-border":b?"GrayText":"","--p-cb-spinner-display":e?"":"none","--p-cb-lw-display":f?"":"none","--p-cb-msg":v.message,"--p-cb-msg-opacity":h?"":"0","--p-cb-msg-pos":h?"":"absolute","--p-cb-icon-display":h?"":"none"};if(typeof t=="object"&&t!==null){let c=p(m);for(const o of I)t[o]!==void 0&&(c=p(s(t,o,m))),k(x,o,c)}else k(x,"base",p(m));return x}get labelText(){return this.label||""}get messageText(){const a=this.state||"none",p=this.message||"";return!p||a!=="success"&&a!=="error"?"":p}get iconName(){const a=this.state||"none";return!(this.message||"")||a!=="success"&&a!=="error"?"":a==="error"?"exclamation":"check"}get iconColor(){const a=this.state||"none";return a==="error"?"error":a==="success"?"success":""}get isChecked(){return this.checked===!0||this.checked==="true"||this.checked===""}get isDisabled(){return this.disabled===!0||this.disabled==="true"||this.disabled===""}get ariaDisabled(){const a=this.disabled===!0||this.disabled==="true"||this.disabled==="",p=this.loading===!0||this.loading==="true"||this.loading==="";return a||p?"true":""}get ariaInvalid(){return this.state==="error"?"true":""}get loadingText(){return this.loading===!0||this.loading==="true"||this.loading===""?"Loading":""}};i([n()],l.prototype,"disabled",2);i([n()],l.prototype,"loading",2);i([n()],l.prototype,"compact",2);i([n()],l.prototype,"state",2);i([n()],l.prototype,"message",2);i([n()],l.prototype,"label",2);i([n()],l.prototype,"hideLabel",2);i([n()],l.prototype,"checked",2);l=i([_({selector:"p-checkbox",standalone:!0,imports:[T,$,y],encapsulation:C.None,template:`
    <div class="p-checkbox" data-pds="checkbox" [style]="hostStyle">
    <div class="root">
      <div class="wrapper">
        <div class="input-wrapper">
          <input
            type="checkbox"
            [attr.checked]="(!!isChecked) ? '' : null"
            [attr.disabled]="(!!isDisabled) ? '' : null"
            [attr.aria-invalid]="ariaInvalid"
          />
          <p-spinner class="spinner" aria-hidden="true"></p-spinner>
        </div>
        <div class="label-wrapper">
          <label class="label">{{labelText}}</label>
        </div>
      </div>
      <span class="message"
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
  `,styles:[`.p-checkbox :where([data-pds-slot]){display:contents}

      .p-checkbox {
        display: contents;
      }
      .p-checkbox {
        display: block;
        --_p-checkbox-scaling: var(--p-cb-scale, 1);
      }
      .p-checkbox[hidden] {
        display: none !important;
      }
      .p-checkbox [data-pds-slot="label-after"]{
        display: inline-block;
        vertical-align: top;
      }
      .p-checkbox [data-pds-slot="label-after"] > *{
        margin-inline-start: var(--p-spacing-static-xs) !important;
      }
      .p-checkbox .label-after{
        display: inline-block;
        vertical-align: top;
      }
      .p-checkbox input{
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
        background: var(--p-cb-bg);
        transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          border-color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        border: 1px solid var(--p-cb-border);
        border-radius: var(--p-cb-radius);
        pointer-events: var(--p-cb-pe);
      }
      .p-checkbox input::before{
        content: "";
        grid-area: 1 / 1;
      }
      .p-checkbox input::after{
        content: "";
        margin: calc(
          -1px - max(0px, calc(
                  24px - calc(var(--_p-checkbox-scaling) * 1.75rem)
                ) / 2)
        );
        grid-area: 1 / 1;
      }
      .p-checkbox input:focus-visible{
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-checkbox input:indeterminate::before{
        -webkit-mask: var(--p-cb-dash-mask);
        mask: var(--p-cb-dash-mask);
        background-color: var(--p-cb-indeterminate);
      }
      .p-checkbox input:checked{
        background: var(--p-cb-checked, var(--p-cb-bg));
      }
      .p-checkbox input:checked::before{
        -webkit-mask: var(--p-cb-check-mask);
        mask: var(--p-cb-check-mask);
        background-color: var(--p-cb-icon-bg);
      }
      .p-checkbox .root{
        display: grid;
        row-gap: var(--p-spacing-static-xs);
      }
      .p-checkbox .wrapper{
        position: relative;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
      }
      .p-checkbox .input-wrapper{
        position: relative;
        align-items: center;
        display: grid;
        align-self: flex-start;
        min-height: var(--p-leading-normal);
        cursor: var(--p-cb-cursor, pointer);
        opacity: var(--p-cb-opacity);
      }
      .p-checkbox .spinner,
      .p-checkbox .p-spinner{
        display: var(--p-cb-spinner-display);
      }
      .p-checkbox .spinner{
        --p-spinner-size: calc(
          calc(var(--_p-checkbox-scaling) * 1.75rem) - 2px
        );
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .p-checkbox .label-wrapper{
        display: var(--p-cb-lw-display);
        position: var(--p-cb-lw-pos, static);
        width: var(--p-cb-lw-w, auto);
        height: var(--p-cb-lw-h, auto);
        padding: var(--p-cb-lw-pad, 0);
        margin: var(--p-cb-lw-m, 0);
        overflow: var(--p-cb-lw-ov, visible);
        clip: var(--p-cb-lw-clip, auto);
        white-space: var(--p-cb-lw-ws, normal);
        min-width: var(--p-cb-lw-minw);
        padding-top: var(--p-cb-lw-pt);
        padding-inline-start: var(--p-cb-lw-pis);
      }
      .p-checkbox .label{
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        cursor: var(--p-cb-cursor, pointer);
        color: var(--p-color-primary);
        pointer-events: var(--p-cb-pe);
        opacity: var(--p-cb-opacity);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
        display: inline;
      }
      .p-checkbox .label:empty{
        display: none;
      }
      .p-checkbox .label:is(span){
        cursor: unset;
        font-size: var(--p-typescale-xs);
        color: var(--p-color-contrast-high);
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
      .p-checkbox .label > [data-pds-slot="label"] > *{
        display: inline !important;
      }
      .p-checkbox .required{
        user-select: none;
      }
      .p-checkbox .message{
        display: flex;
        gap: var(--p-spacing-static-xs);
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-cb-msg);
        opacity: var(--p-cb-msg-opacity);
        position: var(--p-cb-msg-pos);
        transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
      }
      .p-checkbox .message:empty{
        opacity: 0;
        position: absolute;
      }
      .p-checkbox .message .p-icon{
        display: var(--p-cb-icon-display);
      }
      .p-checkbox .loading{
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
        .p-checkbox input{
          border-color: var(--p-cb-fc-border);
        }
        .p-checkbox input:focus-visible{
          outline-color: Highlight;
        }
        .p-checkbox input:indeterminate::before{
          background: CanvasText;
        }
        .p-checkbox input:checked::before{
          background: CanvasText;
        }
      }
      @media (hover: hover) {
        .p-checkbox input:hover{
          border-color: var(--p-cb-hover);
        }
        .p-checkbox input:checked:hover{
          background-color: var(--p-cb-checked-hover);
          border-color: var(--p-cb-checked-hover-border);
        }
      }
      @media (min-width: 480px) {
        .p-checkbox .label-wrapper{
          position: var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static));
          width: var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto));
          height: var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto));
          padding: var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0));
          margin: var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0));
          overflow: var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible));
          clip: var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto));
          white-space: var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal));
          min-width: var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw));
          padding-top: var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt));
          padding-inline-start: var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis));
        }
      }
      @media (min-width: 760px) {
        .p-checkbox .label-wrapper{
          position: var(
            --p-cb-lw-s-pos,
            var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static))
          );
          width: var(
            --p-cb-lw-s-w,
            var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto))
          );
          height: var(
            --p-cb-lw-s-h,
            var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto))
          );
          padding: var(
            --p-cb-lw-s-pad,
            var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0))
          );
          margin: var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0)));
          overflow: var(
            --p-cb-lw-s-ov,
            var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible))
          );
          clip: var(
            --p-cb-lw-s-clip,
            var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto))
          );
          white-space: var(
            --p-cb-lw-s-ws,
            var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal))
          );
          min-width: var(
            --p-cb-lw-s-minw,
            var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw))
          );
          padding-top: var(
            --p-cb-lw-s-pt,
            var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt))
          );
          padding-inline-start: var(
            --p-cb-lw-s-pis,
            var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis))
          );
        }
      }
      @media (min-width: 1000px) {
        .p-checkbox .label-wrapper{
          position: var(
            --p-cb-lw-m-pos,
            var(
              --p-cb-lw-s-pos,
              var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static))
            )
          );
          width: var(
            --p-cb-lw-m-w,
            var(--p-cb-lw-s-w, var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto)))
          );
          height: var(
            --p-cb-lw-m-h,
            var(--p-cb-lw-s-h, var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto)))
          );
          padding: var(
            --p-cb-lw-m-pad,
            var(--p-cb-lw-s-pad, var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0)))
          );
          margin: var(
            --p-cb-lw-m-m,
            var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0)))
          );
          overflow: var(
            --p-cb-lw-m-ov,
            var(
              --p-cb-lw-s-ov,
              var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible))
            )
          );
          clip: var(
            --p-cb-lw-m-clip,
            var(
              --p-cb-lw-s-clip,
              var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto))
            )
          );
          white-space: var(
            --p-cb-lw-m-ws,
            var(--p-cb-lw-s-ws, var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal)))
          );
          min-width: var(
            --p-cb-lw-m-minw,
            var(--p-cb-lw-s-minw, var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw)))
          );
          padding-top: var(
            --p-cb-lw-m-pt,
            var(--p-cb-lw-s-pt, var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt)))
          );
          padding-inline-start: var(
            --p-cb-lw-m-pis,
            var(--p-cb-lw-s-pis, var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis)))
          );
        }
      }
      @media (min-width: 1300px) {
        .p-checkbox .label-wrapper{
          position: var(
            --p-cb-lw-l-pos,
            var(
              --p-cb-lw-m-pos,
              var(
                --p-cb-lw-s-pos,
                var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static))
              )
            )
          );
          width: var(
            --p-cb-lw-l-w,
            var(
              --p-cb-lw-m-w,
              var(--p-cb-lw-s-w, var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto)))
            )
          );
          height: var(
            --p-cb-lw-l-h,
            var(
              --p-cb-lw-m-h,
              var(--p-cb-lw-s-h, var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto)))
            )
          );
          padding: var(
            --p-cb-lw-l-pad,
            var(
              --p-cb-lw-m-pad,
              var(--p-cb-lw-s-pad, var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0)))
            )
          );
          margin: var(
            --p-cb-lw-l-m,
            var(
              --p-cb-lw-m-m,
              var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0)))
            )
          );
          overflow: var(
            --p-cb-lw-l-ov,
            var(
              --p-cb-lw-m-ov,
              var(
                --p-cb-lw-s-ov,
                var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible))
              )
            )
          );
          clip: var(
            --p-cb-lw-l-clip,
            var(
              --p-cb-lw-m-clip,
              var(
                --p-cb-lw-s-clip,
                var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto))
              )
            )
          );
          white-space: var(
            --p-cb-lw-l-ws,
            var(
              --p-cb-lw-m-ws,
              var(
                --p-cb-lw-s-ws,
                var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal))
              )
            )
          );
          min-width: var(
            --p-cb-lw-l-minw,
            var(
              --p-cb-lw-m-minw,
              var(--p-cb-lw-s-minw, var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw)))
            )
          );
          padding-top: var(
            --p-cb-lw-l-pt,
            var(
              --p-cb-lw-m-pt,
              var(--p-cb-lw-s-pt, var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt)))
            )
          );
          padding-inline-start: var(
            --p-cb-lw-l-pis,
            var(
              --p-cb-lw-m-pis,
              var(--p-cb-lw-s-pis, var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis)))
            )
          );
        }
      }
      @media (min-width: 1760px) {
        .p-checkbox .label-wrapper{
          position: var(--p-cb-lw-xl-pos, var(--p-cb-lw-l-pos));
          width: var(--p-cb-lw-xl-w, var(--p-cb-lw-l-w));
          height: var(--p-cb-lw-xl-h, var(--p-cb-lw-l-h));
          padding: var(--p-cb-lw-xl-pad, var(--p-cb-lw-l-pad));
          margin: var(--p-cb-lw-xl-m, var(--p-cb-lw-l-m));
          overflow: var(--p-cb-lw-xl-ov, var(--p-cb-lw-l-ov));
          clip: var(--p-cb-lw-xl-clip, var(--p-cb-lw-l-clip));
          white-space: var(--p-cb-lw-xl-ws, var(--p-cb-lw-l-ws));
          min-width: var(--p-cb-lw-xl-minw, var(--p-cb-lw-l-minw));
          padding-top: var(--p-cb-lw-xl-pt, var(--p-cb-lw-l-pt));
          padding-inline-start: var(--p-cb-lw-xl-pis, var(--p-cb-lw-l-pis));
        }
      }
      @media (min-width: 1920px) {
        .p-checkbox .label-wrapper{
          position: var(--p-cb-lw-xxl-pos, var(--p-cb-lw-xl-pos));
          width: var(--p-cb-lw-xxl-w, var(--p-cb-lw-xl-w));
          height: var(--p-cb-lw-xxl-h, var(--p-cb-lw-xl-h));
          padding: var(--p-cb-lw-xxl-pad, var(--p-cb-lw-xl-pad));
          margin: var(--p-cb-lw-xxl-m, var(--p-cb-lw-xl-m));
          overflow: var(--p-cb-lw-xxl-ov, var(--p-cb-lw-xl-ov));
          clip: var(--p-cb-lw-xxl-clip, var(--p-cb-lw-xl-clip));
          white-space: var(--p-cb-lw-xxl-ws, var(--p-cb-lw-xl-ws));
          min-width: var(--p-cb-lw-xxl-minw, var(--p-cb-lw-xl-minw));
          padding-top: var(--p-cb-lw-xxl-pt, var(--p-cb-lw-xl-pt));
          padding-inline-start: var(--p-cb-lw-xxl-pis, var(--p-cb-lw-xl-pis));
        }
      }`]})],l);export{l as default};
