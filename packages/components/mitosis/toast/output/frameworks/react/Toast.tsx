import * as React from "react";

function LitToast(props: any) {
  function cssText() {
    return (
      ":host{--_p-toast-a:var(--p-toast-position-bottom,56px) !important;" +
      "position:fixed !important;" +
      "inset:auto max(22px, 10.625vw - 12px) var(--_p-toast-a) !important;" +
      "z-index:999999 !important}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "@keyframes in{from{transform:translate3d(0,calc(var(--_p-toast-a) + 100%),0)}to{transform:translate3d(0,0,0)}}" +
      "@keyframes out{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,calc(var(--_p-toast-a) + 100%),0)}}" +
      "@media(min-width:760px){:host{--_p-toast-a:var(--p-toast-position-bottom,64px) !important;" +
      "inset:auto auto var(--_p-toast-a) 64px !important;" +
      "max-width:min(42rem, calc(100vw - 64px * 2)) !important}}" +
      ".hydrated{animation:var(--p-animation-duration,.4s) in cubic-bezier(0,0,.2,1) forwards}" +
      ".close{animation:.4s out cubic-bezier(.4,0,.5,1) forwards !important}"
    );
  }

  return (
    <>
      <div className="root">
        <style dangerouslySetInnerHTML={{ __html: cssText() }} />
        <slot />
      </div>
      <style jsx>{`
        :host {
          position: fixed;
        }
        :host([hidden]) {
          display: none !important;
        }
      `}</style>
    </>
  );
}

export default LitToast;
