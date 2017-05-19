import {Application} from '../../../models/api-models/application/application';
import {ApplicationProxy} from '../../../proxies/application/application.proxy';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {map} from 'lodash';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'applications',
  templateUrl: './applications.component.html'
})
export class ApplicationsComponent extends SystemLanguageListener implements OnInit {
  public applications: Application[];

  public constructor(
    private applicationProxy: ApplicationProxy,
    private userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit() {
    this.loadData();
  }

  protected loadData() {
    this.applicationProxy.getUserApplications(this.userResolver.getUser().id, {
      'include': 'job, job.company',
      'sort': '-created_at',
      'page[size]': 50
    })
    .then(applications => {
      this.applications = applications;
    });
  }
}
