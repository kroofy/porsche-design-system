import{I as a,C as h,V as d,a as l}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var m=Object.defineProperty,u=Object.getOwnPropertyDescriptor,i=(n,t,o,s)=>{for(var e=s>1?void 0:s?u(t,o):t,p=n.length-1,c;p>=0;p--)(c=n[p])&&(e=(s?c(t,o,e):c(e))||e);return s&&e&&m(t,o,e),e};let r=class{};i([a()],r.prototype,"href",2);i([a()],r.prototype,"target",2);r=i([h({selector:"p-crest",standalone:!0,imports:[l],encapsulation:d.None,template:`
    <div class="p-crest" data-pds="crest">
    <a [attr.href]="href" [attr.target]="target || '_self'"
      ><picture
        ><source
          srcset="
            https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.0d0cc89@1x.webp 1x,
            https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.2245c45@2x.webp 2x,
            https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.19b4292@3x.webp 3x
          "
          type="image/webp" />
        <source
          srcset="
            https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.d76137c@1x.png 1x,
            https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.8a292fb@2x.png 2x,
            https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.18d6f02@3x.png 3x
          "
          type="image/png" />
        <img
          src="https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.8a292fb@2x.png"
          width="30"
          height="40"
          alt="Porsche" /></picture
    ></a>
  
    </div>
  `,styles:[`.p-crest :where([data-pds-slot]){display:contents}

      .p-crest {
        display: contents;
      }
      .p-crest {
        position: relative;
        display: inline-block;
        vertical-align: top;
        box-sizing: content-box !important;
        max-width: 30px !important;
        max-height: 40px !important;
        width: inherit !important;
        height: inherit !important;
      }
      .p-crest[hidden] {
        display: none !important;
      }
      .p-crest a{
        all: unset;
        cursor: pointer;
      }
      .p-crest a::before{
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 1px;
      }
      .p-crest a:focus-visible::before{
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-crest picture{
        display: block;
        width: min(30px, 100%);
        height: min(40px, 100%);
      }
      .p-crest img{
        display: block;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
      @media (forced-colors: active) {
        .p-crest a:focus-visible::before{
          outline-color: Highlight;
        }
      }`]})],r);export{r as default};
