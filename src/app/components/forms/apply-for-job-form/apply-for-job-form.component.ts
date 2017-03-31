import {ActivatedRoute} from '@angular/router';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ApplicationProxy} from '../../../proxies/application/application.proxy';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {Application} from '../../../models/api-models/application/application';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {TermsAgreement} from '../../../models/api-models/terms-agreement/terms-agreement';
import {TermsAgreementProxy} from '../../../proxies/terms-agreement/terms-agreement.proxy';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'apply-for-job-form',
  template: `
    <form
      (ngSubmit)="submitForm(applyForJobForm.value)"
      [formGroup]="applyForJobForm"
      class="ui form">
      <sm-loader
        [complete]="!loadingSubmit"
        [promise]="termsAgreement"
        class="inverted"
        text="{{'component.loading' | translate}}">
      </sm-loader>

      <apply-message-input
        [control]="applyForJobForm.controls['apply_message']"
        [apiErrors]="apiErrors">
      </apply-message-input>

      <frilans-terms-input
        [control]="applyForJobForm.controls['consent']"
        [apiErrors]="apiErrors">
      </frilans-terms-input>

      <form-submit-button
        [showButton]="showSubmitButton"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        [buttonText]="'Apply' | translate">
      </form-submit-button>
    </form>`
})
export class ApplyForJobFormComponent extends SystemLanguageListener implements OnInit {
  @Input() public job = null as Job;
  @Input() public showSubmitButton: boolean = true;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public applyForJobForm: FormGroup;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public termsAgreement: Promise<TermsAgreement>;

  private termsAgreementId: string;

  constructor(
    private applicationProxy: ApplicationProxy,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private termsAgreementProxy: TermsAgreementProxy,
    private userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver,
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  private initForm() {
    this.applyForJobForm = this.formBuilder.group({
      'consent': ['', Validators.compose([Validators.required])],
      'apply_message': [''],
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

    return this.applicationProxy.createApplication(this.job.id, {
      'apply_message': this.applyForJobForm.value.apply_message,
      'consent': this.applyForJobForm.value.consent !== '',
      'terms_agreement_id': this.termsAgreementId,
      'user_id': this.userResolver.getUser().id,
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
