import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-header',
  styleUrls: ['./job-header.component.scss'],
  template: `
    <div class="header-container">
      <div
        class="ui grid grid-container"
        [style.direction]="systemLanguage.direction">
        <div class="sixteen wide mobile ten wide tablet ten wide computer column">
          <job-title-section [job]="job"></job-title-section>
        </div>
        <div class="four wide tablet only four wide computer only column">
          <job-company-image-section [job]="job"></job-company-image-section>
        </div>
        <div
          class="two wide tablet only two wide computer only column"
          style="display: flex; justify-content: flex-end;">
          <share-section2></share-section2>
        </div>
      </div>
    </div>`
})
export class JobHeaderComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
