/* mitosis-native-host: native react from TableBody.lite.tsx */
import * as React from "react";

import { scopeCss } from "../../../../_runtime/scope-css.js";
function LitTableBody(props: any) {
  function cssText() {
    return ":host{display:table-row-group}:host([hidden]){display:none !important}";
  }

  return (
    <div
      className={["p-table-body", props.className].filter(Boolean).join(" ")}
      data-pds="table-body"
    >
      <div className="root">
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host {\n          display: table-row-group;\n        }\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-table-body") }} />
        {props.children}
      </div>
    </div>
  );
}

export default LitTableBody;
