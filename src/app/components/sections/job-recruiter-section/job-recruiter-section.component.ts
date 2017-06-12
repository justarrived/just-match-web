import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {BaseComponent} from '../../base.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-recruiter-section',
  template: `
    <div
      *ngIf="job.responsibleRecruiter"
      style="display: flex; align-items: center"
      [style.direction]="systemLanguage.direction">
      <img
        [src]="job?.responsibleRecruiter?.recruiterProfileImage?.imageUrlMedium || job?.responsibleRecruiter?.profileImage?.imageUrlMedium || '/assets/images/placeholder-profile-image.png'"
        class="ui tiny image">
      <div style="padding-left: 10px; padding-right: 10px;">
        <basic-title-text
          [text]="'job.recruiter.section.title' | translate"
          [uppercase]="true"
          marginTop="0"
          marginBottom="0"
          color="pink"
          fontSize="medium">
        </basic-title-text>
        <basic-title-text
          [text]="job?.responsibleRecruiter?.firstName"
          fontSize="small"
          marginTop="0"
          marginBottom="0">
        </basic-title-text>
      </div>
    </div>
    `
})
export class JobRecruiterSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
