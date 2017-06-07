import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-interests-section',
  template: `
    <basic-title-text
      [text]="'job.interests.section.title' | translate "
      [uppercase]="true"
      color="pink"
      fontSize="medium">
    </basic-title-text>
    <ul [style.direction]=systemLanguage.direction>
      <li>interested in stuff</li>
      <li>happy happy</li>
      <li>a shining star</li>
    </ul>`
})
export class JobInterestsSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
