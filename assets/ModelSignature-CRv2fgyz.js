import{j as n}from"./react-C3neMvrl.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";const i={718:{src:"718.493a9e3.svg",width:79,height:26},911:{src:"911.b68f913.svg",width:94,height:25},boxster:{src:"boxster.c321738.svg",width:239,height:26},cayenne:{src:"cayenne.2556201.svg",width:245,height:35},cayman:{src:"cayman.cc89196.svg",width:229,height:35},"gt3-rs":{src:"gt3-rs.03ac3ee.svg",width:238,height:25},gt3:{src:"gt3.bd3186c.svg",width:151,height:25},gts:{src:"gts.99bd35e.svg",width:121,height:25},macan:{src:"macan.a1844f4.svg",width:196,height:26},panamera:{src:"panamera.6dae809.svg",width:260,height:25},taycan:{src:"taycan.df444c6.svg",width:167,height:36},"turbo-s":{src:"turbo-s.73f1e10.svg",width:199,height:25},turbo:{src:"turbo.6a4084a.svg",width:143,height:25}},a={primary:"var(--p-color-primary)","contrast-low":"var(--p-color-contrast-low)","contrast-medium":"var(--p-color-contrast-medium)","contrast-high":"var(--p-color-contrast-high)",inherit:"currentcolor"},u=t=>t==null||t===""?!0:!(t===!1||t==="false");function w(t){function s(){const e=t.model||"911",r=i[e]||i[911],h=t.size||"small",g=t.color||"primary",m="https://cdn.ui.porsche.com/porsche-design-system/model-signatures/"+r.src;return{"--p-model-signature-w":h==="inherit"?"auto":r.width+"px","--p-model-signature-aspect":r.width+" / "+(u(t.safeZone)?36:r.height),"--p-model-signature-mask":"url("+m+") no-repeat left top / contain","--p-model-signature-fallback":a[g]||a.primary}}function o(){const e=t.model||"911";return"https://cdn.ui.porsche.com/porsche-design-system/model-signatures/"+(i[e]||i[911]).src}function c(){return t.model||"911"}function d(){const e=t.fetchPriority||"auto";return e!=="auto"?e:void 0}function l(){const e=t.lazy;if(e===!0||e==="true"||e==="")return"lazy"}return n.jsxs("div",{className:["p-model-signature",t.className].filter(Boolean).join(" "),"data-pds":"model-signature",style:s(),children:[n.jsx("style",{dangerouslySetInnerHTML:{__html:`.p-model-signature :where([data-pds-slot]){display:contents}

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
        }`}}),n.jsx(n.Fragment,{children:n.jsxs(n.Fragment,{children:[n.jsx("span",{"data-pds-slot":"",children:t.children}),n.jsx("img",{src:o(),alt:c(),fetchpriority:d(),loading:l()})]})})]})}export{w as default};
