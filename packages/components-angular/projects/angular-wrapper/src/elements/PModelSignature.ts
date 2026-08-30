import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import {
  type ModelSignatureColor,
  type ModelSignatureSize,
  modelSignatureAppearance,
} from './core/model-signature/model-signature.appearance';
import { DEFAULT_MODEL_SIGNATURE_MODEL, nativeModelSignatureUrl } from './core/model-signature/model-signature-url';

@Component({
  selector: 'img[pModelSignature]',
  standalone: true,
  template: '',
  host: {
    '[class.p-model-signature]': 'true',
    '[attr.src]': 'url',
    '[attr.alt]': 'resolvedAlt',
  },
})
export class PModelSignature implements OnInit, OnChanges {
  @Input() model = DEFAULT_MODEL_SIGNATURE_MODEL;
  @Input() size?: ModelSignatureSize;
  @Input() color?: ModelSignatureColor;
  @Input({ transform: booleanAttribute }) safeZone = true;
  @Input() alt?: string;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  get resolvedAlt(): string {
    return this.alt ?? this.model;
  }

  get url(): string {
    return nativeModelSignatureUrl(this.model);
  }

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(
      this.el,
      modelSignatureAppearance({
        model: this.model,
        size: this.size,
        color: this.color,
        safeZone: this.safeZone,
      }),
      this.applied
    );
  }
}
