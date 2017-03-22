import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'new-password-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.new.password.label' | translate"
      [placeholder]="'input.new.password.placeholder' | translate"
      apiAttribute="password"
      icon="lock"
      type="password">
    </text-input>`
})
export class NewPasswordInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
