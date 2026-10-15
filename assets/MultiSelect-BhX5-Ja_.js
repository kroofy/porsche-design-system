import{S as vs,i as ws,s as us,c as V,a as es,d as hs,v as ls,t as R,b as D,f as W,u as X,g as Y,e as Z,h as ts,j as gs,k as xs,l as o,w as ps,m as h,H as fs,n as j,o as $,x as rs,p as m,q as is}from"./svelte-DoO7z26N.js";import{s as bs,h as _s}from"./host-DRskmCSE.js";import os from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const ys=n=>({}),ms=n=>({}),Ss=n=>({}),cs=n=>({}),Ts=n=>({}),ds=n=>({});function ks(n){let e,r,F=`<style>${qs}</style>`,B,w,H,y,G=n[5]()+"",E,J,I,Q,L,S=n[4]()+"",K,M,x,N,g=n[2]()+"",O,T,P,z,q,k,s,p,u,l=n[3]()+"",t,f,i;const A=n[17].label,v=V(A,n,n[16],ds),C=n[17]["label-after"],c=V(C,n,n[16],cs),ss=n[17].description,b=V(ss,n,n[16],ms);T=new os({props:{name:"arrow-head-down",color:"primary"}});const as=n[17].default,_=V(as,n,n[16],null);u=new os({});let ns=[{class:f="p-multi-select"+(n[6].class?` ${n[6].class}`:"")},{"data-pds":"multi-select"},{style:n[1]},n[0]],U={};for(let a=0;a<ns.length;a+=1)U=es(U,ns[a]);return{c(){e=h("div"),r=new fs(!1),B=j(),w=h("div"),H=h("div"),y=h("label"),E=$(G),J=h("span"),v&&v.c(),I=h("span"),c&&c.c(),Q=j(),L=h("span"),K=$(S),M=h("span"),b&&b.c(),x=h("button"),N=h("span"),O=$(g),rs(T.$$.fragment),P=j(),z=h("div"),q=h("div"),k=h("span"),_&&_.c(),s=j(),p=h("span"),rs(u.$$.fragment),t=$(l),r.a=B,m(J,"data-pds-slot","label"),m(y,"class","label"),m(y,"id","label"),m(y,"for","button"),m(I,"data-pds-slot","label-after"),m(H,"class","label-wrapper"),m(M,"data-pds-slot","description"),m(L,"class","label"),m(L,"id","description"),m(x,"type","button"),m(x,"role","combobox"),m(x,"id","button"),m(k,"data-pds-slot",""),m(q,"class","options"),m(q,"id","listbox"),m(p,"class","message"),m(p,"id","message"),m(w,"class","root"),ts(e,U)},m(a,d){xs(a,e,d),r.m(F,e),o(e,B),o(e,w),o(w,H),o(H,y),o(y,E),o(y,J),v&&v.m(J,null),o(H,I),c&&c.m(I,null),o(w,Q),o(w,L),o(L,K),o(L,M),b&&b.m(M,null),o(w,x),o(x,N),o(N,O),ps(T,x,null),o(w,P),o(w,z),o(z,q),o(q,k),_&&_.m(k,null),o(w,s),o(w,p),ps(u,p,null),o(p,t),i=!0},p(a,[d]){(!i||d&32)&&G!==(G=a[5]()+"")&&W(E,G),v&&v.p&&(!i||d&65536)&&X(v,A,a,a[16],i?Z(A,a[16],d,Ts):Y(a[16]),ds),c&&c.p&&(!i||d&65536)&&X(c,C,a,a[16],i?Z(C,a[16],d,Ss):Y(a[16]),cs),(!i||d&16)&&S!==(S=a[4]()+"")&&W(K,S),b&&b.p&&(!i||d&65536)&&X(b,ss,a,a[16],i?Z(ss,a[16],d,ys):Y(a[16]),ms),(!i||d&4)&&g!==(g=a[2]()+"")&&W(O,g),_&&_.p&&(!i||d&65536)&&X(_,as,a,a[16],i?Z(as,a[16],d,null):Y(a[16]),null),(!i||d&8)&&l!==(l=a[3]()+"")&&W(t,l),ts(e,U=gs(ns,[(!i||d&64&&f!==(f="p-multi-select"+(a[6].class?` ${a[6].class}`:"")))&&{class:f},{"data-pds":"multi-select"},(!i||d&2)&&{style:a[1]},d&1&&a[0]]))},i(a){i||(D(v,a),D(c,a),D(b,a),D(T.$$.fragment,a),D(_,a),D(u.$$.fragment,a),i=!0)},o(a){R(v,a),R(c,a),R(b,a),R(T.$$.fragment,a),R(_,a),R(u.$$.fragment,a),i=!1},d(a){a&&hs(e),v&&v.d(a),c&&c.d(a),b&&b.d(a),ls(T),_&&_.d(a),ls(u)}}}const qs=`.p-multi-select :where([data-pds-slot]){display:contents}

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .p-multi-select {
    display: block;
    --_p-multi-select-a: var(--p-ms-scale, 1) !important;
    --_p-multi-select-option-a: var(--p-ms-scale, 1) !important;
    --_p-optgroup-a: var(--p-ms-scale, 1) !important;
  }
  .p-multi-select[hidden] {
    display: none !important;
  }
  .p-multi-select [data-pds-slot="label-after"]{
    display: inline-block;
    vertical-align: top;
  }
  .p-multi-select [data-pds-slot="label-after"] > *{
    margin-inline-start: var(--p-spacing-static-xs) !important;
  }
  .p-multi-select .label-after{
    display: inline-block;
    vertical-align: top;
  }
  .p-multi-select button{
    all: unset;
    display: flex;
    align-items: center;
    gap: calc(22.4px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
    height: calc(var(--_p-multi-select-a) * 3.5rem);
    box-sizing: border-box;
    min-width: 0;
    padding-inline: calc(
      22.4px * (var(--_p-multi-select-a) - 0.64285714) + 8px
    );
    border: 1px solid var(--p-multi-select-border-color, var(--p-ms-border));
    border-radius: var(--p-ms-radius, var(--p-radius-xl));
    background: var(--p-multi-select-background-color, var(--p-ms-bg));
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-multi-select-text-color, var(--p-color-primary));
    cursor: var(--p-ms-btn-cursor, pointer);
    opacity: var(--p-ms-btn-op);
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      border-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-multi-select:not([disabled]) button:focus-visible {
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-multi-select button span{
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .p-multi-select [popover]{
    all: unset;
    position: absolute;
    z-index: 99;
    padding: calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
    display: none;
    flex-direction: column;
    gap: calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
    max-height: max(calc(242px), calc(50vh - 54px / 2 - 6px * 2));
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
  .p-multi-select [popover]:not(:popover-open){
    display: none;
  }
  .p-multi-select [data-pds-slot="selected"]{
    display: block;
    height: 100%;
    flex-grow: 1;
    overflow: hidden;
  }
  .p-multi-select .root{
    display: grid;
    gap: var(--p-spacing-static-xs);
    min-width: calc(
      1rem + var(--p-spacing-static-md) + 1px * 2 +
        calc(
          9px + var(--p-spacing-static-md) / 2 +
            (var(--p-leading-normal) + var(--p-spacing-static-xs) * 2) * 2
        )
    );
  }
  .p-multi-select .options{
    display: flex;
    flex-direction: column;
    gap: calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
  }
  .p-multi-select .icon{
    margin-inline-end: -3px;
    pointer-events: none;
    transform: rotate3d(0, 0, 1, 0.0001deg);
    transition: transform var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
  }
  .p-multi-select .sr-only{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  .p-multi-select .label-wrapper{
    min-width: var(--p-ms-lw-minw);
    position: var(--p-ms-lw-pos, static);
    width: var(--p-ms-lw-w, auto);
    height: var(--p-ms-lw-h, auto);
    padding: var(--p-ms-lw-pad, 0);
    margin: var(--p-ms-lw-m, 0);
    overflow: var(--p-ms-lw-ov, visible);
    clip: var(--p-ms-lw-clip, auto);
    white-space: var(--p-ms-lw-ws, normal);
  }
  .p-multi-select .label{
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    cursor: var(--p-ms-cursor, pointer);
    color: var(--p-color-primary);
    pointer-events: var(--p-ms-pe);
    opacity: var(--p-ms-opacity);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
    display: inline;
  }
  .p-multi-select .label:empty{
    display: none;
  }
  .p-multi-select .label:is(span){
    cursor: unset;
    font-size: var(--p-typescale-xs);
    color: var(--p-color-contrast-high);
    min-width: unset;
    position: var(--p-ms-desc-pos, static);
    width: var(--p-ms-desc-w, auto);
    height: var(--p-ms-desc-h, auto);
    padding: var(--p-ms-desc-pad, 0);
    margin: var(--p-ms-desc-m, 0);
    overflow: var(--p-ms-desc-ov, visible);
    clip: var(--p-ms-desc-clip, auto);
    white-space: var(--p-ms-desc-ws, normal);
    margin-top: calc(-1 * var(--p-spacing-static-xs));
  }
  .p-multi-select .label > [data-pds-slot="label"] > *{
    display: inline !important;
  }
  .p-multi-select .required{
    user-select: none;
  }
  .p-multi-select .message{
    display: flex;
    gap: var(--p-spacing-static-xs);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-ms-msg, inherit);
    opacity: var(--p-ms-msg-op);
    position: var(--p-ms-msg-pos);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      opacity var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-multi-select .message:empty{
    opacity: 0;
    position: absolute;
  }
  .p-multi-select .message .p-icon{
    display: var(--p-ms-icon-display, none);
  }
  @media (forced-colors: active) {
    .p-multi-select button{
      opacity: var(--p-ms-btn-fc-op, var(--p-ms-btn-op, 1));
      color: var(
        --p-ms-btn-fc-color,
        var(--p-multi-select-text-color, var(--p-color-primary))
      );
    }
    .p-multi-select .label{
      opacity: var(--p-ms-fc-opacity, var(--p-ms-opacity, 1));
      color: var(--p-ms-fc-color, var(--p-color-primary));
    }
    .p-multi-select:not([disabled]) button:focus-visible {
      outline-color: Highlight;
    }
  }
  @media (hover: hover) {
    .p-multi-select:not([disabled]) button:hover,
    .p-multi-select:not([disabled]) label:hover ~ button {
      border-color: var(--p-multi-select-border-color, var(--p-ms-hover));
    }
  }
  @media (min-width: 480px) {
    .p-multi-select .label-wrapper{
      min-width: var(--p-ms-lw-xs-minw, var(--p-ms-lw-minw));
      position: var(--p-ms-lw-xs-pos, var(--p-ms-lw-pos, static));
      width: var(--p-ms-lw-xs-w, var(--p-ms-lw-w, auto));
      height: var(--p-ms-lw-xs-h, var(--p-ms-lw-h, auto));
      padding: var(--p-ms-lw-xs-pad, var(--p-ms-lw-pad, 0));
      margin: var(--p-ms-lw-xs-m, var(--p-ms-lw-m, 0));
      overflow: var(--p-ms-lw-xs-ov, var(--p-ms-lw-ov, visible));
      clip: var(--p-ms-lw-xs-clip, var(--p-ms-lw-clip, auto));
      white-space: var(--p-ms-lw-xs-ws, var(--p-ms-lw-ws, normal));
    }
    .p-multi-select .label:is(span){
      position: var(--p-ms-desc-xs-pos, var(--p-ms-desc-pos, static));
      width: var(--p-ms-desc-xs-w, var(--p-ms-desc-w, auto));
      height: var(--p-ms-desc-xs-h, var(--p-ms-desc-h, auto));
      padding: var(--p-ms-desc-xs-pad, var(--p-ms-desc-pad, 0));
      margin: var(--p-ms-desc-xs-m, var(--p-ms-desc-m, 0));
      overflow: var(--p-ms-desc-xs-ov, var(--p-ms-desc-ov, visible));
      clip: var(--p-ms-desc-xs-clip, var(--p-ms-desc-clip, auto));
      white-space: var(--p-ms-desc-xs-ws, var(--p-ms-desc-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 760px) {
    .p-multi-select .label-wrapper{
      min-width: var(
        --p-ms-lw-s-minw,
        var(--p-ms-lw-xs-minw, var(--p-ms-lw-minw))
      );
      position: var(
        --p-ms-lw-s-pos,
        var(--p-ms-lw-xs-pos, var(--p-ms-lw-pos, static))
      );
      width: var(--p-ms-lw-s-w, var(--p-ms-lw-xs-w, var(--p-ms-lw-w, auto)));
      height: var(--p-ms-lw-s-h, var(--p-ms-lw-xs-h, var(--p-ms-lw-h, auto)));
      padding: var(
        --p-ms-lw-s-pad,
        var(--p-ms-lw-xs-pad, var(--p-ms-lw-pad, 0))
      );
      margin: var(--p-ms-lw-s-m, var(--p-ms-lw-xs-m, var(--p-ms-lw-m, 0)));
      overflow: var(
        --p-ms-lw-s-ov,
        var(--p-ms-lw-xs-ov, var(--p-ms-lw-ov, visible))
      );
      clip: var(
        --p-ms-lw-s-clip,
        var(--p-ms-lw-xs-clip, var(--p-ms-lw-clip, auto))
      );
      white-space: var(
        --p-ms-lw-s-ws,
        var(--p-ms-lw-xs-ws, var(--p-ms-lw-ws, normal))
      );
    }
    .p-multi-select .label:is(span){
      position: var(
        --p-ms-desc-s-pos,
        var(--p-ms-desc-xs-pos, var(--p-ms-desc-pos, static))
      );
      width: var(
        --p-ms-desc-s-w,
        var(--p-ms-desc-xs-w, var(--p-ms-desc-w, auto))
      );
      height: var(
        --p-ms-desc-s-h,
        var(--p-ms-desc-xs-h, var(--p-ms-desc-h, auto))
      );
      padding: var(
        --p-ms-desc-s-pad,
        var(--p-ms-desc-xs-pad, var(--p-ms-desc-pad, 0))
      );
      margin: var(
        --p-ms-desc-s-m,
        var(--p-ms-desc-xs-m, var(--p-ms-desc-m, 0))
      );
      overflow: var(
        --p-ms-desc-s-ov,
        var(--p-ms-desc-xs-ov, var(--p-ms-desc-ov, visible))
      );
      clip: var(
        --p-ms-desc-s-clip,
        var(--p-ms-desc-xs-clip, var(--p-ms-desc-clip, auto))
      );
      white-space: var(
        --p-ms-desc-s-ws,
        var(--p-ms-desc-xs-ws, var(--p-ms-desc-ws, normal))
      );
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1000px) {
    .p-multi-select .label-wrapper{
      min-width: var(--p-ms-lw-m-minw, var(--p-ms-lw-s-minw));
      position: var(--p-ms-lw-m-pos, var(--p-ms-lw-s-pos, static));
      width: var(--p-ms-lw-m-w, var(--p-ms-lw-s-w, auto));
      height: var(--p-ms-lw-m-h, var(--p-ms-lw-s-h, auto));
      padding: var(--p-ms-lw-m-pad, var(--p-ms-lw-s-pad, 0));
      margin: var(--p-ms-lw-m-m, var(--p-ms-lw-s-m, 0));
      overflow: var(--p-ms-lw-m-ov, var(--p-ms-lw-s-ov, visible));
      clip: var(--p-ms-lw-m-clip, var(--p-ms-lw-s-clip, auto));
      white-space: var(--p-ms-lw-m-ws, var(--p-ms-lw-s-ws, normal));
    }
    .p-multi-select .label:is(span){
      position: var(--p-ms-desc-m-pos, var(--p-ms-desc-s-pos, static));
      width: var(--p-ms-desc-m-w, var(--p-ms-desc-s-w, auto));
      height: var(--p-ms-desc-m-h, var(--p-ms-desc-s-h, auto));
      padding: var(--p-ms-desc-m-pad, var(--p-ms-desc-s-pad, 0));
      margin: var(--p-ms-desc-m-m, var(--p-ms-desc-s-m, 0));
      overflow: var(--p-ms-desc-m-ov, var(--p-ms-desc-s-ov, visible));
      clip: var(--p-ms-desc-m-clip, var(--p-ms-desc-s-clip, auto));
      white-space: var(--p-ms-desc-m-ws, var(--p-ms-desc-s-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1300px) {
    .p-multi-select .label-wrapper{
      min-width: var(--p-ms-lw-l-minw, var(--p-ms-lw-m-minw));
      position: var(--p-ms-lw-l-pos, var(--p-ms-lw-m-pos, static));
      width: var(--p-ms-lw-l-w, var(--p-ms-lw-m-w, auto));
      height: var(--p-ms-lw-l-h, var(--p-ms-lw-m-h, auto));
      padding: var(--p-ms-lw-l-pad, var(--p-ms-lw-m-pad, 0));
      margin: var(--p-ms-lw-l-m, var(--p-ms-lw-m-m, 0));
      overflow: var(--p-ms-lw-l-ov, var(--p-ms-lw-m-ov, visible));
      clip: var(--p-ms-lw-l-clip, var(--p-ms-lw-m-clip, auto));
      white-space: var(--p-ms-lw-l-ws, var(--p-ms-lw-m-ws, normal));
    }
    .p-multi-select .label:is(span){
      position: var(--p-ms-desc-l-pos, var(--p-ms-desc-m-pos, static));
      width: var(--p-ms-desc-l-w, var(--p-ms-desc-m-w, auto));
      height: var(--p-ms-desc-l-h, var(--p-ms-desc-m-h, auto));
      padding: var(--p-ms-desc-l-pad, var(--p-ms-desc-m-pad, 0));
      margin: var(--p-ms-desc-l-m, var(--p-ms-desc-m-m, 0));
      overflow: var(--p-ms-desc-l-ov, var(--p-ms-desc-m-ov, visible));
      clip: var(--p-ms-desc-l-clip, var(--p-ms-desc-m-clip, auto));
      white-space: var(--p-ms-desc-l-ws, var(--p-ms-desc-m-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1760px) {
    .p-multi-select .label-wrapper{
      min-width: var(--p-ms-lw-xl-minw, var(--p-ms-lw-l-minw));
      position: var(--p-ms-lw-xl-pos, var(--p-ms-lw-l-pos, static));
      width: var(--p-ms-lw-xl-w, var(--p-ms-lw-l-w, auto));
      height: var(--p-ms-lw-xl-h, var(--p-ms-lw-l-h, auto));
      padding: var(--p-ms-lw-xl-pad, var(--p-ms-lw-l-pad, 0));
      margin: var(--p-ms-lw-xl-m, var(--p-ms-lw-l-m, 0));
      overflow: var(--p-ms-lw-xl-ov, var(--p-ms-lw-l-ov, visible));
      clip: var(--p-ms-lw-xl-clip, var(--p-ms-lw-l-clip, auto));
      white-space: var(--p-ms-lw-xl-ws, var(--p-ms-lw-l-ws, normal));
    }
    .p-multi-select .label:is(span){
      position: var(--p-ms-desc-xl-pos, var(--p-ms-desc-l-pos, static));
      width: var(--p-ms-desc-xl-w, var(--p-ms-desc-l-w, auto));
      height: var(--p-ms-desc-xl-h, var(--p-ms-desc-l-h, auto));
      padding: var(--p-ms-desc-xl-pad, var(--p-ms-desc-l-pad, 0));
      margin: var(--p-ms-desc-xl-m, var(--p-ms-desc-l-m, 0));
      overflow: var(--p-ms-desc-xl-ov, var(--p-ms-desc-l-ov, visible));
      clip: var(--p-ms-desc-xl-clip, var(--p-ms-desc-l-clip, auto));
      white-space: var(--p-ms-desc-xl-ws, var(--p-ms-desc-l-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1920px) {
    .p-multi-select .label-wrapper{
      min-width: var(--p-ms-lw-xxl-minw, var(--p-ms-lw-xl-minw));
      position: var(--p-ms-lw-xxl-pos, var(--p-ms-lw-xl-pos, static));
      width: var(--p-ms-lw-xxl-w, var(--p-ms-lw-xl-w, auto));
      height: var(--p-ms-lw-xxl-h, var(--p-ms-lw-xl-h, auto));
      padding: var(--p-ms-lw-xxl-pad, var(--p-ms-lw-xl-pad, 0));
      margin: var(--p-ms-lw-xxl-m, var(--p-ms-lw-xl-m, 0));
      overflow: var(--p-ms-lw-xxl-ov, var(--p-ms-lw-xl-ov, visible));
      clip: var(--p-ms-lw-xxl-clip, var(--p-ms-lw-xl-clip, auto));
      white-space: var(--p-ms-lw-xxl-ws, var(--p-ms-lw-xl-ws, normal));
    }
    .p-multi-select .label:is(span){
      position: var(--p-ms-desc-xxl-pos, var(--p-ms-desc-xl-pos, static));
      width: var(--p-ms-desc-xxl-w, var(--p-ms-desc-xl-w, auto));
      height: var(--p-ms-desc-xxl-h, var(--p-ms-desc-xl-h, auto));
      padding: var(--p-ms-desc-xxl-pad, var(--p-ms-desc-xl-pad, 0));
      margin: var(--p-ms-desc-xxl-m, var(--p-ms-desc-xl-m, 0));
      overflow: var(--p-ms-desc-xxl-ov, var(--p-ms-desc-xl-ov, visible));
      clip: var(--p-ms-desc-xxl-clip, var(--p-ms-desc-xl-clip, auto));
      white-space: var(--p-ms-desc-xxl-ws, var(--p-ms-desc-xl-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }`;function Hs(n,e,r){let F,B,w,H,y,G,E,{$$slots:J={},$$scope:I}=e;const Q=["base","xs","s","m","l","xl","xxl"],L=(s,p)=>{if(s==null)return p;if(s==="")return!0;if(typeof s=="string"&&s.charAt(0)==="{")try{return JSON.parse(s.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return p}return s},S=s=>s===!0||s==="true"||s==="",K=(s,p,u)=>s&&typeof s=="object"?s[p]===void 0?u:s[p]:s,M=(s,p,u)=>{const l=p==="base"?"--p-ms-lw":`--p-ms-lw-${p}`,t=p==="base"?"--p-ms-desc":`--p-ms-desc-${p}`;if(u){s[`${l}-pos`]="absolute",s[`${l}-w`]="1px",s[`${l}-h`]="1px",s[`${l}-pad`]="0",s[`${l}-m`]="-1px",s[`${l}-ov`]="hidden",s[`${l}-clip`]="rect(0, 0, 0, 0)",s[`${l}-ws`]="nowrap",s[`${l}-minw`]="",s[`${t}-pos`]="absolute",s[`${t}-w`]="1px",s[`${t}-h`]="1px",s[`${t}-pad`]="0",s[`${t}-m`]="-1px",s[`${t}-ov`]="hidden",s[`${t}-clip`]="rect(0, 0, 0, 0)",s[`${t}-ws`]="nowrap";return}s[`${l}-pos`]="static",s[`${l}-w`]="auto",s[`${l}-h`]="auto",s[`${l}-pad`]="0",s[`${l}-m`]="0",s[`${l}-ov`]="visible",s[`${l}-clip`]="auto",s[`${l}-ws`]="normal",s[`${l}-minw`]="fit-content",s[`${t}-pos`]="static",s[`${t}-w`]="auto",s[`${t}-h`]="auto",s[`${t}-pad`]="0",s[`${t}-m`]="0",s[`${t}-ov`]="visible",s[`${t}-clip`]="auto",s[`${t}-ws`]="normal"};let{disabled:x}=e,{compact:N}=e,{state:g}=e,{message:O}=e,{hideLabel:T}=e,{label:P}=e,{description:z}=e,{required:q}=e;function k(){return{disabled:x,compact:N,state:g,message:O,hideLabel:T,label:P,description:z,required:q}}return n.$$set=s=>{r(6,e=es(es({},e),is(s))),"disabled"in s&&r(7,x=s.disabled),"compact"in s&&r(8,N=s.compact),"state"in s&&r(9,g=s.state),"message"in s&&r(10,O=s.message),"hideLabel"in s&&r(11,T=s.hideLabel),"label"in s&&r(12,P=s.label),"description"in s&&r(13,z=s.description),"required"in s&&r(14,q=s.required),"$$scope"in s&&r(16,I=s.$$scope)},n.$$.update=()=>{n.$$.dirty&512&&r(15,F=()=>{const s=S(k().disabled),p=S(k().compact),u=g==="success"||g==="error"?g:"none",t=!!(k().message||"")&&(u==="success"||u==="error"),f=L(k().hideLabel,!1),i={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},A=i[u]||i.none,v={"--p-ms-scale":p?"0.64285714":"1","--p-ms-radius":p?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-ms-bg":A.bg,"--p-ms-border":A.border,"--p-ms-hover":A.hover,"--p-ms-btn-cursor":s?"not-allowed":"pointer","--p-ms-btn-op":s?"0.4":"","--p-ms-btn-fc-op":s?"1":"","--p-ms-btn-fc-color":s?"GrayText":"","--p-ms-cursor":s?"not-allowed":"pointer","--p-ms-pe":s?"none":"","--p-ms-opacity":s?"0.4":"","--p-ms-fc-opacity":s?"1":"","--p-ms-fc-color":s?"GrayText":"","--p-ms-msg":A.message||"","--p-ms-msg-op":t?"":"0","--p-ms-msg-pos":t?"":"absolute","--p-ms-icon-display":t?"inline-flex":"none"};if(typeof f=="object"&&f!==null){let C=S(K(f,"base",!1));for(const c of Q)f[c]!==void 0&&(C=S(K(f,c,!1))),M(v,c,C)}else{const C=S(f);for(const c of Q)M(v,c,C)}return v}),n.$$.dirty&4096&&r(5,B=()=>P||""),n.$$.dirty&8192&&r(4,w=()=>z||""),n.$$.dirty&512&&r(3,H=()=>{const s=g||"none",p=k().message||"";return!p||s!=="success"&&s!=="error"?"":p}),n.$$.dirty&512,n.$$.dirty&512,n.$$.dirty&128,n.$$.dirty&16384,n.$$.dirty&512,n.$$.dirty&512,n.$$.dirty&32768&&r(1,G=bs(F())),r(0,E=_s({disabled:e.disabled}))},r(2,y=()=>""),e=is(e),[E,G,y,H,w,B,e,x,N,g,O,T,P,z,q,F,I,J]}class Ns extends vs{constructor(e){super(),ws(this,e,Hs,ks,us,{disabled:7,compact:8,state:9,message:10,hideLabel:11,label:12,description:13,required:14})}}export{Ns as default};
