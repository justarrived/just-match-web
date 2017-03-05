import {ApiErrors} from '../../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';


@Component({
  selector: 'user-password-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [label]="('user.form.password.input.label' | translate) + ' *'"
    [placeholder]="'user.form.password.input.placeholder' | translate"
    apiAttribute="password"
    icon="lock"
    type="password">
  </text-input>
  `
})
export class UserPasswordInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: any;
}
