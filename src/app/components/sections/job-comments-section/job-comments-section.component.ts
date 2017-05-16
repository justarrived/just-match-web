import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'

@Component({
  selector: 'job-comments-section',
  template: `
    <div class="ui basic center aligned segment">
      <i class="ui big circular inverted pink comments icon"></i>
      <basic-title
        [text]="'job.comments.section.title' | translate"
        [underlineBelow]="true"
        fontSize="medium"
        ltrTextAlignment="center"
        rtlTextAlignment="center"
        underlineBelowColor="pink">
      </basic-title>
    </div>
    <comments-form
      [resourceId]="job.id"
      [resourceName]="'jobs'">
    </comments-form>`
})
export class JobCommentsSectionComponent {
  @Input() job = null as Job;
}
