import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-important-information-section',
  template: `
    <div class="ui grid">
      <div
        class="sixteen wide column"
        style="display: flex; align-items: center; padding-right: 0; padding-left: 0;"
        [style.direction]="systemLanguage.direction">
        <img
          src="/assets/icons/marker-pink-underline.svg"
          class="ui mini image">
        <div style="margin-left: 10px; margin-right: 10px;">
          <basic-title-text
            [text]="'job.important.information.section.address.title' | translate"
            fontSize="tiny"
            marginBottom="0"
            marginTop="0"
            color="black">
          </basic-title-text>
          <basic-title-text
            [alwaysLtrText]="true"
            [text]="job.fullStreetAddress"
            fontSize="tiny"
            fontWeight="light"
            marginBottom="0"
            marginTop="0"
            color="gray">
          </basic-title-text>
        </div>
      </div>
      <div
        class="sixteen wide column"
        style="display: flex; align-items: center; padding-right: 0; padding-left: 0;"
        [style.direction]="systemLanguage.direction">
        <img
          src="/assets/icons/calendar-pink-underline.svg"
          class="ui mini image">
        <div style="margin-left: 10px; margin-right: 10px;">
          <basic-title-text
            [text]="'job.important.information.section.period.title' | translate"
            fontSize="tiny"
            marginBottom="0"
            marginTop="0"
            color="black">
          </basic-title-text>
          <basic-title-text
            [alwaysLtrText]="true"
            [text]="(job.jobDate | date: 'MMM dd') + (job.jobEndDate ? (' - ' + (job.jobEndDate | date: 'MMM dd')) : '')"
            fontSize="tiny"
            fontWeight="light"
            marginBottom="0"
            marginTop="0"
            color="gray">
          </basic-title-text>
        </div>
      </div>
      <div
        class="sixteen wide column"
        style="display: flex; align-items: center; padding-right: 0; padding-left: 0;"
        [style.direction]="systemLanguage.direction">
        <img
          src="/assets/icons/building.svg"
          class="ui mini image">
        <div style="margin-left: 10px; margin-right: 10px;">
          <basic-title-text
            [text]="'job.important.information.section.employer.title' | translate"
            fontSize="tiny"
            marginBottom="0"
            marginTop="0"
            color="black">
          </basic-title-text>
          <basic-title-text
            [alwaysLtrText]="true"
            [text]="job?.company?.name"
            fontSize="tiny"
            fontWeight="light"
            marginBottom="0"
            marginTop="0"
            color="gray">
          </basic-title-text>
        </div>
      </div>
      <div
        *ngIf="job.lastApplicationAt"
        class="sixteen wide column"
        style="display: flex; align-items: center; padding-right: 0; padding-left: 0;"
        [style.direction]="systemLanguage.direction">
        <img
          src="/assets/icons/date.svg"
          class="ui mini image">
        <div style="margin-left: 10px; margin-right: 10px;">
          <basic-title-text
            [text]="'job.important.information.section.last.application.date.title' | translate"
            fontSize="tiny"
            marginBottom="0"
            marginTop="0"
            color="black">
          </basic-title-text>
          <basic-title-text
            [alwaysLtrText]="true"
            [text]="job.lastApplicationAt | date: 'MMM dd'"
            fontSize="tiny"
            fontWeight="light"
            marginBottom="0"
            marginTop="0"
            color="gray">
          </basic-title-text>
        </div>
      </div>
    </div>`
})
export class JobImportantInformationSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
