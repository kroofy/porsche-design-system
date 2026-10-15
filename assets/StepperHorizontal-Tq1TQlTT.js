import m from"./Scroller-2Z6J9vyd.js";import{I as v,C as d,V as z,a as u}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var x=Object.defineProperty,y=Object.getOwnPropertyDescriptor,h=(s,e,t,r)=>{for(var p=r>1?void 0:r?y(e,t):e,o=s.length-1,a;o>=0;o--)(a=s[o])&&(p=(r?a(e,t,p):a(p))||p);return r&&p&&x(e,t,p),p};const i=["base","xs","s","m","l","xl","xxl"],g=(s,e)=>{if(s==null||s==="")return e;if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return e}return s},f=(s,e,t)=>s&&typeof s=="object"?s[e]===void 0?t:s[e]:s,l=s=>s==="medium"?"var(--p-typescale-md)":"var(--p-typescale-sm)",c=(s,e,t)=>{if(e==="base"){s["--p-sh-fs"]=t;return}s[`--p-sh-fs-${e}`]=t};let n=class{get hostStyle(){const s=g(this.size,"small"),e={};if(typeof s=="object"&&s!==null){let t=l(f(s,"base","small"));for(const r of i)s[r]!==void 0&&(t=l(f(s,r,"small"))),c(e,r,t)}else{const t=l(s);for(const r of i)c(e,r,t)}return e}};h([v()],n.prototype,"size",2);n=h([d({selector:"p-stepper-horizontal",standalone:!0,imports:[u,m],encapsulation:z.None,template:`
    <div class="p-stepper-horizontal" data-pds="stepper-horizontal" [style]="hostStyle">
    <div class="wrap">
      <p-scroller class="scroller"><span data-pds-slot=""><ng-content></ng-content></span></p-scroller>
    </div>
  
    </div>
  `,styles:[`.p-stepper-horizontal :where([data-pds-slot]){display:contents}

      .p-stepper-horizontal {
        display: contents;
      }
      .p-stepper-horizontal {
        display: grid;
      }
      .p-stepper-horizontal[hidden] {
        display: none !important;
      }
      .p-stepper-horizontal .wrap{
        display: contents;
      }
      .p-stepper-horizontal .scroller{
        place-self: flex-start;
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        font-size: var(--p-sh-fs, var(--p-typescale-sm));
      }
      @media (min-width: 480px) {
        .p-stepper-horizontal .scroller{
          font-size: var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm)));
        }
      }
      @media (min-width: 760px) {
        .p-stepper-horizontal .scroller{
          font-size: var(
            --p-sh-fs-s,
            var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm)))
          );
        }
      }
      @media (min-width: 1000px) {
        .p-stepper-horizontal .scroller{
          font-size: var(
            --p-sh-fs-m,
            var(
              --p-sh-fs-s,
              var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm)))
            )
          );
        }
      }
      @media (min-width: 1300px) {
        .p-stepper-horizontal .scroller{
          font-size: var(--p-sh-fs-l, var(--p-sh-fs-m));
        }
      }
      @media (min-width: 1760px) {
        .p-stepper-horizontal .scroller{
          font-size: var(--p-sh-fs-xl, var(--p-sh-fs-l));
        }
      }
      @media (min-width: 1920px) {
        .p-stepper-horizontal .scroller{
          font-size: var(--p-sh-fs-xxl, var(--p-sh-fs-xl));
        }
      }`]})],n);export{n as default};
