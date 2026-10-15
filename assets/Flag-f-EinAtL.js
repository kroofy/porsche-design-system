import{I as f,C as m,V as v,a as x}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var d=Object.defineProperty,y=Object.getOwnPropertyDescriptor,r=(e,a,t,s)=>{for(var l=s>1?void 0:s?y(a,t):a,i=e.length-1,n;i>=0;i--)(n=e[i])&&(l=(s?n(a,t,l):n(l))||l);return s&&l&&d(a,t,l),l};const g={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},h=["base","xs","s","m","l","xl","xxl"],o=e=>g[String(e)]||g.sm,u=e=>{if(e==null||e==="")return"sm";if(typeof e=="string"&&e.charAt(0)==="{")try{return JSON.parse(e.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return e},c=(e,a,t)=>{const s=t==="inherit"?"":t;if(a==="base"){e["--p-flag-fs"]=s;return}e[`--p-flag-fs-${a}`]=s};let p=class{get hostStyle(){const e={},a=u(this.size);if(typeof a=="object"&&a!==null){let t=o(a.base||"sm");for(const s of h)a[s]!==void 0&&(t=o(a[s])),c(e,s,t)}else c(e,"base",o(a));return e}get src(){const e={de:"de.b575e11.svg",ch:"ch.1cc9a58.svg",pt:"pt.c903b10.svg",xx:"xx.acc7ae8.svg"},a=this.name||"de";return"https://cdn.ui.porsche.com/porsche-design-system/flags/"+(e[a]||e.xx)}get alt(){let e=this.aria;if(!e)return"";if(typeof e=="string")try{e=JSON.parse(e.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{e=null}return typeof e=="object"&&e!==null&&e["aria-label"]||""}};r([f()],p.prototype,"size",2);r([f()],p.prototype,"name",2);r([f()],p.prototype,"aria",2);p=r([m({selector:"p-flag",standalone:!0,imports:[x],encapsulation:v.None,template:`
    <div class="p-flag" data-pds="flag" [style]="hostStyle">
    <img
      width="24"
      height="24"
      loading="lazy"
      [attr.src]="src"
      [attr.alt]="alt"
    />
  
    </div>
  `,styles:[`.p-flag :where([data-pds-slot]){display:contents}

      .p-flag {
        display: contents;
      }
      .p-flag {
        display: inline-flex;
        vertical-align: top;
      }
      .p-flag[hidden] {
        display: none !important;
      }
      .p-flag img{
        display: block;
        margin: 0;
        padding: 1px;
        border: 0;
        outline: 0;
        overflow: hidden;
        box-sizing: border-box;
        pointer-events: none;
        width: var(--p-flag-size, var(--p-leading-normal));
        height: var(--p-flag-size, var(--p-leading-normal));
        font-family: var(--p-font-porsche-next);
        font-size: inherit;
        font-size: var(--p-flag-fs);
      }
      @media (min-width: 480px) {
        .p-flag img{
          font-size: var(--p-flag-fs-xs, var(--p-flag-fs));
        }
      }
      @media (min-width: 760px) {
        .p-flag img{
          font-size: var(--p-flag-fs-s, var(--p-flag-fs));
        }
      }
      @media (min-width: 1000px) {
        .p-flag img{
          font-size: var(--p-flag-fs-m, var(--p-flag-fs));
        }
      }
      @media (min-width: 1300px) {
        .p-flag img{
          font-size: var(--p-flag-fs-l, var(--p-flag-fs));
        }
      }
      @media (min-width: 1760px) {
        .p-flag img{
          font-size: var(--p-flag-fs-xl, var(--p-flag-fs));
        }
      }
      @media (min-width: 1920px) {
        .p-flag img{
          font-size: var(--p-flag-fs-xxl, var(--p-flag-fs));
        }
      }`]})],p);export{p as default};
