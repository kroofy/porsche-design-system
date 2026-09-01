/* mitosis-native-host: native angular from Crest.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitCrestProps {
  href?: string;
  target?: string;
}

@Component({
  selector: "lit-crest",
  template: `
    <div class="p-crest" data-pds="crest">
    <a [attr.href]="href" [attr.target]="target || '_self'"
      ><style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <picture
        ><source
          srcset="
            http://localhost:3001/crest/porsche-crest.0d0cc89@1x.webp 1x,
            http://localhost:3001/crest/porsche-crest.2245c45@2x.webp 2x,
            http://localhost:3001/crest/porsche-crest.19b4292@3x.webp 3x
          "
          type="image/webp" />
        <source
          srcset="
            http://localhost:3001/crest/porsche-crest.d76137c@1x.png 1x,
            http://localhost:3001/crest/porsche-crest.8a292fb@2x.png 2x,
            http://localhost:3001/crest/porsche-crest.18d6f02@3x.png 3x
          "
          type="image/png" />
        <img
          src="http://localhost:3001/crest/porsche-crest.8a292fb@2x.png"
          width="30"
          height="40"
          alt="Porsche" /></picture
    ></a>
  
    </div>
  `,
  styles: [`
      .p-crest {
        display: contents;
      }
      .p-crest {
        position: relative;
        display: inline-block;
        vertical-align: top;
        box-sizing: content-box !important;
        max-width: 30px !important;
        max-height: 40px !important;
        width: inherit !important;
        height: inherit !important;
      }
      .p-crest[hidden] {
        display: none !important;
      }
    `],
})
export default class LitCrest {
  @Input() href!: LitCrestProps["href"];
  @Input() target!: LitCrestProps["target"];

  get scopedCssText() {
    return scopeCss(this.cssText, ".p-crest");
  }

  get cssText() {
    return (
      "a{all:unset;cursor:pointer}" +
      'a::before{content:"";position:absolute;inset:0;border-radius:1px}' +
      "a:focus-visible::before{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      "picture{display:block;width:min(30px,100%);height:min(40px,100%)}" +
      "img{display:block;max-width:100%;max-height:100%;width:auto;height:auto}" +
      "@media(forced-colors:active){a:focus-visible::before{outline-color:Highlight}}"
    );
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitCrest],
  imports: [CommonModule],
  exports: [LitCrest],
})
export class LitCrestModule {}
