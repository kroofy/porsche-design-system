import{S as D,i as E,s as J,c as A,d as K,v as Q,t as M,b as F,f as U,u as N,g as O,e as P,p as g,k as R,l as f,w as W,m as k,H as X,n as I,o as q,x as Y,a as V,q as j}from"./svelte-DoO7z26N.js";import{s as Z}from"./host-DRskmCSE.js";import $ from"./ButtonPure-Dc5XN6Cq.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./Spinner-CHLfbpXm.js";import"./Icon-MNhZuw6T.js";import"./index-ChNsHkGO.js";const nn=i=>({}),G=i=>({});function tn(i){let t=i[2]()+"",a;return{c(){a=q(t)},m(d,p){R(d,a,p)},p(d,p){p&4&&t!==(t=d[2]()+"")&&U(a,t)},d(d){d&&K(a)}}}function an(i){let t,a,d=`<style>${on}</style>`,p,r,y,b=i[4]()+"",T,L,S,w=i[3]()+"",B,z,x,m,c,u,v,o;const h=i[16].heading,e=A(h,i,i[17],G),_=i[16].default,l=A(_,i,i[17],null);return c=new $({props:{class:"action",icon:i[1](),$$slots:{default:[tn]},$$scope:{ctx:i}}}),{c(){t=k("div"),a=new X(!1),p=I(),r=k("div"),y=k("h5"),T=q(b),L=I(),S=k("p"),B=q(w),z=I(),x=k("span"),e&&e.c(),m=k("span"),l&&l.c(),Y(c.$$.fragment),u=k("button"),u.innerHTML="<span>Close notification</span>",a.a=p,g(x,"data-pds-slot","heading"),g(m,"data-pds-slot",""),g(u,"class","dismiss"),g(u,"type","button"),g(r,"class","notification"),g(t,"class",v="p-inline-notification"+(i[5].class?` ${i[5].class}`:"")),g(t,"data-pds","inline-notification"),g(t,"style",i[0])},m(n,s){R(n,t,s),a.m(d,t),f(t,p),f(t,r),f(r,y),f(y,T),f(r,L),f(r,S),f(S,B),f(r,z),f(r,x),e&&e.m(x,null),f(r,m),l&&l.m(m,null),W(c,r,null),f(r,u),o=!0},p(n,[s]){(!o||s&16)&&b!==(b=n[4]()+"")&&U(T,b),(!o||s&8)&&w!==(w=n[3]()+"")&&U(B,w),e&&e.p&&(!o||s&131072)&&N(e,h,n,n[17],o?P(h,n[17],s,nn):O(n[17]),G),l&&l.p&&(!o||s&131072)&&N(l,_,n,n[17],o?P(_,n[17],s,null):O(n[17]),null);const C={};s&2&&(C.icon=n[1]()),s&131076&&(C.$$scope={dirty:s,ctx:n}),c.$set(C),(!o||s&32&&v!==(v="p-inline-notification"+(n[5].class?` ${n[5].class}`:"")))&&g(t,"class",v),(!o||s&1)&&g(t,"style",n[0])},i(n){o||(F(e,n),F(l,n),F(c.$$.fragment,n),o=!0)},o(n){M(e,n),M(l,n),M(c.$$.fragment,n),o=!1},d(n){n&&K(t),e&&e.d(n),l&&l.d(n),Q(c)}}}const on=`.p-inline-notification :where([data-pds-slot]){display:contents}

  .p-inline-notification {
    display: block;
  }
  .p-inline-notification[hidden] {
    display: none !important;
  }
  .p-inline-notification [data-pds-slot="heading"],
  .p-inline-notification h1,
  .p-inline-notification h2,
  .p-inline-notification h3,
  .p-inline-notification h4,
  .p-inline-notification h5,
  .p-inline-notification h6{
    all: unset;
    grid-area: 1 / 2;
    font: var(--p-font-weight-semibold) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-primary);
  }
  .p-inline-notification [data-pds-slot]:not([name]),
  .p-inline-notification [data-pds-slot="description"],
  .p-inline-notification p{
    all: unset;
    grid-area: var(--p-in-desc-grid, 1 / 2);
    margin-top: var(--p-in-desc-mt, 0px);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-primary);
  }
  .p-inline-notification .notification{
    display: grid;
    grid-template: repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto);
    padding: calc(var(--p-spacing-static-sm) + var(--p-spacing-fluid-sm));
    border-radius: var(--p-radius-2xl);
    background: var(--p-in-bg);
    -webkit-backdrop-filter: var(--p-blur-frosted);
    backdrop-filter: var(--p-blur-frosted);
  }
  .p-inline-notification .dismiss{
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
  .p-inline-notification .dismiss:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-inline-notification .dismiss::before{
    content: "";
    width: var(--p-leading-normal);
    height: var(--p-leading-normal);
    -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    background: currentColor;
  }
  .p-inline-notification .dismiss span{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  .p-inline-notification .action{
    grid-area: 3 / 1 / auto / -1;
    margin-top: var(--p-spacing-static-md);
    align-self: flex-start;
  }
  @media (min-width: 760px) {
    .p-inline-notification .notification::before{
      grid-area: 1 / 1;
      place-self: var(--p-in-place, flex-start);
      content: "";
      width: 1.5rem;
      height: 1.5rem;
      margin-inline-end: var(--p-spacing-static-sm);
      background: var(--p-in-icon);
      -webkit-mask: var(--p-in-mask);
      mask: var(--p-in-mask);
    }
    .p-inline-notification .action{
      grid-area: 1 / 3;
      margin-top: 0px;
      margin-inline-start: var(--p-spacing-static-md);
    }
  }
  @media (forced-colors: active) {
    .p-inline-notification .notification{
      outline: 2px solid CanvasText;
      outline-offset: -2px;
    }
    .p-inline-notification .dismiss{
      forced-color-adjust: none;
      background: Canvas;
      box-shadow: inset 0 0 0 2px ButtonBorder;
      color: ButtonText;
    }
    .p-inline-notification .dismiss:focus-visible{
      outline-color: Highlight;
    }
  }
  @media (min-width: 760px) and (forced-colors: active) {
    .p-inline-notification .notification::before{
      background: CanvasText;
    }
  }
  @media (hover: hover) {
    .p-inline-notification .dismiss:hover{
      background-color: var(--p-color-frosted);
    }
  }
  @media (hover: hover) and (forced-colors: active) {
    .p-inline-notification .dismiss:hover{
      background: Canvas;
    }
  }`;function en(i,t,a){let d,p,r,y,b,T,L,{$$slots:S={},$$scope:w}=t;const B={info:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9m-.75 4.5h1.5V9h-1.5zm1.5 8.5h-1.5v-6h1.5z"/></svg>') center/contain no-repeat`,success:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.26 12.69-3.8-3.8 1.07-1.05 2.73 2.73 5.25-5.26 1.06 1.06z"/></svg>') center/contain no-repeat`,warning:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.58 18.26 13.3 3.75A1.5 1.5 0 0 0 12 3a1.5 1.5 0 0 0-1.3.75l-8.28 14.5a1.5 1.5 0 0 0 0 1.5c.28.47.76.75 1.3.75h16.56a1.5 1.5 0 0 0 1.3-2.25M13 17.5h-2v-2h2zm-.4-3.5h-1.2L11 8.5h2z"/></svg>') center/contain no-repeat`,error:`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4l2 2 2-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 3.5-.4 5.5h-1.2L11 6.5zm-2 7h2v2h-2z"/></svg>') center/contain no-repeat`},z={info:"var(--p-color-info-frosted)",success:"var(--p-color-success-frosted)",warning:"var(--p-color-warning-frosted)",error:"var(--p-color-error-frosted)"},x={info:"var(--p-color-info)",success:"var(--p-color-success)",warning:"var(--p-color-warning)",error:"var(--p-color-error)"};let{state:m}=t,{heading:c}=t,{headingTag:u}=t,{description:v}=t,{actionLabel:o}=t,{actionIcon:h}=t,{actionLoading:e}=t,{dismissButton:_}=t;function l(){return{state:m,heading:c,headingTag:u,description:v,actionLabel:o,actionIcon:h,actionLoading:e,dismissButton:_}}return i.$$set=n=>{a(5,t=V(V({},t),j(n))),"state"in n&&a(6,m=n.state),"heading"in n&&a(7,c=n.heading),"headingTag"in n&&a(8,u=n.headingTag),"description"in n&&a(9,v=n.description),"actionLabel"in n&&a(10,o=n.actionLabel),"actionIcon"in n&&a(11,h=n.actionIcon),"actionLoading"in n&&a(12,e=n.actionLoading),"dismissButton"in n&&a(13,_=n.dismissButton),"$$scope"in n&&a(17,w=n.$$scope)},i.$$.update=()=>{i.$$.dirty&32832&&a(14,d=()=>{const n=m||"info",s=l().heading||"",C=p(),H=!!(s||C);return{"--p-in-bg":z[n]||z.info,"--p-in-icon":x[n]||x.info,"--p-in-mask":B[n]||B.info,"--p-in-place":H?"center":"flex-start","--p-in-desc-grid":H?"2/2":"1/2","--p-in-desc-mt":H?"var(--p-spacing-static-xs)":"0px"}}),i.$$.dirty&128&&a(4,r=()=>c||""),i.$$.dirty&256,i.$$.dirty&512&&a(3,y=()=>v||""),i.$$.dirty&1024&&a(2,b=()=>o||""),i.$$.dirty&2048&&a(1,T=()=>h||"arrow-right"),i.$$.dirty&4096,i.$$.dirty&8192,i.$$.dirty&1024,i.$$.dirty&128,i.$$.dirty&64,i.$$.dirty&64,i.$$.dirty&16384&&a(0,L=Z(d()))},a(15,p=()=>!1),t=j(t),[L,T,b,y,r,t,m,c,u,v,o,h,e,_,d,p,S,w]}class un extends D{constructor(t){super(),E(this,t,en,an,J,{state:6,heading:7,headingTag:8,description:9,actionLabel:10,actionIcon:11,actionLoading:12,dismissButton:13})}}export{un as default};
