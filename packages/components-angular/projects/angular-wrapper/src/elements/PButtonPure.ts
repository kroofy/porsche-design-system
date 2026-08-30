import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from './core/appearance';
import {
  BUTTON_PURE_ICON_CLASS,
  BUTTON_PURE_LABEL_CLASS,
  BUTTON_PURE_SPINNER_CLASS,
  type ButtonPureAlignLabel,
  type ButtonPureColor,
  type ButtonPureSize,
  buttonPureAppearance,
} from './core/button-pure/button-pure.appearance';
import { syncAppearance } from './apply-appearance';
import { PIcon } from './PIcon';

@Component({
  selector: 'button[pButtonPure]',
  standalone: true,
  imports: [PIcon],
  template: `
    @if (loading) {
      <span [class]="spinnerClass" aria-hidden="true">
        <svg viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false" aria-hidden="true">
          <circle r="11" />
          <circle r="11" />
        </svg>
      </span>
    } @else if (icon !== 'none' || iconSource) {
      <img
        pIcon
        [name]="icon === 'none' ? 'arrow-right' : icon"
        [source]="iconSource"
        size="inherit"
        color="inherit"
        [class]="iconClass"
        aria-hidden="true"
      />
    }
    <span [class]="labelClass"><ng-content /></span>
  `,
  host: {
    '[class.p-button-pure]': 'true',
    '[attr.type]': 'type',
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
  },
})
export class PButtonPure implements OnInit, OnChanges {
  @Input() size?: Responsive<ButtonPureSize>;
  @Input() color?: ButtonPureColor;
  @Input() icon = 'arrow-right';
  @Input() iconSource?: string;
  @Input() hideLabel?: Responsive<boolean>;
  @Input() alignLabel?: Responsive<ButtonPureAlignLabel>;
  @Input() stretch?: Responsive<boolean>;
  @Input({ transform: booleanAttribute }) underline = false;
  @Input({ transform: booleanAttribute }) active = false;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';

  readonly iconClass = BUTTON_PURE_ICON_CLASS;
  readonly labelClass = BUTTON_PURE_LABEL_CLASS;
  readonly spinnerClass = BUTTON_PURE_SPINNER_CLASS;

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
      buttonPureAppearance({
        size: this.size,
        color: this.color,
        icon: this.icon,
        hideLabel: this.hideLabel,
        alignLabel: this.alignLabel,
        stretch: this.stretch,
        underline: this.underline,
        active: this.active,
        loading: this.loading,
      }),
      this.applied
    );
  }
}
