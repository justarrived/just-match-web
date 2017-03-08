import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'bank-account-input',
  template: `
    <clearing-number-input
      [apiErrors]="apiErrors"
      [control]="accountClearingNumberControl">
    </clearing-number-input>

    <account-number-input
      [apiErrors]="apiErrors"
      [control]="accountNumberControl">
    </account-number-input>

    <!-- The API can return errors for account, which isn't bound to any instance of form control -->
    <api-errors
      attribute="account"
      [errors]="apiErrors">
    </api-errors>`
})
export class BankAccountInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() accountClearingNumberControl: FormControl;
  @Input() accountNumberControl: FormControl;
}
