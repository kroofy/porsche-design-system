import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import {
  type TextAlign,
  type TextColor,
  type TextHyphens,
  type TextSize,
  type TextWeight,
  textAppearance,
} from './core/text/text.appearance';

@Component({
  selector:
    'p[pText], span[pText], div[pText], address[pText], blockquote[pText], figcaption[pText], cite[pText], time[pText], legend[pText]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-text]': 'true',
  },
})
export class PText implements OnInit, OnChanges {
  @Input() size?: Responsive<TextSize>;
  @Input() weight?: TextWeight;
  @Input() align?: TextAlign;
  @Input() color?: TextColor;
  @Input() hyphens?: TextHyphens;
  @Input({ transform: booleanAttribute }) ellipsis = false;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(
      this.el,
      textAppearance({
        size: this.size,
        weight: this.weight,
        align: this.align,
        color: this.color,
        hyphens: this.hyphens,
        ellipsis: this.ellipsis,
      }),
      this.applied
    );
  }
}
