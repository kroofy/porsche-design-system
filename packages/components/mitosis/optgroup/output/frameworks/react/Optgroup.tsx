/* mitosis-native-host: native react from Optgroup.lite.tsx */
import * as React from "react";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitOptgroupProps {
  className?: string;
  label?: string;
  disabled?: any;
  hidden?: any;
}

function LitOptgroup(props: LitOptgroupProps) {
  function cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const disabled = isTrue(props.disabled);
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      "::slotted(*){--_p-select-option-b:calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px);--_p-multi-select-option-b:calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px)}" +
      '[role="group"]{display:flex;flex-direction:column;gap:calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px)}' +
      '[role="presentation"]{padding-block:calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);padding-inline:calc(16.8px * (var(--_p-optgroup-a) - 0.64285714) + 6px);font:var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary)';
    if (disabled) out += ";opacity:0.4";
    out += "}";
    if (disabled) {
      out +=
        '@media(forced-colors:active){[role="presentation"]{opacity:1;color:GrayText}}';
    }
    return out;
  }

  function labelText() {
    return props.label || "";
  }

  function isDisabled() {
    return (
      props.disabled === true ||
      props.disabled === "true" ||
      props.disabled === ""
    );
  }

  return (
    <div
      className={["p-optgroup", props.className].filter(Boolean).join(" ")}
      data-pds="optgroup"
    >
      <div role="group">
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host {\n          display: block;\n        }\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-optgroup") }} />
        <span id="label" role="presentation">
          {labelText()}
        </span>
        {props.children}
      </div>
    </div>
  );
}

export default LitOptgroup;
