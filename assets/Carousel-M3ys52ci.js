import{S as L,i as M,s as N,r as k,d as O,p as d,k as B,l as _,m as H,H as E,n as F,a as S,q as C}from"./svelte-DoO7z26N.js";import{s as G}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function I(i){let n,e,x=`<style>${K}</style>`,o,r,l;return{c(){n=H("div"),e=new E(!1),o=F(),r=H("div"),r.innerHTML='<div class="nav"></div>',e.a=o,d(r,"class","header"),d(n,"class",l="p-carousel"+(i[1].class?` ${i[1].class}`:"")),d(n,"data-pds","carousel"),d(n,"style",i[0])},m(t,c){B(t,n,c),e.m(x,n),_(n,o),_(n,r)},p(t,[c]){c&2&&l!==(l="p-carousel"+(t[1].class?` ${t[1].class}`:""))&&d(n,"class",l),c&1&&d(n,"style",t[0])},i:k,o:k,d(t){t&&O(n)}}}const K=`.p-carousel :where([data-pds-slot]){display:contents}

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
  }`;function Q(i,n,e){let x,o,{heading:r}=n,{description:l}=n,{headingSize:t}=n,{width:c}=n,{alignHeader:v}=n,{alignControls:m}=n,{gradient:h}=n,{pagination:f}=n;function s(){return{heading:r,description:l,headingSize:t,width:c,alignHeader:v,alignControls:m,gradient:h,pagination:f}}return i.$$set=a=>{e(1,n=S(S({},n),C(a))),"heading"in a&&e(2,r=a.heading),"description"in a&&e(3,l=a.description),"headingSize"in a&&e(4,t=a.headingSize),"width"in a&&e(5,c=a.width),"alignHeader"in a&&e(6,v=a.alignHeader),"alignControls"in a&&e(7,m=a.alignControls),"gradient"in a&&e(8,h=a.gradient),"pagination"in a&&e(9,f=a.pagination)},i.$$.update=()=>{i.$$.dirty&1024&&e(0,o=G(x()))},e(10,x=()=>{const a=p=>p===!0||p==="true"||p==="",j=(p,g)=>{if(p==null)return g;if(p==="")return typeof g=="boolean"?!0:g;if(typeof p=="string"&&p.charAt(0)==="{")try{return JSON.parse(p.replace(/'/g,'"').replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g,'$1"$2":'))}catch{return g}return p},z=s().heading||"",T=s().description||"",A=!!z,w=!!T,Z=s().headingSize||"x-large",q=s().width||"basic",P=s().alignHeader||"start",b=s().alignControls||"auto",D=a(s().gradient),u=j(s().pagination,!1),J=u===!0||u==="true"||u&&typeof u=="object",y=P==="center";return{"--p-car-col":q==="extended"?"1":"2","--p-car-fs":Z==="xx-large"?"var(--p-typescale-2xl)":"var(--p-typescale-xl)","--p-car-h-mb":w?"0":"var(--p-spacing-fluid-md)","--p-car-ctrl-just":b!=="auto"?b:y?"center":"start","--p-car-heading":A?"1":"","--p-car-desc":w?"1":"","--p-car-controls":"","--p-car-center":y?"1":"","--p-car-gradient":D?"1":"","--p-car-pag":J?"1":""}}),n=C(n),[o,n,r,l,t,c,v,m,h,f,x]}class nn extends L{constructor(n){super(),M(this,n,Q,I,N,{heading:2,description:3,headingSize:4,width:5,alignHeader:6,alignControls:7,gradient:8,pagination:9})}}export{nn as default};
