import * as React from "react";

function LitTableHeadRow(props: any) {
  function cssText() {
    return ":host{display:table-row}:host([hidden]){display:none !important}";
  }

  return (
    <>
      <div className="root">
        <style dangerouslySetInnerHTML={{ __html: cssText() }} />
        <slot />
      </div>
      <style jsx>{`
        :host {
          display: table-row;
        }
        :host([hidden]) {
          display: none !important;
        }
      `}</style>
    </>
  );
}

export default LitTableHeadRow;
