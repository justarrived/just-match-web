import {Application} from '../../../models/api-models/application/application';
import {ApplicationProxy} from '../../../proxies/application/application.proxy';
import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';
import {nbrOfMonthsFromDate} from '../../../utils/date-util';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {yyyymmdd} from '../../../utils/date-util';

@Component({
  selector: 'applications-status-section',
  styleUrls: ['./applications-status-section.component.scss'],
  template: `
    <div
      class="applications-container ui basic center aligned segment"
      style="margin: 0; padding: 30px 0"
      *ngIf="user && (applications | async)?.length > 0">
      <sm-loader
        [promise]="applications"
        class="inverted"
        text="{{'component.loading' | translate}}">
      </sm-loader>
      <h2>
        {{'home.jobs.slider.user.jobs.title' | translate}}
      </h2>
      <div
        class="ui centered grid"
        style="margin: 20px 0">
        <application-status-card
          [application]="application"
          *ngFor="let application of applications | async"
          style="padding: 15px 10px">
        </application-status-card>
      </div>
      <base-button
        [buttonText]="'home.jobs.slider.show.all.link' | translate"
        [routerLink]="JARoutes.applications.url()"
        kind="primary"
        size="medium">
      </base-button>
    </div>
    `
})
export class ApplicationsStatusSectionComponent extends SystemLanguageListener implements OnInit, OnDestroy  {
  public JARoutes = JARoutes;
  public user: User;
  public applications: Promise<Application[]> = Promise.resolve([]);

  private userSubscription: Subscription;

  public constructor(
    private applicationProxy: ApplicationProxy,
    private userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver,
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit() {
    this.initUser();
    this.loadData();
  }

  private initUser() {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
      this.loadData();
    });
  }

  protected loadData(): void {
    if (this.user) {
      this.applications = this.applicationProxy.getUserApplications(this.user.id, {
        'include': 'job',
        'sort': '-created_at',
        'page[size]': 14
      });
    }
  }

  public ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
