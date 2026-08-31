import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export type DividerColor =
  | "contrast-lower"
  | "contrast-low"
  | "contrast-medium"
  | "contrast-high";
export type DividerDirection = "horizontal" | "vertical";
export interface LitDividerProps {
  color?: DividerColor;
  direction?: any;
}

@customElement("p-divider")
export default class LitDivider extends LitElement {
  static styles = css`
      :host {
          display: block;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() direction: any;
  @property() color: any;

  get cssText() {
    const colorMap: any = {
      "contrast-lower": "var(--p-color-contrast-lower)",
      "contrast-low": "var(--p-color-contrast-low)",
      "contrast-medium": "var(--p-color-contrast-medium)",
      "contrast-high": "var(--p-color-contrast-high)",
    };
    const minWidth: any = {
      xs: 480,
      s: 760,
      m: 1000,
      l: 1300,
      xl: 1760,
      xxl: 1920,
    };
    const horizontal = "height:1px;width:100%";
    const vertical = "height:100%;width:1px";
    let direction = this.direction || "horizontal";
    if (typeof direction === "string" && direction.charAt(0) === "{") {
      try {
        direction = JSON.parse(direction);
      } catch (e) {
        direction = "horizontal";
      }
    }
    let responsive = "";
    if (typeof direction === "object" && direction !== null) {
      for (const bp of Object.keys(direction)) {
        const rule =
          "hr{" + (direction[bp] === "vertical" ? vertical : horizontal) + "}";
        responsive +=
          bp === "base"
            ? rule
            : "@media(min-width:" + minWidth[bp] + "px){" + rule + "}";
      }
    } else {
      responsive =
        "hr{" + (direction === "vertical" ? vertical : horizontal) + "}";
    }
    const background =
      colorMap[this.color || "contrast-lower"] || colorMap["contrast-lower"];
    return (
      "hr{all:unset;display:block;background:" +
      background +
      "}@media(forced-colors:active){hr{background:CanvasText}}" +
      responsive
    );
  }

  render() {
    return html`

          <style .innerHTML="${this.cssText}"></style>
          <hr
        />

        `;
  }
}
