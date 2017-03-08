import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'user-email-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [label]="('user.form.email.header' | translate) + ' *'"
    [placeholder]="'user.form.email.placeholder' | translate"
    [patternLabel]="'validations.email_pattern' | translate"
    apiAttribute="email"
    icon="mail">
  </text-input>
  `
})
export class UserEmailInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
