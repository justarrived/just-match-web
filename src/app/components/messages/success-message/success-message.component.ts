import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'success-message',
  template: `
  <simple-message
    [description]="description"
    [header]="header"
    [icon]="icon"
    type="success">
  </simple-message>`
})
export class SuccessMessageComponent {
  @Input() public header: string;
  @Input() public description: string;
  @Input() public icon: string;
}
