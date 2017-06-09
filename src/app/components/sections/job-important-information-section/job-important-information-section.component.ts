import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-important-information-section',
  template: `
    <basic-title-text
      [text]="'job.important.information.section.title' | translate "
      [uppercase]="true"
      color="pink"
      fontSize="medium">
    </basic-title-text>
    <div class="ui grid">
      <div
        class="sixteen wide column"
        style="display: flex; align-items: center; padding-right: 0; padding-left: 0;"
        [style.direction]="systemLanguage.direction">
        <img
          src="/assets/icons/clock-pink-underline.svg"
          class="ui mini image">
        <div style="margin-left: 10px; margin-right: 10px;">
          <basic-title-text
            [text]="'job.important.information.section.hours' | translate: {hours: job.hours}"
            marginTop="0"
            marginBottom="0"
            fontSize="tiny"
            fontWeight="light"
            color="black">
          </basic-title-text>
          <basic-title-text
            [text]="'job.important.information.section.salary.per.hour' | translate: {grossSalaryPerHour: job.hourlyPay.grossSalaryWithUnit}"
            fontSize="tiny"
            fontWeight="light"
            marginTop="0"
            marginBottom="0"
            color="black">
          </basic-title-text>
          <basic-title-text
            [text]="'job.important.information.section.total.salary' | translate: {totalGrossSalary: job.grossAmountWithCurrency, totalNetSalary: job.netAmountWithCurrency}"
            fontSize="tiny"
            fontWeight="light"
            marginBottom="0"
            marginTop="0"
            color="black">
          </basic-title-text>
        </div>
      </div>
      <div
        class="sixteen wide column"
        style="display: flex; align-items: center; padding-right: 0; padding-left: 0;"
        [style.direction]="systemLanguage.direction">
        <img
          src="/assets/icons/marker-pink-underline.svg"
          class="ui mini image">
        <basic-title-text
          [alwaysLtrText]="true"
          [text]="job.fullStreetAddress"
          fontSize="tiny"
          fontWeight="light"
          marginBottom="0"
          marginTop="0"
          color="black"
          style="margin-left: 10px; margin-right: 10px;">
        </basic-title-text>
      </div>
      <div
        class="sixteen wide column"
        style="display: flex; align-items: center; padding-right: 0; padding-left: 0;"
        [style.direction]="systemLanguage.direction">
        <img
          src="/assets/icons/calendar-pink-underline.svg"
          class="ui mini image">
        <basic-title-text
          [alwaysLtrText]="true"
          [text]="(job.jobDate | date: 'MMM dd') + (job.jobEndDate ? (' - ' + (job.jobEndDate | date: 'MMM dd')) : '')"
          fontSize="tiny"
          fontWeight="light"
          marginBottom="0"
          marginTop="0"
          color="black"
          style="margin-left: 10px; margin-right: 10px;">
        </basic-title-text>
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
