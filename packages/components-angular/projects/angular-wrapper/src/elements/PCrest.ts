import { Component, ElementRef, inject } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import { crestAppearance } from './core/crest/crest.appearance';
import { CREST_HEIGHT, CREST_WIDTH, nativeCrestImgSrc, nativeCrestSrcSet } from './core/crest/crest-url';

@Component({
  selector: 'picture[pCrest], a[pCrest]',
  standalone: true,
  template: `
    @if (isAnchor) {
      <picture>
        <source [attr.srcset]="webpSrcSet" type="image/webp" />
        <source [attr.srcset]="pngSrcSet" type="image/png" />
        <img [attr.src]="imgSrc" [attr.width]="width" [attr.height]="height" alt="Porsche" />
      </picture>
    } @else {
      <source [attr.srcset]="webpSrcSet" type="image/webp" />
      <source [attr.srcset]="pngSrcSet" type="image/png" />
      <img [attr.src]="imgSrc" [attr.width]="width" [attr.height]="height" alt="Porsche" />
    }
  `,
  host: {
    '[class.p-crest]': 'true',
  },
})
export class PCrest {
  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  readonly width = CREST_WIDTH;
  readonly height = CREST_HEIGHT;
  readonly webpSrcSet = nativeCrestSrcSet('webp');
  readonly pngSrcSet = nativeCrestSrcSet('png');
  readonly imgSrc = nativeCrestImgSrc();

  get isAnchor(): boolean {
    return this.el.tagName === 'A';
  }

  constructor() {
    syncAppearance(this.el, crestAppearance(), this.applied);
  }
}
