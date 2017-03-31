import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'email-or-phone-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [hint]="hint"
    [label]="'input.email.or.phone.label' | translate"
    [placeholder]="'input.email.or.phone.placeholder' | translate"
    apiAttribute="email_or_phone"
    icon="mail">
  </text-input>
  `
})
export class EmailOrPhoneInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
}
