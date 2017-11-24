import {ActivatedRoute} from '@angular/router';
import {AnalyticsActions} from '../../../services/analytics.service';
import {AnalyticsService} from '../../../services/analytics.service';
import {Angulartics2} from 'angulartics2';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Application} from '../../../models/api-models/application/application';
import {ApplicationProxy} from '../../../proxies/application/application.proxy';
import {BaseComponent} from '../../base.component';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'apply-for-job-form',
  template: `
    <form
      (ngSubmit)="submitForm()"
      (keydown.enter)="$event.preventDefault()"
      [formGroup]="applyForJobForm"
      class="ui form">
      <basic-loader
        [complete]="!loadingSubmit"
        class="inverted">
      </basic-loader>

      <form-section-title-text [text]="'apply.for.job.form.message.section' | translate"></form-section-title-text>

      <apply-message-input
        [control]="applyForJobForm.controls['apply_message']"
        [apiErrors]="apiErrors">
      </apply-message-input>

      <form-submit-button
        [showButton]="!isInModal"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        [buttonText]="'apply.for.job.form.submit.button' | translate">
      </form-submit-button>
    </form>`
})
export class ApplyForJobFormComponent extends BaseComponent {
  @Input() public job = null as Job;
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public applyForJobForm: FormGroup;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;

  public constructor(
    private analyticsService: AnalyticsService,
    private applicationProxy: ApplicationProxy,
    private changeDetector: ChangeDetectorRef,
    private dataStoreService: DataStoreService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.initForm();
  }

  private initForm() {
    this.applyForJobForm = this.formBuilder.group({
      'apply_message': [''],
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

    this.analyticsService.publishEvent(AnalyticsActions.ApplyForJobTry);

    return this.applicationProxy.createApplication(this.job.id, {
      'apply_message': this.applyForJobForm.value.apply_message,
      'http_referrer': document.referrer,
      'user_id': this.userResolver.getUser().id,
      'utm_campaign': this.dataStoreService.getCookie(NavigationService.utmCampaignCookieKey),
      'utm_content': this.dataStoreService.getCookie(NavigationService.utmContentCookieKey),
      'utm_medium': this.dataStoreService.getCookie(NavigationService.utmMediumCookieKey),
      'utm_source': this.dataStoreService.getCookie(NavigationService.utmSourceCookieKey),
      'utm_term': this.dataStoreService.getCookie(NavigationService.utmTermCookieKey),
    })
    .then(application => {
      this.loadingSubmit = false;
      this.submitSuccess = true;

      this.analyticsService.publishEvent(AnalyticsActions.ApplyForJobSuccess);

      return application;
    })
    .catch(errors => {
      this.handleServerErrors(errors);

      this.analyticsService.publishEvent(AnalyticsActions.ApplyForJobFail);

      if (this.isInModal) {
        throw errors;
      }
      return null;
    });
  }
}
