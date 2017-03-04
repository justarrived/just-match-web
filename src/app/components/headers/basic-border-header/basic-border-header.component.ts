import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'basic-border-header',
  styleUrls: ['./basic-border-header.component.scss'],
  template: `
  <div class="ui padded basic center aligned segment basic-border-header-container">
    <h2 class="ui inverted header">
      <i *ngIf="icon" class="{{icon}} icon"></i>
      {{header}}
    </h2>
  </div>`
})
export class BasicBorderHeaderComponent {
  @Input() header: string;
  @Input() icon: string;
}
