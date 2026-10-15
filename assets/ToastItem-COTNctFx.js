import{S as k,i as y,s as T,r as h,d as z,f as B,p as i,k as C,l as v,m as f,H as _,n as w,o as F,a as x,q as b}from"./svelte-DoO7z26N.js";import{s as H}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function M(a){let t,o,g=`<style>${U}</style>`,l,e,c,p=a[1]()+"",m,d,r,n;return{c(){t=f("div"),o=new _(!1),l=w(),e=f("div"),c=f("p"),m=F(p),d=w(),r=f("button"),r.innerHTML="<span>Close notification message</span>",o.a=l,i(r,"class","dismiss"),i(r,"type","button"),i(e,"class","notification"),i(t,"class",n="p-toast-item"+(a[2].class?` ${a[2].class}`:"")),i(t,"data-pds","toast-item"),i(t,"style",a[0])},m(s,u){C(s,t,u),o.m(g,t),v(t,l),v(t,e),v(e,c),v(c,m),v(e,d),v(e,r)},p(s,[u]){u&2&&p!==(p=s[1]()+"")&&B(m,p),u&4&&n!==(n="p-toast-item"+(s[2].class?` ${s[2].class}`:""))&&i(t,"class",n),u&1&&i(t,"style",s[0])},i:h,o:h,d(s){s&&z(t)}}}const U=`.p-toast-item :where([data-pds-slot]){display:contents}

  .p-toast-item {
    display: block;
    max-width: inherit !important;
    box-sizing: border-box !important;
    margin: 0 !important;
    padding: 0 !important;
    inset: inherit !important;
    border: 0 !important;
    outline: 0 !important;
    overflow: visible !important;
    width: auto !important;
    height: auto !important;
    background: transparent !important;
  }
  .p-toast-item::backdrop {
    display: none;
  }
  .p-toast-item [data-pds-slot]:not([name]),
  .p-toast-item [data-pds-slot="description"],
  .p-toast-item p{
    all: unset;
    grid-area: 1 / 2;
    margin-top: 0px;
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-primary);
  }
  .p-toast-item .notification{
    box-shadow: var(--p-shadow-lg);
    display: grid;
    grid-template: repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto);
    padding: calc(var(--p-spacing-static-sm) + var(--p-spacing-fluid-sm));
    border-radius: var(--p-radius-2xl);
    background: var(--p-toast-item-bg);
    -webkit-backdrop-filter: var(--p-blur-frosted);
    backdrop-filter: var(--p-blur-frosted);
  }
  .p-toast-item .dismiss{
    all: unset;
    box-sizing: border-box;
    display: grid;
    place-items: center;
    padding: 6px;
    border-radius: var(--p-radius-full);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    background-color: var(--p-color-frosted-strong);
    color: var(--p-color-primary);
    cursor: pointer;
    -webkit-backdrop-filter: var(--p-blur-frosted);
    backdrop-filter: var(--p-blur-frosted);
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    grid-area: 1 / 4 / -1;
    align-self: flex-start;
    margin-block: calc(-6 * var(--p-spacing-static-2xs));
    margin-inline: var(--p-spacing-static-md)
      calc(-6 * var(--p-spacing-static-2xs));
  }
  .p-toast-item .dismiss:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-toast-item .dismiss::before{
    content: "";
    width: var(--p-leading-normal);
    height: var(--p-leading-normal);
    -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    background: currentColor;
  }
  .p-toast-item .dismiss span{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  @media (min-width: 760px) {
    .p-toast-item .notification::before{
      grid-area: 1 / 1;
      place-self: flex-start;
      content: "";
      width: 1.5rem;
      height: 1.5rem;
      margin-inline-end: var(--p-spacing-static-sm);
      background: var(--p-toast-item-color);
      -webkit-mask: var(--p-toast-item-icon);
      mask: var(--p-toast-item-icon);
    }
    @media (forced-colors: active) {
      .p-toast-item .notification::before{
        background: CanvasText;
      }
    }
  }
  @media (forced-colors: active) {
    .p-toast-item .notification{
      outline: 2px solid CanvasText;
      outline-offset: -2px;
    }
    .p-toast-item .dismiss{
      forced-color-adjust: none;
      background: Canvas;
      box-shadow: inset 0 0 0 2px ButtonBorder;
      color: ButtonText;
    }
    .p-toast-item .dismiss:focus-visible{
      outline-color: Highlight;
    }
  }
  @media (hover: hover) {
    .p-toast-item .dismiss:hover{
      background-color: var(--p-color-frosted);
    }
    @media (forced-colors: active) {
      .p-toast-item .dismiss:hover{
        background: Canvas;
      }
    }
  }`;function S(a,t,o){let g,l,e;const c={info:"var(--p-color-info-frosted)",success:"var(--p-color-success-frosted)",warning:"var(--p-color-warning-frosted)",error:"var(--p-color-error-frosted)"},p={info:"var(--p-color-info)",success:"var(--p-color-success)",warning:"var(--p-color-warning)",error:"var(--p-color-error)"},m={info:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9m-.75 4.5h1.5V9h-1.5zm1.5 8.5h-1.5v-6h1.5z"/></svg>') center/contain no-repeat`,success:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.26 12.69-3.8-3.8 1.07-1.05 2.73 2.73 5.25-5.26 1.06 1.06z"/></svg>') center/contain no-repeat`,warning:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.58 18.26 13.3 3.75A1.5 1.5 0 0 0 12 3a1.5 1.5 0 0 0-1.3.75l-8.28 14.5a1.5 1.5 0 0 0 0 1.5c.28.47.76.75 1.3.75h16.56a1.5 1.5 0 0 0 1.3-2.25M13 17.5h-2v-2h2zm-.4-3.5h-1.2L11 8.5h2z"/></svg>') center/contain no-repeat`,error:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4l2 2 2-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 3.5-.4 5.5h-1.2L11 6.5zm-2 7h2v2h-2z"/></svg>') center/contain no-repeat`};let{state:d}=t,{text:r}=t;return a.$$set=n=>{o(2,t=x(x({},t),b(n))),"state"in n&&o(3,d=n.state),"text"in n&&o(4,r=n.text)},a.$$.update=()=>{a.$$.dirty&8&&o(5,g=()=>{const n=d||"info";return{"--p-toast-item-bg":c[n]||c.info,"--p-toast-item-color":p[n]||p.info,"--p-toast-item-icon":m[n]||m.info}}),a.$$.dirty&16&&o(1,l=()=>r||""),a.$$.dirty&32&&o(0,e=H(g()))},t=b(t),[e,l,t,d,r,g]}class j extends k{constructor(t){super(),y(this,t,S,M,T,{state:3,text:4})}}export{j as default};
