import{S as O,i as j,s as E,c as F,d as I,t as L,b as N,u as R,g as B,e as D,z as Z,p as c,k as G,l as w,m as P,H as J,n as A,a as C,q as T}from"./svelte-DoO7z26N.js";import{s as K}from"./host-DRskmCSE.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";function Q(a){let e,i,v=`<style>${U}</style>`,p,u,_,r,g,y,h,d,f,l;const m=a[14].default,n=F(m,a,a[13],null);return{c(){e=P("div"),i=new J(!1),p=A(),u=P("span"),n&&n.c(),_=A(),r=P("img"),i.a=p,c(u,"data-pds-slot",""),Z(r.src,g=a[0]())||c(r,"src",g),c(r,"alt",y=a[4]()),c(r,"fetchpriority",h=a[3]()),c(r,"loading",d=a[2]()),c(e,"class",f="p-model-signature"+(a[5].class?` ${a[5].class}`:"")),c(e,"data-pds","model-signature"),c(e,"style",a[1])},m(s,o){G(s,e,o),i.m(v,e),w(e,p),w(e,u),n&&n.m(u,null),w(e,_),w(e,r),l=!0},p(s,[o]){n&&n.p&&(!l||o&8192)&&R(n,m,s,s[13],l?D(m,s[13],o,null):B(s[13]),null),(!l||o&1&&!Z(r.src,g=s[0]()))&&c(r,"src",g),(!l||o&16&&y!==(y=s[4]()))&&c(r,"alt",y),(!l||o&8&&h!==(h=s[3]()))&&c(r,"fetchpriority",h),(!l||o&4&&d!==(d=s[2]()))&&c(r,"loading",d),(!l||o&32&&f!==(f="p-model-signature"+(s[5].class?` ${s[5].class}`:"")))&&c(e,"class",f),(!l||o&2)&&c(e,"style",s[1])},i(s){l||(N(n,s),l=!0)},o(s){L(n,s),l=!1},d(s){s&&I(e),n&&n.d(s)}}}const U=`.p-model-signature :where([data-pds-slot]){display:contents}

  .p-model-signature {
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
    max-height: 100%;
    width: var(--p-model-signature-width, var(--p-model-signature-w));
    height: var(--p-model-signature-height, auto);
    mask: var(--p-model-signature-mask) !important;
    aspect-ratio: var(--p-model-signature-aspect) !important;
    background: var(
      --p-model-signature-color,
      var(--p-model-signature-fallback, var(--p-color-primary))
    ) !important;
  }
  .p-model-signature[hidden] {
    display: none !important;
  }
  .p-model-signature [data-pds-slot] > :is(img, video){
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }
  .p-model-signature img{
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }
  @media (forced-colors: active) {
    .p-model-signature {
      background: CanvasText !important;
    }
  }`;function V(a,e,i){let v,p,u,_,r,g,{$$slots:y={},$$scope:h}=e;const d={718:{src:"718.493a9e3.svg",width:79,height:26},911:{src:"911.b68f913.svg",width:94,height:25},boxster:{src:"boxster.c321738.svg",width:239,height:26},cayenne:{src:"cayenne.2556201.svg",width:245,height:35},cayman:{src:"cayman.cc89196.svg",width:229,height:35},"gt3-rs":{src:"gt3-rs.03ac3ee.svg",width:238,height:25},gt3:{src:"gt3.bd3186c.svg",width:151,height:25},gts:{src:"gts.99bd35e.svg",width:121,height:25},macan:{src:"macan.a1844f4.svg",width:196,height:26},panamera:{src:"panamera.6dae809.svg",width:260,height:25},taycan:{src:"taycan.df444c6.svg",width:167,height:36},"turbo-s":{src:"turbo-s.73f1e10.svg",width:199,height:25},turbo:{src:"turbo.6a4084a.svg",width:143,height:25}},f={primary:"var(--p-color-primary)","contrast-low":"var(--p-color-contrast-low)","contrast-medium":"var(--p-color-contrast-medium)","contrast-high":"var(--p-color-contrast-high)",inherit:"currentcolor"},l=t=>t==null||t===""?!0:!(t===!1||t==="false");let{model:m}=e,{size:n}=e,{color:s}=e,{safeZone:o}=e,{fetchPriority:k}=e,{lazy:S}=e;function b(){return{model:m,size:n,color:s,safeZone:o,fetchPriority:k,lazy:S}}return a.$$set=t=>{i(5,e=C(C({},e),T(t))),"model"in t&&i(6,m=t.model),"size"in t&&i(7,n=t.size),"color"in t&&i(8,s=t.color),"safeZone"in t&&i(9,o=t.safeZone),"fetchPriority"in t&&i(10,k=t.fetchPriority),"lazy"in t&&i(11,S=t.lazy),"$$scope"in t&&i(13,h=t.$$scope)},a.$$.update=()=>{a.$$.dirty&512&&i(12,v=()=>{const t=b().model||"911",z=d[t]||d[911],q=b().size||"small",H=b().color||"primary",M="https://cdn.ui.porsche.com/porsche-design-system/model-signatures/"+z.src;return{"--p-model-signature-w":q==="inherit"?"auto":z.width+"px","--p-model-signature-aspect":z.width+" / "+(l(o)?36:z.height),"--p-model-signature-mask":"url("+M+") no-repeat left top / contain","--p-model-signature-fallback":f[H]||f.primary}}),a.$$.dirty&64&&i(4,u=()=>m||"911"),a.$$.dirty&1024&&i(3,_=()=>{const t=k||"auto";return t!=="auto"?t:void 0}),a.$$.dirty&4096&&i(1,g=K(v()))},i(0,p=()=>{const t=b().model||"911";return"https://cdn.ui.porsche.com/porsche-design-system/model-signatures/"+(d[t]||d[911]).src}),i(2,r=()=>{const t=b().lazy;if(t===!0||t==="true"||t==="")return"lazy"}),e=T(e),[p,g,r,_,u,e,m,n,s,o,k,S,v,h,y]}class tt extends O{constructor(e){super(),j(this,e,V,Q,E,{model:6,size:7,color:8,safeZone:9,fetchPriority:10,lazy:11})}}export{tt as default};
