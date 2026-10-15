import{S as T,i as S,s as H,c as w,a as k,d as C,t as P,b as A,u as G,g as j,e as q,h as _,j as z,k as K,l as v,m as g,H as M,n as B,p as f,q as y}from"./svelte-DoO7z26N.js";import{s as E,h as F}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function O(e){let o,l,b=`<style>${Z}</style>`,m,s,h,p,c,i;const d=e[9].default,a=w(d,e,e[8],null);let u=[{class:c="p-multi-select-option"+(e[2].class?` ${e[2].class}`:"")},{"data-pds":"multi-select-option"},{style:e[1]},e[0]],n={};for(let t=0;t<u.length;t+=1)n=k(n,u[t]);return{c(){o=g("div"),l=new M(!1),m=B(),s=g("div"),h=g("span"),p=g("span"),a&&a.c(),l.a=m,f(h,"class","checkbox"),f(p,"data-pds-slot",""),f(s,"class","option"),_(o,n)},m(t,r){K(t,o,r),l.m(b,o),v(o,m),v(o,s),v(s,h),v(s,p),a&&a.m(p,null),i=!0},p(t,[r]){a&&a.p&&(!i||r&256)&&G(a,d,t,t[8],i?q(d,t[8],r,null):j(t[8]),null),_(o,n=z(u,[(!i||r&4&&c!==(c="p-multi-select-option"+(t[2].class?` ${t[2].class}`:"")))&&{class:c},{"data-pds":"multi-select-option"},(!i||r&2)&&{style:t[1]},r&1&&t[0]]))},i(t){i||(A(a,t),i=!0)},o(t){P(a,t),i=!1},d(t){t&&C(o),a&&a.d(t)}}}const U=`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/></svg>') center/contain no-repeat`,Z=`.p-multi-select-option :where([data-pds-slot]){display:contents}

  .p-multi-select-option {
    display: block;
    opacity: var(--p-mso-opacity) !important;
    scroll-margin-block-start: calc(
      max(2px, var(--_p-multi-select-option-a, 1) * 6px) + 36px
    ) !important;
    scroll-margin-block-end: max(
      2px,
      var(--_p-multi-select-option-a, 1) * 6px
    ) !important;
    --_p-checkbox-scaling: var(--_p-multi-select-option-a) !important;
  }
  .p-multi-select-option[hidden] {
    display: none !important;
  }
  .p-multi-select-option [data-pds-slot]{
    display: block;
    padding-top: max(
      0px,
      calc(
        (calc(var(--_p-checkbox-scaling) * 1.75rem) - var(--p-leading-normal)) /
          2
      )
    );
  }
  .p-multi-select-option .option{
    display: flex;
    gap: calc(11.2px * (var(--_p-multi-select-option-a) - 0.64285714) + 4px);
    padding-block: calc(
      11.2px * (var(--_p-multi-select-option-a) - 0.64285714) + 4px
    );
    padding-inline: var(
        --_p-multi-select-option-b,
        calc(16.8px * (var(--_p-multi-select-option-a) - 0.64285714) + 6px)
      )
      calc(16.8px * (var(--_p-multi-select-option-a) - 0.64285714) + 6px);
    min-height: var(--p-leading-normal);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-contrast-high);
    cursor: pointer;
    text-align: start;
    word-break: break-word;
    box-sizing: content-box;
    border-radius: var(--p-radius-sm);
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-multi-select-option .option--highlighted{
    background: var(--p-color-frosted);
  }
  .p-multi-select-option .option--highlighted,
  .p-multi-select-option .option--selected{
    color: var(--p-color-primary);
  }
  .p-multi-select-option .option--disabled{
    cursor: not-allowed;
  }
  .p-multi-select-option .option--hidden{
    display: none;
  }
  .p-multi-select-option .checkbox{
    all: unset;
    display: grid;
    width: calc(var(--_p-checkbox-scaling) * 1.75rem);
    height: calc(var(--_p-checkbox-scaling) * 1.75rem);
    margin-block: max(
      0px,
      calc(
        (var(--p-leading-normal) - calc(var(--_p-checkbox-scaling) * 1.75rem)) /
          2
      )
    );
    box-sizing: border-box;
    font: var(--p-typescale-sm) var(--p-font-porsche-next);
    background: var(
      --p-mso-cb-bg,
      var(--p-checkbox-background-color, var(--p-color-frosted))
    );
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      border-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    border: 1px solid
      var(--p-checkbox-border-color, var(--p-color-contrast-lower));
    border-radius: var(--p-radius-md);
    pointer-events: var(--p-mso-pe);
    flex-shrink: 0;
  }
  .p-multi-select-option .checkbox::before{
    content: "";
    grid-area: 1 / 1;
    -webkit-mask: var(--p-mso-mask);
    mask: var(--p-mso-mask);
    background-color: var(--p-mso-mask-bg);
  }
  .p-multi-select-option .checkbox::after{
    content: "";
    margin: calc(
      -1px - max(0px, calc(24px - calc(var(--_p-checkbox-scaling) * 1.75rem)) /
            2)
    );
    grid-area: 1 / 1;
  }
  @media (forced-colors: active) {
    .p-multi-select-option {
      opacity: var(--p-mso-fc-opacity) !important;
      color: var(--p-mso-fc-color) !important;
    }
    .p-multi-select-option .option--disabled{
      color: GrayText;
    }
    .p-multi-select-option .option--highlighted{
      forced-color-adjust: none;
      outline: 2px solid Highlight;
      outline-offset: -2px;
    }
    .p-multi-select-option .checkbox{
      border-color: var(--p-mso-cb-fc-border);
    }
    .p-multi-select-option .checkbox::before{
      background: var(--p-mso-fc-check);
    }
  }
  @media (hover: hover) {
    .p-multi-select-option .checkbox:hover{
      border-color: var(--p-mso-hover-border);
      background-color: var(--p-mso-hover-bg);
    }
  }`;function D(e,o,l){let b,m,s,{$$slots:h={},$$scope:p}=o,{disabled:c}=o,{disabledParent:i}=o,{selected:d}=o,{highlighted:a}=o;function u(){return{disabled:c,disabledParent:i,selected:d,highlighted:a}}return e.$$set=n=>{l(2,o=k(k({},o),y(n))),"disabled"in n&&l(3,c=n.disabled),"disabledParent"in n&&l(4,i=n.disabledParent),"selected"in n&&l(5,d=n.selected),"highlighted"in n&&l(6,a=n.highlighted),"$$scope"in n&&l(8,p=n.$$scope)},e.$$.update=()=>{e.$$.dirty&16&&l(7,b=()=>{const n=x=>x===!0||x==="true"||x==="",t=n(u().disabled)||n(i),r=n(u().selected);return{"--p-mso-opacity":t?"0.4":"","--p-mso-fc-opacity":t?"1":"","--p-mso-fc-color":t?"GrayText":"","--p-mso-pe":t?"none":"","--p-mso-cb-fc-border":t?"GrayText":"","--p-mso-mask":r?U:"","--p-mso-mask-bg":r?"var(--p-checkbox-icon-color, var(--p-color-canvas))":"","--p-mso-cb-bg":r?"var(--p-color-primary)":"","--p-mso-fc-check":r?"CanvasText":"","--p-mso-hover-border":r?"transparent":"var(--p-checkbox-border-color, var(--p-color-primary))","--p-mso-hover-bg":r?"var(--p-checkbox-border-color, var(--p-color-contrast-high))":""}}),e.$$.dirty&24,e.$$.dirty&32,e.$$.dirty&64,e.$$.dirty&16,e.$$.dirty&128&&l(1,m=E(b())),l(0,s=F({hidden:o.hidden}))},o=y(o),[s,m,o,c,i,d,a,b,p,h]}class R extends T{constructor(o){super(),S(this,o,D,O,H,{disabled:3,disabledParent:4,selected:5,highlighted:6})}}export{R as default};
