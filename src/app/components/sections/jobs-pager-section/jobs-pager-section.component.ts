import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoute} from '../../../routes/ja-route/ja-route';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../proxies/job/job.proxy';
import {NavigationService} from '../../../services/navigation.service';
import {nbrOfMonthsFromDate} from '../../../utils/date/date.util';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {yyyymmdd} from '../../../utils/date/date.util';

// Component requires a route with only a :page param

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
      class="ui basic padded center aligned segment"
      style="min-height: 600px">
      <sm-loader
        [promise]="jobsMetaPromise"
        class="inverted">
      </sm-loader>
      <div class="ui centered grid">
        <job-card
          [job]="job"
          *ngFor="let job of (jobsMetaPromise | async)?.jobs"
          class="ui basic left aligned segment"
          style="margin: 1rem 0">
        </job-card>
      </div>
    </div>

    <basic-pager
      (pageChange)="onPageChange($event)"
      [currentPage]="page"
      [maxResults]="totalJobs"
      [pageSize]="pageSize">
    </basic-pager>`
})
export class JobsPagerSectionComponent extends SystemLanguageListener implements OnInit {
  @Input() currentRoute: JARoute;

  public jobsMetaPromise: Promise<{jobs: Job[], meta: any}>;
  public totalJobs: number = 0;
  public page: number = 1;
  public pageSize: number = 12;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobProxy: JobProxy,
    private navigationService: NavigationService,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.page = params['page'] && parseInt(params['page']);
      if (!this.page || this.page < 1) {
        this.navigationService.replaceRouteState(this.currentRoute, "1");
        this.page = 1;
      }
      this.loadData();
    });
  }

  protected loadData() {
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

  public onPageChange(page) {
    this.navigationService.replaceRouteState(this.currentRoute, page.toString());
    this.page = page;
    this.loadData();
  }
}
