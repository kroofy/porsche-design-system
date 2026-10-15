import{a as g}from"./host-DRskmCSE.js";import f from"./Scroller-2Z6J9vyd.js";import{I as b,C as x,V as h,a as y}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var k=Object.defineProperty,z=Object.getOwnPropertyDescriptor,d=(a,t,p,n)=>{for(var r=n>1?void 0:n?z(t,p):t,i=a.length-1,l;i>=0;i--)(l=a[i])&&(r=(n?l(t,p,r):l(r))||r);return n&&r&&k(t,p,r),r};const u=["base","xs","s","m","l","xl","xxl"],B=(a,t)=>{if(a==null||a==="")return t;if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return t}return a},v=(a,t,p)=>a&&typeof a=="object"?a[t]===void 0?p:a[t]:a;let c=class{constructor(){this.hostAttr=g}get hostStyle(){const t=(s=>s===!0||s==="true"||s==="")(this.compact),p=this.background||"none",n=p!=="none",r=B(this.size,"small"),i=s=>s==="medium"?"var(--p-typescale-md)":"var(--p-typescale-sm)",o={"--p-tb-radius":n?t?"var(--p-radius-md)":"var(--p-radius-lg)":t?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-tb-pad":n?t?"calc(7 * var(--p-spacing-static-2xs) - var(--p-spacing-static-xs)) calc(var(--p-spacing-static-md) - var(--p-spacing-static-xs))":"calc(var(--p-spacing-static-md) - var(--p-spacing-static-xs)) calc(28 * var(--p-spacing-static-2xs) - var(--p-spacing-static-xs))":t?"calc(6 * var(--p-spacing-static-2xs)) var(--p-spacing-static-md)":"var(--p-spacing-static-md) calc(28 * var(--p-spacing-static-2xs))"};if(typeof r=="object"&&r!==null){let s=String(v(r,"base","small")||"small");for(const e of u){r[e]!==void 0&&(s=String(v(r,e,s)));const m=e==="base"?"--p-tb-fs":`--p-tb-fs-${e}`;o[m]=i(s)}}else{const s=i(r);o["--p-tb-fs"]=s;for(const e of u)e!=="base"&&(o[`--p-tb-fs-${e}`]=s)}if(n){const s={canvas:"var(--p-color-canvas)",surface:"var(--p-color-surface)",frosted:"var(--p-color-frosted)"};o["--p-tb-scroller-bg"]=s[p]||"",o["--p-tb-scroller-pad"]=t?"calc(3 * var(--p-spacing-static-2xs))":"var(--p-spacing-static-xs)",o["--p-tb-scroller-radius"]=t?"var(--p-radius-lg)":"var(--p-radius-xl)"}else o["--p-tb-scroller-bg"]="",o["--p-tb-scroller-pad"]="",o["--p-tb-scroller-radius"]="";return o}get isCompact(){return this.compact===!0||this.compact==="true"||this.compact===""}};d([b()],c.prototype,"compact",2);d([b()],c.prototype,"background",2);d([b()],c.prototype,"size",2);c=d([x({selector:"p-tabs-bar",standalone:!0,imports:[y,f],encapsulation:h.None,template:`
    <div class="p-tabs-bar" data-pds="tabs-bar" [style]="hostStyle" [attr.background]="hostAttr(background) ?? null">
    <div class="wrap">
      <p-scroller class="scroller"
        ><span data-pds-slot=""><ng-content></ng-content></span> <span class="bar"></span
      ></p-scroller>
    </div>
  
    </div>
  `,styles:[`.p-tabs-bar :where([data-pds-slot]){display:contents}

      .p-tabs-bar {
        display: contents;
      }
      .p-tabs-bar {
        display: grid;
      }
      .p-tabs-bar[hidden] {
        display: none !important;
      }
      .p-tabs-bar .wrap{
        display: contents;
      }
      .p-tabs-bar [data-pds-slot] > a,
      .p-tabs-bar [data-pds-slot] > button{
        all: unset !important;
        white-space: nowrap !important;
        cursor: pointer !important;
        border-radius: var(--p-tb-radius) !important;
        padding: var(--p-tb-pad) !important;
        font: var(--p-typescale-sm) / var(--p-leading-normal)
          var(--p-font-porsche-next) !important;
        font-size: var(--p-tb-fs) !important;
        color: var(--p-color-primary) !important;
        background: 0 0 / 0% 100% no-repeat !important;
        transition: background-color var(--p-duration-sm) var(--p-ease-in-out) !important;
      }
      .p-tabs-bar [data-pds-slot] > a:focus-visible,
      .p-tabs-bar [data-pds-slot] > button:focus-visible{
        outline: 2px solid var(--p-color-focus) !important;
        outline-offset: 2px !important;
      }
      .p-tabs-bar [data-pds-slot] > a[aria-current="true"],
      .p-tabs-bar [data-pds-slot] > button[aria-selected="true"]{
        background-image: linear-gradient(
          var(--p-color-frosted-strong),
          var(--p-color-frosted-strong)
        ) !important;
        background-size: 100% 100% !important;
        transition: background-size 0s linear var(--p-duration-md) !important;
      }
      @media (forced-colors: active) {
        .p-tabs-bar [data-pds-slot] > a,
        .p-tabs-bar [data-pds-slot] > button{
          forced-color-adjust: none !important;
          background: Canvas !important;
        }
        .p-tabs-bar [data-pds-slot] > a{
          color: LinkText !important;
          box-shadow: inset 0 0 0 2px LinkText !important;
        }
        .p-tabs-bar [data-pds-slot] > button{
          color: ButtonText !important;
          box-shadow: inset 0 0 0 2px ButtonBorder !important;
        }
        .p-tabs-bar [data-pds-slot] > a:focus-visible,
        .p-tabs-bar [data-pds-slot] > button:focus-visible{
          outline-color: Highlight !important;
        }
        .p-tabs-bar .bar{
          display: none;
        }
        .p-tabs-bar[background]:not([background="none"]) .scroller {
          forced-color-adjust: none;
          outline: 1px solid CanvasText;
        }
      }
      @media (hover: hover) {
        .p-tabs-bar [data-pds-slot] > a:not([aria-current="true"]):hover,
        .p-tabs-bar [data-pds-slot] > button:not([aria-selected="true"]):hover{
          background-color: var(--p-color-frosted) !important;
        }
      }
      .p-tabs-bar .scroller{
        --_p-scroller-focus-ring-radius: var(--p-tb-radius);
        place-self: flex-start;
      }
      .p-tabs-bar[background]:not([background="none"]) .scroller {
        background: var(--p-tb-scroller-bg);
        padding: var(--p-tb-scroller-pad);
        border-radius: var(--p-tb-scroller-radius);
      }
      .p-tabs-bar[background="frosted"] .scroller {
        -webkit-backdrop-filter: var(--p-blur-frosted);
        backdrop-filter: var(--p-blur-frosted);
      }
      .p-tabs-bar .bar{
        position: absolute;
        inset-inline-start: 0;
        width: 0px;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        border-radius: var(--p-tb-radius);
        background: var(--p-color-frosted-strong);
      }`]})],c);export{c as default};
