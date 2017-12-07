import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
import {Input} from '@angular/core';
import {isEmpty} from 'lodash';
import {JARoute} from '../../../routes/ja-route/ja-route';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../proxies/job/job.proxy';
import {Language} from '../../../models/api-models/language/language';
import {NavigationService} from '../../../services/navigation.service';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'jobs-pager-section',
  template: `
    <div style="height: 100%; display: flex; flex-direction: column;">
      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="totalJobs"
        [pageSize]="pageSize"
        [route]="route">
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
          <basic-text
            [text]="'jobs.pager.section.no.jobs' | translate"
            *ngIf="(jobsMetaPromise| async)?.jobs?.length === 0"
            color="black"
            fontSize="large"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>
          <job-card
            [animationDelay]="50 * i"
            [job]="job"
            *ngFor="let job of (jobsMetaPromise | async)?.jobs; let i = index;"
            class="ui basic left aligned segment"
            style="margin: 1rem 0">
          </job-card>
        </div>

        <div
          class="ui basic center aligned segment">
          <base-navigation-button
            [buttonText]="'subscribe.new.bottom_jobs_page_title' | translate"
            [routerLink]="JARoutes.subscriptions.url()"
            kind="primary"
            size="medium">
          </base-navigation-button>
        </div>
      </div>

      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="totalJobs"
        [pageSize]="pageSize"
        [route]="route">
      </numbered-pager>
    </div>`
})
export class JobsPagerSectionComponent extends BaseComponent {
  @Input() route: JARoute;

  @Input("filters")
  public set filters(filters: any) {
    if (!isEmpty(filters) && JSON.stringify(this.activeFilters) !== JSON.stringify(filters)) {
      this.page = !this.activeFilters && this.page || 1;
      this.dataStoreService.setInMemory(this.jobsPageKey, this.page);
      this.activeFilters = filters;
      this.navigationService.navigate(this.JARoutes.jobs, this.page.toString());
      this.loadData();
    }
  }

  public activeFilters: any;
  public jobsMetaPromise: Promise<{jobs: Job[], meta: any}>;
  public page: number = 1;
  public totalJobs: number = 0;
  public readonly pageSize: number = 20;
  private readonly jobsPageKey: string = 'jobsPageKey';
  private readonly jobsPageParam: string = 'page';
  private routeParamsSubscription: Subscription;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private dataStoreService: DataStoreService,
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

  private initRouteParamsSubscription(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
      this.page = Number(params[this.jobsPageParam]);
    });
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData(): void {
    let searchParameters = {
      'include': 'company,company.company_images',
      'page[number]': this.page,
      'page[size]': this.pageSize,
      'fields[jobs]': [
        'name', 'description', 'city', 'job_date', 'job_end_date', 'full_time',
        'translated_text', 'company', 'filled', 'open_for_applications'
      ].join(','),
      'fields[company]': ['name', 'company_images'].join(',')
    };

    for (let filter in this.activeFilters.filterOption) {
      searchParameters[filter] = this.activeFilters.filterOption[filter];
    }

    this.jobsMetaPromise = this.jobProxy.getJobsWithMeta(searchParameters)
    .then(result => {
      this.totalJobs = result.meta.total;
      if (this.page * this.pageSize > (this.totalJobs + this.pageSize)) {
        this.onPageChange(1);
      }
      return result;
    });
  }

  public onDestroy(): void {
    if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
  }

  public onPageChange(page: number): void {
    this.page = page;
    this.dataStoreService.setInMemory(this.jobsPageKey, this.page);
    this.navigationService.navigate(this.JARoutes.jobs, this.page.toString());
    this.loadData();
  }


}
