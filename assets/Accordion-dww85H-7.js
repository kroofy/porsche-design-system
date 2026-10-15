import{a as V}from"./host-DRskmCSE.js";import{I as d,C as N,V as D,a as E}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var L=Object.defineProperty,U=Object.getOwnPropertyDescriptor,i=(a,o,s,g)=>{for(var t=g>1?void 0:g?U(o,s):o,p=a.length-1,n;p>=0;p--)(n=a[p])&&(t=(g?n(o,s,t):n(t))||t);return g&&t&&L(o,s,t),t};const f=["base","xs","s","m","l","xl","xxl"],C=(a,o)=>{if(a==null)return o;if(a==="")return typeof o=="boolean"?!0:o;if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return o}return a},y=(a,o,s)=>a&&typeof a=="object"?a[o]===void 0?s:a[o]:a;let e=class{constructor(){this.hostAttr=V}get hostStyle(){const a=r=>r===!0||r==="true"||r==="",o=a(this.open),s=a(this.compact),t=(this.alignMarker||"end")==="start",p=this.background||"none",n=C(this.indent,!1),u=C(this.size,"small"),l=this.hasSummaryBefore,h=this.hasSummaryAfter,x=s?.64285714:1,b="calc(28px * ("+x+" - 0.64285714) + 6px)",k="calc(11.2px * ("+x+" - 0.64285714) + 12px)",A="calc(11.2px * ("+x+" - 0.64285714) + 4px)",O=p==="none"?"0":b,B=p==="none"?"0":k,_=s?"var(--p-radius-xl)":"var(--p-radius-2xl)",S={canvas:"var(--p-color-canvas)",surface:"var(--p-color-surface)",frosted:"var(--p-color-frosted)",none:"transparent"},z=l&&t?3:l||t?2:1,F=t?1:l&&h?4:l||h?3:2,P=t?2:1,$=l&&t?4:l||t?3:2,I=(l?"auto ":"")+(t?"auto minmax(0, 1fr)":"minmax(0, 1fr) auto")+(h?" auto ":""),T=r=>r==="medium"?"var(--p-typescale-md)":"var(--p-typescale-sm)",w=r=>a(r)?String(z):"1",m={"--p-acc-gap":A,"--p-acc-py":O,"--p-acc-px":B,"--p-acc-py-fc":b,"--p-acc-px-fc":k,"--p-acc-radius":_,"--p-acc-bg":S[p]||S.none,"--p-acc-dur":o?"var(--p-transition-duration, var(--p-duration-md))":"var(--p-transition-duration, var(--p-duration-sm))","--p-acc-ease":o?"var(--p-ease-in)":"var(--p-ease-out)","--p-acc-pad-top":b,"--p-acc-cols":I,"--p-acc-summary-col":String(z),"--p-acc-icon-col":String(F),"--p-acc-before-col":String(P),"--p-acc-after-col":String($),"--p-acc-fc-off":p==="none"?"0":"-1px"};if(typeof u=="object"&&u!==null){let r=String(y(u,"base","small")||"small");for(const c of f){u[c]!==void 0&&(r=String(y(u,c,r)));const v=c==="base"?"--p-acc-fs":`--p-acc-fs-${c}`;m[v]=T(r)}}else{const r=T(u);m["--p-acc-fs"]=r;for(const c of f)c!=="base"&&(m[`--p-acc-fs-${c}`]=r)}if(typeof n=="object"&&n!==null){let r=a(y(n,"base",!1)),c=w(r);for(const v of f){n[v]!==void 0&&(r=a(y(n,v,r)),c=w(r));const M=v==="base"?"--p-acc-indent":`--p-acc-indent-${v}`;m[M]=c}}else{const r=w(n);m["--p-acc-indent"]=r;for(const c of f)c!=="base"&&(m[`--p-acc-indent-${c}`]=r)}return m}get headingText(){return this.heading||""}get headingTagValue(){return this.headingTag||"h2"}get isOpenFlag(){return this.open===!0||this.open==="true"||this.open===""}get hasSummaryBefore(){return!1}get hasSummaryAfter(){return!1}get hasSummarySlot(){return!1}};i([d()],e.prototype,"open",2);i([d()],e.prototype,"compact",2);i([d()],e.prototype,"alignMarker",2);i([d()],e.prototype,"background",2);i([d()],e.prototype,"indent",2);i([d()],e.prototype,"size",2);i([d()],e.prototype,"heading",2);i([d()],e.prototype,"headingTag",2);e=i([N({selector:"p-accordion",standalone:!0,imports:[E],encapsulation:D.None,template:`
    <div class="p-accordion" data-pds="accordion" [style]="hostStyle" [attr.background]="hostAttr(background) ?? null">
    <details>
      <summary>
        <span data-pds-slot="summary"><ng-content select="[slot=summary]"></ng-content></span>
        <h2>{{headingText}} <span data-pds-slot="heading"><ng-content select="[slot=heading]"></ng-content></span></h2>
      </summary>
      <span data-pds-slot="summary-before"><ng-content select="[slot=summary-before]"></ng-content></span>
      <span data-pds-slot="summary-after"><ng-content select="[slot=summary-after]"></ng-content></span>
      <div><span data-pds-slot=""><ng-content></ng-content></span></div>
    </details>
  
    </div>
  `,styles:[`.p-accordion :where([data-pds-slot]){display:contents}

      .p-accordion {
        display: contents;
      }
      @keyframes overflow-hidden {
        from {
          overflow: hidden;
        }
        to {
          overflow: hidden;
        }
      }
      .p-accordion {
        display: block;
      }
      .p-accordion[hidden] {
        display: none !important;
      }
      .p-accordion [data-pds-slot="summary-before"],
      .p-accordion [data-pds-slot="summary"],
      .p-accordion [data-pds-slot="summary-after"]{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--p-acc-gap);
      }
      .p-accordion [data-pds-slot="summary-before"]{
        grid-area: 1 / var(--p-acc-before-col);
        z-index: 2;
      }
      .p-accordion [data-pds-slot="summary"]{
        grid-area: 1 / var(--p-acc-summary-col);
      }
      .p-accordion [data-pds-slot="summary-after"]{
        grid-area: 1 / var(--p-acc-after-col);
        z-index: 2;
      }
      .p-accordion [data-pds-slot]:not([name]){
        display: block;
        overflow: hidden;
        transform: translate3d(0, 0, 0);
      }
      .p-accordion details[open] [data-pds-slot]:not([name]){
        overflow: visible;
        animation: overflow-hidden var(--p-acc-dur);
      }
      .p-accordion h1,
      .p-accordion h2,
      .p-accordion h3,
      .p-accordion h4,
      .p-accordion h5,
      .p-accordion h6{
        all: unset;
        grid-area: 1 / var(--p-acc-summary-col);
        font: inherit;
        font-weight: var(--p-font-weight-semibold);
        font-size: var(--p-acc-fs);
      }
      .p-accordion details{
        all: unset;
        font: var(--p-typescale-sm) / var(--p-leading-normal)
          var(--p-font-porsche-next);
        color: var(--p-color-primary);
        display: grid;
        grid-template: repeat(2, auto) / var(--p-acc-cols);
        column-gap: var(--p-acc-gap);
        align-items: center;
        padding: var(--p-accordion-py, var(--p-acc-py))
          var(--p-accordion-px, var(--p-acc-px));
        background: var(--p-acc-bg);
        border-radius: var(--p-acc-radius);
      }
      .p-accordion[background="frosted"] details {
        -webkit-backdrop-filter: var(--p-blur-frosted);
        backdrop-filter: var(--p-blur-frosted);
      }
      .p-accordion details::details-content{
        display: contents !important;
        content-visibility: visible !important;
      }
      .p-accordion details > div{
        grid-area: 2/1 / auto/-1;
        grid-column-start: var(--p-acc-indent);
        z-index: 0;
        display: grid;
        opacity: 0;
        margin-top: 0px;
        grid-template-rows: 0fr;
        visibility: hidden;
        transition: visibility 0s linear var(--p-acc-dur),
          grid-template-rows var(--p-acc-dur) var(--p-acc-ease),
          padding-top var(--p-acc-dur) var(--p-acc-ease),
          opacity var(--p-acc-dur) var(--p-acc-ease);
      }
      .p-accordion details[open] > div{
        opacity: 1;
        padding-top: var(--p-acc-pad-top);
        z-index: 2;
        padding-inline: var(--p-accordion-px, var(--p-acc-px));
        margin-inline: calc(-1 * var(--p-accordion-px, var(--p-acc-px)));
        grid-template-rows: 1fr;
        visibility: inherit;
        transition: visibility 0s linear 0s,
          grid-template-rows var(--p-acc-dur) var(--p-acc-ease),
          margin-top var(--p-acc-dur) var(--p-acc-ease),
          opacity var(--p-acc-dur) var(--p-acc-ease);
      }
      .p-accordion summary{
        all: unset;
        grid-area: 1/1 / auto/-1;
        z-index: 1;
        display: grid;
        grid-template-columns: subgrid;
        align-items: center;
        cursor: pointer;
        padding: var(--p-accordion-py, var(--p-acc-py))
          var(--p-accordion-px, var(--p-acc-px));
        margin: calc(-1 * var(--p-accordion-py, var(--p-acc-py)))
          calc(-1 * var(--p-accordion-px, var(--p-acc-px)));
      }
      .p-accordion[sticky][background="canvas"] summary,
      .p-accordion[sticky][background="surface"] summary {
        position: sticky;
        top: var(
          --p-accordion-summary-top,
          var(--p-accordion-position-sticky-top, 0px)
        );
        background: linear-gradient(
          180deg,
          var(--p-acc-bg) 0%,
          var(--p-acc-bg) 90%,
          transparent 100%
        );
        border-radius: var(--p-acc-radius);
      }
      .p-accordion summary:focus-visible::before{
        outline: 2px solid var(--p-color-focus);
        outline-offset: 2px;
      }
      .p-accordion summary::before{
        grid-area: 1 / var(--p-acc-icon-col);
        place-self: center;
        content: "";
        width: 1.5rem;
        height: 1.5rem;
        pointer-events: none;
        border-radius: var(--p-radius-full);
        background: transparent;
        transition: background-color
          var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-in-out);
      }
      .p-accordion summary::after{
        grid-area: 1 / var(--p-acc-icon-col);
        place-self: center;
        content: "";
        width: 1rem;
        height: 1rem;
        pointer-events: none;
        -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 15.125h-.001l-.005-.006-6.494-5.476.642-.768 5.858 4.94 5.858-4.94.642.769-6.497 5.477z"/></svg>')
          center/contain no-repeat;
        mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 15.125h-.001l-.005-.006-6.494-5.476.642-.768 5.858 4.94 5.858-4.94.642.769-6.497 5.477z"/></svg>')
          center/contain no-repeat;
        background: var(--p-color-primary);
        transform: rotate3d(0);
        transition: transform var(--p-acc-dur) var(--p-acc-ease);
      }
      .p-accordion details[open] summary::after{
        transform: rotate3d(0, 0, 1, 180deg);
      }
      @media (forced-colors: active) {
        .p-accordion details{
          outline: 1px solid CanvasText;
          outline-offset: var(--p-acc-fc-off);
          padding: var(--p-accordion-py, var(--p-acc-py-fc))
            var(--p-accordion-px, var(--p-acc-px-fc));
        }
        .p-accordion summary::after{
          background-color: LinkText;
        }
        .p-accordion summary:focus-visible::before{
          outline-color: Highlight;
        }
      }
      @media (hover: hover) {
        .p-accordion summary:hover::before{
          background: var(--p-color-frosted);
        }
      }
      .p-accordion:not([data-before]) [data-pds-slot="summary-before"] {
        display: none;
      }
      .p-accordion:not([data-after]) [data-pds-slot="summary-after"] {
        display: none;
      }
      .p-accordion[data-summary] summary > h1,
      .p-accordion[data-summary] summary > h2,
      .p-accordion[data-summary] summary > h3,
      .p-accordion[data-summary] summary > h4,
      .p-accordion[data-summary] summary > h5,
      .p-accordion[data-summary] summary > h6 {
        display: none;
      }
      .p-accordion:not([data-summary]) [data-pds-slot="summary"] {
        display: none;
      }
      @media (min-width: 480px) {
        .p-accordion details > div{
          grid-column-start: var(--p-acc-indent-xs, var(--p-acc-indent));
        }
      }
      @media (min-width: 760px) {
        .p-accordion details > div{
          grid-column-start: var(
            --p-acc-indent-s,
            var(--p-acc-indent-xs, var(--p-acc-indent))
          );
        }
      }
      @media (min-width: 1000px) {
        .p-accordion details > div{
          grid-column-start: var(
            --p-acc-indent-m,
            var(--p-acc-indent-s, var(--p-acc-indent))
          );
        }
      }
      @media (min-width: 1300px) {
        .p-accordion details > div{
          grid-column-start: var(
            --p-acc-indent-l,
            var(--p-acc-indent-m, var(--p-acc-indent))
          );
        }
      }
      @media (min-width: 1760px) {
        .p-accordion details > div{
          grid-column-start: var(
            --p-acc-indent-xl,
            var(--p-acc-indent-l, var(--p-acc-indent))
          );
        }
      }
      @media (min-width: 1920px) {
        .p-accordion details > div{
          grid-column-start: var(
            --p-acc-indent-xxl,
            var(--p-acc-indent-xl, var(--p-acc-indent))
          );
        }
      }`]})],e);export{e as default};
