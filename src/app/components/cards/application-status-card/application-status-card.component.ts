import {Application} from '../../../models/api-models/application/application';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

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
export class ApplicationStatusCardComponent extends BaseComponent {
  @Input() public application = null as Application;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
