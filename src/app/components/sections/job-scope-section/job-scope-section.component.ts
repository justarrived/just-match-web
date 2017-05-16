import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'

@Component({
  selector: 'job-scope-section',
  template: `
    <div class="ui basic center aligned segment">
      <i class="ui big circular inverted pink clock icon"></i>
      <basic-title-text
        [text]="'job.scope.section.header' | translate"
        [underlineBelow]="true"
        fontSize="medium"
        ltrTextAlignment="center"
        rtlTextAlignment="center"
        underlineBelowColor="pink">
      </basic-title-text>
      <basic-title-text
        [text]="'job.scope.section.hours' | translate: {hours: job.hours}"
        *ngIf="job.jobEndDate"
        fontSize="tiny"
        ltrTextAlignment="center"
        rtlTextAlignment="center">
      </basic-title-text>
      <basic-title-text
        [text]="'job.scope.section.until.further.notice' | translate"
        *ngIf="!job.jobEndDate"
        fontSize="tiny"
        ltrTextAlignment="center"
        rtlTextAlignment="center">
      </basic-title-text>
      <basic-title-text
        [text]="'job.scope.section.grossSalary' | translate: {grossSalary: job.grossAmountWithCurrency}"
        fontSize="tiny"
        ltrTextAlignment="center"
        rtlTextAlignment="center">
      </basic-title-text>
      <basic-title-text
        [text]="'job.scope.section.netSalary' | translate: {netSalary: job.netAmountWithCurrency}"
        fontSize="tiny"
        ltrTextAlignment="center"
        rtlTextAlignment="center">
      </basic-title-text>
    </div>`
})
export class JobScopeSectionComponent {
  @Input() job = null as Job;
}
