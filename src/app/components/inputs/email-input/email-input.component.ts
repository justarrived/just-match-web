import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'email-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [hint]="hint"
    [label]="'input.email.label' | translate"
    [placeholder]="'input.email.placeholder' | translate"
    [patternLabel]="'validations.email_pattern' | translate"
    apiAttribute="email"
    icon="mail">
  </text-input>
  `
})
export class EmailInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
}
