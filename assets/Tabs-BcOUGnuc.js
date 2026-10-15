import{j as s}from"./react-C3neMvrl.js";import p from"./TabsBar-CG17eKL-.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./host-DRskmCSE.js";import"./Scroller-Ckh7Friq.js";const f=["base","xs","s","m","l","xl","xxl"],b=(t,e)=>{if(t==null||t==="")return e;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return e}return t},c=(t,e,i)=>t&&typeof t=="object"?t[e]===void 0?i:t[e]:t;function j(t){function e(){const n=b(t.size,"small"),a={};if(typeof n=="object"&&n!==null){let o=String(c(n,"base","small")||"small");for(const r of f){n[r]!==void 0&&(o=String(c(n,r,o)));const d=r==="base"?"--p-tabs-size":`--p-tabs-size-${r}`;a[d]=o}}return a}function i(){return t.size||"small"}function l(){return t.background||"none"}function u(){return t.compact===!0||t.compact==="true"||t.compact===""}function m(){const n=t.activeTabIndex;if(n==null||n==="")return 0;const a=Number(n);return Number.isInteger(a)?a:0}return s.jsxs("div",{className:["p-tabs",t.className].filter(Boolean).join(" "),"data-pds":"tabs",style:e(),children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-tabs :where([data-pds-slot]){display:contents}

        .p-tabs {
          display: block;
        }
        .p-tabs[hidden] {
          display: none !important;
        }
        .p-tabs .root{
          margin-bottom: var(--p-spacing-static-sm);
        }
        .p-tabs .wrap{
          display: contents;
        }`}}),s.jsxs(s.Fragment,{children:[" ",s.jsxs("div",{className:"wrap",children:[s.jsx(p,{className:"root",size:i(),background:l(),compact:u(),activeTabIndex:m()}),s.jsx("span",{"data-pds-slot":"",children:t.children})]})," "," "]})]})}export{j as default};
