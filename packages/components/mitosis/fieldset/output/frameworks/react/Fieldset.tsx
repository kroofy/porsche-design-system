/* mitosis-native-host: native react from Fieldset.lite.tsx */
import * as React from "react";

import PIcon from "../../../../icon/output/frameworks/react/Icon";
import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitFieldsetProps {
  className?: string;
  label?: string;
  labelSize?: string;
  required?: any;
  message?: string;
  state?: string;
  theme?: string;
}

function LitFieldset(props: LitFieldsetProps) {
  function cssText() {
    const formState =
      props.state === "success" || props.state === "error"
        ? props.state
        : "none";
    const message = props.message || "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const label = props.label || "";
    const hasLabel = !!label;
    const labelSize = props.labelSize || "medium";
    const small = labelSize === "small";
    const palettes: any = {
      none: "",
      success: "var(--p-color-success)",
      error: "var(--p-color-error)",
    };
    const messageColor = palettes[formState] || "";
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "fieldset{all:unset;display:block}";
    if (hasLabel) {
      out +=
        "legend{all:unset;margin-bottom:var(--p-spacing-static-md);color:var(--p-color-primary);font:" +
        (small
          ? "var(--p-font-weight-semibold) var(--p-typescale-sm)"
          : "var(--p-font-weight-normal) var(--p-typescale-md)") +
        " / var(--p-leading-normal) var(--p-font-porsche-next)}";
    } else {
      out += "legend{display:none}";
    }
    out +=
      ".required{user-select:none}" +
      ".message{display:flex;gap:var(--p-spacing-static-xs);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next)";
    if (messageColor) out += ";color:" + messageColor;
    out +=
      ";transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);margin-top:var(--p-spacing-static-md)}.message:empty{opacity:0;position:absolute}";
    if (!hasMsg)
      out +=
        ".message{opacity:0;position:absolute}.message p-icon{display:none}";
    return out;
  }

  function labelText() {
    return props.label || "";
  }

  function messageText() {
    const formState = props.state || "none";
    const message = props.message || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return message;
  }

  function iconName() {
    const formState = props.state || "none";
    const message = props.message || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return formState === "error" ? "exclamation" : "check";
  }

  function iconColor() {
    const formState = props.state || "none";
    if (formState === "error") return "error";
    if (formState === "success") return "success";
    return "";
  }

  return (
    <div
      className={["p-fieldset", props.className].filter(Boolean).join(" ")}
      data-pds="fieldset"
    >
      <fieldset>
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-fieldset") }} />
        <legend>{labelText()}</legend>
        {props.children}
        <span className="message" id="message">
          <PIcon aria-hidden="true" />
          {messageText()}
        </span>
      </fieldset>
    </div>
  );
}

export default LitFieldset;
