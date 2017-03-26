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
  @Input() public selectedState: string;
  public applications: Application[];
  public currentApplications: Application[] = []; // not invoiced
  public historyApplications: Application[] = []; // invoiced

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
      'page[size]': 14
    }).then((applications) => {
      this.applications = applications;
      this.generateJobSections();
    });
  }

  private generateJobSections() {
    this.currentApplications = this.applications.filter(application => !(application.willPerform && application.jobEnded));
    this.historyApplications = this.applications.filter(application => application.willPerform && application.jobEnded);
  }
}
