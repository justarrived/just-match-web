import {ApiErrors} from '../../../../models/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';


@Component({
  selector: 'user-password-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [label]="('form.parts.user.password.input.label' | translate) + ' *'"
    [placeholder]="'form.parts.user.password.input.placeholder' | translate"
    apiAttribute="password"
    icon="lock"
    type="password">
  </text-input>
  `
})
export class UserPasswordInputComponent {
  @Input() apiErrors: any;
  @Input() control: any;
}
