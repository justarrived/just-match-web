import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';
import {nbrOfMonthsFromDate} from '../../../utils/date-util';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/user';
import {UserJob} from '../../../models/user/user-job';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {yyyymmdd} from '../../../utils/date-util';

@Component({
  selector: 'user-jobs-status-section',
  styleUrls: ['./user-jobs-status-section.component.scss'],
  template: `
    <div
      class="user-jobs-container ui basic center aligned segment"
      style="margin: 0; padding: 30px 0"
      *ngIf="user && (userJobs | async)?.length > 0">
      <sm-loader
        [promise]="userJobs"
        class="inverted"
        text="{{'component.loading' | translate}}">
      </sm-loader>
      <h2>
        {{'home.jobs.slider.user.jobs.title' | translate}}
      </h2>
      <div
        class="ui centered grid"
        style="margin: 20px 0">
        <user-job-status-card
          [userJob]="userJob"
          *ngFor="let userJob of userJobs | async"
          style="padding: 15px 10px">
        </user-job-status-card>
      </div>
      <base-button
        [buttonText]="'home.jobs.slider.show.all.link' | translate"
        [routerLink]="JARoutes.userJobs.url()"
        kind="primary"
        size="medium">
      </base-button>
    </div>
    `
})
export class UserJobsStatusSectionComponent extends SystemLanguageListener implements OnInit, OnDestroy  {
  public JARoutes = JARoutes;
  public user: User;
  public userJobs: Promise<UserJob[]> = Promise.resolve([]);

  private userSubscription: Subscription;

  public constructor(
    private userProxy: UserProxy,
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
      this.userJobs = this.userProxy.getUserJobs(
        this.user.id,
        {
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
