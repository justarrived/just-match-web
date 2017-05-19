import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'

@Component({
  selector: 'job-information-section',
  template: `
    <div class="ui basic center aligned segment">
      <basic-title-text
        [text]="'job.information.section.header' | translate"
        [underlineBelow]="true"
        fontSize="large"
        textAlignmentLtr="center"
        marginTop="0"
        textAlignmentRtl="center"
        underlineBelowColor="pink"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
    </div>
    <div
      class="ui basic center aligned segment"
      style="padding-left: 0; padding-right: 0">
      <div class="ui equal width grid">
        <div
          class="column"
          style="padding-left: 0; padding-right: 0">
          <i class="ui big circular inverted pink building outline icon"></i>
          <basic-title-text
            [text]="job?.company?.name"
            fontSize="tiny"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-title-text>
        </div>
        <div
          class="column"
          style="padding-left: 0; padding-right: 0">
          <i class="ui big circular inverted pink calendar icon"></i>
          <basic-title-text
            [alwaysLtrText]="true"
            [text]="job.jobDate | date: 'MMM dd'"
            fontSize="tiny"
            textAlignmentLtr="center"
            marginBottom="0"
            textAlignmentRtl="center">
          </basic-title-text>
          <basic-title-text
            [text]="'-'"
            *ngIf="job.jobEndDate"
            fontSize="tiny"
            textAlignmentLtr="center"
            marginBottom="0"
            marginTop="0"
            textAlignmentRtl="center">
          </basic-title-text>
          <basic-title-text
            [alwaysLtrText]="true"
            [text]="job.jobEndDate | date: 'MMM dd'"
            *ngIf="job.jobEndDate"
            fontSize="tiny"
            textAlignmentLtr="center"
            marginBottom="0"
            marginTop="0"
            textAlignmentRtl="center">
          </basic-title-text>
        </div>
        <div
          class="column"
          style="padding-left: 0; padding-right: 0">
          <i class="ui big circular inverted pink money icon"></i>
          <basic-title-text
            [text]="job.hourlyPay.grossSalaryWithUnit"
            fontSize="tiny"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-title-text>
        </div>
      </div>
    </div>`
})
export class JobInformationSectionComponent {
  @Input() job = null as Job;
}
