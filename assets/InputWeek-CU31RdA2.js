import{j as a}from"./react-C3neMvrl.js";import{h as _}from"./host-DRskmCSE.js";import G from"./Spinner-DLZl2BeF.js";import I from"./Icon-CUF7WVtc.js";import z from"./ButtonPure-CBGxJhLp.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const b=["base","xs","s","m","l","xl","xxl"],A=(i,p)=>{if(i==null)return p;if(i==="")return!0;if(typeof i=="string"&&i.charAt(0)==="{")try{return JSON.parse(i.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return p}return i},l=i=>i===!0||i==="true"||i==="",f=(i,p,o)=>i&&typeof i=="object"?i[p]===void 0?o:i[p]:i,y=(i,p,o)=>{const n=p==="base"?"--p-it-lw":`--p-it-lw-${p}`,t=p==="base"?"--p-it-desc":`--p-it-desc-${p}`;if(o){i[`${n}-pos`]="absolute",i[`${n}-w`]="1px",i[`${n}-h`]="1px",i[`${n}-pad`]="0",i[`${n}-m`]="-1px",i[`${n}-ov`]="hidden",i[`${n}-clip`]="rect(0, 0, 0, 0)",i[`${n}-ws`]="nowrap",i[`${n}-minw`]="",i[`${t}-pos`]="absolute",i[`${t}-w`]="1px",i[`${t}-h`]="1px",i[`${t}-pad`]="0",i[`${t}-m`]="-1px",i[`${t}-ov`]="hidden",i[`${t}-clip`]="rect(0, 0, 0, 0)",i[`${t}-ws`]="nowrap";return}i[`${n}-pos`]="static",i[`${n}-w`]="auto",i[`${n}-h`]="auto",i[`${n}-pad`]="0",i[`${n}-m`]="0",i[`${n}-ov`]="visible",i[`${n}-clip`]="auto",i[`${n}-ws`]="normal",i[`${n}-minw`]="fit-content",i[`${t}-pos`]="static",i[`${t}-w`]="auto",i[`${t}-h`]="auto",i[`${t}-pad`]="0",i[`${t}-m`]="0",i[`${t}-ov`]="visible",i[`${t}-clip`]="auto",i[`${t}-ws`]="normal"};function D(i){function p(){const e=l(i.disabled),r=l(i.loading),h=l(i.compact),w=l(i.readOnly),u=i.state==="success"||i.state==="error"?i.state:"none",m=!!(i.message||"")&&(u==="success"||u==="error"),s=A(i.hideLabel,!1),g={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},d=g[u]||g.none,x={"--p-it-scale":h?"0.64285714":"1","--p-it-radius":h?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-it-border":w?"transparent":d.border,"--p-it-bg":w?"var(--p-color-frosted)":d.bg,"--p-it-color":w?"var(--p-color-contrast-medium)":"var(--p-color-primary)","--p-it-hover":d.hover,"--p-it-cursor":e?"not-allowed":"text","--p-it-wrap-op":e?"0.4":"","--p-it-child-op":e?"0.4":"","--p-it-label-cursor":e||r?"not-allowed":"pointer","--p-it-pe":e||r?"none":"","--p-it-opacity":e?"0.4":"","--p-it-msg":d.message||"","--p-it-msg-op":m?"":"0","--p-it-msg-pos":m?"":"absolute","--p-it-icon-display":m?"inline-flex":"none","--p-it-spinner-display":r?"inline-flex":"none","--p-it-font":"var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next)"};if(typeof s=="object"&&s!==null){let v=l(f(s,"base",!1));for(const c of b)s[c]!==void 0&&(v=l(f(s,c,!1))),y(x,c,v)}else{const v=l(s);for(const c of b)y(x,c,v)}return x}function o(){return i.label||""}function n(){return i.description||""}function t(){const e=i.state||"none",r=i.message||"";return!r||e!=="success"&&e!=="error"?"":r}function k(){const e=i.state||"none";return!(i.message||"")||e!=="success"&&e!=="error"?"":e==="error"?"exclamation":"check"}function $(){const e=i.state||"none";return e==="error"?"error":e==="success"?"success":""}function j(){return i.value==null?"":String(i.value)}function L(){return i.maxLength==null||i.maxLength===""?"":String(i.maxLength)}function N(){return i.disabled===!0||i.disabled==="true"||i.disabled===""}function T(){return i.readOnly===!0||i.readOnly==="true"||i.readOnly===""}function O(){return i.loading===!0||i.loading==="true"||i.loading===""?"Loading":""}function S(){return i.placeholder||""}return a.jsxs("div",{className:["p-input-week",i.className].filter(Boolean).join(" "),"data-pds":"input-week",style:p(),..._({disabled:i.disabled,loading:i.loading,"read-only":i.readOnly}),children:[a.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-input-week :where([data-pds-slot]){display:contents}

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
            white-space: var(
              --p-it-desc-xxl-ws,
              var(--p-it-desc-xl-ws, normal)
            );
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }`}}),a.jsxs(a.Fragment,{children:[" ",a.jsxs("div",{className:"root",children:[a.jsxs("div",{className:"label-wrapper",children:[a.jsx("label",{className:"label",id:"label",htmlFor:"input-week",children:o()}),a.jsx("span",{"data-pds-slot":"label-after",children:i["label-after"]??null})]}),a.jsx("span",{className:"label",id:"description",children:n()}),a.jsxs("div",{className:"wrapper",children:[a.jsx("span",{"data-pds-slot":"start",children:i.start??null}),a.jsx("input",{type:"week",id:"input-week",dir:"auto",value:j(),placeholder:S(),disabled:!!N(),readOnly:!!T(),maxLength:Number(L())||void 0}),a.jsxs(z,{className:"button",type:"button",icon:"calendar",hideLabel:"true",children:[" ","Open date picker"," "]}),a.jsx("span",{"data-pds-slot":"end",children:i.end??null}),a.jsx(G,{"aria-hidden":"true"})]}),a.jsxs("span",{className:"message",id:"message",children:[a.jsx(I,{"aria-hidden":"true",name:k(),color:$()}),t()]}),a.jsx("span",{className:"loading",id:"loading",role:"status",children:O()})]})," "," "]})]})}export{D as default};
