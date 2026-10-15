import{S as xt,i as bt,s as yt,c as et,a as ct,d as ht,v as pt,t as Y,b as Z,f as it,u as rt,g as lt,e as st,p as d,h as vt,j as _t,k as ft,l as c,w as ot,m as f,H as St,n as nt,o as at,x as dt,q as ut}from"./svelte-DoO7z26N.js";import{s as Lt,h as Ot}from"./host-DRskmCSE.js";import Tt from"./Spinner-CHLfbpXm.js";import kt from"./Icon-MNhZuw6T.js";import Ht from"./ButtonPure-Dc5XN6Cq.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const At=i=>({}),wt=i=>({}),Gt=i=>({}),mt=i=>({}),qt=i=>({}),gt=i=>({});function zt(i){let n;return{c(){n=at(`Open date picker
    `)},m(e,P){ft(e,n,P)},d(e){e&&ht(n)}}}function Ct(i){let n,e,P=`<style>${It}</style>`,M,w,G,k,B=i[12]()+"",F,D,j,q,R=i[11]()+"",Q,$,x,U,v,V,W,g,E,J,m,z,S,H,u,b,C=i[10]()+"",I,y,L=i[3]()+"",O,A,r;const t=i[27]["label-after"],l=et(t,i,i[28],gt),T=i[27].start,p=et(T,i,i[28],mt);m=new Ht({props:{class:"button",type:"button",icon:"calendar",hideLabel:"true",$$slots:{default:[zt]},$$scope:{ctx:i}}});const o=i[27].end,h=et(o,i,i[28],wt);S=new Tt({props:{"aria-hidden":"true"}}),b=new kt({props:{"aria-hidden":"true",name:i[9](),color:i[8]()}});let K=[{class:A="p-input-date"+(i[13].class?` ${i[13].class}`:"")},{"data-pds":"input-date"},{style:i[1]},i[0]],_={};for(let a=0;a<K.length;a+=1)_=ct(_,K[a]);return{c(){n=f("div"),e=new St(!1),M=nt(),w=f("div"),G=f("div"),k=f("label"),F=at(B),D=f("span"),l&&l.c(),j=nt(),q=f("span"),Q=at(R),$=nt(),x=f("div"),U=f("span"),p&&p.c(),v=f("input"),dt(m.$$.fragment),z=f("span"),h&&h.c(),dt(S.$$.fragment),H=nt(),u=f("span"),dt(b.$$.fragment),I=at(C),y=f("span"),O=at(L),e.a=M,d(k,"class","label"),d(k,"id","label"),d(k,"for","input-date"),d(D,"data-pds-slot","label-after"),d(G,"class","label-wrapper"),d(q,"class","label"),d(q,"id","description"),d(U,"data-pds-slot","start"),d(v,"type","date"),d(v,"id","input-date"),d(v,"dir","auto"),v.value=V=i[7](),d(v,"placeholder",W=i[2]()),v.disabled=g=!!i[5](),v.readOnly=E=!!i[4](),d(v,"maxlength",J=i[6]()),d(z,"data-pds-slot","end"),d(x,"class","wrapper"),d(u,"class","message"),d(u,"id","message"),d(y,"class","loading"),d(y,"id","loading"),d(y,"role","status"),d(w,"class","root"),vt(n,_)},m(a,s){ft(a,n,s),e.m(P,n),c(n,M),c(n,w),c(w,G),c(G,k),c(k,F),c(G,D),l&&l.m(D,null),c(w,j),c(w,q),c(q,Q),c(w,$),c(w,x),c(x,U),p&&p.m(U,null),c(x,v),ot(m,x,null),c(x,z),h&&h.m(z,null),ot(S,x,null),c(w,H),c(w,u),ot(b,u,null),c(u,I),c(w,y),c(y,O),r=!0},p(a,s){(!r||s[0]&4096)&&B!==(B=a[12]()+"")&&it(F,B),l&&l.p&&(!r||s[0]&268435456)&&rt(l,t,a,a[28],r?st(t,a[28],s,qt):lt(a[28]),gt),(!r||s[0]&2048)&&R!==(R=a[11]()+"")&&it(Q,R),p&&p.p&&(!r||s[0]&268435456)&&rt(p,T,a,a[28],r?st(T,a[28],s,Gt):lt(a[28]),mt),(!r||s[0]&128&&V!==(V=a[7]()))&&(v.value=V),(!r||s[0]&4&&W!==(W=a[2]()))&&d(v,"placeholder",W),(!r||s[0]&32&&g!==(g=!!a[5]()))&&(v.disabled=g),(!r||s[0]&16&&E!==(E=!!a[4]()))&&(v.readOnly=E),(!r||s[0]&64&&J!==(J=a[6]()))&&d(v,"maxlength",J);const X={};s[0]&268435456&&(X.$$scope={dirty:s,ctx:a}),m.$set(X),h&&h.p&&(!r||s[0]&268435456)&&rt(h,o,a,a[28],r?st(o,a[28],s,At):lt(a[28]),wt);const N={};s[0]&512&&(N.name=a[9]()),s[0]&256&&(N.color=a[8]()),b.$set(N),(!r||s[0]&1024)&&C!==(C=a[10]()+"")&&it(I,C),(!r||s[0]&8)&&L!==(L=a[3]()+"")&&it(O,L),vt(n,_=_t(K,[(!r||s[0]&8192&&A!==(A="p-input-date"+(a[13].class?` ${a[13].class}`:"")))&&{class:A},{"data-pds":"input-date"},(!r||s[0]&2)&&{style:a[1]},s[0]&1&&a[0]]))},i(a){r||(Z(l,a),Z(p,a),Z(m.$$.fragment,a),Z(h,a),Z(S.$$.fragment,a),Z(b.$$.fragment,a),r=!0)},o(a){Y(l,a),Y(p,a),Y(m.$$.fragment,a),Y(h,a),Y(S.$$.fragment,a),Y(b.$$.fragment,a),r=!1},d(a){a&&ht(n),l&&l.d(a),p&&p.d(a),pt(m),h&&h.d(a),pt(S),pt(b)}}}const It=`.p-input-date :where([data-pds-slot]){display:contents}

  .p-input-date {
    display: block;
    --_p-input-base-a: var(--p-it-scale, 1);
    --ref-p-input-slotted-padding: calc(
      11.2px * (var(--_p-input-base-a) - 0.64285714)
    ) !important;
    --ref-p-input-slotted-margin: calc(
      -1 * calc(11.2px * (var(--_p-input-base-a) - 0.64285714))
    ) !important;
  }
  .p-input-date[hidden] {
    display: none !important;
  }
  .p-input-date:dir(rtl) input::placeholder {
    direction: rtl;
    text-align: end;
  }
  .p-input-date [data-pds-slot="label-after"]{
    display: inline-block;
    vertical-align: top;
  }
  .p-input-date [data-pds-slot="label-after"] > *{
    margin-inline-start: var(--p-spacing-static-xs) !important;
  }
  .p-input-date .label-after{
    display: inline-block;
    vertical-align: top;
  }
  .p-input-date input{
    all: unset;
    display: flex;
    flex: 1;
    align-items: center;
    width: max(100%, 2ch);
    height: 100%;
    font: var(--p-it-font);
    text-overflow: ellipsis;
  }
  .p-input-date input::-webkit-calendar-picker-indicator{
    display: none;
  }
  .p-input-date .root{
    display: grid;
    gap: var(--p-spacing-static-xs);
  }
  .p-input-date .wrapper{
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
  .p-input-date .wrapper > *{
    opacity: var(--p-it-child-op);
  }
  .p-input-date .wrapper:not(:has(input:disabled)):focus-within{
    border-color: var(--p-it-hover);
  }
  .p-input-date .label-wrapper{
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
  .p-input-date .label{
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
  .p-input-date .label:empty{
    display: none;
  }
  .p-input-date .label:is(span){
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
  .p-input-date .label > [data-pds-slot="label"] > *{
    display: inline !important;
  }
  .p-input-date .required{
    user-select: none;
  }
  .p-input-date .message{
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
  .p-input-date .message:empty{
    opacity: 0;
    position: absolute;
  }
  .p-input-date .message .p-icon{
    display: var(--p-it-icon-display, none);
  }
  .p-input-date .p-spinner{
    display: var(--p-it-spinner-display, none);
  }
  .p-input-date .button{
    padding: var(--ref-p-input-slotted-padding);
    margin: var(--ref-p-input-slotted-margin);
  }
  .p-input-date .loading{
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
    .p-input-date .wrapper:not(:has(input:disabled)):focus-within{
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
    .p-input-date[disabled] .wrapper {
      opacity: 1;
      color: GrayText;
      border-color: GrayText;
    }
    .p-input-date[disabled] .wrapper > * {
      opacity: 1;
      color: GrayText;
    }
    .p-input-date[disabled] .label {
      opacity: 1;
      color: GrayText;
    }
  }
  @media (hover: hover) {
    .p-input-date:not([disabled]):not([read-only]):not([loading])
      .wrapper:hover:not(.button:hover),
    .p-input-date:not([disabled]):not([read-only]):not([loading])
      .label-wrapper:hover
      ~ .wrapper {
      border-color: var(--p-it-hover);
    }
  }
  @media (min-width: 480px) {
    .p-input-date .label-wrapper{
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
    .p-input-date .label:is(span){
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
    .p-input-date .label-wrapper{
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
    .p-input-date .label:is(span){
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
    .p-input-date .label-wrapper{
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
    .p-input-date .label:is(span){
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
    .p-input-date .label-wrapper{
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
    .p-input-date .label:is(span){
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
    .p-input-date .label-wrapper{
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
    .p-input-date .label:is(span){
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
    .p-input-date .label-wrapper{
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
    .p-input-date .label:is(span){
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
  }`;function Nt(i,n,e){let P,M,w,G,k,B,F,D,j,q,R,Q,$,x,{$$slots:U={},$$scope:v}=n;const V=["base","xs","s","m","l","xl","xxl"],W=(t,l)=>{if(t==null)return l;if(t==="")return!0;if(typeof t=="string"&&t.charAt(0)==="{")try{return JSON.parse(t.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return l}return t},g=t=>t===!0||t==="true"||t==="",E=(t,l,T)=>t&&typeof t=="object"?t[l]===void 0?T:t[l]:t,J=(t,l,T)=>{const p=l==="base"?"--p-it-lw":`--p-it-lw-${l}`,o=l==="base"?"--p-it-desc":`--p-it-desc-${l}`;if(T){t[`${p}-pos`]="absolute",t[`${p}-w`]="1px",t[`${p}-h`]="1px",t[`${p}-pad`]="0",t[`${p}-m`]="-1px",t[`${p}-ov`]="hidden",t[`${p}-clip`]="rect(0, 0, 0, 0)",t[`${p}-ws`]="nowrap",t[`${p}-minw`]="",t[`${o}-pos`]="absolute",t[`${o}-w`]="1px",t[`${o}-h`]="1px",t[`${o}-pad`]="0",t[`${o}-m`]="-1px",t[`${o}-ov`]="hidden",t[`${o}-clip`]="rect(0, 0, 0, 0)",t[`${o}-ws`]="nowrap";return}t[`${p}-pos`]="static",t[`${p}-w`]="auto",t[`${p}-h`]="auto",t[`${p}-pad`]="0",t[`${p}-m`]="0",t[`${p}-ov`]="visible",t[`${p}-clip`]="auto",t[`${p}-ws`]="normal",t[`${p}-minw`]="fit-content",t[`${o}-pos`]="static",t[`${o}-w`]="auto",t[`${o}-h`]="auto",t[`${o}-pad`]="0",t[`${o}-m`]="0",t[`${o}-ov`]="visible",t[`${o}-clip`]="auto",t[`${o}-ws`]="normal"};let{disabled:m}=n,{loading:z}=n,{compact:S}=n,{readOnly:H}=n,{state:u}=n,{message:b}=n,{hideLabel:C}=n,{label:I}=n,{description:y}=n,{value:L}=n,{maxLength:O}=n,{placeholder:A}=n;function r(){return{disabled:m,loading:z,compact:S,readOnly:H,state:u,message:b,hideLabel:C,label:I,description:y,value:L,maxLength:O,placeholder:A}}return i.$$set=t=>{e(13,n=ct(ct({},n),ut(t))),"disabled"in t&&e(14,m=t.disabled),"loading"in t&&e(15,z=t.loading),"compact"in t&&e(16,S=t.compact),"readOnly"in t&&e(17,H=t.readOnly),"state"in t&&e(18,u=t.state),"message"in t&&e(19,b=t.message),"hideLabel"in t&&e(20,C=t.hideLabel),"label"in t&&e(21,I=t.label),"description"in t&&e(22,y=t.description),"value"in t&&e(23,L=t.value),"maxLength"in t&&e(24,O=t.maxLength),"placeholder"in t&&e(25,A=t.placeholder),"$$scope"in t&&e(28,v=t.$$scope)},i.$$.update=()=>{i.$$.dirty[0]&262144&&e(26,P=()=>{const t=g(r().disabled),l=g(r().loading),T=g(r().compact),p=g(r().readOnly),o=u==="success"||u==="error"?u:"none",K=!!(r().message||"")&&(o==="success"||o==="error"),_=W(r().hideLabel,!1),a={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},s=a[o]||a.none,X={"--p-it-scale":T?"0.64285714":"1","--p-it-radius":T?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-it-border":p?"transparent":s.border,"--p-it-bg":p?"var(--p-color-frosted)":s.bg,"--p-it-color":p?"var(--p-color-contrast-medium)":"var(--p-color-primary)","--p-it-hover":s.hover,"--p-it-cursor":t?"not-allowed":"text","--p-it-wrap-op":t?"0.4":"","--p-it-child-op":t?"0.4":"","--p-it-label-cursor":t||l?"not-allowed":"pointer","--p-it-pe":t||l?"none":"","--p-it-opacity":t?"0.4":"","--p-it-msg":s.message||"","--p-it-msg-op":K?"":"0","--p-it-msg-pos":K?"":"absolute","--p-it-icon-display":K?"inline-flex":"none","--p-it-spinner-display":l?"inline-flex":"none","--p-it-font":"var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next)"};if(typeof _=="object"&&_!==null){let N=g(E(_,"base",!1));for(const tt of V)_[tt]!==void 0&&(N=g(E(_,tt,!1))),J(X,tt,N)}else{const N=g(_);for(const tt of V)J(X,tt,N)}return X}),i.$$.dirty[0]&2097152&&e(12,M=()=>I||""),i.$$.dirty[0]&4194304&&e(11,w=()=>y||""),i.$$.dirty[0]&262144&&e(10,G=()=>{const t=u||"none",l=r().message||"";return!l||t!=="success"&&t!=="error"?"":l}),i.$$.dirty[0]&262144&&e(9,k=()=>{const t=u||"none";return!(r().message||"")||t!=="success"&&t!=="error"?"":t==="error"?"exclamation":"check"}),i.$$.dirty[0]&262144&&e(8,B=()=>{const t=u||"none";return t==="error"?"error":t==="success"?"success":""}),i.$$.dirty[0]&8388608&&e(7,F=()=>L==null?"":String(L)),i.$$.dirty[0]&16777216&&e(6,D=()=>O==null||O===""?"":String(O)),i.$$.dirty[0]&16384&&e(5,j=()=>m===!0||m==="true"||m===""),i.$$.dirty[0]&131072&&e(4,q=()=>H===!0||H==="true"||H===""),i.$$.dirty[0]&262144,i.$$.dirty[0]&131072,i.$$.dirty[0]&33554432&&e(2,Q=()=>A||""),i.$$.dirty[0]&67108864&&e(1,$=Lt(P())),e(0,x=Ot({disabled:n.disabled,loading:n.loading,"read-only":n.readOnly}))},e(3,R=()=>r().loading===!0||r().loading==="true"||r().loading===""?"Loading":""),n=ut(n),[x,$,Q,R,q,j,D,F,B,k,G,w,M,n,m,z,S,H,u,b,C,I,y,L,O,A,P,U,v]}class Ft extends xt{constructor(n){super(),bt(this,n,Nt,Ct,yt,{disabled:14,loading:15,compact:16,readOnly:17,state:18,message:19,hideLabel:20,label:21,description:22,value:23,maxLength:24,placeholder:25},null,[-1,-1])}}export{Ft as default};
