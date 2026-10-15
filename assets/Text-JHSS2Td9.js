import{I as i,C as f,V as d,a as y}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var g=Object.defineProperty,u=Object.getOwnPropertyDescriptor,o=(t,s,p,e)=>{for(var r=e>1?void 0:e?u(s,p):s,l=t.length-1,n;l>=0;l--)(n=t[l])&&(r=(e?n(s,p,r):n(r))||r);return e&&r&&g(s,p,r),r};const c={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},v={regular:"var(--p-font-weight-normal)",normal:"var(--p-font-weight-normal)","semi-bold":"var(--p-font-weight-semibold)",semibold:"var(--p-font-weight-semibold)",bold:"var(--p-font-weight-bold)"},h={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",success:"var(--p-color-success)",warning:"var(--p-color-warning)",error:"var(--p-color-error)",info:"var(--p-color-info)",inherit:"currentcolor"},w=["base","xs","s","m","l","xl","xxl"],x=t=>c[String(t)]||c.sm,b=t=>{if(t==null||t==="")return"sm";if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return t},m=(t,s,p)=>{const e=p==="inherit"?"":p;if(s==="base"){t["--p-text-fs"]=e;return}t[`--p-text-fs-${s}`]=e};let a=class{get hostStyle(){const t=this.hyphens||"inherit",s=this.ellipsis===!0||this.ellipsis==="true"||this.ellipsis==="",p={"--p-text-weight":v[this.weight||"normal"]||v.normal,"--p-text-fg":h[this.color||"primary"]||h.primary,"--p-text-align":this.align||"start","--p-text-hyphens":t==="inherit"?"":t,"--p-text-wrap":t==="auto"||t==="manual"?"break-word":"","--p-text-max":s?"100%":"","--p-text-overflow":s?"hidden":"","--p-text-ellipsis":s?"ellipsis":"","--p-text-ws":s?"nowrap":""},e=b(this.size);if(typeof e=="object"&&e!==null){let r=x(e.base||"sm");for(const l of w)e[l]!==void 0&&(r=x(e[l])),m(p,l,r)}else m(p,"base",x(e));return p}};o([i()],a.prototype,"hyphens",2);o([i()],a.prototype,"ellipsis",2);o([i()],a.prototype,"weight",2);o([i()],a.prototype,"color",2);o([i()],a.prototype,"align",2);o([i()],a.prototype,"size",2);a=o([f({selector:"p-text",standalone:!0,imports:[y],encapsulation:d.None,template:`
    <div class="p-text" data-pds="text" [style]="hostStyle">
    <p><span data-pds-slot=""><ng-content></ng-content></span></p> 
    </div>
  `,styles:[`.p-text :where([data-pds-slot]){display:contents}

      .p-text {
        display: contents;
      }
      .p-text {
        display: block;
      }
      .p-text[hidden] {
        display: none !important;
      }
      .p-text [data-pds-slot] > 
          :is(p, span, div, address, blockquote, figcaption, cite, time, legend){
        all: unset;
      }
      .p-text p{
        all: unset;
        display: block;
        font: var(--p-text-weight) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        font-size: inherit;
        font-size: var(--p-text-fs);
        color: var(--p-text-fg);
        text-align: var(--p-text-align);
        hyphens: inherit;
        hyphens: var(--p-text-hyphens);
        overflow-wrap: var(--p-text-wrap);
        max-width: var(--p-text-max);
        overflow: var(--p-text-overflow);
        text-overflow: var(--p-text-ellipsis);
        white-space: var(--p-text-ws);
      }
      @media (min-width: 480px) {
        .p-text p{
          font-size: var(--p-text-fs-xs, var(--p-text-fs));
        }
      }
      @media (min-width: 760px) {
        .p-text p{
          font-size: var(--p-text-fs-s, var(--p-text-fs));
        }
      }
      @media (min-width: 1000px) {
        .p-text p{
          font-size: var(--p-text-fs-m, var(--p-text-fs));
        }
      }
      @media (min-width: 1300px) {
        .p-text p{
          font-size: var(--p-text-fs-l, var(--p-text-fs));
        }
      }
      @media (min-width: 1760px) {
        .p-text p{
          font-size: var(--p-text-fs-xl, var(--p-text-fs));
        }
      }
      @media (min-width: 1920px) {
        .p-text p{
          font-size: var(--p-text-fs-xxl, var(--p-text-fs));
        }
      }`]})],a);export{a as default};
