import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'

@Component({
  selector: 'job-information-section',
  template: `
    <div class="ui basic center aligned segment">
      <h2 class="underline-border-below underline-border-below-centered underline-border-below-pink">
        {{'job.information.section.header' | translate}}
      </h2>
    </div>
    <div
      class="ui basic center aligned segment"
      style="padding-left: 0; padding-right: 0">
      <div class="ui equal width grid">
        <div
          class="column"
          style="padding-left: 0; padding-right: 0">
          <i class="ui big circular inverted pink building outline icon"></i>
          <h5 class="wrap-long-words">
            {{job.company.name}}
          </h5>
        </div>
        <div
          class="column"
          style="padding-left: 0; padding-right: 0">
          <i class="ui big circular inverted pink calendar icon"></i>
          <h5 style="margin-bottom: 0">
            {{job.jobDate | date: 'MMM dd'}}
          </h5>
          <h5 style="margin: 0">
            -
          </h5>
          <h5 style="margin: 0">
            {{job.jobEndDate | date: 'MMM dd'}}
          </h5>
        </div>
        <div
          class="column"
          style="padding-left: 0; padding-right: 0">
          <i class="ui big circular inverted pink money icon"></i>
          <h5>{{job.hourlyPay.grossSalaryWithUnit}}</h5>
        </div>
      </div>
    </div>`
})
export class JobInformationSectionComponent {
  @Input() job = null as Job;
}
