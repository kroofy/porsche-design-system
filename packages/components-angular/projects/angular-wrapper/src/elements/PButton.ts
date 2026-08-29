import { booleanAttribute, Component, computed, input } from '@angular/core';
import type { Responsive } from '../../../../components/src/elements/appearance';
import {
  BUTTON_ICON_CLASS,
  BUTTON_LABEL_CLASS,
  type ButtonVariant,
  buttonAppearance,
} from '../../../../components/src/elements/button';
import { applyAppearance } from './apply-appearance';
import { PIcon } from './PIcon';

@Component({
  selector: 'button[pButton]',
  standalone: true,
  imports: [PIcon],
  template: `
    @if (icon() !== 'none') {
      <img
        pIcon
        [name]="icon()"
        size="inherit"
        color="inherit"
        [class]="iconClass"
        aria-hidden="true"
      />
    }
    <span [class]="labelClass"><ng-content /></span>
  `,
  host: {
    '[class.p-button]': 'true',
    '[attr.type]': 'type()',
    '[disabled]': 'disabled() || loading()',
    '[attr.aria-busy]': 'loading() ? "true" : null',
  },
})
export class PButton {
  readonly variant = input<ButtonVariant | undefined>(undefined);
  readonly icon = input('none');
  readonly hideLabel = input<Responsive<boolean> | undefined>(undefined);
  readonly compact = input<Responsive<boolean> | undefined>(undefined);
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly type = input<'button' | 'submit' | 'reset'>('submit');

  readonly iconClass = BUTTON_ICON_CLASS;
  readonly labelClass = BUTTON_LABEL_CLASS;

  private readonly appearance = computed(() =>
    buttonAppearance({
      variant: this.variant(),
      icon: this.icon(),
      hideLabel: this.hideLabel(),
      compact: this.compact(),
      loading: this.loading(),
    })
  );

  constructor() {
    applyAppearance(this.appearance);
  }
}
