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
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'apply-for-job-form',
  template: `
    <form
      (ngSubmit)="submitForm()"
      [formGroup]="applyForJobForm"
      class="ui form">
      <sm-loader
        [complete]="!loadingSubmit"
        class="inverted">
      </sm-loader>

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
export class ApplyForJobFormComponent implements OnInit {
  @Input() public job = null as Job;
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public applyForJobForm: FormGroup;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;

  constructor(
    private applicationProxy: ApplicationProxy,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userResolver: UserResolver
  ) {
  }

  public ngOnInit(): void {
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

    return this.applicationProxy.createApplication(this.job.id, {
      'apply_message': this.applyForJobForm.value.apply_message,
      'user_id': this.userResolver.getUser().id,
    })
    .then(application => {
      this.loadingSubmit = false;
      this.submitSuccess = true;
      return application;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      if (this.isInModal) {
        throw errors;
      }
    });
  }
}
