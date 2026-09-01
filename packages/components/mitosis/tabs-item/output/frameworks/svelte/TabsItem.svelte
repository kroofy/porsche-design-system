<!-- mitosis-native-host: native svelte from TabsItem.lite.tsx -->
<script context="module" lang="ts">
  export interface LitTabsItemProps {
    label?: string;
  }
</script>

<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let label: LitTabsItemProps["label"];
  function __cmpProps() { return { label }; }

  $: cssText = () => {
    return (
      ":host{display:block;color:var(--p-color-primary) !important;border-radius:2px !important}" +
      ":host([hidden]){display:none !important}" +
      ":host(:focus-visible){outline:2px solid var(--p-color-focus) !important;outline-offset:2px !important}" +
      "@media(forced-colors:active){:host(:focus-visible){outline-color:Highlight !important}}"
    );
  };
  $: labelValue = () => {
    return label || "";
  };
  $: scopedCssText = scopeCss("\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-tabs-item");
</script>

<div class="p-tabs-item" data-pds="tabs-item">
<div class="root">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<slot />
</div>


</div>
