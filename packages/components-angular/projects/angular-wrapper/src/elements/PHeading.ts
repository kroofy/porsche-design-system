import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import {
  type HeadingAlign,
  type HeadingColor,
  type HeadingHyphens,
  type HeadingSize,
  type HeadingWeight,
  headingAppearance,
} from './core/heading/heading.appearance';

@Component({
  selector: 'h1[pHeading], h2[pHeading], h3[pHeading], h4[pHeading], h5[pHeading], h6[pHeading]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-heading]': 'true',
  },
})
export class PHeading implements OnInit, OnChanges {
  @Input() size?: Responsive<HeadingSize>;
  @Input() weight?: HeadingWeight;
  @Input() align?: HeadingAlign;
  @Input() color?: HeadingColor;
  @Input() hyphens?: HeadingHyphens;
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
      headingAppearance({
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
