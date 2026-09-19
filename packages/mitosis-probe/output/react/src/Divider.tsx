import * as React from "react";

export type DividerColor =
  | "contrast-lower"
  | "contrast-low"
  | "contrast-medium"
  | "contrast-high";
export type DividerDirection = "horizontal" | "vertical";
export type DividerProps = {
  color?: DividerColor;
  /**
   * Flat values only. PDS accepts BreakpointCustomizable<DividerDirection>
   * ({ base, xs, s, m, l, xl }); Mitosis has no way to compile a prop object
   * into media queries, so the breakpoint form is dropped here. See report.
   */
  direction?: DividerDirection;
};

function ProbeDivider(props: DividerProps) {
  function background() {
    // Mirrors colorMap in divider-styles.ts: PDS token var with light-theme fallback.
    const map = {
      "contrast-lower":
        "var(--p-color-contrast-lower, hsl(234 6% 32.9% / 0.324))",
      "contrast-low": "var(--p-color-contrast-low, hsl(240 5.3% 14.9% / 0.5))",
      "contrast-medium":
        "var(--p-color-contrast-medium, hsl(240 6.1% 7% / 0.6))",
      "contrast-high": "var(--p-color-contrast-high, hsl(240 7.1% 11% / 0.7))",
    };
    return map[props.color || "contrast-lower"];
  }

  function isVertical() {
    return props.direction === "vertical";
  }

  return (
    <>
      <hr
        style={{
          background: background(),
          height: isVertical() ? "100%" : "1px",
          width: isVertical() ? "1px" : "100%",
        }}
      />
      <style>{`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none !important;
    }
    hr {
      all: unset;
      display: block;
    }
    @media (forced-colors: active) {
      hr {
        background: CanvasText;
      }
    }

`}</style>
    </>
  );
}

export default ProbeDivider;
