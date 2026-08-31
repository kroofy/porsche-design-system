<script lang="ts">
  $: cssText = () => {
    return ":host{display:table-row}:host([hidden]){display:none !important}";
  };
</script>

<div class="root">
  {@html `<${"style"}  >${cssText()}<${"/style"}>`}<slot />
</div>

<style>
  :host {
    display: table-row;
  }
  :host([hidden]) {
    display: none !important;
  }
</style>