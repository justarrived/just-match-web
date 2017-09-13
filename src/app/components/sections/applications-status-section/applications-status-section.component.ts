import {Application} from '../../../models/api-models/application/application';
import {ApplicationProxy} from '../../../proxies/application/application.proxy';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {nbrOfMonthsFromDate} from '../../../utils/date/date.util';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {yyyymmdd} from '../../../utils/date/date.util';

@Component({
  selector: 'applications-status-section',
  styleUrls: ['./applications-status-section.component.scss'],
  template: `
    <div
      class="applications-container ui basic center aligned segment"
      style="margin: 0; padding: 30px 0"
      *ngIf="(applications | async)?.length > 0">
      <basic-loader
        [promise]="applications"
        class="inverted">
      </basic-loader>
      <basic-title-text
        [text]="'home.jobs.slider.user.jobs.title' | translate"
        [underlineBelow]="true"
        color="black"
        fontSize="huge"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="pink"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
      <div
        [style.direction]="systemLanguage.direction"
        class="ui centered grid"
        style="margin: 20px 0">
        <application-status-card
          [application]="application"
          *ngFor="let application of applications | async"
          style="padding: 15px 10px">
        </application-status-card>
      </div>
      <base-navigation-button
        [buttonText]="'home.jobs.slider.show.all.link' | translate"
        [routerLink]="JARoutes.applications.url()"
        kind="primary"
        size="medium">
      </base-navigation-button>
    </div>
    `
})
export class ApplicationsStatusSectionComponent extends BaseComponent {
  public applications: Promise<Application[]> = Promise.resolve([]);

  public constructor(
    private applicationProxy: ApplicationProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.loadData();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  public userChanged(user: User): void {
    this.loadData();
  }

  private loadData(): void {
    if (this.user) {
      this.applications = this.applicationProxy.getUserApplications(this.user.id, {
        'include': 'job',
        'sort': '-created_at',
        'page[size]': 14
      });
    }
  }
}
