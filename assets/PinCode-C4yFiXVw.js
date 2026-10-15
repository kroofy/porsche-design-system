import{j as r}from"./react-C3neMvrl.js";import{h as S}from"./host-DRskmCSE.js";import k from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const b=["base","xs","s","m","l","xl","xxl"],L=(p,e)=>{if(p==null)return e;if(p==="")return!0;if(typeof p=="string"&&p.charAt(0)==="{")try{return JSON.parse(p.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return e}return p},o=p=>p===!0||p==="true"||p==="",y=(p,e,t)=>p&&typeof p=="object"?p[e]===void 0?t:p[e]:p,$=(p,e,t)=>{const a=e==="base"?"--p-pc-lw":`--p-pc-lw-${e}`,c=e==="base"?"--p-pc-desc":`--p-pc-desc-${e}`;if(t){p[`${a}-pos`]="absolute",p[`${a}-w`]="1px",p[`${a}-h`]="1px",p[`${a}-pad`]="0",p[`${a}-m`]="-1px",p[`${a}-ov`]="hidden",p[`${a}-clip`]="rect(0, 0, 0, 0)",p[`${a}-ws`]="nowrap",p[`${a}-minw`]="",p[`${c}-pos`]="absolute",p[`${c}-w`]="1px",p[`${c}-h`]="1px",p[`${c}-pad`]="0",p[`${c}-m`]="-1px",p[`${c}-ov`]="hidden",p[`${c}-clip`]="rect(0, 0, 0, 0)",p[`${c}-ws`]="nowrap";return}p[`${a}-pos`]="static",p[`${a}-w`]="auto",p[`${a}-h`]="auto",p[`${a}-pad`]="0",p[`${a}-m`]="0",p[`${a}-ov`]="visible",p[`${a}-clip`]="auto",p[`${a}-ws`]="normal",p[`${a}-minw`]="fit-content",p[`${c}-pos`]="static",p[`${c}-w`]="auto",p[`${c}-h`]="auto",p[`${c}-pad`]="0",p[`${c}-m`]="0",p[`${c}-ov`]="visible",p[`${c}-clip`]="auto",p[`${c}-ws`]="normal"};function H(p){function e(){const n=o(p.disabled),s=o(p.loading),g=o(p.compact),u=p.state==="success"||p.state==="error"?p.state:"none",x=!!(p.message||"")&&(u==="success"||u==="error"),i=L(p.hideLabel,!1);let l=Number(p.length);(!Number.isFinite(l)||l<1)&&(l=4),l>6&&(l=6);const f={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},w=f[u]||f.none,h={"--p-pc-scale":g?"0.64285714":"1","--p-pc-radius":g?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-pc-border":w.border,"--p-pc-bg":w.bg,"--p-pc-hover":w.hover,"--p-pc-pad":"calc(11.2px * (var(--_p-pin-code-a) - 0.64285714) + 4px)","--p-pc-cols":"repeat("+l+", 1fr)","--p-pc-font":"var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next)","--p-pc-cursor":n||s?"not-allowed":"text","--p-pc-input-op":n||s?"0.4":"","--p-pc-input-fc-op":n||s?"1":"","--p-pc-input-fc-color":n||s?"GrayText":"","--p-pc-label-cursor":n||s?"not-allowed":"pointer","--p-pc-pe":n||s?"none":"","--p-pc-opacity":n?"0.4":"","--p-pc-fc-op":n?"1":"","--p-pc-fc-color":n?"GrayText":"","--p-pc-msg":w.message||"","--p-pc-msg-op":x?"":"0","--p-pc-msg-pos":x?"":"absolute","--p-pc-icon-display":x?"inline-flex":"none"};if(typeof i=="object"&&i!==null){let m=o(y(i,"base",!1));for(const d of b)i[d]!==void 0&&(m=o(y(i,d,!1))),$(h,d,m)}else{const m=o(i);for(const d of b)$(h,d,m)}return h}function t(){return p.label||""}function a(){return p.description||""}function c(){const n=p.state||"none",s=p.message||"";return!s||n!=="success"&&n!=="error"?"":s}function j(){const n=p.state||"none";return!(p.message||"")||n!=="success"&&n!=="error"?"":n==="error"?"exclamation":"check"}function N(){const n=p.state||"none";return n==="error"?"error":n==="success"?"success":""}function v(){return p.disabled===!0||p.disabled==="true"||p.disabled===""}function T(){return p.loading===!0||p.loading==="true"||p.loading===""?"Loading":""}return r.jsxs("div",{className:["p-pin-code",p.className].filter(Boolean).join(" "),"data-pds":"pin-code",style:e(),...S({disabled:p.disabled,loading:p.loading}),children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-pin-code :where([data-pds-slot]){display:contents}

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
            margin: var(
              --p-pc-lw-s-m,
              var(--p-pc-lw-xs-m, var(--p-pc-lw-m, 0))
            );
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
            white-space: var(
              --p-pc-desc-xxl-ws,
              var(--p-pc-desc-xl-ws, normal)
            );
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }`}}),r.jsxs(r.Fragment,{children:[" ",r.jsxs("fieldset",{className:"root",children:[r.jsxs("div",{className:"label-wrapper",children:[r.jsx("label",{className:"label",id:"label",htmlFor:"current-input",children:t()}),r.jsx("span",{"data-pds-slot":"label-after",children:p["label-after"]??null})]}),r.jsx("span",{className:"label",id:"description",children:a()}),r.jsxs("div",{className:"wrapper",children:[r.jsx("input",{value:p.value,disabled:!!v()}),r.jsx("input",{value:p.value,disabled:!!v()}),r.jsx("input",{value:p.value,disabled:!!v()}),r.jsx("input",{value:p.value,disabled:!!v()})]}),r.jsxs("span",{className:"message",id:"message",children:[r.jsx(k,{"aria-hidden":"true",name:j(),color:N()}),c()]}),r.jsx("span",{className:"loading",id:"loading",children:T()})]})," "," "]})]})}export{H as default};
