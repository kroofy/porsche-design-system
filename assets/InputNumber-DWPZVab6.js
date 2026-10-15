import{S as _t,i as Lt,s as St,c as ot,a as ut,d as mt,v as et,t as F,b as Q,f as pt,u as ct,g as dt,e as vt,p as c,h as bt,j as Tt,k as wt,l as v,w as rt,m as x,H as Ot,n as lt,o as $,x as st,q as gt}from"./svelte-DoO7z26N.js";import{s as kt,h as Ht}from"./host-DRskmCSE.js";import zt from"./Spinner-CHLfbpXm.js";import At from"./Icon-MNhZuw6T.js";import ht from"./ButtonPure-Dc5XN6Cq.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const Ct=i=>({}),ft=i=>({}),Gt=i=>({}),xt=i=>({}),It=i=>({}),yt=i=>({});function Nt(i){let a;return{c(){a=$(`Decrement value by 1
    `)},m(e,k){wt(e,a,k)},d(e){e&&mt(a)}}}function qt(i){let a;return{c(){a=$(`Increment value by 1
    `)},m(e,k){wt(e,a,k)},d(e){e&&mt(a)}}}function Pt(i){let a,e,k=`<style>${Bt}</style>`,U,w,A,H,D=i[12]()+"",W,R,tt,C,V=i[11]()+"",X,nt,f,Y,d,G,Z,g,E,J,b,y,I,h,K,u,_,N=i[10]()+"",q,L,S=i[3]()+"",T,z,r;const t=i[28]["label-after"],l=ot(t,i,i[29],yt),O=i[28].start,p=ot(O,i,i[29],xt);b=new ht({props:{class:"button",type:"button",icon:"minus",hideLabel:"true",$$slots:{default:[Nt]},$$scope:{ctx:i}}}),y=new ht({props:{class:"button",type:"button",icon:"plus",hideLabel:"true",$$slots:{default:[qt]},$$scope:{ctx:i}}});const o=i[28].end,m=ot(o,i,i[29],ft);h=new zt({props:{"aria-hidden":"true"}}),_=new At({props:{"aria-hidden":"true",name:i[9](),color:i[8]()}});let at=[{class:z="p-input-number"+(i[13].class?` ${i[13].class}`:"")},{"data-pds":"input-number"},{style:i[1]},i[0]],P={};for(let n=0;n<at.length;n+=1)P=ut(P,at[n]);return{c(){a=x("div"),e=new Ot(!1),U=lt(),w=x("div"),A=x("div"),H=x("label"),W=$(D),R=x("span"),l&&l.c(),tt=lt(),C=x("span"),X=$(V),nt=lt(),f=x("div"),Y=x("span"),p&&p.c(),d=x("input"),st(b.$$.fragment),st(y.$$.fragment),I=x("span"),m&&m.c(),st(h.$$.fragment),K=lt(),u=x("span"),st(_.$$.fragment),q=$(N),L=x("span"),T=$(S),e.a=U,c(H,"class","label"),c(H,"id","label"),c(H,"for","input-number"),c(R,"data-pds-slot","label-after"),c(A,"class","label-wrapper"),c(C,"class","label"),c(C,"id","description"),c(Y,"data-pds-slot","start"),c(d,"type","number"),c(d,"id","input-number"),c(d,"dir","auto"),d.value=G=i[7](),c(d,"placeholder",Z=i[2]()),d.disabled=g=!!i[5](),d.readOnly=E=!!i[4](),c(d,"maxlength",J=i[6]()),c(I,"data-pds-slot","end"),c(f,"class","wrapper"),c(u,"class","message"),c(u,"id","message"),c(L,"class","loading"),c(L,"id","loading"),c(L,"role","status"),c(w,"class","root"),bt(a,P)},m(n,s){wt(n,a,s),e.m(k,a),v(a,U),v(a,w),v(w,A),v(A,H),v(H,W),v(A,R),l&&l.m(R,null),v(w,tt),v(w,C),v(C,X),v(w,nt),v(w,f),v(f,Y),p&&p.m(Y,null),v(f,d),rt(b,f,null),rt(y,f,null),v(f,I),m&&m.m(I,null),rt(h,f,null),v(w,K),v(w,u),rt(_,u,null),v(u,q),v(w,L),v(L,T),r=!0},p(n,s){(!r||s[0]&4096)&&D!==(D=n[12]()+"")&&pt(W,D),l&&l.p&&(!r||s[0]&536870912)&&ct(l,t,n,n[29],r?vt(t,n[29],s,It):dt(n[29]),yt),(!r||s[0]&2048)&&V!==(V=n[11]()+"")&&pt(X,V),p&&p.p&&(!r||s[0]&536870912)&&ct(p,O,n,n[29],r?vt(O,n[29],s,Gt):dt(n[29]),xt),(!r||s[0]&128&&G!==(G=n[7]())&&d.value!==G)&&(d.value=G),(!r||s[0]&4&&Z!==(Z=n[2]()))&&c(d,"placeholder",Z),(!r||s[0]&32&&g!==(g=!!n[5]()))&&(d.disabled=g),(!r||s[0]&16&&E!==(E=!!n[4]()))&&(d.readOnly=E),(!r||s[0]&64&&J!==(J=n[6]()))&&c(d,"maxlength",J);const M={};s[0]&536870912&&(M.$$scope={dirty:s,ctx:n}),b.$set(M);const j={};s[0]&536870912&&(j.$$scope={dirty:s,ctx:n}),y.$set(j),m&&m.p&&(!r||s[0]&536870912)&&ct(m,o,n,n[29],r?vt(o,n[29],s,Ct):dt(n[29]),ft);const B={};s[0]&512&&(B.name=n[9]()),s[0]&256&&(B.color=n[8]()),_.$set(B),(!r||s[0]&1024)&&N!==(N=n[10]()+"")&&pt(q,N),(!r||s[0]&8)&&S!==(S=n[3]()+"")&&pt(T,S),bt(a,P=Tt(at,[(!r||s[0]&8192&&z!==(z="p-input-number"+(n[13].class?` ${n[13].class}`:"")))&&{class:z},{"data-pds":"input-number"},(!r||s[0]&2)&&{style:n[1]},s[0]&1&&n[0]]))},i(n){r||(Q(l,n),Q(p,n),Q(b.$$.fragment,n),Q(y.$$.fragment,n),Q(m,n),Q(h.$$.fragment,n),Q(_.$$.fragment,n),r=!0)},o(n){F(l,n),F(p,n),F(b.$$.fragment,n),F(y.$$.fragment,n),F(m,n),F(h.$$.fragment,n),F(_.$$.fragment,n),r=!1},d(n){n&&mt(a),l&&l.d(n),p&&p.d(n),et(b),et(y),m&&m.d(n),et(h),et(_)}}}const Bt=`.p-input-number :where([data-pds-slot]){display:contents}

  .p-input-number {
    display: block;
    --_p-input-base-a: var(--p-it-scale, 1);
    --ref-p-input-slotted-padding: calc(
      11.2px * (var(--_p-input-base-a) - 0.64285714)
    ) !important;
    --ref-p-input-slotted-margin: calc(
      -1 * calc(11.2px * (var(--_p-input-base-a) - 0.64285714))
    ) !important;
  }
  .p-input-number[hidden] {
    display: none !important;
  }
  .p-input-number:dir(rtl) input::placeholder {
    direction: rtl;
    text-align: end;
  }
  .p-input-number [data-pds-slot="label-after"]{
    display: inline-block;
    vertical-align: top;
  }
  .p-input-number [data-pds-slot="label-after"] > *{
    margin-inline-start: var(--p-spacing-static-xs) !important;
  }
  .p-input-number .label-after{
    display: inline-block;
    vertical-align: top;
  }
  .p-input-number input{
    all: unset;
    display: flex;
    flex: 1;
    align-items: center;
    width: max(100%, 2ch);
    height: 100%;
    font: var(--p-it-font);
    text-overflow: ellipsis;
    -moz-appearance: textfield;
  }
  .p-input-number input::-webkit-inner-spin-button,
  .p-input-number input::-webkit-outer-spin-button{
    display: none;
  }
  .p-input-number .root{
    display: grid;
    gap: var(--p-spacing-static-xs);
  }
  .p-input-number .wrapper{
    display: flex;
    align-items: center;
    gap: calc(22.4px * (var(--_p-input-base-a) - 0.64285714) + 4px);
    height: calc(var(--_p-input-base-a) * 3.5rem);
    box-sizing: border-box;
    padding-inline: calc(22.4px * (var(--_p-input-base-a) - 0.64285714) + 8px);
    border: 1px solid var(--p-it-border);
    border-radius: var(--p-it-radius, var(--p-radius-xl));
    background: var(--p-it-bg);
    color: var(--p-it-color);
    cursor: var(--p-it-cursor, text);
    opacity: var(--p-it-wrap-op);
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      border-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-input-number .wrapper > *{
    opacity: var(--p-it-child-op);
  }
  .p-input-number .wrapper:not(:has(input:disabled)):focus-within{
    border-color: var(--p-it-hover);
  }
  .p-input-number .label-wrapper{
    min-width: var(--p-it-lw-minw);
    position: var(--p-it-lw-pos, static);
    width: var(--p-it-lw-w, auto);
    height: var(--p-it-lw-h, auto);
    padding: var(--p-it-lw-pad, 0);
    margin: var(--p-it-lw-m, 0);
    overflow: var(--p-it-lw-ov, visible);
    clip: var(--p-it-lw-clip, auto);
    white-space: var(--p-it-lw-ws, normal);
  }
  .p-input-number .label{
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    cursor: var(--p-it-label-cursor, pointer);
    color: var(--p-color-primary);
    pointer-events: var(--p-it-pe);
    opacity: var(--p-it-opacity);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
    display: inline;
  }
  .p-input-number .label:empty{
    display: none;
  }
  .p-input-number .label:is(span){
    cursor: unset;
    font-size: var(--p-typescale-xs);
    color: var(--p-color-contrast-high);
    min-width: unset;
    position: var(--p-it-desc-pos, static);
    width: var(--p-it-desc-w, auto);
    height: var(--p-it-desc-h, auto);
    padding: var(--p-it-desc-pad, 0);
    margin: var(--p-it-desc-m, 0);
    overflow: var(--p-it-desc-ov, visible);
    clip: var(--p-it-desc-clip, auto);
    white-space: var(--p-it-desc-ws, normal);
    margin-top: calc(-1 * var(--p-spacing-static-xs));
  }
  .p-input-number .label > [data-pds-slot="label"] > *{
    display: inline !important;
  }
  .p-input-number .required{
    user-select: none;
  }
  .p-input-number .message{
    display: flex;
    gap: var(--p-spacing-static-xs);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-it-msg, inherit);
    opacity: var(--p-it-msg-op);
    position: var(--p-it-msg-pos);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      opacity var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-input-number .message:empty{
    opacity: 0;
    position: absolute;
  }
  .p-input-number .message .p-icon{
    display: var(--p-it-icon-display, none);
  }
  .p-input-number .p-spinner{
    display: var(--p-it-spinner-display, none);
  }
  .p-input-number .button{
    padding: var(--p-it-btn-pad);
    margin: var(--p-it-btn-m);
  }
  .p-input-number:not([controls]) .button {
    display: none;
  }
  .p-input-number .loading{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  @media (forced-colors: active) {
    .p-input-number .wrapper:not(:has(input:disabled)):focus-within{
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
    .p-input-number[disabled] .wrapper {
      opacity: 1;
      color: GrayText;
      border-color: GrayText;
    }
    .p-input-number[disabled] .wrapper > * {
      opacity: 1;
      color: GrayText;
    }
    .p-input-number[disabled] .label {
      opacity: 1;
      color: GrayText;
    }
  }
  @media (hover: hover) {
    .p-input-number:not([disabled]):not([read-only]):not([loading])
      .wrapper:hover:not(.button:hover),
    .p-input-number:not([disabled]):not([read-only]):not([loading])
      .label-wrapper:hover
      ~ .wrapper {
      border-color: var(--p-it-hover);
    }
  }
  @media (min-width: 480px) {
    .p-input-number .label-wrapper{
      min-width: var(--p-it-lw-xs-minw, var(--p-it-lw-minw));
      position: var(--p-it-lw-xs-pos, var(--p-it-lw-pos, static));
      width: var(--p-it-lw-xs-w, var(--p-it-lw-w, auto));
      height: var(--p-it-lw-xs-h, var(--p-it-lw-h, auto));
      padding: var(--p-it-lw-xs-pad, var(--p-it-lw-pad, 0));
      margin: var(--p-it-lw-xs-m, var(--p-it-lw-m, 0));
      overflow: var(--p-it-lw-xs-ov, var(--p-it-lw-ov, visible));
      clip: var(--p-it-lw-xs-clip, var(--p-it-lw-clip, auto));
      white-space: var(--p-it-lw-xs-ws, var(--p-it-lw-ws, normal));
    }
    .p-input-number .label:is(span){
      position: var(--p-it-desc-xs-pos, var(--p-it-desc-pos, static));
      width: var(--p-it-desc-xs-w, var(--p-it-desc-w, auto));
      height: var(--p-it-desc-xs-h, var(--p-it-desc-h, auto));
      padding: var(--p-it-desc-xs-pad, var(--p-it-desc-pad, 0));
      margin: var(--p-it-desc-xs-m, var(--p-it-desc-m, 0));
      overflow: var(--p-it-desc-xs-ov, var(--p-it-desc-ov, visible));
      clip: var(--p-it-desc-xs-clip, var(--p-it-desc-clip, auto));
      white-space: var(--p-it-desc-xs-ws, var(--p-it-desc-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 760px) {
    .p-input-number .label-wrapper{
      min-width: var(
        --p-it-lw-s-minw,
        var(--p-it-lw-xs-minw, var(--p-it-lw-minw))
      );
      position: var(
        --p-it-lw-s-pos,
        var(--p-it-lw-xs-pos, var(--p-it-lw-pos, static))
      );
      width: var(--p-it-lw-s-w, var(--p-it-lw-xs-w, var(--p-it-lw-w, auto)));
      height: var(--p-it-lw-s-h, var(--p-it-lw-xs-h, var(--p-it-lw-h, auto)));
      padding: var(
        --p-it-lw-s-pad,
        var(--p-it-lw-xs-pad, var(--p-it-lw-pad, 0))
      );
      margin: var(--p-it-lw-s-m, var(--p-it-lw-xs-m, var(--p-it-lw-m, 0)));
      overflow: var(
        --p-it-lw-s-ov,
        var(--p-it-lw-xs-ov, var(--p-it-lw-ov, visible))
      );
      clip: var(
        --p-it-lw-s-clip,
        var(--p-it-lw-xs-clip, var(--p-it-lw-clip, auto))
      );
      white-space: var(
        --p-it-lw-s-ws,
        var(--p-it-lw-xs-ws, var(--p-it-lw-ws, normal))
      );
    }
    .p-input-number .label:is(span){
      position: var(
        --p-it-desc-s-pos,
        var(--p-it-desc-xs-pos, var(--p-it-desc-pos, static))
      );
      width: var(
        --p-it-desc-s-w,
        var(--p-it-desc-xs-w, var(--p-it-desc-w, auto))
      );
      height: var(
        --p-it-desc-s-h,
        var(--p-it-desc-xs-h, var(--p-it-desc-h, auto))
      );
      padding: var(
        --p-it-desc-s-pad,
        var(--p-it-desc-xs-pad, var(--p-it-desc-pad, 0))
      );
      margin: var(
        --p-it-desc-s-m,
        var(--p-it-desc-xs-m, var(--p-it-desc-m, 0))
      );
      overflow: var(
        --p-it-desc-s-ov,
        var(--p-it-desc-xs-ov, var(--p-it-desc-ov, visible))
      );
      clip: var(
        --p-it-desc-s-clip,
        var(--p-it-desc-xs-clip, var(--p-it-desc-clip, auto))
      );
      white-space: var(
        --p-it-desc-s-ws,
        var(--p-it-desc-xs-ws, var(--p-it-desc-ws, normal))
      );
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1000px) {
    .p-input-number .label-wrapper{
      min-width: var(--p-it-lw-m-minw, var(--p-it-lw-s-minw));
      position: var(--p-it-lw-m-pos, var(--p-it-lw-s-pos, static));
      width: var(--p-it-lw-m-w, var(--p-it-lw-s-w, auto));
      height: var(--p-it-lw-m-h, var(--p-it-lw-s-h, auto));
      padding: var(--p-it-lw-m-pad, var(--p-it-lw-s-pad, 0));
      margin: var(--p-it-lw-m-m, var(--p-it-lw-s-m, 0));
      overflow: var(--p-it-lw-m-ov, var(--p-it-lw-s-ov, visible));
      clip: var(--p-it-lw-m-clip, var(--p-it-lw-s-clip, auto));
      white-space: var(--p-it-lw-m-ws, var(--p-it-lw-s-ws, normal));
    }
    .p-input-number .label:is(span){
      position: var(--p-it-desc-m-pos, var(--p-it-desc-s-pos, static));
      width: var(--p-it-desc-m-w, var(--p-it-desc-s-w, auto));
      height: var(--p-it-desc-m-h, var(--p-it-desc-s-h, auto));
      padding: var(--p-it-desc-m-pad, var(--p-it-desc-s-pad, 0));
      margin: var(--p-it-desc-m-m, var(--p-it-desc-s-m, 0));
      overflow: var(--p-it-desc-m-ov, var(--p-it-desc-s-ov, visible));
      clip: var(--p-it-desc-m-clip, var(--p-it-desc-s-clip, auto));
      white-space: var(--p-it-desc-m-ws, var(--p-it-desc-s-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1300px) {
    .p-input-number .label-wrapper{
      min-width: var(--p-it-lw-l-minw, var(--p-it-lw-m-minw));
      position: var(--p-it-lw-l-pos, var(--p-it-lw-m-pos, static));
      width: var(--p-it-lw-l-w, var(--p-it-lw-m-w, auto));
      height: var(--p-it-lw-l-h, var(--p-it-lw-m-h, auto));
      padding: var(--p-it-lw-l-pad, var(--p-it-lw-m-pad, 0));
      margin: var(--p-it-lw-l-m, var(--p-it-lw-m-m, 0));
      overflow: var(--p-it-lw-l-ov, var(--p-it-lw-m-ov, visible));
      clip: var(--p-it-lw-l-clip, var(--p-it-lw-m-clip, auto));
      white-space: var(--p-it-lw-l-ws, var(--p-it-lw-m-ws, normal));
    }
    .p-input-number .label:is(span){
      position: var(--p-it-desc-l-pos, var(--p-it-desc-m-pos, static));
      width: var(--p-it-desc-l-w, var(--p-it-desc-m-w, auto));
      height: var(--p-it-desc-l-h, var(--p-it-desc-m-h, auto));
      padding: var(--p-it-desc-l-pad, var(--p-it-desc-m-pad, 0));
      margin: var(--p-it-desc-l-m, var(--p-it-desc-m-m, 0));
      overflow: var(--p-it-desc-l-ov, var(--p-it-desc-m-ov, visible));
      clip: var(--p-it-desc-l-clip, var(--p-it-desc-m-clip, auto));
      white-space: var(--p-it-desc-l-ws, var(--p-it-desc-m-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1760px) {
    .p-input-number .label-wrapper{
      min-width: var(--p-it-lw-xl-minw, var(--p-it-lw-l-minw));
      position: var(--p-it-lw-xl-pos, var(--p-it-lw-l-pos, static));
      width: var(--p-it-lw-xl-w, var(--p-it-lw-l-w, auto));
      height: var(--p-it-lw-xl-h, var(--p-it-lw-l-h, auto));
      padding: var(--p-it-lw-xl-pad, var(--p-it-lw-l-pad, 0));
      margin: var(--p-it-lw-xl-m, var(--p-it-lw-l-m, 0));
      overflow: var(--p-it-lw-xl-ov, var(--p-it-lw-l-ov, visible));
      clip: var(--p-it-lw-xl-clip, var(--p-it-lw-l-clip, auto));
      white-space: var(--p-it-lw-xl-ws, var(--p-it-lw-l-ws, normal));
    }
    .p-input-number .label:is(span){
      position: var(--p-it-desc-xl-pos, var(--p-it-desc-l-pos, static));
      width: var(--p-it-desc-xl-w, var(--p-it-desc-l-w, auto));
      height: var(--p-it-desc-xl-h, var(--p-it-desc-l-h, auto));
      padding: var(--p-it-desc-xl-pad, var(--p-it-desc-l-pad, 0));
      margin: var(--p-it-desc-xl-m, var(--p-it-desc-l-m, 0));
      overflow: var(--p-it-desc-xl-ov, var(--p-it-desc-l-ov, visible));
      clip: var(--p-it-desc-xl-clip, var(--p-it-desc-l-clip, auto));
      white-space: var(--p-it-desc-xl-ws, var(--p-it-desc-l-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1920px) {
    .p-input-number .label-wrapper{
      min-width: var(--p-it-lw-xxl-minw, var(--p-it-lw-xl-minw));
      position: var(--p-it-lw-xxl-pos, var(--p-it-lw-xl-pos, static));
      width: var(--p-it-lw-xxl-w, var(--p-it-lw-xl-w, auto));
      height: var(--p-it-lw-xxl-h, var(--p-it-lw-xl-h, auto));
      padding: var(--p-it-lw-xxl-pad, var(--p-it-lw-xl-pad, 0));
      margin: var(--p-it-lw-xxl-m, var(--p-it-lw-xl-m, 0));
      overflow: var(--p-it-lw-xxl-ov, var(--p-it-lw-xl-ov, visible));
      clip: var(--p-it-lw-xxl-clip, var(--p-it-lw-xl-clip, auto));
      white-space: var(--p-it-lw-xxl-ws, var(--p-it-lw-xl-ws, normal));
    }
    .p-input-number .label:is(span){
      position: var(--p-it-desc-xxl-pos, var(--p-it-desc-xl-pos, static));
      width: var(--p-it-desc-xxl-w, var(--p-it-desc-xl-w, auto));
      height: var(--p-it-desc-xxl-h, var(--p-it-desc-xl-h, auto));
      padding: var(--p-it-desc-xxl-pad, var(--p-it-desc-xl-pad, 0));
      margin: var(--p-it-desc-xxl-m, var(--p-it-desc-xl-m, 0));
      overflow: var(--p-it-desc-xxl-ov, var(--p-it-desc-xl-ov, visible));
      clip: var(--p-it-desc-xxl-clip, var(--p-it-desc-xl-clip, auto));
      white-space: var(--p-it-desc-xxl-ws, var(--p-it-desc-xl-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }`;function Dt(i,a,e){let k,U,w,A,H,D,W,R,tt,C,V,X,nt,f,{$$slots:Y={},$$scope:d}=a;const G=["base","xs","s","m","l","xl","xxl"],Z=(t,l)=>{if(t==null)return l;if(t==="")return!0;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return l}return t},g=t=>t===!0||t==="true"||t==="",E=(t,l,O)=>t&&typeof t=="object"?t[l]===void 0?O:t[l]:t,J=(t,l,O)=>{const p=l==="base"?"--p-it-lw":`--p-it-lw-${l}`,o=l==="base"?"--p-it-desc":`--p-it-desc-${l}`;if(O){t[`${p}-pos`]="absolute",t[`${p}-w`]="1px",t[`${p}-h`]="1px",t[`${p}-pad`]="0",t[`${p}-m`]="-1px",t[`${p}-ov`]="hidden",t[`${p}-clip`]="rect(0, 0, 0, 0)",t[`${p}-ws`]="nowrap",t[`${p}-minw`]="",t[`${o}-pos`]="absolute",t[`${o}-w`]="1px",t[`${o}-h`]="1px",t[`${o}-pad`]="0",t[`${o}-m`]="-1px",t[`${o}-ov`]="hidden",t[`${o}-clip`]="rect(0, 0, 0, 0)",t[`${o}-ws`]="nowrap";return}t[`${p}-pos`]="static",t[`${p}-w`]="auto",t[`${p}-h`]="auto",t[`${p}-pad`]="0",t[`${p}-m`]="0",t[`${p}-ov`]="visible",t[`${p}-clip`]="auto",t[`${p}-ws`]="normal",t[`${p}-minw`]="fit-content",t[`${o}-pos`]="static",t[`${o}-w`]="auto",t[`${o}-h`]="auto",t[`${o}-pad`]="0",t[`${o}-m`]="0",t[`${o}-ov`]="visible",t[`${o}-clip`]="auto",t[`${o}-ws`]="normal"};let{disabled:b}=a,{loading:y}=a,{compact:I}=a,{readOnly:h}=a,{controls:K}=a,{state:u}=a,{message:_}=a,{hideLabel:N}=a,{label:q}=a,{description:L}=a,{value:S}=a,{maxLength:T}=a,{placeholder:z}=a;function r(){return{disabled:b,loading:y,compact:I,readOnly:h,controls:K,state:u,message:_,hideLabel:N,label:q,description:L,value:S,maxLength:T,placeholder:z}}return i.$$set=t=>{e(13,a=ut(ut({},a),gt(t))),"disabled"in t&&e(14,b=t.disabled),"loading"in t&&e(15,y=t.loading),"compact"in t&&e(16,I=t.compact),"readOnly"in t&&e(17,h=t.readOnly),"controls"in t&&e(18,K=t.controls),"state"in t&&e(19,u=t.state),"message"in t&&e(20,_=t.message),"hideLabel"in t&&e(21,N=t.hideLabel),"label"in t&&e(22,q=t.label),"description"in t&&e(23,L=t.description),"value"in t&&e(24,S=t.value),"maxLength"in t&&e(25,T=t.maxLength),"placeholder"in t&&e(26,z=t.placeholder),"$$scope"in t&&e(29,d=t.$$scope)},i.$$.update=()=>{i.$$.dirty[0]&786432&&e(27,k=()=>{const t=g(r().disabled),l=g(r().loading),O=g(r().compact),p=g(r().readOnly),o=g(K),m=u==="success"||u==="error"?u:"none",P=!!(r().message||"")&&(m==="success"||m==="error"),n=Z(r().hideLabel,!1),s={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},M=s[m]||s.none,j={"--p-it-scale":O?"0.64285714":"1","--p-it-radius":O?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-it-border":p?"transparent":M.border,"--p-it-bg":p?"var(--p-color-frosted)":M.bg,"--p-it-color":p?"var(--p-color-contrast-medium)":"var(--p-color-primary)","--p-it-hover":M.hover,"--p-it-cursor":t?"not-allowed":"text","--p-it-wrap-op":t?"0.4":"","--p-it-child-op":t?"0.4":"","--p-it-label-cursor":t||l?"not-allowed":"pointer","--p-it-pe":t||l?"none":"","--p-it-opacity":t?"0.4":"","--p-it-msg":M.message||"","--p-it-msg-op":P?"":"0","--p-it-msg-pos":P?"":"absolute","--p-it-icon-display":P?"inline-flex":"none","--p-it-spinner-display":l?"inline-flex":"none","--p-it-btn-pad":o?"var(--ref-p-input-slotted-padding)":"","--p-it-btn-m":o?"var(--ref-p-input-slotted-margin)":"","--p-it-font":"var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next)"};if(typeof n=="object"&&n!==null){let B=g(E(n,"base",!1));for(const it of G)n[it]!==void 0&&(B=g(E(n,it,!1))),J(j,it,B)}else{const B=g(n);for(const it of G)J(j,it,B)}return j}),i.$$.dirty[0]&4194304&&e(12,U=()=>q||""),i.$$.dirty[0]&8388608&&e(11,w=()=>L||""),i.$$.dirty[0]&524288&&e(10,A=()=>{const t=u||"none",l=r().message||"";return!l||t!=="success"&&t!=="error"?"":l}),i.$$.dirty[0]&524288&&e(9,H=()=>{const t=u||"none";return!(r().message||"")||t!=="success"&&t!=="error"?"":t==="error"?"exclamation":"check"}),i.$$.dirty[0]&524288&&e(8,D=()=>{const t=u||"none";return t==="error"?"error":t==="success"?"success":""}),i.$$.dirty[0]&16777216&&e(7,W=()=>S==null?"":String(S)),i.$$.dirty[0]&33554432&&e(6,R=()=>T==null||T===""?"":String(T)),i.$$.dirty[0]&16384&&e(5,tt=()=>b===!0||b==="true"||b===""),i.$$.dirty[0]&131072&&e(4,C=()=>h===!0||h==="true"||h===""),i.$$.dirty[0]&524288,i.$$.dirty[0]&131072,i.$$.dirty[0]&67108864&&e(2,X=()=>z||""),i.$$.dirty[0]&134217728&&e(1,nt=kt(k())),e(0,f=Ht({controls:a.controls,disabled:a.disabled,loading:a.loading,"read-only":a.readOnly}))},e(3,V=()=>r().loading===!0||r().loading==="true"||r().loading===""?"Loading":""),a=gt(a),[f,nt,X,V,C,tt,R,W,D,H,A,w,U,a,b,y,I,h,K,u,_,N,q,L,S,T,z,k,Y,d]}class Wt extends _t{constructor(a){super(),Lt(this,a,Dt,Pt,St,{disabled:14,loading:15,compact:16,readOnly:17,controls:18,state:19,message:20,hideLabel:21,label:22,description:23,value:24,maxLength:25,placeholder:26},null,[-1,-1])}}export{Wt as default};
