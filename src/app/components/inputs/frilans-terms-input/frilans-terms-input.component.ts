import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TermsAgreement} from '../../../models/api-models/terms-agreement/terms-agreement';
import {TermsAgreementProxy} from '../../../proxies/terms-agreement/terms-agreement.proxy';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'frilans-terms-input',
  template: `
    <div class="ui segment">
      <basic-loader
        [promise]="termsAgreement"
        class="inverted">
      </basic-loader>
      <div class="ui center aligned basic segment">
        <checkbox-input
          [apiErrors]="apiErrors"
          [control]="control"
          [label]="'input.frilans.terms.label' | translate"
          apiAttribute="consent"
          uniqueId="frilans-terms-checkbox">
        </checkbox-input>
        <img
          alt="Frilans Finans"
          class="ui centered small image"
          src="/assets/images/frilans_finans-logo.png">
        <basic-link
          [text]="'input.frilans.terms.link' | translate"
          [href]="(termsAgreement | async)?.url"
          color="gray"
          hoverColor="pink"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>
       </div>
    </div>`
})
export class FrilansTermsInputComponent extends SystemLanguageListener implements OnInit {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;

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
