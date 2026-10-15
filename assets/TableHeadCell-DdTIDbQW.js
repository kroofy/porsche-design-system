import{S as k,i as L,s as x,c as S,d as H,t as C,b as T,u as q,g as z,e as A,p as b,k as J,l as f,m,H as N,n as O,a as v,q as g}from"./svelte-DoO7z26N.js";import{s as P}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function j(s){let a,i,u=`<style>${B}</style>`,c,h,p,r,n;const d=s[7].default,l=S(d,s,s[6],null);return{c(){a=m("div"),i=new N(!1),c=O(),h=m("span"),p=m("span"),l&&l.c(),i.a=c,b(p,"data-pds-slot",""),b(a,"class",r="p-table-head-cell"+(s[1].class?` ${s[1].class}`:"")),b(a,"data-pds","table-head-cell"),b(a,"style",s[0])},m(t,e){J(t,a,e),i.m(u,a),f(a,c),f(a,h),f(h,p),l&&l.m(p,null),n=!0},p(t,[e]){l&&l.p&&(!n||e&64)&&q(l,d,t,t[6],n?A(d,t[6],e,null):z(t[6]),null),(!n||e&2&&r!==(r="p-table-head-cell"+(t[1].class?` ${t[1].class}`:"")))&&b(a,"class",r),(!n||e&1)&&b(a,"style",t[0])},i(t){n||(T(l,t),n=!0)},o(t){C(l,t),n=!1},d(t){t&&H(a),l&&l.d(t)}}}const B=`.p-table-head-cell :where([data-pds-slot]){display:contents}

  .p-table-head-cell {
    display: table-cell;
    padding: 2px var(--_p-table-a, var(--p-spacing-fluid-sm))
      var(--_p-table-a, var(--p-spacing-fluid-sm)) !important;
    vertical-align: bottom !important;
    white-space: var(--p-table-head-cell-ws, nowrap) !important;
  }
  .p-table-head-cell[hidden] {
    display: none !important;
  }
  .p-table-head-cell button{
    position: relative;
    display: flex;
    gap: var(--p-spacing-static-xs);
    width: auto;
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
    align-items: flex-end;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    text-align: start;
    border: 0;
    z-index: 0;
    cursor: pointer;
  }
  .p-table-head-cell button:focus,
  .p-table-head-cell button:focus-visible{
    outline: none;
  }
  .p-table-head-cell button::before{
    content: "";
    position: absolute;
    inset: -2px -4px;
    border-radius: var(--p-radius-sm);
    z-index: -1;
    transition: background-color
      var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
  }
  .p-table-head-cell button:focus-visible::before{
    outline: 2px solid var(--p-color-focus);
    outline-offset: 2px;
  }
  @media (forced-colors: active) {
    .p-table-head-cell button:focus-visible::before{
      outline-color: Highlight;
    }
  }
  @media (hover: hover) {
    .p-table-head-cell button:hover::before{
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
      background-color: var(--p-color-frosted);
    }
    .p-table-head-cell button:hover .icon,
    .p-table-head-cell button:focus-visible .icon{
      opacity: 1;
    }
  }
  .p-table-head-cell .icon{
    transition: opacity var(--p-transition-duration, var(--p-duration-sm))
      var(--p-ease-in-out);
    opacity: var(--p-table-head-cell-icon-opacity, 0);
    transform: rotate3d(0, 0, 1, var(--p-table-head-cell-icon-deg, 0deg));
    transform-origin: 50% 50%;
  }
  .p-table-head-cell span{
    position: var(--p-table-head-cell-span-pos);
    width: var(--p-table-head-cell-span-w);
    height: var(--p-table-head-cell-span-h);
    padding: var(--p-table-head-cell-span-pad);
    margin: var(--p-table-head-cell-span-m);
    overflow: var(--p-table-head-cell-span-overflow);
    clip: var(--p-table-head-cell-span-clip);
    white-space: var(--p-table-head-cell-span-ws);
    display: var(--p-table-head-cell-span-display);
    border: var(--p-table-head-cell-span-border);
  }`;function D(s,a,i){let u,c,{$$slots:h={},$$scope:p}=a,{sort:r}=a,{hideLabel:n}=a,{multiline:d}=a;function l(){return{sort:r,hideLabel:n,multiline:d}}function t(){let e=l().sort;if(typeof e=="string"&&e.charAt(0)==="{")try{e=JSON.parse(e)}catch{e=void 0}return e}return s.$$set=e=>{i(1,a=v(v({},a),g(e))),"sort"in e&&i(2,r=e.sort),"hideLabel"in e&&i(3,n=e.hideLabel),"multiline"in e&&i(4,d=e.multiline),"$$scope"in e&&i(6,p=e.$$scope)},s.$$.update=()=>{s.$$.dirty&32&&i(0,c=P(u()))},i(5,u=()=>{const e=t(),o=l().hideLabel===!0||l().hideLabel==="true"||l().hideLabel==="",y=l().multiline===!0||l().multiline==="true"||l().multiline==="",_=e?e.active:void 0,w=e?e.direction:void 0;return{"--p-table-head-cell-ws":y?"normal":"nowrap","--p-table-head-cell-icon-opacity":_?"1":"0","--p-table-head-cell-icon-deg":w==="asc"?"0deg":"180deg","--p-table-head-cell-span-pos":o?"absolute":"","--p-table-head-cell-span-w":o?"1px":"","--p-table-head-cell-span-h":o?"1px":"","--p-table-head-cell-span-pad":o?"0":"","--p-table-head-cell-span-m":o?"-1px":"","--p-table-head-cell-span-overflow":o?"hidden":"","--p-table-head-cell-span-clip":o?"rect(0, 0, 0, 0)":"","--p-table-head-cell-span-ws":o?"nowrap":"","--p-table-head-cell-span-display":o?"block":"","--p-table-head-cell-span-border":o?"0":""}}),a=g(a),[c,a,r,n,d,u,p,h]}class M extends k{constructor(a){super(),L(this,a,D,j,x,{sort:2,hideLabel:3,multiline:4})}}export{M as default};
