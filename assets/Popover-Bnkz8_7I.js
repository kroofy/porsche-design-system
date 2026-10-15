import{I as v,C as l,V as d,a as c}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var u=Object.defineProperty,m=Object.getOwnPropertyDescriptor,i=(t,o,a,p)=>{for(var r=p>1?void 0:p?m(o,a):o,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(p?s(o,a,r):s(r))||r);return p&&r&&u(o,a,r),r};let e=class{get hostStyle(){const t=p=>p===!0||p==="true"||p==="",o=t(this.open),a=t(this.compact);return{"--p-pop-pad":a?"var(--p-spacing-static-sm)":"var(--p-spacing-static-md)","--p-pop-radius":a?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-pop-ease":o?"var(--p-ease-in)":"var(--p-ease-out)","--p-pop-opacity":o?"1":"0","--p-pop-btn-bg":o?"var(--p-color-frosted)":"","--p-pop-btn-blur":o?"var(--p-blur-frosted)":""}}get descriptionText(){return this.description||""}};i([v()],e.prototype,"open",2);i([v()],e.prototype,"compact",2);i([v()],e.prototype,"description",2);e=i([l({selector:"p-popover",standalone:!0,imports:[c],encapsulation:d.None,template:`
    <div class="p-popover" data-pds="popover" [style]="hostStyle">
    <div class="wrap">
      <button
        type="button"
        aria-label="More information"
        aria-details="popover"
      ></button>
      <div id="popover" popover="manual">
        <div class="arrow"></div>
        <p>{{descriptionText}}</p>
        <span data-pds-slot=""><ng-content></ng-content></span>
      </div>
    </div>
  
    </div>
  `,styles:[`.p-popover :where([data-pds-slot]){display:contents}

      .p-popover {
        display: contents;
      }
      .p-popover {
        display: contents;
        margin: 0;
      }
      .p-popover[hidden] {
        display: none !important;
      }
      .p-popover .wrap{
        display: contents;
      }
      .p-popover [data-pds-slot]:not([name]),
      .p-popover p{
        display: block;
        margin: 0;
        min-width: 0;
        min-height: 0;
        max-width: inherit;
        max-height: inherit;
        box-sizing: border-box;
        padding-block: var(--p-popover-py, var(--p-pop-pad));
        padding-inline: var(--p-popover-px, var(--p-pop-pad));
        overflow: hidden auto;
        overscroll-behavior-y: none;
      }
      .p-popover button{
        all: unset;
        margin: inherit;
        display: inline-grid;
        vertical-align: top;
        font: var(--p-typescale-sm) var(--p-font-porsche-next);
        width: var(--p-leading-normal);
        height: var(--p-leading-normal);
        flex: none;
        cursor: pointer;
      }
      .p-popover button:focus-visible::before{
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-popover button::before{
        grid-area: 1/1;
        content: "";
        margin: -2px;
        transition: background-color
          var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
        border-radius: var(--p-radius-full);
        background: var(--p-pop-btn-bg);
        -webkit-backdrop-filter: var(--p-pop-btn-blur);
        backdrop-filter: var(--p-pop-btn-blur);
      }
      .p-popover button::after{
        grid-area: 1/1;
        content: "";
        -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.5 10v6h-1v-6zm0-2v1h-1V8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16m0-1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9"/></svg>')
          center/contain no-repeat;
        mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.5 10v6h-1v-6zm0-2v1h-1V8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16m0-1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9"/></svg>')
          center/contain no-repeat;
        background: var(--p-color-primary);
      }
      .p-popover [popover]{
        all: unset;
        position: fixed;
        top: 0;
        left: 0;
        filter: drop-shadow(0 0 16px rgba(0, 0, 0, 0.3));
        backdrop-filter: drop-shadow(0 0 transparent);
        border-radius: var(--p-popover-radius, var(--p-pop-radius));
        background: var(--p-color-canvas);
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        color: var(--p-color-primary);
        width: var(--p-popover-w, max-content);
        height: var(--p-popover-h, auto);
        min-width: var(--p-popover-min-w, 0px);
        min-height: var(--p-popover-min-h, auto);
        max-width: var(--p-popover-max-w, min(calc(100dvw - 16px), 48ch));
        max-height: var(--p-popover-max-h, calc(100dvh - 16px));
        opacity: var(--p-pop-opacity);
        transition: opacity var(--p-transition-duration, var(--p-duration-sm))
          var(--p-pop-ease);
        overlay: none;
        display: none;
      }
      .p-popover [popover]:popover-open{
        overlay: auto;
        display: grid;
      }
      .p-popover [popover]::backdrop{
        display: none;
      }
      @media (forced-colors: active) {
        .p-popover button::after{
          background: ButtonText;
        }
        .p-popover button:focus-visible::before{
          outline-color: Highlight;
        }
        .p-popover [popover]{
          outline: 2px solid CanvasText;
          outline-offset: -2px;
        }
      }
      @media (hover: hover) {
        .p-popover button:hover::before{
          background: var(--p-color-frosted-strong);
          -webkit-backdrop-filter: var(--p-blur-frosted);
          backdrop-filter: var(--p-blur-frosted);
        }
      }
      @supports (color: oklch(from red l c h)) {
        .p-popover [popover]{
          background: hsl(from var(--p-color-canvas) h 0% calc(l + 14));
        }
      }
      @supports (overlay: auto) and (transition-behavior: allow-discrete) {
        .p-popover [popover]{
          transition: opacity var(--p-transition-duration, var(--p-duration-sm))
              var(--p-pop-ease),
            overlay var(--p-transition-duration, var(--p-duration-sm))
              var(--p-pop-ease) allow-discrete,
            display var(--p-transition-duration, var(--p-duration-sm))
              var(--p-pop-ease) allow-discrete;
        }
      }
      .p-popover .arrow{
        position: absolute;
        width: 24px;
        height: 12px;
        clip-path: polygon(50% 0, 100% 110%, 0 110%);
        background: inherit;
      }
      @media (forced-colors: active) {
        .p-popover .arrow{
          background: CanvasText;
        }
      }
      @starting-style {
        .p-popover [popover]{
          opacity: 0;
        }
      }`]})],e);export{e as default};
