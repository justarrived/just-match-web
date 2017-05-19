import {Application} from '../../../models/api-models/application/application';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';

@Component({
  selector: 'application-status-card',
  styleUrls: ['./application-status-card.component.scss'],
  template: `
    <div
      class="job-item-container"
      [routerLink]="JARoutes.job.url([application.job.id])">
      <div class="job-item-name-container">
        <basic-title-text
          [maxiumLinesEllipsis]="2"
          [text]="application.job.translatedText.name"
          color="black"
          fontSize="small"
          fontWeight="bold"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>
      <div
        *ngIf="!application.accepted && !application.willPerform"
        class="job-item-label-container job-item-label-applied-container">
        <basic-title-text
          [oneLineEllipsis]="true"
          [text]="'home.jobs.slider.user.jobs.job.applied.label' | translate"
          [uppercase]="true"
          color="gray"
          fontSize="small"
          fontWeight="light"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>
      <div
        *ngIf="application.accepted && !application.willPerform"
        class="job-item-label-container job-item-label-offered-container">
        <basic-title-text
          [oneLineEllipsis]="true"
          [text]="'home.jobs.slider.user.jobs.job.offered.label' | translate"
          [uppercase]="true"
          color="white"
          fontSize="small"
          fontWeight="light"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>
      <div
        *ngIf="application.willPerform && !application.jobEnded"
        class="job-item-label-container job-item-label-will-perform-container">
        <basic-title-text
          [oneLineEllipsis]="true"
          [text]="'home.jobs.slider.user.jobs.will.perform.label' | translate"
          [uppercase]="true"
          color="white"
          fontSize="small"
          fontWeight="light"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>
      <div
        *ngIf="application.willPerform && application.jobEnded"
        class="job-item-label-container job-item-label-performed-container">
        <basic-title-text
          [oneLineEllipsis]="true"
          [text]="'home.jobs.slider.user.jobs.job.ended.label' | translate"
          [uppercase]="true"
          color="white"
          fontSize="small"
          fontWeight="light"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>
    </div>
  `
})
export class ApplicationStatusCardComponent {
  @Input() public application = null as Application;
  public JARoutes = JARoutes;
}
