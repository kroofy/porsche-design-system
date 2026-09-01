<!-- mitosis-native-host: native vue from Link.lite.tsx -->
<template>
  <div class="p-link" data-pds="link">

  <span class="root"
    ><component v-html="scopedCssText" :is="'style'"></component
    ><PIcon
      class="icon"
      size="inherit"
      color="inherit"
      aria-hidden="true"
      :name="iconName"
      :source="iconSrc"
    ></PIcon
    ><span class="label"><slot></slot></span
  ></span>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PIcon from "../../../../icon/output/frameworks/vue/Icon.vue";
import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitLinkProps {
  variant?: string;
  icon?: string;
  iconSource?: string;
  href?: string;
  target?: string;
  download?: string;
  rel?: string;
  hideLabel?: any;
  compact?: any;
  aria?: any;
}

export default defineComponent({
  components: { PIcon },
  name: "lit-link",

  props: ["variant", "href", "icon", "iconSource", "hideLabel", "compact"],

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-link");
    },
    cssText() {
      const minWidth: any = {
        xs: 480,
        s: 760,
        m: 1000,
        l: 1300,
        xl: 1760,
        xxl: 1920,
      };
      const parse = (raw: any, fallback: any) => {
        if (raw === undefined || raw === null || raw === "") return fallback;
        if (typeof raw === "string" && raw.charAt(0) === "{") {
          try {
            return JSON.parse(
              raw
                .replace(/'/g, '"')
                .replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')
            );
          } catch (e) {
            return fallback;
          }
        }
        return raw;
      };
      const isTrue = (v: any) => v === true || v === "true" || v === "";
      const pick = (obj: any, key: any, fallback: any) => {
        if (obj && typeof obj === "object") {
          if (obj[key] === undefined) return fallback;
          return obj[key];
        }
        return obj;
      };
      const variant = this.variant || "primary";
      const hasSlottedAnchor = !this.href;
      const icon = this.icon || "none";
      const source = this.iconSource || "";
      const hasVisibleIcon = (icon !== "none" && icon !== "") || source !== "";
      const hideLabel = parse(this.hideLabel, false);
      const compact = parse(this.compact, false);
      const hideBase =
        typeof hideLabel === "object" && hideLabel !== null
          ? pick(hideLabel, "base", false)
          : hideLabel;
      const compactBase =
        typeof compact === "object" && compact !== null
          ? pick(compact, "base", false)
          : compact;
      const scaleFor = (c: any) => (isTrue(c) ? "0.64285714" : "1");
      const buttonRadiusFor = (c: any) =>
        isTrue(c) ? "var(--p-radius-lg)" : "var(--p-radius-xl)";
      const hostRadiusFor = (h: any, c: any) =>
        isTrue(h)
          ? "var(--p-link-radius,var(--p-radius-full))"
          : "var(--p-link-radius,var(--_p-link-button-a))";
      const slottedRadiusFor = (h: any, c: any) =>
        isTrue(h)
          ? "var(--p-link-radius,var(--p-radius-full))"
          : "var(--p-link-radius," + buttonRadiusFor(c) + ")";
      const padFor = (h: any) =>
        isTrue(h)
          ? "var(--p-link-py,calc(28px * (var(--_p-link-a) - 0.64285714) + 6px)) var(--p-link-px,calc(28px * (var(--_p-link-a) - 0.64285714) + 6px))"
          : "var(--p-link-py,calc(28px * (var(--_p-link-a) - 0.64285714) + 6px)) var(--p-link-px,calc(33.6px * (var(--_p-link-a) - 0.64285714) + 16px))";
      const gapFor = (h: any) =>
        isTrue(h)
          ? "var(--p-link-gap,0)"
          : "var(--p-link-gap,calc(11.2px * (var(--_p-link-a) - 0.64285714) + 4px))";
      const labelFor = (h: any, baseClip: any) =>
        isTrue(h)
          ? "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:" +
            (baseClip ? "unset !important" : "rect(0,0,0,0)") +
            ";white-space:nowrap"
          : "position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:" +
            (baseClip ? "unset !important" : "auto") +
            ";white-space:normal";
      const iconMarginFor = (h: any) =>
        isTrue(h)
          ? "0"
          : "calc(-1 * (11.2px * (var(--_p-link-a) - 0.64285714) + 4px))";
      const bg =
        variant === "secondary"
          ? "var(--p-link-bg,var(--p-color-frosted-strong))"
          : "var(--p-link-bg,var(--p-color-primary))";
      const fg =
        variant === "secondary"
          ? "var(--p-link-fg,var(--p-color-primary))"
          : "var(--p-link-fg,var(--p-color-canvas))";
      const hoverBg =
        variant === "secondary"
          ? "var(--p-link-bg,var(--p-color-frosted))"
          : "var(--p-link-bg,var(--p-color-contrast-high))";
      const hasIconCss =
        hasVisibleIcon ||
        isTrue(hideBase) ||
        (typeof hideLabel === "object" && hideLabel !== null);
      let out =
        ":host{--_p-link-a:" +
        scaleFor(compactBase) +
        ";--_p-link-button-a:" +
        buttonRadiusFor(compactBase) +
        ";border-radius:" +
        hostRadiusFor(hideBase, compactBase) +
        "!important}" +
        ":not(:defined,[data-ssr]){visibility:hidden}";
      if (hasSlottedAnchor) {
        out +=
          "::slotted(a){all:unset!important}" +
          '::slotted(a)::before{content:""!important;position:fixed!important;inset:0!important;border-radius:' +
          slottedRadiusFor(hideBase, compactBase) +
          "!important}" +
          "::slotted(a:focus-visible)::before{outline:2px solid var(--p-color-focus)!important;outline-offset:2px!important}" +
          "@media(forced-colors:active){::slotted(a:focus-visible)::before{outline-color:Highlight!important}}";
      }
      out +=
        ".root{all:unset;display:flex;justify-content:center;width:100%;min-width:min-content;box-sizing:border-box;-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);border-radius:inherit;transform:translate3d(0,0,0);background-color:" +
        bg +
        ";color:" +
        fg +
        ";cursor:pointer;transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);padding:" +
        padFor(hideBase) +
        ";gap:" +
        gapFor(hideBase) +
        "}";
      if (!hasSlottedAnchor) {
        out +=
          ".root:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}";
      }
      out += ".label{" + labelFor(hideBase, true) + "}";
      if (hasIconCss) {
        out +=
          ".icon,p-icon{font:var(--p-typescale-sm) var(--p-font-porsche-next);width:var(--p-leading-normal);height:var(--p-leading-normal);margin-inline-start:" +
          iconMarginFor(hideBase) +
          "}";
      }
      if (!hasVisibleIcon) {
        out += "p-icon{display:none}";
      }
      if (hasSlottedAnchor) {
        out +=
          "@media(forced-colors:active){.root{forced-color-adjust:none;background:Canvas;color:LinkText;box-shadow:inset 0 0 0 2px LinkText}.root:is(button){box-shadow:inset 0 0 0 2px ButtonBorder;color:ButtonText}}";
      } else {
        out +=
          "@media(forced-colors:active){.root{forced-color-adjust:none;background:Canvas;color:LinkText;box-shadow:inset 0 0 0 2px LinkText}.root:is(button){box-shadow:inset 0 0 0 2px ButtonBorder;color:ButtonText}.root:focus-visible{outline-color:Highlight}}";
      }
      out +=
        "@media(hover:hover){.root:hover{color:" +
        fg +
        ";background-color:" +
        hoverBg +
        "}@media(forced-colors:active){.root:hover{background:Canvas}}}";
      const keys: any = {};
      if (typeof hideLabel === "object" && hideLabel !== null)
        for (const k of Object.keys(hideLabel)) keys[k] = 1;
      if (typeof compact === "object" && compact !== null)
        for (const k of Object.keys(compact)) keys[k] = 1;
      for (const bp of Object.keys(keys)) {
        if (bp === "base") continue;
        if (!minWidth[bp]) continue;
        const h = pick(hideLabel, bp, hideBase);
        const c = pick(compact, bp, compactBase);
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){:host{--_p-link-a:" +
          scaleFor(c) +
          ";--_p-link-button-a:" +
          buttonRadiusFor(c) +
          ";border-radius:" +
          hostRadiusFor(h, c) +
          "!important}";
        if (hasSlottedAnchor) {
          out +=
            "::slotted(a)::before{border-radius:" +
            slottedRadiusFor(h, c) +
            "!important}";
        }
        out +=
          ".root{padding:" +
          padFor(h) +
          ";gap:" +
          gapFor(h) +
          "}.label{" +
          labelFor(h, false) +
          "}";
        if (hasIconCss) {
          out += ".icon,p-icon{margin-inline-start:" + iconMarginFor(h) + "}";
        }
        out += "}";
      }
      return out;
    },
    iconName() {
      if (this.iconSource) return "";
      const icon = this.icon || "none";
      if (icon === "none" || icon === "") return "";
      return icon;
    },
    iconSrc() {
      return this.iconSource || "";
    },
  },
});
</script>

