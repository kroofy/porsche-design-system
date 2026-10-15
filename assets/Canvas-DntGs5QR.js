import{I as c,C as l,V as v,a as b}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var m=Object.defineProperty,g=Object.getOwnPropertyDescriptor,o=(n,r,t,e)=>{for(var a=e>1?void 0:e?g(r,t):r,i=n.length-1,p;i>=0;i--)(p=n[i])&&(a=(e?p(r,t,a):p(a))||a);return e&&a&&m(r,t,a),a};let s=class{get hostStyle(){const n=d=>d===!0||d==="true"||d==="",r=n(this.sidebarStartOpen),t=n(this.sidebarEndOpen),e=this.background==="surface",a="min(100vw, var(--p-canvas-sidebar-start-width, 320px))",i="min(100vw, var(--p-canvas-sidebar-end-width, 320px))";return{"--p-cv-primary":e?"var(--p-color-surface)":"var(--p-color-canvas)","--p-cv-secondary":e?"var(--p-color-canvas)":"var(--p-color-surface)","--p-cv-start-col":r?"min(calc(100vw - 320px), var(--p-canvas-sidebar-start-width, 320px))":"0px","--p-cv-end-col":t?"min(calc(100vw - 320px), var(--p-canvas-sidebar-end-width, 320px))":"0px","--p-cv-radius":r?"var(--p-radius-3xl)":"0","--p-cv-tf":t?"translate3d(calc(-1 * "+a+" - "+i+"), 0, 0)":r?"translate3d(0, 0, 0)":"translate3d(calc(-1 * "+a+"), 0, 0)","--p-cv-tf-rtl":t?"translate3d(calc("+a+" + "+i+"), 0, 0)":r?"translate3d(0, 0, 0)":"translate3d("+i+", 0, 0)"}}};o([c()],s.prototype,"sidebarStartOpen",2);o([c()],s.prototype,"sidebarEndOpen",2);o([c()],s.prototype,"background",2);s=o([l({selector:"p-canvas",standalone:!0,imports:[b],encapsulation:v.None,template:`
    <div class="p-canvas" data-pds="canvas" [style]="hostStyle">
    <div class="root">
      <header class="header"></header>
      <aside class="sidebar sidebar--start"></aside>
      <main class="main"><span data-pds-slot=""><ng-content></ng-content></span></main>
    </div>
  
    </div>
  `,styles:[`.p-canvas :where([data-pds-slot]){display:contents}

      .p-canvas {
        display: contents;
      }
      .p-canvas {
        display: block;
        overflow-x: clip !important;
      }
      .p-canvas[hidden] {
        display: none !important;
      }
      .p-canvas [data-pds-slot]:not([name]) [data-pds-slot] > .-p-canvas-grid,
      .p-canvas [data-pds-slot="footer"] > .-p-canvas-grid{
        display: grid !important;
        grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
        column-gap: clamp(16px, 1.25vw + 12px, 24px) !important;
        margin-inline: auto !important;
        container-type: inline-size !important;
      }
      .p-canvas [data-pds-slot="sidebar-end-header"]{
        display: block;
      }
      .p-canvas [data-pds-slot="background"]{
        z-index: 1;
        display: block;
        grid-area: 1/2/-1/3;
        position: sticky;
        top: 0;
        height: 100lvh;
        pointer-events: none;
        overflow: hidden;
        transform: translate3d(0, 0, 0);
      }
      .p-canvas [data-pds-slot="background"] > video,
      .p-canvas [data-pds-slot="background"] > img{
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
      }
      .p-canvas [data-pds-slot="title"] > a{
        all: unset !important;
        cursor: pointer !important;
        color: inherit !important;
        border-radius: var(--p-radius-sm) !important;
      }
      .p-canvas [data-pds-slot="title"] > a:focus-visible{
        outline: 2px solid var(--p-color-focus) !important;
        outline-offset: 2px !important;
      }
      @media (forced-colors: active) {
        .p-canvas [data-pds-slot="title"] > a:focus-visible{
          outline-color: Highlight !important;
        }
      }
      .p-canvas h2{
        all: unset;
        padding: 4px;
        font: var(--p-font-weight-normal) var(--p-typescale-xs) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-color-primary);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      .p-canvas .root{
        display: grid;
        grid-template:
          auto minmax(0, 1fr) auto / min(
            100vw,
            var(--p-canvas-sidebar-start-width, 320px)
          )
          100vw min(100vw, var(--p-canvas-sidebar-end-width, 320px));
        grid-template-areas: "sidebar-start header sidebar-end" "sidebar-start main sidebar-end" "sidebar-start footer sidebar-end";
        min-height: 100lvh;
      }
      .p-canvas .root::before{
        content: "";
        z-index: 0;
        grid-area: 1/2/-1/3;
        background: var(--p-cv-primary);
        pointer-events: none;
        border-end-start-radius: var(--p-cv-radius);
        transition: border-radius
          var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
      }
      .p-canvas .header{
        z-index: 4;
        grid-area: header;
        container-type: inline-size;
        position: sticky;
        top: 0;
        min-height: 56px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        gap: clamp(16px, 1.25vw + 12px, 24px);
        align-items: center;
        padding: var(--p-spacing-static-sm) clamp(16px, 1.25vw + 12px, 24px);
      }
      .p-canvas .header:focus-visible{
        outline: none;
      }
      .p-canvas .header__area{
        display: flex;
        gap: var(--p-spacing-static-sm);
        align-items: center;
      }
      .p-canvas .header__area--start{
        justify-content: flex-start;
      }
      .p-canvas .header__area--end{
        justify-content: flex-end;
      }
      .p-canvas .header__crest{
      }
      .p-canvas .header__wordmark{
        height: 10px;
      }
      .p-canvas .blur{
        z-index: -1;
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      .p-canvas .blur > div{
        position: absolute;
        inset: 0;
      }
      .p-canvas .blur > div:nth-of-type(1){
        -webkit-backdrop-filter: blur(64px);
        backdrop-filter: blur(64px);
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 100%) 0%,
          rgba(0, 0, 0, 1) 12.5%,
          rgba(0, 0, 0, 1) 25%,
          rgba(0, 0, 0, 0) 37.5%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 100%) 0%,
          rgba(0, 0, 0, 1) 12.5%,
          rgba(0, 0, 0, 1) 25%,
          rgba(0, 0, 0, 0) 37.5%
        );
      }
      .p-canvas .blur > div:nth-of-type(2){
        -webkit-backdrop-filter: blur(32px);
        backdrop-filter: blur(32px);
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 12.5%,
          rgba(0, 0, 0, 1) 25%,
          rgba(0, 0, 0, 1) 37.5%,
          rgba(0, 0, 0, 0) 50%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 12.5%,
          rgba(0, 0, 0, 1) 25%,
          rgba(0, 0, 0, 1) 37.5%,
          rgba(0, 0, 0, 0) 50%
        );
      }
      .p-canvas .blur > div:nth-of-type(3){
        -webkit-backdrop-filter: blur(16px);
        backdrop-filter: blur(16px);
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 25%,
          rgba(0, 0, 0, 1) 37.5%,
          rgba(0, 0, 0, 1) 50%,
          rgba(0, 0, 0, 0) 62.5%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 25%,
          rgba(0, 0, 0, 1) 37.5%,
          rgba(0, 0, 0, 1) 50%,
          rgba(0, 0, 0, 0) 62.5%
        );
      }
      .p-canvas .blur > div:nth-of-type(4){
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 37.5%,
          rgba(0, 0, 0, 1) 50%,
          rgba(0, 0, 0, 1) 62.5%,
          rgba(0, 0, 0, 0) 75%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 37.5%,
          rgba(0, 0, 0, 1) 50%,
          rgba(0, 0, 0, 1) 62.5%,
          rgba(0, 0, 0, 0) 75%
        );
      }
      .p-canvas .blur > div:nth-of-type(5){
        -webkit-backdrop-filter: blur(4px);
        backdrop-filter: blur(4px);
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 50%,
          rgba(0, 0, 0, 1) 62.5%,
          rgba(0, 0, 0, 1) 75%,
          rgba(0, 0, 0, 0) 87.5%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 50%,
          rgba(0, 0, 0, 1) 62.5%,
          rgba(0, 0, 0, 1) 75%,
          rgba(0, 0, 0, 0) 87.5%
        );
      }
      .p-canvas .blur > div:nth-of-type(6){
        -webkit-backdrop-filter: blur(2px);
        backdrop-filter: blur(2px);
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 62.5%,
          rgba(0, 0, 0, 1) 75%,
          rgba(0, 0, 0, 1) 87.5%,
          rgba(0, 0, 0, 0) 100%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 62.5%,
          rgba(0, 0, 0, 1) 75%,
          rgba(0, 0, 0, 1) 87.5%,
          rgba(0, 0, 0, 0) 100%
        );
      }
      .p-canvas .blur > div:nth-of-type(7){
        -webkit-backdrop-filter: blur(1px);
        backdrop-filter: blur(1px);
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 75%,
          rgba(0, 0, 0, 1) 87.5%,
          rgba(0, 0, 0, 1) 100%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 75%,
          rgba(0, 0, 0, 1) 87.5%,
          rgba(0, 0, 0, 1) 100%
        );
      }
      .p-canvas .blur > div:nth-of-type(8){
        -webkit-backdrop-filter: blur(0.5px);
        backdrop-filter: blur(0.5px);
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 87.5%,
          rgba(0, 0, 0, 1) 100%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 87.5%,
          rgba(0, 0, 0, 1) 100%
        );
      }
      .p-canvas .blur::after{
        content: "";
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: var(--p-radius-3xl);
        height: calc(2 * var(--p-radius-3xl));
        border-start-start-radius: var(--p-cv-radius);
        box-shadow: 0 calc(-1 * var(--p-radius-3xl)) 0 0 var(--p-cv-secondary);
        transition: border-radius
          var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
      }
      .p-canvas .main{
        z-index: 2;
        grid-area: main;
        padding: clamp(16px, 1.25vw + 12px, 24px);
      }
      .p-canvas .footer{
        z-index: 5;
        grid-area: footer;
        padding: clamp(16px, 1.25vw + 12px, 24px)
          clamp(16px, 1.25vw + 12px, 24px) var(--p-spacing-fluid-sm);
        position: sticky;
        bottom: 0;
      }
      .p-canvas .footer::before{
        content: "";
        z-index: -1;
        position: absolute;
        inset: -140px 0 0;
        pointer-events: none;
        background: linear-gradient(
          to bottom,
          hsl(from var(--p-cv-primary) h s l / 0) 0%,
          hsl(from var(--p-cv-primary) h s l / 0.013) 8.1%,
          hsl(from var(--p-cv-primary) h s l / 0.049) 15.5%,
          hsl(from var(--p-cv-primary) h s l / 0.104) 22.5%,
          hsl(from var(--p-cv-primary) h s l / 0.175) 29%,
          hsl(from var(--p-cv-primary) h s l / 0.259) 35.3%,
          hsl(from var(--p-cv-primary) h s l / 0.352) 41.2%,
          hsl(from var(--p-cv-primary) h s l / 0.45) 47.1%,
          hsl(from var(--p-cv-primary) h s l / 0.55) 52.9%,
          hsl(from var(--p-cv-primary) h s l / 0.648) 58.8%,
          hsl(from var(--p-cv-primary) h s l / 0.741) 64.7%,
          hsl(from var(--p-cv-primary) h s l / 0.825) 71%,
          hsl(from var(--p-cv-primary) h s l / 0.896) 77.5%,
          hsl(from var(--p-cv-primary) h s l / 0.951) 84.5%,
          hsl(from var(--p-cv-primary) h s l / 0.987) 91.9%,
          var(--p-cv-primary) 100%
        );
        border-end-start-radius: var(--p-cv-radius);
        transition: border-radius
          var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
      }
      .p-canvas .sidebar{
        z-index: 3;
        position: sticky;
        top: 0;
        height: 100dvh;
        padding: clamp(16px, 1.25vw + 12px, 24px);
        box-sizing: border-box;
        overflow: hidden auto;
        overscroll-behavior-y: contain;
      }
      .p-canvas .sidebar:focus-visible{
        outline: none;
      }
      .p-canvas .sidebar--start{
        grid-area: sidebar-start;
        justify-self: flex-end;
        background: var(--p-cv-secondary);
        width: min(100vw, var(--p-canvas-sidebar-start-width, 320px));
      }
      .p-canvas .sidebar--end{
        grid-area: sidebar-end;
        justify-self: flex-start;
        border-inline-start: 1px solid var(--p-color-contrast-lower);
        background: var(--p-cv-primary);
        width: min(100vw, var(--p-canvas-sidebar-end-width, 320px));
      }
      .p-canvas .sidebar__header{
        z-index: 9999999;
        display: flex;
        gap: var(--p-spacing-static-sm);
        align-items: center;
        position: sticky;
        top: calc(-1 * clamp(16px, 1.25vw + 12px, 24px));
        margin: calc(-1 * clamp(16px, 1.25vw + 12px, 24px))
          calc(-1 * clamp(16px, 1.25vw + 12px, 24px))
          clamp(16px, 1.25vw + 12px, 24px);
        padding: var(--p-spacing-static-sm) clamp(16px, 1.25vw + 12px, 24px);
        min-height: 56px;
        box-sizing: border-box;
      }
      .p-canvas .sidebar__header--start{
        justify-content: flex-start;
      }
      .p-canvas .sidebar__header--end{
        justify-content: space-between;
      }
      .p-canvas .sidebar__header::before{
        content: "";
        z-index: -1;
        position: absolute;
        inset: 0 0 -8px;
        pointer-events: none;
      }
      .p-canvas .sidebar__header--start::before{
        background: linear-gradient(
          180deg,
          var(--p-cv-secondary) 0%,
          var(--p-cv-secondary) 65%,
          transparent 100%
        );
      }
      .p-canvas .sidebar__header--end::before{
        background: linear-gradient(
          180deg,
          var(--p-cv-primary) 0%,
          var(--p-cv-primary) 65%,
          transparent 100%
        );
      }
      @container (min-width: 760px) {
        .p-canvas .header__crest{
          display: none;
        }
      }
      @container (max-width: 759px) {
        .p-canvas .header__wordmark{
          display: none;
        }
      }
      @media (min-width: 1000px) {
        .p-canvas .root{
          transition: grid-template-columns
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
          grid-template-columns: var(--p-cv-start-col) minmax(320px, 1fr) var(
              --p-cv-end-col
            );
        }
        .p-canvas .sidebar--start{
          width: min(
            calc(100vw - 320px),
            var(--p-canvas-sidebar-start-width, 320px)
          );
        }
        .p-canvas .sidebar--end{
          width: min(
            calc(100vw - 320px),
            var(--p-canvas-sidebar-end-width, 320px)
          );
        }
      }
      @media (max-width: 999px) {
        .p-canvas .root{
          transition: transform
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
          transform: var(--p-cv-tf);
        }
        .p-canvas .root:dir(rtl){
          transform: var(--p-cv-tf-rtl);
        }
      }`]})],s);export{s as default};
