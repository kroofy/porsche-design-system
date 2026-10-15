import{S as we,i as me,s as ue,c as V,a as ae,d as he,v as ne,t as R,b as D,f as W,u as X,g as Y,e as Z,h as pe,j as ge,k as fe,l as i,w as te,m as h,H as xe,n as j,o as $,x as re,p as c,q as oe}from"./svelte-DoO7z26N.js";import{s as be,h as ye}from"./host-DRskmCSE.js";import ie from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const _e=l=>({}),ce=l=>({}),Se=l=>({}),de=l=>({}),Te=l=>({}),ve=l=>({});function ke(l){let a,r,F=`<style>${qe}</style>`,E,m,H,_,G=l[5]()+"",J,K,I,Q,L,S=l[4]()+"",M,N,f,O,g=l[2]()+"",P,T,B,z,q,k,e,t,u,n=l[3]()+"",p,x,o;const A=l[17].label,w=V(A,l,l[16],ve),C=l[17]["label-after"],d=V(C,l,l[16],de),ee=l[17].description,b=V(ee,l,l[16],ce);T=new ie({props:{name:"arrow-head-down",color:"primary"}});const se=l[17].default,y=V(se,l,l[16],null);u=new ie({});let le=[{class:x="p-select"+(l[6].class?` ${l[6].class}`:"")},{"data-pds":"select"},{style:l[1]},l[0]],U={};for(let s=0;s<le.length;s+=1)U=ae(U,le[s]);return{c(){a=h("div"),r=new xe(!1),E=j(),m=h("div"),H=h("div"),_=h("label"),J=$(G),K=h("span"),w&&w.c(),I=h("span"),d&&d.c(),Q=j(),L=h("span"),M=$(S),N=h("span"),b&&b.c(),f=h("button"),O=h("span"),P=$(g),re(T.$$.fragment),B=j(),z=h("div"),q=h("div"),k=h("span"),y&&y.c(),e=j(),t=h("span"),re(u.$$.fragment),p=$(n),r.a=E,c(K,"data-pds-slot","label"),c(_,"class","label"),c(_,"id","label"),c(_,"for","button"),c(I,"data-pds-slot","label-after"),c(H,"class","label-wrapper"),c(N,"data-pds-slot","description"),c(L,"class","label"),c(L,"id","description"),c(f,"type","button"),c(f,"role","combobox"),c(f,"id","button"),c(k,"data-pds-slot",""),c(q,"class","options"),c(q,"id","listbox"),c(t,"class","message"),c(t,"id","message"),c(m,"class","root"),pe(a,U)},m(s,v){fe(s,a,v),r.m(F,a),i(a,E),i(a,m),i(m,H),i(H,_),i(_,J),i(_,K),w&&w.m(K,null),i(H,I),d&&d.m(I,null),i(m,Q),i(m,L),i(L,M),i(L,N),b&&b.m(N,null),i(m,f),i(f,O),i(O,P),te(T,f,null),i(m,B),i(m,z),i(z,q),i(q,k),y&&y.m(k,null),i(m,e),i(m,t),te(u,t,null),i(t,p),o=!0},p(s,[v]){(!o||v&32)&&G!==(G=s[5]()+"")&&W(J,G),w&&w.p&&(!o||v&65536)&&X(w,A,s,s[16],o?Z(A,s[16],v,Te):Y(s[16]),ve),d&&d.p&&(!o||v&65536)&&X(d,C,s,s[16],o?Z(C,s[16],v,Se):Y(s[16]),de),(!o||v&16)&&S!==(S=s[4]()+"")&&W(M,S),b&&b.p&&(!o||v&65536)&&X(b,ee,s,s[16],o?Z(ee,s[16],v,_e):Y(s[16]),ce),(!o||v&4)&&g!==(g=s[2]()+"")&&W(P,g),y&&y.p&&(!o||v&65536)&&X(y,se,s,s[16],o?Z(se,s[16],v,null):Y(s[16]),null),(!o||v&8)&&n!==(n=s[3]()+"")&&W(p,n),pe(a,U=ge(le,[(!o||v&64&&x!==(x="p-select"+(s[6].class?` ${s[6].class}`:"")))&&{class:x},{"data-pds":"select"},(!o||v&2)&&{style:s[1]},v&1&&s[0]]))},i(s){o||(D(w,s),D(d,s),D(b,s),D(T.$$.fragment,s),D(y,s),D(u.$$.fragment,s),o=!0)},o(s){R(w,s),R(d,s),R(b,s),R(T.$$.fragment,s),R(y,s),R(u.$$.fragment,s),o=!1},d(s){s&&he(a),w&&w.d(s),d&&d.d(s),b&&b.d(s),ne(T),y&&y.d(s),ne(u)}}}const qe=`.p-select :where([data-pds-slot]){display:contents}

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .p-select {
    display: block;
    --_p-select-a: var(--p-sel-scale, 1) !important;
    --_p-select-option-a: var(--p-sel-scale, 1) !important;
    --_p-optgroup-a: var(--p-sel-scale, 1) !important;
  }
  .p-select[hidden] {
    display: none !important;
  }
  .p-select [data-pds-slot="label-after"]{
    display: inline-block;
    vertical-align: top;
  }
  .p-select [data-pds-slot="label-after"] > *{
    margin-inline-start: var(--p-spacing-static-xs) !important;
  }
  .p-select .label-after{
    display: inline-block;
    vertical-align: top;
  }
  .p-select button{
    all: unset;
    display: flex;
    align-items: center;
    gap: calc(22.4px * (var(--_p-select-a) - 0.64285714) + 4px);
    height: calc(var(--_p-select-a) * 3.5rem);
    box-sizing: border-box;
    min-width: 0;
    padding-inline: calc(22.4px * (var(--_p-select-a) - 0.64285714) + 8px);
    border: 1px solid var(--p-select-border-color, var(--p-sel-border));
    border-radius: var(--p-sel-radius, var(--p-radius-xl));
    background: var(--p-select-background-color, var(--p-sel-bg));
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-select-text-color, var(--p-color-primary));
    cursor: var(--p-sel-btn-cursor, pointer);
    opacity: var(--p-sel-btn-op);
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      border-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-select:not([disabled]) button:focus-visible {
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-select button img{
    font: var(--p-typescale-sm) var(--p-font-porsche-next);
    width: auto;
    height: var(--p-leading-normal);
    border-radius: var(--p-radius-sm);
  }
  .p-select button span{
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .p-select [popover]{
    all: unset;
    position: absolute;
    z-index: 99;
    padding: calc(11.2px * (var(--_p-select-a) - 0.64285714) + 4px);
    display: none;
    flex-direction: column;
    gap: calc(11.2px * (var(--_p-select-a) - 0.64285714) + 4px);
    max-height: max(calc(224px), calc(50vh - 54px / 2 - 6px * 2));
    box-sizing: border-box;
    overflow: hidden auto;
    scrollbar-width: thin;
    scrollbar-color: auto;
    animation: var(--p-animation-duration, var(--p-duration-sm)) fade-in
      var(--p-ease-in-out) forwards;
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.15));
    background: var(--p-color-canvas);
    border: 1px solid var(--p-color-contrast-low);
    border-radius: var(--p-radius-xl);
  }
  .p-select [popover]:not(:popover-open){
    display: none;
  }
  .p-select [data-pds-slot="selected"]{
    display: block;
    height: 100%;
    flex-grow: 1;
    overflow: hidden;
  }
  .p-select .root{
    display: grid;
    gap: var(--p-spacing-static-xs);
    min-width: calc(
      1rem + var(--p-spacing-static-md) + 1px * 2 +
        calc(
          9px + var(--p-spacing-static-md) / 2 +
            (var(--p-leading-normal) + var(--p-spacing-static-xs) * 2) * 1
        )
    );
  }
  .p-select .options{
    display: flex;
    flex-direction: column;
    gap: calc(11.2px * (var(--_p-select-a) - 0.64285714) + 4px);
  }
  .p-select .icon{
    margin-inline-end: -3px;
    pointer-events: none;
    transform: rotate3d(0, 0, 1, 0.0001deg);
    transition: transform var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
  }
  .p-select .sr-only{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  .p-select .label-wrapper{
    min-width: var(--p-sel-lw-minw);
    position: var(--p-sel-lw-pos, static);
    width: var(--p-sel-lw-w, auto);
    height: var(--p-sel-lw-h, auto);
    padding: var(--p-sel-lw-pad, 0);
    margin: var(--p-sel-lw-m, 0);
    overflow: var(--p-sel-lw-ov, visible);
    clip: var(--p-sel-lw-clip, auto);
    white-space: var(--p-sel-lw-ws, normal);
  }
  .p-select .label{
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    cursor: var(--p-sel-cursor, pointer);
    color: var(--p-color-primary);
    pointer-events: var(--p-sel-pe);
    opacity: var(--p-sel-opacity);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
    display: inline;
  }
  .p-select .label:empty{
    display: none;
  }
  .p-select .label:is(span){
    cursor: unset;
    font-size: var(--p-typescale-xs);
    color: var(--p-color-contrast-high);
    min-width: unset;
    position: var(--p-sel-desc-pos, static);
    width: var(--p-sel-desc-w, auto);
    height: var(--p-sel-desc-h, auto);
    padding: var(--p-sel-desc-pad, 0);
    margin: var(--p-sel-desc-m, 0);
    overflow: var(--p-sel-desc-ov, visible);
    clip: var(--p-sel-desc-clip, auto);
    white-space: var(--p-sel-desc-ws, normal);
    margin-top: calc(-1 * var(--p-spacing-static-xs));
  }
  .p-select .label > [data-pds-slot="label"] > *{
    display: inline !important;
  }
  .p-select .required{
    user-select: none;
  }
  .p-select .message{
    display: flex;
    gap: var(--p-spacing-static-xs);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-sel-msg, inherit);
    opacity: var(--p-sel-msg-op);
    position: var(--p-sel-msg-pos);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      opacity var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-select .message:empty{
    opacity: 0;
    position: absolute;
  }
  .p-select .message .p-icon{
    display: var(--p-sel-icon-display, none);
  }
  @media (forced-colors: active) {
    .p-select button{
      opacity: var(--p-sel-btn-fc-op, var(--p-sel-btn-op, 1));
      color: var(
        --p-sel-btn-fc-color,
        var(--p-select-text-color, var(--p-color-primary))
      );
    }
    .p-select .label{
      opacity: var(--p-sel-fc-opacity, var(--p-sel-opacity, 1));
      color: var(--p-sel-fc-color, var(--p-color-primary));
    }
    .p-select:not([disabled]) button:focus-visible {
      outline-color: Highlight;
    }
  }
  @media (hover: hover) {
    .p-select:not([disabled]) button:hover,
    .p-select:not([disabled]) label:hover ~ button {
      border-color: var(--p-select-border-color, var(--p-sel-hover));
    }
  }
  @media (min-width: 480px) {
    .p-select .label-wrapper{
      min-width: var(--p-sel-lw-xs-minw, var(--p-sel-lw-minw));
      position: var(--p-sel-lw-xs-pos, var(--p-sel-lw-pos, static));
      width: var(--p-sel-lw-xs-w, var(--p-sel-lw-w, auto));
      height: var(--p-sel-lw-xs-h, var(--p-sel-lw-h, auto));
      padding: var(--p-sel-lw-xs-pad, var(--p-sel-lw-pad, 0));
      margin: var(--p-sel-lw-xs-m, var(--p-sel-lw-m, 0));
      overflow: var(--p-sel-lw-xs-ov, var(--p-sel-lw-ov, visible));
      clip: var(--p-sel-lw-xs-clip, var(--p-sel-lw-clip, auto));
      white-space: var(--p-sel-lw-xs-ws, var(--p-sel-lw-ws, normal));
    }
    .p-select .label:is(span){
      position: var(--p-sel-desc-xs-pos, var(--p-sel-desc-pos, static));
      width: var(--p-sel-desc-xs-w, var(--p-sel-desc-w, auto));
      height: var(--p-sel-desc-xs-h, var(--p-sel-desc-h, auto));
      padding: var(--p-sel-desc-xs-pad, var(--p-sel-desc-pad, 0));
      margin: var(--p-sel-desc-xs-m, var(--p-sel-desc-m, 0));
      overflow: var(--p-sel-desc-xs-ov, var(--p-sel-desc-ov, visible));
      clip: var(--p-sel-desc-xs-clip, var(--p-sel-desc-clip, auto));
      white-space: var(--p-sel-desc-xs-ws, var(--p-sel-desc-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 760px) {
    .p-select .label-wrapper{
      min-width: var(
        --p-sel-lw-s-minw,
        var(--p-sel-lw-xs-minw, var(--p-sel-lw-minw))
      );
      position: var(
        --p-sel-lw-s-pos,
        var(--p-sel-lw-xs-pos, var(--p-sel-lw-pos, static))
      );
      width: var(--p-sel-lw-s-w, var(--p-sel-lw-xs-w, var(--p-sel-lw-w, auto)));
      height: var(
        --p-sel-lw-s-h,
        var(--p-sel-lw-xs-h, var(--p-sel-lw-h, auto))
      );
      padding: var(
        --p-sel-lw-s-pad,
        var(--p-sel-lw-xs-pad, var(--p-sel-lw-pad, 0))
      );
      margin: var(--p-sel-lw-s-m, var(--p-sel-lw-xs-m, var(--p-sel-lw-m, 0)));
      overflow: var(
        --p-sel-lw-s-ov,
        var(--p-sel-lw-xs-ov, var(--p-sel-lw-ov, visible))
      );
      clip: var(
        --p-sel-lw-s-clip,
        var(--p-sel-lw-xs-clip, var(--p-sel-lw-clip, auto))
      );
      white-space: var(
        --p-sel-lw-s-ws,
        var(--p-sel-lw-xs-ws, var(--p-sel-lw-ws, normal))
      );
    }
    .p-select .label:is(span){
      position: var(
        --p-sel-desc-s-pos,
        var(--p-sel-desc-xs-pos, var(--p-sel-desc-pos, static))
      );
      width: var(
        --p-sel-desc-s-w,
        var(--p-sel-desc-xs-w, var(--p-sel-desc-w, auto))
      );
      height: var(
        --p-sel-desc-s-h,
        var(--p-sel-desc-xs-h, var(--p-sel-desc-h, auto))
      );
      padding: var(
        --p-sel-desc-s-pad,
        var(--p-sel-desc-xs-pad, var(--p-sel-desc-pad, 0))
      );
      margin: var(
        --p-sel-desc-s-m,
        var(--p-sel-desc-xs-m, var(--p-sel-desc-m, 0))
      );
      overflow: var(
        --p-sel-desc-s-ov,
        var(--p-sel-desc-xs-ov, var(--p-sel-desc-ov, visible))
      );
      clip: var(
        --p-sel-desc-s-clip,
        var(--p-sel-desc-xs-clip, var(--p-sel-desc-clip, auto))
      );
      white-space: var(
        --p-sel-desc-s-ws,
        var(--p-sel-desc-xs-ws, var(--p-sel-desc-ws, normal))
      );
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1000px) {
    .p-select .label-wrapper{
      min-width: var(--p-sel-lw-m-minw, var(--p-sel-lw-s-minw));
      position: var(--p-sel-lw-m-pos, var(--p-sel-lw-s-pos, static));
      width: var(--p-sel-lw-m-w, var(--p-sel-lw-s-w, auto));
      height: var(--p-sel-lw-m-h, var(--p-sel-lw-s-h, auto));
      padding: var(--p-sel-lw-m-pad, var(--p-sel-lw-s-pad, 0));
      margin: var(--p-sel-lw-m-m, var(--p-sel-lw-s-m, 0));
      overflow: var(--p-sel-lw-m-ov, var(--p-sel-lw-s-ov, visible));
      clip: var(--p-sel-lw-m-clip, var(--p-sel-lw-s-clip, auto));
      white-space: var(--p-sel-lw-m-ws, var(--p-sel-lw-s-ws, normal));
    }
    .p-select .label:is(span){
      position: var(--p-sel-desc-m-pos, var(--p-sel-desc-s-pos, static));
      width: var(--p-sel-desc-m-w, var(--p-sel-desc-s-w, auto));
      height: var(--p-sel-desc-m-h, var(--p-sel-desc-s-h, auto));
      padding: var(--p-sel-desc-m-pad, var(--p-sel-desc-s-pad, 0));
      margin: var(--p-sel-desc-m-m, var(--p-sel-desc-s-m, 0));
      overflow: var(--p-sel-desc-m-ov, var(--p-sel-desc-s-ov, visible));
      clip: var(--p-sel-desc-m-clip, var(--p-sel-desc-s-clip, auto));
      white-space: var(--p-sel-desc-m-ws, var(--p-sel-desc-s-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1300px) {
    .p-select .label-wrapper{
      min-width: var(--p-sel-lw-l-minw, var(--p-sel-lw-m-minw));
      position: var(--p-sel-lw-l-pos, var(--p-sel-lw-m-pos, static));
      width: var(--p-sel-lw-l-w, var(--p-sel-lw-m-w, auto));
      height: var(--p-sel-lw-l-h, var(--p-sel-lw-m-h, auto));
      padding: var(--p-sel-lw-l-pad, var(--p-sel-lw-m-pad, 0));
      margin: var(--p-sel-lw-l-m, var(--p-sel-lw-m-m, 0));
      overflow: var(--p-sel-lw-l-ov, var(--p-sel-lw-m-ov, visible));
      clip: var(--p-sel-lw-l-clip, var(--p-sel-lw-m-clip, auto));
      white-space: var(--p-sel-lw-l-ws, var(--p-sel-lw-m-ws, normal));
    }
    .p-select .label:is(span){
      position: var(--p-sel-desc-l-pos, var(--p-sel-desc-m-pos, static));
      width: var(--p-sel-desc-l-w, var(--p-sel-desc-m-w, auto));
      height: var(--p-sel-desc-l-h, var(--p-sel-desc-m-h, auto));
      padding: var(--p-sel-desc-l-pad, var(--p-sel-desc-m-pad, 0));
      margin: var(--p-sel-desc-l-m, var(--p-sel-desc-m-m, 0));
      overflow: var(--p-sel-desc-l-ov, var(--p-sel-desc-m-ov, visible));
      clip: var(--p-sel-desc-l-clip, var(--p-sel-desc-m-clip, auto));
      white-space: var(--p-sel-desc-l-ws, var(--p-sel-desc-m-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1760px) {
    .p-select .label-wrapper{
      min-width: var(--p-sel-lw-xl-minw, var(--p-sel-lw-l-minw));
      position: var(--p-sel-lw-xl-pos, var(--p-sel-lw-l-pos, static));
      width: var(--p-sel-lw-xl-w, var(--p-sel-lw-l-w, auto));
      height: var(--p-sel-lw-xl-h, var(--p-sel-lw-l-h, auto));
      padding: var(--p-sel-lw-xl-pad, var(--p-sel-lw-l-pad, 0));
      margin: var(--p-sel-lw-xl-m, var(--p-sel-lw-l-m, 0));
      overflow: var(--p-sel-lw-xl-ov, var(--p-sel-lw-l-ov, visible));
      clip: var(--p-sel-lw-xl-clip, var(--p-sel-lw-l-clip, auto));
      white-space: var(--p-sel-lw-xl-ws, var(--p-sel-lw-l-ws, normal));
    }
    .p-select .label:is(span){
      position: var(--p-sel-desc-xl-pos, var(--p-sel-desc-l-pos, static));
      width: var(--p-sel-desc-xl-w, var(--p-sel-desc-l-w, auto));
      height: var(--p-sel-desc-xl-h, var(--p-sel-desc-l-h, auto));
      padding: var(--p-sel-desc-xl-pad, var(--p-sel-desc-l-pad, 0));
      margin: var(--p-sel-desc-xl-m, var(--p-sel-desc-l-m, 0));
      overflow: var(--p-sel-desc-xl-ov, var(--p-sel-desc-l-ov, visible));
      clip: var(--p-sel-desc-xl-clip, var(--p-sel-desc-l-clip, auto));
      white-space: var(--p-sel-desc-xl-ws, var(--p-sel-desc-l-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1920px) {
    .p-select .label-wrapper{
      min-width: var(--p-sel-lw-xxl-minw, var(--p-sel-lw-xl-minw));
      position: var(--p-sel-lw-xxl-pos, var(--p-sel-lw-xl-pos, static));
      width: var(--p-sel-lw-xxl-w, var(--p-sel-lw-xl-w, auto));
      height: var(--p-sel-lw-xxl-h, var(--p-sel-lw-xl-h, auto));
      padding: var(--p-sel-lw-xxl-pad, var(--p-sel-lw-xl-pad, 0));
      margin: var(--p-sel-lw-xxl-m, var(--p-sel-lw-xl-m, 0));
      overflow: var(--p-sel-lw-xxl-ov, var(--p-sel-lw-xl-ov, visible));
      clip: var(--p-sel-lw-xxl-clip, var(--p-sel-lw-xl-clip, auto));
      white-space: var(--p-sel-lw-xxl-ws, var(--p-sel-lw-xl-ws, normal));
    }
    .p-select .label:is(span){
      position: var(--p-sel-desc-xxl-pos, var(--p-sel-desc-xl-pos, static));
      width: var(--p-sel-desc-xxl-w, var(--p-sel-desc-xl-w, auto));
      height: var(--p-sel-desc-xxl-h, var(--p-sel-desc-xl-h, auto));
      padding: var(--p-sel-desc-xxl-pad, var(--p-sel-desc-xl-pad, 0));
      margin: var(--p-sel-desc-xxl-m, var(--p-sel-desc-xl-m, 0));
      overflow: var(--p-sel-desc-xxl-ov, var(--p-sel-desc-xl-ov, visible));
      clip: var(--p-sel-desc-xxl-clip, var(--p-sel-desc-xl-clip, auto));
      white-space: var(--p-sel-desc-xxl-ws, var(--p-sel-desc-xl-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }`;function He(l,a,r){let F,E,m,H,_,G,J,{$$slots:K={},$$scope:I}=a;const Q=["base","xs","s","m","l","xl","xxl"],L=(e,t)=>{if(e==null)return t;if(e==="")return!0;if(typeof e=="string"&&e.charAt(0)==="{")try{return JSON.parse(e.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return t}return e},S=e=>e===!0||e==="true"||e==="",M=(e,t,u)=>e&&typeof e=="object"?e[t]===void 0?u:e[t]:e,N=(e,t,u)=>{const n=t==="base"?"--p-sel-lw":`--p-sel-lw-${t}`,p=t==="base"?"--p-sel-desc":`--p-sel-desc-${t}`;if(u){e[`${n}-pos`]="absolute",e[`${n}-w`]="1px",e[`${n}-h`]="1px",e[`${n}-pad`]="0",e[`${n}-m`]="-1px",e[`${n}-ov`]="hidden",e[`${n}-clip`]="rect(0, 0, 0, 0)",e[`${n}-ws`]="nowrap",e[`${n}-minw`]="",e[`${p}-pos`]="absolute",e[`${p}-w`]="1px",e[`${p}-h`]="1px",e[`${p}-pad`]="0",e[`${p}-m`]="-1px",e[`${p}-ov`]="hidden",e[`${p}-clip`]="rect(0, 0, 0, 0)",e[`${p}-ws`]="nowrap";return}e[`${n}-pos`]="static",e[`${n}-w`]="auto",e[`${n}-h`]="auto",e[`${n}-pad`]="0",e[`${n}-m`]="0",e[`${n}-ov`]="visible",e[`${n}-clip`]="auto",e[`${n}-ws`]="normal",e[`${n}-minw`]="fit-content",e[`${p}-pos`]="static",e[`${p}-w`]="auto",e[`${p}-h`]="auto",e[`${p}-pad`]="0",e[`${p}-m`]="0",e[`${p}-ov`]="visible",e[`${p}-clip`]="auto",e[`${p}-ws`]="normal"};let{disabled:f}=a,{compact:O}=a,{state:g}=a,{message:P}=a,{hideLabel:T}=a,{label:B}=a,{description:z}=a,{required:q}=a;function k(){return{disabled:f,compact:O,state:g,message:P,hideLabel:T,label:B,description:z,required:q}}return l.$$set=e=>{r(6,a=ae(ae({},a),oe(e))),"disabled"in e&&r(7,f=e.disabled),"compact"in e&&r(8,O=e.compact),"state"in e&&r(9,g=e.state),"message"in e&&r(10,P=e.message),"hideLabel"in e&&r(11,T=e.hideLabel),"label"in e&&r(12,B=e.label),"description"in e&&r(13,z=e.description),"required"in e&&r(14,q=e.required),"$$scope"in e&&r(16,I=e.$$scope)},l.$$.update=()=>{l.$$.dirty&512&&r(15,F=()=>{const e=S(k().disabled),t=S(k().compact),u=g==="success"||g==="error"?g:"none",p=!!(k().message||"")&&(u==="success"||u==="error"),x=L(k().hideLabel,!1),o={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},A=o[u]||o.none,w={"--p-sel-scale":t?"0.64285714":"1","--p-sel-radius":t?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-sel-bg":A.bg,"--p-sel-border":A.border,"--p-sel-hover":A.hover,"--p-sel-btn-cursor":e?"not-allowed":"pointer","--p-sel-btn-op":e?"0.4":"","--p-sel-btn-fc-op":e?"1":"","--p-sel-btn-fc-color":e?"GrayText":"","--p-sel-cursor":e?"not-allowed":"pointer","--p-sel-pe":e?"none":"","--p-sel-opacity":e?"0.4":"","--p-sel-fc-opacity":e?"1":"","--p-sel-fc-color":e?"GrayText":"","--p-sel-msg":A.message||"","--p-sel-msg-op":p?"":"0","--p-sel-msg-pos":p?"":"absolute","--p-sel-icon-display":p?"inline-flex":"none"};if(typeof x=="object"&&x!==null){let C=S(M(x,"base",!1));for(const d of Q)x[d]!==void 0&&(C=S(M(x,d,!1))),N(w,d,C)}else{const C=S(x);for(const d of Q)N(w,d,C)}return w}),l.$$.dirty&4096&&r(5,E=()=>B||""),l.$$.dirty&8192&&r(4,m=()=>z||""),l.$$.dirty&512&&r(3,H=()=>{const e=g||"none",t=k().message||"";return!t||e!=="success"&&e!=="error"?"":t}),l.$$.dirty&512,l.$$.dirty&512,l.$$.dirty&128,l.$$.dirty&16384,l.$$.dirty&512,l.$$.dirty&512,l.$$.dirty&32768&&r(1,G=be(F())),r(0,J=ye({disabled:a.disabled}))},r(2,_=()=>""),a=oe(a),[J,G,_,H,m,E,a,f,O,g,P,T,B,z,q,F,I,K]}class Oe extends we{constructor(a){super(),me(this,a,He,ke,ue,{disabled:7,compact:8,state:9,message:10,hideLabel:11,label:12,description:13,required:14})}}export{Oe as default};
