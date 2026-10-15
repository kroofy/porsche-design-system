import{I as l,C as c,V as w,a as m}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var x=Object.defineProperty,u=Object.getOwnPropertyDescriptor,h=(i,r,d,e)=>{for(var t=e>1?void 0:e?u(r,d):r,o=i.length-1,v;o>=0;o--)(v=i[o])&&(t=(e?v(r,d,t):v(t))||t);return e&&t&&x(r,d,t),t};const s={"contrast-lower":"var(--p-color-contrast-lower)","contrast-low":"var(--p-color-contrast-low)","contrast-medium":"var(--p-color-contrast-medium)","contrast-high":"var(--p-color-contrast-high)"},f=["base","xs","s","m","l","xl","xxl"],a=i=>i==="vertical"?{h:"100%",w:"1px"}:{h:"1px",w:"100%"},g=i=>{if(i==null||i==="")return"horizontal";if(typeof i=="string"&&i.charAt(0)==="{")try{return JSON.parse(i)}catch{return"horizontal"}return i},n=(i,r,d)=>{if(r==="base"){i["--p-divider-h"]=d.h,i["--p-divider-w"]=d.w;return}i[`--p-divider-h-${r}`]=d.h,i[`--p-divider-w-${r}`]=d.w};let p=class{get hostStyle(){const i={"--p-divider-bg":s[this.color||"contrast-lower"]||s["contrast-lower"]},r=g(this.direction);if(typeof r=="object"&&r!==null){let d=a(r.base||"horizontal");for(const e of f)r[e]!==void 0&&(d=a(r[e])),n(i,e,d)}else n(i,"base",a(String(r)));return i}};h([l()],p.prototype,"color",2);h([l()],p.prototype,"direction",2);p=h([c({selector:"p-divider",standalone:!0,imports:[m],encapsulation:w.None,template:`
    <div class="p-divider" data-pds="divider" [style]="hostStyle">
    <hr /> 
    </div>
  `,styles:[`.p-divider :where([data-pds-slot]){display:contents}

      .p-divider {
        display: contents;
      }
      .p-divider {
        display: block;
      }
      .p-divider[hidden] {
        display: none !important;
      }
      .p-divider hr{
        all: unset;
        display: block;
        background: var(--p-divider-bg);
        height: var(--p-divider-h, 1px);
        width: var(--p-divider-w, 100%);
      }
      @media (forced-colors: active) {
        .p-divider hr{
          background: CanvasText;
        }
      }
      @media (min-width: 480px) {
        .p-divider hr{
          height: var(--p-divider-h-xs, var(--p-divider-h, 1px));
          width: var(--p-divider-w-xs, var(--p-divider-w, 100%));
        }
      }
      @media (min-width: 760px) {
        .p-divider hr{
          height: var(--p-divider-h-s, var(--p-divider-h, 1px));
          width: var(--p-divider-w-s, var(--p-divider-w, 100%));
        }
      }
      @media (min-width: 1000px) {
        .p-divider hr{
          height: var(--p-divider-h-m, var(--p-divider-h, 1px));
          width: var(--p-divider-w-m, var(--p-divider-w, 100%));
        }
      }
      @media (min-width: 1300px) {
        .p-divider hr{
          height: var(--p-divider-h-l, var(--p-divider-h, 1px));
          width: var(--p-divider-w-l, var(--p-divider-w, 100%));
        }
      }
      @media (min-width: 1760px) {
        .p-divider hr{
          height: var(--p-divider-h-xl, var(--p-divider-h, 1px));
          width: var(--p-divider-w-xl, var(--p-divider-w, 100%));
        }
      }
      @media (min-width: 1920px) {
        .p-divider hr{
          height: var(--p-divider-h-xxl, var(--p-divider-h, 1px));
          width: var(--p-divider-w-xxl, var(--p-divider-w, 100%));
        }
      }`]})],p);export{p as default};
