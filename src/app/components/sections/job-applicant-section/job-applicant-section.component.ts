import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-applicant-section',
  template: `
    <basic-title-text
      [text]="'job.applicant.section.title' | translate "
      [uppercase]="true"
      *ngIf="job.translatedText.applicantDescriptionHtml"
      color="pink"
      marginTop="0"
      fontSize="medium">
    </basic-title-text>
    <basic-text
      [unsafeHtml]="job.translatedText.applicantDescriptionHtml"
      color="gray">
    </basic-text>`
})
export class JobApplicantSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
