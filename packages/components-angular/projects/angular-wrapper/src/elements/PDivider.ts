import { Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import { type DividerColor, type DividerDirection, dividerAppearance } from './core/divider/divider.appearance';

@Component({
  selector: 'hr[pDivider]',
  standalone: true,
  template: '',
  host: {
    '[class.p-divider]': 'true',
  },
})
export class PDivider implements OnInit, OnChanges {
  @Input() color?: DividerColor;
  @Input() direction?: Responsive<DividerDirection>;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(this.el, dividerAppearance({ color: this.color, direction: this.direction }), this.applied);
  }
}
