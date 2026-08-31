import * as React from "react";

export interface LitModelSignatureProps {
  model?: string;
  safeZone?: any;
  fetchPriority?: string;
  lazy?: any;
  size?: string;
  color?: string;
}

function LitModelSignature(props: LitModelSignatureProps) {
  function cssText() {
    const manifest: any = {
      "718": {
        src: "718.493a9e3.svg",
        width: 79,
        height: 26,
      },
      "911": {
        src: "911.b68f913.svg",
        width: 94,
        height: 25,
      },
      boxster: {
        src: "boxster.c321738.svg",
        width: 239,
        height: 26,
      },
      cayenne: {
        src: "cayenne.2556201.svg",
        width: 245,
        height: 35,
      },
      cayman: {
        src: "cayman.cc89196.svg",
        width: 229,
        height: 35,
      },
      "gt3-rs": {
        src: "gt3-rs.03ac3ee.svg",
        width: 238,
        height: 25,
      },
      gt3: {
        src: "gt3.bd3186c.svg",
        width: 151,
        height: 25,
      },
      gts: {
        src: "gts.99bd35e.svg",
        width: 121,
        height: 25,
      },
      macan: {
        src: "macan.a1844f4.svg",
        width: 196,
        height: 26,
      },
      panamera: {
        src: "panamera.6dae809.svg",
        width: 260,
        height: 25,
      },
      taycan: {
        src: "taycan.df444c6.svg",
        width: 167,
        height: 36,
      },
      "turbo-s": {
        src: "turbo-s.73f1e10.svg",
        width: 199,
        height: 25,
      },
      turbo: {
        src: "turbo.6a4084a.svg",
        width: 143,
        height: 25,
      },
    };
    const colorMap: any = {
      primary: "var(--p-color-primary)",
      "contrast-low": "var(--p-color-contrast-low)",
      "contrast-medium": "var(--p-color-contrast-medium)",
      "contrast-high": "var(--p-color-contrast-high)",
      inherit: "currentcolor",
    };
    const model = props.model || "911";
    const entry = manifest[model] || manifest["911"];
    const size = props.size || "small";
    const color = props.color || "primary";
    let safeZone: any = props.safeZone;
    if (safeZone === undefined || safeZone === null || safeZone === "") {
      safeZone = true;
    } else if (safeZone === false || safeZone === "false") {
      safeZone = false;
    } else {
      safeZone = true;
    }
    const widthFallback = size === "inherit" ? "auto" : entry.width + "px";
    const aspectH = safeZone ? 36 : entry.height;
    const bg = colorMap[color] || colorMap.primary;
    const src = "http://localhost:3001/model-signatures/" + entry.src;
    return (
      ":host{width:var(--p-model-signature-width," +
      widthFallback +
      ");height:var(--p-model-signature-height,auto);mask:url(" +
      src +
      ") no-repeat left top / contain !important;aspect-ratio:" +
      entry.width +
      " / " +
      aspectH +
      " !important;background:var(--p-model-signature-color," +
      bg +
      ") !important}" +
      "::slotted(:is(img,video)){display:block !important;width:100% !important;height:100% !important;object-fit:cover !important}" +
      "img{position:absolute;opacity:0;width:1px;height:1px}" +
      "@media(forced-colors:active){:host{background:CanvasText !important}}"
    );
  }

  function src() {
    const files: any = {
      "718": "718.493a9e3.svg",
      "911": "911.b68f913.svg",
      boxster: "boxster.c321738.svg",
      cayenne: "cayenne.2556201.svg",
      cayman: "cayman.cc89196.svg",
      "gt3-rs": "gt3-rs.03ac3ee.svg",
      gt3: "gt3.bd3186c.svg",
      gts: "gts.99bd35e.svg",
      macan: "macan.a1844f4.svg",
      panamera: "panamera.6dae809.svg",
      taycan: "taycan.df444c6.svg",
      "turbo-s": "turbo-s.73f1e10.svg",
      turbo: "turbo.6a4084a.svg",
    };
    const model = props.model || "911";
    return (
      "http://localhost:3001/model-signatures/" + (files[model] || files["911"])
    );
  }

  function alt() {
    return props.model || "911";
  }

  function fetchPriorityAttr() {
    const fp = props.fetchPriority || "auto";
    return fp !== "auto" ? fp : undefined;
  }

  function loadingAttr() {
    const lazy = props.lazy;
    if (lazy === true || lazy === "true" || lazy === "") return "lazy";
    return undefined;
  }

  return (
    <>
      <>
        <style dangerouslySetInnerHTML={{ __html: cssText() }} />
        <slot />
        <img
          src={src()}
          alt={alt()}
          fetchpriority={fetchPriorityAttr()}
          loading={loadingAttr()}
        />
      </>
      <style jsx>{`
        :host {
          display: inline-block;
          vertical-align: top;
          max-width: 100%;
          max-height: 100%;
        }
        :host([hidden]) {
          display: none !important;
        }
      `}</style>
    </>
  );
}

export default LitModelSignature;
