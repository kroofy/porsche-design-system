import{S as N,i as Q,s as W,c as O,d as X,v as Y,t as F,b as U,f as R,u as V,g as j,e as A,p,k as Z,l as d,w as $,m as h,H as nn,n as D,x as on,o as E,a as I,q as J}from"./svelte-DoO7z26N.js";import{s as an}from"./host-DRskmCSE.js";import rn from"./Spinner-CHLfbpXm.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const en=a=>({}),K=a=>({}),tn=a=>({}),M=a=>({});function ln(a){let r,e,G=`<style>${pn}</style>`,z,u,k,f,H,C,y,_,g,b,w=a[4]()+"",P,v,x,T,S,t,n=a[2]()+"",m,q,s;y=new rn({props:{class:"spinner","aria-hidden":"true"}});const L=a[17].label,i=O(L,a,a[16],M),B=a[17]["label-after"],c=O(B,a,a[16],K);return{c(){r=h("div"),e=new nn(!1),z=D(),u=h("div"),k=h("div"),f=h("input"),on(y.$$.fragment),_=D(),g=h("div"),b=h("label"),P=E(w),v=h("span"),i&&i.c(),x=h("span"),T=h("span"),c&&c.c(),S=D(),t=h("span"),m=E(n),e.a=z,p(f,"type","radio"),f.value=H=a[1](),f.disabled=C=!!a[3](),p(k,"class","wrapper"),p(v,"data-pds-slot","label"),p(b,"class","label"),p(b,"id","label"),p(T,"data-pds-slot","label-after"),p(x,"class","label-after"),p(g,"class","label-wrapper"),p(t,"class","loading"),p(t,"id","loading"),p(u,"class","root"),p(r,"class",q="p-radio-group-option"+(a[5].class?` ${a[5].class}`:"")),p(r,"data-pds","radio-group-option"),p(r,"style",a[0])},m(o,l){Z(o,r,l),e.m(G,r),d(r,z),d(r,u),d(u,k),d(k,f),$(y,k,null),d(u,_),d(u,g),d(g,b),d(b,P),d(b,v),i&&i.m(v,null),d(g,x),d(x,T),c&&c.m(T,null),d(u,S),d(u,t),d(t,m),s=!0},p(o,[l]){(!s||l&2&&H!==(H=o[1]()))&&(f.value=H),(!s||l&8&&C!==(C=!!o[3]()))&&(f.disabled=C),(!s||l&16)&&w!==(w=o[4]()+"")&&R(P,w),i&&i.p&&(!s||l&65536)&&V(i,L,o,o[16],s?A(L,o[16],l,tn):j(o[16]),M),c&&c.p&&(!s||l&65536)&&V(c,B,o,o[16],s?A(B,o[16],l,en):j(o[16]),K),(!s||l&4)&&n!==(n=o[2]()+"")&&R(m,n),(!s||l&32&&q!==(q="p-radio-group-option"+(o[5].class?` ${o[5].class}`:"")))&&p(r,"class",q),(!s||l&1)&&p(r,"style",o[0])},i(o){s||(U(y.$$.fragment,o),U(i,o),U(c,o),s=!0)},o(o){F(y.$$.fragment,o),F(i,o),F(c,o),s=!1},d(o){o&&X(r),Y(y),i&&i.d(o),c&&c.d(o)}}}const pn=`.p-radio-group-option :where([data-pds-slot]){display:contents}

  .p-radio-group-option {
    display: block;
  }
  .p-radio-group-option[hidden] {
    display: none !important;
  }
  .p-radio-group-option [data-pds-slot="label-after"]{
    display: inline-block;
    vertical-align: top;
  }
  .p-radio-group-option [data-pds-slot="label-after"] > *{
    margin-inline-start: var(--p-spacing-static-xs) !important;
  }
  .p-radio-group-option .label-after{
    display: inline-block;
    vertical-align: top;
  }
  .p-radio-group-option input{
    all: unset;
    display: grid;
    width: calc(var(--_p-radio-group-option-a) * 1.75rem);
    height: calc(var(--_p-radio-group-option-a) * 1.75rem);
    margin-block: max(
      0px,
      calc(
        (
            var(--p-leading-normal) -
              calc(var(--_p-radio-group-option-a) * 1.75rem)
          ) / 2
      )
    );
    box-sizing: border-box;
    font: var(--p-typescale-sm) var(--p-font-porsche-next);
    background: var(--p-rgo-bg);
    transition: background-color
        var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
      border-color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    border: 1px solid var(--p-rgo-border);
    border-radius: var(--p-radius-full);
    pointer-events: var(--p-rgo-pe);
  }
  .p-radio-group-option input:focus-visible{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  .p-radio-group-option input:checked{
    background: var(--p-rgo-checked);
  }
  .p-radio-group-option input::before{
    content: "";
    grid-area: 1 / 1;
  }
  .p-radio-group-option input::after{
    content: "";
    margin: calc(
      -1px - max(0px, calc(
              24px - calc(var(--_p-radio-group-option-a) * 1.75rem)
            ) / 2)
    );
    grid-area: 1 / 1;
  }
  .p-radio-group-option input:checked::before{
    -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>')
      center / contain no-repeat;
    mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>')
      center / contain no-repeat;
    background-color: var(--p-color-canvas);
  }
  .p-radio-group-option .root{
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    row-gap: var(--p-spacing-static-xs);
  }
  .p-radio-group-option .wrapper{
    position: relative;
    display: flex;
    align-items: center;
    align-self: flex-start;
    min-height: var(--p-leading-normal);
    cursor: var(--p-rgo-cursor, pointer);
    opacity: var(--p-rgo-opacity);
  }
  .p-radio-group-option .spinner{
    --p-spinner-size: calc(
      calc(var(--_p-radio-group-option-a) * 1.75rem) - 2px
    );
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .p-radio-group-option .label-wrapper{
    min-width: fit-content;
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
    padding-top: max(
      0px,
      calc(
        (
            calc(var(--_p-radio-group-option-a) * 1.75rem) -
              var(--p-leading-normal)
          ) / 2
      )
    );
    padding-inline-start: calc(
      11.2px * (var(--_p-radio-group-option-a) - 0.64285714) + 4px
    );
  }
  .p-radio-group-option .label{
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    cursor: var(--p-rgo-cursor, pointer);
    color: var(--p-color-primary);
    pointer-events: var(--p-rgo-pe);
    opacity: var(--p-rgo-opacity);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
    display: inline;
  }
  .p-radio-group-option .label:empty{
    display: none;
  }
  .p-radio-group-option .label:is(span){
    cursor: unset;
    font-size: var(--p-typescale-xs);
    color: var(--p-color-contrast-high);
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
    margin-top: calc(-1 * var(--p-spacing-static-xs));
  }
  .p-radio-group-option .label > [data-pds-slot="label"] > *{
    display: inline !important;
  }
  .p-radio-group-option .required{
    user-select: none;
  }
  .p-radio-group-option .loading{
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
    .p-radio-group-option input{
      border-color: var(--p-rgo-fc-input-border);
    }
    .p-radio-group-option input:checked::before{
      background: CanvasText;
    }
    .p-radio-group-option input:focus-visible{
      outline-color: Highlight;
    }
    .p-radio-group-option .wrapper{
      opacity: var(--p-rgo-fc-opacity);
      color: var(--p-rgo-fc-color);
    }
    .p-radio-group-option .label{
      opacity: var(--p-rgo-fc-opacity);
      color: var(--p-rgo-fc-color);
    }
  }
  @media (hover: hover) {
    .p-radio-group-option input:hover{
      border-color: var(--p-rgo-hover);
    }
  }`;function sn(a,r,e){let G,z,u,k,f,H,{$$slots:C={},$$scope:y}=r,{disabled:_}=r,{disabledParent:g}=r,{selected:b}=r,{loading:w}=r,{loadingParent:P}=r,{state:v}=r,{label:x}=r,{name:T}=r,{value:S}=r;function t(){return{disabled:_,disabledParent:g,selected:b,loading:w,loadingParent:P,state:v,label:x,name:T,value:S}}return a.$$set=n=>{e(5,r=I(I({},r),J(n))),"disabled"in n&&e(6,_=n.disabled),"disabledParent"in n&&e(7,g=n.disabledParent),"selected"in n&&e(8,b=n.selected),"loading"in n&&e(9,w=n.loading),"loadingParent"in n&&e(10,P=n.loadingParent),"state"in n&&e(11,v=n.state),"label"in n&&e(12,x=n.label),"name"in n&&e(13,T=n.name),"value"in n&&e(14,S=n.value),"$$scope"in n&&e(16,y=n.$$scope)},a.$$.update=()=>{a.$$.dirty&3200&&e(15,G=()=>{const n=l=>l===!0||l==="true"||l==="",m=n(t().disabled)||n(g),q=n(t().selected),L=n(t().loading)&&!q||n(P),i=m||L,B=v==="success"||v==="error"?v:"none",c={none:{bg:"var(--p-color-frosted)",border:"var(--p-color-contrast-lower)",hover:"var(--p-color-primary)",checked:"var(--p-color-primary)"},success:{bg:"var(--p-color-success-frosted-soft)",border:"var(--p-color-success)",hover:"var(--p-color-success)",checked:"var(--p-color-success)"},error:{bg:"var(--p-color-error-frosted-soft)",border:"var(--p-color-error)",hover:"var(--p-color-error)",checked:"var(--p-color-error)"}},o=c[B]||c.none;return{"--p-rgo-bg":o.bg,"--p-rgo-border":o.border,"--p-rgo-hover":i?"":o.hover,"--p-rgo-checked":o.checked,"--p-rgo-pe":i?"none":"","--p-rgo-cursor":i?"not-allowed":"pointer","--p-rgo-opacity":m?"0.4":"","--p-rgo-fc-opacity":m?"1":"","--p-rgo-fc-color":m?"GrayText":"","--p-rgo-fc-input-border":i?"GrayText":""}}),a.$$.dirty&4096&&e(4,z=()=>x||""),a.$$.dirty&192&&e(3,u=()=>_===!0||_==="true"||_===""||g===!0||g==="true"||g===""),a.$$.dirty&256,a.$$.dirty&1024,a.$$.dirty&2048,a.$$.dirty&8192,a.$$.dirty&16384&&e(1,f=()=>S==null?"":String(S)),a.$$.dirty&32768&&e(0,H=an(G()))},e(2,k=()=>{const n=t().selected===!0||t().selected==="true"||t().selected==="",m=t().loading===!0||t().loading==="true"||t().loading==="";return t().loadingParent===!0||t().loadingParent==="true"||t().loadingParent===""?"":m&&!n?"Loading":""}),r=J(r),[H,f,k,u,z,r,_,g,b,w,P,v,x,T,S,G,y,C]}class bn extends N{constructor(r){super(),Q(this,r,sn,ln,W,{disabled:6,disabledParent:7,selected:8,loading:9,loadingParent:10,state:11,label:12,name:13,value:14})}}export{bn as default};
