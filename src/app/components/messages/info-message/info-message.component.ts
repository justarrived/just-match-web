import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'info-message',
  template: `
  <simple-message
    [description]="description"
    [header]="header"
    [icon]="icon"
    type="info">
  </simple-message>`
})
export class InfoMessageComponent {
  @Input() public description: string;
  @Input() public header: string;
  @Input() public icon: string;
}
