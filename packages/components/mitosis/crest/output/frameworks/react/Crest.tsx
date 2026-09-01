/* mitosis-native-host: native react from Crest.lite.tsx */
import * as React from "react";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitCrestProps {
  className?: string;
  href?: string;
  target?: string;
}

function LitCrest(props: LitCrestProps) {
  function cssText() {
    return (
      "a{all:unset;cursor:pointer}" +
      'a::before{content:"";position:absolute;inset:0;border-radius:1px}' +
      "a:focus-visible::before{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      "picture{display:block;width:min(30px,100%);height:min(40px,100%)}" +
      "img{display:block;max-width:100%;max-height:100%;width:auto;height:auto}" +
      "@media(forced-colors:active){a:focus-visible::before{outline-color:Highlight}}"
    );
  }

  return (
    <div
      className={["p-crest", props.className].filter(Boolean).join(" ")}
      data-pds="crest"
    >
      <a href={props.href} target={props.target || "_self"}>
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host {\n          position: relative;\n          display: inline-block;\n          vertical-align: top;\n          box-sizing: content-box !important;\n          max-width: 30px !important;\n          max-height: 40px !important;\n          width: inherit !important;\n          height: inherit !important;\n        }\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-crest") }} />
        <picture>
          <source
            srcSet="http://localhost:3001/crest/porsche-crest.0d0cc89@1x.webp 1x,http://localhost:3001/crest/porsche-crest.2245c45@2x.webp 2x,http://localhost:3001/crest/porsche-crest.19b4292@3x.webp 3x"
            type="image/webp"
          />
          <source
            srcSet="http://localhost:3001/crest/porsche-crest.d76137c@1x.png 1x,http://localhost:3001/crest/porsche-crest.8a292fb@2x.png 2x,http://localhost:3001/crest/porsche-crest.18d6f02@3x.png 3x"
            type="image/png"
          />
          <img
            src="http://localhost:3001/crest/porsche-crest.8a292fb@2x.png"
            width="30"
            height="40"
            alt="Porsche"
          />
        </picture>
      </a>
    </div>
  );
}

export default LitCrest;
