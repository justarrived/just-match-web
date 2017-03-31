import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {InputErrorsComponent} from '../../form-errors/input-errors/input-errors.component';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TermsAgreement} from '../../../models/api-models/terms-agreement/terms-agreement';
import {TermsAgreementProxy} from '../../../proxies/terms-agreement/terms-agreement.proxy';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'frilans-terms-input',
  template: `
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      class="field">
      <div class="ui segment">
        <sm-loader
          [promise]="termsAgreement"
          class="inverted"
          text="{{'component.loading' | translate}}">
        </sm-loader>
        <sm-checkbox
          [control]="control"
          [label]="'input.frilans.terms.label' | translate">
        </sm-checkbox>
        <div class="ui center aligned basic segment">
          <a
            [href]="(termsAgreement | async)?.url"
            target="_blank">
             {{'input.frilans.terms.link' | translate}}
          </a>
         </div>
      </div>
      <input-errors
        [apiErrors]="apiErrors"
        [control]="control"
        apiAttribute="consent">
      </input-errors>
    </div>`
})
export class FrilansTermsInputComponent extends SystemLanguageListener implements OnInit {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @ViewChild(InputErrorsComponent) inputErrors: InputErrorsComponent;

  public termsAgreement: Promise<TermsAgreement>;

  public constructor(
    private termsAgreementProxy: TermsAgreementProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData(): void {
    this.termsAgreement = this.termsAgreementProxy.getTermsAgreement();
  }
}