import{S as ep,i as sp,s as rp,c as lp,a as Z,d as ip,v as tp,t as $,b as pp,f as V,u as op,g as dp,e as vp,h as ap,j as wp,k as mp,l as t,w as up,m as v,H as hp,n as W,o as X,x as gp,p as w,q as np}from"./svelte-DoO7z26N.js";import{s as fp,h as xp}from"./host-DRskmCSE.js";import bp from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const yp=n=>({}),cp=n=>({});function _p(n){let s,r,K=`<style>${Sp}</style>`,O,o,k,y,C=n[8]()+"",B,z,M,q,D=n[7]()+"",E,R,_,h,P,G,g,f,L,d,H,F,x,m,S=n[6]()+"",I,T,N=n[2]()+"",u,p,c;const b=n[24]["label-after"],e=lp(b,n,n[23],cp);m=new bp({props:{"aria-hidden":"true",name:n[5](),color:n[4]()}});let i=[{class:p="p-pin-code"+(n[9].class?` ${n[9].class}`:"")},{"data-pds":"pin-code"},{style:n[1]},n[0]],A={};for(let a=0;a<i.length;a+=1)A=Z(A,i[a]);return{c(){s=v("div"),r=new hp(!1),O=W(),o=v("fieldset"),k=v("div"),y=v("label"),B=X(C),z=v("span"),e&&e.c(),M=W(),q=v("span"),E=X(D),R=W(),_=v("div"),h=v("input"),G=v("input"),f=v("input"),d=v("input"),F=W(),x=v("span"),gp(m.$$.fragment),I=X(S),T=v("span"),u=X(N),r.a=O,w(y,"class","label"),w(y,"id","label"),w(y,"for","current-input"),w(z,"data-pds-slot","label-after"),w(k,"class","label-wrapper"),w(q,"class","label"),w(q,"id","description"),h.disabled=P=!!n[3](),G.disabled=g=!!n[3](),f.disabled=L=!!n[3](),d.disabled=H=!!n[3](),w(_,"class","wrapper"),w(x,"class","message"),w(x,"id","message"),w(T,"class","loading"),w(T,"id","loading"),w(o,"class","root"),ap(s,A)},m(a,l){mp(a,s,l),r.m(K,s),t(s,O),t(s,o),t(o,k),t(k,y),t(y,B),t(k,z),e&&e.m(z,null),t(o,M),t(o,q),t(q,E),t(o,R),t(o,_),t(_,h),t(_,G),t(_,f),t(_,d),t(o,F),t(o,x),up(m,x,null),t(x,I),t(o,T),t(T,u),c=!0},p(a,l){(!c||l[0]&256)&&C!==(C=a[8]()+"")&&V(B,C),e&&e.p&&(!c||l[0]&8388608)&&op(e,b,a,a[23],c?vp(b,a[23],l,yp):dp(a[23]),cp),(!c||l[0]&128)&&D!==(D=a[7]()+"")&&V(E,D),(!c||l[0]&8&&P!==(P=!!a[3]()))&&(h.disabled=P),(!c||l[0]&8&&g!==(g=!!a[3]()))&&(G.disabled=g),(!c||l[0]&8&&L!==(L=!!a[3]()))&&(f.disabled=L),(!c||l[0]&8&&H!==(H=!!a[3]()))&&(d.disabled=H);const J={};l[0]&32&&(J.name=a[5]()),l[0]&16&&(J.color=a[4]()),m.$set(J),(!c||l[0]&64)&&S!==(S=a[6]()+"")&&V(I,S),(!c||l[0]&4)&&N!==(N=a[2]()+"")&&V(u,N),ap(s,A=wp(i,[(!c||l[0]&512&&p!==(p="p-pin-code"+(a[9].class?` ${a[9].class}`:"")))&&{class:p},{"data-pds":"pin-code"},(!c||l[0]&2)&&{style:a[1]},l[0]&1&&a[0]]))},i(a){c||(pp(e,a),pp(m.$$.fragment,a),c=!0)},o(a){$(e,a),$(m.$$.fragment,a),c=!1},d(a){a&&ip(s),e&&e.d(a),tp(m)}}}const Sp=`.p-pin-code :where([data-pds-slot]){display:contents}

  .p-pin-code {
    display: block;
    --_p-pin-code-a: var(--p-pc-scale, 1);
  }
  .p-pin-code[hidden] {
    display: none !important;
  }
  .p-pin-code [data-pds-slot="label-after"]{
    display: inline-block;
    vertical-align: top;
  }
  .p-pin-code [data-pds-slot="label-after"] > *{
    margin-inline-start: var(--p-spacing-static-xs) !important;
  }
  .p-pin-code .label-after{
    display: inline-block;
    vertical-align: top;
  }
  .p-pin-code input{
    all: unset;
    display: block;
    width: auto;
    min-width: calc(1ch + var(--p-pc-pad) * 2 + 1px * 2);
    max-width: calc(var(--_p-pin-code-a) * 3.5rem);
    height: calc(var(--_p-pin-code-a) * 3.5rem);
    padding: var(--p-pc-pad);
    box-sizing: border-box;
    border: 1px solid var(--p-pc-border);
    border-radius: var(--p-pc-radius, var(--p-radius-xl));
    background: var(--p-pc-bg);
    font: var(--p-pc-font);
    color: var(--p-color-primary);
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      border-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    text-overflow: ellipsis;
    cursor: var(--p-pc-cursor, text);
    text-align: center;
    opacity: var(--p-pc-input-op);
  }
  .p-pin-code input:focus-visible{
    border-color: var(--p-pc-hover);
  }
  .p-pin-code .root{
    all: unset;
    display: grid;
    gap: var(--p-spacing-static-xs);
  }
  .p-pin-code .wrapper{
    position: relative;
    display: grid;
    grid-template-columns: var(--p-pc-cols);
    justify-self: flex-start;
    gap: var(--p-pc-pad);
  }
  .p-pin-code .spinner{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .p-pin-code .loading{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
  .p-pin-code .label-wrapper{
    min-width: var(--p-pc-lw-minw);
    position: var(--p-pc-lw-pos, static);
    width: var(--p-pc-lw-w, auto);
    height: var(--p-pc-lw-h, auto);
    padding: var(--p-pc-lw-pad, 0);
    margin: var(--p-pc-lw-m, 0);
    overflow: var(--p-pc-lw-ov, visible);
    clip: var(--p-pc-lw-clip, auto);
    white-space: var(--p-pc-lw-ws, normal);
  }
  .p-pin-code .label{
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    cursor: var(--p-pc-label-cursor, pointer);
    color: var(--p-color-primary);
    pointer-events: var(--p-pc-pe);
    opacity: var(--p-pc-opacity);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
    display: inline;
  }
  .p-pin-code .label:empty{
    display: none;
  }
  .p-pin-code .label:is(span){
    cursor: unset;
    font-size: var(--p-typescale-xs);
    color: var(--p-color-contrast-high);
    min-width: unset;
    position: var(--p-pc-desc-pos, static);
    width: var(--p-pc-desc-w, auto);
    height: var(--p-pc-desc-h, auto);
    padding: var(--p-pc-desc-pad, 0);
    margin: var(--p-pc-desc-m, 0);
    overflow: var(--p-pc-desc-ov, visible);
    clip: var(--p-pc-desc-clip, auto);
    white-space: var(--p-pc-desc-ws, normal);
    margin-top: calc(-1 * var(--p-spacing-static-xs));
  }
  .p-pin-code .label > [data-pds-slot="label"] > *{
    display: inline !important;
  }
  .p-pin-code .required{
    user-select: none;
  }
  .p-pin-code .message{
    display: flex;
    gap: var(--p-spacing-static-xs);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-pc-msg, inherit);
    opacity: var(--p-pc-msg-op);
    position: var(--p-pc-msg-pos);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      opacity var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-pin-code .message:empty{
    opacity: 0;
    position: absolute;
  }
  .p-pin-code .message .p-icon{
    display: var(--p-pc-icon-display, none);
  }
  @media (forced-colors: active) {
    .p-pin-code input{
      opacity: var(--p-pc-input-fc-op, var(--p-pc-input-op, 1));
      color: var(--p-pc-input-fc-color, var(--p-color-primary));
    }
    .p-pin-code .label{
      opacity: var(--p-pc-fc-op, var(--p-pc-opacity, 1));
      color: var(--p-pc-fc-color, var(--p-color-primary));
    }
  }
  @media (hover: hover) {
    .p-pin-code:not([disabled]):not([loading]) input:hover {
      border-color: var(--p-pc-hover);
    }
  }
  @media (min-width: 480px) {
    .p-pin-code .label-wrapper{
      min-width: var(--p-pc-lw-xs-minw, var(--p-pc-lw-minw));
      position: var(--p-pc-lw-xs-pos, var(--p-pc-lw-pos, static));
      width: var(--p-pc-lw-xs-w, var(--p-pc-lw-w, auto));
      height: var(--p-pc-lw-xs-h, var(--p-pc-lw-h, auto));
      padding: var(--p-pc-lw-xs-pad, var(--p-pc-lw-pad, 0));
      margin: var(--p-pc-lw-xs-m, var(--p-pc-lw-m, 0));
      overflow: var(--p-pc-lw-xs-ov, var(--p-pc-lw-ov, visible));
      clip: var(--p-pc-lw-xs-clip, var(--p-pc-lw-clip, auto));
      white-space: var(--p-pc-lw-xs-ws, var(--p-pc-lw-ws, normal));
    }
    .p-pin-code .label:is(span){
      position: var(--p-pc-desc-xs-pos, var(--p-pc-desc-pos, static));
      width: var(--p-pc-desc-xs-w, var(--p-pc-desc-w, auto));
      height: var(--p-pc-desc-xs-h, var(--p-pc-desc-h, auto));
      padding: var(--p-pc-desc-xs-pad, var(--p-pc-desc-pad, 0));
      margin: var(--p-pc-desc-xs-m, var(--p-pc-desc-m, 0));
      overflow: var(--p-pc-desc-xs-ov, var(--p-pc-desc-ov, visible));
      clip: var(--p-pc-desc-xs-clip, var(--p-pc-desc-clip, auto));
      white-space: var(--p-pc-desc-xs-ws, var(--p-pc-desc-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 760px) {
    .p-pin-code .label-wrapper{
      min-width: var(
        --p-pc-lw-s-minw,
        var(--p-pc-lw-xs-minw, var(--p-pc-lw-minw))
      );
      position: var(
        --p-pc-lw-s-pos,
        var(--p-pc-lw-xs-pos, var(--p-pc-lw-pos, static))
      );
      width: var(--p-pc-lw-s-w, var(--p-pc-lw-xs-w, var(--p-pc-lw-w, auto)));
      height: var(--p-pc-lw-s-h, var(--p-pc-lw-xs-h, var(--p-pc-lw-h, auto)));
      padding: var(
        --p-pc-lw-s-pad,
        var(--p-pc-lw-xs-pad, var(--p-pc-lw-pad, 0))
      );
      margin: var(--p-pc-lw-s-m, var(--p-pc-lw-xs-m, var(--p-pc-lw-m, 0)));
      overflow: var(
        --p-pc-lw-s-ov,
        var(--p-pc-lw-xs-ov, var(--p-pc-lw-ov, visible))
      );
      clip: var(
        --p-pc-lw-s-clip,
        var(--p-pc-lw-xs-clip, var(--p-pc-lw-clip, auto))
      );
      white-space: var(
        --p-pc-lw-s-ws,
        var(--p-pc-lw-xs-ws, var(--p-pc-lw-ws, normal))
      );
    }
    .p-pin-code .label:is(span){
      position: var(
        --p-pc-desc-s-pos,
        var(--p-pc-desc-xs-pos, var(--p-pc-desc-pos, static))
      );
      width: var(
        --p-pc-desc-s-w,
        var(--p-pc-desc-xs-w, var(--p-pc-desc-w, auto))
      );
      height: var(
        --p-pc-desc-s-h,
        var(--p-pc-desc-xs-h, var(--p-pc-desc-h, auto))
      );
      padding: var(
        --p-pc-desc-s-pad,
        var(--p-pc-desc-xs-pad, var(--p-pc-desc-pad, 0))
      );
      margin: var(
        --p-pc-desc-s-m,
        var(--p-pc-desc-xs-m, var(--p-pc-desc-m, 0))
      );
      overflow: var(
        --p-pc-desc-s-ov,
        var(--p-pc-desc-xs-ov, var(--p-pc-desc-ov, visible))
      );
      clip: var(
        --p-pc-desc-s-clip,
        var(--p-pc-desc-xs-clip, var(--p-pc-desc-clip, auto))
      );
      white-space: var(
        --p-pc-desc-s-ws,
        var(--p-pc-desc-xs-ws, var(--p-pc-desc-ws, normal))
      );
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1000px) {
    .p-pin-code .label-wrapper{
      min-width: var(--p-pc-lw-m-minw, var(--p-pc-lw-s-minw));
      position: var(--p-pc-lw-m-pos, var(--p-pc-lw-s-pos, static));
      width: var(--p-pc-lw-m-w, var(--p-pc-lw-s-w, auto));
      height: var(--p-pc-lw-m-h, var(--p-pc-lw-s-h, auto));
      padding: var(--p-pc-lw-m-pad, var(--p-pc-lw-s-pad, 0));
      margin: var(--p-pc-lw-m-m, var(--p-pc-lw-s-m, 0));
      overflow: var(--p-pc-lw-m-ov, var(--p-pc-lw-s-ov, visible));
      clip: var(--p-pc-lw-m-clip, var(--p-pc-lw-s-clip, auto));
      white-space: var(--p-pc-lw-m-ws, var(--p-pc-lw-s-ws, normal));
    }
    .p-pin-code .label:is(span){
      position: var(--p-pc-desc-m-pos, var(--p-pc-desc-s-pos, static));
      width: var(--p-pc-desc-m-w, var(--p-pc-desc-s-w, auto));
      height: var(--p-pc-desc-m-h, var(--p-pc-desc-s-h, auto));
      padding: var(--p-pc-desc-m-pad, var(--p-pc-desc-s-pad, 0));
      margin: var(--p-pc-desc-m-m, var(--p-pc-desc-s-m, 0));
      overflow: var(--p-pc-desc-m-ov, var(--p-pc-desc-s-ov, visible));
      clip: var(--p-pc-desc-m-clip, var(--p-pc-desc-s-clip, auto));
      white-space: var(--p-pc-desc-m-ws, var(--p-pc-desc-s-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1300px) {
    .p-pin-code .label-wrapper{
      min-width: var(--p-pc-lw-l-minw, var(--p-pc-lw-m-minw));
      position: var(--p-pc-lw-l-pos, var(--p-pc-lw-m-pos, static));
      width: var(--p-pc-lw-l-w, var(--p-pc-lw-m-w, auto));
      height: var(--p-pc-lw-l-h, var(--p-pc-lw-m-h, auto));
      padding: var(--p-pc-lw-l-pad, var(--p-pc-lw-m-pad, 0));
      margin: var(--p-pc-lw-l-m, var(--p-pc-lw-m-m, 0));
      overflow: var(--p-pc-lw-l-ov, var(--p-pc-lw-m-ov, visible));
      clip: var(--p-pc-lw-l-clip, var(--p-pc-lw-m-clip, auto));
      white-space: var(--p-pc-lw-l-ws, var(--p-pc-lw-m-ws, normal));
    }
    .p-pin-code .label:is(span){
      position: var(--p-pc-desc-l-pos, var(--p-pc-desc-m-pos, static));
      width: var(--p-pc-desc-l-w, var(--p-pc-desc-m-w, auto));
      height: var(--p-pc-desc-l-h, var(--p-pc-desc-m-h, auto));
      padding: var(--p-pc-desc-l-pad, var(--p-pc-desc-m-pad, 0));
      margin: var(--p-pc-desc-l-m, var(--p-pc-desc-m-m, 0));
      overflow: var(--p-pc-desc-l-ov, var(--p-pc-desc-m-ov, visible));
      clip: var(--p-pc-desc-l-clip, var(--p-pc-desc-m-clip, auto));
      white-space: var(--p-pc-desc-l-ws, var(--p-pc-desc-m-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1760px) {
    .p-pin-code .label-wrapper{
      min-width: var(--p-pc-lw-xl-minw, var(--p-pc-lw-l-minw));
      position: var(--p-pc-lw-xl-pos, var(--p-pc-lw-l-pos, static));
      width: var(--p-pc-lw-xl-w, var(--p-pc-lw-l-w, auto));
      height: var(--p-pc-lw-xl-h, var(--p-pc-lw-l-h, auto));
      padding: var(--p-pc-lw-xl-pad, var(--p-pc-lw-l-pad, 0));
      margin: var(--p-pc-lw-xl-m, var(--p-pc-lw-l-m, 0));
      overflow: var(--p-pc-lw-xl-ov, var(--p-pc-lw-l-ov, visible));
      clip: var(--p-pc-lw-xl-clip, var(--p-pc-lw-l-clip, auto));
      white-space: var(--p-pc-lw-xl-ws, var(--p-pc-lw-l-ws, normal));
    }
    .p-pin-code .label:is(span){
      position: var(--p-pc-desc-xl-pos, var(--p-pc-desc-l-pos, static));
      width: var(--p-pc-desc-xl-w, var(--p-pc-desc-l-w, auto));
      height: var(--p-pc-desc-xl-h, var(--p-pc-desc-l-h, auto));
      padding: var(--p-pc-desc-xl-pad, var(--p-pc-desc-l-pad, 0));
      margin: var(--p-pc-desc-xl-m, var(--p-pc-desc-l-m, 0));
      overflow: var(--p-pc-desc-xl-ov, var(--p-pc-desc-l-ov, visible));
      clip: var(--p-pc-desc-xl-clip, var(--p-pc-desc-l-clip, auto));
      white-space: var(--p-pc-desc-xl-ws, var(--p-pc-desc-l-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1920px) {
    .p-pin-code .label-wrapper{
      min-width: var(--p-pc-lw-xxl-minw, var(--p-pc-lw-xl-minw));
      position: var(--p-pc-lw-xxl-pos, var(--p-pc-lw-xl-pos, static));
      width: var(--p-pc-lw-xxl-w, var(--p-pc-lw-xl-w, auto));
      height: var(--p-pc-lw-xxl-h, var(--p-pc-lw-xl-h, auto));
      padding: var(--p-pc-lw-xxl-pad, var(--p-pc-lw-xl-pad, 0));
      margin: var(--p-pc-lw-xxl-m, var(--p-pc-lw-xl-m, 0));
      overflow: var(--p-pc-lw-xxl-ov, var(--p-pc-lw-xl-ov, visible));
      clip: var(--p-pc-lw-xxl-clip, var(--p-pc-lw-xl-clip, auto));
      white-space: var(--p-pc-lw-xxl-ws, var(--p-pc-lw-xl-ws, normal));
    }
    .p-pin-code .label:is(span){
      position: var(--p-pc-desc-xxl-pos, var(--p-pc-desc-xl-pos, static));
      width: var(--p-pc-desc-xxl-w, var(--p-pc-desc-xl-w, auto));
      height: var(--p-pc-desc-xxl-h, var(--p-pc-desc-xl-h, auto));
      padding: var(--p-pc-desc-xxl-pad, var(--p-pc-desc-xl-pad, 0));
      margin: var(--p-pc-desc-xxl-m, var(--p-pc-desc-xl-m, 0));
      overflow: var(--p-pc-desc-xxl-ov, var(--p-pc-desc-xl-ov, visible));
      clip: var(--p-pc-desc-xxl-clip, var(--p-pc-desc-xl-clip, auto));
      white-space: var(--p-pc-desc-xxl-ws, var(--p-pc-desc-xl-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }`;function Tp(n,s,r){let K,O,o,k,y,C,B,z,M,q,{$$slots:D={},$$scope:E}=s;const R=["base","xs","s","m","l","xl","xxl"],_=(p,c)=>{if(p==null)return c;if(p==="")return!0;if(typeof p=="string"&&p.charAt(0)==="{")try{return JSON.parse(p.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return c}return p},h=p=>p===!0||p==="true"||p==="",P=(p,c,b)=>p&&typeof p=="object"?p[c]===void 0?b:p[c]:p,G=(p,c,b)=>{const e=c==="base"?"--p-pc-lw":`--p-pc-lw-${c}`,i=c==="base"?"--p-pc-desc":`--p-pc-desc-${c}`;if(b){p[`${e}-pos`]="absolute",p[`${e}-w`]="1px",p[`${e}-h`]="1px",p[`${e}-pad`]="0",p[`${e}-m`]="-1px",p[`${e}-ov`]="hidden",p[`${e}-clip`]="rect(0, 0, 0, 0)",p[`${e}-ws`]="nowrap",p[`${e}-minw`]="",p[`${i}-pos`]="absolute",p[`${i}-w`]="1px",p[`${i}-h`]="1px",p[`${i}-pad`]="0",p[`${i}-m`]="-1px",p[`${i}-ov`]="hidden",p[`${i}-clip`]="rect(0, 0, 0, 0)",p[`${i}-ws`]="nowrap";return}p[`${e}-pos`]="static",p[`${e}-w`]="auto",p[`${e}-h`]="auto",p[`${e}-pad`]="0",p[`${e}-m`]="0",p[`${e}-ov`]="visible",p[`${e}-clip`]="auto",p[`${e}-ws`]="normal",p[`${e}-minw`]="fit-content",p[`${i}-pos`]="static",p[`${i}-w`]="auto",p[`${i}-h`]="auto",p[`${i}-pad`]="0",p[`${i}-m`]="0",p[`${i}-ov`]="visible",p[`${i}-clip`]="auto",p[`${i}-ws`]="normal"};let{disabled:g}=s,{loading:f}=s,{compact:L}=s,{state:d}=s,{message:H}=s,{hideLabel:F}=s,{length:x}=s,{label:m}=s,{description:S}=s,{required:I}=s,{type:T}=s,{value:N}=s;function u(){return{disabled:g,loading:f,compact:L,state:d,message:H,hideLabel:F,length:x,label:m,description:S,required:I,type:T,value:N}}return n.$$set=p=>{r(9,s=Z(Z({},s),np(p))),"disabled"in p&&r(10,g=p.disabled),"loading"in p&&r(11,f=p.loading),"compact"in p&&r(12,L=p.compact),"state"in p&&r(13,d=p.state),"message"in p&&r(14,H=p.message),"hideLabel"in p&&r(15,F=p.hideLabel),"length"in p&&r(16,x=p.length),"label"in p&&r(17,m=p.label),"description"in p&&r(18,S=p.description),"required"in p&&r(19,I=p.required),"type"in p&&r(20,T=p.type),"value"in p&&r(21,N=p.value),"$$scope"in p&&r(23,E=p.$$scope)},n.$$.update=()=>{n.$$.dirty[0]&8192&&r(22,K=()=>{const p=h(u().disabled),c=h(u().loading),b=h(u().compact),e=d==="success"||d==="error"?d:"none",A=!!(u().message||"")&&(e==="success"||e==="error"),a=_(u().hideLabel,!1);let l=Number(u().length);(!Number.isFinite(l)||l<1)&&(l=4),l>6&&(l=6);const J={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},Q=J[e]||J.none,Y={"--p-pc-scale":b?"0.64285714":"1","--p-pc-radius":b?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-pc-border":Q.border,"--p-pc-bg":Q.bg,"--p-pc-hover":Q.hover,"--p-pc-pad":"calc(11.2px * (var(--_p-pin-code-a) - 0.64285714) + 4px)","--p-pc-cols":"repeat("+l+", 1fr)","--p-pc-font":"var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next)","--p-pc-cursor":p||c?"not-allowed":"text","--p-pc-input-op":p||c?"0.4":"","--p-pc-input-fc-op":p||c?"1":"","--p-pc-input-fc-color":p||c?"GrayText":"","--p-pc-label-cursor":p||c?"not-allowed":"pointer","--p-pc-pe":p||c?"none":"","--p-pc-opacity":p?"0.4":"","--p-pc-fc-op":p?"1":"","--p-pc-fc-color":p?"GrayText":"","--p-pc-msg":Q.message||"","--p-pc-msg-op":A?"":"0","--p-pc-msg-pos":A?"":"absolute","--p-pc-icon-display":A?"inline-flex":"none"};if(typeof a=="object"&&a!==null){let U=h(P(a,"base",!1));for(const j of R)a[j]!==void 0&&(U=h(P(a,j,!1))),G(Y,j,U)}else{const U=h(a);for(const j of R)G(Y,j,U)}return Y}),n.$$.dirty[0]&131072&&r(8,O=()=>m||""),n.$$.dirty[0]&262144&&r(7,o=()=>S||""),n.$$.dirty[0]&8192&&r(6,k=()=>{const p=d||"none",c=u().message||"";return!c||p!=="success"&&p!=="error"?"":c}),n.$$.dirty[0]&8192&&r(5,y=()=>{const p=d||"none";return!(u().message||"")||p!=="success"&&p!=="error"?"":p==="error"?"exclamation":"check"}),n.$$.dirty[0]&8192&&r(4,C=()=>{const p=d||"none";return p==="error"?"error":p==="success"?"success":""}),n.$$.dirty[0]&1024&&r(3,B=()=>g===!0||g==="true"||g===""),n.$$.dirty[0]&2048,n.$$.dirty[0]&524288,n.$$.dirty[0]&8192,n.$$.dirty[0]&8192,n.$$.dirty[0]&2048&&r(2,z=()=>f===!0||f==="true"||f===""?"Loading":""),n.$$.dirty[0]&1048576,n.$$.dirty[0]&2097152,n.$$.dirty[0]&4194304&&r(1,M=fp(K())),r(0,q=xp({disabled:s.disabled,loading:s.loading}))},s=np(s),[q,M,z,B,C,y,k,o,O,s,g,f,L,d,H,F,x,m,S,I,T,N,K,E,D]}class Pp extends ep{constructor(s){super(),sp(this,s,Tp,_p,rp,{disabled:10,loading:11,compact:12,state:13,message:14,hideLabel:15,length:16,label:17,description:18,required:19,type:20,value:21},null,[-1,-1])}}export{Pp as default};
