import { Component, computed, input } from '@angular/core';
import type { Responsive } from '../../../../components/src/elements/appearance';
import {
  LINK_ICON_CLASS,
  LINK_LABEL_CLASS,
  type LinkVariant,
  linkAppearance,
} from '../../../../components/src/elements/link';
import { applyAppearance } from './apply-appearance';
import { PIcon } from './PIcon';

@Component({
  selector: 'a[pLink]',
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
    '[class.p-link]': 'true',
  },
})
export class PLink {
  readonly variant = input<LinkVariant | undefined>(undefined);
  readonly icon = input('none');
  readonly hideLabel = input<Responsive<boolean> | undefined>(undefined);
  readonly compact = input<Responsive<boolean> | undefined>(undefined);

  readonly iconClass = LINK_ICON_CLASS;
  readonly labelClass = LINK_LABEL_CLASS;

  private readonly appearance = computed(() =>
    linkAppearance({
      variant: this.variant(),
      icon: this.icon(),
      hideLabel: this.hideLabel(),
      compact: this.compact(),
    })
  );

  constructor() {
    applyAppearance(this.appearance);
  }
}
