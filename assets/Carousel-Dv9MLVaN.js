import{I as t,C as f,V as y,a as b}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var _=Object.defineProperty,k=Object.getOwnPropertyDescriptor,e=(c,i,s,o)=>{for(var r=o>1?void 0:o?k(i,s):i,n=c.length-1,l;n>=0;n--)(l=c[n])&&(r=(o?l(i,s,r):l(r))||r);return o&&r&&_(i,s,r),r};let p=class{get hostStyle(){const c=a=>a===!0||a==="true"||a==="",i=(a,x)=>{if(a==null)return x;if(a==="")return typeof x=="boolean"?!0:x;if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"').replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g,'$1"$2":'))}catch{return x}return a},s=this.heading||"",o=this.description||"",r=!!s,n=!!o,l=this.headingSize||"x-large",g=this.width||"basic",m=this.alignHeader||"start",u=this.alignControls||"auto",h=c(this.gradient),d=i(this.pagination,!1),w=d===!0||d==="true"||d&&typeof d=="object",v=m==="center";return{"--p-car-col":g==="extended"?"1":"2","--p-car-fs":l==="xx-large"?"var(--p-typescale-2xl)":"var(--p-typescale-xl)","--p-car-h-mb":n?"0":"var(--p-spacing-fluid-md)","--p-car-ctrl-just":u!=="auto"?u:v?"center":"start","--p-car-heading":r?"1":"","--p-car-desc":n?"1":"","--p-car-controls":"","--p-car-center":v?"1":"","--p-car-gradient":h?"1":"","--p-car-pag":w?"1":""}}};e([t()],p.prototype,"heading",2);e([t()],p.prototype,"description",2);e([t()],p.prototype,"headingSize",2);e([t()],p.prototype,"width",2);e([t()],p.prototype,"alignHeader",2);e([t()],p.prototype,"alignControls",2);e([t()],p.prototype,"gradient",2);e([t()],p.prototype,"pagination",2);p=e([f({selector:"p-carousel",standalone:!0,imports:[b],encapsulation:y.None,template:`
    <div class="p-carousel" data-pds="carousel" [style]="hostStyle">
    <div class="header"><div class="nav"></div></div> 
    </div>
  `,styles:[`.p-carousel :where([data-pds-slot]){display:contents}

      .p-carousel {
        display: contents;
      }
      .p-carousel {
        display: flex;
        gap: var(--p-spacing-fluid-md) !important;
        flex-direction: column !important;
        box-sizing: content-box !important;
      }
      .p-carousel[hidden] {
        display: none !important;
      }
      .p-carousel [data-pds-slot] > *{
        border-radius: var(
          --p-carousel-border-radius,
          var(--p-radius-3xl)
        ) !important;
      }
      .p-carousel[data-heading] .heading,
      .p-carousel[data-heading] p,
      .p-carousel[data-heading] [data-pds-slot] > [slot="description"],
      .p-carousel[data-desc] .heading,
      .p-carousel[data-desc] p,
      .p-carousel[data-desc] [data-pds-slot] > [slot="description"] {
        grid-column: 1 / -1 !important;
        color: var(--p-color-primary) !important;
      }
      .p-carousel[data-center] .heading,
      .p-carousel[data-center] p,
      .p-carousel[data-center] [data-pds-slot] > [slot="description"] {
        text-align: center !important;
        justify-self: center !important;
      }
      .p-carousel[data-heading] .heading {
        max-width: 56.25rem !important;
        margin: 0 0 var(--p-car-h-mb, var(--p-spacing-fluid-md)) !important;
        font: var(--p-font-weight-normal) var(--p-car-fs, var(--p-typescale-xl)) /
          var(--p-leading-normal) var(--p-font-porsche-next) !important;
      }
      .p-carousel[data-heading] [data-pds-slot] > [slot="heading"] {
        margin: 0 !important;
        font: var(--p-font-weight-normal) var(--p-car-fs, var(--p-typescale-xl)) /
          var(--p-leading-normal) var(--p-font-porsche-next) !important;
      }
      .p-carousel[data-desc] p,
      .p-carousel[data-desc] [data-pds-slot] > [slot="description"] {
        max-width: 34.375rem !important;
        margin: var(--p-spacing-fluid-sm) 0 var(--p-spacing-fluid-md) !important;
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next) !important;
      }
      .p-carousel[data-controls] [data-pds-slot="controls"] {
        display: block;
        grid-column: 1 / -1;
        grid-row-start: 3;
        align-self: center;
        justify-self: var(--p-car-ctrl-just, start);
      }
      .p-carousel .header{
        display: grid;
        padding-inline-start: var(
          --p-carousel-ps,
          var(--p-carousel-px, max(22px, 10.625vw - 12px))
        );
        padding-inline-end: var(
          --p-carousel-ps,
          var(--p-carousel-px, max(22px, 10.625vw - 12px))
        );
      }
      .p-carousel .nav{
        display: none;
        color-scheme: var(--p-carousel-prev-next-color-scheme);
      }
      .p-carousel .btn{
        padding: var(--p-spacing-static-sm);
      }
      .p-carousel .skip-link:not(:focus){
        opacity: 0;
        pointer-events: none;
      }
      .p-carousel .slide-status{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }
      .p-carousel .splide{
        overflow: hidden;
        padding: 4px 0;
        margin: -4px 0;
      }
      .p-carousel .splide__track{
        position: relative;
        padding-block: 0px !important;
        padding-inline-start: var(
          --p-carousel-ps,
          var(--p-carousel-px, max(22px, 10.625vw - 12px))
        ) !important;
        padding-inline-end: var(
          --p-carousel-ps,
          var(--p-carousel-px, max(22px, 10.625vw - 12px))
        ) !important;
      }
      .p-carousel[data-gradient] .splide__track {
        -webkit-mask: linear-gradient(
          90deg,
          transparent 20%,
          #000 var(--p-gradient-color-width, 33%)
            calc(100% - var(--p-gradient-color-width, 33%)),
          transparent 80%
        );
        mask: linear-gradient(
          90deg,
          transparent 20%,
          #000 var(--p-gradient-color-width, 33%)
            calc(100% - var(--p-gradient-color-width, 33%)),
          transparent 80%
        );
      }
      .p-carousel .splide__list{
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        display: flex;
      }
      .p-carousel .splide__slide{
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        flex-shrink: 0;
        transform: translateZ(0);
        border-radius: var(--p-carousel-border-radius, var(--p-radius-3xl));
      }
      .p-carousel .splide__slide:focus-visible{
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-carousel .splide__sr{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }
      .p-carousel .splide__track--draggable{
        cursor: grab;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
      }
      .p-carousel[data-center] .splide:not(.is-overflow) .splide__list {
        justify-content: center;
      }
      .p-carousel[data-center] .splide:not(.is-overflow) .splide__slide:last-child {
        margin-inline-end: 0 !important;
      }
      .p-carousel[data-pag] .pagination-container {
        display: flex;
        position: relative;
        justify-content: center;
        width: calc(20px + 8px * 4 + 8px * 4);
        left: calc(50% - (calc(20px + 8px * 4 + 8px * 4)) / 2);
        overflow-x: hidden;
      }
      .p-carousel[data-pag] .pagination {
        display: flex;
        align-items: center;
        width: fit-content;
        height: 8px;
        gap: 8px;
        transition: transform var(--p-transition-duration, var(--p-duration-md));
      }
      .p-carousel[data-pag] .bullet {
        border-radius: var(--p-radius-full);
        background: var(--p-color-contrast-medium);
        width: 8px;
        height: 8px;
        transition: background-color
            var(--p-transition-duration, var(--p-duration-md)),
          width var(--p-transition-duration, var(--p-duration-md));
      }
      .p-carousel[data-pag] .bullet--active {
        background: var(--p-color-primary);
        height: 8px;
        width: 20px !important;
      }
      .p-carousel .header{
        display: grid;
      }
      @media (min-width: 760px) {
        .p-carousel .header{
          grid-template-columns: minmax(0px, 1fr) auto;
          padding-inline-start: var(
            --p-carousel-ps,
            var(
              --p-carousel-px,
              calc(
                calc(5vw - 16px) +
                  (
                    clamp(16px, 1.25vw + 12px, 36px) +
                      calc(
                        (
                            100vw - calc(5vw - 16px) * 2 -
                              clamp(16px, 1.25vw + 12px, 36px) * 15
                          ) / 16
                      )
                  ) * var(--p-car-col, 2)
              )
            )
          );
          padding-inline-end: var(
            --p-carousel-ps,
            var(
              --p-carousel-px,
              calc(
                calc(5vw - 16px) +
                  (
                    clamp(16px, 1.25vw + 12px, 36px) +
                      calc(
                        (
                            100vw - calc(5vw - 16px) * 2 -
                              clamp(16px, 1.25vw + 12px, 36px) * 15
                          ) / 16
                      )
                  ) * var(--p-car-col, 2)
              )
            )
          );
          column-gap: var(--p-spacing-static-md);
        }
        .p-carousel .nav{
          grid-row-start: 3;
          grid-column-end: -1;
          display: flex;
          gap: var(--p-spacing-static-xs);
          align-self: flex-start;
        }
        .p-carousel .splide__track{
          padding-inline-start: var(
            --p-carousel-ps,
            var(
              --p-carousel-px,
              calc(
                calc(5vw - 16px) +
                  (
                    clamp(16px, 1.25vw + 12px, 36px) +
                      calc(
                        (
                            100vw - calc(5vw - 16px) * 2 -
                              clamp(16px, 1.25vw + 12px, 36px) * 15
                          ) / 16
                      )
                  ) * var(--p-car-col, 2)
              )
            )
          ) !important;
          padding-inline-end: var(
            --p-carousel-ps,
            var(
              --p-carousel-px,
              calc(
                calc(5vw - 16px) +
                  (
                    clamp(16px, 1.25vw + 12px, 36px) +
                      calc(
                        (
                            100vw - calc(5vw - 16px) * 2 -
                              clamp(16px, 1.25vw + 12px, 36px) * 15
                          ) / 16
                      )
                  ) * var(--p-car-col, 2)
              )
            )
          ) !important;
        }
      }
      @media (min-width: 1920px) {
        .p-carousel .header{
          padding-inline-start: var(
            --p-carousel-ps,
            var(
              --p-carousel-px,
              calc(
                max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) +
                  (
                    clamp(16px, 1.25vw + 12px, 36px) +
                      calc(
                        (
                            min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 -
                              clamp(16px, 1.25vw + 12px, 36px) * 15
                          ) / 16
                      )
                  ) * var(--p-car-col, 2)
              )
            )
          );
          padding-inline-end: var(
            --p-carousel-ps,
            var(
              --p-carousel-px,
              calc(
                max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) +
                  (
                    clamp(16px, 1.25vw + 12px, 36px) +
                      calc(
                        (
                            min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 -
                              clamp(16px, 1.25vw + 12px, 36px) * 15
                          ) / 16
                      )
                  ) * var(--p-car-col, 2)
              )
            )
          );
        }
        .p-carousel .splide__track{
          padding-inline-start: var(
            --p-carousel-ps,
            var(
              --p-carousel-px,
              calc(
                max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) +
                  (
                    clamp(16px, 1.25vw + 12px, 36px) +
                      calc(
                        (
                            min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 -
                              clamp(16px, 1.25vw + 12px, 36px) * 15
                          ) / 16
                      )
                  ) * var(--p-car-col, 2)
              )
            )
          ) !important;
          padding-inline-end: var(
            --p-carousel-ps,
            var(
              --p-carousel-px,
              calc(
                max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) +
                  (
                    clamp(16px, 1.25vw + 12px, 36px) +
                      calc(
                        (
                            min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 -
                              clamp(16px, 1.25vw + 12px, 36px) * 15
                          ) / 16
                      )
                  ) * var(--p-car-col, 2)
              )
            )
          ) !important;
        }
      }
      @media (pointer: coarse) {
        .p-carousel[data-pag] .pagination-container {
          width: calc(20px + 8px * 4 + 16px * 4 + 2 * 8px);
          left: calc(50% - calc(20px + 8px * 4 + 16px * 4 + 2 * 8px) / 2);
        }
        .p-carousel[data-pag] .pagination {
          height: calc(8px + 2 * 8px);
          gap: 16px;
        }
        .p-carousel[data-pag] .bullet {
          position: relative;
        }
        .p-carousel[data-pag] .bullet::before {
          content: "";
          position: absolute;
          inset: -8px;
        }
      }
      @media (hover: hover) {
        .p-carousel[data-pag] .bullet {
          cursor: pointer;
        }
      }
      @media (forced-colors: active) {
        .p-carousel .splide__slide:focus-visible{
          outline-color: Highlight;
        }
      }`]})],p);export{p as default};
