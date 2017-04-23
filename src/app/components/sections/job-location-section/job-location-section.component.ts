import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'

@Component({
  selector: 'job-location-section',
  template: `
    <div class="ui basic center aligned segment">
      <i class="ui big circular inverted pink marker icon"></i>
      <h3 class="underline-border-below underline-border-below-centered underline-border-below-pink">
        {{'job.location.section.header' | translate}}
      </h3>
      <h5>{{job.fullStreetAddress}}</h5>
      <h5>{{job.city}}</h5>
    </div>`
})
export class JobLocationSectionComponent {
  @Input() job = null as Job;
}
