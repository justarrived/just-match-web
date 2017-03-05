import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'user-phone-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [label]="('user.form.phone.label' | translate) + ' *'"
    [placeholder]="'user.form.phone.placeholder' | translate"
    apiAttribute="phone"
    icon="phone">
  </text-input>
  `
})
export class UserPhoneInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: any;
}
