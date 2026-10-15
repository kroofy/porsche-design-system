import u from"./TabsBar-BWtfeKYl.js";import{I as p,C as d,V as m,a as b}from"./angular-aNJmk6GY.js";import"./host-DRskmCSE.js";import"./Scroller-2Z6J9vyd.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var v=Object.defineProperty,g=Object.getOwnPropertyDescriptor,n=(t,s,e,a)=>{for(var r=a>1?void 0:a?g(s,e):s,i=t.length-1,c;i>=0;i--)(c=t[i])&&(r=(a?c(s,e,r):c(r))||r);return a&&r&&v(s,e,r),r};const f=["base","xs","s","m","l","xl","xxl"],y=(t,s)=>{if(t==null||t==="")return s;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return s}return t},l=(t,s,e)=>t&&typeof t=="object"?t[s]===void 0?e:t[s]:t;let o=class{get hostStyle(){const t=y(this.size,"small"),s={};if(typeof t=="object"&&t!==null){let e=String(l(t,"base","small")||"small");for(const a of f){t[a]!==void 0&&(e=String(l(t,a,e)));const r=a==="base"?"--p-tabs-size":`--p-tabs-size-${a}`;s[r]=e}}return s}get sizeValue(){return this.size||"small"}get backgroundValue(){return this.background||"none"}get isCompact(){return this.compact===!0||this.compact==="true"||this.compact===""}get activeIndex(){const t=this.activeTabIndex;if(t==null||t==="")return 0;const s=Number(t);return Number.isInteger(s)?s:0}};n([p()],o.prototype,"size",2);n([p()],o.prototype,"background",2);n([p()],o.prototype,"compact",2);n([p()],o.prototype,"activeTabIndex",2);o=n([d({selector:"p-tabs",standalone:!0,imports:[b,u],encapsulation:m.None,template:`
    <div class="p-tabs" data-pds="tabs" [style]="hostStyle">
    <div class="wrap">
      <p-tabs-bar
        class="root"
        [size]="sizeValue"
        [background]="backgroundValue"
        [compact]="isCompact"
        [activeTabIndex]="activeIndex"
      ></p-tabs-bar>
      <span data-pds-slot=""><ng-content></ng-content></span>
    </div>
  
    </div>
  `,styles:[`.p-tabs :where([data-pds-slot]){display:contents}

      .p-tabs {
        display: contents;
      }
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
      }`]})],o);export{o as default};
