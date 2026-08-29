import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  BUTTON_ICON_CLASS,
  BUTTON_LABEL_CLASS,
  BUTTON_SPINNER_CLASS,
  type ButtonVariant,
  buttonAppearance,
} from '../../../../../components/src/elements/button';
import { syncAppearance } from './apply-appearance';
import { PIcon } from './PIcon';

@Component({
  selector: 'button[pButton]',
  standalone: true,
  imports: [PIcon],
  template: `
    @if (icon !== 'none') {
      <img pIcon [name]="icon" size="inherit" color="inherit" [class]="iconClass" aria-hidden="true" />
    }
    @if (loading) {
      <span [class]="spinnerClass" aria-hidden="true">
        <svg viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false" aria-hidden="true">
          <circle r="11" />
          <circle r="11" />
        </svg>
      </span>
    }
    <span [class]="labelClass"><ng-content /></span>
  `,
  host: {
    '[class.p-button]': 'true',
    '[attr.type]': 'type',
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
  },
})
export class PButton implements OnInit, OnChanges {
  @Input() variant?: ButtonVariant;
  @Input() icon = 'none';
  @Input() hideLabel?: Responsive<boolean>;
  @Input() compact?: Responsive<boolean>;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';

  readonly iconClass = BUTTON_ICON_CLASS;
  readonly labelClass = BUTTON_LABEL_CLASS;
  readonly spinnerClass = BUTTON_SPINNER_CLASS;

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
      buttonAppearance({
        variant: this.variant,
        icon: this.icon,
        hideLabel: this.hideLabel,
        compact: this.compact,
        loading: this.loading,
      }),
      this.applied
    );
  }
}
