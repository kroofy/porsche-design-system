<!-- mitosis-native-host: native svelte from TableHeadRow.lite.tsx -->
<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  $: cssText = () => {
    return ":host{display:table-row}:host([hidden]){display:none !important}";
  };
  $: scopedCssText = scopeCss("\n  :host {\n    display: table-row;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-table-head-row");
</script>

<div class="p-table-head-row" data-pds="table-head-row">
<div class="root">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<slot />
</div>


</div>
