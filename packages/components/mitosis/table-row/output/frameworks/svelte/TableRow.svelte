<!-- mitosis-native-host: native svelte from TableRow.lite.tsx -->
<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  $: cssText = () => {
    return (
      ":host{display:table-row;" +
      "border-bottom:var(--_p-table-d) solid var(--_p-table-c) !important;" +
      "transition:background var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out) !important}" +
      ":host([hidden]){display:none !important}" +
      "@media(hover:hover){:host(:hover){background:var(--_p-table-b) !important}}"
    );
  };
  $: scopedCssText = scopeCss("\n  :host {\n    display: table-row;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-table-row");
</script>

<div class="p-table-row" data-pds="table-row">
<div class="root">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<slot />
</div>


</div>
