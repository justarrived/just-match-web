import {Application} from '../../../models/api-models/application/application';
import {ApplicationProxy} from '../../../proxies/application/application.proxy';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'applications-section',
  template: `
    <application-item
      *ngFor="let application of applications | async"
      [application]="application">
    </application-item>`
})
export class ApplicationsSectionComponent extends BaseComponent {
  public applications: Promise<Application[]>;

  public constructor(
    private applicationProxy: ApplicationProxy,
    protected userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.loadData();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData() {
    this.applications = this.applicationProxy.getUserApplications(this.userResolver.getUser().id, {
      'include': 'job, job.company',
      'sort': '-created_at',
      'page[size]': 50
    });
  }
}
