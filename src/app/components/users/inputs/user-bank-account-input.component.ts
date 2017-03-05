import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'user-bank-account-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="accountClearingNumberControl"
    [label]="'user.form.clearing.number.label' | translate"
    [placeholder]="'user.form.clearing.number.placeholder' | translate"
    apiAttribute="account_clearing_number">
  </text-input>

  <text-input
    [apiErrors]="apiErrors"
    [control]="accountNumberControl"
    [label]="'user.form.account.number.label' | translate"
    [placeholder]="'user.form.account.number.placeholder' | translate"
    apiAttribute="account_number">
  </text-input>

  <!-- The API can return errors for account, which isn't bound to any instance of form control -->
  <api-errors
    [errors]="apiErrors"
    apiAttribute="account">
  </api-errors>
  `
})
export class UserBankAccountInputComponent {
  @Input() apiErrors: any;
  @Input() accountClearingNumberControl: FormControl;
  @Input() accountNumberControl: FormControl;
}
