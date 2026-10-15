import{I as i,C as h,V as g,a as m}from"./angular-aNJmk6GY.js";import"./frame-CaEmk3ad.js";import"./demos-BkDTeAY5.js";import"./tree-XHc55TER.js";var u=Object.defineProperty,v=Object.getOwnPropertyDescriptor,s=(t,e,n,a)=>{for(var r=a>1?void 0:a?v(e,n):e,p=t.length-1,l;p>=0;p--)(l=t[p])&&(r=(a?l(e,n,r):l(r))||r);return a&&r&&u(e,n,r),r};const c={718:{src:"718.493a9e3.svg",width:79,height:26},911:{src:"911.b68f913.svg",width:94,height:25},boxster:{src:"boxster.c321738.svg",width:239,height:26},cayenne:{src:"cayenne.2556201.svg",width:245,height:35},cayman:{src:"cayman.cc89196.svg",width:229,height:35},"gt3-rs":{src:"gt3-rs.03ac3ee.svg",width:238,height:25},gt3:{src:"gt3.bd3186c.svg",width:151,height:25},gts:{src:"gts.99bd35e.svg",width:121,height:25},macan:{src:"macan.a1844f4.svg",width:196,height:26},panamera:{src:"panamera.6dae809.svg",width:260,height:25},taycan:{src:"taycan.df444c6.svg",width:167,height:36},"turbo-s":{src:"turbo-s.73f1e10.svg",width:199,height:25},turbo:{src:"turbo.6a4084a.svg",width:143,height:25}},d={primary:"var(--p-color-primary)","contrast-low":"var(--p-color-contrast-low)","contrast-medium":"var(--p-color-contrast-medium)","contrast-high":"var(--p-color-contrast-high)",inherit:"currentcolor"},y=t=>t==null||t===""?!0:!(t===!1||t==="false");let o=class{get hostStyle(){const t=this.model||"911",e=c[t]||c[911],n=this.size||"small",a=this.color||"primary",r="https://cdn.ui.porsche.com/porsche-design-system/model-signatures/"+e.src;return{"--p-model-signature-w":n==="inherit"?"auto":e.width+"px","--p-model-signature-aspect":e.width+" / "+(y(this.safeZone)?36:e.height),"--p-model-signature-mask":"url("+r+") no-repeat left top / contain","--p-model-signature-fallback":d[a]||d.primary}}get src(){const t=this.model||"911";return"https://cdn.ui.porsche.com/porsche-design-system/model-signatures/"+(c[t]||c[911]).src}get alt(){return this.model||"911"}get fetchPriorityAttr(){const t=this.fetchPriority||"auto";return t!=="auto"?t:void 0}get loadingAttr(){const t=this.lazy;if(t===!0||t==="true"||t==="")return"lazy"}};s([i()],o.prototype,"model",2);s([i()],o.prototype,"size",2);s([i()],o.prototype,"color",2);s([i()],o.prototype,"safeZone",2);s([i()],o.prototype,"fetchPriority",2);s([i()],o.prototype,"lazy",2);o=s([h({selector:"p-model-signature",standalone:!0,imports:[m],encapsulation:g.None,template:`
    <div class="p-model-signature" data-pds="model-signature" [style]="hostStyle">
    <ng-container
      ><span data-pds-slot=""><ng-content></ng-content></span>
      <img
        [attr.src]="src"
        [attr.alt]="alt"
        [attr.fetchpriority]="fetchPriorityAttr"
        [attr.loading]="loadingAttr"
    /></ng-container>
  
    </div>
  `,styles:[`.p-model-signature :where([data-pds-slot]){display:contents}

      .p-model-signature {
        display: contents;
      }
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
      }`]})],o);export{o as default};
