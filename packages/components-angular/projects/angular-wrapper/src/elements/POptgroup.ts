import { Component } from '@angular/core';

@Component({
  selector: 'optgroup[pOptgroup]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-optgroup]': 'true',
  },
})
export class POptgroup {}
