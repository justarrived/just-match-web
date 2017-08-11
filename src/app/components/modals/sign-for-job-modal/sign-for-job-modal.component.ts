import {Application} from '../../../models/api-models/application/application';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {Output} from '@angular/core';
import {SignForJobFormComponent} from '../../forms/sign-for-job-form/sign-for-job-form.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'sign-for-job-modal',
  template: `
    <basic-modal
      #signForJobModal
      [title]="'sign.for.job.modal.title' | translate"
      icon="massive pink star">
      <modal-content>
        <div class="ui centered grid">
          <div class="sixteen wide mobile twelve wide tablet twelve wide computer column">
            <sign-for-job-form
              [application]="application"
              [job]="job"
              [isInModal]="true"
              #signForJobForm>
            </sign-for-job-form>
          </div>
        </div>
      </modal-content>
      <modal-actions>
        <div class="ui center aligned basic segment button-container">
          <basic-loader
            [complete]="!signForJobForm.loadingSubmit"
            [promise]="signForJobForm.termsAgreement"
            class="inverted">
          </basic-loader>
          <base-button
            (click)="buttonClicked()"
            [buttonText]="'sign.for.job.modal.button' | translate"
            buttonType="submit"
            kind="primary"
            size="medium">
          </base-button>
        </div>
      </modal-actions>
    </basic-modal>`
})
export class SignForJobModalComponent extends BaseComponent {
  @Input() public application = null as Application;
  @Input() public job = null as Job;
  @Output() public onSignedForJob: EventEmitter<Application> = new EventEmitter<Application>();
  @ViewChild('signForJobForm') public signForJobForm: SignForJobFormComponent;
  @ViewChild('signForJobModal') public signForJobModal: any;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public show(): void {
    this.signForJobModal.show({
      autofocus: false,
      transition: 'horizontal flip'
    });
  }

  public hide(): void {
    this.signForJobModal.hide();
  }

  public buttonClicked(): void {
    this.signForJobForm.submitForm()
    .then(application => {
      this.onSignedForJob.emit(application);
      this.hide();
    })
    .catch(() => {
      // Handling done in form.
    });
  }
}
