import{S as wa,i as ma,s as ua,c as xa,a as la,d as ha,v as ga,t as ia,b as oa,f as X,u as fa,g as ba,e as ya,p as s,h as ca,j as _a,k as Sa,l as i,w as za,m as b,H as Oa,n as aa,o as Z,x as Ta,q as da}from"./svelte-DoO7z26N.js";import{s as La,h as ka}from"./host-DRskmCSE.js";import Ha from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";const Aa=e=>({}),va=e=>({});function Ba(e){let n,r,F=`<style>${Ca}</style>`,D,u,T,_,N=e[13]()+"",E,q,Q,L,I=e[12]()+"",G,U,S,d,J,P,R,K,x,k,V=e[5]()+"",y,z,h=e[6]()+"",H,M,v,g,A=e[11]()+"",B,O,l;const w=e[31]["label-after"],m=xa(w,e,e[30],va);g=new Ha({props:{"aria-hidden":"true",name:e[10](),color:e[9]()}});let C=[{class:O="p-textarea"+(e[14].class?` ${e[14].class}`:"")},{"data-pds":"textarea"},{style:e[1]},e[0]],c={};for(let a=0;a<C.length;a+=1)c=la(c,C[a]);return{c(){n=b("div"),r=new Oa(!1),D=aa(),u=b("div"),T=b("div"),_=b("label"),E=Z(N),q=b("span"),m&&m.c(),Q=aa(),L=b("span"),G=Z(I),U=aa(),S=b("div"),d=b("textarea"),k=b("span"),y=Z(V),z=b("span"),H=Z(h),M=aa(),v=b("span"),Ta(g.$$.fragment),B=Z(A),r.a=D,s(_,"class","label"),s(_,"id","label"),s(_,"for","textarea"),s(q,"data-pds-slot","label-after"),s(T,"class","label-wrapper"),s(L,"class","label"),s(L,"id","description"),s(d,"id","textarea"),d.value=J=e[8](),s(d,"placeholder",P=e[2]()),d.disabled=R=!!e[4](),d.readOnly=K=!!e[3](),s(d,"maxlength",x=e[7]()),s(k,"class","sr-only"),s(k,"aria-live","polite"),s(z,"class","counter"),s(z,"aria-hidden","true"),s(S,"class","wrapper"),s(v,"class","message"),s(v,"id","message"),s(u,"class","root"),ca(n,c)},m(a,t){Sa(a,n,t),r.m(F,n),i(n,D),i(n,u),i(u,T),i(T,_),i(_,E),i(T,q),m&&m.m(q,null),i(u,Q),i(u,L),i(L,G),i(u,U),i(u,S),i(S,d),i(S,k),i(k,y),i(S,z),i(z,H),i(u,M),i(u,v),za(g,v,null),i(v,B),l=!0},p(a,t){(!l||t[0]&8192)&&N!==(N=a[13]()+"")&&X(E,N),m&&m.p&&(!l||t[0]&1073741824)&&fa(m,w,a,a[30],l?ya(w,a[30],t,Aa):ba(a[30]),va),(!l||t[0]&4096)&&I!==(I=a[12]()+"")&&X(G,I),(!l||t[0]&256&&J!==(J=a[8]()))&&(d.value=J),(!l||t[0]&4&&P!==(P=a[2]()))&&s(d,"placeholder",P),(!l||t[0]&16&&R!==(R=!!a[4]()))&&(d.disabled=R),(!l||t[0]&8&&K!==(K=!!a[3]()))&&(d.readOnly=K),(!l||t[0]&128&&x!==(x=a[7]()))&&s(d,"maxlength",x),(!l||t[0]&32)&&V!==(V=a[5]()+"")&&X(y,V),(!l||t[0]&64)&&h!==(h=a[6]()+"")&&X(H,h);const f={};t[0]&1024&&(f.name=a[10]()),t[0]&512&&(f.color=a[9]()),g.$set(f),(!l||t[0]&2048)&&A!==(A=a[11]()+"")&&X(B,A),ca(n,c=_a(C,[(!l||t[0]&16384&&O!==(O="p-textarea"+(a[14].class?` ${a[14].class}`:"")))&&{class:O},{"data-pds":"textarea"},(!l||t[0]&2)&&{style:a[1]},t[0]&1&&a[0]]))},i(a){l||(oa(m,a),oa(g.$$.fragment,a),l=!0)},o(a){ia(m,a),ia(g.$$.fragment,a),l=!1},d(a){a&&ha(n),m&&m.d(a),ga(g)}}}const Ca=`.p-textarea :where([data-pds-slot]){display:contents}

  .p-textarea {
    display: block;
    --_p-textarea-a: var(--p-ta-scale, 1);
  }
  .p-textarea[hidden] {
    display: none !important;
  }
  .p-textarea [data-pds-slot="label-after"]{
    display: inline-block;
    vertical-align: top;
  }
  .p-textarea [data-pds-slot="label-after"] > *{
    margin-inline-start: var(--p-spacing-static-xs) !important;
  }
  .p-textarea .label-after{
    display: inline-block;
    vertical-align: top;
  }
  .p-textarea textarea{
    all: unset;
    grid-area: 1 / 1;
    display: block;
    resize: var(--p-ta-resize, vertical);
    field-sizing: var(--p-textarea-field-sizing, unset);
    min-width: var(--p-textarea-min-width, 2ch);
    max-width: var(--p-textarea-max-width, unset);
    min-height: var(
      --p-textarea-min-height,
      calc(var(--_p-textarea-a) * 3.5rem)
    );
    max-height: var(--p-textarea-max-height, unset);
    border: 1px solid var(--p-ta-border);
    border-radius: var(--p-ta-radius, var(--p-radius-xl));
    background: var(--p-ta-bg);
    color: var(--p-ta-color);
    box-sizing: border-box;
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      border-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    padding: var(--p-ta-pad);
    cursor: var(--p-ta-cursor, text);
  }
  .p-textarea textarea:focus{
    border-color: var(--p-ta-hover);
  }
  .p-textarea .root{
    display: grid;
    gap: var(--p-spacing-static-xs);
  }
  .p-textarea .wrapper{
    display: grid;
    opacity: var(--p-ta-wrap-op);
  }
  .p-textarea .counter{
    pointer-events: none;
    max-width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-color-contrast-high);
    grid-area: 1 / 1;
    place-self: flex-end;
    margin-inline-end: var(--p-ta-counter-me);
    margin-bottom: calc(11.2px * (var(--_p-textarea-a) - 0.64285714) + 4px);
    display: var(--p-ta-counter-display);
  }
  .p-textarea .sr-only{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    display: var(--p-ta-counter-display);
  }
  .p-textarea .label-wrapper{
    min-width: var(--p-ta-lw-minw);
    position: var(--p-ta-lw-pos, static);
    width: var(--p-ta-lw-w, auto);
    height: var(--p-ta-lw-h, auto);
    padding: var(--p-ta-lw-pad, 0);
    margin: var(--p-ta-lw-m, 0);
    overflow: var(--p-ta-lw-ov, visible);
    clip: var(--p-ta-lw-clip, auto);
    white-space: var(--p-ta-lw-ws, normal);
  }
  .p-textarea .label{
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    cursor: var(--p-ta-label-cursor, pointer);
    color: var(--p-color-primary);
    pointer-events: var(--p-ta-pe);
    opacity: var(--p-ta-opacity);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
    display: inline;
  }
  .p-textarea .label:empty{
    display: none;
  }
  .p-textarea .label:is(span){
    cursor: unset;
    font-size: var(--p-typescale-xs);
    color: var(--p-color-contrast-high);
    min-width: unset;
    position: var(--p-ta-desc-pos, static);
    width: var(--p-ta-desc-w, auto);
    height: var(--p-ta-desc-h, auto);
    padding: var(--p-ta-desc-pad, 0);
    margin: var(--p-ta-desc-m, 0);
    overflow: var(--p-ta-desc-ov, visible);
    clip: var(--p-ta-desc-clip, auto);
    white-space: var(--p-ta-desc-ws, normal);
    margin-top: calc(-1 * var(--p-spacing-static-xs));
  }
  .p-textarea .label > [data-pds-slot="label"] > *{
    display: inline !important;
  }
  .p-textarea .required{
    user-select: none;
  }
  .p-textarea .message{
    display: flex;
    gap: var(--p-spacing-static-xs);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-ta-msg, inherit);
    opacity: var(--p-ta-msg-op);
    position: var(--p-ta-msg-pos);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      opacity var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-textarea .message:empty{
    opacity: 0;
    position: absolute;
  }
  .p-textarea .message .p-icon{
    display: var(--p-ta-icon-display, none);
  }
  @media (forced-colors: active) {
    .p-textarea .wrapper{
      opacity: var(--p-ta-fc-op, var(--p-ta-wrap-op, 1));
      color: var(--p-ta-fc-color, inherit);
    }
    .p-textarea .label{
      opacity: var(--p-ta-fc-op, var(--p-ta-opacity, 1));
      color: var(--p-ta-fc-color, var(--p-color-primary));
    }
  }
  @media (hover: hover) {
    .p-textarea:not([disabled]):not([read-only]) textarea:hover,
    .p-textarea:not([disabled]):not([read-only]) .label-wrapper:hover ~ textarea {
      border-color: var(--p-ta-hover);
    }
  }
  @media (min-width: 480px) {
    .p-textarea .label-wrapper{
      min-width: var(--p-ta-lw-xs-minw, var(--p-ta-lw-minw));
      position: var(--p-ta-lw-xs-pos, var(--p-ta-lw-pos, static));
      width: var(--p-ta-lw-xs-w, var(--p-ta-lw-w, auto));
      height: var(--p-ta-lw-xs-h, var(--p-ta-lw-h, auto));
      padding: var(--p-ta-lw-xs-pad, var(--p-ta-lw-pad, 0));
      margin: var(--p-ta-lw-xs-m, var(--p-ta-lw-m, 0));
      overflow: var(--p-ta-lw-xs-ov, var(--p-ta-lw-ov, visible));
      clip: var(--p-ta-lw-xs-clip, var(--p-ta-lw-clip, auto));
      white-space: var(--p-ta-lw-xs-ws, var(--p-ta-lw-ws, normal));
    }
    .p-textarea .label:is(span){
      position: var(--p-ta-desc-xs-pos, var(--p-ta-desc-pos, static));
      width: var(--p-ta-desc-xs-w, var(--p-ta-desc-w, auto));
      height: var(--p-ta-desc-xs-h, var(--p-ta-desc-h, auto));
      padding: var(--p-ta-desc-xs-pad, var(--p-ta-desc-pad, 0));
      margin: var(--p-ta-desc-xs-m, var(--p-ta-desc-m, 0));
      overflow: var(--p-ta-desc-xs-ov, var(--p-ta-desc-ov, visible));
      clip: var(--p-ta-desc-xs-clip, var(--p-ta-desc-clip, auto));
      white-space: var(--p-ta-desc-xs-ws, var(--p-ta-desc-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 760px) {
    .p-textarea .label-wrapper{
      min-width: var(
        --p-ta-lw-s-minw,
        var(--p-ta-lw-xs-minw, var(--p-ta-lw-minw))
      );
      position: var(
        --p-ta-lw-s-pos,
        var(--p-ta-lw-xs-pos, var(--p-ta-lw-pos, static))
      );
      width: var(--p-ta-lw-s-w, var(--p-ta-lw-xs-w, var(--p-ta-lw-w, auto)));
      height: var(--p-ta-lw-s-h, var(--p-ta-lw-xs-h, var(--p-ta-lw-h, auto)));
      padding: var(
        --p-ta-lw-s-pad,
        var(--p-ta-lw-xs-pad, var(--p-ta-lw-pad, 0))
      );
      margin: var(--p-ta-lw-s-m, var(--p-ta-lw-xs-m, var(--p-ta-lw-m, 0)));
      overflow: var(
        --p-ta-lw-s-ov,
        var(--p-ta-lw-xs-ov, var(--p-ta-lw-ov, visible))
      );
      clip: var(
        --p-ta-lw-s-clip,
        var(--p-ta-lw-xs-clip, var(--p-ta-lw-clip, auto))
      );
      white-space: var(
        --p-ta-lw-s-ws,
        var(--p-ta-lw-xs-ws, var(--p-ta-lw-ws, normal))
      );
    }
    .p-textarea .label:is(span){
      position: var(
        --p-ta-desc-s-pos,
        var(--p-ta-desc-xs-pos, var(--p-ta-desc-pos, static))
      );
      width: var(
        --p-ta-desc-s-w,
        var(--p-ta-desc-xs-w, var(--p-ta-desc-w, auto))
      );
      height: var(
        --p-ta-desc-s-h,
        var(--p-ta-desc-xs-h, var(--p-ta-desc-h, auto))
      );
      padding: var(
        --p-ta-desc-s-pad,
        var(--p-ta-desc-xs-pad, var(--p-ta-desc-pad, 0))
      );
      margin: var(
        --p-ta-desc-s-m,
        var(--p-ta-desc-xs-m, var(--p-ta-desc-m, 0))
      );
      overflow: var(
        --p-ta-desc-s-ov,
        var(--p-ta-desc-xs-ov, var(--p-ta-desc-ov, visible))
      );
      clip: var(
        --p-ta-desc-s-clip,
        var(--p-ta-desc-xs-clip, var(--p-ta-desc-clip, auto))
      );
      white-space: var(
        --p-ta-desc-s-ws,
        var(--p-ta-desc-xs-ws, var(--p-ta-desc-ws, normal))
      );
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1000px) {
    .p-textarea .label-wrapper{
      min-width: var(--p-ta-lw-m-minw, var(--p-ta-lw-s-minw));
      position: var(--p-ta-lw-m-pos, var(--p-ta-lw-s-pos, static));
      width: var(--p-ta-lw-m-w, var(--p-ta-lw-s-w, auto));
      height: var(--p-ta-lw-m-h, var(--p-ta-lw-s-h, auto));
      padding: var(--p-ta-lw-m-pad, var(--p-ta-lw-s-pad, 0));
      margin: var(--p-ta-lw-m-m, var(--p-ta-lw-s-m, 0));
      overflow: var(--p-ta-lw-m-ov, var(--p-ta-lw-s-ov, visible));
      clip: var(--p-ta-lw-m-clip, var(--p-ta-lw-s-clip, auto));
      white-space: var(--p-ta-lw-m-ws, var(--p-ta-lw-s-ws, normal));
    }
    .p-textarea .label:is(span){
      position: var(--p-ta-desc-m-pos, var(--p-ta-desc-s-pos, static));
      width: var(--p-ta-desc-m-w, var(--p-ta-desc-s-w, auto));
      height: var(--p-ta-desc-m-h, var(--p-ta-desc-s-h, auto));
      padding: var(--p-ta-desc-m-pad, var(--p-ta-desc-s-pad, 0));
      margin: var(--p-ta-desc-m-m, var(--p-ta-desc-s-m, 0));
      overflow: var(--p-ta-desc-m-ov, var(--p-ta-desc-s-ov, visible));
      clip: var(--p-ta-desc-m-clip, var(--p-ta-desc-s-clip, auto));
      white-space: var(--p-ta-desc-m-ws, var(--p-ta-desc-s-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1300px) {
    .p-textarea .label-wrapper{
      min-width: var(--p-ta-lw-l-minw, var(--p-ta-lw-m-minw));
      position: var(--p-ta-lw-l-pos, var(--p-ta-lw-m-pos, static));
      width: var(--p-ta-lw-l-w, var(--p-ta-lw-m-w, auto));
      height: var(--p-ta-lw-l-h, var(--p-ta-lw-m-h, auto));
      padding: var(--p-ta-lw-l-pad, var(--p-ta-lw-m-pad, 0));
      margin: var(--p-ta-lw-l-m, var(--p-ta-lw-m-m, 0));
      overflow: var(--p-ta-lw-l-ov, var(--p-ta-lw-m-ov, visible));
      clip: var(--p-ta-lw-l-clip, var(--p-ta-lw-m-clip, auto));
      white-space: var(--p-ta-lw-l-ws, var(--p-ta-lw-m-ws, normal));
    }
    .p-textarea .label:is(span){
      position: var(--p-ta-desc-l-pos, var(--p-ta-desc-m-pos, static));
      width: var(--p-ta-desc-l-w, var(--p-ta-desc-m-w, auto));
      height: var(--p-ta-desc-l-h, var(--p-ta-desc-m-h, auto));
      padding: var(--p-ta-desc-l-pad, var(--p-ta-desc-m-pad, 0));
      margin: var(--p-ta-desc-l-m, var(--p-ta-desc-m-m, 0));
      overflow: var(--p-ta-desc-l-ov, var(--p-ta-desc-m-ov, visible));
      clip: var(--p-ta-desc-l-clip, var(--p-ta-desc-m-clip, auto));
      white-space: var(--p-ta-desc-l-ws, var(--p-ta-desc-m-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1760px) {
    .p-textarea .label-wrapper{
      min-width: var(--p-ta-lw-xl-minw, var(--p-ta-lw-l-minw));
      position: var(--p-ta-lw-xl-pos, var(--p-ta-lw-l-pos, static));
      width: var(--p-ta-lw-xl-w, var(--p-ta-lw-l-w, auto));
      height: var(--p-ta-lw-xl-h, var(--p-ta-lw-l-h, auto));
      padding: var(--p-ta-lw-xl-pad, var(--p-ta-lw-l-pad, 0));
      margin: var(--p-ta-lw-xl-m, var(--p-ta-lw-l-m, 0));
      overflow: var(--p-ta-lw-xl-ov, var(--p-ta-lw-l-ov, visible));
      clip: var(--p-ta-lw-xl-clip, var(--p-ta-lw-l-clip, auto));
      white-space: var(--p-ta-lw-xl-ws, var(--p-ta-lw-l-ws, normal));
    }
    .p-textarea .label:is(span){
      position: var(--p-ta-desc-xl-pos, var(--p-ta-desc-l-pos, static));
      width: var(--p-ta-desc-xl-w, var(--p-ta-desc-l-w, auto));
      height: var(--p-ta-desc-xl-h, var(--p-ta-desc-l-h, auto));
      padding: var(--p-ta-desc-xl-pad, var(--p-ta-desc-l-pad, 0));
      margin: var(--p-ta-desc-xl-m, var(--p-ta-desc-l-m, 0));
      overflow: var(--p-ta-desc-xl-ov, var(--p-ta-desc-l-ov, visible));
      clip: var(--p-ta-desc-xl-clip, var(--p-ta-desc-l-clip, auto));
      white-space: var(--p-ta-desc-xl-ws, var(--p-ta-desc-l-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }
  @media (min-width: 1920px) {
    .p-textarea .label-wrapper{
      min-width: var(--p-ta-lw-xxl-minw, var(--p-ta-lw-xl-minw));
      position: var(--p-ta-lw-xxl-pos, var(--p-ta-lw-xl-pos, static));
      width: var(--p-ta-lw-xxl-w, var(--p-ta-lw-xl-w, auto));
      height: var(--p-ta-lw-xxl-h, var(--p-ta-lw-xl-h, auto));
      padding: var(--p-ta-lw-xxl-pad, var(--p-ta-lw-xl-pad, 0));
      margin: var(--p-ta-lw-xxl-m, var(--p-ta-lw-xl-m, 0));
      overflow: var(--p-ta-lw-xxl-ov, var(--p-ta-lw-xl-ov, visible));
      clip: var(--p-ta-lw-xxl-clip, var(--p-ta-lw-xl-clip, auto));
      white-space: var(--p-ta-lw-xxl-ws, var(--p-ta-lw-xl-ws, normal));
    }
    .p-textarea .label:is(span){
      position: var(--p-ta-desc-xxl-pos, var(--p-ta-desc-xl-pos, static));
      width: var(--p-ta-desc-xxl-w, var(--p-ta-desc-xl-w, auto));
      height: var(--p-ta-desc-xxl-h, var(--p-ta-desc-xl-h, auto));
      padding: var(--p-ta-desc-xxl-pad, var(--p-ta-desc-xl-pad, 0));
      margin: var(--p-ta-desc-xxl-m, var(--p-ta-desc-xl-m, 0));
      overflow: var(--p-ta-desc-xxl-ov, var(--p-ta-desc-xl-ov, visible));
      clip: var(--p-ta-desc-xxl-clip, var(--p-ta-desc-xl-clip, auto));
      white-space: var(--p-ta-desc-xxl-ws, var(--p-ta-desc-xl-ws, normal));
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
  }`;function Na(e,n,r){let F,D,u,T,_,N,E,q,Q,L,I,G,U,S,d,{$$slots:J={},$$scope:P}=n;const R=["base","xs","s","m","l","xl","xxl"],K=(a,t)=>{if(a==null)return t;if(a==="")return!0;if(typeof a=="string"&&a.charAt(0)==="{")try{return JSON.parse(a.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return t}return a},x=a=>a===!0||a==="true"||a==="",k=(a,t,f)=>a&&typeof a=="object"?a[t]===void 0?f:a[t]:a,V=(a,t,f)=>{const p=t==="base"?"--p-ta-lw":`--p-ta-lw-${t}`,o=t==="base"?"--p-ta-desc":`--p-ta-desc-${t}`;if(f){a[`${p}-pos`]="absolute",a[`${p}-w`]="1px",a[`${p}-h`]="1px",a[`${p}-pad`]="0",a[`${p}-m`]="-1px",a[`${p}-ov`]="hidden",a[`${p}-clip`]="rect(0, 0, 0, 0)",a[`${p}-ws`]="nowrap",a[`${p}-minw`]="",a[`${o}-pos`]="absolute",a[`${o}-w`]="1px",a[`${o}-h`]="1px",a[`${o}-pad`]="0",a[`${o}-m`]="-1px",a[`${o}-ov`]="hidden",a[`${o}-clip`]="rect(0, 0, 0, 0)",a[`${o}-ws`]="nowrap";return}a[`${p}-pos`]="static",a[`${p}-w`]="auto",a[`${p}-h`]="auto",a[`${p}-pad`]="0",a[`${p}-m`]="0",a[`${p}-ov`]="visible",a[`${p}-clip`]="auto",a[`${p}-ws`]="normal",a[`${p}-minw`]="fit-content",a[`${o}-pos`]="static",a[`${o}-w`]="auto",a[`${o}-h`]="auto",a[`${o}-pad`]="0",a[`${o}-m`]="0",a[`${o}-ov`]="visible",a[`${o}-clip`]="auto",a[`${o}-ws`]="normal"};let{disabled:y}=n,{compact:z}=n,{readOnly:h}=n,{counter:H}=n,{resize:M}=n,{state:v}=n,{message:g}=n,{hideLabel:A}=n,{label:B}=n,{description:O}=n,{value:l}=n,{maxLength:w}=n,{rows:m}=n,{placeholder:C}=n;function c(){return{disabled:y,compact:z,readOnly:h,counter:H,resize:M,state:v,message:g,hideLabel:A,label:B,description:O,value:l,maxLength:w,rows:m,placeholder:C}}return e.$$set=a=>{r(14,n=la(la({},n),da(a))),"disabled"in a&&r(15,y=a.disabled),"compact"in a&&r(16,z=a.compact),"readOnly"in a&&r(17,h=a.readOnly),"counter"in a&&r(18,H=a.counter),"resize"in a&&r(19,M=a.resize),"state"in a&&r(20,v=a.state),"message"in a&&r(21,g=a.message),"hideLabel"in a&&r(22,A=a.hideLabel),"label"in a&&r(23,B=a.label),"description"in a&&r(24,O=a.description),"value"in a&&r(25,l=a.value),"maxLength"in a&&r(26,w=a.maxLength),"rows"in a&&r(27,m=a.rows),"placeholder"in a&&r(28,C=a.placeholder),"$$scope"in a&&r(30,P=a.$$scope)},e.$$.update=()=>{e.$$.dirty[0]&1310720&&r(29,F=()=>{const a=x(c().disabled),t=x(c().compact),f=x(c().readOnly),p=x(H),o=c().resize||"vertical",ta=v==="success"||v==="error"?v:"none",ea=!!(c().message||"")&&(ta==="success"||ta==="error"),Y=K(c().hideLabel,!1),pa={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",message:""},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",message:"var(--p-color-error)"}},j=pa[ta]||pa.none,sa="calc(28px * (var(--_p-textarea-a) - 0.64285714) + 5px)",ra="calc(22.4px * (var(--_p-textarea-a) - 0.64285714) + 8px)",na={"--p-ta-scale":t?"0.64285714":"1","--p-ta-resize":o,"--p-ta-radius":t?"var(--p-radius-lg)":"var(--p-radius-xl)","--p-ta-border":f?"transparent":j.border,"--p-ta-bg":f?"var(--p-color-frosted)":j.bg,"--p-ta-color":f?"var(--p-color-contrast-medium)":"var(--p-color-primary)","--p-ta-hover":j.hover,"--p-ta-pad":p?sa+" "+ra+" "+"calc(var(--p-leading-normal) + calc(22.4px * (var(--_p-textarea-a) - 0.64285714) + 4px))":sa+" "+ra,"--p-ta-cursor":a?"not-allowed":"text","--p-ta-wrap-op":a?"0.4":"","--p-ta-label-cursor":a?"not-allowed":"pointer","--p-ta-pe":a?"none":"","--p-ta-opacity":a?"0.4":"","--p-ta-fc-op":a?"1":"","--p-ta-fc-color":a?"GrayText":"","--p-ta-msg":j.message||"","--p-ta-msg-op":ea?"":"0","--p-ta-msg-pos":ea?"":"absolute","--p-ta-icon-display":ea?"inline-flex":"none","--p-ta-counter-display":p?"":"none","--p-ta-counter-me":ra};if(typeof Y=="object"&&Y!==null){let $=x(k(Y,"base",!1));for(const W of R)Y[W]!==void 0&&($=x(k(Y,W,!1))),V(na,W,$)}else{const $=x(Y);for(const W of R)V(na,W,$)}return na}),e.$$.dirty[0]&8388608&&r(13,D=()=>B||""),e.$$.dirty[0]&16777216&&r(12,u=()=>O||""),e.$$.dirty[0]&1048576&&r(11,T=()=>{const a=v||"none",t=c().message||"";return!t||a!=="success"&&a!=="error"?"":t}),e.$$.dirty[0]&1048576&&r(10,_=()=>{const a=v||"none";return!(c().message||"")||a!=="success"&&a!=="error"?"":a==="error"?"exclamation":"check"}),e.$$.dirty[0]&1048576&&r(9,N=()=>{const a=v||"none";return a==="error"?"error":a==="success"?"success":""}),e.$$.dirty[0]&33554432&&r(8,E=()=>l==null?"":String(l)),e.$$.dirty[0]&67108864&&r(7,q=()=>w==null||w===""?"":String(w)),e.$$.dirty[0]&134217728,e.$$.dirty[0]&67108864&&r(6,Q=()=>{const a=c().value==null?"":String(c().value),t=w==null||w===""?"":String(w);return t?a.length+"/"+t:String(a.length)}),e.$$.dirty[0]&67108864&&r(5,L=()=>{const a=c().value==null?"":String(c().value),t=w==null||w===""?"":String(w);return t?"You have "+(Number(t)-a.length)+" out of "+t+" characters left":a.length+" characters entered"}),e.$$.dirty[0]&32768&&r(4,I=()=>y===!0||y==="true"||y===""),e.$$.dirty[0]&131072&&r(3,G=()=>h===!0||h==="true"||h===""),e.$$.dirty[0]&1048576,e.$$.dirty[0]&268435456&&r(2,U=()=>C||""),e.$$.dirty[0]&536870912&&r(1,S=La(F())),r(0,d=ka({disabled:n.disabled,"read-only":n.readOnly}))},n=da(n),[d,S,U,G,I,L,Q,q,E,N,_,T,u,D,n,y,z,h,H,M,v,g,A,B,O,l,w,m,C,F,P,J]}class Ka extends wa{constructor(n){super(),ma(this,n,Na,Ba,ua,{disabled:15,compact:16,readOnly:17,counter:18,resize:19,state:20,message:21,hideLabel:22,label:23,description:24,value:25,maxLength:26,rows:27,placeholder:28},null,[-1,-1])}}export{Ka as default};
