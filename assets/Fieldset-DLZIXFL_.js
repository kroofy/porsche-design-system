import{S as I,i as M,s as N,c as P,d as j,v as A,t as T,b as q,f as C,u as B,g as D,e as E,p as u,k as G,l as y,w as J,m as k,H as K,n as O,o as H,x as Q,a as L,q as F}from"./svelte-DoO7z26N.js";import{s as R}from"./host-DRskmCSE.js";import U from"./Icon-MNhZuw6T.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";import"./index-ChNsHkGO.js";function V(a){let t,l,S=`<style>${W}</style>`,v,m,b,g=a[4]()+"",_,h,c,n,f=a[3]()+"",d,p,r;const e=a[12].default,o=P(e,a,a[11],null);return n=new U({props:{"aria-hidden":"true",name:a[2](),color:a[1]()}}),{c(){t=k("div"),l=new K(!1),v=O(),m=k("fieldset"),b=k("legend"),_=H(g),h=k("span"),o&&o.c(),c=k("span"),Q(n.$$.fragment),d=H(f),l.a=v,u(h,"data-pds-slot",""),u(c,"class","message"),u(c,"id","message"),u(t,"class",p="p-fieldset"+(a[5].class?` ${a[5].class}`:"")),u(t,"data-pds","fieldset"),u(t,"style",a[0])},m(s,i){G(s,t,i),l.m(S,t),y(t,v),y(t,m),y(m,b),y(b,_),y(m,h),o&&o.m(h,null),y(m,c),J(n,c,null),y(c,d),r=!0},p(s,[i]){(!r||i&16)&&g!==(g=s[4]()+"")&&C(_,g),o&&o.p&&(!r||i&2048)&&B(o,e,s,s[11],r?E(e,s[11],i,null):D(s[11]),null);const z={};i&4&&(z.name=s[2]()),i&2&&(z.color=s[1]()),n.$set(z),(!r||i&8)&&f!==(f=s[3]()+"")&&C(d,f),(!r||i&32&&p!==(p="p-fieldset"+(s[5].class?` ${s[5].class}`:"")))&&u(t,"class",p),(!r||i&1)&&u(t,"style",s[0])},i(s){r||(q(o,s),q(n.$$.fragment,s),r=!0)},o(s){T(o,s),T(n.$$.fragment,s),r=!1},d(s){s&&j(t),o&&o.d(s),A(n)}}}const W=`.p-fieldset :where([data-pds-slot]){display:contents}

  .p-fieldset {
    display: block;
  }
  .p-fieldset[hidden] {
    display: none !important;
  }
  .p-fieldset fieldset{
    all: unset;
    display: block;
  }
  .p-fieldset legend{
    all: unset;
    display: var(--p-fieldset-legend-display);
    margin-bottom: var(--p-spacing-static-md);
    color: var(--p-color-primary);
    font: var(--p-fieldset-legend-font) / var(--p-leading-normal)
      var(--p-font-porsche-next);
  }
  .p-fieldset .required{
    user-select: none;
  }
  .p-fieldset .message{
    display: flex;
    gap: var(--p-spacing-static-xs);
    font: var(--p-font-weight-normal) var(--p-typescale-sm) /
      var(--p-leading-normal) var(--p-font-porsche-next);
    color: var(--p-fieldset-msg-color);
    transition: color var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out),
      opacity var(--p-transition-duration, var(--p-duration-sm))
        var(--p-ease-in-out);
    margin-top: var(--p-spacing-static-md);
    opacity: var(--p-fieldset-msg-opacity);
    position: var(--p-fieldset-msg-pos);
  }
  .p-fieldset .message:empty{
    opacity: 0;
    position: absolute;
  }
  .p-fieldset .message .p-icon{
    display: var(--p-fieldset-icon-display);
  }`;function X(a,t,l){let S,v,m,b,g,_,{$$slots:h={},$$scope:c}=t,{state:n}=t,{message:f}=t,{label:d}=t,{labelSize:p}=t;function r(){return{state:n,message:f,label:d,labelSize:p}}return a.$$set=e=>{l(5,t=L(L({},t),F(e))),"state"in e&&l(6,n=e.state),"message"in e&&l(7,f=e.message),"label"in e&&l(8,d=e.label),"labelSize"in e&&l(9,p=e.labelSize),"$$scope"in e&&l(11,c=e.$$scope)},a.$$.update=()=>{a.$$.dirty&576&&l(10,S=()=>{const e=n==="success"||n==="error"?n:"none",s=!!(r().message||"")&&(e==="success"||e==="error");return{"--p-fieldset-legend-display":!!(r().label||"")?"":"none","--p-fieldset-legend-font":(p||"medium")==="small"?"var(--p-font-weight-semibold) var(--p-typescale-sm)":"var(--p-font-weight-normal) var(--p-typescale-md)","--p-fieldset-msg-color":{none:"",success:"var(--p-color-success)",error:"var(--p-color-error)"}[e]||"","--p-fieldset-msg-opacity":s?"":"0","--p-fieldset-msg-pos":s?"":"absolute","--p-fieldset-icon-display":s?"":"none"}}),a.$$.dirty&256&&l(4,v=()=>d||""),a.$$.dirty&64&&l(3,m=()=>{const e=n||"none",o=r().message||"";return!o||e!=="success"&&e!=="error"?"":o}),a.$$.dirty&64&&l(2,b=()=>{const e=n||"none";return!(r().message||"")||e!=="success"&&e!=="error"?"":e==="error"?"exclamation":"check"}),a.$$.dirty&64&&l(1,g=()=>{const e=n||"none";return e==="error"?"error":e==="success"?"success":""}),a.$$.dirty&1024&&l(0,_=R(S()))},t=F(t),[_,g,b,m,v,t,n,f,d,p,S,c,h]}class ne extends I{constructor(t){super(),M(this,t,X,V,N,{state:6,message:7,label:8,labelSize:9})}}export{ne as default};
