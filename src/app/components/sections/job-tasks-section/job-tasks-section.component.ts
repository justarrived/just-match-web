import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-tasks-section',
  template: `
    <basic-title-text
      [text]="'job.tasks.section.title' | translate "
      [uppercase]="true"
      color="pink"
      fontSize="medium">
    </basic-title-text>
    <div
      class="ui grid"
      [style.direction]=systemLanguage.direction>
      <div
        class="sixteen wide column"
        style="padding:0">
        <ul>
          <li>dig ditches</li>
          <li>code all day</li>
          <li>hack 4 life</li>
          <li>all night long</li>
        </ul>
      </div>
    </div>`
})
export class JobTasksSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
