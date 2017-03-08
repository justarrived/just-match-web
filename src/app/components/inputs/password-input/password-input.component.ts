import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'password-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.password.label' | translate"
      [placeholder]="'input.password.placeholder' | translate"
      apiAttribute="password"
      icon="lock"
      type="password">
    </text-input>`
})
export class PasswordInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
