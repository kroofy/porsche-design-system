import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from './core/appearance';
import { type FieldState, radioAppearance } from './core/input/input.appearance';
import { syncAppearance } from './apply-appearance';

@Component({
  selector: 'input[pRadio]',
  standalone: true,
  template: '',
  host: {
    '[class.p-radio]': 'true',
    '[attr.type]': '"radio"',
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
  },
})
export class PRadio implements OnInit, OnChanges {
  @Input() compact?: Responsive<boolean>;
  @Input() state?: FieldState;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) disabled = false;

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
      radioAppearance({
        compact: this.compact,
        state: this.state,
        loading: this.loading,
      }),
      this.applied
    );
  }
}
