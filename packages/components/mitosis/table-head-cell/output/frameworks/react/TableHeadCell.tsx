/* mitosis-native-host: native react from TableHeadCell.lite.tsx */
import * as React from "react";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitTableHeadCellProps {
  className?: string;
  sort?: any;
  hideLabel?: any;
  multiline?: any;
}

function LitTableHeadCell(props: LitTableHeadCellProps) {
  function parseSort() {
    let sort: any = props.sort;
    if (typeof sort === "string" && sort.charAt(0) === "{") {
      try {
        sort = JSON.parse(sort);
      } catch (e) {
        sort = undefined;
      }
    }
    return sort;
  }

  function sortable() {
    const sort: any = parseSort();
    if (!sort) return false;
    return sort.active !== undefined && sort.direction !== undefined;
  }

  function cssText() {
    const sort: any = parseSort();
    const active = sort ? sort.active : undefined;
    const direction = sort ? sort.direction : undefined;
    const sortable = active !== undefined && direction !== undefined;
    const hideLabel =
      props.hideLabel === true ||
      props.hideLabel === "true" ||
      props.hideLabel === "";
    const multiline =
      props.multiline === true ||
      props.multiline === "true" ||
      props.multiline === "";
    const whiteSpace = multiline ? "normal" : "nowrap";
    let out =
      ":host{display:table-cell;" +
      "padding:2px var(--_p-table-a,var(--p-spacing-fluid-sm)) var(--_p-table-a,var(--p-spacing-fluid-sm)) !important;" +
      "vertical-align:bottom !important;" +
      "white-space:" +
      whiteSpace +
      " !important}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}";
    if (sortable) {
      const deg = direction === "asc" ? "0" : "180";
      const opacity = active ? "1" : "0";
      out +=
        "button{position:relative;display:flex;gap:var(--p-spacing-static-xs);width:auto;margin:0;padding:0;font:inherit;color:inherit;align-items:flex-end;-webkit-appearance:none;appearance:none;background:transparent;text-align:start;border:0;z-index:0;cursor:pointer}" +
        "button:focus,button:focus-visible{outline:none}" +
        'button::before{content:"";position:absolute;inset:-2px -4px;border-radius:var(--p-radius-sm);z-index:-1;transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}' +
        "button:focus-visible::before{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
        "@media(forced-colors:active){button:focus-visible::before{outline-color:Highlight}}" +
        "@media(hover:hover){button:hover::before{-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted);background-color:var(--p-color-frosted)}button:hover .icon,button:focus-visible .icon{opacity:1}}" +
        ".icon{transition:opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);opacity:" +
        opacity +
        ";transform:rotate3d(0,0,1," +
        deg +
        "deg);transform-origin:50% 50%}";
    } else if (hideLabel) {
      out +=
        "span{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;display:block;border:0}";
    }
    return out;
  }

  return (
    <div
      className={["p-table-head-cell", props.className].filter(Boolean).join(" ")}
      data-pds="table-head-cell"
    >
      <span>
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host {\n          display: table-cell;\n        }\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-table-head-cell") }} />
        {props.children}
      </span>
    </div>
  );
}

export default LitTableHeadCell;
