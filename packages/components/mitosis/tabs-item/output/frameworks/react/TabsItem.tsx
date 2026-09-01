/* mitosis-native-host: native react from TabsItem.lite.tsx */
import * as React from "react";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitTabsItemProps {
  className?: string;
  label?: string;
}

function LitTabsItem(props: LitTabsItemProps) {
  function cssText() {
    return (
      ":host{display:block;color:var(--p-color-primary) !important;border-radius:2px !important}" +
      ":host([hidden]){display:none !important}" +
      ":host(:focus-visible){outline:2px solid var(--p-color-focus) !important;outline-offset:2px !important}" +
      "@media(forced-colors:active){:host(:focus-visible){outline-color:Highlight !important}}"
    );
  }

  function labelValue() {
    return props.label || "";
  }

  return (
    <div
      className={["p-tabs-item", props.className].filter(Boolean).join(" ")}
      data-pds="tabs-item"
    >
      <div className="root">
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-tabs-item") }} />
        {props.children}
      </div>
    </div>
  );
}

export default LitTabsItem;
