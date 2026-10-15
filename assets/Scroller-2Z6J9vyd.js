import{C as b,V as e,a as n}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var s=Object.getOwnPropertyDescriptor,o=(p,c,t,x)=>{for(var r=x>1?void 0:x?s(c,t):c,a=p.length-1,l;a>=0;a--)(l=p[a])&&(r=l(r)||r);return r};let g=class{get hostStyle(){return{"--p-scr-prev-op":"0","--p-scr-prev-vis":"hidden","--p-scr-prev-tf":"translate3d(calc(-1 * var(--p-spacing-static-sm)), 0, 0)","--p-scr-prev-delay":"var(--p-transition-duration, var(--p-duration-sm))","--p-scr-next-op":"0","--p-scr-next-vis":"hidden","--p-scr-next-tf":"translate3d(var(--p-spacing-static-sm), 0, 0)","--p-scr-next-delay":"var(--p-transition-duration, var(--p-duration-sm))"}}};g=o([b({selector:"p-scroller",standalone:!0,imports:[n],encapsulation:e.None,template:`
    <div class="p-scroller" data-pds="scroller" [style]="hostStyle">
    <div class="root">
      <span class="prev"></span>
      <span class="next"></span>
      <div class="scroll" [attr.tabIndex]="0">
        <span class="sentinel"></span>
        <span data-pds-slot=""><ng-content></ng-content></span>
        <span class="sentinel"></span>
      </div>
    </div>
  
    </div>
  `,styles:[`.p-scroller :where([data-pds-slot]){display:contents}

      .p-scroller {
        display: contents;
      }
      .p-scroller {
        display: block;
        border-radius: var(--p-radius-lg);
      }
      .p-scroller[hidden] {
        display: none !important;
      }
      .p-scroller [data-pds-slot]{
        grid-area: 1 / 2;
        position: relative;
        display: inline-flex;
        gap: var(--p-scroller-gap, var(--p-spacing-static-sm));
      }
      .p-scroller[data-compact] [data-pds-slot] {
        gap: var(--p-scroller-gap, var(--p-spacing-static-xs));
      }
      .p-scroller .root{
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        border-radius: var(--_p-scroller-focus-ring-radius, inherit);
      }
      .p-scroller .root:has(.scroll:focus-visible){
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-scroller .scroll{
        grid-area: 1 / 1 / 1 / -1;
        z-index: 0;
        display: grid;
        grid-template-columns: 4px minmax(auto, 1fr) 4px;
        margin: calc(-1 * 4px);
        padding: 4px 0px;
        scrollbar-width: none;
        outline: none;
        overflow: auto hidden;
      }
      .p-scroller[data-bar] .scroll {
        padding: 4px 0px calc(4px + 12px);
        scrollbar-width: thin;
      }
      .p-scroller[data-fade="left"] .scroll {
        -webkit-mask: linear-gradient(
            to right,
            transparent 0px,
            transparent 24px,
            rgb(0 0 0 / 0.001) 29px,
            rgb(0 0 0 / 0.009) 34px,
            rgb(0 0 0 / 0.027) 38px,
            rgb(0 0 0 / 0.058) 43px,
            rgb(0 0 0 / 0.104) 48px,
            rgb(0 0 0 / 0.163) 53px,
            rgb(0 0 0 / 0.235) 58px,
            rgb(0 0 0 / 0.317) 62px,
            rgb(0 0 0 / 0.407) 67px,
            rgb(0 0 0 / 0.5) 72px,
            rgb(0 0 0 / 0.593) 77px,
            rgb(0 0 0 / 0.683) 82px,
            rgb(0 0 0 / 0.765) 86px,
            rgb(0 0 0 / 0.837) 91px,
            rgb(0 0 0 / 0.896) 96px,
            rgb(0 0 0 / 0.942) 101px,
            rgb(0 0 0 / 0.973) 106px,
            rgb(0 0 0 / 0.991) 110px,
            rgb(0 0 0 / 0.999) 115px,
            black 120px,
            black 100%
          )
          0 0 / auto no-repeat;
        mask: linear-gradient(
            to right,
            transparent 0px,
            transparent 24px,
            rgb(0 0 0 / 0.001) 29px,
            rgb(0 0 0 / 0.009) 34px,
            rgb(0 0 0 / 0.027) 38px,
            rgb(0 0 0 / 0.058) 43px,
            rgb(0 0 0 / 0.104) 48px,
            rgb(0 0 0 / 0.163) 53px,
            rgb(0 0 0 / 0.235) 58px,
            rgb(0 0 0 / 0.317) 62px,
            rgb(0 0 0 / 0.407) 67px,
            rgb(0 0 0 / 0.5) 72px,
            rgb(0 0 0 / 0.593) 77px,
            rgb(0 0 0 / 0.683) 82px,
            rgb(0 0 0 / 0.765) 86px,
            rgb(0 0 0 / 0.837) 91px,
            rgb(0 0 0 / 0.896) 96px,
            rgb(0 0 0 / 0.942) 101px,
            rgb(0 0 0 / 0.973) 106px,
            rgb(0 0 0 / 0.991) 110px,
            rgb(0 0 0 / 0.999) 115px,
            black 120px,
            black 100%
          )
          0 0 / auto no-repeat;
      }
      .p-scroller[data-fade="right"] .scroll {
        -webkit-mask: linear-gradient(
            to right,
            black 0%,
            black calc(100% - 120px),
            rgb(0 0 0 / 0.999) calc(100% - 115px),
            rgb(0 0 0 / 0.991) calc(100% - 110px),
            rgb(0 0 0 / 0.973) calc(100% - 106px),
            rgb(0 0 0 / 0.942) calc(100% - 101px),
            rgb(0 0 0 / 0.896) calc(100% - 96px),
            rgb(0 0 0 / 0.837) calc(100% - 91px),
            rgb(0 0 0 / 0.765) calc(100% - 86px),
            rgb(0 0 0 / 0.683) calc(100% - 82px),
            rgb(0 0 0 / 0.593) calc(100% - 77px),
            rgb(0 0 0 / 0.5) calc(100% - 72px),
            rgb(0 0 0 / 0.407) calc(100% - 67px),
            rgb(0 0 0 / 0.317) calc(100% - 62px),
            rgb(0 0 0 / 0.235) calc(100% - 58px),
            rgb(0 0 0 / 0.163) calc(100% - 53px),
            rgb(0 0 0 / 0.104) calc(100% - 48px),
            rgb(0 0 0 / 0.058) calc(100% - 43px),
            rgb(0 0 0 / 0.027) calc(100% - 38px),
            rgb(0 0 0 / 0.009) calc(100% - 34px),
            rgb(0 0 0 / 0.001) calc(100% - 29px),
            transparent calc(100% - 24px),
            transparent 100%
          )
          0 0 / auto no-repeat;
        mask: linear-gradient(
            to right,
            black 0%,
            black calc(100% - 120px),
            rgb(0 0 0 / 0.999) calc(100% - 115px),
            rgb(0 0 0 / 0.991) calc(100% - 110px),
            rgb(0 0 0 / 0.973) calc(100% - 106px),
            rgb(0 0 0 / 0.942) calc(100% - 101px),
            rgb(0 0 0 / 0.896) calc(100% - 96px),
            rgb(0 0 0 / 0.837) calc(100% - 91px),
            rgb(0 0 0 / 0.765) calc(100% - 86px),
            rgb(0 0 0 / 0.683) calc(100% - 82px),
            rgb(0 0 0 / 0.593) calc(100% - 77px),
            rgb(0 0 0 / 0.5) calc(100% - 72px),
            rgb(0 0 0 / 0.407) calc(100% - 67px),
            rgb(0 0 0 / 0.317) calc(100% - 62px),
            rgb(0 0 0 / 0.235) calc(100% - 58px),
            rgb(0 0 0 / 0.163) calc(100% - 53px),
            rgb(0 0 0 / 0.104) calc(100% - 48px),
            rgb(0 0 0 / 0.058) calc(100% - 43px),
            rgb(0 0 0 / 0.027) calc(100% - 38px),
            rgb(0 0 0 / 0.009) calc(100% - 34px),
            rgb(0 0 0 / 0.001) calc(100% - 29px),
            transparent calc(100% - 24px),
            transparent 100%
          )
          0 0 / auto no-repeat;
      }
      .p-scroller[data-fade="both"] .scroll {
        -webkit-mask: linear-gradient(
            to right,
            transparent 0px,
            transparent 24px,
            rgb(0 0 0 / 0.001) 29px,
            rgb(0 0 0 / 0.009) 34px,
            rgb(0 0 0 / 0.027) 38px,
            rgb(0 0 0 / 0.058) 43px,
            rgb(0 0 0 / 0.104) 48px,
            rgb(0 0 0 / 0.163) 53px,
            rgb(0 0 0 / 0.235) 58px,
            rgb(0 0 0 / 0.317) 62px,
            rgb(0 0 0 / 0.407) 67px,
            rgb(0 0 0 / 0.5) 72px,
            rgb(0 0 0 / 0.593) 77px,
            rgb(0 0 0 / 0.683) 82px,
            rgb(0 0 0 / 0.765) 86px,
            rgb(0 0 0 / 0.837) 91px,
            rgb(0 0 0 / 0.896) 96px,
            rgb(0 0 0 / 0.942) 101px,
            rgb(0 0 0 / 0.973) 106px,
            rgb(0 0 0 / 0.991) 110px,
            rgb(0 0 0 / 0.999) 115px,
            black 120px,
            black calc(100% - 120px),
            rgb(0 0 0 / 0.999) calc(100% - 115px),
            rgb(0 0 0 / 0.991) calc(100% - 110px),
            rgb(0 0 0 / 0.973) calc(100% - 106px),
            rgb(0 0 0 / 0.942) calc(100% - 101px),
            rgb(0 0 0 / 0.896) calc(100% - 96px),
            rgb(0 0 0 / 0.837) calc(100% - 91px),
            rgb(0 0 0 / 0.765) calc(100% - 86px),
            rgb(0 0 0 / 0.683) calc(100% - 82px),
            rgb(0 0 0 / 0.593) calc(100% - 77px),
            rgb(0 0 0 / 0.5) calc(100% - 72px),
            rgb(0 0 0 / 0.407) calc(100% - 67px),
            rgb(0 0 0 / 0.317) calc(100% - 62px),
            rgb(0 0 0 / 0.235) calc(100% - 58px),
            rgb(0 0 0 / 0.163) calc(100% - 53px),
            rgb(0 0 0 / 0.104) calc(100% - 48px),
            rgb(0 0 0 / 0.058) calc(100% - 43px),
            rgb(0 0 0 / 0.027) calc(100% - 38px),
            rgb(0 0 0 / 0.009) calc(100% - 34px),
            rgb(0 0 0 / 0.001) calc(100% - 29px),
            transparent calc(100% - 24px),
            transparent 100%
          )
          0 0 / auto no-repeat;
        mask: linear-gradient(
            to right,
            transparent 0px,
            transparent 24px,
            rgb(0 0 0 / 0.001) 29px,
            rgb(0 0 0 / 0.009) 34px,
            rgb(0 0 0 / 0.027) 38px,
            rgb(0 0 0 / 0.058) 43px,
            rgb(0 0 0 / 0.104) 48px,
            rgb(0 0 0 / 0.163) 53px,
            rgb(0 0 0 / 0.235) 58px,
            rgb(0 0 0 / 0.317) 62px,
            rgb(0 0 0 / 0.407) 67px,
            rgb(0 0 0 / 0.5) 72px,
            rgb(0 0 0 / 0.593) 77px,
            rgb(0 0 0 / 0.683) 82px,
            rgb(0 0 0 / 0.765) 86px,
            rgb(0 0 0 / 0.837) 91px,
            rgb(0 0 0 / 0.896) 96px,
            rgb(0 0 0 / 0.942) 101px,
            rgb(0 0 0 / 0.973) 106px,
            rgb(0 0 0 / 0.991) 110px,
            rgb(0 0 0 / 0.999) 115px,
            black 120px,
            black calc(100% - 120px),
            rgb(0 0 0 / 0.999) calc(100% - 115px),
            rgb(0 0 0 / 0.991) calc(100% - 110px),
            rgb(0 0 0 / 0.973) calc(100% - 106px),
            rgb(0 0 0 / 0.942) calc(100% - 101px),
            rgb(0 0 0 / 0.896) calc(100% - 96px),
            rgb(0 0 0 / 0.837) calc(100% - 91px),
            rgb(0 0 0 / 0.765) calc(100% - 86px),
            rgb(0 0 0 / 0.683) calc(100% - 82px),
            rgb(0 0 0 / 0.593) calc(100% - 77px),
            rgb(0 0 0 / 0.5) calc(100% - 72px),
            rgb(0 0 0 / 0.407) calc(100% - 67px),
            rgb(0 0 0 / 0.317) calc(100% - 62px),
            rgb(0 0 0 / 0.235) calc(100% - 58px),
            rgb(0 0 0 / 0.163) calc(100% - 53px),
            rgb(0 0 0 / 0.104) calc(100% - 48px),
            rgb(0 0 0 / 0.058) calc(100% - 43px),
            rgb(0 0 0 / 0.027) calc(100% - 38px),
            rgb(0 0 0 / 0.009) calc(100% - 34px),
            rgb(0 0 0 / 0.001) calc(100% - 29px),
            transparent calc(100% - 24px),
            transparent 100%
          )
          0 0 / auto no-repeat;
      }
      .p-scroller[data-bar][data-fade="left"] .scroll {
        -webkit-mask: linear-gradient(
              to right,
              transparent 0px,
              transparent 24px,
              rgb(0 0 0 / 0.001) 29px,
              rgb(0 0 0 / 0.009) 34px,
              rgb(0 0 0 / 0.027) 38px,
              rgb(0 0 0 / 0.058) 43px,
              rgb(0 0 0 / 0.104) 48px,
              rgb(0 0 0 / 0.163) 53px,
              rgb(0 0 0 / 0.235) 58px,
              rgb(0 0 0 / 0.317) 62px,
              rgb(0 0 0 / 0.407) 67px,
              rgb(0 0 0 / 0.5) 72px,
              rgb(0 0 0 / 0.593) 77px,
              rgb(0 0 0 / 0.683) 82px,
              rgb(0 0 0 / 0.765) 86px,
              rgb(0 0 0 / 0.837) 91px,
              rgb(0 0 0 / 0.896) 96px,
              rgb(0 0 0 / 0.942) 101px,
              rgb(0 0 0 / 0.973) 106px,
              rgb(0 0 0 / 0.991) 110px,
              rgb(0 0 0 / 0.999) 115px,
              black 120px,
              black 100%
            )
            0 0 / auto no-repeat,
          linear-gradient(black, black) 0 bottom / auto 12px no-repeat;
        mask: linear-gradient(
              to right,
              transparent 0px,
              transparent 24px,
              rgb(0 0 0 / 0.001) 29px,
              rgb(0 0 0 / 0.009) 34px,
              rgb(0 0 0 / 0.027) 38px,
              rgb(0 0 0 / 0.058) 43px,
              rgb(0 0 0 / 0.104) 48px,
              rgb(0 0 0 / 0.163) 53px,
              rgb(0 0 0 / 0.235) 58px,
              rgb(0 0 0 / 0.317) 62px,
              rgb(0 0 0 / 0.407) 67px,
              rgb(0 0 0 / 0.5) 72px,
              rgb(0 0 0 / 0.593) 77px,
              rgb(0 0 0 / 0.683) 82px,
              rgb(0 0 0 / 0.765) 86px,
              rgb(0 0 0 / 0.837) 91px,
              rgb(0 0 0 / 0.896) 96px,
              rgb(0 0 0 / 0.942) 101px,
              rgb(0 0 0 / 0.973) 106px,
              rgb(0 0 0 / 0.991) 110px,
              rgb(0 0 0 / 0.999) 115px,
              black 120px,
              black 100%
            )
            0 0 / auto no-repeat,
          linear-gradient(black, black) 0 bottom / auto 12px no-repeat;
      }
      .p-scroller[data-bar][data-fade="right"] .scroll {
        -webkit-mask: linear-gradient(
              to right,
              black 0%,
              black calc(100% - 120px),
              rgb(0 0 0 / 0.999) calc(100% - 115px),
              rgb(0 0 0 / 0.991) calc(100% - 110px),
              rgb(0 0 0 / 0.973) calc(100% - 106px),
              rgb(0 0 0 / 0.942) calc(100% - 101px),
              rgb(0 0 0 / 0.896) calc(100% - 96px),
              rgb(0 0 0 / 0.837) calc(100% - 91px),
              rgb(0 0 0 / 0.765) calc(100% - 86px),
              rgb(0 0 0 / 0.683) calc(100% - 82px),
              rgb(0 0 0 / 0.593) calc(100% - 77px),
              rgb(0 0 0 / 0.5) calc(100% - 72px),
              rgb(0 0 0 / 0.407) calc(100% - 67px),
              rgb(0 0 0 / 0.317) calc(100% - 62px),
              rgb(0 0 0 / 0.235) calc(100% - 58px),
              rgb(0 0 0 / 0.163) calc(100% - 53px),
              rgb(0 0 0 / 0.104) calc(100% - 48px),
              rgb(0 0 0 / 0.058) calc(100% - 43px),
              rgb(0 0 0 / 0.027) calc(100% - 38px),
              rgb(0 0 0 / 0.009) calc(100% - 34px),
              rgb(0 0 0 / 0.001) calc(100% - 29px),
              transparent calc(100% - 24px),
              transparent 100%
            )
            0 0 / auto no-repeat,
          linear-gradient(black, black) 0 bottom / auto 12px no-repeat;
        mask: linear-gradient(
              to right,
              black 0%,
              black calc(100% - 120px),
              rgb(0 0 0 / 0.999) calc(100% - 115px),
              rgb(0 0 0 / 0.991) calc(100% - 110px),
              rgb(0 0 0 / 0.973) calc(100% - 106px),
              rgb(0 0 0 / 0.942) calc(100% - 101px),
              rgb(0 0 0 / 0.896) calc(100% - 96px),
              rgb(0 0 0 / 0.837) calc(100% - 91px),
              rgb(0 0 0 / 0.765) calc(100% - 86px),
              rgb(0 0 0 / 0.683) calc(100% - 82px),
              rgb(0 0 0 / 0.593) calc(100% - 77px),
              rgb(0 0 0 / 0.5) calc(100% - 72px),
              rgb(0 0 0 / 0.407) calc(100% - 67px),
              rgb(0 0 0 / 0.317) calc(100% - 62px),
              rgb(0 0 0 / 0.235) calc(100% - 58px),
              rgb(0 0 0 / 0.163) calc(100% - 53px),
              rgb(0 0 0 / 0.104) calc(100% - 48px),
              rgb(0 0 0 / 0.058) calc(100% - 43px),
              rgb(0 0 0 / 0.027) calc(100% - 38px),
              rgb(0 0 0 / 0.009) calc(100% - 34px),
              rgb(0 0 0 / 0.001) calc(100% - 29px),
              transparent calc(100% - 24px),
              transparent 100%
            )
            0 0 / auto no-repeat,
          linear-gradient(black, black) 0 bottom / auto 12px no-repeat;
      }
      .p-scroller[data-bar][data-fade="both"] .scroll {
        -webkit-mask: linear-gradient(
              to right,
              transparent 0px,
              transparent 24px,
              rgb(0 0 0 / 0.001) 29px,
              rgb(0 0 0 / 0.009) 34px,
              rgb(0 0 0 / 0.027) 38px,
              rgb(0 0 0 / 0.058) 43px,
              rgb(0 0 0 / 0.104) 48px,
              rgb(0 0 0 / 0.163) 53px,
              rgb(0 0 0 / 0.235) 58px,
              rgb(0 0 0 / 0.317) 62px,
              rgb(0 0 0 / 0.407) 67px,
              rgb(0 0 0 / 0.5) 72px,
              rgb(0 0 0 / 0.593) 77px,
              rgb(0 0 0 / 0.683) 82px,
              rgb(0 0 0 / 0.765) 86px,
              rgb(0 0 0 / 0.837) 91px,
              rgb(0 0 0 / 0.896) 96px,
              rgb(0 0 0 / 0.942) 101px,
              rgb(0 0 0 / 0.973) 106px,
              rgb(0 0 0 / 0.991) 110px,
              rgb(0 0 0 / 0.999) 115px,
              black 120px,
              black calc(100% - 120px),
              rgb(0 0 0 / 0.999) calc(100% - 115px),
              rgb(0 0 0 / 0.991) calc(100% - 110px),
              rgb(0 0 0 / 0.973) calc(100% - 106px),
              rgb(0 0 0 / 0.942) calc(100% - 101px),
              rgb(0 0 0 / 0.896) calc(100% - 96px),
              rgb(0 0 0 / 0.837) calc(100% - 91px),
              rgb(0 0 0 / 0.765) calc(100% - 86px),
              rgb(0 0 0 / 0.683) calc(100% - 82px),
              rgb(0 0 0 / 0.593) calc(100% - 77px),
              rgb(0 0 0 / 0.5) calc(100% - 72px),
              rgb(0 0 0 / 0.407) calc(100% - 67px),
              rgb(0 0 0 / 0.317) calc(100% - 62px),
              rgb(0 0 0 / 0.235) calc(100% - 58px),
              rgb(0 0 0 / 0.163) calc(100% - 53px),
              rgb(0 0 0 / 0.104) calc(100% - 48px),
              rgb(0 0 0 / 0.058) calc(100% - 43px),
              rgb(0 0 0 / 0.027) calc(100% - 38px),
              rgb(0 0 0 / 0.009) calc(100% - 34px),
              rgb(0 0 0 / 0.001) calc(100% - 29px),
              transparent calc(100% - 24px),
              transparent 100%
            )
            0 0 / auto no-repeat,
          linear-gradient(black, black) 0 bottom / auto 12px no-repeat;
        mask: linear-gradient(
              to right,
              transparent 0px,
              transparent 24px,
              rgb(0 0 0 / 0.001) 29px,
              rgb(0 0 0 / 0.009) 34px,
              rgb(0 0 0 / 0.027) 38px,
              rgb(0 0 0 / 0.058) 43px,
              rgb(0 0 0 / 0.104) 48px,
              rgb(0 0 0 / 0.163) 53px,
              rgb(0 0 0 / 0.235) 58px,
              rgb(0 0 0 / 0.317) 62px,
              rgb(0 0 0 / 0.407) 67px,
              rgb(0 0 0 / 0.5) 72px,
              rgb(0 0 0 / 0.593) 77px,
              rgb(0 0 0 / 0.683) 82px,
              rgb(0 0 0 / 0.765) 86px,
              rgb(0 0 0 / 0.837) 91px,
              rgb(0 0 0 / 0.896) 96px,
              rgb(0 0 0 / 0.942) 101px,
              rgb(0 0 0 / 0.973) 106px,
              rgb(0 0 0 / 0.991) 110px,
              rgb(0 0 0 / 0.999) 115px,
              black 120px,
              black calc(100% - 120px),
              rgb(0 0 0 / 0.999) calc(100% - 115px),
              rgb(0 0 0 / 0.991) calc(100% - 110px),
              rgb(0 0 0 / 0.973) calc(100% - 106px),
              rgb(0 0 0 / 0.942) calc(100% - 101px),
              rgb(0 0 0 / 0.896) calc(100% - 96px),
              rgb(0 0 0 / 0.837) calc(100% - 91px),
              rgb(0 0 0 / 0.765) calc(100% - 86px),
              rgb(0 0 0 / 0.683) calc(100% - 82px),
              rgb(0 0 0 / 0.593) calc(100% - 77px),
              rgb(0 0 0 / 0.5) calc(100% - 72px),
              rgb(0 0 0 / 0.407) calc(100% - 67px),
              rgb(0 0 0 / 0.317) calc(100% - 62px),
              rgb(0 0 0 / 0.235) calc(100% - 58px),
              rgb(0 0 0 / 0.163) calc(100% - 53px),
              rgb(0 0 0 / 0.104) calc(100% - 48px),
              rgb(0 0 0 / 0.058) calc(100% - 43px),
              rgb(0 0 0 / 0.027) calc(100% - 38px),
              rgb(0 0 0 / 0.009) calc(100% - 34px),
              rgb(0 0 0 / 0.001) calc(100% - 29px),
              transparent calc(100% - 24px),
              transparent 100%
            )
            0 0 / auto no-repeat,
          linear-gradient(black, black) 0 bottom / auto 12px no-repeat;
      }
      .p-scroller .sentinel{
        width: 4px;
        visibility: hidden;
      }
      .p-scroller .sentinel:first-of-type:dir(rtl){
        grid-area: 1 / 3;
      }
      .p-scroller .sentinel:last-of-type:dir(rtl){
        grid-area: 1 / 1;
      }
      .p-scroller .prev,
      .p-scroller .next{
        z-index: 1;
        display: grid;
        align-self: center;
        width: 1.5rem;
        height: 1.5rem;
        padding: var(--p-spacing-static-xs);
        cursor: pointer;
        transition: transform var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          visibility 0s linear
            var(
              --p-scr-ind-delay,
              var(--p-transition-duration, var(--p-duration-sm))
            );
      }
      .p-scroller .prev{
        grid-area: 1 / 1;
        opacity: var(--p-scr-prev-op, 0);
        visibility: var(--p-scr-prev-vis, hidden);
        transform: var(
          --p-scr-prev-tf,
          translate3d(calc(-1 * var(--p-spacing-static-sm)), 0, 0)
        );
        transition: transform var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          visibility 0s linear
            var(
              --p-scr-prev-delay,
              var(--p-transition-duration, var(--p-duration-sm))
            );
      }
      .p-scroller .next{
        grid-area: 1 / 3;
        opacity: var(--p-scr-next-op, 0);
        visibility: var(--p-scr-next-vis, hidden);
        transform: var(
          --p-scr-next-tf,
          translate3d(var(--p-spacing-static-sm), 0, 0)
        );
        transition: transform var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          opacity var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          visibility 0s linear
            var(
              --p-scr-next-delay,
              var(--p-transition-duration, var(--p-duration-sm))
            );
      }
      .p-scroller[data-compact] .prev,
      .p-scroller[data-compact] .next {
        padding: 0;
      }
      .p-scroller[data-sticky] .prev,
      .p-scroller[data-sticky] .next {
        position: sticky;
        top: var(--p-scroller-indicator-top, 0px);
        bottom: var(--p-scroller-indicator-bottom, 0px);
      }
      .p-scroller[data-bar] .prev,
      .p-scroller[data-bar] .next {
        margin-top: calc(-1 * 12px);
      }
      .p-scroller .prev:dir(rtl){
        grid-area: 1 / 3;
      }
      .p-scroller .next:dir(rtl){
        grid-area: 1 / 1;
      }
      .p-scroller .prev::after,
      .p-scroller .next::after{
        content: "";
        background: var(--p-color-primary);
        transition: transform var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
      }
      .p-scroller .prev::after{
        -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.875 12v-.001l.006-.005 5.476-6.494.768.642-4.94 5.858 4.939 5.858-.768.642-5.477-6.497z"/></svg>')
          center / contain no-repeat;
        mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.875 12v-.001l.006-.005 5.476-6.494.768.642-4.94 5.858 4.939 5.858-.768.642-5.477-6.497z"/></svg>')
          center / contain no-repeat;
      }
      .p-scroller .next::after{
        -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m15.121 11.997-5.477-6.497-.769.642 4.94 5.858-4.94 5.858.768.642 5.476-6.494.006-.005v-.001z"/></svg>')
          center / contain no-repeat;
        mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m15.121 11.997-5.477-6.497-.769.642 4.94 5.858-4.94 5.858.768.642 5.476-6.494.006-.005v-.001z"/></svg>')
          center / contain no-repeat;
      }
      @media (pointer: coarse) {
        .p-scroller[data-bar] .scroll {
          padding: 4px 0px;
        }
        .p-scroller[data-bar] .prev,
        .p-scroller[data-bar] .next {
          margin-top: 0;
        }
        .p-scroller[data-bar][data-fade="left"] .scroll {
          -webkit-mask: linear-gradient(
              to right,
              transparent 0px,
              transparent 24px,
              rgb(0 0 0 / 0.001) 29px,
              rgb(0 0 0 / 0.009) 34px,
              rgb(0 0 0 / 0.027) 38px,
              rgb(0 0 0 / 0.058) 43px,
              rgb(0 0 0 / 0.104) 48px,
              rgb(0 0 0 / 0.163) 53px,
              rgb(0 0 0 / 0.235) 58px,
              rgb(0 0 0 / 0.317) 62px,
              rgb(0 0 0 / 0.407) 67px,
              rgb(0 0 0 / 0.5) 72px,
              rgb(0 0 0 / 0.593) 77px,
              rgb(0 0 0 / 0.683) 82px,
              rgb(0 0 0 / 0.765) 86px,
              rgb(0 0 0 / 0.837) 91px,
              rgb(0 0 0 / 0.896) 96px,
              rgb(0 0 0 / 0.942) 101px,
              rgb(0 0 0 / 0.973) 106px,
              rgb(0 0 0 / 0.991) 110px,
              rgb(0 0 0 / 0.999) 115px,
              black 120px,
              black 100%
            )
            0 0 / auto no-repeat;
          mask: linear-gradient(
              to right,
              transparent 0px,
              transparent 24px,
              rgb(0 0 0 / 0.001) 29px,
              rgb(0 0 0 / 0.009) 34px,
              rgb(0 0 0 / 0.027) 38px,
              rgb(0 0 0 / 0.058) 43px,
              rgb(0 0 0 / 0.104) 48px,
              rgb(0 0 0 / 0.163) 53px,
              rgb(0 0 0 / 0.235) 58px,
              rgb(0 0 0 / 0.317) 62px,
              rgb(0 0 0 / 0.407) 67px,
              rgb(0 0 0 / 0.5) 72px,
              rgb(0 0 0 / 0.593) 77px,
              rgb(0 0 0 / 0.683) 82px,
              rgb(0 0 0 / 0.765) 86px,
              rgb(0 0 0 / 0.837) 91px,
              rgb(0 0 0 / 0.896) 96px,
              rgb(0 0 0 / 0.942) 101px,
              rgb(0 0 0 / 0.973) 106px,
              rgb(0 0 0 / 0.991) 110px,
              rgb(0 0 0 / 0.999) 115px,
              black 120px,
              black 100%
            )
            0 0 / auto no-repeat;
        }
        .p-scroller[data-bar][data-fade="right"] .scroll {
          -webkit-mask: linear-gradient(
              to right,
              black 0%,
              black calc(100% - 120px),
              rgb(0 0 0 / 0.999) calc(100% - 115px),
              rgb(0 0 0 / 0.991) calc(100% - 110px),
              rgb(0 0 0 / 0.973) calc(100% - 106px),
              rgb(0 0 0 / 0.942) calc(100% - 101px),
              rgb(0 0 0 / 0.896) calc(100% - 96px),
              rgb(0 0 0 / 0.837) calc(100% - 91px),
              rgb(0 0 0 / 0.765) calc(100% - 86px),
              rgb(0 0 0 / 0.683) calc(100% - 82px),
              rgb(0 0 0 / 0.593) calc(100% - 77px),
              rgb(0 0 0 / 0.5) calc(100% - 72px),
              rgb(0 0 0 / 0.407) calc(100% - 67px),
              rgb(0 0 0 / 0.317) calc(100% - 62px),
              rgb(0 0 0 / 0.235) calc(100% - 58px),
              rgb(0 0 0 / 0.163) calc(100% - 53px),
              rgb(0 0 0 / 0.104) calc(100% - 48px),
              rgb(0 0 0 / 0.058) calc(100% - 43px),
              rgb(0 0 0 / 0.027) calc(100% - 38px),
              rgb(0 0 0 / 0.009) calc(100% - 34px),
              rgb(0 0 0 / 0.001) calc(100% - 29px),
              transparent calc(100% - 24px),
              transparent 100%
            )
            0 0 / auto no-repeat;
          mask: linear-gradient(
              to right,
              black 0%,
              black calc(100% - 120px),
              rgb(0 0 0 / 0.999) calc(100% - 115px),
              rgb(0 0 0 / 0.991) calc(100% - 110px),
              rgb(0 0 0 / 0.973) calc(100% - 106px),
              rgb(0 0 0 / 0.942) calc(100% - 101px),
              rgb(0 0 0 / 0.896) calc(100% - 96px),
              rgb(0 0 0 / 0.837) calc(100% - 91px),
              rgb(0 0 0 / 0.765) calc(100% - 86px),
              rgb(0 0 0 / 0.683) calc(100% - 82px),
              rgb(0 0 0 / 0.593) calc(100% - 77px),
              rgb(0 0 0 / 0.5) calc(100% - 72px),
              rgb(0 0 0 / 0.407) calc(100% - 67px),
              rgb(0 0 0 / 0.317) calc(100% - 62px),
              rgb(0 0 0 / 0.235) calc(100% - 58px),
              rgb(0 0 0 / 0.163) calc(100% - 53px),
              rgb(0 0 0 / 0.104) calc(100% - 48px),
              rgb(0 0 0 / 0.058) calc(100% - 43px),
              rgb(0 0 0 / 0.027) calc(100% - 38px),
              rgb(0 0 0 / 0.009) calc(100% - 34px),
              rgb(0 0 0 / 0.001) calc(100% - 29px),
              transparent calc(100% - 24px),
              transparent 100%
            )
            0 0 / auto no-repeat;
        }
        .p-scroller[data-bar][data-fade="both"] .scroll {
          -webkit-mask: linear-gradient(
              to right,
              transparent 0px,
              transparent 24px,
              rgb(0 0 0 / 0.001) 29px,
              rgb(0 0 0 / 0.009) 34px,
              rgb(0 0 0 / 0.027) 38px,
              rgb(0 0 0 / 0.058) 43px,
              rgb(0 0 0 / 0.104) 48px,
              rgb(0 0 0 / 0.163) 53px,
              rgb(0 0 0 / 0.235) 58px,
              rgb(0 0 0 / 0.317) 62px,
              rgb(0 0 0 / 0.407) 67px,
              rgb(0 0 0 / 0.5) 72px,
              rgb(0 0 0 / 0.593) 77px,
              rgb(0 0 0 / 0.683) 82px,
              rgb(0 0 0 / 0.765) 86px,
              rgb(0 0 0 / 0.837) 91px,
              rgb(0 0 0 / 0.896) 96px,
              rgb(0 0 0 / 0.942) 101px,
              rgb(0 0 0 / 0.973) 106px,
              rgb(0 0 0 / 0.991) 110px,
              rgb(0 0 0 / 0.999) 115px,
              black 120px,
              black calc(100% - 120px),
              rgb(0 0 0 / 0.999) calc(100% - 115px),
              rgb(0 0 0 / 0.991) calc(100% - 110px),
              rgb(0 0 0 / 0.973) calc(100% - 106px),
              rgb(0 0 0 / 0.942) calc(100% - 101px),
              rgb(0 0 0 / 0.896) calc(100% - 96px),
              rgb(0 0 0 / 0.837) calc(100% - 91px),
              rgb(0 0 0 / 0.765) calc(100% - 86px),
              rgb(0 0 0 / 0.683) calc(100% - 82px),
              rgb(0 0 0 / 0.593) calc(100% - 77px),
              rgb(0 0 0 / 0.5) calc(100% - 72px),
              rgb(0 0 0 / 0.407) calc(100% - 67px),
              rgb(0 0 0 / 0.317) calc(100% - 62px),
              rgb(0 0 0 / 0.235) calc(100% - 58px),
              rgb(0 0 0 / 0.163) calc(100% - 53px),
              rgb(0 0 0 / 0.104) calc(100% - 48px),
              rgb(0 0 0 / 0.058) calc(100% - 43px),
              rgb(0 0 0 / 0.027) calc(100% - 38px),
              rgb(0 0 0 / 0.009) calc(100% - 34px),
              rgb(0 0 0 / 0.001) calc(100% - 29px),
              transparent calc(100% - 24px),
              transparent 100%
            )
            0 0 / auto no-repeat;
          mask: linear-gradient(
              to right,
              transparent 0px,
              transparent 24px,
              rgb(0 0 0 / 0.001) 29px,
              rgb(0 0 0 / 0.009) 34px,
              rgb(0 0 0 / 0.027) 38px,
              rgb(0 0 0 / 0.058) 43px,
              rgb(0 0 0 / 0.104) 48px,
              rgb(0 0 0 / 0.163) 53px,
              rgb(0 0 0 / 0.235) 58px,
              rgb(0 0 0 / 0.317) 62px,
              rgb(0 0 0 / 0.407) 67px,
              rgb(0 0 0 / 0.5) 72px,
              rgb(0 0 0 / 0.593) 77px,
              rgb(0 0 0 / 0.683) 82px,
              rgb(0 0 0 / 0.765) 86px,
              rgb(0 0 0 / 0.837) 91px,
              rgb(0 0 0 / 0.896) 96px,
              rgb(0 0 0 / 0.942) 101px,
              rgb(0 0 0 / 0.973) 106px,
              rgb(0 0 0 / 0.991) 110px,
              rgb(0 0 0 / 0.999) 115px,
              black 120px,
              black calc(100% - 120px),
              rgb(0 0 0 / 0.999) calc(100% - 115px),
              rgb(0 0 0 / 0.991) calc(100% - 110px),
              rgb(0 0 0 / 0.973) calc(100% - 106px),
              rgb(0 0 0 / 0.942) calc(100% - 101px),
              rgb(0 0 0 / 0.896) calc(100% - 96px),
              rgb(0 0 0 / 0.837) calc(100% - 91px),
              rgb(0 0 0 / 0.765) calc(100% - 86px),
              rgb(0 0 0 / 0.683) calc(100% - 82px),
              rgb(0 0 0 / 0.593) calc(100% - 77px),
              rgb(0 0 0 / 0.5) calc(100% - 72px),
              rgb(0 0 0 / 0.407) calc(100% - 67px),
              rgb(0 0 0 / 0.317) calc(100% - 62px),
              rgb(0 0 0 / 0.235) calc(100% - 58px),
              rgb(0 0 0 / 0.163) calc(100% - 53px),
              rgb(0 0 0 / 0.104) calc(100% - 48px),
              rgb(0 0 0 / 0.058) calc(100% - 43px),
              rgb(0 0 0 / 0.027) calc(100% - 38px),
              rgb(0 0 0 / 0.009) calc(100% - 34px),
              rgb(0 0 0 / 0.001) calc(100% - 29px),
              transparent calc(100% - 24px),
              transparent 100%
            )
            0 0 / auto no-repeat;
        }
      }
      @media (forced-colors: active) {
        .p-scroller .root:has(.scroll:focus-visible){
          outline-color: Highlight;
        }
        .p-scroller .prev::after,
        .p-scroller .next::after{
          background: CanvasText;
        }
      }
      @media (hover: hover) {
        .p-scroller .prev:hover::after{
          transform: translate3d(calc(-1 * var(--p-spacing-static-xs)), 0, 0);
        }
        .p-scroller .next:hover::after{
          transform: translate3d(var(--p-spacing-static-xs), 0, 0);
        }
      }`]})],g);export{g as default};
