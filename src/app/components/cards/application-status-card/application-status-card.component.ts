import {Application} from '../../../models/api-models/application/application';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';

@Component({
  selector: 'application-status-card',
  styleUrls: ['./application-status-card.component.scss'],
  template: `
    <div
      class="job-item-container"
      [routerLink]="JARoutes.job.url([application.job.id])">
      <div class="job-item-name-container">
        <div class="job-item-name">
          {{application.job.translatedText.name}}
        </div>
      </div>
      <div
        *ngIf="!application.accepted && !application.willPerform"
        class="job-item-label-container job-item-label-applied-container">
        {{'home.jobs.slider.user.jobs.job.applied.label' | translate | uppercase}}
      </div>
      <div
        *ngIf="application.accepted && !application.willPerform"
        class="job-item-label-container job-item-label-offered-container">
        {{'home.jobs.slider.user.jobs.job.offered.label' | translate | uppercase}}
      </div>
      <div
        *ngIf="application.willPerform && !application.jobEnded"
        class="job-item-label-container job-item-label-will-perform-container">
        {{'home.jobs.slider.user.jobs.will.perform.job.label' | translate | uppercase}}
      </div>
      <div
        *ngIf="application.willPerform && application.jobEnded"
        class="job-item-label-container job-item-label-performed-container">
        {{'home.jobs.slider.user.jobs.job.ended.label' | translate | uppercase}}
      </div>
    </div>
  `
})
export class ApplicationStatusCardComponent {
  @Input() public application: Application;
  public JARoutes = JARoutes;
}
