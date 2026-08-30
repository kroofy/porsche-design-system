import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import {
  type AccordionAlignMarker,
  type AccordionBackground,
  type AccordionSize,
  accordionAppearance,
} from './core/accordion/accordion.appearance';
import type { Responsive } from './core/appearance';

@Component({
  selector: 'details[pAccordion]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-accordion]': 'true',
  },
})
export class PAccordion implements OnInit, OnChanges {
  @Input() alignMarker?: AccordionAlignMarker;
  @Input() background?: AccordionBackground;
  @Input({ transform: booleanAttribute }) compact = false;
  @Input() indent?: Responsive<boolean>;
  @Input({ transform: booleanAttribute }) sticky = false;
  @Input() size?: Responsive<AccordionSize>;

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
      accordionAppearance({
        alignMarker: this.alignMarker,
        background: this.background,
        compact: this.compact,
        indent: this.indent,
        sticky: this.sticky,
        size: this.size,
      }),
      this.applied
    );
  }
}
