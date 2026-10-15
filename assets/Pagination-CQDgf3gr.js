import h from"./Icon-DzSCh0v5.js";import{I as g,C as y,V as b,a as x}from"./angular-aNJmk6GY.js";import"./index-ChNsHkGO.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var P=Object.defineProperty,w=Object.getOwnPropertyDescriptor,d=(s,e,p,t)=>{for(var a=t>1?void 0:t?w(e,p):e,i=s.length-1,n;i>=0;i--)(n=s[i])&&(a=(t?n(e,p,a):n(a))||a);return t&&a&&P(e,p,a),a};let l=class{get hostStyle(){const s=Number(this.totalItemsCount==null||this.totalItemsCount===""?1:this.totalItemsCount),e=Number(this.itemsPerPage==null||this.itemsPerPage===""?1:this.itemsPerPage),p=Math.ceil((s<1?1:s)/(e<1?1:e));let t=Number(this.activePage==null||this.activePage===""?1:this.activePage);t<1&&(t=1),t>p&&(t=p);let a=this.showLastPage;a===!1||a==="false"?a=!1:a=!0;const i="list-item",n="none",c=p<8,o=p>5,r=p-t,m=o&&t<4,u=o&&r<3,v=o&&!m&&!u,f=o&&!a&&r>=2&&t>2;return{"--p-pg-ellip":c?n:i,"--p-pg-ellip-start":!c&&t<=4?n:i,"--p-pg-ellip-end-3":!c&&r<4?n:i,"--p-pg-ellip-end-2":!c&&r<3?n:i,"--p-pg-m-start":m?n:i,"--p-pg-m-end":u?n:i,"--p-pg-m-mid":v?n:i,"--p-pg-m-ellip-end-show":f?"1":"","--p-pg-m-cur-2":o&&!a&&r<2?n:i,"--p-pg-m-cur-1":o&&!a&&r===1?n:i,"--p-pg-m-cur-after":o&&!a&&r>=2&&t>2?n:i}}};d([g()],l.prototype,"totalItemsCount",2);d([g()],l.prototype,"itemsPerPage",2);d([g()],l.prototype,"activePage",2);d([g()],l.prototype,"showLastPage",2);l=d([y({selector:"p-pagination",standalone:!0,imports:[x,h],encapsulation:b.None,template:`
    <div class="p-pagination" data-pds="pagination" [style]="hostStyle">
    <nav>
      <ul>
        <li class="prev">
          <span
            ><p-icon
              name="arrow-left"
              color="primary"
              aria-hidden="true"
            ></p-icon
          ></span>
        </li>
      </ul>
    </nav>
  
    </div>
  `,styles:[`.p-pagination :where([data-pds-slot]){display:contents}

      .p-pagination {
        display: contents;
      }
      .p-pagination {
        display: block;
      }
      .p-pagination[hidden] {
        display: none !important;
      }
      .p-pagination nav{
        display: flex;
        justify-content: center;
        user-select: none;
      }
      .p-pagination ul{
        display: flex;
        gap: var(--p-spacing-static-xs);
        margin: 0;
        padding: 0;
      }
      .p-pagination li{
        list-style-type: none;
      }
      .p-pagination span{
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color
            var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out),
          color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
        position: relative;
        padding: 0 6px;
        min-width: 2.25rem;
        height: 2.25rem;
        box-sizing: border-box;
        font: var(--p-font-weight-normal) var(--p-typescale-sm) /
          var(--p-leading-normal) var(--p-font-porsche-next);
        white-space: nowrap;
        cursor: pointer;
        background-color: transparent;
        color: var(--p-color-primary);
        border-radius: var(--p-radius-full);
        border-color: transparent;
        outline: 0;
      }
      .p-pagination span[aria-current]{
        cursor: default;
        pointer-events: none;
        background-color: var(--p-color-frosted-strong);
      }
      .p-pagination span[aria-disabled]{
        cursor: default;
        pointer-events: none;
        opacity: 0.4;
      }
      .p-pagination span:not(.ellipsis):focus-visible{
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-pagination .ellipsis{
        cursor: default;
        pointer-events: none;
      }
      .p-pagination .ellipsis::after{
        content: "…";
      }
      @media (min-width: 760px) {
        .p-pagination ul{
          gap: var(--p-spacing-static-sm);
        }
        .p-pagination[data-pg-few] li.ellip {
          display: none;
        }
        .p-pagination[data-pg-start] li.ellip-start {
          display: none;
        }
        .p-pagination[data-pg-end-4] li.ellip-end:nth-last-child(3) {
          display: none;
        }
        .p-pagination[data-pg-end-3] li.ellip-end:nth-last-child(2) {
          display: none;
        }
      }
      @media (max-width: 759px) {
        .p-pagination[data-pg-m-start] li.ellip-start,
        .p-pagination[data-pg-m-start] li:nth-child(6),
        .p-pagination[data-pg-m-start] li:nth-child(7),
        .p-pagination[data-pg-m-start] li:not(.ellip):nth-child(8) {
          display: none;
        }
        .p-pagination[data-pg-m-end] li.ellip-end,
        .p-pagination[data-pg-m-end] li.ellip-start + li:not(.current),
        .p-pagination[data-pg-m-end]
          li.ellip-start
          + li:not(.current)
          + li:not(.current) {
          display: none;
        }
        .p-pagination[data-pg-m-mid] li.ellip-start + li:not(.current),
        .p-pagination[data-pg-m-mid] li.current-1,
        .p-pagination[data-pg-m-mid] li[class~="current+1"],
        .p-pagination[data-pg-m-mid] li[class~="current+1"] + li:not(.ellip) {
          display: none;
        }
        .p-pagination[data-pg-m-cur-2] li.current-2 {
          display: none;
        }
        .p-pagination[data-pg-m-cur-1] li.current-1 {
          display: none;
        }
        .p-pagination[data-pg-m-cur-after] li[class~="current+1"],
        .p-pagination[data-pg-m-cur-after] li[class~="current+2"] {
          display: none;
        }
        .p-pagination[data-pg-m-ellip-end-show] li.ellip-end {
          display: initial;
        }
      }
      @media (forced-colors: active) {
        .p-pagination span:not(.ellipsis):focus-visible{
          outline-color: Highlight;
        }
        .p-pagination span[aria-disabled]{
          opacity: 1;
          color: GrayText;
        }
        .p-pagination span[aria-current]{
          border: 2px solid CanvasText;
        }
      }
      @media (hover: hover) {
        .p-pagination span:not([aria-disabled]):not(.ellipsis):hover{
          -webkit-backdrop-filter: var(--p-blur-frosted);
          backdrop-filter: var(--p-blur-frosted);
          background: var(--p-color-frosted);
        }
        @media (forced-colors: active) {
          .p-pagination span:not([aria-disabled]):not(.ellipsis):hover{
            outline: 2px solid CanvasText;
            outline-offset: -2px;
          }
        }
      }`]})],l);export{l as default};
