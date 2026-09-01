<!-- mitosis-native-host: native svelte from Fieldset.lite.tsx -->
<script context="module" lang="ts">
  export interface LitFieldsetProps {
    label?: string;
    labelSize?: string;
    required?: any;
    message?: string;
    state?: string;
    theme?: string;
  }
</script>

<script lang="ts">
  import PIcon from "../../../../icon/output/frameworks/svelte/Icon.svelte";
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let state: LitFieldsetProps["state"];
  export let message: LitFieldsetProps["message"];
  export let label: LitFieldsetProps["label"];
  export let labelSize: LitFieldsetProps["labelSize"];
  function __cmpProps() { return { state, message, label, labelSize }; }

  $: cssText = () => {
    const formState = state === "success" || state === "error" ? state : "none";
    const message = __cmpProps().message || "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const label = __cmpProps().label || "";
    const hasLabel = !!label;
    const labelSize = __cmpProps().labelSize || "medium";
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
  };
  $: labelText = () => {
    return label || "";
  };
  $: messageText = () => {
    const formState = state || "none";
    const message = __cmpProps().message || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return message;
  };
  $: iconName = () => {
    const formState = state || "none";
    const message = __cmpProps().message || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return formState === "error" ? "exclamation" : "check";
  };
  $: iconColor = () => {
    const formState = state || "none";
    if (formState === "error") return "error";
    if (formState === "success") return "success";
    return "";
  };
  $: __pdsComponents = { PIcon };
  $: scopedCssText = scopeCss("\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-fieldset");
</script>

<div class="p-fieldset" data-pds="fieldset">
<fieldset>
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<legend>{labelText()}</legend
  ><slot /><span class="message" id="message"
    ><PIcon
      aria-hidden="true"
    />{messageText()}</span
  >
</fieldset>


</div>
