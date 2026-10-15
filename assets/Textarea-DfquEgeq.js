import{j as r}from"./react-C3neMvrl.js";import{h as A}from"./host-DRskmCSE.js";import R from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const y=["base","xs","s","m","l","xl","xxl"],C=(a,l)=>{if(a==null)return l;if(a==="")return!0;if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return l}return a},s=a=>a===!0||a==="true"||a==="",$=(a,l,o)=>a&&typeof a=="object"?a[l]===void 0?o:a[l]:a,L=(a,l,o)=>{const n=l==="base"?"--p-ta-lw":`--p-ta-lw-${l}`,e=l==="base"?"--p-ta-desc":`--p-ta-desc-${l}`;if(o){a[`${n}-pos`]="absolute",a[`${n}-w`]="1px",a[`${n}-h`]="1px",a[`${n}-pad`]="0",a[`${n}-m`]="-1px",a[`${n}-ov`]="hidden",a[`${n}-clip`]="rect(0, 0, 0, 0)",a[`${n}-ws`]="nowrap",a[`${n}-minw`]="",a[`${e}-pos`]="absolute",a[`${e}-w`]="1px",a[`${e}-h`]="1px",a[`${e}-pad`]="0",a[`${e}-m`]="-1px",a[`${e}-ov`]="hidden",a[`${e}-clip`]="rect(0, 0, 0, 0)",a[`${e}-ws`]="nowrap";return}a[`${n}-pos`]="static",a[`${n}-w`]="auto",a[`${n}-h`]="auto",a[`${n}-pad`]="0",a[`${n}-m`]="0",a[`${n}-ov`]="visible",a[`${n}-clip`]="auto",a[`${n}-ws`]="normal",a[`${n}-minw`]="fit-content",a[`${e}-pos`]="static",a[`${e}-w`]="auto",a[`${e}-h`]="auto",a[`${e}-pad`]="0",a[`${e}-m`]="0",a[`${e}-ov`]="visible",a[`${e}-clip`]="auto",a[`${e}-ws`]="normal"};function K(a){function l(){const t=s(a.disabled),p=s(a.compact),w=s(a.readOnly),g=s(a.counter),I=a.resize||"vertical",m=a.state==="success"||a.state==="error"?a.state:"none",x=!!(a.message||"")&&(m==="success"||m==="error"),i=C(a.hideLabel,!1),f={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},v=f[m]||f.none,b="calc(28px * (var(--_p-textarea-a) - 0.64285714) + 5px)",h="calc(22.4px * (var(--_p-textarea-a) - 0.64285714) + 8px)",u={"--p-ta-scale":p?"0.64285714":"1","--p-ta-resize":I,"--p-ta-radius":p?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-ta-border":w?"transparent":v.border,"--p-ta-bg":w?"var(--p-color-frosted)":v.bg,"--p-ta-color":w?"var(--p-color-contrast-medium)":"var(--p-color-primary)","--p-ta-hover":v.hover,"--p-ta-pad":g?b+" "+h+" "+"calc(var(--p-leading-normal) + calc(22.4px * (var(--_p-textarea-a) - 0.64285714) + 4px))":b+" "+h,"--p-ta-cursor":t?"not-allowed":"text","--p-ta-wrap-op":t?"0.4":"","--p-ta-label-cursor":t?"not-allowed":"pointer","--p-ta-pe":t?"none":"","--p-ta-opacity":t?"0.4":"","--p-ta-fc-op":t?"1":"","--p-ta-fc-color":t?"GrayText":"","--p-ta-msg":v.message||"","--p-ta-msg-op":x?"":"0","--p-ta-msg-pos":x?"":"absolute","--p-ta-icon-display":x?"inline-flex":"none","--p-ta-counter-display":g?"":"none","--p-ta-counter-me":h};if(typeof i=="object"&&i!==null){let d=s($(i,"base",!1));for(const c of y)i[c]!==void 0&&(d=s($(i,c,!1))),L(u,c,d)}else{const d=s(i);for(const c of y)L(u,c,d)}return u}function o(){return a.label||""}function n(){return a.description||""}function e(){const t=a.state||"none",p=a.message||"";return!p||t!=="success"&&t!=="error"?"":p}function j(){const t=a.state||"none";return!(a.message||"")||t!=="success"&&t!=="error"?"":t==="error"?"exclamation":"check"}function N(){const t=a.state||"none";return t==="error"?"error":t==="success"?"success":""}function S(){return a.value==null?"":String(a.value)}function z(){return a.maxLength==null||a.maxLength===""?"":String(a.maxLength)}function O(){const t=a.value==null?"":String(a.value),p=a.maxLength==null||a.maxLength===""?"":String(a.maxLength);return p?t.length+"/"+p:String(t.length)}function T(){const t=a.value==null?"":String(a.value),p=a.maxLength==null||a.maxLength===""?"":String(a.maxLength);return p?"You have "+(Number(p)-t.length)+" out of "+p+" characters left":t.length+" characters entered"}function _(){return a.disabled===!0||a.disabled==="true"||a.disabled===""}function k(){return a.readOnly===!0||a.readOnly==="true"||a.readOnly===""}function B(){return a.placeholder||""}return r.jsxs("div",{className:["p-textarea",a.className].filter(Boolean).join(" "),"data-pds":"textarea",style:l(),...A({disabled:a.disabled,"read-only":a.readOnly}),children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-textarea :where([data-pds-slot]){display:contents}

        .p-textarea {
          display: block;
          --_p-textarea-a: var(--p-ta-scale, 1);
        }
        .p-textarea[hidden] {
          display: none !important;
        }
        .p-textarea [data-pds-slot="label-after"]{
          display: inline-block;
          vertical-align: top;
        }
        .p-textarea [data-pds-slot="label-after"] > *{
          margin-inline-start: var(--p-spacing-static-xs) !important;
        }
        .p-textarea .label-after{
          display: inline-block;
          vertical-align: top;
        }
        .p-textarea textarea{
          all: unset;
          grid-area: 1 / 1;
          display: block;
          resize: var(--p-ta-resize, vertical);
          field-sizing: var(--p-textarea-field-sizing, unset);
          min-width: var(--p-textarea-min-width, 2ch);
          max-width: var(--p-textarea-max-width, unset);
          min-height: var(
            --p-textarea-min-height,
            calc(var(--_p-textarea-a) * 3.5rem)
          );
          max-height: var(--p-textarea-max-height, unset);
          border: 1px solid var(--p-ta-border);
          border-radius: var(--p-ta-radius, var(--p-radius-xl));
          background: var(--p-ta-bg);
          color: var(--p-ta-color);
          box-sizing: border-box;
          transition: background-color
              var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            border-color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          padding: var(--p-ta-pad);
          cursor: var(--p-ta-cursor, text);
        }
        .p-textarea textarea:focus{
          border-color: var(--p-ta-hover);
        }
        .p-textarea .root{
          display: grid;
          gap: var(--p-spacing-static-xs);
        }
        .p-textarea .wrapper{
          display: grid;
          opacity: var(--p-ta-wrap-op);
        }
        .p-textarea .counter{
          pointer-events: none;
          max-width: 100%;
          box-sizing: border-box;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-color-contrast-high);
          grid-area: 1 / 1;
          place-self: flex-end;
          margin-inline-end: var(--p-ta-counter-me);
          margin-bottom: calc(
            11.2px * (var(--_p-textarea-a) - 0.64285714) + 4px
          );
          display: var(--p-ta-counter-display);
        }
        .p-textarea .sr-only{
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          display: var(--p-ta-counter-display);
        }
        .p-textarea .label-wrapper{
          min-width: var(--p-ta-lw-minw);
          position: var(--p-ta-lw-pos, static);
          width: var(--p-ta-lw-w, auto);
          height: var(--p-ta-lw-h, auto);
          padding: var(--p-ta-lw-pad, 0);
          margin: var(--p-ta-lw-m, 0);
          overflow: var(--p-ta-lw-ov, visible);
          clip: var(--p-ta-lw-clip, auto);
          white-space: var(--p-ta-lw-ws, normal);
        }
        .p-textarea .label{
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          cursor: var(--p-ta-label-cursor, pointer);
          color: var(--p-color-primary);
          pointer-events: var(--p-ta-pe);
          opacity: var(--p-ta-opacity);
          transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
          display: inline;
        }
        .p-textarea .label:empty{
          display: none;
        }
        .p-textarea .label:is(span){
          cursor: unset;
          font-size: var(--p-typescale-xs);
          color: var(--p-color-contrast-high);
          min-width: unset;
          position: var(--p-ta-desc-pos, static);
          width: var(--p-ta-desc-w, auto);
          height: var(--p-ta-desc-h, auto);
          padding: var(--p-ta-desc-pad, 0);
          margin: var(--p-ta-desc-m, 0);
          overflow: var(--p-ta-desc-ov, visible);
          clip: var(--p-ta-desc-clip, auto);
          white-space: var(--p-ta-desc-ws, normal);
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
        .p-textarea .label > [data-pds-slot="label"] > *{
          display: inline !important;
        }
        .p-textarea .required{
          user-select: none;
        }
        .p-textarea .message{
          display: flex;
          gap: var(--p-spacing-static-xs);
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-ta-msg, inherit);
          opacity: var(--p-ta-msg-op);
          position: var(--p-ta-msg-pos);
          transition: color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            opacity var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
        }
        .p-textarea .message:empty{
          opacity: 0;
          position: absolute;
        }
        .p-textarea .message .p-icon{
          display: var(--p-ta-icon-display, none);
        }
        @media (forced-colors: active) {
          .p-textarea .wrapper{
            opacity: var(--p-ta-fc-op, var(--p-ta-wrap-op, 1));
            color: var(--p-ta-fc-color, inherit);
          }
          .p-textarea .label{
            opacity: var(--p-ta-fc-op, var(--p-ta-opacity, 1));
            color: var(--p-ta-fc-color, var(--p-color-primary));
          }
        }
        @media (hover: hover) {
          .p-textarea:not([disabled]):not([read-only]) textarea:hover,
          .p-textarea:not([disabled]):not([read-only])
            .label-wrapper:hover
            ~ textarea {
            border-color: var(--p-ta-hover);
          }
        }
        @media (min-width: 480px) {
          .p-textarea .label-wrapper{
            min-width: var(--p-ta-lw-xs-minw, var(--p-ta-lw-minw));
            position: var(--p-ta-lw-xs-pos, var(--p-ta-lw-pos, static));
            width: var(--p-ta-lw-xs-w, var(--p-ta-lw-w, auto));
            height: var(--p-ta-lw-xs-h, var(--p-ta-lw-h, auto));
            padding: var(--p-ta-lw-xs-pad, var(--p-ta-lw-pad, 0));
            margin: var(--p-ta-lw-xs-m, var(--p-ta-lw-m, 0));
            overflow: var(--p-ta-lw-xs-ov, var(--p-ta-lw-ov, visible));
            clip: var(--p-ta-lw-xs-clip, var(--p-ta-lw-clip, auto));
            white-space: var(--p-ta-lw-xs-ws, var(--p-ta-lw-ws, normal));
          }
          .p-textarea .label:is(span){
            position: var(--p-ta-desc-xs-pos, var(--p-ta-desc-pos, static));
            width: var(--p-ta-desc-xs-w, var(--p-ta-desc-w, auto));
            height: var(--p-ta-desc-xs-h, var(--p-ta-desc-h, auto));
            padding: var(--p-ta-desc-xs-pad, var(--p-ta-desc-pad, 0));
            margin: var(--p-ta-desc-xs-m, var(--p-ta-desc-m, 0));
            overflow: var(--p-ta-desc-xs-ov, var(--p-ta-desc-ov, visible));
            clip: var(--p-ta-desc-xs-clip, var(--p-ta-desc-clip, auto));
            white-space: var(--p-ta-desc-xs-ws, var(--p-ta-desc-ws, normal));
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 760px) {
          .p-textarea .label-wrapper{
            min-width: var(
              --p-ta-lw-s-minw,
              var(--p-ta-lw-xs-minw, var(--p-ta-lw-minw))
            );
            position: var(
              --p-ta-lw-s-pos,
              var(--p-ta-lw-xs-pos, var(--p-ta-lw-pos, static))
            );
            width: var(
              --p-ta-lw-s-w,
              var(--p-ta-lw-xs-w, var(--p-ta-lw-w, auto))
            );
            height: var(
              --p-ta-lw-s-h,
              var(--p-ta-lw-xs-h, var(--p-ta-lw-h, auto))
            );
            padding: var(
              --p-ta-lw-s-pad,
              var(--p-ta-lw-xs-pad, var(--p-ta-lw-pad, 0))
            );
            margin: var(
              --p-ta-lw-s-m,
              var(--p-ta-lw-xs-m, var(--p-ta-lw-m, 0))
            );
            overflow: var(
              --p-ta-lw-s-ov,
              var(--p-ta-lw-xs-ov, var(--p-ta-lw-ov, visible))
            );
            clip: var(
              --p-ta-lw-s-clip,
              var(--p-ta-lw-xs-clip, var(--p-ta-lw-clip, auto))
            );
            white-space: var(
              --p-ta-lw-s-ws,
              var(--p-ta-lw-xs-ws, var(--p-ta-lw-ws, normal))
            );
          }
          .p-textarea .label:is(span){
            position: var(
              --p-ta-desc-s-pos,
              var(--p-ta-desc-xs-pos, var(--p-ta-desc-pos, static))
            );
            width: var(
              --p-ta-desc-s-w,
              var(--p-ta-desc-xs-w, var(--p-ta-desc-w, auto))
            );
            height: var(
              --p-ta-desc-s-h,
              var(--p-ta-desc-xs-h, var(--p-ta-desc-h, auto))
            );
            padding: var(
              --p-ta-desc-s-pad,
              var(--p-ta-desc-xs-pad, var(--p-ta-desc-pad, 0))
            );
            margin: var(
              --p-ta-desc-s-m,
              var(--p-ta-desc-xs-m, var(--p-ta-desc-m, 0))
            );
            overflow: var(
              --p-ta-desc-s-ov,
              var(--p-ta-desc-xs-ov, var(--p-ta-desc-ov, visible))
            );
            clip: var(
              --p-ta-desc-s-clip,
              var(--p-ta-desc-xs-clip, var(--p-ta-desc-clip, auto))
            );
            white-space: var(
              --p-ta-desc-s-ws,
              var(--p-ta-desc-xs-ws, var(--p-ta-desc-ws, normal))
            );
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1000px) {
          .p-textarea .label-wrapper{
            min-width: var(--p-ta-lw-m-minw, var(--p-ta-lw-s-minw));
            position: var(--p-ta-lw-m-pos, var(--p-ta-lw-s-pos, static));
            width: var(--p-ta-lw-m-w, var(--p-ta-lw-s-w, auto));
            height: var(--p-ta-lw-m-h, var(--p-ta-lw-s-h, auto));
            padding: var(--p-ta-lw-m-pad, var(--p-ta-lw-s-pad, 0));
            margin: var(--p-ta-lw-m-m, var(--p-ta-lw-s-m, 0));
            overflow: var(--p-ta-lw-m-ov, var(--p-ta-lw-s-ov, visible));
            clip: var(--p-ta-lw-m-clip, var(--p-ta-lw-s-clip, auto));
            white-space: var(--p-ta-lw-m-ws, var(--p-ta-lw-s-ws, normal));
          }
          .p-textarea .label:is(span){
            position: var(--p-ta-desc-m-pos, var(--p-ta-desc-s-pos, static));
            width: var(--p-ta-desc-m-w, var(--p-ta-desc-s-w, auto));
            height: var(--p-ta-desc-m-h, var(--p-ta-desc-s-h, auto));
            padding: var(--p-ta-desc-m-pad, var(--p-ta-desc-s-pad, 0));
            margin: var(--p-ta-desc-m-m, var(--p-ta-desc-s-m, 0));
            overflow: var(--p-ta-desc-m-ov, var(--p-ta-desc-s-ov, visible));
            clip: var(--p-ta-desc-m-clip, var(--p-ta-desc-s-clip, auto));
            white-space: var(--p-ta-desc-m-ws, var(--p-ta-desc-s-ws, normal));
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1300px) {
          .p-textarea .label-wrapper{
            min-width: var(--p-ta-lw-l-minw, var(--p-ta-lw-m-minw));
            position: var(--p-ta-lw-l-pos, var(--p-ta-lw-m-pos, static));
            width: var(--p-ta-lw-l-w, var(--p-ta-lw-m-w, auto));
            height: var(--p-ta-lw-l-h, var(--p-ta-lw-m-h, auto));
            padding: var(--p-ta-lw-l-pad, var(--p-ta-lw-m-pad, 0));
            margin: var(--p-ta-lw-l-m, var(--p-ta-lw-m-m, 0));
            overflow: var(--p-ta-lw-l-ov, var(--p-ta-lw-m-ov, visible));
            clip: var(--p-ta-lw-l-clip, var(--p-ta-lw-m-clip, auto));
            white-space: var(--p-ta-lw-l-ws, var(--p-ta-lw-m-ws, normal));
          }
          .p-textarea .label:is(span){
            position: var(--p-ta-desc-l-pos, var(--p-ta-desc-m-pos, static));
            width: var(--p-ta-desc-l-w, var(--p-ta-desc-m-w, auto));
            height: var(--p-ta-desc-l-h, var(--p-ta-desc-m-h, auto));
            padding: var(--p-ta-desc-l-pad, var(--p-ta-desc-m-pad, 0));
            margin: var(--p-ta-desc-l-m, var(--p-ta-desc-m-m, 0));
            overflow: var(--p-ta-desc-l-ov, var(--p-ta-desc-m-ov, visible));
            clip: var(--p-ta-desc-l-clip, var(--p-ta-desc-m-clip, auto));
            white-space: var(--p-ta-desc-l-ws, var(--p-ta-desc-m-ws, normal));
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1760px) {
          .p-textarea .label-wrapper{
            min-width: var(--p-ta-lw-xl-minw, var(--p-ta-lw-l-minw));
            position: var(--p-ta-lw-xl-pos, var(--p-ta-lw-l-pos, static));
            width: var(--p-ta-lw-xl-w, var(--p-ta-lw-l-w, auto));
            height: var(--p-ta-lw-xl-h, var(--p-ta-lw-l-h, auto));
            padding: var(--p-ta-lw-xl-pad, var(--p-ta-lw-l-pad, 0));
            margin: var(--p-ta-lw-xl-m, var(--p-ta-lw-l-m, 0));
            overflow: var(--p-ta-lw-xl-ov, var(--p-ta-lw-l-ov, visible));
            clip: var(--p-ta-lw-xl-clip, var(--p-ta-lw-l-clip, auto));
            white-space: var(--p-ta-lw-xl-ws, var(--p-ta-lw-l-ws, normal));
          }
          .p-textarea .label:is(span){
            position: var(--p-ta-desc-xl-pos, var(--p-ta-desc-l-pos, static));
            width: var(--p-ta-desc-xl-w, var(--p-ta-desc-l-w, auto));
            height: var(--p-ta-desc-xl-h, var(--p-ta-desc-l-h, auto));
            padding: var(--p-ta-desc-xl-pad, var(--p-ta-desc-l-pad, 0));
            margin: var(--p-ta-desc-xl-m, var(--p-ta-desc-l-m, 0));
            overflow: var(--p-ta-desc-xl-ov, var(--p-ta-desc-l-ov, visible));
            clip: var(--p-ta-desc-xl-clip, var(--p-ta-desc-l-clip, auto));
            white-space: var(--p-ta-desc-xl-ws, var(--p-ta-desc-l-ws, normal));
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1920px) {
          .p-textarea .label-wrapper{
            min-width: var(--p-ta-lw-xxl-minw, var(--p-ta-lw-xl-minw));
            position: var(--p-ta-lw-xxl-pos, var(--p-ta-lw-xl-pos, static));
            width: var(--p-ta-lw-xxl-w, var(--p-ta-lw-xl-w, auto));
            height: var(--p-ta-lw-xxl-h, var(--p-ta-lw-xl-h, auto));
            padding: var(--p-ta-lw-xxl-pad, var(--p-ta-lw-xl-pad, 0));
            margin: var(--p-ta-lw-xxl-m, var(--p-ta-lw-xl-m, 0));
            overflow: var(--p-ta-lw-xxl-ov, var(--p-ta-lw-xl-ov, visible));
            clip: var(--p-ta-lw-xxl-clip, var(--p-ta-lw-xl-clip, auto));
            white-space: var(--p-ta-lw-xxl-ws, var(--p-ta-lw-xl-ws, normal));
          }
          .p-textarea .label:is(span){
            position: var(--p-ta-desc-xxl-pos, var(--p-ta-desc-xl-pos, static));
            width: var(--p-ta-desc-xxl-w, var(--p-ta-desc-xl-w, auto));
            height: var(--p-ta-desc-xxl-h, var(--p-ta-desc-xl-h, auto));
            padding: var(--p-ta-desc-xxl-pad, var(--p-ta-desc-xl-pad, 0));
            margin: var(--p-ta-desc-xxl-m, var(--p-ta-desc-xl-m, 0));
            overflow: var(--p-ta-desc-xxl-ov, var(--p-ta-desc-xl-ov, visible));
            clip: var(--p-ta-desc-xxl-clip, var(--p-ta-desc-xl-clip, auto));
            white-space: var(
              --p-ta-desc-xxl-ws,
              var(--p-ta-desc-xl-ws, normal)
            );
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }`}}),r.jsxs(r.Fragment,{children:[" ",r.jsxs("div",{className:"root",children:[r.jsxs("div",{className:"label-wrapper",children:[r.jsx("label",{className:"label",id:"label",htmlFor:"textarea",children:o()}),r.jsx("span",{"data-pds-slot":"label-after",children:a["label-after"]??null})]}),r.jsx("span",{className:"label",id:"description",children:n()}),r.jsxs("div",{className:"wrapper",children:[r.jsx("textarea",{id:"textarea",value:S(),placeholder:B(),disabled:!!_(),readOnly:!!k(),maxLength:Number(z())||void 0}),r.jsx("span",{className:"sr-only","aria-live":"polite",children:T()}),r.jsx("span",{className:"counter","aria-hidden":"true",children:O()})]}),r.jsxs("span",{className:"message",id:"message",children:[r.jsx(R,{"aria-hidden":"true",name:j(),color:N()}),e()]})]})," "," "]})]})}export{K as default};
