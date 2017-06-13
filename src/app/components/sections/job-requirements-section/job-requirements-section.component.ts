import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-requirements-section',
  template: `
    <basic-title-text
      [text]="'job.requirements.section.title' | translate "
      [uppercase]="true"
      *ngIf="job.translatedText.requirementsDescriptionHtml"
      color="pink"
      fontSize="medium">
    </basic-title-text>
    <basic-text
      [unsafeHtml]="job.translatedText.requirementsDescriptionHtml"
      color="gray">
    </basic-text>`
})
export class JobRequirementsSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
