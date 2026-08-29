import { Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  type IconColor,
  type IconSize,
  iconAppearance,
  nativeIconUrl,
} from '../../../../../components/src/elements/icon';
import { syncAppearance } from './apply-appearance';

@Component({
  selector: 'img[pIcon]',
  standalone: true,
  template: '',
  host: {
    '[class.p-icon]': 'true',
    '[attr.src]': 'url',
    '[attr.alt]': 'resolvedAlt',
    '[attr.width]': '24',
    '[attr.height]': '24',
    '[attr.loading]': '"lazy"',
    '[style.--_p-icon-mask]': 'mask',
  },
})
export class PIcon implements OnInit, OnChanges {
  @Input() name = 'arrow-right';
  @Input() source?: string;
  @Input() color?: IconColor;
  @Input() size?: Responsive<IconSize>;
  @Input() alt?: string;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  get resolvedAlt(): string {
    return this.alt ?? '';
  }

  get url(): string {
    return this.source || nativeIconUrl(this.name);
  }

  get mask(): string | null {
    return this.source ? `url("${this.url}")` : null;
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
      iconAppearance({
        name: this.source ? undefined : this.name,
        color: this.color,
        size: this.size,
      }),
      this.applied
    );
  }
}
