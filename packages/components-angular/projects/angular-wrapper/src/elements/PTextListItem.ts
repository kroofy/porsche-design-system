import { Component } from '@angular/core';

@Component({
  selector: 'li[pTextListItem]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-text-list-item]': 'true',
  },
})
export class PTextListItem {}
