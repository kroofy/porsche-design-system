import{j as n}from"./react-C3neMvrl.js";import m from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function j(e){function r(){const s=e.state==="success"||e.state==="error"?e.state:"none",a=!!(e.message||"")&&(s==="success"||s==="error"),d=!!(e.label||""),p=(e.labelSize||"medium")==="small";return{"--p-fieldset-legend-display":d?"":"none","--p-fieldset-legend-font":p?"var(--p-font-weight-semibold) var(--p-typescale-sm)":"var(--p-font-weight-normal) var(--p-typescale-md)","--p-fieldset-msg-color":{none:"",success:"var(--p-color-success)",error:"var(--p-color-error)"}[s]||"","--p-fieldset-msg-opacity":a?"":"0","--p-fieldset-msg-pos":a?"":"absolute","--p-fieldset-icon-display":a?"":"none"}}function i(){return e.label||""}function o(){const s=e.state||"none",t=e.message||"";return!t||s!=="success"&&s!=="error"?"":t}function l(){const s=e.state||"none";return!(e.message||"")||s!=="success"&&s!=="error"?"":s==="error"?"exclamation":"check"}function c(){const s=e.state||"none";return s==="error"?"error":s==="success"?"success":""}return n.jsxs("div",{className:["p-fieldset",e.className].filter(Boolean).join(" "),"data-pds":"fieldset",style:r(),children:[n.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-fieldset :where([data-pds-slot]){display:contents}

        .p-fieldset {
          display: block;
        }
        .p-fieldset[hidden] {
          display: none !important;
        }
        .p-fieldset fieldset{
          all: unset;
          display: block;
        }
        .p-fieldset legend{
          all: unset;
          display: var(--p-fieldset-legend-display);
          margin-bottom: var(--p-spacing-static-md);
          color: var(--p-color-primary);
          font: var(--p-fieldset-legend-font) / var(--p-leading-normal)
            var(--p-font-porsche-next);
        }
        .p-fieldset .required{
          user-select: none;
        }
        .p-fieldset .message{
          display: flex;
          gap: var(--p-spacing-static-xs);
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-fieldset-msg-color);
          transition: color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            opacity var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
          margin-top: var(--p-spacing-static-md);
          opacity: var(--p-fieldset-msg-opacity);
          position: var(--p-fieldset-msg-pos);
        }
        .p-fieldset .message:empty{
          opacity: 0;
          position: absolute;
        }
        .p-fieldset .message .p-icon{
          display: var(--p-fieldset-icon-display);
        }`}}),n.jsx(n.Fragment,{children:n.jsxs("fieldset",{children:[n.jsx("legend",{children:i()}),n.jsx("span",{"data-pds-slot":"",children:e.children}),n.jsxs("span",{className:"message",id:"message",children:[n.jsx(m,{"aria-hidden":"true",name:l(),color:c()}),o()]})]})})]})}export{j as default};
