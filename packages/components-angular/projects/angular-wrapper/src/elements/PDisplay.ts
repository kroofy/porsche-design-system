import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import {
  type DisplayAlign,
  type DisplayColor,
  type DisplaySize,
  displayAppearance,
} from './core/display/display.appearance';

@Component({
  selector: 'h1[pDisplay], h2[pDisplay], h3[pDisplay], h4[pDisplay], h5[pDisplay], h6[pDisplay]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-display]': 'true',
  },
})
export class PDisplay implements OnInit, OnChanges {
  @Input() size?: Responsive<DisplaySize>;
  @Input() align?: DisplayAlign;
  @Input() color?: DisplayColor;
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
      displayAppearance({
        size: this.size,
        align: this.align,
        color: this.color,
        ellipsis: this.ellipsis,
      }),
      this.applied
    );
  }
}
