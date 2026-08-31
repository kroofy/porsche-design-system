import * as React from "react";

export interface LitTabsItemProps {
  label?: string;
}

function LitTabsItem(props: LitTabsItemProps) {
  function cssText() {
    return (
      ":host{display:block;color:var(--p-color-primary) !important;border-radius:2px !important}" +
      ":host([hidden]){display:none !important}" +
      ":host(:focus-visible){outline:2px solid var(--p-color-focus) !important;outline-offset:2px !important}" +
      "@media(forced-colors:active){:host(:focus-visible){outline-color:Highlight !important}}"
    );
  }

  function labelValue() {
    return props.label || "";
  }

  return (
    <>
      <div className="root">
        <style dangerouslySetInnerHTML={{ __html: cssText() }} />
        <slot />
      </div>
      <style jsx>{`
        :host([hidden]) {
          display: none !important;
        }
      `}</style>
    </>
  );
}

export default LitTabsItem;
