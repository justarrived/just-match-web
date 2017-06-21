import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

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
    icon="pink mail">
  </text-input>
  `
})
export class EmailOrPhoneInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
