import {Component} from '@angular/core';
import {isEmpty} from 'lodash';
import {JARoutes} from '../../routes/ja-routes';
import {Job} from '../../models/job/job';
import {JobProxy} from '../../services/proxy/job-proxy.service';
import {nbrOfMonthsFromDate} from '../../utils/date-util';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../models/user';
import {UserJob} from '../../models/user/user-job';
import {UserProxy} from '../../services/proxy/user-proxy.service';
import {UserResolver} from '../../resolvers/user/user.resolver';
import {yyyymmdd} from '../../utils/date-util';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  public isEmpty = isEmpty;
  public JARoutes = JARoutes;
  public jobsAppliedFor: UserJob[];
  public newJobs: Job[];
  public user: User;
  public userJobs: UserJob[];

  private userSubscription: Subscription;

  public constructor(
    private jobProxy: JobProxy,
    private userProxy: UserProxy,
    private userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver
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
    });
  }

  protected loadData(): void {
    this.loadJobs();
    if (this.user) {
      this.loadUserJobs();
      this.loadJobsAppliedFor();
    }
  }

  private loadJobs(): void {
    this.jobProxy.getJobs(
      {
        include: 'company,hourly_pay,company.company_images',
        'filter[filled]': false,
        'filter[job_date]': yyyymmdd(new Date()) + '..'
        + yyyymmdd(nbrOfMonthsFromDate(new Date(), 6))
      })
      .then(result => {
        this.newJobs = result.data;
      });
  }

  private loadUserJobs(): void {
    this.userProxy.getUserJobs(
      this.user.id,
      {
        include: 'job',
        'sort': 'job.job.end_date',
        'filter[will_perform]': true,
        'page[size]': 5
      })
      .then(result => {
        this.userJobs = result;
      });
  }

  private loadJobsAppliedFor(): void {
    this.userProxy.getUserJobs(
      this.user.id,
      {
        include: 'job',
        'sort': '-created_at',
        'page[size]': 10
      })
      .then(result => {
        this.jobsAppliedFor = result;
      });
  }

  public ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public userJobsVisible() {
    if (this.user) {
      return !this.isEmpty(this.userJobs);
    }
    return false;
  }

  public jobsAppliedForVisible() {
    if (this.user) {
      return !this.isEmpty(this.jobsAppliedFor);
    }
    return false;
  }
}
