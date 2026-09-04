import { useMetadata, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-crest' });

export default function LitCrest(props: { href?: string; target?: string }) {
  useStyle(`
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
    a {
      all: unset;
      cursor: pointer;
    }
    a::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 1px;
    }
    a:focus-visible::before {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    picture {
      display: block;
      width: min(30px, 100%);
      height: min(40px, 100%);
    }
    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }
    @media (forced-colors: active) {
      a:focus-visible::before {
        outline-color: Highlight;
      }
    }
  `);

  return (
    <a href={props.href} target={props.target || '_self'}>
      <picture>
        <source
          srcSet="http://localhost:3001/crest/porsche-crest.0d0cc89@1x.webp 1x,http://localhost:3001/crest/porsche-crest.2245c45@2x.webp 2x,http://localhost:3001/crest/porsche-crest.19b4292@3x.webp 3x"
          type="image/webp"
        />
        <source
          srcSet="http://localhost:3001/crest/porsche-crest.d76137c@1x.png 1x,http://localhost:3001/crest/porsche-crest.8a292fb@2x.png 2x,http://localhost:3001/crest/porsche-crest.18d6f02@3x.png 3x"
          type="image/png"
        />
        <img src="http://localhost:3001/crest/porsche-crest.8a292fb@2x.png" width="30" height="40" alt="Porsche" />
      </picture>
    </a>
  );
}
