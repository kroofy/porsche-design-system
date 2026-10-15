import{j as l}from"./react-C3neMvrl.js";import{h as $}from"./host-DRskmCSE.js";import u from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const g=["base","xs","s","m","l","xl","xxl"],j=(e,a)=>{if(e==null)return a;if(e==="")return!0;if(typeof e=="string"&&e.charAt(0)==="{")try{return JSON.parse(e.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return a}return e},c=e=>e===!0||e==="true"||e==="",b=(e,a,o)=>e&&typeof e=="object"?e[a]===void 0?o:e[a]:e,f=(e,a,o)=>{const s=a==="base"?"--p-sel-lw":`--p-sel-lw-${a}`,n=a==="base"?"--p-sel-desc":`--p-sel-desc-${a}`;if(o){e[`${s}-pos`]="absolute",e[`${s}-w`]="1px",e[`${s}-h`]="1px",e[`${s}-pad`]="0",e[`${s}-m`]="-1px",e[`${s}-ov`]="hidden",e[`${s}-clip`]="rect(0, 0, 0, 0)",e[`${s}-ws`]="nowrap",e[`${s}-minw`]="",e[`${n}-pos`]="absolute",e[`${n}-w`]="1px",e[`${n}-h`]="1px",e[`${n}-pad`]="0",e[`${n}-m`]="-1px",e[`${n}-ov`]="hidden",e[`${n}-clip`]="rect(0, 0, 0, 0)",e[`${n}-ws`]="nowrap";return}e[`${s}-pos`]="static",e[`${s}-w`]="auto",e[`${s}-h`]="auto",e[`${s}-pad`]="0",e[`${s}-m`]="0",e[`${s}-ov`]="visible",e[`${s}-clip`]="auto",e[`${s}-ws`]="normal",e[`${s}-minw`]="fit-content",e[`${n}-pos`]="static",e[`${n}-w`]="auto",e[`${n}-h`]="auto",e[`${n}-pad`]="0",e[`${n}-m`]="0",e[`${n}-ov`]="visible",e[`${n}-clip`]="auto",e[`${n}-ws`]="normal"};function H(e){function a(){const p=c(e.disabled),t=c(e.compact),w=e.state==="success"||e.state==="error"?e.state:"none",m=!!(e.message||"")&&(w==="success"||w==="error"),r=j(e.hideLabel,!1),h={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},v=h[w]||h.none,x={"--p-sel-scale":t?"0.64285714":"1","--p-sel-radius":t?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-sel-bg":v.bg,"--p-sel-border":v.border,"--p-sel-hover":v.hover,"--p-sel-btn-cursor":p?"not-allowed":"pointer","--p-sel-btn-op":p?"0.4":"","--p-sel-btn-fc-op":p?"1":"","--p-sel-btn-fc-color":p?"GrayText":"","--p-sel-cursor":p?"not-allowed":"pointer","--p-sel-pe":p?"none":"","--p-sel-opacity":p?"0.4":"","--p-sel-fc-opacity":p?"1":"","--p-sel-fc-color":p?"GrayText":"","--p-sel-msg":v.message||"","--p-sel-msg-op":m?"":"0","--p-sel-msg-pos":m?"":"absolute","--p-sel-icon-display":m?"inline-flex":"none"};if(typeof r=="object"&&r!==null){let d=c(b(r,"base",!1));for(const i of g)r[i]!==void 0&&(d=c(b(r,i,!1))),f(x,i,d)}else{const d=c(r);for(const i of g)f(x,i,d)}return x}function o(){return e.label||""}function s(){return e.description||""}function n(){const p=e.state||"none",t=e.message||"";return!t||p!=="success"&&p!=="error"?"":t}function y(){return""}return l.jsxs("div",{className:["p-select",e.className].filter(Boolean).join(" "),"data-pds":"select",style:a(),...$({disabled:e.disabled}),children:[l.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-select :where([data-pds-slot]){display:contents}

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .p-select {
          display: block;
          --_p-select-a: var(--p-sel-scale, 1) !important;
          --_p-select-option-a: var(--p-sel-scale, 1) !important;
          --_p-optgroup-a: var(--p-sel-scale, 1) !important;
        }
        .p-select[hidden] {
          display: none !important;
        }
        .p-select [data-pds-slot="label-after"]{
          display: inline-block;
          vertical-align: top;
        }
        .p-select [data-pds-slot="label-after"] > *{
          margin-inline-start: var(--p-spacing-static-xs) !important;
        }
        .p-select .label-after{
          display: inline-block;
          vertical-align: top;
        }
        .p-select button{
          all: unset;
          display: flex;
          align-items: center;
          gap: calc(22.4px * (var(--_p-select-a) - 0.64285714) + 4px);
          height: calc(var(--_p-select-a) * 3.5rem);
          box-sizing: border-box;
          min-width: 0;
          padding-inline: calc(
            22.4px * (var(--_p-select-a) - 0.64285714) + 8px
          );
          border: 1px solid var(--p-select-border-color, var(--p-sel-border));
          border-radius: var(--p-sel-radius, var(--p-radius-xl));
          background: var(--p-select-background-color, var(--p-sel-bg));
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-select-text-color, var(--p-color-primary));
          cursor: var(--p-sel-btn-cursor, pointer);
          opacity: var(--p-sel-btn-op);
          transition: background-color
              var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            border-color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
        }
        .p-select:not([disabled]) button:focus-visible {
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-select button img{
          font: var(--p-typescale-sm) var(--p-font-porsche-next);
          width: auto;
          height: var(--p-leading-normal);
          border-radius: var(--p-radius-sm);
        }
        .p-select button span{
          flex-grow: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .p-select [popover]{
          all: unset;
          position: absolute;
          z-index: 99;
          padding: calc(11.2px * (var(--_p-select-a) - 0.64285714) + 4px);
          display: none;
          flex-direction: column;
          gap: calc(11.2px * (var(--_p-select-a) - 0.64285714) + 4px);
          max-height: max(calc(224px), calc(50vh - 54px / 2 - 6px * 2));
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
        .p-select [popover]:not(:popover-open){
          display: none;
        }
        .p-select [data-pds-slot="selected"]{
          display: block;
          height: 100%;
          flex-grow: 1;
          overflow: hidden;
        }
        .p-select .root{
          display: grid;
          gap: var(--p-spacing-static-xs);
          min-width: calc(
            1rem + var(--p-spacing-static-md) + 1px * 2 +
              calc(
                9px + var(--p-spacing-static-md) / 2 +
                  (var(--p-leading-normal) + var(--p-spacing-static-xs) * 2) * 1
              )
          );
        }
        .p-select .options{
          display: flex;
          flex-direction: column;
          gap: calc(11.2px * (var(--_p-select-a) - 0.64285714) + 4px);
        }
        .p-select .icon{
          margin-inline-end: -3px;
          pointer-events: none;
          transform: rotate3d(0, 0, 1, 0.0001deg);
          transition: transform
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        }
        .p-select .sr-only{
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }
        .p-select .label-wrapper{
          min-width: var(--p-sel-lw-minw);
          position: var(--p-sel-lw-pos, static);
          width: var(--p-sel-lw-w, auto);
          height: var(--p-sel-lw-h, auto);
          padding: var(--p-sel-lw-pad, 0);
          margin: var(--p-sel-lw-m, 0);
          overflow: var(--p-sel-lw-ov, visible);
          clip: var(--p-sel-lw-clip, auto);
          white-space: var(--p-sel-lw-ws, normal);
        }
        .p-select .label{
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          cursor: var(--p-sel-cursor, pointer);
          color: var(--p-color-primary);
          pointer-events: var(--p-sel-pe);
          opacity: var(--p-sel-opacity);
          transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
          display: inline;
        }
        .p-select .label:empty{
          display: none;
        }
        .p-select .label:is(span){
          cursor: unset;
          font-size: var(--p-typescale-xs);
          color: var(--p-color-contrast-high);
          min-width: unset;
          position: var(--p-sel-desc-pos, static);
          width: var(--p-sel-desc-w, auto);
          height: var(--p-sel-desc-h, auto);
          padding: var(--p-sel-desc-pad, 0);
          margin: var(--p-sel-desc-m, 0);
          overflow: var(--p-sel-desc-ov, visible);
          clip: var(--p-sel-desc-clip, auto);
          white-space: var(--p-sel-desc-ws, normal);
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
        .p-select .label > [data-pds-slot="label"] > *{
          display: inline !important;
        }
        .p-select .required{
          user-select: none;
        }
        .p-select .message{
          display: flex;
          gap: var(--p-spacing-static-xs);
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-sel-msg, inherit);
          opacity: var(--p-sel-msg-op);
          position: var(--p-sel-msg-pos);
          transition: color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            opacity var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
        }
        .p-select .message:empty{
          opacity: 0;
          position: absolute;
        }
        .p-select .message .p-icon{
          display: var(--p-sel-icon-display, none);
        }
        @media (forced-colors: active) {
          .p-select button{
            opacity: var(--p-sel-btn-fc-op, var(--p-sel-btn-op, 1));
            color: var(
              --p-sel-btn-fc-color,
              var(--p-select-text-color, var(--p-color-primary))
            );
          }
          .p-select .label{
            opacity: var(--p-sel-fc-opacity, var(--p-sel-opacity, 1));
            color: var(--p-sel-fc-color, var(--p-color-primary));
          }
          .p-select:not([disabled]) button:focus-visible {
            outline-color: Highlight;
          }
        }
        @media (hover: hover) {
          .p-select:not([disabled]) button:hover,
          .p-select:not([disabled]) label:hover ~ button {
            border-color: var(--p-select-border-color, var(--p-sel-hover));
          }
        }
        @media (min-width: 480px) {
          .p-select .label-wrapper{
            min-width: var(--p-sel-lw-xs-minw, var(--p-sel-lw-minw));
            position: var(--p-sel-lw-xs-pos, var(--p-sel-lw-pos, static));
            width: var(--p-sel-lw-xs-w, var(--p-sel-lw-w, auto));
            height: var(--p-sel-lw-xs-h, var(--p-sel-lw-h, auto));
            padding: var(--p-sel-lw-xs-pad, var(--p-sel-lw-pad, 0));
            margin: var(--p-sel-lw-xs-m, var(--p-sel-lw-m, 0));
            overflow: var(--p-sel-lw-xs-ov, var(--p-sel-lw-ov, visible));
            clip: var(--p-sel-lw-xs-clip, var(--p-sel-lw-clip, auto));
            white-space: var(--p-sel-lw-xs-ws, var(--p-sel-lw-ws, normal));
          }
          .p-select .label:is(span){
            position: var(--p-sel-desc-xs-pos, var(--p-sel-desc-pos, static));
            width: var(--p-sel-desc-xs-w, var(--p-sel-desc-w, auto));
            height: var(--p-sel-desc-xs-h, var(--p-sel-desc-h, auto));
            padding: var(--p-sel-desc-xs-pad, var(--p-sel-desc-pad, 0));
            margin: var(--p-sel-desc-xs-m, var(--p-sel-desc-m, 0));
            overflow: var(--p-sel-desc-xs-ov, var(--p-sel-desc-ov, visible));
            clip: var(--p-sel-desc-xs-clip, var(--p-sel-desc-clip, auto));
            white-space: var(--p-sel-desc-xs-ws, var(--p-sel-desc-ws, normal));
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 760px) {
          .p-select .label-wrapper{
            min-width: var(
              --p-sel-lw-s-minw,
              var(--p-sel-lw-xs-minw, var(--p-sel-lw-minw))
            );
            position: var(
              --p-sel-lw-s-pos,
              var(--p-sel-lw-xs-pos, var(--p-sel-lw-pos, static))
            );
            width: var(
              --p-sel-lw-s-w,
              var(--p-sel-lw-xs-w, var(--p-sel-lw-w, auto))
            );
            height: var(
              --p-sel-lw-s-h,
              var(--p-sel-lw-xs-h, var(--p-sel-lw-h, auto))
            );
            padding: var(
              --p-sel-lw-s-pad,
              var(--p-sel-lw-xs-pad, var(--p-sel-lw-pad, 0))
            );
            margin: var(
              --p-sel-lw-s-m,
              var(--p-sel-lw-xs-m, var(--p-sel-lw-m, 0))
            );
            overflow: var(
              --p-sel-lw-s-ov,
              var(--p-sel-lw-xs-ov, var(--p-sel-lw-ov, visible))
            );
            clip: var(
              --p-sel-lw-s-clip,
              var(--p-sel-lw-xs-clip, var(--p-sel-lw-clip, auto))
            );
            white-space: var(
              --p-sel-lw-s-ws,
              var(--p-sel-lw-xs-ws, var(--p-sel-lw-ws, normal))
            );
          }
          .p-select .label:is(span){
            position: var(
              --p-sel-desc-s-pos,
              var(--p-sel-desc-xs-pos, var(--p-sel-desc-pos, static))
            );
            width: var(
              --p-sel-desc-s-w,
              var(--p-sel-desc-xs-w, var(--p-sel-desc-w, auto))
            );
            height: var(
              --p-sel-desc-s-h,
              var(--p-sel-desc-xs-h, var(--p-sel-desc-h, auto))
            );
            padding: var(
              --p-sel-desc-s-pad,
              var(--p-sel-desc-xs-pad, var(--p-sel-desc-pad, 0))
            );
            margin: var(
              --p-sel-desc-s-m,
              var(--p-sel-desc-xs-m, var(--p-sel-desc-m, 0))
            );
            overflow: var(
              --p-sel-desc-s-ov,
              var(--p-sel-desc-xs-ov, var(--p-sel-desc-ov, visible))
            );
            clip: var(
              --p-sel-desc-s-clip,
              var(--p-sel-desc-xs-clip, var(--p-sel-desc-clip, auto))
            );
            white-space: var(
              --p-sel-desc-s-ws,
              var(--p-sel-desc-xs-ws, var(--p-sel-desc-ws, normal))
            );
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1000px) {
          .p-select .label-wrapper{
            min-width: var(--p-sel-lw-m-minw, var(--p-sel-lw-s-minw));
            position: var(--p-sel-lw-m-pos, var(--p-sel-lw-s-pos, static));
            width: var(--p-sel-lw-m-w, var(--p-sel-lw-s-w, auto));
            height: var(--p-sel-lw-m-h, var(--p-sel-lw-s-h, auto));
            padding: var(--p-sel-lw-m-pad, var(--p-sel-lw-s-pad, 0));
            margin: var(--p-sel-lw-m-m, var(--p-sel-lw-s-m, 0));
            overflow: var(--p-sel-lw-m-ov, var(--p-sel-lw-s-ov, visible));
            clip: var(--p-sel-lw-m-clip, var(--p-sel-lw-s-clip, auto));
            white-space: var(--p-sel-lw-m-ws, var(--p-sel-lw-s-ws, normal));
          }
          .p-select .label:is(span){
            position: var(--p-sel-desc-m-pos, var(--p-sel-desc-s-pos, static));
            width: var(--p-sel-desc-m-w, var(--p-sel-desc-s-w, auto));
            height: var(--p-sel-desc-m-h, var(--p-sel-desc-s-h, auto));
            padding: var(--p-sel-desc-m-pad, var(--p-sel-desc-s-pad, 0));
            margin: var(--p-sel-desc-m-m, var(--p-sel-desc-s-m, 0));
            overflow: var(--p-sel-desc-m-ov, var(--p-sel-desc-s-ov, visible));
            clip: var(--p-sel-desc-m-clip, var(--p-sel-desc-s-clip, auto));
            white-space: var(--p-sel-desc-m-ws, var(--p-sel-desc-s-ws, normal));
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1300px) {
          .p-select .label-wrapper{
            min-width: var(--p-sel-lw-l-minw, var(--p-sel-lw-m-minw));
            position: var(--p-sel-lw-l-pos, var(--p-sel-lw-m-pos, static));
            width: var(--p-sel-lw-l-w, var(--p-sel-lw-m-w, auto));
            height: var(--p-sel-lw-l-h, var(--p-sel-lw-m-h, auto));
            padding: var(--p-sel-lw-l-pad, var(--p-sel-lw-m-pad, 0));
            margin: var(--p-sel-lw-l-m, var(--p-sel-lw-m-m, 0));
            overflow: var(--p-sel-lw-l-ov, var(--p-sel-lw-m-ov, visible));
            clip: var(--p-sel-lw-l-clip, var(--p-sel-lw-m-clip, auto));
            white-space: var(--p-sel-lw-l-ws, var(--p-sel-lw-m-ws, normal));
          }
          .p-select .label:is(span){
            position: var(--p-sel-desc-l-pos, var(--p-sel-desc-m-pos, static));
            width: var(--p-sel-desc-l-w, var(--p-sel-desc-m-w, auto));
            height: var(--p-sel-desc-l-h, var(--p-sel-desc-m-h, auto));
            padding: var(--p-sel-desc-l-pad, var(--p-sel-desc-m-pad, 0));
            margin: var(--p-sel-desc-l-m, var(--p-sel-desc-m-m, 0));
            overflow: var(--p-sel-desc-l-ov, var(--p-sel-desc-m-ov, visible));
            clip: var(--p-sel-desc-l-clip, var(--p-sel-desc-m-clip, auto));
            white-space: var(--p-sel-desc-l-ws, var(--p-sel-desc-m-ws, normal));
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1760px) {
          .p-select .label-wrapper{
            min-width: var(--p-sel-lw-xl-minw, var(--p-sel-lw-l-minw));
            position: var(--p-sel-lw-xl-pos, var(--p-sel-lw-l-pos, static));
            width: var(--p-sel-lw-xl-w, var(--p-sel-lw-l-w, auto));
            height: var(--p-sel-lw-xl-h, var(--p-sel-lw-l-h, auto));
            padding: var(--p-sel-lw-xl-pad, var(--p-sel-lw-l-pad, 0));
            margin: var(--p-sel-lw-xl-m, var(--p-sel-lw-l-m, 0));
            overflow: var(--p-sel-lw-xl-ov, var(--p-sel-lw-l-ov, visible));
            clip: var(--p-sel-lw-xl-clip, var(--p-sel-lw-l-clip, auto));
            white-space: var(--p-sel-lw-xl-ws, var(--p-sel-lw-l-ws, normal));
          }
          .p-select .label:is(span){
            position: var(--p-sel-desc-xl-pos, var(--p-sel-desc-l-pos, static));
            width: var(--p-sel-desc-xl-w, var(--p-sel-desc-l-w, auto));
            height: var(--p-sel-desc-xl-h, var(--p-sel-desc-l-h, auto));
            padding: var(--p-sel-desc-xl-pad, var(--p-sel-desc-l-pad, 0));
            margin: var(--p-sel-desc-xl-m, var(--p-sel-desc-l-m, 0));
            overflow: var(--p-sel-desc-xl-ov, var(--p-sel-desc-l-ov, visible));
            clip: var(--p-sel-desc-xl-clip, var(--p-sel-desc-l-clip, auto));
            white-space: var(
              --p-sel-desc-xl-ws,
              var(--p-sel-desc-l-ws, normal)
            );
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1920px) {
          .p-select .label-wrapper{
            min-width: var(--p-sel-lw-xxl-minw, var(--p-sel-lw-xl-minw));
            position: var(--p-sel-lw-xxl-pos, var(--p-sel-lw-xl-pos, static));
            width: var(--p-sel-lw-xxl-w, var(--p-sel-lw-xl-w, auto));
            height: var(--p-sel-lw-xxl-h, var(--p-sel-lw-xl-h, auto));
            padding: var(--p-sel-lw-xxl-pad, var(--p-sel-lw-xl-pad, 0));
            margin: var(--p-sel-lw-xxl-m, var(--p-sel-lw-xl-m, 0));
            overflow: var(--p-sel-lw-xxl-ov, var(--p-sel-lw-xl-ov, visible));
            clip: var(--p-sel-lw-xxl-clip, var(--p-sel-lw-xl-clip, auto));
            white-space: var(--p-sel-lw-xxl-ws, var(--p-sel-lw-xl-ws, normal));
          }
          .p-select .label:is(span){
            position: var(
              --p-sel-desc-xxl-pos,
              var(--p-sel-desc-xl-pos, static)
            );
            width: var(--p-sel-desc-xxl-w, var(--p-sel-desc-xl-w, auto));
            height: var(--p-sel-desc-xxl-h, var(--p-sel-desc-xl-h, auto));
            padding: var(--p-sel-desc-xxl-pad, var(--p-sel-desc-xl-pad, 0));
            margin: var(--p-sel-desc-xxl-m, var(--p-sel-desc-xl-m, 0));
            overflow: var(
              --p-sel-desc-xxl-ov,
              var(--p-sel-desc-xl-ov, visible)
            );
            clip: var(--p-sel-desc-xxl-clip, var(--p-sel-desc-xl-clip, auto));
            white-space: var(
              --p-sel-desc-xxl-ws,
              var(--p-sel-desc-xl-ws, normal)
            );
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }`}}),l.jsxs(l.Fragment,{children:[" ",l.jsxs("div",{className:"root",children:[l.jsxs("div",{className:"label-wrapper",children:[l.jsxs("label",{className:"label",id:"label",htmlFor:"button",children:[o(),l.jsx("span",{"data-pds-slot":"label",children:e.label??null})]}),l.jsx("span",{"data-pds-slot":"label-after",children:e["label-after"]??null})]}),l.jsxs("span",{className:"label",id:"description",children:[s(),l.jsx("span",{"data-pds-slot":"description",children:e.description??null})]}),l.jsxs("button",{type:"button",role:"combobox",id:"button",children:[l.jsx("span",{children:y()}),l.jsx(u,{name:"arrow-head-down",color:"primary"})]}),l.jsx("div",{children:l.jsx("div",{className:"options",id:"listbox",children:l.jsx("span",{"data-pds-slot":"",children:e.children})})}),l.jsxs("span",{className:"message",id:"message",children:[l.jsx(u,{}),n()]})]})," "," "]})]})}export{H as default};
