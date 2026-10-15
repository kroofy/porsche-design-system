import{I as l,C as m,V as f,a as x}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var y=Object.defineProperty,u=Object.getOwnPropertyDescriptor,r=(e,i,t,a)=>{for(var s=a>1?void 0:a?u(i,t):i,n=e.length-1,o;n>=0;n--)(o=e[n])&&(s=(a?o(i,t,s):o(s))||s);return a&&s&&y(i,t,s),s};const d={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},g={regular:"var(--p-font-weight-normal)",normal:"var(--p-font-weight-normal)","semi-bold":"var(--p-font-weight-semibold)",semibold:"var(--p-font-weight-semibold)",bold:"var(--p-font-weight-bold)"},c={primary:"var(--p-color-primary)","contrast-higher":"var(--p-color-contrast-higher)","contrast-high":"var(--p-color-contrast-high)","contrast-medium":"var(--p-color-contrast-medium)",inherit:"currentcolor"},w=["base","xs","s","m","l","xl","xxl"],h=e=>d[String(e)]||d["2xl"],b=e=>{if(e==null||e==="")return"2xl";if(typeof e=="string"&&e.charAt(0)==="{")try{return JSON.parse(e.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"2xl"}return e},v=(e,i,t)=>{const a=t==="inherit"?"":t;if(i==="base"){e["--p-heading-fs"]=a;return}e[`--p-heading-fs-${i}`]=a};let p=class{get hostStyle(){const e=this.hyphens||"none",i=this.ellipsis===!0||this.ellipsis==="true"||this.ellipsis==="",t={"--p-heading-weight":g[this.weight||"normal"]||g.normal,"--p-heading-fg":c[this.color||"primary"]||c.primary,"--p-heading-align":this.align||"start","--p-heading-hyphens":e,"--p-heading-wrap":e==="auto"||e==="manual"?"break-word":"","--p-heading-max":i?"100%":"","--p-heading-overflow":i?"hidden":"","--p-heading-ellipsis":i?"ellipsis":"","--p-heading-ws":i?"nowrap":""},a=b(this.size);if(typeof a=="object"&&a!==null){let s=h(a.base||"2xl");for(const n of w)a[n]!==void 0&&(s=h(a[n])),v(t,n,s)}else v(t,"base",h(a));return t}};r([l()],p.prototype,"hyphens",2);r([l()],p.prototype,"ellipsis",2);r([l()],p.prototype,"weight",2);r([l()],p.prototype,"color",2);r([l()],p.prototype,"align",2);r([l()],p.prototype,"size",2);p=r([m({selector:"p-heading",standalone:!0,imports:[x],encapsulation:f.None,template:`
    <div class="p-heading" data-pds="heading" [style]="hostStyle">
    <h2><span data-pds-slot=""><ng-content></ng-content></span></h2> 
    </div>
  `,styles:[`.p-heading :where([data-pds-slot]){display:contents}

      .p-heading {
        display: contents;
      }
      .p-heading {
        display: block;
      }
      .p-heading[hidden] {
        display: none !important;
      }
      .p-heading [data-pds-slot] > :is(h1, h2, h3, h4, h5, h6){
        all: unset;
      }
      .p-heading h2{
        all: unset;
        display: block;
        font: var(--p-heading-weight) var(--p-typescale-2xl) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        font-size: inherit;
        font-size: var(--p-heading-fs);
        color: var(--p-heading-fg);
        text-align: var(--p-heading-align);
        hyphens: var(--p-heading-hyphens);
        overflow-wrap: var(--p-heading-wrap);
        max-width: var(--p-heading-max);
        overflow: var(--p-heading-overflow);
        text-overflow: var(--p-heading-ellipsis);
        white-space: var(--p-heading-ws);
      }
      @media (min-width: 480px) {
        .p-heading h2{
          font-size: var(--p-heading-fs-xs, var(--p-heading-fs));
        }
      }
      @media (min-width: 760px) {
        .p-heading h2{
          font-size: var(--p-heading-fs-s, var(--p-heading-fs));
        }
      }
      @media (min-width: 1000px) {
        .p-heading h2{
          font-size: var(--p-heading-fs-m, var(--p-heading-fs));
        }
      }
      @media (min-width: 1300px) {
        .p-heading h2{
          font-size: var(--p-heading-fs-l, var(--p-heading-fs));
        }
      }
      @media (min-width: 1760px) {
        .p-heading h2{
          font-size: var(--p-heading-fs-xl, var(--p-heading-fs));
        }
      }
      @media (min-width: 1920px) {
        .p-heading h2{
          font-size: var(--p-heading-fs-xxl, var(--p-heading-fs));
        }
      }`]})],p);export{p as default};
