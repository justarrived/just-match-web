import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-you-have-section',
  template: `
    <basic-title-text
      [text]="'job.you.have.section.title' | translate "
      [uppercase]="true"
      color="pink"
      fontSize="medium">
    </basic-title-text>
    <ul [style.direction]=systemLanguage.direction>
      <li>a driving license</li>
      <li>experience in in blah blah</li>
      <li>Milk</li>
    </ul>`
})
export class JobYouHaveSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
