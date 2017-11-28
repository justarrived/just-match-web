import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'just-arrived-terms-input',
  template: `
    <div class="ui segment">
      <div class="ui center aligned basic segment">
        <checkbox-input
          [apiErrors]="apiErrors"
          [control]="control"
          [label]="'input.just.arrived.terms.label' | translate"
          apiAttribute="consent"
          uniqueId="just-arrived-terms-checkbox">
        </checkbox-input>
        <img
          alt="Just Arrived"
          class="ui centered small image"
          src="/assets/images/logo.png"
          style="margin-top: 20px;">
       </div>
    </div>`
})
export class JustArrivedTermsInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
