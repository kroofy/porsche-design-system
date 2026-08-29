import { Component, computed, input } from '@angular/core';
import type { Responsive } from '../../../../components/src/elements/appearance';
import {
  type IconColor,
  type IconSize,
  iconAppearance,
  nativeIconUrl,
} from '../../../../components/src/elements/icon';
import { applyAppearance } from './apply-appearance';

@Component({
  selector: 'img[pIcon]',
  standalone: true,
  template: '',
  host: {
    '[class.p-icon]': 'true',
    '[attr.src]': 'url()',
    '[attr.alt]': 'resolvedAlt()',
    '[attr.width]': '24',
    '[attr.height]': '24',
    '[attr.loading]': '"lazy"',
    '[style.--_p-icon-mask]': 'mask()',
  },
})
export class PIcon {
  readonly name = input('arrow-right');
  readonly source = input<string | undefined>(undefined);
  readonly color = input<IconColor | undefined>(undefined);
  readonly size = input<Responsive<IconSize> | undefined>(undefined);
  readonly alt = input<string | undefined>(undefined);

  readonly resolvedAlt = computed(() => this.alt() ?? '');
  readonly url = computed(() => this.source() || nativeIconUrl(this.name()));
  readonly mask = computed(() => (this.source() ? `url("${this.url()}")` : null));

  private readonly appearance = computed(() =>
    iconAppearance({
      name: this.source() ? undefined : this.name(),
      color: this.color(),
      size: this.size(),
    })
  );

  constructor() {
    applyAppearance(this.appearance);
  }
}
