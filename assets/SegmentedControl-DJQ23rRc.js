import{j as p}from"./react-C3neMvrl.js";import T from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const w=["base","xs","s","m","l","xl","xxl"],$=(s,c)=>{if(s==null)return c;if(s==="")return typeof c=="boolean"?!0:c;if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return c}return s},m=s=>s===!0||s==="true"||s==="",x=(s,c,t)=>s&&typeof s=="object"?s[c]===void 0?t:s[c]:s,b=(s,c,t)=>s==="auto"||s===void 0||s===null||s===""?"repeat(auto-fit, "+t+"px)":"repeat("+s+", minmax(0, 1fr))",j=(s,c,t)=>{const n=c==="base"?"--p-sc-lw":`--p-sc-lw-${c}`,a=c==="base"?"--p-sc-desc":`--p-sc-desc-${c}`;if(t){s[`${n}-pos`]="absolute",s[`${n}-w`]="1px",s[`${n}-h`]="1px",s[`${n}-pad`]="0",s[`${n}-m`]="-1px",s[`${n}-ov`]="hidden",s[`${n}-clip`]="rect(0, 0, 0, 0)",s[`${n}-ws`]="nowrap",s[`${n}-minw`]="",s[`${a}-pos`]="absolute",s[`${a}-w`]="1px",s[`${a}-h`]="1px",s[`${a}-pad`]="0",s[`${a}-m`]="-1px",s[`${a}-ov`]="hidden",s[`${a}-clip`]="rect(0, 0, 0, 0)",s[`${a}-ws`]="nowrap";return}s[`${n}-pos`]="static",s[`${n}-w`]="auto",s[`${n}-h`]="auto",s[`${n}-pad`]="0",s[`${n}-m`]="0",s[`${n}-ov`]="visible",s[`${n}-clip`]="auto",s[`${n}-ws`]="normal",s[`${n}-minw`]="fit-content",s[`${a}-pos`]="static",s[`${a}-w`]="auto",s[`${a}-h`]="auto",s[`${a}-pad`]="0",s[`${a}-m`]="0",s[`${a}-ov`]="visible",s[`${a}-clip`]="auto",s[`${a}-ws`]="normal"},y=(s,c,t)=>{if(c==="base"){s["--p-sc-cols"]=t;return}s[`--p-sc-cols-${c}`]=t};function E(s){function c(){const e=m(s.disabled);m(s.compact);const o=m(s.noWrap),g=s.state==="success"||s.state==="error"?s.state:"none",u=!!(s.message||"")&&(g==="success"||g==="error"),i=$(s.hideLabel,!1),d=$(s.columns,"auto"),h=46,f=80,v={"--p-sc-cursor":e?"not-allowed":"inherit","--p-sc-pe":e?"none":"","--p-sc-opacity":e?"0.4":"","--p-sc-fc-opacity":e?"1":"","--p-sc-fc-color":e?"GrayText":"","--p-sc-msg":{none:"",success:"var(--p-color-success)",error:"var(--p-color-error)"}[g]||"","--p-sc-msg-opacity":u?"":"0","--p-sc-msg-pos":u?"":"absolute","--p-sc-icon-display":u?"inline-flex":"none","--p-sc-flow":o?"column":"","--p-sc-auto-cols":o?"max-content":"","--p-sc-scroller-m":o?"calc(-1 * var(--p-spacing-static-xs)) 0":""};if(typeof i=="object"&&i!==null){let l=m(x(i,"base",!1));for(const r of w)i[r]!==void 0&&(l=m(x(i,r,!1))),j(v,r,l)}else{const l=m(i);for(const r of w)j(v,r,l)}if(o)for(const l of w)y(v,l,"");else if(typeof d=="object"&&d!==null){let l=b(x(d,"base","auto"),h,f);for(const r of w)d[r]!==void 0&&(l=b(x(d,r,"auto"),h,f)),y(v,r,l)}else{const l=b(d,h,f);for(const r of w)y(v,r,l)}return v}function t(){return s.label||""}function n(){return s.description||""}function a(){const e=s.state||"none",o=s.message||"";return!o||e!=="success"&&e!=="error"?"":o}function N(){const e=s.state||"none";return!(s.message||"")||e!=="success"&&e!=="error"?"":e==="error"?"exclamation":"check"}function S(){const e=s.state||"none";return e==="error"?"error":e==="success"?"success":""}return p.jsxs("div",{className:["p-segmented-control",s.className].filter(Boolean).join(" "),"data-pds":"segmented-control",style:c(),children:[p.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-segmented-control :where([data-pds-slot]){display:contents}

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
            margin: var(
              --p-sc-lw-s-m,
              var(--p-sc-lw-xs-m, var(--p-sc-lw-m, 0))
            );
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
            white-space: var(
              --p-sc-desc-xxl-ws,
              var(--p-sc-desc-xl-ws, normal)
            );
            margin-top: calc(-1 * var(--p-spacing-static-xs));
          }
        }`}}),p.jsxs(p.Fragment,{children:[" ",p.jsxs("fieldset",{className:"root",children:[p.jsxs("div",{className:"label-wrapper",children:[p.jsxs("div",{className:"label",id:"label",children:[t(),p.jsx("span",{"data-pds-slot":"label",children:s.label??null})]}),p.jsx("span",{"data-pds-slot":"label-after",children:s["label-after"]??null})]}),p.jsxs("span",{className:"label",id:"description",children:[n(),p.jsx("span",{"data-pds-slot":"description",children:s.description??null})]}),p.jsx("span",{"data-pds-slot":"",children:s.children}),p.jsxs("span",{className:"message",id:"message",children:[p.jsx(T,{"aria-hidden":"true",name:N(),color:S()}),a()]})]})," "," "]})]})}export{E as default};
