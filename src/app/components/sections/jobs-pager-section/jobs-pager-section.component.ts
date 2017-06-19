import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoute} from '../../../routes/ja-route/ja-route';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../proxies/job/job.proxy';
import {Language} from '../../../models/api-models/language/language';
import {NavigationService} from '../../../services/navigation.service';
import {nbrOfMonthsFromDate} from '../../../utils/date/date.util';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {yyyymmdd} from '../../../utils/date/date.util';

// Component requires a route with a :page param

@Component({
  selector: 'jobs-pager-section',
  template: `
    <div style="height: 100%; display: flex; flex-direction: column;">
      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="totalJobs"
        [pageSize]="pageSize">
      </numbered-pager>

      <div
        class="ui basic center aligned segment"
        style="flex: 1; margin: 0;">
        <basic-loader
          [promise]="jobsMetaPromise"
          class="inverted">
        </basic-loader>
        <div
          [style.flex-direction]="systemLanguage.direction === 'rtl' ? 'row-reverse': 'row'"
          class="ui centered grid">
          <job-card
            [animationDelay]="50 * i"
            [job]="job"
            *ngFor="let job of (jobsMetaPromise | async)?.jobs; let i = index;"
            class="ui basic left aligned segment"
            style="margin: 1rem 0">
          </job-card>
        </div>
      </div>

      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="totalJobs"
        [pageSize]="pageSize">
      </numbered-pager>
    </div>`
})
export class JobsPagerSectionComponent extends BaseComponent {
  @Input() currentRoute: JARoute;

  public jobsMetaPromise: Promise<{jobs: Job[], meta: any}>;
  public totalJobs: number = 0;
  public page: number = 1;
  public pageSize: number = 12;

  private routeParamsSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobProxy: JobProxy,
    private navigationService: NavigationService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.initRouteParamsSubscription();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private initRouteParamsSubscription(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
      this.page = params['page'] && parseInt(params['page']);
      if (!this.page || this.page < 1) {
        this.navigationService.replaceRouteState(this.currentRoute, "1");
        this.page = 1;
      }
      this.loadData();
    });
  }

  private loadData(): void {
    this.jobsMetaPromise = this.jobProxy.getJobsWithMeta({
      'include': 'company,hourly_pay,company.company_images',
      'filter[filled]': false,
      'filter[job_date]': yyyymmdd(new Date()) + '..' + yyyymmdd(nbrOfMonthsFromDate(new Date(), 12)),
      'sort': 'job_date',
      'page[number]': this.page,
      'page[size]': this.pageSize
    })
    .then(result => {
      this.totalJobs = result.meta.total;
      if (this.pageSize * (this.page - 1) > this.totalJobs) {
        this.onPageChange(1);
      } else if (this.totalJobs === 0) {
        this.page = 1;
      }
      return result;
    });
  }

  public onDestroy(): void {
    if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
  }

  public onPageChange(page: number): void {
    this.navigationService.replaceRouteState(this.currentRoute, page.toString());
    this.page = page;
    this.loadData();
  }
}
