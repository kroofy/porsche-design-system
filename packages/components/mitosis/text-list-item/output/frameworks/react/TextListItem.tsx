/* mitosis-native-host: native react from TextListItem.lite.tsx */
import * as React from "react";

import { scopeCss } from "../../../../_runtime/scope-css.js";
function LitTextListItem(props: any) {
  function cssText() {
    return (
      ":host{display:grid;grid-template-columns:var(--_p-text-list-e) 1fr !important;column-gap:var(--p-spacing-static-md) !important;font:inherit !important;color:inherit !important}" +
      ":host([hidden]){display:none !important}" +
      ".root{display:contents}" +
      "slot{display:inline}" +
      '::slotted(*){--_p-text-list-f:.625rem !important;--_p-text-list-g:"–" !important;--_p-text-list-a:2rem !important;--_p-text-list-b:"" !important}' +
      "::slotted(*:last-child){grid-column:2 !important}"
    );
  }

  return (
    <div
      className={["p-text-list-item", props.className].filter(Boolean).join(" ")}
      data-pds="text-list-item"
    >
      <div className="root">
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-text-list-item") }} />
        {props.children}
      </div>
    </div>
  );
}

export default LitTextListItem;
