import{S as an,i as rn,s as cn,d as pn,v as Q,t as V,b as W,p as s,f as U,k as en,l as b,w as X,m as _,H as ln,n as Z,x as Y,o as G,a as j,q as $}from"./svelte-DoO7z26N.js";import{s as on}from"./host-DRskmCSE.js";import sn from"./Spinner-CHLfbpXm.js";import tn from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function bn(p){let c,e,N=`<style>${dn}</style>`,M,h,u,S,w,L,A,z,g,E,B,d,H=p[8]()+"",K,m,k,v,T=p[7]()+"",x,o,n=p[1]()+"",i,f,a;return g=new sn({props:{class:"spinner","aria-hidden":"true"}}),v=new tn({props:{"aria-hidden":"true",name:p[6](),color:p[5]()}}),{c(){c=_("div"),e=new ln(!1),M=Z(),h=_("div"),u=_("div"),S=_("div"),w=_("input"),Y(g.$$.fragment),E=Z(),B=_("div"),d=_("label"),K=G(H),m=Z(),k=_("span"),Y(v.$$.fragment),x=G(T),o=_("span"),i=G(n),e.a=M,s(w,"type","checkbox"),w.checked=L=!!p[4](),w.disabled=A=!!p[3](),s(w,"aria-invalid",z=p[2]()),s(S,"class","input-wrapper"),s(d,"class","label"),s(B,"class","label-wrapper"),s(u,"class","wrapper"),s(k,"class","message"),s(o,"class","loading"),s(o,"id","loading"),s(o,"role","status"),s(h,"class","root"),s(c,"class",f="p-checkbox"+(p[9].class?` ${p[9].class}`:"")),s(c,"data-pds","checkbox"),s(c,"style",p[0])},m(r,t){en(r,c,t),e.m(N,c),b(c,M),b(c,h),b(h,u),b(u,S),b(S,w),X(g,S,null),b(u,E),b(u,B),b(B,d),b(d,K),b(h,m),b(h,k),X(v,k,null),b(k,x),b(h,o),b(o,i),a=!0},p(r,[t]){(!a||t&16&&L!==(L=!!r[4]()))&&(w.checked=L),(!a||t&8&&A!==(A=!!r[3]()))&&(w.disabled=A),(!a||t&4&&z!==(z=r[2]()))&&s(w,"aria-invalid",z),(!a||t&256)&&H!==(H=r[8]()+"")&&U(K,H);const q={};t&64&&(q.name=r[6]()),t&32&&(q.color=r[5]()),v.$set(q),(!a||t&128)&&T!==(T=r[7]()+"")&&U(x,T),(!a||t&2)&&n!==(n=r[1]()+"")&&U(i,n),(!a||t&512&&f!==(f="p-checkbox"+(r[9].class?` ${r[9].class}`:"")))&&s(c,"class",f),(!a||t&1)&&s(c,"style",r[0])},i(r){a||(W(g.$$.fragment,r),W(v.$$.fragment,r),a=!0)},o(r){V(g.$$.fragment,r),V(v.$$.fragment,r),a=!1},d(r){r&&pn(c),Q(g),Q(v)}}}const vn=`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/></svg>') center/contain no-repeat`,wn=`url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20,11v2H4v-2h16Z"/></svg>') center/contain no-repeat`,dn=`.p-checkbox :where([data-pds-slot]){display:contents}

  .p-checkbox {
    display: block;
    --_p-checkbox-scaling: var(--p-cb-scale, 1);
  }
  .p-checkbox[hidden] {
    display: none !important;
  }
  .p-checkbox [data-pds-slot="label-after"]{
    display: inline-block;
    vertical-align: top;
  }
  .p-checkbox [data-pds-slot="label-after"] > *{
    margin-inline-start: var(--p-spacing-static-xs) !important;
  }
  .p-checkbox .label-after{
    display: inline-block;
    vertical-align: top;
  }
  .p-checkbox input{
    all: unset;
    display: grid;
    width: calc(var(--_p-checkbox-scaling) * 1.75rem);
    height: calc(var(--_p-checkbox-scaling) * 1.75rem);
    margin-block: max(
      0px,
      calc(
        (var(--p-leading-normal) - calc(var(--_p-checkbox-scaling) * 1.75rem)) /
          2
      )
    );
    box-sizing: border-box;
    font: var(--p-typescale-sm) var(--p-font-porsche-next);
    background: var(--p-cb-bg);
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      border-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    border: 1px solid var(--p-cb-border);
    border-radius: var(--p-cb-radius);
    pointer-events: var(--p-cb-pe);
  }
  .p-checkbox input::before{
    content: "";
    grid-area: 1 / 1;
  }
  .p-checkbox input::after{
    content: "";
    margin: calc(
      -1px - max(0px, calc(24px - calc(var(--_p-checkbox-scaling) * 1.75rem)) /
            2)
    );
    grid-area: 1 / 1;
  }
  .p-checkbox input:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-checkbox input:indeterminate::before{
    -webkit-mask: var(--p-cb-dash-mask);
    mask: var(--p-cb-dash-mask);
    background-color: var(--p-cb-indeterminate);
  }
  .p-checkbox input:checked{
    background: var(--p-cb-checked, var(--p-cb-bg));
  }
  .p-checkbox input:checked::before{
    -webkit-mask: var(--p-cb-check-mask);
    mask: var(--p-cb-check-mask);
    background-color: var(--p-cb-icon-bg);
  }
  .p-checkbox .root{
    display: grid;
    row-gap: var(--p-spacing-static-xs);
  }
  .p-checkbox .wrapper{
    position: relative;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
  }
  .p-checkbox .input-wrapper{
    position: relative;
    align-items: center;
    display: grid;
    align-self: flex-start;
    min-height: var(--p-leading-normal);
    cursor: var(--p-cb-cursor, pointer);
    opacity: var(--p-cb-opacity);
  }
  .p-checkbox .spinner,
  .p-checkbox .p-spinner{
    display: var(--p-cb-spinner-display);
  }
  .p-checkbox .spinner{
    --p-spinner-size: calc(calc(var(--_p-checkbox-scaling) * 1.75rem) - 2px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .p-checkbox .label-wrapper{
    display: var(--p-cb-lw-display);
    position: var(--p-cb-lw-pos, static);
    width: var(--p-cb-lw-w, auto);
    height: var(--p-cb-lw-h, auto);
    padding: var(--p-cb-lw-pad, 0);
    margin: var(--p-cb-lw-m, 0);
    overflow: var(--p-cb-lw-ov, visible);
    clip: var(--p-cb-lw-clip, auto);
    white-space: var(--p-cb-lw-ws, normal);
    min-width: var(--p-cb-lw-minw);
    padding-top: var(--p-cb-lw-pt);
    padding-inline-start: var(--p-cb-lw-pis);
  }
  .p-checkbox .label{
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    cursor: var(--p-cb-cursor, pointer);
    color: var(--p-color-primary);
    pointer-events: var(--p-cb-pe);
    opacity: var(--p-cb-opacity);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
    display: inline;
  }
  .p-checkbox .label:empty{
    display: none;
  }
  .p-checkbox .label:is(span){
    cursor: unset;
    font-size: var(--p-typescale-xs);
    color: var(--p-color-contrast-high);
    margin-top: calc(-1 * var(--p-spacing-static-xs));
  }
  .p-checkbox .label > [data-pds-slot="label"] > *{
    display: inline !important;
  }
  .p-checkbox .required{
    user-select: none;
  }
  .p-checkbox .message{
    display: flex;
    gap: var(--p-spacing-static-xs);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-cb-msg);
    opacity: var(--p-cb-msg-opacity);
    position: var(--p-cb-msg-pos);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      opacity var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
  }
  .p-checkbox .message:empty{
    opacity: 0;
    position: absolute;
  }
  .p-checkbox .message .p-icon{
    display: var(--p-cb-icon-display);
  }
  .p-checkbox .loading{
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
    .p-checkbox input{
      border-color: var(--p-cb-fc-border);
    }
    .p-checkbox input:focus-visible{
      outline-color: Highlight;
    }
    .p-checkbox input:indeterminate::before{
      background: CanvasText;
    }
    .p-checkbox input:checked::before{
      background: CanvasText;
    }
  }
  @media (hover: hover) {
    .p-checkbox input:hover{
      border-color: var(--p-cb-hover);
    }
    .p-checkbox input:checked:hover{
      background-color: var(--p-cb-checked-hover);
      border-color: var(--p-cb-checked-hover-border);
    }
  }
  @media (min-width: 480px) {
    .p-checkbox .label-wrapper{
      position: var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static));
      width: var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto));
      height: var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto));
      padding: var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0));
      margin: var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0));
      overflow: var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible));
      clip: var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto));
      white-space: var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal));
      min-width: var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw));
      padding-top: var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt));
      padding-inline-start: var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis));
    }
  }
  @media (min-width: 760px) {
    .p-checkbox .label-wrapper{
      position: var(
        --p-cb-lw-s-pos,
        var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static))
      );
      width: var(--p-cb-lw-s-w, var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto)));
      height: var(--p-cb-lw-s-h, var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto)));
      padding: var(
        --p-cb-lw-s-pad,
        var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0))
      );
      margin: var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0)));
      overflow: var(
        --p-cb-lw-s-ov,
        var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible))
      );
      clip: var(
        --p-cb-lw-s-clip,
        var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto))
      );
      white-space: var(
        --p-cb-lw-s-ws,
        var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal))
      );
      min-width: var(
        --p-cb-lw-s-minw,
        var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw))
      );
      padding-top: var(--p-cb-lw-s-pt, var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt)));
      padding-inline-start: var(
        --p-cb-lw-s-pis,
        var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis))
      );
    }
  }
  @media (min-width: 1000px) {
    .p-checkbox .label-wrapper{
      position: var(
        --p-cb-lw-m-pos,
        var(--p-cb-lw-s-pos, var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static)))
      );
      width: var(
        --p-cb-lw-m-w,
        var(--p-cb-lw-s-w, var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto)))
      );
      height: var(
        --p-cb-lw-m-h,
        var(--p-cb-lw-s-h, var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto)))
      );
      padding: var(
        --p-cb-lw-m-pad,
        var(--p-cb-lw-s-pad, var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0)))
      );
      margin: var(
        --p-cb-lw-m-m,
        var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0)))
      );
      overflow: var(
        --p-cb-lw-m-ov,
        var(--p-cb-lw-s-ov, var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible)))
      );
      clip: var(
        --p-cb-lw-m-clip,
        var(--p-cb-lw-s-clip, var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto)))
      );
      white-space: var(
        --p-cb-lw-m-ws,
        var(--p-cb-lw-s-ws, var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal)))
      );
      min-width: var(
        --p-cb-lw-m-minw,
        var(--p-cb-lw-s-minw, var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw)))
      );
      padding-top: var(
        --p-cb-lw-m-pt,
        var(--p-cb-lw-s-pt, var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt)))
      );
      padding-inline-start: var(
        --p-cb-lw-m-pis,
        var(--p-cb-lw-s-pis, var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis)))
      );
    }
  }
  @media (min-width: 1300px) {
    .p-checkbox .label-wrapper{
      position: var(
        --p-cb-lw-l-pos,
        var(
          --p-cb-lw-m-pos,
          var(
            --p-cb-lw-s-pos,
            var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static))
          )
        )
      );
      width: var(
        --p-cb-lw-l-w,
        var(
          --p-cb-lw-m-w,
          var(--p-cb-lw-s-w, var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto)))
        )
      );
      height: var(
        --p-cb-lw-l-h,
        var(
          --p-cb-lw-m-h,
          var(--p-cb-lw-s-h, var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto)))
        )
      );
      padding: var(
        --p-cb-lw-l-pad,
        var(
          --p-cb-lw-m-pad,
          var(--p-cb-lw-s-pad, var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0)))
        )
      );
      margin: var(
        --p-cb-lw-l-m,
        var(
          --p-cb-lw-m-m,
          var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0)))
        )
      );
      overflow: var(
        --p-cb-lw-l-ov,
        var(
          --p-cb-lw-m-ov,
          var(--p-cb-lw-s-ov, var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible)))
        )
      );
      clip: var(
        --p-cb-lw-l-clip,
        var(
          --p-cb-lw-m-clip,
          var(
            --p-cb-lw-s-clip,
            var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto))
          )
        )
      );
      white-space: var(
        --p-cb-lw-l-ws,
        var(
          --p-cb-lw-m-ws,
          var(--p-cb-lw-s-ws, var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal)))
        )
      );
      min-width: var(
        --p-cb-lw-l-minw,
        var(
          --p-cb-lw-m-minw,
          var(--p-cb-lw-s-minw, var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw)))
        )
      );
      padding-top: var(
        --p-cb-lw-l-pt,
        var(
          --p-cb-lw-m-pt,
          var(--p-cb-lw-s-pt, var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt)))
        )
      );
      padding-inline-start: var(
        --p-cb-lw-l-pis,
        var(
          --p-cb-lw-m-pis,
          var(--p-cb-lw-s-pis, var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis)))
        )
      );
    }
  }
  @media (min-width: 1760px) {
    .p-checkbox .label-wrapper{
      position: var(--p-cb-lw-xl-pos, var(--p-cb-lw-l-pos));
      width: var(--p-cb-lw-xl-w, var(--p-cb-lw-l-w));
      height: var(--p-cb-lw-xl-h, var(--p-cb-lw-l-h));
      padding: var(--p-cb-lw-xl-pad, var(--p-cb-lw-l-pad));
      margin: var(--p-cb-lw-xl-m, var(--p-cb-lw-l-m));
      overflow: var(--p-cb-lw-xl-ov, var(--p-cb-lw-l-ov));
      clip: var(--p-cb-lw-xl-clip, var(--p-cb-lw-l-clip));
      white-space: var(--p-cb-lw-xl-ws, var(--p-cb-lw-l-ws));
      min-width: var(--p-cb-lw-xl-minw, var(--p-cb-lw-l-minw));
      padding-top: var(--p-cb-lw-xl-pt, var(--p-cb-lw-l-pt));
      padding-inline-start: var(--p-cb-lw-xl-pis, var(--p-cb-lw-l-pis));
    }
  }
  @media (min-width: 1920px) {
    .p-checkbox .label-wrapper{
      position: var(--p-cb-lw-xxl-pos, var(--p-cb-lw-xl-pos));
      width: var(--p-cb-lw-xxl-w, var(--p-cb-lw-xl-w));
      height: var(--p-cb-lw-xxl-h, var(--p-cb-lw-xl-h));
      padding: var(--p-cb-lw-xxl-pad, var(--p-cb-lw-xl-pad));
      margin: var(--p-cb-lw-xxl-m, var(--p-cb-lw-xl-m));
      overflow: var(--p-cb-lw-xxl-ov, var(--p-cb-lw-xl-ov));
      clip: var(--p-cb-lw-xxl-clip, var(--p-cb-lw-xl-clip));
      white-space: var(--p-cb-lw-xxl-ws, var(--p-cb-lw-xl-ws));
      min-width: var(--p-cb-lw-xxl-minw, var(--p-cb-lw-xl-minw));
      padding-top: var(--p-cb-lw-xxl-pt, var(--p-cb-lw-xl-pt));
      padding-inline-start: var(--p-cb-lw-xxl-pis, var(--p-cb-lw-xl-pis));
    }
  }`;function mn(p,c,e){let N,M,h,u,S,w,L,A,z,g;const E=["base","xs","s","m","l","xl","xxl"],B=(n,i,f)=>{const a=i==="base"?"--p-cb-lw":`--p-cb-lw-${i}`;if(f){n[`${a}-pos`]="absolute",n[`${a}-w`]="1px",n[`${a}-h`]="1px",n[`${a}-pad`]="0",n[`${a}-m`]="-1px",n[`${a}-ov`]="hidden",n[`${a}-clip`]="rect(0, 0, 0, 0)",n[`${a}-ws`]="nowrap",n[`${a}-minw`]="",n[`${a}-pt`]="",n[`${a}-pis`]="";return}n[`${a}-pos`]="static",n[`${a}-w`]="auto",n[`${a}-h`]="auto",n[`${a}-pad`]="0",n[`${a}-m`]="0",n[`${a}-ov`]="visible",n[`${a}-clip`]="auto",n[`${a}-ws`]="normal",n[`${a}-minw`]="fit-content",n[`${a}-pt`]="max(0px, calc((calc(var(--_p-checkbox-scaling) * 1.75rem) - var(--p-leading-normal)) / 2))",n[`${a}-pis`]="calc(11.2px * (var(--_p-checkbox-scaling) - 0.64285714) + 4px)"};let{disabled:d}=c,{loading:H}=c,{compact:K}=c,{state:m}=c,{message:k}=c,{label:v}=c,{hideLabel:T}=c,{checked:x}=c;function o(){return{disabled:d,loading:H,compact:K,state:m,message:k,label:v,hideLabel:T,checked:x}}return p.$$set=n=>{e(9,c=j(j({},c),$(n))),"disabled"in n&&e(10,d=n.disabled),"loading"in n&&e(11,H=n.loading),"compact"in n&&e(12,K=n.compact),"state"in n&&e(13,m=n.state),"message"in n&&e(14,k=n.message),"label"in n&&e(15,v=n.label),"hideLabel"in n&&e(16,T=n.hideLabel),"checked"in n&&e(17,x=n.checked)},p.$$.update=()=>{p.$$.dirty&40960&&e(18,N=()=>{const n=(l,y)=>{if(l==null)return y;if(l==="")return!0;if(typeof l=="string"&&l.charAt(0)==="{")try{return JSON.parse(l.replace(/'/g,'"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi,'"$1":'))}catch{return y}return l},i=l=>l===!0||l==="true"||l==="",f=(l,y,R)=>l&&typeof l=="object"?l[y]===void 0?R:l[y]:l,a=i(o().disabled),r=i(o().loading),t=i(o().compact),q=a||r,D=m||"none",F=!!(o().message||"")&&(D==="success"||D==="error"),nn=!!v,C=n(o().hideLabel,!1),O=typeof C=="object"&&C!==null?f(C,"base",!1):C,J={none:{bg:"var(--p-checkbox-background-color, var(--p-color-frosted))",border:"var(--p-checkbox-border-color, var(--p-color-contrast-lower))",hover:"var(--p-checkbox-border-color, var(--p-color-primary))",checked:"var(--p-color-primary)",checkedHover:"var(--p-checkbox-border-color, var(--p-color-contrast-high))",indeterminate:"var(--p-color-primary)",message:""},success:{bg:"var(--p-checkbox-background-color, var(--p-color-success-frosted-soft))",border:"var(--p-checkbox-border-color, var(--p-color-success))",hover:"var(--p-checkbox-border-color, var(--p-color-success))",checked:"var(--p-color-success)",checkedHover:"",indeterminate:"var(--p-color-success)",message:"var(--p-color-success)"},error:{bg:"var(--p-checkbox-background-color, var(--p-color-error-frosted-soft))",border:"var(--p-checkbox-border-color, var(--p-color-error))",hover:"var(--p-checkbox-border-color, var(--p-color-error))",checked:"var(--p-color-error)",checkedHover:"",indeterminate:"var(--p-color-error)",message:"var(--p-color-error)"}},I=J[D]||J.none,P={"--p-cb-scale":t?"0.64285714":"1","--p-cb-radius":t?"var(--p-radius-md)":"var(--p-radius-lg)","--p-cb-bg":I.bg,"--p-cb-border":I.border,"--p-cb-hover":I.hover,"--p-cb-checked":r?"":I.checked,"--p-cb-checked-hover":!r&&D==="none"?I.checkedHover:"","--p-cb-checked-hover-border":!r&&D==="none"?"transparent":"","--p-cb-indeterminate":r?"":I.indeterminate,"--p-cb-check-mask":r?"":vn,"--p-cb-dash-mask":r?"":wn,"--p-cb-icon-bg":r?"":"var(--p-checkbox-icon-color, var(--p-color-canvas))","--p-cb-pe":q?"none":"","--p-cb-cursor":q?"not-allowed":"pointer","--p-cb-opacity":a?"0.4":"","--p-cb-fc-border":q?"GrayText":"","--p-cb-spinner-display":r?"":"none","--p-cb-lw-display":nn?"":"none","--p-cb-msg":I.message,"--p-cb-msg-opacity":F?"":"0","--p-cb-msg-pos":F?"":"absolute","--p-cb-icon-display":F?"":"none"};if(typeof C=="object"&&C!==null){let l=i(O);for(const y of E)C[y]!==void 0&&(l=i(f(C,y,O))),B(P,y,l)}else B(P,"base",i(O));return P}),p.$$.dirty&32768&&e(8,M=()=>v||""),p.$$.dirty&8192&&e(7,h=()=>{const n=m||"none",i=o().message||"";return!i||n!=="success"&&n!=="error"?"":i}),p.$$.dirty&8192&&e(6,u=()=>{const n=m||"none";return!(o().message||"")||n!=="success"&&n!=="error"?"":n==="error"?"exclamation":"check"}),p.$$.dirty&8192&&e(5,S=()=>{const n=m||"none";return n==="error"?"error":n==="success"?"success":""}),p.$$.dirty&131072&&e(4,w=()=>x===!0||x==="true"||x===""),p.$$.dirty&1024&&e(3,L=()=>d===!0||d==="true"||d===""),p.$$.dirty&8192&&e(2,A=()=>m==="error"?"true":""),p.$$.dirty&262144&&e(0,g=on(N()))},e(1,z=()=>o().loading===!0||o().loading==="true"||o().loading===""?"Loading":""),c=$(c),[g,z,A,L,w,S,u,h,M,c,d,H,K,m,k,v,T,x,N]}class Hn extends an{constructor(c){super(),rn(this,c,mn,bn,cn,{disabled:10,loading:11,compact:12,state:13,message:14,label:15,hideLabel:16,checked:17})}}export{Hn as default};
