import{S as q,i as A,s as C,d as S,v as F,t as w,b as H,p as d,k as T,l as y,w as N,m as _,H as O,n as P,x as $,a as g,q as x,c as B,u as E,g as I,e as J}from"./svelte-DoO7z26N.js";import{s as K}from"./host-DRskmCSE.js";import R from"./Scroller-DOZi1zGI.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function D(o){let e,r;const f=o[4].default,n=B(f,o,o[5],null);return{c(){e=_("span"),n&&n.c(),d(e,"data-pds-slot","")},m(t,a){T(t,e,a),n&&n.m(e,null),r=!0},p(t,a){n&&n.p&&(!r||a&32)&&E(n,f,t,t[5],r?J(f,t[5],a,null):I(t[5]),null)},i(t){r||(H(n,t),r=!0)},o(t){w(n,t),r=!1},d(t){t&&S(e),n&&n.d(t)}}}function G(o){let e,r,f=`<style>${L}</style>`,n,t,a,u,m;return a=new R({props:{class:"scroller",$$slots:{default:[D]},$$scope:{ctx:o}}}),{c(){e=_("div"),r=new O(!1),n=P(),t=_("div"),$(a.$$.fragment),r.a=n,d(t,"class","wrap"),d(e,"class",u="p-stepper-horizontal"+(o[1].class?` ${o[1].class}`:"")),d(e,"data-pds","stepper-horizontal"),d(e,"style",o[0])},m(l,i){T(l,e,i),r.m(f,e),y(e,n),y(e,t),N(a,t,null),m=!0},p(l,[i]){const h={};i&32&&(h.$$scope={dirty:i,ctx:l}),a.$set(h),(!m||i&2&&u!==(u="p-stepper-horizontal"+(l[1].class?` ${l[1].class}`:"")))&&d(e,"class",u),(!m||i&1)&&d(e,"style",l[0])},i(l){m||(H(a.$$.fragment,l),m=!0)},o(l){w(a.$$.fragment,l),m=!1},d(l){l&&S(e),F(a)}}}const L=`.p-stepper-horizontal :where([data-pds-slot]){display:contents}

  .p-stepper-horizontal {
    display: grid;
  }
  .p-stepper-horizontal[hidden] {
    display: none !important;
  }
  .p-stepper-horizontal .wrap{
    display: contents;
  }
  .p-stepper-horizontal .scroller{
    place-self: flex-start;
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    font-size: var(--p-sh-fs, var(--p-typescale-sm));
  }
  @media (min-width: 480px) {
    .p-stepper-horizontal .scroller{
      font-size: var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm)));
    }
  }
  @media (min-width: 760px) {
    .p-stepper-horizontal .scroller{
      font-size: var(
        --p-sh-fs-s,
        var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm)))
      );
    }
  }
  @media (min-width: 1000px) {
    .p-stepper-horizontal .scroller{
      font-size: var(
        --p-sh-fs-m,
        var(
          --p-sh-fs-s,
          var(--p-sh-fs-xs, var(--p-sh-fs, var(--p-typescale-sm)))
        )
      );
    }
  }
  @media (min-width: 1300px) {
    .p-stepper-horizontal .scroller{
      font-size: var(--p-sh-fs-l, var(--p-sh-fs-m));
    }
  }
  @media (min-width: 1760px) {
    .p-stepper-horizontal .scroller{
      font-size: var(--p-sh-fs-xl, var(--p-sh-fs-l));
    }
  }
  @media (min-width: 1920px) {
    .p-stepper-horizontal .scroller{
      font-size: var(--p-sh-fs-xxl, var(--p-sh-fs-xl));
    }
  }`;function M(o,e,r){let f,n,{$$slots:t={},$$scope:a}=e;const u=["base","xs","s","m","l","xl","xxl"],m=(s,p)=>{if(s==null||s==="")return p;if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return p}return s},l=(s,p,c)=>s&&typeof s=="object"?s[p]===void 0?c:s[p]:s,i=s=>s==="medium"?"var(--p-typescale-md)":"var(--p-typescale-sm)",h=(s,p,c)=>{if(p==="base"){s["--p-sh-fs"]=c;return}s[`--p-sh-fs-${p}`]=c};let{size:z}=e;function b(){return{size:z}}return o.$$set=s=>{r(1,e=g(g({},e),x(s))),"size"in s&&r(2,z=s.size),"$$scope"in s&&r(5,a=s.$$scope)},o.$$.update=()=>{o.$$.dirty&8&&r(0,n=K(f()))},r(3,f=()=>{const s=m(b().size,"small"),p={};if(typeof s=="object"&&s!==null){let c=i(l(s,"base","small"));for(const v of u)s[v]!==void 0&&(c=i(l(s,v,"small"))),h(p,v,c)}else{const c=i(s);for(const v of u)h(p,v,c)}return p}),e=x(e),[n,e,z,f,t,a]}class Z extends q{constructor(e){super(),A(this,e,M,G,C,{size:2})}}export{Z as default};
