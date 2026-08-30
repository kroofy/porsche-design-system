import { Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from './core/appearance';
import {
  LINK_ICON_CLASS,
  LINK_LABEL_CLASS,
  type LinkVariant,
  linkAppearance,
} from './core/link/link.appearance';
import { syncAppearance } from './apply-appearance';
import { PIcon } from './PIcon';

@Component({
  selector: 'a[pLink]',
  standalone: true,
  imports: [PIcon],
  template: `
    @if (icon !== 'none') {
      <img pIcon [name]="icon" size="inherit" color="inherit" [class]="iconClass" aria-hidden="true" />
    }
    <span [class]="labelClass"><ng-content /></span>
  `,
  host: {
    '[class.p-link]': 'true',
  },
})
export class PLink implements OnInit, OnChanges {
  @Input() variant?: LinkVariant;
  @Input() icon = 'none';
  @Input() hideLabel?: Responsive<boolean>;
  @Input() compact?: Responsive<boolean>;

  readonly iconClass = LINK_ICON_CLASS;
  readonly labelClass = LINK_LABEL_CLASS;

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
      linkAppearance({
        variant: this.variant,
        icon: this.icon,
        hideLabel: this.hideLabel,
        compact: this.compact,
      }),
      this.applied
    );
  }
}
