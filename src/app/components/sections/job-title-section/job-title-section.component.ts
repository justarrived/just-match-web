import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-title-section',
  template: `
    <basic-title-text
      [text]="job.translatedText.name"
      fontSize="large"
      marginTop="0"
      marginBottom="0"
      color="pink">
    </basic-title-text>
    <basic-title-text
      [text]="job.city || 'Stockholm'"
      fontSize="medium"
      marginTop="0">
    </basic-title-text>`
})
export class JobTitleSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
