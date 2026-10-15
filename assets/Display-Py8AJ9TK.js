import{I as r,C as v,V as h,a as m}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var x=Object.defineProperty,u=Object.getOwnPropertyDescriptor,e=(s,a,p,l)=>{for(var i=l>1?void 0:l?u(a,p):a,o=s.length-1,n;o>=0;o--)(n=s[o])&&(i=(l?n(a,p,i):n(i))||i);return l&&i&&x(a,p,i),i};const y={small:"var(--p-typescale-3xl)",medium:"var(--p-typescale-4xl)",large:"var(--p-typescale-5xl)",inherit:"inherit","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)"},f={primary:"var(--p-color-primary)",inherit:"currentcolor"},g=["base","xs","s","m","l","xl","xxl"],d=s=>y[String(s)]||y.large,w=s=>{if(s==null||s==="")return"large";if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"large"}return s},c=(s,a,p)=>{const l=p==="inherit"?"":p;if(a==="base"){s["--p-display-fs"]=l;return}s[`--p-display-fs-${a}`]=l};let t=class{get hostStyle(){const s=this.ellipsis===!0||this.ellipsis==="true"||this.ellipsis==="",a={"--p-display-fg":f[this.color||"primary"]||f.primary,"--p-display-align":this.align||"start","--p-display-max":s?"100%":"","--p-display-overflow":s?"hidden":"","--p-display-ellipsis":s?"ellipsis":"","--p-display-ws":s?"nowrap":""},p=w(this.size);if(typeof p=="object"&&p!==null){let l=d(p.base||"large");for(const i of g)p[i]!==void 0&&(l=d(p[i])),c(a,i,l)}else c(a,"base",d(p));return a}};e([r()],t.prototype,"ellipsis",2);e([r()],t.prototype,"color",2);e([r()],t.prototype,"align",2);e([r()],t.prototype,"size",2);t=e([v({selector:"p-display",standalone:!0,imports:[m],encapsulation:h.None,template:`
    <div class="p-display" data-pds="display" [style]="hostStyle">
    <h3><span data-pds-slot=""><ng-content></ng-content></span></h3> 
    </div>
  `,styles:[`.p-display :where([data-pds-slot]){display:contents}

      .p-display {
        display: contents;
      }
      .p-display {
        display: block;
      }
      .p-display[hidden] {
        display: none !important;
      }
      .p-display [data-pds-slot] > :is(h1, h2, h3, h4, h5, h6){
        all: unset !important;
      }
      .p-display h3{
        all: unset;
        display: block;
        font: var(--p-font-weight-normal) var(--p-typescale-5xl) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        font-size: inherit;
        font-size: var(--p-display-fs);
        color: var(--p-display-fg);
        text-align: var(--p-display-align);
        max-width: var(--p-display-max);
        overflow: var(--p-display-overflow);
        text-overflow: var(--p-display-ellipsis);
        white-space: var(--p-display-ws);
      }
      @media (min-width: 480px) {
        .p-display h3{
          font-size: var(--p-display-fs-xs, var(--p-display-fs));
        }
      }
      @media (min-width: 760px) {
        .p-display h3{
          font-size: var(--p-display-fs-s, var(--p-display-fs));
        }
      }
      @media (min-width: 1000px) {
        .p-display h3{
          font-size: var(--p-display-fs-m, var(--p-display-fs));
        }
      }
      @media (min-width: 1300px) {
        .p-display h3{
          font-size: var(--p-display-fs-l, var(--p-display-fs));
        }
      }
      @media (min-width: 1760px) {
        .p-display h3{
          font-size: var(--p-display-fs-xl, var(--p-display-fs));
        }
      }
      @media (min-width: 1920px) {
        .p-display h3{
          font-size: var(--p-display-fs-xxl, var(--p-display-fs));
        }
      }`]})],t);export{t as default};
