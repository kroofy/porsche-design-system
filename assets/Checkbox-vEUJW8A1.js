import{j as r}from"./react-C3neMvrl.js";import L from"./Spinner-DLZl2BeF.js";import C from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const A=`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/></svg>') center/contain no-repeat`,B=`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20,11v2H4v-2h16Z"/></svg>') center/contain no-repeat`,z=["base","xs","s","m","l","xl","xxl"],y=(n,b,v)=>{const a=b==="base"?"--p-cb-lw":`--p-cb-lw-${b}`;if(v){n[`${a}-pos`]="absolute",n[`${a}-w`]="1px",n[`${a}-h`]="1px",n[`${a}-pad`]="0",n[`${a}-m`]="-1px",n[`${a}-ov`]="hidden",n[`${a}-clip`]="rect(0, 0, 0, 0)",n[`${a}-ws`]="nowrap",n[`${a}-minw`]="",n[`${a}-pt`]="",n[`${a}-pis`]="";return}n[`${a}-pos`]="static",n[`${a}-w`]="auto",n[`${a}-h`]="auto",n[`${a}-pad`]="0",n[`${a}-m`]="0",n[`${a}-ov`]="visible",n[`${a}-clip`]="auto",n[`${a}-ws`]="normal",n[`${a}-minw`]="fit-content",n[`${a}-pt`]="max(0px, calc((calc(var(--_p-checkbox-scaling) * 1.75rem) - var(--p-leading-normal)) / 2))",n[`${a}-pis`]="calc(11.2px * (var(--_p-checkbox-scaling) - 0.64285714) + 4px)"};function U(n){function b(){const p=(c,o)=>{if(c==null)return o;if(c==="")return!0;if(typeof c=="string"&&c.charAt(0)==="{")try{return JSON.parse(c.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return o}return c},e=c=>c===!0||c==="true"||c==="",h=(c,o,f)=>c&&typeof c=="object"?c[o]===void 0?f:c[o]:c,g=e(n.disabled),l=e(n.loading),u=e(n.compact),w=g||l,t=n.state||"none",d=!!(n.message||"")&&(t==="success"||t==="error"),H=!!n.label,i=p(n.hideLabel,!1),m=typeof i=="object"&&i!==null?h(i,"base",!1):i,k={none:{bg:"var(--p-checkbox-background-color, var(--p-color-frosted))",border:"var(--p-checkbox-border-color, var(--p-color-contrast-lower))",hover:"var(--p-checkbox-border-color, var(--p-color-primary))",checked:"var(--p-color-primary)",checkedHover:"var(--p-checkbox-border-color, var(--p-color-contrast-high))",indeterminate:"var(--p-color-primary)",message:""},success:{bg:"var(--p-checkbox-background-color, var(--p-color-success-frosted-soft))",border:"var(--p-checkbox-border-color, var(--p-color-success))",hover:"var(--p-checkbox-border-color, var(--p-color-success))",checked:"var(--p-color-success)",checkedHover:"",indeterminate:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-checkbox-background-color, var(--p-color-error-frosted-soft))",border:"var(--p-checkbox-border-color, var(--p-color-error))",hover:"var(--p-checkbox-border-color, var(--p-color-error))",checked:"var(--p-color-error)",checkedHover:"",indeterminate:"var(--p-color-error)",message:"var(--p-color-error)"}},s=k[t]||k.none,x={"--p-cb-scale":u?"0.64285714":"1","--p-cb-radius":u?"var(--p-radius-md)":"var(--p-radius-lg)","--p-cb-bg":s.bg,"--p-cb-border":s.border,"--p-cb-hover":s.hover,"--p-cb-checked":l?"":s.checked,"--p-cb-checked-hover":!l&&t==="none"?s.checkedHover:"","--p-cb-checked-hover-border":!l&&t==="none"?"transparent":"","--p-cb-indeterminate":l?"":s.indeterminate,"--p-cb-check-mask":l?"":A,"--p-cb-dash-mask":l?"":B,"--p-cb-icon-bg":l?"":"var(--p-checkbox-icon-color, var(--p-color-canvas))","--p-cb-pe":w?"none":"","--p-cb-cursor":w?"not-allowed":"pointer","--p-cb-opacity":g?"0.4":"","--p-cb-fc-border":w?"GrayText":"","--p-cb-spinner-display":l?"":"none","--p-cb-lw-display":H?"":"none","--p-cb-msg":s.message,"--p-cb-msg-opacity":d?"":"0","--p-cb-msg-pos":d?"":"absolute","--p-cb-icon-display":d?"":"none"};if(typeof i=="object"&&i!==null){let c=e(m);for(const o of z)i[o]!==void 0&&(c=e(h(i,o,m))),y(x,o,c)}else y(x,"base",e(m));return x}function v(){return n.label||""}function a(){const p=n.state||"none",e=n.message||"";return!e||p!=="success"&&p!=="error"?"":e}function $(){const p=n.state||"none";return!(n.message||"")||p!=="success"&&p!=="error"?"":p==="error"?"exclamation":"check"}function j(){const p=n.state||"none";return p==="error"?"error":p==="success"?"success":""}function N(){return n.checked===!0||n.checked==="true"||n.checked===""}function S(){return n.disabled===!0||n.disabled==="true"||n.disabled===""}function _(){return n.state==="error"?"true":""}function T(){return n.loading===!0||n.loading==="true"||n.loading===""?"Loading":""}return r.jsxs("div",{className:["p-checkbox",n.className].filter(Boolean).join(" "),"data-pds":"checkbox",style:b(),children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-checkbox :where([data-pds-slot]){display:contents}

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
            margin: var(
              --p-cb-lw-s-m,
              var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0))
            );
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
              var(
                --p-cb-lw-s-ws,
                var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal))
              )
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
                var(
                  --p-cb-lw-s-pad,
                  var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0))
                )
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
                var(
                  --p-cb-lw-s-minw,
                  var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw))
                )
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
        }`}}),r.jsxs(r.Fragment,{children:[" ",r.jsxs("div",{className:"root",children:[r.jsxs("div",{className:"wrapper",children:[r.jsxs("div",{className:"input-wrapper",children:[r.jsx("input",{type:"checkbox",checked:!!N(),disabled:!!S(),"aria-invalid":_()}),r.jsx(L,{className:"spinner","aria-hidden":"true"})]}),r.jsx("div",{className:"label-wrapper",children:r.jsx("label",{className:"label",children:v()})})]}),r.jsxs("span",{className:"message",children:[r.jsx(C,{"aria-hidden":"true",name:$(),color:j()}),a()]}),r.jsx("span",{className:"loading",id:"loading",role:"status",children:T()})]})," "," "]})]})}export{U as default};
