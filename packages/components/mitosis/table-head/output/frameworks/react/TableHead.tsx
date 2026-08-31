import * as React from "react";

function LitTableHead(props: any) {
  function cssText() {
    return (
      ":host{display:table-header-group;" +
      "font:var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next) !important;" +
      "border-bottom:1px solid var(--_p-table-c) !important}" +
      ":host([hidden]){display:none !important}" +
      "::slotted(*){--_p-table-d:0px !important;--_p-table-b:none !important}"
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
          display: table-header-group;
        }
        :host([hidden]) {
          display: none !important;
        }
      `}</style>
    </>
  );
}

export default LitTableHead;
