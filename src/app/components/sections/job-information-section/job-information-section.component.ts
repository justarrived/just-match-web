import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'

@Component({
  selector: 'job-information-section',
  template: `
    <div class="ui basic center aligned segment">
      <basic-title
        [text]="'job.information.section.header' | translate"
        [underlineBelow]="true"
        fontSize="large"
        ltrTextAlignment="center"
        marginTop="0"
        rtlTextAlignment="center"
        underlineBelowColor="pink">
      </basic-title>
    </div>
    <div
      class="ui basic center aligned segment"
      style="padding-left: 0; padding-right: 0">
      <div class="ui equal width grid">
        <div
          class="column"
          style="padding-left: 0; padding-right: 0">
          <i class="ui big circular inverted pink building outline icon"></i>
          <basic-title
            [text]="job?.company?.name"
            fontSize="tiny"
            ltrTextAlignment="center"
            rtlTextAlignment="center">
          </basic-title>
        </div>
        <div
          class="column"
          style="padding-left: 0; padding-right: 0">
          <i class="ui big circular inverted pink calendar icon"></i>
          <basic-title
            [text]="job.jobDate | date: 'MMM dd'"
            fontSize="tiny"
            ltrTextAlignment="center"
            marginBottom="0"
            rtlTextAlignment="center">
          </basic-title>
          <basic-title
            [text]="'-'"
            *ngIf="job.jobEndDate"
            fontSize="tiny"
            ltrTextAlignment="center"
            marginBottom="0"
            marginTop="0"
            rtlTextAlignment="center">
          </basic-title>
          <basic-title
            [text]="job.jobEndDate | date: 'MMM dd'"
            *ngIf="job.jobEndDate"
            fontSize="tiny"
            ltrTextAlignment="center"
            marginBottom="0"
            marginTop="0"
            rtlTextAlignment="center">
          </basic-title>
        </div>
        <div
          class="column"
          style="padding-left: 0; padding-right: 0">
          <i class="ui big circular inverted pink money icon"></i>
          <basic-title
            [text]="job.hourlyPay.grossSalaryWithUnit"
            fontSize="tiny"
            ltrTextAlignment="center"
            rtlTextAlignment="center">
          </basic-title>
        </div>
      </div>
    </div>`
})
export class JobInformationSectionComponent {
  @Input() job = null as Job;
}
