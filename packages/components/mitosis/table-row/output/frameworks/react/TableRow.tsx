/* mitosis-native-host: native react from TableRow.lite.tsx */
import * as React from "react";

import { scopeCss } from "../../../../_runtime/scope-css.js";
function LitTableRow(props: any) {
  function cssText() {
    return (
      ":host{display:table-row;" +
      "border-bottom:var(--_p-table-d) solid var(--_p-table-c) !important;" +
      "transition:background var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out) !important}" +
      ":host([hidden]){display:none !important}" +
      "@media(hover:hover){:host(:hover){background:var(--_p-table-b) !important}}"
    );
  }

  return (
    <div
      className={["p-table-row", props.className].filter(Boolean).join(" ")}
      data-pds="table-row"
    >
      <div className="root">
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host {\n          display: table-row;\n        }\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-table-row") }} />
        {props.children}
      </div>
    </div>
  );
}

export default LitTableRow;
