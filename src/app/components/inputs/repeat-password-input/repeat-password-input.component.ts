import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'repeat-password-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.repeat.password.label' | translate"
      [placeholder]="'input.repeat.password.placeholder' | translate"
      apiAttribute="password"
      icon="lock"
      type="password">
    </text-input>`
})
export class RepeatPasswordInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
