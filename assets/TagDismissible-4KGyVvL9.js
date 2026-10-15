import{S as z,i as I,s as L,c as j,d as D,v as J,t as C,b as H,f as N,u as O,g as P,e as R,p as n,k as A,l as b,w as B,m as h,H as E,n as F,o as G,x as K,a as w,q}from"./svelte-DoO7z26N.js";import{s as M}from"./host-DRskmCSE.js";import Q from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function U(e){let a,i,k=`<style>${V}</style>`,y,l,g,f,x,v=e[2]()+"",_,o,d,r,s,u,p;const S=e[10].default,c=j(S,e,e[9],null);return r=new Q({props:{name:"close","aria-hidden":"true",source:e[1]()}}),{c(){a=h("div"),i=new E(!1),y=F(),l=h("button"),g=h("span"),g.textContent="Remove:",f=h("span"),x=h("span"),_=G(v),o=h("span"),c&&c.c(),d=h("span"),K(r.$$.fragment),i.a=y,n(g,"class","sr-only"),n(x,"class","label"),n(o,"data-pds-slot",""),n(d,"class","icon"),n(l,"type","button"),n(l,"aria-label",s=e[3]()),n(a,"class",u="p-tag-dismissible"+(e[4].class?` ${e[4].class}`:"")),n(a,"data-pds","tag-dismissible"),n(a,"style",e[0])},m(t,m){A(t,a,m),i.m(k,a),b(a,y),b(a,l),b(l,g),b(l,f),b(f,x),b(x,_),b(f,o),c&&c.m(o,null),b(l,d),B(r,d,null),p=!0},p(t,[m]){(!p||m&4)&&v!==(v=t[2]()+"")&&N(_,v),c&&c.p&&(!p||m&512)&&O(c,S,t,t[9],p?R(S,t[9],m,null):P(t[9]),null);const T={};m&2&&(T.source=t[1]()),r.$set(T),(!p||m&8&&s!==(s=t[3]()))&&n(l,"aria-label",s),(!p||m&16&&u!==(u="p-tag-dismissible"+(t[4].class?` ${t[4].class}`:"")))&&n(a,"class",u),(!p||m&1)&&n(a,"style",t[0])},i(t){p||(H(c,t),H(r.$$.fragment,t),p=!0)},o(t){C(c,t),C(r.$$.fragment,t),p=!1},d(t){t&&D(a),c&&c.d(t),J(r)}}}const V=`.p-tag-dismissible :where([data-pds-slot]){display:contents}

  .p-tag-dismissible {
    display: inline-block;
    vertical-align: top;
  }
  .p-tag-dismissible[hidden] {
    display: none !important;
  }
  .p-tag-dismissible button{
    all: unset;
    display: flex;
    position: relative;
    align-items: center;
    gap: calc(22.4px * (var(--_p-tag-dismissible-a) - 0.64285714) + 4px);
    padding: var(--p-tag-dismissible-pad-block)
      calc(22.4px * (var(--_p-tag-dismissible-a) - 0.64285714) + 4px);
    border-radius: var(--p-tag-dismissible-radius);
    cursor: pointer;
    background: var(--p-color-frosted);
    color: var(--p-color-primary);
    text-align: start;
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
  }
  .p-tag-dismissible button:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  @media (forced-colors: active) {
    .p-tag-dismissible button{
      outline: 2px solid CanvasText;
      outline-offset: -2px;
    }
    .p-tag-dismissible button:focus-visible{
      outline-color: Highlight;
    }
  }
  @media (hover: hover) {
    .p-tag-dismissible button:hover > .icon{
      background-color: var(--p-color-frosted);
    }
  }
  .p-tag-dismissible .label,
  .p-tag-dismissible button > span:nth-of-type(2) > span{
    display: var(--p-tag-dismissible-label-display);
    margin-bottom: -4px;
    color: var(--p-color-contrast-high);
    font-size: var(--p-typescale-xs);
  }
  .p-tag-dismissible .icon,
  .p-tag-dismissible button > span:last-of-type{
    padding: calc(11.2px * (var(--_p-tag-dismissible-a) - 0.64285714));
    margin: calc(
      -1 * calc(11.2px * (var(--_p-tag-dismissible-a) - 0.64285714))
    );
    transition: background-color
      var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    border-radius: var(--p-radius-full);
  }
  .p-tag-dismissible .sr-only,
  .p-tag-dismissible span.sr-only,
  .p-tag-dismissible button > span:first-of-type{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }`;function W(e,a,i){let k,y,l,g,f,{$$slots:x={},$$scope:v}=a,{compact:_}=a,{label:o}=a,{aria:d}=a;function r(){return{compact:_,label:o,aria:d}}return e.$$set=s=>{i(4,a=w(w({},a),q(s))),"compact"in s&&i(5,_=s.compact),"label"in s&&i(6,o=s.label),"aria"in s&&i(7,d=s.aria),"$$scope"in s&&i(9,v=s.$$scope)},e.$$.update=()=>{e.$$.dirty&64&&i(8,k=()=>{const s=r().compact===!0||r().compact==="true"||r().compact==="",u=!!(o&&o!=="");return{"--_p-tag-dismissible-a":s?"0.64285714":"1","--p-tag-dismissible-radius":s?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-tag-dismissible-pad-block":u?"calc(16.8px * (var(--_p-tag-dismissible-a) - 0.64285714))":"calc(28px * (var(--_p-tag-dismissible-a) - 0.64285714) + 6px)","--p-tag-dismissible-label-display":u?"block":"none"}}),e.$$.dirty&128&&i(3,y=()=>{let s=d;if(!s)return"";if(typeof s=="string")try{s=JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{s=null}return typeof s=="object"&&s!==null&&s["aria-label"]||""}),e.$$.dirty&64&&i(2,l=()=>o||""),e.$$.dirty&256&&i(0,f=M(k()))},i(1,g=()=>"https://cdn.ui.porsche.com/porsche-design-system/icons/close.eec3c5d.svg"),a=q(a),[f,g,l,y,a,_,o,d,k,v,x]}class es extends z{constructor(a){super(),I(this,a,W,U,L,{compact:5,label:6,aria:7})}}export{es as default};
