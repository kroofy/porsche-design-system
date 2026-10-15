import{I as c,C as g,V as y,a as x}from"./angular-aNJmk6GY.js";import{I as u}from"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var w=Object.defineProperty,b=Object.getOwnPropertyDescriptor,p=(r,o,a,e)=>{for(var t=e>1?void 0:e?b(o,a):o,n=r.length-1,i;n>=0;n--)(i=r[n])&&(t=(e?i(o,a,t):i(t))||t);return e&&t&&w(o,a,t),t};const m={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},v={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)","contrast-low":"var(--p-color-contrast-low)","contrast-lower":"var(--p-color-contrast-lower)",success:"var(--p-color-success)",warning:"var(--p-color-warning)",error:"var(--p-color-error)",info:"var(--p-color-info)",inherit:"currentcolor"},z={"arrow-compact-left":1,"arrow-compact-right":1,"arrow-double-left":1,"arrow-double-right":1,"arrow-first":1,"arrow-head-left":1,"arrow-head-right":1,"arrow-last":1,"arrow-left":1,"arrow-right":1,chart:1,chat:1,copy:1,external:1,increase:1,list:1,logout:1,return:1,send:1},f=u,S=["base","xs","s","m","l","xl","xxl"],l=r=>m[String(r)]||m.sm,I=r=>{if(r==null||r==="")return"sm";if(typeof r=="string"&&r.charAt(0)==="{")try{return JSON.parse(r.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return r},d=(r,o,a)=>{const e=a==="inherit"?"":a;if(o==="base"){r["--p-icon-fs"]=e;return}r[`--p-icon-fs-${o}`]=e},h=(r,o)=>o&&/(\/)/.test(o)?o:"https://cdn.ui.porsche.com/porsche-design-system/icons/"+(f[r||"arrow-right"]||f["arrow-right"]);let s=class{get hostStyle(){const r=this.source||"",o=this.name||"arrow-right",a=h(o,r),e={"--p-icon-fallback":v[this.color||"primary"]||v.primary,"--p-icon-mask":'url("'+a+'") center/contain no-repeat',"--p-icon-flip":!r&&z[o]?"scaleX(-1)":"none"},t=I(this.size);if(typeof t=="object"&&t!==null){let n=l(t.base||"sm");for(const i of S)t[i]!==void 0&&(n=l(t[i])),d(e,i,n)}else d(e,"base",l(t));return e}get src(){return h(this.name,this.source)}get alt(){let r=this.aria;if(!r)return"";if(typeof r=="string")try{r=JSON.parse(r.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{r=null}return typeof r=="object"&&r!==null&&r["aria-label"]||""}};p([c()],s.prototype,"source",2);p([c()],s.prototype,"name",2);p([c()],s.prototype,"color",2);p([c()],s.prototype,"size",2);p([c()],s.prototype,"aria",2);s=p([g({selector:"p-icon",standalone:!0,imports:[x],encapsulation:y.None,template:`
    <div class="p-icon" data-pds="icon" [style]="hostStyle">
    <img
      width="24"
      height="24"
      loading="lazy"
      [attr.src]="src"
      [attr.alt]="alt"
    />
  
    </div>
  `,styles:[`.p-icon :where([data-pds-slot]){display:contents}

      .p-icon {
        display: contents;
      }
      .p-icon {
        display: inline-flex;
        vertical-align: top;
      }
      .p-icon[hidden] {
        display: none !important;
      }
      .p-icon img{
        display: block;
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        overflow: hidden;
        object-position: -9999px -9999px;
        pointer-events: none;
        width: var(--p-icon-size, var(--p-leading-normal));
        height: var(--p-icon-size, var(--p-leading-normal));
        font-family: var(--p-font-porsche-next);
        font-size: inherit;
        font-size: var(--p-icon-fs);
        -webkit-mask: var(--p-icon-mask);
        mask: var(--p-icon-mask);
        background: var(
          --p-icon-color,
          var(--p-icon-fallback, var(--p-color-primary))
        );
      }
      @media (forced-colors: active) {
        .p-icon img{
          background: CanvasText;
        }
      }
      .p-icon img:dir(rtl){
        transform: var(--p-icon-flip, none);
      }
      @media (min-width: 480px) {
        .p-icon img{
          font-size: var(--p-icon-fs-xs, var(--p-icon-fs));
        }
      }
      @media (min-width: 760px) {
        .p-icon img{
          font-size: var(--p-icon-fs-s, var(--p-icon-fs));
        }
      }
      @media (min-width: 1000px) {
        .p-icon img{
          font-size: var(--p-icon-fs-m, var(--p-icon-fs));
        }
      }
      @media (min-width: 1300px) {
        .p-icon img{
          font-size: var(--p-icon-fs-l, var(--p-icon-fs));
        }
      }
      @media (min-width: 1760px) {
        .p-icon img{
          font-size: var(--p-icon-fs-xl, var(--p-icon-fs));
        }
      }
      @media (min-width: 1920px) {
        .p-icon img{
          font-size: var(--p-icon-fs-xxl, var(--p-icon-fs));
        }
      }`]})],s);export{s as default};
