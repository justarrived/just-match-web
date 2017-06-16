import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {BaseComponent} from '../../base.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-company-description-section',
  template: `
    <basic-title-text
      [text]="'job.company.description.section.title' | translate: {company: job?.company?.name}"
      [uppercase]="true"
      *ngIf="job?.company?.translatedText?.descriptionHtml"
      color="pink"
      fontSize="medium">
    </basic-title-text>
    <basic-text
      [unsafeHtml]="job.company.translatedText.descriptionHtml"
      *ngIf="job?.company?.translatedText?.descriptionHtml"
      color="gray">
    </basic-text>`
})
export class JobCompanyDescriptionSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
