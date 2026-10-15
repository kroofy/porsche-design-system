import{I as c,C as b,V as w,a as y}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var k=Object.defineProperty,O=Object.getOwnPropertyDescriptor,l=(a,r,p,n)=>{for(var o=n>1?void 0:n?O(r,p):r,m=a.length-1,v;m>=0;m--)(v=a[m])&&(o=(n?v(r,p,o):v(o))||o);return n&&o&&k(r,p,o),o};const f=["base","xs","s","m","l","xl","xxl"],B=(a,r)=>{if(a==null)return r;if(a==="")return!0;if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"'))}catch{return r}return a},h=(a,r,p)=>a&&typeof a=="object"?a[r]===void 0?p:a[r]:a,_=a=>a===!0||a==="true"?{w:"auto",minW:"auto",maxW:"none",place:"stretch",margin:"0",radius:"0",clip:"none"}:{w:"var(--p-modal-width, auto)",minW:"276px",maxW:"1535.5px",place:"center",margin:"var(--p-modal-spacing-top, clamp(16px, 10vh, 192px)) max(22px, 10.625vw - 12px) var(--p-modal-spacing-bottom, clamp(16px, 10vh, 192px))",radius:"var(--p-radius-3xl)",clip:"inset(0 round var(--p-radius-3xl))"};let s=class{get hostStyle(){const a=i=>i===!0||i==="true"||i==="",r=a(this.open),p=this.background==="surface"?"surface":"canvas",n=this.backdrop==="shading"?"shading":"blur",o=B(this.fullscreen,!1),m=p==="surface"?"var(--p-color-surface)":"var(--p-color-canvas)",v=p==="surface"?"var(--p-color-canvas)":"var(--p-color-surface)",g="var(--p-transition-duration, var(--p-duration-md))",t={"--p-mo-w-dialog":r?"100dvw":"0px","--p-mo-h-dialog":r?"100dvh":"0px","--p-mo-vis":r?"inherit":"hidden","--p-mo-pe":r?"auto":"none","--p-mo-db":r?"var(--p-color-backdrop)":"transparent","--p-mo-bf":r&&n==="blur"?"var(--p-blur-frosted)":"","--p-mo-delay":r?"var(--p-transition-duration, 0s)":g,"--p-mo-ease":r?"var(--p-ease-in)":"var(--p-ease-out)","--p-mo-ddur":r?"var(--p-transition-duration, var(--p-duration-lg))":g,"--p-mo-pdur":r?g:"var(--p-transition-duration, var(--p-duration-sm))","--p-mo-op":r?"1":"0","--p-mo-tf":r?"translate3d(0, 0, 0)":"translate3d(0, 25vh, 0)","--p-mo-hcm":a(o)?"":"2px solid CanvasText","--p-mo-dialog-bg":m,"--p-mo-dismiss-bg":m,"--p-mo-dismiss-hover":v},x=(i,u)=>{const d=_(u),e=i==="base"?"":`-${i}`;t[`--p-mo-w${e}`]=d.w,t[`--p-mo-min-w${e}`]=d.minW,t[`--p-mo-max-w${e}`]=d.maxW,t[`--p-mo-place${e}`]=d.place,t[`--p-mo-margin${e}`]=d.margin,t[`--p-mo-radius${e}`]=d.radius,t[`--p-mo-clip${e}`]=d.clip};if(typeof o=="object"&&o!==null){let i=h(o,"base",!1);for(const u of f)o[u]!==void 0&&(i=h(o,u,i)),x(u,i)}else for(const i of f)x(i,a(o));return t}get isOpenFlag(){const a=this.open;return a===!0||a==="true"||a===""}get showDismiss(){const a=this.dismissButton;return!(a===!1||a==="false")}get ariaLabelText(){const a=this.aria;if(a&&typeof a=="object"&&a["aria-label"])return a["aria-label"];if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"'))["aria-label"]||""}catch{return""}return""}};l([c()],s.prototype,"open",2);l([c()],s.prototype,"background",2);l([c()],s.prototype,"backdrop",2);l([c()],s.prototype,"fullscreen",2);l([c()],s.prototype,"dismissButton",2);l([c()],s.prototype,"aria",2);s=l([b({selector:"p-modal",standalone:!0,imports:[y],encapsulation:w.None,template:`
    <div class="p-modal" data-pds="modal" [style]="hostStyle">
    <dialog aria-modal="true" [attr.inert]="true" [attr.tabIndex]="-1">
      <div class="scroller">
        <div class="modal">
          <button class="dismiss" type="button">
            <span>Dismiss modal</span>
          </button>
          <span data-pds-slot="header"><ng-content select="[slot=header]"></ng-content></span>
          <span data-pds-slot=""><ng-content></ng-content></span>
          <span data-pds-slot="footer"><ng-content select="[slot=footer]"></ng-content></span>
        </div>
      </div>
    </dialog>
  
    </div>
  `,styles:[`.p-modal :where([data-pds-slot]){display:contents}

      .p-modal {
        display: contents;
      }
      .p-modal {
        display: contents;
        --ref-p-modal-pt: var(--p-spacing-fluid-md) !important;
        --ref-p-modal-pb: calc(
          var(--p-radius-3xl) + var(--p-spacing-fluid-md)
        ) !important;
        --ref-p-modal-px: var(--p-spacing-fluid-lg) !important;
        --pds-internal-grid-outer-column: calc(
          var(--p-spacing-fluid-lg) - clamp(16px, 1.25vw + 12px, 36px)
        ) !important;
        --pds-internal-grid-margin: calc(
          var(--p-spacing-fluid-lg) * -1
        ) !important;
        --pds-internal-grid-width-min: auto !important;
        --pds-internal-grid-width-max: none !important;
        --_p-dialog-a: var(--p-mo-dialog-bg) !important;
      }
      .p-modal[hidden] {
        display: none !important;
      }
      .p-modal [data-pds-slot]{
        display: block;
      }
      .p-modal [data-pds-slot]:first-of-type{
        grid-row-start: 1;
      }
      .p-modal [data-pds-slot]:not([name]){
        grid-column: 2/3;
        z-index: 0;
      }
      .p-modal [data-pds-slot="header"]{
        grid-column: 2/3;
        z-index: 0;
      }
      .p-modal [data-pds-slot="footer"]{
        grid-column: 1/-1;
        z-index: 2;
        position: sticky;
        bottom: -0.1px;
        margin-block: calc(
          -1 * calc(calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) -
                var(--p-radius-3xl))
        );
        padding: calc(
            calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) -
              var(--p-radius-3xl)
          )
          var(--p-spacing-fluid-lg);
        background: linear-gradient(
          0deg,
          var(--_p-dialog-a) 0%,
          var(--_p-dialog-a) 20%,
          transparent 80%
        );
      }
      .p-modal [data-pds-slot="footer"][data-stuck]::after{
        content: "";
        z-index: -1;
        position: absolute;
        inset: calc(
            calc(
                calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) -
                  var(--p-radius-3xl)
              ) - 12 * var(--p-spacing-static-2xs)
          )
          calc(var(--p-spacing-fluid-lg) - 12 * var(--p-spacing-static-2xs));
        background: var(--p-color-frosted);
        border-radius: var(--p-radius-2xl);
        -webkit-backdrop-filter: var(--p-blur-frosted);
        backdrop-filter: var(--p-blur-frosted);
      }
      .p-modal dialog{
        all: unset;
        position: fixed;
        inset: 0;
        max-width: 100dvw;
        max-height: 100dvh;
        overflow: hidden;
        display: block;
        user-select: text;
        outline: 0;
        width: var(--p-mo-w-dialog, 0px);
        height: var(--p-mo-h-dialog, 0px);
        visibility: var(--p-mo-vis, hidden);
        pointer-events: var(--p-mo-pe, none);
        background: var(--p-mo-db, transparent);
        -webkit-backdrop-filter: var(--p-mo-bf);
        backdrop-filter: var(--p-mo-bf);
        transition: visibility 0s linear var(--p-mo-delay),
          width 0s linear var(--p-mo-delay), height 0s linear var(--p-mo-delay),
          background-color var(--p-mo-ddur) var(--p-mo-ease),
          -webkit-backdrop-filter var(--p-mo-ddur) var(--p-mo-ease),
          backdrop-filter var(--p-mo-ddur) var(--p-mo-ease);
        overlay: none;
      }
      .p-modal dialog:modal{
        overlay: auto;
      }
      .p-modal dialog::backdrop{
        display: none;
      }
      @supports (overlay: auto) and (transition-behavior: allow-discrete) {
        .p-modal dialog{
          transition: visibility 0s linear var(--p-mo-delay),
            width 0s linear var(--p-mo-delay),
            height 0s linear var(--p-mo-delay),
            background-color var(--p-mo-ddur) var(--p-mo-ease),
            -webkit-backdrop-filter var(--p-mo-ddur) var(--p-mo-ease),
            backdrop-filter var(--p-mo-ddur) var(--p-mo-ease),
            overlay var(--p-mo-ddur) var(--p-mo-ease) allow-discrete;
        }
      }
      .p-modal .scroller{
        position: absolute;
        isolation: isolate;
        display: grid;
        inset: 0;
        overflow: hidden auto;
        overscroll-behavior-y: none;
        background: rgba(255, 255, 255, 0.01);
        transform: translate3d(0, 0, 0);
      }
      .p-modal .modal{
        position: relative;
        display: grid;
        grid-template: auto / var(--p-spacing-fluid-sm) minmax(0, 1fr) var(
            --p-spacing-fluid-sm
          );
        gap: var(--p-spacing-fluid-md)
          calc(var(--p-spacing-fluid-lg) - var(--p-spacing-fluid-sm));
        padding-top: var(--p-spacing-fluid-md);
        padding-bottom: calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md));
        align-content: flex-start;
        color: var(--p-color-primary);
        background: var(--_p-dialog-a);
        opacity: var(--p-mo-op, 0);
        transform: var(--p-mo-tf, translate3d(0, 25vh, 0));
        transition: opacity var(--p-mo-pdur) var(--p-mo-ease),
          transform var(--p-mo-pdur) var(--p-mo-ease);
        width: var(--p-mo-w);
        min-width: var(--p-mo-min-w);
        max-width: var(--p-mo-max-w);
        place-self: var(--p-mo-place);
        margin: var(--p-mo-margin);
        border-radius: var(--p-mo-radius);
        clip-path: var(--p-mo-clip);
      }
      .p-modal .modal:dir(rtl){
        transform: var(--p-mo-tf, translate3d(0, 25vh, 0));
      }
      @media (forced-colors: active) {
        .p-modal .modal{
          outline: var(--p-mo-hcm);
          outline-offset: -2px;
        }
      }
      @media (min-width: 480px) {
        .p-modal .modal{
          width: var(--p-mo-w-xs);
          min-width: var(--p-mo-min-w-xs);
          max-width: var(--p-mo-max-w-xs);
          place-self: var(--p-mo-place-xs);
          margin: var(--p-mo-margin-xs);
          border-radius: var(--p-mo-radius-xs);
          clip-path: var(--p-mo-clip-xs);
        }
      }
      @media (min-width: 760px) {
        .p-modal .modal{
          width: var(--p-mo-w-s);
          min-width: var(--p-mo-min-w-s);
          max-width: var(--p-mo-max-w-s);
          place-self: var(--p-mo-place-s);
          margin: var(--p-mo-margin-s);
          border-radius: var(--p-mo-radius-s);
          clip-path: var(--p-mo-clip-s);
        }
      }
      @media (min-width: 1000px) {
        .p-modal .modal{
          width: var(--p-mo-w-m);
          min-width: var(--p-mo-min-w-m);
          max-width: var(--p-mo-max-w-m);
          place-self: var(--p-mo-place-m);
          margin: var(--p-mo-margin-m);
          border-radius: var(--p-mo-radius-m);
          clip-path: var(--p-mo-clip-m);
        }
      }
      @media (min-width: 1300px) {
        .p-modal .modal{
          width: var(--p-mo-w-l);
          min-width: var(--p-mo-min-w-l);
          max-width: var(--p-mo-max-w-l);
          place-self: var(--p-mo-place-l);
          margin: var(--p-mo-margin-l);
          border-radius: var(--p-mo-radius-l);
          clip-path: var(--p-mo-clip-l);
        }
      }
      @media (min-width: 1760px) {
        .p-modal .modal{
          width: var(--p-mo-w-xl);
          min-width: var(--p-mo-min-w-xl);
          max-width: var(--p-mo-max-w-xl);
          place-self: var(--p-mo-place-xl);
          margin: var(--p-mo-margin-xl);
          border-radius: var(--p-mo-radius-xl);
          clip-path: var(--p-mo-clip-xl);
        }
      }
      @media (min-width: 1920px) {
        .p-modal .modal{
          width: var(--p-mo-w-xxl);
          min-width: var(--p-mo-min-w-xxl);
          max-width: var(--p-mo-max-w-xxl);
          place-self: var(--p-mo-place-xxl);
          margin: var(--p-mo-margin-xxl);
          border-radius: var(--p-mo-radius-xxl);
          clip-path: var(--p-mo-clip-xxl);
        }
      }
      .p-modal .dismiss{
        all: unset;
        box-sizing: border-box;
        display: grid;
        place-items: center;
        padding: 6px;
        border-radius: var(--p-radius-full);
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        background-color: var(--p-mo-dismiss-bg);
        color: var(--p-color-primary);
        cursor: pointer;
        transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        grid-area: 1/3;
        z-index: 5;
        position: sticky;
        top: var(--p-spacing-fluid-sm);
        margin-top: calc(
          -1 * var(--p-spacing-fluid-md) + var(--p-spacing-fluid-sm)
        );
        margin-inline-end: var(--p-spacing-fluid-sm);
        place-self: flex-start flex-end;
      }
      .p-modal .dismiss:focus-visible{
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-modal .dismiss::before{
        content: "";
        width: var(--p-leading-normal);
        height: var(--p-leading-normal);
        -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
          center/contain no-repeat;
        mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
          center/contain no-repeat;
        background: currentColor;
      }
      .p-modal .dismiss span{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }
      @media (forced-colors: active) {
        .p-modal .dismiss{
          forced-color-adjust: none;
          background: Canvas;
          box-shadow: inset 0 0 0 2px ButtonBorder;
          color: ButtonText;
        }
        .p-modal .dismiss:focus-visible{
          outline-color: Highlight;
        }
      }
      @media (hover: hover) {
        .p-modal .dismiss:hover{
          background-color: var(--p-mo-dismiss-hover);
        }
        @media (forced-colors: active) {
          .p-modal .dismiss:hover{
            background: Canvas;
          }
        }
      }`]})],s);export{s as default};
