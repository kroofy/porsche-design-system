<!-- mitosis-native-host: native svelte from TextListItem.lite.tsx -->
<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  $: cssText = () => {
    return (
      ":host{display:grid;grid-template-columns:var(--_p-text-list-e) 1fr !important;column-gap:var(--p-spacing-static-md) !important;font:inherit !important;color:inherit !important}" +
      ":host([hidden]){display:none !important}" +
      ".root{display:contents}" +
      "slot{display:inline}" +
      '::slotted(*){--_p-text-list-f:.625rem !important;--_p-text-list-g:"–" !important;--_p-text-list-a:2rem !important;--_p-text-list-b:"" !important}' +
      "::slotted(*:last-child){grid-column:2 !important}"
    );
  };
  $: scopedCssText = scopeCss("\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-text-list-item");
</script>

<div class="p-text-list-item" data-pds="text-list-item">
<div class="root">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<slot />
</div>


</div>
