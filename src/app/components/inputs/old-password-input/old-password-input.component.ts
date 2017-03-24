import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'old-password-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.old.password.label' | translate"
      [placeholder]="'input.old.password.placeholder' | translate"
      apiAttribute="old_password"
      icon="lock"
      type="password">
    </text-input>`
})
export class OldPasswordInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
