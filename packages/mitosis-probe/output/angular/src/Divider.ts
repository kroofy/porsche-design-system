import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

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

@Component({
  selector: "probe-divider",
  template: `
    <hr
      [ngStyle]="{
          background: background,
          height: isVertical ? '100%' : '1px',
          width: isVertical ? '1px' : '100%'
        }"
    />
  `,
  styles: [
    `
      :host {
        display: contents;
      }
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
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export default class ProbeDivider {
  @Input() color!: DividerProps["color"];
  @Input() direction!: DividerProps["direction"];

  get background() {
    // Mirrors colorMap in divider-styles.ts: PDS token var with light-theme fallback.
    const map = {
      "contrast-lower":
        "var(--p-color-contrast-lower, hsl(234 6% 32.9% / 0.324))",
      "contrast-low": "var(--p-color-contrast-low, hsl(240 5.3% 14.9% / 0.5))",
      "contrast-medium":
        "var(--p-color-contrast-medium, hsl(240 6.1% 7% / 0.6))",
      "contrast-high": "var(--p-color-contrast-high, hsl(240 7.1% 11% / 0.7))",
    };
    return map[this.color || "contrast-lower"];
  }
  get isVertical() {
    return this.direction === "vertical";
  }
}
