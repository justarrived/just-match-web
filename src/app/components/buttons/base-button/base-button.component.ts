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
  @Input() buttonText: string = 'default';
  @Input() fluid: boolean;
  @Input() kind: string = 'primary'; // One of ['primary', 'primary-light', 'secondary', 'secondary-light', 'inactive-light', 'inactive-dark']
  @Input() icon: string;
  @Input() size: string = 'medium'; // One of ['xsmall', 'small', 'medium', 'large']
  @Input() buttonType: string = 'button'; // One of ['button', 'submit', 'reset']
}
