import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'

@Component({
  selector: 'job-comments-section',
  template: `
    <div class="ui basic center aligned segment">
      <i class="ui big circular inverted pink comments icon"></i>
      <h3 class="underline-border-below underline-border-below-centered underline-border-below-pink">
        {{'job.comments.section.title' | translate}}
      </h3>
    </div>
    <comments-form
      [resourceId]="job.id"
      [resourceName]="'jobs'">
    </comments-form>`
})
export class JobCommentsSectionComponent {
  @Input() job = null as Job;
}
