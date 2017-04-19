import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'bank-account-input',
  template: `
    <text-input
      [apiErrors]="apiErrors"
      [control]="control"
      [hint]="hint"
      [label]="'input.bank.account.label' | translate"
      [placeholder]="'input.bank.account.placeholder' | translate"
      apiAttribute="bank_account"
      icon="credit card"
      type="text">
    </text-input>`
})
export class BankAccountInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
}
