import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'email-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [label]="'input.email.label' | translate"
    [placeholder]="'input.email.placeholder' | translate"
    [patternLabel]="'validations.email_pattern' | translate"
    apiAttribute="email"
    icon="mail">
  </text-input>
  `
})
export class EmailInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
