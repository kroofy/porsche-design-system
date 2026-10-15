import{j as a}from"./react-C3neMvrl.js";import{h as C}from"./host-DRskmCSE.js";import F from"./Spinner-DLZl2BeF.js";import H from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const j=["base","xs","s","m","l","xl","xxl"],R=(t,p)=>{if(t==null)return p;if(t==="")return!0;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return p}return t},r=t=>t===!0||t==="true"||t==="",N=(t,p,o)=>t&&typeof t=="object"?t[p]===void 0?o:t[p]:t,T=(t,p,o)=>{const n=p==="base"?"--p-it-lw":`--p-it-lw-${p}`,e=p==="base"?"--p-it-desc":`--p-it-desc-${p}`;if(o){t[`${n}-pos`]="absolute",t[`${n}-w`]="1px",t[`${n}-h`]="1px",t[`${n}-pad`]="0",t[`${n}-m`]="-1px",t[`${n}-ov`]="hidden",t[`${n}-clip`]="rect(0, 0, 0, 0)",t[`${n}-ws`]="nowrap",t[`${n}-minw`]="",t[`${e}-pos`]="absolute",t[`${e}-w`]="1px",t[`${e}-h`]="1px",t[`${e}-pad`]="0",t[`${e}-m`]="-1px",t[`${e}-ov`]="hidden",t[`${e}-clip`]="rect(0, 0, 0, 0)",t[`${e}-ws`]="nowrap";return}t[`${n}-pos`]="static",t[`${n}-w`]="auto",t[`${n}-h`]="auto",t[`${n}-pad`]="0",t[`${n}-m`]="0",t[`${n}-ov`]="visible",t[`${n}-clip`]="auto",t[`${n}-ws`]="normal",t[`${n}-minw`]="fit-content",t[`${e}-pos`]="static",t[`${e}-w`]="auto",t[`${e}-h`]="auto",t[`${e}-pad`]="0",t[`${e}-m`]="0",t[`${e}-ov`]="visible",t[`${e}-clip`]="auto",t[`${e}-ws`]="normal"};function Y(t){function p(){const i=r(t.disabled),l=r(t.loading),y=r(t.compact),x=r(t.readOnly),A=r(t.counter),m=t.state==="success"||t.state==="error"?t.state:"none",h=!!(t.message||"")&&(m==="success"||m==="error"),s=R(t.hideLabel,!1),$={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},w=$[m]||$.none,g={"--p-it-scale":y?"0.64285714":"1","--p-it-radius":y?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-it-border":x?"transparent":w.border,"--p-it-bg":x?"var(--p-color-frosted)":w.bg,"--p-it-color":x?"var(--p-color-contrast-medium)":"var(--p-color-primary)","--p-it-hover":w.hover,"--p-it-cursor":i?"not-allowed":"text","--p-it-wrap-op":i?"0.4":"","--p-it-child-op":i?"0.4":"","--p-it-label-cursor":i||l?"not-allowed":"pointer","--p-it-pe":i||l?"none":"","--p-it-opacity":i?"0.4":"","--p-it-msg":w.message||"","--p-it-msg-op":h?"":"0","--p-it-msg-pos":h?"":"absolute","--p-it-icon-display":h?"inline-flex":"none","--p-it-spinner-display":l?"inline-flex":"none","--p-it-counter-display":A?"":"none","--p-it-font":"var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next)"};if(typeof s=="object"&&s!==null){let u=r(N(s,"base",!1));for(const v of j)s[v]!==void 0&&(u=r(N(s,v,!1))),T(g,v,u)}else{const u=r(s);for(const v of j)T(g,v,u)}return g}function o(){return t.label||""}function n(){return t.description||""}function e(){const i=t.state||"none",l=t.message||"";return!l||i!=="success"&&i!=="error"?"":l}function L(){const i=t.state||"none";return!(t.message||"")||i!=="success"&&i!=="error"?"":i==="error"?"exclamation":"check"}function S(){const i=t.state||"none";return i==="error"?"error":i==="success"?"success":""}function c(){return t.value==null?"":String(t.value)}function b(){return t.maxLength==null||t.maxLength===""?"":String(t.maxLength)}function d(){const i=Number.parseInt(b(),10);return Number.isFinite(i)?i:0}function f(){return t.counter===!0||t.counter==="true"||t.counter===""}function O(){return f()?d()?`${c().length}/${d()}`:`${c().length}`:""}function _(){return f()?d()?`You have ${d()-c().length} out of ${d()} characters left`:`${c().length} characters entered`:""}function k(){return t.disabled===!0||t.disabled==="true"||t.disabled===""}function I(){return t.readOnly===!0||t.readOnly==="true"||t.readOnly===""}function z(){return t.loading===!0||t.loading==="true"||t.loading===""?"Loading":""}function G(){return t.placeholder||""}return a.jsxs("div",{className:["p-input-text",t.className].filter(Boolean).join(" "),"data-pds":"input-text",style:p(),...C({disabled:t.disabled,loading:t.loading,"read-only":t.readOnly}),children:[a.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-input-text :where([data-pds-slot]){display:contents}

        .p-input-text {
          display: block;
          --_p-input-base-a: var(--p-it-scale, 1);
          --ref-p-input-slotted-padding: calc(
            11.2px * (var(--_p-input-base-a) - 0.64285714)
          ) !important;
          --ref-p-input-slotted-margin: calc(
            -1 * calc(11.2px * (var(--_p-input-base-a) - 0.64285714))
          ) !important;
        }
        .p-input-text[hidden] {
          display: none !important;
        }
        .p-input-text:dir(rtl) input::placeholder {
          direction: rtl;
          text-align: end;
        }
        .p-input-text [data-pds-slot="label-after"]{
          display: inline-block;
          vertical-align: top;
        }
        .p-input-text [data-pds-slot="label-after"] > *{
          margin-inline-start: var(--p-spacing-static-xs) !important;
        }
        .p-input-text .label-after{
          display: inline-block;
          vertical-align: top;
        }
        .p-input-text input{
          all: unset;
          display: flex;
          flex: 1;
          align-items: center;
          width: max(100%, 2ch);
          height: 100%;
          font: var(--p-it-font);
          text-overflow: ellipsis;
        }
        .p-input-text .root{
          display: grid;
          gap: var(--p-spacing-static-xs);
        }
        .p-input-text .wrapper{
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
        .p-input-text .wrapper > *{
          opacity: var(--p-it-child-op);
        }
        .p-input-text .wrapper:not(:has(input:disabled)):focus-within{
          border-color: var(--p-it-hover);
        }
        .p-input-text .label-wrapper{
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
        .p-input-text .label{
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
        .p-input-text .label:empty{
          display: none;
        }
        .p-input-text .label:is(span){
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
        .p-input-text .label > [data-pds-slot="label"] > *{
          display: inline !important;
        }
        .p-input-text .required{
          user-select: none;
        }
        .p-input-text .message{
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
        .p-input-text .message:empty{
          opacity: 0;
          position: absolute;
        }
        .p-input-text .message .p-icon{
          display: var(--p-it-icon-display, none);
        }
        .p-input-text .p-spinner{
          display: var(--p-it-spinner-display, none);
        }
        .p-input-text .loading{
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }
        .p-input-text .counter{
          pointer-events: none;
          max-width: 100%;
          box-sizing: border-box;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-color-contrast-high);
          display: var(--p-it-counter-display);
        }
        .p-input-text .sr-only{
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
          .p-input-text .wrapper:not(:has(input:disabled)):focus-within{
            outline: 2px solid Highlight;
            outline-offset: 2px;
          }
          .p-input-text[disabled] .wrapper {
            opacity: 1;
            color: GrayText;
            border-color: GrayText;
          }
          .p-input-text[disabled] .wrapper > * {
            opacity: 1;
            color: GrayText;
          }
          .p-input-text[disabled] .label {
            opacity: 1;
            color: GrayText;
          }
        }
        @media (hover: hover) {
          .p-input-text:not([disabled]):not([read-only]):not([loading])
            .wrapper:hover:not(.button:hover),
          .p-input-text:not([disabled]):not([read-only]):not([loading])
            .label-wrapper:hover
            ~ .wrapper {
            border-color: var(--p-it-hover);
          }
        }
        @media (min-width: 480px) {
          .p-input-text .label-wrapper{
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
          .p-input-text .label:is(span){
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
          .p-input-text .label-wrapper{
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
            margin: var(
              --p-it-lw-s-m,
              var(--p-it-lw-xs-m, var(--p-it-lw-m, 0))
            );
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
          .p-input-text .label:is(span){
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
          .p-input-text .label-wrapper{
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
          .p-input-text .label:is(span){
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
          .p-input-text .label-wrapper{
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
          .p-input-text .label:is(span){
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
          .p-input-text .label-wrapper{
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
          .p-input-text .label:is(span){
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
          .p-input-text .label-wrapper{
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
          .p-input-text .label:is(span){
            position: var(--p-it-desc-xxl-pos, var(--p-it-desc-xl-pos, static));
            width: var(--p-it-desc-xxl-w, var(--p-it-desc-xl-w, auto));
            height: var(--p-it-desc-xxl-h, var(--p-it-desc-xl-h, auto));
            padding: var(--p-it-desc-xxl-pad, var(--p-it-desc-xl-pad, 0));
            margin: var(--p-it-desc-xxl-m, var(--p-it-desc-xl-m, 0));
            overflow: var(--p-it-desc-xxl-ov, var(--p-it-desc-xl-ov, visible));
            clip: var(--p-it-desc-xxl-clip, var(--p-it-desc-xl-clip, auto));
            white-space: var(
              --p-it-desc-xxl-ws,
              var(--p-it-desc-xl-ws, normal)
            );
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }`}}),a.jsxs(a.Fragment,{children:[" ",a.jsxs("div",{className:"root",children:[a.jsxs("div",{className:"label-wrapper",children:[a.jsx("label",{className:"label",id:"label",htmlFor:"input-text",children:o()}),a.jsx("span",{"data-pds-slot":"label-after",children:t["label-after"]??null})]}),a.jsx("span",{className:"label",id:"description",children:n()}),a.jsxs("div",{className:"wrapper",children:[a.jsx("span",{"data-pds-slot":"start",children:t.start??null}),a.jsx("input",{type:"text",id:"input-text",dir:"auto",value:c(),placeholder:G(),disabled:!!k(),readOnly:!!I(),maxLength:Number(b())||void 0}),a.jsx("span",{className:"sr-only","aria-live":"polite",children:_()}),a.jsx("span",{className:"counter","aria-hidden":"true",children:O()}),a.jsx("span",{"data-pds-slot":"end",children:t.end??null}),a.jsx(F,{"aria-hidden":"true"})]}),a.jsxs("span",{className:"message",id:"message",children:[a.jsx(H,{"aria-hidden":"true",name:L(),color:S()}),e()]}),a.jsx("span",{className:"loading",id:"loading",role:"status",children:z()})]})," "," "]})]})}export{Y as default};
