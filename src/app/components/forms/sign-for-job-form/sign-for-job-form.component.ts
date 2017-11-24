import {AnalyticsActions} from '../../../services/analytics.service';
import {AnalyticsService} from '../../../services/analytics.service';
import {ActivatedRoute} from '@angular/router';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Application} from '../../../models/api-models/application/application';
import {ApplicationProxy} from '../../../proxies/application/application.proxy';
import {BaseComponent} from '../../base.component';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TermsAgreement} from '../../../models/api-models/terms-agreement/terms-agreement';
import {TermsAgreementProxy} from '../../../proxies/terms-agreement/terms-agreement.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'sign-for-job-form',
  template: `
    <form
      (keydown.enter)="$event.preventDefault()"
      (ngSubmit)="submitForm()"
      [formGroup]="signForJobForm"
      class="ui form">
      <basic-loader
        [complete]="!loadingSubmit"
        [promise]="termsAgreement"
        class="inverted">
      </basic-loader>

      <form-section-title-text
        [text]="'sign.for.job.form.terms.section' | translate"
        icon="check">
      </form-section-title-text>

      <frilans-terms-input
        [control]="signForJobForm.controls['consent']"
        [apiErrors]="apiErrors">
      </frilans-terms-input>

      <form-submit-button
        [showButton]="!isInModal"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        [buttonText]="'sign.for.job.form.submit.button' | translate">
      </form-submit-button>
    </form>`
})
export class SignForJobFormComponent extends BaseComponent {
  @Input() public job = null as Job;
  @Input() public application = null as Application;
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public signForJobForm: FormGroup;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public termsAgreement: Promise<TermsAgreement>;

  private termsAgreementId: string;

  constructor(
    private analyticsService: AnalyticsService,
    private applicationProxy: ApplicationProxy,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private termsAgreementProxy: TermsAgreementProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.initForm();
    this.loadData();
  }

  private initForm() {
    this.signForJobForm = this.formBuilder.group({
      'consent': [false, Validators.compose([Validators.required])]
    });
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData(): void {
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

    this.analyticsService.publishEvent(AnalyticsActions.SignForJobTry);

    return this.applicationProxy.confirmApplication(this.job.id, this.application.id, {
      'consent': this.signForJobForm.value.consent,
      'terms_agreement_id': this.termsAgreementId
    })
    .then(application => {
      this.analyticsService.publishEvent(AnalyticsActions.SignForJobSuccess);

      this.loadingSubmit = false;
      this.submitSuccess = true;
      return application;
    })
    .catch(errors => {
      this.handleServerErrors(errors);

      this.analyticsService.publishEvent(AnalyticsActions.SignForJobFail);

      if (this.isInModal) {
        throw errors;
      }
      return null;
    });
  }
}
