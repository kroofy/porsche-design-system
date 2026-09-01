/* mitosis-native-host: native react from TableCell.lite.tsx */
import * as React from "react";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitTableCellProps {
  className?: string;
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
    <div
      className={["p-table-cell", props.className].filter(Boolean).join(" ")}
      data-pds="table-cell"
    >
      <div className="root">
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host {\n          display: table-cell;\n        }\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-table-cell") }} />
        {props.children}
      </div>
    </div>
  );
}

export default LitTableCell;
