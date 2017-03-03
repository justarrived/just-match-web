import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'error-message',
  template: `
  <base-message
    [description]="description"
    [header]="header"
    [icon]="icon"
    type="negative">
  </base-message>`
})
export class ErrorMessageComponent {
  @Input() public description: string;
  @Input() public header: string;
  @Input() public icon: string;
}
