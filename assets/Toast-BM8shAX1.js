import{C as e,V as m,a as d}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var l=Object.getOwnPropertyDescriptor,c=(o,s,i,n)=>{for(var t=n>1?void 0:n?l(s,i):s,a=o.length-1,r;a>=0;a--)(r=o[a])&&(t=r(t)||t);return t};let p=class{};p=c([e({selector:"p-toast",standalone:!0,imports:[d],encapsulation:m.None,template:`
    <div class="p-toast" data-pds="toast">
    <div class="root"><span data-pds-slot=""><ng-content></ng-content></span></div> 
    </div>
  `,styles:[`.p-toast :where([data-pds-slot]){display:contents}

      .p-toast {
        display: contents;
      }
      .p-toast {
        --_p-toast-a: var(--p-toast-position-bottom, 56px) !important;
        position: fixed !important;
        inset: auto max(22px, 10.625vw - 12px) var(--_p-toast-a) !important;
        z-index: 999999 !important;
      }
      .p-toast[hidden] {
        display: none !important;
      }
      @keyframes in {
        from {
          transform: translate3d(0, calc(var(--_p-toast-a) + 100%), 0);
        }
        to {
          transform: translate3d(0, 0, 0);
        }
      }
      @keyframes out {
        from {
          transform: translate3d(0, 0, 0);
        }
        to {
          transform: translate3d(0, calc(var(--_p-toast-a) + 100%), 0);
        }
      }
      @media (min-width: 760px) {
        .p-toast {
          --_p-toast-a: var(--p-toast-position-bottom, 64px) !important;
          inset: auto auto var(--_p-toast-a) 64px !important;
          max-width: min(42rem, calc(100vw - 64px * 2)) !important;
        }
      }
      .p-toast .hydrated{
        animation: var(--p-animation-duration, 0.4s) in
          cubic-bezier(0, 0, 0.2, 1) forwards;
      }
      .p-toast .close{
        animation: 0.4s out cubic-bezier(0.4, 0, 0.5, 1) forwards !important;
      }`]})],p);export{p as default};
