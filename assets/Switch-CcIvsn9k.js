import{j as p}from"./react-C3neMvrl.js";import g from"./Spinner-DLZl2BeF.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const d=["base","xs","s","m","l","xl","xxl"],v=(n,l)=>{if(n==null)return l;if(n==="")return typeof l=="boolean"?!0:l;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return l}return n},w=n=>n===!0||n==="true"||n==="",b=(n,l,a)=>n&&typeof n=="object"?n[l]===void 0?a:n[l]:n,f=(n,l,a)=>{const s=l==="base"?"--p-sw":`--p-sw-${l}`;if(a){n[`${s}-display`]="flex",n[`${s}-justify`]="space-between",n[`${s}-w`]="100%",n[`${s}-va`]="top";return}n[`${s}-display`]="inline-flex",n[`${s}-justify`]="flex-start",n[`${s}-w`]="auto",n[`${s}-va`]="top"},y=(n,l,a)=>{const s=l==="base"?"--p-sw-order":`--p-sw-${l}-order`;n[s]=a==="start"?"-1":"0"},j=(n,l,a)=>{const s=l==="base"?"--p-sw-lbl":`--p-sw-${l}-lbl`;if(a){n[`${s}-pos`]="absolute",n[`${s}-w`]="1px",n[`${s}-h`]="1px",n[`${s}-pad`]="0",n[`${s}-m`]="-1px",n[`${s}-ov`]="hidden",n[`${s}-clip`]="rect(0, 0, 0, 0)",n[`${s}-ws`]="nowrap",n[`${s}-pt`]="0";return}n[`${s}-pos`]="static",n[`${s}-w`]="auto",n[`${s}-h`]="auto",n[`${s}-pad`]="0",n[`${s}-m`]="0",n[`${s}-ov`]="visible",n[`${s}-clip`]="auto",n[`${s}-ws`]="normal",n[`${s}-pt`]="max(0px, calc((calc(var(--_p-switch-a) * 1.75rem) - var(--p-leading-normal)) / 2))"},c=(n,l,a,s,r)=>{if(typeof n=="object"&&n!==null){let i=r(b(n,"base",l));for(const t of d)n[t]!==void 0&&(i=r(b(n,t,l))),a(s,t,i);return}const o=r(n);for(const i of d)a(s,i,o)};function O(n){function l(){const s=w(n.checked),r=w(n.disabled),o=w(n.loading),i=w(n.compact),t=r||o,x=v(n.alignLabel,"end"),h=v(n.hideLabel,!1),m=v(n.stretch,!1),e={"--p-sw-a":i?"0.64285714":"1","--p-sw-border":s?"var(--p-color-success-low)":"var(--p-color-contrast-low)","--p-sw-hover-border":t?s?"var(--p-color-success-low)":"var(--p-color-contrast-low)":s?"var(--p-color-success)":"var(--p-color-primary)","--p-sw-btn-bg":s?"var(--p-color-success-frosted-soft)":"var(--p-color-frosted-soft)","--p-sw-toggle-bg":o?"transparent":s?"var(--p-color-success)":"var(--p-color-primary)","--p-sw-toggle-x":s?"calc(calc(var(--_p-switch-a) * 3rem) - 1px * 2 - 100% - calc(var(--_p-switch-a) * .1875rem))":"calc(var(--_p-switch-a) * .1875rem)","--p-sw-cursor":t?"not-allowed":"pointer","--p-sw-opacity":r?"0.4":"","--p-sw-spinner-display":o?"":"none","--p-sw-fc-opacity":r?"1":"","--p-sw-fc-color":r?"GrayText":"","--p-sw-fc-border":t?"GrayText":"","--p-sw-fc-label":t?"GrayText":""};return c(m,!1,f,e,w),c(x,"end",y,e,u=>u),c(h,!1,j,e,w),e}function a(){return n.loading===!0||n.loading==="true"||n.loading===""?"Loading":""}return p.jsxs("div",{className:["p-switch",n.className].filter(Boolean).join(" "),"data-pds":"switch",style:l(),children:[p.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-switch :where([data-pds-slot]){display:contents}

        .p-switch .wrap{
          display: contents;
        }
        .p-switch {
          --_p-switch-a: var(--p-sw-a, 1);
          display: var(--p-sw-display, inline-flex);
          justify-content: var(--p-sw-justify, flex-start) !important;
          width: var(--p-sw-w, auto) !important;
          vertical-align: var(--p-sw-va, top) !important;
          opacity: var(--p-sw-opacity);
          outline: 0 !important;
          font: var(--p-typescale-sm) var(--p-font-porsche-next) !important;
          gap: calc(
            11.2px * (var(--_p-switch-a) - 0.64285714) + 4px
          ) !important;
        }
        .p-switch[hidden] {
          display: none !important;
        }
        .p-switch button{
          all: unset;
          position: relative;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          box-sizing: border-box;
          width: calc(var(--_p-switch-a) * 3rem);
          height: calc(var(--_p-switch-a) * 1.75rem);
          margin-block: max(
            0px,
            calc(
              (var(--p-leading-normal) - calc(var(--_p-switch-a) * 1.75rem)) / 2
            )
          );
          font: var(--p-typescale-sm) var(--p-font-porsche-next);
          border: 1px solid var(--p-sw-border);
          border-radius: var(--p-radius-full);
          background: var(--p-sw-btn-bg);
          cursor: var(--p-sw-cursor, pointer);
          transition: background-color
              var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            border-color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
        }
        .p-switch button:focus-visible{
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        .p-switch button::before{
          content: "";
          position: absolute;
          inset: calc(
            -1px - max(0px, calc(24px - calc(var(--_p-switch-a) * 1.75rem)) / 2)
          );
        }
        .p-switch label{
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          min-width: 0;
          min-height: 0;
          cursor: var(--p-sw-cursor, pointer);
          color: var(--p-color-primary);
          order: var(--p-sw-order, 0);
          position: var(--p-sw-lbl-pos, static);
          width: var(--p-sw-lbl-w, auto);
          height: var(--p-sw-lbl-h, auto);
          padding: var(--p-sw-lbl-pad, 0);
          margin: var(--p-sw-lbl-m, 0);
          overflow: var(--p-sw-lbl-ov, visible);
          clip: var(--p-sw-lbl-clip, auto);
          white-space: var(--p-sw-lbl-ws, normal);
          padding-top: var(--p-sw-lbl-pt);
        }
        .p-switch .toggle{
          display: flex;
          place-items: center;
          place-content: center;
          width: calc(var(--_p-switch-a) * 1.25rem);
          height: calc(var(--_p-switch-a) * 1.25rem);
          border-radius: var(--p-radius-full);
          background: var(--p-sw-toggle-bg);
          transition: transform
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
          transform: translate3d(var(--p-sw-toggle-x), 0, 0);
        }
        .p-switch .toggle:dir(rtl){
          transform: translate3d(calc(var(--p-sw-toggle-x) * -1), 0, 0);
        }
        .p-switch .loading{
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }
        .p-switch .spinner{
          --p-spinner-size: calc(var(--_p-switch-a) * 1.75rem);
        }
        .p-switch .spinner,
        .p-switch .p-spinner{
          display: var(--p-sw-spinner-display);
        }
        @media (forced-colors: active) {
          .p-switch {
            opacity: var(--p-sw-fc-opacity, var(--p-sw-opacity, 1));
            color: var(--p-sw-fc-color);
          }
          .p-switch button{
            border-color: var(--p-sw-fc-border, var(--p-sw-border));
          }
          .p-switch button:focus-visible{
            outline-color: Highlight;
          }
          .p-switch label{
            color: var(--p-sw-fc-label, var(--p-color-primary));
          }
          .p-switch .toggle{
            background: CanvasText;
          }
        }
        @media (hover: hover) {
          .p-switch button:hover{
            border-color: var(--p-sw-hover-border, var(--p-sw-border));
          }
        }
        @media (min-width: 480px) {
          .p-switch {
            display: var(--p-sw-xs-display, var(--p-sw-display, inline-flex));
            justify-content: var(
              --p-sw-xs-justify,
              var(--p-sw-justify, flex-start)
            ) !important;
            width: var(--p-sw-xs-w, var(--p-sw-w, auto)) !important;
            vertical-align: var(--p-sw-xs-va, var(--p-sw-va, top)) !important;
          }
          .p-switch label{
            order: var(--p-sw-xs-order, var(--p-sw-order, 0));
            position: var(--p-sw-xs-lbl-pos, var(--p-sw-lbl-pos, static));
            width: var(--p-sw-xs-lbl-w, var(--p-sw-lbl-w, auto));
            height: var(--p-sw-xs-lbl-h, var(--p-sw-lbl-h, auto));
            padding: var(--p-sw-xs-lbl-pad, var(--p-sw-lbl-pad, 0));
            margin: var(--p-sw-xs-lbl-m, var(--p-sw-lbl-m, 0));
            overflow: var(--p-sw-xs-lbl-ov, var(--p-sw-lbl-ov, visible));
            clip: var(--p-sw-xs-lbl-clip, var(--p-sw-lbl-clip, auto));
            white-space: var(--p-sw-xs-lbl-ws, var(--p-sw-lbl-ws, normal));
            padding-top: var(--p-sw-xs-lbl-pt, var(--p-sw-lbl-pt));
          }
        }
        @media (min-width: 760px) {
          .p-switch {
            display: var(
              --p-sw-s-display,
              var(--p-sw-xs-display, var(--p-sw-display, inline-flex))
            );
            justify-content: var(
              --p-sw-s-justify,
              var(--p-sw-xs-justify, var(--p-sw-justify, flex-start))
            ) !important;
            width: var(
              --p-sw-s-w,
              var(--p-sw-xs-w, var(--p-sw-w, auto))
            ) !important;
            vertical-align: var(
              --p-sw-s-va,
              var(--p-sw-xs-va, var(--p-sw-va, top))
            ) !important;
          }
          .p-switch label{
            order: var(
              --p-sw-s-order,
              var(--p-sw-xs-order, var(--p-sw-order, 0))
            );
            position: var(
              --p-sw-s-lbl-pos,
              var(--p-sw-xs-lbl-pos, var(--p-sw-lbl-pos, static))
            );
            width: var(
              --p-sw-s-lbl-w,
              var(--p-sw-xs-lbl-w, var(--p-sw-lbl-w, auto))
            );
            height: var(
              --p-sw-s-lbl-h,
              var(--p-sw-xs-lbl-h, var(--p-sw-lbl-h, auto))
            );
            padding: var(
              --p-sw-s-lbl-pad,
              var(--p-sw-xs-lbl-pad, var(--p-sw-lbl-pad, 0))
            );
            margin: var(
              --p-sw-s-lbl-m,
              var(--p-sw-xs-lbl-m, var(--p-sw-lbl-m, 0))
            );
            overflow: var(
              --p-sw-s-lbl-ov,
              var(--p-sw-xs-lbl-ov, var(--p-sw-lbl-ov, visible))
            );
            clip: var(
              --p-sw-s-lbl-clip,
              var(--p-sw-xs-lbl-clip, var(--p-sw-lbl-clip, auto))
            );
            white-space: var(
              --p-sw-s-lbl-ws,
              var(--p-sw-xs-lbl-ws, var(--p-sw-lbl-ws, normal))
            );
            padding-top: var(
              --p-sw-s-lbl-pt,
              var(--p-sw-xs-lbl-pt, var(--p-sw-lbl-pt))
            );
          }
        }
        @media (min-width: 1000px) {
          .p-switch {
            display: var(
              --p-sw-m-display,
              var(
                --p-sw-s-display,
                var(--p-sw-xs-display, var(--p-sw-display, inline-flex))
              )
            );
            justify-content: var(
              --p-sw-m-justify,
              var(
                --p-sw-s-justify,
                var(--p-sw-xs-justify, var(--p-sw-justify, flex-start))
              )
            ) !important;
            width: var(
              --p-sw-m-w,
              var(--p-sw-s-w, var(--p-sw-xs-w, var(--p-sw-w, auto)))
            ) !important;
            vertical-align: var(
              --p-sw-m-va,
              var(--p-sw-s-va, var(--p-sw-xs-va, var(--p-sw-va, top)))
            ) !important;
          }
          .p-switch label{
            order: var(
              --p-sw-m-order,
              var(--p-sw-s-order, var(--p-sw-xs-order, var(--p-sw-order, 0)))
            );
            position: var(
              --p-sw-m-lbl-pos,
              var(
                --p-sw-s-lbl-pos,
                var(--p-sw-xs-lbl-pos, var(--p-sw-lbl-pos, static))
              )
            );
            width: var(
              --p-sw-m-lbl-w,
              var(--p-sw-s-lbl-w, var(--p-sw-xs-lbl-w, var(--p-sw-lbl-w, auto)))
            );
            height: var(
              --p-sw-m-lbl-h,
              var(--p-sw-s-lbl-h, var(--p-sw-xs-lbl-h, var(--p-sw-lbl-h, auto)))
            );
            padding: var(
              --p-sw-m-lbl-pad,
              var(
                --p-sw-s-lbl-pad,
                var(--p-sw-xs-lbl-pad, var(--p-sw-lbl-pad, 0))
              )
            );
            margin: var(
              --p-sw-m-lbl-m,
              var(--p-sw-s-lbl-m, var(--p-sw-xs-lbl-m, var(--p-sw-lbl-m, 0)))
            );
            overflow: var(
              --p-sw-m-lbl-ov,
              var(
                --p-sw-s-lbl-ov,
                var(--p-sw-xs-lbl-ov, var(--p-sw-lbl-ov, visible))
              )
            );
            clip: var(
              --p-sw-m-lbl-clip,
              var(
                --p-sw-s-lbl-clip,
                var(--p-sw-xs-lbl-clip, var(--p-sw-lbl-clip, auto))
              )
            );
            white-space: var(
              --p-sw-m-lbl-ws,
              var(
                --p-sw-s-lbl-ws,
                var(--p-sw-xs-lbl-ws, var(--p-sw-lbl-ws, normal))
              )
            );
            padding-top: var(
              --p-sw-m-lbl-pt,
              var(--p-sw-s-lbl-pt, var(--p-sw-xs-lbl-pt, var(--p-sw-lbl-pt)))
            );
          }
        }
        @media (min-width: 1300px) {
          .p-switch {
            display: var(--p-sw-l-display, var(--p-sw-m-display));
            justify-content: var(
              --p-sw-l-justify,
              var(--p-sw-m-justify)
            ) !important;
            width: var(--p-sw-l-w, var(--p-sw-m-w)) !important;
            vertical-align: var(--p-sw-l-va, var(--p-sw-m-va)) !important;
          }
          .p-switch label{
            order: var(--p-sw-l-order, var(--p-sw-m-order));
            position: var(--p-sw-l-lbl-pos, var(--p-sw-m-lbl-pos));
            width: var(--p-sw-l-lbl-w, var(--p-sw-m-lbl-w));
            height: var(--p-sw-l-lbl-h, var(--p-sw-m-lbl-h));
            padding: var(--p-sw-l-lbl-pad, var(--p-sw-m-lbl-pad));
            margin: var(--p-sw-l-lbl-m, var(--p-sw-m-lbl-m));
            overflow: var(--p-sw-l-lbl-ov, var(--p-sw-m-lbl-ov));
            clip: var(--p-sw-l-lbl-clip, var(--p-sw-m-lbl-clip));
            white-space: var(--p-sw-l-lbl-ws, var(--p-sw-m-lbl-ws));
            padding-top: var(--p-sw-l-lbl-pt, var(--p-sw-m-lbl-pt));
          }
        }
        @media (min-width: 1760px) {
          .p-switch {
            display: var(--p-sw-xl-display, var(--p-sw-l-display));
            justify-content: var(
              --p-sw-xl-justify,
              var(--p-sw-l-justify)
            ) !important;
            width: var(--p-sw-xl-w, var(--p-sw-l-w)) !important;
            vertical-align: var(--p-sw-xl-va, var(--p-sw-l-va)) !important;
          }
          .p-switch label{
            order: var(--p-sw-xl-order, var(--p-sw-l-order));
            position: var(--p-sw-xl-lbl-pos, var(--p-sw-l-lbl-pos));
            width: var(--p-sw-xl-lbl-w, var(--p-sw-l-lbl-w));
            height: var(--p-sw-xl-lbl-h, var(--p-sw-l-lbl-h));
            padding: var(--p-sw-xl-lbl-pad, var(--p-sw-l-lbl-pad));
            margin: var(--p-sw-xl-lbl-m, var(--p-sw-l-lbl-m));
            overflow: var(--p-sw-xl-lbl-ov, var(--p-sw-l-lbl-ov));
            clip: var(--p-sw-xl-lbl-clip, var(--p-sw-l-lbl-clip));
            white-space: var(--p-sw-xl-lbl-ws, var(--p-sw-l-lbl-ws));
            padding-top: var(--p-sw-xl-lbl-pt, var(--p-sw-l-lbl-pt));
          }
        }
        @media (min-width: 1920px) {
          .p-switch {
            display: var(--p-sw-xxl-display, var(--p-sw-xl-display));
            justify-content: var(
              --p-sw-xxl-justify,
              var(--p-sw-xl-justify)
            ) !important;
            width: var(--p-sw-xxl-w, var(--p-sw-xl-w)) !important;
            vertical-align: var(--p-sw-xxl-va, var(--p-sw-xl-va)) !important;
          }
          .p-switch label{
            order: var(--p-sw-xxl-order, var(--p-sw-xl-order));
            position: var(--p-sw-xxl-lbl-pos, var(--p-sw-xl-lbl-pos));
            width: var(--p-sw-xxl-lbl-w, var(--p-sw-xl-lbl-w));
            height: var(--p-sw-xxl-lbl-h, var(--p-sw-xl-lbl-h));
            padding: var(--p-sw-xxl-lbl-pad, var(--p-sw-xl-lbl-pad));
            margin: var(--p-sw-xxl-lbl-m, var(--p-sw-xl-lbl-m));
            overflow: var(--p-sw-xxl-lbl-ov, var(--p-sw-xl-lbl-ov));
            clip: var(--p-sw-xxl-lbl-clip, var(--p-sw-xl-lbl-clip));
            white-space: var(--p-sw-xxl-lbl-ws, var(--p-sw-xl-lbl-ws));
            padding-top: var(--p-sw-xxl-lbl-pt, var(--p-sw-xl-lbl-pt));
          }
        }`}}),p.jsxs(p.Fragment,{children:[" ",p.jsxs("div",{className:"wrap",children:[p.jsx("button",{type:"button",role:"switch",children:p.jsx("span",{className:"toggle",children:p.jsx(g,{className:"spinner","aria-hidden":"true"})})}),p.jsx("label",{children:p.jsx("span",{"data-pds-slot":"",children:n.children})}),p.jsx("span",{className:"loading",id:"loading",role:"status",children:a()})]})," "," "]})]})}export{O as default};
