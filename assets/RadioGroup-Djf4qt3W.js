import{j as l}from"./react-C3neMvrl.js";import{h as T}from"./host-DRskmCSE.js";import L from"./Spinner-DLZl2BeF.js";import _ from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const m=["base","xs","s","m","l","xl","xxl"],b=(r,p)=>{if(r==null)return p;if(r==="")return typeof p=="boolean"?!0:p;if(typeof r=="string"&&r.charAt(0)==="{")try{return JSON.parse(r.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return p}return r},c=r=>r===!0||r==="true"||r==="",x=(r,p,e)=>r&&typeof r=="object"?r[p]===void 0?e:r[p]:r,y=(r,p,e)=>{const a=p==="base"?"--p-rg-lw":`--p-rg-lw-${p}`,n=p==="base"?"--p-rg-desc":`--p-rg-desc-${p}`;if(e){r[`${a}-pos`]="absolute",r[`${a}-w`]="1px",r[`${a}-h`]="1px",r[`${a}-pad`]="0",r[`${a}-m`]="-1px",r[`${a}-ov`]="hidden",r[`${a}-clip`]="rect(0, 0, 0, 0)",r[`${a}-ws`]="nowrap",r[`${a}-minw`]="",r[`${n}-pos`]="absolute",r[`${n}-w`]="1px",r[`${n}-h`]="1px",r[`${n}-pad`]="0",r[`${n}-m`]="-1px",r[`${n}-ov`]="hidden",r[`${n}-clip`]="rect(0, 0, 0, 0)",r[`${n}-ws`]="nowrap";return}r[`${a}-pos`]="static",r[`${a}-w`]="auto",r[`${a}-h`]="auto",r[`${a}-pad`]="0",r[`${a}-m`]="0",r[`${a}-ov`]="visible",r[`${a}-clip`]="auto",r[`${a}-ws`]="normal",r[`${a}-minw`]="fit-content",r[`${n}-pos`]="static",r[`${n}-w`]="auto",r[`${n}-h`]="auto",r[`${n}-pad`]="0",r[`${n}-m`]="0",r[`${n}-ov`]="visible",r[`${n}-clip`]="auto",r[`${n}-ws`]="normal"},$=(r,p,e)=>{const a=e==="row",n=a?"row wrap":"column nowrap",w=a?"start":"stretch";if(p==="base"){r["--p-rg-flow"]=n,r["--p-rg-align"]=w;return}r[`--p-rg-flow-${p}`]=n,r[`--p-rg-align-${p}`]=w};function q(r){function p(){const s=c(r.disabled),d=c(r.loading),S=c(r.compact),u=r.state==="success"||r.state==="error"?r.state:"none",h=!!(r.message||"")&&(u==="success"||u==="error"),t=b(r.hideLabel,!1),g=b(r.direction,"column"),f=S?"0.64285714":"1",v={"--_p-radio-group-a":f,"--_p-radio-group-option-a":f,"--p-rg-cursor":s?"not-allowed":"inherit","--p-rg-pe":s||d?"none":"","--p-rg-opacity":s?"0.4":"","--p-rg-fc-opacity":s?"1":"","--p-rg-fc-color":s?"GrayText":"","--p-rg-msg":{none:"",success:"var(--p-color-success)",error:"var(--p-color-error)"}[u]||"","--p-rg-msg-op":h?"":"0","--p-rg-msg-pos":h?"":"absolute","--p-rg-icon-display":h?"inline-flex":"none"};if(typeof t=="object"&&t!==null){let i=c(x(t,"base",!1));for(const o of m)t[o]!==void 0&&(i=c(x(t,o,!1))),y(v,o,i)}else{const i=c(t);for(const o of m)y(v,o,i)}if(typeof g=="object"&&g!==null){let i=x(g,"base","column");for(const o of m)g[o]!==void 0&&(i=x(g,o,"column")),$(v,o,i)}else for(const i of m)$(v,i,g);return v}function e(){return r.label||""}function a(){return r.description||""}function n(){const s=r.state||"none",d=r.message||"";return!d||s!=="success"&&s!=="error"?"":d}function w(){const s=r.state||"none";return!(r.message||"")||s!=="success"&&s!=="error"?"":s==="error"?"exclamation":"check"}function j(){const s=r.state||"none";return s==="error"?"error":s==="success"?"success":""}function N(){return r.loading===!0||r.loading==="true"||r.loading===""?"Loading":""}return l.jsxs("div",{className:["p-radio-group",r.className].filter(Boolean).join(" "),"data-pds":"radio-group",style:p(),...T({loading:r.loading}),children:[l.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-radio-group :where([data-pds-slot]){display:contents}

        .p-radio-group[hidden] {
          display: none !important;
        }
        .p-radio-group [data-pds-slot="label-after"]{
          display: inline-block;
          vertical-align: top;
        }
        .p-radio-group [data-pds-slot="label-after"] > *{
          margin-inline-start: var(--p-spacing-static-xs) !important;
        }
        .p-radio-group .label-after{
          display: inline-block;
          vertical-align: top;
        }
        .p-radio-group[loading] [data-pds-slot] > *:not([slot]) {
          opacity: 0.4 !important;
        }
        .p-radio-group .root{
          all: unset;
          display: grid;
          justify-self: flex-start;
          row-gap: var(--p-spacing-static-xs);
        }
        .p-radio-group .wrapper{
          position: relative;
          display: flex;
          flex-flow: var(--p-rg-flow, column nowrap);
          align-items: var(--p-rg-align, stretch);
          column-gap: calc(
            22.4px * (var(--_p-radio-group-a) - 0.64285714) + 8px
          );
          row-gap: calc(11.2px * (var(--_p-radio-group-a) - 0.64285714) + 4px);
        }
        .p-radio-group .spinner{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .p-radio-group .label-wrapper{
          min-width: var(--p-rg-lw-minw);
          position: var(--p-rg-lw-pos, static);
          width: var(--p-rg-lw-w, auto);
          height: var(--p-rg-lw-h, auto);
          padding: var(--p-rg-lw-pad, 0);
          margin: var(--p-rg-lw-m, 0);
          overflow: var(--p-rg-lw-ov, visible);
          clip: var(--p-rg-lw-clip, auto);
          white-space: var(--p-rg-lw-ws, normal);
        }
        .p-radio-group .label{
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          cursor: var(--p-rg-cursor, inherit);
          color: var(--p-color-primary);
          pointer-events: var(--p-rg-pe);
          opacity: var(--p-rg-opacity);
          transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
          display: inline;
        }
        .p-radio-group .label:empty{
          display: none;
        }
        .p-radio-group .label:is(span){
          cursor: unset;
          font-size: var(--p-typescale-xs);
          color: var(--p-color-contrast-high);
          min-width: unset;
          position: var(--p-rg-desc-pos, static);
          width: var(--p-rg-desc-w, auto);
          height: var(--p-rg-desc-h, auto);
          padding: var(--p-rg-desc-pad, 0);
          margin: var(--p-rg-desc-m, 0);
          overflow: var(--p-rg-desc-ov, visible);
          clip: var(--p-rg-desc-clip, auto);
          white-space: var(--p-rg-desc-ws, normal);
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
        .p-radio-group .label > [data-pds-slot="label"] > *{
          display: inline !important;
        }
        .p-radio-group .required{
          user-select: none;
        }
        .p-radio-group .message{
          display: flex;
          gap: var(--p-spacing-static-xs);
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-rg-msg, inherit);
          opacity: var(--p-rg-msg-op);
          position: var(--p-rg-msg-pos);
          transition: color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            opacity var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
        }
        .p-radio-group .message:empty{
          opacity: 0;
          position: absolute;
        }
        .p-radio-group .message .p-icon{
          display: var(--p-rg-icon-display, none);
        }
        .p-radio-group .loading{
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }
        .p-radio-group .sr-only{
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
          .p-radio-group .label{
            opacity: var(--p-rg-fc-opacity, var(--p-rg-opacity, 1));
            color: var(--p-rg-fc-color, var(--p-color-primary));
          }
          .p-radio-group[loading] [data-pds-slot] > *:not([slot]) {
            opacity: 1 !important;
            color: GrayText !important;
          }
        }
        @media (min-width: 480px) {
          .p-radio-group .wrapper{
            flex-flow: var(--p-rg-flow-xs, var(--p-rg-flow, column nowrap));
            align-items: var(--p-rg-align-xs, var(--p-rg-align, stretch));
          }
          .p-radio-group .label-wrapper{
            min-width: var(--p-rg-lw-xs-minw, var(--p-rg-lw-minw));
            position: var(--p-rg-lw-xs-pos, var(--p-rg-lw-pos, static));
            width: var(--p-rg-lw-xs-w, var(--p-rg-lw-w, auto));
            height: var(--p-rg-lw-xs-h, var(--p-rg-lw-h, auto));
            padding: var(--p-rg-lw-xs-pad, var(--p-rg-lw-pad, 0));
            margin: var(--p-rg-lw-xs-m, var(--p-rg-lw-m, 0));
            overflow: var(--p-rg-lw-xs-ov, var(--p-rg-lw-ov, visible));
            clip: var(--p-rg-lw-xs-clip, var(--p-rg-lw-clip, auto));
            white-space: var(--p-rg-lw-xs-ws, var(--p-rg-lw-ws, normal));
          }
          .p-radio-group .label:is(span){
            position: var(--p-rg-desc-xs-pos, var(--p-rg-desc-pos, static));
            width: var(--p-rg-desc-xs-w, var(--p-rg-desc-w, auto));
            height: var(--p-rg-desc-xs-h, var(--p-rg-desc-h, auto));
            padding: var(--p-rg-desc-xs-pad, var(--p-rg-desc-pad, 0));
            margin: var(--p-rg-desc-xs-m, var(--p-rg-desc-m, 0));
            overflow: var(--p-rg-desc-xs-ov, var(--p-rg-desc-ov, visible));
            clip: var(--p-rg-desc-xs-clip, var(--p-rg-desc-clip, auto));
            white-space: var(--p-rg-desc-xs-ws, var(--p-rg-desc-ws, normal));
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 760px) {
          .p-radio-group .wrapper{
            flex-flow: var(
              --p-rg-flow-s,
              var(--p-rg-flow-xs, var(--p-rg-flow, column nowrap))
            );
            align-items: var(
              --p-rg-align-s,
              var(--p-rg-align-xs, var(--p-rg-align, stretch))
            );
          }
          .p-radio-group .label-wrapper{
            min-width: var(
              --p-rg-lw-s-minw,
              var(--p-rg-lw-xs-minw, var(--p-rg-lw-minw))
            );
            position: var(
              --p-rg-lw-s-pos,
              var(--p-rg-lw-xs-pos, var(--p-rg-lw-pos, static))
            );
            width: var(
              --p-rg-lw-s-w,
              var(--p-rg-lw-xs-w, var(--p-rg-lw-w, auto))
            );
            height: var(
              --p-rg-lw-s-h,
              var(--p-rg-lw-xs-h, var(--p-rg-lw-h, auto))
            );
            padding: var(
              --p-rg-lw-s-pad,
              var(--p-rg-lw-xs-pad, var(--p-rg-lw-pad, 0))
            );
            margin: var(
              --p-rg-lw-s-m,
              var(--p-rg-lw-xs-m, var(--p-rg-lw-m, 0))
            );
            overflow: var(
              --p-rg-lw-s-ov,
              var(--p-rg-lw-xs-ov, var(--p-rg-lw-ov, visible))
            );
            clip: var(
              --p-rg-lw-s-clip,
              var(--p-rg-lw-xs-clip, var(--p-rg-lw-clip, auto))
            );
            white-space: var(
              --p-rg-lw-s-ws,
              var(--p-rg-lw-xs-ws, var(--p-rg-lw-ws, normal))
            );
          }
          .p-radio-group .label:is(span){
            position: var(
              --p-rg-desc-s-pos,
              var(--p-rg-desc-xs-pos, var(--p-rg-desc-pos, static))
            );
            width: var(
              --p-rg-desc-s-w,
              var(--p-rg-desc-xs-w, var(--p-rg-desc-w, auto))
            );
            height: var(
              --p-rg-desc-s-h,
              var(--p-rg-desc-xs-h, var(--p-rg-desc-h, auto))
            );
            padding: var(
              --p-rg-desc-s-pad,
              var(--p-rg-desc-xs-pad, var(--p-rg-desc-pad, 0))
            );
            margin: var(
              --p-rg-desc-s-m,
              var(--p-rg-desc-xs-m, var(--p-rg-desc-m, 0))
            );
            overflow: var(
              --p-rg-desc-s-ov,
              var(--p-rg-desc-xs-ov, var(--p-rg-desc-ov, visible))
            );
            clip: var(
              --p-rg-desc-s-clip,
              var(--p-rg-desc-xs-clip, var(--p-rg-desc-clip, auto))
            );
            white-space: var(
              --p-rg-desc-s-ws,
              var(--p-rg-desc-xs-ws, var(--p-rg-desc-ws, normal))
            );
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1000px) {
          .p-radio-group .wrapper{
            flex-flow: var(--p-rg-flow-m, var(--p-rg-flow-s));
            align-items: var(--p-rg-align-m, var(--p-rg-align-s));
          }
          .p-radio-group .label-wrapper{
            min-width: var(--p-rg-lw-m-minw, var(--p-rg-lw-s-minw));
            position: var(--p-rg-lw-m-pos, var(--p-rg-lw-s-pos, static));
            width: var(--p-rg-lw-m-w, var(--p-rg-lw-s-w, auto));
            height: var(--p-rg-lw-m-h, var(--p-rg-lw-s-h, auto));
            padding: var(--p-rg-lw-m-pad, var(--p-rg-lw-s-pad, 0));
            margin: var(--p-rg-lw-m-m, var(--p-rg-lw-s-m, 0));
            overflow: var(--p-rg-lw-m-ov, var(--p-rg-lw-s-ov, visible));
            clip: var(--p-rg-lw-m-clip, var(--p-rg-lw-s-clip, auto));
            white-space: var(--p-rg-lw-m-ws, var(--p-rg-lw-s-ws, normal));
          }
          .p-radio-group .label:is(span){
            position: var(--p-rg-desc-m-pos, var(--p-rg-desc-s-pos, static));
            width: var(--p-rg-desc-m-w, var(--p-rg-desc-s-w, auto));
            height: var(--p-rg-desc-m-h, var(--p-rg-desc-s-h, auto));
            padding: var(--p-rg-desc-m-pad, var(--p-rg-desc-s-pad, 0));
            margin: var(--p-rg-desc-m-m, var(--p-rg-desc-s-m, 0));
            overflow: var(--p-rg-desc-m-ov, var(--p-rg-desc-s-ov, visible));
            clip: var(--p-rg-desc-m-clip, var(--p-rg-desc-s-clip, auto));
            white-space: var(--p-rg-desc-m-ws, var(--p-rg-desc-s-ws, normal));
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1300px) {
          .p-radio-group .wrapper{
            flex-flow: var(--p-rg-flow-l, var(--p-rg-flow-m));
            align-items: var(--p-rg-align-l, var(--p-rg-align-m));
          }
          .p-radio-group .label-wrapper{
            min-width: var(--p-rg-lw-l-minw, var(--p-rg-lw-m-minw));
            position: var(--p-rg-lw-l-pos, var(--p-rg-lw-m-pos, static));
            width: var(--p-rg-lw-l-w, var(--p-rg-lw-m-w, auto));
            height: var(--p-rg-lw-l-h, var(--p-rg-lw-m-h, auto));
            padding: var(--p-rg-lw-l-pad, var(--p-rg-lw-m-pad, 0));
            margin: var(--p-rg-lw-l-m, var(--p-rg-lw-m-m, 0));
            overflow: var(--p-rg-lw-l-ov, var(--p-rg-lw-m-ov, visible));
            clip: var(--p-rg-lw-l-clip, var(--p-rg-lw-m-clip, auto));
            white-space: var(--p-rg-lw-l-ws, var(--p-rg-lw-m-ws, normal));
          }
          .p-radio-group .label:is(span){
            position: var(--p-rg-desc-l-pos, var(--p-rg-desc-m-pos, static));
            width: var(--p-rg-desc-l-w, var(--p-rg-desc-m-w, auto));
            height: var(--p-rg-desc-l-h, var(--p-rg-desc-m-h, auto));
            padding: var(--p-rg-desc-l-pad, var(--p-rg-desc-m-pad, 0));
            margin: var(--p-rg-desc-l-m, var(--p-rg-desc-m-m, 0));
            overflow: var(--p-rg-desc-l-ov, var(--p-rg-desc-m-ov, visible));
            clip: var(--p-rg-desc-l-clip, var(--p-rg-desc-m-clip, auto));
            white-space: var(--p-rg-desc-l-ws, var(--p-rg-desc-m-ws, normal));
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1760px) {
          .p-radio-group .wrapper{
            flex-flow: var(--p-rg-flow-xl, var(--p-rg-flow-l));
            align-items: var(--p-rg-align-xl, var(--p-rg-align-l));
          }
          .p-radio-group .label-wrapper{
            min-width: var(--p-rg-lw-xl-minw, var(--p-rg-lw-l-minw));
            position: var(--p-rg-lw-xl-pos, var(--p-rg-lw-l-pos, static));
            width: var(--p-rg-lw-xl-w, var(--p-rg-lw-l-w, auto));
            height: var(--p-rg-lw-xl-h, var(--p-rg-lw-l-h, auto));
            padding: var(--p-rg-lw-xl-pad, var(--p-rg-lw-l-pad, 0));
            margin: var(--p-rg-lw-xl-m, var(--p-rg-lw-l-m, 0));
            overflow: var(--p-rg-lw-xl-ov, var(--p-rg-lw-l-ov, visible));
            clip: var(--p-rg-lw-xl-clip, var(--p-rg-lw-l-clip, auto));
            white-space: var(--p-rg-lw-xl-ws, var(--p-rg-lw-l-ws, normal));
          }
          .p-radio-group .label:is(span){
            position: var(--p-rg-desc-xl-pos, var(--p-rg-desc-l-pos, static));
            width: var(--p-rg-desc-xl-w, var(--p-rg-desc-l-w, auto));
            height: var(--p-rg-desc-xl-h, var(--p-rg-desc-l-h, auto));
            padding: var(--p-rg-desc-xl-pad, var(--p-rg-desc-l-pad, 0));
            margin: var(--p-rg-desc-xl-m, var(--p-rg-desc-l-m, 0));
            overflow: var(--p-rg-desc-xl-ov, var(--p-rg-desc-l-ov, visible));
            clip: var(--p-rg-desc-xl-clip, var(--p-rg-desc-l-clip, auto));
            white-space: var(--p-rg-desc-xl-ws, var(--p-rg-desc-l-ws, normal));
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }
        @media (min-width: 1920px) {
          .p-radio-group .wrapper{
            flex-flow: var(--p-rg-flow-xxl, var(--p-rg-flow-xl));
            align-items: var(--p-rg-align-xxl, var(--p-rg-align-xl));
          }
          .p-radio-group .label-wrapper{
            min-width: var(--p-rg-lw-xxl-minw, var(--p-rg-lw-xl-minw));
            position: var(--p-rg-lw-xxl-pos, var(--p-rg-lw-xl-pos, static));
            width: var(--p-rg-lw-xxl-w, var(--p-rg-lw-xl-w, auto));
            height: var(--p-rg-lw-xxl-h, var(--p-rg-lw-xl-h, auto));
            padding: var(--p-rg-lw-xxl-pad, var(--p-rg-lw-xl-pad, 0));
            margin: var(--p-rg-lw-xxl-m, var(--p-rg-lw-xl-m, 0));
            overflow: var(--p-rg-lw-xxl-ov, var(--p-rg-lw-xl-ov, visible));
            clip: var(--p-rg-lw-xxl-clip, var(--p-rg-lw-xl-clip, auto));
            white-space: var(--p-rg-lw-xxl-ws, var(--p-rg-lw-xl-ws, normal));
          }
          .p-radio-group .label:is(span){
            position: var(--p-rg-desc-xxl-pos, var(--p-rg-desc-xl-pos, static));
            width: var(--p-rg-desc-xxl-w, var(--p-rg-desc-xl-w, auto));
            height: var(--p-rg-desc-xxl-h, var(--p-rg-desc-xl-h, auto));
            padding: var(--p-rg-desc-xxl-pad, var(--p-rg-desc-xl-pad, 0));
            margin: var(--p-rg-desc-xxl-m, var(--p-rg-desc-xl-m, 0));
            overflow: var(--p-rg-desc-xxl-ov, var(--p-rg-desc-xl-ov, visible));
            clip: var(--p-rg-desc-xxl-clip, var(--p-rg-desc-xl-clip, auto));
            white-space: var(
              --p-rg-desc-xxl-ws,
              var(--p-rg-desc-xl-ws, normal)
            );
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }`}}),l.jsxs(l.Fragment,{children:[" ",l.jsxs("fieldset",{className:"root",children:[l.jsxs("div",{className:"label-wrapper",children:[l.jsxs("div",{className:"label",id:"label",children:[e(),l.jsx("span",{"data-pds-slot":"label",children:r.label??null})]}),l.jsx("span",{"data-pds-slot":"label-after",children:r["label-after"]??null})]}),l.jsxs("span",{className:"label",id:"description",children:[a(),l.jsx("span",{"data-pds-slot":"description",children:r.description??null})]}),l.jsxs("div",{className:"wrapper",children:[l.jsx("span",{"data-pds-slot":"",children:r.children}),l.jsx(L,{className:"spinner","aria-hidden":"true"})]}),l.jsxs("span",{className:"message",id:"message",children:[l.jsx(_,{"aria-hidden":"true",name:w(),color:j()}),n()]}),l.jsx("span",{className:"loading",id:"loading",children:N()})]})," "," "]})]})}export{q as default};
