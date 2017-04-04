import {ActivatedRoute} from '@angular/router';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Application} from '../../../models/api-models/application/application';
import {ApplicationProxy} from '../../../proxies/application/application.proxy';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TermsAgreement} from '../../../models/api-models/terms-agreement/terms-agreement';
import {TermsAgreementProxy} from '../../../proxies/terms-agreement/terms-agreement.proxy';
import {Validators} from '@angular/forms';

@Component({
  selector: 'sign-for-job-form',
  template: `
    <form
      (ngSubmit)="submitForm(signForJobForm.value)"
      [formGroup]="signForJobForm"
      class="ui form">
      <sm-loader
        [complete]="!loadingSubmit"
        [promise]="termsAgreement"
        class="inverted">
      </sm-loader>

      <h3
        class="ui horizontal divider pink header">
        <i class="check icon"></i>
        {{'sign.for.job.form.terms.section' | translate}}
      </h3>

      <frilans-terms-input
        [control]="signForJobForm.controls['consent']"
        [apiErrors]="apiErrors">
      </frilans-terms-input>

      <form-submit-button
        [showButton]="showSubmitButton"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        [buttonText]="'sign.for.job.form.submit.button' | translate">
      </form-submit-button>
    </form>`
})
export class SignForJobFormComponent extends SystemLanguageListener implements OnInit {
  @Input() public job = null as Job;
  @Input() public application = null as Application;
  @Input() public showSubmitButton: boolean = true;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public signForJobForm: FormGroup;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public termsAgreement: Promise<TermsAgreement>;

  private termsAgreementId: string;

  constructor(
    private applicationProxy: ApplicationProxy,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private termsAgreementProxy: TermsAgreementProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  private initForm() {
    this.signForJobForm = this.formBuilder.group({
      'consent': ['', Validators.compose([Validators.required])]
    });
  }

  protected loadData(): void {
    this.termsAgreement = this.termsAgreementProxy.getTermsAgreement()
    .then(termsAgreement => {
      this.termsAgreementId = termsAgreement.id;
      return termsAgreement;
    });
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(): Promise<Application> {
    this.loadingSubmit = true;
    this.submitFail = false;
    this.submitSuccess = false;

    return this.applicationProxy.confirmApplication(this.job.id, this.application.id, {
      'consent': this.signForJobForm.value.consent !== '',
      'terms_agreement_id': this.termsAgreementId
    })
    .then(application => {
      this.loadingSubmit = false;
      this.submitSuccess = true;
      return application;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      throw errors;
    });
  }
}
