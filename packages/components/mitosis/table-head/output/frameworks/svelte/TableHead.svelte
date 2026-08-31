<script lang="ts">
  $: cssText = () => {
    return (
      ":host{display:table-header-group;" +
      "font:var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next) !important;" +
      "border-bottom:1px solid var(--_p-table-c) !important}" +
      ":host([hidden]){display:none !important}" +
      "::slotted(*){--_p-table-d:0px !important;--_p-table-b:none !important}"
    );
  };
</script>

<div class="root">
  {@html `<${"style"}  >${cssText()}<${"/style"}>`}<slot />
</div>

<style>
  :host {
    display: table-header-group;
  }
  :host([hidden]) {
    display: none !important;
  }
</style>