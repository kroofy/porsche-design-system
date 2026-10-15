import{j as i}from"./react-C3neMvrl.js";import r from"./Icon-CUF7WVtc.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function v(n){function t(){const s=n.compact===!0||n.compact==="true"||n.compact==="",a=!!(n.label&&n.label!=="");return{"--_p-tag-dismissible-a":s?"0.64285714":"1","--p-tag-dismissible-radius":s?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-tag-dismissible-pad-block":a?"calc(16.8px * (var(--_p-tag-dismissible-a) - 0.64285714))":"calc(28px * (var(--_p-tag-dismissible-a) - 0.64285714) + 6px)","--p-tag-dismissible-label-display":a?"block":"none"}}function e(){let s=n.aria;if(!s)return"";if(typeof s=="string")try{s=JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{s=null}return typeof s=="object"&&s!==null&&s["aria-label"]||""}function l(){return n.label||""}function o(){return"https://cdn.ui.porsche.com/porsche-design-system/icons/close.eec3c5d.svg"}return i.jsxs("div",{className:["p-tag-dismissible",n.className].filter(Boolean).join(" "),"data-pds":"tag-dismissible",style:t(),children:[i.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-tag-dismissible :where([data-pds-slot]){display:contents}

        .p-tag-dismissible {
          display: inline-block;
          vertical-align: top;
        }
        .p-tag-dismissible[hidden] {
          display: none !important;
        }
        .p-tag-dismissible button{
          all: unset;
          display: flex;
          position: relative;
          align-items: center;
          gap: calc(22.4px * (var(--_p-tag-dismissible-a) - 0.64285714) + 4px);
          padding: var(--p-tag-dismissible-pad-block)
            calc(22.4px * (var(--_p-tag-dismissible-a) - 0.64285714) + 4px);
          border-radius: var(--p-tag-dismissible-radius);
          cursor: pointer;
          background: var(--p-color-frosted);
          color: var(--p-color-primary);
          text-align: start;
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
        }
        .p-tag-dismissible button:focus-visible{
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        @media (forced-colors: active) {
          .p-tag-dismissible button{
            outline: 2px solid CanvasText;
            outline-offset: -2px;
          }
          .p-tag-dismissible button:focus-visible{
            outline-color: Highlight;
          }
        }
        @media (hover: hover) {
          .p-tag-dismissible button:hover > .icon{
            background-color: var(--p-color-frosted);
          }
        }
        .p-tag-dismissible .label,
        .p-tag-dismissible button > span:nth-of-type(2) > span{
          display: var(--p-tag-dismissible-label-display);
          margin-bottom: -4px;
          color: var(--p-color-contrast-high);
          font-size: var(--p-typescale-xs);
        }
        .p-tag-dismissible .icon,
        .p-tag-dismissible button > span:last-of-type{
          padding: calc(11.2px * (var(--_p-tag-dismissible-a) - 0.64285714));
          margin: calc(
            -1 * calc(11.2px * (var(--_p-tag-dismissible-a) - 0.64285714))
          );
          transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
          border-radius: var(--p-radius-full);
        }
        .p-tag-dismissible .sr-only,
        .p-tag-dismissible span.sr-only,
        .p-tag-dismissible button > span:first-of-type{
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }`}}),i.jsxs(i.Fragment,{children:[" ",i.jsxs("button",{type:"button","aria-label":e(),children:[i.jsx("span",{className:"sr-only",children:"Remove:"}),i.jsxs("span",{children:[i.jsx("span",{className:"label",children:l()}),i.jsx("span",{"data-pds-slot":"",children:n.children})]}),i.jsx("span",{className:"icon",children:i.jsx(r,{name:"close","aria-hidden":"true",source:o()})})]})," "," "]})]})}export{v as default};
