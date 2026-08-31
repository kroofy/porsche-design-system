import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitCrestProps {
  href?: string;
  target?: string;
}

@customElement("p-crest")
export default class LitCrest extends LitElement {
  static styles = css`
      :host {
          position: relative;
          display: inline-block;
          vertical-align: top;
          box-sizing: content-box !important;
          max-width: 30px !important;
          max-height: 40px !important;
          width: inherit !important;
          height: inherit !important;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() href: any;
  @property() target: any;

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

  render() {
    return html`

          <a  .href=${this.href}  .target=${
      this.target || "_self"
    } ><style  .innerHTML=${this.cssText} ></style>
        <picture ><source  srcSet="http://localhost:3001/crest/porsche-crest.0d0cc89@1x.webp 1x,http://localhost:3001/crest/porsche-crest.2245c45@2x.webp 2x,http://localhost:3001/crest/porsche-crest.19b4292@3x.webp 3x"  type="image/webp"  />
        <source  srcSet="http://localhost:3001/crest/porsche-crest.d76137c@1x.png 1x,http://localhost:3001/crest/porsche-crest.8a292fb@2x.png 2x,http://localhost:3001/crest/porsche-crest.18d6f02@3x.png 3x"  type="image/png"  />
        <img  src="http://localhost:3001/crest/porsche-crest.8a292fb@2x.png"  width="30"  height="40"  alt="Porsche"  /></picture></a>
        `;
  }
}
