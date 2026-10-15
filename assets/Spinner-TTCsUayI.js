import{I as c,C as m,V as h,a as y}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var x=Object.defineProperty,u=Object.getOwnPropertyDescriptor,p=(r,e,a,s)=>{for(var i=s>1?void 0:s?u(e,a):e,t=r.length-1,l;t>=0;t--)(l=r[t])&&(i=(s?l(e,a,i):l(i))||i);return s&&i&&x(e,a,i),i};const v={"xx-small":"var(--p-typescale-2xs)","x-small":"var(--p-typescale-xs)",small:"var(--p-typescale-sm)",medium:"var(--p-typescale-md)",large:"var(--p-typescale-lg)","x-large":"var(--p-typescale-xl)","xx-large":"var(--p-typescale-2xl)","2xs":"var(--p-typescale-2xs)",xs:"var(--p-typescale-xs)",sm:"var(--p-typescale-sm)",md:"var(--p-typescale-md)",lg:"var(--p-typescale-lg)",xl:"var(--p-typescale-xl)","2xl":"var(--p-typescale-2xl)","3xl":"var(--p-typescale-3xl)","4xl":"var(--p-typescale-4xl)","5xl":"var(--p-typescale-5xl)",inherit:"inherit"},d={primary:"var(--p-color-primary)",inherit:"currentcolor"},g=["base","xs","s","m","l","xl","xxl"],o=r=>v[String(r)]||v.sm,b=r=>{if(r==null||r==="")return"sm";if(typeof r=="string"&&r.charAt(0)==="{")try{return JSON.parse(r.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return"sm"}return r},f=(r,e,a)=>{const s=a==="inherit"?"":a;if(e==="base"){r["--p-spinner-fs"]=s;return}r[`--p-spinner-fs-${e}`]=s};let n=class{get hostStyle(){const r={"--p-spinner-fallback":d[this.color||"primary"]||d.primary},e=b(this.size);if(typeof e=="object"&&e!==null){let a=o(e.base||"sm");for(const s of g)e[s]!==void 0&&(a=o(e[s])),f(r,s,a)}else f(r,"base",o(e));return r}get ariaLabel(){let r=this.aria;if(!r)return"";if(typeof r=="string")try{r=JSON.parse(r.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{r=null}return typeof r=="object"&&r!==null&&r["aria-label"]||""}};p([c()],n.prototype,"color",2);p([c()],n.prototype,"size",2);p([c()],n.prototype,"aria",2);n=p([m({selector:"p-spinner",standalone:!0,imports:[y],encapsulation:h.None,template:`
    <div class="p-spinner" data-pds="spinner" [style]="hostStyle">
    <div role="alert" aria-live="assertive" [attr.aria-label]="ariaLabel">
      <span class="sr-only"></span>
      <svg
        viewBox="-16 -16 32 32"
        width="100%"
        height="100%"
        focusable="false"
        aria-hidden="true"
      >
        <circle r="11"></circle>
        <circle r="11"></circle>
      </svg>
    </div>
  
    </div>
  `,styles:[`.p-spinner :where([data-pds-slot]){display:contents}

      .p-spinner {
        display: contents;
      }
      .p-spinner {
        display: inline-flex;
        vertical-align: top;
      }
      .p-spinner[hidden] {
        display: none !important;
      }
      @keyframes rotate {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
      @keyframes dash {
        0% {
          stroke-dashoffset: 69;
          transform: rotateZ(0);
        }
        50%,
        75% {
          stroke-dashoffset: 24;
          transform: rotateZ(80deg);
        }
        100% {
          stroke-dashoffset: 69;
          transform: rotateZ(360deg);
        }
      }
      .p-spinner div{
        width: var(--p-spinner-size, var(--p-leading-normal));
        height: var(--p-spinner-size, var(--p-leading-normal));
        font-family: var(--p-font-porsche-next);
        font-size: inherit;
        font-size: var(--p-spinner-fs);
      }
      .p-spinner svg{
        display: block;
        fill: none;
        stroke-width: 1.5;
        animation: rotate var(--p-animation-duration, var(--p-duration-xl))
          steps(50) infinite;
      }
      .p-spinner circle:first-child{
        stroke: var(--p-spinner-track-color, var(--p-color-contrast-lower));
      }
      .p-spinner circle:last-child{
        stroke: var(
          --p-spinner-color,
          var(--p-spinner-fallback, var(--p-color-primary))
        );
        stroke-dasharray: var(--p-temporary-spinner-stroke-dasharray, 69);
        stroke-linecap: round;
        animation: dash var(--p-animation-duration, var(--p-duration-xl))
          steps(50) infinite;
      }
      @media (forced-colors: active) {
        .p-spinner circle:last-child{
          stroke: CanvasText;
        }
        .p-spinner circle:first-child{
          stroke: none !important;
        }
      }
      @supports (color: oklch(from red l c h)) {
        .p-spinner circle:first-child{
          stroke: var(
            --p-spinner-track-color,
            oklch(
              from
                var(
                  --p-spinner-color,
                  var(--p-spinner-fallback, var(--p-color-primary))
                )
                l c h/.2
            )
          );
        }
      }
      .p-spinner span,
      .p-spinner .sr-only{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }
      @media (min-width: 480px) {
        .p-spinner div{
          font-size: var(--p-spinner-fs-xs, var(--p-spinner-fs));
        }
      }
      @media (min-width: 760px) {
        .p-spinner div{
          font-size: var(--p-spinner-fs-s, var(--p-spinner-fs));
        }
      }
      @media (min-width: 1000px) {
        .p-spinner div{
          font-size: var(--p-spinner-fs-m, var(--p-spinner-fs));
        }
      }
      @media (min-width: 1300px) {
        .p-spinner div{
          font-size: var(--p-spinner-fs-l, var(--p-spinner-fs));
        }
      }
      @media (min-width: 1760px) {
        .p-spinner div{
          font-size: var(--p-spinner-fs-xl, var(--p-spinner-fs));
        }
      }
      @media (min-width: 1920px) {
        .p-spinner div{
          font-size: var(--p-spinner-fs-xxl, var(--p-spinner-fs));
        }
      }`]})],n);export{n as default};
