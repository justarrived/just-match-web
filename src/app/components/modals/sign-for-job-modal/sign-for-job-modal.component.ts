import {Application} from '../../../models/api-models/application/application';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {Output} from '@angular/core';
import {SignForJobFormComponent} from '../../forms/sign-for-job-form/sign-for-job-form.component';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'sign-for-job-modal',
  template: `
    <sm-modal
      #signForJobModal
      [title]="'sign.for.job.modal.title' | translate"
      icon="massive pink star">
      <modal-content>
        <div class="ui centered grid">
          <div class="sixteen wide phone twelve wide tablet twelve wide computer column">
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
          <sm-loader
            [complete]="!signForJobForm.loadingSubmit"
            [promise]="signForJobForm.termsAgreement"
            class="inverted">
          </sm-loader>
          <base-button
            (click)="buttonClicked()"
            [buttonText]="'sign.for.job.modal.button' | translate"
            buttonType="submit"
            kind="primary"
            size="medium">
          </base-button>
        </div>
      </modal-actions>
    </sm-modal>`
})
export class SignForJobModalComponent {
  @Input() public application = null as Application;
  @Input() public job = null as Job;
  @Output() public onSignedForJob: EventEmitter<Application> = new EventEmitter<Application>();
  @ViewChild('signForJobForm') public signForJobForm: SignForJobFormComponent;
  @ViewChild('signForJobModal') public signForJobModal: any;

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
    });
  }
}
