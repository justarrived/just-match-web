import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'success-message',
  template: `
  <base-message
    [description]="description"
    [header]="header"
    [icon]="icon"
    type="success">
  </base-message>`
})
export class SuccessMessageComponent {
  @Input() public header: string;
  @Input() public description: string;
  @Input() public icon: string;
}
