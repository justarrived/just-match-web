import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'account-number-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [label]="'input.account.number.label' | translate"
      [placeholder]="'input.account.number.placeholder' | translate"
      apiAttribute="account_number"
      icon="credit card"
      type="text">
    </text-input>`
})
export class AccountNumberInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
