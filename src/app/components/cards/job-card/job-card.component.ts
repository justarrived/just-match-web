import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {fadeInAnimation} from '../../../animations/fade-in/fade-in.animation';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Job} from '../../../models/api-models/job/job';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  animations: [fadeInAnimation('200ms')],
  selector: 'job-card',
  styleUrls: ['./job-card.component.scss'],
  template: `
  <div
    [@fadeInAnimation]="animationState"
    (mouseover)='hovered = true'
    (mouseout)='hovered = false'
    class="ui card link job-card"
    routerLink="{{JARoutes.job.url([job.id])}}">
    <div
      *ngIf="job.filled"
      class="filled-job-container">
      <div class="filled-job-stamp">
        <basic-title-text
          [text]="'job.card.filled' | translate"
          [uppercase]="true"
          fontSize="huge"
          color="pink"
          marginTop="0"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>
    </div>
    <div class="ui basic segment">
      <div class="company-image-container">
        <img
          *ngIf="job?.company?.logoImage"
          [src]="job.company.logoImage.imageUrlMedium"
          class="ui centered image">
        <div
          *ngIf="!job?.company?.logoImage"
          style="width: 100%">
          <basic-title-text
            *ngIf="!job?.company?.logoImage"
            [alwaysLtrText]="true"
            [text]="job?.company?.name"
            [oneLineEllipsis]="true"
            fontSize="large"
            fontWeight="light"
            color="black"
            marginTop="0"
            marginBottom="0"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-title-text>
        </div>
      </div>
      <div class="title-container">
        <basic-title-text
          [text]="job.translatedText.name"
          [maxiumLinesEllipsis]="2"
          color="black"
          fontSize="medium"
          marginTop="0"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>
      <div class="description-container">
        <basic-text
          [text]="job.translatedText.shortDescription"
          [maxiumLinesEllipsis]="4"
          fontSize="medium"
          color="gray"
          marginTop="0"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-text>
      </div>
    </div>
    <div class="ui equal width grid meta-container">
      <div
        *ngIf="job.city"
        class="column"
        style="padding-left: 0; padding-right: 0;">
        <img
          class="ui centered mini image"
          src="/assets/icons/marker.svg">
        <basic-title-text
          [alwaysLtrText]="true"
          [text]="job.city"
          [oneLineEllipsis]="true"
          fontSize="tiny"
          color="pink"
          marginTop="0.5rem"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>
      <div
        class="column"
        style="padding-left: 0; padding-right: 0;">
        <img
          class="ui centered mini image"
          src="/assets/icons/calendar.svg">
        <basic-title-text
          [alwaysLtrText]="true"
          [text]="(job.jobDate | date: 'MMM dd') + (job.jobEndDate ? (' - ' + (job.jobEndDate | date: 'MMM dd')) : '')"
          [oneLineEllipsis]="true"
          fontSize="tiny"
          color="pink"
          marginTop="0.5rem"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>
      <div
        class="column"
        style="padding-left: 0; padding-right: 0;">
        <img
          class="ui centered mini image"
          src="/assets/icons/stopwatch.svg">
        <basic-title-text
          [text]="(job.fullTime ? 'job.card.full.time' : 'job.card.part.time') | translate"
          [oneLineEllipsis]="true"
          fontSize="tiny"
          color="pink"
          marginTop="0.5rem"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>
    </div>
    <div class="read-more-container">
      <basic-link
        [text]="'job.card.read.more' | translate"
        [color]="hovered ? 'pink' : 'white'"
        fontWeight="bold"
        paddingTop="1rem"
        paddingBottom="1rem"
        marginTop="0"
        marginBottom="0"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-link>
    </div>
  </div>`

})
export class JobCardComponent extends BaseComponent {
  @Input() public job = null as Job;
  @Input() public animationDelay: number = 1;
  public hovered: boolean = false;

  public JARoutes = JARoutes;
  public animationState: string = 'hidden';

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    setTimeout(() => {
      this.animationState = 'visible';
    }, this.animationDelay);
  }
}
