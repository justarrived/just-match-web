import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-comments-section',
  template: `
    <div class="ui basic center aligned segment">
      <i class="ui big circular inverted pink comments icon"></i>
      <basic-title-text
        [text]="'job.comments.section.title' | translate"
        [underlineBelow]="true"
        marginTop="0"
        fontSize="medium"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="pink"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
    </div>
    <comments-form
      [resourceId]="job.id"
      [resourceName]="'jobs'">
    </comments-form>`
})
export class JobCommentsSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
