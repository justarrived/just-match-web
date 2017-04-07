import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'base-message',
  template: `
  <div
    [ngClass]="{'icon': icon}"
    class="ui {{type}} visible message">
    <i
      [ngClass]="[icon, 'icon']"
      *ngIf="icon">
    </i>
    <div class="content">
      <div class="header">
        {{header}}
      </div>
      <p>
        {{description}}
      </p>
    </div>
  </div>`
})
export class BaseMessageComponent {
  @Input() public description: string;
  @Input() public header: string;
  @Input() public icon: string;
  @Input() public type: string;
}
