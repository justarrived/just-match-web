import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'simple-message',
  template: `
  <sm-message
    [class]="type"
    [closeable]="true"
    [icon]="icon">
    <div class="content">
      <div class="header">
        {{header}}
      </div>
      <p>
        {{description}}
      </p>
    </div>
  </sm-message>`
})
export class SimpleMessageComponent {
  @Input() public description: string;
  @Input() public header: string;
  @Input() public icon: string;
  @Input() public type: string;
}
