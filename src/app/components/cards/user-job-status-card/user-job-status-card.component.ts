import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';
import {UserJob} from '../../../models/user/user-job';

@Component({
  selector: 'user-job-status-card',
  styleUrls: ['./user-job-status-card.component.scss'],
  template: `
    <div
      class="job-item-container"
      [routerLink]="JARoutes.job.url([userJob.job.id])">
      <div class="job-item-name-container">
        <div class="job-item-name">
          {{userJob.job.translated.name}}
        </div>
      </div>
      <div
        *ngIf="!userJob.accepted && !userJob.willPerform"
        class="job-item-label-container job-item-label-applied-container">
        {{'home.jobs.slider.user.jobs.job.applied.label' | translate | uppercase}}
      </div>
      <div
        *ngIf="userJob.accepted && !userJob.willPerform"
        class="job-item-label-container job-item-label-offered-container">
        {{'home.jobs.slider.user.jobs.job.offered.label' | translate | uppercase}}
      </div>
      <div
        *ngIf="userJob.willPerform && !userJob.job_ended"
        class="job-item-label-container job-item-label-will-perform-container">
        {{'home.jobs.slider.user.jobs.will.perform.job.label' | translate | uppercase}}
      </div>
      <div
        *ngIf="userJob.willPerform && userJob.job_ended"
        class="job-item-label-container job-item-label-performed-container">
        {{'home.jobs.slider.user.jobs.job.ended.label' | translate | uppercase}}
      </div>
    </div>
  `
})
export class UserJobStatusCardComponent {
  @Input() public userJob: UserJob;
  public JARoutes = JARoutes;
}
