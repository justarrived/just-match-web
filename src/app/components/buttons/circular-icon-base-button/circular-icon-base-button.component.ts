import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'circular-icon-base-button',
  template: `
    <button
      [disabled]="disabled"
      [class.icon]="icon"
      class="ui circular {{color}} {{icon}} button"
      [type]="buttonType"
      style="padding: 10px;">
      <i *ngIf="icon" class="icon inverted {{icon}}" style="margin: 0"></i>
    </button>`
})
export class CircularIconBaseButtonComponent {
  @Input() public disabled: boolean = false;
  @Input() public color: string;
  @Input() public icon: string;
  @Input() public buttonType: string = 'button'; // One of ['button', 'submit', 'reset']
}
