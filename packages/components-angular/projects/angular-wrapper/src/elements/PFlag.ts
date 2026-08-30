import { Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import { type FlagSize, flagAppearance } from './core/flag/flag.appearance';
import { DEFAULT_FLAG_NAME, nativeFlagUrl } from './core/flag/flag-url';

@Component({
  selector: 'img[pFlag]',
  standalone: true,
  template: '',
  host: {
    '[class.p-flag]': 'true',
    '[attr.src]': 'url',
    '[attr.alt]': 'resolvedAlt',
    '[attr.width]': '24',
    '[attr.height]': '24',
    '[attr.loading]': '"lazy"',
  },
})
export class PFlag implements OnInit, OnChanges {
  @Input() name = DEFAULT_FLAG_NAME;
  @Input() size?: Responsive<FlagSize>;
  @Input() alt?: string;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  get resolvedAlt(): string {
    return this.alt ?? '';
  }

  get url(): string {
    return nativeFlagUrl(this.name);
  }

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(this.el, flagAppearance({ size: this.size }), this.applied);
  }
}
