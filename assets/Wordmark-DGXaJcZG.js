import{S as _,i as b,s as y,r as g,d as V,p as n,k as H,l as d,m as w,H as R,n as S,y as u,o as M,a as k,q as z}from"./svelte-DoO7z26N.js";import{s as C}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function D(r){let t,a,p=`<style>${O}</style>`,l,o,s,h,c,v,e,f;return{c(){t=w("div"),a=new R(!1),l=S(),o=w("a"),s=u("svg"),h=u("title"),c=M("Porsche"),v=u("path"),a.a=l,n(v,"d","M502 221c48.1 0 74-25.9 74-74V74c0-48.1-25.9-74-74-74H0v300h68v-79h434zm6-143v65c0 7.8-4.2 12-12 12H68V66h428c7.8 0 12 4.2 12 12zm228 222c-48.1 0-74-25.9-74-74V74c0-48.1 25.9-74 74-74h417c48.1 0 74 25.9 74 74v152c0 48.1-25.9 74-74 74H736zm411-66c7.8 0 12-4.2 12-12V78c0-7.8-4.2-12-12-12H742c-7.8 0-12 4.2-12 12v144c0 7.8 4.2 12 12 12h405zm675-36c39.844 16.757 67.853 56.1 68 102h-68c0-54-25-79-79-79h-361v79h-68V0h502c48.1 0 74 25.9 74 74v50.14c0 46.06-23.75 71.76-68 73.86zm-12-43c7.8 0 12-4.2 12-12V78c0-7.8-4.2-12-12-12h-428v89h428zm162-81c0-48.1 25.9-74 74-74h492v56h-486c-7.8 0-12 4.2-12 12v42c0 7.8 4.2 12 12 12h422c48.1 0 74 25.9 74 74v30c0 48.1-25.9 74-74 74h-492v-56h486c7.8 0 12-4.2 12-12v-42c0-7.8-4.2-12-12-12h-422c-48.1 0-74-25.9-74-74V74zm661 0c0-48.1 25.9-74 74-74h480v66h-474c-7.8 0-12 4.2-12 12v144c0 7.8 4.2 12 12 12h474v66h-480c-48.1 0-74-25.9-74-74V74zM3817 0v300h-68V183h-407v117h-68V0h68v117h407V0h68zm156 56v66h527v56h-527v66h527v56h-595V0h595v56h-527z"),n(s,"xmlns","http://www.w3.org/2000/svg"),n(s,"viewBox","0 0 4500 300"),n(o,"href",r[0]),n(o,"target",e=r[1]||"_self"),n(t,"class",f="p-wordmark"+(r[3].class?` ${r[3].class}`:"")),n(t,"data-pds","wordmark"),n(t,"style",r[2])},m(i,m){H(i,t,m),a.m(p,t),d(t,l),d(t,o),d(o,s),d(s,h),d(h,c),d(s,v)},p(i,[m]){m&1&&n(o,"href",i[0]),m&2&&e!==(e=i[1]||"_self")&&n(o,"target",e),m&8&&f!==(f="p-wordmark"+(i[3].class?` ${i[3].class}`:""))&&n(t,"class",f),m&4&&n(t,"style",i[2])},i:g,o:g,d(i){i&&V(t)}}}const x="clamp(0.63rem, 0.42vw + 0.5rem, 1rem)",O=`.p-wordmark :where([data-pds-slot]){display:contents}

  .p-wordmark {
    position: relative;
    display: inline-block;
    vertical-align: top;
    max-width: 100% !important;
    max-height: 100% !important;
    box-sizing: content-box !important;
    height: var(--p-wordmark-h) !important;
  }
  .p-wordmark[hidden] {
    display: none !important;
  }
  @supports (height: round(down, 1px, 1px)) {
    .p-wordmark {
      height: var(--p-wordmark-h-round, var(--p-wordmark-h)) !important;
    }
  }
  .p-wordmark a{
    all: unset;
    display: block;
    max-width: 100%;
    max-height: 100%;
    height: inherit;
    cursor: pointer;
  }
  .p-wordmark a::before{
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 1px;
  }
  .p-wordmark a:focus-visible::before{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-wordmark svg{
    display: block;
    max-width: 100%;
    max-height: 100%;
    height: inherit;
    fill: var(--p-color-primary);
  }
  @media (forced-colors: active) {
    .p-wordmark a:focus-visible::before{
      outline-color: Highlight;
    }
    .p-wordmark svg{
      fill: CanvasText;
    }
  }`;function T(r,t,a){let p,l;const o=`round(down, ${x}, 1px)`;let{size:s}=t,{href:h}=t,{target:c}=t;function v(){return{size:s,href:h,target:c}}return r.$$set=e=>{a(3,t=k(k({},t),z(e))),"size"in e&&a(4,s=e.size),"href"in e&&a(0,h=e.href),"target"in e&&a(1,c=e.target)},r.$$.update=()=>{r.$$.dirty&32&&a(2,l=C(p()))},a(5,p=()=>(v().size||"small")==="inherit"?{"--p-wordmark-h":"","--p-wordmark-h-round":""}:{"--p-wordmark-h":x,"--p-wordmark-h-round":o}),t=z(t),[h,c,l,t,s,p]}class B extends _{constructor(t){super(),b(this,t,T,D,y,{size:4,href:0,target:1})}}export{B as default};
