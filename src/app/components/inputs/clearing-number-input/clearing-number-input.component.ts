import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'clearing-number-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.clearing.number.label' | translate"
      [placeholder]="'input.clearing.number.placeholder' | translate"
      apiAttribute="clearing_number"
      icon="credit card alternative"
      type="text">
    </text-input>`
})
export class ClearingNumberInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
