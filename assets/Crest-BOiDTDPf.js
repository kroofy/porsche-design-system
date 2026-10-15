import{S as x,i as b,s as y,r as g,d as v,p as c,k as w,l as d,m,H as _,n as k,a as u,q as f}from"./svelte-DoO7z26N.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function H(n){let e,r,o=`<style>${C}</style>`,i,t,l,p,h;return{c(){e=m("div"),r=new _(!1),i=k(),t=m("a"),l=m("picture"),l.innerHTML='<source srcset="https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.0d0cc89@1x.webp 1x,https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.2245c45@2x.webp 2x,https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.19b4292@3x.webp 3x" type="image/webp"/><source srcset="https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.d76137c@1x.png 1x,https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.8a292fb@2x.png 2x,https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.18d6f02@3x.png 3x" type="image/png"/><img src="https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.8a292fb@2x.png" width="30" height="40" alt="Porsche"/>',r.a=i,c(t,"href",n[0]),c(t,"target",p=n[1]||"_self"),c(e,"class",h="p-crest"+(n[2].class?` ${n[2].class}`:"")),c(e,"data-pds","crest")},m(s,a){w(s,e,a),r.m(o,e),d(e,i),d(e,t),d(t,l)},p(s,[a]){a&1&&c(t,"href",s[0]),a&2&&p!==(p=s[1]||"_self")&&c(t,"target",p),a&4&&h!==(h="p-crest"+(s[2].class?` ${s[2].class}`:""))&&c(e,"class",h)},i:g,o:g,d(s){s&&v(e)}}}const C=`.p-crest :where([data-pds-slot]){display:contents}

  .p-crest {
    position: relative;
    display: inline-block;
    vertical-align: top;
    box-sizing: content-box !important;
    max-width: 30px !important;
    max-height: 40px !important;
    width: inherit !important;
    height: inherit !important;
  }
  .p-crest[hidden] {
    display: none !important;
  }
  .p-crest a{
    all: unset;
    cursor: pointer;
  }
  .p-crest a::before{
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 1px;
  }
  .p-crest a:focus-visible::before{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-crest picture{
    display: block;
    width: min(30px, 100%);
    height: min(40px, 100%);
  }
  .p-crest img{
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
  @media (forced-colors: active) {
    .p-crest a:focus-visible::before{
      outline-color: Highlight;
    }
  }`;function T(n,e,r){let{href:o}=e,{target:i}=e;return n.$$set=t=>{r(2,e=u(u({},e),f(t))),"href"in t&&r(0,o=t.href),"target"in t&&r(1,i=t.target)},e=f(e),[o,i,e]}class M extends x{constructor(e){super(),b(this,e,T,H,y,{href:0,target:1})}}export{M as default};
