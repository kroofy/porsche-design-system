import{S as K,i as R,s as D,c as F,d as M,v as Q,t as P,b as z,u as U,g as V,e as W,f as X,p as o,k as Y,l as x,w as Z,m as j,H as $,n as ss,x as ls,o as as,a as E,q as I}from"./svelte-DoO7z26N.js";import{s as ns}from"./host-DRskmCSE.js";import ps from"./Spinner-CHLfbpXm.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function rs(w){let a,r,O=`<style>${ts}</style>`,L,b,f,g,m,y,v,h,k=w[1]()+"",H,S,e;m=new ps({props:{class:"spinner","aria-hidden":"true"}});const _=w[12].default,t=F(_,w,w[11],null);return{c(){a=j("div"),r=new $(!1),L=ss(),b=j("div"),f=j("button"),g=j("span"),ls(m.$$.fragment),y=j("label"),v=j("span"),t&&t.c(),h=j("span"),H=as(k),r.a=L,o(g,"class","toggle"),o(f,"type","button"),o(f,"role","switch"),o(v,"data-pds-slot",""),o(h,"class","loading"),o(h,"id","loading"),o(h,"role","status"),o(b,"class","wrap"),o(a,"class",S="p-switch"+(w[2].class?` ${w[2].class}`:"")),o(a,"data-pds","switch"),o(a,"style",w[0])},m(p,c){Y(p,a,c),r.m(O,a),x(a,L),x(a,b),x(b,f),x(f,g),Z(m,g,null),x(b,y),x(y,v),t&&t.m(v,null),x(b,h),x(h,H),e=!0},p(p,[c]){t&&t.p&&(!e||c&2048)&&U(t,_,p,p[11],e?W(_,p[11],c,null):V(p[11]),null),(!e||c&2)&&k!==(k=p[1]()+"")&&X(H,k),(!e||c&4&&S!==(S="p-switch"+(p[2].class?` ${p[2].class}`:"")))&&o(a,"class",S),(!e||c&1)&&o(a,"style",p[0])},i(p){e||(z(m.$$.fragment,p),z(t,p),e=!0)},o(p){P(m.$$.fragment,p),P(t,p),e=!1},d(p){p&&M(a),Q(m),t&&t.d(p)}}}const ts=`.p-switch :where([data-pds-slot]){display:contents}

  .p-switch .wrap{
    display: contents;
  }
  .p-switch {
    --_p-switch-a: var(--p-sw-a, 1);
    display: var(--p-sw-display, inline-flex);
    justify-content: var(--p-sw-justify, flex-start) !important;
    width: var(--p-sw-w, auto) !important;
    vertical-align: var(--p-sw-va, top) !important;
    opacity: var(--p-sw-opacity);
    outline: 0 !important;
    font: var(--p-typescale-sm) var(--p-font-porsche-next) !important;
    gap: calc(11.2px * (var(--_p-switch-a) - 0.64285714) + 4px) !important;
  }
  .p-switch[hidden] {
    display: none !important;
  }
  .p-switch button{
    all: unset;
    position: relative;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    box-sizing: border-box;
    width: calc(var(--_p-switch-a) * 3rem);
    height: calc(var(--_p-switch-a) * 1.75rem);
    margin-block: max(
      0px,
      calc((var(--p-leading-normal) - calc(var(--_p-switch-a) * 1.75rem)) / 2)
    );
    font: var(--p-typescale-sm) var(--p-font-porsche-next);
    border: 1px solid var(--p-sw-border);
    border-radius: var(--p-radius-full);
    background: var(--p-sw-btn-bg);
    cursor: var(--p-sw-cursor, pointer);
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      border-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-switch button:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-switch button::before{
    content: "";
    position: absolute;
    inset: calc(
      -1px - max(0px, calc(24px - calc(var(--_p-switch-a) * 1.75rem)) / 2)
    );
  }
  .p-switch label{
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    min-width: 0;
    min-height: 0;
    cursor: var(--p-sw-cursor, pointer);
    color: var(--p-color-primary);
    order: var(--p-sw-order, 0);
    position: var(--p-sw-lbl-pos, static);
    width: var(--p-sw-lbl-w, auto);
    height: var(--p-sw-lbl-h, auto);
    padding: var(--p-sw-lbl-pad, 0);
    margin: var(--p-sw-lbl-m, 0);
    overflow: var(--p-sw-lbl-ov, visible);
    clip: var(--p-sw-lbl-clip, auto);
    white-space: var(--p-sw-lbl-ws, normal);
    padding-top: var(--p-sw-lbl-pt);
  }
  .p-switch .toggle{
    display: flex;
    place-items: center;
    place-content: center;
    width: calc(var(--_p-switch-a) * 1.25rem);
    height: calc(var(--_p-switch-a) * 1.25rem);
    border-radius: var(--p-radius-full);
    background: var(--p-sw-toggle-bg);
    transition: transform var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
    transform: translate3d(var(--p-sw-toggle-x), 0, 0);
  }
  .p-switch .toggle:dir(rtl){
    transform: translate3d(calc(var(--p-sw-toggle-x) * -1), 0, 0);
  }
  .p-switch .loading{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  .p-switch .spinner{
    --p-spinner-size: calc(var(--_p-switch-a) * 1.75rem);
  }
  .p-switch .spinner,
  .p-switch .p-spinner{
    display: var(--p-sw-spinner-display);
  }
  @media (forced-colors: active) {
    .p-switch {
      opacity: var(--p-sw-fc-opacity, var(--p-sw-opacity, 1));
      color: var(--p-sw-fc-color);
    }
    .p-switch button{
      border-color: var(--p-sw-fc-border, var(--p-sw-border));
    }
    .p-switch button:focus-visible{
      outline-color: Highlight;
    }
    .p-switch label{
      color: var(--p-sw-fc-label, var(--p-color-primary));
    }
    .p-switch .toggle{
      background: CanvasText;
    }
  }
  @media (hover: hover) {
    .p-switch button:hover{
      border-color: var(--p-sw-hover-border, var(--p-sw-border));
    }
  }
  @media (min-width: 480px) {
    .p-switch {
      display: var(--p-sw-xs-display, var(--p-sw-display, inline-flex));
      justify-content: var(
        --p-sw-xs-justify,
        var(--p-sw-justify, flex-start)
      ) !important;
      width: var(--p-sw-xs-w, var(--p-sw-w, auto)) !important;
      vertical-align: var(--p-sw-xs-va, var(--p-sw-va, top)) !important;
    }
    .p-switch label{
      order: var(--p-sw-xs-order, var(--p-sw-order, 0));
      position: var(--p-sw-xs-lbl-pos, var(--p-sw-lbl-pos, static));
      width: var(--p-sw-xs-lbl-w, var(--p-sw-lbl-w, auto));
      height: var(--p-sw-xs-lbl-h, var(--p-sw-lbl-h, auto));
      padding: var(--p-sw-xs-lbl-pad, var(--p-sw-lbl-pad, 0));
      margin: var(--p-sw-xs-lbl-m, var(--p-sw-lbl-m, 0));
      overflow: var(--p-sw-xs-lbl-ov, var(--p-sw-lbl-ov, visible));
      clip: var(--p-sw-xs-lbl-clip, var(--p-sw-lbl-clip, auto));
      white-space: var(--p-sw-xs-lbl-ws, var(--p-sw-lbl-ws, normal));
      padding-top: var(--p-sw-xs-lbl-pt, var(--p-sw-lbl-pt));
    }
  }
  @media (min-width: 760px) {
    .p-switch {
      display: var(
        --p-sw-s-display,
        var(--p-sw-xs-display, var(--p-sw-display, inline-flex))
      );
      justify-content: var(
        --p-sw-s-justify,
        var(--p-sw-xs-justify, var(--p-sw-justify, flex-start))
      ) !important;
      width: var(--p-sw-s-w, var(--p-sw-xs-w, var(--p-sw-w, auto))) !important;
      vertical-align: var(
        --p-sw-s-va,
        var(--p-sw-xs-va, var(--p-sw-va, top))
      ) !important;
    }
    .p-switch label{
      order: var(--p-sw-s-order, var(--p-sw-xs-order, var(--p-sw-order, 0)));
      position: var(
        --p-sw-s-lbl-pos,
        var(--p-sw-xs-lbl-pos, var(--p-sw-lbl-pos, static))
      );
      width: var(--p-sw-s-lbl-w, var(--p-sw-xs-lbl-w, var(--p-sw-lbl-w, auto)));
      height: var(
        --p-sw-s-lbl-h,
        var(--p-sw-xs-lbl-h, var(--p-sw-lbl-h, auto))
      );
      padding: var(
        --p-sw-s-lbl-pad,
        var(--p-sw-xs-lbl-pad, var(--p-sw-lbl-pad, 0))
      );
      margin: var(--p-sw-s-lbl-m, var(--p-sw-xs-lbl-m, var(--p-sw-lbl-m, 0)));
      overflow: var(
        --p-sw-s-lbl-ov,
        var(--p-sw-xs-lbl-ov, var(--p-sw-lbl-ov, visible))
      );
      clip: var(
        --p-sw-s-lbl-clip,
        var(--p-sw-xs-lbl-clip, var(--p-sw-lbl-clip, auto))
      );
      white-space: var(
        --p-sw-s-lbl-ws,
        var(--p-sw-xs-lbl-ws, var(--p-sw-lbl-ws, normal))
      );
      padding-top: var(
        --p-sw-s-lbl-pt,
        var(--p-sw-xs-lbl-pt, var(--p-sw-lbl-pt))
      );
    }
  }
  @media (min-width: 1000px) {
    .p-switch {
      display: var(
        --p-sw-m-display,
        var(
          --p-sw-s-display,
          var(--p-sw-xs-display, var(--p-sw-display, inline-flex))
        )
      );
      justify-content: var(
        --p-sw-m-justify,
        var(
          --p-sw-s-justify,
          var(--p-sw-xs-justify, var(--p-sw-justify, flex-start))
        )
      ) !important;
      width: var(
        --p-sw-m-w,
        var(--p-sw-s-w, var(--p-sw-xs-w, var(--p-sw-w, auto)))
      ) !important;
      vertical-align: var(
        --p-sw-m-va,
        var(--p-sw-s-va, var(--p-sw-xs-va, var(--p-sw-va, top)))
      ) !important;
    }
    .p-switch label{
      order: var(
        --p-sw-m-order,
        var(--p-sw-s-order, var(--p-sw-xs-order, var(--p-sw-order, 0)))
      );
      position: var(
        --p-sw-m-lbl-pos,
        var(
          --p-sw-s-lbl-pos,
          var(--p-sw-xs-lbl-pos, var(--p-sw-lbl-pos, static))
        )
      );
      width: var(
        --p-sw-m-lbl-w,
        var(--p-sw-s-lbl-w, var(--p-sw-xs-lbl-w, var(--p-sw-lbl-w, auto)))
      );
      height: var(
        --p-sw-m-lbl-h,
        var(--p-sw-s-lbl-h, var(--p-sw-xs-lbl-h, var(--p-sw-lbl-h, auto)))
      );
      padding: var(
        --p-sw-m-lbl-pad,
        var(--p-sw-s-lbl-pad, var(--p-sw-xs-lbl-pad, var(--p-sw-lbl-pad, 0)))
      );
      margin: var(
        --p-sw-m-lbl-m,
        var(--p-sw-s-lbl-m, var(--p-sw-xs-lbl-m, var(--p-sw-lbl-m, 0)))
      );
      overflow: var(
        --p-sw-m-lbl-ov,
        var(--p-sw-s-lbl-ov, var(--p-sw-xs-lbl-ov, var(--p-sw-lbl-ov, visible)))
      );
      clip: var(
        --p-sw-m-lbl-clip,
        var(
          --p-sw-s-lbl-clip,
          var(--p-sw-xs-lbl-clip, var(--p-sw-lbl-clip, auto))
        )
      );
      white-space: var(
        --p-sw-m-lbl-ws,
        var(--p-sw-s-lbl-ws, var(--p-sw-xs-lbl-ws, var(--p-sw-lbl-ws, normal)))
      );
      padding-top: var(
        --p-sw-m-lbl-pt,
        var(--p-sw-s-lbl-pt, var(--p-sw-xs-lbl-pt, var(--p-sw-lbl-pt)))
      );
    }
  }
  @media (min-width: 1300px) {
    .p-switch {
      display: var(--p-sw-l-display, var(--p-sw-m-display));
      justify-content: var(--p-sw-l-justify, var(--p-sw-m-justify)) !important;
      width: var(--p-sw-l-w, var(--p-sw-m-w)) !important;
      vertical-align: var(--p-sw-l-va, var(--p-sw-m-va)) !important;
    }
    .p-switch label{
      order: var(--p-sw-l-order, var(--p-sw-m-order));
      position: var(--p-sw-l-lbl-pos, var(--p-sw-m-lbl-pos));
      width: var(--p-sw-l-lbl-w, var(--p-sw-m-lbl-w));
      height: var(--p-sw-l-lbl-h, var(--p-sw-m-lbl-h));
      padding: var(--p-sw-l-lbl-pad, var(--p-sw-m-lbl-pad));
      margin: var(--p-sw-l-lbl-m, var(--p-sw-m-lbl-m));
      overflow: var(--p-sw-l-lbl-ov, var(--p-sw-m-lbl-ov));
      clip: var(--p-sw-l-lbl-clip, var(--p-sw-m-lbl-clip));
      white-space: var(--p-sw-l-lbl-ws, var(--p-sw-m-lbl-ws));
      padding-top: var(--p-sw-l-lbl-pt, var(--p-sw-m-lbl-pt));
    }
  }
  @media (min-width: 1760px) {
    .p-switch {
      display: var(--p-sw-xl-display, var(--p-sw-l-display));
      justify-content: var(--p-sw-xl-justify, var(--p-sw-l-justify)) !important;
      width: var(--p-sw-xl-w, var(--p-sw-l-w)) !important;
      vertical-align: var(--p-sw-xl-va, var(--p-sw-l-va)) !important;
    }
    .p-switch label{
      order: var(--p-sw-xl-order, var(--p-sw-l-order));
      position: var(--p-sw-xl-lbl-pos, var(--p-sw-l-lbl-pos));
      width: var(--p-sw-xl-lbl-w, var(--p-sw-l-lbl-w));
      height: var(--p-sw-xl-lbl-h, var(--p-sw-l-lbl-h));
      padding: var(--p-sw-xl-lbl-pad, var(--p-sw-l-lbl-pad));
      margin: var(--p-sw-xl-lbl-m, var(--p-sw-l-lbl-m));
      overflow: var(--p-sw-xl-lbl-ov, var(--p-sw-l-lbl-ov));
      clip: var(--p-sw-xl-lbl-clip, var(--p-sw-l-lbl-clip));
      white-space: var(--p-sw-xl-lbl-ws, var(--p-sw-l-lbl-ws));
      padding-top: var(--p-sw-xl-lbl-pt, var(--p-sw-l-lbl-pt));
    }
  }
  @media (min-width: 1920px) {
    .p-switch {
      display: var(--p-sw-xxl-display, var(--p-sw-xl-display));
      justify-content: var(
        --p-sw-xxl-justify,
        var(--p-sw-xl-justify)
      ) !important;
      width: var(--p-sw-xxl-w, var(--p-sw-xl-w)) !important;
      vertical-align: var(--p-sw-xxl-va, var(--p-sw-xl-va)) !important;
    }
    .p-switch label{
      order: var(--p-sw-xxl-order, var(--p-sw-xl-order));
      position: var(--p-sw-xxl-lbl-pos, var(--p-sw-xl-lbl-pos));
      width: var(--p-sw-xxl-lbl-w, var(--p-sw-xl-lbl-w));
      height: var(--p-sw-xxl-lbl-h, var(--p-sw-xl-lbl-h));
      padding: var(--p-sw-xxl-lbl-pad, var(--p-sw-xl-lbl-pad));
      margin: var(--p-sw-xxl-lbl-m, var(--p-sw-xl-lbl-m));
      overflow: var(--p-sw-xxl-lbl-ov, var(--p-sw-xl-lbl-ov));
      clip: var(--p-sw-xxl-lbl-clip, var(--p-sw-xl-lbl-clip));
      white-space: var(--p-sw-xxl-lbl-ws, var(--p-sw-xl-lbl-ws));
      padding-top: var(--p-sw-xxl-lbl-pt, var(--p-sw-xl-lbl-pt));
    }
  }`;function is(w,a,r){let O,L,b,{$$slots:f={},$$scope:g}=a;const m=["base","xs","s","m","l","xl","xxl"],y=(s,n)=>{if(s==null)return n;if(s==="")return typeof n=="boolean"?!0:n;if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return n}return s},v=s=>s===!0||s==="true"||s==="",h=(s,n,i)=>s&&typeof s=="object"?s[n]===void 0?i:s[n]:s,k=(s,n,i)=>{const l=n==="base"?"--p-sw":`--p-sw-${n}`;if(i){s[`${l}-display`]="flex",s[`${l}-justify`]="space-between",s[`${l}-w`]="100%",s[`${l}-va`]="top";return}s[`${l}-display`]="inline-flex",s[`${l}-justify`]="flex-start",s[`${l}-w`]="auto",s[`${l}-va`]="top"},H=(s,n,i)=>{const l=n==="base"?"--p-sw-order":`--p-sw-${n}-order`;s[l]=i==="start"?"-1":"0"},S=(s,n,i)=>{const l=n==="base"?"--p-sw-lbl":`--p-sw-${n}-lbl`;if(i){s[`${l}-pos`]="absolute",s[`${l}-w`]="1px",s[`${l}-h`]="1px",s[`${l}-pad`]="0",s[`${l}-m`]="-1px",s[`${l}-ov`]="hidden",s[`${l}-clip`]="rect(0, 0, 0, 0)",s[`${l}-ws`]="nowrap",s[`${l}-pt`]="0";return}s[`${l}-pos`]="static",s[`${l}-w`]="auto",s[`${l}-h`]="auto",s[`${l}-pad`]="0",s[`${l}-m`]="0",s[`${l}-ov`]="visible",s[`${l}-clip`]="auto",s[`${l}-ws`]="normal",s[`${l}-pt`]="max(0px, calc((calc(var(--_p-switch-a) * 1.75rem) - var(--p-leading-normal)) / 2))"},e=(s,n,i,l,u)=>{if(typeof s=="object"&&s!==null){let T=u(h(s,"base",n));for(const A of m)s[A]!==void 0&&(T=u(h(s,A,n))),i(l,A,T);return}const N=u(s);for(const T of m)i(l,T,N)};let{checked:_}=a,{disabled:t}=a,{loading:p}=a,{compact:c}=a,{alignLabel:G}=a,{hideLabel:q}=a,{stretch:B}=a;function d(){return{checked:_,disabled:t,loading:p,compact:c,alignLabel:G,hideLabel:q,stretch:B}}return w.$$set=s=>{r(2,a=E(E({},a),I(s))),"checked"in s&&r(3,_=s.checked),"disabled"in s&&r(4,t=s.disabled),"loading"in s&&r(5,p=s.loading),"compact"in s&&r(6,c=s.compact),"alignLabel"in s&&r(7,G=s.alignLabel),"hideLabel"in s&&r(8,q=s.hideLabel),"stretch"in s&&r(9,B=s.stretch),"$$scope"in s&&r(11,g=s.$$scope)},w.$$.update=()=>{w.$$.dirty&1024&&r(0,b=ns(O()))},r(10,O=()=>{const s=v(d().checked),n=v(d().disabled),i=v(d().loading),l=v(d().compact),u=n||i,N=y(d().alignLabel,"end"),T=y(d().hideLabel,!1),A=y(d().stretch,!1),C={"--p-sw-a":l?"0.64285714":"1","--p-sw-border":s?"var(--p-color-success-low)":"var(--p-color-contrast-low)","--p-sw-hover-border":u?s?"var(--p-color-success-low)":"var(--p-color-contrast-low)":s?"var(--p-color-success)":"var(--p-color-primary)","--p-sw-btn-bg":s?"var(--p-color-success-frosted-soft)":"var(--p-color-frosted-soft)","--p-sw-toggle-bg":i?"transparent":s?"var(--p-color-success)":"var(--p-color-primary)","--p-sw-toggle-x":s?"calc(calc(var(--_p-switch-a) * 3rem) - 1px * 2 - 100% - calc(var(--_p-switch-a) * .1875rem))":"calc(var(--_p-switch-a) * .1875rem)","--p-sw-cursor":u?"not-allowed":"pointer","--p-sw-opacity":n?"0.4":"","--p-sw-spinner-display":i?"":"none","--p-sw-fc-opacity":n?"1":"","--p-sw-fc-color":n?"GrayText":"","--p-sw-fc-border":u?"GrayText":"","--p-sw-fc-label":u?"GrayText":""};return e(A,!1,k,C,v),e(N,"end",H,C,J=>J),e(T,!1,S,C,v),C}),r(1,L=()=>d().loading===!0||d().loading==="true"||d().loading===""?"Loading":""),a=I(a),[b,L,a,_,t,p,c,G,q,B,O,g,f]}class hs extends K{constructor(a){super(),R(this,a,is,rs,D,{checked:3,disabled:4,loading:5,compact:6,alignLabel:7,hideLabel:8,stretch:9})}}export{hs as default};
