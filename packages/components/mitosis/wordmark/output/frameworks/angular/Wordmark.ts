/* mitosis-native-host: native angular from Wordmark.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitWordmarkProps {
  href?: string;
  target?: string;
  size?: string;
}

@Component({
  selector: "lit-wordmark",
  template: `
    <div class="p-wordmark" data-pds="wordmark">
    <a [attr.href]="href" [attr.target]="target || '_self'"
      ><style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4500 300">
        <title>Porsche</title>
        <path
          d="M502 221c48.1 0 74-25.9 74-74V74c0-48.1-25.9-74-74-74H0v300h68v-79h434zm6-143v65c0 7.8-4.2 12-12 12H68V66h428c7.8 0 12 4.2 12 12zm228 222c-48.1 0-74-25.9-74-74V74c0-48.1 25.9-74 74-74h417c48.1 0 74 25.9 74 74v152c0 48.1-25.9 74-74 74H736zm411-66c7.8 0 12-4.2 12-12V78c0-7.8-4.2-12-12-12H742c-7.8 0-12 4.2-12 12v144c0 7.8 4.2 12 12 12h405zm675-36c39.844 16.757 67.853 56.1 68 102h-68c0-54-25-79-79-79h-361v79h-68V0h502c48.1 0 74 25.9 74 74v50.14c0 46.06-23.75 71.76-68 73.86zm-12-43c7.8 0 12-4.2 12-12V78c0-7.8-4.2-12-12-12h-428v89h428zm162-81c0-48.1 25.9-74 74-74h492v56h-486c-7.8 0-12 4.2-12 12v42c0 7.8 4.2 12 12 12h422c48.1 0 74 25.9 74 74v30c0 48.1-25.9 74-74 74h-492v-56h486c7.8 0 12-4.2 12-12v-42c0-7.8-4.2-12-12-12h-422c-48.1 0-74-25.9-74-74V74zm661 0c0-48.1 25.9-74 74-74h480v66h-474c-7.8 0-12 4.2-12 12v144c0 7.8 4.2 12 12 12h474v66h-480c-48.1 0-74-25.9-74-74V74zM3817 0v300h-68V183h-407v117h-68V0h68v117h407V0h68zm156 56v66h527v56h-527v66h527v56h-595V0h595v56h-527z"
        ></path></svg
    ></a>
  
    </div>
  `,
  styles: [`
      .p-wordmark {
        display: contents;
      }
      .p-wordmark {
        position: relative;
        display: inline-block;
        vertical-align: top;
        max-width: 100% !important;
        max-height: 100% !important;
        box-sizing: content-box !important;
      }
      .p-wordmark[hidden] {
        display: none !important;
      }
    `],
})
export default class LitWordmark {
  @Input() size!: LitWordmarkProps["size"];
  @Input() href!: LitWordmarkProps["href"];
  @Input() target!: LitWordmarkProps["target"];

  get scopedCssText() {
    return scopeCss(this.cssText, ".p-wordmark");
  }

  get cssText() {
    const size = this.size || "small";
    const hostSize =
      size !== "inherit"
        ? ":host{height:clamp(0.63rem, 0.42vw + 0.5rem, 1rem)!important}" +
          "@supports (height: round(down, 1px, 1px)){:host{height:round(down, clamp(0.63rem, 0.42vw + 0.5rem, 1rem), 1px)!important}}"
        : "";
    return (
      hostSize +
      "a{all:unset;display:block;max-width:100%;max-height:100%;height:inherit;cursor:pointer}" +
      'a::before{content:"";position:absolute;inset:0;border-radius:1px}' +
      "a:focus-visible::before{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      "svg{display:block;max-width:100%;max-height:100%;height:inherit;fill:var(--p-color-primary)}" +
      "@media(forced-colors:active){a:focus-visible::before{outline-color:Highlight}svg{fill:CanvasText}}"
    );
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitWordmark],
  imports: [CommonModule],
  exports: [LitWordmark],
})
export class LitWordmarkModule {}
