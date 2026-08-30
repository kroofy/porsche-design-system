import { Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import {
  SPINNER_VIEWBOX,
  type SpinnerColor,
  type SpinnerSize,
  spinnerAppearance,
} from './core/spinner/spinner.appearance';

@Component({
  selector: 'svg[pSpinner]',
  standalone: true,
  template: `
    <circle r="11" />
    <circle r="11" />
    <ng-content />
  `,
  host: {
    '[class.p-spinner]': 'true',
    '[attr.xmlns]': '"http://www.w3.org/2000/svg"',
    '[attr.viewBox]': 'viewBox',
  },
})
export class PSpinner implements OnInit, OnChanges {
  @Input() color?: SpinnerColor;
  @Input() size?: Responsive<SpinnerSize>;

  readonly viewBox = SPINNER_VIEWBOX;

  private readonly el = inject(ElementRef).nativeElement as SVGSVGElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    if (!this.el.hasAttribute('role')) {
      this.el.setAttribute('role', 'alert');
    }
    if (!this.el.hasAttribute('aria-live')) {
      this.el.setAttribute('aria-live', 'assertive');
    }
    if (!this.el.hasAttribute('focusable')) {
      this.el.setAttribute('focusable', 'false');
    }
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(this.el, spinnerAppearance({ color: this.color, size: this.size }), this.applied);
  }
}
