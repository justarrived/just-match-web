import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'positive-message',
  template: `
  <base-message
    [description]="description"
    [header]="header"
    [icon]="icon"
    type="positive">
  </base-message>`
})
export class PositiveMessageComponent {
  @Input() public header: string;
  @Input() public description: string;
  @Input() public icon: string;
}
