import * as React from "react";

export interface LitTableCellProps {
  multiline?: any;
}

function LitTableCell(props: LitTableCellProps) {
  function cssText() {
    const multiline =
      props.multiline === true ||
      props.multiline === "true" ||
      props.multiline === "";
    const whiteSpace = multiline ? "normal" : "nowrap";
    return (
      ":host{display:table-cell;vertical-align:middle;" +
      "padding:var(--_p-table-a) !important;" +
      "margin:0 !important;" +
      "white-space:" +
      whiteSpace +
      " !important}" +
      ":host([hidden]){display:none !important}"
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
          display: table-cell;
        }
        :host([hidden]) {
          display: none !important;
        }
      `}</style>
    </>
  );
}

export default LitTableCell;
