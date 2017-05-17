import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'

@Component({
  selector: 'job-location-section',
  template: `
    <div class="ui basic center aligned segment">
      <i class="ui big circular inverted pink marker icon"></i>
      <basic-title-text
        [text]="'job.location.section.header' | translate"
        [underlineBelow]="true"
        fontSize="medium"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="pink"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
      <basic-title-text
        [text]="job.fullStreetAddress"
        fontSize="tiny"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-title-text>
      <basic-title-text
        [text]="job.city"
        fontSize="tiny"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-title-text>
    </div>`
})
export class JobLocationSectionComponent {
  @Input() job = null as Job;
}
