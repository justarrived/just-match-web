import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'phone-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.phone.label' | translate"
      [placeholder]="'input.phone.placeholder' | translate"
      apiAttribute="phone"
      icon="phone">
    </text-input>`
})
export class PhoneInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
