import {Application} from '../../../models/api-models/application/application';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-banner-section',
  styleUrls: ['./job-banner-section.component.scss'],
  template: `
    <div class="banner-container"></div>`
})
export class JobBannerSectionComponent extends BaseComponent {

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
