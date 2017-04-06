import {Application} from '../../../models/api-models/application/application';
import {ApplyForJobFormComponent} from '../../forms/apply-for-job-form/apply-for-job-form.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {Output} from '@angular/core';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'apply-for-job-modal',
  template: `
    <sm-modal
      icon="massive pink talk"
      #applyForJobModal>
      <modal-content>
        <div class="ui centered grid">
          <div class="sixteen wide phone twelve wide tablet twelve wide computer column">
            <apply-for-job-form
              [job]="job"
              [isInModal]="true"
              #applyForJobForm>
            </apply-for-job-form>
          </div>
        </div>
      </modal-content>
      <modal-actions>
        <div class="ui center aligned basic segment button-container">
          <sm-loader
            [complete]="!applyForJobForm.loadingSubmit"
            class="inverted">
          </sm-loader>
          <base-button
            (click)="buttonClicked()"
            [buttonText]="'apply.for.job.modal.button' | translate"
            buttonType="submit"
            kind="primary"
            size="medium">
          </base-button>
        </div>
      </modal-actions>
    </sm-modal>`
})
export class ApplyForJobModalComponent {
  @Input() public job = null as Job;
  @Output() public onAppliedForJob: EventEmitter<Application> = new EventEmitter<Application>();
  @ViewChild('applyForJobForm') public applyForJobForm: ApplyForJobFormComponent;
  @ViewChild('applyForJobModal') public applyForJobModal: any;

  public show(): void {
    this.applyForJobModal.show({
      transition: 'horizontal flip'
    });
  }

  public hide(): void {
    this.applyForJobModal.hide();
  }

  public buttonClicked(): void {
    this.applyForJobForm.submitForm()
    .then(application => {
      this.onAppliedForJob.emit(application);
      this.hide();
    });
  }
}
