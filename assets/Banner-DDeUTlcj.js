import{S as j,i as D,s as G,c as H,a as C,d as Q,t as O,b as L,f as P,u as N,g as V,e as E,h as I,j as W,k as X,l as c,m as h,H as Y,n as A,o as q,p as z,q as J}from"./svelte-DoO7z26N.js";import{s as Z,h as $}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const nn=t=>({}),K=t=>({}),an=t=>({}),R=t=>({});function tn(t){let e,i,M=`<style>${pn}</style>`,k,f,d,y,T=t[3]()+"",B,S,F,x=t[2]()+"",w,_,g,b,m,u,o;const U=t[14].heading,n=H(U,t,t[13],R),s=t[14].description,r=H(s,t,t[13],K);let p=[{class:u="p-banner"+(t[4].class?` ${t[4].class}`:"")},{"data-pds":"banner"},{style:t[1]},t[0]],l={};for(let a=0;a<p.length;a+=1)l=C(l,p[a]);return{c(){e=h("div"),i=new Y(!1),k=A(),f=h("div"),d=h("div"),y=h("h5"),B=q(T),S=A(),F=h("p"),w=q(x),_=A(),g=h("span"),n&&n.c(),b=h("span"),r&&r.c(),m=h("button"),m.innerHTML="<span>Close banner</span>",i.a=k,z(g,"data-pds-slot","heading"),z(b,"data-pds-slot","description"),z(m,"class","dismiss"),z(m,"type","button"),z(d,"class","notification"),z(f,"popover","manual"),I(e,l)},m(a,v){X(a,e,v),i.m(M,e),c(e,k),c(e,f),c(f,d),c(d,y),c(y,B),c(d,S),c(d,F),c(F,w),c(d,_),c(d,g),n&&n.m(g,null),c(d,b),r&&r.m(b,null),c(d,m),o=!0},p(a,[v]){(!o||v&8)&&T!==(T=a[3]()+"")&&P(B,T),(!o||v&4)&&x!==(x=a[2]()+"")&&P(w,x),n&&n.p&&(!o||v&8192)&&N(n,U,a,a[13],o?E(U,a[13],v,an):V(a[13]),R),r&&r.p&&(!o||v&8192)&&N(r,s,a,a[13],o?E(s,a[13],v,nn):V(a[13]),K),I(e,l=W(p,[(!o||v&16&&u!==(u="p-banner"+(a[4].class?` ${a[4].class}`:"")))&&{class:u},{"data-pds":"banner"},(!o||v&2)&&{style:a[1]},v&1&&a[0]]))},i(a){o||(L(n,a),L(r,a),o=!0)},o(a){O(n,a),O(r,a),o=!1},d(a){a&&Q(e),n&&n.d(a),r&&r.d(a)}}}const en="translate3d(-50%, calc(-100% - var(--p-banner-top, var(--p-banner-position-top, 56px))), 0)",rn="var(--p-banner-top, var(--p-banner-position-top, 56px)) auto",on="translate3d(-50%, calc(var(--p-banner-bottom, var(--p-banner-position-bottom, 56px)) + 100%), 0)",sn="auto var(--p-banner-bottom, var(--p-banner-position-bottom, 56px))",pn=`.p-banner :where([data-pds-slot]){display:contents}

  .p-banner {
    display: contents;
  }
  .p-banner[hidden] {
    display: none !important;
  }
  .p-banner [popover]{
    all: unset;
    position: fixed;
    --_p-banner-a: var(--p-ban-a);
    inset-block: var(--p-ban-inset);
    left: 50vw;
    width: min(
      calc(100vw - 2 * var(--p-banner-inset-x, max(22px, 10.625vw - 12px))),
      var(--p-banner-max-w, 100ch)
    );
    transform: var(--_p-banner-a);
    transition: transform var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-out);
    overlay: none;
    display: none;
  }
  .p-banner[open] [popover] {
    transform: translate3d(-50%, 0, 0);
    transition: transform var(--p-transition-duration, var(--p-duration-md))
      var(--p-ease-in);
  }
  .p-banner [popover]:popover-open{
    overlay: auto;
    display: grid;
  }
  .p-banner [popover]::backdrop{
    display: none;
  }
  @media (min-width: 480px) {
    .p-banner [popover]{
      --_p-banner-a: var(--p-ban-a-xs, var(--p-ban-a));
      inset-block: var(--p-ban-inset-xs, var(--p-ban-inset));
    }
  }
  @media (min-width: 760px) {
    .p-banner [popover]{
      --_p-banner-a: var(--p-ban-a-s, var(--p-ban-a-xs, var(--p-ban-a)));
      inset-block: var(
        --p-ban-inset-s,
        var(--p-ban-inset-xs, var(--p-ban-inset))
      );
    }
  }
  @media (min-width: 1000px) {
    .p-banner [popover]{
      --_p-banner-a: var(--p-ban-a-m, var(--p-ban-a-s, var(--p-ban-a)));
      inset-block: var(
        --p-ban-inset-m,
        var(--p-ban-inset-s, var(--p-ban-inset))
      );
    }
  }
  @media (min-width: 1300px) {
    .p-banner [popover]{
      --_p-banner-a: var(--p-ban-a-l, var(--p-ban-a-m, var(--p-ban-a)));
      inset-block: var(
        --p-ban-inset-l,
        var(--p-ban-inset-m, var(--p-ban-inset))
      );
    }
  }
  @media (min-width: 1760px) {
    .p-banner [popover]{
      --_p-banner-a: var(--p-ban-a-xl, var(--p-ban-a-l, var(--p-ban-a)));
      inset-block: var(
        --p-ban-inset-xl,
        var(--p-ban-inset-l, var(--p-ban-inset))
      );
    }
  }
  @media (min-width: 1920px) {
    .p-banner [popover]{
      --_p-banner-a: var(--p-ban-a-xxl, var(--p-ban-a-xl, var(--p-ban-a)));
      inset-block: var(
        --p-ban-inset-xxl,
        var(--p-ban-inset-xl, var(--p-ban-inset))
      );
    }
  }
  @supports (overlay: auto) and (transition-behavior: allow-discrete) {
    .p-banner [popover]{
      transition: transform var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-out),
        overlay var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-out) allow-discrete,
        display var(--p-transition-duration, var(--p-duration-sm))
          var(--p-ease-out) allow-discrete;
    }
    .p-banner[open] [popover] {
      transition: transform var(--p-transition-duration, var(--p-duration-md))
          var(--p-ease-in),
        overlay var(--p-transition-duration, var(--p-duration-md))
          var(--p-ease-in) allow-discrete,
        display var(--p-transition-duration, var(--p-duration-md))
          var(--p-ease-in) allow-discrete;
    }
  }
  @starting-style {
    .p-banner [popover]{
      transform: var(--_p-banner-a);
    }
    .p-banner .notification{
      opacity: 0;
    }
  }
  .p-banner [data-pds-slot="heading"],
  .p-banner h1,
  .p-banner h2,
  .p-banner h3,
  .p-banner h4,
  .p-banner h5,
  .p-banner h6{
    all: unset;
    grid-area: 1/2;
    font: var(--p-font-weight-semibold) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-primary);
  }
  .p-banner [data-pds-slot]:not([name]),
  .p-banner [data-pds-slot="description"],
  .p-banner p{
    all: unset;
    grid-area: 1/2;
    margin-top: 0px;
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-primary);
  }
  .p-banner[data-heading] [data-pds-slot]:not([name]),
  .p-banner[data-heading] [data-pds-slot="description"],
  .p-banner[data-heading] p {
    grid-area: 2/2;
    margin-top: var(--p-spacing-static-xs);
  }
  .p-banner .notification{
    box-shadow: var(--p-shadow-lg);
    opacity: 0;
    transition: opacity var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-out);
    display: grid;
    grid-template: repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto);
    padding: calc(var(--p-spacing-static-sm) + var(--p-spacing-fluid-sm));
    border-radius: var(--p-radius-2xl);
    background: var(--p-color-info-frosted);
    -webkit-backdrop-filter: var(--p-blur-frosted);
    backdrop-filter: var(--p-blur-frosted);
  }
  .p-banner[open] .notification {
    opacity: 1;
    transition: opacity var(--p-transition-duration, var(--p-duration-md))
      var(--p-ease-in);
  }
  .p-banner[state="success"] .notification {
    background: var(--p-color-success-frosted);
  }
  .p-banner[state="warning"] .notification {
    background: var(--p-color-warning-frosted);
  }
  .p-banner[state="error"] .notification {
    background: var(--p-color-error-frosted);
  }
  .p-banner .dismiss{
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
    grid-area: 1/4/-1;
    align-self: flex-start;
    margin-block: calc(-6 * var(--p-spacing-static-2xs));
    margin-inline: var(--p-spacing-static-md)
      calc(-6 * var(--p-spacing-static-2xs));
  }
  .p-banner .dismiss:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-banner .dismiss::before{
    content: "";
    width: var(--p-leading-normal);
    height: var(--p-leading-normal);
    -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>')
      center/contain no-repeat;
    background: currentColor;
  }
  .p-banner .dismiss span{
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
    .p-banner .notification::before{
      grid-area: 1/1;
      place-self: flex-start;
      content: "";
      width: 1.5rem;
      height: 1.5rem;
      margin-inline-end: var(--p-spacing-static-sm);
      background: var(--p-color-info);
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9m-.75 4.5h1.5V9h-1.5zm1.5 8.5h-1.5v-6h1.5z"/></svg>')
        center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9m-.75 4.5h1.5V9h-1.5zm1.5 8.5h-1.5v-6h1.5z"/></svg>')
        center/contain no-repeat;
    }
    .p-banner[data-heading] .notification::before {
      place-self: center;
    }
    .p-banner[state="success"] .notification::before {
      background: var(--p-color-success);
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.26 12.69-3.8-3.8 1.07-1.05 2.73 2.73 5.25-5.26 1.06 1.06z"/></svg>')
        center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.26 12.69-3.8-3.8 1.07-1.05 2.73 2.73 5.25-5.26 1.06 1.06z"/></svg>')
        center/contain no-repeat;
    }
    .p-banner[state="warning"] .notification::before {
      background: var(--p-color-warning);
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.58 18.26 13.3 3.75A1.5 1.5 0 0 0 12 3a1.5 1.5 0 0 0-1.3.75l-8.28 14.5a1.5 1.5 0 0 0 0 1.5c.28.47.76.75 1.3.75h16.56a1.5 1.5 0 0 0 1.3-2.25M13 17.5h-2v-2h2zm-.4-3.5h-1.2L11 8.5h2z"/></svg>')
        center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.58 18.26 13.3 3.75A1.5 1.5 0 0 0 12 3a1.5 1.5 0 0 0-1.3.75l-8.28 14.5a1.5 1.5 0 0 0 0 1.5c.28.47.76.75 1.3.75h16.56a1.5 1.5 0 0 0 1.3-2.25M13 17.5h-2v-2h2zm-.4-3.5h-1.2L11 8.5h2z"/></svg>')
        center/contain no-repeat;
    }
    .p-banner[state="error"] .notification::before {
      background: var(--p-color-error);
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4l2 2 2-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 3.5-.4 5.5h-1.2L11 6.5zm-2 7h2v2h-2z"/></svg>')
        center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4l2 2 2-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 3.5-.4 5.5h-1.2L11 6.5zm-2 7h2v2h-2z"/></svg>')
        center/contain no-repeat;
    }
    @media (forced-colors: active) {
      .p-banner .notification::before{
        background: CanvasText;
      }
    }
  }
  @media (forced-colors: active) {
    .p-banner .notification{
      outline: 2px solid CanvasText;
      outline-offset: -2px;
    }
    .p-banner .dismiss{
      forced-color-adjust: none;
      background: Canvas;
      box-shadow: inset 0 0 0 2px ButtonBorder;
      color: ButtonText;
    }
    .p-banner .dismiss:focus-visible{
      outline-color: Highlight;
    }
  }
  @media (hover: hover) {
    .p-banner .dismiss:hover{
      background-color: var(--p-color-frosted);
    }
    @media (forced-colors: active) {
      .p-banner .dismiss:hover{
        background: Canvas;
      }
    }
  }`;function ln(t,e,i){let M,k,f,d,y,{$$slots:T={},$$scope:B}=e;const S=["base","xs","s","m","l","xl","xxl"],F=(n,s)=>{if(n==null)return s;if(n==="")return typeof s=="boolean"?!0:s;if(typeof n=="string"&&n.charAt(0)==="{")try{return JSON.parse(n.replace(/'/g,'"'))}catch{return s}return n},x=(n,s,r)=>n&&typeof n=="object"?n[s]===void 0?r:n[s]:n;let{position:w}=e,{heading:_}=e,{headingTag:g}=e,{description:b}=e,{dismissButton:m}=e,{state:u}=e,{open:o}=e;function U(){return{position:w,heading:_,headingTag:g,description:b,dismissButton:m,state:u,open:o}}return t.$$set=n=>{i(4,e=C(C({},e),J(n))),"position"in n&&i(5,w=n.position),"heading"in n&&i(6,_=n.heading),"headingTag"in n&&i(7,g=n.headingTag),"description"in n&&i(8,b=n.description),"dismissButton"in n&&i(9,m=n.dismissButton),"state"in n&&i(10,u=n.state),"open"in n&&i(11,o=n.open),"$$scope"in n&&i(13,B=n.$$scope)},t.$$.update=()=>{t.$$.dirty&64&&i(3,k=()=>_||""),t.$$.dirty&128,t.$$.dirty&256&&i(2,f=()=>b||""),t.$$.dirty&512,t.$$.dirty&64,t.$$.dirty&1024,t.$$.dirty&1024,t.$$.dirty&4096&&i(1,d=Z(M())),i(0,y=$({open:e.open,state:e.state}))},i(12,M=()=>{let n=F(U().position,{base:"bottom",s:"top"});(n==null||n==="")&&(n={base:"bottom",s:"top"});const s=p=>p==="top"?{a:en,inset:rn}:{a:on,inset:sn},r={};if(typeof n=="object"&&n!==null){let p=String(x(n,"base","bottom")||"bottom");for(const l of S){n[l]!==void 0&&(p=String(x(n,l,p)));const a=s(p);l==="base"?(r["--p-ban-a"]=a.a,r["--p-ban-inset"]=a.inset):(r[`--p-ban-a-${l}`]=a.a,r[`--p-ban-inset-${l}`]=a.inset)}}else{const p=s(n);r["--p-ban-a"]=p.a,r["--p-ban-inset"]=p.inset;for(const l of S)l!=="base"&&(r[`--p-ban-a-${l}`]=p.a,r[`--p-ban-inset-${l}`]=p.inset)}return r}),e=J(e),[y,d,f,k,e,w,_,g,b,m,u,o,M,B,T]}class gn extends j{constructor(e){super(),D(this,e,ln,tn,G,{position:5,heading:6,headingTag:7,description:8,dismissButton:9,state:10,open:11})}}export{gn as default};
