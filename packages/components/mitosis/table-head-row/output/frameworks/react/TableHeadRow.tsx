/* mitosis-native-host: native react from TableHeadRow.lite.tsx */
import * as React from "react";

import { scopeCss } from "../../../../_runtime/scope-css.js";
function LitTableHeadRow(props: any) {
  function cssText() {
    return ":host{display:table-row}:host([hidden]){display:none !important}";
  }

  return (
    <div
      className={["p-table-head-row", props.className].filter(Boolean).join(" ")}
      data-pds="table-head-row"
    >
      <div className="root">
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host {\n          display: table-row;\n        }\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-table-head-row") }} />
        {props.children}
      </div>
    </div>
  );
}

export default LitTableHeadRow;
