import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'

@Component({
  selector: 'job-scope-section',
  template: `
    <div class="ui basic center aligned segment">
      <i class="ui big circular inverted pink clock icon"></i>
      <h3 class="underline-border-below underline-border-below-centered underline-border-below-pink">
        {{'job.scope.section.header' | translate}}
      </h3>
      <h5>{{'job.scope.section.hours' | translate: {hours: job.hours} }}</h5>
      <h5>{{'job.scope.section.grossSalary' | translate: {grossSalary: job.grossAmountWithCurrency} }}</h5>
      <h5>{{'job.scope.section.netSalary' | translate: {netSalary: job.netAmountWithCurrency} }}</h5>
    </div>`
})
export class JobScopeSectionComponent {
  @Input() job = null as Job;
}
