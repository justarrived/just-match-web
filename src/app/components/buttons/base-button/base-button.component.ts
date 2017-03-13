import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'base-button',
  styleUrls: ['./base-button.component.scss'],
  template: `
    <button
      [class.fluid]="fluid"
      [ngClass]="[kind, size, 'btn']"
      [type]="buttonType">
      <i *ngIf="icon" class="icon {{icon}}"></i>
      {{buttonText}}
    </button>`
})
export class BaseButtonComponent {
  @Input() public buttonText: string = '';
  @Input() public fluid: boolean;
  @Input() public kind: string = 'primary'; // One of ['primary', 'primary-light', 'secondary', 'secondary-light', 'inactive-light', 'inactive-dark']
  @Input() public icon: string;
  @Input() public size: string = 'medium'; // One of ['xsmall', 'small', 'medium', 'large']
  @Input() public buttonType: string = 'button'; // One of ['button', 'submit', 'reset']
}
