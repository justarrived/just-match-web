import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoute} from '../../../routes/ja-route/ja-route';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../proxies/job/job.proxy';
import {Language} from '../../../models/api-models/language/language';
import {NavigationService} from '../../../services/navigation.service';
import {nbrOfMonthsFromDate} from '../../../utils/date/date.util';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {yyyymmdd} from '../../../utils/date/date.util';

// Component requires a route with a :page param

@Component({
  selector: 'jobs-pager-section',
  template: `
    <basic-pager
      (pageChange)="onPageChange($event)"
      [currentPage]="page"
      [maxResults]="totalJobs"
      [pageSize]="pageSize">
    </basic-pager>

    <div
      class="ui basic center aligned segment"
      style="margin: 0; padding-bottom: 55px;">
      <sm-loader
        [promise]="jobsMetaPromise"
        class="inverted">
      </sm-loader>
      <div
        [style.direction]="systemLanguage.direction"
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

    <basic-pager
      style="position:absolute; bottom: 0; width: 100%;"
      (pageChange)="onPageChange($event)"
      [currentPage]="page"
      [maxResults]="totalJobs"
      [pageSize]="pageSize">
    </basic-pager>`
})
export class JobsPagerSectionComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  @Input() currentRoute: JARoute;

  public jobsMetaPromise: Promise<{jobs: Job[], meta: any}>;
  public totalJobs: number = 0;
  public page: number = 1;
  public pageSize: number = 12;
  public systemLanguage: Language;

  private systemLanguageSubscription: Subscription;
  private routeParamsSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobProxy: JobProxy,
    private navigationService: NavigationService,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.initSystemLanguage();
    this.initRouteParamsSubscription();
  }

  private initSystemLanguage(): void {
    this.systemLanguage = this.systemLanguagesResolver.getSelectedSystemLanguage();
    this.systemLanguageSubscription = this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(systemLanguage => {
      this.systemLanguage = systemLanguage;
    });
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

  protected loadData(): void {
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
        this.page = 0;
      }
      return result;
    });
  }

  public ngOnDestroy(): void {
    if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }

  public onPageChange(page: number): void {
    this.navigationService.replaceRouteState(this.currentRoute, page.toString());
    this.page = page;
    this.loadData();
  }
}
