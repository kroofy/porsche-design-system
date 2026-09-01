/* mitosis-native-host: native react from Tabs.lite.tsx */
import * as React from "react";

import PTabsBar from "../../../../tabs-bar/output/frameworks/react/TabsBar";
import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitTabsProps {
  className?: string;
  size?: any;
  activeTabIndex?: any;
  background?: string;
  compact?: any;
  weight?: string;
  aria?: any;
}

function LitTabs(props: LitTabsProps) {
  function cssText() {
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
    const pick = (obj: any, key: any, fallback: any) => {
      if (obj && typeof obj === "object") {
        if (obj[key] === undefined) return fallback;
        return obj[key];
      }
      return obj;
    };
    const size = parse(props.size, "small");
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      ".root{margin-bottom:var(--p-spacing-static-sm)}" +
      ".wrap{display:contents}";
    if (size && typeof size === "object") {
      const sizeBase = pick(size, "base", "small");
      for (const bp in minWidth) {
        if (bp === "base") continue;
        if (!minWidth[bp]) continue;
        const s = pick(size, bp, sizeBase);
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){:host{--_p-tabs-size:" +
          s +
          "}}";
      }
    }
    return out;
  }
  function sizeValue() {
    return props.size || "small";
  }
  function backgroundValue() {
    return props.background || "none";
  }
  function isCompact() {
    return (
      props.compact === true || props.compact === "true" || props.compact === ""
    );
  }
  function activeIndex() {
    const raw = props.activeTabIndex;
    if (raw === undefined || raw === null || raw === "") return 0;
    const n = Number(raw);
    return Number.isInteger(n) ? n : 0;
  }
  return (
    <div
      className={["p-tabs", props.className].filter(Boolean).join(" ")}
      data-pds="tabs"
    >
      <div className="wrap">
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-tabs") }} />
        <PTabsBar
          className="root"
          size={sizeValue()}
          background={backgroundValue()}
          compact={isCompact()}
          activeTabIndex={activeIndex()}
        />
        {props.children}
      </div>{" "}
    </div>
  );
}
export default LitTabs;
