import{S as yn,i as hn,s as bn,c as E,a as X,d as _n,t as J,b as K,u as L,g as R,e as V,f as kn,h as an,j as xn,k as Sn,l as f,m as h,H as zn,n as W,o as wn,p as j,q as tn}from"./svelte-DoO7z26N.js";import{s as Tn,h as Cn}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const An=t=>({}),rn=t=>({}),Bn=t=>({}),en=t=>({}),Hn=t=>({}),cn=t=>({}),Mn=t=>({}),on=t=>({});function Fn(t){let r,o,P=`<style>${On}</style>`,q,v,b,A,U,I,B=t[2]()+"",x,H,_,k,M,S,z,w,c;const T=t[16].summary,l=E(T,t,t[15],on),F=t[16].heading,a=E(F,t,t[15],cn),m=t[16]["summary-before"],p=E(m,t,t[15],en),D=t[16]["summary-after"],i=E(D,t,t[15],rn),C=t[16].default,d=E(C,t,t[15],null);let y=[{class:w="p-accordion"+(t[3].class?` ${t[3].class}`:"")},{"data-pds":"accordion"},{style:t[1]},t[0]],g={};for(let n=0;n<y.length;n+=1)g=X(g,y[n]);return{c(){r=h("div"),o=new zn(!1),q=W(),v=h("details"),b=h("summary"),A=h("span"),l&&l.c(),U=W(),I=h("h2"),x=wn(B),H=h("span"),a&&a.c(),_=h("span"),p&&p.c(),k=h("span"),i&&i.c(),M=W(),S=h("div"),z=h("span"),d&&d.c(),o.a=q,j(A,"data-pds-slot","summary"),j(H,"data-pds-slot","heading"),j(_,"data-pds-slot","summary-before"),j(k,"data-pds-slot","summary-after"),j(z,"data-pds-slot",""),an(r,g)},m(n,s){Sn(n,r,s),o.m(P,r),f(r,q),f(r,v),f(v,b),f(b,A),l&&l.m(A,null),f(b,U),f(b,I),f(I,x),f(I,H),a&&a.m(H,null),f(v,_),p&&p.m(_,null),f(v,k),i&&i.m(k,null),f(v,M),f(v,S),f(S,z),d&&d.m(z,null),c=!0},p(n,[s]){l&&l.p&&(!c||s&32768)&&L(l,T,n,n[15],c?V(T,n[15],s,Mn):R(n[15]),on),(!c||s&4)&&B!==(B=n[2]()+"")&&kn(x,B),a&&a.p&&(!c||s&32768)&&L(a,F,n,n[15],c?V(F,n[15],s,Hn):R(n[15]),cn),p&&p.p&&(!c||s&32768)&&L(p,m,n,n[15],c?V(m,n[15],s,Bn):R(n[15]),en),i&&i.p&&(!c||s&32768)&&L(i,D,n,n[15],c?V(D,n[15],s,An):R(n[15]),rn),d&&d.p&&(!c||s&32768)&&L(d,C,n,n[15],c?V(C,n[15],s,null):R(n[15]),null),an(r,g=xn(y,[(!c||s&8&&w!==(w="p-accordion"+(n[3].class?` ${n[3].class}`:"")))&&{class:w},{"data-pds":"accordion"},(!c||s&2)&&{style:n[1]},s&1&&n[0]]))},i(n){c||(K(l,n),K(a,n),K(p,n),K(i,n),K(d,n),c=!0)},o(n){J(l,n),J(a,n),J(p,n),J(i,n),J(d,n),c=!1},d(n){n&&_n(r),l&&l.d(n),a&&a.d(n),p&&p.d(n),i&&i.d(n),d&&d.d(n)}}}const On=`.p-accordion :where([data-pds-slot]){display:contents}

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
      var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
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
  }`;function qn(t,r,o){let P,q,v,b,A,U,{$$slots:I={},$$scope:B}=r;const x=["base","xs","s","m","l","xl","xxl"],H=(a,m)=>{if(a==null)return m;if(a==="")return typeof m=="boolean"?!0:m;if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return m}return a},_=(a,m,p)=>a&&typeof a=="object"?a[m]===void 0?p:a[m]:a;let{open:k}=r,{compact:M}=r,{alignMarker:S}=r,{background:z}=r,{indent:w}=r,{size:c}=r,{heading:T}=r,{headingTag:l}=r;function F(){return{open:k,compact:M,alignMarker:S,background:z,indent:w,size:c,heading:T,headingTag:l}}return t.$$set=a=>{o(3,r=X(X({},r),tn(a))),"open"in a&&o(4,k=a.open),"compact"in a&&o(5,M=a.compact),"alignMarker"in a&&o(6,S=a.alignMarker),"background"in a&&o(7,z=a.background),"indent"in a&&o(8,w=a.indent),"size"in a&&o(9,c=a.size),"heading"in a&&o(10,T=a.heading),"headingTag"in a&&o(11,l=a.headingTag),"$$scope"in a&&o(15,B=a.$$scope)},t.$$.update=()=>{t.$$.dirty&24688&&o(12,P=()=>{const a=e=>e===!0||e==="true"||e==="",m=a(k),p=a(M),i=(S||"end")==="start",C=F().background||"none",d=H(F().indent,!1),y=H(F().size,"small"),g=v(),n=b(),s=p?.64285714:1,G="calc(28px * ("+s+" - 0.64285714) + 6px)",Y="calc(11.2px * ("+s+" - 0.64285714) + 12px)",sn="calc(11.2px * ("+s+" - 0.64285714) + 4px)",dn=C==="none"?"0":G,pn=C==="none"?"0":Y,ln=p?"var(--p-radius-xl)":"var(--p-radius-2xl)",Z={canvas:"var(--p-color-canvas)",surface:"var(--p-color-surface)",frosted:"var(--p-color-frosted)",none:"transparent"},$=g&&i?3:g||i?2:1,mn=i?1:g&&n?4:g||n?3:2,un=i?2:1,fn=g&&i?4:g||i?3:2,gn=(g?"auto ":"")+(i?"auto minmax(0, 1fr)":"minmax(0, 1fr) auto")+(n?" auto ":""),nn=e=>e==="medium"?"var(--p-typescale-md)":"var(--p-typescale-sm)",Q=e=>a(e)?String($):"1",O={"--p-acc-gap":sn,"--p-acc-py":dn,"--p-acc-px":pn,"--p-acc-py-fc":G,"--p-acc-px-fc":Y,"--p-acc-radius":ln,"--p-acc-bg":Z[C]||Z.none,"--p-acc-dur":m?"var(--p-transition-duration, var(--p-duration-md))":"var(--p-transition-duration, var(--p-duration-sm))","--p-acc-ease":m?"var(--p-ease-in)":"var(--p-ease-out)","--p-acc-pad-top":G,"--p-acc-cols":gn,"--p-acc-summary-col":String($),"--p-acc-icon-col":String(mn),"--p-acc-before-col":String(un),"--p-acc-after-col":String(fn),"--p-acc-fc-off":C==="none"?"0":"-1px"};if(typeof y=="object"&&y!==null){let e=String(_(y,"base","small")||"small");for(const u of x){y[u]!==void 0&&(e=String(_(y,u,e)));const N=u==="base"?"--p-acc-fs":`--p-acc-fs-${u}`;O[N]=nn(e)}}else{const e=nn(y);O["--p-acc-fs"]=e;for(const u of x)u!=="base"&&(O[`--p-acc-fs-${u}`]=e)}if(typeof d=="object"&&d!==null){let e=a(_(d,"base",!1)),u=Q(e);for(const N of x){d[N]!==void 0&&(e=a(_(d,N,e)),u=Q(e));const vn=N==="base"?"--p-acc-indent":`--p-acc-indent-${N}`;O[vn]=u}}else{const e=Q(d);O["--p-acc-indent"]=e;for(const u of x)u!=="base"&&(O[`--p-acc-indent-${u}`]=e)}return O}),t.$$.dirty&1024&&o(2,q=()=>T||""),t.$$.dirty&2048,t.$$.dirty&16,t.$$.dirty&4096&&o(1,A=Tn(P())),o(0,U=Cn({background:r.background,sticky:r.sticky}))},o(14,v=()=>!1),o(13,b=()=>!1),r=tn(r),[U,A,q,r,k,M,S,z,w,c,T,l,P,b,v,B,I]}class Jn extends yn{constructor(r){super(),hn(this,r,qn,Fn,bn,{open:4,compact:5,alignMarker:6,background:7,indent:8,size:9,heading:10,headingTag:11})}}export{Jn as default};
