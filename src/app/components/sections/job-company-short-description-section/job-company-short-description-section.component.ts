import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {BaseComponent} from '../../base.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-company-short-description-section',
  template: `
    <basic-title-text
      [text]="'job.company.short.description.section.title' | translate: {company: job?.company?.name}"
      [uppercase]="true"
      *ngIf="job?.company?.translatedText?.shortDescription"
      color="pink"
      fontSize="medium">
    </basic-title-text>
    <basic-text
      [text]="job.company.translatedText.shortDescription"
      *ngIf="job?.company?.translatedText?.shortDescription"
      color="gray">
    </basic-text>`
})
export class JobCompanyShortDescriptionSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
